/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable */
import { randomUUID } from 'node:crypto';

import { Server, type Socket } from 'socket.io';

import { redisClient } from '../database/redis';

const redisKeys = {
  gameRoom: (roomId: string) => `game-room:${roomId}`,
  gameSearch: (searchId: string) => `game-search:${searchId}`,
  userActiveGame: (userId: string) => `${userId}-active-game`,
};

const socketKeys = {
  gameRoom: (roomId: string) => `game-room:${roomId}`,
};

const updateGameObjectsGroup = <T extends GameObjects, K extends GameObjectTypes>(
  initialValue: T,
  gameObjectsType: K,
  turn: TurnToServer,
): T[K] => {
  return [
    ...initialValue[gameObjectsType]
      .map(
        (object) =>
          // @ts-expect-error
          turn.updatedObjects[gameObjectsType].find((updatedObject: typeof object) => updatedObject.id === object.id) ??
          object,
      )
      .filter((object) => !turn.removedObjects?.[gameObjectsType]?.includes(object.id)),
    ...(turn.newObjects?.[gameObjectsType] ?? []),
  ];
};

enum GameObjectTypes {
  CARD = 'cards',
  UNIT = 'units',
  BUILDING = 'buildings',
}

type Card = { id: string; a: string };
type Unit = { id: string; b: string };
type Building = { id: string; c: string };

type Player = {
  coins: number;
  energy: number;
  userId: string;
  team: string;
};

type GameObjects = {
  [GameObjectTypes.CARD]: Card[];
  [GameObjectTypes.BUILDING]: Building[];
  [GameObjectTypes.UNIT]: Unit[];
};

type RemovedGameObjects = {
  [GameObjectTypes.CARD]: string[];
  [GameObjectTypes.BUILDING]: string[];
  [GameObjectTypes.UNIT]: string[];
};

type Game = {
  id: string;
  players: [Player, Player];
  gameObjects: GameObjects;
  isFinished: boolean;
  winnedUserId: string;
  turnsCount: number;
  turns: TurnFromServer[];
};

type GameCompactFromServer = {
  turnsCount: number;
  id: string;
  isFinished: boolean;
  winnedUserId?: string;
};

type GameCompactToServer = {
  id: string;
};

type TurnToServer = {
  turn: number;

  game: GameCompactToServer;

  player: Player;

  newObjects: GameObjects;
  removedObjects: RemovedGameObjects;
  updatedObjects: GameObjects;
};

type TurnFromServer = {
  turn: number;

  game: GameCompactFromServer;

  player: Player;

  newObjects: GameObjects;
  removedObjects: RemovedGameObjects;
  updatedObjects: GameObjects;
};

export enum IoEvent {
  TURN_TO_SERVER = 'turn-to-server',
  TURN_FROM_SERVER = 'turn-from-server',
  SEARCH_GAME = 'search-game',
  GAME_FOUND = 'game-found',
  GAME_LOADED = 'game-loaded',
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
}

export type IoClientToServerEvents = {
  [IoEvent.TURN_TO_SERVER]: (data: TurnToServer) => void;
  [IoEvent.SEARCH_GAME]: () => void;
  [IoEvent.GAME_LOADED]: () => void;
};

export type IoServerToClientEvents = {
  [IoEvent.TURN_FROM_SERVER]: (data: TurnFromServer) => void;
  [IoEvent.GAME_FOUND]: (data: Game) => void;
};

export type IoData = {
  userId: string;
};

export const io = new Server<IoClientToServerEvents, IoServerToClientEvents, never, IoData>({
  transports: ['websocket'],
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

export type AppIoServer = typeof io;
export type AppIoSocket = Socket<IoClientToServerEvents, IoServerToClientEvents, never, IoData>;

export type GameSearch = {
  userId: string;
};

io.on(IoEvent.CONNECT, async (socket) => {
  const userId = socket.handshake.query.userId;

  if (!userId || Array.isArray(userId)) return;

  await socket.join(userId);

  const userActiveGameId = await redisClient.get(redisKeys.userActiveGame(userId));

  if (userActiveGameId) {
    await socket.join(userActiveGameId);
  }

  socket.on(IoEvent.TURN_TO_SERVER, async (turnToServer) => {
    const playerActiveGame = await redisClient.get(redisKeys.userActiveGame(turnToServer.player.userId));
    if (!playerActiveGame) return;
    const gameStringified = await redisClient.get(`game-room:${playerActiveGame}`);
    if (!gameStringified) return;
    const game = JSON.parse(gameStringified) as Game;
    if (
      !game.players.some(
        (player) => player.userId === turnToServer.player.userId && player.team === turnToServer.player.team,
      )
    ) {
      return;
    }

    game.turnsCount++;

    game.gameObjects = {
      buildings: updateGameObjectsGroup(game.gameObjects, GameObjectTypes.BUILDING, turnToServer),
      units: updateGameObjectsGroup(game.gameObjects, GameObjectTypes.UNIT, turnToServer),
      cards: updateGameObjectsGroup(game.gameObjects, GameObjectTypes.CARD, turnToServer),
    };
    game.players[game.players.findIndex((player) => player.userId === turnToServer.player.userId)] =
      turnToServer.player;

    // TODO: change isFinished and winnedUserId
    const turnFromServer = {
      ...turnToServer,
      game: {
        id: game.id,
        isFinished: game.isFinished,
        turnsCount: game.turnsCount,
        winnedUserId: game.winnedUserId,
      },
    };

    game.turns.push(turnFromServer);

    await redisClient.set(redisKeys.gameRoom(turnToServer.game.id), JSON.stringify(game));

    socket.to(socketKeys.gameRoom(turnToServer.game.id)).emit(IoEvent.TURN_FROM_SERVER, turnFromServer);
  });

  socket.on(IoEvent.SEARCH_GAME, async () => {
    const isUserHaveSearchRequest = await redisClient.get(redisKeys.gameSearch(userId));

    if (userActiveGameId) return;
    if (isUserHaveSearchRequest) {
      await redisClient.del(redisKeys.gameSearch(userId));
    }

    const scan = redisClient.scanStream({
      match: redisKeys.gameSearch('*'),
      count: 1,
    });

    scan.on('data', async (gameSearchesList: string[]) => {
      if (gameSearchesList.length === 0) return;
      for (const gameSearch of gameSearchesList) {
        const gameSearchDataStringified = await redisClient.get(gameSearch);
        if (!gameSearchDataStringified) {
          return;
        }
        const gameSearchData = JSON.parse(gameSearchDataStringified) as { userId: string };
        const gameId = redisKeys.gameRoom(randomUUID());
        await redisClient.set(gameId, JSON.stringify({ players: [userId, gameSearchData.userId] }));
        await redisClient.set(redisKeys.userActiveGame(userId), gameId);
        await redisClient.set(redisKeys.userActiveGame(gameSearchData.userId), gameId);
        await redisClient.del(gameSearch);
        io.to(userId)
          .to(gameSearchData.userId)
          .emit(IoEvent.GAME_FOUND, {} as Game);
        scan.destroy();
        break;
      }
    });

    scan.on('end', async () => {
      await redisClient.set(redisKeys.gameSearch(userId), JSON.stringify({ userId }));
    });

    // const scan21 = redisClient.scanStream({
    //   match: 'game-search:*',
    //   count: 100,
    // });

    // const scan22 = redisClient.scanStream({
    //   match: 'game-room:*',
    //   count: 100,
    // });

    // scan21.on('data', (gameSearch: string[]) => {
    //   console.log('search:', gameSearch);
    //   gameSearch.map(async (search) => console.log(await redisClient.get(search)));
    //   // gameSearch.map(async (search) => await redisClient.del(search));
    // });

    // scan22.on('data', async (gameSearch: string[]) => {
    //   console.log('room:', gameSearch);
    //   gameSearch.map(async (search) => console.log(await redisClient.get(search)));
    //   // gameSearch.map(async (search) => await redisClient.del(search));
    // });
  });

  socket.on(IoEvent.GAME_LOADED, async () => {
    const userActiveGame = await redisClient.get(redisKeys.userActiveGame(userId));
    if (!userActiveGame) return;
    await socket.join(socketKeys.gameRoom(userActiveGame));
  });
});

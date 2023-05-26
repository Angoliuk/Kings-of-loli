import { randomUUID } from 'node:crypto';

import { Server, type Socket } from 'socket.io';

import { redisClient } from '../database/redis';
import {
  IoClientToServerEvents,
  IoServerToClientEvents,
  IoData,
  IoEvent,
  Game,
  GameObjectType,
  TurnFromServer,
} from '@kol/shared-game/interfaces';
import { createBaseGame, updateGameObjectsGroup } from '@kol/shared-game/utils';
import { redisUtils, socketKeys } from '../services/redis';

export const io = new Server<IoClientToServerEvents, IoServerToClientEvents, never, IoData>({
  transports: ['websocket'],
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

export type AppIoServer = typeof io;
export type AppIoSocket = Socket<IoClientToServerEvents, IoServerToClientEvents, never, IoData>;

io.on(IoEvent.CONNECT, async (socket) => {
  const userId = socket.handshake.query.userId;

  if (!userId || Array.isArray(userId)) return;

  await socket.join(userId);

  const userActiveGameId = await redisUtils.userActiveGame.get(userId);

  if (userActiveGameId) {
    await socket.join(userActiveGameId);
  }

  socket.on(IoEvent.TURN_TO_SERVER, async (turnToServer) => {
    const playerActiveGame = await redisUtils.userActiveGame.get(turnToServer.player.userId);
    if (!playerActiveGame) return;

    const game = await redisUtils.gameRoom.get(playerActiveGame);
    if (!game) return;

    if (
      !game.players.some(
        (player) => player.userId === turnToServer.player.userId && player.team === turnToServer.player.team,
      )
    ) {
      return;
    }

    game.turnsCount++;

    game.gameObjects = {
      [GameObjectType.BUILDING]: updateGameObjectsGroup(game.gameObjects[GameObjectType.BUILDING], turnToServer),
      [GameObjectType.UNIT]: updateGameObjectsGroup(game.gameObjects[GameObjectType.UNIT], turnToServer),
      [GameObjectType.CARD]: updateGameObjectsGroup(game.gameObjects[GameObjectType.CARD], turnToServer),
    };
    game.players[game.players.findIndex((player) => player.userId === turnToServer.player.userId)] = {
      ...turnToServer.player,
      energy: turnToServer.player.energy + 2,
      coins: turnToServer.player.coins + 2,
    };

    // TODO: change isFinished and winnedUserId
    const turnFromServer: TurnFromServer = {
      ...turnToServer,
      game: {
        id: game.id,
        isFinished: game.isFinished,
        turnsCount: game.turnsCount,
        winnedUserId: game.winnedUserId,
      },
      players: game.players,
    };

    game.turns.push(turnFromServer);

    await redisUtils.gameRoom.set(turnToServer.game.id, game);

    socket.to(socketKeys.gameRoom(turnToServer.game.id)).emit(IoEvent.TURN_FROM_SERVER, turnFromServer);
  });

  socket.on(IoEvent.SEARCH_GAME, async () => {
    const isUserHaveSearchRequest = await redisUtils.gameSearch.get(userId);

    if (userActiveGameId) {
      // REPLACE AFTER TESTS
      const a = await redisUtils.gameRoom.get(userActiveGameId);
      await redisUtils.gameRoom.del(a!.id);
      await redisUtils.userActiveGame.del(a!.players[0].userId);
      await redisUtils.userActiveGame.del(a!.players[1].userId);
      // io.to(userId).emit(IoEvent.GAME_FOUND, await redisUtils.gameRoom.get(userActiveGameId));
      // return;
    }
    if (isUserHaveSearchRequest) {
      await redisUtils.gameSearch.del(userId);
    }

    const scan = redisClient.scanStream({
      match: redisUtils.gameSearch.key('*'),
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
        const gameId = randomUUID();

        const createdGame = createBaseGame([userId, gameId]);

        await redisUtils.gameRoom.set(gameId, createdGame);
        await redisUtils.userActiveGame.set(userId, gameId);
        await redisUtils.userActiveGame.set(gameSearchData.userId, gameId);
        await redisUtils.gameSearch.del(gameSearch);

        io.to(userId).to(gameSearchData.userId).emit(IoEvent.GAME_FOUND, createdGame);

        scan.destroy();
        break;
      }
    });

    scan.on('end', async () => {
      await redisUtils.gameSearch.set(userId, { userId });
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
    const userActiveGame = await redisUtils.userActiveGame.get(userId);
    if (!userActiveGame) return;
    await socket.join(socketKeys.gameRoom(userActiveGame));
  });
});

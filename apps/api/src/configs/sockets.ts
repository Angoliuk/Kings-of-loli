import { randomUUID } from 'node:crypto';

import { Server, type Socket } from 'socket.io';

import { redisClient } from '../database/redis';
import {
  IoClientToServerEvents,
  IoServerToClientEvents,
  IoData,
  IoEvent,
  GameObjectType,
  TurnFromServer,
  BuildingType,
  Team,
  UnitType,
  PatternTypes,
} from '@kol/shared-game/interfaces';
import { createBaseGame, updateGameObjectsGroup } from '@kol/shared-game/utils';
import { redisUtils, socketKeys } from '../services/redis';
import { prisma } from '../database/prisma';
import { GameObjects } from '@kol/shared-game/game-objects';

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
    // await socket.join(userActiveGameId);
    await socket.join(socketKeys.gameRoom(userActiveGameId));
  }

  socket.on(IoEvent.TURN_TO_SERVER, async (turnToServer) => {
    const playerActiveGame = await redisUtils.userActiveGame.get(turnToServer.player.userId);

    if (!playerActiveGame) return;

    const game = await redisUtils.gameRoom.get(playerActiveGame);

    if (
      !game ||
      game.isFinished ||
      !game.players.some(
        (player) => player.userId === turnToServer.player.userId && player.team === turnToServer.player.team,
      )
    )
      return;

    const removedCastle = game.gameObjects.building.find(
      (buildingObject) =>
        buildingObject.buildingType === BuildingType.CASTLE &&
        turnToServer.removedObjects.building.includes(buildingObject.id),
    );

    if (removedCastle) {
      const gameWinnerId = game.players.find((player) => player.team !== removedCastle.team)?.userId;
      const gameLoserId = game.players.find((player) => player.userId !== gameWinnerId)?.userId;

      if (!gameWinnerId || !gameLoserId) return;

      game.isFinished = true;
      game.winnedUserId = gameWinnerId;

      prisma.matchStats.create({
        data: {
          duration: new Date(game.createdAt).getMilliseconds() - new Date().getMilliseconds(),
          id: game.id,
          playersStats: {
            createMany: {
              data: [
                {
                  isWinner: true,
                  scoreGained: Math.floor(Math.random() * 20),
                  userId: gameWinnerId,
                },
                {
                  isWinner: false,
                  scoreGained: -Math.floor(Math.random() * 20),
                  userId: gameLoserId,
                },
              ],
            },
          },
        },
      });
    }
    game.turnsCount++;

    game.gameObjects = {
      [GameObjectType.BUILDING]: updateGameObjectsGroup(game.gameObjects[GameObjectType.BUILDING], turnToServer),
      [GameObjectType.UNIT]: updateGameObjectsGroup(game.gameObjects[GameObjectType.UNIT], turnToServer),
      [GameObjectType.CARD]: updateGameObjectsGroup(game.gameObjects[GameObjectType.CARD], turnToServer),
      sdada: console.log(
        '//////////////////',
        game.gameObjects[GameObjectType.UNIT],
        turnToServer.newObjects.unit,
        'gameObjects in sockets',
      ),
    };

    if (game.turnsCount % 3 === 0) {
      const turnSenderEnemy = game.players.find((player) => player.userId !== turnToServer.player.userId);

      turnSenderEnemy &&
        game.gameObjects.card.push(
          new GameObjects.Card({
            objectToCreate: {
              objectType: GameObjectType.UNIT,
              source: `resources/img/map/units/Worker_${turnSenderEnemy.team}.png`,
              damage: 2,
              hp: 2,
              team: turnSenderEnemy.team,
              unitType: UnitType.WARRIOR,
              id: randomUUID(),
              possibleMoves: 4,
              pattern: PatternTypes.STAR,
              energy: 2,
            },
            energy: 2,
            hp: 2,
            price: 2,
            team: turnSenderEnemy.team,
            source: 'resources/img/cards/peasant-card.png',
          }),
        );
    }

    game.players[game.players.findIndex((player) => player.userId === turnToServer.player.userId)] = {
      ...turnToServer.player,
      energy: turnToServer.player.energy + 2,
      coins: turnToServer.player.coins + 2,
    };

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
    // await redisUtils.gameRoom.get(turnToServer.game.id);
    // socket.to(socketKeys.gameRoom(turnToServer.game.id)).emit(IoEvent.TURN_FROM_SERVER, turnFromServer);
    io.to(game.players.find((player) => player.userId !== userId).userId).emit(
      IoEvent.TURN_FROM_SERVER,
      turnFromServer,
    );
  });

  socket.on(IoEvent.SEARCH_GAME, async () => {
    const isUserHaveSearchRequest = await redisUtils.gameSearch.get(userId);

    if (userActiveGameId) {
      // REPLACE AFTER TESTS
      // const a = await redisUtils.gameRoom.get(userActiveGameId);
      // await redisUtils.gameRoom.del(a!.id);
      // await redisUtils.userActiveGame.del(a!.players[0].userId);
      // await redisUtils.userActiveGame.del(a!.players[1].userId);
      // const activeGame = await redisUtils.gameRoom.get(userActiveGameId)
      // if(!activeGame)return
      // io.to(userId).emit(IoEvent.GAME_FOUND, activeGame);
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

        const createdGame = createBaseGame([userId, gameSearchData.userId]);
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

/* eslint-disable @typescript-eslint/no-misused-promises */
import { randomUUID } from 'node:crypto';

import { createBaseGame } from '@api/services';
import { Server, type Socket } from 'socket.io';

import { redisClient } from '../database/redis';
import {
  type Game,
  GameObjectTypes,
  type IoClientToServerEvents,
  type IoData,
  IoEvent,
  type IoServerToClientEvents,
} from '../interfaces';
import { redisKeys, redisUtils, socketKeys, updateGameObjectsGroup } from '../services/redis';
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

    await redisUtils.gameRoom.set(turnToServer.game.id, game);

    socket.to(socketKeys.gameRoom(turnToServer.game.id)).emit(IoEvent.TURN_FROM_SERVER, turnFromServer);
  });

  socket.on(IoEvent.SEARCH_GAME, async () => {
    const isUserHaveSearchRequest = await redisUtils.gameSearch.get(userId);

    if (userActiveGameId) return;
    if (isUserHaveSearchRequest) {
      await redisUtils.gameSearch.del(userId);
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
        const gameId = randomUUID();

        await redisUtils.gameRoom.set(gameId, {} as Game);
        await redisUtils.userActiveGame.set(userId, gameId);
        await redisUtils.userActiveGame.set(gameSearchData.userId, gameId);
        await redisUtils.gameSearch.del(gameSearch);

        io.to(userId)
          .to(gameSearchData.userId)
          .emit(IoEvent.GAME_FOUND, createBaseGame([userId, gameId]));

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

import { redisClient } from '@api/database';
import { type Game } from '@kol/shared-game/interfaces';

export const redisKeys = {
  gameRoom: (roomId: string) => `game-room:${roomId}`,
  gameSearch: (searchId: string) => `game-search:${searchId}`,
  userActiveGame: (userId: string) => `${userId}-active-game`,
};

export const redisUtilsGenerator =
  <T>() =>
  <K>(keyExtractor: (key: K) => string) => ({
    get: async (key: K) => {
      const response = await redisClient.get(keyExtractor(key));
      return response ? (JSON.parse(response) as T) : null;
    },
    set: async (key: K, value: T) => await redisClient.set(keyExtractor(key), JSON.stringify(value)),
    del: async (key: K) => await redisClient.del(keyExtractor(key)),
  });

export const redisUtils = {
  gameRoom: redisUtilsGenerator<Game>()(redisKeys.gameRoom),
  gameSearch: redisUtilsGenerator<{ userId: string }>()(redisKeys.gameSearch),
  userActiveGame: redisUtilsGenerator<string>()(redisKeys.userActiveGame),
};

export const socketKeys = {
  gameRoom: (roomId: string) => `game-room:${roomId}`,
};

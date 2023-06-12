import { redisClient } from '@api/database';
import { GameWithObjects, type Game } from '@kol/shared-game/interfaces';

export const redisUtilsGenerator = <T, K>(keyExtractor: (key: K) => string) => ({
  get: async (key: K) => {
    const response = await redisClient.get(keyExtractor(key));
    return response ? (JSON.parse(response) as T) : null;
  },
  set: async (key: K, value: T) => await redisClient.set(keyExtractor(key), JSON.stringify(value)),
  del: async (key: K) => await redisClient.del(keyExtractor(key)),
  key: keyExtractor,
});

export const redisUtils = {
  gameRoom: redisUtilsGenerator<GameWithObjects, string>((roomId) => `game-room:${roomId}`),
  gameSearch: redisUtilsGenerator<{ userId: string; timestamp: number }, string>(
    (searchId) => `game-search:${searchId}`,
  ),
  userActiveGame: redisUtilsGenerator<string, string>((userId) => `${userId}-active-game`),
};

export const socketKeys = {
  gameRoom: (roomId: string) => `game-room:${roomId}`,
};

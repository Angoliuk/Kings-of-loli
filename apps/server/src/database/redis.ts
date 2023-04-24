import Redis, { RedisOptions } from 'ioredis';

import { environmentConfigs } from '../configs';

export const REDIS_CONFIG: RedisOptions = {
  host: environmentConfigs.redisHost,
  port: Number.parseInt(environmentConfigs.redisPort),
  db: Number.parseInt(environmentConfigs.redisDB),
};

export const redisClient = new Redis(REDIS_CONFIG);
redisClient.on('connect', () => console.log('🚀 Redis client connected...'));
redisClient.on('error', (error) => console.error('Redis Client error:', '\n', error));

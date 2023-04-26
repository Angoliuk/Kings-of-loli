import Redis from 'ioredis';

import { environmentConfigs } from '../configs';

export const redisClient = new Redis(environmentConfigs.redisUri);
redisClient.on('connect', () => console.log('🚀 Redis client connected...'));
redisClient.on('error', (error) => console.error('Redis Client error:', '\n', error));

import Redis from 'ioredis';

export const redisClient = new Redis(process.env.REDIS_DATABASE_URL);
redisClient.on('connect', () => console.log('🚀 Redis client connected...'));
redisClient.on('error', (error) => console.error('Redis Client error:', '\n', error));

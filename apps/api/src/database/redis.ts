import Redis from 'ioredis';

const connectRedis = () => {
  const redis = new Redis(process.env.REDIS_DATABASE_URL, {
    lazyConnect: true,
    retryStrategy: () => 500,
  });
  redis.on('connect', () => console.log('🚀 Redis client connected...'));
  redis.on('error', (error) => {
    console.error('Redis Client error:', '\n', error);
    throw new Error('Redis error');
  });
  return redis;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const redisClient = connectRedis()!;

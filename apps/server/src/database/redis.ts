import Redis from 'ioredis';

// for some reasons process.env.REDIS_DATABASE_URL can be undefined,
// event if we provided one, so this function just trying to reconnect until success
const connectRedis = () => {
  if (!process.env.REDIS_DATABASE_URL) {
    console.warn('no REDIS_DATABASE_URL found, retrying');
    setTimeout(connectRedis, 10);
    return;
  }
  const redis = new Redis(process.env.REDIS_DATABASE_URL);
  redis.on('connect', () => console.log('🚀 Redis client connected...'));
  redis.on('error', (error) => console.error('Redis Client error:', '\n', error));

  return redis;
};

export const redisClient = connectRedis();

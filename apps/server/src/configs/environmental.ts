import path from 'node:path';

import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const environmentConfigs = {
  dbUri: process.env.DATABASE_URL ?? '',
  env: process.env.NODE_ENV ?? 'development',
  backendPort: process.env.PORT ?? '5520',
  frontendUri: process.env.ORIGIN ?? 'http://localhost:3000',
  accessTokenExpiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES_IN),
  refreshTokenExpiresIn: Number(process.env.REFRESH_TOKEN_EXPIRES_IN),
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY ?? '',
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY ?? '',
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY ?? '',
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY ?? '',
  redisCacheExpiresIn: Number(process.env.REDIS_CACHE_EXPIRES_IN),
};
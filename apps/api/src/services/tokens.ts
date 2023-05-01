import { type EnvironmentVariablesKeys } from '@api/configs';
import { prisma, redisClient } from '@api/database';
import type { User } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import jwt, { type SignOptions } from 'jsonwebtoken';

import { exclude } from './exclude';

export const signJwt = (
  payload: Record<string, unknown>,
  key: EnvironmentVariablesKeys['ACCESS_TOKEN_PRIVATE_KEY'] | EnvironmentVariablesKeys['REFRESH_TOKEN_PRIVATE_KEY'],
  options: SignOptions = {},
) => {
  const tokenKey = process.env[key];
  if (!tokenKey) throw new Error('Can`t find key in env');
  const privateKey = Buffer.from(tokenKey, 'base64').toString('ascii');

  return jwt.sign(payload, privateKey, { ...options, algorithm: 'HS256' });
};

export const verifyJwt = <T>(
  token: string,
  key: EnvironmentVariablesKeys['ACCESS_TOKEN_PRIVATE_KEY'] | EnvironmentVariablesKeys['REFRESH_TOKEN_PRIVATE_KEY'],
) => {
  try {
    const tokenKey = process.env[key];
    if (!tokenKey) throw new Error('Can`t find key in env');
    const publicKey = Buffer.from(tokenKey, 'base64').toString('ascii');
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const signTokens = async (user: Omit<User, 'password'>) => {
  await redisClient.set(`${user.id}`, JSON.stringify(user), 'EX', Number(process.env.REDIS_CACHE_EXPIRES_IN) * 60);
  const access_token = signJwt({ sub: user.id }, 'ACCESS_TOKEN_PRIVATE_KEY', {
    expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}m`,
  });

  const refresh_token = signJwt({ sub: user.id }, 'REFRESH_TOKEN_PRIVATE_KEY', {
    expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES_IN}m`,
  });

  return { access_token, refresh_token };
};

export const getHeaderUser = async ({ req }: CreateExpressContextOptions) => {
  try {
    const { access_token } = req.cookies as { access_token?: string };

    if (typeof access_token !== 'string') {
      return;
    }

    const decoded = verifyJwt<{ sub: string }>(access_token, 'ACCESS_TOKEN_PRIVATE_KEY');
    if (!decoded) {
      return;
    }

    const redisSession = await redisClient.get(decoded.sub);
    const session = redisSession ? (JSON.parse(redisSession) as Omit<User, 'password'>) : undefined;
    if (!session) {
      return;
    }
    const user = await prisma.user.findUnique({ where: { id: session.id } });

    if (!user) {
      return;
    }

    return exclude(user, ['password']);
  } catch {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'unknown error',
    });
  }
};

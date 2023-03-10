import type { User } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import jwt, { SignOptions } from 'jsonwebtoken';

import { environmentConfigs } from '../configs';
import { prisma, redisClient } from '../database';
import { exclude } from '.';

export const signJwt = (
  payload: Record<string, unknown>,
  key: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions = {},
) => {
  const tokenKey = environmentConfigs[key];
  if (!tokenKey) throw new Error('Can`t find key in env');
  const privateKey = Buffer.from(tokenKey, 'base64').toString('ascii');
  return jwt.sign(payload, privateKey, {
    ...options,
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
  token: string,
  key: 'accessTokenPublicKey' | 'refreshTokenPublicKey',
) => {
  try {
    const tokenKey = environmentConfigs[key];
    if (!tokenKey) throw new Error('Can`t find key in env');
    const publicKey = Buffer.from(tokenKey, 'base64').toString('ascii');
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const signTokens = async (user: Omit<User, 'password'>) => {
  await redisClient.set(`${user.id}`, JSON.stringify(user), {
    EX: environmentConfigs.redisCacheExpiresIn * 60,
  });

  const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
    expiresIn: `${environmentConfigs.accessTokenExpiresIn}m`,
  });

  const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
    expiresIn: `${environmentConfigs.refreshTokenExpiresIn}m`,
  });

  return { access_token, refresh_token };
};

export const getHeaderUser = async ({ req }: CreateExpressContextOptions) => {
  try {
    const { access_token: cookiesAccessToken } = req.cookies as { access_token?: string };

    let access_token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (cookiesAccessToken) {
      access_token = cookiesAccessToken;
    }

    if (!access_token) {
      return;
    }

    const decoded = verifyJwt<{ sub: string }>(access_token, 'accessTokenPublicKey');

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

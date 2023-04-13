import { User } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import * as argon from 'argon2';
import { z } from 'zod';

import {
  accessTokenCookieOptions,
  environmentConfigs,
  refreshTokenCookieOptions,
} from '../../configs';
import { redisClient } from '../../database';
import { exclude, signJwt, signTokens, verifyJwt } from '../../services';
import { protectedProcedure, publicProcedure, router } from '../../trpc/trpc';

const loginInput = z.object({
  password: z.string().min(6).max(256),
  name: z.string().min(1).max(256),
});

const registerInput = z.object({
  password: z.string().min(6).max(256),
  name: z.string().min(1).max(256),
});

const authRouter = router({
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
  login: publicProcedure.input(loginInput).mutation(async ({ ctx, input: { name, password } }) => {
    const user = await ctx.prisma.user.findUnique({ where: { name } });
    if (!user || !(await argon.verify(user.password, password))) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid name or password',
      });
    }

    const { access_token, refresh_token } = await signTokens(user);
    ctx.res.cookie('access_token', access_token, accessTokenCookieOptions);
    ctx.res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    ctx.res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    return {
      user: exclude(user, ['password']),
      access_token,
    };
  }),
  logout: protectedProcedure.mutation(async ({ ctx }) => {
    const user = ctx.user;
    if (!user?.id) return false;
    await redisClient.del(user.id.toString());
    ctx.res.cookie('access_token', '', { maxAge: -1 });
    ctx.res.cookie('refresh_token', '', { maxAge: -1 });
    ctx.res.cookie('logged_in', '', {
      maxAge: -1,
    });
    return true;
  }),
  refreshToken: publicProcedure.mutation(async ({ ctx }) => {
    const { refresh_token } = ctx.req.cookies as { refresh_token?: string };

    const message = 'Could not refresh access token';
    if (!refresh_token) {
      throw new TRPCError({ code: 'FORBIDDEN', message });
    }

    const decoded = verifyJwt<{ sub: string }>(refresh_token, 'refreshTokenPrivateKey');

    if (!decoded) {
      throw new TRPCError({ code: 'FORBIDDEN', message });
    }

    const redisSession = await redisClient.get(decoded.sub);
    const session = redisSession ? (JSON.parse(redisSession) as Omit<User, 'password'>) : undefined;
    if (!session) {
      throw new TRPCError({ code: 'FORBIDDEN', message });
    }

    const user = await ctx.prisma.user.findUnique({ where: { id: session.id } });

    if (!user) {
      throw new TRPCError({ code: 'FORBIDDEN', message });
    }

    const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
      expiresIn: `${environmentConfigs.accessTokenExpiresIn} m`,
    });

    ctx.res.cookie('access_token', access_token, accessTokenCookieOptions);
    ctx.res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    return {
      user,
      access_token,
    };
  }),
  register: publicProcedure
    .input(registerInput)
    .mutation(async ({ input: { name, password }, ctx }) => {
      const newUser = await ctx.prisma.user.create({
        data: {
          name: name.trim(),
          password: await argon.hash(password),
        },
      });
      return newUser;
    }),
});

export { authRouter, loginInput, registerInput };

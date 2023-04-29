import type { CookieOptions } from 'express';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
};

const accessTokenCookieOptions: CookieOptions = {
  ...cookieOptions,
  secure: process.env.NODE_ENV === 'production',
  expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRES_IN) * 60 * 1000),
};

const refreshTokenCookieOptions: CookieOptions = {
  ...cookieOptions,
  expires: new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRES_IN) * 60 * 10_000),
};

export { accessTokenCookieOptions, cookieOptions, refreshTokenCookieOptions };

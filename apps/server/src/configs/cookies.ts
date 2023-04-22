import type { CookieOptions } from 'express';

import { environmentConfigs } from './environmental';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: environmentConfigs.env === 'production',
  sameSite: 'lax',
};

const accessTokenCookieOptions: CookieOptions = {
  ...cookieOptions,
  secure: environmentConfigs.env === 'production',
  expires: new Date(Date.now() + Number(environmentConfigs.accessTokenExpiresIn) * 60 * 1000),
};

const refreshTokenCookieOptions: CookieOptions = {
  ...cookieOptions,
  expires: new Date(Date.now() + Number(environmentConfigs.refreshTokenExpiresIn) * 60 * 10_000),
};

export { accessTokenCookieOptions, cookieOptions, refreshTokenCookieOptions };

import * as dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config({ path: './.api.env' });

const environmentVariables = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.string(),
  API_PORT: z.string(),
  REDIS_DATABASE_URL: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
  ACCESS_TOKEN_PRIVATE_KEY: z.string(),
  ACCESS_TOKEN_PUBLIC_KEY: z.string(),
  REFRESH_TOKEN_PRIVATE_KEY: z.string(),
  REFRESH_TOKEN_PUBLIC_KEY: z.string(),
  REDIS_CACHE_EXPIRES_IN: z.string(),
});

environmentVariables.parse(process.env);

const environmentVariablesKeysEnum = environmentVariables.keyof().enum;
export type EnvironmentVariablesKeys = typeof environmentVariablesKeysEnum;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, unicorn/prevent-abbreviations
    interface ProcessEnv extends z.infer<typeof environmentVariables> {}
  }
}

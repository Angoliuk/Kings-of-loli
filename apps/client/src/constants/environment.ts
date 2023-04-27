import { z } from 'zod';

const environmentVariables = z.object({
  API_URL: z.string(),
  FRONTEND_PORT: z.string(),
});

environmentVariables.parse(import.meta.env);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, unicorn/prevent-abbreviations
    interface ProcessEnv extends z.infer<typeof environmentVariables> {}
  }
}

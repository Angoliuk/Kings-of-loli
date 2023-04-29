import dotenv from 'dotenv';
import { z } from 'zod';

const environmentVariablesSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_FRONTEND_PORT: z.string(),
  VITE_ENV: z.string(),
});
// Yes, i know, i'm clown

const dotenvVariables = dotenv.config({
  path: '../../.web.env',
}).parsed;
export const environmentalVariables = (
  dotenvVariables?.VITE_ENV === 'dev'
    ? dotenvVariables
    : {
        VITE_FRONTEND_PORT: '3000',
        VITE_API_URL: 'https://backend-65ls.onrender.com/trpc',
        VITE_ENV: 'production',
      }
) as z.infer<typeof environmentVariablesSchema>;

environmentVariablesSchema.parse(environmentalVariables);

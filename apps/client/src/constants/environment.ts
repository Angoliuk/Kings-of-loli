import { z } from 'zod';

const environmentVariablesSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_FRONTEND_PORT: z.string(),
  VITE_ENV: z.string(),
});

// Yes, i know, i'm clown
export const environmentalVariables = (
  import.meta.env.mode === 'dev'
    ? import.meta.env
    : {
        VITE_FRONTEND_PORT: '3000',
        VITE_API_URL: 'https://backend-65ls.onrender.com/trpc',
        VITE_ENV: 'production',
      }
) as z.infer<typeof environmentVariablesSchema>;

environmentVariablesSchema.parse(environmentalVariables);

import { z } from 'zod';

const environmentVariablesSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_FRONTEND_PORT: z.string(),
  VITE_SOCKET_URL: z.string(),
});

environmentVariablesSchema.parse(import.meta.env);

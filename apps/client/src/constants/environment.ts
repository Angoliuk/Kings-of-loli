import dotenv from 'dotenv';
import { z } from 'zod';

const environmentVariablesSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_FRONTEND_PORT: z.string(),
});
// Yes, i know, i'm clown
export const environmentalVariables = (dotenv.config({
  path: '../../.web.env',
}).parsed ?? {
  VITE_FRONTEND_PORT: '3000',
  VITE_API_URL: 'https://backend-65ls.onrender.com/trpc',
}) as z.infer<typeof environmentVariablesSchema>;

environmentVariablesSchema.parse(environmentalVariables);

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }: { mode: string }) => {
  const environments = loadEnv(mode, process.cwd());
  return defineConfig({
    server: {
      host: '0.0.0.0',
      port: Number(environments.VITE_FRONTEND_PORT),
      hmr: {
        host: 'localhost',
      },
      watch: {
        usePolling: true,
      },
    },
    plugins: [
      react({
        include: '**/*.tsx',
      }),
    ],
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
  });
};

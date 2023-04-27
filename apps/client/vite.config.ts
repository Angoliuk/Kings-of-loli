import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const environment = loadEnv(mode, process.cwd());

  return defineConfig({
    server: {
      host: '0.0.0.0',
      port: Number(environment.VITE_FRONTEND_PORT),
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

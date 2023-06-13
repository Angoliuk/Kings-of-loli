/* eslint-disable unicorn/prefer-module */
import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }: { mode: string }) => {
  const environments = loadEnv(mode, process.cwd());
  return defineConfig({
    resolve: {
      alias: {
        '@web': path.resolve(__dirname, './src'),
        '@api/middlewares': path.resolve(__dirname, '../api/src/middlewares'),
        '@api/database': path.resolve(__dirname, '../api/src/database'),
        '@api/services': path.resolve(__dirname, '../api/src/services'),
        '@api/configs': path.resolve(__dirname, '../api/src/configs'),
        '@api/interfaces': path.resolve(__dirname, '../api/src/interfaces'),
        '@api/modules': path.resolve(__dirname, '../api/src/modules'),
        '@api/trpc': path.resolve(__dirname, '../api/src/trpc/trpc'),
        '@api/TRPC': path.resolve(__dirname, '../api/src/trpc'),
      },
    },
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

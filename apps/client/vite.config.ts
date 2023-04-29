import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { environmentalVariables } from './src/constants/environment';

export default () => {
  return defineConfig({
    server: {
      host: '0.0.0.0',
      port: Number(environmentalVariables.VITE_FRONTEND_PORT),
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

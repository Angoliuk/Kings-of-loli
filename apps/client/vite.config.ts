import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: Number(process.env.FRONTEND_PORT),
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

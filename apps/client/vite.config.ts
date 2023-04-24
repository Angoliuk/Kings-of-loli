import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
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

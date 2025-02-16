import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import viteCompress from 'vite-plugin-compression2';
import { app as expressApp } from './src/server';

export default defineConfig({
  plugins: [
    react(),
    viteCompress({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/, /index\.html$/],
      deleteOriginalAssets: false
    }),
    {
      name: 'integrate-express',
      configureServer(server) {
        server.middlewares.use(expressApp);
      }
    }
  ],
  build: {
    outDir: 'dist/client',
    sourcemap: true,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    host: true
  }
});
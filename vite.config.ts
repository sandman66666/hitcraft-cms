import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import viteCompress from 'vite-plugin-compression2';

export default defineConfig({
  plugins: [
    react(),
    viteCompress({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/, /index\.html$/],
      deleteOriginalAssets: false
    })
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
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
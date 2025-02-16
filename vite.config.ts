import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from "path";
import compression from 'vite-plugin-compression2';
import { app as expressApp } from './src/server';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const API_URL = env.VITE_API_URL || 'http://localhost:5177';

  return {
    plugins: [
      react(),
      compression({
        algorithm: 'gzip',
        exclude: [/\.(br)$/, /\.(gz)$/],
        deleteOriginalAssets: true
      }),
      {
        name: 'integrate-express',
        configureServer(server) {
          server.middlewares.use(expressApp);
        }
      }
    ],
    server: {
      port: 5177,
      proxy: {
        '/api': {
          target: API_URL,
          changeOrigin: true,
          secure: false
        }
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    build: {
      outDir: 'dist',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            utils: ['@/contexts/AuthContext'],
            ui: ['lucide-react', 'react-hot-toast']
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      },
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      sourcemap: false
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom']
    }
  };
});
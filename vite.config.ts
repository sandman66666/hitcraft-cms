import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    // Gzip compression
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false
    }),
    // Brotli compression for better ratios
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false
    })
  ],
  server: {
    port: 5174,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Optimize chunk size
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          utils: ['@/contexts/AuthContext'],
          ui: ['lucide-react', 'react-hot-toast'],
          routing: ['react-router-dom'],
          styles: ['./src/styles/**/*.css']
        },
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name;
          if (name.includes('style')) {
            return 'assets/css/[name]-[hash].css';
          }
          return 'assets/js/[name]-[hash].js';
        },
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({name}) => {
          if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[ext]/[name]-[hash][extname]';
        }
      }
    },
    // Asset handling
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
    // Enhanced cache optimization
    modulePreload: {
      polyfill: true
    }
  },
  // Optimize dev experience
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
});

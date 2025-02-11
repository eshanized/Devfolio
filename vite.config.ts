import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],

    // Base public path when served in development or production
    base: '/devfolio/',

    // Directory to serve as plain static assets
    publicDir: 'public',

    // Configure resolver
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },

    // Development specific config
    server: {
      open: true,
      hmr: true,
      port: 3000,
      cors: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    // Build specific config
    build: {
      outDir: 'dist',
      cssCodeSplit: true,
      reportCompressedSize: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'animation-vendor': ['framer-motion'],
            'i18n-vendor': ['i18next', 'react-i18next'],
          },
        },
      },
      sourcemap: true,
    },

    // CSS preprocessing
    css: {
      postcss: './postcss.config.js',
      devSourcemap: true,
    },

    // Dependency optimization options
    optimizeDeps: {
      exclude: ['lucide-react'],
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    },

    // Preview specific config
    preview: {
      port: 4000,
      open: true,
    },

    // Enable/disable detailed output
    logLevel: 'info',
  };
});
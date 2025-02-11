import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import type { UserConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }): UserConfig => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  const isDev = command === 'serve';
  return {
    plugins: [react()],
    base: isDev ? '/' : '/devfolio/',
    publicDir: 'public',

    resolve: {
      alias: [
        { find: '@', replacement: resolve(__dirname, './src') },
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },

    server: {
      open: true,
      hmr: {
        overlay: true,
      },
      port: 3000,
      cors: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
          },
        },
      },
    },

    build: {
      outDir: 'dist',
      cssCodeSplit: false,
      reportCompressedSize: true,
      sourcemap: isDev,
      minify: 'esbuild',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          // GitHub Pages friendly output
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]'
        },
      },
    },

    css: {
      postcss: './postcss.config.js',
      devSourcemap: isDev,
    },

    optimizeDeps: {
      exclude: ['lucide-react'],
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'framer-motion',
        'i18next',
        'react-i18next'
      ],
      esbuildOptions: {
        target: 'esnext',
      },
    },

    preview: {
      port: 4000,
      open: true,
      cors: true,
    },

    logLevel: isDev ? 'info' : 'warn',

    esbuild: {
      jsxInject: `import React from 'react'`,
      // Drop console.log in production
      drop: command === 'build' ? ['console'] : [],
    },
  };
});
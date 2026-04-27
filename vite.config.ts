import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.vert', '**/*.frag'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          framer: ['framer-motion'],
          gsap: ['gsap', '@gsap/react'],
          react: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          i18n: ['i18next', 'react-i18next'],
        },
      },
    },
  },
});

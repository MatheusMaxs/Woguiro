import path from 'node:path';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import critters from 'critters';

function crittersPlugin(): Plugin {
  return {
    name: 'critters',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler: async (html) => {
        try {
          return await critters(html, { path: 'dist/index.html', pruneSource: true });
        } catch {
          return html;
        }
      },
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    crittersPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['fonts/*.woff2'],
      manifest: {
        name: 'Woguiro',
        short_name: 'Woguiro',
        description: 'Portfolio de Woguiro — Fotografia, Video, Marcas e Conteudo',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        display: 'standalone',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2,svg,ico}'],
        runtimeCaching: [
          {
            urlPattern: /\.(?:webp|png|jpg|jpeg|avif|mp4)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'media-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.vert', '**/*.frag'],
  build: {
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        manualChunks: {
          framer: ['framer-motion'],
          gsap: ['gsap', '@gsap/react'],
          react: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          i18n: ['i18next', 'react-i18next'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
});

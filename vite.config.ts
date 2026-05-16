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
            urlPattern: /\.(?:webp|png|jpg|jpeg|avif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: { maxEntries: 150, maxAgeSeconds: 60 * 24 * 60 * 60 },
            },
          },
          {
            urlPattern: /\.(?:mp4)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'video-cache',
              expiration: { maxEntries: 30, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
          {
            urlPattern: /\/fonts\/.*\.woff2$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'font-cache',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 24 * 60 * 60 },
            },
          },
        ],
        navigationPreload: true,
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
          gsap: ['gsap'],
          react: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
});

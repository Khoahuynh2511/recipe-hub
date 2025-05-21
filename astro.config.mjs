import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import prefetch from '@astrojs/prefetch';
import { VitePWA } from 'vite-plugin-pwa';

// https://astro.build/config
export default defineConfig({
  site: 'https://recipe-hub.netlify.app',
  output: 'server',
  integrations: [
    tailwind(),
    sitemap(),
    prefetch(),
  ],
  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Recipe Hub',
          short_name: 'RecipeHub',
          description: 'Find and save food recipes and cocktail drinks',
          theme_color: '#38a169',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: '/icons/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/icons/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/icons/icon-512x512-maskable.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          navigateFallback: '/index.html',
          globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,webp}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/www\.themealdb\.com\/api\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'mealdb-api-cache',
                expiration: {
                  maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
                },
              },
            },
            {
              urlPattern: /^https:\/\/www\.thecocktaildb\.com\/api\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'cocktaildb-api-cache',
                expiration: {
                  maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
                },
              },
            },
            {
              urlPattern: /^https:\/\/tasty\.co\/api\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'tasty-api-cache',
                expiration: {
                  maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
                },
              },
            },
            {
              urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg|webp)$/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'image-cache',
                expiration: {
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                  maxEntries: 100,
                },
              },
            },
          ],
        },
      }),
    ],
  },
}); 
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import prefetch from '@astrojs/prefetch';
import { VitePWA } from 'vite-plugin-pwa';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://recipe-hub.netlify.app',
  output: 'server',
  adapter: netlify({
    // Cấu hình Netlify adapter
    edgeMiddleware: true // Cho phép Edge Functions
  }),
  // Những trang dùng dynamic routing cần server-side rendering
  // Nếu không cần phức tạp, có thể để tất cả đều là static
  prefetch: {
    defaultStrategy: 'hover'
  },
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
          name: 'RecipeHub',
          short_name: 'RecipeHub',
          description: 'Ứng dụng khám phá và quản lý công thức nấu ăn',
          theme_color: '#38a169',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: '/icons/logo.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
            }
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
        // Tùy chọn thêm: đảm bảo service-worker hoạt động ngay cả trong môi trường dev
        devOptions: {
          enabled: true
        }
      }),
    ],
  },
}); 
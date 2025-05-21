// Tệp service-worker tạm thời cho môi trường phát triển
// Sẽ được thay thế bằng tệp đầy đủ khi build cho production

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Không thực hiện bất kỳ hành động cache nào trong môi trường phát triển
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
}); 
const CACHE_NAME = 'art-engine-v1';
const urlsToCache = [
  '/art-engine-generator/',
  '/art-engine-generator/index.html',
  '/art-engine-generator/style.css',
  '/art-engine-generator/script.js',
  '/art-engine-generator/icon-192.png',
  '/art-engine-generator/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Cacheando archivos...');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('❌ Error al cachear:', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch(err => console.error('❌ Error en fetch:', err))
  );
});

self.addEventListener('activate', event => {
  console.log('✅ Service Worker activado');
});

var cacheName = 'memedex-sw-v1.0';

var filesToCache = [
  '/',
  '/favicon.ico',
  '/index.html',
  '/manifest.json',
  '/css/app.min.css',
  '/js/vendor.min.js',
  '/js/app.min.js',
  '/img/pickle-rick.jpg',
  '/img/icon-search.png',
  '/img/icon-72x72.png',
  '/img/icon-96x96.png',
  '/img/icon-128x128.png',
  '/img/icon-144x144.png',
  '/img/icon-152x152.png',
  '/img/icon-192x192.png',
  '/img/icon-384x384.png',
  '/img/icon-512x512.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
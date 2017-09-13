var cacheName = 'memedex-sw-v1';

var filesToCache = [
  '/',
  '/favicon.ico',
  '/manifest.json',
  '/index.html',
  '/css/vendor.min.css',
  '/css/app.min.css',
  '/js/vendor.min.js',
  '/js/app.min.js',
  '/img/icon-72x72.png',
  '/img/icon-96x96.png',
  '/img/icon-128x128.png',
  '/img/icon-144x144.png',
  '/img/icon-152x152.png',
  '/img/icon-192x192.png',
  '/img/icon-384x384.png',
  '/img/icon-512x512.png',
];
/*
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
        if (key !== cacheName && key !== dataCacheName) {
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
*/

self.addEventListener('push', function(event) {
  var data = (event.data && (event.data.json()).data) || {};
  console.log(data)
  var title = data.title || 'Notificacion';
  var options = {
    body: data.body || 'Tienes un mensaje nuevo',
    icon: 'img/icon-192x192.png',
    badge: 'img/icon-72x72.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      includeUncontrolled: true,
      type: 'window'
    })
    .then( activeClients => {
      if (activeClients.length > 0) {
        activeClients[0].focus();
      } else {
        clients.openWindow("<%= URL_WINDOW %>");
      }
    })
  );
});



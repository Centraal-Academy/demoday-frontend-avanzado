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



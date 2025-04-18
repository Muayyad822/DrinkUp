// Version tracking for cache management
const CACHE_VERSION = 'v1';
const CACHE_NAME = `drinkup-${CACHE_VERSION}`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/water-drop.png'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Clean up old caches
      caches.keys().then(keys => Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      ))
    ])
  );
});

// Handle background notifications
self.addEventListener('push', (event) => {
  let notification = {};
  
  try {
    notification = event.data.json();
  } catch {
    notification = {
      title: 'DrinkUp 💧',
      body: 'Hey Teniola, time to drink some water!',
      icon: '/water-drop.png',
      badge: '/water-drop.png',
      timestamp: Date.now()
    };
  }

  const options = {
    body: notification.body,
    icon: notification.icon,
    badge: notification.badge,
    vibrate: [200, 100, 200],
    tag: 'water-reminder',
    renotify: true,
    data: {
      url: self.location.origin,
      timestamp: notification.timestamp
    },
    actions: [
      {
        action: 'open',
        title: 'Open App'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(notification.title, options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(windowClients => {
        // If a window client is available, focus it
        for (let client of windowClients) {
          if (client.url === event.notification.data.url && 'focus' in client) {
            return client.focus();
          }
        }
        // If no window client, open new window
        if (self.clients.openWindow) {
          return self.clients.openWindow(event.notification.data.url);
        }
      })
  );
});


self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim())
})

self.addEventListener('push', (event) => {
  const options = {
    body: 'Hey Teniola, time to drink some water!',
    icon: '/water-drop.png',
    badge: '/water-drop.png',
    vibrate: [200, 100, 200],
    tag: 'water-reminder',
    renotify: true
  }

  event.waitUntil(
    self.registration.showNotification('DrinkUp 💧', options)
  )
})
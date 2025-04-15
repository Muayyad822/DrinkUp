import { useEffect } from 'react'

export default function useNotifications() {
  useEffect(() => {
    const requestAndRegisterNotifications = async () => {
      try {
        // Check if the browser supports notifications
        if (!('Notification' in window)) {
          console.log('This browser does not support notifications')
          return
        }

        // Check if service worker is supported
        if (!('serviceWorker' in navigator)) {
          console.log('Service Worker is not supported')
          return
        }

        // Request permission
        const permission = await Notification.requestPermission()
        
        if (permission !== 'granted') {
          console.log('Notification permission not granted')
          return
        }

        // Register service worker for notifications
        const registration = await navigator.serviceWorker.register('/notification-worker.js')
        
        const notificationTimes = ['8:00', '11:00', '14:00', '17:00', '20:00']
        
        const checkTime = () => {
          const now = new Date()
          const currentTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
          
          if (notificationTimes.includes(currentTime)) {
            // Try both service worker and regular notification
            if (registration.showNotification) {
              registration.showNotification('DrinkUp 💧', {
                body: 'Hey Teniola, time to drink some water!',
                icon: '/water-drop.png',
                badge: '/water-drop.png',
                vibrate: [200, 100, 200],
                tag: 'water-reminder',
                renotify: true
              })
            } else {
              new Notification('DrinkUp 💧', {
                body: 'Hey Teniola, time to drink some water!',
                icon: '/water-drop.png'
              })
            }
          }
        }

        const timeInterval = setInterval(checkTime, 60000)
        return () => clearInterval(timeInterval)

      } catch (error) {
        console.error('Error setting up notifications:', error)
      }
    }

    requestAndRegisterNotifications()
  }, [])
}

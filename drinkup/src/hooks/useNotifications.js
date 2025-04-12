import { useEffect } from 'react'

export default function useNotifications() {
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission()
    }

    const notificationTimes = ['8:00', '11:00', '14:00', '17:00', '20:00']
    
    const checkTime = () => {
      const now = new Date()
      const currentTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
      
      if (notificationTimes.includes(currentTime)) {
        new Notification('DrinkUp 💧', {
          body: 'Hey Teniola, time to drink some water!'
        })
      }
    }

    const timeInterval = setInterval(checkTime, 60000)
    return () => clearInterval(timeInterval)
  }, [])
}
import { useEffect } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export default function useNotifications() {
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        if (!('Notification' in window) || !('serviceWorker' in navigator)) {
          console.log('Push notifications not supported');
          return;
        }
 
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          console.log('Notification permission denied');
          return;
        }

        // Register service worker with immediate claim
        const registration = await navigator.serviceWorker.register('/notification-worker.js', {
          scope: '/',
          updateViaCache: 'none'
        });

        // Ensure the service worker is activated
        if (registration.active) {
          await registration.update();
        }

        // Get existing subscription or create new one
        let subscription = await registration.pushManager.getSubscription();

        if (!subscription) {
          const response = await fetch(`${BACKEND_URL}/api/vapid-public-key`);
          const { publicKey } = await response.json();
          
          const convertedVapidKey = urlBase64ToUint8Array(publicKey);
          
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey
          });

          // Save subscription to backend
          await fetch(`${BACKEND_URL}/api/save-subscription`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscription)
          });
          
          console.log('Push notification subscription successful');
        }
      } catch (error) {
        console.error('Error setting up push notifications:', error);
      }
    };

    setupNotifications();
  }, []);
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}





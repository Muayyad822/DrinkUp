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

        console.log('Registering service worker...');
        // Wait for any existing service worker to become activated
        await navigator.serviceWorker.ready;
        
        const registration = await navigator.serviceWorker.register('/notification-worker.js', {
          scope: '/',
          type: 'module'
        });

        // Wait for the service worker to be ready
        await navigator.serviceWorker.ready;

        console.log('Service worker registered');

        // Get existing subscription or create new one
        let subscription = await registration.pushManager.getSubscription();
        console.log('Existing subscription:', subscription);

        if (!subscription) {
          console.log('Fetching VAPID public key...');
          const response = await fetch(`${BACKEND_URL}/api/vapid-public-key`);
          const { publicKey } = await response.json();
          
          const convertedVapidKey = urlBase64ToUint8Array(publicKey);
          
          console.log('Creating new subscription...');
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey
          });

          console.log('New subscription created, sending to backend...');
          const saveResponse = await fetch(`${BACKEND_URL}/api/save-subscription`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscription)
          });
          
          const saveResult = await saveResponse.json();
          console.log('Save subscription response:', saveResult);
        }
      } catch (error) {
        console.error('Notification setup error:', error);
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








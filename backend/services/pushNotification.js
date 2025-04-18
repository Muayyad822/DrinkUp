import webpush from 'web-push';
import { createPayload } from '../config/notifications.js';

export class PushNotificationService {
  constructor() {
    this.subscriptions = new Set();
    this.vapidDetails = { 
      subject: `mailto:${process.env.VAPID_EMAIL}`,
      publicKey: process.env.VAPID_PUBLIC_KEY,
      privateKey: process.env.VAPID_PRIVATE_KEY
    };
  }

  addSubscription(subscription) {
    this.subscriptions.add(JSON.stringify(subscription));
    return this.subscriptions.size;
  }

  async sendNotifications(time) {
    console.log(`Sending notifications at ${time}`);
    const payload = JSON.stringify(createPayload());
    const invalidSubscriptions = new Set();

    const pushOptions = {
      vapidDetails: this.vapidDetails,
      TTL: 60 * 60, // 1 hour
      urgency: 'high',
      topic: 'water-reminder'
    };

    for (const subString of this.subscriptions) {
      try {
        const subscription = JSON.parse(subString);
        await webpush.sendNotification(subscription, payload, pushOptions);
      } catch (error) {
        console.error('Error sending notification:', error);
        if (error.statusCode === 404 || error.statusCode === 410) {
          invalidSubscriptions.add(subString);
        }
      }
    }

    this.removeInvalidSubscriptions(invalidSubscriptions);
  }

  removeInvalidSubscriptions(invalidSubscriptions) {
    invalidSubscriptions.forEach(sub => {
      this.subscriptions.delete(sub);
    });

    if (invalidSubscriptions.size > 0) {
      console.log(`Removed ${invalidSubscriptions.size} invalid subscriptions`);
      console.log('Remaining subscriptions:', this.subscriptions.size);
    }
  }
}

export const pushNotificationService = new PushNotificationService();

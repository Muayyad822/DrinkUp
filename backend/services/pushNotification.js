import webpush from 'web-push';
import fs from 'fs/promises';
import path from 'path';

export class PushNotificationService {
  constructor() {
    this.subscriptions = new Set();
    this.subscriptionsFile = path.join(process.cwd(), 'subscriptions.json');
    this.loadSubscriptions();
    this.vapidDetails = { 
      subject: `mailto:${process.env.VAPID_EMAIL}`,
      publicKey: process.env.VAPID_PUBLIC_KEY,
      privateKey: process.env.VAPID_PRIVATE_KEY
    };
  }

  async loadSubscriptions() {
    try {
      const data = await fs.readFile(this.subscriptionsFile, 'utf8');
      const subs = JSON.parse(data);
      this.subscriptions = new Set(subs);
      console.log(`Loaded ${this.subscriptions.size} subscriptions`);
    } catch (error) {
      console.log('No existing subscriptions found');
      this.subscriptions = new Set();
    }
  }

  async saveSubscriptions() {
    try {
      await fs.writeFile(
        this.subscriptionsFile,
        JSON.stringify([...this.subscriptions])
      );
    } catch (error) {
      console.error('Error saving subscriptions:', error);
    }
  }

  async addSubscription(subscription) {
    this.subscriptions.add(JSON.stringify(subscription));
    await this.saveSubscriptions();
    return this.subscriptions.size;
  }

  async sendCustomNotification(notificationData) {
    const payload = JSON.stringify({
      title: notificationData.title || 'DrinkUp 💧',
      body: notificationData.body || 'Time to drink some water!',
      icon: notificationData.icon || '/assets/water-drop.png',
      timestamp: Date.now()
    });

    const pushOptions = {
      vapidDetails: this.vapidDetails,
      TTL: 60 * 60,
      urgency: 'high',
      topic: 'water-reminder'
    };

    const invalidSubscriptions = new Set();
    const successCount = { success: 0, failed: 0 };

    for (const subString of this.subscriptions) {
      try {
        const subscription = JSON.parse(subString);
        await webpush.sendNotification(subscription, payload, pushOptions);
        successCount.success++;
        console.log('Successfully sent notification to:', subscription.endpoint);
      } catch (error) {
        successCount.failed++;
        console.error('Failed to send notification:', {
          statusCode: error.statusCode,
          message: error.message
        });
        if (error.statusCode === 404 || error.statusCode === 410) {
          invalidSubscriptions.add(subString);
        }
      }
    }

    if (invalidSubscriptions.size > 0) {
      await this.removeInvalidSubscriptions(invalidSubscriptions);
    }

    return successCount;
  }

  async removeInvalidSubscriptions(invalidSubscriptions) {
    invalidSubscriptions.forEach(sub => {
      this.subscriptions.delete(sub);
    });

    await this.saveSubscriptions();

    if (invalidSubscriptions.size > 0) {
      console.log(`Removed ${invalidSubscriptions.size} invalid subscriptions`);
      console.log('Remaining subscriptions:', this.subscriptions.size);
    }
  }
}

export const pushNotificationService = new PushNotificationService();




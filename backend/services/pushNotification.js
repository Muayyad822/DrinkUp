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
      if (Array.isArray(subs)) {
        this.subscriptions = new Set(subs);
      } else {
        this.subscriptions = new Set();
      }
      console.log(`Loaded ${this.subscriptions.size} subscriptions`);
    } catch (error) {
      console.log('No existing subscriptions found, creating new storage');
      this.subscriptions = new Set();
      // Create the file with an empty array
      await this.saveSubscriptions();
    }
  }

  async saveSubscriptions() {
    try {
      const subscriptionsArray = Array.from(this.subscriptions);
      await fs.writeFile(
        this.subscriptionsFile,
        JSON.stringify(subscriptionsArray, null, 2)
      );
      console.log(`Saved ${this.subscriptions.size} subscriptions`);
    } catch (error) {
      console.error('Error saving subscriptions:', error);
    }
  }

  async addSubscription(subscription) {
    // Convert subscription to string for storage
    const subscriptionString = JSON.stringify(subscription);
    
    // Add to Set (Set ensures uniqueness)
    this.subscriptions.add(subscriptionString);
    
    // Save to file
    await this.saveSubscriptions();
    
    console.log(`Added new subscription. Total: ${this.subscriptions.size}`);
    return this.subscriptions.size;
  }

  async sendCustomNotification(notificationData) {
    if (this.subscriptions.size === 0) {
      console.log('No subscriptions found. Attempting to reload...');
      await this.loadSubscriptions();
    }

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
          message: error.message,
          endpoint: JSON.parse(subString).endpoint
        });
        if (error.statusCode === 404 || error.statusCode === 410) {
          invalidSubscriptions.add(subString);
        }
      }
    }

    if (invalidSubscriptions.size > 0) {
      console.log(`Removing ${invalidSubscriptions.size} invalid subscriptions`);
      invalidSubscriptions.forEach(sub => {
        this.subscriptions.delete(sub);
      });
      await this.saveSubscriptions();
    }

    return successCount;
  }
}

export const pushNotificationService = new PushNotificationService();


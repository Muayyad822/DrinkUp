import express from 'express';
import { pushNotificationService } from '../services/pushNotification.js';

const router = express.Router();

router.get('/vapid-public-key', (req, res) => {
  res.json({ publicKey: process.env.VAPID_PUBLIC_KEY });
});

router.post('/save-subscription', (req, res) => {
  try {
    const subscription = req.body;
    const totalSubscriptions = pushNotificationService.addSubscription(subscription);
    res.status(201).json({ message: 'Subscription saved' });
    console.log('New subscription saved. Total subscriptions:', totalSubscriptions);
  } catch (error) {
    console.error('Error saving subscription:', error);
    res.status(500).json({ error: 'Subscription failed' });
  }
});

export default router;

import express from 'express';
import webpush from 'web-push';
import cors from 'cors';
import cron from 'node-cron';
import dotenv from 'dotenv';
import { notificationTimes } from './config/notifications.js';
import { pushNotificationService } from './services/pushNotification.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: [
    'https://drink-up-nine.vercel.app',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL}`,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// Existing endpoints
app.get('/api/vapid-public-key', (req, res) => {
  res.json({ publicKey: process.env.VAPID_PUBLIC_KEY });
});

app.post('/api/save-subscription', async (req, res) => {
  try {
    const subscription = req.body;
    const count = await pushNotificationService.addSubscription(subscription);
    res.status(201).json({ 
      message: 'Subscription saved',
      totalSubscriptions: count 
    });
  } catch (error) {
    console.error('Error saving subscription:', error);
    res.status(500).json({ error: 'Subscription failed' });
  }
});

// New endpoint for manual notification testing
app.post('/api/send-notification', async (req, res) => {
  try {
    const notificationData = {
      title: req.body.title,
      body: req.body.body,
      icon: req.body.icon
    };

    const result = await pushNotificationService.sendCustomNotification(notificationData);
    
    res.json({ 
      message: 'Notifications sent',
      results: result
    });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).json({ error: 'Failed to send notifications' });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'DrinkUp API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

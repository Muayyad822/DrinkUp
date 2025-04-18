import express from 'express';
import webpush from 'web-push';
import cors from 'cors';
import cron from 'node-cron';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { notificationTimes } from './config/notifications.js';
import { pushNotificationService } from './services/pushNotification.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Configure web-push
webpush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL}`,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// API Routes
app.get('/api/vapid-public-key', (req, res) => {
  res.json({ publicKey: process.env.VAPID_PUBLIC_KEY });
});

app.post('/api/save-subscription', (req, res) => {
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

// Serve static files from the React app
app.use(express.static(join(__dirname, '../drinkup/dist')));

// Schedule notifications
notificationTimes.forEach(time => {
  const [hours, minutes] = time.split(':');
  cron.schedule(`${minutes} ${hours} * * *`, () => {
    pushNotificationService.sendNotifications(time);
  });
});

// The catch-all route should be last
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../drinkup/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Notification times:', notificationTimes);
});

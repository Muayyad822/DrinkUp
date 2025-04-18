import express from 'express';
import webpush from 'web-push';
import cors from 'cors';
import cron from 'node-cron';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { notificationTimes } from './config/notifications.js';
import { pushNotificationService } from './services/pushNotification.js';
import notificationRoutes from './routes/notifications.js';

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
app.use('/api', notificationRoutes);

// Serve static files from the React app
app.use(express.static(join(__dirname, '../drinkup/dist')));

// Schedule notifications
notificationTimes.forEach(time => {
  const [hours, minutes] = time.split(':');
  cron.schedule(`${minutes} ${hours} * * *`, () => {
    pushNotificationService.sendNotifications(time);
  });
});

// Catch-all route to serve the React app
app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, '../drinkup/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Notification times:', notificationTimes);
});

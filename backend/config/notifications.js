export const notificationTimes = [
  '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
  '19:00', '20:00', '21:00', '22:00'
];

export const createPayload = () => ({
  title: 'DrinkUp 💧',
  body: 'Hey Teniola, time to drink some water!',
  icon: '/water-drop.png', // Update path
  badge: '/water-drop.png', // Update path
  timestamp: Date.now()
});
 


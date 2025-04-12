export default function AchievementBadges({ streak, intake, goal, onClose }) {
  const badges = [
    {
      id: 'streak-3',
      icon: '🌟',
      title: '3 Day Streak',
      description: 'Stayed hydrated for 3 days in a row',
      earned: streak >= 3,
    },
    {
      id: 'streak-7',
      icon: '👑',
      title: 'Weekly Queen',
      description: 'A whole week of consistent hydration',
      earned: streak >= 7,
    },
    {
      id: 'perfect-day',
      icon: '💎',
      title: 'Perfect Day',
      description: 'Reached your daily water goal',
      earned: intake >= goal,
    },
    {
      id: 'early-bird',
      icon: '🌅',
      title: 'Early Bird',
      description: 'Started hydrating before 10 AM',
      earned: new Date().getHours() < 10 && intake > 0,
    },
    {
      id: 'consistency',
      icon: '✨',
      title: 'Consistency Queen',
      description: 'Logged water intake 5 times in one day',
      earned: streak >= 5,
    }
  ]

  const earnedCount = badges.filter(badge => badge.earned).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96 max-w-[90%] mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Your Achievements ✨
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <div className="text-center mb-4">
          <p className="text-pink-500">
            {earnedCount} of {badges.length} badges earned
          </p>
          <div className="h-2 bg-gray-200 rounded-full mt-2">
            <div 
              className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full transition-all duration-500"
              style={{ width: `${(earnedCount / badges.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl transition-all duration-300 ${
                badge.earned 
                  ? 'bg-gradient-to-r from-pink-50 to-purple-50' 
                  : 'bg-gray-50 opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <h3 className={`font-medium ${
                    badge.earned ? 'text-pink-600' : 'text-gray-400'
                  }`}>
                    {badge.title}
                  </h3>
                  <p className="text-sm text-gray-500">{badge.description}</p>
                </div>
                {badge.earned && (
                  <span className="ml-auto text-pink-500">✓</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

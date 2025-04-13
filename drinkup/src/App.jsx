import { useState, useEffect } from 'react'
import Greeting from './components/Greeting'
import ProgressBar from './components/ProgressBar'
import IntakeDisplay from './components/IntakeDisplay'
import WaterButtons from './components/WaterButtons'
import Celebration from './components/Celebration'
import Streak from './components/Streak'
import CustomGoal from './components/CustomGoal'
import Motivation from './components/Motivation'
import AchievementBadges from './components/AchievementBadges'
import DailyTip from './components/DailyTip'
import Onboarding from './components/Onboarding'
import useWaterIntake from './hooks/useWaterIntake'
import useNotifications from './hooks/useNotifications'

function App() {
  const [showGoalSetter, setShowGoalSetter] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)
  const [showDailyTip, setShowDailyTip] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(true)
  
  const { 
    intake, 
    showCelebration, 
    addWater, 
    streak,
    dailyGoal,
    setDailyGoal 
  } = useWaterIntake()
  useNotifications()

  // Show daily tip when app loads
  useEffect(() => {
    const lastTipDate = localStorage.getItem('lastTipDate')
    const today = new Date().toDateString()
    
    if (lastTipDate !== today) {
      setShowDailyTip(true)
      localStorage.setItem('lastTipDate', today)
    }
  }, [])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    setShowDailyTip(true)
  }

  return (
    <>
      {showOnboarding ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <>
          {showDailyTip && (
            <DailyTip onClose={() => setShowDailyTip(false)} />
          )}
          
          <div className="min-h-[100vh] w-full bg-gradient-to-b from-blue-800 to-blue-950 flex items-center justify-center p-3 sm:p-6">
            <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-3xl shadow-xl p-4 sm:p-8 border border-blue-200">
              <div className="flex justify-between items-center mb-3 sm:mb-6">
                <Greeting name="Teniola" />
                <button
                  onClick={() => setShowAchievements(true)}
                  className="p-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 
                           text-blue-600 hover:text-blue-700 transition"
                >
                  🏆
                </button>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <Motivation intake={intake} goal={dailyGoal} />
                <Streak days={streak} />
                <ProgressBar 
                  current={intake} 
                  goal={dailyGoal}
                  className="bg-gradient-to-r from-blue-500 to-pink-500" 
                />
                <IntakeDisplay current={intake} goal={dailyGoal} />
                <WaterButtons onAddWater={addWater} />
                <button
                  onClick={() => setShowGoalSetter(true)}
                  className="w-full text-blue-600 text-sm py-2 hover:text-blue-700 transition"
                >
                  ✨ Customize your daily goal ✨
                </button>
              </div>
              
              <Celebration show={showCelebration} />
              
              {/* Modals */}
              {showGoalSetter && (
                <div className="fixed inset-0 bg-blue-950/50 flex items-center justify-center p-3 sm:p-6 z-50">
                  <CustomGoal 
                    currentGoal={dailyGoal}
                    onSave={(newGoal) => {
                      setDailyGoal(newGoal)
                      setShowGoalSetter(false)
                    }}
                    onClose={() => setShowGoalSetter(false)}
                  />
                </div>
              )}
              
              {showAchievements && (
                <div className="fixed inset-0 bg-blue-950/50 flex items-center justify-center p-3 sm:p-6 z-50">
                  <AchievementBadges 
                    streak={streak} 
                    intake={intake} 
                    goal={dailyGoal}
                    onClose={() => setShowAchievements(false)}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default App
















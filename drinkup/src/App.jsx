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
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(
    localStorage.getItem('hasCompletedOnboarding') === 'true'
  )
  
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
    
    if (lastTipDate !== today && hasCompletedOnboarding) {
      setShowDailyTip(true)
      localStorage.setItem('lastTipDate', today)
    }
  }, [hasCompletedOnboarding])

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true)
    localStorage.setItem('hasCompletedOnboarding', 'true')
    setShowDailyTip(true) // Show tip after onboarding
  }

  return (
    <>
      {!hasCompletedOnboarding && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      
      {showDailyTip && (
        <DailyTip onClose={() => setShowDailyTip(false)} />
      )}
      
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 px-3 py-4 sm:p-6">
        <div className="max-w-md mx-auto bg-white/80 backdrop-blur rounded-3xl shadow-lg p-4 sm:p-8 border border-pink-100">
          <div className="flex justify-between items-center mb-3 sm:mb-6">
            <Greeting name="Teniola" />
            <button
              onClick={() => setShowAchievements(true)}
              className="p-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 
                       text-pink-500 hover:text-pink-600 transition"
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
              className="bg-gradient-to-r from-pink-400 to-purple-400" 
            />
            <IntakeDisplay current={intake} goal={dailyGoal} />
            <WaterButtons onAddWater={addWater} />
            <button
              onClick={() => setShowGoalSetter(true)}
              className="w-full text-pink-500 text-sm py-2 hover:text-pink-600 transition"
            >
              ✨ Customize your daily goal ✨
            </button>
          </div>
          
          <Celebration show={showCelebration} />
          
          {/* Modals */}
          {showGoalSetter && (
            <CustomGoal 
              currentGoal={dailyGoal}
              onSave={(newGoal) => {
                setDailyGoal(newGoal)
                setShowGoalSetter(false)
              }}
              onClose={() => setShowGoalSetter(false)}
            />
          )}
          
          {showAchievements && (
            <AchievementBadges 
              streak={streak} 
              intake={intake} 
              goal={dailyGoal}
              onClose={() => setShowAchievements(false)}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default App










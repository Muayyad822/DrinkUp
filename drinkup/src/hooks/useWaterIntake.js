import { useState, useEffect } from 'react'

export default function useWaterIntake(initialGoal = 3000) {
  const [intake, setIntake] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [streak, setStreak] = useState(0)
  const [dailyGoal, setDailyGoal] = useState(initialGoal)
  const [lastCompletedDate, setLastCompletedDate] = useState(null)

  // Load saved data
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('drinkup')) || {}
    const today = new Date().toDateString()

    if (savedData.date === today) {
      setIntake(savedData.intake || 0)
      setDailyGoal(savedData.dailyGoal || initialGoal)
      setStreak(savedData.streak || 0)
      setLastCompletedDate(savedData.lastCompletedDate)
    } else {
      // Check if streak should be reset
      if (lastCompletedDate) {
        const lastDate = new Date(lastCompletedDate)
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        
        if (lastDate.toDateString() !== yesterday.toDateString()) {
          setStreak(0)
        }
      }
      setIntake(0)
      
      // Save new day's initial state
      localStorage.setItem('drinkup', JSON.stringify({
        date: today,
        intake: 0,
        dailyGoal,
        streak,
        lastCompletedDate
      }))
    }
  }, [])

  // Save data and handle celebration
  useEffect(() => {
    const today = new Date().toDateString()
    
    localStorage.setItem('drinkup', JSON.stringify({
      date: today,
      intake,
      dailyGoal,
      streak,
      lastCompletedDate
    }))

    if (intake >= dailyGoal && !showCelebration) {
      setShowCelebration(true)
      if (!lastCompletedDate || lastCompletedDate !== today) {
        setStreak(s => s + 1)
        setLastCompletedDate(today)
      }
    }
  }, [intake, dailyGoal, streak, showCelebration, lastCompletedDate])

  const addWater = (amount) => {
    setIntake(prev => Math.min(prev + amount, dailyGoal))
  }

  return { 
    intake, 
    showCelebration, 
    addWater, 
    streak,
    dailyGoal,
    setDailyGoal
  }
}



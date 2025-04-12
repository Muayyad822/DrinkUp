import { useState, useEffect } from 'react'

export default function Motivation({ intake, goal }) {
  const [quote, setQuote] = useState('')
  
  const quotes = [
    "You're doing amazing! Every sip counts! 💖",
    "Stay gorgeous and hydrated! ✨",
    "Water is your superpower! 💫",
    "You're glowing from the inside out! 💝",
    "Self-care queen in action! 👑",
    "Healthy habits, happy life! 🌸",
    "You're taking such good care of yourself! 🎀"
  ]

  const getMotivationalMessage = () => {
    const progress = (intake / goal) * 100
    if (progress < 25) return "Let's start this beautiful day with some water! 💕"
    if (progress < 50) return "You're doing great! Keep going! 🌺"
    if (progress < 75) return "More than halfway there! So proud of you! 💝"
    if (progress < 100) return "Almost there, beautiful! You've got this! ✨"
    return "You're absolutely amazing! Goal achieved! 👑"
  }

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
  }, [intake])

  return (
    <div className="mb-6 space-y-3">
      <div className="text-center text-pink-500 font-medium animate-pulse">
        {getMotivationalMessage()}
      </div>
      <div className="text-center text-sm text-purple-500 italic">
        {quote}
      </div>
    </div>
  )
}
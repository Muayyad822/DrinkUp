import { useState } from 'react'

export default function Onboarding({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Welcome to DrinkUp! 💖",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Dear Teniola,
          </p>
          <p className="text-gray-600 leading-relaxed">
            I made this app specially for you because I care about your well-being. 
            I know you're working hard to stay healthy and hydrated, and I want to 
            make that journey a bit more fun and exciting for you! 
          </p>
          <p className="text-gray-600 leading-relaxed">
            This is your personal hydration companion that will help you track your 
            water intake with style and motivation. 💫
          </p>
          <p className="text-gray-600 leading-relaxed">
            With care,<br/>
            Muayyad 
          </p>
        </div>
      )
    },
    {
      title: "Your Hydration Journey 🌸",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Here's what makes DrinkUp special:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-pink-500">✨</span> 
              Daily personalized motivation
            </li>
            <li className="flex items-center gap-2">
              <span className="text-pink-500">🏆</span> 
              Achievement badges to celebrate your progress
            </li>
            <li className="flex items-center gap-2">
              <span className="text-pink-500">💝</span> 
              Cute reminders throughout the day
            </li>
            <li className="flex items-center gap-2">
              <span className="text-pink-500">👑</span> 
              Streak tracking to keep you motivated
            </li>
          </ul>
        </div>
      )
    },
    {
      title: "Ready to Begin? 🌟",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Remember, staying hydrated is an act of self-love. I'm here to make 
            this journey beautiful and enjoyable for you.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Let's start this wonderful journey together! 
          </p>
        </div>
      )
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-pink-100 to-purple-100 flex items-center justify-center p-3 sm:p-6 z-50">
      <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl p-4 sm:p-8 max-w-md w-full">
        <div className="space-y-4 sm:space-y-6">
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-6 sm:mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? 'bg-pink-500 w-4' 
                    : 'bg-pink-200'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <h1 className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            {steps[currentStep].title}
          </h1>
          
          <div className="min-h-[180px] sm:min-h-[200px] text-sm sm:text-base">
            {steps[currentStep].content}
          </div>

          {/* Navigation */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleNext}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-pink-400 to-purple-400 
                       text-white rounded-full font-medium shadow-lg 
                       hover:shadow-xl transition-all duration-300 
                       hover:scale-105 text-sm sm:text-base"
            >
              {currentStep === steps.length - 1 ? "Let's Begin! 💖" : "Continue ✨"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

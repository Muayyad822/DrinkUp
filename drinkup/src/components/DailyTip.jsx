import { useState } from 'react'

export default function DailyTip({ onClose }) {
  const tips = [
    "Try adding fresh lemon or berries to make your water more exciting! 🍋",
    "Keep a cute water bottle with you as a fashion accessory! 💅",
    "Set reminders that make you smile - it's self-care time! 💖",
    "Drinking water helps your skin glow naturally! ✨",
    "Take a sip every time you check your phone! 📱",
    "Room temperature water is actually better for you! 🌡️",
    "Match your water intake with your outfit - both should be fabulous! 👗"
  ]

  const todaysTip = tips[new Date().getDay()]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 m-4 max-w-md w-full 
                    shadow-xl transform animate-slide-up">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-200 to-purple-200 
                        rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✨</span>
          </div>
          
          <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 
                       bg-clip-text text-transparent">
            Daily Tip
          </h3>
          
          <p className="text-gray-600 leading-relaxed">
            {todaysTip}
          </p>
          
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-pink-400 to-purple-400 
                     text-white rounded-full font-medium shadow-lg 
                     hover:shadow-xl transition-all duration-300 
                     hover:scale-105"
          >
            Got it! 💖
          </button>
        </div>
      </div>
    </div>
  )
}

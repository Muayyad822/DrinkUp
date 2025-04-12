import { useState } from 'react'

export default function WaterButtons({ onAddWater }) {
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customAmount, setCustomAmount] = useState('')
  const presetAmounts = [100, 200, 300]

  const handleCustomSubmit = (e) => {
    e.preventDefault()
    if (customAmount) {
      onAddWater(Number(customAmount))
      setCustomAmount('')
      setShowCustomInput(false)
    }
  }

  return (
    <div className="space-y-3 mb-4 sm:mb-6">
      <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-3 sm:justify-center">
        {presetAmounts.map(amount => (
          <button
            key={amount}
            onClick={() => onAddWater(amount)}
            className="px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-400 to-purple-400 
                     text-white rounded-full hover:opacity-90 transition
                     shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                     text-sm sm:text-base"
          >
            +{amount}ml
          </button>
        ))}
      </div>
      
      {showCustomInput ? (
        <form onSubmit={handleCustomSubmit} className="flex gap-2">
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Enter ml..."
            className="flex-1 px-4 py-2 rounded-full border border-pink-200 
                     focus:outline-none focus:border-pink-400
                     text-sm sm:text-base"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-pink-400 text-white rounded-full 
                     hover:bg-pink-500 transition
                     text-sm sm:text-base"
          >
            Add
          </button>
        </form>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={() => setShowCustomInput(true)}
            className="px-4 py-2 bg-gradient-to-r from-pink-300 to-purple-300 
                     text-pink-600 rounded-full hover:from-pink-400 hover:to-purple-400 
                     hover:text-white transition shadow-md hover:shadow-lg 
                     transform hover:-translate-y-0.5
                     text-sm sm:text-base"
          >
            Custom Amount
          </button>
        </div>
      )}
    </div>
  )
}


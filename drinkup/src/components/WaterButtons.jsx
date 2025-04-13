import { useState } from 'react'

export default function WaterButtons({ onAddWater }) {
  const [customAmount, setCustomAmount] = useState('')
  const presetAmounts = [100, 250, 500]

  const handleCustomSubmit = (e) => {
    e.preventDefault()
    const amount = parseInt(customAmount)
    if (amount > 0) {
      onAddWater(amount)
      setCustomAmount('')
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {presetAmounts.map(amount => (
          <button
            key={amount}
            onClick={() => onAddWater(amount)}
            className="px-2 py-3 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 
                     text-white rounded-full hover:opacity-90 transition
                     shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                     text-sm sm:text-base flex items-center justify-center"
          >
            <span className="whitespace-nowrap">+{amount}ml</span>
          </button>
        ))}
      </div>
      
      <form onSubmit={handleCustomSubmit} className="flex gap-2">
        <input
          type="number"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          placeholder="Custom amount..."
          className="flex-1 px-4 py-2 rounded-full border border-blue-200 
                   focus:outline-none focus:border-blue-400 text-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700
                   text-white rounded-full hover:opacity-90 transition
                   shadow-md hover:shadow-lg text-sm"
        >
          Add
        </button>
      </form>
    </div>
  )
}






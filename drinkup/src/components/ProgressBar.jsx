export default function ProgressBar({ current, goal, className = '' }) {
  const progress = Math.min((current / goal) * 100, 100)

  return (
    <div className="w-full h-4 sm:h-6 bg-blue-100 rounded-full">
      <div 
        className={`h-full rounded-full transition-all duration-500 ${className}`}
        style={{ 
          width: `${progress}%`,
          background: className || 'linear-gradient(to right, #2563eb, #ec4899)'
        }}
      />
    </div>
  )
}




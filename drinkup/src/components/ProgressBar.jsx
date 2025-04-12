export default function ProgressBar({ current, goal, className = '' }) {
  const progress = Math.min((current / goal) * 100, 100)

  return (
    <div className="w-full h-6 bg-gray-200 rounded-full mb-6">
      <div 
        className={`h-full rounded-full transition-all duration-500 ${className}`}
        style={{ 
          width: `${progress}%`,
          background: className || 'linear-gradient(to right, #EC4899, #A855F7)'
        }}
      />
    </div>
  )
}

export default function IntakeDisplay({ current, goal }) {
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your progress for today?')) {
      localStorage.setItem('drinkup', JSON.stringify({
        date: new Date().toDateString(),
        intake: 0,
        dailyGoal: goal,
        streak: 0,
        lastCompletedDate: null
      }))
      window.location.reload()
    }
  }

  return (
    <div className="text-center mb-8 relative">
      <p className="text-2xl font-semibold text-gray-700">
        {current}ml / {goal}ml
      </p>
      <button
        onClick={handleReset}
        className="absolute -right-2 top-1/2 -translate-y-1/2 p-2 text-2xl text-gray-400 
                 hover:text-red-500 transition-colors duration-200"
        title="Reset today's progress"
      >
        ↺
      </button>
    </div>
  )
}

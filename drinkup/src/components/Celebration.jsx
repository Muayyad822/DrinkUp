export default function Celebration({ show }) {
  if (!show) return null

  return (
    <div className="text-center text-green-600 font-semibold animate-bounce">
      🎉 Amazing job! You've reached your daily goal! 🎉
    </div>
  )
}
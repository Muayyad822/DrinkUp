export default function Streak({ days }) {
  return (
    <div className="text-center mb-6">
      <div className="inline-block px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 
                    rounded-full text-pink-600 font-medium">
        🔥 {days} Day Streak
      </div>
    </div>
  )
}
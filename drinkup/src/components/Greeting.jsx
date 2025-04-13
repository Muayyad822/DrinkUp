export default function Greeting({ name }) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="text-left">
      <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
        {getGreeting()}, {name} 💖
      </h1>
      <p className="text-blue-600 text-xs sm:text-sm">Let's stay hydrated today!</p>
    </div>
  )
}





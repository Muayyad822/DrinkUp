export default function Greeting({ name }) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="text-center mb-4 sm:mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        {getGreeting()}, {name} 💖
      </h1>
      <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Let's stay hydrated today!</p>
    </div>
  )
}


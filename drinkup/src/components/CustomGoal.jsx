export default function CustomGoal({ currentGoal, onSave, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const newGoal = parseInt(e.target.goal.value)
    if (newGoal > 0) {
      onSave(newGoal)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-96 max-w-full mx-4">
        <h2 className="text-2xl font-bold text-pink-500 mb-4">
          Set Your Daily Goal ✨
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="goal"
            defaultValue={currentGoal}
            className="w-full px-4 py-2 rounded-full border border-pink-200 
                     focus:outline-none focus:border-pink-400 mb-4"
            placeholder="Enter goal in ml..."
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 
                       text-white rounded-full hover:opacity-90 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-pink-200 text-pink-500 
                       rounded-full hover:bg-pink-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
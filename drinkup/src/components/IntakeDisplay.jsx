export default function IntakeDisplay({ current, goal }) {
  return (
    <div className="text-center mb-8">
      <p className="text-2xl font-semibold text-gray-700">
        {current}ml / {goal}ml
      </p>
    </div>
  )
}
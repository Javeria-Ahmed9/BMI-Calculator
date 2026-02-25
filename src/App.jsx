import { useState } from 'react'

function getCategory(bmi) {
  if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-400' }
  if (bmi < 25) return { label: 'Normal', color: 'text-emerald-400' }
  if (bmi < 30) return { label: 'Overweight', color: 'text-amber-400' }
  return { label: 'Obese', color: 'text-red-400' }
}

export default function App() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState(null)

  function calculate() {
    if (!height || !weight) return
    const hMeters = parseFloat(height) * 0.3048
    const result = parseFloat((parseFloat(weight) / (hMeters * hMeters)).toFixed(1))
    setBmi(result)
    setHeight('')
    setWeight('')
  }

  const category = bmi ? getCategory(bmi) : null

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <p className="text-gray-600 text-xs uppercase tracking-widest mb-8 text-center">BMI Calculator</p>

        <div className="space-y-3 mb-6">
          <input
            type="number"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/25 placeholder:text-gray-600 transition-colors"
            placeholder="Height in feet"
            value={height}
            onChange={e => setHeight(e.target.value)}
          />
          <input
            type="number"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/25 placeholder:text-gray-600 transition-colors"
            placeholder="Weight in kg"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && calculate()}
          />
          <button
            onClick={calculate}
            className="w-full bg-white text-black py-3 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Calculate
          </button>
        </div>

        {bmi && (
          <div className="bg-white/3 border border-white/8 rounded-2xl p-6 text-center">
            <p className="text-5xl font-bold text-white mb-2">{bmi}</p>
            <p className="text-xs text-gray-600 mb-3">kg/m²</p>
            <span className={`text-sm font-medium ${category.color}`}>{category.label}</span>
          </div>
        )}
      </div>
    </div>
  )
}

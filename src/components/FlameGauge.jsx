import React from 'react'

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

export default function FlameGauge({ calories = 0, size = 88 }) {
  const pct = clamp(calories / 800, 0, 1) // assume 800 kcal as top of gauge
  const stroke = 10
  const radius = (size - stroke) / 2
  const circ = 2 * Math.PI * radius
  const dash = circ * pct

  // color from green -> orange -> red
  const hue = 120 - 120 * pct // 120 green to 0 red
  const color = `hsl(${hue}, 90%, 50%)`

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="drop-shadow-[0_0_10px_rgba(255,122,0,0.25)]">
        <defs>
          <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD580" stopOpacity="0.9"/>
            <stop offset="70%" stopColor="#FF7A00" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#1E1E1E" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={radius} fill="url(#flameGlow)"/>
        <circle cx={size/2} cy={size/2} r={radius} stroke="#2a2a2a" strokeWidth={stroke} fill="none" />
        <circle
          cx={size/2}
          cy={size/2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          fill="none"
          className="transition-all duration-700"
        />
        <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" className="fill-white text-sm font-semibold">
          {calories} kcal
        </text>
      </svg>
    </div>
  )
}

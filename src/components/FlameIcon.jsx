import React from 'react'

export default function FlameIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2s-2 3-2 5 1 3 1 3-3-1-5 2-1 7 3 9 9-1 10-6-2-8-4-9c0 2-1 3-2 3s-2-1-2-3 1-3 1-4z" stroke="#FFD580" strokeWidth="1.2"/>
      <path d="M12 8c-1 1-2 2-2 4 0 2 2 4 4 4 2 0 4-2 4-4 0-1.5-.7-2.7-1.5-3.6-.5 1-1.5 1.6-2.5 1.6-1.5 0-2.5-1-2.5-2.5 0-.7.2-1.3.6-1.8.3.8.9 1.9 2.5 2.3" fill="#FF7A00" opacity="0.5"/>
    </svg>
  )
}

import React from 'react'
import { motion } from 'framer-motion'
import FlameIcon from './FlameIcon'
import FlameGauge from './FlameGauge'

export default function RecipeCard({ recipe, onSave, onShare }) {
  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      className="bg-[#1E1E1E]/80 border border-white/10 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md"
    >
      {recipe.image_url && (
        <div className="relative h-48 w-full bg-black/30 overflow-hidden">
          <img src={recipe.image_url} alt={recipe.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-transparent"/>
        </div>
      )}
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 0.6 }}>
            <FlameIcon className="w-5 h-5" />
          </motion.div>
          <h3 className="text-white text-xl font-semibold">{recipe.title}</h3>
        </div>
        <p className="text-white/80 text-sm">{recipe.description}</p>
        <div className="flex items-center gap-6 pt-2">
          <div className="flex items-center gap-2 text-amber-300">
            <span className="text-sm">~ {recipe.time_minutes} min</span>
          </div>
          <FlameGauge calories={recipe.nutrition?.calories || 0} />
        </div>
        <div>
          <h4 className="text-white/90 font-medium mt-2 mb-1">Steps</h4>
          <ol className="list-decimal list-inside text-white/80 text-sm space-y-1">
            {recipe.steps?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={onSave} className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFD580] text-[#1E1E1E] font-semibold shadow-[0_0_20px_rgba(255,122,0,0.35)] hover:shadow-[0_0_28px_rgba(255,122,0,0.55)] transition-all">Save Recipe</button>
          <button onClick={onShare} className="px-4 py-2 rounded-full border border-white/20 text-white hover:border-white/40 transition-colors">Share</button>
        </div>
      </div>
    </motion.div>
  )
}

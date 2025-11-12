import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, Utensils, ChefHat, History } from 'lucide-react'
import RecipeCard from './components/RecipeCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function SparkParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(24)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 bg-amber-300 rounded-full shadow-[0_0_10px_#FF7A00]"
          initial={{opacity: 0, y: 0, x: Math.random()*600-300}}
          animate={{opacity: [0,1,0], y: -120 - Math.random()*80}}
          transition={{duration: 1 + Math.random(), ease: 'easeOut'}}
          style={{ left: `${50 + Math.random()*40-20}%`, bottom: 0 }}
        />
      ))}
    </div>
  )
}

function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#FFD580] text-[#1E1E1E] shadow-[0_0_24px_rgba(255,122,0,0.45)]">
          <Flame className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-white text-2xl font-bold tracking-tight">FlareChef</h1>
          <p className="text-white/70 text-xs">Turn your fridge into a feast — with a spark of AI.</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-white/80">
        <ChefHat className="w-5 h-5" />
        <Utensils className="w-5 h-5" />
        <History className="w-5 h-5" />
      </div>
    </div>
  )
}

export default function App() {
  const [ingredients, setIngredients] = useState('')
  const [loading, setLoading] = useState(false)
  const [recipe, setRecipe] = useState(null)
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)

  const placeholder = "What's cooking in your kitchen today?"

  async function ignite() {
    if (!ingredients.trim()) return
    setLoading(true)
    setRecipe(null)
    try {
      await new Promise(r => setTimeout(r, 450)) // small delay for burst animation
      const res = await fetch(`${API_BASE}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.detail || 'Failed to generate')
      setRecipe(data)
      const local = JSON.parse(localStorage.getItem('flarechef_history') || '[]')
      const next = [data, ...local].slice(0, 20)
      localStorage.setItem('flarechef_history', JSON.stringify(next))
      setHistory(next)
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function saveRecipe() {
    if (!recipe) return
    try {
      const res = await fetch(`${API_BASE}/api/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.detail || 'Failed to save')
      alert('Saved to your sparks!')
    } catch (e) {
      alert(e.message)
    }
  }

  function shareRecipe() {
    if (!recipe) return
    const text = `🔥 ${recipe.title}\n${recipe.description}\nIngredients: ${recipe.ingredients.join(', ')}\nSteps: ${recipe.steps.join(' > ')}`
    if (navigator.share) {
      navigator.share({ title: 'FlareChef Recipe', text })
    } else {
      navigator.clipboard.writeText(text)
      alert('Copied to clipboard!')
    }
  }

  React.useEffect(() => {
    const local = JSON.parse(localStorage.getItem('flarechef_history') || '[]')
    setHistory(local)
  }, [])

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Header />

        <div className="mt-8 grid gap-6">
          <div className="relative rounded-2xl p-1 bg-gradient-to-br from-[#FF7A00]/50 via-[#FFD580]/40 to-transparent">
            <div className="rounded-2xl bg-[#1E1E1E]/90 border border-white/10 p-6">
              <label className="block text-sm text-white/70 mb-2">Ingredients</label>
              <div className="relative">
                <input
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder={placeholder}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none text-white placeholder:italic placeholder:text-white/40 focus:ring-2 focus:ring-[#FF7A00]/60 shadow-[0_0_20px_rgba(255,122,0,0.15)]"
                />
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-xl"
                  animate={{ boxShadow: ingredients ? ['0 0 0 rgba(0,0,0,0)', '0 0 24px rgba(255,122,0,0.25)', '0 0 0 rgba(0,0,0,0)'] : '0 0 0 rgba(0,0,0,0)' }}
                  transition={{ duration: 1.2, repeat: ingredients ? Infinity : 0 }}
                />
              </div>
              <div className="flex items-center gap-3 mt-4">
                <motion.button
                  whileHover={{ boxShadow: '0 0 24px rgba(255,122,0,0.55)', scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={ignite}
                  className="relative inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFD580] text-[#1E1E1E] font-semibold"
                >
                  <Flame className="w-5 h-5" />
                  Ignite Recipe
                  <AnimatePresence>
                    {loading && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                      >
                        <SparkParticles />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
                <button
                  onClick={() => setShowHistory(v => !v)}
                  className="px-4 py-3 rounded-full border border-white/20 text-white hover:border-white/40"
                >
                  Your Recipe Sparks
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {recipe && (
              <RecipeCard
                key={recipe.title}
                recipe={recipe}
                onSave={saveRecipe}
                onShare={shareRecipe}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="space-y-3"
              >
                <h3 className="text-white/90 font-semibold">Your Recipe Sparks</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {history.map((r, idx) => (
                    <RecipeCard
                      key={idx}
                      recipe={r}
                      onSave={() => setRecipe(r)}
                      onShare={() => {
                        const text = `🔥 ${r.title}\n${r.description}`
                        navigator.clipboard.writeText(text)
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

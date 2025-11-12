import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import FoodCard from './components/FoodCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [seeding, setSeeding] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    // Ensure we have some data to show
    const seed = async () => {
      try {
        await fetch(`${API_BASE}/api/foods/seed`, { method: 'POST' })
      } catch (e) {
        console.warn('Seed failed or not needed', e)
      } finally {
        setSeeding(false)
        fetchFoods('')
      }
    }
    seed()
  }, [])

  const fetchFoods = async (q) => {
    setLoading(true)
    try {
      const url = new URL(`${API_BASE}/api/foods`)
      if (q) url.searchParams.set('q', q)
      url.searchParams.set('limit', '48')
      const res = await fetch(url.toString())
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      console.error(e)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  const onSearch = (q) => {
    setQuery(q)
    fetchFoods(q)
  }

  const title = query ? `Results for "${query}"` : 'Featured foods'

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-rose-50">
      <Hero />

      <main className="max-w-6xl mx-auto px-6 pb-28 -mt-10">
        <div className="relative z-20">
          <SearchBar onSearch={onSearch} />
        </div>

        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-rose-600">{title}</h2>
              <p className="text-sm text-gray-500 mt-1">Explore nutrition, best times to eat, benefits and more.</p>
            </div>
          </div>

          <div className="mt-6">
            {loading || seeding ? (
              <p className="text-center text-gray-500">Loading foods...</p>
            ) : items.length === 0 ? (
              <p className="text-center text-gray-500">No results. Try searching for "apple", "oats", or "turmeric".</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <FoodCard key={item.id || item.name} item={item} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Long, colorful info section to extend page and add visual interest */}
        <section className="mt-16">
          <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 border border-gray-200">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">How to use NutriFinder</h3>
            <p className="mt-2 text-gray-600 max-w-3xl">Search any food or ingredient to see calories, macros, glycemic index, best time to eat, and potential benefits. Use this as guidance, not medical advice.</p>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white/80 backdrop-blur border border-emerald-100 p-5">
                <p className="text-sm font-medium text-emerald-700">Goal-based picks</p>
                <p className="mt-1 text-sm text-gray-600">Filter by goals like heart health, anti-inflammatory, or sustained energy.</p>
              </div>
              <div className="rounded-2xl bg-white/80 backdrop-blur border border-blue-100 p-5">
                <p className="text-sm font-medium text-blue-700">Timing guidance</p>
                <p className="mt-1 text-sm text-gray-600">See when foods tend to work best: morning, pre-workout, or evening.</p>
              </div>
              <div className="rounded-2xl bg-white/80 backdrop-blur border border-purple-100 p-5">
                <p className="text-sm font-medium text-purple-700">Evidence snapshot</p>
                <p className="mt-1 text-sm text-gray-600">Quick notes based on nutrition references to guide your choices.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white/60 backdrop-blur py-8 text-center text-sm text-gray-600">
        Built with love for healthier choices.
      </footer>
    </div>
  )
}

export default App

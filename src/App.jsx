import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import FoodCard from './components/FoodCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    // initial load
    fetchFoods('')
  }, [])

  const fetchFoods = async (q) => {
    setLoading(true)
    try {
      const url = new URL(`${API_BASE}/api/foods`)
      if (q) url.searchParams.set('q', q)
      url.searchParams.set('limit', '24')
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

  return (
    <div className="min-h-screen bg-white">
      <Hero />

      <main className="max-w-6xl mx-auto px-6 pb-20 -mt-10">
        <div className="relative z-20">
          <SearchBar onSearch={onSearch} />
        </div>

        <div className="mt-8">
          {loading ? (
            <p className="text-center text-gray-500">Loading foods...</p>
          ) : items.length === 0 ? (
            <p className="text-center text-gray-500">No results yet. Try searching for "apple", "oats", or "turmeric".</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <FoodCard key={item.id || item.name} item={item} />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t py-8 text-center text-sm text-gray-500">
        Built with love for healthier choices.
      </footer>
    </div>
  )
}

export default App

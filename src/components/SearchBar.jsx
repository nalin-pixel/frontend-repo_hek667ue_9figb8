import { useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch(q)
  }

  return (
    <form onSubmit={submit} className="relative max-w-xl w-full" id="search">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search foods or ingredients..."
        className="w-full rounded-xl border border-gray-200 bg-white/70 backdrop-blur px-5 py-3 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
        <Search className="h-5 w-5" />
      </button>
    </form>
  )
}

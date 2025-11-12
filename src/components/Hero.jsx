import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/mWY-FNsBVpRvZHS5/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-pink-700 text-sm mb-4">
          <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
          Live nutrition intelligence
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-500 to-blue-600">
          NutriFinder
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl">
          Explore evidence-based insights for foods and ingredients: nutrition facts, best times to eat, and who benefits most.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a href="#search" className="px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
            Search foods
          </a>
          <a href="/test" className="px-5 py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-black/80 transition-colors">
            Check backend
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
    </section>
  )
}

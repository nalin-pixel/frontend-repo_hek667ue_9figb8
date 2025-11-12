export default function FoodCard({ item }) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
          {item.category && (
            <p className="text-sm text-gray-500 mt-1">{item.category}</p>
          )}
        </div>
        {item.calories != null && (
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">{Math.round(item.calories)}</p>
            <p className="text-xs text-gray-500 -mt-1">kcal</p>
          </div>
        )}
      </div>

      {item.macros && Object.keys(item.macros).length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-2 text-sm">
          {['protein','carbs','fat','fiber'].map((k) => (
            <div key={k} className="rounded-lg bg-gray-50 p-2 text-center">
              <p className="font-medium text-gray-700">{k}</p>
              <p className="text-gray-900">{item.macros?.[k] ?? '-'} g</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
        {item.best_time_to_eat && (
          <div className="rounded-lg bg-blue-50 text-blue-800 p-3">
            <p className="font-medium">Best time</p>
            <p>{item.best_time_to_eat}</p>
          </div>
        )}
        {item.glycemic_index != null && (
          <div className="rounded-lg bg-amber-50 text-amber-800 p-3">
            <p className="font-medium">Glycemic index</p>
            <p>{item.glycemic_index}</p>
          </div>
        )}
      </div>

      {item.benefits && item.benefits.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700">Benefits</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {item.benefits.slice(0,6).map((b, i) => (
              <span key={i} className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs">
                {b}
              </span>
            ))}
          </div>
        </div>
      )}

      {item.conditions_helped && item.conditions_helped.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700">May help</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {item.conditions_helped.slice(0,6).map((b, i) => (
              <span key={i} className="inline-flex items-center rounded-full bg-purple-50 text-purple-700 px-3 py-1 text-xs">
                {b}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

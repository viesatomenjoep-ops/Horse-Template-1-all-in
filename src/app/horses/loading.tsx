import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-baseline border-b border-gray-200 dark:border-gray-800 pb-6 mb-8">
        <h1 className="text-4xl font-serif font-bold tracking-tight text-primary">The Collection</h1>
      </div>

      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="group relative animate-pulse">
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 dark:bg-gray-800 lg:aspect-none lg:h-80 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
            </div>
            <div className="mt-4 flex justify-between">
              <div className="w-2/3">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

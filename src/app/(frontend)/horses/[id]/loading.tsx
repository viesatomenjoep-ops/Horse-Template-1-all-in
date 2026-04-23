import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="bg-gray-50 dark:bg-[#0A192F] min-h-screen animate-pulse">
      {/* Hero Skeleton */}
      <div className="w-full h-[50vh] min-h-[400px] lg:h-[70vh] bg-gray-300 dark:bg-gray-800 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
      </div>

      {/* Content Layout Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12 xl:gap-16">
          
          {/* Main Details (Left/Middle) Skeleton */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Quick Stats Grid Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-gray-200 dark:border-gray-800">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              ))}
            </div>

            {/* Pedigree Skeleton */}
            <div>
              <div className="h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
              <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-xl" />
            </div>

            {/* Description Skeleton */}
            <div className="space-y-4">
              <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            </div>
          </div>

          {/* Sticky Inquiry Panel Skeleton */}
          <div className="mt-12 lg:mt-0">
            <div className="h-64 bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  )
}

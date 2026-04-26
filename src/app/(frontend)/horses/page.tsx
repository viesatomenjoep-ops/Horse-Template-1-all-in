import { getPublicHorses } from '@/app/actions/horse'
import Link from 'next/link'

export default async function CollectionPage() {
  // Try to fetch horses. If Supabase is not connected yet, we'll gracefully handle it.
  let horses = [];
  let errorMsg = null;
  try {
    horses = await getPublicHorses() || [];
  } catch (error: any) {
    console.error("Supabase error:", error);
    errorMsg = error.message;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-baseline border-b border-gray-200 dark:border-gray-800 pb-6 mb-8">
        <h1 className="text-4xl font-serif font-bold tracking-tight text-primary">The Collection</h1>
        {/* Placeholder for Advanced Filtering Sidebar toggle */}
        <button className="text-sm font-medium text-secondary hover:text-primary transition-colors">Filters</button>
      </div>

      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {errorMsg ? (
          <div className="col-span-full py-12 text-center text-red-500 bg-red-50 rounded-xl">
            <p className="font-bold">Database Error:</p>
            <p>{errorMsg}</p>
          </div>
        ) : horses.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500">
            No horses available at the moment.
          </div>
        ) : (
          horses.map((horse: any) => (
            <div key={horse.id} className="group relative">
              <div className="min-h-80 aspect-square w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800 relative flex items-center justify-center">
                <img
                  src={horse.cover_image_url || 'https://via.placeholder.com/600x400?text=No+Image'}
                  alt={horse.name}
                  className="absolute inset-0 h-full w-full object-cover blur-xl opacity-40 scale-110"
                />
                <img
                  src={horse.cover_image_url || 'https://via.placeholder.com/600x400?text=No+Image'}
                  alt={horse.name}
                  className="relative h-full w-full object-contain group-hover:scale-105 transition-transform duration-500 z-10"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-lg text-primary font-serif font-semibold">
                    <Link href={`/horses/${horse.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {horse.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{horse.discipline} &bull; {horse.birth_year}</p>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{horse.price_category}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

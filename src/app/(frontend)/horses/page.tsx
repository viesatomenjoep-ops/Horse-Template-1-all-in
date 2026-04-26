import { getPublicHorses } from '@/app/actions/horse'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ShieldCheck, Eye } from 'lucide-react'
import { logoutAction } from '@/app/actions/auth'

export const dynamic = 'force-dynamic'

export default async function CollectionPage(props: { searchParams: Promise<{ discipline?: string }> }) {
  const searchParams = await props.searchParams
  const selectedDiscipline = searchParams?.discipline || 'All'

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isLoggedIn = !!user

  // Try to fetch horses. If Supabase is not connected yet, we'll gracefully handle it.
  let horses = [];
  let errorMsg = null;
  try {
    horses = await getPublicHorses() || [];
  } catch (error: any) {
    console.error("Supabase error:", error);
    errorMsg = error.message;
  }

  // Filter horses by discipline if selected
  const displayedHorses = selectedDiscipline === 'All' 
    ? horses 
    : horses.filter((h: any) => h.discipline === selectedDiscipline)

  const disciplines = ['All', 'Jumping horses', 'Hunters', 'Equitation horses', 'Ponies']

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col border-b border-gray-200 dark:border-gray-800 pb-6 mb-8 gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <h1 className="text-4xl font-serif font-bold tracking-tight text-primary dark:text-white">The Collection</h1>
            {isLoggedIn ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-sm font-bold border border-green-200 dark:border-green-800/30 shadow-sm animate-fade-in">
                  <ShieldCheck size={16} className="mr-2" />
                  Investor Access: Full Collection Unlocked
                </div>
                <form action={logoutAction}>
                  <button type="submit" className="text-sm font-bold text-accent hover:text-primary transition-colors underline decoration-2 underline-offset-4">
                    Logout as an investor
                  </button>
                </form>
              </div>
            ) : (
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-sm font-medium border border-gray-200 dark:border-gray-700 shadow-sm">
                <Eye size={16} className="mr-2" />
                Public Access: Viewing Sales Horses
              </div>
            )}
          </div>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {disciplines.map(disc => (
            <Link 
              key={disc} 
              href={disc === 'All' ? '/horses' : `/horses?discipline=${encodeURIComponent(disc)}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedDiscipline === disc 
                  ? 'bg-primary text-white dark:bg-white dark:text-gray-900' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {disc}
            </Link>
          ))}
        </div>

        {!isLoggedIn && (
          <div className="mt-2">
            <Link href="/investor-login" className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-md text-white bg-accent hover:bg-primary shadow-sm transition-colors">
              Log in to explore tailored investment opportunities
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {errorMsg ? (
          <div className="col-span-full py-12 text-center text-red-500 bg-red-50 rounded-xl">
            <p className="font-bold">Database Error:</p>
            <p>{errorMsg}</p>
          </div>
        ) : displayedHorses.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500">
            No horses found for this category.
          </div>
        ) : (
          displayedHorses.map((horse: any) => (
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

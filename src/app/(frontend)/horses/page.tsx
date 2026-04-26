import { getPublicHorses } from '@/app/actions/horse'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ShieldCheck, Eye, ArrowRight } from 'lucide-react'
import { Reveal, StaggerContainer, StaggerItem, HoverCard } from '@/components/animations/MotionComponents'

export const dynamic = 'force-dynamic'

export default async function CollectionPage() {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 overflow-hidden">
      <Reveal direction="down" delay={0.1}>
        <div className="flex flex-col border-b border-gray-200 dark:border-gray-800 pb-6 mb-12 gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-primary dark:text-white">The Collection</h1>
              {isLoggedIn ? (
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-sm font-bold border border-green-200 dark:border-green-800/30 shadow-sm animate-fade-in">
                  <ShieldCheck size={16} className="mr-2" />
                  Investor Access: Full Collection Unlocked
                </div>
              ) : (
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-sm font-medium border border-gray-200 dark:border-gray-700 shadow-sm">
                  <Eye size={16} className="mr-2" />
                  Public Access: Viewing Sales Horses
                </div>
              )}
            </div>
            {/* Placeholder for Advanced Filtering Sidebar toggle */}
            <button className="text-sm font-medium text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors whitespace-nowrap px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              Filters & Sorting
            </button>
          </div>

          {!isLoggedIn && (
            <div className="mt-2">
              <Link href="/login" className="relative group inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-md text-white bg-accent hover:bg-primary shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all overflow-hidden">
                <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="relative z-10">Log in to explore tailored investment opportunities</span>
              </Link>
            </div>
          )}
        </div>
      </Reveal>

      <StaggerContainer delayChildren={0.3} staggerChildren={0.15} className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {errorMsg ? (
          <div className="col-span-full py-12 text-center text-red-500 bg-red-50 rounded-xl">
            <p className="font-bold">Database Error:</p>
            <p>{errorMsg}</p>
          </div>
        ) : horses.length === 0 ? (
          <div className="col-span-full py-24 text-center text-gray-500 text-xl font-light">
            No horses available at the moment.
          </div>
        ) : (
          horses.map((horse: any) => (
            <StaggerItem key={horse.id}>
              <HoverCard className="group relative bg-white dark:bg-gray-800/40 p-4 border border-gray-100 dark:border-gray-800/60 rounded-2xl">
                <div className="min-h-80 aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 relative flex items-center justify-center">
                  <img
                    src={horse.cover_image_url || 'https://via.placeholder.com/600x800?text=No+Image'}
                    alt={horse.name}
                    className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-40 scale-125"
                  />
                  <img
                    src={horse.cover_image_url || 'https://via.placeholder.com/600x800?text=No+Image'}
                    alt={horse.name}
                    className="relative h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out z-10"
                  />
                  {/* Modern gradient overlay for hover state */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex flex-col justify-end p-6">
                     <span className="text-white font-bold tracking-wider flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                       VIEW DETAILS <ArrowRight size={18} />
                     </span>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-start px-2 pb-2">
                  <div>
                    <h3 className="text-2xl text-primary dark:text-white font-serif font-bold group-hover:text-accent transition-colors">
                      <Link href={`/horses/${horse.id}`}>
                        <span aria-hidden="true" className="absolute inset-0 z-30" />
                        {horse.name}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 tracking-widest uppercase font-bold">{horse.discipline} &bull; {horse.birth_year}</p>
                  </div>
                  <div className="px-4 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{horse.price_category}</p>
                  </div>
                </div>
              </HoverCard>
            </StaggerItem>
          ))
        )}
      </StaggerContainer>
    </div>
  )
}

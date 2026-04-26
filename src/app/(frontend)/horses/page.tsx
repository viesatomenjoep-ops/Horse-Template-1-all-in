import { getPublicHorses } from '@/app/actions/horse'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { ShieldCheck, Eye } from 'lucide-react'
import { logout } from '@/app/actions/auth'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Elite Sport Horses for Sale | Jumpers & Hunters Belgium | Equivest',
  description: 'Explore our exclusive collection of premium sport horses, jumpers, hunters, and equitation horses in Belgium. Secure high-yield equestrian investments.',
  keywords: 'sport horses Belgium, invest in sport horses, sport horses, jumpers, hunters, equitation horse, horses for sale'
}

export default async function CollectionPage(props: { searchParams: Promise<{ discipline?: string }> }) {
  const searchParams = await props.searchParams
  const selectedDiscipline = searchParams?.discipline || 'All'

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const cookieStore = await cookies()
  const isInvestor = cookieStore.get('investor_auth')?.value === 'true'
  
  const isLoggedIn = !!user || isInvestor

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
                <form action={logout}>
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
                  src={horse.cover_image_url || '/logo.png'}
                  alt={horse.name}
                  className={`absolute inset-0 h-full w-full ${horse.cover_image_url ? 'object-cover blur-xl opacity-40 scale-110' : 'object-contain opacity-10 p-10'}`}
                />
                <img
                  src={horse.cover_image_url || '/logo.png'}
                  alt={horse.name}
                  className={`relative h-full w-full ${horse.cover_image_url ? 'object-contain' : 'object-contain p-12'} group-hover:scale-105 transition-transform duration-500 z-10`}
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

      {/* SEO Section */}
      <div className="mt-24 pt-12 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-serif font-bold text-primary dark:text-white mb-4">Invest in Premium Sport Horses</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm max-w-4xl">
          Equivest Worldwide is your premier destination to <strong>invest in sport horses</strong>. Based out of the heart of equestrian excellence, we specialize in sourcing and developing the most elite <strong>sport horses Belgium</strong> has to offer. Whether you are looking for top-tier <strong>jumpers</strong> to compete at the highest international levels, meticulously trained <strong>hunters</strong> with perfect form, or a highly reliable <strong>equitation horse</strong>, our portfolio represents the absolute pinnacle of equestrian talent. We believe that investing in <strong>sport horses</strong> is more than just a passion—it is a strategic, high-yield alternative asset class. Our expert team ensures that every horse in our collection undergoes rigorous vetting and training to secure both competitive success and strong financial returns.
        </p>
      </div>
    </div>
  )
}

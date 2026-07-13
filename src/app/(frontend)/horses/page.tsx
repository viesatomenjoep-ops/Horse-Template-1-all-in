import { getPublicHorses } from '@/app/actions/horse'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { ShieldCheck, Eye, Lock } from 'lucide-react'
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

  const disciplines = ['All', 'Hunters', 'Showjumpers', 'Equitation', 'Ponies']

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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedDiscipline === disc
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
            <div key={horse.id} className="group relative flex flex-col">
              <div className="mb-3">
                <span className="text-sm md:text-base uppercase tracking-widest font-bold text-accent">{horse.discipline}</span>
              </div>
              <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800 relative">
                <img
                  src={horse.cover_image_url || '/logo.png'}
                  alt={horse.name}
                  className={`absolute inset-0 h-full w-full group-hover:scale-105 transition-transform duration-500 ${horse.cover_image_url ? 'object-cover' : 'object-contain p-10 opacity-20'}`}
                />
              </div>
              <div className="mt-4 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl text-primary font-serif font-bold">
                    <Link href={`/horses/${horse.id}`}>
                      <span aria-hidden="true" className="absolute inset-0 z-20" />
                      {horse.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{horse.birth_year} &bull; {horse.gender}</p>
                </div>
                <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  {horse.price_category && !isNaN(Number(horse.price_category)) ? `€${Number(horse.price_category).toLocaleString()}` : horse.price_category}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Want to Invest CTA - Floating Card (Only visible to logged-in investors) */}
      {isLoggedIn && (
        <section className="pt-24 pb-10 relative z-20">
          <div className="relative overflow-hidden rounded-[3rem] shadow-2xl bg-primary transform hover:-translate-y-2 transition-transform duration-500">
            <div className="absolute inset-0 bg-[url('/chimi.jpg')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/40"></div>
            
            <div className="relative z-10 p-12 md:p-20 lg:p-24 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Want to <span className="text-accent italic">Invest?</span></h2>
                <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed font-light">
                  Join Equivest Worldwide and become part of an exclusive network of investors acquiring elite equestrian talent. Our proven track record and data-driven approach maximize both sport success and financial returns.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <a 
                    href="mailto:Investments@equivest-worldwide.com?subject=Private%20Portfolio%20Access%20Request"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-[#cca471] text-white font-bold uppercase tracking-widest text-sm rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(204,164,113,0.6)] transition-all shadow-xl group"
                  >
                    <Lock size={18} /> Get Investor Credentials
                  </a>
                  <Link href="/contact#plan-visit" className="bg-transparent border border-white/30 text-white px-8 py-4 font-bold uppercase tracking-widest rounded-full text-center hover:bg-white/10 transition-all backdrop-blur-sm">
                    Plan a Visit
                  </Link>
                </div>
                <p className="text-xs text-white/40 mt-6 font-bold uppercase tracking-widest">
                  Login credentials for private access will be sent via email.
                </p>
              </div>
              <div className="hidden lg:block w-1/3 relative">
                 <div className="absolute -inset-10 bg-accent/20 blur-[100px] rounded-full"></div>
                 <img src="/logo.png" alt="Equivest Shield" className="w-full h-auto object-contain opacity-80 mix-blend-screen drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SEO Section */}
      <div className="mt-24 pt-12 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary dark:text-white mb-6">Invest in Premium Sport Horses</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg md:text-xl max-w-5xl">
          Equivest Worldwide is your premier destination to <strong>invest in sport horses</strong>. Based out of the heart of equestrian excellence, we specialize in sourcing and developing the most elite <strong>sport horses Belgium</strong> has to offer. Whether you are looking for top-tier <strong>jumpers</strong> to compete at the highest international levels, meticulously trained <strong>hunters</strong> with perfect form, or a highly reliable <strong>equitation horse</strong>, our portfolio represents the absolute pinnacle of equestrian talent. We believe that investing in <strong>sport horses</strong> is more than just a passion—it is a strategic, high-yield alternative asset class. Our expert team ensures that every horse in our collection undergoes rigorous vetting and training to secure both competitive success and strong financial returns.
        </p>
      </div>
    </div>
  )
}

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-between text-white pt-24 pb-6">
        <div className="absolute inset-0 opacity-90 overflow-hidden">
          {/* Note: The user needs to add chimi.jpg to the public directory */}
          <Image
            src="/chimi.jpg"
            alt="Elite Jumper Chimi"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-primary/95"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6 md:space-y-8 w-full mt-4 md:mt-[2vh] mb-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-4">
            <span className="w-2 h-2 bg-accent-light rounded-full animate-pulse"></span>
            <span className="text-accent-light uppercase tracking-[0.3em] text-xs sm:text-sm md:text-base font-bold">
              Invest in Elite Showjumpers
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif text-white leading-[1.1] tracking-tight">
            High-yield returns from world-class <span className="text-accent-light italic">equestrian talent.</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-medium text-white/80 max-w-2xl mx-auto leading-relaxed">
            Securing high-yield returns through the acquisition of world-class equestrian talent.
          </p>
          
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/horses"
              className="bg-accent text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-primary transition-all shadow-xl"
            >
              View Portfolio
            </Link>
            <Link
              href="/roi"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white/20 transition-all shadow-xl"
            >
              ROI
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-end opacity-70 mt-12 md:mt-auto pb-4 md:pb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 mb-3 block">
            Scroll to explore
          </span>
          <div className="w-[2px] h-24 md:h-32 bg-white/20 relative overflow-hidden rounded-full mb-[-2rem] md:mb-[-4rem]">
            <div className="w-full h-1/4 bg-white/90 shadow-[0_0_10px_rgba(255,255,255,1)] absolute top-0 left-0 rounded-full animate-[mouse-scroll_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <LatestNewsPreview />
    </main>
  );
}

// Add a component at the bottom of the file to fetch and show news
import { getNewsArticles } from '@/app/actions/news'

async function LatestNewsPreview() {
  let articles = [];
  try {
    articles = await getNewsArticles() || [];
    articles = articles.slice(0, 3); // Only take latest 3
  } catch (e) {
    console.error(e);
  }

  if (articles.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary dark:text-white">
              Latest <span className="italic text-accent">Updates</span>
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">Discover our recent additions, competition results, and general news.</p>
          </div>
          <Link href="/news" className="hidden sm:flex items-center text-sm font-bold uppercase tracking-wider text-primary dark:text-white hover:text-accent transition-colors">
            View All News &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article: any) => (
            <Link href={`/news`} key={article.id} className="group flex flex-col bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
              <div className="h-48 relative overflow-hidden bg-gray-100 dark:bg-gray-700">
                {article.image_url ? (
                  <Image 
                    src={article.image_url} 
                    alt={article.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm uppercase tracking-wider">News</div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-bold text-accent uppercase tracking-wider mb-2">
                  {new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3 group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 flex-1">
                  {article.excerpt || article.content.substring(0, 150) + '...'}
                </p>
                <span className="text-sm font-medium text-primary dark:text-white group-hover:text-accent transition-colors flex items-center">
                  Read More <span className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 sm:hidden text-center">
          <Link href="/news" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 w-full">
            View All News
          </Link>
        </div>
      </div>
    </section>
  )
}

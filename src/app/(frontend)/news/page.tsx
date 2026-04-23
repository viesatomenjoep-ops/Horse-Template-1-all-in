export const metadata = {
  title: 'News | Antigravity Sport Horses',
  description: 'Latest updates, sales, and competition results from Antigravity.',
}

export default function NewsPage() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="text-center space-y-8 mb-16">
        <h1 className="text-4xl sm:text-5xl font-serif font-light text-primary dark:text-white">
          Latest <span className="font-semibold italic text-accent">News</span>
        </h1>
        <p className="text-lg text-secondary dark:text-gray-400 font-light max-w-2xl mx-auto">
          Stay updated with our recent sales, competition results, and new additions to our portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <article key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow border border-gray-100 dark:border-gray-700">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
               <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm uppercase tracking-wider">News Image</div>
            </div>
            <div className="p-6">
              <p className="text-xs text-accent font-semibold mb-2 uppercase tracking-wide">Oct {i + 10}, 2026</p>
              <h3 className="text-xl font-serif font-semibold text-primary dark:text-white mb-3">Exceptional Gelding Sold to USA</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                We are thrilled to announce the successful sale of one of our top prospects to a prominent stable in Wellington, Florida. We wish the new owners the best of luck in the upcoming season.
              </p>
              <button className="text-primary dark:text-white font-medium text-sm hover:text-accent transition-colors">Read More →</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

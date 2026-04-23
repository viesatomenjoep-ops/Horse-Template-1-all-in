export const metadata = {
  title: 'References | Antigravity Sport Horses',
  description: 'See the success stories of horses sourced and sold by Antigravity.',
}

export default function ReferencesPage() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="text-center space-y-8 mb-16">
        <h1 className="text-4xl sm:text-5xl font-serif font-light text-primary dark:text-white">
          Our <span className="font-semibold italic text-accent">References</span>
        </h1>
        <p className="text-lg text-secondary dark:text-gray-400 font-light max-w-2xl mx-auto">
          A track record of excellence. Discover the world-class horses that have passed through our stables and gone on to achieve greatness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-transform hover:-translate-y-1 duration-300">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
               <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm uppercase tracking-wider">Horse Image</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif font-semibold text-primary dark:text-white mb-2">Grand Prix Star {i}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Sold to USA • Showjumping</p>
              <p className="text-sm text-secondary dark:text-gray-300">
                Now competing successfully at the 1.50m level with their new rider.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

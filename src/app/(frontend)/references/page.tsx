import { getReferences } from '@/app/actions/reference'

export const metadata = {
  title: 'References | Equivest Sport Horses',
  description: 'See the success stories of horses sourced and sold by Equivest.',
}

export const revalidate = 60

export default async function ReferencesPage() {
  const references = await getReferences()

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

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {references.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 py-12">More references coming soon.</p>
        ) : (
          references.map((ref) => (
            <div key={ref.id} className="break-inside-avoid bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-transform hover:-translate-y-1 duration-300 flex flex-col items-center">
              {ref.horse_name && (
                <div className="w-full bg-primary text-white p-4 text-center font-serif font-semibold">
                  {ref.horse_name}
                </div>
              )}
              <div className="w-full flex justify-center p-4">
                <iframe 
                  src={`${ref.url}embed`}
                  className="w-full max-w-[400px] h-[500px]"
                  frameBorder="0" 
                  scrolling="no" 
                  allowTransparency={true}
                  allow="encrypted-media"
                ></iframe>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

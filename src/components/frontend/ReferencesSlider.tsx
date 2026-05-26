'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { Trophy, ArrowRight, ExternalLink } from 'lucide-react'

type Reference = {
  id: string
  horse_name?: string | null
  url?: string | null
  sold_to_country?: string | null
  image_url?: string | null
}

export default function ReferencesSlider({ references }: { references: Reference[] }) {
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Use interval-based smooth scrolling to prevent conflicts with mobile momentum scrolling
  useEffect(() => {
    if (isPaused) return
    
    const id = setInterval(() => {
      if (scrollRef.current) {
        // Scroll by roughly one card width (260px card + 20px gap)
        scrollRef.current.scrollBy({ left: 280, behavior: 'smooth' })
        
        // Loop back if near the end
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 100) {
          // Temporarily disable smooth scroll to snap back invisibly
          scrollRef.current.style.scrollBehavior = 'auto'
          scrollRef.current.scrollLeft = 0
          // Re-enable smooth scroll
          setTimeout(() => {
             if (scrollRef.current) scrollRef.current.style.scrollBehavior = 'smooth'
          }, 50)
        }
      }
    }, 3000)
    
    return () => clearInterval(id)
  }, [isPaused])

  // Duplicate items for seamless infinite loop
  const items = [...references, ...references, ...references, ...references]

  return (
    <section className="py-20 overflow-hidden bg-[#fdfbf7] dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold block mb-4">Proven Success</span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary dark:text-white mb-6">
            Global <span className="italic text-accent">References</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            From the European heartland to the most prestigious arenas in the world, our elite athletes consistently prove their immense value.
          </p>
        </div>
      </div>

      {/* Slider Track */}
      <div
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => {
          // Add a slight delay before resuming auto-scroll to allow mobile momentum scroll to finish
          setTimeout(() => setIsPaused(false), 1500)
        }}
      >
        <div
          ref={scrollRef}
          className="flex gap-5 w-full overflow-x-auto pb-6 hide-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((ref, idx) => (
            <div key={`${ref.id}-${idx}`} className="snap-start shrink-0">
              <ReferenceCard ref={ref} />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link
          href="/references"
          className="inline-flex items-center gap-3 px-8 py-4 border border-gray-300 dark:border-gray-700 rounded-full text-primary dark:text-white font-bold uppercase tracking-widest hover:border-accent hover:text-accent transition-colors group"
        >
          View All References <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </section>
  )
}

function ReferenceCard({ ref }: { ref: Reference }) {
  const cardContent = (
    <div className="shrink-0 w-[260px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">

      {/* Horse Name Header */}
      {ref.horse_name && (
        <div className="bg-primary text-white px-4 py-2.5 text-center font-serif font-semibold text-sm tracking-wide">
          {ref.horse_name}
        </div>
      )}

      {/* Embed / Visual Area — uniform height */}
      <div className="relative w-full overflow-hidden bg-gray-100 dark:bg-gray-800" style={{ height: '320px' }}>
        {ref.url ? (
          <>
            {/* Scaled iframe cropped into uniform frame */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                transform: 'scale(0.65)',
                transformOrigin: 'top center',
                width: '154%',
                marginLeft: '-27%',
              }}
            >
              <iframe
                src={`${ref.url}embed`}
                style={{ width: '100%', height: '500px', border: 'none' }}
                scrolling="no"
                allow="encrypted-media"
                loading="lazy"
              />
            </div>
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-10" />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 dark:text-gray-700 gap-3">
            <Trophy size={40} />
            <span className="text-xs uppercase tracking-widest font-medium text-gray-400">Equivest Reference</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        {ref.sold_to_country && (
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">→ {ref.sold_to_country}</span>
        )}
        {ref.url && (
          <span className="flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-widest ml-auto">
            <ExternalLink size={13} /> View on Instagram
          </span>
        )}
      </div>
    </div>
  )

  // If there's a URL, wrap the whole card in a link to Instagram
  if (ref.url) {
    return (
      <a href={ref.url} target="_blank" rel="noopener noreferrer">
        {cardContent}
      </a>
    )
  }

  return cardContent
}

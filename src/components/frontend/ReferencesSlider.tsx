'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Trophy, ArrowRight } from 'lucide-react'

type Reference = {
  id: string
  horse_name?: string | null
  url?: string | null
  sold_to_country?: string | null
  image_url?: string | null
}

export default function ReferencesSlider({ references }: { references: Reference[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate items for seamless infinite loop
  const items = [...references, ...references, ...references]

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
      >
        {/* Fade masks on left and right */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#fdfbf7] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#fdfbf7] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-6 w-max"
          style={{
            animation: `slide-references 60s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {items.map((ref, idx) => (
            <ReferenceCard key={`${ref.id}-${idx}`} ref={ref} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-14 text-center">
        <Link
          href="/references"
          className="inline-flex items-center gap-3 px-8 py-4 border border-gray-300 dark:border-gray-700 rounded-full text-primary dark:text-white font-bold uppercase tracking-widest hover:border-accent hover:text-accent transition-colors group"
        >
          View All References <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>

      <style jsx global>{`
        @keyframes slide-references {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </section>
  )
}

function ReferenceCard({ ref }: { ref: Reference }) {
  return (
    <div className="shrink-0 w-[320px] md:w-[360px] rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

      {/* Horse Name Header */}
      {ref.horse_name && (
        <div className="bg-primary text-white px-5 py-3 text-center font-serif font-semibold text-sm tracking-wide">
          {ref.horse_name}
        </div>
      )}

      {/* Embed / Visual Area — uniformly cropped like a ticket */}
      <div className="relative w-full overflow-hidden bg-gray-100 dark:bg-gray-800" style={{ height: '420px' }}>
        {ref.url ? (
          <>
            {/* Cropped iframe: scales the Instagram embed to fill the card */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                transform: 'scale(0.72)',
                transformOrigin: 'top center',
                width: '139%',
                marginLeft: '-19.5%',
              }}
            >
              <iframe
                src={`${ref.url}embed`}
                style={{ width: '100%', height: '600px', border: 'none' }}
                scrolling="no"
                allow="encrypted-media"
                loading="lazy"
              />
            </div>
            {/* Gradient overlay — bottom fade for clean text area */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-10" />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 dark:text-gray-700 gap-4">
            <Trophy size={48} />
            <span className="text-sm uppercase tracking-widest font-medium text-gray-400">Equivest Reference</span>
          </div>
        )}
      </div>

      {/* Footer info */}
      {ref.sold_to_country && (
        <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 text-xs font-bold uppercase tracking-widest text-gray-400 text-center">
          → {ref.sold_to_country}
        </div>
      )}
    </div>
  )
}

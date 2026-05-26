'use client'

import { useEffect, useRef, useState } from 'react'

const photos = [
  { src: '/homepage1.jpg', alt: 'Equivest showjumper at Paso Robles' },
  { src: '/homepage2.jpg', alt: 'Equivest competition FarmVet Classic' },
  { src: '/homepage3.jpg', alt: 'Equivest Sky Partners competition' },
  { src: '/homepage4.jpg', alt: 'Equivest Kubota Defenders competition' },
]

function PhotoCard({ src, alt, delay }: { src: string; alt: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl shadow-xl border-2 border-white/80 dark:border-white/10 ring-1 ring-black/10 bg-gray-100 dark:bg-gray-800"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.93) translateY(20px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.34, 1.4, 0.64, 1) ${delay}s`,
      }}
    >
      <div className="aspect-[4/3] w-full relative overflow-hidden group">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          draggable={false}
        />
        {/* Blur bottom-left watermark area */}
        <div className="absolute bottom-0 left-0 w-36 h-14 backdrop-blur-md bg-white/5 rounded-tr-xl pointer-events-none" />
      </div>
    </div>
  )
}

export default function PhotoGallery() {
  return (
    <section className="py-20 bg-[#fdfbf7] dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold block mb-3">Our Portfolio in Action</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary dark:text-white">
            Excellence <span className="italic text-accent">in Motion</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {photos.map((photo, i) => (
            <PhotoCard key={i} src={photo.src} alt={photo.alt} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}

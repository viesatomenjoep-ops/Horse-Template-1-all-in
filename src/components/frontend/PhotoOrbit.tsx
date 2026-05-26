'use client'

import { useEffect, useRef, useState } from 'react'

const photos = [
  { src: '/homepage1.jpg', alt: 'Equivest showjumper in action' },
  { src: '/homepage2.jpg', alt: 'Equivest competition' },
  { src: '/homepage3.jpg', alt: 'Equivest Sky Partners' },
  // { src: '/homepage4.jpg', alt: 'Equivest Kubota' }, // uncomment when 4th image is ready
]

export default function PhotoOrbit() {
  const outerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const outer = outerRef.current
    if (!outer) return

    // Entrance trigger
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setEntered(true) },
      { threshold: 0.05 }
    )
    observer.observe(outer)

    // Scroll-driven rotation
    const onScroll = () => {
      if (!outer) return
      const rect = outer.getBoundingClientRect()
      const totalScrollable = outer.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const prog = Math.max(0, Math.min(1, scrolled / totalScrollable))
      setProgress(prog)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  const n = photos.length
  // Ellipse radii — tuned for a cinematic, wide oval
  const rx = 300
  const ry = 110
  // One full rotation over the scroll distance
  const rotationAngle = progress * Math.PI * 2

  return (
    <div ref={outerRef} style={{ height: '220vh' }} className="relative">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fdfbf7] dark:bg-[#0a0a0a]">

        {/* Section label */}
        <div className="text-center mb-10 z-20 relative">
          <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold block mb-3">Our Portfolio in Action</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary dark:text-white">
            Excellence <span className="italic text-accent">in Motion</span>
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">Scroll to explore our world-class athletes competing at the highest level.</p>
        </div>

        {/* Orbital stage — desktop */}
        <div
          className="hidden md:block relative"
          style={{
            width: `${rx * 2 + 320}px`,
            height: `${ry * 2 + 220}px`,
          }}
        >
          {/* Ellipse guide ring — subtle */}
          <div
            className="absolute border border-gray-200/60 dark:border-gray-700/40 rounded-[50%] pointer-events-none"
            style={{
              width: `${rx * 2}px`,
              height: `${ry * 2}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {photos.map((photo, i) => {
            const angle = rotationAngle + (2 * Math.PI * i) / n - Math.PI / 2
            const x = rx * Math.cos(angle)
            const y = ry * Math.sin(angle)
            // Depth effect: images at the back (y > 0) are slightly smaller and dimmer
            const depthScale = 0.75 + 0.25 * ((1 - Math.sin(angle)) / 2)
            const depthOpacity = 0.65 + 0.35 * ((1 - Math.sin(angle)) / 2)
            const zIndex = Math.round(50 + 50 * Math.sin(angle))

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  zIndex,
                  transform: `
                    translate(calc(-50% + ${x}px), calc(-50% + ${y}px))
                    scale(${entered ? depthScale : 0.6})
                  `,
                  opacity: entered ? depthOpacity : 0,
                  transition: entered
                    ? 'opacity 0.4s ease, transform 0.08s linear'
                    : `opacity 0.9s ease ${i * 0.15}s, transform 0.9s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.15}s`,
                  willChange: 'transform, opacity',
                }}
              >
                <div className="w-[260px] h-[175px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10 border-2 border-white/60 dark:border-white/10 bg-white">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
                {/* Subtle reflection/glow under front images */}
                <div
                  className="absolute -bottom-2 left-4 right-4 h-6 rounded-full bg-black/10 dark:bg-black/30 blur-md"
                  style={{ opacity: depthOpacity * 0.6 }}
                />
              </div>
            )
          })}
        </div>

        {/* Mobile fallback — animated grid */}
        <div className="md:hidden grid grid-cols-2 gap-4 px-6 max-w-sm">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden shadow-xl border-2 border-white/60 ring-1 ring-black/10"
              style={{
                opacity: entered ? 1 : 0,
                transform: entered ? 'scale(1)' : 'scale(0.85)',
                transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.15}s`,
              }}
            >
              <img src={photo.src} alt={photo.alt} className="w-full aspect-[4/3] object-cover" />
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        {progress < 0.05 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 animate-bounce z-20">
            <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="8" cy="7" r="2.5" fill="currentColor" className="animate-[scroll-dot_1.5s_ease-in-out_infinite]"/>
            </svg>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes scroll-dot {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

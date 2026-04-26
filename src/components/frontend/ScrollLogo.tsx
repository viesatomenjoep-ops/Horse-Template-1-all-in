'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function ScrollLogo() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Call handler right away so state gets updated with initial window size
    handleScroll()
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate the parallax effect. 
  // We want it to move down as the user scrolls down.
  // We fade it out so it disappears after a certain point (e.g. 500px).
  const translateY = scrollY * 0.8 // Moves down at 80% of scroll speed
  const opacity = Math.max(0, 0.8 - (scrollY / 600)) // Fades out completely after 480px of scrolling

  if (opacity === 0) return null // Don't render if invisible to save performance

  return (
    <div 
      className="relative z-20 flex flex-col items-center justify-end mt-12 md:mt-auto pb-8 md:pb-12 pointer-events-none"
      style={{ 
        transform: `translateY(${translateY}px)`,
        opacity: opacity 
      }}
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 mb-4 block">
        Scroll to explore
      </span>
      <div className="flex flex-col items-center animate-bounce">
        <Image 
          src="/logo.png" 
          alt="Scroll down" 
          width={40} 
          height={40} 
          className="drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] mb-2 mix-blend-screen"
        />
        <svg 
          className="w-5 h-5 text-white/80" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  )
}

'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight, Activity, Trophy, Euro } from 'lucide-react'

export default function HorseSlideshow({ horses }: { horses: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Use only horses that have a main image, limit to 6 for the slideshow
  let displayHorses = horses.filter(h => h.main_image_url).slice(0, 6)

  if (displayHorses.length === 0) {
    displayHorses = [
      {
        id: 'dummy1',
        name: 'Equivest Elite',
        main_image_url: '/portfolio_ai_1.png',
        status: 'Available',
        category: 'Grand Prix Prospect',
        age: 7,
        gender: 'Stallion',
        price_range: 'On Request'
      },
      {
        id: 'dummy2',
        name: 'Equivest Champion',
        main_image_url: '/portfolio_ai_2.png',
        status: 'Available',
        category: '1.60m Talent',
        age: 9,
        gender: 'Gelding',
        price_range: 'On Request'
      },
      {
        id: 'dummy3',
        name: 'Equivest Star',
        main_image_url: '/portfolio_ai_3.png',
        status: 'Available',
        category: 'Hunter Prospect',
        age: 6,
        gender: 'Mare',
        price_range: 'On Request'
      }
    ]
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % displayHorses.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + displayHorses.length) % displayHorses.length)
  }

  return (
    <section className="pt-10 md:pt-16 pb-0 relative z-20 w-full animate-fade-in-up">
      {/* Background decorations - subtle glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full">
              <span className="w-2 h-2 bg-accent-light rounded-full animate-pulse"></span>
              <span className="text-white uppercase tracking-[0.2em] text-xs font-bold">Premium Assets</span>
            </div>
            <Link href="/horses" className="inline-block group">
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight group-hover:opacity-80 transition-opacity drop-shadow-md">
                Explore the <span className="italic text-accent-light font-light">Sport Portfolio</span>
              </h2>
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/horses" className="hidden sm:flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 hover:bg-white/20 transition-all group shadow-xl">
              View Portfolio <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-12 group/slider">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 border border-gray-200 dark:border-white/5">
          {/* Navigation Buttons vertically centered inside the image */}
          <div className="absolute inset-y-0 left-4 md:left-8 z-20 flex items-center">
            <button onClick={prevSlide} className="w-12 h-12 md:w-16 md:h-16 bg-black/40 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all group opacity-0 group-hover/slider:opacity-100 focus:opacity-100">
              <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-4 md:right-8 z-20 flex items-center">
            <button onClick={nextSlide} className="w-12 h-12 md:w-16 md:h-16 bg-black/40 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all group opacity-0 group-hover/slider:opacity-100 focus:opacity-100">
              <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div 
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {displayHorses.map((horse, index) => {
              return (
                <div 
                  key={horse.id} 
                  className="min-w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] relative"
                >
                  <div className="block group relative w-full aspect-square sm:aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] cursor-default bg-black">
                    {/* Blurred background image to fill the empty space */}
                    <Image
                      src={horse.main_image_url}
                      alt={`${horse.name} background`}
                      fill
                      className="object-cover opacity-40 blur-2xl scale-110"
                    />
                    {/* Actual image, fully visible and contained */}
                    <Image
                      src={horse.main_image_url}
                      alt={horse.name}
                      fill
                      className="object-contain transition-transform duration-[1.5s] group-hover:scale-105 z-10"
                    />
                    {/* Gradient overlays for text readability */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                    
                    <div className="absolute inset-0 z-20 p-8 md:p-16 flex flex-col justify-end transform transition-transform duration-500">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out max-w-3xl">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          {horse.status === 'Available' && (
                            <span className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">Available</span>
                          )}
                          <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">{horse.category}</span>
                        </div>
                        
                        <h3 className="text-4xl md:text-6xl font-serif text-white mb-4 group-hover:text-accent-light transition-colors duration-300 drop-shadow-lg leading-tight">{horse.name}</h3>
                        
                        <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm"><Activity size={18} className="text-accent-light" /> <span>{horse.age} yrs</span></div>
                          <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm"><Euro size={18} className="text-accent-light" /> <span className="uppercase">{horse.price_range || 'On Request'}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Progress Dots inside the slider area at the bottom */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-3 z-20">
          {displayHorses.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-accent w-8' : 'bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

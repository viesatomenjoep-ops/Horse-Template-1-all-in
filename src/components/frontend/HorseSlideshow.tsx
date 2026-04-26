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

  // FALLBACK if DB fails or empty
  if (displayHorses.length === 0) {
    displayHorses = [
      {
        id: 'dummy',
        name: 'Quel Honneur vh Distelhof Z',
        main_image_url: '/wellington_showjumper.png',
        category: 'Jumper',
        status: 'Available',
        age: 8,
        gender: 'Gelding',
        price_range: 'Premium'
      }
    ];
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % displayHorses.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + displayHorses.length) % displayHorses.length)
  }

  return (
    <section className="py-32 bg-[#050B14] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span className="text-accent uppercase tracking-[0.2em] text-xs font-bold">Premium Assets</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
              Explore the <span className="italic text-accent font-light">Sport Portfolio</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all group backdrop-blur-sm">
                <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all group backdrop-blur-sm">
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <Link href="/horses" className="hidden sm:flex items-center gap-2 text-white/70 hover:text-white uppercase tracking-widest text-sm font-bold ml-4 group">
              View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden relative z-10 pb-12">
        <div 
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(-${currentIndex * (typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : 85)}%)` }}
        >
          {displayHorses.map((horse, index) => {
            const isActive = index === currentIndex;
            return (
              <div 
                key={horse.id} 
                className={`min-w-full md:min-w-[85%] px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-95 md:blur-[2px]'}`}
              >
                <Link href={`/horses/${horse.id}`} className="block group relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[21/9] w-full shadow-2xl bg-gray-900 border border-white/5">
                  <Image
                    src={horse.main_image_url}
                    alt={horse.name}
                    fill
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>
                  
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end transform transition-transform duration-500">
                    <div className="translate-y-8 md:translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <div className="flex flex-wrap items-center gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {horse.status === 'Available' && (
                          <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">Available</span>
                        )}
                        <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{horse.category}</span>
                      </div>
                      
                      <h3 className="text-4xl md:text-6xl font-serif text-white mb-2 md:mb-4 group-hover:text-accent transition-colors duration-300 drop-shadow-lg">{horse.name}</h3>
                      
                      <div className="flex items-center gap-6 text-white/70 mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        <div className="flex items-center gap-2"><Activity size={18} /> <span>{horse.age} Years</span></div>
                        <div className="flex items-center gap-2"><Trophy size={18} /> <span>{horse.gender}</span></div>
                        <div className="flex items-center gap-2"><Euro size={18} /> <span className="uppercase">{horse.price_range || 'On Request'}</span></div>
                      </div>
                      
                      <div className="inline-flex items-center gap-3 text-white font-bold tracking-widest uppercase border-b border-white/30 pb-1 group-hover:border-accent group-hover:text-accent transition-all duration-300 opacity-0 group-hover:opacity-100 delay-300">
                        Discover Details <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / displayHorses.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  )
}

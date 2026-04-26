'use client'

import { motion, AnimatePresence } from 'framer-motion'
import React, { ReactNode } from 'react'

export function Reveal({ children, delay = 0, width = "100%", direction = "up" }: { children: ReactNode, delay?: number, width?: "fit-content" | "100%", direction?: "up" | "down" | "left" | "right" }) {
  const directions = {
    up: { y: 75, x: 0 },
    down: { y: -75, x: 0 },
    left: { x: 75, y: 0 },
    right: { x: -75, y: 0 }
  }

  return (
    <div style={{ position: "relative", width, overflow: "visible" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, ...directions[direction] },
          visible: { opacity: 1, y: 0, x: 0 }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function StaggerContainer({ children, delayChildren = 0.1, staggerChildren = 0.1, className = "" }: { children: ReactNode, delayChildren?: number, staggerChildren?: number, className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren
          }
        }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ParallaxImage({ src, alt, className = "" }: { src: string, alt: string, className?: string }) {
  return (
    <motion.div 
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
      />
      <motion.div 
        className="absolute inset-0 bg-black/20"
        initial={{ opacity: 0.5 }}
        whileHover={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  )
}

export function HoverCard({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function CoolButton({ children, onClick, className = "", type = "button" }: { children: ReactNode, onClick?: () => void, className?: string, type?: "button" | "submit" | "reset" }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden group px-8 py-4 font-bold text-lg rounded-xl transition-all ${className}`}
    >
      <motion.span 
        className="absolute inset-0 bg-white/20 skew-x-[-20deg]"
        initial={{ x: "-150%" }}
        whileHover={{ x: "150%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

export function Slideshow({ images, interval = 4000 }: { images: string[], interval?: number }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl group">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      
      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60" />

      {/* Futuristic Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-700 ease-in-out ${i === currentIndex ? 'w-10 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'w-2 bg-white/40 hover:bg-white/70 cursor-pointer'}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import NavLinks from './NavLinks'

export default function MobileMenu({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div className="lg:hidden flex items-center relative z-[120]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-primary hover:text-accent p-2 transition-colors focus:outline-none relative z-[130]" 
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-md z-[120] transform transition-transform duration-500 ease-in-out flex flex-col pt-32 px-8 pb-32 overflow-y-auto h-screen w-full ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: 0, left: 0 }}
      >
        <nav className="flex flex-col space-y-6">
          <div className="mb-4">
            <LanguageSwitcher />
          </div>

          <NavLinks user={user} isMobile={true} setIsOpen={setIsOpen} />
        </nav>
      </div>
    </div>
  )
}

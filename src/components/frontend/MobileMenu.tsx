'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

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
          {user ? (
            <>
              <Link onClick={() => setIsOpen(false)} href="/admin" className="text-2xl font-serif font-bold text-accent hover:text-primary transition-colors uppercase">
                Admin Dashboard
              </Link>
            </>
          ) : (
            <Link onClick={() => setIsOpen(false)} href="/admin/login" className="text-2xl font-serif font-bold text-accent hover:text-primary transition-colors uppercase">
              Login
            </Link>
          )}
          
          <Link onClick={() => setIsOpen(false)} href="/about" className="text-2xl font-serif font-bold text-primary hover:text-accent transition-colors uppercase">
            About Us
          </Link>
          <Link onClick={() => setIsOpen(false)} href="/horses" className="text-2xl font-serif font-bold text-primary hover:text-accent transition-colors uppercase">
            Portfolio
          </Link>
          <Link onClick={() => setIsOpen(false)} href="/references" className="text-2xl font-serif font-bold text-primary hover:text-accent transition-colors uppercase">
            References
          </Link>
          <Link onClick={() => setIsOpen(false)} href="/roi" className="text-2xl font-serif font-bold text-primary hover:text-accent transition-colors uppercase">
            ROI
          </Link>
          <Link onClick={() => setIsOpen(false)} href="/news" className="text-2xl font-serif font-bold text-primary hover:text-accent transition-colors uppercase">
            News
          </Link>
          <Link onClick={() => setIsOpen(false)} href="/contact" className="text-2xl font-serif font-bold text-primary hover:text-accent transition-colors uppercase">
            Contact
          </Link>
        </nav>
      </div>
    </div>
  )
}

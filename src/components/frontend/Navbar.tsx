import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/actions/auth'
import { Menu } from 'lucide-react'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#e6e6e6]/95 backdrop-blur-md border-b border-gray-100 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 relative w-full">
          
          {/* Logo Left */}
          <div className="flex items-center space-x-4 z-[110]">
            <Link href="/" className="group relative block">
              <div className="flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="Equivest Logo" 
                  width={56} 
                  height={56} 
                  className="w-14 h-14 object-contain transition-transform duration-500 group-hover:scale-110 animate-[spin_15s_linear_infinite]" 
                />
              </div>
            </Link>
            <Link href="/" className="flex flex-col text-left justify-center shrink-0">
              <span className="text-2xl font-serif font-bold tracking-tight text-primary uppercase leading-none">Equivest</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-primary/90 uppercase mt-1 self-end">Since 1995</span>
            </Link>
          </div>

          {/* Desktop Navigation Center */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-[110]">
            <nav className="flex items-center space-x-4 xl:space-x-6">
              {user ? (
                <form action={logout}>
                  <button type="submit" className="text-sm xl:text-base font-bold uppercase tracking-[0.15em] text-accent hover:text-primary transition-colors py-2">
                    Logout
                  </button>
                </form>
              ) : (
                <Link href="/admin/login" className="text-sm xl:text-base font-bold uppercase tracking-[0.15em] text-accent hover:text-primary transition-colors py-2">
                  Login
                </Link>
              )}
              
              <Link href="/about" className="text-sm xl:text-base font-bold uppercase tracking-[0.15em] text-primary hover:text-accent transition-colors py-2">
                About Us
              </Link>
              <Link href="/horses" className="text-sm xl:text-base font-bold uppercase tracking-[0.15em] text-primary hover:text-accent transition-colors py-2">
                Portfolio
              </Link>
              <Link href="/references" className="text-sm xl:text-base font-bold uppercase tracking-[0.15em] text-primary hover:text-accent transition-colors py-2">
                References
              </Link>
              <Link href="/roi" className="text-sm xl:text-base font-bold uppercase tracking-[0.15em] text-primary hover:text-accent transition-colors py-2">
                ROI
              </Link>
              <Link href="/news" className="text-sm xl:text-base font-bold uppercase tracking-[0.15em] text-primary hover:text-accent transition-colors py-2">
                News
              </Link>
              <Link href="/contact" className="text-sm xl:text-base font-bold uppercase tracking-[0.15em] text-primary hover:text-accent transition-colors py-2">
                Contact
              </Link>
            </nav>
          </div>

          {/* Right side controls & Mobile menu button */}
          <div className="flex items-center space-x-2 md:space-x-4 ml-auto z-[110]">
            {user && (
              <Link href="/admin" className="hidden md:flex items-center text-sm font-bold uppercase tracking-[0.15em] text-primary hover:text-accent transition-colors">
                Admin
              </Link>
            )}

            <div className="lg:hidden flex items-center relative">
              <button className="text-primary hover:text-accent p-2 transition-colors focus:outline-none" aria-label="Toggle menu">
                <Menu size={28} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}

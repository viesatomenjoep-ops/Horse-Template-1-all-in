import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/actions/auth'
import ScrollLogo from './ScrollLogo'
import MobileMenu from './MobileMenu'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import NavLinks from './NavLinks'

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
              <ScrollLogo>
                <Image 
                  src="/logo.png" 
                  alt="Equivest Logo" 
                  width={56} 
                  height={56} 
                  className="w-14 h-14 object-contain transition-transform duration-500 group-hover:scale-110" 
                />
              </ScrollLogo>
            </Link>
            <Link href="/" className="flex flex-col text-left justify-center shrink-0">
              <span className="text-2xl font-serif font-bold tracking-tight text-primary uppercase leading-none">Equivest</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-primary/90 uppercase mt-1 self-end">Since 1995</span>
            </Link>
          </div>

          {/* Desktop Navigation Center */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-[110]">
            <nav className="flex items-center space-x-3 lg:space-x-4 xl:space-x-5">
              <NavLinks user={user} logoutAction={logout} />
            </nav>
          </div>

          {/* Right side controls & Mobile menu button */}
          <div className="flex items-center space-x-2 md:space-x-4 ml-auto z-[110]">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {user && (
              <Link href="/admin" className="hidden md:flex items-center text-sm font-bold uppercase tracking-[0.15em] text-primary hover:text-accent transition-colors">
                Admin
              </Link>
            )}

            <MobileMenu user={user} />
          </div>

        </div>
      </div>
    </header>
  )
}

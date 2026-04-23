import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/actions/auth'
import { LogIn, LogOut, Menu, UserCircle } from 'lucide-react'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0A192F]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 text-2xl font-serif font-bold text-primary dark:text-white tracking-wide">
              <div className="relative w-10 h-10">
                <Image src="/logo.png" alt="Equivest Logo" fill className="object-contain" />
              </div>
              <div className="flex flex-col justify-center">
                <span>Equivest</span>
                <span className="text-xs font-sans font-light tracking-[0.2em] text-accent uppercase -mt-1">Since 1995</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/about" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent transition-colors">
              About Us
            </Link>
            <Link href="/horses" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent transition-colors">
              Portfolio
            </Link>
            <Link href="/references" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent transition-colors">
              References
            </Link>
            <Link href="/roi" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent transition-colors">
              ROI
            </Link>
            <Link href="/news" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent transition-colors">
              News
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent transition-colors">
              Contact
            </Link>

            {/* Auth State */}
            <div className="pl-4 border-l border-gray-300 dark:border-gray-700 flex items-center space-x-4">
              {user ? (
                <>
                  <Link href="/admin" className="flex items-center gap-2 text-sm font-medium text-primary dark:text-white hover:text-accent transition-colors">
                    <UserCircle size={18} />
                    Admin
                  </Link>
                  <form action={logout}>
                    <button type="submit" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-500 transition-colors">
                      <LogOut size={18} />
                      Logout
                    </button>
                  </form>
                </>
              ) : (
                <Link href="/admin/login" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent transition-colors">
                  <LogIn size={18} />
                  Login
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-700 dark:text-gray-300 hover:text-accent focus:outline-none">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

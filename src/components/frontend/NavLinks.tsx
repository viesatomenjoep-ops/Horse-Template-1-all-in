'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLinks({ user, isMobile = false, setIsOpen, logoutAction }: { user: any, isMobile?: boolean, setIsOpen?: (v: boolean) => void, logoutAction?: any }) {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/horses', label: 'Horses' },
    { href: '/services', label: 'Services' },
    { href: '/references', label: 'References' },
    { href: '/facilities', label: 'Facilities' },
  ]
  const lastLink = { href: '/contact', label: 'Contact' }

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  if (isMobile) {
    return (
      <>
        {links.map((link) => (
          <Link 
            key={link.href}
            onClick={() => setIsOpen?.(false)} 
            href={link.href} 
            className={`text-xl font-serif font-bold transition-colors uppercase ${isActive(link.href) ? 'text-accent' : 'text-primary hover:text-accent'}`}
          >
            {link.label}
          </Link>
        ))}

        {user ? (
          <>
            <Link onClick={() => setIsOpen?.(false)} href="/admin" className="text-xl font-serif font-bold text-accent hover:text-primary transition-colors uppercase">
              Admin Dashboard
            </Link>
            <form action={logoutAction} className="inline">
              <button type="submit" onClick={() => setIsOpen?.(false)} className="text-xl font-serif font-bold text-accent hover:text-primary transition-colors uppercase text-left w-full">
                Log Out
              </button>
            </form>
          </>
        ) : (
          <Link onClick={() => setIsOpen?.(false)} href="/login" className="text-xl font-serif font-bold text-accent hover:text-primary transition-colors uppercase">
            Log In
          </Link>
        )}
        
        <Link 
          onClick={() => setIsOpen?.(false)} 
          href={lastLink.href} 
          className={`text-xl font-serif font-bold transition-colors uppercase ${isActive(lastLink.href) ? 'text-accent' : 'text-primary hover:text-accent'}`}
        >
          {lastLink.label}
        </Link>
      </>
    )
  }

  return (
    <>
      {links.map((link) => (
        <Link 
          key={link.href}
          href={link.href} 
          className={`text-[11px] xl:text-sm font-bold uppercase tracking-wider transition-colors py-2 whitespace-nowrap ${isActive(link.href) ? 'text-accent' : 'text-primary hover:text-accent'}`}
        >
          {link.label}
        </Link>
      ))}

      {user ? (
        <form action={logoutAction}>
          <button type="submit" className="text-[11px] xl:text-sm font-bold uppercase tracking-wider text-accent hover:text-primary transition-colors py-2 whitespace-nowrap">
            Log Out
          </button>
        </form>
      ) : (
        <Link href="/login" className={`text-[11px] xl:text-sm font-bold uppercase tracking-wider transition-colors py-2 whitespace-nowrap ${isActive('/login') ? 'text-accent' : 'text-accent hover:text-primary'}`}>
          Log In
        </Link>
      )}
      
      <Link 
        href={lastLink.href} 
        className={`text-[11px] xl:text-sm font-bold uppercase tracking-wider transition-colors py-2 whitespace-nowrap ${isActive(lastLink.href) ? 'text-accent' : 'text-primary hover:text-accent'}`}
      >
        {lastLink.label}
      </Link>
    </>
  )
}

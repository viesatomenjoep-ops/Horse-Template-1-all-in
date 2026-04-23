'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, Database, Users, UserCircle, Newspaper, Settings, LogOut, Home, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/actions/auth'

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Overview' },
    { href: '/admin/horses', icon: Database, label: 'Horses' },
    { href: '/admin/staff', icon: Users, label: 'Staff & Time' },
    { href: '/admin/team', icon: UserCircle, label: 'Team' },
    { href: '/admin/news', icon: Newspaper, label: 'News' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-40">
        <span className="text-lg font-serif font-semibold text-primary dark:text-white">Equivest CMS</span>
        <button onClick={() => setIsOpen(true)} className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white">
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col
        transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen md:sticky md:top-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xl font-serif font-semibold text-primary dark:text-white">Equivest CMS</span>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500 hover:text-primary">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white' 
                    : 'text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary' : 'text-gray-500'}`} />
                {item.label}
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <Link href="/" className="flex w-full items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <Home className="mr-3 h-5 w-5 text-gray-500" />
            Return to Website
          </Link>
          <form action={logout}>
             <button type="submit" className="flex w-full items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20">
               <LogOut className="mr-3 h-5 w-5" />
               Sign out
             </button>
          </form>
        </div>
      </aside>
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LayoutDashboard, Database, Users, UserCircle, Newspaper, Settings, LogOut, Home, Menu, X, Camera, ClipboardList, FileText, Calendar } from 'lucide-react'

import { usePathname } from 'next/navigation'
import { logout } from '@/app/actions/auth'
import { getCurrentUserPermissions } from '@/app/actions/permissions'

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [userRole, setUserRole] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    async function loadPermissions() {
      try {
        const data = await getCurrentUserPermissions()
        setUserRole(data)
      } catch (err) {
        console.error(err)
      }
    }
    loadPermissions()
  }, [])

  const allNavItems = [
    { id: 'overview', href: '/admin', icon: LayoutDashboard, label: 'Overview' },
    { id: 'appointments', href: '/admin/appointments', icon: Calendar, label: 'Bezoeken (Nieuw)' },
    { id: 'horses', href: '/admin/horses', icon: Database, label: 'Horses' },
    { id: 'references', href: '/admin/references', icon: Camera, label: 'References' },
    { id: 'inventory', href: '/admin/inventory', icon: ClipboardList, label: 'Voorraad' },
    { id: 'quotes', href: '/admin/quotes', icon: FileText, label: 'Offertes & Orders' },
    { id: 'staff', href: '/admin/staff', icon: Users, label: 'Staff & Time' },
    { id: 'team', href: '/admin/team', icon: UserCircle, label: 'Team' },
    { id: 'news', href: '/admin/news', icon: Newspaper, label: 'News' },
    { id: 'settings', href: '/admin/settings', icon: Settings, label: 'Settings' },
  ]

  // Filter items based on permissions
  const navItems = allNavItems.filter(item => {
    // Overview is always visible if they have CMS access
    if (item.id === 'overview') return true
    
    // Superadmin sees everything
    if (userRole?.role === 'superadmin') return true
    
    // Staff sees only what they have permission for
    if (userRole?.permissions?.[item.id]) return true
    
    return false
  })

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Equivest Logo" width={32} height={32} className="w-8 h-8 object-contain" />
          <span className="text-lg font-serif font-semibold text-primary dark:text-white">Equivest CMS</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsOpen(true)} className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white">
            <Menu size={24} />
          </button>
        </div>
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
        fixed inset-y-0 left-0 z-50 w-[85%] md:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col
        transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen md:sticky md:top-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Equivest Logo" width={32} height={32} className="w-8 h-8 object-contain" />
            <span className="text-xl font-serif font-semibold text-primary dark:text-white">CMS</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500 hover:text-primary p-2">
              <X size={28} />
            </button>
          </div>
        </div>
        
        <nav className="flex-1 p-4 md:p-4 space-y-2 md:space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-4 md:px-3 md:py-2 text-lg md:text-sm font-medium rounded-lg md:rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white' 
                    : 'text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className={`mr-4 md:mr-3 h-6 w-6 md:h-5 md:w-5 ${isActive ? 'text-primary' : 'text-gray-500'}`} />
                {item.label}
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <Link href="/" className="flex w-full items-center px-4 py-4 md:px-3 md:py-2 text-lg md:text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg md:rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <Home className="mr-4 md:mr-3 h-6 w-6 md:h-5 md:w-5 text-gray-500" />
            Return to Website
          </Link>
          <form action={logout}>
             <button type="submit" className="flex w-full items-center px-4 py-4 md:px-3 md:py-2 text-lg md:text-sm font-medium text-red-600 rounded-lg md:rounded-md hover:bg-red-50 dark:hover:bg-red-900/20">
               <LogOut className="mr-4 md:mr-3 h-6 w-6 md:h-5 md:w-5" />
               Sign out
             </button>
          </form>
        </div>
      </aside>
    </>
  )
}

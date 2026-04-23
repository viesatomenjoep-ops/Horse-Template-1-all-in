import Link from 'next/link'
import { LayoutDashboard, Database, Users, Newspaper, Settings, LogOut } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xl font-serif font-semibold text-primary dark:text-white">Antigravity CMS</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <LayoutDashboard className="mr-3 h-5 w-5 text-gray-500" />
            Overview
          </Link>
          <Link href="/admin/horses" className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <Database className="mr-3 h-5 w-5 text-gray-500" />
            Horses
          </Link>
          <Link href="/admin/leads" className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <Users className="mr-3 h-5 w-5 text-gray-500" />
            Leads
          </Link>
          <Link href="/admin/news" className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <Newspaper className="mr-3 h-5 w-5 text-gray-500" />
            News
          </Link>
          <Link href="/admin/settings" className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <Settings className="mr-3 h-5 w-5 text-gray-500" />
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button className="flex w-full items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20">
            <LogOut className="mr-3 h-5 w-5" />
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}

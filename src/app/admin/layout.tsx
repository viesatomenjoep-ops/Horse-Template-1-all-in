import AdminSidebar from '@/components/admin/AdminSidebar'
import { getCurrentUserPermissions } from '@/app/actions/permissions'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { logout } from '@/app/actions/auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const permissions = await getCurrentUserPermissions()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!permissions) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl max-w-md text-center border border-red-200 dark:border-red-900/30">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Toegang Geweigerd</h2>
          <p className="text-sm font-mono bg-gray-100 dark:bg-gray-700 py-1 px-3 rounded-md mb-4 inline-block text-gray-600 dark:text-gray-300">
            {user?.email || 'Onbekend email'}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Bovenstaand account heeft momenteel geen toegangsrechten voor het CMS. Klik op "Uitloggen" en log in met een bevoegd account (zoals de hoofd admin).
          </p>
          <form action={logout}>
            <button type="submit" className="flex items-center justify-center w-full gap-2 bg-primary text-white py-3 rounded-lg hover:bg-secondary transition-colors">
              <LogOut size={18} />
              Uitloggen om opnieuw in te loggen
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-8 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}

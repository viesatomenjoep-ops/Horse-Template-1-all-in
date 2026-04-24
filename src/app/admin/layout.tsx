import AdminSidebar from '@/components/admin/AdminSidebar'
import { getCurrentUserPermissions } from '@/app/actions/permissions'
import { redirect } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { logout } from '@/app/actions/auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const permissions = await getCurrentUserPermissions()

  if (!permissions) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl max-w-md text-center border border-red-200 dark:border-red-900/30">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Toegang Geweigerd</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Je account heeft momenteel geen toegangsrechten voor het CMS. Vraag de beheerder om je e-mailadres toe te voegen via de instellingen.
          </p>
          <form action={logout}>
            <button type="submit" className="flex items-center justify-center w-full gap-2 bg-primary text-white py-3 rounded-lg hover:bg-secondary transition-colors">
              <LogOut size={18} />
              Uitloggen
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

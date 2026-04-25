import { getDashboardStats } from '@/app/actions/analytics'
import { Eye, Database, Calendar as CalendarIcon, FileText, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default async function AdminOverview() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        <Link href="/admin/horses" className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 rounded-xl p-6 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 transition-colors">
              <Database size={24} />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate group-hover:text-primary transition-colors">Total Horses</dt>
                <dd className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalHorses}</dd>
              </dl>
            </div>
          </div>
        </Link>

        <Link href="/admin/schedules" className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 rounded-xl p-6 hover:shadow-md hover:border-green-500/30 transition-all cursor-pointer group">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 group-hover:bg-green-200 transition-colors">
              <CalendarIcon size={24} />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate group-hover:text-green-600 transition-colors">Bezoeken & Afspraken</dt>
                <dd className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalAppointments}</dd>
              </dl>
            </div>
          </div>
        </Link>

        <Link href="/admin/quotes" className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 rounded-xl p-6 hover:shadow-md hover:border-yellow-500/30 transition-all cursor-pointer group">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 group-hover:bg-yellow-200 transition-colors">
              <FileText size={24} />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate group-hover:text-yellow-600 transition-colors">Offertes & Orders</dt>
                <dd className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalQuotes}</dd>
              </dl>
            </div>
          </div>
        </Link>

        <Link href="/admin/horses" className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 rounded-xl p-6 hover:shadow-md hover:border-purple-500/30 transition-all cursor-pointer group">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:bg-purple-200 transition-colors">
              <TrendingUp size={24} />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate group-hover:text-purple-600 transition-colors">Total Profile Views</dt>
                <dd className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.topHorses.reduce((acc: number, curr: any) => acc + (curr.views || 0), 0)}
                </dd>
              </dl>
            </div>
          </div>
        </Link>

      </div>

      {/* Financial Overview (Inventory) */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-gray-700/50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white flex items-center">
            <TrendingUp className="mr-2 text-primary" /> Financieel Overzicht (Voorraad)
          </h3>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-700/50">
          <div className="flex flex-col items-center sm:items-start pt-4 sm:pt-0">
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Totale Inkoopwaarde</span>
            <span className="text-3xl font-bold text-white mt-2">
              {new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(stats.inventoryCost)}
            </span>
          </div>
          <div className="flex flex-col items-center sm:items-start pt-4 sm:pt-0 sm:pl-6">
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Totale Verkoopwaarde</span>
            <span className="text-3xl font-bold text-white mt-2">
              {new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(stats.inventoryValue)}
            </span>
          </div>
          <div className="flex flex-col items-center sm:items-start pt-4 sm:pt-0 sm:pl-6">
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Potentiële Winst</span>
            <span className={`text-3xl font-bold mt-2 ${stats.inventoryProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(stats.inventoryProfit)}
            </span>
          </div>
        </div>
      </div>

      {/* Analytics Graph / Top Viewed Horses */}
      <div className="mt-8 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <Eye className="mr-2 text-accent" /> Meest Bekeken Paarden (Analytics)
          </h3>
        </div>
        <div className="p-6">
          {stats.topHorses.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Nog geen data beschikbaar. Bezoek een paard op de website om views te meten.</p>
          ) : (
            <div className="space-y-6">
              {stats.topHorses.map((horse: any, index: number) => {
                const maxViews = Math.max(...stats.topHorses.map((h: any) => h.views || 0), 1);
                const percentage = ((horse.views || 0) / maxViews) * 100;

                return (
                  <div key={horse.id} className="flex items-center">
                    <span className="w-6 font-bold text-gray-400">{index + 1}.</span>
                    <div className="flex-1 ml-4">
                      <div className="flex justify-between mb-1">
                        <Link href={`/admin/horses/${horse.id}/edit`} className="font-medium text-primary dark:text-white hover:text-accent transition-colors">
                          {horse.name}
                        </Link>
                        <span className="text-sm font-bold text-accent">{horse.views || 0} views</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-accent h-2.5 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

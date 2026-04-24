import { getInventoryItems } from '@/app/actions/inventory'
import Link from 'next/link'
import { Plus, AlertTriangle, PackageSearch } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function InventoryPage() {
  const items = await getInventoryItems()

  // Group items by category
  const categories = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, typeof items>)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif text-primary dark:text-white">Voorraadbeheer</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Beheer voer, supplementen en materialen.</p>
        </div>
        <Link
          href="/admin/inventory/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Nieuw Artikel</span>
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-700">
          <PackageSearch className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Geen voorraad gevonden</h3>
          <p className="mt-2 text-gray-500">Begin met het toevoegen van je eerste product.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(categories).map(([category, catItems]) => (
            <div key={category} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white">{category}</h2>
              </div>
              
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {(catItems as any[]).map((item) => {
                  const isLowStock = Number(item.quantity) <= Number(item.low_stock_threshold)
                  
                  return (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium text-lg text-gray-900 dark:text-white">{item.name}</h3>
                          {isLowStock && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                              <AlertTriangle size={14} />
                              Bijna op
                            </span>
                          )}
                        </div>
                        {item.supplier && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Leverancier: {item.supplier}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className={`text-2xl font-bold ${isLowStock ? 'text-red-600 dark:text-red-400' : 'text-primary dark:text-white'}`}>
                            {item.quantity}
                          </p>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">{item.unit}</p>
                        </div>
                        
                        <Link 
                          href={`/admin/inventory/${item.id}`}
                          className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          Afboeken / Bijvullen
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import { getQuotes } from '@/app/actions/quotes'
import Link from 'next/link'
import { Plus, FileText, Send, CheckCircle, LayoutDashboard, Table as TableIcon } from 'lucide-react'
import QuotesKanbanBoard from '@/components/admin/QuotesKanbanBoard'

export default async function QuotesPage(props: { searchParams?: Promise<{ view?: string }> }) {
  const searchParams = props.searchParams ? await props.searchParams : {}
  const view = searchParams.view || 'kanban'
  const quotes = await getQuotes()

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary dark:text-white">Offertes & Orders</h1>
          <p className="text-gray-500 mt-1">Beheer je offertes en verstuur ze direct naar klanten.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white dark:bg-gray-800 p-1 rounded-md border border-gray-200 dark:border-gray-700 flex items-center mr-2 shadow-sm">
            <Link href="?view=kanban" className={`p-1.5 rounded ${view === 'kanban' ? 'bg-gray-100 dark:bg-gray-700 text-primary dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}>
              <LayoutDashboard size={18} />
            </Link>
            <Link href="?view=table" className={`p-1.5 rounded ${view === 'table' ? 'bg-gray-100 dark:bg-gray-700 text-primary dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}>
              <TableIcon size={18} />
            </Link>
          </div>
          <Link 
            href="/admin/quotes/new?type=quote" 
            className="flex items-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors font-medium"
          >
            <FileText size={20} className="mr-2" />
            Nieuwe Offerte
          </Link>
          <Link 
            href="/admin/quotes/new?type=order" 
            className="flex items-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors font-medium"
          >
            <Plus size={20} className="mr-2" />
            Nieuwe Order
          </Link>
        </div>
      </div>

      {view === 'kanban' ? (
        <QuotesKanbanBoard initialQuotes={quotes} />
      ) : (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300">Nummer</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300">Type</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300">Klant</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300">Datum</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300">Bedrag</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-right">Actie</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {quotes.map((quote: any) => (
                <tr key={quote.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-primary dark:text-white">{quote.quote_number}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                      quote.type === 'order' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                      {quote.type === 'order' ? 'ORDER' : 'OFFERTE'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900 dark:text-gray-100">{quote.client_name}</div>
                    <div className="text-sm text-gray-500">{quote.client_email}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    {new Date(quote.date).toLocaleDateString('nl-NL')}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    € {Number(quote.total_amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      quote.status === 'sent' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                      quote.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      quote.status === 'paid' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {quote.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/admin/quotes/${quote.id}`}
                      className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Bekijk
                    </Link>
                  </td>
                </tr>
              ))}
              {quotes.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    Nog geen offertes of orders aangemaakt.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </div>
  )
}

import Link from 'next/link'
import { Globe, FileText, LayoutDashboard, Edit } from 'lucide-react'

export const metadata = {
  title: 'Website CMS - Equivest',
}

export default function CMSHubPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <Globe size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Website CMS</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Beheer hier de teksten en inhoud van de publieke website.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Investors Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
              <LayoutDashboard size={24} />
            </div>
            <h2 className="text-xl font-bold">Investors Pagina</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 h-10">
            Beheer de teksten, banners en instellingen van de besloten Investors sectie op de website.
          </p>
          <Link 
            href="/admin/pages/investors"
            className="flex items-center justify-center gap-2 w-full py-3 bg-gray-50 dark:bg-gray-700 hover:bg-primary hover:text-white text-primary font-bold rounded-xl transition-colors"
          >
            <Edit size={16} /> Bewerk Investors Content
          </Link>
        </div>

        {/* About Text */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 text-green-600 p-2 rounded-lg">
              <FileText size={24} />
            </div>
            <h2 className="text-xl font-bold">Over Ons (About)</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 h-10">
            Bewerk de biografieën (zoals die van Tom), de bedrijfsbeschrijving en de achtergrondinformatie.
          </p>
          <Link 
            href="/admin/pages/about"
            className="flex items-center justify-center gap-2 w-full py-3 bg-gray-50 dark:bg-gray-700 hover:bg-primary hover:text-white text-primary font-bold rounded-xl transition-colors"
          >
            <Edit size={16} /> Bewerk About Teksten
          </Link>
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'
import { Users, FileText, MessageSquare, Zap, Flame, ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Customer CRM - Equivest',
}

export default function CRMHubPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <Users size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Customer CRM Hub</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Beheer al je relaties, leads, offertes en outreach op één plek.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CRM Leads */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
              <Flame size={24} />
            </div>
            <h2 className="text-xl font-bold">Leads & Klanten</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 h-10">
            Bekijk je AI-gegenereerde profielen, hot leads en bestaande klanten.
          </p>
          <Link 
            href="/admin/crm/leads"
            className="flex items-center justify-center gap-2 w-full py-3 bg-gray-50 dark:bg-gray-700 hover:bg-primary hover:text-white text-primary font-bold rounded-xl transition-colors"
          >
            <ExternalLink size={16} /> Open Leads Dashboard
          </Link>
        </div>

        {/* Quotes & Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 text-green-600 p-2 rounded-lg">
              <FileText size={24} />
            </div>
            <h2 className="text-xl font-bold">Offertes & Orders</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 h-10">
            Maak dynamische offertes aan voor paarden of diensten en volg de betalingen op.
          </p>
          <Link 
            href="/admin/quotes"
            className="flex items-center justify-center gap-2 w-full py-3 bg-gray-50 dark:bg-gray-700 hover:bg-primary hover:text-white text-primary font-bold rounded-xl transition-colors"
          >
            <ExternalLink size={16} /> Beheer Offertes
          </Link>
        </div>

        {/* LinkedIn Outreach */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
              <MessageSquare size={24} />
            </div>
            <h2 className="text-xl font-bold">LinkedIn Outreach</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 h-10">
            Genereer gepersonaliseerde berichten voor potentiële investeerders en kopers via AI.
          </p>
          <Link 
            href="/admin/linkedin"
            className="flex items-center justify-center gap-2 w-full py-3 bg-gray-50 dark:bg-gray-700 hover:bg-primary hover:text-white text-primary font-bold rounded-xl transition-colors"
          >
            <ExternalLink size={16} /> Open LinkedIn Tool
          </Link>
        </div>

        {/* Magic Links */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
              <Zap size={24} />
            </div>
            <h2 className="text-xl font-bold">Magic Links</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 h-10">
            Genereer tijdelijke inloglinks zonder wachtwoord voor je investeerders en klanten.
          </p>
          <Link 
            href="/admin/magic-links"
            className="flex items-center justify-center gap-2 w-full py-3 bg-gray-50 dark:bg-gray-700 hover:bg-primary hover:text-white text-primary font-bold rounded-xl transition-colors"
          >
            <ExternalLink size={16} /> Genereer Magic Links
          </Link>
        </div>
      </div>
    </div>
  )
}

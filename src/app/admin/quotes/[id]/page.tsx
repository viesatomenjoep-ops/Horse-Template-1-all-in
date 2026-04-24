'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getQuoteWithItems, sendQuoteEmail } from '@/app/actions/quotes'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Printer, Send, Mail } from 'lucide-react'

export default function QuoteDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [data, setData] = useState<{ quote: any, items: any[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [emailPass, setEmailPass] = useState('')
  const [sending, setSending] = useState(false)
  const [showEmailDialog, setShowEmailDialog] = useState(false)

  useEffect(() => {
    async function fetchQuote() {
      if (id) {
        const res = await getQuoteWithItems(id as string)
        setData(res)
      }
      setLoading(false)
    }
    fetchQuote()
  }, [id])

  if (loading) return <div className="p-10 text-center">Laden...</div>
  if (!data || !data.quote) return <div className="p-10 text-center text-red-500">Offerte niet gevonden.</div>

  const { quote, items } = data

  const handlePrint = () => {
    window.print()
  }

  const handleSendEmail = async () => {
    if (!emailPass || emailPass.length < 16) {
      alert("Voer een geldig 16-letterig Google App-wachtwoord in (zonder spaties).")
      return
    }

    setSending(true)
    try {
      // Remove spaces if user copy pasted with spaces
      const cleanPass = emailPass.replace(/\s+/g, '')
      await sendQuoteEmail(quote.id, cleanPass)
      alert("Offerte is succesvol verzonden!")
      setShowEmailDialog(false)
      
      // Update local state to show 'sent'
      setData({ ...data, quote: { ...quote, status: 'sent' } })
    } catch (error: any) {
      console.error(error)
      alert("Fout bij verzenden: " + error.message)
    }
    setSending(false)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 print:p-0 print:max-w-none">
      
      {/* Action Bar (Hidden when printing) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <Link href="/admin/quotes" className="flex items-center text-gray-500 hover:text-primary transition-colors">
          <ArrowLeft size={20} className="mr-2" /> Terug naar overzicht
        </Link>
        <div className="flex gap-3">
          <button onClick={handlePrint} className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Printer size={18} className="mr-2" /> Print / PDF Opslaan
          </button>
          <button onClick={() => setShowEmailDialog(true)} className="flex items-center px-4 py-2 bg-accent text-white rounded-md hover:bg-primary transition-colors">
            <Send size={18} className="mr-2" /> Verstuur per E-mail
          </button>
        </div>
      </div>

      {/* Email Dialog */}
      {showEmailDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 print:hidden">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <Mail className="mr-2" /> E-mail Versturen
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Deze offerte wordt verzonden naar <strong>{quote.client_email}</strong> vanuit jouw e-mailadres (tomjo118735@gmail.com).
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Google App-wachtwoord</label>
              <input 
                type="password" 
                placeholder="abcd efgh ijkl mnop"
                value={emailPass}
                onChange={(e) => setEmailPass(e.target.value)}
                className="w-full p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-accent outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Plak hier de 16-letterige code uit je Google Account.</p>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button onClick={() => setShowEmailDialog(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Annuleren</button>
              <button onClick={handleSendEmail} disabled={sending} className="px-4 py-2 bg-accent text-white rounded-md disabled:opacity-50">
                {sending ? 'Verzenden...' : 'Verstuur E-mail'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Document */}
      <div className="bg-white rounded-sm shadow-md border border-gray-100 p-10 sm:p-16 print:shadow-none print:border-none print:p-0">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-primary pb-8">
          <div>
            <Image src="/logo.png" alt="Equivest" width={80} height={80} className="w-20 h-20 object-contain mb-4" />
            <h1 className="text-4xl font-serif font-bold text-primary tracking-tight">EQUIVEST</h1>
            <p className="text-xs tracking-[0.2em] font-bold text-primary uppercase mt-1">Premium Sport Horses</p>
          </div>
          <div className="text-right text-sm text-gray-600 space-y-1">
            <h2 className="text-3xl font-serif font-bold text-accent mb-4">OFFERTE</h2>
            <p><strong>Nummer:</strong> {quote.quote_number}</p>
            <p><strong>Datum:</strong> {new Date(quote.date).toLocaleDateString('nl-NL')}</p>
            {quote.valid_until && <p><strong>Geldig tot:</strong> {new Date(quote.valid_until).toLocaleDateString('nl-NL')}</p>}
          </div>
        </div>

        {/* Addresses */}
        <div className="flex justify-between mt-10 text-sm">
          <div className="space-y-1 text-gray-600">
            <h3 className="font-bold text-primary text-base mb-2">Van</h3>
            <p>Equivest Worldwide</p>
            <p>tomjo118735@gmail.com</p>
            {/* Add actual company address here if known */}
          </div>
          <div className="space-y-1 text-gray-600 text-right sm:text-left sm:w-1/3">
            <h3 className="font-bold text-primary text-base mb-2">Aan</h3>
            <p className="font-medium text-gray-900">{quote.client_name}</p>
            {quote.client_company && <p>{quote.client_company}</p>}
            {quote.client_address && <p>{quote.client_address}</p>}
            <p>{quote.client_email}</p>
          </div>
        </div>

        {/* Line Items */}
        <div className="mt-12">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b-2 border-primary text-primary">
                <th className="py-3 font-bold">Omschrijving</th>
                <th className="py-3 font-bold text-center w-24">Aantal</th>
                <th className="py-3 font-bold text-right w-32">Stukprijs</th>
                <th className="py-3 font-bold text-right w-32">Totaal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {items.map((item: any, i: number) => (
                <tr key={i}>
                  <td className="py-4">{item.description}</td>
                  <td className="py-4 text-center">{item.quantity}</td>
                  <td className="py-4 text-right">€ {Number(item.unit_price).toFixed(2)}</td>
                  <td className="py-4 text-right">€ {Number(item.total).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="mt-8 flex justify-end">
          <div className="w-64 space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotaal</span>
              <span>€ {Number(quote.subtotal).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>BTW ({quote.tax_rate}%)</span>
              <span>€ {Number(quote.tax_amount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-primary border-t-2 border-primary pt-2">
              <span>Totaal</span>
              <span>€ {Number(quote.total_amount).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {quote.notes && (
          <div className="mt-16 text-sm text-gray-600">
            <h4 className="font-bold text-primary mb-1">Opmerkingen</h4>
            <p className="whitespace-pre-wrap">{quote.notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
          <p>Equivest Worldwide — Premium Sport Horses Since 1995</p>
        </div>

      </div>
    </div>
  )
}

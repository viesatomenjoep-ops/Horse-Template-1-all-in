import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ShieldCheck, CreditCard, Apple, Lock } from 'lucide-react'

export const metadata = {
  title: 'Secure Payment | Equivest',
  robots: 'noindex, nofollow'
}

export default async function PaymentPage(props: { params: Promise<{ token: string }> }) {
  const params = await props.params
  
  // In a real app, look up the payment intent via token
  // For the demo, we mock it based on token length
  if (!params.token || params.token.length < 5) notFound()

  const amount = "€5,000.00"
  const description = "Deposit & Reservation Fee"
  const ref = "INV-" + params.token.substring(0, 6).toUpperCase()

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20 font-sans">
      <div className="max-w-xl mx-auto px-4">
        
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="Equivest" width={60} height={60} className="mx-auto mb-4" />
          <h1 className="text-2xl font-serif font-bold text-primary">Equivest Portfolio Management</h1>
          <p className="text-gray-500 text-sm mt-1">Secure Digital Checkout</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 p-8 border-b border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 uppercase tracking-wider text-xs font-bold">Amount Due</span>
              <span className="text-gray-500 text-xs">Ref: {ref}</span>
            </div>
            <p className="text-5xl font-serif font-bold text-gray-900">{amount}</p>
            <p className="text-sm text-gray-600 mt-2">{description}</p>
          </div>

          <div className="p-8">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CreditCard size={20} className="text-accent" /> Payment Method
            </h3>

            <div className="space-y-3 mb-8">
              {/* Fake Apple Pay Button */}
              <button className="w-full flex items-center justify-center gap-2 py-4 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors font-medium">
                Pay with <Apple size={20} className="mb-1" /> Pay
              </button>
              
              <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">or pay with card</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Fake Card Form */}
              <div className="space-y-4">
                <input type="text" placeholder="Card Information" className="w-full p-4 rounded-lg border border-gray-300 focus:border-accent focus:ring-1 focus:ring-accent outline-none" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM / YY" className="w-full p-4 rounded-lg border border-gray-300 focus:border-accent focus:ring-1 focus:ring-accent outline-none" />
                  <input type="text" placeholder="CVC" className="w-full p-4 rounded-lg border border-gray-300 focus:border-accent focus:ring-1 focus:ring-accent outline-none" />
                </div>
                <input type="text" placeholder="Cardholder Name" className="w-full p-4 rounded-lg border border-gray-300 focus:border-accent focus:ring-1 focus:ring-accent outline-none" />
              </div>
            </div>

            <button onClick={() => alert('Demo: Payment successful!')} className="w-full flex justify-center items-center gap-2 py-4 bg-primary text-white rounded-lg font-bold hover:bg-secondary transition-colors shadow-md">
              <Lock size={18} /> Pay {amount}
            </button>
            
            <p className="text-center text-xs text-gray-400 mt-6 flex justify-center items-center gap-1">
              <ShieldCheck size={14} /> Secured by Stripe. 256-bit encryption.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

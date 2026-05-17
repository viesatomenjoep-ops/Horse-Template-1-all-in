'use client'

import { useState } from 'react'
import { Check, Star, CreditCard, ArrowRight, ShieldCheck, Zap } from 'lucide-react'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly')

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0a0a0a]">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary dark:text-white mb-6 uppercase tracking-tight">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mb-10">
          From private owners to large commercial stables, we have a plan that fits your needs. Digitize your operations today.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-bold uppercase tracking-wider ${billingCycle === 'monthly' ? 'text-primary dark:text-white' : 'text-gray-400'}`}>Monthly</span>
          <button 
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-16 h-8 rounded-full bg-primary relative transition-colors focus:outline-none"
          >
            <div className={`w-6 h-6 rounded-full bg-white absolute top-1 transition-transform ${billingCycle === 'yearly' ? 'translate-x-9' : 'translate-x-1'}`} />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold uppercase tracking-wider ${billingCycle === 'yearly' ? 'text-primary dark:text-white' : 'text-gray-400'}`}>Yearly</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold rounded-full">Save ~16%</span>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
        
        {/* BASIC */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative">
          <h2 className="text-2xl font-serif font-bold text-primary dark:text-white uppercase tracking-wider mb-2">Basic</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 h-10">Essential tools for private owners and small stables.</p>
          
          <div className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-serif font-bold text-primary dark:text-white">
                € {billingCycle === 'yearly' ? '490' : '49'}
              </span>
              <span className="text-gray-500 font-medium">/ {billingCycle === 'yearly' ? 'year' : 'month'}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Excl. VAT</p>
          </div>

          <div className="mb-10 flex-1 space-y-4">
            <Feature label="Up to 10 horses" />
            <Feature label="Basic Stable Management" />
            <Feature label="Digital Task Board" />
            <Feature label="Basic Feeding Schedules" />
            <Feature label="1 Admin Account" />
          </div>

          <button className="w-full py-4 rounded-xl bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white dark:bg-transparent dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-primary font-bold tracking-wider uppercase transition-colors">
            Start Free Trial
          </button>
        </div>

        {/* PREMIUM (Most Popular) */}
        <div className="bg-primary text-white rounded-3xl p-8 shadow-2xl relative flex flex-col transform md:-translate-y-4 border border-primary-light/30 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="absolute top-0 inset-x-0 flex justify-center -mt-0">
            <div className="bg-accent text-white text-[10px] font-bold uppercase tracking-widest py-1 px-4 rounded-b-xl">
              Most Popular
            </div>
          </div>

          <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-wider mb-2 mt-4 flex items-center gap-2">
            <Star size={20} className="text-accent" /> Premium
          </h2>
          <p className="text-gray-300 text-sm mb-6 h-10">Professional operations aiming to optimize their daily workflow.</p>
          
          <div className="mb-8 border-b border-white/10 pb-8">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-serif font-bold text-white">
                € {billingCycle === 'yearly' ? '1.490' : '149'}
              </span>
              <span className="text-gray-300 font-medium">/ {billingCycle === 'yearly' ? 'year' : 'month'}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Excl. VAT</p>
          </div>

          <div className="mb-10 flex-1 space-y-4">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Everything in Basic, plus:</p>
            <Feature label="Up to 40 horses" dark />
            <Feature label="Breeding Module (Scans, Cycles)" dark />
            <Feature label="Health & Medical Log" dark />
            <Feature label="Advanced Custom Feeding" dark />
            <Feature label="5 Staff Accounts (Role-based)" dark />
          </div>

          <button className="w-full py-4 rounded-xl bg-accent text-white hover:bg-white hover:text-primary font-bold tracking-wider uppercase transition-colors shadow-lg">
            Start Free Trial
          </button>
        </div>

        {/* ULTRA */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative">
          <h2 className="text-2xl font-serif font-bold text-primary dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
            <Zap size={20} className="text-accent" /> Ultra
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 h-10">For large commercial stables operating at the highest level.</p>
          
          <div className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-serif font-bold text-primary dark:text-white">
                € {billingCycle === 'yearly' ? '3.490' : '349'}
              </span>
              <span className="text-gray-500 font-medium">/ {billingCycle === 'yearly' ? 'year' : 'month'}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Excl. VAT</p>
          </div>

          <div className="mb-10 flex-1 space-y-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Everything in Premium, plus:</p>
            <Feature label="Unlimited horses" />
            <Feature label="Sales & CRM Module" />
            <Feature label="Financial & Invoicing Module" />
            <Feature label="Unlimited Staff & Client Portals" />
            <Feature label="White-glove Onboarding" />
          </div>

          <button className="w-full py-4 rounded-xl bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white dark:bg-transparent dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-primary font-bold tracking-wider uppercase transition-colors">
            Contact Sales
          </button>
        </div>

      </div>

      {/* Payment Methods & Trust Section */}
      <div className="max-w-4xl mx-auto border-t border-gray-200 dark:border-gray-800 pt-16 mt-16 text-center">
        <h3 className="text-lg font-serif font-bold text-primary dark:text-white uppercase tracking-wider mb-8">
          Secure & Flexible Payments
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-8 mb-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {/* iDeal */}
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 rounded-md bg-[#CC0066] flex items-center justify-center text-white">i</div>
            DEAL
          </div>
          {/* Credit Card */}
          <div className="flex items-center gap-2 font-bold text-lg">
            <CreditCard size={24} />
            Visa / Mastercard
          </div>
          {/* SEPA */}
          <div className="flex items-center gap-2 font-bold text-lg italic">
            SEPA Direct Debit
          </div>
          {/* Apple Pay */}
          <div className="flex items-center gap-2 font-bold text-lg">
             Pay
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mt-12 bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
          <div className="flex flex-col gap-2">
            <ShieldCheck className="text-accent" size={28} />
            <h4 className="font-bold text-gray-900 dark:text-white">Cancel Anytime</h4>
            <p className="text-sm text-gray-500">No long-term commitments. You can cancel your monthly subscription at any time with one click.</p>
          </div>
          <div className="flex flex-col gap-2">
            <CreditCard className="text-accent" size={28} />
            <h4 className="font-bold text-gray-900 dark:text-white">Automated Invoicing</h4>
            <p className="text-sm text-gray-500">Receive VAT-compliant invoices automatically every month or year for your administration.</p>
          </div>
          <div className="flex flex-col gap-2">
            <Star className="text-accent" size={28} />
            <h4 className="font-bold text-gray-900 dark:text-white">14-Day Free Trial</h4>
            <p className="text-sm text-gray-500">Try our Basic or Premium plan for 14 days completely free. No credit card required to start.</p>
          </div>
        </div>
      </div>
    </main>
  )
}

function Feature({ label, dark = false }: { label: string, dark?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${dark ? 'bg-accent/20 text-accent' : 'bg-primary/10 text-primary dark:bg-white/10 dark:text-white'}`}>
        <Check size={12} strokeWidth={3} />
      </div>
      <span className={`font-medium text-sm ${dark ? 'text-gray-100' : 'text-gray-700 dark:text-gray-300'}`}>{label}</span>
    </div>
  )
}

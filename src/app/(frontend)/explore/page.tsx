'use client'

import { useState } from 'react'
import { Wand, TrendingUp, ShieldCheck, PlayCircle, Lock, ArrowRight, Search } from 'lucide-react'
import Link from 'next/link'

export default function ExploreToolsPage() {
  // ROI Calculator State
  const [purchasePrice, setPurchasePrice] = useState(50000)
  const [yearsHeld, setYearsHeld] = useState(2)
  const [expectedGrowth, setExpectedGrowth] = useState(15)

  const finalValue = purchasePrice * Math.pow((1 + expectedGrowth / 100), yearsHeld)
  const profit = finalValue - purchasePrice

  // Passport Scanner State
  const [passportNum, setPassportNum] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<null | boolean>(null)

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault()
    if (!passportNum) return
    setIsScanning(true)
    setScanResult(null)
    
    // Simulate API call
    setTimeout(() => {
      setIsScanning(false)
      // Just a fun mock logic: if it ends in '7', it fails, otherwise success
      if (passportNum.endsWith('7')) {
        setScanResult(false)
      } else {
        setScanResult(true)
      }
    }, 1500)
  }

  return (
    <div className="bg-gray-50 dark:bg-[#0A192F] min-h-screen pb-20">
      
      {/* Hero */}
      <div className="bg-primary pt-24 pb-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 animate-fade-in">Client Explore Hub</h1>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg mb-8">
          Experience the cutting-edge tools that power Equivest Worldwide. From interactive investment calculators to secure Magic Link previews.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 space-y-12 z-10 relative">

        {/* TOOL 1: Magic Links Demo */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Wand size={14} className="mr-2" /> Exclusive Technology
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">Magic Link Previews</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Our investors receive highly secure, password-less <strong>Magic Links</strong> to view confidential veterinary reports, exclusive 4K videos, and wire instructions. No accounts needed. Experience what our clients see:
              </p>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:border-accent transition-colors cursor-pointer group flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mr-4 group-hover:bg-accent/20 transition-colors">
                      <PlayCircle size={20} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Secure Video Room</h4>
                      <p className="text-xs text-gray-500">Expiring token: eqv_vid_982x...</p>
                    </div>
                  </div>
                  <Lock size={16} className="text-gray-400" />
                </div>

                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:border-green-500 transition-colors cursor-pointer group flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mr-4 group-hover:bg-green-500/20 transition-colors">
                      <ShieldCheck size={20} className="text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Vet Check & X-Rays</h4>
                      <p className="text-xs text-gray-500">Confidential medical records</p>
                    </div>
                  </div>
                  <Lock size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
            <div className="md:w-1/2 bg-gray-900 relative p-8 md:p-12 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              
              <div className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center shadow-2xl">
                <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <Lock size={24} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Access Granted</h3>
                <p className="text-gray-300 text-sm mb-6">Your magic link has been verified successfully.</p>
                <button className="w-full py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-bold shadow-lg transition-transform hover:scale-105 active:scale-95">
                  Enter Secure Room
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* TOOL 2: Interactive ROI Calculator */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 p-8 md:p-12">
          <div className="text-center mb-10">
             <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold uppercase tracking-wider mb-6">
                <TrendingUp size={14} className="mr-2" /> Investment Tool
              </div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">Sport Horse ROI Calculator</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Calculate the potential return on investment for young sport horses entering the international circuit. Adjust the sliders below to simulate market scenarios.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Sliders */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-bold text-gray-700 dark:text-gray-300">Initial Purchase Value</label>
                  <span className="font-bold text-primary dark:text-white">€ {purchasePrice.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="10000" max="250000" step="5000" 
                  value={purchasePrice} 
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-bold text-gray-700 dark:text-gray-300">Holding Period (Years)</label>
                  <span className="font-bold text-primary dark:text-white">{yearsHeld} Years</span>
                </div>
                <input 
                  type="range" min="1" max="5" step="1" 
                  value={yearsHeld} 
                  onChange={(e) => setYearsHeld(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-bold text-gray-700 dark:text-gray-300">Estimated Annual Growth (%)</label>
                  <span className="font-bold text-green-600 dark:text-green-400">+{expectedGrowth}%</span>
                </div>
                <input 
                  type="range" min="5" max="35" step="1" 
                  value={expectedGrowth} 
                  onChange={(e) => setExpectedGrowth(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
              </div>
            </div>

            {/* Results */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
              
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-6">Projected Valuation</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-gray-200 dark:border-gray-800 pb-4">
                  <span className="text-gray-600 dark:text-gray-400">Initial Investment</span>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">€ {purchasePrice.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-end border-b border-gray-200 dark:border-gray-800 pb-4">
                  <span className="text-gray-600 dark:text-gray-400">Projected Profit</span>
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">+ € {Math.round(profit).toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-end pt-2">
                  <span className="text-gray-900 dark:text-white font-bold text-lg">Total Future Value</span>
                  <span className="text-4xl font-serif font-bold text-primary dark:text-white">€ {Math.round(finalValue).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TOOL 3: Passport Authenticity Scanner */}
        <div className="bg-primary rounded-2xl shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          <div className="md:flex relative z-10">
            <div className="md:w-1/2 p-8 md:p-12 text-white flex flex-col justify-center">
              <h2 className="text-3xl font-serif font-bold mb-4">Passport Authenticity Scanner</h2>
              <p className="text-primary-foreground/80 mb-8 leading-relaxed">
                Equivest uses advanced blockchain and AI scanning to verify horse passports. Enter an Equivest Certificate Number below to verify its authenticity instantly.
              </p>
              
              <form onSubmit={handleScan} className="flex gap-3">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    value={passportNum}
                    onChange={(e) => setPassportNum(e.target.value.toUpperCase())}
                    placeholder="e.g. EQV-2026-AB12"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isScanning || !passportNum}
                  className="px-6 py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors whitespace-nowrap"
                >
                  {isScanning ? 'Scanning...' : 'Verify'}
                </button>
              </form>
            </div>
            
            <div className="md:w-1/2 bg-gray-900 p-8 md:p-12 flex items-center justify-center border-l border-white/10">
              {scanResult === null && !isScanning && (
                <div className="text-center text-gray-500">
                  <ShieldCheck size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Awaiting Document Scan</p>
                </div>
              )}
              
              {isScanning && (
                <div className="text-center text-accent">
                  <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="animate-pulse font-bold tracking-widest uppercase text-sm">Verifying Database...</p>
                </div>
              )}

              {scanResult === true && !isScanning && (
                <div className="text-center bg-green-900/40 border border-green-500/50 p-8 rounded-2xl w-full max-w-sm animate-fade-in">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                    <ShieldCheck size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Verified Authentic</h3>
                  <p className="text-green-400 text-sm font-medium mb-4">{passportNum}</p>
                  <p className="text-gray-300 text-xs">This document matches the official Equivest registry and has not been tampered with.</p>
                </div>
              )}

              {scanResult === false && !isScanning && (
                <div className="text-center bg-red-900/40 border border-red-500/50 p-8 rounded-2xl w-full max-w-sm animate-fade-in">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                    <Lock size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Record Not Found</h3>
                  <p className="text-red-400 text-sm font-medium mb-4">{passportNum}</p>
                  <p className="text-gray-300 text-xs">This document number does not exist in our system or has been flagged.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link href="/horses" className="inline-flex items-center text-accent hover:text-primary font-bold text-lg transition-colors group">
            Explore the Portfolio <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  )
}

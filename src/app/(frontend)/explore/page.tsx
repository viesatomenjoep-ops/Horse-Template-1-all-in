'use client'

import { useState } from 'react'
import { Wand, TrendingUp, ShieldCheck, PlayCircle, Lock, ArrowRight, Search, Camera, Trophy, Dna, Calendar, FileText } from 'lucide-react'
import Link from 'next/link'

export default function ExploreToolsPage() {
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
      if (passportNum.endsWith('7')) {
        setScanResult(false)
      } else {
        setScanResult(true)
      }
    }, 1500)
  }

  // Magic Link State
  const [activeMagicLink, setActiveMagicLink] = useState<string | null>(null)
  const [magicLinkLoading, setMagicLinkLoading] = useState(false)

  const handleMagicLinkClick = (type: string) => {
    setMagicLinkLoading(true)
    setTimeout(() => {
      setMagicLinkLoading(false)
      setActiveMagicLink(type)
    }, 1200)
  }

  return (
    <div className="bg-gray-50 dark:bg-[#0A192F] min-h-screen pb-20">
      
      {/* Hero */}
      <div className="bg-primary pt-24 pb-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 animate-fade-in">Client Explore Hub</h1>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg mb-8">
          Experience the cutting-edge tools that power Equivest Worldwide. From highly secure Magic Link previews to AI-powered authenticity scanning.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 space-y-12 z-10 relative">

        {/* TOOL 1: Magic Links Demo */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 text-xs font-bold uppercase tracking-wider mb-6 w-max">
                <Wand size={14} className="mr-2" /> Exclusive Technology
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">Magic Link Previews</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Our investors receive highly secure, password-less <strong>Magic Links</strong> to view confidential veterinary reports, exclusive 4K videos, and syndication details. Experience what our clients see:
              </p>
              
              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                
                {/* 1. Secure Video Room */}
                <div 
                  onClick={() => handleMagicLinkClick('video')}
                  className={`p-4 rounded-xl border transition-colors cursor-pointer group flex items-center justify-between ${activeMagicLink === 'video' ? 'border-accent bg-accent/5' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:border-accent'}`}
                >
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

                {/* 2. Vet Check & X-Rays */}
                <div 
                  onClick={() => handleMagicLinkClick('vet')}
                  className={`p-4 rounded-xl border transition-colors cursor-pointer group flex items-center justify-between ${activeMagicLink === 'vet' ? 'border-green-500 bg-green-500/5' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:border-green-500'}`}
                >
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

                {/* 3. Live Stable Cam */}
                <div 
                  onClick={() => handleMagicLinkClick('live_cam')}
                  className={`p-4 rounded-xl border transition-colors cursor-pointer group flex items-center justify-between ${activeMagicLink === 'live_cam' ? 'border-blue-500 bg-blue-500/5' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:border-blue-500'}`}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-4 group-hover:bg-blue-500/20 transition-colors">
                      <Camera size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Live Stable Cam</h4>
                      <p className="text-xs text-gray-500">24/7 Training & stable feed</p>
                    </div>
                  </div>
                  <Lock size={16} className="text-gray-400" />
                </div>

                {/* 4. Competition History */}
                <div 
                  onClick={() => handleMagicLinkClick('results')}
                  className={`p-4 rounded-xl border transition-colors cursor-pointer group flex items-center justify-between ${activeMagicLink === 'results' ? 'border-purple-500 bg-purple-500/5' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:border-purple-500'}`}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mr-4 group-hover:bg-purple-500/20 transition-colors">
                      <Trophy size={20} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Competition Results</h4>
                      <p className="text-xs text-gray-500">Official FEI records & analytics</p>
                    </div>
                  </div>
                  <Lock size={16} className="text-gray-400" />
                </div>

                {/* 5. Syndicate Prospectus */}
                <div 
                  onClick={() => handleMagicLinkClick('syndicate')}
                  className={`p-4 rounded-xl border transition-colors cursor-pointer group flex items-center justify-between ${activeMagicLink === 'syndicate' ? 'border-emerald-500 bg-emerald-500/5' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:border-emerald-500'}`}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mr-4 group-hover:bg-emerald-500/20 transition-colors">
                      <TrendingUp size={20} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Financial Valuation</h4>
                      <p className="text-xs text-gray-500">Syndicate shares & ROI projection</p>
                    </div>
                  </div>
                  <Lock size={16} className="text-gray-400" />
                </div>

                {/* 6. DNA & Pedigree */}
                <div 
                  onClick={() => handleMagicLinkClick('pedigree')}
                  className={`p-4 rounded-xl border transition-colors cursor-pointer group flex items-center justify-between ${activeMagicLink === 'pedigree' ? 'border-orange-500 bg-orange-500/5' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:border-orange-500'}`}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mr-4 group-hover:bg-orange-500/20 transition-colors">
                      <Dna size={20} className="text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Pedigree Analysis</h4>
                      <p className="text-xs text-gray-500">Bloodline grading & genetics</p>
                    </div>
                  </div>
                  <Lock size={16} className="text-gray-400" />
                </div>

                {/* 7. VIP Trial Booking */}
                <div 
                  onClick={() => handleMagicLinkClick('vip_trial')}
                  className={`p-4 rounded-xl border transition-colors cursor-pointer group flex items-center justify-between ${activeMagicLink === 'vip_trial' ? 'border-rose-500 bg-rose-500/5' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:border-rose-500'}`}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center mr-4 group-hover:bg-rose-500/20 transition-colors">
                      <Calendar size={20} className="text-rose-600 dark:text-rose-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">VIP Trial Booking</h4>
                      <p className="text-xs text-gray-500">Secure exclusive viewing session</p>
                    </div>
                  </div>
                  <Lock size={16} className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 bg-gray-900 relative p-8 md:p-12 flex items-center justify-center overflow-hidden min-h-[500px]">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              
              {magicLinkLoading ? (
                 <div className="relative z-10 text-center animate-pulse">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-accent font-bold tracking-widest uppercase text-sm">Decrypting Secure Vault...</p>
                 </div>
              ) : activeMagicLink === 'video' ? (
                 <div className="relative z-10 w-full bg-black border border-white/20 rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
                    <div className="aspect-video bg-gray-800 flex items-center justify-center relative group cursor-pointer">
                      <PlayCircle size={64} className="text-white/80 group-hover:text-accent group-hover:scale-110 transition-all" />
                      <div className="absolute bottom-4 left-4">
                         <p className="text-white font-bold text-sm bg-black/50 px-2 py-1 rounded">Quel Honneur vh Distelhof Z - 4K Video</p>
                      </div>
                    </div>
                 </div>
              ) : activeMagicLink === 'vet' ? (
                 <div className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center shadow-2xl animate-fade-in">
                  <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck size={24} className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Secure PDF Unlocked</h3>
                  <p className="text-gray-300 text-sm mb-6">Confidential Vet Check & X-Ray files are ready for download.</p>
                  <button className="w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold shadow-lg transition-transform hover:scale-105 active:scale-95">
                    Download Documents
                  </button>
                </div>
              ) : activeMagicLink === 'live_cam' ? (
                 <div className="relative z-10 w-full bg-black border border-white/20 rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
                    <div className="aspect-video bg-gray-800 relative cursor-pointer overflow-hidden group">
                      <img src="https://images.unsplash.com/photo-1598974357801-cbca100e65d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Stable" className="object-cover w-full h-full opacity-60 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute top-4 left-4 flex items-center bg-black/70 px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                        <span className="text-white text-xs font-bold uppercase tracking-widest">Live: Stable 4</span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle size={64} className="text-white/80 group-hover:text-blue-400 group-hover:scale-110 transition-all" />
                      </div>
                    </div>
                 </div>
              ) : activeMagicLink === 'results' ? (
                 <div className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl animate-fade-in">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mr-4">
                      <Trophy size={20} className="text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">FEI History</h3>
                      <p className="text-gray-400 text-xs uppercase tracking-widest">Verified Data</p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="bg-black/30 p-3 rounded-lg border border-white/5 flex justify-between items-center">
                      <span className="text-gray-300 text-sm">CSI2* Wellington</span>
                      <span className="text-purple-400 font-bold">1st Place</span>
                    </div>
                    <div className="bg-black/30 p-3 rounded-lg border border-white/5 flex justify-between items-center">
                      <span className="text-gray-300 text-sm">CSI3* Aachen</span>
                      <span className="text-purple-400 font-bold">Clear Round</span>
                    </div>
                  </div>
                  <button className="w-full py-2 border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 rounded-lg font-bold transition-colors">
                    View Full Analytics
                  </button>
                </div>
              ) : activeMagicLink === 'syndicate' ? (
                 <div className="relative z-10 w-full max-w-sm bg-gradient-to-br from-emerald-900/50 to-gray-900 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl animate-fade-in">
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                    <TrendingUp className="text-emerald-400 mr-2" size={20} />
                    Prospectus Unlocked
                  </h3>
                  <p className="text-gray-300 text-sm mb-6">Syndicate valuation, structured equity breakdown, and projected 5-year ROI.</p>
                  
                  <div className="bg-black/40 p-4 rounded-xl mb-6 border border-emerald-500/20">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-gray-400 text-xs uppercase">Est. Portfolio Value</span>
                      <span className="text-emerald-400 font-bold text-xl">€1.2M</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div className="bg-emerald-500 h-1.5 rounded-full w-[75%]"></div>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold shadow-lg transition-transform hover:scale-105 active:scale-95">
                    Download Prospectus PDF
                  </button>
                </div>
              ) : activeMagicLink === 'pedigree' ? (
                 <div className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center shadow-2xl animate-fade-in">
                  <div className="w-16 h-16 mx-auto bg-orange-500/20 rounded-full flex items-center justify-center mb-4">
                    <Dna size={24} className="text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Genetics Verified</h3>
                  <p className="text-gray-300 text-sm mb-6">Complete bloodline tracking from sire line and dam line with DNA authenticity.</p>
                  <button className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-bold shadow-lg transition-transform hover:scale-105 active:scale-95">
                    View Family Tree
                  </button>
                </div>
              ) : activeMagicLink === 'vip_trial' ? (
                 <div className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl animate-fade-in text-center">
                  <div className="w-16 h-16 mx-auto bg-rose-500/20 rounded-full flex items-center justify-center mb-4">
                    <Calendar size={24} className="text-rose-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">VIP Concierge</h3>
                  <p className="text-gray-300 text-sm mb-6">Your identity is verified. You have exclusive priority to book a private showing in Belgium.</p>
                  <button className="w-full py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-lg font-bold shadow-lg transition-transform hover:scale-105 active:scale-95">
                    Select Dates
                  </button>
                </div>
              ) : (
                <div className="relative z-10 w-full max-w-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center shadow-2xl">
                  <div className="w-16 h-16 mx-auto bg-gray-500/20 rounded-full flex items-center justify-center mb-4">
                    <Lock size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-300 mb-2">Vault Locked</h3>
                  <p className="text-gray-500 text-sm mb-6">Click a magic link on the left to simulate unlocking the vault.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TOOL 2: Passport Authenticity Scanner */}
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
                    <Search size={18} className="text-white/50" />
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

'use client'

import { useState } from 'react'
import { Wand, TrendingUp, ShieldCheck, PlayCircle, Lock, ArrowRight, Search, Camera, Trophy, Dna, Calendar, FileText, CheckCircle2 } from 'lucide-react'
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
  
  // Interactive Button States inside Magic Link Viewer
  const [actionState, setActionState] = useState<Record<string, string>>({})

  const handleMagicLinkClick = (type: string) => {
    setMagicLinkLoading(true)
    setActionState({}) // reset states when changing tools
    setTimeout(() => {
      setMagicLinkLoading(false)
      setActiveMagicLink(type)
    }, 1200)
  }

  const handleActionClick = (type: string, successMessage: string) => {
    setActionState(prev => ({ ...prev, [type]: 'loading' }))
    setTimeout(() => {
      setActionState(prev => ({ ...prev, [type]: successMessage }))
    }, 1000)
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
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="p-8 md:p-12 border-b border-gray-100 dark:border-gray-700 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 text-sm font-bold uppercase tracking-wider mb-6">
              <Wand size={16} className="mr-2" /> Exclusive Technology
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Magic Link Vault</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Our investors receive highly secure, password-less <strong>Magic Links</strong> to view confidential veterinary reports, exclusive 4K videos, and syndication details. Select a module below to simulate unlocking the vault.
            </p>
          </div>

          <div className="p-8 md:p-12 bg-gray-50 dark:bg-gray-800/50">
            {/* Grid of Tools */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              
              {/* 1. Secure Video Room */}
              <div 
                onClick={() => handleMagicLinkClick('video')}
                className={`p-6 rounded-2xl border transition-all cursor-pointer group flex flex-col items-center text-center ${activeMagicLink === 'video' ? 'border-accent bg-accent/10 scale-105 shadow-lg' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-accent hover:-translate-y-1 hover:shadow-xl'}`}
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <PlayCircle size={28} className="text-accent" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Secure Video Room</h4>
                <p className="text-xs text-gray-500 mb-4 flex-grow">4K Videos</p>
                <Lock size={16} className="text-gray-400 mt-auto" />
              </div>

              {/* 2. Vet Check & X-Rays */}
              <div 
                onClick={() => handleMagicLinkClick('vet')}
                className={`p-6 rounded-2xl border transition-all cursor-pointer group flex flex-col items-center text-center ${activeMagicLink === 'vet' ? 'border-green-500 bg-green-500/10 scale-105 shadow-lg' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-500 hover:-translate-y-1 hover:shadow-xl'}`}
              >
                <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                  <ShieldCheck size={28} className="text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Vet Check</h4>
                <p className="text-xs text-gray-500 mb-4 flex-grow">Medical records</p>
                <Lock size={16} className="text-gray-400 mt-auto" />
              </div>

              {/* 3. Live Stable Cam */}
              <div 
                onClick={() => handleMagicLinkClick('live_cam')}
                className={`p-6 rounded-2xl border transition-all cursor-pointer group flex flex-col items-center text-center ${activeMagicLink === 'live_cam' ? 'border-blue-500 bg-blue-500/10 scale-105 shadow-lg' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-500 hover:-translate-y-1 hover:shadow-xl'}`}
              >
                <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <Camera size={28} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Live Cam</h4>
                <p className="text-xs text-gray-500 mb-4 flex-grow">Stable feed</p>
                <Lock size={16} className="text-gray-400 mt-auto" />
              </div>

              {/* 4. Competition History */}
              <div 
                onClick={() => handleMagicLinkClick('results')}
                className={`p-6 rounded-2xl border transition-all cursor-pointer group flex flex-col items-center text-center ${activeMagicLink === 'results' ? 'border-purple-500 bg-purple-500/10 scale-105 shadow-lg' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-500 hover:-translate-y-1 hover:shadow-xl'}`}
              >
                <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <Trophy size={28} className="text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">FEI History</h4>
                <p className="text-xs text-gray-500 mb-4 flex-grow">Official records</p>
                <Lock size={16} className="text-gray-400 mt-auto" />
              </div>

              {/* 5. Syndicate Prospectus */}
              <div 
                onClick={() => handleMagicLinkClick('syndicate')}
                className={`p-6 rounded-2xl border transition-all cursor-pointer group flex flex-col items-center text-center ${activeMagicLink === 'syndicate' ? 'border-emerald-500 bg-emerald-500/10 scale-105 shadow-lg' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-500 hover:-translate-y-1 hover:shadow-xl'}`}
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <TrendingUp size={28} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Valuation</h4>
                <p className="text-xs text-gray-500 mb-4 flex-grow">Syndicate ROI</p>
                <Lock size={16} className="text-gray-400 mt-auto" />
              </div>

              {/* 6. DNA & Pedigree */}
              <div 
                onClick={() => handleMagicLinkClick('pedigree')}
                className={`p-6 rounded-2xl border transition-all cursor-pointer group flex flex-col items-center text-center ${activeMagicLink === 'pedigree' ? 'border-orange-500 bg-orange-500/10 scale-105 shadow-lg' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-orange-500 hover:-translate-y-1 hover:shadow-xl'}`}
              >
                <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                  <Dna size={28} className="text-orange-600 dark:text-orange-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Pedigree</h4>
                <p className="text-xs text-gray-500 mb-4 flex-grow">DNA verified</p>
                <Lock size={16} className="text-gray-400 mt-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Viewer Panel */}
        {activeMagicLink && (
          <div className="fixed inset-0 z-[100] flex flex-col bg-gray-900/95 backdrop-blur-md animate-fade-in">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h3 className="text-white font-serif font-bold text-xl">Secure Vault</h3>
              <button 
                onClick={() => {
                  setActiveMagicLink(null)
                  setActionState({})
                }}
                className="bg-white/10 hover:bg-white/20 text-white rounded-full px-6 py-2 font-bold transition-colors"
              >
                Close / Terug
              </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center p-4 relative overflow-y-auto">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
              
              {magicLinkLoading ? (
                 <div className="relative z-10 text-center animate-pulse mt-[-10vh]">
                    <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <p className="text-accent font-bold tracking-widest uppercase text-lg">Decrypting Secure Vault...</p>
                 </div>
              ) : activeMagicLink === 'video' ? (
                 <div className="relative z-10 w-full max-w-4xl bg-black border border-white/20 rounded-2xl overflow-hidden shadow-2xl animate-fade-in mt-[-5vh]">
                    <div className="aspect-video bg-gray-800 flex flex-col items-center justify-center relative group cursor-pointer">
                      <PlayCircle size={80} className="text-white/80 group-hover:text-accent group-hover:scale-110 transition-all mb-4" />
                      <p className="text-white/60 font-medium">Click to Play 4K Video Stream</p>
                      <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">LIVE HQ</div>
                      <div className="absolute bottom-0 left-0 w-full bg-black/80 p-4">
                         <p className="text-white font-bold text-lg">Quel Honneur vh Distelhof Z - Free Jumping</p>
                         <p className="text-gray-400 text-sm">Secure Token: eqv_vid_982x_valid</p>
                      </div>
                    </div>
                 </div>
              ) : activeMagicLink === 'vet' ? (
                 <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center shadow-2xl animate-fade-in mt-[-5vh]">
                  <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <ShieldCheck size={40} className="text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Secure PDF Unlocked</h3>
                  <p className="text-gray-300 mb-8">Confidential Vet Check & X-Ray files are ready for secure download. Files are watermarked with your ID.</p>
                  <button 
                    onClick={() => handleActionClick('vet', 'Downloaded Securely ✅')}
                    disabled={!!actionState['vet']}
                    className={`w-full py-4 text-white rounded-xl font-bold shadow-lg transition-all ${
                      actionState['vet'] === 'loading' ? 'bg-gray-600' : 
                      actionState['vet'] ? 'bg-green-700' : 'bg-green-600 hover:bg-green-500 hover:scale-105 active:scale-95'
                    }`}
                  >
                    {actionState['vet'] === 'loading' ? 'Decrypting...' : actionState['vet'] || 'Download Documents'}
                  </button>
                </div>
              ) : activeMagicLink === 'live_cam' ? (
                 <div className="relative z-10 w-full max-w-4xl bg-black border border-white/20 rounded-2xl overflow-hidden shadow-2xl animate-fade-in mt-[-5vh]">
                    <div className="aspect-video bg-gray-800 relative cursor-pointer overflow-hidden group">
                      <img src="https://images.unsplash.com/photo-1598974357801-cbca100e65d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Stable" className="object-cover w-full h-full opacity-60 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute top-6 left-6 flex items-center bg-black/80 px-4 py-2 rounded-full border border-white/10">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
                        <span className="text-white text-sm font-bold uppercase tracking-widest">Live: Premium Stable 4</span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle size={80} className="text-white/80 group-hover:text-blue-400 group-hover:scale-110 transition-all" />
                      </div>
                    </div>
                 </div>
              ) : activeMagicLink === 'results' ? (
                 <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl animate-fade-in mt-[-5vh]">
                  <div className="flex items-center mb-8 pb-6 border-b border-white/10">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mr-6">
                      <Trophy size={28} className="text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">FEI History</h3>
                      <p className="text-gray-400 text-sm uppercase tracking-widest mt-1">Verified Database</p>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                      <span className="text-gray-300 font-medium">CSI2* Wellington</span>
                      <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full font-bold text-sm">1st Place</span>
                    </div>
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                      <span className="text-gray-300 font-medium">CSI3* Aachen</span>
                      <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full font-bold text-sm">Clear Round</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleActionClick('results', 'Data Exported to CSV ✅')}
                    disabled={!!actionState['results']}
                    className={`w-full py-4 border border-purple-500/50 rounded-xl font-bold transition-all ${
                      actionState['results'] ? 'bg-purple-600 text-white' : 'text-purple-300 hover:bg-purple-500/20'
                    }`}
                  >
                    {actionState['results'] === 'loading' ? 'Exporting...' : actionState['results'] || 'Export Full Analytics'}
                  </button>
                </div>
              ) : activeMagicLink === 'syndicate' ? (
                 <div className="relative z-10 w-full max-w-md bg-gradient-to-br from-emerald-900/50 to-gray-900 border border-emerald-500/30 rounded-3xl p-8 shadow-2xl animate-fade-in mt-[-5vh]">
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center">
                    <TrendingUp className="text-emerald-400 mr-3" size={28} />
                    Prospectus Unlocked
                  </h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">Syndicate valuation, structured equity breakdown, and projected 5-year ROI matrix.</p>
                  
                  <div className="bg-black/50 p-6 rounded-2xl mb-8 border border-emerald-500/20">
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-gray-400 text-sm uppercase tracking-wider">Est. Portfolio Value</span>
                      <span className="text-emerald-400 font-bold text-3xl">€1.2M</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full w-[75%] relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow"></div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleActionClick('syndicate', 'Prospectus PDF Downloaded ✅')}
                    disabled={!!actionState['syndicate']}
                    className={`w-full py-4 text-white rounded-xl font-bold shadow-lg transition-all ${
                      actionState['syndicate'] === 'loading' ? 'bg-gray-600' : 
                      actionState['syndicate'] ? 'bg-emerald-700' : 'bg-emerald-600 hover:bg-emerald-500 hover:scale-105 active:scale-95'
                    }`}
                  >
                    {actionState['syndicate'] === 'loading' ? 'Generating PDF...' : actionState['syndicate'] || 'Download Prospectus PDF'}
                  </button>
                </div>
              ) : activeMagicLink === 'pedigree' ? (
                 <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center shadow-2xl animate-fade-in mt-[-5vh]">
                  <div className="w-20 h-20 mx-auto bg-orange-500/20 rounded-full flex items-center justify-center mb-6">
                    <Dna size={40} className="text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Genetics Verified</h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">Complete bloodline tracking from sire line and dam line with DNA authenticity guaranteed by Equivest.</p>
                  <button 
                    onClick={() => handleActionClick('pedigree', 'Interactive Tree Opened ✅')}
                    disabled={!!actionState['pedigree']}
                    className={`w-full py-4 text-white rounded-xl font-bold shadow-lg transition-all ${
                      actionState['pedigree'] === 'loading' ? 'bg-gray-600' : 
                      actionState['pedigree'] ? 'bg-orange-700' : 'bg-orange-600 hover:bg-orange-500 hover:scale-105 active:scale-95'
                    }`}
                  >
                    {actionState['pedigree'] === 'loading' ? 'Loading Database...' : actionState['pedigree'] || 'View Interactive Family Tree'}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* TOOL 2: Passport Authenticity Scanner */}
        <div className="bg-primary rounded-3xl shadow-2xl overflow-hidden relative border border-white/10">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          <div className="md:flex relative z-10">
            <div className="md:w-1/2 p-8 md:p-16 text-white flex flex-col justify-center">
              <h2 className="text-4xl font-serif font-bold mb-6">Passport Authenticity Scanner</h2>
              <p className="text-primary-foreground/80 mb-10 text-lg leading-relaxed">
                Equivest uses advanced blockchain and AI scanning to verify horse passports. Enter an Equivest Certificate Number below to verify its authenticity instantly.
              </p>
              
              <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search size={20} className="text-white/50" />
                  </div>
                  <input 
                    type="text" 
                    value={passportNum}
                    onChange={(e) => setPassportNum(e.target.value.toUpperCase())}
                    placeholder="e.g. EQV-2026-AB12"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent text-lg"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isScanning || !passportNum}
                  className="px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 disabled:opacity-50 transition-colors whitespace-nowrap text-lg shadow-lg"
                >
                  {isScanning ? 'Scanning...' : 'Verify Passport'}
                </button>
              </form>
            </div>
            
            <div className="md:w-1/2 bg-gray-900 p-8 md:p-16 flex items-center justify-center border-l border-white/10">
              {scanResult === null && !isScanning && (
                <div className="text-center text-gray-500">
                  <ShieldCheck size={64} className="mx-auto mb-6 opacity-20" />
                  <p className="text-lg">Awaiting Document Scan</p>
                </div>
              )}
              
              {isScanning && (
                <div className="text-center text-accent">
                  <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                  <p className="animate-pulse font-bold tracking-widest uppercase">Verifying Database...</p>
                </div>
              )}

              {scanResult === true && !isScanning && (
                <div className="text-center bg-green-900/40 border border-green-500/50 p-10 rounded-3xl w-full max-w-sm animate-fade-in shadow-2xl">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                    <ShieldCheck size={40} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">Verified Authentic</h3>
                  <p className="text-green-400 font-bold mb-6 text-lg">{passportNum}</p>
                  <p className="text-gray-300 leading-relaxed">This document matches the official Equivest registry and has not been tampered with.</p>
                </div>
              )}

              {scanResult === false && !isScanning && (
                <div className="text-center bg-red-900/40 border border-red-500/50 p-10 rounded-3xl w-full max-w-sm animate-fade-in shadow-2xl">
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(239,68,68,0.4)]">
                    <Lock size={40} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">Record Not Found</h3>
                  <p className="text-red-400 font-bold mb-6 text-lg">{passportNum}</p>
                  <p className="text-gray-300 leading-relaxed">This document number does not exist in our system or has been flagged.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 pb-12">
          <Link href="/horses" className="inline-flex items-center text-accent hover:text-primary font-bold text-xl transition-colors group">
            Explore the Actual Portfolio <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trophy, Briefcase, Eye, ChevronDown, Wand, PlayCircle, Lock, ShieldCheck, Camera, Dna, BrainCircuit, FileCheck, Activity, Plane, Scale } from "lucide-react";
import PartnerSlider from "@/components/frontend/PartnerSlider";

export default function InstagramClient() {
  // Magic Link State
  const [activeMagicLink, setActiveMagicLink] = useState<string | null>(null)
  const [magicLinkLoading, setMagicLinkLoading] = useState(false)
  const [actionState, setActionState] = useState<Record<string, string>>({})

  const handleMagicLinkClick = (type: string) => {
    setMagicLinkLoading(true)
    setActionState({}) // reset states
    setTimeout(() => {
      setMagicLinkLoading(false)
      setActiveMagicLink(type)
    }, 1200)
  }

  const handleActionClick = (type: string, successMessage: string) => {
    setActionState(prev => ({ ...prev, [type]: 'loading' }))
    setTimeout(() => {
      setActionState(prev => ({ ...prev, [type]: successMessage }))
      // simulation of download/action
    }, 1500)
  }

  return (
    <main className="bg-[#fdfbf7] min-h-screen text-primary overflow-x-hidden selection:bg-accent selection:text-white pb-10">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/chimi.jpg"
            alt="Equivest Elite Showjumper"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-[#fdfbf7]"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center mt-20">
          <div className="w-24 h-24 bg-white rounded-full p-2 mb-8 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            <Image 
              src="/logo.png" 
              alt="Equivest Logo" 
              width={80} 
              height={80} 
              className="object-contain w-full h-full"
            />
          </div>
          <span className="text-accent-light uppercase tracking-[0.3em] text-xs font-bold mb-4">
            Welcome to
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 tracking-tight leading-tight">
            Equivest <br /><span className="italic text-accent-light">Worldwide</span>
          </h1>
          <p className="text-white/80 max-w-sm text-sm md:text-base mb-10 leading-relaxed">
            High-yield returns from world-class equestrian talent. Discover the possibilities below.
          </p>
          
          <div className="animate-bounce mt-10">
            <ChevronDown className="text-white/50 w-8 h-8" />
          </div>
        </div>
      </section>

      {/* Supported By Slider */}
      <div className="mb-10">
        <PartnerSlider />
      </div>

      {/* 2. Primary Possibilities */}
      <div className="relative z-20 -mt-10 px-4 md:px-6 space-y-6 pb-16 max-w-2xl mx-auto">
        <Link href="/horses" className="group block relative overflow-hidden rounded-[2rem] bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
          <div className="h-48 relative overflow-hidden">
            <Image src="/chimi.jpg" alt="Portfolio" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 flex items-center gap-2">
              <Trophy size={14} className="text-white" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">Elite Athletes</span>
            </div>
          </div>
          <div className="p-8">
            <h2 className="text-2xl font-serif font-bold mb-2 group-hover:text-accent transition-colors">Explore the Sport Portfolio</h2>
            <p className="text-gray-600 text-sm mb-6">
              View our exclusive collection of premium showjumpers currently securing top results in the global arena.
            </p>
            <div className="flex items-center text-sm font-bold uppercase tracking-widest text-accent">
              View Horses <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </Link>

        <Link href="/investors" className="group block relative overflow-hidden rounded-[2rem] bg-primary text-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
          <div className="absolute inset-0 bg-[url('/chimi.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay group-hover:opacity-20 transition-opacity duration-500"></div>
          <div className="relative p-8 md:p-10">
            <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full border border-white/20">
              <Briefcase className="text-accent-light" size={20} />
            </div>
            <h2 className="text-2xl font-serif font-bold mb-2">Want to <span className="text-accent italic">Invest?</span></h2>
            <p className="text-white/70 text-sm mb-8 leading-relaxed">
              Join an exclusive network of investors acquiring elite equestrian talent. Our proven track record maximizes both sport success and financial returns.
            </p>
            <div className="flex items-center text-sm font-bold uppercase tracking-widest text-white">
              Request Access <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </Link>

        <Link href="/references" className="group block relative overflow-hidden rounded-[2rem] bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100">
          <div className="p-8 flex items-start gap-6">
            <div className="flex-shrink-0 w-14 h-14 bg-[#fdfbf7] rounded-full border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Eye className="text-accent" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold mb-2 group-hover:text-accent transition-colors">Proven Success</h2>
              <p className="text-gray-600 text-sm mb-4">
                Discover our proudest alumni and global track record in the equestrian sport.
              </p>
              <div className="flex items-center text-xs font-bold uppercase tracking-widest text-primary group-hover:text-accent transition-colors">
                View References <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* 3. Magic Links Feature Overview */}
      <div className="px-4 md:px-6 max-w-2xl mx-auto mb-16">
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8 border-b border-gray-50 text-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4">
              <Wand size={14} className="mr-2" /> Exclusive Technology
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Magic Link Vault</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Investors receive secure, password-less links to access confidential files. Tap a module below to try the demo!
            </p>
          </div>

          <div className="p-6 bg-gray-50/50">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Magic Link Buttons */}
              <div onClick={() => handleMagicLinkClick('video')} className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm cursor-pointer hover:border-accent hover:shadow-md transition-all flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                  <PlayCircle size={20} className="text-accent" />
                </div>
                <h4 className="font-bold text-sm mb-1 text-gray-900">Secure Video</h4>
                <p className="text-[10px] text-gray-500 mb-2">4K Streams</p>
                <Lock size={12} className="text-gray-400 mt-auto" />
              </div>

              <div onClick={() => handleMagicLinkClick('vet')} className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm cursor-pointer hover:border-green-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-2">
                  <ShieldCheck size={20} className="text-green-600" />
                </div>
                <h4 className="font-bold text-sm mb-1 text-gray-900">Vet Check</h4>
                <p className="text-[10px] text-gray-500 mb-2">Medical info</p>
                <Lock size={12} className="text-gray-400 mt-auto" />
              </div>

              <div onClick={() => handleMagicLinkClick('results')} className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm cursor-pointer hover:border-purple-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-2">
                  <Trophy size={20} className="text-purple-600" />
                </div>
                <h4 className="font-bold text-sm mb-1 text-gray-900">FEI History</h4>
                <p className="text-[10px] text-gray-500 mb-2">Results</p>
                <Lock size={12} className="text-gray-400 mt-auto" />
              </div>

              <div onClick={() => handleMagicLinkClick('biometrics')} className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm cursor-pointer hover:border-cyan-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center mb-2">
                  <BrainCircuit size={20} className="text-cyan-600" />
                </div>
                <h4 className="font-bold text-sm mb-1 text-gray-900">Biometrics</h4>
                <p className="text-[10px] text-gray-500 mb-2">AI Jump Data</p>
                <Lock size={12} className="text-gray-400 mt-auto" />
              </div>
            </div>
            
            <div className="mt-4 text-center">
               <Link href="/explore" className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-accent transition-colors flex items-center justify-center gap-1">
                 View all 10 tools <ArrowRight size={12} />
               </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Magic Link Viewer Modal */}
      {activeMagicLink && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-gray-900/95 backdrop-blur-md animate-fade-in">
          <div className="flex justify-center items-center p-4 border-b border-white/10">
            <h3 className="text-white font-serif font-bold text-xl tracking-wider">Secure Vault Demo</h3>
          </div>
          
          <div className="flex-1 flex items-center justify-center p-4 relative overflow-y-auto">
            {magicLinkLoading ? (
               <div className="relative z-10 text-center animate-pulse">
                  <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-accent font-bold tracking-widest uppercase text-sm">Decrypting...</p>
               </div>
            ) : activeMagicLink === 'video' ? (
               <div className="relative z-10 w-full max-w-sm bg-black border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="aspect-video bg-gray-800 flex flex-col items-center justify-center relative">
                    <PlayCircle size={60} className="text-white/80 mb-2" />
                    <p className="text-white/60 text-sm font-medium">Click to Play 4K Stream</p>
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">LIVE HQ</div>
                  </div>
                  <div className="bg-black/80 p-4 border-t border-white/10">
                     <p className="text-white font-bold text-sm">Quel Honneur vh Distelhof Z</p>
                  </div>
               </div>
            ) : activeMagicLink === 'vet' ? (
               <div className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center shadow-2xl">
                <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck size={32} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Secure PDF Unlocked</h3>
                <p className="text-gray-300 text-sm mb-6">Confidential Vet Check & X-Ray files ready.</p>
                <button 
                  onClick={() => handleActionClick('vet', 'Downloaded ✅')}
                  disabled={!!actionState['vet']}
                  className={`w-full py-3 text-white rounded-xl font-bold text-sm ${actionState['vet'] ? 'bg-green-700' : 'bg-green-600'}`}
                >
                  {actionState['vet'] || 'Download Documents'}
                </button>
              </div>
            ) : activeMagicLink === 'results' ? (
               <div className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl text-center">
                <div className="w-16 h-16 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                  <Trophy size={32} className="text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">FEI History</h3>
                <div className="space-y-3 mb-6 text-left">
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5 flex justify-between items-center text-sm">
                    <span className="text-gray-300">CSI2* Wellington</span>
                    <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full font-bold text-xs">1st Place</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleActionClick('results', 'Exported ✅')}
                  disabled={!!actionState['results']}
                  className={`w-full py-3 text-white rounded-xl font-bold text-sm ${actionState['results'] ? 'bg-purple-700' : 'bg-purple-600'}`}
                >
                  {actionState['results'] || 'Export Analytics'}
                </button>
              </div>
            ) : activeMagicLink === 'biometrics' ? (
               <div className="relative z-10 w-full max-w-sm bg-gradient-to-br from-cyan-900/50 to-gray-900 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl text-center">
                <div className="w-16 h-16 mx-auto bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
                  <BrainCircuit size={32} className="text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">AI Biometrics</h3>
                <div className="space-y-3 mb-6 text-left">
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                    <div className="flex justify-between text-xs mb-1"><span className="text-gray-300">Takeoff Power</span><span className="text-cyan-400 font-bold">98th</span></div>
                    <div className="w-full bg-gray-800 rounded-full h-1"><div className="bg-cyan-500 h-1 rounded-full w-[98%]"></div></div>
                  </div>
                </div>
                <button 
                  onClick={() => handleActionClick('biometrics', 'Downloaded ✅')}
                  disabled={!!actionState['biometrics']}
                  className={`w-full py-3 text-white rounded-xl font-bold text-sm ${actionState['biometrics'] ? 'bg-cyan-700' : 'bg-cyan-600'}`}
                >
                  {actionState['biometrics'] || 'Download Analysis'}
                </button>
              </div>
            ) : null}
          </div>

          <div className="p-4 border-t border-white/10 flex justify-center bg-gray-900/50">
            <button
              onClick={() => {
                setActiveMagicLink(null)
                setActionState({})
              }}
              className="bg-white text-gray-900 rounded-full px-8 py-3 font-bold w-full max-w-sm"
            >
              Close Demo
            </button>
          </div>
        </div>
      )}

      {/* Footer / Minimal Info */}
      <footer className="py-6 text-center flex flex-col items-center">
        <div className="w-10 h-10 mb-4 opacity-50">
          <Image src="/logo.png" alt="Equivest" width={40} height={40} className="object-contain" />
        </div>
        <Link 
          href="/"
          className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-accent transition-colors mb-2"
        >
          Visit Main Website
        </Link>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">
          © {new Date().getFullYear()} Equivest Worldwide
        </p>
      </footer>

    </main>
  );
}

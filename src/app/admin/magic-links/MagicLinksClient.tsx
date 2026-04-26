'use client'

import { useState } from 'react'
import { Link2, Clock, EyeOff, FileSignature, Video, Share2, Search, CheckCircle, Copy, ExternalLink, ShieldCheck, MessageCircle, Languages, Calculator, GitCompare, Lock, BarChart3 } from 'lucide-react'

export default function MagicLinksClient({ horses }: { horses: any[] }) {
  const [activeTab, setActiveTab] = useState<'external' | 'internal'>('external')
  
  // External States
  const [selectedHorseId, setSelectedHorseId] = useState('')
  const [selectedHorsesForCompare, setSelectedHorsesForCompare] = useState<string[]>([])
  const [clientName, setClientName] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const [copied, setCopied] = useState(false)

  // Internal States
  const [socialHorseId, setSocialHorseId] = useState('')
  const [socialText, setSocialText] = useState('')
  const [whatsappLanguage, setWhatsappLanguage] = useState('EN')

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // --- External Links ---
  const generateVipLink = () => {
    if (!selectedHorseId) return alert('Select a horse first')
    const token = Math.random().toString(36).substring(2, 15)
    setGeneratedLink(`https://www.equivestworldwide.com/vip/${selectedHorseId}?token=${token}`)
  }

  const generateBlindLink = () => {
    if (!selectedHorseId) return alert('Select a horse first')
    setGeneratedLink(`https://www.equivestworldwide.com/blind-portfolio/${selectedHorseId}`)
  }

  const generateProposalLink = () => {
    if (!clientName || !selectedHorseId) return alert('Enter client name and select a horse')
    const slug = clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    setGeneratedLink(`https://www.equivestworldwide.com/proposal/${slug}?horses=${selectedHorseId}`)
  }

  const generateRoiLink = () => {
    if (!selectedHorseId) return alert('Select a horse first')
    setGeneratedLink(`https://www.equivestworldwide.com/roi-calculator/${selectedHorseId}`)
  }

  const handleCompareSelect = (id: string) => {
    if (selectedHorsesForCompare.includes(id)) {
      setSelectedHorsesForCompare(prev => prev.filter(h => h !== id))
    } else {
      if (selectedHorsesForCompare.length >= 3) return alert('Maximum 3 horses for comparison')
      setSelectedHorsesForCompare(prev => [...prev, id])
    }
  }

  const generateCompareLink = () => {
    if (selectedHorsesForCompare.length < 2) return alert('Select at least 2 horses')
    const ids = selectedHorsesForCompare.join(',')
    setGeneratedLink(`https://www.equivestworldwide.com/compare/${ids}`)
  }

  const generateReserveLink = () => {
    if (!selectedHorseId) return alert('Select a horse first')
    setGeneratedLink(`https://www.equivestworldwide.com/reserve/${selectedHorseId}`)
  }

  const generateAnalyticsLink = () => {
    if (!selectedHorseId) return alert('Select a horse first')
    const token = Math.random().toString(36).substring(2, 15)
    setGeneratedLink(`https://www.equivestworldwide.com/analytics/${selectedHorseId}?token=${token}`)
  }


  // --- Internal Tools ---
  const generateSocialText = () => {
    if (!socialHorseId) return
    const horse = horses.find(h => h.id === socialHorseId)
    if (!horse) return
    setSocialText(`🌟 Meet ${horse.name}! 🌟\n\nAn exceptional ${horse.status === 'Available' ? 'opportunity' : 'addition'} to the Equivest portfolio. \n\n🎯 Level: Premium Sport Horse\n💰 Price Category: ${horse.price_category}\n\nThis incredible athlete is ready for the international rings. Secure your investment today! \n\nDM us or visit the link in our bio for full vetting & X-Rays. 📥\n\n#Equivest #Showjumper #EquestrianInvestment #SportHorse #EquestrianLife`)
  }

  const generateWhatsappPitch = () => {
    if (!socialHorseId) return alert('Select a horse first')
    const horse = horses.find(h => h.id === socialHorseId)
    if (!horse) return
    
    let text = ''
    if (whatsappLanguage === 'NL') {
      text = `Hoi! Ik wilde je dit paard even laten zien: *${horse.name}* 🐴\n\n🔹 *Niveau:* ${horse.experience_level || 'Premium'}\n🔹 *Prijsklasse:* ${horse.price_category}\n\nEcht een top investeringskans. Bekijk de video en röntgenfoto's direct via deze exclusieve link:\nhttps://www.equivestworldwide.com/vip/${horse.id}?token=wa-preview\n\nLaat me weten wat je ervan vindt!`
    } else {
      text = `Hi! I wanted to personally show you this horse: *${horse.name}* 🐴\n\n🔹 *Level:* ${horse.experience_level || 'Premium'}\n🔹 *Price Category:* ${horse.price_category}\n\nA truly exceptional investment opportunity. View the video and full X-Rays directly via this exclusive link:\nhttps://www.equivestworldwide.com/vip/${horse.id}?token=wa-preview\n\nLet me know your thoughts!`
    }

    const encoded = encodeURIComponent(text)
    window.open(`https://wa.me/?text=${encoded}`, '_blank')
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('external')}
          className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'external'
              ? 'border-primary text-primary dark:text-white dark:border-white'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          External (Client Links)
        </button>
        <button
          onClick={() => setActiveTab('internal')}
          className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'internal'
              ? 'border-primary text-primary dark:text-white dark:border-white'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          Internal (Automation Tools)
        </button>
      </div>

      {/* EXTERNAL LINKS TAB */}
      {activeTab === 'external' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. VIP Link */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-lg dark:bg-purple-900/30 dark:text-purple-400"><Clock size={24} /></div>
              <h3 className="font-bold text-lg dark:text-white">24H VIP Access</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">Generate a secure link that bypasses the login wall for exactly 24 hours.</p>
            <div className="space-y-3">
              <select className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" value={selectedHorseId} onChange={(e) => setSelectedHorseId(e.target.value)}>
                <option value="">Select a horse...</option>
                {horses.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
              <button onClick={generateVipLink} className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium text-sm transition-colors">Generate VIP Link</button>
            </div>
          </div>

          {/* 2. Blind Portfolio Link */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gray-100 text-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-300"><EyeOff size={24} /></div>
              <h3 className="font-bold text-lg dark:text-white">Blind Link (White-label)</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">Generate a link for agents. Hides name, pedigree, and Equivest branding.</p>
            <div className="space-y-3">
              <select className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" value={selectedHorseId} onChange={(e) => setSelectedHorseId(e.target.value)}>
                <option value="">Select a horse...</option>
                {horses.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
              <button onClick={generateBlindLink} className="w-full py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-md font-medium text-sm transition-colors">Generate Blind Link</button>
            </div>
          </div>

          {/* 3. Custom Proposal Link */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg dark:bg-blue-900/30 dark:text-blue-400"><FileSignature size={24} /></div>
              <h3 className="font-bold text-lg dark:text-white">Custom Proposal</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">Create a personalized pitch page dedicated to a specific client.</p>
            <div className="space-y-3">
              <input type="text" placeholder="Client Name (e.g. John Doe)" className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" value={clientName} onChange={(e) => setClientName(e.target.value)} />
              <select className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" value={selectedHorseId} onChange={(e) => setSelectedHorseId(e.target.value)}>
                <option value="">Select highlighted horse...</option>
                {horses.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
              <button onClick={generateProposalLink} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-sm transition-colors">Generate Proposal Link</button>
            </div>
          </div>

          {/* 4. ROI Calculator Link */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg dark:bg-emerald-900/30 dark:text-emerald-400"><Calculator size={24} /></div>
              <h3 className="font-bold text-lg dark:text-white">ROI Calculator Link</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">Send an interactive calculator for a specific horse to show projected returns.</p>
            <div className="space-y-3">
              <select className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" value={selectedHorseId} onChange={(e) => setSelectedHorseId(e.target.value)}>
                <option value="">Select a horse...</option>
                {horses.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
              <button onClick={generateRoiLink} className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium text-sm transition-colors">Generate ROI Link</button>
            </div>
          </div>

          {/* 5. Side-by-Side Matchmaker Link */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-lg dark:bg-orange-900/30 dark:text-orange-400"><GitCompare size={24} /></div>
              <h3 className="font-bold text-lg dark:text-white">Comparison Link</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">Select 2-3 horses for a side-by-side comparison page.</p>
            <div className="space-y-3 h-32 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-md p-2 mb-2">
              {horses.map(h => (
                <label key={h.id} className="flex items-center gap-2 text-sm dark:text-gray-300 mb-1 cursor-pointer">
                  <input type="checkbox" checked={selectedHorsesForCompare.includes(h.id)} onChange={() => handleCompareSelect(h.id)} />
                  {h.name}
                </label>
              ))}
            </div>
            <button onClick={generateCompareLink} className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium text-sm transition-colors">Generate Matchmaker Link</button>
          </div>

          {/* 6. Reserve & PPE Request Link */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-rose-100 text-rose-600 rounded-lg dark:bg-rose-900/30 dark:text-rose-400"><Lock size={24} /></div>
              <h3 className="font-bold text-lg dark:text-white">Reserve / PPE Link</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">Allow a client to digitally reserve a horse for 48H and request a Vet Check.</p>
            <div className="space-y-3">
              <select className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" value={selectedHorseId} onChange={(e) => setSelectedHorseId(e.target.value)}>
                <option value="">Select a horse...</option>
                {horses.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
              <button onClick={generateReserveLink} className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-md font-medium text-sm transition-colors">Generate Reserve Link</button>
            </div>
          </div>

          {/* 7. Investor Analytics Link */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-teal-100 text-teal-600 rounded-lg dark:bg-teal-900/30 dark:text-teal-400"><BarChart3 size={24} /></div>
              <h3 className="font-bold text-lg dark:text-white">Investor Stats Link</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">Private link for current owners to view live traffic & interest on their horse.</p>
            <div className="space-y-3">
              <select className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" value={selectedHorseId} onChange={(e) => setSelectedHorseId(e.target.value)}>
                <option value="">Select a horse...</option>
                {horses.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
              <button onClick={generateAnalyticsLink} className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium text-sm transition-colors">Generate Analytics Link</button>
            </div>
          </div>

        </div>
      )}

      {/* INTERNAL AUTOMATION TAB */}
      {activeTab === 'internal' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 8. WhatsApp Pitch Generator */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg dark:bg-green-900/30 dark:text-green-400"><MessageCircle size={24} /></div>
              <h3 className="font-bold text-lg dark:text-white">1-Click WhatsApp Pitch</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Generates a perfectly formatted WhatsApp message with stats and a VIP link.</p>
            <div className="space-y-3">
              <select className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" value={socialHorseId} onChange={(e) => setSocialHorseId(e.target.value)}>
                <option value="">Select a horse...</option>
                {horses.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
              <div className="flex gap-2">
                <button onClick={() => setWhatsappLanguage('EN')} className={`flex-1 py-1 text-sm font-bold rounded ${whatsappLanguage === 'EN' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>EN</button>
                <button onClick={() => setWhatsappLanguage('NL')} className={`flex-1 py-1 text-sm font-bold rounded ${whatsappLanguage === 'NL' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>NL</button>
              </div>
              <button onClick={generateWhatsappPitch} className="w-full py-2 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-md font-bold text-sm transition-colors flex justify-center items-center gap-2">
                <MessageCircle size={18} /> Open in WhatsApp
              </button>
            </div>
          </div>

          {/* Auto-Translate Tool (Mock) */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-cyan-100 text-cyan-600 rounded-lg dark:bg-cyan-900/30 dark:text-cyan-400"><Languages size={24} /></div>
              <h3 className="font-bold text-lg dark:text-white">Auto-Translate & Rewrite</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Translates and rewrites text into perfect Equestrian Jargon (Phase 2).</p>
            <div className="space-y-3">
              <textarea placeholder="Plak hier je Nederlandse tekst..." rows={3} className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
              <button className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md font-medium text-sm transition-colors">Translate to EN, DE, ES</button>
            </div>
          </div>

          {/* Legacy Social Formatter */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-pink-100 text-pink-600 rounded-lg dark:bg-pink-900/30 dark:text-pink-400"><Share2 size={24} /></div>
              <h3 className="font-bold text-lg dark:text-white">Social Media Formatter</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Instantly generate an optimized Instagram/Facebook caption.</p>
            <div className="space-y-3">
              <select className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" value={socialHorseId} onChange={(e) => { setSocialHorseId(e.target.value); setSocialText(''); }}>
                <option value="">Select a horse...</option>
                {horses.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
              <button onClick={generateSocialText} className="w-full py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md font-medium text-sm transition-colors">Generate Caption</button>
              {socialText && (
                <div className="mt-4">
                  <textarea readOnly value={socialText} rows={6} className="w-full p-3 text-sm rounded-md border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 dark:text-white mb-2" />
                  <button onClick={() => handleCopy(socialText)} className="flex items-center justify-center gap-2 w-full py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md font-medium text-sm transition-colors">
                    <Copy size={16} /> Copy Text
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Generated Link Modal/Toast */}
      {generatedLink && (
        <div className="fixed bottom-8 right-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl border border-primary/20 max-w-md animate-fade-in z-50">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2 font-bold">
            <ShieldCheck size={20} /> Link Generated Successfully!
          </div>
          <p className="text-xs text-gray-500 mb-3">Send this exact link to your client/agent via WhatsApp or Email.</p>
          <div className="flex gap-2 mb-4">
            <input type="text" readOnly value={generatedLink} className="flex-1 text-xs p-2 rounded bg-gray-50 border border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:text-white outline-none" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleCopy(generatedLink)} className="flex-1 flex justify-center items-center gap-2 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors text-sm font-medium">
              {copied ? <CheckCircle size={16} /> : <Copy size={16} />} {copied ? 'Copied' : 'Copy'}
            </button>
            <button onClick={() => setGeneratedLink('')} className="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

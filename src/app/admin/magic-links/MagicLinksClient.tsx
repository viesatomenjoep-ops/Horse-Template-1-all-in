'use client'

import { useState } from 'react'
import { Link2, Clock, EyeOff, FileSignature, Video, Share2, Search, CheckCircle, Copy, ExternalLink, ShieldCheck } from 'lucide-react'

export default function MagicLinksClient({ horses }: { horses: any[] }) {
  const [activeTab, setActiveTab] = useState<'internal' | 'external'>('external')
  
  // External States
  const [selectedHorseId, setSelectedHorseId] = useState('')
  const [clientName, setClientName] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const [copied, setCopied] = useState(false)

  // Internal States
  const [scanUrl, setScanUrl] = useState('')
  const [socialHorseId, setSocialHorseId] = useState('')
  const [socialText, setSocialText] = useState('')

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const generateVipLink = () => {
    if (!selectedHorseId) return alert('Select a horse first')
    // In a real app, this would save to a magic_links DB table with an expiration date
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

  const generateSocialText = () => {
    if (!socialHorseId) return
    const horse = horses.find(h => h.id === socialHorseId)
    if (!horse) return
    
    setSocialText(`🌟 Meet ${horse.name}! 🌟\n\nAn exceptional ${horse.status === 'Available' ? 'opportunity' : 'addition'} to the Equivest portfolio. \n\n🎯 Level: Premium Sport Horse\n💰 Price Category: ${horse.price_category}\n\nThis incredible athlete is ready for the international rings. Secure your investment today! \n\nDM us or visit the link in our bio for full vetting & X-Rays. 📥\n\n#Equivest #Showjumper #EquestrianInvestment #SportHorse #EquestrianLife`)
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* VIP Link */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-lg dark:bg-purple-900/30 dark:text-purple-400">
                <Clock size={24} />
              </div>
              <h3 className="font-bold text-lg dark:text-white">24H VIP Access</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">
              Generate a secure link that bypasses the login wall for exactly 24 hours. Perfect for quick investor previews.
            </p>
            <div className="space-y-3">
              <select 
                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={selectedHorseId}
                onChange={(e) => setSelectedHorseId(e.target.value)}
              >
                <option value="">Select a horse...</option>
                {horses.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
              <button onClick={generateVipLink} className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium text-sm transition-colors">
                Generate VIP Link
              </button>
            </div>
          </div>

          {/* Blind Portfolio Link */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gray-100 text-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-300">
                <EyeOff size={24} />
              </div>
              <h3 className="font-bold text-lg dark:text-white">Blind Link (White-label)</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">
              Generate a link for agents. It shows the horse's video and stats, but hides the horse's name, pedigree, and Equivest branding.
            </p>
            <div className="space-y-3">
              <select 
                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={selectedHorseId}
                onChange={(e) => setSelectedHorseId(e.target.value)}
              >
                <option value="">Select a horse...</option>
                {horses.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
              <button onClick={generateBlindLink} className="w-full py-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 text-white rounded-md font-medium text-sm transition-colors">
                Generate Blind Link
              </button>
            </div>
          </div>

          {/* Custom Proposal Link */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg dark:bg-blue-900/30 dark:text-blue-400">
                <FileSignature size={24} />
              </div>
              <h3 className="font-bold text-lg dark:text-white">Custom Proposal</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">
              Create a personalized pitch page dedicated to a specific client (e.g., "Prepared exclusively for John Doe").
            </p>
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Client Name (e.g. John Doe)"
                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
              <select 
                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={selectedHorseId}
                onChange={(e) => setSelectedHorseId(e.target.value)}
              >
                <option value="">Select highlighted horse...</option>
                {horses.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
              <button onClick={generateProposalLink} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-sm transition-colors">
                Generate Proposal Link
              </button>
            </div>
          </div>

        </div>
      )}

      {/* INTERNAL AUTOMATION TAB */}
      {activeTab === 'internal' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Social Media Formatter */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-pink-100 text-pink-600 rounded-lg dark:bg-pink-900/30 dark:text-pink-400">
                <Share2 size={24} />
              </div>
              <h3 className="font-bold text-lg dark:text-white">Social Media Formatter</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Instantly generate an optimized Instagram/Facebook caption for a horse.
            </p>
            <div className="space-y-3">
              <select 
                className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                value={socialHorseId}
                onChange={(e) => {
                  setSocialHorseId(e.target.value);
                  setSocialText('');
                }}
              >
                <option value="">Select a horse...</option>
                {horses.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
              <button onClick={generateSocialText} className="w-full py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md font-medium text-sm transition-colors">
                Generate Caption
              </button>
              
              {socialText && (
                <div className="mt-4">
                  <textarea 
                    readOnly 
                    value={socialText}
                    rows={8}
                    className="w-full p-3 text-sm rounded-md border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 dark:text-white mb-2"
                  />
                  <button onClick={() => handleCopy(socialText)} className="flex items-center justify-center gap-2 w-full py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md font-medium text-sm transition-colors">
                    <Copy size={16} /> Copy Text
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Scanners (Mocks) */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg dark:bg-indigo-900/30 dark:text-indigo-400">
                  <Search size={24} />
                </div>
                <h3 className="font-bold text-lg dark:text-white">FEI / HorseTelex Scanner</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Paste an FEI or HorseTelex link. The system will extract the pedigree and results (Coming in Phase 2 DB update).
              </p>
              <div className="flex gap-2">
                <input type="url" placeholder="https://data.fei.org/..." className="flex-1 text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium text-sm transition-colors">Scan</button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 text-red-600 rounded-lg dark:bg-red-900/30 dark:text-red-400">
                  <Video size={24} />
                </div>
                <h3 className="font-bold text-lg dark:text-white">YouTube to Cloudinary</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Paste a YouTube link to securely download and transfer it to your Cloudinary vault (Coming in Phase 2).
              </p>
              <div className="flex gap-2">
                <input type="url" placeholder="https://youtube.com/watch?v=..." className="flex-1 text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium text-sm transition-colors">Convert</button>
              </div>
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
            <input 
              type="text" 
              readOnly 
              value={generatedLink} 
              className="flex-1 text-xs p-2 rounded bg-gray-50 border border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:text-white outline-none" 
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => handleCopy(generatedLink)}
              className="flex-1 flex justify-center items-center gap-2 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              {copied ? <CheckCircle size={16} /> : <Copy size={16} />} 
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button 
              onClick={() => setGeneratedLink('')}
              className="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

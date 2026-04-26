'use client'

import { useState } from 'react'
import { Clock, EyeOff, FileSignature, Share2, Search, CheckCircle, Copy, ShieldCheck, MessageCircle, Languages, Calculator, GitCompare, Lock, BarChart3, PieChart, CreditCard, PenTool, UploadCloud, Calendar as CalendarIcon, Mail } from 'lucide-react'

export default function MagicLinksClient({ horses }: { horses: any[] }) {
  const [activeTab, setActiveTab] = useState<'sales' | 'finance' | 'ops' | 'internal'>('sales')
  
  const [selectedHorseId, setSelectedHorseId] = useState('')
  const [selectedHorsesForCompare, setSelectedHorsesForCompare] = useState<string[]>([])
  const [clientName, setClientName] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [socialHorseId, setSocialHorseId] = useState('')
  const [socialText, setSocialText] = useState('')
  const [whatsappLanguage, setWhatsappLanguage] = useState('EN')

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const generateLink = (path: string) => {
    if (!selectedHorseId) return alert('Select a horse first')
    const token = Math.random().toString(36).substring(2, 15)
    setGeneratedLink(`https://www.equivestworldwide.com${path.replace('[id]', selectedHorseId).replace('[token]', token)}`)
  }

  const generateCompareLink = () => {
    if (selectedHorsesForCompare.length < 2) return alert('Select at least 2 horses')
    setGeneratedLink(`https://www.equivestworldwide.com/compare/${selectedHorsesForCompare.join(',')}`)
  }

  const handleCompareSelect = (id: string) => {
    if (selectedHorsesForCompare.includes(id)) setSelectedHorsesForCompare(prev => prev.filter(h => h !== id))
    else if (selectedHorsesForCompare.length < 3) setSelectedHorsesForCompare(prev => [...prev, id])
  }

  const generateProposalLink = () => {
    if (!clientName || !selectedHorseId) return alert('Enter client name and select a horse')
    const slug = clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    setGeneratedLink(`https://www.equivestworldwide.com/proposal/${slug}?horses=${selectedHorseId}`)
  }

  const generateNewsletter = () => {
    if (selectedHorsesForCompare.length === 0) return alert('Select at least 1 horse from the Compare list above first')
    setSocialText(`<h1>Equivest Portfolio Update</h1>\n<p>Discover our newest premium assets.</p>\n\n` + selectedHorsesForCompare.map(id => {
      const h = horses.find(x => x.id === id)
      return `<h3>${h?.name}</h3><p>Level: ${h?.experience_level}</p><a href="https://www.equivestworldwide.com/horses/${h?.id}">View Investment</a><br/><br/>`
    }).join(''))
  }

  const generateWhatsappPitch = () => {
    if (!socialHorseId) return alert('Select a horse first')
    const h = horses.find(x => x.id === socialHorseId)
    if (!h) return
    const text = whatsappLanguage === 'NL' 
      ? `Hoi! Ik wilde je dit paard even laten zien: *${h.name}*\n\n🔹 *Niveau:* ${h.experience_level}\n🔹 *Prijs:* ${h.price_category}\n\nBekijk de video direct via:\nhttps://www.equivestworldwide.com/vip/${h.id}?token=preview\n\nLaat me weten wat je ervan vindt!`
      : `Hi! Take a look at this exceptional asset: *${h.name}*\n\n🔹 *Level:* ${h.experience_level}\n🔹 *Price:* ${h.price_category}\n\nView the video directly via:\nhttps://www.equivestworldwide.com/vip/${h.id}?token=preview\n\nLet me know your thoughts!`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const HorseSelector = () => (
    <select className="w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white mb-3" value={selectedHorseId} onChange={(e) => setSelectedHorseId(e.target.value)}>
      <option value="">Select a horse...</option>
      {horses.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
    </select>
  )

  const Card = ({ icon: Icon, title, desc, children, colorClass }: any) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-3 rounded-lg ${colorClass}`}><Icon size={24} /></div>
        <h3 className="font-bold text-lg dark:text-white">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">{desc}</p>
      <div>{children}</div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
        {[
          { id: 'sales', label: 'Sales & Pitching' },
          { id: 'finance', label: 'Finance & Legal' },
          { id: 'ops', label: 'Logistics & Ops' },
          { id: 'internal', label: 'Internal Automation' }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`py-2 px-4 rounded-full font-bold text-sm transition-colors ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'sales' && (
          <>
            <Card icon={Clock} title="24H VIP Access" desc="Bypass the login wall for exactly 24 hours. Perfect for quick investor previews." colorClass="bg-purple-100 text-purple-600">
              <HorseSelector />
              <button onClick={() => generateLink('/vip/[id]?token=[token]')} className="w-full py-2 bg-purple-600 text-white rounded-md font-bold text-sm">Generate VIP Link</button>
            </Card>
            <Card icon={EyeOff} title="Blind Link" desc="White-label link for agents. Hides name, pedigree, and branding." colorClass="bg-gray-100 text-gray-600">
              <HorseSelector />
              <button onClick={() => generateLink('/blind-portfolio/[id]')} className="w-full py-2 bg-gray-800 text-white rounded-md font-bold text-sm">Generate Blind Link</button>
            </Card>
            <Card icon={FileSignature} title="Custom Proposal" desc="Create a personalized pitch page dedicated to a specific client." colorClass="bg-blue-100 text-blue-600">
              <input type="text" placeholder="Client Name" className="w-full text-sm rounded-md border-gray-300 mb-3" value={clientName} onChange={(e) => setClientName(e.target.value)} />
              <HorseSelector />
              <button onClick={generateProposalLink} className="w-full py-2 bg-blue-600 text-white rounded-md font-bold text-sm">Generate Proposal</button>
            </Card>
            <Card icon={Calculator} title="ROI Calculator" desc="Interactive calculator showing projected returns for a specific horse." colorClass="bg-emerald-100 text-emerald-600">
              <HorseSelector />
              <button onClick={() => generateLink('/roi-calculator/[id]')} className="w-full py-2 bg-emerald-600 text-white rounded-md font-bold text-sm">Generate ROI Link</button>
            </Card>
            <Card icon={GitCompare} title="Side-by-Side Matchmaker" desc="Select 2-3 horses for a side-by-side comparison page." colorClass="bg-orange-100 text-orange-600">
              <div className="h-24 overflow-y-auto border border-gray-200 rounded-md p-2 mb-3">
                {horses.map(h => (
                  <label key={h.id} className="flex items-center gap-2 text-sm mb-1 cursor-pointer"><input type="checkbox" checked={selectedHorsesForCompare.includes(h.id)} onChange={() => handleCompareSelect(h.id)} />{h.name}</label>
                ))}
              </div>
              <button onClick={generateCompareLink} className="w-full py-2 bg-orange-500 text-white rounded-md font-bold text-sm">Generate Comparison</button>
            </Card>
            <Card icon={BarChart3} title="Investor Analytics" desc="Private dashboard for current owners to view live traffic & interest." colorClass="bg-teal-100 text-teal-600">
              <HorseSelector />
              <button onClick={() => generateLink('/analytics/[id]?token=[token]')} className="w-full py-2 bg-teal-600 text-white rounded-md font-bold text-sm">Generate Stats Link</button>
            </Card>
          </>
        )}

        {activeTab === 'finance' && (
          <>
            <Card icon={PieChart} title="Syndicate Offering" desc="Fractional ownership page to raise capital from multiple investors." colorClass="bg-indigo-100 text-indigo-600">
              <HorseSelector />
              <button onClick={() => generateLink('/syndicate/[id]')} className="w-full py-2 bg-indigo-600 text-white rounded-md font-bold text-sm">Generate Syndicate Link</button>
            </Card>
            <Card icon={CreditCard} title="Secure Payment Link" desc="Generate a Stripe checkout link for deposits or final payments." colorClass="bg-blue-100 text-blue-600">
              <HorseSelector />
              <button onClick={() => generateLink('/pay/[token]')} className="w-full py-2 bg-blue-600 text-white rounded-md font-bold text-sm">Generate Payment Link</button>
            </Card>
            <Card icon={PenTool} title="Digital E-Sign Contract" desc="Send the Equivest Bill of Sale for digital smartphone signature." colorClass="bg-rose-100 text-rose-600">
              <HorseSelector />
              <button onClick={() => generateLink('/sign/[id]')} className="w-full py-2 bg-rose-600 text-white rounded-md font-bold text-sm">Generate E-Sign Link</button>
            </Card>
          </>
        )}

        {activeTab === 'ops' && (
          <>
            <Card icon={UploadCloud} title="Secure Document Drop" desc="Send a link to vets/owners to securely upload heavy 4K videos or X-Rays." colorClass="bg-cyan-100 text-cyan-600">
              <HorseSelector />
              <button onClick={() => generateLink('/drop/[id]')} className="w-full py-2 bg-cyan-600 text-white rounded-md font-bold text-sm">Generate Drop Link</button>
            </Card>
            <Card icon={CalendarIcon} title="Live Try-Out Booking" desc="Let clients book a viewing/try-out session directly in your calendar." colorClass="bg-amber-100 text-amber-600">
              <HorseSelector />
              <button onClick={() => generateLink('/book-visit/[id]')} className="w-full py-2 bg-amber-500 text-white rounded-md font-bold text-sm">Generate Booking Link</button>
            </Card>
            <Card icon={Lock} title="Reserve & PPE Request" desc="Allow clients to digitally reserve a horse for 48H and request a Vet Check." colorClass="bg-red-100 text-red-600">
              <HorseSelector />
              <button onClick={() => generateLink('/reserve/[id]')} className="w-full py-2 bg-red-600 text-white rounded-md font-bold text-sm">Generate Reserve Link</button>
            </Card>
          </>
        )}

        {activeTab === 'internal' && (
          <>
            <Card icon={MessageCircle} title="1-Click WhatsApp Pitch" desc="Generates a perfectly formatted WhatsApp message with stats and a VIP link." colorClass="bg-green-100 text-green-600">
              <select className="w-full text-sm rounded-md border-gray-300 mb-3" value={socialHorseId} onChange={(e) => setSocialHorseId(e.target.value)}>
                <option value="">Select a horse...</option>
                {horses.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
              <div className="flex gap-2 mb-3">
                <button onClick={() => setWhatsappLanguage('EN')} className={`flex-1 py-1 text-sm font-bold rounded ${whatsappLanguage === 'EN' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>EN</button>
                <button onClick={() => setWhatsappLanguage('NL')} className={`flex-1 py-1 text-sm font-bold rounded ${whatsappLanguage === 'NL' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>NL</button>
              </div>
              <button onClick={generateWhatsappPitch} className="w-full py-2 bg-[#25D366] text-white rounded-md font-bold text-sm flex justify-center items-center gap-2"><MessageCircle size={18} /> Open in WhatsApp</button>
            </Card>
            <Card icon={Mail} title="1-Click Newsletter Builder" desc="Select horses in the Matchmaker tool first, then generate HTML for Mailchimp." colorClass="bg-yellow-100 text-yellow-600">
              <button onClick={generateNewsletter} className="w-full py-2 bg-yellow-500 text-white rounded-md font-bold text-sm mb-3">Generate HTML Newsletter</button>
              {socialText && (
                <div className="mt-2">
                  <textarea readOnly value={socialText} rows={4} className="w-full text-xs p-2 rounded border" />
                  <button onClick={() => handleCopy(socialText)} className="mt-2 w-full py-2 bg-gray-100 text-gray-800 rounded-md font-bold text-sm">Copy Code</button>
                </div>
              )}
            </Card>
            <Card icon={Languages} title="Auto-Translate & Rewrite" desc="Translates and rewrites text into perfect Equestrian Jargon (Phase 2)." colorClass="bg-fuchsia-100 text-fuchsia-600">
              <textarea placeholder="Plak hier je tekst..." rows={2} className="w-full text-sm rounded-md border-gray-300 mb-3" />
              <button className="w-full py-2 bg-fuchsia-600 text-white rounded-md font-bold text-sm">Translate to EN, DE, ES</button>
            </Card>
          </>
        )}
      </div>

      {generatedLink && (
        <div className="fixed bottom-8 right-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl border border-primary/20 max-w-md animate-fade-in z-50">
          <div className="flex items-center gap-2 text-green-600 mb-2 font-bold"><ShieldCheck size={20} /> Link Generated!</div>
          <p className="text-xs text-gray-500 mb-3">Send this exact link to your client/agent.</p>
          <input type="text" readOnly value={generatedLink} className="w-full text-xs p-2 rounded bg-gray-50 border border-gray-200 mb-4" />
          <div className="flex gap-2">
            <button onClick={() => handleCopy(generatedLink)} className="flex-1 py-2 bg-primary text-white rounded text-sm font-bold flex items-center justify-center gap-2">
              {copied ? <CheckCircle size={16} /> : <Copy size={16} />} {copied ? 'Copied' : 'Copy'}
            </button>
            <button onClick={() => setGeneratedLink('')} className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-sm font-bold">Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

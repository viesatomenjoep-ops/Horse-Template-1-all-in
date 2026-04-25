'use client'

import { useState } from 'react'
import { updatePageContent } from '@/app/actions/pages'
import CloudinaryUploader from '@/components/admin/CloudinaryUploader'
import { Plus, Trash2, ArrowUp, ArrowDown, Save, Loader2, Image as ImageIcon, Type, Heading } from 'lucide-react'

export default function PageBuilderClient({ initialData }: { initialData: any }) {
  const [title, setTitle] = useState(initialData.title || '')
  const [heroImage, setHeroImage] = useState(initialData.hero_image || '')
  const [blocks, setBlocks] = useState<any[]>(initialData.content_blocks || [])
  const [loading, setLoading] = useState(false)

  const handleAddBlock = (type: string) => {
    setBlocks([...blocks, { id: Date.now().toString(), type, content: '', size: type === 'heading' ? 'text-3xl' : 'text-base' }])
  }

  const handleRemoveBlock = (index: number) => {
    const newBlocks = [...blocks]
    newBlocks.splice(index, 1)
    setBlocks(newBlocks)
  }

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === blocks.length - 1) return
    
    const newBlocks = [...blocks]
    const temp = newBlocks[index]
    newBlocks[index] = newBlocks[direction === 'up' ? index - 1 : index + 1]
    newBlocks[direction === 'up' ? index - 1 : index + 1] = temp
    setBlocks(newBlocks)
  }

  const updateBlock = (index: number, field: string, value: string) => {
    const newBlocks = [...blocks]
    newBlocks[index] = { ...newBlocks[index], [field]: value }
    setBlocks(newBlocks)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await updatePageContent('investors', {
        title,
        hero_image: heroImage,
        content_blocks: blocks
      })
      alert('Pagina succesvol opgeslagen!')
    } catch (err) {
      console.error(err)
      alert('Fout bij opslaan.')
    }
    setLoading(false)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 pb-24">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary dark:text-white">Pagina Bewerken: Investors</h1>
          <p className="text-gray-500">Pas teksten, plaatjes en groottes aan voor de investeringspagina.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={loading}
          className="flex items-center px-6 py-3 bg-accent text-white font-bold rounded-md hover:bg-primary transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
          <span>Opslaan</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6">
        <h2 className="text-xl font-bold border-b pb-2">Hero Sectie (Bovenkant)</h2>
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Grote Titel</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Achtergrondfoto</label>
          {heroImage && (
            <div className="w-full h-40 relative rounded-md overflow-hidden mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
            </div>
          )}
          <CloudinaryUploader 
            onUploadSuccess={(url) => setHeroImage(url)} 
            label="Upload Nieuwe Hero Foto"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center justify-between">
          <span>Pagina Inhoud (Blokken)</span>
        </h2>

        {blocks.map((block, index) => (
          <div key={block.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 relative group transition-all hover:border-accent/50">
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleMoveBlock(index, 'up')} className="p-1 bg-gray-100 rounded hover:bg-gray-200"><ArrowUp size={16} /></button>
              <button onClick={() => handleMoveBlock(index, 'down')} className="p-1 bg-gray-100 rounded hover:bg-gray-200"><ArrowDown size={16} /></button>
            </div>
            
            <div className="flex justify-between items-start mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
              <span className="font-bold text-sm uppercase tracking-wider text-accent flex items-center gap-2">
                {block.type === 'heading' && <><Heading size={16} /> <span>Koptekst</span></>}
                {block.type === 'text' && <><Type size={16} /> <span>Alinea (Lappen tekst)</span></>}
                {block.type === 'image' && <><ImageIcon size={16} /> <span>Afbeelding</span></>}
              </span>
              <button onClick={() => handleRemoveBlock(index)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={18} /></button>
            </div>

            {block.type === 'heading' && (
              <div className="space-y-3">
                <input 
                  type="text" 
                  value={block.content} 
                  onChange={(e) => updateBlock(index, 'content', e.target.value)} 
                  placeholder="Koptekst..."
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md outline-none focus:border-accent"
                />
                <select value={block.size} onChange={(e) => updateBlock(index, 'size', e.target.value)} className="p-2 border rounded-md">
                  <option value="text-2xl">Klein (H3)</option>
                  <option value="text-3xl">Middel (H2)</option>
                  <option value="text-5xl">Groot (H1)</option>
                </select>
              </div>
            )}

            {block.type === 'text' && (
              <div className="space-y-3">
                <textarea 
                  rows={5} 
                  value={block.content} 
                  onChange={(e) => updateBlock(index, 'content', e.target.value)} 
                  placeholder="Typ hier de lappen tekst..."
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md outline-none focus:border-accent"
                />
                <select value={block.size} onChange={(e) => updateBlock(index, 'size', e.target.value)} className="p-2 border rounded-md">
                  <option value="text-sm">Klein</option>
                  <option value="text-base">Normaal</option>
                  <option value="text-lg">Iets Groter</option>
                  <option value="text-xl">Groot & Opvallend</option>
                </select>
              </div>
            )}

            {block.type === 'image' && (
              <div className="space-y-3">
                {block.content ? (
                  <div className="w-full h-48 relative rounded-md overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={block.content} alt="Block" className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className="w-full h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-500">
                    Nog geen afbeelding geselecteerd
                  </div>
                )}
                <CloudinaryUploader 
                  onUploadSuccess={(url) => updateBlock(index, 'content', url)} 
                  label="Upload Afbeelding"
                />
              </div>
            )}
          </div>
        ))}

        {blocks.length === 0 && <div className="text-center p-10 text-gray-500">Nog geen blokken toegevoegd.</div>}

        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
          <button onClick={() => handleAddBlock('heading')} className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md font-medium text-sm">
            <Heading size={16} className="mr-2" /> Koptekst Toevoegen
          </button>
          <button onClick={() => handleAddBlock('text')} className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md font-medium text-sm">
            <Type size={16} className="mr-2" /> Tekst Toevoegen
          </button>
          <button onClick={() => handleAddBlock('image')} className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md font-medium text-sm">
            <ImageIcon size={16} className="mr-2" /> Afbeelding Toevoegen
          </button>
        </div>
      </div>
      <p className="text-center text-sm text-gray-500">Let op: De ROI Calculator staat standaard vast onderaan de "Want to invest" pagina.</p>
    </div>
  )
}

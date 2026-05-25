'use client'

import { useState } from 'react'
import { X, Download } from 'lucide-react'

export default function VideoModal({ 
  videoUrl, 
  title, 
  children,
  className = ""
}: { 
  videoUrl: string, 
  title: string,
  children: React.ReactNode,
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        onClick={(e) => { e.preventDefault(); setIsOpen(true); }} 
        className={className}
      >
        {children}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-10 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-800">
              <h3 className="text-white font-medium">{title}</h3>
              <div className="flex gap-4">
                <a 
                  href={videoUrl} 
                  download 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold bg-white/10 px-3 py-1.5 rounded-lg"
                  title="Download Video"
                >
                  <Download size={18} /> Download
                </a>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-gray-400 hover:text-white transition-colors bg-white/10 p-1.5 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="relative w-full aspect-video bg-black flex justify-center items-center">
              <video 
                src={videoUrl} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

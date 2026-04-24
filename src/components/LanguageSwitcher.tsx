'use client'

import { useState, useEffect, useRef } from 'react'
import { Globe } from 'lucide-react'

const LANGUAGES = [
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
]

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('nl')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Read the googtrans cookie to find the current language
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    }
    
    const googtrans = getCookie('googtrans');
    if (googtrans) {
      const match = googtrans.match(/\/([a-z]{2})$/i)
      if (match && match[1]) {
        setCurrentLang(match[1])
      }
    }
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const changeLanguage = (code: string) => {
    if (code === currentLang) {
      setIsOpen(false)
      return
    }

    const host = window.location.hostname;
    const baseHost = host.replace(/^www\./, '');

    if (code === 'nl') {
      // Clear the cookie to revert to original
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${host};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${baseHost};`;
      window.location.reload();
      return;
    }

    // Try to trigger the native hidden google translate dropdown directly for an instant translation without reload
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event('change'));
      setCurrentLang(code);
      setIsOpen(false);
    } else {
      // Fallback: set the cookie aggressively and reload
      document.cookie = `googtrans=/nl/${code}; path=/;`;
      document.cookie = `googtrans=/nl/${code}; path=/; domain=${host};`;
      document.cookie = `googtrans=/nl/${code}; path=/; domain=.${baseHost};`;
      window.location.reload()
    }
  }

  const currentLangData = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0]

  return (
    <div 
      className="relative z-50 notranslate flex flex-col items-center" 
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div 
        className={`flex flex-col items-center overflow-hidden transition-all duration-500 ease-in-out bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-sm ${
          isOpen ? 'h-[160px] opacity-100' : 'h-10 sm:h-12 opacity-90'
        }`}
      >
        {/* Current Language Trigger */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 shrink-0 hover:text-accent transition-colors focus:outline-none"
          aria-label="Toggle Language"
        >
          <span className="text-xs sm:text-sm font-bold text-primary dark:text-white uppercase tracking-[0.2em]">{currentLang}</span>
        </button>

        {/* Slide-out options */}
        <div className={`flex flex-col items-center pb-2 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          {LANGUAGES.filter(l => l.code !== currentLang).map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-500 hover:text-accent dark:text-gray-400 dark:hover:text-white uppercase tracking-[0.1em] transition-colors"
            >
              {lang.code}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

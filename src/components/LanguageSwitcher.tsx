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
    <div className="relative z-50 notranslate" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/50 hover:bg-white/80 dark:bg-gray-900/50 dark:hover:bg-gray-800 backdrop-blur-md rounded-full transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md"
        aria-label="Select Language"
      >
        <span className="text-base sm:text-lg leading-none filter drop-shadow-sm">{currentLangData.flag}</span>
        <span className="text-xs sm:text-sm font-bold text-primary dark:text-white uppercase tracking-wider">{currentLang}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transform opacity-100 scale-100 transition-all duration-200 origin-top-right">
          <div className="p-2 space-y-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full text-left px-4 py-3 text-sm flex items-center gap-4 rounded-xl transition-all duration-200 ${
                  currentLang === lang.code 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-xl filter drop-shadow-sm">{lang.flag}</span>
                <span className={`font-medium tracking-wide ${currentLang === lang.code ? 'text-white' : ''}`}>
                  {lang.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

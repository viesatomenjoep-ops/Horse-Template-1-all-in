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
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors border border-gray-200 dark:border-gray-700"
      >
        <Globe size={18} className="text-gray-600 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{currentLangData.flag} {currentLang.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="py-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  currentLang === lang.code ? 'bg-primary/5 text-primary dark:bg-gray-700 font-medium' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

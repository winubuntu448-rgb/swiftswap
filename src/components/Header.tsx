'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const languages = [
  { code: 'en', name: 'English', short: 'EN', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', short: 'AR', flag: '🇸🇦' },
  { code: 'fr', name: 'Français', short: 'FR', flag: '🇫🇷' }
];

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLanguage = (newLocale: string) => {
    setLanguage(newLocale as any);
    setIsOpen(false);
  };

  const currentLang = languages.find((l) => l.code === language);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/90 backdrop-blur-sm border-b border-gray-100'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Left: Lang switcher */}
          <div className="relative">
            <button
              id="lang-switcher-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 bg-white/50 hover:border-gray-300 transition-all duration-300 ease-in-out"
            >
              <span className="text-base leading-none">{currentLang?.flag}</span>
              <span className="text-sm font-medium text-[#6B7280]">{currentLang?.short}</span>
              <svg
                className={`w-3.5 h-3.5 text-[#6B7280] transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isOpen && (
              <>
                {/* Backdrop */}
                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                <div className="absolute left-0 rtl:left-auto rtl:right-0 mt-2 w-44 z-50">
                  <div className="bg-white border border-gray-200 overflow-hidden shadow-lg">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        id={`lang-option-${lang.code}`}
                        onClick={() => switchLanguage(lang.code)}
                        className={`w-full px-3 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors duration-300 ease-in-out ${language === lang.code ? 'bg-gray-50' : ''
                          }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <div className="text-left">
                          <p className="text-sm font-medium text-[#1A1D21] leading-none">{lang.name}</p>
                          <p className="text-[10px] text-[#6B7280] mt-0.5">{lang.short}</p>
                        </div>
                        {language === lang.code && (
                          <svg className="w-4 h-4 text-[#C5A059] ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Center Logo */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://swiftswapexchange.com/logo.png"
              alt="SwiftSwap Logo"
              className="w-8 h-8 object-contain"
            />
            <span
              className="text-xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #003087 0%, #C5A059 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              SwiftSwap
            </span>
          </div>

          {/* Right: Very small trust indicators */}
          <div className="hidden md:flex items-center gap-3 text-[10px] text-[#9CA3AF]">
            <span>SSL Secured</span>
            <span className="text-gray-200">•</span>
            <span>System Online</span>
            <span className="text-gray-200">•</span>
            <span>Instant Swap</span>
          </div>
        </div>
      </div>
    </header>
  );
}

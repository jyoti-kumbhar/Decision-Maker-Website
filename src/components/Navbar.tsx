import React from 'react';
import { Button } from './ui/Button';
import { useDecision } from '../context/DecisionContext';
import { languages, type Language } from '../i18n/translations';

export const Navbar = () => {
  const { theme, toggleTheme, language, setLanguage, t } = useDecision();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-hairline bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-lg">
        <div className="flex items-center gap-sm">
          <a href="/" className="flex items-center gap-sm hover:opacity-80 transition-opacity">
            <img src="/icon.png" alt="Decision Maker Logo" className="h-8 w-8 rounded-sm object-contain" />
            <span className="text-display-sm hidden sm:block">{t('nav.brand')}</span>
          </a>
        </div>

        <div className="flex items-center gap-sm">
          <nav className="hidden md:flex items-center gap-md mr-md">
            <a href="/" className="text-sm font-medium text-body hover:text-ink transition-colors">{t('nav.home')}</a>
            <a href="/about" className="text-sm font-medium text-body hover:text-ink transition-colors">{t('nav.about')}</a>
            <a href="/services" className="text-sm font-medium text-body hover:text-ink transition-colors">{t('nav.services')}</a>
            <a href="/history" className="text-sm font-medium text-body hover:text-ink transition-colors">{t('nav.history')}</a>
            <a href="/contact" className="text-sm font-medium text-body hover:text-ink transition-colors">{t('nav.contact')}</a>
            <div className="w-px h-3 bg-hairline" />
            <a href="/privacy" className="text-xs font-medium text-mute hover:text-ink transition-colors">{t('footer.privacy')}</a>
            <a href="/terms" className="text-xs font-medium text-mute hover:text-ink transition-colors">{t('footer.terms')}</a>
          </nav>
        </div>

        <div className="flex items-center gap-sm">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-transparent text-sm font-medium text-body hover:text-ink focus:outline-none cursor-pointer p-1 rounded hover:bg-canvas-soft-2 transition-colors"
          >
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code} className="bg-canvas text-ink">
                {name}
              </option>
            ))}
          </select>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-canvas-soft-2 transition-colors text-body hover:text-ink"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M6.343 6.343l.707.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
              </svg>
            )}
          </button>
        </div>
      </div>

    </nav>
  );
};

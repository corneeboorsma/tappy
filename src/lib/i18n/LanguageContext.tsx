'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import en, { type Translations } from './en';
import nl from './nl';

type Locale = 'en' | 'nl';

const translations: Record<Locale, Translations> = { en, nl };

interface LanguageContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (l: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'en',
  t: en,
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('tappy-locale') as Locale | null;
    if (saved === 'en' || saved === 'nl') setLocaleState(saved);
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    localStorage.setItem('tappy-locale', l);
  }

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}

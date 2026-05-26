'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, locale, setLocale } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D1117]/90 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/images/tappy-logo-dark.png" alt="Tappy" width={96} height={27} priority />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-[#8B949E]">
          <Link href="#" className="hover:text-white transition-colors">{t.nav.product}</Link>
          <Link href="#" className="hover:text-white transition-colors">{t.nav.solutions} ↓</Link>
          <Link href="#" className="hover:text-white transition-colors">{t.nav.pricing}</Link>
          <Link href="#" className="hover:text-white transition-colors">{t.nav.about}</Link>
          <Link href="#" className="hover:text-white transition-colors">{t.nav.support}</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {/* Language toggle */}
          <div className="flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => setLocale('en')}
              className={`px-2 py-1 rounded transition-colors ${locale === 'en' ? 'text-[#C6FF3B]' : 'text-[#8B949E] hover:text-white'}`}
            >
              EN
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={() => setLocale('nl')}
              className={`px-2 py-1 rounded transition-colors ${locale === 'nl' ? 'text-[#C6FF3B]' : 'text-[#8B949E] hover:text-white'}`}
            >
              NL
            </button>
          </div>

          <Link href="/portal" className="text-sm text-[#8B949E] hover:text-white transition-colors">
            {t.nav.login}
          </Link>
          <Link
            href="#"
            className="text-sm font-semibold bg-[#C6FF3B] text-[#0D1117] px-5 py-2 rounded-full hover:bg-[#d4ff5a] transition-colors"
          >
            {t.nav.getStarted}
          </Link>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current" />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0D1117] border-t border-white/5 px-6 py-4 flex flex-col gap-4 text-sm">
          <Link href="#" className="text-[#8B949E] hover:text-white">{t.nav.product}</Link>
          <Link href="#" className="text-[#8B949E] hover:text-white">{t.nav.solutions}</Link>
          <Link href="#" className="text-[#8B949E] hover:text-white">{t.nav.pricing}</Link>
          <Link href="#" className="text-[#8B949E] hover:text-white">{t.nav.about}</Link>
          <Link href="#" className="text-[#8B949E] hover:text-white">{t.nav.support}</Link>
          <Link href="/portal" className="text-[#8B949E] hover:text-white">{t.nav.login}</Link>
          <div className="flex items-center gap-2">
            <button onClick={() => setLocale('en')} className={`text-xs font-semibold px-2 py-1 rounded ${locale === 'en' ? 'text-[#C6FF3B]' : 'text-[#8B949E]'}`}>EN</button>
            <span className="text-white/20">|</span>
            <button onClick={() => setLocale('nl')} className={`text-xs font-semibold px-2 py-1 rounded ${locale === 'nl' ? 'text-[#C6FF3B]' : 'text-[#8B949E]'}`}>NL</button>
          </div>
          <Link href="#" className="font-semibold bg-[#C6FF3B] text-[#0D1117] px-5 py-2 rounded-full text-center">
            {t.nav.getStarted}
          </Link>
        </div>
      )}
    </nav>
  );
}

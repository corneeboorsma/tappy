'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0D1117] border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Image src="/images/tappy-logo-dark.png" alt="Tappy" width={80} height={23} className="mb-1" />
            <p className="text-xs text-[#8B949E] mb-4">{t.footer.tagline}</p>
            <div className="flex gap-3 text-[#8B949E]">
              <Link href="#" className="hover:text-white transition-colors text-sm">ig</Link>
              <Link href="#" className="hover:text-white transition-colors text-sm">fb</Link>
              <Link href="#" className="hover:text-white transition-colors text-sm">in</Link>
            </div>
          </div>

          {t.footer.cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-sm text-[#8B949E] hover:text-white transition-colors">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">{t.footer.newsletter}</h4>
            <p className="text-xs text-[#8B949E] mb-3">{t.footer.newsletterSub}</p>
            <div className="flex">
              <input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                className="flex-1 bg-[#1E242D] border border-white/10 rounded-l-lg px-3 py-2 text-sm text-white placeholder-[#8B949E] focus:outline-none focus:border-[#C6FF3B]/50"
              />
              <button className="bg-[#C6FF3B] text-[#0D1117] px-3 py-2 rounded-r-lg font-bold hover:bg-[#d4ff5a] transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-wrap gap-4 justify-between items-center text-xs text-[#8B949E]">
          <span>{t.footer.copyright}</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">{t.footer.privacy}</Link>
            <Link href="#" className="hover:text-white transition-colors">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

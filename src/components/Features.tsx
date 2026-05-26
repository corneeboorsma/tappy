'use client';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n/LanguageContext';

const icons = ['📱', '📊', '👥'];
const imgs = ['/images/feature-payments.jpg', '/images/feature-insights.jpg', '/images/feature-teams.jpg'];

export default function Features() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-[#0D1117]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-end">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-4">
              {t.features.label}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              {t.features.headline1}<br />
              <span className="text-[#C6FF3B]">{t.features.headline2}</span> {t.features.headline3}
            </h2>
          </div>
          <p className="text-[#8B949E] leading-relaxed">{t.features.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.features.items.map((f, i) => (
            <div key={f.title} className="bg-[#1E242D] rounded-2xl overflow-hidden flex flex-col">
              <div className="relative w-full h-52">
                <Image src={imgs[i]} alt={f.imgAlt} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-[#C6FF3B]/10 border border-[#C6FF3B]/20 flex items-center justify-center text-[#C6FF3B]">
                  {icons[i]}
                </div>
                <h3 className="text-lg font-bold text-white">{f.title}</h3>
                <p className="text-sm text-[#8B949E] leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

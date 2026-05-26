'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TappyTerminal from './TappyTerminal';
import { useTranslation } from '@/lib/i18n/LanguageContext';

const guestColors = ['#a78bfa', '#60a5fa', '#f472b6', '#34d399'];
const guestAngles = [-130, -50, 50, 130];
const guestNames = ['Anna', 'Mike', 'Sara', 'Tom'];
const guestAmounts = ['€8,50', '€12,00', '€9,25', '€6,75'];

const STEP_DURATION = 4000;

function HeroAnimation() {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<'collecting' | 'paying'>('collecting');
  const [paidCount, setPaidCount] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    function run() {
      setPhase('collecting');
      setPaidCount(0);
      guestNames.forEach((_, i) => {
        timers.push(setTimeout(() => setPaidCount(i + 1), 800 + i * 700));
      });
      timers.push(setTimeout(() => setPhase('paying'), STEP_DURATION));
      timers.push(setTimeout(run, STEP_DURATION * 2 + 500));
    }

    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  const total = '€36,50';
  const terminalState = phase === 'paying' ? 'paid' : paidCount > 0 ? 'active' : 'idle';

  return (
    <div className="relative flex items-center justify-center" style={{ width: 420, height: 420 }}>
      <div className="absolute rounded-full pointer-events-none"
        style={{
          width: 240, height: 240,
          background: 'radial-gradient(circle, rgba(198,255,59,0.08) 0%, transparent 70%)',
          opacity: phase === 'paying' ? 1 : 0.4,
          transition: 'opacity 1s',
        }} />

      {guestNames.map((name, i) => {
        const rad = (guestAngles[i] * Math.PI) / 180;
        const r = 162;
        const x = Math.sin(rad) * r;
        const y = -Math.cos(rad) * r;
        const tapped = paidCount > i;

        return (
          <div
            key={name}
            className="absolute flex flex-col items-center gap-1 transition-all duration-500"
            style={{
              left: '50%', top: '50%',
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              opacity: phase === 'paying' ? 0 : 1,
            }}
          >
            <div
              className="text-[10px] font-bold px-2 py-0.5 rounded-full transition-all duration-500"
              style={{
                background: tapped ? guestColors[i] : 'rgba(255,255,255,0.08)',
                color: tapped ? '#0D1117' : '#8B949E',
                transform: tapped ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(4px)',
                opacity: tapped ? 1 : 0.5,
              }}
            >
              {guestAmounts[i]}
            </div>
            <div
              className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-500"
              style={{
                borderColor: tapped ? guestColors[i] : 'rgba(255,255,255,0.15)',
                background: tapped ? `${guestColors[i]}22` : 'rgba(255,255,255,0.05)',
                color: tapped ? guestColors[i] : '#8B949E',
              }}
            >
              {tapped ? '✓' : name[0]}
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-1">
        <div
          className="text-[11px] font-semibold tracking-wide transition-all duration-500 text-center"
          style={{ color: phase === 'paying' ? '#C6FF3B' : '#8B949E' }}
        >
          {phase === 'paying'
            ? t.hero.animBillPaid
            : paidCount === guestNames.length
            ? t.hero.animAllPaid
            : t.hero.animTapped(paidCount, guestNames.length)}
        </div>
        {phase === 'collecting' && (
          <div className="text-[10px] text-[#8B949E]">{t.hero.animTotal}: {total}</div>
        )}
      </div>

      <TappyTerminal size="lg" state={terminalState} amount={phase === 'collecting' ? total : undefined} />
    </div>
  );
}

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative flex items-center overflow-hidden bg-[#0D1117]" style={{ minHeight: '70vh' }}>
      <div className="absolute inset-0 bg-[url('/images/hero-bar.jpg')] bg-cover bg-center" style={{ backgroundPosition: '50% 20%' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] from-25% via-[#0D1117]/85 via-50% to-[#0D1117]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/70 via-transparent to-[#0D1117]/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 w-full">
        <div className="flex items-center justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight mb-5">
              <span className="text-white block">{t.hero.line1}</span>
              <span className="text-[#C6FF3B] block">{t.hero.line2}</span>
            </h1>
            <p className="text-lg text-[#8B949E] mb-8 max-w-sm leading-relaxed">
              {t.hero.sub}
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
              <Link href="#" className="flex items-center gap-2 bg-[#C6FF3B] text-[#0D1117] font-semibold px-6 py-3 rounded-full hover:bg-[#d4ff5a] transition-colors">
                {t.hero.cta1} <span>→</span>
              </Link>
              <Link href="#" className="flex items-center gap-2 border border-white/20 text-white font-semibold px-6 py-3 rounded-full hover:border-white/40 transition-colors">
                {t.hero.cta2}
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              {t.hero.trust.map((item) => (
                <div key={item.title} className="flex items-center gap-2 text-[#8B949E]">
                  <span className="text-[#C6FF3B]">{['⚡', '🛡', '📊'][t.hero.trust.indexOf(item)]}</span>
                  <div>
                    <div className="text-white font-medium">{item.title}</div>
                    <div className="text-xs">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex flex-shrink-0 items-center justify-center">
            <HeroAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}

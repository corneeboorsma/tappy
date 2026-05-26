'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TappyTerminal from './TappyTerminal';

const guests = [
  { name: 'Anna', amount: '€8,50', color: '#a78bfa', angle: -130 },
  { name: 'Mike', amount: '€12,00', color: '#60a5fa', angle: -50 },
  { name: 'Sara', amount: '€9,25', color: '#f472b6', angle: 50 },
  { name: 'Tom',  amount: '€6,75', color: '#34d399', angle: 130 },
];

const STEP_DURATION = 4000;

function HeroAnimation() {
  const [phase, setPhase] = useState<'collecting' | 'paying'>('collecting');
  const [paidCount, setPaidCount] = useState(0);

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];

    function run() {
      setPhase('collecting');
      setPaidCount(0);

      // Each guest taps one by one
      guests.forEach((_, i) => {
        timers.push(setTimeout(() => setPaidCount(i + 1), 800 + i * 700));
      });

      // Phase 2 — paying the bill
      timers.push(setTimeout(() => setPhase('paying'), STEP_DURATION));

      // Loop
      timers.push(setTimeout(run, STEP_DURATION * 2 + 500));
    }

    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  const total = '€36,50';
  const terminalState = phase === 'paying' ? 'paid' : paidCount > 0 ? 'active' : 'idle';

  return (
    <div className="relative flex items-center justify-center" style={{ width: 280, height: 280 }}>

      {/* Subtle glow behind device */}
      <div className="absolute rounded-full pointer-events-none"
        style={{
          width: 160, height: 160,
          background: 'radial-gradient(circle, rgba(198,255,59,0.08) 0%, transparent 70%)',
          transition: 'opacity 1s',
          opacity: phase === 'paying' ? 1 : 0.4,
        }} />

      {/* Guest avatars around the device */}
      {guests.map((g, i) => {
        const rad = (g.angle * Math.PI) / 180;
        const r = 108;
        const x = Math.sin(rad) * r;
        const y = -Math.cos(rad) * r;
        const tapped = paidCount > i;

        return (
          <div
            key={g.name}
            className="absolute flex flex-col items-center gap-1 transition-all duration-500"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              opacity: phase === 'paying' ? 0 : 1,
            }}
          >
            {/* Payment amount bubble */}
            <div
              className="text-[10px] font-bold px-2 py-0.5 rounded-full transition-all duration-500"
              style={{
                background: tapped ? g.color : 'rgba(255,255,255,0.08)',
                color: tapped ? '#0D1117' : '#8B949E',
                transform: tapped ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(4px)',
                opacity: tapped ? 1 : 0.5,
              }}
            >
              {g.amount}
            </div>

            {/* Avatar circle */}
            <div
              className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-500"
              style={{
                borderColor: tapped ? g.color : 'rgba(255,255,255,0.15)',
                background: tapped ? `${g.color}22` : 'rgba(255,255,255,0.05)',
                color: tapped ? g.color : '#8B949E',
              }}
            >
              {tapped ? '✓' : g.name[0]}
            </div>

            {/* Tap line toward center */}
            {tapped && (
              <div
                className="absolute pointer-events-none"
                style={{
                  width: 2,
                  height: r * 0.45,
                  background: `linear-gradient(to ${y > 0 ? 'top' : 'bottom'}, transparent, ${g.color}40)`,
                  left: '50%',
                  top: y < 0 ? '100%' : 'auto',
                  bottom: y >= 0 ? '100%' : 'auto',
                  transform: 'translateX(-50%)',
                }}
              />
            )}
          </div>
        );
      })}

      {/* Phase label */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-1">
        <div
          className="text-[11px] font-semibold tracking-wide transition-all duration-500 text-center"
          style={{ color: phase === 'paying' ? '#C6FF3B' : '#8B949E' }}
        >
          {phase === 'paying' ? '✓ Bill paid' : paidCount === guests.length ? 'All guests paid' : `${paidCount}/${guests.length} tapped`}
        </div>
        {phase === 'collecting' && (
          <div className="text-[10px] text-[#8B949E]">Total: {total}</div>
        )}
      </div>

      {/* Tappy device in center */}
      <TappyTerminal
        size="md"
        state={terminalState}
        amount={phase === 'collecting' ? total : undefined}
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex items-center overflow-hidden bg-[#0D1117]" style={{ minHeight: '70vh' }}>
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/images/hero-bar.jpg')] bg-cover bg-center" style={{ backgroundPosition: '50% 20%' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] from-25% via-[#0D1117]/85 via-50% to-[#0D1117]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/70 via-transparent to-[#0D1117]/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 w-full">
        <div className="flex items-center justify-between gap-8">

          {/* Left — text */}
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight mb-5">
              <span className="text-white block">Tap. Pay.</span>
              <span className="text-[#C6FF3B] block">Done.</span>
            </h1>
            <p className="text-lg text-[#8B949E] mb-8 max-w-sm leading-relaxed">
              The all-in-one payment device<br />built for busy venues.
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                href="#"
                className="flex items-center gap-2 bg-[#C6FF3B] text-[#0D1117] font-semibold px-6 py-3 rounded-full hover:bg-[#d4ff5a] transition-colors"
              >
                Get your Tappy <span>→</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 border border-white/20 text-white font-semibold px-6 py-3 rounded-full hover:border-white/40 transition-colors"
              >
                Book a demo
              </Link>
            </div>

            {/* Trust bar */}
            <div className="flex flex-wrap gap-6 text-sm">
              {[
                { icon: '⚡', title: 'Fast payments', sub: 'Get paid in seconds' },
                { icon: '🛡', title: 'Reliable & secure', sub: 'Built for peace of mind' },
                { icon: '📊', title: 'Real-time insights', sub: 'See what matters' },
              ].map((t) => (
                <div key={t.title} className="flex items-center gap-2 text-[#8B949E]">
                  <span className="text-[#C6FF3B]">{t.icon}</span>
                  <div>
                    <div className="text-white font-medium">{t.title}</div>
                    <div className="text-xs">{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — animation (hidden on mobile) */}
          <div className="hidden md:flex flex-shrink-0 items-center justify-center">
            <HeroAnimation />
          </div>

        </div>
      </div>
    </section>
  );
}

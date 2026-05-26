'use client';
import { useEffect, useRef, useState } from 'react';
import TappyTerminal from './TappyTerminal';
import { useTranslation } from '@/lib/i18n/LanguageContext';

type Mode = 'pos' | 'standalone';

const benefitIcons = ['🎯', '⚡', '🪑', '💚', '🚫', '📊', '🔄', '🤝'];

// --- Flow A: Connected to POS ---

function FlowPOS({ step }: { step: number }) {
  const { t } = useTranslation();
  const orders = ['🍺 Beer', '🍔 Burger', '🍷 Wine', '🥗 Salad'];
  const guests = [
    { name: 'Anna', paid: '€8,50' },
    { name: 'Mike', paid: '€10,00' },
    { name: 'Sara', paid: '€7,50' },
    { name: 'Tom', paid: '€6,50' },
  ];
  const amounts = ['€8,50', '€18,50', '€32,50'];

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-3" style={{ zoom: 1.3 }}>
      {/* Step 1: Table with guests ordering */}
      <div className="flex flex-col items-center gap-3 flex-1">
        <StepBadge n={1} active={step >= 0} />
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            {guests.map((g, i) => (
              <div key={g.name} className="flex flex-col items-center gap-1">
                <div className={`w-9 h-9 rounded-full border-2 overflow-hidden transition-colors duration-500 ${step >= 0 ? 'border-white/20' : 'border-white/5'}`}>
                  {avatars[i]}
                </div>
                <span className="text-[9px] text-[#8B949E]">{g.name}</span>
              </div>
            ))}
          </div>
          {/* Orders bubbling up */}
          <div className="flex gap-1 flex-wrap justify-center">
            {orders.map((o, i) => (
              <span
                key={o}
                className="text-[10px] bg-[#1E242D] border border-white/10 px-1.5 py-0.5 rounded-full text-[#8B949E] transition-all duration-500"
                style={{ opacity: step >= 0 ? 1 : 0, transitionDelay: `${i * 0.1}s` }}
              >
                {o}
              </span>
            ))}
          </div>
        </div>
        <span className="text-[10px] text-[#8B949E] text-center">{t.howItWorks.pos.label1}</span>
      </div>

      <Arrow active={step >= 1} />

      {/* Step 2: POS + Tappy syncing */}
      <div className="flex flex-col items-center gap-3 flex-1">
        <StepBadge n={2} active={step >= 1} />
        <div className="flex items-end gap-3">
          {/* POS terminal */}
          <div className={`flex flex-col items-center gap-1 transition-opacity duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-30'}`}>
            <div className="w-12 h-14 bg-[#0D1117] border border-white/10 rounded-lg flex flex-col items-center justify-center gap-1">
              <div className="w-8 h-5 bg-[#1E242D] rounded-sm flex items-center justify-center">
                <span className="text-[8px] text-[#8B949E]">POS</span>
              </div>
              <div className="w-6 h-1 bg-white/10 rounded-full" />
            </div>
            <span className="text-[9px] text-[#8B949E]">POS</span>
          </div>

          {/* Sync arrow */}
          <div className={`flex flex-col items-center gap-1 transition-all duration-700 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-0.5">
              <div className="w-4 h-px bg-[#C6FF3B]" />
              <span className="text-[#C6FF3B] text-xs">⇄</span>
              <div className="w-4 h-px bg-[#C6FF3B]" />
            </div>
            {/* Amount ticking up */}
            <div className="flex flex-col items-center gap-0.5">
              {amounts.map((a, i) => (
                <span
                  key={a}
                  className="text-[10px] font-bold text-[#C6FF3B] transition-all duration-500"
                  style={{ opacity: step >= 1 && i === Math.min(step - 1, amounts.length - 1) ? 1 : 0, transitionDelay: `${i * 0.3}s` }}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Tappy device */}
          <TappyDevice step={step} targetStep={1} finalStep={2} amount="€32,50" />
        </div>
        <span className="text-[10px] text-[#8B949E] text-center">{t.howItWorks.pos.label2}</span>
      </div>

      <Arrow active={step >= 2} />

      {/* Step 3: Everyone pays their share */}
      <div className="flex flex-col items-center gap-3 flex-1">
        <StepBadge n={3} active={step >= 2} />
        <div className="flex gap-2">
          {guests.map((g, i) => (
            <div
              key={g.name}
              className="flex flex-col items-center gap-1 transition-all duration-500"
              style={{ opacity: step >= 2 ? 1 : 0.2, transitionDelay: `${i * 0.2}s` }}
            >
              <div className={`w-9 h-9 rounded-full border-2 overflow-hidden transition-all duration-500 ${step >= 2 ? 'border-[#C6FF3B]' : 'border-white/10'}`}
                style={{ transitionDelay: `${i * 0.2 + 0.3}s` }}>
                {step >= 2
                  ? <div className="w-full h-full bg-[#C6FF3B]/20 flex items-center justify-center text-sm font-bold text-[#C6FF3B]">✓</div>
                  : avatars[i]
                }
              </div>
              <span className={`text-[10px] font-bold transition-colors duration-500 ${step >= 2 ? 'text-[#C6FF3B]' : 'text-[#8B949E]'}`}
                style={{ transitionDelay: `${i * 0.2 + 0.2}s` }}>
                {g.paid}
              </span>
            </div>
          ))}
        </div>
        <span className="text-[10px] text-[#8B949E] text-center">{t.howItWorks.pos.label3}</span>
      </div>
    </div>
  );
}

// --- Flow B: Standalone ---

function FlowStandalone({ step }: { step: number }) {
  const { t } = useTranslation();
  const rounds = [
    { label: `${t.howItWorks.standalone.round} 1`, items: ['🍺', '🍺', '🥤', '🍺'], total: '€16,00' },
    { label: `${t.howItWorks.standalone.round} 2`, items: ['🍺', '🍷', '🍺', '🥤'], total: '€16,50' },
  ];
  const guests = [
    { name: 'Anna', paid: '€8,50' },
    { name: 'Mike', paid: '€10,00' },
    { name: 'Sara', paid: '€7,50' },
    { name: 'Tom', paid: '€6,50' },
  ];

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-3" style={{ zoom: 1.3 }}>
      {/* Step 1: rounds being ordered, paying per round */}
      <div className="flex flex-col items-center gap-3 flex-1">
        <StepBadge n={1} active={step >= 0} />
        <div className="flex flex-col gap-2">
          {rounds.map((r, ri) => (
            <div
              key={r.label}
              className="flex flex-col gap-1 transition-all duration-500"
              style={{ opacity: step >= 0 ? 1 : 0.2, transitionDelay: `${ri * 0.2}s` }}
            >
              <span className="text-[9px] text-[#8B949E] uppercase tracking-wide">{r.label}</span>
              <div className="flex items-center gap-1">
                {r.items.map((item, i) => (
                  <span key={i} className="text-base">{item}</span>
                ))}
                <span className="text-[10px] font-bold text-[#C6FF3B] ml-1">{r.total}</span>
              </div>
            </div>
          ))}
        </div>
        <span className="text-[10px] text-[#8B949E] text-center">{t.howItWorks.standalone.label1}</span>
      </div>

      <Arrow active={step >= 1} />

      {/* Step 2: Tappy on table, everyone pays their share per round */}
      <div className="flex flex-col items-center gap-3 flex-1">
        <StepBadge n={2} active={step >= 1} />
        <div className="flex flex-col items-center gap-3">
          <TappyDevice step={step} targetStep={1} finalStep={2} amount="€32,50" />
          <div className="flex gap-2">
            {guests.map((g, i) => (
              <div
                key={g.name}
                className="flex flex-col items-center gap-1 transition-all duration-500"
                style={{ opacity: step >= 1 ? 1 : 0.2, transitionDelay: `${i * 0.15}s` }}
              >
                <div className={`w-8 h-8 rounded-full border-2 overflow-hidden transition-all duration-500 ${step >= 2 ? 'border-[#C6FF3B]' : step >= 1 ? 'border-white/20' : 'border-white/5'}`}
                  style={{ transitionDelay: `${i * 0.15 + 0.2}s` }}>
                  {step >= 2
                    ? <div className="w-full h-full bg-[#C6FF3B]/20 flex items-center justify-center text-xs font-bold text-[#C6FF3B]">✓</div>
                    : avatars[i]
                  }
                </div>
                <span className={`text-[10px] font-bold transition-colors duration-500 ${step >= 1 ? 'text-[#C6FF3B]' : 'text-[#8B949E]'}`}>
                  {g.paid}
                </span>
              </div>
            ))}
          </div>
        </div>
        <span className="text-[10px] text-[#8B949E] text-center">{t.howItWorks.standalone.label2}</span>
      </div>

      <Arrow active={step >= 2} />

      {/* Step 3: Guest walks to cashier with Tappy */}
      <div className="flex flex-col items-center gap-3 flex-1">
        <StepBadge n={3} active={step >= 2} />
        <div
          className="flex flex-col items-center gap-3 transition-all duration-700"
          style={{ opacity: step >= 2 ? 1 : 0.15, transform: step >= 2 ? 'scale(1)' : 'scale(0.93)' }}
        >
          <div className="flex items-end gap-3">
            {/* Guest walking */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full border-2 border-[#C6FF3B] bg-[#C6FF3B]/10 flex items-center justify-center text-lg">
                🚶
              </div>
              <span className="text-[9px] text-[#8B949E]">{t.howItWorks.standalone.guest}</span>
            </div>
            {/* Arrow */}
            <div className="text-[#C6FF3B] text-sm mb-3">→</div>
            {/* Cashier */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-14 bg-[#0D1117] border-2 border-[#C6FF3B]/40 rounded-lg flex flex-col items-center justify-center gap-1">
                <div className="w-8 h-5 bg-[#1E242D] rounded-sm flex items-center justify-center">
                  <span className="text-[8px] text-[#C6FF3B]">€32,50</span>
                </div>
                <div className="w-6 h-1 bg-[#C6FF3B]/30 rounded-full" />
              </div>
              <span className="text-[9px] text-[#8B949E]">POS</span>
            </div>
          </div>
          <div className="bg-[#C6FF3B]/10 border border-[#C6FF3B]/30 rounded-xl px-4 py-2 text-center">
            <div className="text-[#C6FF3B] font-bold text-sm">💚 +€2.50 tip</div>
            <div className="text-[10px] text-[#8B949E]">{t.howItWorks.standalone.balanceLeft}</div>
          </div>
        </div>
        <span className="text-[10px] text-[#8B949E] text-center">{t.howItWorks.standalone.label3}</span>
      </div>
    </div>
  );
}

// --- Shared sub-components ---

function StepBadge({ n, active }: { n: number; active: boolean }) {
  return (
    <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors duration-300 ${active ? 'bg-[#C6FF3B] text-[#0D1117]' : 'bg-white/10 text-white'}`}>
      {n}
    </div>
  );
}

function TappyDevice({ step, targetStep, finalStep, amount }: { step: number; targetStep: number; finalStep: number; amount: string }) {
  const active = step >= targetStep;
  const done = step >= finalStep;
  const state = done ? 'paid' : active ? 'active' : 'idle';

  return (
    <div className="relative flex flex-col items-center">
      {active && !done && (
        <>
          <div className="absolute animate-ping pointer-events-none rounded-2xl border border-[#C6FF3B]/30"
            style={{ inset: -10, animationDuration: '2s' }} />
          <div className="absolute animate-ping pointer-events-none rounded-2xl border border-[#C6FF3B]/15"
            style={{ inset: -20, animationDuration: '2s', animationDelay: '0.7s' }} />
        </>
      )}
      <TappyTerminal size="sm" state={state} amount={amount} />
    </div>
  );
}

function Arrow({ active }: { active: boolean }) {
  return (
    <div className={`flex-shrink-0 transition-all duration-700 ${active ? 'opacity-100' : 'opacity-15'}`}>
      <div className="hidden md:flex items-center gap-1">
        <div className={`h-px w-8 transition-colors duration-700 ${active ? 'bg-[#C6FF3B]' : 'bg-white/20'}`} />
        <span className={`text-lg transition-colors duration-700 ${active ? 'text-[#C6FF3B]' : 'text-white/20'}`}>›</span>
      </div>
      <div className="md:hidden flex flex-col items-center">
        <div className={`w-px h-5 ${active ? 'bg-[#C6FF3B]' : 'bg-white/20'}`} />
        <span className={`text-sm ${active ? 'text-[#C6FF3B]' : 'text-white/20'}`}>∨</span>
      </div>
    </div>
  );
}

// --- Avatar SVGs ---

const avatars = [
  // Anna — vrouw, donker haar
  <svg key="anna" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#2a1f3d"/>
    <circle cx="20" cy="16" r="7" fill="#c8956c"/>
    <ellipse cx="20" cy="34" rx="10" ry="7" fill="#c8956c"/>
    <path d="M13 14 Q14 8 20 8 Q26 8 27 14 Q24 12 20 13 Q16 12 13 14Z" fill="#1a0a2e"/>
  </svg>,
  // Mike — man, licht haar
  <svg key="mike" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#1a2a3a"/>
    <circle cx="20" cy="16" r="7" fill="#e8b88a"/>
    <ellipse cx="20" cy="34" rx="10" ry="7" fill="#e8b88a"/>
    <path d="M13 15 Q13 8 20 8 Q27 8 27 15 Q25 11 20 12 Q15 11 13 15Z" fill="#d4a843"/>
  </svg>,
  // Sara — vrouw, rood haar
  <svg key="sara" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#2d1f1a"/>
    <circle cx="20" cy="16" r="7" fill="#d4956c"/>
    <ellipse cx="20" cy="34" rx="10" ry="7" fill="#d4956c"/>
    <path d="M12 14 Q13 7 20 7 Q28 7 28 14 Q26 10 20 11 Q14 10 12 14Z" fill="#8b2500"/>
    <path d="M12 14 Q11 18 13 20" stroke="#8b2500" strokeWidth="2" fill="none"/>
  </svg>,
  // Tom — man, donkere huid
  <svg key="tom" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#1a2d1a"/>
    <circle cx="20" cy="16" r="7" fill="#8b5e3c"/>
    <ellipse cx="20" cy="34" rx="10" ry="7" fill="#8b5e3c"/>
    <path d="M13 15 Q14 8 20 8 Q26 8 27 15 Q24 12 20 12 Q16 12 13 15Z" fill="#1a0a00"/>
  </svg>,
];



// --- Main component ---

export default function HowItWorks() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>('pos');
  const [step, setStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stepDescs = mode === 'pos' ? t.howItWorks.pos.steps : t.howItWorks.standalone.steps;

  function runFlow() {
    if (t1.current) clearTimeout(t1.current);
    if (t2.current) clearTimeout(t2.current);
    setStep(0);
    t1.current = setTimeout(() => setStep(1), 6000);
    t2.current = setTimeout(() => setStep(2), 12000);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) runFlow(); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      if (t1.current) clearTimeout(t1.current);
      if (t2.current) clearTimeout(t2.current);
    };
  }, [mode]);

  return (
    <section ref={sectionRef} className="py-24 bg-[#0D1117]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-4">{t.howItWorks.label}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {t.howItWorks.headline1}{' '}
            <span className="text-[#C6FF3B]">{t.howItWorks.headline2}</span> {t.howItWorks.headline3}
          </h2>

          {/* Mode toggle */}
          <div className="inline-flex bg-[#1E242D] rounded-full p-1 gap-1">
            {([['pos', t.howItWorks.modePos], ['standalone', t.howItWorks.modeStandalone]] as [Mode, string][]).map(([id, label]) => (
              <button
                key={id}
                onClick={() => { setMode(id); setTimeout(runFlow, 50); }}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${mode === id ? 'bg-[#C6FF3B] text-[#0D1117]' : 'text-[#8B949E] hover:text-white'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual flow */}
        <div className="bg-[#1E242D] rounded-3xl p-8 md:p-10 overflow-hidden relative">
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'radial-gradient(circle, #C6FF3B 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="relative">
            {mode === 'pos' ? <FlowPOS step={step} /> : <FlowStandalone step={step} />}
          </div>
        </div>

        {/* Replay — directly under animation */}
        <div className="flex justify-center mt-3 mb-6">
          <button onClick={runFlow} className="text-xs text-[#8B949E] hover:text-[#C6FF3B] transition-colors flex items-center gap-2">
            <span>↺</span> {t.howItWorks.replay}
          </button>
        </div>

        {/* Step descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {stepDescs.map((s, i) => (
            <div key={s.n} className={`p-6 rounded-2xl border transition-all duration-500 ${
              step === i ? 'bg-[#1E242D] border-[#C6FF3B]/40' :
              step > i  ? 'bg-[#1E242D]/50 border-white/5 opacity-70' :
                          'bg-[#1E242D]/20 border-white/5 opacity-40'
            }`}>
              <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center mb-3 transition-colors duration-300 ${step >= i ? 'bg-[#C6FF3B] text-[#0D1117]' : 'bg-white/10 text-white'}`}>
                {step > i ? '✓' : s.n}
              </div>
              <h3 className="text-white font-bold mb-1">{s.title}</h3>
              <p className="text-sm text-[#8B949E] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="border-t border-white/5 pt-16">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-4 text-center">{t.howItWorks.whyLabel}</p>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-10">
            {t.howItWorks.whyHeadline1}<br />
            <span className="text-[#C6FF3B]">{t.howItWorks.whyHeadline2}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {t.howItWorks.benefits.map((b, i) => (
              <div key={b.title} className="bg-[#1E242D] rounded-2xl p-6 border border-white/5 hover:border-[#C6FF3B]/20 transition-colors">
                <div className="text-2xl mb-3">{benefitIcons[i]}</div>
                <h4 className="text-white font-bold mb-2 text-sm">{b.title}</h4>
                <p className="text-xs text-[#8B949E] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

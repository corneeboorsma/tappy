import Link from 'next/link';
import Image from 'next/image';

const stack = [
  { label: 'Framework', value: 'Next.js 16.2.6', sub: 'App Router · TypeScript · React 19' },
  { label: 'Styling', value: 'Tailwind CSS v4', sub: 'Utility-first · Dark-mode native' },
  { label: 'Hosting', value: 'Firebase App Hosting', sub: 'Auto-deploy op push naar main' },
  { label: 'i18n', value: 'Custom React Context', sub: 'EN + NL · localStorage persistentie' },
  { label: 'Font', value: 'Satoshi', sub: '400 · 500 · 700' },
  { label: 'Pakketbeheer', value: 'npm', sub: 'Node.js runtime' },
];

const colors = [
  { name: 'Midnight Black', hex: '#0D1117', usage: 'Pagina-achtergrond · hoofd secties' },
  { name: 'Graphite', hex: '#1E242D', usage: 'Kaarten · panelen · modals' },
  { name: 'Electric Lime', hex: '#C6FF3B', usage: "Accentkleur · CTA's · highlights" },
  { name: 'Soft White', hex: '#F5F7FA', usage: 'Primaire tekst' },
  { name: 'Slate', hex: '#8B949E', usage: 'Secundaire tekst · labels' },
];

const pages = [
  {
    route: '/',
    name: 'Homepage',
    file: 'src/app/page.tsx',
    desc: 'De marketing landingspagina. Combineert alle secties in volgorde.',
    indexed: true,
    components: ['Navbar', 'Hero', 'Features', 'HowItWorks', 'Footer'],
  },
  {
    route: '/vergelijking',
    name: 'Concurrentieanalyse',
    file: 'src/app/vergelijking/page.tsx',
    desc: 'Interne vergelijking Tappy vs Mollie, Buckaroo en Adyen. Niet geïndexeerd.',
    indexed: false,
    components: ['Eigen layout (geen Navbar/Footer)'],
  },
  {
    route: '/architectuur',
    name: 'Architectuur',
    file: 'src/app/architectuur/page.tsx',
    desc: 'Deze pagina. Overzicht van componenten, structuur en design system.',
    indexed: false,
    components: ['Eigen layout'],
  },
];

const components = [
  {
    name: 'Navbar',
    file: 'src/components/Navbar.tsx',
    type: 'Layout',
    desc: 'Vaste navigatiebalk bovenaan. Logo, menu-links, EN/NL taalwisselaar en CTA-knop.',
    deps: ['LanguageContext', 'next/image', 'next/link'],
    props: [],
  },
  {
    name: 'Hero',
    file: 'src/components/Hero.tsx',
    type: 'Sectie',
    desc: 'Openingssectie met headline, CTA-knoppen, vertrouwensbadges en geanimeerde betaalvisualisatie (HeroAnimation).',
    deps: ['TappyTerminal', 'LanguageContext'],
    props: [],
  },
  {
    name: 'Features',
    file: 'src/components/Features.tsx',
    type: 'Sectie',
    desc: 'Drie feature-kaarten met foto bovenaan, icoon, titel en beschrijving.',
    deps: ['LanguageContext', 'next/image'],
    props: [],
  },
  {
    name: 'HowItWorks',
    file: 'src/components/HowItWorks.tsx',
    type: 'Sectie',
    desc: 'Interactieve stappenvisualisatie in twee modi: gekoppeld aan kassa (POS) of zelfstandig. Inclusief benefits-grid.',
    deps: ['TappyTerminal', 'LanguageContext'],
    props: [],
  },
  {
    name: 'TappyTerminal',
    file: 'src/components/TappyTerminal.tsx',
    type: 'UI-component',
    desc: 'SVG-gebaseerde 3D-isometrische weergave van het Tappy-device. Drie groottes en drie staten.',
    deps: ['next/image'],
    props: [
      { name: 'size', type: '"sm" | "md" | "lg"', desc: 'Formaat van het device' },
      { name: 'state', type: '"idle" | "active" | "paid"', desc: 'Weergavestatus' },
      { name: 'amount', type: 'string', desc: 'Bedrag op het scherm (bijv. €32,50)' },
    ],
  },
  {
    name: 'Footer',
    file: 'src/components/Footer.tsx',
    type: 'Layout',
    desc: 'Paginavoet met logo, linkkolommen, nieuwsbrief-inschrijving en copyright.',
    deps: ['LanguageContext', 'next/image', 'next/link'],
    props: [],
  },
  {
    name: 'SocialProof',
    file: 'src/components/SocialProof.tsx',
    type: 'Sectie',
    desc: 'Balk met herkende horeca-merken als sociale bewijslast.',
    deps: [],
    props: [],
  },
];

const i18nKeys = [
  { key: 'nav.*', usage: 'Navbar links & knoppen' },
  { key: 'hero.*', usage: 'Headline, sub, CTA, animatietekst, vertrouwensbadges' },
  { key: 'features.*', usage: 'Sectielabel, headline, kaartinhoud' },
  { key: 'howItWorks.*', usage: 'Stappen (POS + standalone), benefits, labels' },
  { key: 'terminal.*', usage: 'TappyTerminal schermteksten' },
  { key: 'footer.*', usage: 'Tagline, kolommen, nieuwsbrief, copyright' },
];

const typeColors: Record<string, string> = {
  'Layout': 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  'Sectie': 'bg-[#C6FF3B]/10 text-[#C6FF3B] border-[#C6FF3B]/30',
  'UI-component': 'bg-purple-500/15 text-purple-300 border-purple-500/30',
};

export default function ArchitectuurPage() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA]">

      {/* Header */}
      <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">
          <Image src="/images/tappy-logo-dark.png" alt="Tappy" width={80} height={23} />
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/vergelijking" className="text-xs text-[#8B949E] hover:text-white transition-colors">Concurrentieanalyse</Link>
          <span className="text-xs text-[#8B949E]">Interne documentatie — niet geïndexeerd</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Hero */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-4">Technische documentatie</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">Architectuur</h1>
          <p className="text-lg text-[#8B949E] max-w-2xl leading-relaxed">
            Overzicht van de paginastructuur, componenthiërarchie, i18n-systeem en design system van de Tappy-marketingwebsite.
          </p>
        </div>

        {/* Visual diagram */}
        <div className="bg-[#1E242D] rounded-3xl p-8 md:p-12 mb-16 border border-white/5 overflow-x-auto">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-8">Component tree</p>

          <div className="min-w-[640px]">
            {/* Root */}
            <div className="flex flex-col items-center gap-0">

              {/* RootLayout */}
              <div className="bg-[#0D1117] border border-[#C6FF3B]/40 rounded-2xl px-8 py-3 text-sm font-bold text-[#C6FF3B] w-72 text-center">
                RootLayout
                <div className="text-[10px] font-normal text-[#8B949E] mt-0.5">src/app/layout.tsx</div>
              </div>
              <div className="w-px h-6 bg-white/10" />

              {/* LanguageProvider */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl px-8 py-3 text-sm font-bold text-purple-300 w-72 text-center">
                LanguageProvider
                <div className="text-[10px] font-normal text-[#8B949E] mt-0.5">src/lib/i18n/LanguageContext.tsx</div>
              </div>
              <div className="w-px h-6 bg-white/10" />

              {/* Pages row */}
              <div className="flex gap-4 items-start">

                {/* Homepage branch */}
                <div className="flex flex-col items-center gap-0">
                  <div className="bg-[#0D1117] border border-white/10 rounded-2xl px-5 py-3 text-sm font-bold text-white w-56 text-center">
                    page.tsx
                    <div className="text-[10px] font-normal text-[#8B949E] mt-0.5">Route: /</div>
                  </div>
                  <div className="w-px h-6 bg-white/10" />
                  {/* Components column */}
                  <div className="flex flex-col gap-2 items-center">
                    {[
                      { name: 'Navbar', type: 'Layout' },
                      { name: 'Hero', type: 'Sectie' },
                      { name: 'Features', type: 'Sectie' },
                      { name: 'HowItWorks', type: 'Sectie' },
                      { name: 'Footer', type: 'Layout' },
                    ].map((c, i) => (
                      <div key={c.name} className="flex flex-col items-center gap-0">
                        {i > 0 && <div className="w-px h-2 bg-white/10" />}
                        <div className={`border rounded-xl px-4 py-2 text-xs font-semibold w-44 text-center ${typeColors[c.type]}`}>
                          {c.name}
                          {(c.name === 'Hero' || c.name === 'HowItWorks') && (
                            <div className="flex justify-center mt-1.5">
                              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg px-2 py-0.5 text-[9px] text-purple-300">
                                ↳ TappyTerminal
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px self-stretch bg-white/5 mx-2 mt-2" />

                {/* /vergelijking branch */}
                <div className="flex flex-col items-center gap-0 mt-0">
                  <div className="bg-[#0D1117] border border-white/10 rounded-2xl px-5 py-3 text-sm font-bold text-white w-56 text-center">
                    vergelijking/page.tsx
                    <div className="text-[10px] font-normal text-[#8B949E] mt-0.5">Route: /vergelijking</div>
                  </div>
                  <div className="w-px h-6 bg-white/10" />
                  <div className="bg-[#0D1117] border border-white/5 rounded-xl px-4 py-2 text-xs text-[#8B949E] w-44 text-center">
                    Standalone layout<br />
                    <span className="text-[10px]">noindex · geen Navbar</span>
                  </div>
                </div>

                {/* /architectuur branch */}
                <div className="flex flex-col items-center gap-0 mt-0">
                  <div className="bg-[#0D1117] border border-[#C6FF3B]/20 rounded-2xl px-5 py-3 text-sm font-bold text-[#C6FF3B]/70 w-56 text-center">
                    architectuur/page.tsx
                    <div className="text-[10px] font-normal text-[#8B949E] mt-0.5">Route: /architectuur</div>
                  </div>
                  <div className="w-px h-6 bg-white/10" />
                  <div className="bg-[#0D1117] border border-white/5 rounded-xl px-4 py-2 text-xs text-[#8B949E] w-44 text-center">
                    Standalone layout<br />
                    <span className="text-[10px]">noindex · huidige pagina</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-10 pt-8 border-t border-white/5">
            <span className="text-[10px] text-[#8B949E] uppercase tracking-wide self-center">Legenda:</span>
            {Object.entries(typeColors).map(([type, cls]) => (
              <span key={type} className={`text-xs font-semibold px-3 py-1 rounded-full border ${cls}`}>{type}</span>
            ))}
            <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-purple-500/15 text-purple-300 border-purple-500/30">Context / Provider</span>
          </div>
        </div>

        {/* Pages */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-6">Pagina's & routes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pages.map((p) => (
              <div key={p.route} className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <code className="text-[#C6FF3B] font-bold text-sm">{p.route}</code>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${p.indexed ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-white/5 text-[#8B949E] border-white/10'}`}>
                    {p.indexed ? 'geïndexeerd' : 'noindex'}
                  </span>
                </div>
                <div className="font-bold text-white mb-1">{p.name}</div>
                <div className="text-xs text-[#8B949E] mb-4 leading-relaxed">{p.desc}</div>
                <code className="text-[10px] text-white/30 block mb-3">{p.file}</code>
                <div className="flex flex-wrap gap-1.5">
                  {p.components.map((c) => (
                    <span key={c} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-[#8B949E]">{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Components */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-6">Componenten</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {components.map((c) => (
              <div key={c.name} className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">{c.name}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${typeColors[c.type]}`}>{c.type}</span>
                    </div>
                    <code className="text-[10px] text-white/30">{c.file}</code>
                  </div>
                </div>
                <p className="text-xs text-[#8B949E] leading-relaxed mb-4">{c.desc}</p>

                {c.props.length > 0 && (
                  <div className="mb-4">
                    <div className="text-[10px] uppercase tracking-wide text-white/30 mb-2">Props</div>
                    <div className="space-y-1.5">
                      {c.props.map((p) => (
                        <div key={p.name} className="flex items-start gap-2">
                          <code className="text-[10px] text-[#C6FF3B] shrink-0">{p.name}</code>
                          <code className="text-[10px] text-purple-300 shrink-0">{p.type}</code>
                          <span className="text-[10px] text-[#8B949E]">{p.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-[10px] uppercase tracking-wide text-white/30 mb-2">Afhankelijkheden</div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.deps.map((d) => (
                      <span key={d} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-[#8B949E]">{d}</span>
                    ))}
                    {c.deps.length === 0 && <span className="text-[10px] text-white/20">—</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* i18n */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-6">Internationalisatie (i18n)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
              <div className="font-bold text-white mb-1">Aanpak</div>
              <p className="text-xs text-[#8B949E] leading-relaxed mb-5">
                Eigen React Context — geen externe library. De <code className="text-purple-300">LanguageProvider</code> leest de voorkeur uit <code className="text-purple-300">localStorage</code> (sleutel: <code className="text-purple-300">tappy-locale</code>) en slaat wijzigingen op. Alle componenten gebruiken de <code className="text-purple-300">useTranslation()</code> hook — strings worden nooit direct in componenten hardgecodeerd.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {['en.ts', 'nl.ts'].map((f) => (
                  <div key={f} className="bg-[#0D1117] rounded-xl p-3 border border-white/5">
                    <code className="text-[#C6FF3B] text-xs font-bold">{f}</code>
                    <div className="text-[10px] text-[#8B949E] mt-1">src/lib/i18n/{f}</div>
                    <div className="text-[10px] text-[#8B949E] mt-0.5">~120 strings · volledig getypeerd</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
              <div className="font-bold text-white mb-3">Vertaalsleutels</div>
              <div className="space-y-2">
                {i18nKeys.map((k) => (
                  <div key={k.key} className="flex items-start gap-3">
                    <code className="text-[#C6FF3B] text-[11px] w-32 shrink-0">{k.key}</code>
                    <span className="text-[11px] text-[#8B949E]">{k.usage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-6">Tech stack</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stack.map((s) => (
              <div key={s.label} className="bg-[#1E242D] rounded-2xl p-5 border border-white/5">
                <div className="text-[10px] uppercase tracking-wide text-white/30 mb-1">{s.label}</div>
                <div className="font-bold text-white text-sm mb-0.5">{s.value}</div>
                <div className="text-[11px] text-[#8B949E]">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Design system */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-6">Design system</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Colors */}
            <div className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
              <div className="font-bold text-white mb-4">Kleurenpalet</div>
              <div className="space-y-3">
                {colors.map((c) => (
                  <div key={c.hex} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg border border-white/10 shrink-0" style={{ background: c.hex }} />
                    <div>
                      <div className="text-xs font-semibold text-white">{c.name}</div>
                      <div className="flex items-center gap-2">
                        <code className="text-[10px] text-[#8B949E]">{c.hex}</code>
                        <span className="text-[10px] text-white/30">·</span>
                        <span className="text-[10px] text-[#8B949E]">{c.usage}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* File structure */}
            <div className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
              <div className="font-bold text-white mb-4">Bestandsstructuur</div>
              <pre className="text-[11px] text-[#8B949E] leading-relaxed font-mono">{`src/
├── app/
│   ├── layout.tsx          ← root layout
│   ├── page.tsx            ← homepage /
│   ├── not-found.tsx       ← 404
│   ├── globals.css
│   ├── vergelijking/
│   │   ├── layout.tsx
│   │   └── page.tsx        ← /vergelijking
│   └── architectuur/
│       └── page.tsx        ← /architectuur
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── HowItWorks.tsx
│   ├── TappyTerminal.tsx
│   ├── Footer.tsx
│   └── SocialProof.tsx
└── lib/
    └── i18n/
        ├── LanguageContext.tsx
        ├── en.ts
        └── nl.ts`}</pre>
            </div>
          </div>
        </div>

        {/* Deployment */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-6">Deployment</p>
          <div className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '1', label: 'Lokale wijziging', desc: 'Code aangepast in VS Code of editor naar keuze' },
                { step: '2', label: 'Git push', desc: 'git push origin main → GitHub repository' },
                { step: '3', label: 'Firebase trigger', desc: 'Firebase App Hosting detecteert push op main automatisch' },
                { step: '4', label: 'Live', desc: 'Build & deploy volledig automatisch. Geen handmatige stappen.' },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 items-start">
                  <div className="w-7 h-7 rounded-full bg-[#C6FF3B] text-[#0D1117] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {s.step}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-1">{s.label}</div>
                    <div className="text-xs text-[#8B949E] leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap gap-6 text-xs text-[#8B949E]">
              <div><span className="text-white/40">GitHub</span> <span className="ml-2">github.com/corneeboorsma/tappy</span></div>
              <div><span className="text-white/40">Firebase project</span> <span className="ml-2">tappy-e9eed</span></div>
              <div><span className="text-white/40">Regio</span> <span className="ml-2">europe-west4</span></div>
              <div><span className="text-white/40">Live URL</span> <span className="ml-2">tappy--tappy-e9eed.europe-west4.hosted.app</span></div>
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div className="text-center py-8 border-t border-white/5">
          <div className="flex items-center justify-center gap-6">
            <Link href="/" className="text-sm text-[#8B949E] hover:text-white transition-colors">← Homepage</Link>
            <Link href="/vergelijking" className="text-sm text-[#8B949E] hover:text-white transition-colors">Concurrentieanalyse</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

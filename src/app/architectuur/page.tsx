import Link from 'next/link';
import Image from 'next/image';

const stack = [
  { label: 'Framework', value: 'Next.js 15.5.7', sub: 'App Router · TypeScript · React 19' },
  { label: 'Styling', value: 'Tailwind CSS v4', sub: 'Utility-first · Dark-mode native' },
  { label: 'Auth', value: 'Firebase Auth', sub: 'Email + wachtwoord · sessie-cookie' },
  { label: 'Database', value: 'Firestore', sub: 'NoSQL · multi-tenant datamodel' },
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

const marketingPages = [
  { route: '/', name: 'Homepage', file: 'src/app/page.tsx', desc: 'Marketing landingspagina. Combineert alle secties.', indexed: true, components: ['Navbar', 'Hero', 'Features', 'HowItWorks', 'Footer'] },
  { route: '/vergelijking', name: 'Concurrentieanalyse', file: 'src/app/vergelijking/page.tsx', desc: 'Tappy vs Mollie, Buckaroo en Adyen. Niet geïndexeerd.', indexed: false, components: ['Standalone layout'] },
  { route: '/architectuur', name: 'Architectuur', file: 'src/app/architectuur/page.tsx', desc: 'Deze pagina. Technische documentatie.', indexed: false, components: ['Standalone layout'] },
];

const portalPages = [
  { route: '/portal/login', name: 'Login', file: 'portal/login/page.tsx', desc: 'Email + wachtwoord login. Redirect op basis van rol.' },
  { route: '/portal/super', name: 'Klantenoverzicht', file: 'portal/super/page.tsx', desc: 'Alle klanten in DataTable. Sorteren, filteren, exporteren.' },
  { route: '/portal/super/klanten/nieuw', name: 'Klant aanmaken', file: 'portal/super/klanten/nieuw/page.tsx', desc: 'Formulier: bedrijfsgegevens, contact, pricing.' },
  { route: '/portal/super/klanten/[id]', name: 'Klant detail', file: 'portal/super/klanten/[id]/page.tsx', desc: 'Tabs: Gegevens · Terminals · Omzet · Login' },
  { route: '/portal/super/terminals', name: 'Tappy Terminals', file: 'portal/super/terminals/page.tsx', desc: 'Alle terminals. Aanmaken, xlsx-import, toewijzen aan klanten.' },
  { route: '/portal/dashboard', name: 'Admin dashboard', file: 'portal/dashboard/page.tsx', desc: 'Klant-eigen statistieken: actieve terminals, omzet.' },
  { route: '/portal/dashboard/terminals', name: 'Terminals', file: 'portal/dashboard/terminals/page.tsx', desc: 'Eigen terminals beheren: naam, bedrag, status.' },
  { route: '/portal/dashboard/transacties', name: 'Transacties', file: 'portal/dashboard/transacties/page.tsx', desc: 'Transactiehistorie per terminal.' },
  { route: '/portal/dashboard/kosten', name: 'Kosten', file: 'portal/dashboard/kosten/page.tsx', desc: 'Maandoverzicht: vast tarief + transactiekosten.' },
];


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
            Overzicht van de volledige Tappy-stack: marketingwebsite, multi-tenant admin portal, Firebase backend en deployment pipeline.
          </p>
        </div>

        {/* Full system diagram */}
        <div className="bg-[#1E242D] rounded-3xl p-8 md:p-12 mb-16 border border-white/5 overflow-x-auto">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-8">Systeemoverzicht</p>

          <div className="min-w-[900px] flex flex-col items-center gap-0">

            {/* Browser */}
            <div className="flex gap-24 items-end mb-0">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl px-6 py-3 text-xs font-bold text-blue-300 text-center w-44">
                Browser (gebruiker)
                <div className="text-[10px] font-normal text-[#8B949E] mt-0.5">HTTPS</div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl px-6 py-3 text-xs font-bold text-blue-300 text-center w-44">
                Browser (super-admin)
                <div className="text-[10px] font-normal text-[#8B949E] mt-0.5">HTTPS</div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl px-6 py-3 text-xs font-bold text-blue-300 text-center w-44">
                Browser (klant-admin)
                <div className="text-[10px] font-normal text-[#8B949E] mt-0.5">HTTPS</div>
              </div>
            </div>

            {/* Arrows down */}
            <div className="flex gap-24">
              <div className="w-px h-8 bg-white/10 mx-auto" style={{marginLeft:'calc(88px)'}} />
              <div className="w-px h-8 bg-white/10 mx-auto" />
              <div className="w-px h-8 bg-white/10 mx-auto" />
            </div>

            {/* Next.js layer */}
            <div className="bg-[#0D1117] border border-[#C6FF3B]/40 rounded-2xl px-10 py-4 text-sm font-bold text-[#C6FF3B] text-center w-full max-w-3xl">
              Next.js 15.5.7 — App Router
              <div className="text-[10px] font-normal text-[#8B949E] mt-0.5">Firebase App Hosting · europe-west4 · auto-deploy van main</div>
            </div>
            <div className="w-px h-6 bg-white/10" />

            {/* Middleware */}
            <div className="bg-[#0D1117] border border-orange-500/30 rounded-xl px-6 py-2.5 text-xs font-bold text-orange-300 text-center w-72">
              src/middleware.ts
              <div className="text-[10px] font-normal text-[#8B949E] mt-0.5">Bewaakt /portal/* · controleert tappy-session cookie</div>
            </div>
            <div className="w-px h-6 bg-white/10" />

            {/* Route groups */}
            <div className="flex gap-6 items-start w-full max-w-3xl">

              {/* Marketing */}
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-[#0D1117] border border-[#C6FF3B]/20 rounded-xl px-4 py-2.5 text-xs font-bold text-[#C6FF3B]/70 text-center w-full">
                  Marketing routes
                  <div className="text-[10px] font-normal text-[#8B949E] mt-0.5">/ · /vergelijking · /architectuur</div>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="bg-[#0D1117] border border-white/5 rounded-xl px-3 py-2 text-[10px] text-[#8B949E] text-center w-full">
                  LanguageProvider (EN/NL)<br/>Navbar · Footer · Secties
                </div>
              </div>

              {/* Portal */}
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-[#0D1117] border border-orange-500/30 rounded-xl px-4 py-2.5 text-xs font-bold text-orange-300 text-center w-full">
                  (portal) route group
                  <div className="text-[10px] font-normal text-[#8B949E] mt-0.5">AuthProvider · force-dynamic</div>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex gap-3 w-full">
                  <div className="flex-1 bg-[#0D1117] border border-white/5 rounded-xl px-3 py-2 text-[10px] text-[#8B949E] text-center">
                    /portal/super/*<br/><span className="text-orange-300">super_admin</span>
                  </div>
                  <div className="flex-1 bg-[#0D1117] border border-white/5 rounded-xl px-3 py-2 text-[10px] text-[#8B949E] text-center">
                    /portal/dashboard/*<br/><span className="text-orange-300">admin</span>
                  </div>
                </div>
              </div>

              {/* API */}
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-[#0D1117] border border-purple-500/30 rounded-xl px-4 py-2.5 text-xs font-bold text-purple-300 text-center w-full">
                  API routes
                  <div className="text-[10px] font-normal text-[#8B949E] mt-0.5">/api/portal/*</div>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="bg-[#0D1117] border border-white/5 rounded-xl px-3 py-2 text-[10px] text-[#8B949E] text-center w-full">
                  Firebase Admin SDK<br/>create-user · reset-password
                </div>
              </div>

            </div>

            <div className="w-px h-6 bg-white/10" />

            {/* Firebase layer */}
            <div className="flex gap-6 w-full max-w-3xl">
              <div className="flex-1 bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-3 text-xs text-orange-300 font-bold text-center">
                Firebase Auth
                <div className="text-[10px] font-normal text-[#8B949E] mt-0.5">Email + wachtwoord</div>
              </div>
              <div className="flex-1 bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-3 text-xs text-orange-300 font-bold text-center">
                Firestore
                <div className="text-[10px] font-normal text-[#8B949E] mt-0.5">/tenants · /users · /terminals</div>
              </div>
              <div className="flex-1 bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-3 text-xs text-orange-300 font-bold text-center">
                Firebase Admin SDK
                <div className="text-[10px] font-normal text-[#8B949E] mt-0.5">Server-side user management</div>
              </div>
            </div>

          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-10 pt-8 border-t border-white/5">
            <span className="text-[10px] text-[#8B949E] uppercase tracking-wide self-center">Legenda:</span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-[#C6FF3B]/10 text-[#C6FF3B] border-[#C6FF3B]/30">Next.js / Marketing</span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-orange-500/15 text-orange-300 border-orange-500/30">Portal / Firebase</span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-purple-500/15 text-purple-300 border-purple-500/30">API routes / Admin SDK</span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-blue-500/15 text-blue-300 border-blue-500/30">Client / Browser</span>
          </div>
        </div>

        {/* Firestore datamodel */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-6">Firestore datamodel</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                collection: '/tenants/{id}',
                color: 'border-[#C6FF3B]/20',
                fields: ['bedrijfsnaam, adres, kvk, iban', 'btwNummer', 'contactNaam, contactEmail, contactTelefoon', 'pricing: { vastPerTerminal, transactieTarief }', 'status: active | inactive', 'aangemaaktOp: Timestamp'],
                sub: ['/terminals/{id}', '/transactions/{id}'],
              },
              {
                collection: '/terminals/{id}',
                color: 'border-orange-500/20',
                fields: ['naam, serienummer, model', 'status: active | inactive', 'tenantId: string | null', 'tafelNummer, bedrag', 'aangemaaktOp: Timestamp'],
                sub: [],
              },
              {
                collection: '/users/{uid}',
                color: 'border-purple-500/20',
                fields: ['role: super_admin | admin', 'tenantId: string', 'email: string'],
                sub: [],
              },
            ].map((c) => (
              <div key={c.collection} className={`bg-[#1E242D] rounded-2xl p-6 border ${c.color}`}>
                <code className="text-[#C6FF3B] font-bold text-sm block mb-4">{c.collection}</code>
                <div className="space-y-1.5 mb-4">
                  {c.fields.map((f, i) => (
                    <div key={i} className="text-xs text-[#8B949E] font-mono">{f}</div>
                  ))}
                </div>
                {c.sub.length > 0 && (
                  <div className="border-t border-white/5 pt-3">
                    <div className="text-[10px] uppercase tracking-wide text-white/30 mb-2">Subcollecties</div>
                    {c.sub.map((s) => (
                      <code key={s} className="text-[10px] text-orange-300 block">{s}</code>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Auth flow */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-6">Authenticatie &amp; autorisatie</p>
          <div className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-sm font-bold text-white mb-3">Login flow</div>
                <div className="space-y-2">
                  {['1. signInWithEmailAndPassword (Firebase Auth)', '2. Rol ophalen uit /users/{uid}', '3. tappy-session cookie zetten', '4. Redirect: super → /portal/super, admin → /portal/dashboard'].map((s, i) => (
                    <div key={i} className="text-xs text-[#8B949E] leading-relaxed">{s}</div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-white mb-3">Route-beveiliging</div>
                <div className="space-y-2">
                  {['middleware.ts bewaakt alle /portal/* routes', 'Controleert tappy-session cookie (server-side)', 'Redirect naar /portal/login als niet aangemeld', 'Rol-checks in de pagina zelf via AuthContext'].map((s, i) => (
                    <div key={i} className="text-xs text-[#8B949E] leading-relaxed">{s}</div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-white mb-3">Rollen</div>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-bold text-orange-300">super_admin</span>
                    <div className="text-xs text-[#8B949E] mt-1">Volledige toegang: klanten, alle terminals, accounts aanmaken/resetten</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#C6FF3B]">admin</span>
                    <div className="text-xs text-[#8B949E] mt-1">Alleen eigen tenant: terminals, transacties, kosten</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marketing pages */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-6">Marketing pagina&apos;s</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketingPages.map((p) => (
              <div key={p.route} className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <code className="text-[#C6FF3B] font-bold text-sm">{p.route}</code>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${p.indexed ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-white/5 text-[#8B949E] border-white/10'}`}>
                    {p.indexed ? 'geïndexeerd' : 'noindex'}
                  </span>
                </div>
                <div className="font-bold text-white mb-1">{p.name}</div>
                <div className="text-xs text-[#8B949E] mb-3 leading-relaxed">{p.desc}</div>
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

        {/* Portal pages */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-6">Portal pagina&apos;s</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {portalPages.map((p) => (
              <div key={p.route} className="bg-[#1E242D] rounded-2xl p-6 border border-orange-500/10">
                <code className="text-orange-300 font-bold text-sm block mb-2">{p.route}</code>
                <div className="font-bold text-white mb-1 text-sm">{p.name}</div>
                <div className="text-xs text-[#8B949E] mb-3 leading-relaxed">{p.desc}</div>
                <code className="text-[10px] text-white/30">{p.file}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Portal components */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-6">Portal componenten</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'DataTable', file: 'src/components/portal/DataTable.tsx', desc: 'Herbruikbare tabel voor alle overzichtspagina\'s. Sorteren op kolomklik, per-kolom zoeken, kolommen aan/uitzetten, volgorde aanpassen, xlsx-export. Voorkeur opgeslagen in localStorage.', props: [{ name: 'id', type: 'string', desc: 'Unieke sleutel voor localStorage' }, { name: 'columns', type: 'Column[]', desc: 'Kolomdefinities met key, label, defaultVisible' }, { name: 'exportFilename', type: 'string?', desc: 'Activeert exportknop als meegegeven' }] },
              { name: 'Sidebar', file: 'src/components/portal/Sidebar.tsx', desc: 'Linkerzijbalk met navigatie afhankelijk van rol. Super-admin ziet Klanten + Tappy Terminals. Admin ziet Dashboard, Terminals, Transacties, Kosten.' },
              { name: 'PortalHeader', file: 'src/components/portal/PortalHeader.tsx', desc: 'Paginatitel + subtekst bovenaan elke portalpagina.' },
              { name: 'AuthContext', file: 'src/lib/portal/AuthContext.tsx', desc: 'React context met user, role, tenantId, loading en logout. Leest /users/{uid} uit Firestore direct na inloggen.' },
            ].map((c) => (
              <div key={c.name} className="bg-[#1E242D] rounded-2xl p-6 border border-orange-500/10">
                <div className="font-bold text-white mb-0.5">{c.name}</div>
                <code className="text-[10px] text-white/30 block mb-3">{c.file}</code>
                <p className="text-xs text-[#8B949E] leading-relaxed mb-3">{c.desc}</p>
                {'props' in c && c.props && (
                  <div className="space-y-1">
                    {c.props.map((p) => (
                      <div key={p.name} className="flex items-start gap-2">
                        <code className="text-[10px] text-[#C6FF3B] shrink-0">{p.name}</code>
                        <code className="text-[10px] text-purple-300 shrink-0">{p.type}</code>
                        <span className="text-[10px] text-[#8B949E]">{p.desc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* File structure */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-6">Bestandsstructuur</p>
          <div className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
            <pre className="text-[11px] text-[#8B949E] leading-relaxed font-mono overflow-x-auto">{`src/
├── app/
│   ├── layout.tsx                      ← root layout (LanguageProvider)
│   ├── page.tsx                        ← homepage /
│   ├── globals.css
│   ├── (portal)/                       ← route group, geen URL-segment
│   │   ├── layout.tsx                  ← AuthProvider · force-dynamic
│   │   └── portal/
│   │       ├── page.tsx                ← redirect → /portal/login
│   │       ├── login/
│   │       │   ├── layout.tsx
│   │       │   └── page.tsx
│   │       ├── super/
│   │       │   ├── layout.tsx          ← Sidebar (super_admin)
│   │       │   ├── page.tsx            ← klantenoverzicht
│   │       │   ├── klanten/
│   │       │   │   ├── nieuw/page.tsx
│   │       │   │   └── [id]/page.tsx   ← tabs: Gegevens·Terminals·Omzet·Login
│   │       │   └── terminals/
│   │       │       └── page.tsx        ← alle terminals + import/export
│   │       └── dashboard/
│   │           ├── layout.tsx          ← Sidebar (admin)
│   │           ├── page.tsx
│   │           ├── terminals/page.tsx
│   │           ├── transacties/page.tsx
│   │           └── kosten/page.tsx
│   ├── api/
│   │   └── portal/
│   │       ├── create-user/route.ts    ← Firebase Admin: gebruiker aanmaken
│   │       └── reset-password/route.ts ← Firebase Admin: wachtwoord resetten
│   ├── architectuur/page.tsx
│   └── vergelijking/page.tsx
├── components/
│   ├── Navbar.tsx · Hero.tsx · Features.tsx
│   ├── HowItWorks.tsx · TappyTerminal.tsx · Footer.tsx
│   └── portal/
│       ├── DataTable.tsx               ← sort · filter · export · column prefs
│       ├── Sidebar.tsx
│       └── PortalHeader.tsx
├── lib/
│   ├── i18n/
│   │   ├── LanguageContext.tsx
│   │   ├── en.ts · nl.ts
│   ├── firebase/
│   │   ├── client.ts                   ← Firebase client init (singleton)
│   │   ├── admin.ts                    ← Firebase Admin (applicationDefault)
│   │   └── firestore.ts                ← alle CRUD helpers + types
│   └── portal/
│       └── AuthContext.tsx
├── middleware.ts                       ← route-beveiliging /portal/*
└── scripts/
    ├── seed-tcdemors.mjs
    └── seed-terminals.mjs`}</pre>
          </div>
        </div>

        {/* Deployment pipeline */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-6">Deployment pipeline</p>

          {/* Visual pipeline */}
          <div className="bg-[#1E242D] rounded-2xl p-8 border border-white/5 mb-4">
            <div className="flex items-center gap-0 overflow-x-auto min-w-[600px]">
              {[
                { step: '1', label: 'git push', sub: 'origin main', color: 'bg-[#C6FF3B] text-[#0D1117]' },
                { step: '→', label: '', sub: '', color: 'bg-transparent text-[#8B949E] text-xl' },
                { step: '2', label: 'GitHub', sub: 'Repository trigger', color: 'bg-white/10 text-white' },
                { step: '→', label: '', sub: '', color: 'bg-transparent text-[#8B949E] text-xl' },
                { step: '3', label: 'Firebase Build', sub: 'npm install + next build', color: 'bg-orange-500/20 text-orange-300' },
                { step: '→', label: '', sub: '', color: 'bg-transparent text-[#8B949E] text-xl' },
                { step: '4', label: 'Deploy', sub: 'Cloud Run container', color: 'bg-orange-500/20 text-orange-300' },
                { step: '→', label: '', sub: '', color: 'bg-transparent text-[#8B949E] text-xl' },
                { step: '5', label: 'Live', sub: '~2 min na push', color: 'bg-green-500/20 text-green-400' },
              ].map((s, i) => (
                s.label === '' ? (
                  <div key={i} className="text-[#8B949E] text-2xl px-2">→</div>
                ) : (
                  <div key={i} className={`rounded-xl px-4 py-3 text-center shrink-0 border ${s.color.includes('bg-[#C6FF3B]') ? 'border-[#C6FF3B]/20' : s.color.includes('orange') ? 'border-orange-500/20' : s.color.includes('green') ? 'border-green-500/20' : 'border-white/10'}`}>
                    <div className={`text-lg font-black ${s.color.split(' ')[1]}`}>{s.step}</div>
                    <div className="text-xs font-bold text-white mt-0.5">{s.label}</div>
                    <div className="text-[10px] text-[#8B949E]">{s.sub}</div>
                  </div>
                )
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/5">
              <div>
                <div className="text-[10px] uppercase tracking-wide text-white/30 mb-1">GitHub repo</div>
                <div className="text-xs text-white">github.com/corneeboorsma/tappy</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wide text-white/30 mb-1">Firebase project</div>
                <div className="text-xs text-white">tappy-e9eed</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wide text-white/30 mb-1">Regio</div>
                <div className="text-xs text-white">europe-west4 (Nederland)</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wide text-white/30 mb-1">Live URL</div>
                <div className="text-xs text-white break-all">tappy--tappy-e9eed.europe-west4.hosted.app</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <div className="text-[10px] uppercase tracking-wide text-white/30 mb-3">Environment variabelen (apphosting.yaml — BUILD + RUNTIME)</div>
              <div className="flex flex-wrap gap-2">
                {['NEXT_PUBLIC_FIREBASE_API_KEY', 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 'NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', 'NEXT_PUBLIC_FIREBASE_APP_ID'].map((v) => (
                  <code key={v} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[#8B949E]">{v}</code>
                ))}
              </div>
              <div className="text-[10px] text-[#8B949E] mt-2">Firebase Admin SDK gebruikt <code className="text-purple-300">applicationDefault()</code> — werkt automatisch op Firebase App Hosting zonder extra credentials.</div>
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-6">Tech stack</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            <div className="bg-[#1E242D] rounded-2xl p-6 border border-white/5">
              <div className="font-bold text-white mb-4">i18n — vertaalsleutels</div>
              <p className="text-xs text-[#8B949E] leading-relaxed mb-4">
                Eigen React Context. <code className="text-purple-300">LanguageProvider</code> leest voorkeur uit <code className="text-purple-300">localStorage</code> (sleutel: <code className="text-purple-300">tappy-locale</code>). Alle marketing-componenten gebruiken <code className="text-purple-300">useTranslation()</code> — nooit strings hardcoderen.
              </p>
              <div className="space-y-2">
                {[
                  { key: 'nav.*', usage: 'Navbar links & knoppen' },
                  { key: 'hero.*', usage: 'Headline, sub, CTA, badges' },
                  { key: 'features.*', usage: 'Sectielabel, headline, kaarten' },
                  { key: 'howItWorks.*', usage: 'Stappen, benefits, labels' },
                  { key: 'footer.*', usage: 'Tagline, kolommen, copyright' },
                ].map((k) => (
                  <div key={k.key} className="flex items-start gap-3">
                    <code className="text-[#C6FF3B] text-[11px] w-28 shrink-0">{k.key}</code>
                    <span className="text-[11px] text-[#8B949E]">{k.usage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div className="text-center py-8 border-t border-white/5">
          <div className="flex items-center justify-center gap-6">
            <Link href="/" className="text-sm text-[#8B949E] hover:text-white transition-colors">← Homepage</Link>
            <Link href="/vergelijking" className="text-sm text-[#8B949E] hover:text-white transition-colors">Concurrentieanalyse</Link>
            <Link href="/portal/login" className="text-sm text-[#8B949E] hover:text-white transition-colors">Portal →</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

# Architecture

## Folder Structure
```
src/
├── app/
│   ├── (marketing)/          ← publieke website pagina's
│   │   └── page.tsx          ← homepage (indien uitgesplitst)
│   ├── (portal)/             ← admin portal (protected routes)
│   │   ├── dashboard/
│   │   ├── devices/
│   │   └── venues/
│   ├── layout.tsx            ← root layout (wraps LanguageProvider)
│   ├── page.tsx              ← homepage
│   ├── not-found.tsx         ← 404 pagina
│   └── globals.css
├── components/               ← herbruikbare UI componenten
│   ├── Navbar.tsx            ← logo (PNG), nav links, EN/NL toggle, Login, Get started
│   ├── Hero.tsx              ← hero foto + tekst links + HeroAnimation rechts
│   ├── Features.tsx          ← 3 feature cards met echte foto's
│   ├── HowItWorks.tsx        ← geanimeerde flow (POS + Standalone), benefits grid
│   ├── TappyTerminal.tsx     ← SVG device component (idle/active/paid states)
│   ├── Footer.tsx            ← kolommen, email signup, logo, copyright
│   └── SocialProof.tsx       ← niet gebruikt op homepage
└── lib/
    ├── firebase.ts           ← Firebase initialisatie
    └── i18n/
        ├── en.ts             ← Engelse vertaalstrings (type-definitie)
        ├── nl.ts             ← Nederlandse vertaalstrings
        └── LanguageContext.tsx ← LanguageProvider + useTranslation hook
public/
└── images/
    ├── hero-bar.jpg              ← top-panel van marble bar collage (hero achtergrond)
    ├── tappy-device.png          ← device render donkere achtergrond
    ├── tappy-device-workflow.png ← device PNG transparante achtergrond
    ├── tappy-logo-dark.png       ← wit wordmark + lime waves, transparant
    ├── feature-payments.jpg      ← card tapping Tappy
    ├── feature-insights.jpg      ← dashboard op telefoon
    └── feature-teams.jpg         ← barman met Tappy op bar
assets/
└── logo/
    ├── tappy-logo-dark.png
    └── tappy-logo-light.png
```

## Naming Conventions
- Components: PascalCase (`Navbar.tsx`)
- Pages: `page.tsx` per route segment
- Utilities: camelCase (`firebase.ts`)

## Route Groups
- `(marketing)` — geen auth vereist, publiek
- `(portal)` — Firebase Auth vereist, admin gebruik

## i18n Pattern
Alle componenten gebruiken `useTranslation()`:
```tsx
const { t, locale, setLocale } = useTranslation();
// t.nav.login, t.hero.cta1, t.features.items[0].title, etc.
```
Strings nooit hardcoden in componenten — altijd via `t.*`.

## Environment Variables
Sla op in `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

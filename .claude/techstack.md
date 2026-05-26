# Tech Stack

## Frontend
- Next.js 16.2.6 (App Router, TypeScript)
- Tailwind CSS v4
- Satoshi font (via fontshare CDN)

## Backend / Database
- Firebase (Firestore)
- Firebase Authentication

## Storage
- Firebase Storage

## Hosting
- Firebase App Hosting (Blaze plan)
- Project ID: `tappy-e9eed`
- Live URL: https://tappy--tappy-e9eed.europe-west4.hosted.app/
- GitHub repo: https://github.com/corneeboorsma/tappy
- Auto-deploy: elke push naar `main` triggert een nieuwe build

## i18n
- Custom React context — geen externe library
- Bestanden: `src/lib/i18n/en.ts`, `src/lib/i18n/nl.ts`, `src/lib/i18n/LanguageContext.tsx`
- `useTranslation()` hook geeft `{ t, locale, setLocale }` terug
- Taalvoorkeur opgeslagen in `localStorage` (key: `tappy-locale`)
- Toggle rechtsboven in de Navbar (EN | NL)

## Project Structure
```
src/
├── app/
│   ├── (marketing)/     ← publieke website
│   ├── (portal)/        ← admin portal (protected)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   └── globals.css
├── components/          ← gedeelde UI componenten
└── lib/
    ├── firebase.ts      ← Firebase initialisatie
    └── i18n/            ← vertaalbestanden + context
        ├── en.ts
        ├── nl.ts
        └── LanguageContext.tsx
public/
└── images/              ← device foto's, hero backgrounds, logo's
assets/
└── logo/                ← tappy-logo-dark.png, tappy-logo-light.png
```

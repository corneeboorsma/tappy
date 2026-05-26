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
│   ├── layout.tsx            ← root layout
│   ├── page.tsx              ← homepage
│   └── globals.css
├── components/               ← herbruikbare UI componenten
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── SocialProof.tsx
│   ├── Features.tsx
│   ├── HowItWorks.tsx
│   └── Footer.tsx
└── lib/
    └── firebase.ts           ← Firebase initialisatie
public/
└── images/                   ← hero-bar.jpg, tappy-device.png
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

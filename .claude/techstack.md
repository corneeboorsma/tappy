# Tech Stack

## Frontend
- Next.js 15 (App Router, TypeScript)
- Tailwind CSS v4
- Satoshi font (via fontshare CDN)

## Backend / Database
- Firebase (Firestore)
- Firebase Authentication

## Storage
- Firebase Storage

## Hosting
- Firebase App Hosting

## Project Structure
```
src/
├── app/
│   ├── (marketing)/     ← publieke website
│   ├── (portal)/        ← admin portal (protected)
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/          ← gedeelde UI componenten
└── lib/                 ← firebase config, helpers
public/
└── images/              ← device foto's, hero backgrounds
assets/
└── logo/                ← tappy-logo-dark.png, tappy-logo-light.png
```

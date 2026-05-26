# Components

## Marketing Site
| Component | Beschrijving |
|---|---|
| `Navbar` | Fixed top nav, logo (PNG), links, EN/NL taalwisselaar, Login + Get started CTA |
| `Hero` | 70vh hero met achtergrond foto, tekst links, `HeroAnimation` rechts (verborgen op mobiel) |
| `Features` | 3 feature cards met echte foto's bovenaan — payments, insights, teams |
| `HowItWorks` | Geanimeerde flow (POS + Standalone), stap-omschrijvingen, benefits grid (8 items) |
| `TappyTerminal` | SVG device component — pillow-shaped cube plat op tafel, scherm naar boven |
| `Footer` | Kolommen, email signup, logo (PNG), copyright |
| `SocialProof` | Aangemaakt maar niet actief op homepage |

## TappyTerminal Props
```tsx
<TappyTerminal
  size="sm" | "md" | "lg"   // sm=64px, md=100px, lg=160px base
  state="idle" | "active" | "paid"
  amount="€32,50"           // optioneel, getoond op scherm
/>
```
States: idle = scherm grijs/klaar, active = pulse rings + LED aan, paid = groen scherm + ✓

## HeroAnimation
Rechts in de hero — 4 gasten betalen elk hun deel (€8,50 / €10,00 / €7,50 / €6,50 = €32,50 totaal), dan fase 2: Tappy toont "Paid!". Loopt in een lus van 4s + 4s.

## i18n
Elk component gebruikt `useTranslation()`:
```tsx
const { t } = useTranslation();
// gebruik t.nav.login, t.hero.cta1, etc.
```
Nooit tekst hardcoden — altijd via de vertaalbestanden in `src/lib/i18n/`.

## Logo
Altijd `<Image src="/images/tappy-logo-dark.png" />` gebruiken — nooit tekst `tappy))`.
- Navbar: width=96, height=27
- Footer: width=80, height=23
- TappyTerminal front face: geschaald op basis van `base`

## Design Tokens (Tailwind klassen)
```
bg-[#0D1117]    ← Midnight Black (achtergrond)
bg-[#1E242D]    ← Graphite (cards, panels)
text-[#F5F7FA]  ← Soft White (primaire tekst)
text-[#8B949E]  ← Slate Gray (secundaire tekst)
text-[#C6FF3B]  ← Electric Lime (accents, CTAs)
bg-[#C6FF3B]    ← Electric Lime (primary button)
```

## Button Patterns
```tsx
// Primary
<button className="bg-[#C6FF3B] text-[#0D1117] font-semibold px-6 py-3 rounded-full hover:bg-[#d4ff5a]">
  Label →
</button>

// Secondary / outline
<button className="border border-white/20 text-white font-semibold px-6 py-3 rounded-full hover:border-white/40">
  Label
</button>
```

## Section Label Pattern
```tsx
<p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-4">
  Section Title
</p>
```

## Card Pattern
```tsx
<div className="bg-[#1E242D] rounded-2xl p-6">
  {/* icon, title, description */}
</div>
```

## Portal Components

### DataTable (src/components/portal/DataTable.tsx)
Herbruikbare tabel voor alle overzichtspagina's in het portal. Verplicht te gebruiken voor elke tabel met meer dan 2 kolommen.

**Features:**
- Zoeken per kolom (filter input per kolom-header)
- Kolommen aan/uitzetten via een kolommenkiezer (⚙ knop)
- Kolomvolgorde aanpassen via omhoog/omlaag knoppen in de kolommenkiezer
- Voorkeur wordt opgeslagen in `localStorage` per tabel-ID

**Gebruik:**
```tsx
<DataTable
  id="klanten"              // unieke sleutel voor localStorage
  columns={[
    { key: 'bedrijfsnaam', label: 'Bedrijf', defaultVisible: true },
    { key: 'plaats', label: 'Plaats', defaultVisible: true },
    { key: 'contactNaam', label: 'Contact', defaultVisible: true },
    { key: 'kvk', label: 'KVK', defaultVisible: false },
    { key: 'status', label: 'Status', defaultVisible: true },
  ]}
  rows={tenants}
  renderCell={(row, key) => { /* custom render per kolom */ }}
  actions={(row) => <Link href={...}>Beheren →</Link>}
/>
```

**Regels:**
- Elke nieuwe tabel in het portal gebruikt DataTable
- `id` prop is verplicht en uniek per pagina (voor localStorage)
- Standaard zichtbare kolommen via `defaultVisible: true`
- Zoekfilter werkt op de string-waarde van `renderCell` output


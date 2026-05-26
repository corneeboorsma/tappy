# Components

## Marketing Site
| Component | Beschrijving |
|---|---|
| `Navbar` | Fixed top nav, logo, links, Login + Get started CTA |
| `Hero` | Fullscreen hero met headline, CTAs, trust bar, device foto |
| `SocialProof` | Partner logo's balk (Heineken, Feyenoord, etc.) |
| `Features` | 3 feature cards — payments, insights, teams |
| `HowItWorks` | 3-stappen uitleg — Tap, Pay, Done |
| `Footer` | Links kolommen + email signup + copyright |

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
_To be defined — device registratie, venue beheer, dashboard._

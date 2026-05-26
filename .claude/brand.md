# Tappy — Brand & UI System

## Project Overview
Tappy is a hospitality fintech company providing fast, frictionless tap-to-pay technology for bars, cafés, restaurants, sports canteens, festivals, and high-volume venues.

**Tagline:** Tap. Pay. Done.
**Positioning:** Hospitality infrastructure — not a bank, not enterprise software.

---

## Brand Personality

Tappy is: fast, confident, modern, friendly, operational, human, reliable.

Tappy is NOT: corporate banking, cold enterprise software, buzzword-heavy startup, crypto branding.

---

## Color System

| Name | HEX | Usage |
|---|---|---|
| Midnight Black | `#0D1117` | backgrounds, dark UI, devices |
| Soft White | `#F5F7FA` | typography, light surfaces, contrast |
| Electric Lime | `#C6FF3B` | CTAs, active states, success, highlights, "Done." accent |
| Graphite | `#1E242D` | UI panels, cards, dividers |
| Slate Gray | `#8B949E` | secondary text, inactive states, metadata |

**Electric Lime is the hero accent.** Use it on the most important word in a headline (e.g. "Done." or "More revenue"), on primary CTA buttons, on checkmarks, and on device LED indicators.

---

## Typography

**Preferred font:** Satoshi
**Fallbacks:** General Sans → Inter → Manrope → SF Pro Rounded

### Rules
- Headings: lowercase preferred, tight tracking, bold weight
- Body: medium weight, clear line-height, operational readability
- Never use all-caps for body text
- Headline style: mix white + Electric Lime to highlight the key word

### Scale (reference)
- Hero headline: 56–80px, bold
- Section headline: 32–48px, bold
- Subheadline / label: 12–14px uppercase tracking, Electric Lime color
- Body: 16–18px, Slate Gray or Soft White
- Button: 15–16px, medium-bold

---

## Logo

### Assets
| File | Usage |
|---|---|
| `assets/logo/tappy-logo-dark.png` | Default — white wordmark + Electric Lime waves on Midnight Black background |
| `assets/logo/tappy-logo-light.png` | Light contexts — light wordmark + yellow-green waves on white background |

### Construction
- Lowercase wordmark: `tappy`
- Followed by contactless NFC wave symbol `))` in Electric Lime
- The waves are 3 arcs, increasing in size, rendered in Electric Lime (`#C6FF3B`)
- Wordmark is white (`#F5F7FA`) on dark backgrounds, near-white/light on light backgrounds
- Font style: rounded, bold, modern sans-serif

### Usage Rules
- Use dark variant by default (dark-mode native product)
- Use light variant only on white/very light backgrounds
- Never stretch, rotate, add shadows, or alter spacing
- Never recolor the waves to anything other than Electric Lime
- Minimum digital size: 24px height
- Clear space: equal to height of the "t" on all sides

---

## UI Design Principles

### Core Philosophy
Hospitality staff should understand the interface **instantly**. Design for speed, not cleverness.

### Layout Rules
- Dark mode native (Midnight Black base)
- One primary action per screen
- Generous spacing, minimal clutter
- Large touch targets (min 44px)
- High contrast throughout
- Operational clarity over decoration

### Buttons
- Primary: Electric Lime background + Midnight Black text, rounded corners, arrow icon
- Secondary/outline: dark background + white border + white text, rounded corners
- Always large tap areas, clear hover/active states

### Section Labels
Small uppercase Electric Lime label above section headlines (e.g. `BUILT FOR HOSPITALITY`, `TAPPY TERMINAL`)

### Cards / Feature Blocks
- Background: Graphite `#1E242D`
- Rounded corners (12–16px)
- Icon in Electric Lime circle or outlined style
- Headline white, body Slate Gray

### Checkmarks / Confirmation States
Use Electric Lime filled circle with dark checkmark icon.

---

## Motion & Animation

- Fast, lightweight, fluid — interactions feel immediate
- Micro-interactions: yes
- Slow or decorative animations: no
- Transitions: short duration (150–250ms), ease-out

---

## Product Context

Tappy is a **physical payment device that sits flat on the table**. It is not a handheld terminal, not a wall-mounted device, not a mobile app.

### Device Design (definitive — reference: `assets/device-reference-v2.png`)

**Form factor**
- Compact pillow-shaped cube, wider than tall
- Extremely large corner radius — almost a rounded square pebble
- Lies flat on table surface, screen facing up toward guests
- No stand, no cables visible — just sits on the table

**Body**
- Matte soft-touch black housing
- Slightly domed/convex top surface
- `tappy))` wordmark embossed/etched on the front face (vertical side facing guests)
- Electric Lime LED strip on the front face, below the wordmark — glows when active

**Screen**
- Square e-ink style display on the top face (facing up)
- Light gray/white background, high contrast black text
- Shows: NFC contactless hand icon at top, large amount in center, "Tap. Pay. Done." tagline below
- Screen is inset/recessed into the body with a dark bezel border

**When rendering in UI:**
- Show device from a slight top-down angle (as if looking at it on a table)
- Always show the screen facing the viewer
- Show `tappy))` logo on the front face (lower edge)
- Show Electric Lime LED glowing on the front face
- Table shadow beneath the device

---

## Page Structure (Homepage Reference)

Reference mockup: `assets/mockup-homepage-v2.png`

### Navbar
- Logo left, nav links center, `Login` text right, `Get started` Electric Lime button right
- Dark background, minimal

### Hero Section
- Full-width dark background with real bar/venue photography (warm bokeh lights)
- Headline: very large bold, white — "Tap. Pay." on line 1, "Done." on line 2 in Electric Lime
- Subheadline: "The all-in-one payment device built for busy venues."
- Primary CTA: `Get your Tappy →` (Electric Lime), Secondary CTA: `Book a demo` (outline)
- Trust bar below CTAs: 3 icon + label items (Fast payments / Reliable & secure / Real-time insights)
- Device product shot right-aligned — device standing on its base on a bar surface

### Social Proof Bar
- Bordered card, dark background
- "Trusted by venues across the country" + logos: Heineken, O'Learys, De Bierfabriek, Feyenoord Rotterdam, Bavaria
- Muted/white logo treatment

### Features Section (`BUILT FOR HOSPITALITY`)
- Label: `BUILT FOR HOSPITALITY` in Electric Lime uppercase small
- Left: bold headline "More time for your guests. / More revenue for your business." (Electric Lime on "More revenue")
- Right: short description paragraph
- Below: 3 feature cards in equal-width grid
  - "All payments. One solution." — cards, phones, wearables
  - "Real-time insights." — track sales, tips, performance
  - "Built for busy teams." — easy to use, quick to learn
- Each card: Electric Lime circle icon, headline, description, photo at bottom

### How It Works Section (`HOW IT WORKS`)
- Label: `HOW IT WORKS` in Electric Lime uppercase small
- Left: headline "Simple for you. Effortless for your team." (Electric Lime on "Effortless")
- Right: 3 numbered steps side by side
  1. **Tap** — Customer taps card or device
  2. **Pay** — Payment is approved in seconds
  3. **Done** — Receipt sent. Everyone happy.
- Each step: Electric Lime numbered circle, bold title, short description, device illustration

### Footer
- Dark background
- Columns: Product / Solutions / Company / Support / Stay updated (email input + arrow button)
- Logo + tagline + social icons bottom left
- Copyright + legal links bottom right

---

## Tone of Voice

Short. Direct. Confident. Human.

**Good:**
- "Tap. Pay. Done."
- "Built for busy venues."
- "Payments that move."
- "Get paid instantly."
- "More time for your guests. More revenue for your business."

**Avoid:**
- "Leveraging innovative financial infrastructure."
- "Next-generation payment orchestration."
- "Enterprise-grade transaction enablement."

---

## Creative Reference

Visual direction: **"Apple meets hospitality fintech."**

References:
- Stripe (simplicity, trust)
- Linear (polish, dark UI)
- Modern nightlife energy
- Premium hardware product design

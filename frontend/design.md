# Marketing Design System (Applied)

## Core Direction
- Dark-only marketing surface (`#000000` canvas) with charcoal elevation layers.
- Monochrome chrome with compact 8px CTA corners (developer-tool tone, not rounded pills).
- Tight display hierarchy + relaxed body copy rhythm.
- Product/accent identity colors used sparingly on chips/cards.

## Tokens

### Colors
- `canvas`: `#000000`
- `surface-1`: `#12151c`
- `surface-2`: `#1a1f29`
- `hairline`: `rgba(178,182,189,0.1)`
- `hairline-soft`: `rgba(178,182,189,0.06)`
- `ink`: `#ffffff`
- `ink-muted`: `#b2b6bd`
- `ink-subtle`: `#656a76`
- `accent-link`: `#2f81f7`
- `accent-terraform`: `#844fba`
- `accent-vault`: `#ffec6e`
- `accent-waypoint`: `#56d4dd`

### Typography
- Display: 700 weight, tight line-height (~1.18), negative tracking.
- Body: 500 weight, 1.5+ line-height.
- Eyebrow: 12px uppercase, +0.6 tracking.

### Radius
- CTA/input default: `8px`
- Card radius: `12px`
- Large panel radius: `24px`

## Component Rules
- Nav/footer remain on canvas with subtle hairline separators.
- Cards elevate through surface steps and borders, not shadows.
- Primary CTA: white background, dark text, 8px radius.
- Secondary CTA: `surface-2` with hairline border.
- Inputs keep same surface and gain blue focus outline.

## Mastery Academy Landing Page

A dark, editorial-feel Arabic (RTL) landing page with warm gold accents, replacing the placeholder home. Single long landing page on `/` with all 10 sections from the brief, using the existing TanStack Start + Tailwind v4 stack (no React Router or new framework added).

### Design system (`src/styles.css`)
Add custom properties matching the brief:
- `--bg-primary` #0A0A0F, `--bg-secondary` #111118, `--bg-tertiary` #1A1A25
- `--accent-gold` #D4A853, `--accent-gold-lt` #F0C97A, `--accent-red` #E8334A
- `--text-primary` #F5F0E8, `--text-secondary` #9A95A0, `--text-muted` #5A5660
- gold-tinted border + ambient glow
- Register tokens in `@theme inline` (e.g. `--color-bg-primary`, `--color-accent-gold`) so Tailwind utilities like `bg-bg-primary`, `text-accent-gold` work
- Force dark theme: set `:root` variables to dark values (no light/dark toggle for this brand)
- Load Cairo (400/600/700/800) + DM Serif Display via `@import url(...)` at the top of styles.css; set `body { font-family: Cairo; }` and a `.font-display` utility for DM Serif Display
- Subtle SVG noise overlay utility class + radial gold glow utility
- Gold gradient utility per brief

### Routing & shell
- Update `src/routes/__root.tsx` head: title "ماستري اكاديمي — تعلم ما يغير عالمك", Arabic meta description, set `<html lang="ar" dir="rtl">` in `RootShell`
- Replace `src/routes/index.tsx` placeholder with the full landing page composition

### Components (`src/components/landing/`)
Split for maintainability — all rendered in order from `index.tsx`:
1. `Navbar.tsx` — fixed, blurred, gold bottom border, RTL nav, login + subscribe buttons, mobile hamburger (Sheet)
2. `Hero.tsx` — split layout, large H1 "ماستري / اكاديمي", tagline, two CTAs, ambient gold glow, grayscale instructor placeholder with `clip-path` diagonal, floating blurred orbs, social proof strip with count-up
3. `StatsTicker.tsx` — marquee of stats between hero & courses
4. `Courses.tsx` — 4-card grid (horizontal snap on mobile) with vivid colored banners, circular instructor placeholders, gold hover glow
5. `Diplomas.tsx` — 3 cards with gold top accent bar and price treatment
6. `Bundles.tsx` — 3-col cards with gradient borders, original/discounted price
7. `Features.tsx` — collage of 4 rotated placeholder mockups + checklist with gold checks, centered CTA
8. `Testimonials.tsx` — auto-scrolling marquee of quote cards with gold quote marks + 5-star rating
9. `JoinTrainerCTA.tsx` — full-width dramatic gradient section
10. `FAQ.tsx` — accordion (shadcn Accordion) with gold +/- icons
11. `Footer.tsx` — 4-column dark footer with quick links, payment/app placeholders, social icons (lucide)

### Animations
- Use `framer-motion` (install via `bun add framer-motion`) for staggered fade-up on hero, features list, and section reveals (`whileInView`)
- Count-up: lightweight inline `useEffect` + `requestAnimationFrame` (no extra dep)
- Marquees: pure CSS `@keyframes` in styles.css

### Content
- All copy in Arabic exactly as specified in the brief
- Hardcoded course/diploma/bundle/testimonial/FAQ data inside their components
- Instructor & mockup imagery: dark `bg-bg-tertiary` placeholders with shimmer (no external images, per brief rule #5). No image generation needed.

### Accessibility & responsiveness
- `aria-label`s in Arabic on icon-only buttons
- Mobile: stacked hero, horizontal-snap card rows, hamburger nav
- Tablet: 2-col grids
- Desktop: full layout

### Out of scope
- No backend / Cloud (static landing page)
- No real auth — buttons are presentational
- No image generation; use styled placeholder blocks
- No new routes beyond `/` (single landing page; brand subpages can come later)

### Files touched
- `src/styles.css` (tokens, fonts, utilities)
- `src/routes/__root.tsx` (lang/dir, meta)
- `src/routes/index.tsx` (compose landing)
- `src/components/landing/*` (new section components)
- `package.json` (+ framer-motion)

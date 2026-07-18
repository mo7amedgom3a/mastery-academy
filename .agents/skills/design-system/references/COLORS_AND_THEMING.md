# Colors & Theming Reference

This document details the color tokens, palettes, and typography specifications for the Mastery Academy dashboard UI. All elements must adhere to these tokens to maintain aesthetic uniformity.

---

## 1. CSS Custom Properties (globals.css)

The dashboard runs on a custom CSS-variable mapping layer. Avoid using raw HEX values or arbitrary Tailwind colors. Refer to these mappings.

The system supports **two modes**: `dark` (default) and `light`. Switching is handled via a `data-theme` attribute on the `<html>` element:

```html
<!-- Dark mode (default) -->
<html data-theme="dark" dir="rtl">

<!-- Light mode -->
<html data-theme="light" dir="rtl">
```

---

### Dark Mode — `:root` / `[data-theme="dark"]`

```css
:root,
[data-theme="dark"] {
  /* Background Layers */
  --bg-primary:     #0A0A0F; /* Main application background */
  --bg-card:        #111118; /* Cards and core container backgrounds */
  --bg-elevated:    #18181F; /* Dropdowns, popovers, and elevated widgets */
  --bg-glass:       rgba(17, 17, 24, 0.75); /* Top bar and modal background blur */

  /* Gold Accent System */
  --gold-primary:   #D4A853; /* Primary gold color for metrics, buttons, active items */
  --gold-muted:     rgba(212, 168, 83, 0.15); /* Soft background highlights */
  --gold-glow:      rgba(212, 168, 83, 0.35); /* Neon shadows and button glows */
  --gold-border:    rgba(212, 168, 83, 0.20); /* Premium thin borders for cards */

  /* Semantic Alerts & Badges */
  --red-alert:      #E8334A; /* Error, alert, offline status indicator */
  --green-success:  #2ECC71; /* Success, online status, positive metrics */
  --blue-info:      #3B82F6; /* Information and hints */

  /* Text Elements */
  --text-primary:   #F0EDE8; /* Readable high-contrast light text */
  --text-secondary: #8A8799; /* Standard descriptive labels and subtext */
  --text-muted:     #4A4857; /* Placeholder text and inactive indicators */

  /* Border Tokens */
  --border-subtle:  rgba(255, 255, 255, 0.06); /* Default dark layout border */
  --border-gold:    rgba(212, 168, 83, 0.20);  /* Primary premium card border */
}
```

---

### Light Mode — `[data-theme="light"]`

The light mode is not a simple color inversion. It is designed as **warm parchment + deep ink + living gold** — a premium editorial feel inspired by high-end print and luxury Arab design. The gold accent system remains fully intact; backgrounds shift to warm off-white tones (never pure `#FFFFFF`) to preserve richness and prevent the palette from feeling clinical or generic.

```css
[data-theme="light"] {
  /* Background Layers
     Warm ivory and parchment tones — not pure white.
     Each layer gets progressively cooler to create subtle depth. */
  --bg-primary:     #F5F2EC; /* Main canvas: warm parchment */
  --bg-card:        #FDFBF7; /* Cards: soft warm white */
  --bg-elevated:    #FFFFFF; /* Dropdowns, popovers: true white for max lift */
  --bg-glass:       rgba(245, 242, 236, 0.82); /* Top bar blur: frosted parchment */

  /* Gold Accent System
     Gold deepens slightly in light mode so it reads with authority
     against the pale backgrounds — never feels washed out. */
  --gold-primary:   #B8892A; /* Deeper, richer gold for light backgrounds */
  --gold-muted:     rgba(184, 137, 42, 0.10); /* Subtle warm tint on hover states */
  --gold-glow:      rgba(184, 137, 42, 0.22); /* Softer glow — light mode doesn't need neon */
  --gold-border:    rgba(184, 137, 42, 0.25); /* Slightly stronger border to stay visible */

  /* Semantic Alerts & Badges
     Same hues, kept identical — semantic meaning must not shift between modes. */
  --red-alert:      #D42B40; /* Slightly deepened for contrast on light bg */
  --green-success:  #1FAB5E; /* Deepened for light bg legibility */
  --blue-info:      #2563EB; /* Deepened for contrast */

  /* Text Elements
     Deep ink tones, not black — keeps warmth and avoids harshness. */
  --text-primary:   #1A1714; /* Near-black warm ink — primary headings and values */
  --text-secondary: #5C5648; /* Warm medium brown — labels, descriptions */
  --text-muted:     #A09A8E; /* Muted warm gray — placeholders, disabled */

  /* Border Tokens */
  --border-subtle:  rgba(26, 23, 20, 0.08);   /* Soft warm ink border — replaces white-alpha */
  --border-gold:    rgba(184, 137, 42, 0.25); /* Gold border — same role, slightly stronger */
}
```

---

### Token Comparison at a Glance

| Token              | Dark Mode                    | Light Mode                   | Role                              |
|--------------------|------------------------------|------------------------------|-----------------------------------|
| `--bg-primary`     | `#0A0A0F`                    | `#F5F2EC`                    | App canvas                        |
| `--bg-card`        | `#111118`                    | `#FDFBF7`                    | Card/container background         |
| `--bg-elevated`    | `#18181F`                    | `#FFFFFF`                    | Dropdowns, popovers               |
| `--bg-glass`       | `rgba(17,17,24, 0.75)`       | `rgba(245,242,236, 0.82)`    | Frosted nav/modal                 |
| `--gold-primary`   | `#D4A853`                    | `#B8892A`                    | Buttons, active items, metrics    |
| `--gold-muted`     | `rgba(212,168,83, 0.15)`     | `rgba(184,137,42, 0.10)`     | Hover tints, pill backgrounds     |
| `--gold-glow`      | `rgba(212,168,83, 0.35)`     | `rgba(184,137,42, 0.22)`     | Box-shadow glow on CTAs           |
| `--gold-border`    | `rgba(212,168,83, 0.20)`     | `rgba(184,137,42, 0.25)`     | Premium card borders              |
| `--text-primary`   | `#F0EDE8`                    | `#1A1714`                    | Headings, key values              |
| `--text-secondary` | `#8A8799`                    | `#5C5648`                    | Labels, subtext                   |
| `--text-muted`     | `#4A4857`                    | `#A09A8E`                    | Placeholders, disabled            |
| `--border-subtle`  | `rgba(255,255,255, 0.06)`    | `rgba(26,23,20, 0.08)`       | Default layout dividers           |
| `--border-gold`    | `rgba(212,168,83, 0.20)`     | `rgba(184,137,42, 0.25)`     | Premium gold card borders         |
| `--red-alert`      | `#E8334A`                    | `#D42B40`                    | Errors, alerts                    |
| `--green-success`  | `#2ECC71`                    | `#1FAB5E`                    | Success, positive indicators      |
| `--blue-info`      | `#3B82F6`                    | `#2563EB`                    | Info hints                        |

---

## 2. Theme Toggle Implementation

### React Hook

```tsx
// hooks/useTheme.ts
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("ma-theme") as Theme) ?? "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("ma-theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggle };
}
```

### Toggle Button Component

```tsx
// components/ThemeToggle.tsx
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
      className="
        flex items-center gap-2 px-3 py-2 rounded-lg
        border border-[--border-gold]
        bg-[--gold-muted]
        text-[--gold-primary]
        hover:bg-[--gold-primary] hover:text-[--bg-primary]
        transition-all duration-300
      "
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
```

---

## 3. Usage Guidelines for Light Mode

### ✅ Do

- Always reference `var(--token-name)` — never hardcode hex values directly in components.
- Test all card hover states in light mode. `--gold-glow` is the primary shadow driver and must still be perceptible.
- Use `--bg-glass` with `backdrop-filter: blur(12px)` for the navbar in both modes — it behaves correctly in both.
- When using `--gold-primary` as text color on `--bg-card` in light mode, verify WCAG AA contrast (the `#B8892A` / `#FDFBF7` pair passes at ≈ 4.6:1).

### ❌ Don't

- Don't use `bg-white` or `text-black` Tailwind classes directly — always map to tokens.
- Don't increase gold saturation in light mode to compensate — the deeper `#B8892A` is intentional.
- Don't add extra shadows on cards in light mode to mimic the dark glow; use `--border-subtle` + a very soft `box-shadow: 0 2px 12px rgba(26,23,20,0.06)` instead.
- Don't apply `--gold-glow` as a full drop-shadow in light mode — it will look too heavy. Reserve it for CTA buttons only.

### Elevation Model in Light Mode

In dark mode, depth is created by **lightening** (cards are lighter than the bg). In light mode, depth is created by **shadowing** (cards float above the canvas via subtle shadow, not color difference). Apply the following shadow scale:

```css
/* globals.css — light mode only elevation shadows */
[data-theme="light"] {
  --shadow-card:    0 1px 4px rgba(26, 23, 20, 0.06), 0 4px 16px rgba(26, 23, 20, 0.05);
  --shadow-elevated: 0 4px 12px rgba(26, 23, 20, 0.10), 0 12px 32px rgba(26, 23, 20, 0.08);
  --shadow-gold-cta: 0 4px 16px rgba(184, 137, 42, 0.22);
}
```

Add these to `globals.css` and reference via `box-shadow: var(--shadow-card)` on `.card` elements when `data-theme="light"` is active.

---

## 4. Typography Specification

*(Unchanged — applies identically to both modes.)*

### Cairo Font (Primary Body & Header)
- Loaded via Google Fonts: `family=Cairo:wght@400;500;600;700;800`
- Default font family for all text elements.
- Use standard weights (`font-normal`, `font-semibold`, `font-bold`) to establish reading hierarchy.

### DM Serif Display (Metrics & Large Numbers)
- Loaded via Google Fonts: `family=DM+Serif+Display`
- Applied exclusively to numerical data points, metric highlights, and dashboard score numbers.
- Styling Class: `.metric-number`

```tsx
<div className="metric-number font-serif" style={{ color: "var(--gold-primary)" }}>
  {toArabicDigits("٤,٨٢٠")}
</div>
```

> **Light mode note**: `--gold-primary` resolves to `#B8892A` in light mode — the metric number will render darker and still feel premium. No extra override needed.

---

## 5. Direction and Layout Rules

*(Unchanged — applies identically to both modes.)*

- **`dir="rtl"`**: The dashboard is strictly Right-to-Left for Arabic native reading layout.
- Alignment of indicators, icons, list items, and headers must always follow the Arabic RTL grid (margins on the right, icons leading on the right).
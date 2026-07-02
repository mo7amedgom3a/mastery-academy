# Colors & Theming Reference

This document details the color tokens, palettes, and typography specifications for the Mastery Academy dashboard UI. All elements must adhere to these tokens to maintain aesthetic uniformity.

## 1. CSS Custom Properties (globals.css)

The dashboard runs on a custom CSS-variable mapping layer. Avoid using raw HEX values or arbitrary Tailwind colors. Refer to these mappings:

```css
:root {
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
  --red-alert:      #E8334A; /* Error, alert, online status offline indicator */
  --green-success:  #2ECC71; /* Success, online status, positive metrics */
  --blue-info:      #3B82F6; /* Information and hints */

  /* Text Elements */
  --text-primary:   #F0EDE8; /* Readable high-contrast light text */
  --text-secondary: #8A8799; /* Standard descriptive labels and subtext */
  --text-muted:     #4A4857; /* Placeholder text and inactive indicators */

  /* Border Tokens */
  --border-subtle:  rgba(255, 255, 255, 0.06); /* Default dark layout border */
  --border-gold:    rgba(212, 168, 83, 0.20); /* Primary premium card border */
}
```

## 2. Typography Specification

To support multi-lingual Arabic and premium metrics:

### Cairo Font (Primary Body & Header)
* Loaded via Google Fonts: `family=Cairo:wght@400;500;600;700;800`
* Application:
  * Default font family for all text elements.
  * Directives: Use standard weights (`font-normal`, `font-semibold`, `font-bold`) to establish reading hierarchy.

### DM Serif Display (Metrics & Large Numbers)
* Loaded via Google Fonts: `family=DM+Serif+Display`
* Application:
  * Applied exclusively to numerical data points, metric highlights, and dashboard score numbers.
  * Styling Class: `.metric-number`
  * Example:
    ```tsx
    <div className="metric-number font-serif text-gold-primary">
      {toArabicDigits("٤,٨٢٠")}
    </div>
    ```

## 3. Direction and Layout Rules

* **dir="rtl"**: The dashboard is strictly Right-to-Left (RTL) for Arabic native reading layout.
* Alignment of indicators, icons, list items, and headers should always follow the Arabic RTL grid (e.g., margins on the right, pads, icons leading on the right).

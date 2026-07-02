# Pixel-Perfect Layouts Reference

This document outlines layout constraints, RTL structures, grid layouts, spacing rules, and responsive design metrics.

## 1. Global Shell Structure

All dashboards must run within the global application shell to align components cleanly:

* **Fixed Sidebar (Right Side)**:
  * Width: `260px`
  * Position: `fixed`, right-aligned (`right-0`), taking 100% height (`h-screen`).
  * Layout: RTL navigation list with active gold-highlighted borders on the right (`border-r-2 border-[var(--gold-primary)]`).
* **Fixed TopBar (Header)**:
  * Height: approximately `72px`
  * Position: `sticky`, top-aligned (`top-0`), glassmorphic background blur (`bg-bg-glass backdrop-blur-xl`), border-b subtle.
  * Inner alignment (RTL): Page title on the right, action indicators (Notifications, Avatar, Persona switchers) clustered on the left.
* **Content Area (Viewport Canvas)**:
  * Margin: Right margin MUST match sidebar width (`mr-[260px]`).
  * Padding: Consistent `p-8` or `p-6` for normal content.
  * Scrolling: `overflow-y-auto` viewport scrolling with a customized scrollbar (using `scrollbar-thin scrollbar-thumb-bg-elevated`).

## 2. Spacing and Grids

Establish vertical and horizontal structure using these Tailwind rules:

### Dashboard Grid Breakpoints
Use responsive columns for dashboard metrics and analytics blocks:

* **Single Column (Mobile)**: `grid-cols-1`
* **Two Column (Medium/Tablet)**: `sm:grid-cols-2`
* **Four Column (Large/Desktop)**: `lg:grid-cols-4`
* Spacing gap: Standardize on `gap-4` or `gap-6` (16px / 24px) for spacing between cards.

Example Metrics Layout:
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Wrap each metric inside a GoldCard */}
</div>
```

### Main Panel Grids
For secondary drill-downs, dashboards, and split workspaces:
* Split column structures (e.g., curriculum navigation lists beside workspaces) should use:
  `grid grid-cols-1 lg:grid-cols-[2fr_1.2fr] gap-6` (Level 2 dashboard) or `grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6` (Level 3 dashboard).

## 3. Viewport Constraints & Overflow Prevention

To prevent scrolling the entire viewport for internal workspace tabs (e.g., Level 3 lesson editor):

* Set the height of the editor workspace area to fit the viewport: `h-[calc(100vh-180px)]` or `h-[calc(100vh-160px)]`.
* Allow independent scroll containers for left and right columns:
  * Apply `overflow-y-auto scrollbar-thin` to inner containers (like chapters list or tab content).
  * Use flexbox column wrapping (`flex flex-col min-h-0`) so scroll containers calculate heights reactively without layout breaks.

## 4. Numbers and Arabic Translation Formatting

* Always use helper formatting functions (like `toArabicDigits` or custom currency formatters like `formatSAR`) to display Arabic numerical systems alongside Egyptian/Saudi Arabian locales.
* Example translation of Arabic digits:
  ```typescript
  export const toArabicDigits = (num: string | number): string => {
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return num.toString().replace(/[0-9]/g, (w) => arabicDigits[+w]);
  };
  ```

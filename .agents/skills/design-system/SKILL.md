---
name: design-system
description: Provides guidelines, design tokens, color schemas, and components of the Mastery Academy dashboard system to ensure pixel-perfect and consistent layout implementation.
---

# Mastery Academy Design System Skill

This custom skill provides AI agents and developers with the official design tokens, layouts, schemas, and UI components of the Mastery Academy platform. Future agents MUST use these specifications when building new pages, tabs, or dashboards to maintain a pixel-perfect, highly aesthetic dark-gold user experience.

## Design System Resources

The design system is split into modular reference documents under the `references/` directory. When building or extending dashboards, read the relevant documents:

1. [Colors & Theming](file://references/COLORS_AND_THEMING.md)
   * Background tokens, gold accent system, semantic status colors, typography settings, and CSS properties.
2. [Components & Elements](file://references/COMPONENTS_AND_ELEMENTS.md)
   * Code implementations for core UI elements (`GoldCard`, `GoldButton`, `GhostButton`, `StatusBadge`, progress bars, tables, modal structures, and custom charts).
3. [Pixel-Perfect Layouts](file://references/PIXEL_PERFECT_LAYOUTS.md)
   * Page layout standards, RTL navigation flow, fixed sidebar and topbar constraints, and responsive breakpoints.
4. [Frontend Architecture & Mock API](file://references/FRONTEND_ARCHITECTURE.md)
   * Component-Driven Design (CDD) guidelines, simulated network mutations (toast feedbacks), and three-level drill-down flow architectures.

## Core Directives for Agents

* **RTL First**: All layouts must default to RTL (`dir="rtl"`) using Cairo font for text and DM Serif Display for gold numerical metrics.
* **Premium Aesthetics**: Avoid standard Tailwind colors (e.g., bg-red-500, border-gray-700). Use the CSS variables configured in `globals.css` via custom utility mappings or inline CSS properties.
* **Consistent Cards**: Always wrap metrics and dashboard panels inside the `GoldCard` component for consistent glassmorphism borders and glows.
* **Consistent CTAs**: Always use `GoldButton` for primary actions and `GhostButton` or `IconButton` for secondary controls.

# React Web Performance Reference Guide

This reference details the standards and implementations for optimizing standard React applications on the web.

## 1. Preventing Hydration Mismatches & Double Renders
* **Hydration Mismatch:** When using Server-Side Rendering (SSR) or Static Site Generation (SSG), do not render client-specific details (like window width, current time, or local storage values) during the initial render.
* **The Antipattern (State + Effect):**
  ```tsx
  // AVOID THIS: Causes double-render on client and hydration warnings
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  ```
* **The Correct Pattern (`useSyncExternalStore`):**
  Use `useSyncExternalStore` to subscribe directly to window changes. React will resolve this safely, avoiding double-rendering updates on load:
  ```tsx
  import { useSyncExternalStore } from "react";
  
  export function useIsMobile() {
    return useSyncExternalStore(
      (onStoreChange) => {
        const mql = window.matchMedia("(max-width: 767px)");
        mql.addEventListener("change", onStoreChange);
        return () => mql.removeEventListener("change", onStoreChange);
      },
      () => window.matchMedia("(max-width: 767px)").matches,
      () => false // Server-side fallback
    );
  }
  ```

## 2. Bundle Size & Code Splitting
* **Route & Component Splitting:** Use React's lazy loading or framework-specific page splitting (`import()`) for any complex component (e.g. charts, sliders, editors) that is not immediately visible on first paint.
  ```tsx
  const HeavyEditor = React.lazy(() => import("./HeavyEditor"));
  ```
* **Framer Motion Bundle Optimization:**
  Always avoid importing the full `framer-motion` package into entry points. Use `LazyMotion` and `m`:
  1. Wrap the root component inside `<LazyMotion features={domAnimation} strict>`.
  2. Use `<m.div>` instead of `<motion.div>` for elements.
  3. This drops the animation bundle size footprint by over 60%!

## 3. High-Frequency State & Rendering Control
* **Context Overhead:** If a Context Provider holds a state that updates frequently (e.g., cursor coordinate, typing text), every component consuming that context will re-render.
  * **Fix:** Split state contexts from dispatch contexts, or use a state manager like Zustand, Recoil, or Jotai which supports selector-based component subscriptions.
* **Inline Callback Optimization:** Avoid passing inline anonymous functions as props to complex children. Wrap them in `useCallback` to prevent reference changes on every render.
* **Debouncing High-Frequency Events:** When listening to window resize, scroll, or search inputs, throttle or debounce state changes:
  ```tsx
  // Debounce state changes for search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(handler);
  }, [query]);
  ```

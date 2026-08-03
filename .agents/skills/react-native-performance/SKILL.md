---
name: react-native-performance
description: Guidelines and best practices for writing high-performance React and React Native code, choosing libraries, managing state, and handling heavy computations.
---

# React & React Native Performance Optimization Guide

This custom skill provides AI agents and developers with core principles, architectural blueprints, and evaluation checklists to guarantee maximum runtime performance in both React (Web) and React Native (Mobile) codebases.

Agents and developers MUST consult this guide and its reference manuals before writing code, choosing libraries, or building heavy-compute features.

## Core Directives for Agents & Developers

1. **Performance-First Design**: Treat rendering overhead, thread blocking, and bundle sizes as first-class constraints. Do not wait for performance to degrade; write code optimized for rendering loops from day one.
2. **Library Audits**: Never install a library without auditing its bundle size, performance impact, and architectural footprint.
3. **Thread Preservation**: Keep the JavaScript single thread (UI/JS thread in mobile, main thread in web) free from heavy calculations.

---

## Reference Manuals

The performance system guidelines are split into modular documents under the `references/` directory. Refer to the appropriate document for specific implementations:

1. [React & Web Performance](file://references/REACT_WEB_PERFORMANCE.md)
   * Hydration mismatches, code-splitting, state management, and Framer Motion optimization (`LazyMotion`).
2. [React Native Performance](file://references/REACT_NATIVE_PERFORMANCE.md)
   * The Double-Thread Architecture (UI vs JS), Worklets (Reanimated), optimized list structures (`FlatList`), image handling, and JSI.
3. [Heavy Compute & Library Selection](file://references/HEAVY_COMPUTATIONS.md)
   * Auditing library overhead, offloading calculations (Web Workers, native threads), and scheduling frames (`requestAnimationFrame`, `requestIdleCallback`).

---

## Critical Checklists for Building Features

### 1. Adding a New Dependency / Library
* [ ] Is this package tree-shakable?
* [ ] What is the bundle size impact? (Use Bundlephobia for web).
* [ ] Does it require native bindings? If yes, does it use the modern JSI (JavaScript Interface) or legacy bridge?
* [ ] Can we implement the functionality with native APIs or lightweight helpers instead of a dependency?

### 2. Implementing a List / Grid
* [ ] Are items keys unique, stable, and not array indexes?
* [ ] Is the list using layout specifications (`getItemLayout` in React Native)?
* [ ] Are list items memoized (`React.memo`) to avoid cascade renders when the parent state changes?

### 3. Implementing Animations or Real-time UI Updates
* [ ] Are animations running on the native UI thread? (e.g., using `useNativeDriver: true` or Worklets).
* [ ] Are high-frequency updates (e.g., scroll coordinates, inputs) debounced, throttled, or managed outside of global React state?

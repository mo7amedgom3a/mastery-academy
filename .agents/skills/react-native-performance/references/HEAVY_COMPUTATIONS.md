# Heavy Computations & Library Selection Guide

This guide outlines standards and procedures for evaluating third-party dependencies and offloading heavy computational logic in both web and mobile environments.

## 1. Third-Party Library Selection Guidelines
Before running `npm install` or `yarn add`, perform the following checks:
1. **Tree-Shaking Support:** Check if the package is published as ES Modules (`ESM`) and is tree-shakable. Avoid libraries that force you to pull in the entire package when only a single utility is needed.
2. **Bundle Size Audit (Web):** Use tools like **Bundlephobia** to inspect the library's weight:
   * **Ideal:** `< 5 KB` minified + gzipped.
   * **Acceptable:** `5 - 25 KB`.
   * **Avoid:** `> 30 KB` unless it is a core structural tool (e.g., chart rendering or dynamic editor).
3. **Execution Overhead:** Check issues and performance profiles. Look out for libraries that trigger constant re-renders or attach event listeners to `window` globally without cleanup.

---

## 2. Offloading Heavy Computations
JavaScript runs on a single thread. Any task taking longer than **16ms** will block a frame update, causing layout freeze, input lag, or visual stuttering.

### A. Web Optimization (Web Workers & WASM)
* **Web Workers:** Move non-UI calculations (like sorting massive datasets, image manipulation, or complex analytics) into a background Worker thread:
  ```tsx
  // worker.js
  self.onmessage = function (e) {
    const result = heavyCalculation(e.data);
    self.postMessage(result);
  };

  // main.js
  const worker = new Worker("worker.js");
  worker.postMessage(data);
  worker.onmessage = (e) => {
    setResult(e.data);
  };
  ```
* **WebAssembly (WASM):** For extreme data crunching (e.g., cryptography, audio synthesis, 3D math), use compiled WebAssembly modules (Rust/C++) which run near native speed.

### B. Mobile Optimization (Native Threads & JSI)
* **Native Thread Offloading:** In React Native, do not run heavy filters or data parsers in the main JS thread. Build a custom Native Module that spawns a background thread in Java/Swift, executes the task, and returns the result asynchronously.
* **Worklets:** Use Reanimated worklets (`runOnUI`) to execute UI-critical computation directly on the UI thread, bypassing the JS thread.

---

## 3. Task Chunking & Frame Scheduling
If heavy work must be done on the JavaScript thread, chunk it to fit within the 16ms frame budget (under the limit to keep it around 8-10ms to allow room for React rendering).

* **`requestIdleCallback`:** Run lower-priority background tasks when the browser/native app is idle:
  ```tsx
  const doLowPriorityWork = (deadline) => {
    while (deadline.timeRemaining() > 0 && tasks.length > 0) {
      processNextTask(tasks.shift());
    }
    if (tasks.length > 0) {
      requestIdleCallback(doLowPriorityWork);
    }
  };
  requestIdleCallback(doLowPriorityWork);
  ```
* **Chunking loops:** Break a loop of 10,000 items into batches of 100 items scheduled across frames using `requestAnimationFrame` or `setTimeout(..., 0)`.
* **Caching (Memoization):** Cache inputs and results. Use pure functions and store computations in local cache hooks (or libraries like memoize-one) to avoid re-evaluating calculations on identical parameters.

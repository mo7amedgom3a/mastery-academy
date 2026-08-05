export function PageLoader() {
  return (
    <div
      dir="rtl"
      aria-live="polite"
      aria-busy="true"
      className="flex w-full flex-col items-center justify-center py-16"
    >
      <div className="loader-wrapper flex flex-col items-center">
        <svg
          className="loader-draw h-16 w-28 sm:h-20 sm:w-36"
          viewBox="990 140 295 165"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="loader-draw-path"
            d="M1280.3,150.9v59.5c-15.7-0.1-29.9-6.5-40.2-16.8l-2.6-2.5l-31-31l-1.1-1.1c-10.3-10.1-24.5-16.3-40.1-16.3v67.7c-15.7-0.1-29.9-6.5-40.2-16.8l-2.6-2.5l-31-31l-1.1-1.1c-10.3-10.1-24.5-16.3-40.1-16.3v67.7H993v67.7h57.5v-59.5c15.7,0,29.9,6.3,40.2,16.4c0.3,0.2,0.6,0.5,0.8,0.8l33.7,33.7c10.3,10.3,24.5,16.7,40.2,16.8v-67.7c15.7,0,29.9,6.3,40.2,16.4c0.3,0.2,0.6,0.5,0.8,0.8l33.7,33.7c10.3,10.3,24.5,16.7,40.2,16.8v-67.7h57.5v-67.7H1280.3z"
          />
        </svg>
        <div className="loading-text">
          Loading<span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    </div>
  );
}

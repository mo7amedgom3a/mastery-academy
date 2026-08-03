import { memo } from "react";
import { tickerItems } from "@/lib/landing-data";
import { toArabicDigits } from "@/lib/utils";

const repeatedItems = [...tickerItems, ...tickerItems];

const Track = memo(function Track({
  ariaHidden = false,
}: {
  ariaHidden?: boolean;
}) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {repeatedItems.map((item, index) => (
        <div
          key={`${item}-${index}`}
          className="flex items-center shrink-0"
        >
          <span className="px-8 whitespace-nowrap text-lg font-semibold text-text-primary">
            {toArabicDigits(item)}
          </span>

          <span className="text-2xl text-gold-primary px-2">
            ✦
          </span>
        </div>
      ))}
    </div>
  );
});

export function StatsTicker() {
  return (
    <section
      dir="ltr"
      className="relative overflow-hidden border-y border-gold-border bg-bg-card/50 py-5 backdrop-blur-sm"
    >
      <div className="flex w-max animate-marquee will-change-transform">
        <Track />
        <Track ariaHidden />
      </div>
    </section>
  );
}
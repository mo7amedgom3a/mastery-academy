import { tickerItems } from "@/lib/landing-data";
import { toArabicDigits } from "@/lib/utils";

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {tickerItems.map((it, i) => (
        <div key={i} className="flex items-center whitespace-nowrap">
          <span className="text-text-primary font-semibold text-lg px-8">
            {toArabicDigits(it)}
          </span>
          <span className="text-gold-primary text-2xl">✦</span>
        </div>
      ))}
    </div>
  );
}

export function StatsTicker() {
  return (
    <div dir="ltr" className="relative border-y border-gold-border bg-bg-card/50 overflow-hidden py-5 backdrop-blur-sm">
      <div className="animate-marquee">
        <Track />
        <Track ariaHidden />
      </div>
    </div>
  );
}

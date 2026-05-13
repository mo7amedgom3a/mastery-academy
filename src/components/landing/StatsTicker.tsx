import { tickerItems } from "@/lib/landing-data";

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {tickerItems.map((it, i) => (
        <div key={i} className="flex items-center whitespace-nowrap">
          <span className="text-text-primary font-semibold text-lg px-8">{it}</span>
          <span className="text-accent-gold text-2xl">✦</span>
        </div>
      ))}
    </div>
  );
}

export function StatsTicker() {
  return (
    <div dir="ltr" className="relative border-y border-[rgba(212,168,83,0.15)] bg-bg-secondary/50 overflow-hidden py-5">
      <div className="animate-marquee">
        <Track />
        <Track ariaHidden />
      </div>
    </div>
  );
}

import { m } from "framer-motion";
import { Star } from "lucide-react";
import { consultancies } from "@/lib/landing-data";
import { GoldCard } from "@/components/ui/gold-elements";
import { toArabicDigits } from "@/lib/utils";

const items = consultancies.slice(0, 5).map((item) => ({
  quote: item.summary || `احجز ${item.title} مع ${item.consultant} ضمن خدمات ماستري أكاديمي.`,
  name: item.consultant,
  role: item.title,
  image: item.consultantImage,
}));

function Card({ q }: { q: typeof items[number] }) {
  return (
    <GoldCard dir="rtl" className="w-[340px] sm:w-[420px] flex-shrink-0 p-8 relative hover:-translate-y-1.5 cursor-pointer">
      <span className="absolute top-4 left-6 font-display text-7xl text-gold-primary/20 leading-none">”</span>
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-gold-primary text-gold-primary" />
        ))}
      </div>
      <p className="text-text-primary text-base leading-relaxed mb-6 font-medium">{toArabicDigits(q.quote)}</p>
      <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
        <img src={q.image} alt={q.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-gold-primary/40" loading="lazy" />
        <div>
          <p className="text-text-primary font-bold text-sm">{q.name}</p>
          <p className="text-text-secondary text-xs font-semibold">{q.role}</p>
        </div>
      </div>
    </GoldCard>
  );
}

const marqueeTransition = {
  duration: 50,
  ease: "linear",
  repeat: Infinity,
} as const;

function Track({
  ariaHidden = false,
  duplicate = false,
}: {
  ariaHidden?: boolean;
  duplicate?: boolean;
}) {
  return (
    <m.div
      className="flex shrink-0 items-stretch gap-8"
      animate={{ x: ["0%", "-100%"] }}
      transition={marqueeTransition}
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((q, index) => (
        <Card key={`${duplicate ? "dup-" : ""}${q.name}-${q.role}-${index}`} q={q} />
      ))}
    </m.div>
  );
}

export function Testimonials() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <p className="text-gold-primary text-sm font-semibold mb-2">خبراء الاستشارات</p>
        <h2 className="text-4xl lg:text-5xl font-display font-bold text-text-primary">
          مستشارون جاهزون لدعمك في <span className="text-gold-gradient">ماستري أكاديمي</span>
        </h2>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg-primary to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg-primary to-transparent z-10" />
        <div dir="ltr" className="flex gap-8 overflow-hidden">
          <Track />
          <Track ariaHidden duplicate />
        </div>
      </div>
    </section>
  );
}

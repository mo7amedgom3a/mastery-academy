import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { categories, landingStats } from "@/lib/landing-data";

const rotations = ["-rotate-3", "rotate-2", "rotate-1", "-rotate-2"];
const tileGradients = [
  "linear-gradient(135deg, #D4A853 0%, #8B6F2E 100%)",
  "linear-gradient(135deg, #1a1a1a 0%, #D4A853 100%)",
  "linear-gradient(135deg, #2a2a2a 0%, #6B5320 100%)",
  "linear-gradient(135deg, #D4A853 0%, #1a1a1a 100%)",
];

export function Features() {
  const featureItems = categories.slice(0, 6).map((category) =>
    category.description ? `${category.name}: ${category.description}` : `برامج متخصصة في ${category.name}`
  );
  const visualCategories = categories.slice(0, 4);

  return (
    <section className="relative py-20 lg:py-28 bg-bg-secondary/40 overflow-hidden">
      <div className="pointer-events-none absolute top-1/4 left-0 h-[400px] w-[400px] rounded-full bg-accent-gold/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative grid grid-cols-2 gap-4 order-2 lg:order-1">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`aspect-[3/4] overflow-hidden rounded-2xl ${rotations[i]} border border-[rgba(212,168,83,0.2)] ${i % 2 === 0 ? "translate-y-4" : "-translate-y-4"}`}
              style={{ background: tileGradients[i] }}
            >
              {visualCategories[i]?.image ? (
                <img src={visualCategories[i].image} alt={visualCategories[i].name} className="h-full w-full object-cover mix-blend-luminosity opacity-80" loading="lazy" />
              ) : (
                <div className="flex h-full items-end p-5">
                  <span className="text-2xl font-black leading-tight text-bg-primary/90">{visualCategories[i]?.name}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-accent-gold text-sm font-semibold mb-2">لماذا ماستري؟</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
            اختر من <span className="text-gold-gradient">{landingStats.categories} أقسام</span> تعليمية
          </h2>
          <ul className="mt-10 space-y-4">
            {featureItems.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <span className="flex-shrink-0 mt-0.5 flex h-7 w-7 items-center justify-center rounded-full gold-gradient">
                  <Check className="h-4 w-4 text-bg-primary stroke-[3]" />
                </span>
                <span className="text-text-primary text-lg leading-relaxed">{f}</span>
              </motion.li>
            ))}
          </ul>
          <button className="mt-10 inline-flex items-center rounded-full gold-gradient px-8 py-4 text-base font-bold text-bg-primary hover:opacity-90 transition shadow-[0_8px_30px_rgba(212,168,83,0.3)]">
            إشترك الآن
          </button>
        </div>
      </div>
    </section>
  );
}

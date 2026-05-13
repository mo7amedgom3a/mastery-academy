import { motion } from "framer-motion";
import { diplomaCourses } from "@/lib/landing-data";

export function Diplomas() {
  return (
    <section className="relative py-20 lg:py-28 bg-bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-accent-gold text-sm font-semibold mb-2">الدبلومات</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary">تصفح الدبلومات التالية</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {diplomaCourses.map((d, i) => (
            <motion.article
              key={d.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl bg-bg-tertiary border border-[rgba(212,168,83,0.15)] overflow-hidden hover:-translate-y-1 hover-glow-gold transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={d.image} alt={d.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-tertiary via-transparent to-transparent" />
                <span className="absolute bottom-4 right-4 inline-flex items-center rounded-full bg-accent-gold/90 px-3 py-1 text-xs font-semibold text-bg-primary">دبلوم</span>
              </div>
              <div className="p-8">
                <p className="text-sm text-text-secondary">{d.instructor}</p>
                <h3 className="mt-3 text-xl font-bold text-text-primary leading-snug min-h-[4rem]">{d.title}</h3>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-accent-gold font-display text-4xl">{d.price}</span>
                  {d.originalPrice && <span className="text-text-muted line-through text-lg">{d.originalPrice}</span>}
                </div>
                <a href={d.href} className="mt-6 inline-flex w-full justify-center rounded-full gold-gradient py-3 text-sm font-bold text-bg-primary hover:opacity-90 transition">سجل في الدبلوم</a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

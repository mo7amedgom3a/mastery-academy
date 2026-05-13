import { motion } from "framer-motion";
import { featuredConsultancies } from "@/lib/landing-data";

export function Bundles() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-accent-gold text-sm font-semibold mb-2">الاستشارات</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary">احجز استشارتك مع الخبراء</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredConsultancies.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl bg-bg-secondary border border-[rgba(212,168,83,0.15)] overflow-hidden hover:-translate-y-1 hover-glow-gold transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent" />
                <img src={item.consultantImage} alt={item.consultant} className="absolute -bottom-8 right-6 h-16 w-16 rounded-full border-4 border-bg-secondary object-cover" loading="lazy" />
              </div>
              <div className="p-8 pt-12">
                <p className="text-sm text-text-secondary">{item.consultant}</p>
                <h3 className="mt-3 text-2xl font-bold text-text-primary leading-snug min-h-[5rem]">{item.title}</h3>
                {item.summary && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-text-secondary">{item.summary}</p>}
                <div className="mt-8 flex items-end justify-between gap-3">
                  <div>
                    <span className="font-display text-5xl text-gold-gradient">{item.price}</span>
                    <p className="mt-1 text-xs text-accent-gold font-semibold">{item.duration}</p>
                  </div>
                  <button className="rounded-full bg-bg-tertiary border border-accent-gold/40 px-5 py-3 text-sm font-bold text-accent-gold hover:bg-accent-gold hover:text-bg-primary transition">احجز الآن</button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

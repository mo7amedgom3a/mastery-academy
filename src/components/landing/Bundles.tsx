import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { featuredConsultancies } from "@/lib/landing-data";
import { GoldCard } from "@/components/ui/gold-elements";
import { toArabicDigits } from "@/lib/utils";

export function Bundles() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-gold-primary text-sm font-semibold mb-2">الاستشارات</p>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-text-primary">احجز استشارتك مع الخبراء</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredConsultancies.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <GoldCard className="group relative overflow-hidden hover:-translate-y-1.5 cursor-pointer h-full flex flex-col justify-between">
                <div>
                  <div className="relative h-100 overflow-hidden">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
                    <img src={item.consultantImage} alt={item.consultant} className="absolute -bottom-8 right-6 h-16 w-16 rounded-full border-4 border-bg-card object-cover" loading="lazy" />
                  </div>
                  <div className="p-8 pt-12">
                    <p className="text-sm text-text-secondary">{item.consultant}</p>
                    <Link to="/consultation" className="hover:text-gold-primary transition block">
                      <h3 className="mt-3 text-2xl font-bold text-text-primary hover:text-gold-primary transition leading-snug min-h-[5rem]">{item.title}</h3>
                    </Link>
                    {item.summary && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-text-secondary">{toArabicDigits(item.summary)}</p>}
                  </div>
                </div>
                <div className="p-8 pt-0">
                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                      <span className="font-serif text-5xl text-gold-gradient font-bold">{toArabicDigits(item.price)}</span>
                      <p className="mt-1 text-xs text-gold-primary font-semibold">{toArabicDigits(item.duration)}</p>
                    </div>
                    <Link to="/consultation" className="rounded-full bg-bg-elevated border border-gold-primary/45 px-5 py-3 text-sm font-bold text-gold-primary hover:bg-gold-primary hover:text-bg-primary hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 ease-supportive cursor-pointer text-center">احجز الآن</Link>
                  </div>
                </div>
              </GoldCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

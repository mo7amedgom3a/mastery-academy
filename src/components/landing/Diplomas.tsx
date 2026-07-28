import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { diplomaCourses } from "@/lib/landing-data";
import { GoldCard } from "@/components/ui/gold-elements";
import { toArabicDigits } from "@/lib/utils";

export function Diplomas() {
  return (
    <section className="relative py-20 lg:py-28 bg-bg-card/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-gold-primary text-sm font-semibold mb-2">الدبلومات</p>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-text-primary">تصفح الدبلومات التالية</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {diplomaCourses.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <GoldCard className="group relative overflow-hidden hover:-translate-y-1.5 cursor-pointer h-full flex flex-col justify-between bg-bg-card/50">
                  {/* Dynamic Ambient Background */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img src={d.image} alt="" className="w-full h-full object-cover opacity-40 blur-3xl scale-110 transition duration-500 group-hover:scale-125" aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/80 to-transparent" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="relative h-90">
                    <div 
                      className="absolute inset-0 rounded-t-2xl overflow-hidden"
                      style={{ maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)" }}
                    >
                      <img src={d.image} alt={d.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
                    </div>
                    <span className="absolute bottom-4 right-4 inline-flex items-center rounded-full bg-gold-primary px-3 py-1 text-xs font-semibold text-bg-primary z-10">دبلوم</span>
                  </div>
                  <div className="p-8">
                    <p className="text-sm text-text-secondary">{d.instructor}</p>
                    <Link to={`/course/${d.id}`} className="hover:text-gold-primary transition block">
                      <h3 className="mt-3 text-xl font-bold text-text-primary hover:text-gold-primary transition leading-snug min-h-[4rem]">{d.title}</h3>
                    </Link>
                  </div>
                </div>
                <div className="p-8 pt-0">
                  <div className="mt-2 flex items-baseline gap-3">
                    <span className="text-gold-primary font-serif text-4xl font-bold">{toArabicDigits(d.price)}</span>
                    {d.originalPrice && <span className="text-text-muted line-through text-lg">{toArabicDigits(d.originalPrice)}</span>}
                  </div>
                  <Link to={`/course/${d.id}`} className="mt-6 inline-flex w-full justify-center rounded-full gold-gradient py-3 text-sm font-bold text-bg-primary hover:scale-[1.02] hover:shadow-[0_0_25px_var(--gold-glow)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 ease-supportive backdrop-blur-sm">سجل في الدبلوم</Link>
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

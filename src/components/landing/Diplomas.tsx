import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { diplomaCourses } from "@/lib/landing-data";
import { GoldCard, GoldButton } from "@/components/ui/gold-elements";
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
            <m.div
              key={d.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <GoldCard className="overflow-hidden hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full bg-bg-card/90">
                <div>
                  {/* Diploma Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-bg-elevated border-b border-gold-border/10">
                    <img
                      src={d.image}
                      alt={d.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-3 right-3 bg-gold-primary text-bg-primary text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                      دبلوم احترافي
                    </span>
                    {d.discountPercentage > 0 && (
                      <span className="absolute top-3 left-3 bg-red-alert text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        خصم {toArabicDigits(d.discountPercentage)}%
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <span className="text-[10px] text-gold-primary font-semibold block mb-1">
                      {d.category}
                    </span>
                    <Link to={`/course/${d.id}`} className="hover:text-gold-primary transition block">
                      <h3 className="text-sm sm:text-base font-bold text-text-primary leading-snug line-clamp-2 h-12 mb-3">
                        {d.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-text-secondary mt-2">
                      <User className="h-3.5 w-3.5 text-gold-primary" />
                      <span>بإشراف: {d.instructor}</span>
                    </div>
                  </div>
                </div>

                {/* Footer / CTA */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-border-subtle mt-2 pt-3">
                  <div className="flex flex-col">
                    {d.originalPrice && (
                      <span className="text-[10px] text-text-muted line-through">
                        {toArabicDigits(d.originalPrice)}
                      </span>
                    )}
                    <span className="text-sm font-bold text-gold-primary font-serif">
                      {toArabicDigits(d.price)}
                    </span>
                  </div>
                  <Link to={`/course/${d.id}`}>
                    <GoldButton className="py-2 px-4 text-[10px]">سجل في الدبلوم</GoldButton>
                  </Link>
                </div>
              </GoldCard>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

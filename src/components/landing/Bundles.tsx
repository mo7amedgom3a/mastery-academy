import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { featuredConsultancies } from "@/lib/landing-data";
import { GoldCard, GoldButton } from "@/components/ui/gold-elements";
import { toArabicDigits } from "@/lib/utils";

export function Bundles() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-gold-primary text-sm font-semibold mb-2">الاستشارات</p>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-text-primary">
            احجز استشارتك مع الخبراء
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredConsultancies.map((item, i) => (
            <m.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <GoldCard className="overflow-hidden hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full bg-bg-card/90">
                <div>
                  {/* Consultancy Image with Consultant Avatar Overlay */}
                  <div className="relative  w-full overflow-hidden bg-bg-elevated border-b border-gold-border/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    {/* Consultant Image overlay */}
                    <div className="absolute -bottom-6 right-6 h-14 w-14 rounded-full border-2 border-gold-border/40 overflow-hidden shadow-md">
                      <img
                        src={item.consultantImage}
                        alt={item.consultant}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 pt-8">
                    <span className="text-[10px] text-gold-primary font-semibold block mb-1">
                      {item.consultant}
                    </span>
                    <Link
                      to={`/consultation/${item.id}`}
                      className="hover:text-gold-hover transition block"
                    >
                      <h3 className="text-sm sm:text-base font-bold text-text-primary leading-snug line-clamp-2 h-12 mb-3">
                        {item.title}
                      </h3>
                    </Link>
                    {item.summary && (
                      <p className="line-clamp-3 text-xs leading-relaxed text-text-secondary mt-2 min-h-[3rem]">
                        {toArabicDigits(item.summary)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer / CTA */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-border-subtle mt-2 pt-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gold-primary font-serif">
                      {toArabicDigits(item.price)}
                    </span>
                    <span className="text-[10px] text-text-secondary font-semibold mt-0.5">
                      {toArabicDigits(item.duration)}
                    </span>
                  </div>
                  <Link to={`/consultation/${item.id}`}>
                    <GoldButton className="py-2 px-4 text-[10px]">احجز الآن</GoldButton>
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

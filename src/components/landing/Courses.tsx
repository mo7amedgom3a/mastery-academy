import { Link } from "react-router-dom";
import { ArrowLeft, User } from "lucide-react";
import { useRef } from "react";
import { featuredCourses } from "@/lib/landing-data";
import { GoldCard, GoldButton } from "@/components/ui/gold-elements";
import { toArabicDigits } from "@/lib/utils";
import { getInstructorProfile } from "@/lib/extended-data";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export function Courses() {
  const ref = useRef<HTMLElement>(null);
  useGsapReveal({ target: ref, start: "top 80%", stagger: 0.08 });

  return (
    <section ref={ref} className="relative py-20 lg:py-28" id="courses">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-gold-primary text-sm font-semibold mb-2">الدورات</p>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-text-primary">
              تصفح الدورات التالية
            </h2>
          </div>
          <Link
            to="/packages"
            className="hidden sm:inline-flex items-center gap-2 text-gold-primary hover:text-accent-gold-lt hover:scale-[1.03] transition-all duration-300 ease-supportive"
          >
            تصفح الباقات والحزم
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((c, i) => {
            const instructorId = `inst-${c.instructor.trim().replace(/\s+/g, "-")}`;
            return (
              <div key={c.id} data-reveal>
                <GoldCard className="overflow-hidden hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full bg-bg-card/90">
                  <div>
                    {/* Course Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-bg-elevated border-b border-gold-border/10">
                      <img
                        src={c.image}
                        alt={c.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                      {c.discountPercentage > 0 && (
                        <span className="absolute top-3 left-3 bg-red-alert text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          خصم {toArabicDigits(c.discountPercentage)}%
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <span className="text-[10px] text-gold-primary font-semibold block mb-1">
                        {c.category}
                      </span>
                      <Link
                        to={`/course/${c.id}`}
                        className="hover:text-gold-primary transition block"
                      >
                        <h3 className="text-sm sm:text-base font-bold text-text-primary leading-snug line-clamp-2 h-12 mb-3">
                          {c.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-text-secondary mt-2">
                        <User className="h-3.5 w-3.5 text-gold-primary" />
                        <Link
                          to={`/instructor/${instructorId}`}
                          className="hover:text-gold-primary transition"
                        >
                          <span>بإشراف: {c.instructor}</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Footer / CTA */}
                  <div className="p-5 pt-0 flex items-center justify-between border-t border-border-subtle mt-2 pt-3">
                    <div className="flex flex-col">
                      {c.originalPrice && (
                        <span className="text-[10px] text-text-muted line-through">
                          {toArabicDigits(c.originalPrice)}
                        </span>
                      )}
                      <span className="text-sm font-bold text-gold-primary font-serif">
                        {toArabicDigits(c.price)}
                      </span>
                    </div>
                    <Link to={`/course/${c.id}`}>
                      <GoldButton className="py-2 px-4 text-[10px]">اشترك الآن</GoldButton>
                    </Link>
                  </div>
                </GoldCard>
              </div>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Link to="/browse">
            <button className="inline-flex items-center gap-2 rounded-full gold-gradient px-8 py-3.5 text-sm font-bold text-bg-primary hover:scale-[1.02] hover:shadow-[0_0_20px_var(--gold-glow)] transition-all duration-300 ease-supportive cursor-pointer">
              البحث المتقدم وتصفح جميع المجالات والاستشارات
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

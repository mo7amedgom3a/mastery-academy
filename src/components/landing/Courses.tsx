import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { featuredCourses } from "@/lib/landing-data";
import { GoldCard } from "@/components/ui/gold-elements";
import { toArabicDigits } from "@/lib/utils";

export function Courses() {
  return (
    <section className="relative py-20 lg:py-28" id="courses">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-gold-primary text-sm font-semibold mb-2">الدورات</p>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-text-primary">تصفح الدورات التالية</h2>
          </div>
          <Link to="/packages" className="hidden sm:inline-flex items-center gap-2 text-gold-primary hover:text-accent-gold-lt hover:scale-[1.03] transition-all duration-300 ease-supportive">
            تصفح الباقات والحزم
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((c, i) => {
            const instructorId = `inst-${c.instructor.trim().replace(/\s+/g, "-")}`;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <GoldCard className="group relative overflow-hidden hover:-translate-y-1.5 cursor-pointer h-full flex flex-col justify-between">
                  <div>
                    <div className="h-40 relative overflow-hidden">
                      <img src={c.image} alt={c.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                      <div className="absolute left-1 bottom-1 rounded-full bg-bg-primary/80 px-3 py-1 text-xs font-semibold text-gold-primary backdrop-blur-sm">
                        {toArabicDigits(c.category)}
                      </div>
                      <Link 
                        to={`/instructor/${instructorId}`} 
                        className="absolute -bottom-8 right-6 h-16 w-16 rounded-full border-4 border-bg-card gold-gradient flex items-center justify-center font-display text-xl font-bold text-bg-primary hover:scale-105 transition duration-200 z-10"
                        title={c.instructor}
                      >
                        {c.instructor.replace(/^(أ\.|د\.)\s*/, "").charAt(0)}
                      </Link>
                    </div>
                    <div className="p-6 pt-12">
                      <Link to={`/course/${c.id}`} className="hover:text-gold-primary transition block">
                        <h3 className="text-text-primary hover:text-gold-primary transition font-bold text-lg leading-snug min-h-[3.5rem]">{c.title}</h3>
                      </Link>
                      <Link to={`/instructor/${instructorId}`} className="text-text-secondary text-sm mt-2 hover:text-gold-primary transition block font-medium">
                        {c.instructor}
                      </Link>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-gold-primary font-serif text-2xl font-bold">{toArabicDigits(c.price)}</span>
                      <Link to={`/course/${c.id}`} className="rounded-full border border-gold-primary/45 px-4 py-2 text-xs font-semibold text-gold-primary hover:bg-gold-primary hover:text-bg-primary hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 ease-supportive">اشترك الآن</Link>
                    </div>
                  </div>
                </GoldCard>
              </motion.div>
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

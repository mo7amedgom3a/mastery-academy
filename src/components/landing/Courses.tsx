import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { featuredCourses } from "@/lib/landing-data";

export function Courses() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-accent-gold text-sm font-semibold mb-2">الدورات</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-text-primary">تصفح الدورات التالية</h2>
          </div>
          <a href="#" className="hidden sm:inline-flex items-center gap-2 text-accent-gold hover:text-accent-gold-lt transition">
            تصفح المزيد
            <ArrowLeft className="h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl bg-bg-secondary border border-[rgba(212,168,83,0.15)] overflow-hidden hover:-translate-y-1 hover-glow-gold transition-all duration-300"
            >
              <div className="h-40 relative overflow-hidden">
                <img src={c.image} alt={c.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                <div className="absolute right-4 top-4 rounded-full bg-bg-primary/80 px-3 py-1 text-xs font-semibold text-accent-gold backdrop-blur-sm">
                  {c.category}
                </div>
                <div className="absolute -bottom-8 right-6 h-16 w-16 rounded-full border-4 border-bg-secondary gold-gradient flex items-center justify-center font-display text-xl font-bold text-bg-primary">
                  {c.instructor.replace(/^(أ\.|د\.)\s*/, "").charAt(0)}
                </div>
              </div>
              <div className="p-6 pt-12">
                <h3 className="text-text-primary font-bold text-lg leading-snug min-h-[3.5rem]">{c.title}</h3>
                <p className="text-text-secondary text-sm mt-2">{c.instructor}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-accent-gold font-display text-2xl">{c.price}</span>
                  <a href={c.href} className="rounded-full border border-accent-gold/40 px-4 py-2 text-xs font-semibold text-accent-gold hover:bg-accent-gold hover:text-bg-primary transition">اشترك الآن</a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

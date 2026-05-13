import { motion } from "framer-motion";
import { landingStats } from "@/lib/landing-data";

export function JoinTrainerCTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-tertiary via-bg-secondary to-bg-primary" />
      <div className="pointer-events-none absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-accent-gold/20 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-[400px] w-[400px] rounded-full bg-accent-red/15 blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #D4A853 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="text-5xl lg:text-7xl font-black text-text-primary leading-tight">مدرب خبير؟</h2>
        <p className="mt-4 text-3xl lg:text-4xl font-display text-gold-gradient">إذاً انضم لنا</p>
        <p className="mt-6 text-lg text-text-secondary max-w-xl mx-auto">كن أحد {landingStats.instructors} خبيراً في ماستري اكاديمي وشارك معرفتك ضمن {landingStats.categories} أقسام تعليمية</p>
        <button className="mt-10 inline-flex items-center rounded-full gold-gradient px-10 py-5 text-lg font-bold text-bg-primary hover:opacity-90 transition shadow-[0_10px_40px_rgba(212,168,83,0.4)]">انضم إلينا الآن</button>
      </motion.div>
    </section>
  );
}

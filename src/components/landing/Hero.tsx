import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { landingStats } from "@/lib/landing-data";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const dur = 1800;
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);

  return (
    <span ref={ref} className="font-display text-accent-gold">
      {val.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28 lg:pt-32 noise-overlay">
      {/* Ambient gold glows */}
      <div className="pointer-events-none absolute -top-32 right-1/4 h-[500px] w-[500px] rounded-full bg-accent-gold/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-accent-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/3 h-[300px] w-[300px] rounded-full bg-accent-red/10 blur-[100px]" />

      {/* Watermark calligraphy */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03] select-none">
        <span className="text-[28rem] font-black text-accent-gold leading-none">م</span>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-12 lg:gap-8 items-center pb-20">
        {/* Text */}
        <div className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(212,168,83,0.3)] bg-accent-gold/5 px-4 py-1.5 text-xs text-accent-gold-lt"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-gold animate-pulse" />
            منصة التعلم الرائدة في الوطن العربي
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.95] text-text-primary tracking-tight"
          >
            ماستري
            <br />
            <span className="text-gold-gradient">اكاديمي</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-xl lg:text-2xl text-text-secondary"
          >
            تعلم ما يغير عالمك
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <button className="group inline-flex items-center gap-2 rounded-full gold-gradient px-8 py-4 text-base font-bold text-bg-primary hover:opacity-90 transition shadow-[0_8px_30px_rgba(212,168,83,0.3)]">
              اشترك الآن
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition" />
            </button>
            <button className="inline-flex items-center rounded-full border border-accent-gold/40 bg-bg-secondary/50 px-8 py-4 text-base font-semibold text-text-primary hover:border-accent-gold hover:bg-bg-secondary transition">
              سجل دخول الآن
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-sm text-text-secondary"
          >
            <div className="flex items-center gap-2">
              <CountUp to={landingStats.courses} suffix="+" />
              <span>دورة</span>
            </div>
            <div className="h-4 w-px bg-[rgba(212,168,83,0.3)] hidden sm:block" />
            <div className="flex items-center gap-2">
              <CountUp to={landingStats.consultancies} suffix="+" />
              <span>استشارة</span>
            </div>
            <div className="h-4 w-px bg-[rgba(212,168,83,0.3)] hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-accent-gold font-display">★</span>
              <span>شهادات معتمدة دولياً</span>
            </div>
          </motion.div>
        </div>

        {/* Instructor photo */}
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 order-1 lg:order-2 relative"
        >
          <div className="relative mx-auto max-w-md aspect-[4/5]">
            <div className="absolute -inset-4 gold-gradient opacity-20 blur-2xl rounded-full" />
            <div
              className="relative h-full w-full overflow-hidden bg-bg-tertiary"
              style={{
                clipPath:
                  "polygon(15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%, 0% 15%)",
              }}
            >
              <video
                src="https://public.emasteryacademy.com/intronosound.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover grayscale"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
            </div>
            {/* Floating accent */}
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full border border-accent-gold/40 backdrop-blur-sm" />
            <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full gold-gradient opacity-80" />
          </div>

          {/* Decorative dots */}
          <svg
            className="absolute -bottom-8 right-0 opacity-30"
            width="100"
            height="100"
            viewBox="0 0 100 100"
          >
            {Array.from({ length: 25 }).map((_, i) => (
              <circle
                key={i}
                cx={(i % 5) * 20 + 10}
                cy={Math.floor(i / 5) * 20 + 10}
                r="2"
                fill="#D4A853"
              />
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

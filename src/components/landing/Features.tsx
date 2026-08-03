import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { categories, landingStats } from "@/lib/landing-data";
import { toArabicDigits } from "@/lib/utils";

interface StickyCardProps {
  i: number;
  title: string;
  desc: string;
  image: string | null;
  progress: any;
  range: [number, number];
  targetScale: number;
}

const StickyCard = ({ i, title, desc, image, progress, range, targetScale }: StickyCardProps) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-28 flex items-center justify-center w-full min-h-[320px] py-4"
    >
      <m.div
        style={{
          scale,
          top: `calc(100px + ${i * 24}px)`,
        }}
        className="rounded-3xl border border-gold-border/20 bg-bg-card/95 backdrop-blur-sm p-6 md:p-8 flex flex-col sm:flex-row gap-6 h-[260px] md:h-[280px] w-full max-w-[550px] origin-top overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:border-gold-border/40 transition-colors duration-300"
      >
        {/* Content */}
        <div className="flex-1 flex flex-col justify-between text-right order-2 sm:order-1">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-gold-primary animate-pulse" />
              <h4 className="text-lg md:text-xl font-bold text-gold-primary font-display">
                {title}
              </h4>
            </div>
            <p className="text-text-secondary text-[11px] md:text-xs leading-relaxed line-clamp-4">
              {toArabicDigits(desc)}
            </p>
          </div>
          <div className="mt-2">
            <span className="text-xs font-semibold text-gold-primary font-sans underline cursor-pointer hover:text-gold-hover">
              استكشف التخصص ←
            </span>
          </div>
        </div>

        {/* Thumbnail Image */}
        <div className="w-full sm:w-[150px] h-[80px] sm:h-full rounded-2xl overflow-hidden bg-bg-elevated relative flex-shrink-0 order-1 sm:order-2">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover opacity-80"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full gold-gradient flex items-center justify-center font-display text-4xl font-black text-bg-primary">
              {title.charAt(0)}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card/40 to-transparent" />
        </div>
      </m.div>
    </div>
  );
};

export function Features() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const featureItems = categories.slice(0, 5).map((category) => ({
    title: category.name,
    desc:
      category.description || `برامج وتدريبات متخصصة في تخصص ${category.name} لتأهيلك لسوق العمل.`,
    image: category.image,
  }));

  const visualCategories = categories.slice(0, 4);

  return (
    <section ref={container} className="relative py-20 lg:py-28 bg-bg-primary overflow-visible">
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-gold-primary/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column (Sticky info block) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col justify-between py-6">
            <div>
              <p className="text-gold-primary text-sm font-semibold mb-2">لماذا ماستري؟</p>
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-text-primary leading-tight">
                اختر من{" "}
                <span className="text-gold-gradient">
                  {toArabicDigits(landingStats.categories)} أقسام
                </span>{" "}
                تعليمية متكاملة
              </h2>
              <p className="text-text-secondary text-sm mt-4 leading-relaxed max-w-md">
                مسارات تعليمية مخصصة، مراجعة وتوجيه فوري باستخدام الذكاء الاصطناعي الوكيل، وشهادات
                معتمدة دولياً تساعدك على تحقيق قفزتك المهنية التالية.
              </p>
            </div>

            <div className="mt-8 hidden lg:grid grid-cols-2 gap-4">
              {visualCategories.slice(0, 2).map((cat, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-2xl overflow-hidden border border-gold-border/25 relative bg-bg-card/40"
                >
                  {cat.image && (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-full w-full object-cover opacity-60"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 p-4 flex items-end bg-gradient-to-t from-bg-card via-bg-card/20 to-transparent">
                    <span className="text-xs font-bold text-text-primary">{cat.name}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button className="inline-flex items-center rounded-full gold-gradient px-8 py-4 text-base font-bold text-bg-primary hover:scale-[1.02] hover:shadow-[0_0_35px_var(--gold-glow)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 ease-supportive cursor-pointer">
                إشترك الآن وابدأ رحلتك
              </button>
            </div>
          </div>

          {/* Right Column (Stacked Cards Container) */}
          <div className="lg:col-span-7 flex flex-col relative pb-[10vh]">
            {featureItems.map((item, i) => {
              const targetScale = Math.max(0.65, 1 - (featureItems.length - i - 1) * 0.05);
              const step = 1 / featureItems.length;
              return (
                <StickyCard
                  key={i}
                  i={i}
                  title={item.title}
                  desc={item.desc}
                  image={item.image}
                  progress={scrollYProgress}
                  range={[i * step, 1]}
                  targetScale={targetScale}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

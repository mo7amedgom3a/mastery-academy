import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { categories, landingStats } from "@/lib/landing-data";
import { toArabicDigits } from "@/lib/utils";
import { GoldCard, GoldButton } from "@/components/ui/gold-elements";
import { 
  TrendingUp, 
  Briefcase, 
  HeartHandshake, 
  GraduationCap, 
  Coins, 
  ShieldCheck, 
  Cpu, 
  Palette,
  ArrowLeft
} from "lucide-react";

// Get appropriate category icon based on name
const getCategoryIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes("تسويق")) return TrendingUp;
  if (t.includes("ادارة") || t.includes("إدارة") || t.includes("أعمال")) return Briefcase;
  if (t.includes("مبيعات") || t.includes("عملاء")) return HeartHandshake;
  if (t.includes("بشرية") || t.includes("تدريب")) return GraduationCap;
  if (t.includes("مالية") || t.includes("محاسبة")) return Coins;
  if (t.includes("حوكمة")) return ShieldCheck;
  if (t.includes("ذكاء") || t.includes("معلومات") || t.includes("تقنية")) return Cpu;
  if (t.includes("تصميم") || t.includes("ميديا") || t.includes("فنون")) return Palette;
  return Briefcase;
};

// Get premium gradient styles for category fallbacks (removes plain letter placeholder)
const getCategoryGradients = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes("تسويق")) {
    return {
      gradient: "from-amber-500/10 to-transparent",
      iconBg: "bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]",
    };
  }
  if (t.includes("ادارة") || t.includes("إدارة") || t.includes("أعمال")) {
    return {
      gradient: "from-blue-500/10 to-transparent",
      iconBg: "bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
    };
  }
  if (t.includes("مبيعات") || t.includes("عملاء")) {
    return {
      gradient: "from-emerald-500/10 to-transparent",
      iconBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    };
  }
  if (t.includes("بشرية") || t.includes("تدريب")) {
    return {
      gradient: "from-purple-500/10 to-transparent",
      iconBg: "bg-purple-500/10 border-purple-500/30 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
    };
  }
  if (t.includes("مالية") || t.includes("محاسبة")) {
    return {
      gradient: "from-teal-500/10 to-transparent",
      iconBg: "bg-teal-500/10 border-teal-500/30 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.15)]",
    };
  }
  return {
    gradient: "from-gold-primary/10 to-transparent",
    iconBg: "bg-gold-muted/30 border-gold-border/40 text-gold-primary shadow-[0_0_15px_rgba(214,168,83,0.15)]",
  };
};

// Rich Arabic description fallbacks for first 5 categories to improve copy and aesthetic quality
const getCategoryDescription = (category: { name: string; description?: string | null }) => {
  if (category.description && category.description.trim().length > 0) {
    return category.description;
  }
  const name = category.name;
  if (name.includes("تسويق")) {
    return "اكتسب مهارات إطلاق الحملات الإعلانية المبتكرة، إدارة منصات التواصل الاجتماعي، واستراتيجيات التسويق الرقمي القائم على البيانات لزيادة المبيعات والانتشار.";
  }
  if (name.includes("ادارة") || name.includes("إدارة") || name.includes("أعمال")) {
    return "تعلم أسس التخطيط الاستراتيجي، إدارة المشاريع الاحترافية، وتطوير نماذج الأعمال للشركات الصغيرة والمتوسطة لبناء مؤسسات مستدامة وناجحة.";
  }
  if (name.includes("مبيعات") || name.includes("عملاء")) {
    return "أتقن تقنيات الإقناع، إغلاق الصفقات الكبرى، وإدارة علاقات العملاء لتقديم تجارب استثنائية وبناء ولاء حقيقي لعلامتك التجارية.";
  }
  if (name.includes("بشرية") || name.includes("تدريب")) {
    return "تعرف على أحدث استراتيجيات استقطاب الكفاءات، إدارة الأداء، وتطوير بيئات العمل المحفزة التي تدفع بإنتاجية الموظفين نحو القمة.";
  }
  if (name.includes("مالية") || name.includes("محاسبة")) {
    return "افهم القوائم المالية، التحليل الاستثماري، التخطيط الضريبي، وإدارة التدفقات النقدية لاتخاذ قرارات تمويلية ذكية ومدروسة للمشاريع.";
  }
  return `برامج وتدريبات متخصصة في تخصص ${name} لتأهيلك لسوق العمل وتطوير مهاراتك القيادية والعملية.`;
};

interface FeatureCardProps {
  title: string;
  desc: string;
  image: string | null;
  i: number;
}

const FeatureCard = ({ title, desc, image, i }: FeatureCardProps) => {
  const IconComponent = getCategoryIcon(title);
  const visualStyles = getCategoryGradients(title);

  return (
    <GoldCard
      className="feature-card rounded-3xl border border-gold-border/25 bg-bg-card/95 backdrop-blur-sm p-6 md:p-8 flex flex-col sm:flex-row gap-6 w-full max-w-[550px] overflow-hidden shadow-card-custom hover:border-gold-border/50 hover:shadow-card-hover transition-colors duration-300 h-auto sm:h-[280px]"
    >
      <div className="flex-1 flex flex-col justify-between text-right order-2 sm:order-1">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-gold-primary animate-pulse" />
            <h4 className="text-lg md:text-xl font-bold text-gold-primary font-display">
              {title}
            </h4>
          </div>
          <p className="text-text-secondary text-xs leading-relaxed line-clamp-4 font-normal">
            {toArabicDigits(desc)}
          </p>
        </div>
        <div className="mt-4">
          <span className="text-xs font-semibold text-gold-primary font-sans underline cursor-pointer hover:text-gold-hover inline-flex items-center gap-1.5 transition-colors">
            <span>استكشف التخصص</span>
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          </span>
        </div>
      </div>

      <div className="w-full sm:w-[150px] h-[100px] sm:h-full rounded-2xl overflow-hidden bg-bg-elevated relative flex-shrink-0 order-1 sm:order-2 flex items-center justify-center border border-border-subtle/50">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover opacity-80 transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br ${visualStyles.gradient}`}>
            <div className={`h-12 w-12 rounded-full flex items-center justify-center border transition-transform duration-300 hover:scale-110 ${visualStyles.iconBg}`}>
              <IconComponent className="h-5 w-5" />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(rgba(214,168,83,0.15)_1px,transparent_1px)] [background-size:12px_12px] opacity-10 pointer-events-none" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card/40 to-transparent pointer-events-none" />
      </div>
    </GoldCard>
  );
};

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const featureItems = categories.slice(0, 5).map((category) => ({
    title: category.name,
    desc: getCategoryDescription(category),
    image: category.image,
  }));

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".feature-card");
    if (!cards.length) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.set(cards, {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: (i) => i + 1,
      });

      gsap.set(cards[0], {
        y: 0,
        scale: 1,
        opacity: 1,
      });

      // Pushed cards slightly further down initially for a cleaner entry
      gsap.set(cards.slice(1), {
        y: 600, 
        scale: 0.9,
        opacity: 0,
        transformOrigin: "top center",
      });

      const totalCards = cards.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "features-trigger",
          trigger: containerRef.current,
          // 1. Pin exactly at the top of the viewport to ensure it fills the screen
          start: "top top", 
          // 2. Extended the scroll duration slightly to compensate for the initial pause
          end: () => `+=${window.innerHeight * totalCards}`, 
          scrub: 1, 
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const activeIdx = Math.round(progress * (totalCards - 1));
            setActiveIndex((prev) => (prev !== activeIdx ? activeIdx : prev));
          }
        },
      });

      // 3. THE FIX: Add an empty tween at the very start of the timeline.
      // This forces the user to scroll a bit while the section is pinned 
      // BEFORE the first card begins moving, giving them time to see the layout.
      tl.to({}, { duration: 0.8 });

      cards.forEach((card, index) => {
        if (index === 0) return;

        const label = `slide-${index}`;

        for (let j = 0; j < index; j++) {
          const depth = index - j;
          tl.to(
            cards[j],
            {
              y: j * 30 - depth * 18, 
              scale: 1 - depth * 0.03, 
              opacity: Math.max(0.4, 1 - depth * 0.18), 
              duration: 1,
              ease: "none", 
            },
            label
          );
        }

        tl.to(
          card,
          {
            y: index * 30,
            scale: 1,
            opacity: 1,
            duration: 1, 
            ease: "none", 
          },
          label
        )
        .to({}, { duration: 0.4 });
      });
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.set(cards, {
        position: "relative",
        y: 0,
        scale: 1,
        opacity: 1,
        clearProps: "all",
      });

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => {
      mm.revert();
    };
  }, { scope: containerRef, dependencies: [] });

  const handleIndicatorClick = (index: number) => {
    if (window.innerWidth < 1024) return;
    const trigger = ScrollTrigger.getById("features-trigger");
    if (!trigger) return;
    
    const start = trigger.start;
    const end = trigger.end;
    const progress = index / (featureItems.length - 1);
    const scrollPos = start + (end - start) * progress;
    
    window.scrollTo({
      top: scrollPos,
      behavior: "smooth"
    });
  };

  return (
    <section ref={containerRef} className="relative py-20 lg:py-28 overflow-visible">
      <div className="pointer-events-none absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-gold-primary/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 flex flex-col justify-between py-6 h-full">
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

            <div className="mt-8 hidden lg:flex flex-col gap-3 max-w-md">
              {featureItems.map((item, index) => {
                const IconComponent = getCategoryIcon(item.title);
                const isActive = activeIndex === index;
                return (
                  <button
                    key={index}
                    onClick={() => handleIndicatorClick(index)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-right transition-all duration-300 w-full cursor-pointer hover:border-gold-border/60 ${
                      isActive
                        ? "border-gold-primary bg-gold-muted text-gold-primary shadow-[0_0_15px_rgba(214,168,83,0.05)]"
                        : "border-border-subtle/50 text-text-secondary bg-transparent"
                    }`}
                  >
                    <IconComponent className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs font-semibold font-display">
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8">
              <GoldButton className="px-8 py-3.5 text-sm font-bold shadow-gold-cta hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300">
                إشترك الآن وابدأ رحلتك
              </GoldButton>
            </div>
          </div>

          <div className="lg:col-span-7 relative w-full flex flex-col items-center pt-16 lg:pt-20">
            <div className="relative flex flex-col lg:block gap-6 lg:gap-0 w-full max-w-[550px] lg:h-[400px]">
              {featureItems.map((item, i) => (
                <FeatureCard
                  key={i}
                  i={i}
                  title={item.title}
                  desc={item.desc}
                  image={item.image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
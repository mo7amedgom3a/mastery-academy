import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, ShieldCheck, Gift, Layers, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { packagesDb } from "@/lib/extended-data";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { GoldCard, GoldButton } from "@/components/ui/gold-elements";
import { toArabicDigits } from "@/lib/utils";

export function PackagesPage() {
  const handlePurchase = (title: string) => {
    toast.success(`تم تسجيل اهتمامك بحزمة "${title}"! سيتواصل معك فريق القبول والتسجيل فوراً لتزويدك بتفاصيل وطرق الدفع المعتمدة.`);
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col justify-between" dir="rtl">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-gold-muted text-gold-primary border border-gold-border/30 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
              وفر أكثر من 50% مع الحزم المشتركة
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-text-primary leading-tight mb-6">
              باقات وحزم ماستري الأكاديمية
            </h1>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              اختر إحدى الباقات والمسارات التعليمية المتكاملة التي تجمع عدة دبلومات وبرامج تدريبية متخصصة ومصممة خصيصاً لتجهيزك لسوق العمل بكفاءة عالية وبأقل تكلفة استثمارية ممكنة.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { title: "قيمة وتوفير أكبر", desc: "ادرس عدة تخصصات مرتبطة ووفر أكثر من 50% مقارنة بالاشتراك في كل دبلوم على حدة.", icon: Gift },
              { title: "مسارات متكاملة متوازية", desc: "منهجية علمية مرتبة ومترابطة تأخذك من مرحلة الصفر المطلق إلى الاحتراف والقيادة.", icon: Layers },
              { title: "دعم واستشارات حصرية", desc: "جميع باقاتنا وحزمنا تحتوي على استشارات فنية فردية وجلسات توجيه مباشرة مع الخبراء.", icon: ShieldCheck }
            ].map((b, idx) => {
              const Icon = b.icon;
              return (
                <GoldCard key={idx} className="p-6 border-gold-border/15 flex items-start gap-4">
                  <div className="p-3 bg-bg-elevated text-gold-primary rounded-xl border border-gold-border/20 flex-shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary text-base mb-1.5">{b.title}</h3>
                    <p className="text-text-secondary text-xs leading-relaxed">{b.desc}</p>
                  </div>
                </GoldCard>
              );
            })}
          </div>

          {/* Packages List */}
          <div className="space-y-12">
            {packagesDb.map((p, idx) => (
              <GoldCard key={p.id} className="overflow-hidden hover:border-gold-border/40 transition duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Left Column: Image and enrolled courses (5 cols) */}
                  <div className="lg:col-span-5 relative h-72 lg:h-full min-h-[300px] overflow-hidden bg-bg-elevated flex flex-col justify-between p-6">
                    <img src={p.image} alt={p.title} className="absolute inset-0 h-full w-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/70 to-transparent" />
                    
                    <div className="relative z-10">
                      <span className="inline-block bg-gold-primary text-bg-primary text-[10px] font-bold px-2 py-0.5 rounded-full mb-4">باقة متكاملة</span>
                      <h3 className="text-xl font-bold text-text-primary mb-2">الدورات والبرامج المشمولة:</h3>
                    </div>

                    <div className="relative z-10 space-y-3.5">
                      {p.courses.map((course) => (
                        <Link key={course.id} to={`/course/${course.id}`} className="block p-3 rounded-xl border border-gold-border/15 bg-bg-card/80 hover:border-gold-primary hover:bg-bg-card transition">
                          <h4 className="text-xs font-bold text-text-primary truncate">{course.title}</h4>
                          <div className="flex items-center justify-between mt-1 text-[10px] text-text-secondary">
                            <span>بإشراف: {course.instructor}</span>
                            <span className="text-gold-primary font-semibold">عرض تفاصيل الدورة ←</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Info and Buy CTA (7 cols) */}
                  <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between text-right">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-4 leading-tight">
                        {p.title}
                      </h2>
                      <p className="text-text-secondary text-xs md:text-sm leading-relaxed mb-6">
                        {toArabicDigits(p.desc)}
                      </p>

                      <div className="space-y-3 mb-8">
                        <h4 className="font-bold text-text-primary text-xs md:text-sm">مميزات وإضافات الباقة:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {p.features.map((feat, fIdx) => (
                            <li key={fIdx} className="text-text-secondary text-xs leading-relaxed flex items-start gap-2">
                              <Check className="h-4 w-4 text-gold-primary flex-shrink-0" />
                              <span>{toArabicDigits(feat)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div className="flex items-baseline gap-3">
                        <div>
                          <p className="text-[10px] text-text-secondary mb-1">استثمار الباقة المخفض:</p>
                          <span className="metric-number font-serif text-4xl font-bold text-gold-primary">{toArabicDigits(p.price)}</span>
                        </div>
                        <span className="text-text-muted line-through text-lg mt-4">{toArabicDigits(p.originalPrice)}</span>
                      </div>
                      <GoldButton onClick={() => handlePurchase(p.title)} className="px-8 py-3.5 rounded-full flex items-center justify-center gap-2 font-bold text-xs">
                        <ShoppingBag className="h-4 w-4" /> اشترك الآن في الحزمة
                      </GoldButton>
                    </div>
                  </div>

                </div>
              </GoldCard>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

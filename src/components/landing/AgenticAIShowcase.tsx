import { motion } from "framer-motion";
import { Cpu, UserCheck, Compass, Users, ArrowLeftRight, Zap, Sparkles } from "lucide-react";
import { GoldCard } from "@/components/ui/gold-elements";
import { toArabicDigits } from "@/lib/utils";

const aiAgents = [
  {
    Icon: Cpu,
    title: "المساعد الذكي (AI Assistant)",
    desc: "دعم تعليمي على مدار الساعة يجيب عن أسئلتك، يحلل المفاهيم المعقدة، ويقدم أمثلة وتطبيقات عملية فورية تناسب طريقة فهمك.",
    badge: "تفاعل لحظي"
  },
  {
    Icon: UserCheck,
    title: "المُراجع الآلي (AI Reviewer)",
    desc: "يقوم بمراجعة المشاريع، الأكواد، وخطط الأعمال فور تسليمها، ويمنحك تقييماً مفصلاً وسريعاً يوضح نقاط القوة وفرص التطوير.",
    badge: "تقييم فوري"
  },
  {
    Icon: Compass,
    title: "الموجّه الفردي (AI Mentor)",
    desc: "مرشد ذكي يتابع خطة دراستك، يقترح تحديات تناسب مستواك، ويعيد صياغة المنهج بشكل ديناميكي بناءً على وتيرة تقدمك المالي والمهني.",
    badge: "مسار متكيف"
  },
  {
    Icon: Users,
    title: "الزميل الافتراضي (Peer Learning Agent)",
    desc: "وكيل ذكاء اصطناعي يدرس معك في نفس المجموعة، يشارك في حل المشاريع الجماعية، ويتفاعل معك لتطبيق تجربة التعليم التعاوني الفعال.",
    badge: "تعليم تفاعلي"
  }
];

const transformationSteps = [
  {
    title: "التعليم التقليدي",
    points: [
      "فيديوهات مسجلة وتلقي سلبي دون تفاعل حقيقي.",
      "انتظار أيام أو أسابيع للحصول على تقييم الواجبات والمشاريع.",
      "منهج خطي ثابت يُفرض على جميع الطلاب بنفس الطريقة.",
      "الشعور بالعزلة والملل أثناء التعلم الذاتي المنفرد."
    ],
    isTraditional: true
  },
  {
    title: "عصر التعليم الوكيل (Agentic AI)",
    points: [
      "بيئة تعلم تفاعلية تشاركية عبر وكلاء أذكياء يرافقونك خطوة بخطوة.",
      "مراجعة ذكية وتقييم فوري لخططك وأعمالك خلال ثوانٍ معدودة.",
      "مسارات مرنة وتخصيص ذكي يتوافق مع أهدافك المهنية الخاصة.",
      "تفاعل مستمر مع أقران وموجهين افتراضيين لكسر رتابة الدراسة."
    ],
    isTraditional: false
  }
];

export function AgenticAIShowcase() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-bg-primary" id="agentic-ai">
      {/* Background Glows */}
      <div className="pointer-events-none absolute top-1/4 right-0 h-[600px] w-[600px] rounded-full bg-gold-primary/5 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 h-[600px] w-[600px] rounded-full bg-gold-primary/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-border bg-gold-muted px-4 py-1.5 text-xs text-gold-primary mb-4"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            ثورة التعليم المهني في الشرق الأوسط
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl lg:text-6xl font-display font-black text-text-primary leading-tight"
          >
            أول منصة تعليمية تعتمد على <span className="text-gold-gradient">الذكاء الاصطناعي الوكيل</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg text-text-secondary leading-relaxed"
          >
            ننقل التعليم والتدريب من الأسلوب التلقيني التقليدي إلى عصر التفاعل الحقيقي والوكلاء الأذكياء الذين يدرسون معك، يراجعون مهامك، ويوجهون مسارك المهني بشكل كامل.
          </motion.p>
        </div>

        {/* Transformation Section (Traditional vs Agentic AI) */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Traditional Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="bg-bg-card/40 border border-border-subtle rounded-3xl p-8 hover:border-red-alert/20 transition-all duration-300">
                <h3 className="text-2xl font-bold text-text-secondary mb-6 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-red-alert" />
                  {transformationSteps[0].title}
                </h3>
                <ul className="space-y-4">
                  {transformationSteps[0].points.map((pt, idx) => (
                    <li key={idx} className="text-text-muted text-sm leading-relaxed flex items-start gap-2.5">
                      <span className="font-serif font-bold text-red-alert/50 mt-0.5">{toArabicDigits(idx + 1)}.</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Middle Switch Icon */}
            <div className="lg:col-span-2 flex justify-center py-4 lg:py-0 relative z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-full gold-gradient text-bg-primary shadow-[0_0_25px_var(--gold-glow)]">
                <ArrowLeftRight className="h-6 w-6 rotate-90 lg:rotate-0" />
              </div>
            </div>

            {/* Agentic AI Era Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <GoldCard className="p-8 hover:border-gold-border/60">
                <h3 className="text-2xl font-bold text-gold-primary mb-6 flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-gold-primary animate-ping" />
                  {transformationSteps[1].title}
                </h3>
                <ul className="space-y-4">
                  {transformationSteps[1].points.map((pt, idx) => (
                    <li key={idx} className="text-text-primary text-sm leading-relaxed flex items-start gap-2.5">
                      <span className="font-serif font-bold text-gold-primary mt-0.5">{toArabicDigits(idx + 1)}.</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </GoldCard>
            </motion.div>

          </div>
        </div>

        {/* Feature Grid: AI Agents Ecosystem */}
        <div>
          <div className="text-center mb-16">
            <h3 className="text-3xl font-display font-bold text-text-primary mb-4">منظومة الوكلاء الأذكياء لتعزيز رحلتك</h3>
            <p className="text-text-secondary text-sm max-w-xl mx-auto">أربعة وكلاء أذكياء يتكاملون معاً لبناء تجربة تعليمية فريدة وتطوير قدراتك بسرعة فائقة.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiAgents.map((agent, idx) => {
              const IconComp = agent.Icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <GoldCard className="p-6 h-full flex flex-col justify-between hover:-translate-y-1.5 cursor-pointer">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="p-3 bg-bg-elevated rounded-2xl text-gold-primary border border-gold-border/20">
                          <IconComp className="h-6 w-6" />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-muted text-gold-primary border border-gold-border/30">
                          {agent.badge}
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-bold text-text-primary leading-snug mb-3">
                        {agent.title}
                      </h4>
                      
                      <p className="text-text-secondary text-xs leading-relaxed">
                        {toArabicDigits(agent.desc)}
                      </p>
                    </div>
                  </GoldCard>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

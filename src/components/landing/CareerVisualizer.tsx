import { useState, useMemo } from "react";
import { m } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  Briefcase, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft,
  GraduationCap
} from "lucide-react";
import { toArabicDigits } from "@/lib/utils";
import { GoldCard } from "@/components/ui/gold-elements";

type SpecialtyKey = "management" | "marketing" | "finance" | "law";

interface SpecialtyData {
  title: string;
  diplomaName: string;
  tuition: number;
  baseSalaryMultiplier: number;
  stages: {
    role: string;
    salary: number;
    skills: string[];
  }[];
}

const specialties: Record<SpecialtyKey, SpecialtyData> = {
  management: {
    title: "إدارة الأعمال والقيادة (Mini MBA)",
    diplomaName: "الماجستير المهني المصغر في إدارة الأعمال",
    tuition: 450,
    baseSalaryMultiplier: 1.35,
    stages: [
      { role: "منسق عمليات", salary: 1200, skills: ["تنظيم المهام", "أساسيات الإدارة", "التواصل الفعال"] },
      { role: "قائد فريق", salary: 2200, skills: ["إدارة المشاريع", "القيادة والتحفيز", "حل المشكلات"] },
      { role: "مدير تشغيل", salary: 3800, skills: ["التخطيط الاستراتيجي", "إدارة الميزانيات", "تحسين الأداء"] },
      { role: "مدير تنفيذي", salary: 7000, skills: ["صنع القرار", "حوكمة الشركات", "التطوير المؤسسي"] }
    ]
  },
  marketing: {
    title: "التسويق الرقمي والمبيعات",
    diplomaName: "دبلوم التسويق الرقمي المتكامل",
    tuition: 350,
    baseSalaryMultiplier: 1.40,
    stages: [
      { role: "مساعد تسويق", salary: 900, skills: ["إدارة التواصل الاجتماعي", "كتابة المحتوى", "أساسيات التصميم"] },
      { role: "أخصائي تسويق رقمي", salary: 1800, skills: ["الإعلانات الممولة", "تحسين محركات البحث SEO", "تحليل البيانات"] },
      { role: "مدير تسويق", salary: 3200, skills: ["استراتيجيات النمو", "إدارة الحملات الضخمة", "قيادة الفرق الإعلانية"] },
      { role: "مدير نمو (CGO)", salary: 6000, skills: ["علاقات العملاء المتكاملة", "تطوير الأعمال", "التسويق الإستراتيجي"] }
    ]
  },
  finance: {
    title: "المالية والاستثمار والتحليل",
    diplomaName: "دبلوم الإدارة المالية والاستثمار",
    tuition: 400,
    baseSalaryMultiplier: 1.38,
    stages: [
      { role: "محاسب مبتدئ", salary: 1100, skills: ["القيود المحاسبية", "إعداد القوائم المالية", "البرامج المحاسبية"] },
      { role: "محلل مالي", salary: 2200, skills: ["تحليل الجدوى الاستثمارية", "تقييم الشركات", "النمذجة المالية"] },
      { role: "مدير مالي", salary: 4000, skills: ["إدارة المخاطر", "التخطيط الضريبي والمالي", "إدارة النقدية"] },
      { role: "مدير مالي تنفيذي (CFO)", salary: 8500, skills: ["دمج واستحواذ", "استراتيجيات الاستثمار الدولي", "الهيكلة المالية"] }
    ]
  },
  law: {
    title: "القانون التجاري والشركات",
    diplomaName: "دبلوم القانون التجاري والشركات",
    tuition: 480,
    baseSalaryMultiplier: 1.30,
    stages: [
      { role: "مساعد قانوني", salary: 1300, skills: ["صياغة العقود البسيطة", "البحث القانوني", "مراجعة المستندات"] },
      { role: "مستشار قانوني شركات", salary: 2600, skills: ["التحكيم التجاري", "عقود التأسيس والاندماج", "الملكية الفكرية"] },
      { role: "مدير الإدارة القانونية", salary: 4500, skills: ["إدارة النزاعات القضائية", "حوكمة الشركات الكبرى", "الامتثال القانوني"] },
      { role: "شريك قانوني / خبير دولي", salary: 9000, skills: ["الاستشارات السيادية والشركات العابرة للقارات", "التشريعات الدولية"] }
    ]
  }
};

export function CareerVisualizer() {
  const [specialty, setSpecialty] = useState<SpecialtyKey>("management");
  const [currentSalary, setCurrentSalary] = useState<number>(1500);
  const [studyHours, setStudyHours] = useState<number>(6);

  const selectedData = specialties[specialty];

  const calculatedMetrics = useMemo(() => {
    // Math to compute ROI
    const salaryBoostPercent = (selectedData.baseSalaryMultiplier - 1) * (1 + (studyHours - 4) * 0.03);
    const targetSalaryBoost = currentSalary * Math.max(0.1, Math.min(salaryBoostPercent, 0.65));
    
    // Average time to double career growth speed
    const baseYearsToPromotion = 4;
    const masteryYearsToPromotion = Math.max(1.5, 4 - (studyHours * 0.15));

    // 3 Year earnings calculations
    let selfStudyTotal = 0;
    let masteryTotal = 0;
    let tempSelf = currentSalary;
    let tempMastery = currentSalary;

    for (let month = 1; month <= 36; month++) {
      // Self-study salary increases by ~0.4% monthly (~5% annual)
      tempSelf += tempSelf * 0.004;
      selfStudyTotal += tempSelf;

      // Mastery salary increases faster after month 6 (when graduation occurs)
      if (month > 6) {
        // Boost factor depending on study commitment
        tempMastery += tempMastery * (0.004 + (salaryBoostPercent / 18));
      } else {
        tempMastery += tempMastery * 0.006;
      }
      masteryTotal += tempMastery;
    }

    const netUplift = Math.round(masteryTotal - selfStudyTotal - selectedData.tuition);
    const monthsToRecover = Math.max(1, Math.round(selectedData.tuition / (tempMastery - tempSelf)));
    
    // Completion rate model
    let completionRate = 93;
    if (studyHours < 4) completionRate = 82;
    if (studyHours > 12) completionRate = 96;

    return {
      monthlySalaryIncrease: Math.round(tempMastery - tempSelf),
      netUplift,
      monthsToRecover,
      completionRate,
      masteryYearsToPromotion: masteryYearsToPromotion.toFixed(1),
      baseYearsToPromotion
    };
  }, [specialty, currentSalary, studyHours, selectedData]);



  const chartData = useMemo(() => {
    const data = [];
    let selfSalary = currentSalary;
    let masterySalary = currentSalary;
    const salaryBoostPercent = (selectedData.baseSalaryMultiplier - 1) * (1 + (studyHours - 4) * 0.03);

    for (let year = 0; year <= 5; year++) {
      data.push({
        year: `السنة ${year}`,
        "التعلم الذاتي التقليدي": Math.round(selfSalary),
        "تسريع مسار ماستري": Math.round(masterySalary)
      });

      // Compound yearly growth
      selfSalary *= 1.05; // 5% growth
      masterySalary *= (1.05 + salaryBoostPercent * 0.5); // Accelerated growth
    }
    return data;
  }, [currentSalary, studyHours, selectedData]);

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative py-24 lg:py-32 bg-bg-primary overflow-hidden" id="roi-calculator">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-primary font-display text-lg font-bold tracking-wider block mb-3">
            حساب العائد والاستثمار المهني
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-text-primary mb-6 leading-tight">
            لا تدرس لمجرد التعلم، خطط لمسارك المهني
          </h2>
          <p className="text-text-secondary text-lg lg:text-xl leading-relaxed">
            استخدم محاكي المسار الوظيفي التفاعلي لتحديد التخصص وقياس الفارق المالي والسرعة التي ستحقق بها ترقيتك القادمة مقارنة بالتعلم الفردي.
          </p>
        </div>

        {/* Main Interface Wrapper */}
        <m.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          
          {/* Right Column: Parameters (Input Panel) */}
          <m.div 
            variants={itemVariants}
            className="lg:col-span-5"
          >
            <GoldCard className="p-8 lg:p-10 h-full flex flex-col justify-between hover:border-gold-border/30">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-bg-elevated rounded-2xl text-gold-primary border border-gold-border/20">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-text-primary">لوحة تخصيص البيانات</h3>
                    <p className="text-text-secondary text-sm mt-0.5">أدخل معاييرك الحالية لتخصيص محاكي العائد</p>
                  </div>
                </div>

                {/* Parameter 1: Specialty */}
                <div className="mb-6">
                  <label className="block text-sm font-bold mb-3 text-text-primary">
                    1. اختر التخصص المستهدف:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {(Object.keys(specialties) as SpecialtyKey[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => setSpecialty(key)}
                        className={`p-3.5 rounded-xl border text-right text-xs font-semibold transition-all duration-300 cursor-pointer ${
                          specialty === key 
                          ? "bg-bg-elevated text-gold-primary border-gold-primary shadow-md" 
                          : "bg-bg-primary/50 text-text-secondary border-border-subtle hover:bg-bg-elevated"
                        }`}
                      >
                        {key === "management" && "إدارة الأعمال"}
                        {key === "marketing" && "التسويق الرقمي"}
                        {key === "finance" && "المالية والاستثمار"}
                        {key === "law" && "القانون التجاري"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Parameter 2: Salary Slider */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-text-primary">
                      2. الراتب الشهري الحالي ($):
                    </label>
                    <span className="metric-number font-serif text-lg font-bold bg-bg-elevated px-3 py-1 rounded-lg">
                      ${toArabicDigits(currentSalary.toLocaleString("en-US"))}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="8000"
                    step="100"
                    value={currentSalary}
                    onChange={(e) => setCurrentSalary(Number(e.target.value))}
                    className="w-full h-2 bg-bg-elevated rounded-lg appearance-none cursor-pointer accent-gold-primary"
                    style={{
                      background: `linear-gradient(to left, var(--gold-primary) 0%, var(--gold-primary) ${((currentSalary - 300) / 7700) * 100}%, var(--bg-elevated) ${((currentSalary - 300) / 7700) * 100}%, var(--bg-elevated) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-[10px] text-text-secondary mt-1.5 font-sans font-medium">
                    <span>${toArabicDigits("300")}</span>
                    <span>${toArabicDigits("4,000")}</span>
                    <span>${toArabicDigits("8,000")}</span>
                  </div>
                </div>

                {/* Parameter 3: Study Hours Slider */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-text-primary">
                      3. ساعات الدراسة الأسبوعية:
                    </label>
                    <span className="metric-number font-serif text-lg font-bold bg-bg-elevated px-3 py-1 rounded-lg">
                      {toArabicDigits(studyHours)} ساعات
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    step="1"
                    value={studyHours}
                    onChange={(e) => setStudyHours(Number(e.target.value))}
                    className="w-full h-2 bg-bg-elevated rounded-lg appearance-none cursor-pointer accent-gold-primary"
                    style={{
                      background: `linear-gradient(to left, var(--gold-primary) 0%, var(--gold-primary) ${((studyHours - 2) / 18) * 100}%, var(--bg-elevated) ${((studyHours - 2) / 18) * 100}%, var(--bg-elevated) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-[10px] text-text-secondary mt-1.5 font-sans font-medium">
                    <span>{toArabicDigits("2")} ساعات (تعلم خفيف)</span>
                    <span>{toArabicDigits("10")} ساعات (معتدل)</span>
                    <span>{toArabicDigits("20")} ساعة (مكثف)</span>
                  </div>
                </div>
              </div>

              {/* Supportive metric statement */}
              <div className="pt-6 border-t border-border-subtle">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-bg-elevated text-gold-primary mt-1 border border-gold-border/10">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    مستوى الالتزام بـ <strong className="text-gold-primary">{toArabicDigits(studyHours)} ساعات</strong> يمنحك نسبة نجاح وإتمام تبلغ <strong className="text-gold-primary">{toArabicDigits(calculatedMetrics.completionRate)}%</strong> للدبلوم المعتمد.
                  </p>
                </div>
              </div>
            </GoldCard>
          </m.div>

          {/* Left Column: Visual Dashboard (Output Panel) */}
          <m.div 
            variants={itemVariants}
            className="lg:col-span-7 flex flex-col justify-between gap-6"
          >
            
            {/* Top row: 3 Key Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Metric 1 */}
              <GoldCard className="p-6 flex flex-col justify-between hover:border-gold-border/40">
                <div className="flex items-center justify-between mb-3 text-text-secondary">
                  <span className="text-xs font-semibold">استرداد الرسوم</span>
                  <Clock className="h-4 w-4 text-gold-primary" />
                </div>
                <div>
                  <h4 className="metric-number font-serif text-3xl font-bold mb-1">
                    {toArabicDigits(calculatedMetrics.monthsToRecover)} <span className="text-sm font-sans font-normal text-text-secondary">أشهر</span>
                  </h4>
                  <p className="text-text-secondary text-[11px] leading-relaxed">
                    متوسط الفترة اللازمة لاستعادة تكلفة الاستثمار التعليمي بالكامل.
                  </p>
                </div>
              </GoldCard>

              {/* Metric 2 */}
              <GoldCard className="p-6 flex flex-col justify-between hover:border-gold-border/40">
                <div className="flex items-center justify-between mb-3 text-text-secondary">
                  <span className="text-xs font-semibold">العائد المالي الصافي</span>
                  <TrendingUp className="h-4 w-4 text-green-success" />
                </div>
                <div>
                  <h4 className="metric-number font-serif text-3xl font-bold mb-1 text-green-success">
                    +{toArabicDigits(`$${calculatedMetrics.netUplift.toLocaleString("en-US")}`)}
                  </h4>
                  <p className="text-text-secondary text-[11px] leading-relaxed">
                    صافي الأرباح المالية الإضافية المكتسبة على مدار 3 سنوات مقبلة.
                  </p>
                </div>
              </GoldCard>

              {/* Metric 3 */}
              <GoldCard className="p-6 flex flex-col justify-between hover:border-gold-border/40">
                <div className="flex items-center justify-between mb-3 text-text-secondary">
                  <span className="text-xs font-semibold">سرعة الترقي المهني</span>
                  <Sparkles className="h-4 w-4 text-gold-primary" />
                </div>
                <div>
                  <h4 className="metric-number font-serif text-3xl font-bold mb-1">
                    {toArabicDigits(calculatedMetrics.masteryYearsToPromotion)} <span className="text-sm font-sans font-normal text-text-secondary">سنة</span>
                  </h4>
                  <p className="text-text-secondary text-[11px] leading-relaxed">
                    المدة المتوقعة لنيل الترقية التالية مقارنة بـ {toArabicDigits(calculatedMetrics.baseYearsToPromotion)} سنوات بالتعلم الذاتي.
                  </p>
                </div>
              </GoldCard>

            </div>

            {/* Middle row: Recharts Trajectory Graph */}
            <GoldCard className="p-6 lg:p-8 hover:border-gold-border/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-text-primary">مسار النمو المالي المتوقع (5 سنوات)</h3>
                  <p className="text-text-secondary text-xs mt-1">مقارنة توقعات نمو الدخل السنوي بالاعتماد على دراسة دبلوم ماستري</p>
                </div>
                {/* Legend indicator */}
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5 text-gold-primary">
                    <span className="w-2.5 h-2.5 rounded-full bg-gold-primary" />
                    <span>ماستري</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-text-secondary">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                    <span>تعلم ذاتي</span>
                  </div>
                </div>
              </div>

              {/* Recharts Wrapper */}
              <div className="h-72 w-full font-sans">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorMastery" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4A853" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#D4A853" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorSelf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#475569" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#475569" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.3} />
                    <XAxis 
                      dataKey="year" 
                      stroke="#8A8799" 
                      fontSize={11}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#8A8799" 
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(val) => `$${toArabicDigits(val.toLocaleString("en-US"))}`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#111118", 
                        borderColor: "var(--gold-border)",
                        borderRadius: "12px",
                        color: "#F0EDE8",
                        fontSize: "12px",
                        textAlign: "right"
                      }}
                      itemStyle={{ color: "#F0EDE8" }}
                      formatter={(value: any, name: any) => [`$${toArabicDigits(value.toLocaleString("en-US"))}`, name]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="تسريع مسار ماستري" 
                      stroke="#D4A853" 
                      strokeWidth={2.5}
                      fillOpacity={1} 
                      fill="url(#colorMastery)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="التعلم الذاتي التقليدي" 
                      stroke="#475569" 
                      strokeWidth={1.5}
                      fillOpacity={1} 
                      fill="url(#colorSelf)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GoldCard>

            {/* Bottom row: Career Milestone Pipeline */}
            <GoldCard className="p-6 hover:border-gold-border/30">
              <h3 className="text-text-primary font-display text-lg font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-gold-primary" />
                تطور المسؤوليات والمهارات المستهدفة
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                {/* Horizontal line for desktop stepper */}
                <div className="absolute top-7 left-8 right-8 h-[2px] bg-slate-800 hidden sm:block pointer-events-none" />

                {selectedData.stages.map((stage, idx) => (
                  <div key={idx} className="relative z-10 text-right sm:text-center group">
                    <div className="flex sm:flex-col items-center gap-4 sm:gap-2">
                      {/* Step Circle */}
                      <div className="w-9 h-9 rounded-full bg-bg-elevated border border-gold-border/20 flex items-center justify-center font-serif font-bold text-xs text-gold-primary group-hover:border-gold-primary group-hover:scale-105 transition-all duration-300">
                        {toArabicDigits(idx + 1)}
                      </div>
                      
                      {/* Details */}
                      <div>
                        <h4 className="text-text-primary text-xs font-bold leading-tight group-hover:text-gold-primary transition duration-200">
                          {stage.role}
                        </h4>
                        <span className="text-[10px] text-gold-primary font-serif font-bold block mt-0.5">
                          ~ ${toArabicDigits(stage.salary.toLocaleString("en-US"))}/شهرياً
                        </span>
                      </div>
                    </div>

                    {/* Popover skills list shown in small text */}
                    <div className="mt-2 text-right sm:text-center sm:mx-auto max-w-none sm:max-w-[140px] w-full">
                      <div className="flex flex-wrap gap-1 justify-start sm:justify-center">
                        {stage.skills.map((skill, sIdx) => (
                          <span 
                            key={sIdx} 
                            className="bg-bg-elevated text-text-secondary text-[9px] px-1.5 py-0.5 rounded border border-border-subtle block"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GoldCard>

          </m.div>
        </m.div>

        {/* Action Suggestion & Callout */}
        <div className="mt-12 text-center">
          <p className="text-text-secondary text-sm mb-4">
            البرنامج الأكاديمي المناسب لك: <strong className="text-gold-primary">{selectedData.diplomaName}</strong>
          </p>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <a 
              href="#courses" 
              className="px-8 py-3.5 rounded-full bg-gold-primary text-bg-primary text-sm font-bold shadow-lg shadow-gold-glow/20 hover:shadow-gold-glow/50 hover:bg-[#F0C97A] transition-all duration-300 flex items-center gap-2 group transform hover:-translate-y-0.5"
            >
              استعرض تفاصيل الدبلوم والتحق الآن
              <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
            </a>
            <span className="text-text-muted text-xs">
              * تبدأ الدفعة القادمة خلال هذا الأسبوع. مقاعد الدعم الجزئي محدودة.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

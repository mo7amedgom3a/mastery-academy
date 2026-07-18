import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, DollarSign, Shield, Check, Send, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { consultancies } from "@/lib/landing-data";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { GoldCard, GoldButton } from "@/components/ui/gold-elements";
import { Skeleton } from "@/components/ui/skeleton";
import { toArabicDigits } from "@/lib/utils";

export function ConsultationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const selectedConsultancy = id ? Number(id) : null;

  const [loading, setLoading] = useState(true);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: ""
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone || !bookingForm.date || !bookingForm.time) {
      toast.error("يرجى ملء جميع الحقول المطلوبة لتأكيد الحجز.");
      return;
    }

    // Simulate API Mutation
    toast.success(`تم إرسال طلب الحجز بنجاح! سنتواصل معك عبر البريد الإلكتروني لتأكيد موعد الجلسة.`);
    
    // Reset state
    setBookingForm({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      notes: ""
    });
    navigate("/consultation");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col justify-between" dir="rtl">
        <Navbar />
        <main className="flex-grow pt-28 pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Skeleton className="h-6 w-48 rounded-full mx-auto" />
              <Skeleton className="h-12 w-3/4 rounded-xl mx-auto" />
              <Skeleton className="h-16 w-full rounded-xl mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Skeleton className="h-24 rounded-2xl" />
              <Skeleton className="h-24 rounded-2xl" />
              <Skeleton className="h-24 rounded-2xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-48 rounded-2xl" />
              <Skeleton className="h-48 rounded-2xl" />
              <Skeleton className="h-48 rounded-2xl" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col justify-between" dir="rtl">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Page Title */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-gold-muted text-gold-primary border border-gold-border/30 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
              جلسات استشارية خاصة 1-on-1
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-text-primary leading-tight mb-6">
              احجز جلستك الاستشارية الخاصة مع الخبراء
            </h1>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              تغلب على عقبات مشروعك أو عملك واحصل على توجيه مباشر وسري من نخبة المستشارين في مجالات القانون والمالية والتسويق والإدارة بالشرق الأوسط.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {[
              { title: "جلسات مخصصة وسرية", desc: "جلسة فردية مغلقة ومباشرة لمناقشة كافة التفاصيل الفنية والسرية لعملك.", icon: Shield },
              { title: "مستندات وخطة عمل", desc: "تحصل في نهاية الجلسة على تقرير وخلاصة وتوصيات عملية جاهزة للتنفيذ.", icon: Check },
              { title: "حجز مرن ويسير", desc: "اختر المستشار، الموعد المناسب، وقم بالحجز والتأكيد رقمياً في ثوانٍ.", icon: Calendar }
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <GoldCard key={idx} className="p-6 border-gold-border/15 flex items-start gap-4">
                  <div className="p-3 bg-bg-elevated text-gold-primary rounded-xl border border-gold-border/20 flex-shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary text-base mb-1.5">{feat.title}</h3>
                    <p className="text-text-secondary text-xs leading-relaxed">{feat.desc}</p>
                  </div>
                </GoldCard>
              );
            })}
          </div>

          {/* Consultations List / Full Booking View */}
          {selectedConsultancy === null ? (
            <>
              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
                {[
                  { title: "جلسات مخصصة وسرية", desc: "جلسة فردية مغلقة ومباشرة لمناقشة كافة التفاصيل الفنية والسرية لعملك.", icon: Shield },
                  { title: "مستندات وخطة عمل", desc: "تحصل في نهاية الجلسة على تقرير وخلاصة وتوصيات عملية جاهزة للتنفيذ.", icon: Check },
                  { title: "حجز مرن ويسير", desc: "اختر المستشار، الموعد المناسب، وقم بالحجز والتأكيد رقمياً في ثوانٍ.", icon: Calendar }
                ].map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <GoldCard key={idx} className="p-6 border-gold-border/15 flex items-start gap-4">
                      <div className="p-3 bg-bg-elevated text-gold-primary rounded-xl border border-gold-border/20 flex-shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-text-primary text-base mb-1.5">{feat.title}</h3>
                        <p className="text-text-secondary text-xs leading-relaxed">{feat.desc}</p>
                      </div>
                    </GoldCard>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {consultancies.map((item) => (
                  <GoldCard 
                    key={item.id} 
                    onClick={() => navigate("/consultation/" + item.id)}
                    className="group relative overflow-hidden transition-all duration-300 h-full flex flex-col justify-between cursor-pointer hover:border-gold-primary/50 hover:shadow-card-hover"
                  >
                    <div>
                      <div className="relative h-44 overflow-hidden">
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover group-hover:scale-103 transition duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 to-transparent" />
                        <img src={item.consultantImage} alt={item.consultant} className="absolute -bottom-8 right-6 h-16 w-16 rounded-full border-4 border-bg-card object-cover" loading="lazy" />
                      </div>
                      <div className="p-6 pt-12 text-right">
                        <p className="text-xs text-text-secondary">{item.consultant}</p>
                        <h3 className="mt-2 text-xl font-bold text-text-primary leading-snug line-clamp-2 min-h-[3rem]">{item.title}</h3>
                        {item.summary && <p className="mt-3 text-text-secondary text-xs leading-relaxed line-clamp-3">{toArabicDigits(item.summary)}</p>}
                      </div>
                    </div>
                    <div className="p-6 pt-0 border-t border-border-subtle/50 mt-4">
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <span className="font-serif text-3xl font-bold text-gold-primary">{toArabicDigits(item.price)}</span>
                          <p className="text-[10px] text-text-secondary font-semibold mt-1 flex items-center gap-1">
                            <Clock className="h-3 w-3 text-gold-primary" /> {toArabicDigits(item.duration)}
                          </p>
                        </div>
                        <GoldButton className="px-5 py-2.5 rounded-full text-xs">
                          احجز جلستك الآن
                        </GoldButton>
                      </div>
                    </div>
                  </GoldCard>
                ))}
              </div>
            </>
          ) : (() => {
            const currentService = consultancies.find(c => c.id === selectedConsultancy);
            
            // Generate next 5 working days (skipping Friday/Saturday)
            const upcomingDates = (() => {
              const dates = [];
              const today = new Date();
              const dayNames = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
              const monthNames = [
                "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
                "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
              ];
              
              let count = 0;
              let offset = 1; // start tomorrow
              
              while (count < 5) {
                const nextDate = new Date();
                nextDate.setDate(today.getDate() + offset);
                const dayOfWeek = nextDate.getDay();
                
                if (dayOfWeek !== 5 && dayOfWeek !== 6) {
                  dates.push({
                    dayName: dayNames[dayOfWeek],
                    dateLabel: `${toArabicDigits(nextDate.getDate())} ${monthNames[nextDate.getMonth()]}`,
                    value: nextDate.toISOString().split("T")[0]
                  });
                  count++;
                }
                offset++;
              }
              return dates;
            })();

            const timeSlots = [
              { label: "10:00 ص", value: "10:00" },
              { label: "11:30 ص", value: "11:30" },
              { label: "01:00 م", value: "13:00" },
              { label: "03:30 م", value: "15:30" },
              { label: "05:00 م", value: "17:00" },
              { label: "06:30 م", value: "18:30" },
            ];

            if (!currentService) return null;

            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Back button */}
                <button 
                  onClick={() => navigate("/consultation")}
                  className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-gold-primary transition cursor-pointer font-semibold"
                >
                  <ArrowRight className="h-4 w-4 text-gold-primary" /> العودة لكافة الاستشارات
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Full details (7 cols) */}
                  <div className="lg:col-span-7">
                    <GoldCard className="p-6 md:p-8 space-y-6 text-right">
                      <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                        <img src={currentService.image} alt={currentService.title} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 to-transparent" />
                        <div className="absolute bottom-6 right-6 flex items-center gap-4">
                          <img src={currentService.consultantImage} alt={currentService.consultant} className="h-16 w-16 rounded-full border-4 border-gold-border/20 object-cover" />
                          <div>
                            <h2 className="text-xl font-bold text-text-primary">{currentService.consultant}</h2>
                            <span className="text-xs text-gold-primary block">مستشار معتمد</span>
                          </div>
                        </div>
                      </div>

                      <h1 className="text-3xl font-bold text-text-primary leading-snug">{currentService.title}</h1>
                      
                      <div className="flex flex-wrap gap-6 items-center border-y border-border-subtle py-4">
                        <div>
                          <span className="text-xs text-text-secondary block">رسوم الجلسة</span>
                          <span className="font-serif text-3xl font-bold text-gold-primary">{toArabicDigits(currentService.price)}</span>
                        </div>
                        <div className="h-10 w-px bg-border-subtle" />
                        <div>
                          <span className="text-xs text-text-secondary block">مدة الاستشارة</span>
                          <span className="text-base font-bold text-text-primary flex items-center gap-1.5 mt-1">
                            <Clock className="h-4 w-4 text-gold-primary" /> {toArabicDigits(currentService.duration)}
                          </span>
                        </div>
                        <div className="h-10 w-px bg-border-subtle" />
                        <div>
                          <span className="text-xs text-text-secondary block">نوع الجلسة</span>
                          <span className="text-base font-bold text-text-primary flex items-center gap-1.5 mt-1">
                            <Shield className="h-4 w-4 text-gold-primary" /> استشارة شخصية مباشرة
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-text-primary border-r-4 border-gold-primary pr-3 leading-none">تفاصيل الاستشارة ومحاورها</h3>
                        <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                          {toArabicDigits(currentService.details || currentService.summary)}
                        </p>
                      </div>

                      <div className="p-4 bg-bg-elevated/50 rounded-2xl border border-gold-border/10 space-y-3">
                        <h4 className="font-bold text-text-primary text-xs flex items-center gap-1.5">
                          <Shield className="h-4 w-4 text-gold-primary" /> سياسة الخصوصية والسرية
                        </h4>
                        <p className="text-[10px] text-text-secondary leading-relaxed">
                          جميع المعلومات والبيانات والمستندات المشاركة خلال الجلسة تخضع لسرية تامة واتفاقية عدم إفصاح متبادلة لحماية أسرار عملك التجاري.
                        </p>
                      </div>
                    </GoldCard>
                  </div>

                  {/* Right Column: Interactive scheduler & form (5 cols) */}
                  <div className="lg:col-span-5">
                    <GoldCard className="p-6 md:p-8 border-gold-primary/30 space-y-6">
                      <h3 className="font-bold text-text-primary text-lg border-b border-border-subtle pb-3">جدولة الجلسة وتأكيد البيانات</h3>
                      
                      <form onSubmit={handleBookingSubmit} className="space-y-6 text-right">
                        {/* Step 1: Interactive Date Picker */}
                        <div>
                          <label className="block text-xs font-bold mb-3 text-text-primary">١. اختر تاريخ الاستشارة المفضل *</label>
                          <div className="grid grid-cols-5 gap-2">
                            {upcomingDates.map((d, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => setBookingForm({ ...bookingForm, date: d.value })}
                                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                                  bookingForm.date === d.value
                                    ? "bg-gold-primary border-gold-primary text-bg-primary font-bold scale-[1.03] shadow-md shadow-gold-glow/25"
                                    : "bg-bg-elevated border-gold-border/10 text-text-secondary hover:border-gold-primary/30 hover:text-text-primary"
                                }`}
                              >
                                <span className="text-[9px] block opacity-70 mb-0.5">{d.dayName}</span>
                                <span className="text-[10px] block font-bold whitespace-nowrap">{d.dateLabel}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Step 2: Interactive Time Picker */}
                        <div>
                          <label className="block text-xs font-bold mb-3 text-text-primary">٢. اختر توقيت الجلسة المفضل (بتوقيت مكة) *</label>
                          <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((ts, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => setBookingForm({ ...bookingForm, time: ts.value })}
                                className={`py-2 rounded-xl text-center border text-[11px] font-bold transition cursor-pointer ${
                                  bookingForm.time === ts.value
                                    ? "bg-gold-primary border-gold-primary text-bg-primary font-bold shadow-md shadow-gold-glow/20"
                                    : "bg-bg-elevated border-gold-border/10 text-text-secondary hover:border-gold-primary/30 hover:text-text-primary"
                                }`}
                              >
                                {ts.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Step 3: Input Fields */}
                        <div className="space-y-4 pt-4 border-t border-border-subtle">
                          <label className="block text-xs font-bold mb-1 text-gold-primary">٣. أدخل بياناتك الشخصية لإتمام الحجز</label>
                          
                          <div>
                            <label className="block text-[10px] font-bold mb-1.5 text-text-secondary">الاسم الكامل *</label>
                            <input
                              type="text"
                              required
                              className="w-full bg-bg-elevated border border-gold-border/20 rounded-xl px-4 py-2.5 text-xs text-text-primary focus:outline-none focus:border-gold-primary transition"
                              placeholder="أدخل اسمك بالكامل"
                              value={bookingForm.name}
                              onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold mb-1.5 text-text-secondary">البريد الإلكتروني *</label>
                              <input
                                type="email"
                                required
                                className="w-full bg-bg-elevated border border-gold-border/20 rounded-xl px-4 py-2.5 text-xs text-text-primary focus:outline-none focus:border-gold-primary transition"
                                placeholder="example@mail.com"
                                value={bookingForm.email}
                                onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold mb-1.5 text-text-secondary">رقم الهاتف *</label>
                              <input
                                type="tel"
                                required
                                className="w-full bg-bg-elevated border border-gold-border/20 rounded-xl px-4 py-2.5 text-xs text-text-primary focus:outline-none focus:border-gold-primary transition"
                                placeholder="+966xxxxxxxxx"
                                value={bookingForm.phone}
                                onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold mb-1.5 text-text-secondary">ملاحظات أو أسئلة محددة</label>
                            <textarea
                              rows={3}
                              className="w-full bg-bg-elevated border border-gold-border/20 rounded-xl px-4 py-2.5 text-xs text-text-primary focus:outline-none focus:border-gold-primary transition resize-none"
                              placeholder="ما هي التحديات أو النقاط التي ترغب في مناقشتها مع المستشار؟"
                              value={bookingForm.notes}
                              onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                            />
                          </div>
                        </div>

                        <GoldButton type="submit" className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold shadow-gold-cta cursor-pointer">
                          <Send className="h-4 w-4" /> إرسال طلب الحجز والتأكيد
                        </GoldButton>
                      </form>
                    </GoldCard>
                  </div>
                  
                </div>
              </motion.div>
            );
          })()}

        </div>
      </main>

      <Footer />
    </div>
  );
}

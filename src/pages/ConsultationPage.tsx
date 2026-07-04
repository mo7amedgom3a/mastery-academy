import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, DollarSign, Shield, Check, Send } from "lucide-react";
import { toast } from "sonner";
import { consultancies } from "@/lib/landing-data";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { GoldCard, GoldButton } from "@/components/ui/gold-elements";
import { toArabicDigits } from "@/lib/utils";

export function ConsultationPage() {
  const [selectedConsultancy, setSelectedConsultancy] = useState<number | null>(null);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: ""
  });

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
    setSelectedConsultancy(null);
  };

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

          {/* Consultations List */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* List (8 cols or Full width depending on form) */}
            <div className={`${selectedConsultancy !== null ? 'lg:col-span-7' : 'lg:col-span-12'} grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300`}>
              {consultancies.map((item) => (
                <GoldCard key={item.id} className={`group relative overflow-hidden transition-all duration-300 h-full flex flex-col justify-between ${selectedConsultancy === item.id ? 'ring-2 ring-gold-primary border-gold-primary' : ''}`}>
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
                      <GoldButton onClick={() => setSelectedConsultancy(item.id)} className="px-5 py-2.5 rounded-full text-xs">
                        احجز جلستك الآن
                      </GoldButton>
                    </div>
                  </div>
                </GoldCard>
              ))}
            </div>

            {/* Booking Form (4 cols - sticky) */}
            {selectedConsultancy !== null && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-5 lg:sticky lg:top-28"
              >
                <GoldCard className="p-6 md:p-8 border-gold-primary/30">
                  <div className="flex justify-between items-center mb-6 pb-3 border-b border-border-subtle">
                    <h3 className="font-bold text-text-primary text-lg">طلب حجز موعد</h3>
                    <button onClick={() => setSelectedConsultancy(null)} className="text-xs text-text-secondary hover:text-gold-primary transition font-semibold">إلغاء</button>
                  </div>
                  <p className="text-xs text-text-secondary mb-6">
                    المستشار: <span className="text-gold-primary font-bold">{consultancies.find(c => c.id === selectedConsultancy)?.consultant}</span>
                    <br />
                    الجلسة: <span className="text-gold-primary font-bold">{consultancies.find(c => c.id === selectedConsultancy)?.title}</span>
                  </p>
                  <form onSubmit={handleBookingSubmit} className="space-y-4 text-right">
                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-text-primary">الاسم الكامل *</label>
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
                        <label className="block text-xs font-bold mb-1.5 text-text-primary">البريد الإلكتروني *</label>
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
                        <label className="block text-xs font-bold mb-1.5 text-text-primary">رقم الهاتف *</label>
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold mb-1.5 text-text-primary">التاريخ المفضل *</label>
                        <input
                          type="date"
                          required
                          className="w-full bg-bg-elevated border border-gold-border/20 rounded-xl px-4 py-2.5 text-xs text-text-primary focus:outline-none focus:border-gold-primary transition"
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1.5 text-text-primary">الوقت المفضل *</label>
                        <input
                          type="time"
                          required
                          className="w-full bg-bg-elevated border border-gold-border/20 rounded-xl px-4 py-2.5 text-xs text-text-primary focus:outline-none focus:border-gold-primary transition"
                          value={bookingForm.time}
                          onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-text-primary">ملاحظات أو أسئلة محددة</label>
                      <textarea
                        rows={3}
                        className="w-full bg-bg-elevated border border-gold-border/20 rounded-xl px-4 py-2.5 text-xs text-text-primary focus:outline-none focus:border-gold-primary transition resize-none"
                        placeholder="ما هي التحديات أو النقاط التي ترغب في مناقشتها مع المستشار؟"
                        value={bookingForm.notes}
                        onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      />
                    </div>
                    <GoldButton type="submit" className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold">
                      <Send className="h-4 w-4" /> إرسال طلب الحجز
                    </GoldButton>
                  </form>
                </GoldCard>
              </motion.div>
            )}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

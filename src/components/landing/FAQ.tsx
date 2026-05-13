import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "حساب المشترك وكلمة المرور", a: "يمكنك إنشاء حساب جديد بسهولة عبر صفحة التسجيل، وفي حال نسيان كلمة المرور تستطيع إعادة تعيينها من خلال بريدك الإلكتروني المسجل." },
  { q: "أمن المعلومات", a: "نستخدم بروتوكولات تشفير عالمية لحماية بياناتك ومعاملاتك، ولا تتم مشاركة أي معلومات شخصية مع أي طرف ثالث." },
  { q: "سياسة الشراء والدفع", a: "نقبل جميع وسائل الدفع الإلكترونية الآمنة بما في ذلك Visa و Mastercard و Apple Pay، ويتم تأكيد عملية الشراء فوراً." },
  { q: "سياسة استخدام الدورات التدريبية بالموقع", a: "تستطيع متابعة الدورات لمدة عام كامل من تاريخ الاشتراك، ومرات غير محدودة من أي جهاز." },
  { q: "شروط الاستخدام لكل دورة", a: "تختلف شروط الاستخدام بحسب نوع الدورة (مسجلة أو بث مباشر)، وتظهر التفاصيل الكاملة في صفحة كل دورة." },
  { q: "سياسة الاسترداد / الاسترجاع", a: "يحق لك طلب استرداد قيمة الدورة خلال 7 أيام من تاريخ الشراء بشرط ألا تكون قد تابعت أكثر من 20% من المحتوى." },
  { q: "هل يمكنني الحصول على اعتماد دولي عند إتمام البرنامج؟", a: "نعم، تُمنح شهادات معتمدة دولياً عند إتمام جميع الدورات والدبلومات، وتستطيع التحقق من صحتها عبر صفحة التحقق من الشهادة." },
];

export function FAQ() {
  return (
    <section className="relative py-20 lg:py-28 bg-bg-secondary/40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent-gold text-sm font-semibold mb-2">الأسئلة الشائعة</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary">هل لديك سؤال؟</h2>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-[rgba(212,168,83,0.2)]">
              <AccordionTrigger className="text-right text-text-primary hover:text-accent-gold py-5 text-lg font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-text-secondary leading-relaxed text-base pb-5">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

import { Facebook, Instagram, Linkedin, Twitter, Youtube, ShieldCheck } from "lucide-react";
import { categories, landingStats } from "@/lib/landing-data";

export function Footer() {
  return (
    <footer className="relative bg-[#060609] border-t border-[rgba(212,168,83,0.2)] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md gold-gradient text-bg-primary font-display text-lg font-bold">NN</div>
            <span className="text-text-primary text-lg font-bold">MasteryAcademy</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-lg border border-[rgba(212,168,83,0.2)] bg-bg-secondary px-4 py-2 text-xs text-text-primary">Google Play</button>
            <button className="rounded-lg border border-[rgba(212,168,83,0.2)] bg-bg-secondary px-4 py-2 text-xs text-text-primary">App Store</button>
          </div>
          <div>
            <p className="text-xs text-text-secondary mb-2">بوابات الدفع الآمنة</p>
            <div className="flex flex-wrap gap-2">
              {["Visa", "Mastercard", "Apple Pay", "Mada"].map((p) => (
                <span key={p} className="rounded border border-[rgba(212,168,83,0.15)] bg-bg-secondary px-2 py-1 text-[10px] text-text-secondary">{p}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <ShieldCheck className="h-4 w-4 text-accent-gold" />
            موقع آمن - شهادة SSL
          </div>
        </div>
        <div>
          <h4 className="text-text-primary font-bold mb-4">روابط سريعة</h4>
          <ul className="space-y-3 text-sm text-text-secondary">
            {categories.slice(0, 5).map((category) => category.name).map((l) => (
              <li key={l}><a href="#" className="hover:text-accent-gold transition">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-text-primary font-bold mb-4">المزيد</h4>
          <ul className="space-y-3 text-sm text-text-secondary">
            {["النشرة البريدية", "سلة المشتريات", "سياسة الخصوصية", "شروط الاستخدام"].map((l) => (
              <li key={l}><a href="#" className="hover:text-accent-gold transition">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-text-primary font-bold mb-4">تابعنا على</h4>
          <div className="flex flex-wrap gap-3">
            {[
              { Icon: Instagram, label: "انستغرام" },
              { Icon: Linkedin, label: "لينكد إن" },
              { Icon: Twitter, label: "تويتر" },
              { Icon: Facebook, label: "فيسبوك" },
              { Icon: Youtube, label: "يوتيوب" },
            ].map(({ Icon, label }) => (
              <a key={label} href="#" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(212,168,83,0.2)] text-text-secondary hover:text-accent-gold hover:border-accent-gold transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs text-text-muted">استكشف {landingStats.courses} دورة و{landingStats.consultancies} استشارة في ماستري اكاديمي</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-[rgba(212,168,83,0.1)] text-center text-xs text-text-muted">
        Sahel reach fze 2025 © جميع الحقوق محفوظة
      </div>
    </footer>
  );
}

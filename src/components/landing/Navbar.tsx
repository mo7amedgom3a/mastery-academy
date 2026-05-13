import { useEffect, useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import { navLinks } from "@/lib/landing-data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "bg-bg-primary/85 border-b border-[rgba(212,168,83,0.2)] py-2"
          : "bg-bg-primary/40 border-b border-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md gold-gradient text-bg-primary font-display text-lg font-bold">
            NN
          </div>
          <span className="text-text-primary text-lg font-bold tracking-tight">
            MasteryAcademy
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm text-text-secondary hover:text-accent-gold transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            aria-label="سلة المشتريات"
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(212,168,83,0.2)] text-text-secondary hover:text-accent-gold hover:border-accent-gold transition"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
          <button className="hidden sm:inline-flex h-10 items-center rounded-full border border-accent-gold/60 px-4 text-sm text-accent-gold hover:bg-accent-gold/10 transition">
            تسجيل الدخول
          </button>
          <button className="hidden md:inline-flex h-10 items-center rounded-full gold-gradient px-5 text-sm font-semibold text-bg-primary hover:opacity-90 transition">
            اشترك الآن
          </button>
          <button
            aria-label="القائمة"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-[rgba(212,168,83,0.2)] text-text-primary"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-[rgba(212,168,83,0.15)] bg-bg-primary/95 backdrop-blur-md">
          <nav className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <a
                key={l}
                href="#"
                className="text-text-secondary hover:text-accent-gold py-2"
              >
                {l}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 h-10 rounded-full border border-accent-gold/60 text-sm text-accent-gold">
                تسجيل الدخول
              </button>
              <button className="flex-1 h-10 rounded-full gold-gradient text-sm font-semibold text-bg-primary">
                اشترك الآن
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

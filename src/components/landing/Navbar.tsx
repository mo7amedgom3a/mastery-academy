import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/landing-data";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getNavLinkHref = (l: string) => {
    if (l === "استشارات") return "/consultation";
    if (l === "الباقات") return "/packages";
    return `/browse?field=${encodeURIComponent(l)}`;
  };

  return (
    <>
      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          />
        )}
      </AnimatePresence>

      <header
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? "bg-bg-glass border-b border-gold-border py-2"
            : "bg-bg-primary/40 border-b border-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="flex h-8.5 w-8.5 sm:h-9 sm:w-9 items-center justify-center rounded-md gold-gradient text-bg-primary font-display text-base sm:text-lg font-bold">
              NN
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-shimmer">
              MasteryAcademy
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link to="/" className="text-sm text-text-secondary hover:text-gold-primary transition-colors font-medium">
              الرئيسية
            </Link>
            {navLinks.map((l) => (
              <Link
                key={l}
                to={getNavLinkHref(l)}
                className="text-sm text-text-secondary hover:text-gold-primary transition-colors font-medium"
              >
                {l}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <button
              aria-label="سلة المشتريات"
              className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-border text-text-secondary hover:text-gold-primary hover:border-gold-primary transition"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
            <button className="hidden sm:inline-flex h-10 items-center rounded-full border border-gold-primary/60 px-4 text-sm text-gold-primary hover:bg-gold-primary/10 transition">
              تسجيل الدخول
            </button>
            <button className="hidden md:inline-flex h-10 items-center rounded-full gold-gradient px-5 text-sm font-semibold text-bg-primary hover:scale-[1.02] hover:shadow-[0_0_15px_var(--gold-glow)] transition-all duration-300">
              اشترك الآن
            </button>
            <button
              aria-label="القائمة"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-gold-border text-text-primary"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Animated Mobile menu */}
        <AnimatePresence>
          {open && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden border-t border-gold-border/20 bg-bg-card/98 backdrop-blur-lg overflow-hidden max-h-[calc(100vh-4.5rem)] overflow-y-auto"
            >
              <nav className="mx-auto max-w-7xl px-4 py-6 flex flex-col gap-4">
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="text-text-secondary hover:text-gold-primary py-2 font-medium text-base border-b border-gold-border/5"
                >
                  الرئيسية
                </Link>
                {navLinks.map((l) => (
                  <Link
                    key={l}
                    to={getNavLinkHref(l)}
                    onClick={() => setOpen(false)}
                    className="text-text-secondary hover:text-gold-primary py-2 font-medium text-base border-b border-gold-border/5"
                  >
                    {l}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 pt-4">
                  <button className="w-full h-11 rounded-full border border-gold-primary/60 text-sm text-gold-primary bg-transparent font-semibold active:scale-[0.98] transition cursor-pointer hover:bg-gold-primary/5">
                    تسجيل الدخول
                  </button>
                  <button className="w-full h-11 flex items-center justify-center rounded-full gold-gradient text-sm font-semibold text-bg-primary active:scale-[0.98] hover:shadow-[0_0_15px_var(--gold-glow)] transition-all duration-300 cursor-pointer">
                    اشترك الآن
                  </button>
                </div>
              </nav>
            </m.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

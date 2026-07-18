import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
      className="
        flex items-center justify-center p-2 rounded-lg cursor-pointer
        border border-border-gold
        bg-gold-muted
        text-gold-primary
        hover:bg-gold-primary hover:text-bg-primary
        transition-all duration-300
      "
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

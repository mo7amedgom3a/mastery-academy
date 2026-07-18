import React from "react";
import { cn } from "@/lib/utils";

// 1. GoldCard (Dashboard Primitive)
interface GoldCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GoldCard = React.forwardRef<HTMLDivElement, GoldCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-bg-card/90 border border-gold-border/25 rounded-2xl backdrop-blur-sm shadow-card-custom transition-all duration-300 hover:border-gold-border/50 hover:shadow-card-hover",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GoldCard.displayName = "GoldCard";

// 2. GoldButton (Primary Action / CTA)
export const GoldButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "bg-gold-primary text-bg-primary font-bold px-5 py-2.5 rounded-xl border border-gold-primary/30 hover:bg-gold-primary/95 transition-all duration-200 shadow-gold-cta cursor-pointer text-xs active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
GoldButton.displayName = "GoldButton";

// 3. GhostButton (Secondary Action)
export const GhostButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-elevated/80 border border-border-subtle rounded-xl px-4 py-2.5 text-xs transition duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
GhostButton.displayName = "GhostButton";

// 4. StatusBadge & Pill Indicators
interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStyles = () => {
    switch (status) {
      case "منشورة":
      case "active":
      case "online":
        return "bg-green-success/10 text-green-success border-green-success/20";
      case "قيد المراجعة":
      case "pending":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "مسودة":
      case "draft":
      case "offline":
        return "bg-text-muted/15 text-text-secondary border-border-subtle";
      case "مدفوع":
      case "premium":
        return "bg-gold-muted text-gold-primary border-gold-border";
      default:
        return "bg-bg-elevated text-text-secondary border-border-subtle";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border",
        getStyles()
      )}
    >
      {status}
    </span>
  );
};

// 5. GoldProgressBar
interface ProgressBarProps {
  progress: number;
}

export const GoldProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full h-1.5 bg-bg-elevated rounded-full overflow-hidden border border-border-subtle/30">
      <div
        className="h-full bg-gradient-to-r from-gold-primary to-[#F0C060] rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

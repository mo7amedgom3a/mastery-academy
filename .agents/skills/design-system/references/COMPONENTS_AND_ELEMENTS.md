# Components & Elements Reference

This document outlines the standard UI primitives and components. Future agents should use these code snippets and utility properties for consistent dashboard styling.

## 1. GoldCard (Dashboard Primitive)

The base panel element for any dashboard block, grid item, or stats container. It features a premium glassmorphic feel and gold borders.

```tsx
import React from "react";
import { cn } from "@/lib/utils";

interface GoldCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GoldCard = React.forwardRef<HTMLDivElement, GoldCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-bg-card/90 border border-gold-border/20 rounded-2xl backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-gold-border/40",
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
```

## 2. Buttons & Actions

### GoldButton (Primary Action / CTA)
Used for critical workflows, submissions, or creation buttons. Features a subtle gold glow matching the design aesthetics.

```tsx
import React from "react";
import { cn } from "@/lib/utils";

export const GoldButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "bg-gold-primary text-bg-primary font-bold px-5 py-2.5 rounded-xl border border-gold-primary/30 hover:bg-gold-primary/95 transition-all duration-200 shadow-[0_0_15px_var(--gold-glow)] cursor-pointer text-xs active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
GoldButton.displayName = "GoldButton";
```

### GhostButton (Secondary Action)
Used for cancel actions, navigation buttons, back buttons, or outline views.

```tsx
import React from "react";
import { cn } from "@/lib/utils";

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
```

## 3. StatusBadge & Pill Indicators

Badges are used to visualize publish status, subscription plans, and verification steps.

```tsx
import React from "react";
import { cn } from "@/lib/utils";

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
```

## 4. GoldProgressBar

Dynamic progress bars for course syllabus progression and cohort completion stats.

```tsx
import React from "react";

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
```

## 5. Table Layout Conventions

Tables should be structured cleanly using thin borders and hovered rows.

```tsx
<div className="overflow-x-auto border border-border-subtle rounded-xl bg-bg-card">
  <table className="w-full text-xs text-right">
    <thead className="bg-bg-elevated/60 text-text-secondary">
      <tr className="border-b border-border-subtle/40">
        <th className="p-4 font-bold">العنوان</th>
        <th className="p-4 font-bold">الحالة</th>
        <th className="p-4 font-bold">التفاعل</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-border-subtle/30">
      <tr className="hover:bg-bg-elevated/20 transition">
        <td className="p-4 text-text-primary">مقدمة في التحليلات</td>
        <td className="p-4"><StatusBadge status="منشورة" /></td>
        <td className="p-4 font-mono text-gold-primary">٩٨٪</td>
      </tr>
    </tbody>
  </table>
</div>
```

import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "accent" | "muted" | "success";
}

export function Badge({ className, variant = "primary", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          "bg-primary/10 text-primary": variant === "primary",
          "bg-accent/10 text-accent": variant === "accent",
          "bg-surface-alt text-muted": variant === "muted",
          "bg-success/10 text-success": variant === "success",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

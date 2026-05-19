import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-primary text-white hover:bg-primary-dark shadow-sm": variant === "primary",
            "bg-surface-alt text-foreground hover:bg-border": variant === "secondary",
            "border-2 border-primary text-primary hover:bg-primary hover:text-white": variant === "outline",
            "text-muted hover:text-foreground hover:bg-surface-alt": variant === "ghost",
            "bg-accent text-white hover:bg-accent-dark shadow-sm": variant === "accent",
          },
          {
            "h-8 px-3 text-sm": size === "sm",
            "h-11 px-5 text-sm": size === "md",
            "h-13 px-6 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

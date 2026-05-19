"use client";

import { cn } from "@/lib/utils";

interface AppLogoProps {
  variant?: "icon" | "wordmark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: { icon: 28, text: "text-base" },
  md: { icon: 36, text: "text-lg" },
  lg: { icon: 48, text: "text-2xl" },
  xl: { icon: 72, text: "text-4xl" },
};

export function AppLogo({ variant = "wordmark", size = "md", className }: AppLogoProps) {
  const { icon: iconSize, text: textSize } = sizes[size];

  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 100 100"
        width={iconSize}
        height={iconSize}
        className={className}
        aria-label="APPetit+"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ~290° arc, gap at top-right */}
        <path
          d="M 36 11 A 42 42 0 1 0 82 23"
          stroke="#223B2E"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* A */}
        <text
          x="9"
          y="79"
          fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
          fontSize="63"
          fontWeight="800"
          fill="#223B2E"
        >
          A
        </text>
        {/* + */}
        <text
          x="57"
          y="81"
          fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
          fontSize="48"
          fontWeight="700"
          fill="#E08053"
        >
          +
        </text>
        {/* Leaf — two lobes */}
        <path d="M 72 24 Q 66 15 70 10 Q 75 15 72 24 Z" fill="#7BAE7F" />
        <path d="M 72 24 Q 79 15 75 10 Q 70 15 72 24 Z" fill="#7BAE7F" />
        <line x1="72" y1="24" x2="72" y2="28" stroke="#7BAE7F" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // Wordmark
  return (
    <div className={cn("flex items-baseline leading-none select-none", className)}>
      <span className={cn("font-extrabold tracking-tight", textSize)} style={{ color: "#223B2E" }}>
        APPetit
      </span>
      <span className={cn("font-extrabold tracking-tight relative", textSize)} style={{ color: "#E08053" }}>
        +
        {/* Leaf */}
        <svg
          viewBox="0 0 14 14"
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: "0.32em",
            height: "0.36em",
            top: "-0.55em",
            right: "-0.05em",
          }}
          fill="none"
        >
          <path d="M 7 13 Q 1 8 4 2 Q 8 7 7 13 Z" fill="#7BAE7F" />
          <path d="M 7 13 Q 13 8 10 2 Q 6 7 7 13 Z" fill="#7BAE7F" />
        </svg>
      </span>
    </div>
  );
}

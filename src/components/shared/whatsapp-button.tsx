"use client";

import { openWhatsApp, generalInquiry } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type WhatsAppButtonProps = {
  message?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "navy" | "outline" | "gold";
  size?: "sm" | "md" | "lg";
  className?: string;
  fullWidth?: boolean;
};

const variantClasses = {
  // Gold filled button — always dark text on gold (works in both themes)
  primary: "bg-gold text-navy hover:brightness-110 shadow-sm hover:shadow-md",
  // Teal filled button — always dark text on teal
  secondary: "bg-teal text-navy hover:brightness-110 shadow-sm hover:shadow-md",
  // Navy filled button — always white text on navy
  navy: "bg-foreground text-background hover:brightness-110 shadow-sm hover:shadow-md",
  // Outline button — uses foreground color for border+text (theme-aware, always visible)
  outline: "bg-transparent text-foreground border-2 border-foreground/30 hover:bg-foreground/10 hover:border-foreground/60 backdrop-blur-sm",
  // Gold filled (same as primary)
  gold: "bg-gold text-navy hover:brightness-110 shadow-md",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function WhatsAppButton({
  message,
  children,
  variant = "primary",
  size = "md",
  className,
  fullWidth = false,
}: WhatsAppButtonProps) {
  return (
    <button
      onClick={() => openWhatsApp(message ?? generalInquiry())}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
    >
      {children}
    </button>
  );
}

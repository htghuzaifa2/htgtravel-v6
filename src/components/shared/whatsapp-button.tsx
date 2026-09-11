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
  primary: "bg-gold text-foreground hover:brightness-105 shadow-sm hover:shadow-md",
  secondary: "bg-teal text-white hover:brightness-110",
  navy: "bg-navy text-white hover:bg-charcoal",
  outline: "bg-transparent text-foreground border-2 border-navy hover:bg-navy hover:text-white",
  gold: "bg-gold text-foreground hover:brightness-105 shadow-md",
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

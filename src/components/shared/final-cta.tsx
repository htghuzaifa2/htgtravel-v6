"use client";

import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { FadeIn, MotionButton } from "@/components/animations";
import { openWhatsApp, generalInquiry } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type FinalCTAProps = {
  heading: string;
  body: string;
  buttonLabel: string;
  icon?: React.ReactNode;
  variant?: "gold" | "navy" | "sand";
};

// Final CTA section used at the bottom of all detail pages.
// Variants: gold (default), navy (standalone), sand (subtle).
export function FinalCTA({ heading, body, buttonLabel, icon, variant = "sand" }: FinalCTAProps) {
  const bgClass =
    variant === "navy" ? "pattern-navy text-white"
    : variant === "gold" ? "bg-gold text-navy"
    : "bg-muted/40";
  const headingColor = variant === "navy" ? "text-white" : variant === "gold" ? "text-navy" : "text-foreground";
  const bodyColor = variant === "navy" ? "text-on-navy-muted" : variant === "gold" ? "text-navy/80" : "text-muted-foreground";

  return (
    <section className={cn("relative overflow-hidden", bgClass)}>
      {/* CSS-only animated blob — only on gold variant */}
      {variant === "gold" && (
        <>
          <div
            aria-hidden
            className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none drift-blob"
          />
          <div
            aria-hidden
            className="absolute -bottom-20 -right-20 w-64 h-64 bg-navy/10 rounded-full blur-3xl pointer-events-none drift-blob-2"
          />
        </>
      )}
      <FadeIn className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className={cn("font-heading text-2xl md:text-3xl font-semibold mb-3", headingColor)}>
          {heading}
        </h2>
        <p className={cn("text-base mb-6", bodyColor)}>{body}</p>
        <MotionButton
          onClick={() => openWhatsApp(generalInquiry())}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-navy hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 shadow-md active:scale-95 transition-all duration-300 ease-out"
        >
          {icon}
          {buttonLabel}
        </MotionButton>
      </FadeIn>
    </section>
  );
}

// Re-export WhatsAppButton for backward compat
export { WhatsAppButton };

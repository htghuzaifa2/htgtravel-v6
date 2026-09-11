"use client";

import { motion } from "framer-motion";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { FadeIn } from "@/components/animations";
import { cn } from "@/lib/utils";

type FinalCTAProps = {
  heading: string;
  body: string;
  buttonLabel: string;
  icon?: React.ReactNode;
  variant?: "gold" | "navy" | "sand";
};

// Final CTA section used at the bottom of all detail pages.
// Variants: gold (default, on detail pages), navy (standalone), sand (subtle).
export function FinalCTA({ heading, body, buttonLabel, icon, variant = "sand" }: FinalCTAProps) {
  const bgClass =
    variant === "navy" ? "bg-navy text-white"
    : variant === "gold" ? "bg-gold text-navy"
    : "bg-sand/40";
  const headingColor = variant === "navy" ? "text-white" : variant === "gold" ? "text-navy" : "text-navy dark:text-foreground";
  const bodyColor = variant === "navy" ? "text-sand/80" : variant === "gold" ? "text-navy/80" : "text-charcoal/80 dark:text-muted-foreground";

  return (
    <section className={cn("relative overflow-hidden", bgClass)}>
      {variant === "gold" && (
        <>
          <motion.div
            aria-hidden
            className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-20 -right-20 w-64 h-64 bg-navy/10 rounded-full blur-3xl pointer-events-none"
            animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
      <FadeIn className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className={cn("font-heading text-2xl md:text-3xl font-semibold mb-3", headingColor)}>
          {heading}
        </h2>
        <p className={cn("text-base mb-6", bodyColor)}>{body}</p>
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block"
        >
          <WhatsAppButton variant="gold" size="lg">
            {icon}
            {buttonLabel}
          </WhatsAppButton>
        </motion.div>
      </FadeIn>
    </section>
  );
}

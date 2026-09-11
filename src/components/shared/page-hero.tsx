"use client";

import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  intro?: string;
  className?: string;
};

// Page hero used by all detail pages — consistent navy background with
// organic CSS-only ambient glow + staggered entrance via CSS reveal.
export function PageHero({ eyebrow, title, subtitle, intro, className }: PageHeroProps) {
  return (
    <section className={cn("pattern-navy relative overflow-hidden", className)}>
      {/* Static organic glow — CSS radial gradients, no animation, no GPU cost */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, rgba(20,184,184,0.5), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, rgba(245,166,35,0.5), transparent 70%)" }}
      />
      {/* Subtle dot grid overlay for texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
        <FadeIn>
          {eyebrow && (
            <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-4 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20">
              {eyebrow}
            </span>
          )}
          <h1 className="font-heading font-bold text-white leading-tight text-3xl sm:text-4xl md:text-[40px] break-words">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 font-heading text-xl md:text-2xl text-on-navy">
              {subtitle}
            </p>
          )}
          {intro && (
            <p className="mt-6 text-base text-on-navy-muted leading-relaxed max-w-3xl mx-auto break-words">
              {intro}
            </p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  intro?: string;
  className?: string;
};

// Page hero used by all detail pages — consistent navy background with
// subtle geometric pattern, eyebrow tag, title, subtitle and intro.
export function PageHero({ eyebrow, title, subtitle, intro, className }: PageHeroProps) {
  return (
    <section className={cn("pattern-navy relative overflow-hidden", className)}>
      <div className="absolute inset-0 pattern-geometric opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
        {eyebrow && (
          <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-3">
            {eyebrow}
          </span>
        )}
        <h1 className="font-heading font-bold text-white leading-tight text-3xl sm:text-4xl md:text-[40px]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 font-heading text-xl md:text-2xl text-sand">{subtitle}</p>
        )}
        {intro && (
          <p className="mt-6 text-base text-sand/80 leading-relaxed max-w-3xl mx-auto">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

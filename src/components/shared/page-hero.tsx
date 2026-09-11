"use client";

import { motion } from "framer-motion";
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
// Animates children with stagger on mount.
export function PageHero({ eyebrow, title, subtitle, intro, className }: PageHeroProps) {
  return (
    <section className={cn("pattern-navy relative overflow-hidden", className)}>
      <div className="absolute inset-0 pattern-geometric opacity-30 pointer-events-none" />
      {/* Floating glow accents */}
      <motion.div
        aria-hidden
        className="absolute top-0 right-0 w-72 h-72 bg-teal/10 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
        }}
        className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center"
      >
        {eyebrow && (
          <motion.span
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4 }}
            className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-3"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold text-white leading-tight text-3xl sm:text-4xl md:text-[40px]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.45 }}
            className="mt-3 font-heading text-xl md:text-2xl text-sand"
          >
            {subtitle}
          </motion.p>
        )}
        {intro && (
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5 }}
            className="mt-6 text-base text-sand/80 leading-relaxed max-w-3xl mx-auto"
          >
            {intro}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}

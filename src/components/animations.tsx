"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ============================================================
   Performance-first animation utilities.
   - Reveal/Stagger use CSS transitions + a single IntersectionObserver
     per element. No JS animation loop, no re-renders during scroll.
   - MotionButton uses Framer Motion ONLY for hover/tap micro-interactions.
   - All animations respect prefers-reduced-motion.
   ============================================================ */

/**
 * useReveal — adds `is-visible` class when element scrolls into view.
 * One IntersectionObserver per element (cheap, GC'd on unmount).
 */
function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // prefers-reduced-motion: show immediately (deferred to next tick to avoid effect-render warning)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(t);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (options?.once !== false) observer.disconnect();
        } else if (options?.once === false) {
          setVisible(false);
        }
      },
      {
        threshold: options?.threshold ?? 0.1,
        rootMargin: options?.rootMargin ?? "0px 0px -60px 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options?.once, options?.threshold, options?.rootMargin]);

  return { ref, visible };
}

/**
 * FadeIn — single element reveal-on-scroll. CSS-driven, no JS animation loop.
 */
export function FadeIn({
  children,
  delay = 0,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>({ once });
  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/**
 * Stagger — container that reveals children in sequence using CSS transitions.
 * Children should be <StaggerItem>.
 */
export function Stagger({
  children,
  className,
  staggerMs = 60,
}: {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>({ once: true });
  // Inject --i CSS variable on each direct child for staggered delay
  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <StaggerItem key={i} index={i} staggerMs={staggerMs} visible={visible}>
              {child}
            </StaggerItem>
          ))
        : children}
    </div>
  );
}

/**
 * StaggerItem — must be used inside <Stagger>.
 */
export function StaggerItem({
  children,
  className,
  index = 0,
  staggerMs = 60,
  visible = false,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  staggerMs?: number;
  visible?: boolean;
}) {
  return (
    <div
      className={cn("reveal-stagger", visible && "is-visible", className)}
      style={{
        ["--i" as string]: index,
        transitionDelay: visible ? `${index * staggerMs}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

/**
 * HoverLift — pure CSS hover lift (no JS). Wraps any element.
 */
export function HoverLift({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  lift?: number;
}) {
  return <div className={cn("lift-on-hover", className)}>{children}</div>;
}

/**
 * MotionButton — CTA with scale-on-hover/tap. Uses Framer Motion only for
 * the interactive micro-interaction (very lightweight).
 */
export function MotionButton({
  children,
  onClick,
  className,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <button type={type} onClick={onClick} className={className}>
        {children}
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={className}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
}

/**
 * AnimatedCounter — count-up when scrolled into view.
 */
export function AnimatedCounter({
  value,
  duration = 2,
  suffix = "",
  prefix = "",
  className,
}: {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  // Start counting when scrolled into view (single observer)
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReduced) {
      const t = setTimeout(() => {
        setDisplay(value);
        setStarted(true);
      }, 0);
      return () => clearTimeout(t);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReduced, started, value]);

  useEffect(() => {
    if (!started || prefersReduced) return;
    let startTime: number;
    let frameId: number;
    const animate = (now: number) => {
      if (startTime === undefined) startTime = now;
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [started, value, duration, prefersReduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/**
 * ScaleIn — element that scales in on scroll. CSS-driven.
 */
export function ScaleIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>({ once: true });
  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{
        transitionDelay: visible ? `${delay}ms` : "0ms",
        transform: visible ? "scale(1)" : "scale(0.96)",
      }}
    >
      {children}
    </div>
  );
}

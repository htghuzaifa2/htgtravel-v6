"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ============================================================
   Performance-first animation utilities.
   - Reveal/Stagger use CSS transitions + a single IntersectionObserver
     per element. No JS animation loop, no re-renders during scroll.
   - MotionButton uses Framer Motion ONLY for hover/tap micro-interactions.
   - All animations respect prefers-reduced-motion.

   DEFENSIVE DESIGN (prevents the "empty sections" bug from EVER recurring):
   - On mount, we set the `js-anim` class on <html>. CSS scope `.reveal` /
     `.reveal-stagger` hidden initial state to `html.js-anim`, so if JS
     fails entirely, content stays visible (no broken empty page).
   - We register a global safety timeout (3s) that force-adds `.is-visible`
     to every `.reveal` and `.reveal-stagger` element on the page. This
     catches any case where IntersectionObserver failed to fire (e.g.
     element was already in viewport before observer attached, iframe
     rendering quirks, browser bugs, hydration mismatches).
   ============================================================ */

// ============ GLOBAL SAFETY NET ============
// Single module-level flag so the safety timeout only registers once
// even if this module is imported many times.
let safetyNetRegistered = false;

function registerGlobalSafetyNet() {
  if (safetyNetRegistered) return;
  if (typeof window === "undefined") return;
  safetyNetRegistered = true;

  // After 3 seconds, force every still-hidden reveal element to be visible.
  // This is the LAST-RESORT fallback — never leaves a user with an empty page.
  window.setTimeout(() => {
    try {
      const hidden = document.querySelectorAll(
        ".reveal:not(.is-visible), .reveal-stagger:not(.is-visible)"
      );
      hidden.forEach((el) => el.classList.add("is-visible"));
    } catch {
      /* no-op — never let the safety net itself throw */
    }
  }, 3000);
}

// Module-level init: set the js-anim flag and register the safety net.
// Runs once on the client when this module first loads.
if (typeof window !== "undefined") {
  // defer to next tick so we don't block hydration
  window.requestAnimationFrame(() => {
    try {
      document.documentElement.classList.add("js-anim");
      registerGlobalSafetyNet();
    } catch {
      /* no-op */
    }
  });
}

/**
 * useReveal — adds `is-visible` class when element scrolls into view.
 * One IntersectionObserver per element (cheap, GC'd on unmount).
 *
 * Defensive: also sets a 2s per-element fallback timeout. If the observer
 * never fires (e.g. browser bug, iframe quirks, observer race), the element
 * is force-revealed. This is independent of the 3s global safety net.
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

    // Per-element fallback: if observer hasn't fired within 2s, force visible.
    // This catches observer race conditions without affecting the happy path.
    let fallbackTimer: number | undefined;
    const clearFallback = () => {
      if (fallbackTimer !== undefined) {
        window.clearTimeout(fallbackTimer);
        fallbackTimer = undefined;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          clearFallback();
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

    // Set fallback AFTER observer setup so the happy path wins if it fires fast.
    fallbackTimer = window.setTimeout(() => setVisible(true), 2000);

    observer.observe(node);
    return () => {
      clearFallback();
      observer.disconnect();
    };
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
 * Children should be <StaggerItem>. Uses React Context to pass `visible`
 * and `index` state to descendant <StaggerItem>s WITHOUT double-wrapping.
 */
const StaggerContext = createContext<{ visible: boolean; registerIndex: () => number }>({
  visible: false,
  registerIndex: () => 0,
});

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
  // Counter that increments for each StaggerItem that registers, giving
  // each child a unique stagger index without relying on array position.
  const indexCounter = useRef(0);

  const ctx = useMemo(
    () => ({
      visible,
      registerIndex: () => indexCounter.current++,
    }),
    [visible]
  );

  return (
    <StaggerContext.Provider value={ctx}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </StaggerContext.Provider>
  );
}

/**
 * StaggerItem — must be used inside <Stagger>.
 * Self-registers with the parent <Stagger> via context to get its stagger
 * index and visibility state. No double-wrapping.
 */
export function StaggerItem({
  children,
  className,
  index: indexProp,
  staggerMs = 60,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  staggerMs?: number;
}) {
  const { visible, registerIndex } = useContext(StaggerContext);
  const [autoIndex] = useState(() => registerIndex());
  const index = indexProp ?? autoIndex;

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
 * MotionButton — CTA with smooth scale-on-hover. Uses Framer Motion only for
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
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
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

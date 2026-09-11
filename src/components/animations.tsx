"use client";

import { motion, type Variants, useReducedMotion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ============================================================
   Device-aware animation utilities
   - Mobile  (< 640px):  subtle, 0.4s, smaller offsets
   - Tablet  (640-1024):  medium, 0.5s
   - Desktop (> 1024):   full, 0.6s with depth
   - prefers-reduced-motion: instant (no motion)
   ============================================================ */

type DeviceTier = "mobile" | "tablet" | "desktop";

function getDeviceTier(): DeviceTier {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 640) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("desktop");
  useEffect(() => {
    const onResize = () => setTier(getDeviceTier());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return tier;
}

/* Get tuned animation params based on device tier */
function useAnimationConfig() {
  const tier = useDeviceTier();
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return {
      duration: 0,
      y: 0,
      scale: 1,
      staggerChildren: 0,
      delayChildren: 0,
      enabled: false,
    };
  }

  switch (tier) {
    case "mobile":
      return {
        duration: 0.4,
        y: 16,
        scale: 0.98,
        staggerChildren: 0.05,
        delayChildren: 0.05,
        enabled: true,
      };
    case "tablet":
      return {
        duration: 0.5,
        y: 20,
        scale: 0.97,
        staggerChildren: 0.07,
        delayChildren: 0.08,
        enabled: true,
      };
    case "desktop":
    default:
      return {
        duration: 0.6,
        y: 24,
        scale: 0.96,
        staggerChildren: 0.08,
        delayChildren: 0.1,
        enabled: true,
      };
  }
}

/* ============ FadeIn — scroll-triggered fade + slide (device-tuned) ============ */
export function FadeIn({
  children,
  delay = 0,
  className,
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const cfg = useAnimationConfig();

  if (!cfg.enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: cfg.y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: cfg.duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ============ Stagger — parent container for staggered children ============ */
export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cfg = useAnimationConfig();

  if (!cfg.enabled) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: cfg.staggerChildren,
        delayChildren: cfg.delayChildren,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: cfg.y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: cfg.duration, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <StaggerContext.Provider key={i} value={itemVariants}>
              {child}
            </StaggerContext.Provider>
          ))
        : children}
    </motion.div>
  );
}

import { createContext, useContext } from "react";
const StaggerContext = createContext<Variants | null>(null);

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const variants = useContext(StaggerContext);
  const cfg = useAnimationConfig();

  if (!cfg.enabled || !variants) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

/* ============ AnimatedCounter — count up when in view ============ */
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
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  // Respect reduced motion
  const effectiveDuration = prefersReduced ? 0 : duration;

  useEffect(() => {
    if (!inView) return;
    if (effectiveDuration === 0) {
      // Defer to next tick to avoid effect-render warning
      const t = setTimeout(() => setDisplay(value), 0);
      return () => clearTimeout(t);
    }
    let startTime: number;
    let frameId: number;
    const animate = (now: number) => {
      if (startTime === undefined) startTime = now;
      const progress = Math.min((now - startTime) / (effectiveDuration * 1000), 1);
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
  }, [inView, value, effectiveDuration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ============ ScaleIn — for cards that should pop in ============ */
export function ScaleIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const cfg = useAnimationConfig();

  if (!cfg.enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: cfg.scale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: cfg.duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ============ HoverLift — wrapper that adds hover lift to any element ============ */
export function HoverLift({
  children,
  className,
  lift = 6,
}: {
  children: React.ReactNode;
  className?: string;
  lift?: number;
}) {
  const cfg = useAnimationConfig();

  if (!cfg.enabled) {
    return <div className={className}>{children}</div>;
  }

  // Mobile uses gentler lift (4px), desktop uses 8px
  const effectiveLift = lift === 6 ? (cfg.y === 16 ? 4 : cfg.y === 20 ? 6 : 8) : lift;

  return (
    <motion.div
      className={className}
      whileHover={{ y: -effectiveLift }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

/* ============ MotionButton — CTA with scale on hover/tap ============ */
export function MotionButton({
  children,
  onClick,
  className,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}) {
  const cfg = useAnimationConfig();

  if (!cfg.enabled) {
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
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
}

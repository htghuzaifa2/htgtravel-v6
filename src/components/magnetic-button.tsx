"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * MagneticButton — wraps children (usually a button) and applies a magnetic
 * pull effect on mousemove. The element moves slightly toward the cursor,
 * creating a premium 2026-style micro-interaction.
 *
 * Respects prefers-reduced-motion (disabled in that case).
 */
export function MagneticButton({
  children,
  className,
  strength = 0.3,
  as: As = "button",
  onClick,
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "div" | "a";
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    // Skip if user prefers reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  const commonProps = {
    ref: ref as React.RefObject<HTMLElement>,
    className: cn("magnetic", className),
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
  };

  if (As === "a") {
    return <a {...(commonProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>{children}</a>;
  }
  if (As === "div") {
    return <div {...(commonProps as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }
  return (
    <button type={type} {...(commonProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

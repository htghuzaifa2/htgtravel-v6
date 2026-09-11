"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  // next-themes returns undefined on first client render, then the resolved
  // theme after hydration. We don't need a mounted flag — just compare to "dark".
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [hovered, setHovered] = useState(false);
  const isDark = (resolvedTheme ?? theme) === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Toggle theme"
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 text-foreground transition-colors",
        hovered && "bg-accent/10 text-accent",
        className
      )}
    >
      {/* Sun icon — visible in light mode */}
      <Sun
        className={cn(
          "h-4 w-4 absolute transition-all duration-500",
          isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
        )}
      />
      {/* Moon icon — visible in dark mode */}
      <Moon
        className={cn(
          "h-4 w-4 absolute transition-all duration-500",
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
        )}
      />
    </button>
  );
}

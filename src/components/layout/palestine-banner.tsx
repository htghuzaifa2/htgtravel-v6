"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PALESTINE_MESSAGES } from "@/lib/palestine-messages";

/**
 * Palestine solidarity banner.
 *
 * One of the 20 unique direct-support messages appears at random on every
 * page view. How it stays hydration-safe while being truly random:
 *
 * 1. First paint (static HTML / SSR) uses a deterministic pick per route,
 *    so the server markup and hydration always agree.
 * 2. Right after hydration the message is re-rolled with Math.random().
 * 3. On every client-side navigation the banner re-rolls again, so moving
 *    between pages shows a new random message each time.
 */
function routeSeed(pathname: string): number {
  let hash = 0;
  for (let i = 0; i < pathname.length; i++) {
    hash = (hash * 31 + pathname.charCodeAt(i)) >>> 0;
  }
  return hash % PALESTINE_MESSAGES.length;
}

export function PalestineBanner() {
  const rawPath = usePathname() ?? "/";
  // Normalize trailing slash ("/flights/" -> "/flights") so route keys match
  // in both dev and static-export (trailingSlash) modes.
  const pathname = rawPath !== "/" && rawPath.endsWith("/")
    ? rawPath.replace(/\/+$/, "")
    : rawPath;

  // Deterministic first paint per route — keeps SSR and hydration in sync.
  const [index, setIndex] = useState(() => routeSeed(pathname));

  // Random re-roll on every page view: on mount and on each navigation.
  useEffect(() => {
    setIndex(Math.floor(Math.random() * PALESTINE_MESSAGES.length));
  }, [pathname]);

  return (
    <div className="pattern-navy text-white py-2 px-4 text-center">
      <p className="font-sans text-[11px] sm:text-[12px] leading-relaxed">
        🇵🇸 {PALESTINE_MESSAGES[index]} 🇵🇸
      </p>
    </div>
  );
}

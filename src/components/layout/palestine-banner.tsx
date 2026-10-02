"use client";

import { usePathname } from "next/navigation";
import {
  PALESTINE_BLOG_MESSAGES,
  PALESTINE_GENERAL_MESSAGES,
  PALESTINE_ROUTE_MESSAGES,
} from "@/lib/palestine-messages";

/**
 * Palestine solidarity banner.
 *
 * Lookup order (all messages are direct support statements):
 * 1. Main site routes — fixed unique message per page (PALESTINE_ROUTE_MESSAGES)
 * 2. Blog posts — that post's own unique message (PALESTINE_BLOG_MESSAGES)
 * 3. Everything else — deterministic rotation per route, so server and
 *    client always agree.
 */
export function PalestineBanner() {
  const rawPath = usePathname() ?? "/";
  // Normalize trailing slash ("/flights/" -> "/flights") so route keys match
  // in both dev and static-export (trailingSlash) modes.
  const pathname = rawPath !== "/" && rawPath.endsWith("/")
    ? rawPath.replace(/\/+$/, "")
    : rawPath;

  const blogMatch = pathname.match(/^\/blog\/([^/]+)/);
  let message: string;

  if (PALESTINE_ROUTE_MESSAGES[pathname]) {
    message = PALESTINE_ROUTE_MESSAGES[pathname];
  } else if (blogMatch && PALESTINE_BLOG_MESSAGES[blogMatch[1]]) {
    message = PALESTINE_BLOG_MESSAGES[blogMatch[1]];
  } else {
    // Stable rotation per route — same message on SSR and hydration.
    let hash = 0;
    for (let i = 0; i < pathname.length; i++) {
      hash = (hash * 31 + pathname.charCodeAt(i)) >>> 0;
    }
    message = PALESTINE_GENERAL_MESSAGES[hash % PALESTINE_GENERAL_MESSAGES.length];
  }

  return (
    <div className="pattern-navy text-white py-2 px-4 text-center">
      <p className="font-sans text-[11px] sm:text-[12px] leading-relaxed">
        🇵🇸 {message} 🇵🇸
      </p>
    </div>
  );
}

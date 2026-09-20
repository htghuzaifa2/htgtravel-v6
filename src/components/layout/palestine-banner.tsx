"use client";

import { usePathname } from "next/navigation";
import {
  PALESTINE_BLOG_MESSAGES,
  PALESTINE_GENERAL_MESSAGES,
} from "@/lib/palestine-messages";

/**
 * Palestine solidarity banner.
 *
 * On blog pages it displays that post's own unique solidarity message;
 * on every other page it rotates through the general message set —
 * deterministic per route, so server and client always agree.
 */
export function PalestineBanner() {
  const pathname = usePathname() ?? "/";

  const blogMatch = pathname.match(/^\/blog\/([^/]+)/);
  let message: string;

  if (blogMatch && PALESTINE_BLOG_MESSAGES[blogMatch[1]]) {
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

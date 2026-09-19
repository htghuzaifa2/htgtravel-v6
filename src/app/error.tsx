"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

/**
 * Global error boundary — defensive UI shown if any server component
 * throws during render or a client component throws at runtime.
 *
 * The default Next.js error UI is replaced with a brand-styled page that:
 * - Lets the user retry the route (`reset()` prop).
 * - Offers a quick link home.
 * - Offers a direct WhatsApp escape hatch (always works, no JS needed).
 *
 * This boundary does NOT swallow the error — it logs to console for
 * debugging while presenting a graceful face to the user.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[HTG Error Boundary]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center pattern-navy relative overflow-hidden px-4">
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, rgba(245,166,35,0.5), transparent 70%)" }}
      />
      <div className="relative max-w-md w-full text-center">
        <p className="font-mono text-sm font-semibold text-gold mb-3 tracking-widest uppercase">
          Error {error.digest ?? "500"}
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
          Something went wrong.
        </h1>
        <p className="text-on-navy-muted mb-8 leading-relaxed">
          We hit an unexpected issue while loading this page. Please try again —
          if the problem persists, reach us directly on WhatsApp and we will help
          you right away.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 shadow-md active:scale-95 transition-all duration-300"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-transparent border-2 border-white/30 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 hover:border-white/60 hover:-translate-y-0.5 backdrop-blur-sm active:scale-95 transition-all duration-300"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </div>

        <a
          href={SITE.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:text-gold transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          Message us on WhatsApp
        </a>
      </div>
    </div>
  );
}

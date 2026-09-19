import Link from "next/link";

/**
 * Root loading UI — shown during server-component render of any route
 * that doesn't define its own loading.tsx. Replaces the default blank
 * white flash during route transitions.
 *
 * Uses the defensive `pattern-navy` background so the screen never
 * flashes bright white (prevents dark-mode flash). All visible content
 * is pure markup + Tailwind — no animation system, no JS, no risk of
 * the "empty section" bug.
 */
export default function Loading() {
  return (
    <div className="pattern-navy min-h-[60vh] flex items-center justify-center px-4">
      <div className="relative max-w-md w-full text-center">
        {/* Pulsing loader (CSS-only, respects prefers-reduced-motion via globals.css) */}
        <div className="mx-auto mb-6 h-12 w-12 rounded-full border-2 border-white/20 border-t-gold animate-spin" />
        <h1 className="font-heading text-xl font-semibold text-white mb-2">
          Loading HTG Travels…
        </h1>
        <p className="text-on-navy-muted text-sm">
          Finding you the best fares and visa guidance.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-teal hover:text-gold transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

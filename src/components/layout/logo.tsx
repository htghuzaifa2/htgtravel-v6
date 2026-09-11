import Link from "next/link";
import Image from "next/image";

/**
 * Logo component — renders both light and dark versions, uses CSS to
 * show/hide based on theme. Most reliable approach: no JS, no hydration
 * issues, instant theme-aware swap.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center group flex-shrink-0 ${className ?? ""}`}>
      {/* Light mode logo (hidden in dark) */}
      <Image
        src="/logo.svg"
        alt="HTG Travels"
        width={280}
        height={48}
        priority
        className="h-10 lg:h-11 w-auto block dark:hidden transition-transform group-hover:scale-105"
      />
      {/* Dark mode logo (hidden in light) */}
      <Image
        src="/logo-white.svg"
        alt="HTG Travels"
        width={280}
        height={48}
        priority
        className="h-10 lg:h-11 w-auto hidden dark:block transition-transform group-hover:scale-105"
      />
    </Link>
  );
}

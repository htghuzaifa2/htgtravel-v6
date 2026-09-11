import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  variant?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  variant = "dark",
  className,
}: SectionHeadingProps) {
  const isLight = variant === "light";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-block font-sans text-xs font-semibold uppercase tracking-[0.15em] mb-3",
            isLight ? "text-gold" : "text-teal"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-heading font-semibold leading-tight",
          isLight ? "text-white" : "text-foreground",
          "text-2xl sm:text-3xl md:text-[32px]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            isLight ? "text-on-navy-muted" : "text-muted-foreground",
            align === "center" ? "mx-auto max-w-2xl" : ""
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

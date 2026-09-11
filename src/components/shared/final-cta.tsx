import { WhatsAppButton } from "@/components/shared/whatsapp-button";

type FinalCTAProps = {
  heading: string;
  body: string;
  buttonLabel: string;
  icon?: React.ReactNode;
  variant?: "gold" | "navy";
};

// Final CTA section used at the bottom of all detail pages.
// Default is sand background with gold button; navy variant for white-bg sections.
export function FinalCTA({ heading, body, buttonLabel, icon, variant = "sand" }: FinalCTAProps) {
  const bgClass = variant === "navy" ? "bg-navy text-white" : "bg-sand/40";
  const headingColor = variant === "navy" ? "text-white" : "text-navy";
  const bodyColor = variant === "navy" ? "text-sand/80" : "text-charcoal/80";

  return (
    <div className={bgClass}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className={`font-heading text-2xl md:text-3xl font-semibold mb-3 ${headingColor}`}>
          {heading}
        </h2>
        <p className={`text-base mb-6 ${bodyColor}`}>{body}</p>
        <WhatsAppButton variant="gold" size="lg">
          {icon}
          {buttonLabel}
        </WhatsAppButton>
      </div>
    </div>
  );
}

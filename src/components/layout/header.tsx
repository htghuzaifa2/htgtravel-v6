"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Send, ChevronDown, Plane, FileCheck, ShieldCheck, Building2, Briefcase, Globe, MapPin } from "lucide-react";
import { SITE } from "@/lib/constants";
import { openWhatsApp, generalInquiry } from "@/lib/whatsapp";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

// Service mega-menu items — shown in a dropdown when hovering "Services"
const SERVICES = [
  { icon: Plane, label: "Flights", href: "/flights", description: "Domestic & international air tickets" },
  { icon: FileCheck, label: "Visa Consultation", href: "/visa", description: "Tourist & business visas for 12+ countries" },
  { icon: ShieldCheck, label: "Umrah & Hajj", href: "/umrah", description: "Pilgrimage packages with hotels near Haram" },
  { icon: Briefcase, label: "Travel Insurance", href: "/insurance", description: "Schengen-approved, cancellation & baggage" },
  { icon: Building2, label: "Corporate Travel", href: "/corporate", description: "Dedicated account management & group fares" },
  { icon: Globe, label: "Destinations", href: "/destinations", description: "Browse all flight routes from Pakistan" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on route change (deferred to avoid effect-render warning)
  useEffect(() => {
    if (mobileOpen) {
      const t = setTimeout(() => setMobileOpen(false), 0);
      return () => clearTimeout(t);
    }
    if (servicesOpen) {
      const t = setTimeout(() => setServicesOpen(false), 0);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const navItems: { label: string; href: string }[] = [
    { label: "Home", href: "/" },
    { label: "Flights", href: "/flights" },
    { label: "Visas", href: "/visa" },
    { label: "Umrah", href: "/umrah" },
    { label: "Insurance", href: "/insurance" },
    { label: "Destinations", href: "/destinations" },
    { label: "Corporate", href: "/corporate" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b transition-all duration-200",
          scrolled ? "border-[#E5E0D8] shadow-sm" : "border-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-gold transition-transform group-hover:scale-105">
                <Send className="h-4 w-4" />
              </span>
              <span className="font-heading text-lg lg:text-xl">
                <span className="font-bold text-navy">HTG</span>
                <span className="text-navy/60"> Travels</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors rounded-md",
                    isActive(item.href)
                      ? "text-teal"
                      : "text-charcoal hover:text-teal"
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-teal" />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA + Theme toggle + Mobile toggle */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <ThemeToggle />
              <button
                onClick={() => openWhatsApp(generalInquiry())}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gold px-4 lg:px-5 py-2.5 text-sm font-semibold text-navy hover:brightness-105 transition-all shadow-sm hover:shadow-md"
              >
                <Send className="h-3.5 w-3.5" />
                Get Live Quote
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-navy hover:bg-sand"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E0D8]">
              <span className="font-heading text-lg font-bold text-navy">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-navy hover:bg-sand"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-5 py-3 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "text-teal bg-teal/5 border-l-2 border-teal"
                      : "text-charcoal hover:bg-sand hover:text-teal"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/faq"
                className={cn(
                  "block px-5 py-3 text-base font-medium transition-colors",
                  isActive("/faq")
                    ? "text-teal bg-teal/5 border-l-2 border-teal"
                    : "text-charcoal hover:bg-sand hover:text-teal"
                )}
              >
                FAQ
              </Link>
            </nav>
            <div className="p-5 border-t border-[#E5E0D8]">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  openWhatsApp(generalInquiry());
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-navy"
              >
                <Send className="h-4 w-4" />
                Message on WhatsApp
              </button>
              <p className="mt-3 text-center text-xs text-muted-grey">
                {SITE.whatsappDisplay} · {SITE.workingHoursShort}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

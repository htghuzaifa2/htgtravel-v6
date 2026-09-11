"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Send } from "lucide-react";
import { NAV_ITEMS, SITE } from "@/lib/constants";
import { openWhatsApp, generalInquiry } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    // Slight delay to allow drawer to close
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 bg-white border-b transition-shadow",
          scrolled ? "border-[#E5E0D8] shadow-sm" : "border-transparent"
        )}
        style={{ height: scrolled ? "64px" : "72px" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="#home" onClick={() => handleNavClick("#home")} className="flex items-center gap-2 group">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-navy text-gold">
              <Send className="h-4 w-4" />
            </span>
            <span className="font-heading text-xl">
              <span className="font-bold text-navy">HTG</span>
              <span className="text-navy/60"> Travels</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-3 py-2 text-sm font-medium text-charcoal hover:text-teal transition-colors rounded-md hover:bg-sand/60"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => openWhatsApp(generalInquiry())}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy hover:brightness-105 transition-all shadow-sm hover:shadow-md"
              style={{ height: "40px" }}
            >
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
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full px-5 py-3 text-left text-base font-medium text-charcoal hover:bg-sand hover:text-teal transition-colors"
                >
                  {item.label}
                </button>
              ))}
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

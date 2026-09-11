"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Send } from "lucide-react";
import { SITE } from "@/lib/constants";
import { openWhatsApp, generalInquiry } from "@/lib/whatsapp";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
          "sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b transition-all duration-200",
          scrolled ? "border-border shadow-sm" : "border-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group flex-shrink-0">
              <Image
                src="/logo.svg"
                alt="HTG Travels logo"
                width={160}
                height={40}
                priority
                className="h-9 lg:h-10 w-auto logo-adaptive transition-transform group-hover:scale-105"
              />
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
                      : "text-foreground hover:text-teal"
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
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-muted"
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
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-card shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <span className="font-heading text-lg font-bold text-foreground">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-muted"
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
                      : "text-foreground hover:bg-muted hover:text-teal"
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
                    : "text-foreground hover:bg-muted hover:text-teal"
                )}
              >
                FAQ
              </Link>
            </nav>
            <div className="p-5 border-t border-border">
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
              <p className="mt-3 text-center text-xs text-muted-foreground">
                {SITE.whatsappDisplay} · {SITE.workingHoursShort}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

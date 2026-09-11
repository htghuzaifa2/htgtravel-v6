"use client";

import Link from "next/link";
import Image from "next/image";
import { Send, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { SITE, FOOTER_LINKS } from "@/lib/constants";
import { openWhatsApp, generalInquiry } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pattern-navy text-white mt-auto">
      {/* Bottom Bar CTA */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <p className="font-heading text-xl md:text-2xl font-semibold">
                Need live flight rates or visa assistance?
              </p>
              <p className="mt-1 text-sm text-white/70">
                We respond within minutes on WhatsApp.
              </p>
            </div>
            <button
              onClick={() => openWhatsApp(generalInquiry())}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy hover:brightness-105 transition shadow-md whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4" />
              Message on WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/logo-white.svg"
                alt="HTG Travels logo"
                width={120}
                height={44}
                className="h-9 w-auto"
              />
            </Link>
            <p className="font-heading text-sm font-semibold text-gold">{SITE.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              {SITE.secondaryTagline} — flight ticketing, visa consultation, Umrah packages, and travel insurance for Pakistani travelers worldwide.
            </p>
            <p className="mt-3 text-xs text-white/50">
              Airline fares &amp; services are dynamically quoted in real-time — no outdated price lists.
            </p>

            <div className="mt-5 space-y-3">
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-white/80 hover:text-gold transition-colors"
              >
                <MessageCircle className="h-4 w-4 mt-0.5 text-teal flex-shrink-0" />
                <span>
                  <span className="block text-xs text-white/50">WhatsApp / Helpline</span>
                  {SITE.whatsappDisplay}
                </span>
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-start gap-3 text-sm text-white/80 hover:text-gold transition-colors"
              >
                <Mail className="h-4 w-4 mt-0.5 text-teal flex-shrink-0" />
                <span>
                  <span className="block text-xs text-white/50">Email</span>
                  {SITE.email}
                </span>
              </a>
              <div className="flex items-start gap-3 text-sm text-white/80">
                <MapPin className="h-4 w-4 mt-0.5 text-teal flex-shrink-0" />
                <span>
                  <span className="block text-xs text-white/50">Address</span>
                  {SITE.location}
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/80">
                <Clock className="h-4 w-4 mt-0.5 text-teal flex-shrink-0" />
                <span>
                  <span className="block text-xs text-white/50">Hours</span>
                  Monday–Sunday, 8:00 AM – 9:00 PM
                </span>
              </div>
            </div>
          </div>

          {/* Air Tickets */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Air Tickets
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.airTickets.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visa Consultation */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Visa Consultation
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.visaConsultation.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Services + Resources */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Travel Services
            </h3>
            <ul className="space-y-2 mb-6">
              {FOOTER_LINKS.travelServices.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Palestine Support Section */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="font-heading text-lg font-semibold mb-2">
              🇵🇸 We stand with Palestine.
            </p>
            <p className="text-sm text-white/70">
              Justice. Freedom. Peace. Humanity.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 items-center justify-start lg:justify-end">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80">
              ⚖️ Justice
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80">
              🕊️ Freedom
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80">
              ☮️ Peace
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80">
              ❤️ Humanity
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50 text-center md:text-left">
            © {year} HTG Travels. All rights reserved. Travel &amp; ticketing desk based in Sialkot, Pakistan — serving travelers nationwide.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-xs text-white/70 hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/terms-of-service" className="text-xs text-white/70 hover:text-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

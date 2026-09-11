"use client";

import { Send, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { SITE, FOOTER_LINKS } from "@/lib/constants";
import { openWhatsApp, generalInquiry } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
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
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gold">
                <Send className="h-4 w-4" />
              </span>
              <span className="font-heading text-xl">
                <span className="font-bold">HTG</span>
                <span className="text-white/60"> Travels</span>
              </span>
            </div>
            <p className="font-heading text-sm font-semibold text-gold">{SITE.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Sialkot&apos;s trusted travel desk for domestic &amp; international air ticketing, fast tourist visa processing, and travel insurance worldwide.
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
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
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
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
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
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
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

        {/* Better Call HTG Easter Egg Badge */}
        <div className="mt-10 flex justify-center">
          <div className="relative">
            <div
              className="h-20 w-20 rounded-full border-2 border-gold bg-navy flex flex-col items-center justify-center text-gold text-center"
              title="Better Call HTG"
            >
              <Send className="h-4 w-4 mb-0.5" />
              <span className="font-heading text-[8px] font-bold leading-tight">BETTER CALL</span>
              <span className="font-heading text-[10px] font-bold leading-tight">HTG</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50 text-center md:text-left">
            © {year} HTG Travels. All rights reserved. Travel &amp; ticketing desk in Sialkot, Pakistan.
          </p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="text-xs text-white/70 hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <span className="text-white/30">|</span>
            <a href="#terms" className="text-xs text-white/70 hover:text-gold transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

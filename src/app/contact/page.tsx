"use client";

import { useState } from "react";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/shared/page-hero";
import { contactInquiry } from "@/lib/whatsapp";
import { SITE } from "@/lib/constants";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = () => {
    window.open(
      "https://wa.me/923251480148?text=" +
        encodeURIComponent(contactInquiry({ name, email, message })),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We're Here to Help"
        subtitle="Get in Touch"
        intro="At HTG Travels, we value our travelers and are always here to help. Whether you need a flight quote, visa consultation, Umrah package, or a custom Pakistan tour itinerary, our team is ready to assist you on WhatsApp in minutes."
      />

      {/* Palestine Support */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl p-8 shadow-htg border border-border text-center">
            <p className="text-5xl mb-3">🇵🇸</p>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">We Stand with Palestine</h2>
            <p className="text-sm text-foreground/80 max-w-xl mx-auto mb-4">
              Solidarity with the Palestinian people in their struggle for freedom, justice, and human rights.
            </p>
            <p className="font-heading text-lg font-bold text-foreground mb-4">FREE PALESTINE</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["⚖️ Justice", "🕊️ Freedom", "☮️ Peace", "❤️ Humanity"].map((t) => (
                <span key={t} className="inline-flex items-center rounded-full bg-muted px-4 py-2 text-sm font-medium text-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl p-6 shadow-htg border border-border/60 text-center">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-base font-semibold text-foreground mb-2">Email Support</h3>
              <a href={`mailto:${SITE.email}`} className="block text-sm text-teal hover:text-gold transition-colors break-all">
                {SITE.email}
              </a>
              <p className="mt-2 text-xs text-muted-foreground">Our support team responds within 24 hours.</p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-htg border border-border/60 text-center">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-base font-semibold text-foreground mb-2">WhatsApp</h3>
              <a href={SITE.whatsappLink} target="_blank" rel="noopener noreferrer" className="block text-sm text-teal hover:text-gold transition-colors">
                {SITE.whatsappDisplay}
              </a>
              <p className="mt-2 text-xs text-muted-foreground">Chat with us instantly on WhatsApp.</p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-htg border border-border/60 text-center">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-base font-semibold text-foreground mb-2">Office</h3>
              <p className="text-sm text-foreground">{SITE.location}</p>
              <p className="mt-2 text-xs text-muted-foreground">{SITE.hours}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-htg-lg border border-border">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-1">Send Us a Message</h2>
            <p className="text-xs text-muted-foreground mb-6">
              The form does not submit to a server. It opens WhatsApp with a pre-filled message containing the form data.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="bg-muted/60" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email Address</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" className="bg-muted/60" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Your Message</label>
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." className="bg-muted/60 min-h-[140px]" />
              </div>
            </div>
            <button
              onClick={submit}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 shadow-md active:scale-95 transition-all duration-300 ease-out"
            >
              <Send className="h-4 w-4" />
              Send Message via WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Office Location Card (no Google Maps embed — privacy-friendly) */}
      <section className="pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl p-8 shadow-htg border border-border text-center">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Visit Our Office</h3>
            <p className="text-sm text-muted-foreground mb-4">{SITE.location}</p>
            <p className="text-xs text-muted-foreground">Message us on WhatsApp for the exact address — we'll share location pin instantly.</p>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4">Our Commitment</h2>
          <p className="text-base text-foreground/80 leading-relaxed">
            We believe in building trust through clear communication. Every query is important to us, and our goal is to provide you with fast, professional, and reliable support at every step of your journey with HTG Travels.
          </p>
        </div>
      </section>
    </>
  );
}

"use client";

import { useState } from "react";
import {
  Briefcase, Users, FileText, Clock, Send,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/shared/page-hero";
import { FinalCTA } from "@/components/shared/final-cta";
import { SectionHeading } from "@/components/shared/section-heading";
import { corporateInquiry } from "@/lib/whatsapp";

const benefits = [
  { icon: Users, title: "Dedicated Account Manager", description: "One point of contact for all your company's travel needs." },
  { icon: Briefcase, title: "Group Fares", description: "Special discounted rates for groups of 10 or more travelers." },
  { icon: FileText, title: "Invoice-Ready Billing", description: "Proper invoices for company accounting and GST filing." },
  { icon: Clock, title: "Flexible Payment Terms", description: "Credit terms available for established corporate accounts." },
];

const clients = [
  { title: "Corporates", description: "Employee travel, client visits, conference attendance." },
  { title: "NGOs & Non-Profits", description: "Field staff travel, volunteer groups, aid missions." },
  { title: "Government Offices", description: "Official delegations, training groups." },
  { title: "Umrah Groups", description: "Family groups, mosque committees, community organizations." },
];

export default function CorporatePage() {
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelers, setTravelers] = useState("");
  const [route, setRoute] = useState("");
  const [dates, setDates] = useState("");
  const [notes, setNotes] = useState("");

  const submit = () => {
    window.open(
      "https://wa.me/923251480148?text=" +
        encodeURIComponent(corporateInquiry({ company, contact, email, phone, travelers, route, dates, notes })),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <PageHero
        eyebrow="Corporate Travel"
        title="Corporate & Group Travel Solutions"
        subtitle="Dedicated Account Management for Businesses"
        intro="From company travel policies to group Umrah bookings, we provide dedicated account management, group fares, and invoice-ready billing for organizations of all sizes."
      />

      {/* Form */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-htg-lg border border-border">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-6">Corporate Quote Request</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Company Name</label>
                <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Your company name" className="bg-muted/60" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Contact Person</label>
                <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Full name" className="bg-muted/60" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@company.com" className="bg-muted/60" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Phone</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+92..." className="bg-muted/60" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Number of Travelers</label>
                <Input value={travelers} onChange={(e) => setTravelers(e.target.value)} placeholder="e.g. 15" className="bg-muted/60" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Route / Destination</label>
                <Input value={route} onChange={(e) => setRoute(e.target.value)} placeholder="e.g. Lahore to Dubai" className="bg-muted/60" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Travel Dates</label>
                <Input value={dates} onChange={(e) => setDates(e.target.value)} placeholder="e.g. 15-22 December 2026" className="bg-muted/60" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Special Requirements</label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Visa assistance, hotel, group Umrah, billing terms, etc." className="bg-muted/60 min-h-[100px]" />
              </div>
            </div>
            <button
              onClick={submit}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy hover:brightness-105 transition shadow-md"
            >
              <Send className="h-4 w-4" />
              Request Corporate Quote on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/40 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Benefits" title="Why Choose HTG for Corporate Travel" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((item) => (
              <div key={item.title} className="bg-card rounded-2xl p-6 border border-border/60 shadow-htg">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Clients" title="Who We Serve" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clients.map((item) => (
              <div key={item.title} className="bg-card rounded-2xl p-6 border border-border/60 shadow-htg">
                <h3 className="font-heading text-base font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Let's Discuss Your Corporate Travel Needs"
        body="Send us your requirements on WhatsApp. We will assign a dedicated account manager within 24 hours."
        buttonLabel="Request Corporate Consultation on WhatsApp"
        icon={<Briefcase className="h-4 w-4" />}
      />
    </>
  );
}

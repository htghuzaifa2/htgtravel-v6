"use client";

import { useState, useMemo } from "react";
import { Plane, Clock, Search, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHero } from "@/components/shared/page-hero";
import { FinalCTA } from "@/components/shared/final-cta";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { ALL_ROUTES } from "@/lib/data";
import { routeInquiry } from "@/lib/whatsapp";

const PER_PAGE = 12;

export default function DestinationsPage() {
  const [filter, setFilter] = useState<"all" | "Domestic" | "International">("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = ALL_ROUTES;
    if (filter !== "all") list = list.filter((r) => r.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((r) =>
        r.code.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.airlines.join(",").toLowerCase().includes(q)
      );
    }
    return list;
  }, [filter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageRoutes = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="Flight Routes From Pakistan"
        subtitle="Domestic & International Flight Destinations"
        intro="Browse our most requested routes or search for your specific destination. Every route is quoted with live fares on WhatsApp."
      />

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3 mb-8 items-center justify-between">
            <Tabs value={filter} onValueChange={(v) => { setFilter(v as typeof filter); setPage(1); }}>
              <TabsList className="bg-muted">
                <TabsTrigger value="all" className="data-[state=active]:bg-foreground data-[state=active]:text-background">All</TabsTrigger>
                <TabsTrigger value="Domestic" className="data-[state=active]:bg-foreground data-[state=active]:text-background">Domestic</TabsTrigger>
                <TabsTrigger value="International" className="data-[state=active]:bg-foreground data-[state=active]:text-background">International</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search routes (e.g. Sialkot, Dubai, SKT, London...)"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-9 input-recessed border-transparent h-10"
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground mb-6">
            Showing {pageRoutes.length === 0 ? 0 : (currentPage - 1) * PER_PAGE + 1}–{(currentPage - 1) * PER_PAGE + pageRoutes.length} of {filtered.length} flight routes · Page {currentPage} of {totalPages}
          </p>

          {pageRoutes.length === 0 ? (
            <div className="bg-card rounded-2xl p-12 text-center border border-border/60">
              <p className="text-foreground mb-4">No routes found matching your search.</p>
              <WhatsAppButton
                message="Hi HTG Travels, I'm looking for a flight route that I couldn't find on your site. Can you help?"
                variant="primary"
                size="md"
              >
                <Send className="h-4 w-4" />
                Ask on WhatsApp
              </WhatsAppButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageRoutes.map((route) => (
                <div key={route.code} className="bg-card rounded-2xl p-6 shadow-htg border border-border/60 hover:shadow-htg-lg transition-shadow flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="font-heading text-base font-semibold text-foreground">{route.code}</p>
                      <p className="text-sm text-foreground">{route.name}</p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <span className="inline-flex items-center rounded-full bg-navy/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground">
                        {route.category}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-medium text-gold">
                        {route.frequency}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed mb-3">{route.description}</p>
                  <div className="space-y-1 text-xs text-muted-foreground mb-4">
                    <p className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {route.duration}</p>
                    <p className="flex items-center gap-1.5"><Plane className="h-3.5 w-3.5" /> {route.airlines.join(", ")}</p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-teal mb-3">Live Rate on Request</p>
                    <WhatsAppButton
                      message={routeInquiry(route.code, route.name)}
                      variant="outline"
                      size="sm"
                      fullWidth
                    >
                      Inquire Rates
                    </WhatsAppButton>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm rounded-md border border-border bg-card text-foreground disabled:opacity-40 hover:bg-muted transition"
              >
                ← Prev
              </button>
              <span className="px-3 text-sm text-foreground">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm rounded-md border border-border bg-card text-foreground disabled:opacity-40 hover:bg-muted transition"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>

      <FinalCTA
        heading="Can't Find Your Route?"
        body="We book flights to 160+ destinations worldwide. Send us your route on WhatsApp and we will find the best available fare."
        buttonLabel="Ask for Your Route on WhatsApp"
        icon={<Plane className="h-4 w-4" />}
      />
    </>
  );
}

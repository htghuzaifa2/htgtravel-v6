"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRightLeft, Search, Coins } from "lucide-react";

// Indicative FX rates relative to 1 USD (Pakistani Rupee is the primary user base).
// These are STATIC rates, NOT live market rates. They are updated periodically
// by editing this file. The tool's purpose is general informational currency
// conversion (e.g. "how much is 100 USD in PKR?") — it is NOT for trading
// decisions or live rate quoting.
//
// Source: average interbank rates, late 2025. Update as needed.

type Currency = { code: string; name: string; flag: string; rateFromUSD: number };

const CURRENCIES: Currency[] = [
  { code: "PKR", name: "Pakistani Rupee", flag: "🇵🇰", rateFromUSD: 278.5 },
  { code: "USD", name: "US Dollar", flag: "🇺🇸", rateFromUSD: 1 },
  { code: "EUR", name: "Euro", flag: "🇪🇺", rateFromUSD: 0.92 },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", rateFromUSD: 0.79 },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪", rateFromUSD: 3.67 },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦", rateFromUSD: 3.75 },
  { code: "QAR", name: "Qatari Riyal", flag: "🇶🇦", rateFromUSD: 3.64 },
  { code: "OMR", name: "Omani Rial", flag: "🇴🇲", rateFromUSD: 0.385 },
  { code: "KWD", name: "Kuwaiti Dinar", flag: "🇰🇼", rateFromUSD: 0.307 },
  { code: "BHD", name: "Bahraini Dinar", flag: "🇧🇭", rateFromUSD: 0.376 },
  { code: "TRY", name: "Turkish Lira", flag: "🇹🇷", rateFromUSD: 34.2 },
  { code: "MYR", name: "Malaysian Ringgit", flag: "🇲🇾", rateFromUSD: 4.45 },
  { code: "THB", name: "Thai Baht", flag: "🇹🇭", rateFromUSD: 35.8 },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬", rateFromUSD: 1.34 },
  { code: "IDR", name: "Indonesian Rupiah", flag: "🇮🇩", rateFromUSD: 15750 },
  { code: "PHP", name: "Philippine Peso", flag: "🇵🇭", rateFromUSD: 58.5 },
  { code: "VND", name: "Vietnamese Dong", flag: "🇻🇳", rateFromUSD: 25400 },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳", rateFromUSD: 7.24 },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", rateFromUSD: 149.5 },
  { code: "KRW", name: "South Korean Won", flag: "🇰🇷", rateFromUSD: 1340 },
  { code: "HKD", name: "Hong Kong Dollar", flag: "🇭🇰", rateFromUSD: 7.81 },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳", rateFromUSD: 83.2 },
  { code: "BDT", name: "Bangladeshi Taka", flag: "🇧🇩", rateFromUSD: 109.5 },
  { code: "LKR", name: "Sri Lankan Rupee", flag: "🇱🇰", rateFromUSD: 295.0 },
  { code: "NPR", name: "Nepali Rupee", flag: "🇳🇵", rateFromUSD: 133.5 },
  { code: "AFN", name: "Afghan Afghani", flag: "🇦🇫", rateFromUSD: 71.2 },
  { code: "IRR", name: "Iranian Rial", flag: "🇮🇷", rateFromUSD: 42000 },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", rateFromUSD: 1.36 },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺", rateFromUSD: 1.52 },
  { code: "NZD", name: "New Zealand Dollar", flag: "🇳🇿", rateFromUSD: 1.64 },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭", rateFromUSD: 0.88 },
  { code: "SEK", name: "Swedish Krona", flag: "🇸🇪", rateFromUSD: 10.55 },
  { code: "NOK", name: "Norwegian Krone", flag: "🇳🇴", rateFromUSD: 10.85 },
  { code: "DKK", name: "Danish Krone", flag: "🇩🇰", rateFromUSD: 6.88 },
  { code: "PLN", name: "Polish Zloty", flag: "🇵🇱", rateFromUSD: 4.05 },
  { code: "CZK", name: "Czech Koruna", flag: "🇨🇿", rateFromUSD: 23.4 },
  { code: "HUF", name: "Hungarian Forint", flag: "🇭🇺", rateFromUSD: 365.0 },
  { code: "RUB", name: "Russian Ruble", flag: "🇷🇺", rateFromUSD: 92.5 },
  { code: "UAH", name: "Ukrainian Hryvnia", flag: "🇺🇦", rateFromUSD: 39.8 },
  { code: "TRY", name: "Turkish Lira (Old)", flag: "🇹🇷", rateFromUSD: 34.2 }, // dedupe below
  { code: "BRL", name: "Brazilian Real", flag: "🇧🇷", rateFromUSD: 5.05 },
  { code: "MXN", name: "Mexican Peso", flag: "🇲🇽", rateFromUSD: 17.85 },
  { code: "ARS", name: "Argentine Peso", flag: "🇦🇷", rateFromUSD: 985.0 },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦", rateFromUSD: 18.55 },
  { code: "EGP", name: "Egyptian Pound", flag: "🇪🇬", rateFromUSD: 48.9 },
  { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬", rateFromUSD: 1580 },
  { code: "KES", name: "Kenyan Shilling", flag: "🇰🇪", rateFromUSD: 129.0 },
  { code: "MAD", name: "Moroccan Dirham", flag: "🇲🇦", rateFromUSD: 9.95 },
  { code: "ETB", name: "Ethiopian Birr", flag: "🇪🇹", rateFromUSD: 57.8 },
];

// Dedupe — remove the duplicate TRY entry above
const UNIQUE_CURRENCIES = CURRENCIES.filter(
  (c, i, arr) => arr.findIndex((x) => x.code === c.code) === i
);

function convert(amount: number, from: string, to: string): number {
  const f = UNIQUE_CURRENCIES.find((c) => c.code === from);
  const t = UNIQUE_CURRENCIES.find((c) => c.code === to);
  if (!f || !t) return 0;
  // amount in `from` → USD → `to`
  const usd = amount / f.rateFromUSD;
  return usd * t.rateFromUSD;
}

function formatAmount(n: number, code: string): string {
  if (!isFinite(n)) return "—";
  const dec = ["KWD", "OMR", "BHD", "JPY", "VND", "KRW", "IDR", "IRR", "ARS", "NGN"].includes(code) ? (["JPY", "VND", "KRW", "IDR", "IRR", "ARS", "NGN"].includes(code) ? 0 : 3) : 2;
  return `${code} ${n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec })}`;
}

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PKR");
  const [search, setSearch] = useState("");

  const result = useMemo(() => {
    const amt = parseFloat(amount) || 0;
    return convert(amt, from, to);
  }, [amount, from, to]);

  const swap = useCallback(() => {
    setFrom(to);
    setTo(from);
  }, [from, to]);

  const filteredCurrencies = useMemo(() => {
    if (!search.trim()) return UNIQUE_CURRENCIES;
    const q = search.toLowerCase();
    return UNIQUE_CURRENCIES.filter(
      (c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
    );
  }, [search]);

  // Cross-rate table — every currency vs the FROM currency
  const crossRates = useMemo(() => {
    const amt = parseFloat(amount) || 1;
    return UNIQUE_CURRENCIES.map((c) => ({
      ...c,
      converted: convert(amt, from, c.code),
    })).sort((a, b) => b.converted - a.converted);
  }, [amount, from]);

  return (
    <>
      <section className="pattern-navy relative overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <Link
            href="/tools/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-on-navy-muted hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Link>
          <h1 className="font-heading font-bold text-white leading-tight text-3xl sm:text-4xl md:text-[40px]">
            Currency Converter
          </h1>
          <p className="mt-4 text-base md:text-lg text-on-navy-muted leading-relaxed max-w-2xl">
            Convert between {UNIQUE_CURRENCIES.length} world currencies. Indicative
            rates — useful for travel planning and general conversion. Not for
            trading decisions.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Main converter */}
          <div className="glass rounded-2xl p-6 sm:p-8 mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
              {/* From */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Amount</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full h-14 rounded-xl input-recessed border-transparent px-4 text-lg font-semibold text-foreground focus:ring-2 focus:ring-teal/20 outline-none"
                />
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="mt-3 w-full h-12 rounded-xl input-recessed border-transparent px-4 text-base text-foreground outline-none focus:ring-2 focus:ring-teal/20"
                >
                  {UNIQUE_CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code} — {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap button */}
              <button
                type="button"
                data-no-touch-target
                onClick={swap}
                className="sm:mb-1 mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal text-white hover:brightness-110 active:scale-95 transition shadow-md"
                aria-label="Swap currencies"
                title="Swap"
              >
                <ArrowRightLeft className="h-5 w-5" />
              </button>

              {/* To */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Converted to</label>
                <div className="w-full h-14 rounded-xl bg-muted/40 border border-border px-4 flex items-center text-lg font-bold text-foreground break-words tabular-nums">
                  {formatAmount(result, to)}
                </div>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="mt-3 w-full h-12 rounded-xl input-recessed border-transparent px-4 text-base text-foreground outline-none focus:ring-2 focus:ring-teal/20"
                >
                  {UNIQUE_CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code} — {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-muted/40 text-center">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{parseFloat(amount) || 0} {from}</span>{" "}
                ={" "}
                <span className="font-bold text-teal text-base">{formatAmount(result, to)}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Indicative rate · 1 {from} = {formatAmount(convert(1, from, to), to)}
              </p>
            </div>
          </div>

          {/* Cross-rate table */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Coins className="h-5 w-5 text-gold" />
              {parseFloat(amount) || 0} {from} in all currencies
            </h2>
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search currency..."
                className="w-full h-12 rounded-xl input-recessed border-transparent pl-12 pr-4 text-base text-foreground outline-none focus:ring-2 focus:ring-teal/20"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredCurrencies.map((c) => (
                <div
                  key={c.code}
                  className="flex items-center justify-between glass rounded-xl p-3 border border-border/40"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{c.flag}</span>
                      <span className="font-mono text-xs font-bold text-foreground">{c.code}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate">{c.name}</p>
                  </div>
                  <span className="font-semibold text-sm text-foreground tabular-nums break-words text-right">
                    {formatAmount(c.converted, c.code)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-muted/30 text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Disclaimer:</strong> Rates shown are
            indicative and updated periodically. They are not live market rates and
            should not be used for trading or financial decisions. For exact exchange
            rates, consult your bank or a verified FX provider.
          </div>
        </div>
      </section>
    </>
  );
}

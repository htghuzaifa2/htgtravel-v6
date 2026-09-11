# HTG Travels — Cloudflare Pages Static Site

A purely client-side Next.js 16 multi-page static export for HTG Travels, a Pakistan-based travel desk serving Pakistani travelers nationwide and worldwide.

## Tech Stack

- **Next.js 16** (App Router) with `output: 'export'` — fully static, no server
- **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** + **Radix UI**
- **Lucide React** icons
- **Sora** (headings) + **Inter** (body) via `next/font`
- **Sonner** for toasts

## Multi-Page Architecture (NOT a single-page app)

Each section is its own Next.js route — improves load time, code-splitting, and SEO.

| Route              | Purpose                                                  |
| ------------------ | -------------------------------------------------------- |
| `/`                | Home — hero, services, popular routes, why HTG, CTA    |
| `/flights`         | Flight quote form + airline partners + why book          |
| `/visa`            | 12 visa country cards + process timeline                |
| `/umrah`           | 11 Umrah/Hajj packages + quote builder                  |
| `/insurance`       | 4 insurance plans + why get insured                     |
| `/destinations`    | All 30 routes with search/filter/pagination             |
| `/corporate`       | Corporate quote form + benefits + clients              |
| `/about`           | Mission, values, what we do, quick links                |
| `/faq`             | 6 categories × 27 questions in accordions               |
| `/contact`         | Contact form (WhatsApp), contact methods, map           |
| `/privacy-policy`  | Privacy policy                                           |
| `/terms-of-service`| Terms of service                                         |

## Build & Deploy to Cloudflare Pages

### Option A — Connect GitHub repo

1. Push this project to GitHub.
2. Cloudflare Dashboard → Pages → Create a project → Connect to Git.
3. Pick this repo.
4. Build settings:
   - **Framework preset:** Next.js
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node version:** 20 or later (set via `.nvmrc` or env var `NODE_VERSION=20`)
5. Save and deploy.

### Option B — Wrangler CLI

```bash
npm install -g wrangler
npm run build
wrangler pages deploy out --project-name=htg-travels
```

### Custom Domain

1. Cloudflare Pages → Custom domains → Add `htg.com.pk`.
2. Update DNS at registrar to point to Cloudflare.

## Local Development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # produces ./out
```

## Architecture Notes

- **No backend, no database, no API routes.** Purely client-side.
- All CTAs route to WhatsApp via deep links: `https://wa.me/923251480148?text=...`
- Forms pre-fill a WhatsApp message — no server submission.
- Navigation uses Next.js `<Link>` for client-side routing between pages.
- Page metadata (title, description) is set per-route via `metadata` exports in each `layout.tsx` / `page.tsx`.
- Images use `next/image` with `unoptimized: true` (per static export requirements).

## File Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout (Sora+Inter, metadata, schema, Header, Footer)
│   ├── page.tsx                    # Home
│   ├── globals.css                 # HTG brand colors + Tailwind theme
│   ├── about/page.tsx
│   ├── flights/
│   │   ├── layout.tsx              # Page metadata
│   │   └── page.tsx                # Client component (form state)
│   ├── visa/page.tsx
│   ├── umrah/
│   │   ├── layout.tsx              # Page metadata
│   │   └── page.tsx                # Client component (quote builder)
│   ├── insurance/page.tsx
│   ├── destinations/
│   │   ├── layout.tsx              # Page metadata
│   │   └── page.tsx                # Client component (search/filter/pagination)
│   ├── corporate/
│   │   ├── layout.tsx              # Page metadata
│   │   └── page.tsx                # Client component (quote form)
│   ├── faq/page.tsx
│   ├── contact/
│   │   ├── layout.tsx              # Page metadata
│   │   └── page.tsx                # Client component (contact form)
│   ├── privacy-policy/page.tsx
│   └── terms-of-service/page.tsx
├── components/
│   ├── layout/                     # PalestineBanner, Header, Footer, StickyWhatsApp
│   ├── home/                       # Hero, home-sections
│   └── shared/                     # PageHero, FinalCTA, WhatsAppButton, SectionHeading
├── lib/
│   ├── constants.ts                # SITE, NAV_ITEMS, FOOTER_LINKS
│   ├── whatsapp.ts                 # buildWhatsAppLink, message templates
│   ├── data.ts                     # Routes, Visa, Umrah, Insurance, FAQ data
│   └── utils.ts                    # cn()
└── public/
    ├── robots.txt
    ├── sitemap.xml
    ├── _headers                    # Cloudflare Pages security & cache headers
    └── logo.svg
```

## Brand Identity

| Color          | Hex       | Usage                                    |
| -------------- | --------- | ---------------------------------------- |
| Midnight Navy  | `#0B1F2A` | Primary text, header bg, footer          |
| Deep Teal      | `#0FA3A3` | Accent buttons, links, icons             |
| Warm Gold      | `#F5A623` | Primary CTA buttons, highlights         |
| Sand           | `#F7F3EC` | Page background                          |
| Charcoal       | `#1A2B35` | Secondary text                           |
| Muted Grey     | `#6B7B85` | Tertiary text, placeholders              |

## Messaging

- **Tagline:** Tickets · Visas · Insurance
- **Secondary tagline:** Pakistan's Trusted Travel Desk
- **Hero headline:** Fly From Pakistan. Land Anywhere. Visa Help Without the Guesswork.
- **Service area:** Pakistan-wide, serving Pakistani travelers worldwide.

## What Was Removed (No Fake Content)

- ❌ Fake customer testimonials (Muhammad A., Fatima R., Usman K.)
- ❌ "Better Call HTG" easter-egg badge (TV show reference)
- ❌ Fake blog post dates and reading times
- ❌ Sialkot-only messaging (broadened to Pakistan-wide)
- ❌ Single-page architecture (split into 12 routes for performance)

## Contact

- WhatsApp: +92 325 1480148
- Email: htghuzaifa@gmail.com
- Location: Sialkot, Punjab, Pakistan
- Hours: Monday–Sunday, 8:00 AM – 9:00 PM (PKT)

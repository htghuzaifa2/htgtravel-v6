# HTG Travels — Cloudflare Pages Deployment Guide

A purely client-side Next.js 16 static export site for HTG Travels (Sialkot, Pakistan).

## Tech Stack

- Next.js 16 (App Router) with `output: 'export'`
- TypeScript
- Tailwind CSS v4 + shadcn/ui + Radix UI
- Lucide React icons
- Sora + Inter (Google Fonts)
- React Hook Form + Zod (client-side)
- Sonner (toasts)

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
- Images use `next/image` with `unoptimized: true` (per static export requirements).
- Single-page app with hash-based navigation (`#home`, `#flights`, `#visa`, etc.).

## File Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout (Sora+Inter, metadata, schema)
│   ├── page.tsx             # Home (assembles all sections)
│   └── globals.css          # HTG brand colors + Tailwind theme
├── components/
│   ├── layout/              # PalestineBanner, Header, Footer, StickyWhatsApp
│   ├── sections/            # Hero, home-sections, detail-sections
│   └── shared/              # WhatsAppButton, SectionHeading
├── lib/
│   ├── constants.ts         # SITE, NAV_ITEMS, FOOTER_LINKS
│   ├── whatsapp.ts          # buildWhatsAppLink, message templates
│   ├── data.ts              # Routes, Visa, Umrah, Insurance, FAQ data
│   └── utils.ts             # cn()
└── public/
    ├── robots.txt
    ├── sitemap.xml
    ├── _headers             # Cloudflare Pages security & cache headers
    └── logo.svg
```

## Brand Identity

| Color | Hex | Usage |
|---|---|---|
| Midnight Navy | `#0B1F2A` | Primary text, header bg, footer |
| Deep Teal | `#0FA3A3` | Accent buttons, links, icons |
| Warm Gold | `#F5A623` | Primary CTA buttons, highlights |
| Sand | `#F7F3EC` | Page background |
| Charcoal | `#1A2B35` | Secondary text |
| Muted Grey | `#6B7B85` | Tertiary text, placeholders |

## Contact

- WhatsApp: +92 325 1480148
- Email: htghuzaifa@gmail.com
- Location: Sialkot, Punjab, Pakistan
- Hours: Monday–Sunday, 8:00 AM – 9:00 PM (PKT)

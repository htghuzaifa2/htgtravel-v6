# HTG Travels — Cloudflare Pages Static Site

A purely client-side Next.js 16 multi-page static export for HTG Travels, a Pakistan-based travel desk serving Pakistani travelers nationwide and worldwide.

**Live repo:** https://github.com/htghuzaifa2/htg-travel-v1

## Tech Stack

- **Next.js 16** (App Router) with `output: 'export'` — fully static, no server
- **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** + **Radix UI**
- **Lucide React** icons
- **Sora** (headings) + **Inter** (body) via `next/font`
- **Framer Motion** (only for interactive button hover/tap)
- **next-themes** for dark/light mode
- CSS-driven scroll-reveal animations (no JS animation loops)

## Multi-Page Architecture

Each section is its own Next.js route:

| Route              | Purpose                                                  |
| ------------------ | -------------------------------------------------------- |
| `/`                | Home — hero, services, popular routes, why HTG, CTA    |
| `/flights`         | Flight quote form + airline partners                    |
| `/visa`            | 12 visa country cards + process timeline                |
| `/umrah`           | 11 Umrah/Hajj packages + quote builder                  |
| `/insurance`       | 4 insurance plans                                       |
| `/destinations`    | All 30 routes with search/filter/pagination             |
| `/corporate`       | Corporate quote form + benefits                        |
| `/about`           | Mission, values, what we do                            |
| `/faq`             | 6 categories × 27 questions in accordions               |
| `/contact`         | Contact form (WhatsApp), contact methods, map          |
| `/privacy-policy`  | Privacy policy                                           |
| `/terms-of-service`| Terms of service                                         |

## Deploy to Cloudflare Pages

### Option A — Connect GitHub repo (recommended)

1. Go to Cloudflare Dashboard → Pages → Create a project → Connect to Git.
2. Select the `htghuzaifa2/htg-travel-v1` repository.
3. Build settings (auto-detected from `wrangler.toml`):
   - **Framework preset:** Next.js
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node version:** 20 (specified in `.nvmrc`)
4. Click **Save and Deploy**.
5. Add custom domain `htg.com.pk` in Pages → Custom domains.

### Option B — Wrangler CLI

```bash
npm install -g wrangler
npm run build
wrangler pages deploy out --project-name=htg-travels
```

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
- Navigation uses Next.js `<Link>` for client-side routing.
- Page metadata set per-route via `metadata` exports in `layout.tsx` / `page.tsx`.
- Images use `next/image` with `unoptimized: true` (static export requirement).
- Animations: CSS-driven scroll reveal (IntersectionObserver toggles `.is-visible` class), CSS keyframe drift blobs, Framer Motion only for button hover/tap.

## File Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout (Sora+Inter, header, footer, theme)
│   ├── page.tsx                    # Home
│   ├── globals.css                 # HTG brand colors + dark blue theme + animations
│   ├── about/page.tsx
│   ├── flights/{layout,page}.tsx
│   ├── visa/page.tsx
│   ├── umrah/{layout,page}.tsx
│   ├── insurance/page.tsx
│   ├── destinations/{layout,page}.tsx
│   ├── corporate/{layout,page}.tsx
│   ├── faq/page.tsx
│   ├── contact/{layout,page}.tsx
│   ├── privacy-policy/page.tsx
│   └── terms-of-service/page.tsx
├── components/
│   ├── layout/                     # PalestineBanner, Header, Footer, StickyWhatsApp
│   ├── home/                       # Hero, home-sections
│   ├── shared/                     # PageHero, FinalCTA, WhatsAppButton, SectionHeading
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── animations.tsx              # FadeIn, Stagger, HoverLift, MotionButton
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

| Color          | Light Hex | Dark Hex   | Usage                                    |
| -------------- | --------- | ---------- | ---------------------------------------- |
| Background     | `#F7F3EC` | `#0A1530`  | Page background (sand / sapphire blue)   |
| Foreground     | `#0B1F2A` | `#E8F0FA`  | Primary text                             |
| Card           | `#FFFFFF` | `#112244`  | Card surfaces                            |
| Primary (Gold) | `#F5A623` | `#F5A623`  | CTA buttons, highlights                 |
| Accent (Teal)  | `#0FA3A3` | `#14B8B8`  | Links, icons, accents                    |
| Border         | `#E5E0D8` | `#1B3460`  | Dividers, borders                        |

## Performance

- Home page render: **15-25ms**
- All 14 pages prerendered statically in **~400ms**
- CSS-driven animations (no JS animation loops on scroll)
- `prefers-reduced-motion` respected

## Contact

- WhatsApp: +92 325 1480148
- Email: htghuzaifa@gmail.com
- Location: Sialkot, Punjab, Pakistan
- Hours: Monday–Sunday, 8:00 AM – 9:00 PM (PKT)

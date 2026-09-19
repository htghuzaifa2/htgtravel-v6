import type { MetadataRoute } from "next";

// Required for `output: "export"` (Cloudflare Pages static export).
// Without this, Next.js throws: "export const dynamic = 'force-static'/
// export const revalidate not configured on route".
export const dynamic = "force-static";

/**
 * PWA Web App Manifest — enables "Add to Home Screen" on iOS/Android,
 * gives the browser-app a proper name/theme-color when installed.
 * Replaces the need for a static /public/manifest.json.
 */
export default function Manifest(): MetadataRoute.Manifest {
  return {
    name: "HTG Travels — Flight Tickets & Visa Consultation",
    short_name: "HTG Travels",
    description:
      "Book domestic & international flights, get visa consultation, Umrah packages, and travel insurance. Pakistan-based travel desk serving travelers nationwide.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B1F2A",
    theme_color: "#0B1F2A",
    orientation: "portrait-primary",
    categories: ["travel", "business", "productivity", "lifestyle"],
    lang: "en-PK",
    dir: "ltr",
    scope: "/",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/favicon.svg",
        sizes: "192x192 512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Book Flights",
        short_name: "Flights",
        url: "/flights",
        icons: [{ src: "/favicon.svg", sizes: "any" }],
      },
      {
        name: "Visa Consultation",
        short_name: "Visas",
        url: "/visa",
        icons: [{ src: "/favicon.svg", sizes: "any" }],
      },
      {
        name: "Umrah Packages",
        short_name: "Umrah",
        url: "/umrah",
        icons: [{ src: "/favicon.svg", sizes: "any" }],
      },
      {
        name: "Travel Blog",
        short_name: "Blog",
        url: "/blog",
        icons: [{ src: "/favicon.svg", sizes: "any" }],
      },
    ],
  };
}

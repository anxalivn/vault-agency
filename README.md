# lexManages — Agency Landing Site

Next.js (App Router) + TypeScript + Tailwind CSS landing page for a woman-owned Fansly/OnlyFans management agency, with GSAP + Framer Motion animations, a Calendly booking embed, and a Netlify deploy setup.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** — theme tokens defined in [`src/app/globals.css`](src/app/globals.css) (`--color-blush`, `--color-ink`, etc.)
- **GSAP** (`ScrollTrigger`, `quickTo`) — scroll-driven reveals, the magnetic buttons, the animated counters, the custom cursor
- **Framer Motion** — fades, the mobile nav menu, hover/tap micro-interactions
- **Lenis** — smooth scrolling
- **react-calendly** — inline booking widget
- **@next/third-parties** — Google Analytics (GA4) loader

## Project structure

```
src/
  app/
    layout.tsx           Root layout: fonts, metadata, JSON-LD, providers, Navbar/Footer, GA
    page.tsx              Assembles the page sections (home)
    not-found.tsx          Custom 404 page
    thank-you/page.tsx      Post-booking thank-you page (noindex)
    robots.ts               Generates /robots.txt
    sitemap.ts               Generates /sitemap.xml
    opengraph-image.tsx       Generates the social share image (og:image / twitter:image)
    globals.css               Tailwind import + theme tokens + global styles
  components/
    layout/                   Navbar, Footer
    sections/                 Hero, Services, StatsBand, Proofs, Process, About, CTA
    ui/                        Reusable animation & UI primitives (RevealText, FadeIn,
                               MagneticButton, Counter, ProofCard, CustomCursor,
                               Breadcrumbs, StickyMobileCTA)
    providers/                 SmoothScrollProvider (Lenis + GSAP ticker)
    seo/                       JsonLd (ProfessionalService structured data)
  lib/
    content.ts                Reads .env.local (see below) with placeholder fallbacks, plus
                               copy that isn't meant to be swapped per-deploy
    gsap.ts                    GSAP + ScrollTrigger registration
```

## Before you launch — one file to edit: `.env.local`

Copy `.env.example` to `.env.local` and fill in your real values — this is the single place
that controls your Calendly link, contact info, socials, images, and analytics ID:

```bash
cp .env.example .env.local
```

| Variable | Controls |
| --- | --- |
| `NEXT_PUBLIC_SITE_NAME` | Agency name shown throughout the site |
| `NEXT_PUBLIC_SITE_URL` | Production domain (canonical URLs, sitemap, robots.txt, structured data) |
| `NEXT_PUBLIC_CALENDLY_URL` | Calendly link embedded in the CTA section |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email shown in the CTA/footer and used in `mailto:` links |
| `NEXT_PUBLIC_CONTACT_PHONE` | Phone number used in structured data |
| `NEXT_PUBLIC_INSTAGRAM_URL` / `_TWITTER_URL` / `_TIKTOK_URL` | Footer social links |
| `NEXT_PUBLIC_PROOF_IMAGE_1` / `_2` / `_3` | The three earnings screenshots in the Receipts section |
| `NEXT_PUBLIC_ABOUT_IMAGE` | Founder/team photo in the About section |
| `NEXT_PUBLIC_GA_ID` | Google Analytics (GA4) measurement ID |

Every variable falls back to a placeholder if left blank, so the site always builds and runs —
but nothing will look "real" until these are set. Restart `npm run dev` after editing
`.env.local` (env vars are only read at build/start). On Netlify, set the same variables under
**Site settings → Environment variables**.

Two things stay in [`src/lib/content.ts`](src/lib/content.ts) directly rather than the env file,
since they're paragraphs of copy rather than links/contact/images: the `business` block (legal
name + address for structured data) and section copy (services, process steps, etc).

### Adding real proof screenshots

The Receipts section shows exactly 3 desktop-style (16:9) earnings screenshots. Each renders a
styled placeholder until you set its env var:

1. Drop images into `public/proofs/` (or host them anywhere and use the full URL).
2. Set `NEXT_PUBLIC_PROOF_IMAGE_1`, `_2`, `_3` in `.env.local` to those paths/URLs.

Same pattern for the About section's founder/team photo via `NEXT_PUBLIC_ABOUT_IMAGE`.

### Calendly → thank-you redirect

The booking CTA embeds Calendly inline. To send visitors to [`/thank-you`](src/app/thank-you/page.tsx) after they book, configure it in Calendly's own dashboard: **Event Type → Confirmation Page → Redirect to an external site**, and point it at `https://yourdomain.com/thank-you`. (Calendly controls the post-booking redirect; it can't be set from the embed props alone.)

### SEO / conversion features included

- Custom [404 page](src/app/not-found.tsx) and [thank-you page](src/app/thank-you/page.tsx), both with breadcrumbs
- CTA above the fold in the Hero, plus an in-page "jump to section" internal link row and a mobile sticky CTA bar ([StickyMobileCTA.tsx](src/components/ui/StickyMobileCTA.tsx))
- Response-time promise shown in the Hero and on the thank-you page
- [`robots.ts`](src/app/robots.ts) and [`sitemap.ts`](src/app/sitemap.ts) (noindex on `/thank-you`)
- Unique `<title>` and meta description per page via the title template in [`layout.tsx`](src/app/layout.tsx)
- Auto-generated social share image at [`opengraph-image.tsx`](src/app/opengraph-image.tsx) (used for both Open Graph and Twitter Card)
- `alt` text on all real `<img>` elements (`ProofCard`), `aria-hidden` on decorative icons
- `ProfessionalService` + `BreadcrumbList` JSON-LD structured data ([`JsonLd.tsx`](src/components/seo/JsonLd.tsx), [`Breadcrumbs.tsx`](src/components/ui/Breadcrumbs.tsx))
- Google Analytics (GA4), env-gated as described above

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Deploy to Netlify

This repo includes [`netlify.toml`](netlify.toml) configured with `@netlify/plugin-nextjs`.

1. Push the repo to GitHub/GitLab/Bitbucket.
2. In Netlify: **Add new site → Import an existing project**, select the repo.
3. Build command and publish directory are already set via `netlify.toml` — no manual config needed.
4. Deploy.

Or via the Netlify CLI:

```bash
npm install -g netlify-cli
netlify deploy --build --prod
```

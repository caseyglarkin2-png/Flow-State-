# Sunset freighroll.com → Flow State go-live checklist

This checklist is intended for a static Next.js export deployed on Vercel.

## Domains & redirects

- Add `freighroll.com` and `www.freighroll.com` to the Vercel project as domains.
- Configure DNS for both domains to point to Vercel (per Vercel’s domain instructions).
- Set **Flow State** as the primary domain.
- Configure **301 redirects**:
  - `freighroll.com/*` → `flowstate` domain `/*`
  - `www.freighroll.com/*` → `flowstate` domain `/*`

Notes:
- With a static export, prefer handling redirects at the edge (Vercel domain redirect rules) rather than in-app.

## SEO + indexing

- Verify `robots.txt` and `sitemap.xml` load:
  - `/robots.txt`
  - `/sitemap.xml`
- In Google Search Console:
  - Verify ownership for both domains.
  - Submit sitemap for the new domain.
  - Use “Change of Address” if applicable.

## Content completeness

- Confirm these pages are live and linked in footer/nav:
  - `/pricing`
  - `/roi`
  - `/privacy`
  - `/terms`
  - `/contact`

## Analytics (optional)

- Add your analytics snippet (Plausible/GA4/etc) to `app/layout.tsx`.
- Validate events for:
  - `Apply Now` click
  - `ROI` page visits
  - `Pricing` page visits

## QA

- Validate:
  - All routes work with trailing slashes in production.
  - OpenGraph image renders on Slack/iMessage.
  - Mobile nav includes Pricing.
  - Footer links do not point to `#`.

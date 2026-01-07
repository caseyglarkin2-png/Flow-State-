# YardFlow by FreightRoll — Production Checklist

This document outlines required environment variables, third-party services, and testing procedures for deploying YardFlow by FreightRoll to production.

---

## Environment Variables

### Required for Forms & Captcha

**hCaptcha** (bot protection for all forms):
- `NEXT_PUBLIC_HCAPTCHA_SITEKEY` — Client-side site key (public, visible in browser)
- `HCAPTCHA_SECRET` — Server-side secret key (server-only, never exposed)

**Setup:**
1. Sign up at [hCaptcha.com](https://www.hcaptcha.com/)
2. Create a new site
3. Copy the site key → `NEXT_PUBLIC_HCAPTCHA_SITEKEY`
4. Copy the secret key → `HCAPTCHA_SECRET`

**Fallback behavior:**
- If keys are missing, forms show a graceful error with `mailto:founding@flow-state.ai` link
- Submit buttons are disabled when captcha is required but not configured

---

### Required for Lead Management

**Email notifications:**
- `LEADS_TO_EMAIL` — Email address to receive lead submissions (default: `founding@flow-state.ai`)

**Email delivery** (choose one):
- **Resend** (recommended):
  - `RESEND_API_KEY` — API key from [resend.com](https://resend.com/)
- **SendGrid** (alternative):
  - `SENDGRID_API_KEY` — API key from [sendgrid.com](https://sendgrid.com/)

**Webhook integrations:**
- `HUBSPOT_WEBHOOK_URL` — (Optional) HubSpot webhook for CRM sync

---

### Optional (Demo & Calendly)

- `NEXT_PUBLIC_CALENDLY_URL` — Your Calendly booking link (defaults to `https://calendly.com/`)

---

## Services Setup

### 1. hCaptcha (Bot Protection)
- **Purpose:** Prevents spam on contact form, ROI PDF, YardBuilder PDF
- **Pricing:** Free tier available (10k requests/month)
- **Setup time:** 5 minutes

### 2. Resend (Email Delivery)
- **Purpose:** Sends lead notifications to your team
- **Pricing:** Free tier (3k emails/month)
- **Setup time:** 10 minutes
- **Alternative:** SendGrid, Postmark, or any SMTP provider

### 3. Vercel (Hosting & Deployment)
- **Purpose:** Hosts the Next.js app
- **Pricing:** Free for hobby projects, $20/mo for Pro
- **Setup time:** 15 minutes (auto-deploys from GitHub)

---

## Testing Checklist

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local file with required vars
cp .env.example .env.local
# Edit .env.local with your keys

# 3. Start dev server
npm run dev

# 4. Test forms
# - Visit http://localhost:3000/contact
# - Fill out form and verify captcha appears
# - Submit and check email arrives

# 5. Test ROI PDF generation
# - Visit http://localhost:3000/roi
# - Configure inputs
# - Click "Board-ready ROI PDF"
# - Verify captcha, submit, check PDF downloads

# 6. Test YardBuilder PDF
# - Visit http://localhost:3000/yardbuilder
# - Search an address
# - Generate twin
# - Export PDF
```

---

### Production Deployment

**Vercel Environment Variables:**
1. Go to Project Settings → Environment Variables
2. Add all required env vars (listed above)
3. Mark `HCAPTCHA_SECRET`, `RESEND_API_KEY`, etc. as "Production" only
4. `NEXT_PUBLIC_*` vars should be available to all environments

**Post-deployment checks:**
- [ ] Visit `/contact` → Form loads, captcha visible, submit works
- [ ] Visit `/roi` → ROI calculator loads, PDF export works
- [ ] Visit `/yardbuilder` → YardBuilder loads, PDF export works
- [ ] Check email inbox for lead notifications
- [ ] Verify no console errors on homepage
- [ ] Test mobile navigation (hamburger menu)
- [ ] Verify "Qualify your network" CTA routes to `/contact?intent=qualify`
- [ ] Confirm no "LOADING Login" text appears during hydration

---

## Security Headers

Security headers are configured in `next.config.js`:
- **Content-Security-Policy (CSP):** Restricts resource loading to trusted domains
- **X-Content-Type-Options:** Prevents MIME sniffing
- **X-Frame-Options:** Prevents clickjacking
- **Referrer-Policy:** Controls referrer information
- **Permissions-Policy:** Restricts browser features

**To verify:**
```bash
curl -I https://flow-state-klbt.vercel.app/ | grep -E "Content-Security|X-Frame|X-Content"
```

---

## Rate Limiting

Built-in rate limiting protects API endpoints:
- **Lead forms:** 10 requests per IP per minute
- **PDF generation:** 6 requests per IP per minute

**Stored in memory** (ephemeral, resets on deploy). For persistent rate limiting, integrate Redis via Vercel KV.

---

## ROI Calculator Calibration

**Default values** (designed to show realistic, credible results):
- **Facilities:** 50 (network-first scenario)
- **Trucks/day:** 150
- **Avg dwell time:** 55 minutes
- **Detention cost:** $75/hr
- **Labor cost:** $28/hr
- **Gate staff:** 4 per facility

**Presets available:**
- Conservative (lower throughput, higher costs)
- Base (standard assumptions)
- Aggressive (optimistic gains)

**Guardrails:**
- Payback months clamped to minimum 0.1 (prevents "0.0 months" absurdity)
- Sensitivity range shows ±20% confidence band
- Disclaimers included in PDF output

---

## Troubleshooting

### Forms not submitting
- **Check:** `NEXT_PUBLIC_HCAPTCHA_SITEKEY` is set in Vercel
- **Check:** `HCAPTCHA_SECRET` is set as Production-only variable
- **Check:** Network tab shows 200 response from `/api/leads`

### PDF generation failing
- **Check:** Server logs in Vercel dashboard
- **Check:** Timeout errors (increase function timeout in Vercel settings)
- **Check:** `@react-pdf/renderer` is in `dependencies`, not `devDependencies`

### "LOADING" text appears
- **Fixed:** ThemeToggle now shows `---` placeholder instead of "LOADING"

### "Login" button visible
- **Fixed:** Login button removed from Header

---

## Next Steps

1. **Analytics:** Add Vercel Analytics or PostHog for event tracking
2. **CRM Integration:** Connect HubSpot webhook for automatic lead sync
3. **A/B Testing:** Test CTA copy variations on `/contact?intent=qualify`
4. **Performance:** Monitor Core Web Vitals via Vercel Speed Insights

---

## Support

For deployment issues, contact:
- **Email:** founding@flow-state.ai
- **GitHub:** [caseyglarkin2-png/Flow-State-](https://github.com/caseyglarkin2-png/Flow-State-)

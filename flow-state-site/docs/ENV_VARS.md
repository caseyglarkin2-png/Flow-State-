# Environment Variables

Complete reference for all environment variables used in YardFlow.

## Quick Setup

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

## Variable Reference

### Analytics

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_POSTHOG_KEY` | No | - | PostHog project API key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | `https://us.i.posthog.com` | PostHog instance URL |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | - | Plausible domain for privacy-first analytics |

### Form Protection

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_HCAPTCHA_SITEKEY` | Recommended | - | hCaptcha public site key |
| `HCAPTCHA_SECRET` | If using hCaptcha | - | hCaptcha secret for server verification |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No | - | Cloudflare Turnstile alternative to hCaptcha |
| `TURNSTILE_SECRET_KEY` | If using Turnstile | - | Turnstile server secret |

### Lead Capture & CRM

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `HUBSPOT_WEBHOOK_URL` | No | - | HubSpot webhook URL for lead routing |
| `RESEND_API_KEY` | No | - | Resend.com API key for email notifications |
| `LEAD_NOTIFY_EMAIL` | No | - | Email address for lead notifications |
| `LEADS_TO_EMAIL` | No | - | Comma-separated list for team notifications |

### External Services

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `EVENTS_WEBHOOK_URL` | No | - | Custom analytics pipeline webhook |
| `NEXT_PUBLIC_CALENDLY_URL` | No | - | Calendly booking link for CTAs |

### Branding & Features

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_LOGO_VARIANT` | No | `default` | Logo variant: `default`, `compact`, `wordmark` |
| `NEXT_PUBLIC_FEATURE_FLAGS` | No | - | JSON feature flags (e.g., `{"newRoi":true}`) |

## Environment-Specific Files

Next.js loads environment files in this order:

1. `.env` - Base defaults (commit to git)
2. `.env.local` - Local overrides (DO NOT commit)
3. `.env.development` - Development-only
4. `.env.production` - Production-only

## Vercel Deployment

In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add each variable with appropriate scope (Production/Preview/Development)

Required for production:
- `HCAPTCHA_SECRET` (if using forms)
- `HUBSPOT_WEBHOOK_URL` (for lead routing)
- `RESEND_API_KEY` (for email notifications)

## Security Notes

- Never commit `.env.local` to version control
- Use Vercel's encrypted environment variables for secrets
- Rotate keys periodically
- `NEXT_PUBLIC_*` variables are exposed to the browser - never put secrets here

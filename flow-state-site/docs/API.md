# API Reference

YardFlow website API endpoints for lead capture, analytics, and content generation.

## Base URL

- **Development:** `http://localhost:3000/api`
- **Production:** `https://flow-state-klbt.vercel.app/api`

---

## POST /api/leads

Submit a lead from the contact form.

### Request Body

```json
{
  "name": "Jane Doe",
  "email": "jane@acmecorp.com",
  "company": "ACME Corporation",
  "role": "VP Operations",
  "facilityCount": "25",
  "industry": "manufacturing",
  "timeline": "next-quarter",
  "message": "Interested in YardFlow for our distribution network.",
  "leadType": "quote",
  "utm": {
    "utm_source": "linkedin",
    "utm_medium": "social",
    "utm_campaign": "launch2025"
  },
  "captchaToken": "hcaptcha-token-here"
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Contact name |
| `email` | string | Work email address |
| `company` | string | Company name |
| `leadType` | string | One of: `quote`, `founding`, `demo` |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `role` | string | Job title |
| `facilityCount` | string | Number of facilities |
| `industry` | string | Industry vertical |
| `timeline` | string | Purchase timeline |
| `message` | string | Additional notes |
| `utm` | object | UTM tracking params |
| `captchaToken` | string | hCaptcha verification token |

### Response

**Success (200):**
```json
{
  "ok": true,
  "message": "Thanks! We'll reach out within 24 hours."
}
```

**Error (400/500):**
```json
{
  "ok": false,
  "message": "Invalid email address"
}
```

---

## POST /api/pdf/roi

Generate a PDF summary of ROI calculations.

### Request Body

```json
{
  "lead": {
    "name": "Jane Doe",
    "email": "jane@acmecorp.com",
    "company": "ACME Corporation"
  },
  "inputs": {
    "facilities": 25,
    "movesPerFacility": 600,
    "avgDwell": 120,
    "dwellCost": 125,
    "missedPickups": 5
  },
  "outputs": {
    "annualSavings": 450000,
    "netPresentValue": 1250000,
    "paybackMonths": 8,
    "threeYearRoi": 342
  }
}
```

### Response

Returns a PDF file (`application/pdf`).

---

## POST /api/events

Track analytics events (forwarded to PostHog).

### Request Body

```json
{
  "event": "cta_click",
  "properties": {
    "button": "book_audit",
    "page": "/pricing",
    "persona": "ops_leader"
  },
  "distinctId": "user-session-id"
}
```

### Response

**Success (200):**
```json
{ "ok": true }
```

---

## GET /api/og

Generate dynamic Open Graph images for social sharing.

### Query Parameters

| Param | Type | Description |
|-------|------|-------------|
| `title` | string | Primary headline |
| `subtitle` | string | Secondary text |
| `type` | string | Image variant: `default`, `case-study`, `solution` |

### Example

```
/api/og?title=YardFlow&subtitle=The%20First%20Yard%20Network%20System&type=default
```

### Response

Returns a PNG image (`image/png`), 1200×630px.

---

## Rate Limiting

All endpoints are rate-limited:

- **Leads:** 5 requests/minute per IP
- **PDF:** 3 requests/minute per IP
- **Events:** 100 requests/minute per IP

Exceeded limits return `429 Too Many Requests`.

---

## Authentication

No authentication required for public endpoints. HubSpot webhook and email integrations use server-side API keys configured via environment variables.

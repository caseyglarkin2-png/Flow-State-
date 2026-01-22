# Post-Production Sprint Plan: Sprints 7-11

**Generated:** 2026-01-22  
**Status:** Ready for execution  
**Total Effort:** ~38.5h across 5 sprints  
**Subagent Review Score:** 8.0/10 (feedback incorporated)

---

## ⚠️ Constraints

- **DO NOT MODIFY** homepage title card messaging (production content)
- All changes are additive or to non-content files
- Each task is atomic and independently committable

---

## Codebase Verification

| Item | Status | Location |
|------|--------|----------|
| LeadForm component | ✅ Exists | `components/LeadForm.tsx` |
| Lead API handler | ✅ Exists | `src/lib/api/leadHandler.ts` |
| Webhook utility | ✅ Exists | `src/lib/webhooks.ts` |
| ROI PDF component | ✅ Exists | `src/lib/pdf/roiPdf.tsx` |
| Bundle audit script | ✅ Exists | `scripts/bundle-audit.js` |
| GitHub Actions | ❌ Missing | Need to create `.github/workflows/` |
| HubSpot integration | ✅ Webhook ready | `HUBSPOT_WEBHOOK_URL` in `.env.example` |

---

## Sprint Overview

| Sprint | Focus | Tasks | Effort | Demo Output |
|--------|-------|-------|--------|-------------|
| **7** | Lead Capture & Sales | 5 | ~5.5h | Enhanced contact form, UTM tracking, improved PDF |
| **8** | CI & Performance | 6 | ~7h | GitHub Actions CI, Lighthouse scores in PRs |
| **9** | Accessibility Polish | 6 | ~7h | WCAG 2.1 AA compliance, keyboard nav |
| **10** | Documentation | 5 | ~6h | Developer README, API docs, env var docs |
| **11** | Interactive Features | 7 | ~13h | Interactive network map visualization |

---

## Sprint 7: Lead Capture & Sales Enablement

**Goal:** Improve lead qualification and sales collateral.  
**Demo:** Form submits with qualification fields, PDF has branded header, UTM tracking works.

### T7-001: Add Industry/Timeline Fields to LeadForm

**Description:** Add optional qualification dropdowns for lead scoring.

**Files:**
- `components/LeadForm.tsx` - Add dropdown fields
- `src/lib/api/leadHandler.ts` - Accept new fields in payload

**Implementation:**
```tsx
// New fields in LeadFormState:
industry: '' // '3PL' | 'Retail' | 'Manufacturing' | 'Food/Bev' | 'Other'
timeline: '' // 'This Quarter' | 'Next Quarter' | 'Evaluating' | 'Just Looking'
```

**Tests:**
- [ ] Vitest: LeadForm renders industry dropdown
- [ ] Vitest: LeadForm renders timeline dropdown
- [ ] Vitest: leadHandler accepts industry/timeline fields
- [ ] Vitest: Webhook payload includes new fields

**Estimate:** 1.5h

---

### T7-002: Persist Lead Source UTM Parameters

**Description:** Capture UTM params from URL on first visit, persist in sessionStorage, include in lead submissions.

**Files:**
- `lib/utm.ts` (new) - UTM extraction and storage utilities
- `components/LeadForm.tsx` - Read UTM on mount, include in submission
- `src/lib/api/leadHandler.ts` - Accept utm object in payload

**Implementation:**
```typescript
// lib/utm.ts
export function captureUtmParams(): void;
export function getStoredUtm(): UtmParams | null;

type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};
```

**Tests:**
- [ ] Vitest: captureUtmParams extracts from URL
- [ ] Vitest: getStoredUtm returns persisted values
- [ ] Vitest: LeadForm includes UTM in submission body
- [ ] Vitest: leadHandler forwards UTM to webhook

**Estimate:** 1h

---

### T7-003: ROI PDF Company Branding Header

**Description:** Add formatted header with company name and generation date to ROI PDF.

**Files:**
- `src/lib/pdf/roiPdf.tsx` - Add header section

**Implementation:**
```tsx
// Add to RoiSummaryPdf component:
<View style={styles.header}>
  <Text style={styles.companyName}>{payload.lead.company}</Text>
  <Text style={styles.generatedDate}>Generated: {new Date().toLocaleDateString()}</Text>
</View>
```

**Tests:**
- [ ] Vitest: RoiSummaryPdf renders header with company name
- [ ] Manual: Generate PDF, verify header appears

**Estimate:** 1h

---

### T7-004: LeadForm E2E Test

**Description:** Playwright test for full form submission flow with mocked API.

**Files:**
- `e2e/lead-form.spec.ts` (new)

**Implementation:**
```typescript
test('contact form submits successfully', async ({ page }) => {
  await page.route('/api/leads', route => route.fulfill({ status: 200, json: { ok: true } }));
  await page.goto('/contact');
  await page.fill('[name="name"]', 'Test User');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="company"]', 'Test Corp');
  // ... fill other fields, submit, verify success message
});
```

**Tests:**
- [ ] E2E: Form fields are fillable
- [ ] E2E: Submit button enables after required fields
- [ ] E2E: Success message appears after submission
- [ ] E2E: Error message appears on API failure

**Estimate:** 1h

---

### T7-005: Add UTM to Footer Social Links

**Description:** Append utm_source/utm_medium to LinkedIn/Twitter links for attribution tracking.

**Files:**
- `components/Footer.tsx`

**Implementation:**
```tsx
// Change:
<a href="https://linkedin.com/company/freightroll">
// To:
<a href="https://linkedin.com/company/freightroll?utm_source=yardflow&utm_medium=footer">
```

**Tests:**
- [ ] Vitest: Footer LinkedIn link includes UTM params
- [ ] Vitest: Footer Twitter link includes UTM params

**Estimate:** 0.5h

---

### Sprint 7 Validation Checklist

- [ ] `npm run test:unit` passes
- [ ] `npm run build` succeeds
- [ ] Contact form submits with new fields (manual test)
- [ ] ROI PDF shows company header (manual test)
- [ ] E2E tests pass: `npm run test:e2e`
- [ ] Social links have UTM params (inspect in browser)

---

## Sprint 8: CI & Performance Hardening

**Goal:** Establish CI pipeline and performance monitoring.  
**Demo:** PRs show Lighthouse scores, bundle size tracked, Web Vitals flowing to analytics.

### T8-001: Initialize GitHub Actions CI

**Description:** Create base CI workflow with typecheck, lint, and test jobs.

**Files:**
- `.github/workflows/ci.yml` (new)

**Implementation:**
```yaml
name: CI
on: [push, pull_request]
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run test:unit
```

**Tests:**
- [ ] CI runs on push to main
- [ ] CI runs on PR
- [ ] All jobs pass

**Estimate:** 1h

---

### T8-002: Add Bundle Size Check to CI

**Description:** Run existing bundle audit script in CI, fail if thresholds exceeded.

**Files:**
- `.github/workflows/ci.yml` - Add bundle audit step

**Implementation:**
```yaml
- name: Build
  run: npm run build
- name: Bundle Audit
  run: node scripts/bundle-audit.js
```

**Tests:**
- [ ] CI fails if bundle exceeds 200KB threshold
- [ ] CI passes when bundle is under threshold

**Estimate:** 0.5h

---

### T8-003: Lighthouse CI Integration

**Description:** Add Lighthouse CI to PR workflow, post scores as PR comment.

**Files:**
- `.github/workflows/ci.yml` - Add Lighthouse job
- `lighthouserc.js` (new) - Lighthouse config

**Implementation:**
```yaml
lighthouse:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
    - run: npm ci && npm run build
    - uses: treosh/lighthouse-ci-action@v10
      with:
        configPath: './lighthouserc.js'
        uploadArtifacts: true
```

**Tests:**
- [ ] Lighthouse runs on PR
- [ ] Scores uploaded as artifacts
- [ ] Performance score > 90

**Estimate:** 1.5h

---

### T8-004: Add Web Vitals Reporting

**Description:** Implement reportWebVitals to send Core Web Vitals to PostHog.

**Files:**
- `lib/webVitals.ts` (new) - Web Vitals handler
- `app/layout.tsx` - Import and call in client boundary

**Implementation:**
```typescript
// lib/webVitals.ts
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';
import { analytics } from '@/lib/analytics';

export function reportWebVitals() {
  onCLS((metric) => analytics.capture('web_vital', { name: 'CLS', value: metric.value }));
  onLCP((metric) => analytics.capture('web_vital', { name: 'LCP', value: metric.value }));
  // ... etc
}
```

**Tests:**
- [ ] Vitest: reportWebVitals calls analytics.capture for each metric
- [ ] Manual: Verify events appear in PostHog

**Estimate:** 1h

---

### T8-005: Image Optimization Audit

**Description:** Review all images for next/image usage, add priority hints to above-fold images.

**Files:**
- Multiple component files (audit only, targeted fixes)

**Audit Checklist:**
- [ ] All `<img>` tags converted to `<Image>`
- [ ] Above-fold images have `priority` prop
- [ ] Large images have explicit `width`/`height`
- [ ] Logos use appropriate sizing

**Tests:**
- [ ] `npm run build` shows no image optimization warnings
- [ ] Lighthouse image audit passes

**Estimate:** 1h

---

### T8-006: Preload Critical Fonts

**Description:** Add font preload links for Inter/Geist to reduce CLS.

**Files:**
- `app/layout.tsx` - Add preload links in head

**Implementation:**
```tsx
<head>
  <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="" />
  <link rel="preload" href="/fonts/geist-var.woff2" as="font" type="font/woff2" crossOrigin="" />
</head>
```

**Tests:**
- [ ] Lighthouse font audit shows no render-blocking fonts
- [ ] CLS score < 0.1

**Estimate:** 1h

---

### Sprint 8 Validation Checklist

- [ ] `.github/workflows/ci.yml` exists and runs
- [ ] CI includes typecheck, lint, test, bundle audit
- [ ] Lighthouse CI runs and uploads artifacts
- [ ] Web Vitals events appear in PostHog (or mock)
- [ ] `npm run build` shows no image warnings

---

## Sprint 9: Accessibility Polish

**Goal:** WCAG 2.1 AA compliance across all pages.  
**Demo:** Screen reader navigates site correctly, keyboard-only navigation works, axe-core passes.

### T9-001: Add Skip to Main Content Link

**Description:** Add skip navigation link for keyboard users (WCAG 2.4.1).

**Files:**
- `app/layout.tsx` or `components/Header.tsx`
- `styles/globals.css` - Skip link styles

**Implementation:**
```tsx
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
// ... rest of header
<main id="main-content">
```

```css
.skip-link {
  position: absolute;
  left: -9999px;
}
.skip-link:focus {
  left: 0;
  z-index: 9999;
  /* visible styling */
}
```

**Tests:**
- [ ] Playwright: Tab once from page load focuses skip link
- [ ] Playwright: Enter on skip link moves focus to main

**Estimate:** 1h

---

### T9-002: Keyboard Navigation Audit

**Description:** Test all pages with keyboard-only, fix tab order issues.

**Files:**
- Multiple component files (as needed)

**Audit Pages:**
- [ ] Homepage - Tab through all interactive elements
- [ ] /roi - Tab through calculator inputs
- [ ] /contact - Tab through form fields
- [ ] /pricing - Tab through plan cards
- [ ] /solutions/* - Tab through navigation

**Tests:**
- [ ] Manual: Complete audit document
- [ ] Playwright: Basic tab order test per page

**Estimate:** 1.5h

---

### T9-003: Screen Reader Landmark Audit

**Description:** Verify ARIA landmarks, add missing role attributes.

**Files:**
- Layout files, page files (as needed)

**Required Landmarks:**
- [ ] `<header role="banner">` or `<Header>`
- [ ] `<nav role="navigation">` or `<nav>`
- [ ] `<main role="main">` or `<main>`
- [ ] `<footer role="contentinfo">` or `<Footer>`

**Tests:**
- [ ] axe-core: No landmark errors
- [ ] Manual: VoiceOver/NVDA navigation test

**Estimate:** 1h

---

### T9-004: Color Contrast Audit

**Description:** Verify all text meets 4.5:1 contrast ratio.

**Files:**
- `tailwind.config.js` - Adjust colors if needed
- Component files (as needed)

**Known Risk Areas:**
- [ ] `text-steel` on dark backgrounds
- [ ] `text-neon/70` opacity variants
- [ ] Disabled button states

**Tests:**
- [ ] axe-core: No color contrast errors
- [ ] Lighthouse: Accessibility score > 95

**Estimate:** 1h

---

### T9-005: Focus Visible States

**Description:** Ensure all interactive elements have visible focus states.

**Files:**
- `styles/globals.css` - Global focus styles
- `components/Button.tsx` - Button focus styles

**Implementation:**
```css
:focus-visible {
  outline: 2px solid var(--neon);
  outline-offset: 2px;
}
```

**Tests:**
- [ ] Visual: Tab through site, all elements show focus ring
- [ ] Lighthouse: No focus-visible issues

**Estimate:** 1h

---

### T9-006: Form Error Announcements

**Description:** Add aria-live regions for form validation errors.

**Files:**
- `components/LeadForm.tsx`
- Other form components

**Implementation:**
```tsx
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {errors.length > 0 && `${errors.length} errors found`}
</div>
```

**Tests:**
- [ ] Vitest: Error region renders with aria-live
- [ ] Manual: Screen reader announces errors on submit

**Estimate:** 1h

---

### Sprint 9 Validation Checklist

- [ ] `npm run test:e2e` passes (includes a11y tests)
- [ ] axe-core: 0 critical/serious issues
- [ ] Skip link works (keyboard test)
- [ ] All focus states visible
- [ ] Screen reader can navigate site

---

## Sprint 10: Documentation & Tooling

**Goal:** Enable new developers to contribute quickly.  
**Demo:** New developer can set up and run project from README in < 15 minutes.

### T10-001: README Overhaul

**Description:** Add comprehensive setup, development, deployment, testing sections.

**Files:**
- `README.md`

**Sections to Add:**
- Prerequisites (Node 20+, npm 10+)
- Quick Start (3 commands)
- Development commands table
- Environment variables summary
- Deployment (Vercel)
- Testing strategy
- Architecture overview

**Tests:**
- [ ] Manual: New developer test (follow README)

**Estimate:** 1.5h

---

### T10-002: API Endpoint Documentation

**Description:** Document all API routes with request/response schemas.

**Files:**
- `docs/API.md` (new)

**Endpoints to Document:**
- `POST /api/leads` - Lead submission
- `POST /api/pdf/roi` - ROI PDF generation
- `GET /api/og` - Dynamic OG image
- `POST /api/events` - Analytics events

**Tests:**
- [ ] Manual: All endpoints documented with examples

**Estimate:** 1.5h

---

### T10-003: Environment Variable Documentation

**Description:** Document all env vars with required/optional, defaults.

**Files:**
- `docs/ENV_VARS.md` (new)
- `.env.example` - Add inline comments

**Format:**
```markdown
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| NEXT_PUBLIC_POSTHOG_KEY | No | - | PostHog project key |
```

**Tests:**
- [ ] All vars in .env.example documented
- [ ] Required vs optional clearly marked

**Estimate:** 1h

---

### T10-004: Component JSDoc Comments

**Description:** Add JSDoc to key exported components.

**Files:**
- `components/LeadForm.tsx`
- `components/Header.tsx`
- `components/Footer.tsx`
- `components/ROICalculator.tsx`

**Format:**
```tsx
/**
 * Lead capture form with qualification fields.
 * @param leadType - Type of lead: 'quote' | 'founding' | 'demo'
 * @param title - Form heading
 * @param subtitle - Optional subheading
 */
export default function LeadForm({ ... }) { }
```

**Tests:**
- [ ] `npm run typecheck` passes
- [ ] Hover in VS Code shows JSDoc

**Estimate:** 1.5h

---

### T10-005: Brand Guidelines Document

**Description:** Document brand colors, typography, and usage guidelines.

**Files:**
- `docs/BRAND_GUIDELINES.md` (new)

**Sections:**
- Color palette with hex values
- Typography scale
- Logo usage
- Voice and tone
- Component patterns

**Tests:**
- [ ] Manual: Document complete and accurate

**Estimate:** 1h

---

### Sprint 10 Validation Checklist

- [ ] README allows new dev setup in < 15 min
- [ ] API docs cover all endpoints
- [ ] Env vars fully documented
- [ ] Key components have JSDoc
- [ ] Brand guidelines complete

---

## Sprint 11: Interactive Network Map

**Goal:** Add interactive facility network visualization.  
**Demo:** Interactive map on /network-effect with clickable nodes, hover tooltips, responsive design.

**Technology Decision:** Pure SVG (no Three.js) for accessibility and simplicity.

### T11-001: NetworkMap Component Shell

**Description:** Create base component with SVG viewport and container.

**Files:**
- `components/NetworkMap/index.tsx` (new)
- `components/NetworkMap/types.ts` (new)

**Implementation:**
```tsx
type Facility = {
  id: string;
  name: string;
  archetype: 'gated' | 'open' | 'cross-dock' | 'manufacturing';
  x: number;
  y: number;
};

export default function NetworkMap({ facilities }: { facilities: Facility[] }) {
  return (
    <svg viewBox="0 0 800 600" role="img" aria-label="Facility network map">
      {/* nodes and connections render here */}
    </svg>
  );
}
```

**Tests:**
- [ ] Vitest: NetworkMap renders SVG element
- [ ] Vitest: SVG has accessible role and label

**Estimate:** 1h

---

### T11-002: Facility Node Component

**Description:** Render facility nodes with archetype-based styling.

**Files:**
- `components/NetworkMap/FacilityNode.tsx` (new)

**Implementation:**
```tsx
const archetypeColors = {
  gated: '#00FF88',      // neon
  open: '#3B82F6',       // blue
  'cross-dock': '#F59E0B', // amber
  manufacturing: '#8B5CF6', // purple
};

export function FacilityNode({ facility, onClick, onHover }) {
  return (
    <g transform={`translate(${facility.x}, ${facility.y})`}>
      <circle r="20" fill={archetypeColors[facility.archetype]} />
      <text>{facility.name}</text>
    </g>
  );
}
```

**Tests:**
- [ ] Vitest: Node renders with correct color for archetype
- [ ] Vitest: Node has accessible name

**Estimate:** 2h

---

### T11-003: Connection Lines

**Description:** Draw connections between related facilities.

**Files:**
- `components/NetworkMap/Connections.tsx` (new)

**Implementation:**
```tsx
type Connection = { from: string; to: string; strength: number };

export function Connections({ connections, facilities }) {
  return (
    <g className="connections">
      {connections.map(conn => (
        <line
          x1={getFacility(conn.from).x}
          y1={getFacility(conn.from).y}
          x2={getFacility(conn.to).x}
          y2={getFacility(conn.to).y}
          strokeWidth={conn.strength}
        />
      ))}
    </g>
  );
}
```

**Tests:**
- [ ] Vitest: Connections render between correct facilities
- [ ] Vitest: Stroke width reflects connection strength

**Estimate:** 2h

---

### T11-004: Hover Tooltips

**Description:** Show facility details on hover.

**Files:**
- `components/NetworkMap/Tooltip.tsx` (new)
- `components/NetworkMap/index.tsx` - Add hover state

**Implementation:**
```tsx
const [hoveredFacility, setHoveredFacility] = useState<Facility | null>(null);

// Tooltip positioned near cursor
{hoveredFacility && (
  <Tooltip facility={hoveredFacility} x={mouseX} y={mouseY} />
)}
```

**Tests:**
- [ ] Vitest: Tooltip renders on hover state change
- [ ] Vitest: Tooltip shows facility name and archetype

**Estimate:** 1.5h

---

### T11-005: Click Interactions

**Description:** Handle node clicks to show detail panel or navigate.

**Files:**
- `components/NetworkMap/index.tsx`
- `components/NetworkMap/DetailPanel.tsx` (new)

**Implementation:**
```tsx
const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

<FacilityNode onClick={() => setSelectedFacility(facility)} />

{selectedFacility && (
  <DetailPanel facility={selectedFacility} onClose={() => setSelectedFacility(null)} />
)}
```

**Tests:**
- [ ] Vitest: Click updates selected state
- [ ] Vitest: DetailPanel renders with facility data
- [ ] Vitest: Close button clears selection

**Estimate:** 1.5h

---

### T11-006: NetworkMap Page Integration

**Description:** Add NetworkMap to /network-effect page with sample data.

**Files:**
- `app/network-effect/page.tsx`
- `data/sampleNetwork.ts` (new) - Sample facility data

**Tests:**
- [ ] E2E: /network-effect renders NetworkMap
- [ ] E2E: Nodes are visible and interactive

**Estimate:** 2h

---

### T11-007: NetworkMap Accessibility & Responsiveness

**Description:** Add keyboard navigation and responsive scaling.

**Files:**
- `components/NetworkMap/index.tsx`
- `components/NetworkMap/FacilityNode.tsx`

**Implementation:**
```tsx
// Keyboard navigation
<g tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onClick()}>

// Responsive viewBox
const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
useEffect(() => {
  // Resize observer
}, []);
```

**Tests:**
- [ ] Playwright: Tab navigates between nodes
- [ ] Playwright: Enter key selects node
- [ ] Visual: Map scales correctly at mobile breakpoints

**Estimate:** 2h

---

### Sprint 11 Validation Checklist

- [ ] NetworkMap renders on /network-effect
- [ ] Nodes show correct archetype colors
- [ ] Connections draw between facilities
- [ ] Hover shows tooltip
- [ ] Click shows detail panel
- [ ] Keyboard navigation works
- [ ] Responsive at 375px, 768px, 1024px widths

---

## Appendix: Quick Reference

### Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run typecheck        # TypeScript check
npm run lint             # ESLint

# Testing
npm run test:unit        # Vitest unit tests
npm run test:e2e         # Playwright E2E tests
npm run audit:bundle     # Bundle size check

# CI (after Sprint 8)
# Runs automatically on push/PR
```

### Key Files

| Purpose | File |
|---------|------|
| Lead Form | `components/LeadForm.tsx` |
| Lead Handler | `src/lib/api/leadHandler.ts` |
| ROI PDF | `src/lib/pdf/roiPdf.tsx` |
| Webhooks | `src/lib/webhooks.ts` |
| Analytics | `lib/analytics.ts` |
| CI Workflow | `.github/workflows/ci.yml` (Sprint 8) |

### Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_HCAPTCHA_SITEKEY` | Yes | Form spam protection |
| `HUBSPOT_WEBHOOK_URL` | No | CRM integration |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | Analytics |
| `LEADS_TO_EMAIL` | No | Lead notifications |

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-22 | Initial plan created |
| 1.1 | 2026-01-22 | Incorporated subagent review (8.0/10): Added T8-001 (CI init), T9-001 (skip links), T11-007 (a11y), fixed file paths, adjusted estimates |

---

**Ready to start Sprint 7?** Begin with T7-001: Add Industry/Timeline Fields to LeadForm.

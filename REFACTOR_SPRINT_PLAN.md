# YardFlow RFQ-Driven Refactor: Sprint Plan

**Mission:** Refactor YardFlow marketing site to align with "FreightRoll RFQ Deck - UFP - Jan 26" narrative focusing on scale proof, co-development program, and procurement readiness.

**Timeline:** Sprints 0-5 (6 sprints total)  
**Target:** Proof-driven, conversion-optimized, enterprise-ready marketing site

---

## Sprint 0: Baseline Audit + Content Model Foundation

**Goal:** Establish baseline health, fix critical issues, create content schema for data-driven rendering.

**Demoable Outcome:** Clean codebase with no broken routes, content model exported and testable.

**Dependencies:** None (foundation sprint)  
**Blocks:** Sprint 1 (routes need content models)

### Tasks

#### S0.0: Analytics Baseline Snapshot
**Complexity:** S  
**Description:** Capture current metrics before refactor to enable before/after comparison.

**Acceptance Criteria:**
- [ ] Export GA4 data: conversion rates, top pages, bounce rates (last 30 days)
- [ ] Document current CTR on "Book Audit" vs "Run ROI" CTAs
- [ ] Screenshot current funnels/heatmaps if available
- [ ] Store in `/docs/REFACTOR_BASELINE.md`
- [ ] Comparison framework defined (what metrics to track post-launch)

**Validation:**
```bash
# Create baseline doc with:
# - Current conversion rate: X%
# - Current bounce rate: Y%
# - Top 5 landing pages
# - CTA click-through rates
```

---

#### S0.1: Route Health Audit & Fix
**Complexity:** M  
**Description:** Audit all routes, identify broken pages, fix 404s and import errors.

**Acceptance Criteria:**
- [ ] All routes in `app/` directory load without errors
- [ ] `/solutions/` base route redirects or shows index page (no 404)
- [ ] Nav links point to valid routes
- [ ] CI link checker passes (all internal links resolve)

**Validation:**
```bash
# Automated route crawler
node scripts/validate-routes.js

# Script should:
# 1. Read app/ directory, extract all routes
# 2. Start dev server
# 3. Fetch each route, check status code === 200
# 4. Verify no console errors
# 5. Output report: routes.validation.json

# Acceptance: All routes return 200, 0 console errors
```

**Implementation Notes:**
- Check `lib/solutions.ts` for missing slug definitions
- Add `/solutions/page.tsx` if missing (solution index)
- Update nav to remove dead links

---

#### S0.2a: Define ProofPoint TypeScript Interface
**Complexity:** S  
**Description:** Create type definition for proof points. No data entry yet.

**Depends on:** None  
**Blocks:** S0.2b

**Acceptance Criteria:**
- [ ] `lib/content/proofPoints.ts` exports `ProofPoint` interface
- [ ] Schema includes: `metric`, `label`, `qualifier`, `sourceType: 'measured' | 'modeled'`
- [ ] Type documented with JSDoc comments
- [ ] Reviewed with team before data entry

**Schema Example:**
```typescript
export interface ProofPoint {
  metric: string; // "1M+"
  label: string; // "Driver Check-Ins"
  qualifier?: string; // "Across network"
  sourceType: 'measured' | 'modeled';
  context?: string; // "Primo + UFP combined"
}
```

---

#### S0.2b: Populate Proof Points from RFQ Deck
**Complexity:** S  
**Description:** Extract metrics from deck and map to ProofPoint schema.

**Depends on:** S0.2a  
**Blocks:** S0.2c, S2.1

**Acceptance Criteria:**
- [ ] At least 4 key stats from deck mapped:
  - 1M+ driver check-ins
  - 0.2% failure rate
  - 200K passively onboarded drivers
  - ~150s→~70s check-in time
- [ ] Each stat has source citation
- [ ] `PROOF_POINTS` array exported

---

#### S0.2c: Unit Test Proof Points Schema
**Complexity:** S  
**Description:** Write validation tests for proof points.

**Depends on:** S0.2b  

**Validation:**
```typescript
// lib/content/__tests__/proofPoints.test.ts
import { PROOF_POINTS } from '../proofPoints';

test('proof points have required fields', () => {
  PROOF_POINTS.forEach(point => {
    expect(point).toHaveProperty('metric');
    expect(point).toHaveProperty('label');
    expect(point).toHaveProperty('sourceType');
    expect(['measured', 'modeled']).toContain(point.sourceType);
  });
});
```

---

#### S0.3: Content Model Schema (Sections & Copy)
**Complexity:** M  
**Description:** Create schema for page sections, headlines, body copy, bullets. Source from RFQ deck.

**Acceptance Criteria:**
- [ ] `lib/content/sections.ts` exports section data
- [ ] Schema includes: `id`, `headline`, `subheadline?`, `body?`, `bullets?`, `cta?`
- [ ] Covers key sections: hero, proof, scale, co-dev, implementation
- [ ] Unit test validates all required fields

**Validation:**
```typescript
// lib/content/__tests__/sections.test.ts
test('sections have valid structure', () => {
  expect(SECTIONS.hero).toHaveProperty('headline');
  expect(SECTIONS.proof.bullets).toBeInstanceOf(Array);
});
```

---

#### S0.4: Content Model Schema (Co-Dev Opportunities)
**Complexity:** M  
**Description:** Model flatbed and reefer co-dev tracks as data (not hardcoded JSX).

**Acceptance Criteria:**
- [ ] `lib/content/coDevTracks.ts` exports flatbed and reefer opportunity lists
- [ ] Each opportunity has: `title`, `description`, `benefit`, `priority?`
- [ ] Flatbed opportunities from deck:
  - Tarping/securement automation
  - Pre-tarp scan
  - Securement verification
- [ ] Reefer opportunities from deck:
  - Cold chain workflow capture
  - Compliance documentation
  - Exception handling
- [ ] TypeScript types enforced

**Schema Example:**
```typescript
export interface CoDevOpportunity {
  id: string;
  title: string;
  description: string;
  benefit: string;
  priority?: 'high' | 'medium' | 'low';
  vertical: 'flatbed' | 'reefer';
}

export const CO_DEV_TRACKS: CoDevOpportunity[] = [
  {
    id: 'flatbed-tarping',
    title: 'Tarping/Securement Automation',
    description: 'Automated verification of tarp and securement compliance before dispatch.',
    benefit: 'Reduces DOT violations and shipper disputes.',
    priority: 'high',
    vertical: 'flatbed',
  },
  // ...
];
```

---

#### S0.5: Content Model Schema (Phased Framework)
**Complexity:** S  
**Description:** Model the 5-phase rollout framework from deck as data.

**Acceptance Criteria:**
- [ ] `lib/content/phasedFramework.ts` exports phase steps
- [ ] Schema: `phase`, `label`, `description`, `timeframe?`, `icon?`
- [ ] 5 phases: POC → Pilot → Scale Pilot → Full Rollout → Innovation 2.0
- [ ] Rendered in `/implementation` page

**Schema Example:**
```typescript
export interface RolloutPhase {
  phase: number;
  label: string;
  description: string;
  timeframe?: string;
  outcomes: string[];
}

export const PHASED_FRAMEWORK: RolloutPhase[] = [
  {
    phase: 1,
    label: 'POC',
    description: 'Proof of concept at single facility',
    timeframe: '30 days',
    outcomes: ['Technical feasibility validated', 'Initial metrics captured'],
  },
  // ...
];
```

---

#### S0.6: Link Checker CI Integration
**Complexity:** S  
**Description:** Add automated link checking to CI to prevent future broken routes.

**Acceptance Criteria:**
- [ ] `.github/workflows/link-check.yml` added
- [ ] Runs on PR and main branch
- [ ] Checks all internal links (`<Link>` components)
- [ ] Fails build if broken links detected

**Validation:**
- Trigger workflow, verify it catches broken links
- Add intentional broken link, confirm CI fails

---

## Sprint 1: Route Architecture + Nav + Sitemap Cleanup

**Goal:** Fix broken routes, implement new sitemap, ensure nav consistency, remove dead pages.

**Demoable Outcome:** All target routes accessible, nav works, old cruft removed.

### Tasks

#### S1.1: Fix `/solutions/` Base Route Error
**Complexity:** S  
**Description:** `/solutions/` currently 404s. Create index page or redirect.

**Acceptance Criteria:**
- [ ] `/solutions` loads without error
- [ ] Shows list of solution verticals OR redirects to `/solutions/dry-van` (default)
- [ ] Nav updated if redirect chosen

**Validation:**
```bash
# Visit http://localhost:3000/solutions
# Should not 404
```

**Implementation Options:**
- Option A: Create `app/solutions/page.tsx` with solution grid
- Option B: Add redirect in `next.config.js` to `/solutions/dry-van`

---

#### S1.2: Create `/proof` Page (Rename/Consolidate Case Studies)
**Complexity:** M  
**Description:** Create `/proof` page to showcase scale metrics and Primo outcomes. Optionally alias `/case-studies` → `/proof`.

**Acceptance Criteria:**
- [ ] `/proof` route exists and loads
- [ ] Uses `PROOF_POINTS` content model (S0.2)
- [ ] Displays 4 key stats with source labels (measured/modeled)
- [ ] Includes Primo case study summary
- [ ] CTA to "Book Network Audit"

**Validation:**
```bash
# Playwright test
test('proof page displays key stats', async ({ page }) => {
  await page.goto('/proof');
  await expect(page.locator('text=1M+')).toBeVisible();
  await expect(page.locator('text=0.2%')).toBeVisible();
});
```

---

#### S1.3: Create `/scale` Page
**Complexity:** M  
**Description:** New page covering scale considerations and architecture stance from deck ("vision not in critical path", etc.).

**Acceptance Criteria:**
- [ ] `/scale` route exists
- [ ] Sections:
  - Scale pitfalls accordion (anti-patterns)
  - Architecture stance (pragmatic automation)
  - Network effect principles
- [ ] Uses `SECTIONS` content model
- [ ] Accordion respects reduced motion

**Validation:**
```typescript
// Playwright
test('scale page accordion works', async ({ page }) => {
  await page.goto('/scale');
  const accordion = page.locator('[data-testid="scale-accordion"]');
  await accordion.click();
  await expect(accordion).toHaveAttribute('aria-expanded', 'true');
});
```

---

#### S1.4: Update `/solutions/flatbed` for Co-Dev Focus
**Complexity:** M  
**Description:** Rewrite flatbed solution page to focus on co-dev opportunities (not generic product pitch).

**Acceptance Criteria:**
- [ ] Uses `CO_DEV_TRACKS` filtered to `vertical: 'flatbed'`
- [ ] Highlights 3 priority opportunities:
  - Tarping/securement automation
  - Pre-tarp scan
  - Securement verification
- [ ] CTA: "Apply for Flatbed Co-Development"
- [ ] Link to `/co-development?vertical=flatbed`

**Validation:**
```bash
# Manual QA
# Visit /solutions/flatbed
# Confirm co-dev opportunities listed
# Confirm CTA links to /co-development with query param
```

---

#### S1.5: Create `/solutions/reefer` Page
**Complexity:** M  
**Description:** New reefer solution page focusing on co-dev track (cold chain, compliance, exceptions).

**Acceptance Criteria:**
- [ ] `/solutions/reefer` route exists
- [ ] Uses `CO_DEV_TRACKS` filtered to `vertical: 'reefer'`
- [ ] Highlights 3 opportunities:
  - Cold chain workflow capture
  - Compliance documentation
  - Exception handling
- [ ] CTA: "Apply for Reefer Co-Development"
- [ ] Test validates route loads and content renders

**Validation:**
```typescript
// Vitest component test
test('reefer page renders co-dev opportunities', () => {
  render(<ReeferPage />);
  expect(screen.getByText(/cold chain/i)).toBeInTheDocument();
});
```

---

#### S1.6: Update Nav with New Sitemap
**Complexity:** S  
**Description:** Update main nav to reflect new IA. Remove cruft, add `/proof` and `/scale`.

**Acceptance Criteria:**
- [ ] Nav updated in `components/Header.tsx`
- [ ] Links:
  - Product → /product
  - Proof → /proof
  - Scale → /scale
  - Co-Development → /co-development
  - Implementation → /implementation
- [ ] Solutions dropdown includes Flatbed and Reefer
- [ ] Mobile nav works
- [ ] Active state highlights current route

**Validation:**
```typescript
// Playwright nav test
test('nav has all target links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav >> text=Proof')).toBeVisible();
  await expect(page.locator('nav >> text=Scale')).toBeVisible();
});
```

---

#### S1.7: Remove Dead Pages (Cleanup)
**Complexity:** S  
**Description:** Archive or delete unused test pages, logo previews, and unused routes.

**Acceptance Criteria:**
- [ ] Remove or move to `archive/`:
  - `app/logo-preview`
  - `app/logo-test`
  - `app/icon-test`
  - `app/__test-error__`
  - `app/og-preview`
- [ ] Update .gitignore if archived
- [ ] No dead links in nav or sitemap

**Validation:**
```bash
# Link checker passes
# No 404s in Playwright smoke tests
```

---

## Sprint 2: Proof-Led Home + Proof Strip + Deck Claims Integration

**Goal:** Refactor homepage to lead with scale proof, add animated proof strip, integrate deck claims.

**Demoable Outcome:** New homepage with proof-first messaging, KPI ticker, and deck-sourced copy.

### Tasks

#### S2.1: Proof Strip Component (Animated KPI Ticker)
**Complexity:** M  
**Description:** Create reusable component that displays 4 key stats with count-up animation on scroll-into-view.

**Acceptance Criteria:**
- [ ] `components/ProofStrip.tsx` created
- [ ] Props: `proofPoints: ProofPoint[]`
- [ ] Count-up animation triggers on first view (IntersectionObserver)
- [ ] Respects `prefers-reduced-motion` (instant display if reduced)
- [ ] Displays source type badge (measured/modeled)
- [ ] Unit test validates rendering
- [ ] Playwright test validates animation trigger

**Validation:**
```typescript
// Vitest
test('ProofStrip renders proof points', () => {
  const points: ProofPoint[] = [
    { metric: '1M+', label: 'Check-Ins', sourceType: 'measured' },
  ];
  render(<ProofStrip proofPoints={points} />);
  expect(screen.getByText('1M+')).toBeInTheDocument();
  expect(screen.getByText('Measured')).toBeInTheDocument();
});

// Playwright
test('proof strip animates on scroll', async ({ page }) => {
  await page.goto('/');
  const strip = page.locator('[data-testid="proof-strip"]');
  await strip.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500); // Wait for count-up
  await expect(strip.locator('text=1M+')).toBeVisible();
});
```

**Animation Logic:**
```typescript
// Use Framer Motion + IntersectionObserver
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export function ProofStrip({ proofPoints }: { proofPoints: ProofPoint[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
    >
      {proofPoints.map(point => (
        <CountUpStat key={point.label} {...point} animate={isInView && !prefersReducedMotion} />
      ))}
    </motion.div>
  );
}
```

---

#### S2.2: Refactor Home Hero (Proof-First)
**Complexity:** M  
**Description:** Rewrite homepage hero to lead with scale proof, not product features.

**Acceptance Criteria:**
- [ ] New headline from deck: "1M+ Driver Check-Ins. 0.2% Failure Rate. Scale-Proven."
- [ ] Subheadline: "Co-develop the next-gen yard network with battle-tested protocols."
- [ ] Uses `SECTIONS.hero` content model
- [ ] CTA: "Apply for Co-Development" (primary), "View Proof" (secondary)
- [ ] ProofStrip component integrated below hero

**Validation:**
```bash
# Manual QA: Visit homepage, confirm new headline visible
# Playwright: Validate CTA links
test('home hero has proof-first headline', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('1M+ Driver Check-Ins');
});
```

---

#### S2.3: Add 3 Credibility Blocks (Home)
**Complexity:** S  
**Description:** Below proof strip, add 3 credibility blocks: Scale Proof, Pragmatic Automation, Co-Development.

**Acceptance Criteria:**
- [ ] 3 cards with icon, headline, 2-sentence description
- [ ] Content from `SECTIONS` model
- [ ] Links to `/proof`, `/scale`, `/co-development`
- [ ] Responsive grid (1 col mobile, 3 col desktop)

**Validation:**
```typescript
test('home page has 3 credibility blocks', () => {
  render(<HomePage />);
  expect(screen.getByText(/Scale Proof/i)).toBeInTheDocument();
  expect(screen.getByText(/Pragmatic Automation/i)).toBeInTheDocument();
  expect(screen.getByText(/Co-Development/i)).toBeInTheDocument();
});
```

---

#### S2.4: Analytics Events for Proof Strip
**Complexity:** S  
**Description:** Track when users view proof strip and click proof-related CTAs.

**Acceptance Criteria:**
- [ ] Event: `proof_strip_viewed` fires when strip scrolls into view
- [ ] Event: `proof_cta_clicked` fires on "View Proof" click
- [ ] Properties: `proof_point_count`, `page_path`
- [ ] Unit test mocks analytics provider

**Validation:**
```typescript
// lib/analytics/__tests__/proofEvents.test.ts
test('trackProofStripViewed sends event', () => {
  const mockTrack = vi.fn();
  setAnalyticsProvider({ track: mockTrack });
  trackProofStripViewed(4);
  expect(mockTrack).toHaveBeenCalledWith({
    name: 'proof_strip_viewed',
    properties: { proof_point_count: 4 },
  });
});
```

---

## Sprint 3: Co-Dev Upgrades (Flatbed/Reefer Tracks + Design Partner Offer)

**Goal:** Enhance `/co-development` page with explicit vertical tracks, track selector UI, and design partner CTA.

**Demoable Outcome:** Co-dev page with Flatbed/Reefer tabs, opportunity lists, and prominent design partner offer.

### Tasks

#### S3.1: Co-Dev Track Selector Component
**Complexity:** M  
**Description:** Tabbed UI to switch between Flatbed and Reefer co-dev opportunities.

**Acceptance Criteria:**
- [ ] `components/CoDevTrackSelector.tsx` created
- [ ] Two tabs: "Flatbed" and "Reefer"
- [ ] Clicking tab swaps displayed opportunities (from `CO_DEV_TRACKS` model)
- [ ] Smooth transition animation (respects reduced motion)
- [ ] Keyboard accessible (arrow keys navigate tabs)
- [ ] Unit test validates tab switching

**Validation:**
```typescript
test('track selector switches tabs', async () => {
  render(<CoDevTrackSelector />);
  const reeferTab = screen.getByRole('tab', { name: /reefer/i });
  await userEvent.click(reeferTab);
  expect(screen.getByText(/cold chain/i)).toBeInTheDocument();
});
```

**Animation Example:**
```typescript
import { motion, AnimatePresence } from 'framer-motion';

export function CoDevTrackSelector() {
  const [activeTrack, setActiveTrack] = useState<'flatbed' | 'reefer'>('flatbed');
  const opportunities = CO_DEV_TRACKS.filter(o => o.vertical === activeTrack);

  return (
    <div>
      <TabList onSelect={setActiveTrack} active={activeTrack} />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTrack}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {opportunities.map(opp => <OpportunityCard key={opp.id} {...opp} />)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

---

#### S3.2: Update `/co-development` Page Layout
**Complexity:** M  
**Description:** Integrate track selector, add design partner callout, update copy to deck narrative.

**Acceptance Criteria:**
- [ ] CoDevTrackSelector component integrated
- [ ] New section: "Design Partner Offer" (highlighted box)
  - Copy: "Join 3 operators shaping Phase 2 & 3 roadmap. Priority access to advanced modules."
  - CTA: "Apply for Design Partner Program"
- [ ] Uses `SECTIONS.codev` content model
- [ ] Responsive layout

**Validation:**
```bash
# Manual QA: Visit /co-development
# Confirm track selector visible
# Confirm design partner callout prominent
```

---

#### S3.3: Design Partner Application Form (Contact Variant)
**Complexity:** M  
**Description:** Create variant of contact form for design partner applications.

**Acceptance Criteria:**
- [ ] `/contact?intent=design-partner` shows design partner form variant
- [ ] Additional fields:
  - Vertical (Flatbed/Reefer/Both)
  - Fleet size
  - Co-dev interest (multi-select: tarping, cold chain, gate automation, etc.)
- [ ] Form submits to `/api/lead` with `leadType: 'design-partner'`
- [ ] Confirmation message customized
- [ ] Unit test validates form fields

**Validation:**
```typescript
// Playwright
test('design partner form submits', async ({ page }) => {
  await page.goto('/contact?intent=design-partner');
  await page.fill('input[name="company"]', 'Test Fleet');
  await page.selectOption('select[name="vertical"]', 'flatbed');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Application received')).toBeVisible();
});
```

---

#### S3.4: Analytics for Co-Dev Track Selection
**Complexity:** S  
**Description:** Track which vertical users select in track selector.

**Acceptance Criteria:**
- [ ] Event: `codev_track_selected` fires on tab click
- [ ] Properties: `vertical`, `page_section`
- [ ] Unit test validates event

**Validation:**
```typescript
test('trackCoDevTrackSelected sends event', () => {
  trackCoDevTrackSelected('flatbed');
  expect(mockTrack).toHaveBeenCalledWith({
    name: 'codev_track_selected',
    properties: { vertical: 'flatbed' },
  });
});
```

---

## Sprint 4: Scale Page + Implementation Alignment + Integration Tightening

**Goal:** Complete `/scale` page, align `/implementation` to phased framework, tighten `/integrations` and `/security` for IT buyers.

**Demoable Outcome:** Scale, Implementation, Integrations, Security pages fully aligned to deck narrative.

### Tasks

#### S4.1: Scale Pitfalls Accordion Component
**Complexity:** M  
**Description:** Accordion listing common scale anti-patterns (from deck).

**Acceptance Criteria:**
- [ ] `components/ScalePitfallsAccordion.tsx` created
- [ ] Data-driven from `lib/content/scalePitfalls.ts`
- [ ] Each item: anti-pattern, why it fails, YardFlow approach
- [ ] Accordion animation respects reduced motion
- [ ] Keyboard accessible (Enter/Space toggle)
- [ ] Unit test validates expand/collapse

**Validation:**
```typescript
test('accordion expands on click', async () => {
  render(<ScalePitfallsAccordion />);
  const item = screen.getByRole('button', { name: /vision in critical path/i });
  await userEvent.click(item);
  expect(screen.getByText(/pragmatic automation/i)).toBeVisible();
});
```

**Content Example:**
```typescript
// lib/content/scalePitfalls.ts
export const SCALE_PITFALLS = [
  {
    antiPattern: 'Vision in Critical Path',
    whyItFails: 'Machine learning dependencies create deployment blockers and unpredictable timelines.',
    yardflowApproach: 'Pragmatic automation: mobile-first workflows now, vision as Phase 2+ add-on.',
  },
  // ...
];
```

---

#### S4.2: Complete `/scale` Page Content
**Complexity:** M  
**Description:** Finish scale page with architecture stance, network principles, and accordion.

**Acceptance Criteria:**
- [ ] ScalePitfallsAccordion integrated
- [ ] Section: "Architecture Stance" (pragmatic automation, no vendor lock-in)
- [ ] Section: "Network Effect" (standardization compounds across sites)
- [ ] Uses `SECTIONS.scale` content model
- [ ] CTA: "Book Network Audit"

**Validation:**
```bash
# Manual QA: Visit /scale
# Confirm accordion, architecture stance, network effect visible
```

---

#### S4.3: Phased Rollout Stepper Component
**Complexity:** M  
**Description:** Animated stepper showing 5-phase framework (POC → Pilot → Scale Pilot → Full → Innovation 2.0).

**Acceptance Criteria:**
- [ ] `components/PhasedRolloutStepper.tsx` created
- [ ] Data from `PHASED_FRAMEWORK` content model
- [ ] Active phase highlights on scroll
- [ ] Timeline connects phases with progress line
- [ ] Respects reduced motion (no animation if preferred)
- [ ] Unit test validates rendering

**Validation:**
```typescript
test('stepper renders 5 phases', () => {
  render(<PhasedRolloutStepper />);
  expect(screen.getByText('POC')).toBeInTheDocument();
  expect(screen.getByText('Innovation 2.0')).toBeInTheDocument();
});
```

---

#### S4.4: Update `/implementation` Page with Phased Framework
**Complexity:** M  
**Description:** Replace or augment current implementation page with phased stepper and deck-aligned copy.

**Acceptance Criteria:**
- [ ] PhasedRolloutStepper component integrated
- [ ] Each phase has:
  - Description
  - Timeframe
  - Success criteria
  - Example outcomes
- [ ] Uses `PHASED_FRAMEWORK` content model
- [ ] CTA: "Discuss Implementation Plan"

**Validation:**
```bash
# Manual QA: Visit /implementation
# Confirm stepper visible, phases listed
```

---

#### S4.5: Tighten `/integrations` Copy for IT Buyers
**Complexity:** S  
**Description:** Update integrations page to focus on IT buyer concerns: APIs, WMS/TMS, security, data ownership.

**Acceptance Criteria:**
- [ ] Sections rewritten:
  - API-first architecture
  - WMS/TMS integration points
  - Data ownership (customer owns data)
  - SSO/SAML support
- [ ] Technical specs callout (REST API, webhooks, etc.)
- [ ] CTA: "Request Integration Docs"

**Validation:**
```bash
# Manual QA: Visit /integrations
# Confirm IT-focused language, API details visible
```

---

#### S4.6: Expand `/security` for Procurement Readiness
**Complexity:** M  
**Description:** Add SOC2 status, pen test info, security questionnaire handling.

**Acceptance Criteria:**
- [ ] Section: "SOC2 Status" (Type 2 in progress, timeline)
- [ ] Section: "Penetration Testing" (annual, NDA required for report)
- [ ] Section: "Security Questionnaires" (dedicated team, 48hr turnaround)
- [ ] CTA: "Request Security Docs"
- [ ] Uses `SECTIONS.security` content model

**Validation:**
```bash
# Manual QA: Visit /security
# Confirm SOC2, pen test, questionnaires visible
```

---

## Sprint 5: QA Hardening (Tests, Lighthouse, A11y, Analytics)

**Goal:** Comprehensive testing, performance optimization, accessibility audit, analytics validation.

**Demoable Outcome:** Production-ready site passing all quality gates.

### Tasks

#### S5.1: Playwright Smoke Tests (Critical Flows)
**Complexity:** M  
**Description:** Add smoke tests for critical user journeys.

**Acceptance Criteria:**
- [ ] Test: Homepage → Proof → CTA click
- [ ] Test: Homepage → Co-Development → Track selector → Form
- [ ] Test: Solutions → Flatbed → Apply CTA
- [ ] Test: Nav links all resolve
- [ ] All tests pass in CI

**Validation:**
```bash
npm run test:e2e:smoke
# All tests pass
```

**Example Test:**
```typescript
// e2e/smoke/codev-flow.spec.ts
test('co-dev application flow', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Co-Development');
  await expect(page).toHaveURL('/co-development');
  
  await page.click('role=tab[name=Flatbed]');
  await expect(page.locator('text=tarping')).toBeVisible();
  
  await page.click('text=Apply for Flatbed Co-Development');
  await expect(page).toHaveURL(/\/contact\?intent=/);
});
```

---

#### S5.2: Component Unit Test Coverage >= 80%
**Complexity:** L  
**Description:** Add unit tests for all new components (ProofStrip, TrackSelector, Accordion, Stepper).

**Acceptance Criteria:**
- [ ] ProofStrip: rendering, animation trigger, reduced motion
- [ ] CoDevTrackSelector: tab switching, keyboard nav
- [ ] ScalePitfallsAccordion: expand/collapse, keyboard
- [ ] PhasedRolloutStepper: phase rendering, scroll activation
- [ ] Coverage report shows >= 80% for new components

**Validation:**
```bash
npm run test:unit -- --coverage
# Check coverage report
```

---

#### S5.3: Lighthouse Performance Audit
**Complexity:** M  
**Description:** Run Lighthouse, optimize for >= 90 performance, >= 95 accessibility.

**Acceptance Criteria:**
- [ ] Lighthouse CI integrated (`.lighthouserc.js`)
- [ ] Target pages audited: /, /proof, /co-development, /scale, /implementation
- [ ] Performance >= 90 (mobile)
- [ ] Accessibility >= 95
- [ ] Best Practices >= 90
- [ ] SEO >= 90
- [ ] Issues documented and fixed (image optimization, lazy loading, etc.)

**Validation:**
```bash
npm run lighthouse:ci
# All targets pass
```

**Common Fixes:**
- Image optimization (next/image)
- Lazy load non-critical components
- Reduce JS bundle size
- Preload critical fonts

---

#### S5.4: Accessibility Audit (Manual + Automated)
**Complexity:** M  
**Description:** Manual keyboard navigation test + automated axe checks.

**Acceptance Criteria:**
- [ ] All interactive elements keyboard accessible (Tab, Enter, Space, Arrows)
- [ ] Focus visible (outline on interactive elements)
- [ ] ARIA labels on custom components (accordion, tabs)
- [ ] Color contrast passes WCAG AA
- [ ] Axe DevTools audit shows 0 violations
- [ ] Screen reader test (VoiceOver/NVDA) on key pages

**Validation:**
```bash
# Playwright axe test
test('homepage has no axe violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

---

#### S5.5: Analytics Event Validation
**Complexity:** S  
**Description:** Validate all analytics events fire correctly in production.

**Acceptance Criteria:**
- [ ] Events tracked:
  - `proof_strip_viewed`
  - `proof_cta_clicked`
  - `codev_track_selected`
  - `design_partner_application_started`
  - `implementation_stepper_viewed`
- [ ] Mock analytics provider in tests
- [ ] Real analytics tested in staging/preview

**Validation:**
```bash
# Unit tests pass
npm run test:unit -- lib/analytics

# Manual: Check GA4 debug mode in preview deployment
```

---

#### S5.6: Content Model Validation (Schema Enforcement)
**Complexity:** S  
**Description:** Ensure all content models have TypeScript types and runtime validation.

**Acceptance Criteria:**
- [ ] Zod schemas added to content models (or TypeScript-only)
- [ ] Build fails if content doesn't match schema
- [ ] Unit tests validate all content files

**Validation:**
```typescript
// lib/content/__tests__/validation.test.ts
test('proof points match schema', () => {
  const result = ProofPointSchema.safeParse(PROOF_POINTS);
  expect(result.success).toBe(true);
});
```

---

#### S5.7: CI/CD Pipeline Hardening
**Complexity:** M  
**Description:** Ensure all quality gates run in CI before merge.

**Acceptance Criteria:**
- [ ] GitHub Actions workflow runs:
  - TypeScript type check
  - Lint (ESLint)
  - Unit tests
  - Smoke tests (Playwright)
  - Link check
  - Lighthouse CI
- [ ] Branch protection requires all checks to pass
- [ ] Preview deployment on PR

**Validation:**
```bash
# Open PR, confirm all checks run and pass
# Check GitHub Actions tab
```

---

## Sprint 6 (Optional): Advanced Animations + Polish

**Goal:** Add advanced animations (if time permits), polish UX, optimize conversions.

### Tasks

#### S6.1: Proof Strip Count-Up Polish
**Complexity:** S  
**Description:** Enhance count-up animation with easing, stagger, and number formatting.

---

#### S6.2: Page Transition Animations
**Complexity:** M  
**Description:** Add subtle page transitions using Framer Motion layout animations.

---

#### S6.3: Hover State Polish (CTAs, Cards)
**Complexity:** S  
**Description:** Add micro-interactions on hover (scale, glow, etc.).

---

#### S6.4: Loading Skeletons for Async Content
**Complexity:** M  
**Description:** Add skeleton loaders for any async-loaded content.

---

## Validation Summary

### Per-Sprint Validation
- **Sprint 0:** Content model tests pass, link checker green
- **Sprint 1:** All routes load, nav links work, Playwright smoke tests pass
- **Sprint 2:** ProofStrip animates, analytics events fire
- **Sprint 3:** Track selector switches, design partner form submits
- **Sprint 4:** Accordion/stepper render, Lighthouse targets met
- **Sprint 5:** 80% test coverage, Lighthouse >= 90/95, axe clean

### Production Readiness Checklist
- [ ] No 404s (link checker passes)
- [ ] Lighthouse: Performance >= 90, A11y >= 95
- [ ] All CTAs tracked (analytics events)
- [ ] Keyboard navigation works
- [ ] Reduced motion respected
- [ ] Content model enforced (TypeScript types)
- [ ] CI/CD pipeline green
- [ ] Staging deployment tested

---

## Task Complexity Legend
- **S (Small):** 1-2 hours, single file change, straightforward
- **M (Medium):** 4-6 hours, multiple files, moderate complexity
- **L (Large):** 8+ hours, cross-cutting, requires design decisions

---

## Next Steps

1. **Review this plan** with stakeholders
2. **Create GitHub issues** from tasks (use template below)
3. **Implement Sprint 0** (baseline audit + content model)
4. **Implement Sprint 1** (route fixes + sitemap)
5. **Demo** after each sprint
6. **Iterate** based on feedback

---

## GitHub Issue Template

```markdown
### Title
[S0.2] Content Model Schema (Proof Points)

### Description
Create TypeScript schemas for proof points data. No hardcoded copy in JSX.

### Acceptance Criteria
- [ ] `lib/content/proofPoints.ts` exports typed proof data
- [ ] Schema includes: metric, label, qualifier, sourceType
- [ ] 4 key stats from deck mapped
- [ ] Unit test validates schema shape

### Validation
```bash
npm run test:unit -- lib/content/__tests__/proofPoints.test.ts
```

### Complexity
M (Medium)

### Sprint
Sprint 0

### Dependencies
None
```

---

**End of Sprint Plan**

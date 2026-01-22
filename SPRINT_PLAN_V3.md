# YardFlow Sprint Plan: Quality, Accessibility & Production Readiness

**Version:** 3.0  
**Date:** January 21, 2026  
**Status:** Active  
**Last Verified:** TypeScript ✅ 0 errors | Unit Tests ✅ 452 passing

---

## Executive Summary

This sprint plan covers the remaining work after Sprint 1 (Animation) and Sprint 2 (Cards) completion. Focus is on quality gates, accessibility, brand consistency, and production readiness.

### Current State
- **Sprint 1 (Animation):** ✅ Complete
  - ProtocolSequenceAnimation cycling Guard→Comms→BOL→YMS
  - Icon components (ProtocolGuardIcon, ProtocolCommsIcon, ProtocolBOLIcon, ProtocolYMSIcon)
  - SSR-safe utilities (useSSRSafeReducedMotion, trackSafe)
  - Analytics tracking with useProtocolSequenceAnalytics
  - Accessibility E2E (axe scan, reduced-motion, aria-live)
  
- **Sprint 2 (Cards):** ✅ Complete
  - SingularityCard, ProductCard, NetworkEffectCard
  - Homepage integration in "Proof Engine" section
  - Visual regression baselines for card section

### Infrastructure
| Component | Status | Notes |
|-----------|--------|-------|
| TypeScript | ✅ 0 errors | Verified after .next cache clear |
| Unit Tests | ✅ 452 passing | 36 test files |
| E2E Specs | 7 files | accessibility, cross-browser, mobile, responsive, routes, smoke, visual-regression |
| Scripts | 15+ | lighthouse-audit, bundle-audit, congruence-check, site-crawl, etc. |

---

## Sprint 3: Quality Gates & Cross-Browser

**Duration:** 3-4 days  
**Goal:** Establish performance baselines, cross-browser coverage, and CI gates.  
**Demo:** CI pipeline green with performance + cross-browser checks.

### Prerequisites
- [ ] Lighthouse CLI installed globally: `npm install -g lighthouse`
- [ ] Playwright browsers installed: `npx playwright install`

---

### T3-001: Performance Baseline Validation

**Description:** Verify scripts/lighthouse-audit.js runs and captures key metrics.

**Acceptance Criteria:**
- [ ] `npm run perf:audit` runs successfully (add script if missing)
- [ ] Outputs JSON with scores for homepage, /roi, /singularity
- [ ] Fails if Performance score < 75 or Accessibility < 90
- [ ] Document current baseline in docs/PERFORMANCE_BASELINES.md

**Implementation Notes:**
```bash
# Verify existing script
node scripts/lighthouse-audit.js

# Add npm script if missing
"perf:audit": "npm run build && node scripts/lighthouse-audit.js"
```

**Validation:** `npm run perf:audit` exits 0 on production build

**Effort:** 2 hours

---

### T3-002: Bundle Size Budget Enforcement

**Description:** Validate bundle-audit.js enforces <200KB JS budget per route.

**Acceptance Criteria:**
- [ ] `npm run audit:bundle` runs (already exists in package.json)
- [ ] Fails if any route exceeds 200KB JS
- [ ] Reports per-route breakdown
- [ ] Document results in docs/BUNDLE_AUDIT.md

**Implementation Notes:**
```bash
# Existing script
npm run audit:bundle
# OR: npm run build && node scripts/bundle-audit.js
```

**Validation:** `npm run audit:bundle` exits 0

**Effort:** 1 hour

---

### T3-003: Cross-Browser E2E Validation

**Description:** Ensure cross-browser-smoke.spec.ts runs on Chromium, Firefox, WebKit.

**Acceptance Criteria:**
- [ ] playwright.config.ts has all 3 browser projects (verify existing config)
- [ ] `npm run test:e2e -- e2e/cross-browser-smoke.spec.ts` passes on all 3
- [ ] Report shows tests per browser

**Implementation Notes:**
```typescript
// playwright.config.ts should have:
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
]
```

**Validation:** Playwright HTML report shows 3 browsers × all tests green

**Effort:** 2 hours

---

### T3-004: Visual Regression Expansion

**Description:** Add individual component snapshots for new cards.

**Existing Baselines (already committed):**
- home-cards-desktop.png
- home-cards-mobile.png
- home-hero-reduced-motion.png

**New Baselines Needed:**
- [ ] SingularityCard component isolation (600x400)
- [ ] ProductCard component isolation (600x400)
- [ ] NetworkEffectCard component isolation (600x400)

**Acceptance Criteria:**
- [ ] visual-regression.spec.ts has tests for each card component
- [ ] Baseline screenshots committed
- [ ] Tests pass with threshold < 2% diff

**Implementation Notes:**
```typescript
test('SingularityCard component', async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 400 });
  await page.goto('/');
  const card = page.locator('[aria-label="Singularity proof engine"]');
  await expect(card).toHaveScreenshot('singularity-card.png');
});
```

**Validation:** `npm run test:e2e -- e2e/visual-regression.spec.ts` passes

**Effort:** 2 hours

---

### T3-005: CI Pre-Deploy Gate

**Description:** Ensure predeploy script chains all quality gates.

**Acceptance Criteria:**
- [ ] `npm run predeploy` runs: typecheck, unit tests, E2E, congruence check
- [ ] Fails if any gate fails
- [ ] Total runtime < 5 minutes documented

**Current Script (verify/update):**
```json
"predeploy": "npm run congruence:check && npm run test:e2e:ci"
```

**Should Be:**
```json
"predeploy": "npm run typecheck && npm run test:unit && npm run congruence:check && npm run test:e2e:ci"
```

**Validation:** `npm run predeploy` exits 0

**Effort:** 1 hour

---

### Sprint 3 Demo Checklist
- [ ] `npm run perf:audit` shows Performance ≥75, Accessibility ≥90
- [ ] `npm run audit:bundle` shows all routes <200KB
- [ ] `npm run test:e2e -- e2e/cross-browser-smoke.spec.ts` green on 3 browsers
- [ ] Visual regression baselines committed for cards
- [ ] `npm run predeploy` exits 0

---

## Sprint 4: Accessibility & Mobile Polish

**Duration:** 2-3 days  
**Goal:** WCAG AA compliance verified, mobile touch targets validated.  
**Demo:** axe-core 0 serious/critical violations, touch targets ≥44px.

---

### T4-001: Axe-Core Full-Site Scan

**Description:** Extend e2e/accessibility.spec.ts to cover all key pages.

**Pages to Cover:**
- [ ] Homepage (/)
- [ ] ROI (/roi)
- [ ] Singularity (/singularity)
- [ ] Product (/product)
- [ ] Contact (/contact)

**Acceptance Criteria:**
- [ ] Tests for 5+ key pages
- [ ] 0 serious/critical violations
- [ ] Moderate violations documented in docs/A11Y_TECH_DEBT.md

**Implementation Notes:**
```typescript
const PAGES = ['/', '/roi', '/singularity', '/product', '/contact'];

for (const path of PAGES) {
  test(`axe: ${path} has no serious violations`, async ({ page }) => {
    await page.goto(path);
    await page.addScriptTag({ content: axe.source });
    const results = await page.evaluate(() => axe.run());
    const serious = results.violations.filter(v => 
      v.impact === 'serious' || v.impact === 'critical'
    );
    expect(serious).toHaveLength(0);
  });
}
```

**Validation:** `npm run test:e2e -- e2e/accessibility.spec.ts` passes

**Effort:** 2 hours

---

### T4-002: Color Contrast Verification

**Description:** Verify all text meets 4.5:1 contrast ratio.

**Colors to Verify:**
| Foreground | Background | Expected Ratio |
|------------|------------|----------------|
| Neon #00B4FF | Void #050505 | ≥10:1 ✅ |
| Steel #6B7280 | Carbon #111827 | ≥4.5:1 |
| Ember #EF4444 | Void #050505 | ≥4.5:1 |
| White #FFFFFF | Void #050505 | ≥16:1 ✅ |

**Acceptance Criteria:**
- [ ] All combinations verified with contrast checker
- [ ] axe-core color-contrast rule passes
- [ ] Document in docs/COLOR_CONTRAST.md

**Validation:** axe-core passes color-contrast rule on all pages

**Effort:** 1 hour

---

### T4-003: Touch Target Validation

**Description:** Ensure all interactive elements are ≥44x44px on mobile.

**Acceptance Criteria:**
- [ ] e2e/responsive.spec.ts touch target tests pass
- [ ] Any undersized elements identified and fixed
- [ ] Mobile nav hamburger ≥44x44
- [ ] CTA buttons ≥44x44

**Validation:** `npm run test:e2e -- e2e/responsive.spec.ts` passes

**Effort:** 1 hour

---

### T4-004: Keyboard Navigation Audit

**Description:** Verify tab order and focus visibility.

**Pages to Test:**
- [ ] Homepage: Tab through hero → cards → footer
- [ ] ROI: Tab through form inputs → submit
- [ ] Contact: Tab through form fields

**Acceptance Criteria:**
- [ ] Focus ring visible on all interactive elements
- [ ] Tab order follows visual layout
- [ ] No focus traps
- [ ] Escape closes modals/drawers

**Validation:** Manual verification checklist in docs/KEYBOARD_NAV_AUDIT.md

**Effort:** 1 hour

---

### T4-005a: Landmarks & Heading Structure

**Description:** Verify semantic structure for screen readers.

**Acceptance Criteria:**
- [ ] `<main>` landmark present on all pages
- [ ] `<nav>` landmark for navigation
- [ ] Heading hierarchy (h1 → h2 → h3) follows document structure
- [ ] No skipped heading levels

**Validation:** axe-core landmark rules pass

**Effort:** 1 hour

---

### T4-005b: Dynamic Content Announcements

**Description:** Verify aria-live regions announce updates.

**Components to Verify:**
- [ ] ProtocolSequenceAnimation (aria-live="polite")
- [ ] Form validation messages (aria-live="assertive")
- [ ] Toast notifications (if any)

**Acceptance Criteria:**
- [ ] VoiceOver/NVDA announces state changes
- [ ] No missed announcements

**Validation:** Manual screen reader test documented

**Effort:** 1 hour

---

### T4-006: Loading State Accessibility

**Description:** Ensure loading states are accessible.

**Acceptance Criteria:**
- [ ] Suspense boundaries have aria-busy="true"
- [ ] Skeleton screens have aria-hidden="true" or descriptive labels
- [ ] Loading spinners have aria-label

**Validation:** axe-core passes during page transitions

**Effort:** 1 hour

---

### Sprint 4 Demo Checklist
- [ ] `npm run test:e2e -- e2e/accessibility.spec.ts` covers 5 pages, 0 serious violations
- [ ] Color contrast documented and verified
- [ ] Touch targets ≥44px on mobile
- [ ] Keyboard navigation smooth, focus visible
- [ ] Screen reader announces protocol sequence changes

---

## Sprint 5: Content & Brand Consistency

**Duration:** 2 days  
**Goal:** Single brand voice, no orphaned pages, CTA hierarchy enforced.  
**Demo:** Link walk green, brand audit passing.

---

### T5-001: Brand Name Normalization

**Description:** Ensure "YardFlow by FreightRoll" used consistently.

**Acceptance Criteria:**
- [ ] Header shows "YardFlow by FreightRoll"
- [ ] Footer shows consistent branding
- [ ] Meta titles use "YardFlow"
- [ ] No standalone "FreightRoll" without "YardFlow"

**Validation:**
```bash
grep -r "FreightRoll" --include="*.tsx" --include="*.ts" | grep -v "YardFlow by FreightRoll" | grep -v "BRAND\." | wc -l
# Should return 0 (or expected exceptions)
```

**Effort:** 1 hour

---

### T5-002: CTA Hierarchy Enforcement

**Description:** Every page has exactly 1 primary CTA.

**CTA Mapping:**
| Page | Primary CTA | Secondary CTA |
|------|-------------|---------------|
| / | Book Network Audit | Calculate ROI |
| /roi | Calculate Your Savings | Contact Sales |
| /product | See the Protocol | Book Demo |
| /singularity | Launch Simulation | Learn More |
| /contact | Get a Quote | - |

**Acceptance Criteria:**
- [ ] Document in docs/CTA_HIERARCHY.md
- [ ] E2E test verifies primary CTA text on each page
- [ ] No pages with 2+ primary-styled CTAs

**Validation:** E2E test passes

**Effort:** 2 hours

---

### T5-003: Dead Link Check

**Description:** Run site-crawl.ts to find 404s.

**Acceptance Criteria:**
- [ ] Add npm script: `"site:crawl": "tsx scripts/site-crawl.ts"`
- [ ] Update script to use configurable base URL
- [ ] 0 internal 404s
- [ ] External links verified or marked nofollow

**Validation:** `npm run site:crawl` exits 0

**Effort:** 1 hour

---

### T5-004: Meta & SEO Audit

**Description:** Verify all pages have proper metadata.

**Requirements per Page:**
- [ ] `<title>` unique and descriptive
- [ ] `<meta name="description">` present
- [ ] `og:title`, `og:description`, `og:image` present
- [ ] `robots.ts` allows indexing

**Validation:** Lighthouse SEO score ≥90 on key pages

**Effort:** 1 hour

---

### T5-005: Meta Assets Verification

**Description:** Verify favicon and PWA assets.

**Acceptance Criteria:**
- [ ] /favicon.ico returns 200
- [ ] apple-touch-icon configured in layout.tsx
- [ ] site.webmanifest valid (if PWA)

**Validation:** Browser dev tools shows correct icons

**Effort:** 1 hour

---

### Sprint 5 Demo Checklist
- [ ] Brand audit grep returns 0 exceptions
- [ ] CTA hierarchy documented and enforced
- [ ] `npm run site:crawl` finds 0 broken links
- [ ] Lighthouse SEO ≥90
- [ ] Favicon renders correctly

---

## Sprint 6: Production Readiness

**Duration:** 2 days  
**Goal:** Deployment checklist complete, rollback plan documented.  
**Demo:** Successful Vercel deployment with monitoring.

---

### T6-001: Environment Variable Audit

**Description:** Document all required env vars for production.

**Acceptance Criteria:**
- [ ] .env.example lists all required vars with descriptions
- [ ] Vercel project has all vars configured
- [ ] No secrets in codebase (grep for API keys)
- [ ] Document in docs/ENV_VARS.md

**Validation:** `npm run build` succeeds with production env

**Effort:** 1 hour

---

### T6-002: Error Boundary Implementation

**Description:** Ensure graceful error handling.

**Required Files:**
- [ ] `app/error.tsx` - Runtime error boundary (CREATE)
- [ ] `app/not-found.tsx` - 404 page (EXISTS, verify styling)
- [ ] `app/global-error.tsx` - Root error boundary (CREATE if needed)

**Acceptance Criteria:**
- [ ] Error pages match brand styling
- [ ] Include CTA to return home
- [ ] E2E test for 404 page

**Validation:** Navigate to /nonexistent returns styled 404

**Effort:** 2 hours

---

### T6-003: Analytics Integration Verification

**Description:** Verify tracking on key events.

**Prerequisite:** T6-001 (env vars verified)

**Events to Verify:**
- [ ] Page views tracked
- [ ] CTA clicks tracked
- [ ] Protocol sequence views tracked (from Sprint 1)
- [ ] Form submissions tracked

**Acceptance Criteria:**
- [ ] PostHog dashboard shows events
- [ ] No PII in event properties

**Validation:** Manual verification in PostHog

**Effort:** 1 hour

---

### T6-004: Security Headers Configuration

**Description:** Add security headers for production.

**Required Headers:**
```javascript
// next.config.js or vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

**Acceptance Criteria:**
- [ ] Headers present in production response
- [ ] CSP allows required domains (if implemented)

**Validation:** `curl -I https://yardflow.vercel.app | grep -i "x-frame"`

**Effort:** 1 hour

---

### T6-005: Rollback Plan Documentation

**Description:** Document deployment contingency.

**Contents:**
- [ ] Vercel rollback steps (1-click in dashboard)
- [ ] How to identify failed deployment
- [ ] Contact list for incidents
- [ ] Monitoring dashboard links

**Validation:** docs/ROLLBACK_PLAN.md exists and is complete

**Effort:** 1 hour

---

### T6-006: Final Congruence Check

**Description:** Run congruence-check.ts and verify all items pass.

**Acceptance Criteria:**
- [ ] `npm run congruence:check` passes
- [ ] All content aligned with brand guidelines
- [ ] No regressions from Sprint 1-5 work

**Validation:** Script exits 0 with all checks green

**Effort:** 30 minutes

---

### Sprint 6 Demo Checklist
- [ ] .env.example documented
- [ ] Error pages styled and functional
- [ ] Analytics events appearing in PostHog
- [ ] Security headers present
- [ ] Rollback plan documented
- [ ] `npm run congruence:check` passes
- [ ] 🚀 Ready for production deployment

---

## Task Summary

| Sprint | Tasks | Focus | Duration |
|--------|-------|-------|----------|
| Sprint 3 | 5 tasks | Quality Gates | 3-4 days |
| Sprint 4 | 7 tasks | Accessibility | 2-3 days |
| Sprint 5 | 5 tasks | Brand Consistency | 2 days |
| Sprint 6 | 6 tasks | Production | 2 days |
| **Total** | **23 tasks** | | **9-11 days** |

---

## Definition of Done (Per Task)

- [ ] Code changes committed with descriptive message
- [ ] Tests pass (unit and/or E2E as applicable)
- [ ] TypeScript 0 errors
- [ ] Validation method executed successfully
- [ ] Documentation updated (if applicable)

---

## Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Lighthouse perf regression | Medium | High | Baseline documented; CI gate |
| Cross-browser visual diff | Low | Medium | 2% threshold; manual review |
| Missing a11y violation | Medium | High | Multiple pages; axe + manual |
| Env var misconfiguration | Low | High | .env.example; checklist |

---

## Quick Commands Reference

```bash
# Sprint 3: Quality Gates
npm run perf:audit
npm run audit:bundle
npm run test:e2e -- e2e/cross-browser-smoke.spec.ts
npm run test:e2e -- e2e/visual-regression.spec.ts --update-snapshots
npm run predeploy

# Sprint 4: Accessibility
npm run test:e2e -- e2e/accessibility.spec.ts
npm run test:e2e -- e2e/responsive.spec.ts

# Sprint 5: Content
npm run site:crawl
npm run congruence:check

# Sprint 6: Production
npm run build
npm run congruence:check
curl -I https://yardflow.vercel.app | grep -i "x-frame"
```

---

**Document Owner:** Engineering Lead  
**Review Cadence:** Daily standup, end-of-sprint demo  
**Escalation Path:** Developer → Tech Lead → CTO

---

*Generated: January 21, 2026*
*Next Review: Sprint 3 Kickoff*

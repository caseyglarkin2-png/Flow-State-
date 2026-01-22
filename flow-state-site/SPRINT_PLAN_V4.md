# YardFlow Sprint Plan V4

> **Last Updated:** Session Date  
> **Status:** Active  
> **Subagent Review:** 7.5/10 → Improvements Incorporated

---

## Executive Summary

This sprint plan covers the remaining work to bring the YardFlow site to production readiness. It incorporates subagent feedback to remove already-completed tasks and add missing critical items.

### Project State (Verified)

| Metric | Status |
|--------|--------|
| TypeScript | ✅ 0 errors |
| Unit Tests | ✅ 452 passing (36 files) |
| E2E Specs | ✅ 7 files |
| Browsers | ✅ Chromium, Firefox, WebKit |

### Completed Work (Do Not Repeat)

| Item | Evidence |
|------|----------|
| ProtocolSequenceAnimation | `components/animations/ProtocolSequenceAnimation.tsx` |
| Protocol Icons | `components/icons/ProtocolIcons.tsx` |
| Card Components | SingularityCard, ProductCard, NetworkEffectCard |
| Full-Site Axe Scan | `e2e/accessibility.spec.ts` covers 5 pages |
| Landmark Tests | `e2e/accessibility.spec.ts` has main/nav tests |
| Visual Regression Cards | `e2e/visual-regression.spec.ts` has card tests |
| Cross-Browser Config | `playwright.config.ts` has 3 browsers |
| Predeploy Script | `package.json` chains all gates |

---

## Sprint Overview

| Sprint | Focus | Tasks | Effort | Demo |
|--------|-------|-------|--------|------|
| **Sprint 3** | Quality Verification | 3 | ~2h | `npm run predeploy` green, Lighthouse HTML report |
| **Sprint 4** | Error Handling & Accessibility | 5 | ~5h | Error pages render, keyboard nav works |
| **Sprint 5** | Content & Brand | 5 | ~4.5h | Site crawl 0 broken links, brand audit passes |
| **Sprint 6** | Production Readiness | 7 | ~8h | Vercel deploy, PostHog events visible |
| **Total** | | **20** | **~19.5h** | |

---

## Sprint 3: Quality Verification

**Goal:** Verify all quality gates work, add missing CI integrations.  
**Demo:** `npm run predeploy` passes; Lighthouse HTML report viewable.

---

### T3-001: Lighthouse CI Verification

**Description:** Verify `npm run perf:audit` runs and outputs reports.

**Files:**
- `scripts/lighthouse-audit.js`
- `test-results/lighthouse/` (output)

**Acceptance Criteria:**
- [ ] Script runs without errors when server is running
- [ ] Outputs JSON + HTML reports to `test-results/lighthouse/`
- [ ] Fails if Performance < 90 or Accessibility < 95 (per script thresholds)

**Validation:**
```bash
npm run build && npm run start &
sleep 5
npm run perf:audit
kill %1
```

**Effort:** 1 hour

---

### T3-002: Bundle Size Baseline Documentation

**Description:** Run bundle audit and document baseline for future regression detection.

**Files:**
- `scripts/bundle-audit.js`
- `docs/BUNDLE_BASELINE.md` (NEW)

**Acceptance Criteria:**
- [ ] `npm run audit:bundle` exits 0
- [ ] Create `docs/BUNDLE_BASELINE.md` with current sizes
- [ ] Include date and commit hash

**Validation:**
```bash
npm run audit:bundle
cat docs/BUNDLE_BASELINE.md
```

**Effort:** 30 minutes

---

### T3-003: Environment Variable Documentation

**Description:** Create `.env.example` documenting all required environment variables.

**Files:**
- `.env.example` (NEW)

**Acceptance Criteria:**
- [ ] Lists all env vars with descriptions
- [ ] Includes: `HCAPTCHA_SITEKEY`, `HCAPTCHA_SECRET`, `POSTHOG_KEY`, `RESEND_API_KEY` (if applicable)
- [ ] No actual secrets in file
- [ ] Comments explain which are required vs optional

**Validation:**
```bash
cat .env.example
# Verify build works with placeholder values
```

**Effort:** 30 minutes

---

## Sprint 4: Error Handling & Accessibility Polish

**Goal:** Graceful error handling, loading states, keyboard accessibility.  
**Demo:** Error pages render with brand styling; keyboard navigation works.

---

### T4-001: Create app/error.tsx

**Description:** Add runtime error boundary with brand styling.

**Files:**
- `app/error.tsx` (NEW)

**Acceptance Criteria:**
- [ ] Catches runtime errors gracefully
- [ ] Matches brand styling (void #050505 bg, neon #00B4FF accents)
- [ ] Has "Go Home" CTA button
- [ ] Has "Try Again" reset button
- [ ] Logs error to console in dev mode

**Validation:**
```bash
# Create test route that throws, verify error.tsx renders
```

**Effort:** 1 hour

---

### T4-002: Create app/global-error.tsx

**Description:** Add root-level error boundary for layout errors.

**Files:**
- `app/global-error.tsx` (NEW)

**Acceptance Criteria:**
- [ ] Catches errors in root layout
- [ ] Minimal HTML (no external deps that might also break)
- [ ] Inline styles only (no Tailwind - it might have failed)
- [ ] Shows generic "Something went wrong" message
- [ ] Has refresh page button

**Validation:**
```bash
# Temporarily break layout.tsx, verify global-error renders
```

**Effort:** 1 hour

---

### T4-003: Create app/loading.tsx

**Description:** Add loading state for Suspense boundaries.

**Files:**
- `app/loading.tsx` (NEW)

**Acceptance Criteria:**
- [ ] Matches brand styling (void bg, neon accent)
- [ ] Shows skeleton or branded spinner
- [ ] Works with streaming SSR
- [ ] Doesn't flash for fast loads (min 200ms display)

**Validation:**
```bash
# Add artificial delay to page component, verify loading.tsx shows
```

**Effort:** 1 hour

---

### T4-004: Keyboard Focus Visibility Audit

**Description:** Ensure focus rings visible on all interactive elements.

**Files:**
- `styles/globals.css` or Tailwind config
- E2E test file (optional)

**Acceptance Criteria:**
- [ ] Focus ring visible when tabbing (not just click focus)
- [ ] Focus ring uses brand neon color (#00B4FF)
- [ ] No focus traps in modals/drawers
- [ ] Escape key closes modals

**Validation:**
```bash
# Manual: Tab through homepage, document focus visibility
# Create e2e/keyboard-navigation.spec.ts for automation
```

**Effort:** 1 hour

---

### T4-005: E2E Error Boundary Test

**Description:** Create E2E test verifying error boundaries work.

**Files:**
- `e2e/error-boundaries.spec.ts` (NEW)
- `app/__test-error__/page.tsx` (NEW, test-only route)

**Acceptance Criteria:**
- [ ] Test route throws controlled error
- [ ] Verifies error.tsx renders with correct heading
- [ ] Verifies "Go Home" link works
- [ ] Test-only route excluded from sitemap

**Validation:**
```bash
npm run test:e2e -- e2e/error-boundaries.spec.ts
```

**Effort:** 1 hour

---

## Sprint 5: Content & Brand Consistency

**Goal:** Single brand voice, no broken links, SEO optimized.  
**Demo:** Site crawl finds 0 broken links; brand audit script passes.

---

### T5-001: Brand Name Consistency Audit

**Description:** Verify "YardFlow by FreightRoll" used consistently.

**Files:**
- All `.tsx` files with brand references

**Acceptance Criteria:**
- [ ] Header shows "YardFlow" or "YardFlow by FreightRoll"
- [ ] Footer consistent with header
- [ ] No orphaned "FreightRoll" without "YardFlow" context
- [ ] Document brand usage patterns

**Validation:**
```bash
grep -r "FreightRoll" --include="*.tsx" app/ components/ | wc -l
# Review each instance
```

**Effort:** 1 hour

---

### T5-002: CTA Hierarchy Documentation

**Description:** Document primary CTA per page to ensure clarity.

**Files:**
- `docs/CTA_HIERARCHY.md` (NEW)

**Acceptance Criteria:**
- [ ] Lists every route with its primary CTA
- [ ] No page has 2+ primary-styled CTAs competing
- [ ] Secondary/tertiary CTAs documented
- [ ] CTA copy reviewed for action orientation

**Validation:**
```bash
cat docs/CTA_HIERARCHY.md
# Visual review of each page
```

**Effort:** 1 hour

---

### T5-003: Dead Link Check

**Description:** Run site-crawl.ts to find 404s and broken links.

**Files:**
- `scripts/site-crawl.ts`

**Acceptance Criteria:**
- [ ] Script runs via `npm run site:crawl`
- [ ] 0 internal 404s
- [ ] External links logged (warn, don't fail)
- [ ] Output saved to `test-results/crawl-report.json`

**Validation:**
```bash
npm run build && npm run start &
sleep 5
npm run site:crawl
kill %1
```

**Effort:** 1 hour

---

### T5-004: Meta & SEO Verification

**Description:** Verify all pages have proper metadata for SEO.

**Files:**
- `app/*/page.tsx` (all route files)

**Acceptance Criteria:**
- [ ] Every route exports `metadata` with title + description
- [ ] `og:title`, `og:description`, `og:image` present
- [ ] Canonical URLs set correctly
- [ ] `robots.ts` allows indexing for production

**Validation:**
```bash
npm run perf:audit  # Check Lighthouse SEO score ≥90
# Or manually: curl localhost:3000 | grep -i "og:"
```

**Effort:** 1 hour

---

### T5-005: Favicon & PWA Assets Verification

**Description:** Verify meta assets are configured correctly.

**Files:**
- `public/favicon.ico`
- `public/apple-touch-icon.png`
- `app/layout.tsx` (head configuration)

**Acceptance Criteria:**
- [ ] `favicon.ico` exists and renders in browser tab
- [ ] `apple-touch-icon.png` configured (180x180)
- [ ] `site.webmanifest` valid (if PWA features desired)

**Validation:**
```bash
ls -la public/favicon.ico public/apple-touch-icon.png
# Browser check: favicon visible
```

**Effort:** 30 minutes

---

## Sprint 6: Production Readiness

**Goal:** Deployment-ready with security, monitoring, and rollback plan.  
**Demo:** Successful Vercel deployment; PostHog shows live events.

---

### T6-001: Vercel Environment Audit

**Description:** Verify Vercel has all required environment variables.

**Files:**
- `.env.example` (reference)
- Vercel dashboard

**Acceptance Criteria:**
- [ ] All vars from `.env.example` present in Vercel
- [ ] Production vs Preview values documented
- [ ] Sensitive vars marked as secrets

**Validation:**
```bash
# Vercel CLI: vercel env ls
# Or dashboard check
npm run build  # Succeeds in Vercel
```

**Effort:** 30 minutes

---

### T6-002: Analytics Verification

**Description:** Verify PostHog/analytics tracking works end-to-end.

**Files:**
- `components/AnalyticsProvider.tsx`

**Acceptance Criteria:**
- [ ] Page views tracked on navigation
- [ ] CTA clicks tracked with event properties
- [ ] Protocol sequence views tracked
- [ ] No PII in tracked data

**Validation:**
```bash
# PostHog dashboard: verify events appear
# Browser console: check for tracking calls
```

**Effort:** 1 hour

---

### T6-003: Security Headers

**Description:** Add security headers to production deployment.

**Files:**
- `next.config.js` or `vercel.json`

**Acceptance Criteria:**
- [ ] `X-Frame-Options: DENY` (prevent clickjacking)
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- [ ] `Content-Security-Policy` configured (script-src, style-src)

**Validation:**
```bash
curl -I https://yardflow.com | grep -i "x-frame\|x-content\|referrer\|strict-transport"
# Or use securityheaders.com for full report
```

**Effort:** 2 hours (CSP requires testing)

---

### T6-004: Rate Limiting on API Routes

**Description:** Add rate limiting to prevent abuse on API routes.

**Files:**
- `app/api/*/route.ts`
- `middleware.ts` (if centralized)

**Acceptance Criteria:**
- [ ] Contact form: max 5 submissions per IP per minute
- [ ] PDF generation: max 10 per IP per hour
- [ ] Returns 429 Too Many Requests when exceeded
- [ ] Logged for monitoring

**Validation:**
```bash
# Loop submission test
for i in {1..10}; do curl -X POST localhost:3000/api/contact -d '{}'; done
# Expect 429 after threshold
```

**Effort:** 1.5 hours

---

### T6-005: Rollback Plan Documentation

**Description:** Document deployment rollback procedure.

**Files:**
- `docs/ROLLBACK_PLAN.md` (NEW)

**Acceptance Criteria:**
- [ ] Vercel rollback steps documented (UI + CLI)
- [ ] Contact list for incidents (on-call, stakeholders)
- [ ] Monitoring dashboard links
- [ ] Known failure scenarios and mitigations

**Validation:**
```bash
cat docs/ROLLBACK_PLAN.md
# Team review
```

**Effort:** 1 hour

---

### T6-006: Image Optimization Audit

**Description:** Verify all images use Next.js `<Image>` and have alt text.

**Files:**
- All `.tsx` files with `<img>` or `<Image>`

**Acceptance Criteria:**
- [ ] No raw `<img>` tags (use Next.js `Image`)
- [ ] All images have meaningful `alt` text
- [ ] Large images use `priority` for LCP
- [ ] WebP/AVIF formats served automatically

**Validation:**
```bash
grep -r "<img " --include="*.tsx" app/ components/ | wc -l
# Should be 0 (all should use <Image>)
```

**Effort:** 1 hour

---

### T6-007: Final Congruence & Launch Check

**Description:** Run full quality gates before launch.

**Files:**
- `scripts/congruence-check.ts`

**Acceptance Criteria:**
- [ ] `npm run congruence:check` passes
- [ ] `npm run predeploy` passes
- [ ] All E2E tests green on all browsers
- [ ] Lighthouse Performance ≥90, Accessibility ≥95

**Validation:**
```bash
npm run predeploy
npm run perf:audit
```

**Effort:** 1 hour

---

## Quick Reference

### Daily Commands

```bash
# Health check
npm run typecheck && npm run test:unit

# Full validation
npm run predeploy

# Visual check
npm run dev
```

### Sprint Start Checklist

- [ ] `git checkout main && git pull`
- [ ] `npm ci`
- [ ] `npm run typecheck`
- [ ] `npm run test:unit`
- [ ] Branch: `git checkout -b sprint-N-description`

### Sprint End Checklist

- [ ] All acceptance criteria met
- [ ] `npm run predeploy` passes
- [ ] PR created with screenshots/demo
- [ ] Squash merge to main

---

## Task Tracking Matrix

| ID | Task | Sprint | Status | Effort | Deps |
|----|------|--------|--------|--------|------|
| T3-001 | Lighthouse CI Verification | 3 | ⬜ Not Started | 1h | — |
| T3-002 | Bundle Baseline Docs | 3 | ⬜ Not Started | 0.5h | — |
| T3-003 | .env.example | 3 | ⬜ Not Started | 0.5h | — |
| T4-001 | app/error.tsx | 4 | ⬜ Not Started | 1h | — |
| T4-002 | app/global-error.tsx | 4 | ⬜ Not Started | 1h | — |
| T4-003 | app/loading.tsx | 4 | ⬜ Not Started | 1h | — |
| T4-004 | Keyboard Focus Audit | 4 | ⬜ Not Started | 1h | — |
| T4-005 | E2E Error Boundary Test | 4 | ⬜ Not Started | 1h | T4-001 |
| T5-001 | Brand Name Audit | 5 | ⬜ Not Started | 1h | — |
| T5-002 | CTA Hierarchy Docs | 5 | ⬜ Not Started | 1h | — |
| T5-003 | Dead Link Check | 5 | ⬜ Not Started | 1h | — |
| T5-004 | Meta & SEO Verification | 5 | ⬜ Not Started | 1h | — |
| T5-005 | Favicon & PWA Assets | 5 | ⬜ Not Started | 0.5h | — |
| T6-001 | Vercel Env Audit | 6 | ⬜ Not Started | 0.5h | T3-003 |
| T6-002 | Analytics Verification | 6 | ⬜ Not Started | 1h | — |
| T6-003 | Security Headers | 6 | ⬜ Not Started | 2h | — |
| T6-004 | Rate Limiting | 6 | ⬜ Not Started | 1.5h | — |
| T6-005 | Rollback Plan Docs | 6 | ⬜ Not Started | 1h | — |
| T6-006 | Image Optimization Audit | 6 | ⬜ Not Started | 1h | — |
| T6-007 | Final Launch Check | 6 | ⬜ Not Started | 1h | All |

---

## Appendix: Subagent Review Improvements

The following improvements from subagent review (7.5/10) were incorporated:

1. **Removed completed tasks:** T3-003 (cross-browser), T3-004 (visual regression), T4-001/T4-002 (axe scans), T4-005 (touch targets) — already exist in codebase

2. **Added loading.tsx:** T4-003 for Suspense boundaries (was missing)

3. **Enhanced security headers:** T6-003 now includes CSP, increased effort to 2h

4. **Added rate limiting:** T6-004 for API abuse prevention

5. **Added image optimization audit:** T6-006 to verify Next.js Image usage

6. **Moved .env.example to Sprint 3:** T3-003 as it's foundational

7. **Fixed validation commands:** Added server start/stop for site-crawl

8. **Added E2E error boundary test:** T4-005 to verify error pages work

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| V4 | Current | Incorporated subagent feedback, removed completed tasks |
| V3 | Prior | Initial 23-task plan |
| V2 | Prior | Sprint 1-2 execution |
| V1 | Prior | Project kickoff |

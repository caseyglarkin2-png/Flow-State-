# YardFlow Post-Production Sprint Plan V1

> **Created:** January 22, 2026  
> **Status:** Active  
> **Subagent Review:** 7.5/10 → Improvements Incorporated

---

## Executive Summary

This sprint plan covers post-production enhancements for the YardFlow website. The production site is live at https://flow-state-klbt.vercel.app/.

### Project State (Verified)

| Metric | Status |
|--------|--------|
| TypeScript | ✅ 0 errors |
| Unit Tests | ✅ 452 passing |
| Congruence Check | ✅ 22/22 passed |
| Production | ✅ Live on Vercel |

### Already Implemented (Removed from Plan)

The following items from POST_LAUNCH_ROADMAP.md are **already complete**:

| Item | Evidence |
|------|----------|
| Dynamic OG on ROI | `app/roi/layout.tsx` uses `/api/og` |
| Dynamic OG on Solutions | `app/solutions/[slug]/page.tsx` uses `/api/og?page=solutions/${slug}` |
| Dynamic OG on Guides | `app/resources/guides/[slug]/page.tsx` uses `/api/og?page=guide/${slug}` |
| OG Route Parameter Support | Route already accepts `page` param |
| Reduced Motion Hook | `lib/hooks/useReducedMotion.ts` exists with tests |
| Bundle Audit Script | `npm run audit:bundle` exists |

---

## Sprint Overview

| Sprint | Focus | Tasks | Effort | Demo |
|--------|-------|-------|--------|------|
| **Sprint 7** | Lead Capture & Sales | 4 | ~5h | Enhanced contact form, improved PDF exports |
| **Sprint 8** | Performance & CI | 5 | ~6h | Lighthouse CI in GitHub Actions, health endpoints |
| **Sprint 9** | Accessibility Polish | 5 | ~6h | Screen reader audit, focus improvements |
| **Sprint 10** | Documentation & Tooling | 5 | ~7h | Brand guidelines, OG preview tool |
| **Sprint 11** | Interactive Features | 5 | ~10h | Network map, shareable simulations |
| **Total** | | **24** | **~34h** | |

---

## Sprint 7: Lead Capture & Sales Enablement

**Goal:** Improve lead qualification and sales collateral.
**Demo:** Contact form captures qualification data, PDF exports are professional.
**Business Impact:** 🔥 HIGH - Direct revenue impact

---

### T7-001: Contact Form Qualification Fields

**Description:** Add qualification questions to contact form for lead scoring.

**Files:**
- `app/contact/page.tsx`
- Lead handling API if applicable

**Acceptance Criteria:**
- [ ] Company size dropdown (1-5, 6-20, 21-100, 100+)
- [ ] Number of facilities field (1-5, 6-20, 21-50, 50+)
- [ ] Current pain points (multi-select: "Manual check-in", "Detention costs", "No visibility", "Compliance", "Other")
- [ ] All fields validated before submit
- [ ] Data captured in lead submission

**Validation:**
```bash
# Submit test form, verify data in API response
npm run test:e2e -- e2e/contact-form.spec.ts
```

**Effort:** 2 hours

---

### T7-002: ROI Calculator PDF Enhancement

**Description:** Improve PDF export with detailed assumptions and professional formatting.

**Files:**
- `app/api/pdf/roi/route.ts`

**Acceptance Criteria:**
- [ ] PDF includes all input assumptions (facilities, adoption rate, etc.)
- [ ] Includes methodology summary section
- [ ] Professional YardFlow branding (logo, colors)
- [ ] Footer with contact info and date generated
- [ ] Export filename includes date: `yardflow-roi-2026-01-22.pdf`

**Validation:**
```bash
# Generate PDF via API, review formatting
curl http://localhost:3000/api/pdf/roi -d '{"facilities":50}' > test.pdf
```

**Effort:** 2 hours

---

### T7-003: Add UTM Parameters to Social Links

**Description:** Add tracking parameters to all outbound social links.

**Files:**
- `components/Footer.tsx`
- `app/press/page.tsx` (if applicable)

**Acceptance Criteria:**
- [ ] LinkedIn link: `?utm_source=yardflow&utm_medium=social&utm_campaign=footer`
- [ ] Twitter link: `?utm_source=yardflow&utm_medium=social&utm_campaign=footer`
- [ ] Email links: `?utm_source=yardflow&utm_medium=email`
- [ ] Analytics shows source attribution

**Validation:**
```bash
# Click link, verify UTM params in URL
grep "utm_source" components/Footer.tsx
```

**Effort:** 30 minutes

---

### T7-004: Lead Form E2E Test

**Description:** Add E2E test for contact form submission flow.

**Files:**
- `e2e/contact-form.spec.ts` (NEW)

**Acceptance Criteria:**
- [ ] Tests form validation (empty required fields)
- [ ] Tests successful submission flow
- [ ] Verifies thank you message
- [ ] Tests captcha handling (mock or bypass)

**Validation:**
```bash
npm run test:e2e -- e2e/contact-form.spec.ts
```

**Effort:** 1 hour

---

## Sprint 8: Performance & CI Integration

**Goal:** Establish automated performance monitoring and CI gates.
**Demo:** GitHub Action shows Lighthouse scores on PR, health endpoint works.
**Business Impact:** ⚡ MEDIUM - Prevents regression, protects SEO

---

### T8-001: GitHub Secrets for CI

**Description:** Configure GitHub Secrets for Lighthouse CI.

**Files:**
- Repository Settings > Secrets
- `.github/README.md` (document secrets)

**Acceptance Criteria:**
- [ ] `VERCEL_TOKEN` secret configured (if needed)
- [ ] Secrets documented in README
- [ ] CI can access secrets

**Validation:**
```bash
# List configured secrets (GitHub UI)
gh secret list
```

**Effort:** 30 minutes

---

### T8-002: Lighthouse CI GitHub Action

**Description:** Add GitHub Action to run Lighthouse on PR previews.

**Files:**
- `.github/workflows/lighthouse.yml` (NEW)

**Acceptance Criteria:**
- [ ] Runs on PR to main
- [ ] Waits for Vercel preview deployment
- [ ] Posts Lighthouse scores as PR comment
- [ ] Fails if Performance < 75 or Accessibility < 90
- [ ] Uploads HTML report as artifact

**Validation:**
```bash
# Open PR, see Lighthouse check run
# Check PR comment for scores
```

**Effort:** 2 hours

---

### T8-003: Bundle Size CI Check

**Description:** Add bundle size check to PR workflow.

**Files:**
- `.github/workflows/ci.yml` (update or create)

**Acceptance Criteria:**
- [ ] Runs `npm run audit:bundle` on every PR
- [ ] Fails if any category exceeds budget
- [ ] Comments bundle size comparison on PR

**Validation:**
```bash
# Push PR with large new dependency, verify failure
```

**Effort:** 1 hour

---

### T8-004: Health Check Endpoint

**Description:** Add `/api/health` endpoint for monitoring.

**Files:**
- `app/api/health/route.ts` (NEW)

**Acceptance Criteria:**
- [ ] Returns `{ status: "ok", timestamp: "...", version: "2.0.0" }`
- [ ] Returns 200 when healthy
- [ ] Unit test for response structure
- [ ] Can be polled by uptime monitoring (e.g., UptimeRobot)

**Validation:**
```bash
curl http://localhost:3000/api/health
# {"status":"ok","timestamp":"2026-01-22T00:00:00Z","version":"2.0.0"}
```

**Effort:** 30 minutes

---

### T8-005: Enhance Status Page

**Description:** Add real-time health indicators to status page.

**Files:**
- `app/status/page.tsx`

**Acceptance Criteria:**
- [ ] Shows API health status (calls `/api/health`)
- [ ] Shows "All Systems Operational" or degraded state
- [ ] Shows last updated timestamp
- [ ] Links to incident history (placeholder OK)

**Validation:**
```bash
# Visit /status, see live health indicators
npm run dev
# Open http://localhost:3000/status
```

**Effort:** 1.5 hours

---

## Sprint 9: Accessibility Polish

**Goal:** WCAG AAA readiness on key pages, enhanced screen reader support.
**Demo:** Screen reader walkthrough of homepage with documented audit.
**Business Impact:** ⚡ MEDIUM - Accessibility compliance, broader reach

---

### T9-001: Screen Reader Audit

**Description:** Manual audit with VoiceOver/NVDA, document findings.

**Files:**
- `docs/SCREEN_READER_AUDIT.md` (NEW)

**Acceptance Criteria:**
- [ ] Audit document created with test methodology
- [ ] Homepage tested with VoiceOver (Mac) or NVDA (Windows)
- [ ] ROI page tested
- [ ] Contact page tested
- [ ] Issues categorized: Critical, Major, Minor
- [ ] Each issue has remediation recommendation

**Validation:**
```bash
cat docs/SCREEN_READER_AUDIT.md
# Document exists with structured findings
```

**Effort:** 1.5 hours

---

### T9-002: Screen Reader Issue Remediation

**Description:** Fix critical issues identified in T9-001 (timeboxed).

**Files:**
- Components as identified in audit

**Acceptance Criteria:**
- [ ] All Critical issues fixed
- [ ] All Major issues fixed OR documented for future sprint
- [ ] Fixes verified with screen reader
- [ ] Audit document updated with "Resolved" status

**Validation:**
```bash
# Re-test with screen reader
npm run typecheck  # No TS errors from fixes
```

**Effort:** 2 hours (timeboxed)

---

### T9-003: Enhanced Skip Navigation

**Description:** Add page-specific skip links for long pages.

**Files:**
- `app/roi/page.tsx` (add skip target)
- `app/contact/page.tsx` (add skip target)
- `lib/a11y/components.tsx` (if modification needed)

**Acceptance Criteria:**
- [ ] ROI page: "Skip to calculator" link
- [ ] Contact page: "Skip to contact form" link
- [ ] Focus moves to target on activation
- [ ] Works with keyboard navigation

**Validation:**
```bash
# Tab through page, activate skip link, verify focus
npm run test:e2e -- e2e/accessibility.spec.ts
```

**Effort:** 1 hour

---

### T9-004: Verify Reduced Motion Coverage

**Description:** Audit all Framer Motion animations for reduced-motion support.

**Files:**
- All components using `motion.*`
- `docs/REDUCED_MOTION_AUDIT.md` (NEW)

**Acceptance Criteria:**
- [ ] All animation components checked
- [ ] All use `useReducedMotion` hook OR `prefers-reduced-motion` media query
- [ ] Static fallbacks render correctly
- [ ] Document created listing coverage

**Validation:**
```bash
# Set OS to reduced motion, test all pages
npm run test:e2e -- e2e/accessibility.spec.ts
```

**Effort:** 1 hour

---

### T9-005: High Contrast Mode Support

**Description:** Add CSS for Windows High Contrast mode.

**Files:**
- `styles/globals.css` (add media query section)

**Acceptance Criteria:**
- [ ] `@media (forced-colors: active)` styles added
- [ ] Buttons have visible borders in high contrast
- [ ] Links distinguishable from text
- [ ] Focus indicators visible

**Validation:**
```bash
# Enable Windows High Contrast Mode
# Or use browser DevTools forced-colors emulation
```

**Effort:** 1 hour

---

## Sprint 10: Documentation & Tooling

**Goal:** Complete internal documentation and developer tooling.
**Demo:** OG preview tool works, brand guidelines document complete.
**Business Impact:** 📚 LOW - Operational efficiency, onboarding

---

### T10-001: Brand Guidelines Document

**Description:** Document brand system for team reference.

**Files:**
- `docs/BRAND_GUIDELINES.md` (NEW)

**Acceptance Criteria:**
- [ ] Logo usage (variants, minimum sizes, clearspace)
- [ ] Color palette (neon, void, steel, carbon, ember with hex codes)
- [ ] Typography (Inter, JetBrains Mono, weights, sizes)
- [ ] Messaging (tagline, value props, headlines)
- [ ] Voice & tone guidelines
- [ ] Do's and Don'ts with examples

**Validation:**
```bash
cat docs/BRAND_GUIDELINES.md
# Comprehensive brand documentation
```

**Effort:** 1.5 hours

---

### T10-002: OG Preview Tool

**Description:** Internal page for debugging OG images.

**Files:**
- `app/og-preview/page.tsx` (NEW)

**Acceptance Criteria:**
- [ ] Shows current OG image for any route
- [ ] Input field to test different paths
- [ ] Displays metadata JSON
- [ ] Shows image dimensions
- [ ] Links to external validators (Facebook, Twitter, LinkedIn)

**Validation:**
```bash
npm run dev
# Visit http://localhost:3000/og-preview
# Test with /roi, /solutions/dry-van, etc.
```

**Effort:** 2 hours

---

### T10-003: Update Developer README

**Description:** Enhance README with comprehensive development workflow.

**Files:**
- `README.md`

**Acceptance Criteria:**
- [ ] Quick start (3-step setup)
- [ ] All npm scripts documented
- [ ] Testing commands documented
- [ ] Deployment process documented
- [ ] Architecture overview (directory structure)
- [ ] Troubleshooting common issues

**Validation:**
```bash
# New developer can onboard using only README
```

**Effort:** 1 hour

---

### T10-004: Create CONTRIBUTING.md

**Description:** Document contribution guidelines for collaborators.

**Files:**
- `CONTRIBUTING.md` (NEW)

**Acceptance Criteria:**
- [ ] PR process documented (branching strategy)
- [ ] Code style guidelines (TypeScript, React conventions)
- [ ] Testing requirements (unit tests required, E2E for UI changes)
- [ ] Review process (who reviews, SLA)
- [ ] Commit message format

**Validation:**
```bash
cat CONTRIBUTING.md
# Clear contribution process documented
```

**Effort:** 1 hour

---

### T10-005: Content Audit Script

**Description:** Create script to audit all page content for consistency.

**Files:**
- `scripts/content-audit.ts` (NEW)

**Acceptance Criteria:**
- [ ] Checks all pages in `app/` for metadata
- [ ] Verifies each page has title and description
- [ ] Flags missing OG images
- [ ] Verifies CTA presence on key pages
- [ ] Outputs JSON report to `test-results/content-audit.json`

**Validation:**
```bash
npx tsx scripts/content-audit.ts
cat test-results/content-audit.json
```

**Effort:** 2 hours

---

## Sprint 11: Interactive Features

**Goal:** Enhanced interactive demos and visualization.
**Demo:** Network map shows multi-facility view, simulations are shareable.
**Business Impact:** 🌟 MEDIUM - Demo quality for enterprise prospects

---

### T11-001: YardBuilder AI Enhancement

**Description:** Improve AI yard configuration suggestions.

**Files:**
- `src/components/yardbuilder/YardBuilderAI.tsx`

**Acceptance Criteria:**
- [ ] AI generates recommendations based on input metrics
- [ ] Shows reasoning for each recommendation
- [ ] Recommendations update as inputs change
- [ ] Export configuration as JSON button

**Validation:**
```bash
npm run dev
# Configure yard in YardBuilder, see AI suggestions
```

**Effort:** 2.5 hours

---

### T11-002: Shareable Simulation Results

**Description:** Add ability to share simulation outcomes via URL.

**Files:**
- `app/simulations/page.tsx`
- `lib/simulation-state.ts` (if needed)

**Acceptance Criteria:**
- [ ] Simulation state encoded in URL search params
- [ ] "Copy Link" button copies shareable URL
- [ ] Opening shared link restores exact simulation state
- [ ] Works with browser back/forward buttons

**Validation:**
```bash
# Run simulation, copy link, open in new tab
# Verify same state loads
npm run test:e2e -- e2e/simulations.spec.ts
```

**Effort:** 2 hours

---

### T11-003: Simulation Sharing E2E Test

**Description:** Add E2E test for simulation URL sharing.

**Files:**
- `e2e/simulations.spec.ts` (NEW or update)

**Acceptance Criteria:**
- [ ] Test sets simulation state
- [ ] Copies URL to clipboard (mock)
- [ ] Navigates to URL
- [ ] Verifies state restored correctly

**Validation:**
```bash
npm run test:e2e -- e2e/simulations.spec.ts
```

**Effort:** 1 hour

---

### T11-004: Network Map Component - Base

**Description:** Create base NetworkMap component with static nodes.

**Files:**
- `components/NetworkMap.tsx` (NEW)
- `components/NetworkMap.test.tsx` (NEW)

**Acceptance Criteria:**
- [ ] Renders facility nodes as circles
- [ ] Accepts array of facilities as prop
- [ ] SVG-based for scalability
- [ ] Unit tests for render and props
- [ ] Responsive container

**Validation:**
```bash
npm run test:unit -- components/NetworkMap.test.tsx
```

**Effort:** 2 hours

---

### T11-005: Network Map - Interactive & Integration

**Description:** Add interactivity and integrate into pages.

**Files:**
- `components/NetworkMap.tsx` (update)
- `app/network-effect/page.tsx` (integrate)

**Acceptance Criteria:**
- [ ] Hover on node shows facility details tooltip
- [ ] Connections drawn between facilities
- [ ] Connection opacity reflects network effect strength
- [ ] Integrated on Network Effect page
- [ ] Works on mobile (touch hover)

**Validation:**
```bash
npm run dev
# Visit /network-effect, interact with map
```

**Effort:** 2.5 hours

---

## Quick Reference

### Daily Commands

```bash
# Development
npm run dev

# Health check
npm run typecheck && npm run test:unit

# Full validation
npm run predeploy

# Bundle check
npm run audit:bundle
```

### Sprint Start Checklist

- [ ] `git checkout main && git pull`
- [ ] `npm ci`
- [ ] `npm run typecheck` passes
- [ ] `npm run test:unit` passes
- [ ] Create branch: `git checkout -b sprint-N-description`

### Sprint End Checklist

- [ ] All acceptance criteria met
- [ ] `npm run predeploy` passes
- [ ] PR created with screenshots/demo
- [ ] Squash merge to main
- [ ] Verify Vercel deployment

---

## Task Tracking Matrix

| ID | Task | Sprint | Status | Effort | Deps |
|----|------|--------|--------|--------|------|
| T7-001 | Contact Form Qualification | 7 | ⬜ | 2h | — |
| T7-002 | ROI PDF Enhancement | 7 | ⬜ | 2h | — |
| T7-003 | UTM Parameters | 7 | ⬜ | 0.5h | — |
| T7-004 | Contact Form E2E Test | 7 | ⬜ | 1h | T7-001 |
| T8-001 | GitHub Secrets for CI | 8 | ⬜ | 0.5h | — |
| T8-002 | Lighthouse CI Action | 8 | ⬜ | 2h | T8-001 |
| T8-003 | Bundle Size CI Check | 8 | ⬜ | 1h | — |
| T8-004 | Health Check Endpoint | 8 | ⬜ | 0.5h | — |
| T8-005 | Enhance Status Page | 8 | ⬜ | 1.5h | T8-004 |
| T9-001 | Screen Reader Audit | 9 | ⬜ | 1.5h | — |
| T9-002 | Screen Reader Remediation | 9 | ⬜ | 2h | T9-001 |
| T9-003 | Enhanced Skip Navigation | 9 | ⬜ | 1h | — |
| T9-004 | Reduced Motion Audit | 9 | ⬜ | 1h | — |
| T9-005 | High Contrast Mode | 9 | ⬜ | 1h | — |
| T10-001 | Brand Guidelines Doc | 10 | ⬜ | 1.5h | — |
| T10-002 | OG Preview Tool | 10 | ⬜ | 2h | — |
| T10-003 | Update README | 10 | ⬜ | 1h | — |
| T10-004 | CONTRIBUTING.md | 10 | ⬜ | 1h | — |
| T10-005 | Content Audit Script | 10 | ⬜ | 2h | — |
| T11-001 | YardBuilder AI | 11 | ⬜ | 2.5h | — |
| T11-002 | Shareable Simulations | 11 | ⬜ | 2h | — |
| T11-003 | Simulation E2E Test | 11 | ⬜ | 1h | T11-002 |
| T11-004 | NetworkMap Base | 11 | ⬜ | 2h | — |
| T11-005 | NetworkMap Interactive | 11 | ⬜ | 2.5h | T11-004 |

---

## Subagent Review Improvements Incorporated

1. **Removed duplicate tasks:** T7-001-T7-004 from original plan (OG images already implemented)
2. **Reordered for value:** Lead capture and sales enablement now first (Sprint 7)
3. **Split large tasks:** Screen reader audit into audit + remediation
4. **Split NetworkMap:** Base component + interactive features
5. **Added missing tests:** Contact form E2E, simulation sharing E2E
6. **Added CI prereq:** GitHub Secrets configuration before Lighthouse CI
7. **Timeboxed remediation:** T9-002 has 2-hour timebox to prevent scope creep

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| V1 | 2026-01-22 | Initial post-production sprint plan |

# YardFlow Post-Launch Optimization Roadmap

## Overview
This document outlines the post-launch improvement plan for YardFlow, organized into atomic, testable sprints.

**Status**: All Phase 1 priorities complete ✅  
**Current Phase**: Phase 2 - Engineering Excellence  
**Last Updated**: January 2026

---

## Phase 1: Launch Optimizations (COMPLETE ✅)

All original priorities have been completed:

| Priority | Task | Status |
|----------|------|--------|
| 1 | Update page OG refs | ✅ Done |
| 2 | Page-specific OG images | ✅ Done |
| 3 | Image optimization | ✅ Done |
| 4 | Social analytics | ✅ Done |
| 5 | OG preview tool | ✅ Done |
| 6 | Brand guidelines | ✅ Done |
| 7 | A/B test headlines | ✅ Done |
| 8 | Email optimization | ✅ Done |

---

## Phase 2: Engineering Excellence

### Sprint Dependency Map

```
Sprint Dependencies:
  S6 (Tests) ──────────┐
                       ├──→ S10 (Analytics) ──→ S12 (SEO)
  S7 (Storybook) ──────┤
                       │
  S8 (Performance) ────┼──→ S11 (Mobile)
                       │
  S9 (A11y) ───────────┘

Parallel tracks possible:
  Track A: S6 + S7 (can overlap)
  Track B: S8 alone (bundle analysis blocks mobile work)
  Track C: S9 alone (a11y is independent)
```

### Recommended Order (by business impact):
1. **S8 (Performance)** — directly affects SEO, conversions
2. **S9 (A11y)** — compliance risk, user experience
3. **S10 (Analytics)** — can't optimize what you can't measure
4. **S6 (Tests)** — prevents regressions
5. **S11 (Mobile)** — depends on S8 performance work
6. **S12 (SEO)** — depends on S10 analytics data
7. **S7 (Storybook)** — nice-to-have, can run parallel

---

## SPRINT 6: Component Testing Foundation

**Goal:** Add unit tests for 15 critical UI components  
**Demoable:** Test dashboard showing coverage increase (baseline → +15%)  
**Effort:** 3-4 days  
**Risk:** Low  
**Dependencies:** None

### Prerequisites
- [ ] T6-000: Install coverage deps (`@vitest/coverage-v8`)
- [ ] T6-000b: Run baseline coverage, document actual percentage

### Tasks

| ID | Task | Validation |
|----|------|------------|
| T6-001 | Add tests for `Button` (variants, states, disabled, loading) | `npm test Button.test.tsx` passes |
| T6-002 | Add tests for `Card` (renders, variants, className merge) | `npm test Card.test.tsx` passes |
| T6-003 | Add tests for `Disclosure` (expand/collapse, a11y, keyboard) | `npm test Disclosure.test.tsx` passes |
| T6-004 | Add tests for `Header` (nav links, mobile menu toggle, dropdowns) | `npm test Header.test.tsx` passes |
| T6-005 | Add tests for `Footer` (links render, social icons, navigation) | `npm test Footer.test.tsx` passes |
| T6-006 | Add tests for `LeadForm` (validation, submission, error states) | `npm test LeadForm.test.tsx` passes |
| T6-007 | Add tests for `DiagnosticCalculator` (inputs, calculations, export) | `npm test DiagnosticCalculator.test.tsx` passes |
| T6-008 | Add tests for `FacilityCountSlider` (range, labels, callbacks) | `npm test FacilityCountSlider.test.tsx` passes |
| T6-009 | Add tests for `ModuleCard` (render, variants, links, icons) | `npm test ModuleCard.test.tsx` passes |
| T6-010 | Add tests for `CTAGroup` (render, click handlers, variants) | `npm test CTAGroup.test.tsx` passes |
| T6-011 | Add tests for `PersonaRouter` (routing logic, icon rendering) | `npm test PersonaRouter.test.tsx` passes |
| T6-012 | Review existing `NetworkMap.test.tsx`, ensure coverage | Test passes, no gaps |

### Sprint Exit Criteria
- [ ] `npm run test -- --coverage` shows >75% component coverage
- [ ] 0 failing tests
- [ ] Coverage badge added to README
- [ ] All new test files follow existing patterns

---

## SPRINT 7: Storybook Integration

**Goal:** Set up Storybook for component documentation  
**Demoable:** Storybook running locally with 20+ component stories  
**Effort:** 4-5 days  
**Risk:** Medium  
**Dependencies:** S6 partial (tests help validate stories)

### Tasks

| ID | Task | Validation |
|----|------|------------|
| T7-001 | Initialize Storybook (`npx storybook@latest init`) | `npm run storybook` serves |
| T7-002 | Configure theme (void/carbon bg, brand colors, Inter font) | Theme matches site |
| T7-003 | Add `@storybook/addon-a11y` for live a11y checks | Addon panel shows |
| T7-004 | Add `@storybook/addon-viewport` for responsive testing | Mobile/tablet viewports work |
| T7-005 | Add stories for `FlowIcons` (catalog of all 50+ icons) | All icons render |
| T7-006 | Add stories for `ProtocolIcons` (Guard, Comms, BOL, YMS) | 4 icons with animation states |
| T7-007 | Add stories for `Button` (all variants, sizes, states) | Interactive controls work |
| T7-008 | Add stories for `Card` (variants, content patterns) | Variants documented |
| T7-009 | Add stories for `Header`/`Footer` (responsive breakpoints) | Mobile/desktop modes |
| T7-010 | Add stories for `LeadForm` (empty, filled, error, success) | Form states demo |
| T7-011 | Add stories for `Disclosure`/`Accordion` (open, closed, nested) | Interaction works |
| T7-012 | Add autodocs for component prop tables | Props auto-documented |
| T7-013 | Add MDX documentation for complex components | Usage docs exist |
| T7-014 | Add Playwright visual tests for Storybook (using existing setup) | Visual baseline captured |

### Sprint Exit Criteria
- [ ] `npm run storybook` serves without errors
- [ ] 20+ stories render correctly
- [ ] a11y addon shows 0 violations
- [ ] CI job added for Storybook build
- [ ] Visual regression baseline captured

---

## SPRINT 8: Performance Optimization

**Goal:** Reduce initial bundle size by 30%, improve LCP  
**Demoable:** Lighthouse score improvement (before/after screenshots)  
**Effort:** 5-7 days  
**Risk:** High (breaking changes possible)  
**Dependencies:** None (but blocks S11)

### Prerequisites
- [ ] T8-000: Install `@next/bundle-analyzer`
- [ ] T8-001: **BLOCKER** Run bundle analyzer, document chunk composition

### Heavy Dependencies Identified
Based on package.json analysis:
- `@react-three/fiber` - 3D components
- `@react-pdf/renderer` - PDF export
- `recharts` - Charts in ROI calculator
- `maplibre-gl` + `deck.gl` - Map components
- `framer-motion` - Animations (likely in 946K chunk)

### Tasks

| ID | Task | Validation |
|----|------|------------|
| T8-001 | Analyze 946K chunk, identify composition | Report written |
| T8-002 | Dynamic import `deck.gl` + `maplibre-gl` | NetworkMap lazy loads |
| T8-003 | Dynamic import `@react-pdf/renderer` | PDF export lazy loads |
| T8-004 | Dynamic import `@react-three/fiber` if used | 3D components lazy load |
| T8-005 | Code-split `recharts` in ROI calculator | Charts lazy load |
| T8-006 | Code-split `DiagnosticCalculator` component | Heavy component lazy loads |
| T8-007 | Lazy-load below-fold sections on homepage | Intersection observer |
| T8-008 | Tree-shake unused FlowIcons exports | Bundle size reduced |
| T8-009 | Convert remaining PNGs to WebP via `next/image` | All images optimized |
| T8-010 | Add preload hints for Inter font | Font LCP improved |
| T8-011 | Add bundle analyzer to CI pipeline | Size regression alerts |
| T8-012 | Document LCP/FID/CLS improvements | Metrics logged |

### Sprint Exit Criteria
- [ ] Lighthouse Performance score >90
- [ ] Main chunk <500KB (down from 946KB)
- [ ] LCP <2.5s on 3G throttle
- [ ] Bundle analyzer in CI
- [ ] Before/after comparison documented

---

## SPRINT 9: Accessibility Audit + Fixes

**Goal:** WCAG 2.1 AA compliance across all pages  
**Demoable:** axe-core report showing 0 critical/serious issues  
**Effort:** 3-4 days  
**Risk:** Medium  
**Dependencies:** None

### Existing A11y Infrastructure
- ✅ `e2e/accessibility.spec.ts` exists with axe-core
- ✅ Good aria-label coverage in major components
- ⚠️ Skip-to-content link missing
- ⚠️ Focus trap not verified in modals

### Tasks

| ID | Task | Validation |
|----|------|------------|
| T9-001 | Extend axe-core e2e coverage to all routes | All routes pass a11y spec |
| T9-002 | Add skip-to-content link to `app/layout.tsx` | Tab shows skip link |
| T9-003 | Fix focus management in Header mobile menu | Focus trapped in menu |
| T9-004 | Audit color contrast ratios (steel on void) | Contrast checker passes |
| T9-005 | Add aria-labels to all interactive FlowIcons | Screen reader announces |
| T9-006 | Fix keyboard navigation in Disclosure | Enter/Space toggle |
| T9-007 | Add ARIA live regions for form feedback | Errors announced |
| T9-008 | Add focus trap to Dialog/modal components | Focus locked in modal |
| T9-009 | Create heading hierarchy audit script | H1→H2→H3 verified |
| T9-010 | Test with reduced-motion preference | Animations respect preference |
| T9-011 | Add `eslint-plugin-jsx-a11y` to lint config | Linting catches issues |
| T9-012 | Manual test with VoiceOver, document findings | Test report written |
| T9-013 | Manual test with NVDA, document findings | Test report written |

### Sprint Exit Criteria
- [ ] 0 critical/serious axe violations
- [ ] Keyboard-only navigation works on all pages
- [ ] Screen reader testing documented
- [ ] a11y linting in CI
- [ ] Skip-to-content visible on Tab

---

## SPRINT 10: Analytics + Observability

**Goal:** Full funnel analytics with event tracking  
**Demoable:** Analytics dashboard showing user journey through site  
**Effort:** 3-4 days  
**Risk:** Low  
**Dependencies:** None

### Existing Analytics Infrastructure
- ✅ `lib/analytics.ts` with PostHog/Plausible support
- ✅ `AnalyticsProvider.tsx` component
- ✅ Sentry error tracking configured
- ⚠️ Event coverage incomplete

### Tasks

| ID | Task | Validation |
|----|------|------------|
| T10-001 | Audit `lib/analytics.ts` methods vs actual usage | Gap report written |
| T10-002 | Add `page_view` to AnalyticsProvider | Console shows events |
| T10-003 | Track all CTA clicks with destination context | Events fire |
| T10-004 | Track form field interactions (partial fills) | Engagement tracked |
| T10-005 | Track LeadForm submission success/failure | Conversion tracked |
| T10-006 | Track ROI calculator interactions | Input changes tracked |
| T10-007 | Track DiagnosticCalculator completions | Funnel tracked |
| T10-008 | Add scroll depth tracking on long pages | 25/50/75/100% events |
| T10-009 | Verify Sentry Web Vitals reporting | Vitals in Sentry |
| T10-010 | Document analytics schema, add TypeScript types | Types exported |
| T10-011 | Add analytics event to E2E tests | Events verified |

### Sprint Exit Criteria
- [ ] All 10 event types firing correctly
- [ ] Dashboard screenshot captured
- [ ] TypeScript types for all events
- [ ] E2E test validates key events
- [ ] Analytics documentation written

---

## SPRINT 11: Mobile Experience Enhancement

**Goal:** Native-like mobile experience with improved touch interactions  
**Demoable:** Mobile prototype video showing smooth interactions  
**Effort:** 4-5 days  
**Risk:** Medium  
**Dependencies:** S8 (Performance)

### Tasks

| ID | Task | Validation |
|----|------|------------|
| T11-001 | Audit mobile Lighthouse scores per page | Baseline documented |
| T11-002 | Improve Header mobile menu animation (spring physics) | Smooth animation |
| T11-003 | Add swipe gestures to Disclosure components | Swipe opens/closes |
| T11-004 | Audit touch targets (min 44x44px per WCAG) | All targets pass |
| T11-005 | Improve form input sizing for mobile | Inputs 16px+ font |
| T11-006 | Fix 100vh issues with dvh/svh units | Full height correct |
| T11-007 | Test landscape orientation on key forms | Forms usable |
| T11-008 | Test on real iOS device (Safari) | No issues |
| T11-009 | Test on real Android device (Chrome) | No issues |
| T11-010 | Fix any horizontal scroll issues | No overflow |
| T11-011 | Optimize images for mobile viewport | Responsive images |

### Sprint Exit Criteria
- [ ] Mobile Lighthouse score >85 on all key pages
- [ ] No horizontal overflow on any page
- [ ] Touch targets all ≥44x44px
- [ ] Real device testing documented
- [ ] Mobile demo video recorded

---

## SPRINT 12: SEO + Content Optimization

**Goal:** Improve search rankings and content discoverability  
**Demoable:** Search console showing increased impressions  
**Effort:** 2-3 days  
**Risk:** Low  
**Dependencies:** S10 (Analytics) partial

### Existing SEO Infrastructure
- ✅ `app/robots.ts` and `app/sitemap.ts` exist
- ✅ Structured data in root layout
- ⚠️ Solution/Guide pages need specific schemas

### Tasks

| ID | Task | Validation |
|----|------|------------|
| T12-001 | Verify robots.txt and sitemap.xml generation | Files serve correctly |
| T12-002 | Add Product schema to all solution pages | Rich Results Test passes |
| T12-003 | Add Article schema to guide pages | Rich Results Test passes |
| T12-004 | Add FAQ schema to FAQ page | Rich Results Test passes |
| T12-005 | Optimize meta descriptions for CTR | 150-160 chars, action-oriented |
| T12-006 | Verify canonical URLs on all pages | No duplicates |
| T12-007 | Optimize heading hierarchy (h1→h2→h3) | Audit script passes |
| T12-008 | Add internal linking between related pages | Links added |
| T12-009 | Submit sitemap to Google Search Console | Sitemap accepted |
| T12-010 | Monitor indexing status | All pages indexed |

### Sprint Exit Criteria
- [ ] 0 errors in Google Search Console
- [ ] All pages indexed
- [ ] Structured data validated via Rich Results Test
- [ ] Internal linking strategy documented
- [ ] Before/after impressions documented

---

## Phase 3: Future Enhancements (Backlog)

### Technical Debt Sprint (Optional)
- Remove backup page files (`page-old-backup.tsx`, etc.)
- Consolidate duplicate component patterns
- Update deprecated APIs
- Clean up unused exports

### Security Hardening Sprint (Recommended)
- Dependency vulnerability scan (`npm audit`)
- CSP header configuration
- Rate limiting on API routes
- Input sanitization audit for LeadForm

### Documentation Sprint (Optional)
- Architecture decision records (ADRs)
- Component hierarchy documentation
- API route documentation
- Onboarding guide for new devs

### Internationalization Sprint (Future)
- i18n framework setup
- String extraction
- RTL support
- hreflang implementation

---

## Quick Reference Card

| Sprint | Est. Days | Risk | Dependencies | Business Impact |
|--------|-----------|------|--------------|-----------------|
| S8 Performance | 5-7 | High | None | 🔥 Critical |
| S9 A11y | 3-4 | Medium | None | 🔥 Critical |
| S10 Analytics | 3-4 | Low | None | High |
| S6 Tests | 3-4 | Low | None | Medium |
| S11 Mobile | 4-5 | Medium | S8 | High |
| S12 SEO | 2-3 | Low | S10 | High |
| S7 Storybook | 4-5 | Medium | S6 | Low |

**Total Estimated Effort:** 25-34 days

---

## Completed Sprints Log

| Sprint | Date | Commit | Summary |
|--------|------|--------|---------|
| S1 | Jan 2026 | `sprint-1b-complete` | Icon inventory + redesign |
| S2 | Jan 2026 | `sprint-2-video-optimization` | Video optimization (98% size reduction) |
| S3 | Jan 2026 | `sprint-3-animation-refactor` | Animation refactor + viewport pause |
| S4 | Jan 2026 | `sprint-4-visual-audit` | Visual consistency audit |
| S5 | Jan 2026 | `sprint-5-icon-migration` | Complete lucide→FlowIcons migration |

---

**Document Status**: ✅ Phase 2 Ready  
**Owner**: Development Team  
**Last Updated**: January 2026
    <div>
      <h1>OpenGraph Preview Tool</h1>
      
      {/* Show /api/og image */}
      <img src="/api/og" alt="OG Preview" />
      
      {/* Show metadata from root layout */}
      <pre>{JSON.stringify(SITE_METADATA, null, 2)}</pre>
      
      {/* Test different routes */}
      <input 
        placeholder="Enter route to test (e.g., /roi, /solutions/dry-van)"
        onChange={(e) => setTestRoute(e.target.value)}
      />
      
      {/* Show preview for different platforms */}
      <FacebookPreview />
      <LinkedInPreview />
      <TwitterPreview />
    </div>
  );
}
```

### Why
- Debug OG issues without external tools
- Internal reference for branding compliance
- Test new pages before launch

### Effort
1-2 hours (component build)

### Impact
LOW - Helpful for development, not user-facing

---

## Priority 6: Brand Guideline Documentation

### Current State
- Branding system in code ✅
- No formal documentation

### Improvement
Create `/docs/BRAND_GUIDELINES.md`:

```markdown
# YardFlow Brand Guidelines

## Logo
- Primary variant: flow_v2 (Industrial Fluidity)
- Minimum size: 20px (uses flow_micro auto-switch)
- Max size: unlimited
- Usage: See `/components/BrandLogo.tsx`

## Colors
- Neon: #00B4FF (primary accent)
- Void: #050505 (background)
- Steel: #94A3B8 (secondary text)
- Carbon: ... (neutrals)

## Typography
- Body: Inter (400, 500, 600)
- Headline: Inter (700, 900)
- Mono: JetBrains Mono

## Messaging
- Tagline: "Industrial Fluidity"
- Value Prop: "Stop the Variance Tax"
- Headline: "You don't have 50 yards. You have one yard network."

## Metadata
See `/lib/branding.ts` for SITE_METADATA structure
```

### Why
- Clear reference for team members
- Onboarding new developers
- Marketing/design consistency
- Future contractor guidelines

### Effort
1 hour (documentation)

### Impact
LOW - Operational efficiency

---

## Priority 7: A/B Testing OG Headlines

### Current State
- Single headline: "Variance Is The Villain. Control Is The Hero."

### Improvement
Test different headlines for social engagement:

**Option A** (Current):
"Variance Is The Villain. Control Is The Hero."

**Option B**:
"Stop the Variance Tax. Build Your Yard Network."

**Option C**:
"50% Faster Turns. Network Effect Scaling."

### Implementation
Create `/api/og-test` route that accepts `variant` parameter:

```bash
# Test headlines with Vercel A/B split testing
/api/og?variant=a  # Variance Is The Villain...
/api/og?variant=b  # Stop the Variance Tax...
/api/og?variant=c  # 50% Faster Turns...
```

### Why
- Data-driven messaging optimization
- Maximize social engagement
- Test before committing to permanent copy

### Effort
2-3 hours (route param logic + testing framework)

### Impact
HIGH - Could improve CTR by 10-30%

---

## Priority 8: Rich Preview for Email

### Current State
- No email-specific metadata

### Improvement
Add `<style>` block to emails linking to YardFlow:

```html
<a href="https://yardflow.ai?utm_source=email&utm_medium=text"
   title="YardFlow - Industrial Fluidity">
  YardFlow - Stop the Variance Tax
</a>
```

Email clients (Gmail, Outlook) use OpenGraph metadata from target URL to show preview.

### Why
- Better email preview in inbox
- Increases click-through from emails
- Gmail shows OG image preview

### Effort
0 hours (auto works with current setup)

### Impact
MEDIUM - Improves email marketing ROI

---

## Recommended Timeline

### Week 1 Post-Launch (High Priority)
- [x] Priority 1: Update 4 page-specific OG references ✅ Sprint 18
- [x] Priority 6: Draft brand guidelines doc ✅ Already exists

### Week 2-3 Post-Launch (Medium Priority)
- [x] Priority 2: Implement page-specific OG images ✅ Sprints 19-22
- [x] Priority 4: Add UTM params to social links ✅ Already implemented
- [x] Priority 3: Image optimization audit ✅ Sprint 25 (video preload)

### Month 2 Post-Launch (Nice-to-Have)
- [x] Priority 5: OG preview debugging tool ✅ Already exists at /og-preview
- [x] Priority 7: A/B test headlines ✅ OG route supports ?variant=a|b|c
- [x] Polish: Email-specific optimizations ✅ Auto-works with OG setup

---

## Effort Summary

| Priority | Task | Effort | Impact | Status |
|----------|------|--------|--------|--------|
| 1 | Update page OG refs | 15 min | LOW | ✅ Done |
| 2 | Page-specific OG images | 3-4 hrs | HIGH | ✅ Done |
| 3 | Image optimization | 2-3 hrs | MEDIUM | ✅ Done |
| 4 | Social analytics | 1 hour | MEDIUM | ✅ Done |
| 5 | OG preview tool | 1-2 hrs | LOW | ✅ Done |
| 6 | Brand guidelines | 1 hour | LOW | ✅ Done |
| 7 | A/B test headlines | 2-3 hrs | HIGH | ✅ Done |
| 8 | Email optimization | 0 hrs | MEDIUM | ✅ Done |

**All priorities completed!** 🎉

---

## Notes for Development Team

- All improvements build on current `lib/branding.ts` foundation ✓
- OG route `/app/api/og/route.tsx` already flexible for variants ✓
- No breaking changes required to current system ✓
- Can be implemented incrementally without redeployment ✓

---

**Document Status**: ✅ All priorities complete  
**Owner**: Development Team  
**Last Updated**: January 2026

# OG Image & Social Sharing Sprint Plan

## Executive Summary

This document outlines the sprint execution for implementing page-specific OpenGraph images and social sharing improvements for the YardFlow website, as specified in `POST_LAUNCH_ROADMAP.md`.

**Status**: ✅ Priorities 1-7 COMPLETE  
**Remaining**: Priority 3 (Image Optimization) - DEPRIORITIZED  
**Total Sprints Executed**: 4 (Sprints 18-21)  
**Total Commits**: 4

---

## Priority Status Summary

| Priority | Description | Status | Sprint |
|----------|-------------|--------|--------|
| 1 | Dynamic OG refs (→ /api/og) | ✅ Complete | Sprint 18 |
| 2 | Page-specific OG images | ✅ Complete | Sprint 19, 20 |
| 3 | Image optimization | ⏸️ Deprioritized | — |
| 4 | UTM tracking on social links | ✅ Already Done | — |
| 5 | OG preview tool | ✅ Already Done | — |
| 6 | Brand guidelines doc | ✅ Already Done | — |
| 7 | A/B test headlines | ✅ Already Done | — |
| 8 | Email optimization | ✅ Auto-works | — |

---

## Sprint 18: OG Consistency (Priority 1)

### Goal
Migrate all layout files from static `/og.png` to dynamic `/api/og` for consistency and future flexibility.

### Tasks

| Task ID | Description | File | Validation |
|---------|-------------|------|------------|
| T18-001 | Update network-effect layout OG URL | `app/network-effect/layout.tsx` | typecheck |
| T18-002 | Update product layout OG URL | `app/product/layout.tsx` | typecheck |
| T18-003 | Update procurement layout OG URL + fix canonical | `app/resources/procurement/layout.tsx` | typecheck |

### Commits
```
0cd64f8 feat(og): Sprint 18 - migrate 3 layouts from /og.png to /api/og
```

### Validation
- `npm run typecheck` passes
- All 3 files now reference `/api/og` instead of `/og.png`

---

## Sprint 19: Case Studies OG (Priority 2a)

### Goal
Add page-specific OG images for all case study dynamic routes.

### Tasks

| Task ID | Description | File | Validation |
|---------|-------------|------|------------|
| T19-001 | Add caseStudyMeta with title/description for 3 slugs | `app/case-studies/[slug]/layout.tsx` | typecheck |
| T19-002 | Add openGraph with dynamic images array | `app/case-studies/[slug]/layout.tsx` | typecheck |
| T19-003 | Add PAGE_CONTENT for `case-study/primo-network` | `app/api/og/route.tsx` | build |
| T19-004 | Add PAGE_CONTENT for `case-study/regional-3pl` | `app/api/og/route.tsx` | build |
| T19-005 | Add PAGE_CONTENT for `case-study/cold-chain-security` | `app/api/og/route.tsx` | build |

### PAGE_CONTENT Entries Added
```typescript
'case-study/primo-network': {
  headline: 'Primo: 260 Facilities',
  subtitle: 'Enterprise network standardization at scale. Network-wide deployment ROI modeling.',
  tagline: 'Enterprise Case Study.'
},
'case-study/regional-3pl': {
  headline: 'Regional 3PL Success',
  subtitle: 'From manual gates to ground truth. 85% reduction in detention disputes.',
  tagline: '3PL Case Study.'
},
'case-study/cold-chain-security': {
  headline: 'Cold Chain Security',
  subtitle: 'Cargo theft prevention at the gate. 80% reduction in incidents.',
  tagline: 'Security Case Study.'
},
```

---

## Sprint 20: Field Notes OG (Priority 2b)

### Goal
Add page-specific OG images for all field notes dynamic routes.

### Tasks

| Task ID | Description | File | Validation |
|---------|-------------|------|------------|
| T20-001 | Add openGraph with dynamic images array | `app/resources/field-notes/[slug]/page.tsx` | typecheck |
| T20-002 | Add PAGE_CONTENT for `field-note/dwell-time-patterns` | `app/api/og/route.tsx` | build |
| T20-003 | Add PAGE_CONTENT for `field-note/appointment-compliance` | `app/api/og/route.tsx` | build |
| T20-004 | Add PAGE_CONTENT for `field-note/gate-automation-roi` | `app/api/og/route.tsx` | build |

### PAGE_CONTENT Entries Added
```typescript
'field-note/dwell-time-patterns': {
  headline: 'Dwell Time Patterns',
  subtitle: 'What actually moves the needle on trailer wait times across 50+ yards.',
  tagline: 'Field Note.'
},
'field-note/appointment-compliance': {
  headline: 'Appointment Compliance',
  subtitle: 'Leading indicators and enforcement patterns for improved dock scheduling.',
  tagline: 'Field Note.'
},
'field-note/gate-automation-roi': {
  headline: 'Gate Automation ROI',
  subtitle: 'Measuring the real impact of gate automation on facility throughput.',
  tagline: 'Field Note.'
},
```

### Commits (Sprint 19 + 20 combined)
```
9271ac2 feat(og): Sprint 19 & 20 - add page-specific OG images for case studies and field notes
```

---

## Sprint 21: Critical OG Fixes (Subagent Review)

### Goal
Address critical issues identified during subagent code review.

### Issues Identified
1. **Diagnostic layout missing images array** - OG crawlers would get no image
2. **OG route using `no-cache`** - Every request regenerated image, wasting edge function invocations

### Tasks

| Task ID | Description | File | Validation |
|---------|-------------|------|------------|
| T21-001 | Add images array to diagnostic openGraph | `app/diagnostic/layout.tsx` | typecheck |
| T21-002 | Add siteUrl import to diagnostic layout | `app/diagnostic/layout.tsx` | typecheck |
| T21-003 | Add PAGE_CONTENT for `diagnostic` | `app/api/og/route.tsx` | build |
| T21-004 | Change cache headers to edge cache with SWR | `app/api/og/route.tsx` | curl test |

### Code Changes

**app/diagnostic/layout.tsx**
```typescript
// BEFORE
openGraph: {
  title: '...',
  description: '...',
  type: 'website',
  // NO IMAGES!
},

// AFTER
openGraph: {
  title: '...',
  description: '...',
  type: 'website',
  images: [
    {
      url: `${siteUrl}/api/og?page=diagnostic`,
      width: 1200,
      height: 630,
      alt: 'Variance Tax Diagnostic',
    },
  ],
},
```

**app/api/og/route.tsx**
```typescript
// BEFORE
response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
response.headers.set('Pragma', 'no-cache');
response.headers.set('Expires', '0');

// AFTER
response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
```

### Commits
```
2eec066 fix(og): Sprint 21 - fix critical OG issues from subagent review
```

---

## Priority 3: Image Optimization (DEPRIORITIZED)

### Analysis
The subagent review recommended deprioritizing this work because:

1. **Next.js Image component already in use** - Images at `/public/proof/` are served through `<Image>` component
2. **Automatic WebP conversion** - Next.js serves WebP to supporting browsers at runtime
3. **Minimal user impact** - Users never download raw 1.5MB PNGs; they get optimized versions
4. **Video is the real concern** - The 32MB, 16MB, 12MB video files have more bandwidth impact

### Current Image Sizes
| File | Size |
|------|------|
| roll-out.png | 1.5MB |
| outbound-check-in.png | 1.2MB |
| Reefer-driver-journey.png | 1.2MB |
| Other proof images | 800KB-1.1MB each |
| **Total** | ~13MB |

### Recommendation
If optimization is needed later, focus on:
- Adding `sizes` prop to Image components for responsive srcset
- Adding `priority` to above-the-fold hero images
- Lazy-loading videos with `preload="none"`

---

## Future Sprints (Recommended Post-Launch)

### Sprint 22: High-Traffic Page OG (Est. 45 min)

Add page-specific OG images to high-traffic pages currently using root fallback.

| Task ID | Description | Target |
|---------|-------------|--------|
| T22-001 | Add openGraph to pricing layout | `/pricing` |
| T22-002 | Add openGraph to about layout | `/about` |
| T22-003 | Add openGraph to contact layout | `/contact` |
| T22-004 | Add PAGE_CONTENT entries for above | `/api/og` |
| T22-005 | Test with Facebook Sharing Debugger | validation |
| T22-006 | Test with Twitter Card Validator | validation |

### Sprint 23: Twitter Card Enhancement (Est. 20 min)

Add explicit Twitter Card metadata alongside OpenGraph.

| Task ID | Description | File |
|---------|-------------|------|
| T23-001 | Add twitter object to root layout | `app/layout.tsx` |
| T23-002 | Use `summary_large_image` card type | all layouts |
| T23-003 | Add @yardflow or @freightroll handle | all layouts |

### Sprint 24: Structured Data / JSON-LD (Est. 45 min)

Improve SEO with structured data.

| Task ID | Description | File |
|---------|-------------|------|
| T24-001 | Add Organization schema to root layout | `app/layout.tsx` |
| T24-002 | Add SoftwareApplication schema to product page | `app/product/page.tsx` |
| T24-003 | Add FAQPage schema to FAQ page | `app/faq/page.tsx` |

### Sprint 25: Video Optimization (Est. 1-2 hrs)

Reduce video bandwidth impact.

| Task ID | Description | File |
|---------|-------------|------|
| T25-001 | Add poster frames to all video elements | multiple |
| T25-002 | Implement preload="none" for non-hero videos | multiple |
| T25-003 | Evaluate HLS/DASH for 32MB+ videos | research |

---

## Complete PAGE_CONTENT Coverage

After all sprints, the `/api/og` route supports:

### Solutions (5 slugs)
- `solutions/dry-van`
- `solutions/reefer`
- `solutions/flatbed`
- `solutions/dedicated`
- `solutions/intermodal`

### Guides (3 slugs)
- `guide/cargo-theft-prevention`
- `guide/network-effect-yard-automation`
- `guide/ctpat-tsa-compliance`

### Case Studies (3 slugs)
- `case-study/primo-network`
- `case-study/regional-3pl`
- `case-study/cold-chain-security`

### Field Notes (3 slugs)
- `field-note/dwell-time-patterns`
- `field-note/appointment-compliance`
- `field-note/gate-automation-roi`

### Tools (1 slug)
- `diagnostic`

### Default + Variants
- `default` (fallback)
- `?variant=a|b|c` (A/B test headlines)

---

## Validation Checklist

### Build Verification
- [x] `npm run typecheck` - 0 errors
- [x] `npm run build` - 41 static pages generated
- [x] `npm run audit:content` - 0 issues, 0 warnings

### OG Image Testing
Use these tools to verify OG images render correctly:
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
- OpenGraph Preview: https://www.opengraph.xyz/

### Test URLs
```
https://yardflow.ai/api/og                           # Default
https://yardflow.ai/api/og?page=diagnostic           # Tool page
https://yardflow.ai/api/og?page=solutions/dry-van    # Solution
https://yardflow.ai/api/og?page=case-study/primo-network  # Case study
https://yardflow.ai/api/og?variant=b                 # A/B variant
```

---

## Git Commit History

```
0cd64f8 feat(og): Sprint 18 - migrate 3 layouts from /og.png to /api/og
9271ac2 feat(og): Sprint 19 & 20 - add page-specific OG images for case studies and field notes
2eec066 fix(og): Sprint 21 - fix critical OG issues from subagent review
```

---

## Document Status

- **Created**: January 22, 2026
- **Last Updated**: January 22, 2026
- **Owner**: Development Team
- **Status**: Complete - Ready for review

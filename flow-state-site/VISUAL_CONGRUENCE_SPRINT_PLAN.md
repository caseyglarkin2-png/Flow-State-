# Visual Congruence Sprint Plan V2

> **Created:** January 22, 2026  
> **Status:** Final  
> **Version:** 2.0 (Incorporates subagent review feedback)  
> **Objective:** Achieve complete visual and aesthetic consistency across all YardFlow pages

---

## Executive Summary

### Problem Statement

1. **ProtocolSequenceAnimation iconography** (4-slide hero animation) uses generic shield/lock/document icons that don't match the brand's geometric, minimal, logistics-tech aesthetic established by FlowIcons.tsx
2. **MP4 videos from Figma** look low-quality and don't meet the site's visual bar
3. **Cross-page aesthetic variance** exists where some pages/components deviate from established design system

### Success Criteria

- [ ] All protocol module icons match FlowIcons.tsx aesthetic (geometric, minimal, stroke-based)
- [ ] All video assets either replaced with SVG animations or re-exported at optimized quality
- [ ] Visual audit checklist passes for all 41 production pages
- [ ] 0 lint warnings on icon/animation components
- [ ] Performance: Total video size < 25MB, no bundle budget violations

---

## Subagent Review Summary

**Original Score:** 6.5/10  
**Key Issues Addressed:**
1. ✅ Split design approval from implementation (S1A/S1B)
2. ✅ Added explicit S2→S3 dependency for SVG animations
3. ✅ Defined S5 scope with timeboxes and contingency
4. ✅ Fixed effort estimates for video optimization
5. ✅ Added design approval gate before implementation
6. ✅ Added rollback plan and sprint gate checkpoints
7. ✅ Corrected video file sizes to actual values
8. ✅ Added WebM format consideration
9. ✅ Added mobile performance testing

---

## Current State Analysis

### Iconography Audit

**ProtocolIcons.tsx (Line 1-205)** - The problem:
```tsx
// Current: Generic "shield with lock" icon - not brand-aligned
<path d="M24 4L10 10v10c0 8.84..." />  // Shield outline
<rect x="18" y="22" width="12" height="10" />  // Lock body
```

**FlowIcons.tsx (Line 1-527)** - The standard:
```tsx
// Brand standard: Geometric, minimal, stroke-based
<path d="M4 12h14M13 6l6 6-6 6" strokeWidth="2" />  // Pure geometry
<circle cx="4" cy="12" r="2" opacity="0.4" />  // Subtle depth
```

### MP4 Video Audit (Corrected Sizes)

| File | Actual Size | Quality Issue |
|------|-------------|---------------|
| Machine-vision-video.mp4 | 31MB | Oversized, compression artifacts |
| pickup-vs-delivery-video.mp4 | 16MB | Figma export banding, wrong aspect |
| driver-qr-scan.mp4 | 12MB | Low resolution source |
| Smart-bol-kiosk.mp4 | 7MB | Frame rate stuttering |
| kiosk-demo.mp4 | 7MB | Inconsistent padding/margins |
| two-way-comms.mp4 | 6MB | Acceptable but could be SVG |
| chain-of-custody-kiosk.mp4 | 2.4MB | Acceptable quality |
| **Total** | **81MB** | **Target: < 25MB** |

### Pages Requiring Audit

Full list of 41 production pages:
1. `/` (homepage)
2. `/about`
3. `/case-studies`
4. `/case-studies/[slug]`
5. `/changelog`
6. `/co-development`
7. `/compare`
8. `/contact`
9. `/demo`
10. `/diagnostic`
11. `/docs/*` (economics-methodology, etc.)
12. `/faq`
13. `/implementation`
14. `/integrations`
15. `/network-effect`
16. `/press`
17. `/pricing`
18. `/privacy`
19. `/product`
20. `/qualify`
21. `/resources`
22. `/resources/field-notes`
23. `/resources/field-notes/[slug]`
24. `/resources/guides`
25. `/resources/guides/[slug]`
26. `/resources/procurement`
27. `/resources/simulations`
28. `/risk`
29. `/roi`
30. `/security`
31. `/simulations`
32. `/singularity`
33. `/solutions`
34. `/solutions/dry-van`
35. `/solutions/flatbed`
36. `/solutions/intermodal`
37. `/solutions/reefer`
38. `/solutions/tanker`
39. `/start-your-map`
40. `/status`
41. `/terms`

---

## Sprint Overview (Revised)

| Sprint | Focus | Deliverable | Duration |
|--------|-------|-------------|----------|
| **S1A** | Icon Design & Approval | Design specs + stakeholder sign-off | 2h |
| **S1B** | Icon Implementation | New icons coded + tested | 3h |
| **S2** | Video Audit & Optimization | All videos < 25MB total | 5h |
| **S3** | Animation Refactor | Homepage animations updated | 4h |
| **S4** | Iterative Audit + Fix | Pages audited + critical fixes | 6h |
| **Total** | | Production-ready visual system | ~20h |

### Sprint Gates

| Gate | Criteria | Rollback Point |
|------|----------|----------------|
| S1A-GATE | Design specs approved by stakeholder | N/A (no code changes) |
| S1B-GATE | All icons render, tests pass, preview page works | `git tag sprint-1b-complete` |
| S2-GATE | Total video size < 25MB, all pages load without errors | `git tag sprint-2-complete` |
| S3-GATE | Homepage animation demo recorded, no console errors | `git tag sprint-3-complete` |
| S4-GATE | Audit complete, 0 critical issues, < 5 major issues | `git tag sprint-4-complete` |

---

## Sprint 1A: Icon Design & Approval

**Goal:** Create design specifications for 4 protocol icons and get stakeholder approval.

**Demo:** Design document with icon sketches/mockups for review.

**Duration:** 2 hours

---

### T1A-001: Audit Current Icon Inventory

**Description:** Document all icons in the codebase, categorize by aesthetic alignment.

**Files to Audit:**
- `components/icons/ProtocolIcons.tsx`
- `components/icons/FlowIcons.tsx`
- `components/icons/FlowGlyphs.tsx`
- Any inline SVGs in page components

**Acceptance Criteria:**
- [ ] Create `docs/ICON_INVENTORY.md` with all icons listed
- [ ] Each icon marked: ✅ Brand-aligned / ⚠️ Needs update / ❌ Off-brand
- [ ] Count of icons needing redesign documented
- [ ] Reference examples from FlowIcons.tsx documented

**Validation:**
```bash
cat docs/ICON_INVENTORY.md | head -50
grep -c "⚠️\|❌" docs/ICON_INVENTORY.md  # Count issues
```

**Effort:** 45 minutes

---

### T1A-002: Create Icon Design Specifications

**Description:** Document design specs for each new protocol icon.

**Design Principles (from FlowIcons.tsx):**
- Geometric shapes only (no realistic metaphors)
- Stroke-based (strokeWidth 1.5-2)
- 48x48 viewBox with scalability to 24/32/64
- Single color (neon #00B4FF or currentColor)
- Opacity layers for depth (0.3-0.5)

**Icon Concepts:**

| Icon | Current | Proposed Concept |
|------|---------|------------------|
| ProtocolGuardIcon | Shield + lock | Concentric circles + crosshair + checkmark |
| ProtocolCommsIcon | Speech bubble + waves | Bidirectional pulse lines converging |
| ProtocolBOLIcon | Document + checkmark | Data grid (3x3) with verification stroke |
| ProtocolYMSIcon | Bar chart + grid | 3-node network with central pulse |

**Files:**
- `docs/ICON_DESIGN_SPECS.md` (NEW)

**Acceptance Criteria:**
- [ ] Each icon has concept sketch (ASCII or description)
- [ ] SVG viewBox and stroke specifications defined
- [ ] Color and opacity rules documented
- [ ] Accessibility requirements (aria-label patterns) specified

**Validation:**
```bash
cat docs/ICON_DESIGN_SPECS.md
# Document contains 4 icon specifications
```

**Effort:** 1 hour

---

### T1A-003: Stakeholder Design Review

**Description:** Present icon designs for approval before implementation.

**Review Materials:**
- ICON_DESIGN_SPECS.md
- Side-by-side comparison with FlowIcons examples
- Mockup of icons in ProtocolSequenceAnimation context

**Acceptance Criteria:**
- [ ] Design specs shared with stakeholder
- [ ] Feedback collected and documented
- [ ] Approval received OR revisions identified
- [ ] Sign-off recorded in document

**Validation:**
```bash
grep -i "approved\|sign-off" docs/ICON_DESIGN_SPECS.md
```

**Effort:** 15 minutes (meeting)

---

## Sprint 1B: Icon Implementation

**Goal:** Implement approved icon designs with full test coverage.

**Demo:** Icon test page showing all variants at multiple sizes.

**Duration:** 3 hours

**Dependency:** S1A-GATE (design approval)

---

### T1B-001: Implement ProtocolGuardIcon

**Description:** Implement approved design for Digital Guard icon.

**Files:**
- `components/icons/ProtocolIcons.tsx`

**Implementation:**
```tsx
// Concept: Concentric circles + crosshair + checkmark
<svg viewBox="0 0 48 48">
  <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="1.5" fill="none" />
  <circle cx="24" cy="24" r="12" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
  <line x1="24" y1="4" x2="24" y2="14" stroke={color} strokeWidth="1.5" />
  <line x1="24" y1="34" x2="24" y2="44" stroke={color} strokeWidth="1.5" />
  <line x1="4" y1="24" x2="14" y2="24" stroke={color} strokeWidth="1.5" />
  <line x1="34" y1="24" x2="44" y2="24" stroke={color} strokeWidth="1.5" />
  <path d="M18 24l4 4 8-8" stroke={color} strokeWidth="2" fill="none" />
</svg>
```

**Acceptance Criteria:**
- [ ] Icon renders at 24, 32, 48, 64px sizes
- [ ] Matches approved design spec
- [ ] Has aria-label attribute
- [ ] Color prop applies correctly

**Validation:**
```bash
npm run typecheck
npm run test:unit -- ProtocolIcons
```

**Effort:** 30 minutes

---

### T1B-002: Implement ProtocolCommsIcon

**Description:** Implement approved design for Digital Comms icon.

**Files:**
- `components/icons/ProtocolIcons.tsx`

**Implementation:**
```tsx
// Concept: Bidirectional pulse lines
<svg viewBox="0 0 48 48">
  <line x1="4" y1="24" x2="20" y2="24" stroke={color} strokeWidth="2" />
  <line x1="28" y1="24" x2="44" y2="24" stroke={color} strokeWidth="2" />
  <circle cx="24" cy="24" r="4" fill={color} />
  <path d="M12 18l-4 6 4 6" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
  <path d="M36 18l4 6-4 6" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
</svg>
```

**Acceptance Criteria:**
- [ ] Conveys bidirectional communication
- [ ] Matches FlowIcons stroke style
- [ ] Renders correctly at all sizes

**Validation:**
```bash
npm run test:unit -- ProtocolIcons
```

**Effort:** 30 minutes

---

### T1B-003: Implement ProtocolBOLIcon

**Description:** Implement approved design for Digital BOL icon.

**Files:**
- `components/icons/ProtocolIcons.tsx`

**Implementation:**
```tsx
// Concept: Data grid with verification stroke
<svg viewBox="0 0 48 48">
  {/* 3x3 grid */}
  <rect x="10" y="10" width="8" height="8" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
  <rect x="20" y="10" width="8" height="8" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
  <rect x="30" y="10" width="8" height="8" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
  <rect x="10" y="20" width="8" height="8" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
  <rect x="20" y="20" width="8" height="8" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
  <rect x="30" y="20" width="8" height="8" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
  <rect x="10" y="30" width="8" height="8" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
  <rect x="20" y="30" width="8" height="8" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
  <rect x="30" y="30" width="8" height="8" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
  {/* Verification checkmark overlay */}
  <path d="M14 28l8 8 16-20" stroke={color} strokeWidth="2.5" fill="none" />
</svg>
```

**Acceptance Criteria:**
- [ ] Geometric data grid representation
- [ ] Clear verification overlay
- [ ] Distinct from other protocol icons

**Validation:**
```bash
npm run test:unit -- ProtocolIcons
```

**Effort:** 30 minutes

---

### T1B-004: Implement ProtocolYMSIcon

**Description:** Implement approved design for Digital YMS icon.

**Files:**
- `components/icons/ProtocolIcons.tsx`

**Implementation:**
```tsx
// Concept: 3-node network with central pulse
<svg viewBox="0 0 48 48">
  {/* 3 nodes in triangle */}
  <circle cx="24" cy="10" r="4" fill={color} />
  <circle cx="10" cy="38" r="4" fill={color} />
  <circle cx="38" cy="38" r="4" fill={color} />
  {/* Connecting lines */}
  <line x1="24" y1="14" x2="12" y2="34" stroke={color} strokeWidth="1.5" opacity="0.5" />
  <line x1="24" y1="14" x2="36" y2="34" stroke={color} strokeWidth="1.5" opacity="0.5" />
  <line x1="14" y1="38" x2="34" y2="38" stroke={color} strokeWidth="1.5" opacity="0.5" />
  {/* Central orchestration pulse */}
  <circle cx="24" cy="28" r="6" stroke={color} strokeWidth="1.5" fill="none" />
  <circle cx="24" cy="28" r="2" fill={color} />
</svg>
```

**Acceptance Criteria:**
- [ ] Matches network/nexus brand aesthetic
- [ ] Suggests orchestration and control
- [ ] Scalable to all sizes

**Validation:**
```bash
npm run test:unit -- ProtocolIcons
```

**Effort:** 30 minutes

---

### T1B-005: Create Icon Test Page

**Description:** Create internal page to preview all icons at multiple sizes.

**Files:**
- `app/icon-test/page.tsx` (NEW)

**Acceptance Criteria:**
- [ ] Shows all ProtocolIcons and FlowIcons side by side
- [ ] Renders at 24, 32, 48, 64px sizes
- [ ] Color variants (neon, steel, white)
- [ ] Dark and light background sections
- [ ] Page excluded from sitemap

**Validation:**
```bash
npm run dev
# Visit http://localhost:3000/icon-test
grep "icon-test" app/sitemap.ts  # Should NOT be listed
```

**Effort:** 45 minutes

---

### T1B-006: Icon Unit Tests & Snapshots

**Description:** Comprehensive tests for all redesigned icons.

**Files:**
- `components/icons/__tests__/ProtocolIcons.test.tsx` (update)

**Test Coverage:**
- [ ] Each icon renders without error
- [ ] Each icon has proper aria-label
- [ ] Size prop changes rendered dimensions
- [ ] Color prop applies correctly
- [ ] Snapshot tests for visual regression
- [ ] Reduced motion compatibility (static render)

**Validation:**
```bash
npm run test:unit -- components/icons
# Coverage > 80%
```

**Effort:** 45 minutes

---

### T1B-007: Export New Icons from Index

**Description:** Ensure new icons are exported from animations index.

**Files:**
- `components/icons/index.ts` (update if needed)

**Acceptance Criteria:**
- [ ] All ProtocolIcons exported
- [ ] Import paths work from `@/components/icons`

**Validation:**
```bash
grep "ProtocolGuardIcon" components/icons/index.ts
```

**Effort:** 10 minutes

---

## Sprint 2: Video Audit & Optimization

**Goal:** Reduce total video size from 81MB to < 25MB while maintaining quality.

**Demo:** All videos play smoothly, load quickly, match brand aesthetic.

**Duration:** 5 hours

**Dependency:** None (can run parallel to S1)

---

### T2-001: Video Quality Audit Document

**Description:** Document quality issues and optimization decisions per video.

**Audit Criteria:**
- Resolution (minimum 1280x720)
- Frame rate (minimum 24fps)
- Compression quality (no visible banding)
- Aspect ratio (16:9 for desktop)
- Brand alignment (colors, UI chrome)
- File size target (individual < 5MB)

**Decision Framework:**
| Decision | Criteria |
|----------|----------|
| Keep + Optimize | Good content, just oversized |
| Replace with SVG | Simple animation, < 10 elements |
| Remove | Not used anywhere in codebase |

**Files:**
- `docs/VIDEO_AUDIT.md` (NEW)

**Acceptance Criteria:**
- [ ] Each video scored on criteria
- [ ] Decision documented: Keep / Optimize / Replace / Remove
- [ ] Target file sizes specified
- [ ] Total target < 25MB documented

**Validation:**
```bash
cat docs/VIDEO_AUDIT.md
# All 7 videos have decisions
```

**Effort:** 1 hour

---

### T2-002: Optimize Machine-vision-video.mp4

**Description:** Compress largest video from 31MB to < 5MB.

**Optimization Command:**
```bash
ffmpeg -i Machine-vision-video.mp4 \
  -vcodec libx264 -crf 28 -preset slow \
  -vf "scale=1280:720" -an \
  Machine-vision-video-optimized.mp4
```

**Files:**
- `public/proof/Machine-vision-video.mp4` (replace)
- `scripts/optimize-videos.sh` (add command)

**Acceptance Criteria:**
- [ ] Output file < 5MB
- [ ] No severe visual artifacts (manual review)
- [ ] Plays correctly in browser

**Validation:**
```bash
du -h public/proof/Machine-vision-video.mp4
# < 5MB
```

**Effort:** 30 minutes

---

### T2-003: Optimize pickup-vs-delivery-video.mp4

**Description:** Compress from 16MB to < 3MB.

**Files:**
- `public/proof/pickup-vs-delivery-video.mp4` (replace)

**Acceptance Criteria:**
- [ ] Output file < 3MB
- [ ] Aspect ratio corrected to 16:9 if needed
- [ ] No banding artifacts

**Validation:**
```bash
du -h public/proof/pickup-vs-delivery-video.mp4
```

**Effort:** 30 minutes

---

### T2-004: Optimize driver-qr-scan.mp4

**Description:** Compress from 12MB to < 3MB.

**Files:**
- `public/proof/driver-qr-scan.mp4` (replace)

**Acceptance Criteria:**
- [ ] Output file < 3MB
- [ ] Resolution improved or maintained
- [ ] Plays correctly

**Validation:**
```bash
du -h public/proof/driver-qr-scan.mp4
```

**Effort:** 30 minutes

---

### T2-005: Optimize Smart-bol-kiosk.mp4

**Description:** Compress from 7MB to < 2MB, fix frame rate.

**Files:**
- `public/proof/Smart-bol-kiosk.mp4` (replace)

**Acceptance Criteria:**
- [ ] Output file < 2MB
- [ ] Frame rate consistent (no stuttering)
- [ ] Plays correctly

**Validation:**
```bash
du -h public/proof/Smart-bol-kiosk.mp4
```

**Effort:** 30 minutes

---

### T2-006: Optimize kiosk-demo.mp4

**Description:** Compress from 7MB to < 2MB, fix padding.

**Files:**
- `public/proof/kiosk-demo.mp4` (replace)

**Acceptance Criteria:**
- [ ] Output file < 2MB
- [ ] Padding/margins consistent
- [ ] Plays correctly

**Validation:**
```bash
du -h public/proof/kiosk-demo.mp4
```

**Effort:** 30 minutes

---

### T2-007: Create WebM Alternatives

**Description:** Create WebM versions for browsers that support VP9.

**Command:**
```bash
for f in *.mp4; do
  ffmpeg -i "$f" -c:v libvpx-vp9 -crf 30 -b:v 0 \
    "${f%.mp4}.webm"
done
```

**Files:**
- `public/proof/*.webm` (NEW)
- `components/media/ProofMedia.tsx` (add source fallback)

**Acceptance Criteria:**
- [ ] WebM versions 30-50% smaller than MP4
- [ ] ProofMedia component uses `<source>` fallback pattern
- [ ] Falls back to MP4 gracefully

**Validation:**
```bash
du -h public/proof/*.webm
# Each smaller than corresponding .mp4
```

**Effort:** 45 minutes

---

### T2-008: Generate Poster Frames

**Description:** Create poster images for lazy video loading.

**Command:**
```bash
for f in *.mp4; do
  ffmpeg -i "$f" -ss 00:00:01 -frames:v 1 \
    -vf "scale=640:-1" "${f%.mp4}-poster.webp"
done
```

**Files:**
- `public/proof/*-poster.webp` (NEW)
- Components using `<video>` updated with poster attribute

**Acceptance Criteria:**
- [ ] Each video has poster image
- [ ] Poster images < 50KB each (WebP format)
- [ ] Videos use `preload="none"` and `loading="lazy"`

**Validation:**
```bash
du -h public/proof/*-poster.webp
# Each < 50KB
```

**Effort:** 30 minutes

---

### T2-009: Update Video Component References

**Description:** Update all components to use optimized videos with poster frames.

**Files:**
- `components/DemoStepper.tsx`
- `components/media/ProofMedia.tsx`

**Acceptance Criteria:**
- [ ] All video references use optimized versions
- [ ] Poster frames specified
- [ ] WebM source fallback added
- [ ] No broken video references

**Validation:**
```bash
npm run build
npm run test:e2e -- e2e/visual-regression.spec.ts
```

**Effort:** 45 minutes

---

### T2-010: Validate Total Video Size

**Description:** Verify total video assets meet < 25MB target.

**Acceptance Criteria:**
- [ ] Total MP4 size < 20MB
- [ ] Total WebM size < 15MB
- [ ] Poster images < 1MB total
- [ ] All videos load without errors

**Validation:**
```bash
du -ch public/proof/*.mp4 | tail -1
du -ch public/proof/*.webm | tail -1
du -ch public/proof/*-poster.webp | tail -1
# Total < 25MB
```

**Effort:** 15 minutes

---

## Sprint 3: Animation Refactor

**Goal:** Homepage animations use new icons and match brand aesthetic perfectly.

**Demo:** Homepage hero animation cycles through 4 modules with brand-aligned icons.

**Duration:** 4 hours

**Dependencies:** 
- S1B-GATE (icons implemented)
- S2-GATE (videos optimized) - for DemoStepper video testing

---

### T3-001: Integrate New Icons into ProtocolSequenceAnimation

**Description:** Replace iconMap references with new geometric icons.

**Files:**
- `components/animations/ProtocolSequenceAnimation.tsx`

**Acceptance Criteria:**
- [ ] All 4 icons render with new designs
- [ ] Animation timing unchanged (3s display, 500ms transition)
- [ ] Reduced motion fallback shows 2x2 grid with new icons
- [ ] TypeScript types remain correct

**Validation:**
```bash
npm run typecheck
npm run test:unit -- ProtocolSequenceAnimation
```

**Effort:** 45 minutes

---

### T3-002: Add Glow Effect to Active Icon

**Description:** Add subtle neon glow effect to active icon state.

**Implementation:**
```css
.icon-glow {
  filter: drop-shadow(0 0 8px rgba(0, 180, 255, 0.5));
  transition: filter 500ms ease;
}
```

**Files:**
- `components/animations/ProtocolSequenceAnimation.tsx`
- `styles/globals.css` (add utility class)

**Acceptance Criteria:**
- [ ] Active icon has neon glow
- [ ] Glow animates with icon transition
- [ ] Performance: 60fps maintained
- [ ] Safari compatibility verified

**Validation:**
```bash
# Manual test on Safari, Chrome, Firefox
npm run lighthouse -- --only-categories=performance
```

**Effort:** 30 minutes

**Dependency:** T3-001

---

### T3-003: Add Progress Indicator Dots

**Description:** Show which module is active with clickable step indicators.

**Design:**
```
[ ● ○ ○ ○ ] Guard active
[ ○ ● ○ ○ ] Comms active
```

**Files:**
- `components/animations/ProtocolSequenceAnimation.tsx`

**Acceptance Criteria:**
- [ ] 4 indicator dots below animation
- [ ] Active dot is neon, others are steel/30
- [ ] Dots are clickable to jump to specific module
- [ ] Keyboard accessible (Tab + Enter)
- [ ] aria-label for each dot

**Validation:**
```bash
npm run test:unit -- ProtocolSequenceAnimation
# Keyboard navigation test
```

**Effort:** 45 minutes

**Dependency:** T3-001

---

### T3-004: Add Viewport Pause/Resume

**Description:** Pause animation when not in viewport, resume when visible.

**Implementation:**
```tsx
const [ref, inView] = useInView({ threshold: 0.5 });

useEffect(() => {
  if (!inView) {
    clearInterval(intervalRef.current);
  } else if (autoPlay) {
    intervalRef.current = setInterval(cycleToNext, displayDuration);
  }
}, [inView, autoPlay]);
```

**Files:**
- `components/animations/ProtocolSequenceAnimation.tsx`

**Acceptance Criteria:**
- [ ] Animation pauses when scrolled out of view
- [ ] Animation resumes when scrolled back
- [ ] No memory leaks (interval cleanup)
- [ ] Unit test verifies pause/resume behavior

**Validation:**
```bash
npm run test:unit -- ProtocolSequenceAnimation
```

**Effort:** 30 minutes

**Dependency:** T3-001

---

### T3-005: Update YardChaosAnimation Aesthetic

**Description:** Align YardChaosAnimation with brand (ember for problems, geometric shapes).

**Current Issues:**
- ✕ symbols look generic → Use Dismiss icon from FlowIcons
- Blob animations could be more geometric → Use geometric shapes
- Text styling → Use brand font styling

**Files:**
- `components/animations/YardChaosAnimation.tsx`

**Acceptance Criteria:**
- [ ] Problem indicators use Dismiss icon from FlowIcons
- [ ] Blobs replaced with geometric angular shapes
- [ ] Typography matches brand (font-mono for data)
- [ ] Animation feels premium

**Validation:**
```bash
npm run dev
# Visual inspection of homepage Step 2 section
```

**Effort:** 1 hour

---

### T3-006: Animation Component Test Coverage

**Description:** Ensure all animation components have comprehensive tests.

**Files:**
- `components/animations/__tests__/ProtocolSequenceAnimation.test.tsx`
- `components/animations/__tests__/YardChaosAnimation.test.tsx`

**Test Cases:**
- [ ] Render tests for all animations
- [ ] Reduced motion behavior tested
- [ ] Timing/interval behavior tested
- [ ] Viewport pause/resume tested
- [ ] Keyboard navigation tested
- [ ] Coverage > 80%

**Validation:**
```bash
npm run test:unit -- components/animations --coverage
```

**Effort:** 1 hour

---

### T3-007: Mobile Performance Validation

**Description:** Verify animations perform well on mobile devices.

**Test Devices:**
- iPhone Safari (simulated)
- Android Chrome (simulated)
- Low-end device simulation (4x CPU slowdown)

**Files:**
- `e2e/mobile-performance.spec.ts` (NEW or update)

**Acceptance Criteria:**
- [ ] Animations maintain 30fps minimum on mobile
- [ ] No jank during scroll
- [ ] Reduced motion fallback works on mobile

**Validation:**
```bash
npm run test:e2e -- e2e/mobile-performance.spec.ts
# Lighthouse mobile performance > 75
```

**Effort:** 30 minutes

---

## Sprint 4: Iterative Audit + Fix

**Goal:** Audit all pages and fix issues as discovered (iterative approach).

**Demo:** Audit document complete, 0 critical issues, < 5 major issues remaining.

**Duration:** 6 hours

**Dependencies:** S3-GATE (animations complete)

---

### T4-001: Define Visual Consistency Checklist

**Description:** Create standardized checklist for page audits.

**Checklist Items:**
1. **Color Palette:** Uses only void/carbon/neon/ember/steel/white
2. **Typography:** Follows type scale (H1-H3, body, mono)
3. **Spacing:** Uses Tailwind spacing scale (4, 6, 8, 12, 16, 24)
4. **Cards:** bg-carbon/50, border-neon/20, rounded-xl
5. **Buttons:** Primary (neon fill), Secondary (ghost)
6. **Icons:** Uses FlowIcons or brand-aligned ProtocolIcons only
7. **Animations:** Uses motion-presets (fadeIn, staggerContainer)
8. **Images:** Next/Image with proper alt, lazy loading
9. **Videos:** Poster frames, lazy loading, preload="none"
10. **Reduced Motion:** All animations respect prefers-reduced-motion

**Scoring:**
- ✅ Pass: Fully compliant
- ⚠️ Warning: Minor deviation, low priority
- ❌ Critical: Major brand violation, must fix

**Files:**
- `docs/VISUAL_CONSISTENCY_CHECKLIST.md` (NEW)

**Acceptance Criteria:**
- [ ] 10-point checklist documented
- [ ] Scoring rubric defined
- [ ] Example of compliant vs non-compliant

**Validation:**
```bash
cat docs/VISUAL_CONSISTENCY_CHECKLIST.md
```

**Effort:** 45 minutes

---

### T4-002: Audit + Fix Core Pages

**Description:** Audit and immediately fix issues on highest-traffic pages.

**Pages:**
- `/` (homepage)
- `/product`
- `/roi`
- `/singularity`

**Process:**
1. Apply checklist to page
2. Document issues in `docs/PAGE_AUDIT_RESULTS.md`
3. Fix critical issues immediately
4. Log major issues for later if > 30min fix

**Files:**
- `docs/PAGE_AUDIT_RESULTS.md` (NEW)
- Page files as needed for fixes

**Acceptance Criteria:**
- [ ] 4 pages audited
- [ ] 0 critical issues remaining on these pages
- [ ] Major issues documented with effort estimates

**Validation:**
```bash
npm run build
npm run test:e2e -- e2e/smoke.spec.ts
```

**Effort:** 1.5 hours

---

### T4-003: Audit + Fix Solution Pages

**Description:** Audit and fix solution archetype pages.

**Pages:**
- `/solutions` (index)
- `/solutions/dry-van`
- `/solutions/reefer`
- `/solutions/flatbed`
- `/solutions/intermodal`
- `/solutions/tanker`

**Acceptance Criteria:**
- [ ] 6 pages audited
- [ ] 0 critical issues remaining
- [ ] Cross-page consistency verified

**Validation:**
```bash
npm run build
```

**Effort:** 1 hour

---

### T4-004: Audit + Fix Resource Pages

**Description:** Audit and fix resource/content pages.

**Pages:**
- `/resources` (index)
- `/resources/guides/*`
- `/resources/field-notes/*`
- `/case-studies`

**Acceptance Criteria:**
- [ ] All resource pages audited
- [ ] Content formatting consistent
- [ ] Card layouts consistent

**Validation:**
```bash
npm run build
```

**Effort:** 1 hour

---

### T4-005: Audit + Fix Utility Pages

**Description:** Audit and fix utility/legal/support pages.

**Pages:**
- `/contact`, `/pricing`, `/about`, `/faq`
- `/privacy`, `/terms`, `/security`, `/status`

**Acceptance Criteria:**
- [ ] All utility pages audited
- [ ] Form styling consistent
- [ ] Legal text formatting consistent

**Validation:**
```bash
npm run build
```

**Effort:** 1 hour

---

### T4-006: Cross-Browser Visual Testing

**Description:** Verify all pages render correctly across browsers.

**Browsers:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Files:**
- `e2e/cross-browser-visual.spec.ts` (update)

**Acceptance Criteria:**
- [ ] No layout breaks across browsers
- [ ] Colors render correctly
- [ ] Animations work on all browsers

**Validation:**
```bash
npm run test:e2e -- e2e/cross-browser-visual.spec.ts
```

**Effort:** 45 minutes

---

### T4-007: Performance & Bundle Validation

**Description:** Verify no performance regression from all changes.

**Metrics:**
- LCP < 2.5s
- CLS < 0.1
- Bundle size within budget
- Total video size < 25MB

**Validation:**
```bash
npm run lighthouse
node scripts/bundle-audit.js
du -ch public/proof/*.mp4 public/proof/*.webm | tail -1
```

**Acceptance Criteria:**
- [ ] All Core Web Vitals green
- [ ] Bundle budget not exceeded
- [ ] Video size target met

**Effort:** 30 minutes

---

### T4-008: Final Documentation Update

**Description:** Update all documentation to reflect changes.

**Files:**
- `docs/BRAND_GUIDELINES.md` (update icon section)
- `docs/ICON_INVENTORY.md` (mark all as aligned)
- `CHANGELOG.md` (add visual congruence entry)

**Acceptance Criteria:**
- [ ] All docs accurate
- [ ] Icon inventory shows 100% alignment
- [ ] Changelog entry added

**Validation:**
```bash
npm run build  # No doc link errors
```

**Effort:** 30 minutes

---

### T4-009: Create Git Tags for Rollback

**Description:** Create tagged releases at each sprint boundary.

**Tags:**
- `sprint-1b-complete`
- `sprint-2-complete`
- `sprint-3-complete`
- `sprint-4-complete`

**Acceptance Criteria:**
- [ ] All tags created and pushed
- [ ] ROLLBACK_PLAN.md updated with tag references

**Validation:**
```bash
git tag -l "sprint-*"
```

**Effort:** 15 minutes

---

## Task Tracking Matrix

| ID | Task | Sprint | Status | Effort | Deps |
|----|------|--------|--------|--------|------|
| T1A-001 | Icon Inventory Audit | 1A | ⬜ | 45m | — |
| T1A-002 | Icon Design Specs | 1A | ⬜ | 1h | T1A-001 |
| T1A-003 | Stakeholder Review | 1A | ⬜ | 15m | T1A-002 |
| T1B-001 | Implement ProtocolGuardIcon | 1B | ⬜ | 30m | S1A-GATE |
| T1B-002 | Implement ProtocolCommsIcon | 1B | ⬜ | 30m | S1A-GATE |
| T1B-003 | Implement ProtocolBOLIcon | 1B | ⬜ | 30m | S1A-GATE |
| T1B-004 | Implement ProtocolYMSIcon | 1B | ⬜ | 30m | S1A-GATE |
| T1B-005 | Icon Test Page | 1B | ⬜ | 45m | T1B-001-004 |
| T1B-006 | Icon Unit Tests | 1B | ⬜ | 45m | T1B-001-004 |
| T1B-007 | Export Icons from Index | 1B | ⬜ | 10m | T1B-001-004 |
| T2-001 | Video Quality Audit | 2 | ⬜ | 1h | — |
| T2-002 | Optimize Machine-vision | 2 | ⬜ | 30m | T2-001 |
| T2-003 | Optimize pickup-vs-delivery | 2 | ⬜ | 30m | T2-001 |
| T2-004 | Optimize driver-qr-scan | 2 | ⬜ | 30m | T2-001 |
| T2-005 | Optimize Smart-bol-kiosk | 2 | ⬜ | 30m | T2-001 |
| T2-006 | Optimize kiosk-demo | 2 | ⬜ | 30m | T2-001 |
| T2-007 | Create WebM Alternatives | 2 | ⬜ | 45m | T2-002-006 |
| T2-008 | Generate Poster Frames | 2 | ⬜ | 30m | T2-002-006 |
| T2-009 | Update Video References | 2 | ⬜ | 45m | T2-007, T2-008 |
| T2-010 | Validate Total Size | 2 | ⬜ | 15m | T2-009 |
| T3-001 | Integrate New Icons | 3 | ⬜ | 45m | S1B-GATE |
| T3-002 | Add Glow Effect | 3 | ⬜ | 30m | T3-001 |
| T3-003 | Progress Indicator | 3 | ⬜ | 45m | T3-001 |
| T3-004 | Viewport Pause/Resume | 3 | ⬜ | 30m | T3-001 |
| T3-005 | YardChaosAnimation Update | 3 | ⬜ | 1h | S1B-GATE |
| T3-006 | Animation Tests | 3 | ⬜ | 1h | T3-001-005 |
| T3-007 | Mobile Performance | 3 | ⬜ | 30m | T3-006 |
| T4-001 | Define Checklist | 4 | ⬜ | 45m | — |
| T4-002 | Audit Core Pages | 4 | ⬜ | 1.5h | T4-001, S3-GATE |
| T4-003 | Audit Solution Pages | 4 | ⬜ | 1h | T4-001 |
| T4-004 | Audit Resource Pages | 4 | ⬜ | 1h | T4-001 |
| T4-005 | Audit Utility Pages | 4 | ⬜ | 1h | T4-001 |
| T4-006 | Cross-Browser Testing | 4 | ⬜ | 45m | T4-002-005 |
| T4-007 | Performance Validation | 4 | ⬜ | 30m | T4-006 |
| T4-008 | Documentation Update | 4 | ⬜ | 30m | T4-007 |
| T4-009 | Git Tags for Rollback | 4 | ⬜ | 15m | T4-008 |

---

## Validation Commands

### Per-Sprint Validation

```bash
# S1A complete
cat docs/ICON_DESIGN_SPECS.md | grep -i "approved"

# S1B complete
npm run typecheck
npm run test:unit -- components/icons
npm run dev  # Visit /icon-test
git tag sprint-1b-complete

# S2 complete
du -ch public/proof/*.mp4 | tail -1  # < 20MB
du -ch public/proof/*.webm | tail -1  # < 15MB
npm run build
git tag sprint-2-complete

# S3 complete
npm run test:unit -- components/animations
npm run dev  # Verify homepage animations
git tag sprint-3-complete

# S4 complete
npm run predeploy
npm run test:e2e
npm run lighthouse
git tag sprint-4-complete
```

### Final Validation

```bash
npm run predeploy
npm run test:e2e:ci
node scripts/bundle-audit.js
node scripts/content-audit.ts
du -ch public/proof/*.mp4 public/proof/*.webm | tail -1
```

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Stakeholder rejects icon designs | S1A-003 is explicit approval gate before implementation |
| Icon redesigns take longer than estimated | Timebox design to 1h per icon, iterate post-launch if needed |
| Video optimization degrades quality | Review each output, set CRF threshold per video |
| SVG animations complex | Keep simple (< 10 elements), prefer CSS over JS animation |
| Cross-browser inconsistencies | Test early in S3, not just S4 |
| Mobile performance issues | T3-007 explicitly tests mobile with CPU throttling |
| Audit finds too many issues | Timebox fixes per page (30min max), defer minor to backlog |

---

## Definition of Done

Sprint is complete when:
1. All tasks marked ✅
2. `npm run predeploy` passes
3. Sprint gate criteria met
4. Git tag created and pushed
5. Vercel preview deployment verified

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| Draft | 2026-01-22 | Initial sprint plan |
| V2 | 2026-01-22 | Incorporated subagent review feedback |


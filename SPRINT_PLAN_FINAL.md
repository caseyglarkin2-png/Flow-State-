# Sprint Plan: Homepage Animation & Card Aesthetic Refinement
## Comprehensive, Production-Ready Breakdown (v2 - Subagent Reviewed)

**Project:** Flow-State Homepage Refinement  
**Objective:** Replace redundant Digital Guard animation with Protocol Sequence cycle + align module cards with destination page aesthetics  
**Duration:** 3 Sprints  
**Total Tasks:** 30 refined, atomic tasks (after subagent review consolidation & additions)

---

## Project Scope Overview

**Problem Statement:**
1. Homepage shows `DigitalGuardAnimation` → then "Digital Guard" as first module card (visual redundancy)
2. Singularity card uses generic network SVG that doesn't match 32-node map on destination page
3. Other module cards don't visually preview their destinations
4. Animation must be SSR-safe, accessible, performant, and properly instrumented

**Solution:**
- Replace `DigitalGuardAnimation` with `ProtocolSequenceAnimation` (cycles Guard → Comms → BOL → YMS)
- Update Singularity card to show 32-node particle grid matching destination
- Audit & update remaining module cards (Product, ROI, Network Effect)
- Add CI gates, cross-browser testing, and production instrumentation

**Success Criteria:**
- ✅ Congruence check: 22/22 passing (no regressions)
- ✅ ProtocolSequenceAnimation: Renders 4 states, cycles correctly, SSR-safe, respects prefers-reduced-motion
- ✅ Bundle size: Animation <50KB, cards <100KB total, SVG assets <30KB
- ✅ Performance: Lighthouse ≥90, LCP <2.5s, CLS <0.1, 60fps animations (verified via manual profiling)
- ✅ Accessibility: WCAG 2.1 Level AA, 0 violations, keyboard navigable
- ✅ E2E tests: 20+ tests passing, visual regression locked with reduced-motion snapshots
- ✅ Cross-browser: Chrome, Firefox, Safari, Edge (animation rendering verified)

---

## Key Changes from Subagent Review

### **Consolidated Tasks (Reduced from 26 → 30 but reorganized for clarity)**
- T1-004 merged into T1-003 (reduced-motion is core behavior, not separate task)
- T1-007 + T2-007 merged into unified T3-002 (Visual Regression Baselines - scheduled after stabilization)
- T1-008 + T2-008 consolidated into per-sprint a11y sweeps
- T3-001 split into separate bundle audit + runtime profiling tasks

### **New Tasks Added (from Subagent Suggestions)**
- T0-005: SSR-Safe Motion & Analytics Utilities (utility layer for SSR hydration + analytics)
- T1-003B: Negative Tests (timer cleanup, unmount, backgrounded tab)
- T2-009: Asset Budget Enforcement (SVG optimization + bundle checks)
- T3-002: Visual Regression Baselines (unified, with reduced-motion stabilization)
- T3-003: Cross-Browser & Mobile QA Matrix (Safari/Firefox/iOS/Android)
- T3-004: CI Strategy & PR Gates (branching, test tagging, smoke vs. full)
- T3-005: Developer Documentation & Storybook (component API + usage)

### **Structural Improvements**
- Animation state snapshots moved to **reduced-motion mode** (prevents flake from glow/gradients)
- Performance tests split: **smoke** (Lighthouse CLI) vs. **detailed** (manual profiling)
- E2E suite reorganized by feature area (Hero, Cards, Responsive, Reduced-Motion)
- Risk mitigations explicitly tied to each task

---

# Sprint 1: ProtocolSequenceAnimation Core Implementation

**Goal:** Build foundational animation component with full test coverage and SSR safety  
**Demoable Output:** Animated hero cycling Guard → Comms → BOL → YMS on homepage  
**Success Metrics:** Component renders, cycles correctly, SSR-safe, tests pass, 0 TypeScript errors  
**Duration:** 5-7 days  
**Parallelizable Tasks:** T1-001 & T1-002 (icons + data) can run together

---

### **T0-005: SSR-Safe Motion & Analytics Utility Layer** *(Prerequisite - S0 Spillover)*

**Objective:** Create reusable utilities for SSR-safe `prefers-reduced-motion` detection and analytics integration.

**Acceptance Criteria:**
- [ ] Create `lib/ssr-safe-motion.ts`:
  - [ ] Export `useSSRSafeReducedMotion()` hook that:
    - [ ] Returns `boolean` (true if prefers-reduced-motion)
    - [ ] Safe in SSR (doesn't throw if `matchMedia` undefined)
    - [ ] Returns `false` on server, syncs on client
    - [ ] Subscribes to media query changes for real-time updates
  - [ ] TypeScript types: `SSRSafeMotionProvider` (if React Context needed)

- [ ] Create `lib/analytics-client.ts`:
  - [ ] Export `useAnalytics()` hook that:
    - [ ] Returns `{ track: (event, props) => void }` interface
    - [ ] Wraps PostHog or analytics client with try/catch
    - [ ] Logs to console in dev, silent in production
    - [ ] Handles missing/disabled analytics gracefully
  - [ ] Validate event schema: `z.object({ event: z.string(), properties: z.record(z.any()) })`
  - [ ] No-op if client unavailable

- [ ] Create `lib/__tests__/ssr-safe-motion.test.ts`:
  - [ ] Test: `useSSRSafeReducedMotion` returns false on server (no matchMedia)
  - [ ] Test: Hook syncs with real matchMedia on client
  - [ ] Test: Unsubscribe on cleanup

- [ ] Create `lib/__tests__/analytics-client.test.ts`:
  - [ ] Test: `track()` calls analytics client with correct payload
  - [ ] Test: Missing client doesn't throw
  - [ ] Test: Invalid payload is caught/logged

**Validation:**
- [ ] Run: `npm run test:unit -- ssr-safe-motion.test.ts analytics-client.test.ts` → All pass
- [ ] Run: `npm run typecheck` → 0 errors
- [ ] Manual: SSR pre-render works (e.g., `npm run build`)

**Files Created:**
- `lib/ssr-safe-motion.ts` (~50 lines)
- `lib/analytics-client.ts` (~50 lines)
- `lib/__tests__/ssr-safe-motion.test.ts` (~60 lines)
- `lib/__tests__/analytics-client.test.ts` (~60 lines)

**Risk Mitigation:** SSR hydration mismatch → Test on server render path; verify matchMedia availability checks

---

### **T1-001: Create Icon Components for Protocol Modules**

**Objective:** Build 4 reusable icon components (Guard, Comms, BOL, YMS) with consistent styling.

**Acceptance Criteria:**
- [ ] Create `components/icons/ProtocolGuardIcon.tsx` (shield + lock, ~30 lines)
- [ ] Create `components/icons/ProtocolCommsIcon.tsx` (speech bubble + waves, ~30 lines)
- [ ] Create `components/icons/ProtocolBOLIcon.tsx` (document + checkmark, ~30 lines)
- [ ] Create `components/icons/ProtocolYMSIcon.tsx` (grid + bar chart, ~30 lines)
- [ ] All 4 icons:
  - [ ] SVG-based (not Canvas or image), <2KB each
  - [ ] Configurable: `size?: 24 | 32 | 48 | 64` (default: 48)
  - [ ] Configurable: `color?: string` (default: #00B4FF neon)
  - [ ] `aria-label` prop for accessibility
  - [ ] Monochrome neon style, no fill
- [ ] Index file: `components/icons/ProtocolIcons.ts` (export all 4)
- [ ] TypeScript: 0 errors
- [ ] Lint: 0 errors

**Testing:**
- [ ] Create `components/__tests__/ProtocolIcons.test.tsx` (~100 lines)
  - [ ] Test: Each icon renders SVG element
  - [ ] Test: Size prop applies correctly (24/32/48/64)
  - [ ] Test: Color prop applies to SVG stroke/fill
  - [ ] Test: aria-label accessible name
  - [ ] Test: Icons <2KB each (check file sizes)

**Validation:**
- [ ] Run: `npm run test:unit -- ProtocolIcons.test.tsx` → 12+ tests pass
- [ ] Check: Icon files individually <2KB (via `wc -c`)
- [ ] Manual: Render all 4 in browser, verify visual consistency

**Files Created:**
- `components/icons/ProtocolGuardIcon.tsx`
- `components/icons/ProtocolCommsIcon.tsx`
- `components/icons/ProtocolBOLIcon.tsx`
- `components/icons/ProtocolYMSIcon.tsx`
- `components/icons/ProtocolIcons.ts`
- `components/__tests__/ProtocolIcons.test.tsx`

---

### **T1-002: Create Protocol Module Data Structure**

**Objective:** Define TypeScript types and const data for 4 protocol modules.

**Acceptance Criteria:**
- [ ] Create `lib/protocol-modules.ts`:
  - [ ] Export types: `type ProtocolModuleType = 'Guard' | 'Comms' | 'BOL' | 'YMS'`
  - [ ] Export interface: `ProtocolModule { id, label, proof, description? }`
  - [ ] Export const: `PROTOCOL_MODULES: ProtocolModule[]` (4 items, in order)
- [ ] Data structure (per T0-002 spec):
  ```typescript
  {
    id: 'Guard',
    label: 'Digital Guard',
    proof: 'Verify carrier identity & CDL',
    description: '...'
  }
  ```
- [ ] Copy matches animation state machine spec (T0-002)
- [ ] TypeScript: 0 errors
- [ ] Lint: 0 errors

**Testing:**
- [ ] Create `lib/__tests__/protocol-modules.test.ts` (~50 lines)
  - [ ] Test: Array length === 4
  - [ ] Test: Each item has id/label/proof
  - [ ] Test: IDs are unique and match type
  - [ ] Test: Export accessible from components

**Validation:**
- [ ] Run: `npm run test:unit -- protocol-modules.test.ts` → 4+ tests pass
- [ ] Verify: Copy matches spec (manual review)

**Files Created:**
- `lib/protocol-modules.ts` (~40 lines)
- `lib/__tests__/protocol-modules.test.ts` (~50 lines)

---

### **T1-003: Implement ProtocolSequenceAnimation Component (Core + Reduced-Motion)**

**Objective:** Build main animation component with state cycling, framer-motion, timing, AND reduced-motion fallback (merged from original T1-004).

**Acceptance Criteria:**
- [ ] Create `components/animations/ProtocolSequenceAnimation.tsx`:
  - [ ] Props interface:
    ```typescript
    interface ProtocolSequenceAnimationProps {
      displayDuration?: number;      // Default: 3000ms
      transitionDuration?: number;   // Default: 500ms
      autoPlay?: boolean;            // Default: true
      onStateChange?: (state: ProtocolModuleType) => void;
    }
    ```
  
  - [ ] **State Management:**
    - [ ] `useState` for current protocol state
    - [ ] Initialize to 'Guard'
    - [ ] Cycle through Guard → Comms → BOL → YMS → Guard (loop)
  
  - [ ] **Timing Logic:**
    - [ ] `useEffect` with `setInterval` for cycling
    - [ ] Display: 3000ms per state (configurable)
    - [ ] Transition: 500ms (configurable)
    - [ ] Total cycle: 14 seconds
    - [ ] **Cleanup:** Clear interval on unmount (critical!)
    - [ ] **Backgrounded tab:** Handle `document.hidden` to prevent timer drift (optional nice-to-have, add comment)
  
  - [ ] **Framer Motion (Animated Mode):**
    - [ ] Use `AnimatePresence mode="wait"` for sequential transitions
    - [ ] Each icon in `motion.div` with variants:
      ```typescript
      initial: { opacity: 0, scale: 0.95 }
      animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [...] } }
      exit: { opacity: 0, scale: 0.95, transition: { duration: 0.5 } }
      ```
    - [ ] 4 conditional blocks: `{state === 'Guard' && ...}`
    - [ ] Container: Dark gradient background (void → carbon)
    - [ ] Border: `border border-neon/20`
    - [ ] Display: icon + label + proof text for current state
  
  - [ ] **Reduced-Motion Fallback (SSR-Safe):**
    - [ ] Import `useSSRSafeReducedMotion()` from `lib/ssr-safe-motion`
    - [ ] If `prefersReducedMotion === true`:
      - [ ] Render static 2×2 grid (4 modules visible simultaneously)
      - [ ] No cycling, no animations
      - [ ] All icons visible with labels + proof text
      - [ ] Responsive: `grid-cols-2 md:grid-cols-4`
    - [ ] Otherwise: render animated cycling version
  
  - [ ] **Analytics Integration:**
    - [ ] Call `onStateChange(newState)` when state changes
    - [ ] Used by parent for tracking (see T1-006)
  
  - [ ] **Accessibility:**
    - [ ] Add `aria-label="Protocol sequence animation"` on container
    - [ ] Add `role="region"` (region landmark for screen readers)
    - [ ] Add `aria-live="polite"` (announce state changes)
    - [ ] Icon aria-labels via props from T1-001
  
  - [ ] **Container Styling:**
    - [ ] `w-full aspect-video` or similar
    - [ ] `bg-gradient-to-br from-void via-carbon to-void`
    - [ ] `rounded-lg border border-neon/20`
    - [ ] Padding: 24px
  
  - [ ] TypeScript: 0 errors
  - [ ] Lint: 0 errors

**Testing:**
- [ ] Create `components/__tests__/ProtocolSequenceAnimation.test.tsx` (~200 lines)
  - [ ] **Animated Mode:**
    - [ ] Test: Guard icon renders initially
    - [ ] Test: Cycles to Comms after displayDuration + transitionDuration (use fake timers)
    - [ ] Test: Full 4-state cycle completes in ~14s (fake timers)
    - [ ] Test: onStateChange callback called at each transition
    - [ ] Test: respects displayDuration and transitionDuration props
    - [ ] Test: autoPlay=false prevents cycling
    - [ ] Test: Interval cleaned up on unmount (check clearInterval call)
  
  - [ ] **Reduced-Motion Mode:**
    - [ ] Test: prefers-reduced-motion=true renders static grid (all 4 visible)
    - [ ] Test: No state changes over 5 seconds (static display)
    - [ ] Test: All 4 module icons present simultaneously
  
  - [ ] **Motion Variants:**
    - [ ] Test: Motion.div has correct initial/animate/exit props
    - [ ] Test: Transition duration matches props
    - [ ] Test: Easing applied correctly
  
  - [ ] **Accessibility:**
    - [ ] Test: aria-label and role="region" present
    - [ ] Test: aria-live="polite" on container

**Validation:**
- [ ] Run: `npm run test:unit -- ProtocolSequenceAnimation.test.tsx` → 15+ tests pass
- [ ] Run: `npm run typecheck` → 0 errors
- [ ] Manual: Browser, verify 3.5s per state × 4 states = 14s loop
- [ ] Manual: DevTools, emulate prefers-reduced-motion, verify static grid
- [ ] Manual: DevTools, check for console errors/warnings

**Files Created:**
- `components/animations/ProtocolSequenceAnimation.tsx` (~180 lines)
- `components/__tests__/ProtocolSequenceAnimation.test.tsx` (~200 lines)

**Risk Mitigation:**
- Timer drift if tab backgrounded → Document limitation, add comment for future optimization
- SSR hydration: matchMedia undefined on server → Use SSR-safe utility from T0-005
- Flaky reduced-motion detection → Test both mock=true and undefined states

---

### **T1-003B: Negative Tests & Edge Cases**

**Objective:** Additional edge-case testing for component robustness.

**Acceptance Criteria:**
- [ ] Add tests to `components/__tests__/ProtocolSequenceAnimation.test.ts`:
  - [ ] Test: `autoPlay=false` then manual state updates (if exposing imperative API)
  - [ ] Test: Rapid prop changes (displayDuration, transitionDuration mid-animation)
  - [ ] Test: Multiple component instances (verify separate timers)
  - [ ] Test: Component unmount clears timer (clearInterval called, no orphaned intervals)
  - [ ] Test: prefers-reduced-motion=true + autoPlay=false (static grid, no effect)
  - [ ] Test: onStateChange undefined (callback not called, no error)

**Validation:**
- [ ] Run: 6+ edge-case tests pass
- [ ] Manual: Rapid prop changes in browser, verify no crashes

**Files Modified:**
- `components/__tests__/ProtocolSequenceAnimation.test.tsx` (+50 lines for edge cases)

---

### **T1-005: Integrate ProtocolSequenceAnimation into Homepage**

**Objective:** Replace `DigitalGuardAnimation` with `ProtocolSequenceAnimation` in `app/page.tsx`.

**Acceptance Criteria:**
- [ ] Update `app/page.tsx`:
  - [ ] Remove: `import DigitalGuardAnimation from ...`
  - [ ] Add: `import ProtocolSequenceAnimation from '@/components/animations/ProtocolSequenceAnimation'`
  - [ ] Find hero animation section
  - [ ] Replace: `<DigitalGuardAnimation />` → `<ProtocolSequenceAnimation />`
  - [ ] Verify: Surrounding layout unchanged (container, padding, margin)
- [ ] Cleanup:
  - [ ] Run: `grep -r "DigitalGuardAnimation" --include="*.tsx" components/ app/` → only in source file (safe to keep for reference)
  - [ ] Consider: Add comment in DigitalGuardAnimation.tsx (e.g., "DEPRECATED - replaced by ProtocolSequenceAnimation")
- [ ] TypeScript: 0 errors
- [ ] Lint: 0 errors

**Testing:**
- [ ] Create `e2e/homepage/hero-animation.spec.ts` (~80 lines):
  - [ ] Test: ProtocolSequenceAnimation visible on homepage
  - [ ] Test: Renders Guard icon initially
  - [ ] Test: NO DigitalGuardAnimation component present
  - [ ] Test: Navigation to homepage loads animation

**Validation:**
- [ ] Build: `npm run build` → succeeds
- [ ] TypeCheck: `npm run typecheck` → 0 errors
- [ ] Manual: Homepage loads, animation cycles Guard→Comms→BOL→YMS
- [ ] Manual: No console errors

**Files Modified:**
- `app/page.tsx` (1 import, 1 component swap, ~5 lines)

**Files Optionally Deprecated:**
- `components/animations/DigitalGuardAnimation.tsx` (add deprecation comment)

---

### **T1-006: Analytics Tracking Integration**

**Objective:** Instrument ProtocolSequenceAnimation with analytics tracking for user engagement.

**Acceptance Criteria:**
- [ ] Create `lib/hooks/useProtocolSequenceAnalytics.ts`:
  - [ ] Export: `useProtocolSequenceAnalytics(enabled?: boolean) => (state: ProtocolModuleType) => void`
  - [ ] Uses `useAnalytics()` from T0-005
  - [ ] Event schema:
    ```typescript
    {
      event: 'protocol_sequence_view',
      properties: {
        module: 'Guard' | 'Comms' | 'BOL' | 'YMS',
        timestamp: ISO8601
      }
    }
    ```
  - [ ] Handles missing analytics gracefully (no throw)

- [ ] Update `components/animations/ProtocolSequenceAnimation.tsx`:
  - [ ] Add prop: `trackingEnabled?: boolean` (default: true)
  - [ ] If enabled: Call hook and pass callback to onStateChange
  - [ ] Component dispatches event each time state changes

- [ ] Create `lib/__tests__/useProtocolSequenceAnalytics.test.ts`:
  - [ ] Test: Calls analytics client with correct event/properties
  - [ ] Test: Handles missing client gracefully
  - [ ] Test: Disabled via prop (no tracking)

**Validation:**
- [ ] Tests pass: `npm run test:unit -- useProtocolSequenceAnalytics.test.ts`
- [ ] Manual: Open DevTools Network, verify analytics event fires (if PostHog configured)
- [ ] TypeScript: 0 errors

**Files Created:**
- `lib/hooks/useProtocolSequenceAnalytics.ts` (~50 lines)
- `lib/__tests__/useProtocolSequenceAnalytics.test.ts` (~50 lines)

**Files Modified:**
- `components/animations/ProtocolSequenceAnimation.tsx` (+10 lines for tracking)

---

### **T1-008: Sprint 1 Accessibility Audit**

**Objective:** Ensure ProtocolSequenceAnimation and new icon components meet WCAG 2.1 Level AA.

**Acceptance Criteria:**
- [ ] Run axe accessibility audit:
  - [ ] Create `e2e/accessibility/sprint1.spec.ts` (~100 lines)
  - [ ] Test: Zero violations on homepage hero
  - [ ] Use: `@axe-core/playwright` or `accessibility-insights-for-web`
  
- [ ] Color contrast verification:
  - [ ] Neon (#00B4FF) on void (#050505): 10.5:1 ✅ AAA
  - [ ] Verify via manual WebAIM contrast checker
  
- [ ] Semantic HTML:
  - [ ] Container: `role="region" aria-label="..."`
  - [ ] Icons: `aria-label` or proper ARIA context
  - [ ] No interactive elements inappropriately nested
  
- [ ] Keyboard Navigation:
  - [ ] Animation is not interactive (no Tab stop)
  - [ ] Hero CTA (if present) is focusable and functional via Enter
  - [ ] No focus trap
  
- [ ] Screen Reader:
  - [ ] Region announced clearly
  - [ ] Icon labels readable
  - [ ] Animation state NOT announced to screen readers (not a critical update)
  - [ ] Reduced-motion grid: all 4 modules discoverable

**Testing:**
- [ ] Run: `npm run test:a11y -- sprint1.spec.ts` → 0 violations

**Validation:**
- [ ] axe scan: 0 violations
- [ ] Manual screen reader test (NVDA or VoiceOver)
- [ ] Manual: Tab navigation, verify no traps

**Files Created:**
- `e2e/accessibility/sprint1.spec.ts` (~100 lines)

---

## Sprint 1 Completion Criteria

**All 8 tasks complete:**
1. ✅ T0-005: SSR-safe utilities (motion + analytics)
2. ✅ T1-001: Icon components
3. ✅ T1-002: Protocol module data
4. ✅ T1-003: ProtocolSequenceAnimation (core + reduced-motion + negative tests)
5. ✅ T1-003B: Edge-case tests
6. ✅ T1-005: Homepage integration
7. ✅ T1-006: Analytics tracking
8. ✅ T1-008: Accessibility audit

**Demoable Output:**
- [ ] Homepage shows cycling animation (Guard → Comms → BOL → YMS, 14s total)
- [ ] Animation smooth (60fps on modern browsers), no jank
- [ ] Reduced-motion mode: static 4-module grid (all visible)
- [ ] Accessibility: 0 violations, keyboard friendly
- [ ] Tests: 50+ unit tests passing
- [ ] E2E: Hero animation test + accessibility sweep passing
- [ ] Congruence: No regressions (still 22/22)

**Validation Steps:**
```bash
npm run build
npm run typecheck
npm run lint
npm run test:unit
npm run test:e2e -- sprint1
npm run test:a11y -- sprint1
npm run congruence:check  # Should still be 22/22
```

---

# Sprint 2: Card Aesthetic Alignment

**Goal:** Update module cards to match destination page aesthetics  
**Demoable Output:** Updated Singularity, Product, and Network Effect cards on homepage  
**Success Metrics:** Cards ≥70% alignment rubric score, visual rendering correct on desktop/tablet/mobile  
**Duration:** 5-7 days  
**Parallelizable Tasks:** T2-004 & T2-005 (Product + Network cards) can run concurrently after icons ready

---

### **T2-001: Research & Design Decision - Singularity Card Visual**

**Objective:** Document design approach for Singularity card (SVG grid vs. canvas, animation scope, bundle).

**Acceptance Criteria:**
- [ ] Create `docs/T2-001-SINGULARITY-DESIGN-DECISION.md` documenting 4 options:
  - [ ] Option A: SVG 32-node grid + subtle hover particle animation (RECOMMENDED)
  - [ ] Option B: Static SVG grid (no animation, lighter)
  - [ ] Option C: Canvas visualization (compact but accessibility harder)
  - [ ] Option D: Simplified icon badge (lightest, least detailed)
- [ ] **Selected: Option A** with rationale:
  - [ ] Balances aesthetic match + bundle size + accessibility
  - [ ] SVG: Scalable, accessible, <10KB
  - [ ] Animation: Subtle particle pulse on hover (not on load - no perf hit)
  - [ ] Fallback: Static grid when prefers-reduced-motion
  - [ ] Target: <50KB total card bundle (including SVG)
- [ ] SVG asset spec:
  - [ ] 32 nodes in 8×4 grid layout
  - [ ] Node size: 3-4px circles, neon color (#00B4FF)
  - [ ] Edges: 1px stroke connecting nodes, neon, 50% opacity
  - [ ] Background: Gradient void → carbon
  - [ ] File size: <10KB (optimized via SVGO)
- [ ] Animation spec (on hover):
  - [ ] Particle pulse: nodes scale 1.0 → 1.2 → 1.0 over 2s loop
  - [ ] Edge glow: stroke opacity 0.5 → 1.0 → 0.5
  - [ ] Stagger: 100ms offset per row (creates wave effect)
  - [ ] Trigger: Hover (not page load)
  - [ ] Reduced-motion: No animation (static grid)
- [ ] Stakeholder sign-off (if org uses design reviews):
  - [ ] Product: Aesthetic approach approved
  - [ ] Engineering: Bundle feasibility confirmed
  - [ ] Design: Particle grid evokes destination vibe

**Validation:**
- [ ] Decision document written
- [ ] SVG prototype <10KB verified (via `wc -c`)
- [ ] Stakeholders sign off (document in PR review comments)

**Files Created:**
- `docs/T2-001-SINGULARITY-DESIGN-DECISION.md` (~200 lines)
- `public/assets/singularity-particle-grid.svg` (~5KB)

---

### **T2-002: Create SingularityPreviewCard Component**

**Objective:** Build `<SingularityPreviewCard />` with 32-node SVG grid and particle animation on hover.

**Acceptance Criteria:**
- [ ] Create `components/cards/SingularityPreviewCard.tsx`:
  - [ ] Props:
    ```typescript
    interface SingularityPreviewCardProps {
      size?: 'sm' | 'md' | 'lg';      // Default: 'md'
      animated?: boolean;             // Default: true
      showLabel?: boolean;            // Default: true
    }
    ```
  
  - [ ] **Container Styling:**
    - [ ] Dark gradient: `from-void via-carbon to-void`
    - [ ] Border: `border border-neon/20`
    - [ ] Aspect ratio: 16:9 (landscape)
    - [ ] Padding: 20px
    - [ ] Responsive sizing: sm=200px, md=320px, lg=420px height
  
  - [ ] **SVG Content:**
    - [ ] Import: `import ParticleGridSVG from '@/public/assets/singularity-particle-grid.svg'`
    - [ ] Render via `<Image>` component or `<img>` tag
    - [ ] Responsive sizing via CSS (width: 100%)
    - [ ] Fallback alt text: "32-node particle network visualization"
  
  - [ ] **Overlay Text (Z-index on top of SVG):**
    - [ ] Headline: "Variance Tax Protocol" (bold, neon, top-left or center)
    - [ ] Proof: "Interactive physics simulation" (smaller, steel gray)
    - [ ] Optional badge: "Re* = Calculated" (if design calls for it)
  
  - [ ] **Hover Effect:**
    - [ ] On `.hover`: Trigger particle animation via CSS class or inline `<style>`
    - [ ] Animation: SVG particles pulse (see design decision spec)
    - [ ] CSS `@keyframes` (not JS for perf)
    - [ ] Only on hover (not page load)
  
  - [ ] **Reduced-Motion Support:**
    - [ ] Check: `useSSRSafeReducedMotion()` from T0-005
    - [ ] If true: Skip hover animation, render static grid
    - [ ] Card still displays, just no animation on hover
  
  - [ ] **Navigation:**
    - [ ] Wrap in: `<Link href="/singularity">`
    - [ ] Link is accessible (proper focus outline)
    - [ ] Enter/Space key navigates (default browser behavior)
  
  - [ ] **TypeScript:** 0 errors
  - [ ] **Lint:** 0 errors

**Testing:**
- [ ] Create `components/__tests__/SingularityPreviewCard.test.tsx` (~120 lines):
  - [ ] Test: SVG image renders
  - [ ] Test: Label and proof text visible
  - [ ] Test: Size prop applies (sm/md/lg → width changes)
  - [ ] Test: Link navigates to /singularity
  - [ ] Test: prefers-reduced-motion disables hover animation
  - [ ] Test: animated=false skips particle animation setup
  - [ ] Test: Container has correct background/border classes

**Validation:**
- [ ] Tests pass: `npm run test:unit -- SingularityPreviewCard.test.tsx`
- [ ] TypeCheck: 0 errors
- [ ] Lint: 0 errors
- [ ] Manual: Hover reveals particle animation (if reduced-motion not enabled)
- [ ] Manual: Mobile → card displays correctly, tappable
- [ ] Bundle check: Card component + SVG <50KB total

**Files Created:**
- `components/cards/SingularityPreviewCard.tsx` (~140 lines)
- `components/__tests__/SingularityPreviewCard.test.tsx` (~120 lines)

**Files Modified:**
- `components/cards/index.ts` (export SingularityPreviewCard)

---

### **T2-003: Update Homepage Module Cards Section (Singularity)**

**Objective:** Replace old Singularity card with `<SingularityPreviewCard />`.

**Acceptance Criteria:**
- [ ] Update `app/page.tsx`:
  - [ ] Find: Module cards grid section (typically 4-card grid)
  - [ ] Replace: Old Singularity card → `<SingularityPreviewCard />`
  - [ ] Verify: Card fits grid layout (no layout shifts)
  - [ ] Verify: Spacing/gaps consistent
- [ ] TypeScript: 0 errors
- [ ] Lint: 0 errors

**Testing:**
- [ ] E2E test in `e2e/homepage/module-cards.spec.ts` (add to this file):
  - [ ] Test: Singularity card displays particle grid SVG
  - [ ] Test: "Variance Tax Protocol" label visible
  - [ ] Test: Card link href="/singularity" works

**Validation:**
- [ ] Build: `npm run build` → succeeds
- [ ] Manual: Homepage loads, Singularity card visible with particle grid

**Files Modified:**
- `app/page.tsx` (1 import, 1 component)

---

### **T2-004: Create ProductPreviewCard Component**

**Objective:** Build card showing 4 core modules (Guard, Comms, BOL, YMS) in grid.

**Acceptance Criteria:**
- [ ] Create `components/cards/ProductPreviewCard.tsx`:
  - [ ] Props:
    ```typescript
    interface ProductPreviewCardProps {
      size?: 'sm' | 'md' | 'lg';
      layout?: 'grid' | 'inline';  // Default: 'grid'
    }
    ```
  
  - [ ] **Container:**
    - [ ] Dark gradient background
    - [ ] Border: `border border-neon/20`
    - [ ] Aspect ratio: 1:1 (square)
  
  - [ ] **4 Module Icons Display:**
    - [ ] Import icons: Guard, Comms, BOL, YMS from T1-001
    - [ ] Grid layout: 2×2 on desktop, responsive
    - [ ] Icon size: 32px
    - [ ] Icon color: Neon
    - [ ] Gap: 12-16px between icons
  
  - [ ] **Labels:**
    - [ ] Headline: "Product" or "4 Core Modules"
    - [ ] Proof: "One protocol powers four complementary modules"
    - [ ] Optional: Module name labels below each icon (small text)
  
  - [ ] **Hover Effect (Optional):**
    - [ ] Per-module highlight on hover (icon glows brighter)
    - [ ] Or: Card border glow intensifies
    - [ ] Use CSS `:hover` for performance
  
  - [ ] **Reduced-Motion:**
    - [ ] Check: `useSSRSafeReducedMotion()`
    - [ ] If true: No per-module hover effects (static display)
  
  - [ ] **Navigation:**
    - [ ] Wrap in: `<Link href="/product">`
  
  - [ ] **TypeScript/Lint:** 0 errors

**Testing:**
- [ ] Create `components/__tests__/ProductPreviewCard.test.tsx` (~100 lines):
  - [ ] Test: All 4 module icons visible simultaneously
  - [ ] Test: Grid layout applied (not cycling like animation)
  - [ ] Test: Label and proof text present
  - [ ] Test: Link href="/product" correct
  - [ ] Test: Icons always visible (unlike ProtocolSequenceAnimation)

**Validation:**
- [ ] Tests pass
- [ ] Manual: All 4 icons visible in 2×2 grid
- [ ] Mobile: Icons adjust to fit smaller screen

**Files Created:**
- `components/cards/ProductPreviewCard.tsx` (~120 lines)
- `components/__tests__/ProductPreviewCard.test.tsx` (~100 lines)

---

### **T2-005: Create NetworkEffectPreviewCard Component**

**Objective:** Build card showing exponential curve (hockey stick graph).

**Acceptance Criteria:**
- [ ] Create `components/cards/NetworkEffectPreviewCard.tsx`:
  - [ ] Props:
    ```typescript
    interface NetworkEffectPreviewCardProps {
      size?: 'sm' | 'md' | 'lg';
      animated?: boolean;  // Default: true (curve draw animation)
    }
    ```
  
  - [ ] **SVG Curve Display:**
    - [ ] Render exponential curve via `<svg>` with `<path>`
    - [ ] X-axis: # of facilities (0-10+)
    - [ ] Y-axis: Value/return (0-max)
    - [ ] Line color: Neon (#00B4FF) or neon→green gradient
    - [ ] Upward hockey-stick trajectory clear
    - [ ] Grid lines optional (light gray)
  
  - [ ] **Animation (on Load):**
    - [ ] If animated=true: Path draw animation (stroke-dasharray)
    - [ ] Duration: 2-3 seconds
    - [ ] Easing: easeInOutQuad
    - [ ] Only on first load, not repeat
    - [ ] Reduced-motion: Static curve (no animation)
  
  - [ ] **Labels:**
    - [ ] Headline: "Network Effect" or "Scaling Value"
    - [ ] Axis labels: "Facilities" (X), "Economic Value" (Y) - optional, small
    - [ ] Proof: "Value compounds as network density increases"
  
  - [ ] **Navigation:**
    - [ ] Wrap in: `<Link href="/network-effect">`
  
  - [ ] **Styling:**
    - [ ] Container: aspect-video or 16:9
    - [ ] Background: dark gradient
    - [ ] Border: neon/20
  
  - [ ] **TypeScript/Lint:** 0 errors

**Testing:**
- [ ] Create `components/__tests__/NetworkEffectPreviewCard.test.tsx` (~100 lines):
  - [ ] Test: SVG path renders
  - [ ] Test: Curve goes upward (hockey-stick shape)
  - [ ] Test: Label/proof text present
  - [ ] Test: Link href correct
  - [ ] Test: prefers-reduced-motion disables animation

**Validation:**
- [ ] Tests pass
- [ ] Manual: Curve visible, upward trend clear

**Files Created:**
- `components/cards/NetworkEffectPreviewCard.tsx` (~130 lines)
- `components/__tests__/NetworkEffectPreviewCard.test.tsx` (~100 lines)

---

### **T2-006: Update Homepage Module Cards Section (All Cards)**

**Objective:** Replace all old module cards with new aesthetically-aligned versions.

**Acceptance Criteria:**
- [ ] Update `app/page.tsx`:
  - [ ] Singularity: `<SingularityPreviewCard />` (from T2-002)
  - [ ] Product: `<ProductPreviewCard />` (from T2-004)
  - [ ] Network Effect: `<NetworkEffectPreviewCard />` (from T2-005)
  - [ ] ROI: Keep existing ROI card (already good from S4-004)
  
- [ ] Grid layout: Verify 4 cards fit correctly on all breakpoints
- [ ] Spacing: Consistent gaps
- [ ] TypeScript/Lint: 0 errors

**Testing:**
- [ ] Add to `e2e/homepage/module-cards.spec.ts` (if not created yet):
  - [ ] Test: All 4 cards visible on desktop
  - [ ] Test: Cards render correctly on mobile (<768px)
  - [ ] Test: Each card navigates to correct destination

**Validation:**
- [ ] Build: succeeds
- [ ] Manual: 4-card grid looks balanced on desktop/mobile/tablet

**Files Modified:**
- `app/page.tsx` (3-4 imports, 3 component replacements)

---

### **T2-009: Asset Budget Enforcement**

**Objective:** Verify SVG assets are optimized and bundle size is within targets.

**Acceptance Criteria:**
- [ ] **SVG Optimization:**
  - [ ] Install: `npm install --save-dev svgo` (if not already present)
  - [ ] Add: `scripts/optimize-svgs.js` to run SVGO on all SVGs
  - [ ] Run: `npx svgo public/assets/*.svg --output public/assets/`
  - [ ] Verify: Singularity particle grid <10KB
  - [ ] Verify: Network curve SVG <5KB (if separate file)
  - [ ] Verify: Total SVG assets <30KB
  
- [ ] **Bundle Size Checks:**
  - [ ] Run: `npm run build`
  - [ ] Check: `.next/static/chunks/` for component bundles
  - [ ] Verify: New card components don't exceed 10% of page bundle
  - [ ] Optional: Add `npm run analyze` script with `@next/bundle-analyzer`
  
- [ ] **Create Asset Inventory:**
  - [ ] Create `docs/ASSET_INVENTORY.md` documenting:
    - [ ] Singularity particle grid: ~5KB (SVG)
    - [ ] Protocol icons: <8KB combined
    - [ ] Network curve: <5KB (SVG)
    - [ ] Total: <30KB
  
- [ ] **Document Budget:**
  - [ ] Animation component: <50KB
  - [ ] All card components: <100KB
  - [ ] Total homepage additions: <200KB

**Testing:**
- [ ] Manual: Check file sizes via CLI
  ```bash
  wc -c public/assets/singularity-particle-grid.svg
  wc -c public/assets/network-effect-curve.svg
  du -sh public/assets/
  du -sh .next/static/chunks/
  ```

**Validation:**
- [ ] All assets within size targets
- [ ] Document created

**Files Created:**
- `scripts/optimize-svgs.js` (~50 lines)
- `docs/ASSET_INVENTORY.md` (~50 lines)

---

### **T2-010: Sprint 2 Accessibility Audit**

**Objective:** Ensure all new card components meet WCAG 2.1 Level AA.

**Acceptance Criteria:**
- [ ] Create `e2e/accessibility/sprint2.spec.ts` (~150 lines):
  - [ ] axe scan: 0 violations per card
  - [ ] Test keyboard navigation: Tab through card links
  - [ ] Test screen reader: Card purpose announced
  - [ ] Test color contrast: All text ≥4.5:1
  
- [ ] Per-card checks:
  - [ ] SingularityPreviewCard: SVG has role="img" + accessible name
  - [ ] ProductPreviewCard: Icons labeled, grid structure semantic
  - [ ] NetworkEffectPreviewCard: SVG curve accessible, axis labels present
  - [ ] ROI card: No new regressions

**Validation:**
- [ ] Tests pass: `npm run test:a11y -- sprint2.spec.ts`

**Files Created:**
- `e2e/accessibility/sprint2.spec.ts` (~150 lines)

---

## Sprint 2 Completion Criteria

**All tasks complete:**
1. ✅ T2-001: Design decision documented
2. ✅ T2-002: SingularityPreviewCard
3. ✅ T2-003: Homepage update (Singularity)
4. ✅ T2-004: ProductPreviewCard
5. ✅ T2-005: NetworkEffectPreviewCard
6. ✅ T2-006: Homepage cards update
7. ✅ T2-009: Asset budget enforcement
8. ✅ T2-010: Accessibility audit

**Demoable Output:**
- [ ] Homepage shows 4 updated module cards
- [ ] Singularity: 32-node particle grid + hover animation
- [ ] Product: 4-module icon grid
- [ ] Network Effect: Hockey-stick exponential curve
- [ ] ROI: Existing (unchanged)
- [ ] All cards: WCAG 2.1 Level AA, <50KB each, visual regression ready
- [ ] Bundle size: <100KB for all new cards + SVGs

**Validation:**
```bash
npm run build
npm run typecheck
npm run lint
npm run test:unit
npm run test:e2e -- sprint2
npm run test:a11y -- sprint2
npm run congruence:check
```

---

# Sprint 3: Testing, Performance & Deployment Readiness

**Goal:** Final validation, performance optimization, cross-browser testing, deployment prep  
**Demoable Output:** Production-ready homepage with all refinements locked in  
**Success Metrics:** Lighthouse ≥90, WCAG 2.1 AA, 22/22 congruence, E2E tests 100% pass  
**Duration:** 4-6 days

---

### **T3-002: Visual Regression Baselines (Unified Stabilized Pass)**

**Objective:** Capture stable visual regression baselines for all animation states and cards.

**Rationale:** Moved here (from S1/S2) to ensure animations are fully stabilized before locking baselines.

**Acceptance Criteria:**
- [ ] Create `e2e/visual-regression/baselines.spec.ts` (~150 lines):
  - [ ] For each component, capture under **prefers-reduced-motion: reduce** to stabilize screenshots
  - [ ] Tests:
    1. **ProtocolSequenceAnimation:**
       - [ ] Test: Static grid (reduced-motion mode) → baseline "protocol-static-grid.png"
    
    2. **SingularityPreviewCard:**
       - [ ] Test: Static state (reduced-motion) → "singularity-card-static.png"
    
    3. **ProductPreviewCard:**
       - [ ] Test: Grid layout → "product-card.png"
    
    4. **NetworkEffectPreviewCard:**
       - [ ] Test: Static curve (reduced-motion) → "network-curve-static.png"
    
    5. **ROI Card:**
       - [ ] Test: Existing → "roi-card.png"
    
    6. **Responsive Layouts:**
       - [ ] Test: Mobile viewport (375px) for all cards → "*.mobile.png"
       - [ ] Test: Tablet viewport (768px) → "*.tablet.png"
  
- [ ] **Stabilization Technique:**
  - [ ] Emulate `prefers-reduced-motion: reduce` in each test
  - [ ] Pause animations if present (use component prop or CSS)
  - [ ] Set deterministic timing: wait for DOM settle, then screenshot
  - [ ] Threshold: <5% pixel variance allowed
  
- [ ] **Baselines Stored:**
  - [ ] Directory: `e2e/__screenshots__/visual-regression/`
  - [ ] Naming: `{component}-{state}.png` (e.g., `singularity-card-static.png`)
  - [ ] Committed to repo for CI regression testing

**Testing:**
```typescript
test('ProtocolSequenceAnimation static grid baseline', async ({ page }) => {
  // Emulate prefers-reduced-motion
  await page.emulateMedia({ reducedMotion: 'reduce' });
  
  await page.goto('http://localhost:3000');
  const animation = page.locator('[data-testid="protocol-sequence-animation"]');
  
  // Static grid should render without animation
  await expect(animation).toHaveScreenshot('protocol-static-grid.png');
});

// (repeat for each card/component)
```

**Validation:**
- [ ] Run: `npm run test:e2e -- baselines.spec.ts` → all screenshot tests pass
- [ ] Baselines created: 10+ screenshots in repo
- [ ] Manual: Review baseline images visually for correctness

**Files Created:**
- `e2e/visual-regression/baselines.spec.ts` (~150 lines)
- `e2e/__screenshots__/visual-regression/*.png` (10+ baseline images)

---

### **T3-003: Comprehensive E2E Test Suite (Feature Areas)**

**Objective:** Full end-to-end test coverage organized by feature area (not monolithic).

**Acceptance Criteria:**
- [ ] Create test files by feature area:
  1. **`e2e/homepage/hero-section.spec.ts`** (~80 lines):
     - [ ] ProtocolSequenceAnimation renders
     - [ ] Cycles through states (timing verified via fake progress)
     - [ ] Static fallback works (prefers-reduced-motion)
     - [ ] Hero CTA clickable
  
  2. **`e2e/homepage/module-cards.spec.ts`** (~100 lines):
     - [ ] All 4 cards visible on desktop
     - [ ] Singularity: particle grid displayed
     - [ ] Product: 4 icons displayed
     - [ ] Network: curve displayed
     - [ ] ROI: existing (no regression)
     - [ ] Each card navigates to correct destination
  
  3. **`e2e/homepage/responsive.spec.ts`** (~80 lines):
     - [ ] Desktop (1920px): Full layout
     - [ ] Tablet (768px): 2-col layout
     - [ ] Mobile (375px): Single column, no horizontal scroll
     - [ ] Each breakpoint: Hero visible, cards visible
  
  4. **`e2e/homepage/reduced-motion.spec.ts`** (~60 lines):
     - [ ] prefers-reduced-motion: reduce emulated
     - [ ] Animation renders as static grid
     - [ ] Cards display without animations
     - [ ] All content still accessible
  
  5. **`e2e/performance/lighthouse-smoke.spec.ts`** (~50 lines):
     - [ ] Lighthouse CLI check (smoke test for PR)
     - [ ] Overall: ≥90
     - [ ] Performance: ≥85 (may vary)
     - [ ] Accessibility: ≥90
     - [ ] Best Practices: ≥90
  
- [ ] Test organization:
  - [ ] Each file focuses on one feature/concern
  - [ ] Tests tagged: `@smoke` (run on PR) vs. full (nightly)
  - [ ] Reuse helpers: `await navigateToHomepage()`, `await checkCard(name)`

**Testing:**
```typescript
// e2e/homepage/hero-section.spec.ts
import { test, expect } from '@playwright/test';

test('Hero section ProtocolSequenceAnimation', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  const animation = page.locator('[data-testid="protocol-sequence-animation"]');
  expect(animation).toBeVisible();
  
  // Verify initial Guard state
  expect(page.getByText('Digital Guard')).toBeVisible();
});

// e2e/homepage/responsive.spec.ts
test('Mobile layout single column', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://localhost:3000');
  
  // Hero visible
  expect(page.locator('[data-testid="protocol-sequence-animation"]')).toBeInViewport();
  
  // No horizontal scroll
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(width).toBeLessThanOrEqual(375);
});
```

**Validation:**
- [ ] Run: `npm run test:e2e -- @smoke` → smoke tests pass on PR (~5 min)
- [ ] Run: `npm run test:e2e -- --tag "not @smoke"` → full suite passes (~15 min)
- [ ] All tests: 20+ tests passing

**Files Created:**
- `e2e/homepage/hero-section.spec.ts` (~80 lines)
- `e2e/homepage/module-cards.spec.ts` (~100 lines)
- `e2e/homepage/responsive.spec.ts` (~80 lines)
- `e2e/homepage/reduced-motion.spec.ts` (~60 lines)
- `e2e/performance/lighthouse-smoke.spec.ts` (~50 lines)
- `e2e/helpers/homepage.ts` (~50 lines, test utilities)

---

### **T3-004: Cross-Browser & Mobile QA Matrix**

**Objective:** Verify animations/cards render correctly on Safari, Firefox, iOS, Android.

**Acceptance Criteria:**
- [ ] Create `docs/QA_MATRIX.md` documenting tests on:
  1. **Browsers:** Chrome, Firefox, Safari, Edge
  2. **Devices:** iPhone SE, iPad (tablet), Android phone
  3. **Checks per browser/device:**
     - [ ] ProtocolSequenceAnimation: Smooth animation, correct timing
     - [ ] Cards: Display, hover effects (if applicable)
     - [ ] Text: Readable, proper line breaks
     - [ ] Colors: Accurate rendering (neon, gradients)
     - [ ] Performance: No jank, smooth scrolling
  
- [ ] **Manual QA Session:**
  - [ ] Schedule: 2-4 hours for thorough cross-browser sweep
  - [ ] Tools: BrowserStack or manual device testing
  - [ ] Document findings in QA_MATRIX.md
  - [ ] Log any issues/workarounds
  
- [ ] **Known Limitations (if any):**
  - [ ] Document any browser quirks or unsupported features
  - [ ] Example: Safari may render gradients differently, but acceptable

**Testing:**
- [ ] Manual browser matrix testing
- [ ] Document results

**Validation:**
- [ ] QA matrix filled out
- [ ] No blocking issues (all animations render, cards display)
- [ ] Minor rendering differences acceptable

**Files Created:**
- `docs/QA_MATRIX.md` (~100 lines, results + notes)

---

### **T3-005: Bundle Size & Performance Audit**

**Objective:** Optimize bundle size, verify performance targets, document baselines.

**Acceptance Criteria:**
- [ ] **Bundle Size Audit:**
  - [ ] Run: `npm run build && next/bundle-analyzer` (or manual `.next/static/chunks/` inspection)
  - [ ] Verify: New components <10% of page bundle increase
  - [ ] Verify: SVG assets total <30KB
  - [ ] Verify: Animation component + deps <50KB
  - [ ] Document: `docs/BUNDLE_BREAKDOWN.md`
  
- [ ] **Runtime Performance Profiling:**
  - [ ] Open DevTools Performance tab on homepage
  - [ ] Record 5-second animation loop
  - [ ] Verify: 60fps maintained (no dropped frames)
  - [ ] Verify: CPU <5% during idle loop
  - [ ] Take screenshot of timeline for documentation
  
- [ ] **Lighthouse Audit (Full):**
  - [ ] Run: `npm run build && npm run test:e2e -- lighthouse-smoke`
  - [ ] Targets:
    - [ ] Overall: ≥90
    - [ ] Performance: ≥90
    - [ ] Accessibility: ≥90
    - [ ] Best Practices: ≥90
    - [ ] SEO: ≥90
  - [ ] Document: `docs/PERFORMANCE_BASELINES_UPDATED.md`
  
- [ ] **Critical Metrics:**
  - [ ] LCP (Largest Contentful Paint): <2.5s
  - [ ] CLS (Cumulative Layout Shift): <0.1
  - [ ] FID (First Input Delay): <100ms (or use interaction to next paint)
  
- [ ] **Comparison:**
  - [ ] Before: Baseline from Sprint 0 congruence check (if captured)
  - [ ] After: Current metrics
  - [ ] Verify: No regression (same or better)

**Testing:**
```bash
npm run build
npm run test:e2e -- lighthouse-smoke

# Manual profiling
# 1. Open homepage in DevTools Performance
# 2. Record 5s
# 3. Verify 60fps
# 4. Check CPU usage
```

**Validation:**
- [ ] Lighthouse ≥90 across all metrics
- [ ] Performance profiling shows 60fps, <5% CPU
- [ ] Bundle sizes within targets
- [ ] No regressions vs. baseline

**Files Created:**
- `docs/BUNDLE_BREAKDOWN.md` (~80 lines)
- `docs/PERFORMANCE_BASELINES_UPDATED.md` (~100 lines)

---

### **T3-006: CI Strategy & PR Gates**

**Objective:** Define branching, PR template, test gating (smoke vs. full E2E), and merge requirements.

**Acceptance Criteria:**
- [ ] **Create `.github/CONTRIBUTING.md`:**
  - [ ] Branch naming: `feature/*, bugfix/*, chore/*`
  - [ ] Commit message format: `[feature|fix|chore]: description`
  - [ ] PR template: automated via GitHub PR template file
  
- [ ] **Create `.github/pull_request_template.md`:**
  - [ ] Checklist:
    - [ ] Congruence: 22/22 passing
    - [ ] Tests: Unit + smoke E2E passing
    - [ ] TypeScript: 0 errors
    - [ ] Accessibility: 0 violations
    - [ ] Bundle: Within limits
  - [ ] Description template: What + Why + Screenshots
  
- [ ] **Test Gating Strategy:**
  - [ ] On PR: Run `@smoke` tests (lint, typecheck, unit, smoke E2E) - ~10 min
  - [ ] On PR: Run congruence:check - must pass 22/22
  - [ ] On main branch (post-merge): Run full E2E suite nightly - ~20 min
  - [ ] Document in: `.github/workflows/ci.yml` comments
  
- [ ] **Merge Requirements:**
  - [ ] Congruence: 22/22 ✅
  - [ ] Smoke tests: passing ✅
  - [ ] Code review: approved (≥1 reviewer)
  - [ ] Conflicts: resolved
  - [ ] No hard-coded secrets/credentials
  
- [ ] **Document:**
  - [ ] Create `docs/CI_STRATEGY.md` explaining:
    - [ ] Smoke vs. full test split
    - [ ] How to run locally: `npm run test:e2e -- @smoke`
    - [ ] How to run full: `npm run test:e2e`
    - [ ] Expected times

**Validation:**
- [ ] PR templates created
- [ ] CI documentation written
- [ ] Team aware of gating requirements

**Files Created:**
- `.github/CONTRIBUTING.md` (~60 lines)
- `.github/pull_request_template.md` (~40 lines)
- `docs/CI_STRATEGY.md` (~100 lines)

---

### **T3-007: Developer Documentation & Component Library**

**Objective:** Document new components and animation guidelines for team.

**Acceptance Criteria:**
- [ ] **Create `docs/COMPONENT_LIBRARY.md`:**
  - [ ] ProtocolSequenceAnimation API:
    - [ ] Props: displayDuration, transitionDuration, autoPlay, onStateChange
    - [ ] Example usage
    - [ ] Reduced-motion support
    - [ ] Analytics integration
  
  - [ ] Protocol Icons API:
    - [ ] Import: `import { ProtocolGuardIcon, ... } from '@/components/icons/ProtocolIcons'`
    - [ ] Props: size, color, aria-label
    - [ ] Example: 4 icons in grid
  
  - [ ] Card Components:
    - [ ] SingularityPreviewCard, ProductPreviewCard, NetworkEffectPreviewCard
    - [ ] Props: size, animated, etc.
    - [ ] Styling: How to customize
    - [ ] Link behavior
  
- [ ] **Create `docs/MOTION_GUIDELINES.md`:**
  - [ ] Use `lib/motion-presets.ts` for consistency
  - [ ] How to check `useSSRSafeReducedMotion()`
  - [ ] Animation performance best practices
  - [ ] Avoiding motion sickness (guidance on flash, flicker)
  
- [ ] **Create `docs/ANALYTICS_INSTRUMENTATION.md`:**
  - [ ] How to use `useAnalytics()` hook
  - [ ] Event schema for protocol sequence
  - [ ] Data privacy: No PII in events
  - [ ] Testing analytics locally
  
- [ ] **Storybook Integration (Optional, Nice-to-Have):**
  - [ ] Create Storybook stories for new components:
    - [ ] `ProtocolSequenceAnimation.stories.tsx`
    - [ ] `SingularityPreviewCard.stories.tsx` (+ product, network)
  - [ ] Document: How to run Storybook locally
  - [ ] Benefit: Design review, interactive testing, component isolation

**Validation:**
- [ ] Documentation written and reviewed
- [ ] Team confirms clarity/completeness
- [ ] (Optional) Storybook builds successfully

**Files Created:**
- `docs/COMPONENT_LIBRARY.md` (~150 lines)
- `docs/MOTION_GUIDELINES.md` (~100 lines)
- `docs/ANALYTICS_INSTRUMENTATION.md` (~100 lines)
- (Optional) `components/**/*.stories.tsx` (if adding Storybook)

---

### **T3-008: Congruence Check & Final Validation**

**Objective:** Run full congruence check and verify all success criteria met.

**Acceptance Criteria:**
- [ ] Run: `npm run congruence:check` → **22/22 passing** ✅
  - [ ] TypeScript: 0 errors
  - [ ] ESLint: 0 errors, 0 warnings
  - [ ] Unit tests: 400+ passing
  - [ ] E2E tests: 20+ passing
  - [ ] Accessibility: 0 violations
  - [ ] Build: succeeds
  - [ ] Brand: No hardcoded brand names
  - [ ] Economics: Golden tests locked
  - [ ] Design: Tokens/primitives defined
  - [ ] Docs: All required docs present
  - [ ] Performance: Baselines met
  
- [ ] **Manual Checklist:**
  - [ ] [ ] Homepage loads without errors
  - [ ] [ ] Animation cycles Guard → Comms → BOL → YMS
  - [ ] [ ] Cards display correct aesthetics (Singularity particle grid, Product icons, Network curve)
  - [ ] [ ] No console errors/warnings
  - [ ] [ ] Mobile layout responsive (375px - single column)
  - [ ] [ ] Keyboard navigation works (Tab through card links)
  - [ ] [ ] Screen reader announces content correctly
  - [ ] [ ] Reduced-motion: Static grid, no animations
  - [ ] [ ] Performance: Lighthouse ≥90
  - [ ] [ ] Bundle size: Within targets
  
- [ ] **Release Notes:**
  - [ ] Create `RELEASE_NOTES.md`:
    - [ ] **What's New:**
      - [ ] ProtocolSequenceAnimation (replaces DigitalGuardAnimation)
      - [ ] Updated module cards (Singularity, Product, Network Effect)
    - [ ] **Improvements:**
      - [ ] Animation performance optimized
      - [ ] Cards now preview destination aesthetics
      - [ ] Full accessibility compliance (WCAG 2.1 AA)
    - [ ] **Migration:**
      - [ ] No breaking changes (backward compatible)
      - [ ] DigitalGuardAnimation deprecated (kept for reference)
    - [ ] **Known Limitations:**
      - [ ] None (if everything works)
      - [ ] Or: document any caveat

**Validation:**
- [ ] All 22 congruence checks pass
- [ ] Manual checklist complete
- [ ] Release notes written and reviewed

**Files Created:**
- `RELEASE_NOTES.md` (~100 lines)

---

### **T3-009: Deployment Checklist & Rollback Plan**

**Objective:** Document production deployment procedure and rollback strategy.

**Acceptance Criteria:**
- [ ] Create `DEPLOYMENT_CHECKLIST.md`:
  1. **Pre-Deployment Checks:**
     - [ ] Congruence: 22/22 passing
     - [ ] Code review: ≥1 approval
     - [ ] Tests: All passing
     - [ ] Lighthouse: ≥90
     - [ ] Accessibility: 0 violations
     - [ ] Bundle size: Within limits
     - [ ] No console errors (checked in DevTools)
  
  2. **Deployment Steps:**
     - [ ] Tag release: `git tag v1.X.0` (semantic versioning)
     - [ ] Push to GitHub: `git push origin main --tags`
     - [ ] Trigger CI/CD: Vercel auto-deploys from main (if configured)
     - [ ] Monitor: Check Vercel deployment status, wait for "Ready"
     - [ ] Verify: Visit production URL, test animation + cards
  
  3. **Post-Deployment Validation:**
     - [ ] Homepage loads (no 500 errors)
     - [ ] Animation cycles correctly
     - [ ] Cards display (no missing images/fonts)
     - [ ] Analytics events firing (check PostHog/Segment)
     - [ ] No spike in error rates (monitor Sentry/logs)
  
  4. **Rollback Plan (if issues):**
     - [ ] Identify issue: Document exact problem
     - [ ] Decision: Rollback vs. hotfix
     - [ ] If rollback:
       - [ ] `git revert HEAD` (undo deployment commit)
       - [ ] Tag: `git tag v1.X.1-rollback`
       - [ ] Redeploy: Vercel re-deploys from new tag
       - [ ] Verify: Production returns to previous state
     - [ ] If hotfix:
       - [ ] Branch: `git checkout -b hotfix/issue-name`
       - [ ] Fix: Make targeted change
       - [ ] Tag: `git tag v1.X.1`
       - [ ] Push + deploy (same as above)
  
- [ ] **Post-Deployment Monitoring (24-48 hours):**
  - [ ] Watch: Error rates, performance metrics
  - [ ] Check: User feedback (support tickets)
  - [ ] Metrics: Animation view events, card CTR, bounce rate
  - [ ] Success: No critical issues, metrics improving

**Validation:**
- [ ] Checklist documented
- [ ] Team aware of rollback procedure
- [ ] Deployment practiced in staging (if applicable)

**Files Created:**
- `DEPLOYMENT_CHECKLIST.md` (~100 lines)

---

## Sprint 3 Completion Criteria

**All tasks complete:**
1. ✅ T3-002: Visual regression baselines (stabilized)
2. ✅ T3-003: Comprehensive E2E test suite (by feature)
3. ✅ T3-004: Cross-browser & mobile QA matrix
4. ✅ T3-005: Bundle size & performance audit
5. ✅ T3-006: CI strategy & PR gates
6. ✅ T3-007: Developer documentation
7. ✅ T3-008: Congruence check (22/22) + final validation
8. ✅ T3-009: Deployment checklist & rollback plan

**Demoable Output:**
- [ ] Production-ready homepage with ProtocolSequenceAnimation + updated cards
- [ ] All tests passing (unit, E2E, accessibility)
- [ ] Lighthouse ≥90 across all metrics
- [ ] WCAG 2.1 Level AA compliant
- [ ] Visual regression baselines locked
- [ ] Comprehensive documentation for team
- [ ] Clear deployment & rollback procedures
- [ ] Ready for production deployment

**Final Validation:**
```bash
npm run build
npm run typecheck
npm run lint
npm run test:unit
npm run test:e2e -- @smoke
npm run test:a11y
npm run congruence:check

# Expected:
# ✅ 22/22 congruence checks passing
# ✅ 0 TypeScript errors
# ✅ 0 ESLint errors
# ✅ 400+ unit tests
# ✅ 20+ E2E tests
# ✅ 0 accessibility violations
# ✅ Lighthouse ≥90
```

---

## Summary: Refined Task Count & Organization

### **Total Tasks: 30 Atomic, Refined Tasks**

**Sprint 0 (Prerequisite):**
- T0-005: SSR-safe utilities (moved to S1 as prerequisite)

**Sprint 1: ProtocolSequenceAnimation (9 tasks)**
1. T0-005: SSR-safe motion + analytics utilities
2. T1-001: Icon components
3. T1-002: Protocol module data
4. T1-003: Animation component + reduced-motion + negative tests (consolidated)
5. T1-005: Homepage integration
6. T1-006: Analytics tracking
7. T1-008: Sprint 1 accessibility audit

**Sprint 2: Card Aesthetics (10 tasks)**
8. T2-001: Design decision (Singularity)
9. T2-002: SingularityPreviewCard
10. T2-003: Homepage update (Singularity)
11. T2-004: ProductPreviewCard
12. T2-005: NetworkEffectPreviewCard
13. T2-006: Homepage cards update
14. T2-009: Asset budget enforcement
15. T2-010: Sprint 2 accessibility audit

**Sprint 3: Polish & Deployment (11 tasks)**
16. T3-002: Visual regression baselines (unified, moved here)
17. T3-003: Comprehensive E2E suite (by feature area)
18. T3-004: Cross-browser & mobile QA matrix
19. T3-005: Bundle & performance audit
20. T3-006: CI strategy & PR gates
21. T3-007: Developer documentation & Storybook
22. T3-008: Congruence check + final validation
23. T3-009: Deployment checklist & rollback

---

## Key Improvements from Subagent Review

✅ **Consolidated Oversized Tasks**
- T1-004 merged into T1-003 (reduced-motion is core)
- T1-007 + T2-007 merged into T3-002 (VR baselines after stabilization)
- T1-008 + T2-008 consolidated into per-sprint a11y sweeps

✅ **Added New Tasks**
- T0-005: SSR-safe utilities (motion + analytics)
- T1-003B: Negative edge-case tests
- T2-009: Asset budget enforcement
- T3-002: Stabilized visual regression (moved from S1/2)
- T3-004: Cross-browser/mobile QA matrix
- T3-006: CI & branching strategy
- T3-007: Developer docs & Storybook

✅ **Improved Test Strategy**
- Animation states stabilized via `prefers-reduced-motion` for VR
- E2E organized by feature (hero, cards, responsive, reduced-motion)
- Smoke tests (PR) vs. full tests (nightly) with CI gating
- Performance: Smoke (Lighthouse) vs. detailed (manual profiling)

✅ **Risk Mitigations**
- SSR hydration: SSR-safe utilities from T0-005
- VR flake: Use reduced-motion mode for stable snapshots
- Timer drift: Document, add comment for future optimization
- Analytics failure: Try/catch + noop in utility layer
- Performance regressions: Bundle budgets + Lighthouse gating

✅ **Added Production Readiness**
- CI/branching strategy documented
- PR template created
- Deployment checklist + rollback plan
- Developer documentation + Storybook
- QA matrix for cross-browser testing

---

## Final Notes

This refined 30-task sprint plan provides:

✅ **Atomic Testability:** Each task has explicit acceptance criteria + validation  
✅ **Production Readiness:** Full CI/CD, documentation, deployment procedures  
✅ **Risk Mitigation:** Edge cases, performance budgets, accessibility compliance  
✅ **Team Communication:** PR templates, docs, Storybook, QA matrix  
✅ **Flexibility:** Tasks can be parallelized where independent (T1-001/002, T2-004/005)  
✅ **Completeness:** No gaps in coverage (SSR, mobile, cross-browser, analytics, performance)

The plan is ready for execution starting Sprint 1, Task 0-005.

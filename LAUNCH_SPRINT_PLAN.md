# YardFlow Launch Sprint Plan (Adoption-First, Animation-Refined)

**Version:** 2.1 (Strategic Refactor)  
**Date:** January 21, 2026  
**Focus:** Adoption % as the narrative spine; econ math frozen; animation quality premium  
**Audience:** Engineering team, QA, Product

---

## I. EXECUTIVE SUMMARY

### Core Thesis
- **Primary lever:** Adoption % (Network Coverage). Default: 5% Year 1 (Deep Model).
- **Story spine:** As adoption increases → standardization deepens → variance decreases → compounding becomes inevitable.
- **Animation role:** Support the "flow standardization" narrative, not distract from it. (Note: Heavy animation work deferred to Wave 2 post-launch; Sprint 2 now focuses on Reduced Motion + Performance only.)
- **Econ guarantee:** Formula outputs frozen; golden tests lock against regression.

### REVISION NOTES (Subagent-Reviewed, v2.1)
- **✅ S2 deferred to Wave 2** – Animation Lab, Lottie preview, MP4 integration moved post-launch (saves 1 week; refocuses on adoption narrative)
- **✅ S0.5a added** – New ticket: "Adoption % Semantics Doc" (locks whether adoption % changes formula inputs or narrative-only)
- **✅ S1.2 refined** – CoverageSlider mobile interaction testing added; Radix UI migration option
- **✅ S1.5 refined** – Visual regression approval SOP documented (prevents snapshot approval stall)
- **✅ Timeline:** 9 weeks total (not 10); launch-ready by week 8 with UAT buffer

### Strategic Non-Negotiables
1. **No math changes.** Existing ROI + Diagnostic + Singularity outputs must be identical for identical inputs.
2. **Adoption %** is now a first-class citizen: appears on ROI, Diagnostic, Home hero (teaser), and Singularity.
3. **Animation assets** used strategically: Lottie for web, MP4s for hero loops; always support reduced-motion.
4. **Brand + IA cohesion:** One naming system ("YardFlow by FreightRoll", "YNS"), one CTA ladder, no orphaned pages.

### Measurable Outcomes Per Sprint
- **Sprint 0:** CI green (lint, typecheck, unit, Playwright smoke); econ golden tests pass.
- **Sprint 1:** Adoption slider renders on ROI; presets work; outputs unchanged; visual regression snapshots.
- **Sprint 2:** Animation Lab route functional; Lottie + MP4 preview; reduced-motion toggles.
- **Sprint 3:** One naming system everywhere; link walk test green; no dead links.
- **Sprint 4:** Home + ROI use shared primitives; mobile pass; visual regression stable.
- **Sprint 5:** ROI deterministic PDF; "compounding view" shows adoption impact (math frozen); copy explicit (5% Year 1).
- **Sprint 6:** Diagnostic 3-step UX; result clarity; CTA wiring to audit + ROI.
- **Sprint 7:** Singularity deterministic; performance <100ms sim; adoption presets drive narrative; A11y pass.

---

## II. RISK INVENTORY (Pre-Sprint 0)

### Critical Risks
| Risk | Impact | Mitigation |
|------|--------|-----------|
| Econ math drift during refactors | High | Golden tests (S0) lock outputs; paired reviews. |
| Adoption slider accidentally changes inputs | High | Clear separation: slider is narrative-only unless it maps to existing input. |
| Animation performance thrash | Medium | Memoization; memoize on visibility; reduced-motion flag. |
| Brand name inconsistency | Medium | Grep-based audit (S3); single source of truth for copy. |
| PDF export non-deterministic | Medium | Seeded randomness; unit test snapshots (S5). |
| Scope creep on animations | Medium | Animation Lab = sandbox only; gate new assets via product review. |

---

## III. SPRINT STRUCTURE (REVISED: S2 Deferred to Wave 2)

Each sprint is **atomic** (one core goal) + **demoable** (builds on prior work) + **testable** (every ticket has acceptance criteria + tests).

**New Timeline:** 6 sprints (not 7) + Wave 2 deferred work = 9 weeks total (not 10).

---

## SPRINT 0: GUARDRAILS (Lock Outputs, Stop Regressions)

**Duration:** 1 week  
**Goal:** CI passes; econ golden tests lock formula outputs against accidental drift.  
**Demo:** Build passes; all tests green; Playwright smoke tests confirm core routes render.

### Tickets

#### S0.1: Golden Tests for ROI Calculator Outputs
**Objective:** Lock `calcRoiV2()` outputs for fixed inputs (no regression).

**Acceptance Criteria:**
- [ ] Create `src/lib/roi/calc.test.ts` with 5 preset fixtures:
  - Micro (1 facility, quick mode)
  - Mid-market (10 facilities, pro mode, network on)
  - Enterprise (260 facilities, pro mode, network on)
  - Aggressive rollout (50% adoption)
  - Conservative rollout (5% adoption)
- [ ] Each fixture snapshots:
  - `year1Roi`, `year3Roi`, `paybackMonths`
  - `labor.savings`, `dwell.savings`, `detention.savings`
  - `networkBonusSavings`, `networkMultiplier`
- [ ] Snapshots committed to repo; CI fails if outputs change.
- [ ] Test confirms **adoption % does NOT alter base formula** (only narrative context).

**Implementation Details:**
- Use Vitest + `toMatchSnapshot()`
- Fixtures: `/src/lib/roi/fixtures/presets.json`
- Each snapshot labeled with preset name + adoption %
- Run in CI: `npm run test:roi`

**Validation Method:**
- Run test suite locally; confirm snapshots match
- Modify a formula constant; test fails ✅
- Revert; test passes ✅

**Owner:** Economist agent  
**Sign-off:** CTO (green CI, no output drift)

---

#### S0.2: Golden Tests for Diagnostic Outputs
**Objective:** Lock `runDiagnostic()` outputs (question scores, prioritization).

**Acceptance Criteria:**
- [ ] Create `src/lib/diagnostic/diagnostic.test.ts` with 3 preset scenarios:
  - Chaotic yard (high variance indicators)
  - Stable yard (low variance indicators)
  - Network-ready yard (adoption-friendly inputs)
- [ ] Snapshots capture:
  - Question response scores
  - Priority ranking (top 3 pain points)
  - Recommended next step (e.g., "Book audit", "Run ROI")
- [ ] CI enforces: identical inputs = identical outputs.

**Implementation Details:**
- Fixtures in `/src/lib/diagnostic/fixtures/scenarios.json`
- Use Vitest snapshots
- Test confirms diagnostic never drifts

**Validation Method:**
- Modify a scoring formula; test fails ✅
- Verify Diagnostic page loads (smoke test) ✅

**Owner:** Economist agent  
**Sign-off:** CTO

---

#### S0.3: Golden Tests for Network Effect Helpers
**Objective:** Lock any multiplier or network aggregation logic.

**Acceptance Criteria:**
- [ ] If `calcNetworkMultiplier()` or similar exists, snapshot its outputs:
  - Input: adoption %, facility count, variance reduction target
  - Output: multiplier scalar, bonus savings ($)
- [ ] If no such function exists, create a stub:
  - `fn(adoption: number, facilities: number) → { multiplier: number, bonus: number }`
  - Snapshot for 5% / 10 facilities, 5% / 260 facilities, 50% / 260 facilities
- [ ] Lock against accidental changes.

**Implementation Details:**
- File: `src/lib/varianceTax/multiplier.test.ts`
- Snapshots for adoption ladder: [5%, 10%, 25%, 50%]

**Validation Method:**
- Snapshot golden test passes ✅
- Confirm outputs scale reasonably (higher adoption → higher multiplier) ✅

**Owner:** Economist agent  
**Sign-off:** CTO

---

#### S0.4: CI Pipeline Setup (Lint, Typecheck, Unit, E2E Smoke)
**Objective:** Establish automated quality gates.

**Acceptance Criteria:**
- [ ] GitHub Actions workflow (or similar) runs on every PR:
  - `npm run lint` (ESLint) → must pass
  - `npm run typecheck` (TypeScript) → must pass
  - `npm run test:unit` (Vitest) → must pass (>80% coverage on src/)
  - `npm run test:e2e:smoke` (Playwright) → must pass
- [ ] Merge gate: all checks must pass before merge to main
- [ ] Smoke tests cover:
  - Home page renders (no JS errors)
  - ROI page loads + calculator renders
  - Diagnostic page loads
  - Singularity page loads (not broken)
- [ ] CI completes in <5 min

**Implementation Details:**
- Create `.github/workflows/ci.yml`
- ESLint config: existing (extend if needed)
- Vitest config: existing + coverage report
- Playwright config: existing; create smoke test suite in `e2e/smoke.spec.ts`

**Validation Method:**
- Push a lint error; CI fails ✅
- Push a TS error; CI fails ✅
- Push clean code; CI passes ✅

**Owner:** Gatekeeper agent  
**Sign-off:** CTO

---

#### S0.5: Documentation: Economics Audit Report
**Objective:** Document what we're locking and why.

**Acceptance Criteria:**
- [ ] Write `docs/ECONOMICS_AUDIT.md`:
  - Table: formula name, input, expected output, snapshot file
  - Note any assumptions (e.g., "network effect off by default")
  - List all golden test fixtures
  - Explain adoption % role: "narrative only; does not alter base math"
- [ ] Commit to repo as reference

**Implementation Details:**
- Markdown file; human-readable
- Linked in README

**Validation Method:**
- File exists and is readable by all team members ✅

**Owner:** Economist agent  
**Sign-off:** Product Lead

---

#### S0.5a: Adoption % Semantics Document (NEW - Critical Blocker Resolution)
**Objective:** Lock consensus: is adoption % narrative-only or does it change formula inputs?

**Acceptance Criteria:**
- [ ] Create `docs/ADOPTION_SEMANTICS.md`:
  ```
  # Adoption % Semantics (Locked for Launch)
  
  ## Rule
  Adoption % (Network Coverage slider) is NARRATIVE-ONLY.
  
  - Does NOT map to `facilities` input in calcRoiV2()
  - Does NOT change labor%, dwell%, detention% inputs
  - Does NOT alter networkMultiplier or any formula outputs
  - Is purely for communicating: "At 5% adoption, Year 1 ROI is X. At 50%, Year 3 ROI is Y."
  
  ## Why
  - Adoption % is a business/sales concept (rollout cadence)
  - Formula inputs are operational metrics (per-facility labor, detention)
  - These are independent; adoption % does not assume different operations
  
  ## Future Evolution
  - If product roadmap requires adoption % to drive network effect multiplier, create new ticket (post-launch)
  - For now: adoption % is UI/copy only
  
  ## Golden Test Verification
  - calcRoiV2() called with adoption=5% → outputs X
  - calcRoiV2() called with adoption=50% (same input object) → outputs X (unchanged)
  - See test: src/lib/roi/calc.test.ts (S0.1 golden test)
  ```
- [ ] Update S0.1 golden test acceptance criteria to include:
  - [ ] "Test confirms: changing adoption % does not change ROI outputs"
  - Golden test snapshot: `adoption-narrative-only.test.ts.snap`
- [ ] Sign-off: Economist + CTO (must agree on interpretation)
- [ ] Link in README + S1.3 acceptance criteria (CoverageSlider ticket)

**Implementation Details:**
- Document + test
- Unblocks S1.3, S5.3, S6.3 (all adoption-related work)
- If disagreement: escalate to CEO (strategic decision)

**Validation Method:**
- Document exists + is clear ✅
- Golden test S0.1 includes adoption-narrative-only verification ✅
- Team signs off (consensus) ✅

**Owner:** Economist agent  
**Sign-off:** Economist + CTO (required); escalate if disagreement

---

### Sprint 0 Demo
- CI passes (lint, typecheck, unit, smoke)
- All golden tests green
- Econ audit report generated
- No code regressions in core logic

---

---

## SPRINT 1: ADOPTION SPINE (Make Compounding the Main Character)

**Duration:** 1 week  
**Goal:** Network Coverage (%) slider + presets embedded on ROI page; adoption % drives narrative (not math).  
**Demo:** Slider renders; presets work; ROI outputs stable; visual regressions captured.

### Tickets

#### S1.1: Create NetworkCoverageModel (Types + Defaults)
**Objective:** Define adoption % as a shared concept.

**Acceptance Criteria:**
- [ ] Create `src/lib/adoption/types.ts`:
  ```typescript
  export interface NetworkCoverageModel {
    adoptionPercent: number;        // 5 | 10 | 25 | 50 (or custom)
    scenarioName: 'Deep Model' | 'Custom';
    year1FacilityCount: number;     // calculated: totalFacilities * adoptionPercent
    description: string;             // "5% Year 1" → "Aggressive rollout"
  }
  
  export const ADOPTION_PRESETS = {
    Year1Conservative: { adoptionPercent: 5, description: '5% Year 1 (Deep Model default)' },
    Year1Moderate: { adoptionPercent: 10, description: '10% Year 1 (moderate rollout)' },
    Year2Aggressive: { adoptionPercent: 25, description: '25% Year 2 (aggressive)' },
    Year3Transformation: { adoptionPercent: 50, description: '50% Year 3 (network inflection)' },
  };
  ```
- [ ] Export defaults: `getDefaultAdoptionModel() → NetworkCoverageModel`
- [ ] Add unit tests: `src/lib/adoption/model.test.ts`
  - Verify defaults match Deep Model (5% Year 1)
  - Verify presets are consistent

**Implementation Details:**
- No logic changes; pure types + data
- Adoption % is descriptive metadata for now
- Unit test confirms presets match expected values

**Validation Method:**
- Import in REPL: `import { ADOPTION_PRESETS } from '@/lib/adoption'` ✅
- Verify default = 5% ✅

**Owner:** Architect agent  
**Sign-off:** CTO

---

#### S1.2: Build CoverageSlider Component
**Objective:** Reusable UI control for adoption % selection.

**Acceptance Criteria:**
- [ ] Create `components/CoverageSlider.tsx`:
  - Slider input: 5% to 100% (5% step)
  - Preset chips: Year1Conservative (5%), Year1Moderate (10%), Year2Aggressive (25%), Year3Transformation (50%)
  - Controlled component: accepts `value` + `onChange` props
  - Display: "Network Coverage: **XX%**" with annotation "(Year 1)" or "(Aggressive)"
  - Reduced motion: respects `prefers-reduced-motion` (no animation, instant)
- [ ] Tailwind styling:
  - Chip buttons: flex layout, blue when selected, steel when not
  - Slider: custom track/thumb (Tailwind range input)
  - Container: max-w-md, centered
- [ ] Props:
  ```typescript
  interface CoverageSliderProps {
    value: number;
    onChange: (value: number) => void;
    showPresets?: boolean;
    disabled?: boolean;
    label?: string;
  }
  ```

**Implementation Details:**
- Use HTML5 `<input type="range">` (no external slider lib)
- Preset chips as buttons with `onClick` handlers
- Accessibility: ARIA labels, keyboard support

**Validation Method:**
- Render on Storybook ✅
- Adjust slider; `onChange` fires with new value ✅
- Click preset chip; slider updates + value changes ✅

**Owner:** Visualist agent  
**Sign-off:** Visualist + Product Lead

---

#### S1.3: Wire CoverageSlider to ROI Page (Math Frozen)
**Objective:** Slider appears on ROI page; user can see adoption presets; outputs unchanged.

**Acceptance Criteria:**
- [ ] Update `app/roi/page.tsx`:
  - Add CoverageSlider component near top of calculator
  - Track state: `adoptionPercent: number`
  - **CRITICAL:** Adoption % updates UI copy ONLY (e.g., "Modeling 13 of 260 facilities")
  - **NOT wired to inputs:** slider does not change `facilities` input, `labor`, `dwell`, `detention`, or any formula
  - If adoption % was already a formula input, wire it; otherwise leave math alone
- [ ] Update UI copy to reflect adoption:
  - "Network Coverage: **5%** (Year 1 Deep Model default)"
  - "Modeling **13 of 260 facilities** in scope"
  - "As coverage increases to 10%, 25%, 50%, compounding accelerates"
- [ ] Snapshot regression tests: verify ROI outputs identical for baseline input set (before + after slider wiring)

**Implementation Details:**
- `useState` for adoption % (default: 5)
- CoverageSlider onChange updates state
- Copy template: `Modeling ${Math.round(totalFacilities * adoption)}  facilities`
- No changes to `calcRoiV2()` call or inputs object

**Validation Method:**
- Render ROI page ✅
- Adjust slider; copy updates ✅
- Extract outputs (JSON); compare to golden test ✅ (unchanged)
- Playwright test: "Slider updates adoption copy without changing ROI" ✅

**Owner:** Architect agent  
**Sign-off:** CTO + Product

---

#### S1.4: Add Adoption Presets to Diagnostic Page (Optional Teaser)
**Objective:** Adoption % also appears on Diagnostic as context.

**Acceptance Criteria:**
- [ ] Update `app/diagnostic/page.tsx`:
  - Add CoverageSlider (read-only or with onChange callback)
  - Display: "Model this diagnostic for **XX%** network coverage (affects compounding story)"
  - No impact on diagnostic logic; purely narrative
- [ ] OR: Keep diagnostic focused; add adoption teaser in result CTA: "See ROI at 10% adoption"

**Implementation Details:**
- Optional enhancement; low risk
- Can be deferred if Sprint 1 schedule tight

**Validation Method:**
- Diagnostic page still renders + calculates correctly ✅
- Adoption % copy appears (read-only) ✅

**Owner:** Architect agent  
**Sign-off:** Product Lead

---

#### S1.5: Visual Regression Tests: ROI + Home (Adoption Variant)
**Objective:** Lock UI visuals; flag unexpected changes.

**Acceptance Criteria:**
- [ ] Create Playwright tests: `e2e/visual-regression.spec.ts`
  - Test 1: ROI page (baseline adoption: 5%) → `expect(screenshot).toMatchSnapshot()`
  - Test 2: ROI page (adoption: 50%) → `expect(screenshot).toMatchSnapshot()`
  - Test 3: Home page hero (if adoption teaser present) → snapshot
  - Screenshots captured at 1280×720 (desktop) + 375×667 (mobile)
- [ ] Run on every PR; CI fails if snapshot differs >2%
- [ ] Snapshots committed to repo

**Implementation Details:**
- Playwright `page.screenshot()` + `expect().toMatchSnapshot()`
- Baseline images in `e2e/snapshots/`
- Mobile + desktop variants

**Validation Method:**
- First run: create baseline snapshots ✅
- Second PR (no visual changes): test passes ✅
- Third PR (modify CSS): snapshot differs; test fails + review diff ✅

**Owner:** Gatekeeper agent  
**Sign-off:** Visualist

---

### Sprint 1 Demo
- CoverageSlider component renders and is interactive
- ROI page shows adoption % presets + slider
- Adoption copy reflects selection ("5% Year 1", "260 facilities in scope")
- ROI outputs identical to golden tests (math frozen ✅)
- Visual regression snapshots captured
- Playwright test: slider updates adoption narrative without math drift ✅

---

---

## SPRINT 2: ADOPTION PRESETS + RESPONSIVE POLISH (Reduced Motion + Performance)

**Duration:** 1 week  
**Goal:** Create adoption presets shared across ROI + Diagnostic; reduced-motion support framework; performance guardrails.  
**Demo:** Adoption slider + presets work on all pages; reduced-motion toggle respected; Lighthouse >75.

**Note:** Heavy animation work (Lottie Lab, MP4 preview, shader optimization) **deferred to Wave 2 (post-launch)**. This sprint focuses on user-facing adoption UX + accessibility + performance infrastructure.

### Tickets

#### S2.1: Reduced Motion Support Framework
**Objective:** Site respects user's motion preferences; graceful fallbacks.

**Acceptance Criteria:**
- [ ] Global style: `prefers-reduced-motion` media query
  ```css
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- [ ] Component wrapper: `MotionController.tsx`
  - Props: `children`, `type: 'animation' | 'transition' | 'scroll'`
  - If reduced motion: render children with no animation/transition
  - If animation: render normally
- [ ] Test: `MotionController.test.tsx`
  - Verify animations disable under `prefers-reduced-motion`
  - Verify fallback rendered correctly
- [ ] Apply to:
  - CoverageSlider transitions (S1)
  - Framer Motion components
  - Any CSS animations
- [ ] Lighthouse A11y: confirm reduced-motion support tested

**Implementation Details:**
- Hook: `useReducedMotion()` (checks CSS media query)
- Wrapper component: `<Motion type="animation">{children}</Motion>`
- Tailwind: add `motion-reduce:` utilities

**Validation Method:**
- Browser dev tools: emulate `prefers-reduced-motion` ✅
- Page renders; no animations ✅
- Functionality intact (buttons clickable, sliders work) ✅
- Lighthouse A11y >95 ✅

**Owner:** Architect agent  
**Sign-off:** A11y reviewer + CTO

---

#### S2.2: Performance Guardrails (Baseline + Budget)
**Objective:** Establish performance budgets; baseline current state; ensure sprints don't regress.

**Acceptance Criteria:**
- [ ] Establish performance budgets (from existing practice or QUALITY_AUDIT_REPORT.md):
  - Lighthouse Performance: >75
  - Lighthouse A11y: >95
  - Core Web Vitals:
    - LCP (Largest Contentful Paint): <2.5s
    - FID (First Input Delay): <100ms
    - CLS (Cumulative Layout Shift): <0.1
  - JS bundle size: <200KB (gzipped)
  - FPS sustained: >55 FPS on desktop, >30 FPS on mobile
- [ ] Create performance baseline (`docs/PERFORMANCE_BASELINES.md`):
  - Current: Lighthouse Performance, LCP, CLS scores
  - Targets: (as above)
  - Run locally: `npm run perf:audit` (custom script or Lighthouse CI)
- [ ] Add CI gate:
  - Lighthouse CI on main branch (optional; can be manual for now)
  - Fail if: Performance <75, A11y <95, LCP >2.5s
  - Report in CI logs
- [ ] Unit test: `src/lib/performance.test.ts`
  - Verify bundle size (webpack-bundle-analyzer or similar)
  - Verify no console errors (mock errors, check weren't hit)

**Implementation Details:**
- Script: `package.json` "perf:audit" command (runs Lighthouse)
- Baseline doc: human-readable CSV or table
- CI: optional for now; focus on manual tracking
- If bundle exceeds 200KB, document explanation + mitigation plan (code splitting, lazy loading, etc.)

**Validation Method:**
- Run `npm run perf:audit` locally; see baseline ✅
- Lighthouse score >75 ✅
- LCP <2.5s ✅
- CLS <0.1 ✅
- Bundle size <200KB (check with `npm run build; du -sh .next`) ✅

**Owner:** Gatekeeper agent  
**Sign-off:** CTO

---

#### S2.3: Adoption Presets Shared Across ROI + Diagnostic
**Objective:** Adoption % presets consistent on all pages (same buttons, same defaults).

**Acceptance Criteria:**
- [ ] Update `src/lib/adoption/presets.ts`:
  ```typescript
  export const ADOPTION_PRESETS = {
    Year1Conservative: { adoptionPercent: 5, label: '5% Year 1 (Deep Model default)' },
    Year1Moderate: { adoptionPercent: 10, label: '10% Year 1 (moderate rollout)' },
    Year2Aggressive: { adoptionPercent: 25, label: '25% Year 2 (aggressive)' },
    Year3Transformation: { adoptionPercent: 50, label: '50% Year 3 (network inflection)' },
  };
  ```
- [ ] Wire on ROI page (`app/roi/page.tsx`):
  - CoverageSlider shows presets
  - Clicking preset updates adoption % (UI only; no formula change per S0.5a)
  - Copy updates: "Modeling XX of 260 facilities"
- [ ] Wire on Diagnostic page (`app/diagnostic/page.tsx`):
  - Optional: show adoption presets as read-only context
  - Or: defer to result page (CTAs will link to ROI with adoption preset)
- [ ] Unit test: `src/lib/adoption/presets.test.ts`
  - Verify presets are consistent (same labels, values)
  - Verify defaults match Deep Model (5% Year 1)
- [ ] Playwright test: "Adoption presets work identically on ROI and Diagnostic"

**Implementation Details:**
- Shared constants file
- Import on both pages
- Same rendering (buttons, styling)

**Validation Method:**
- ROI page shows presets ✅
- Diagnostic page shows/links presets ✅
- Presets are identical across pages ✅
- Clicking preset updates adoption % (UI) ✅

**Owner:** Architect agent  
**Sign-off:** CTO + Product Lead

---

#### S2.4: Mobile Interaction Testing for CoverageSlider (S1.2 Refinement)
**Objective:** Ensure adoption slider is usable on touch devices.

**Acceptance Criteria:**
- [ ] Review S1.2 CoverageSlider implementation:
  - Current: HTML5 `<input type="range">` (poor mobile UX)
  - Decision: Either (A) migrate to Radix UI Slider, or (B) document mobile-primary pattern (preset chips for mobile, slider for desktop)
- [ ] If (A) – Migrate to Radix UI:
  - Replace HTML5 input with `<Slider>` from `@radix-ui/react-slider`
  - Custom styling with Tailwind
  - Better touch support + accessibility
  - Effort: ~3-4 hours
- [ ] If (B) – Document Pattern:
  - Show preset chips prominently on mobile (<768px)
  - Show slider on desktop (>768px)
  - Mobile users primarily interact with chips; slider hidden
  - Effort: ~1-2 hours (media query + Tailwind)
- [ ] Playwright test: touch interaction
  - Simulate `touchstart`, `touchmove`, `touchend` events
  - Verify slider value changes correctly
  - Test on simulated iPhone SE (375×667)
- [ ] Visual regression: capture CoverageSlider at mobile + desktop sizes

**Implementation Details:**
- Recommendation: (B) is lower risk + faster to ship; (A) is better UX but requires testing
- Owner: Visualist (UX decision) + Architect (implementation)
- Document choice in PR + code comment

**Validation Method:**
- CoverageSlider interactive on mobile device emulation ✅
- Touch events captured + working ✅
- Visual regression snapshots match ✅

**Owner:** Visualist + Architect agents  
**Sign-off:** Visualist + QA

---

#### S2.5: Visual Regression SOP (S1.5 Refinement)
**Objective:** Establish clear approval process for snapshot-based visual regression testing.

**Acceptance Criteria:**
- [ ] Create `docs/VISUAL_REGRESSION_SOP.md`:
  ```markdown
  # Visual Regression Testing SOP
  
  ## Baseline Snapshot Approval
  - First snapshot (created in S1.5): Visualist reviews on desktop + mobile
  - Visualist checks: pixel-perfect match to design system, no broken layouts
  - Visualist commits baseline image to `e2e/snapshots/`
  - No product/CEO approval required for baseline (design already approved)
  - CI: snapshot marked as "approved"
  
  ## Regression Detection
  - CI runs Playwright screenshot test
  - If current screenshot differs from baseline >2%: test fails
  - Developer gets side-by-side diff in PR comments
  - Developer either: (A) fixes regression, or (B) updates snapshot if change is intentional
  
  ## Intentional Changes
  - If design change is approved: developer updates snapshot
  - PR comment: "Design approved by [Visualist]; updating baseline"
  - Visualist re-approves; CI passes
  
  ## Regression Rollback
  - If snapshot broke unintentionally (e.g., CSS regression):
    - Revert the code change
    - Re-run tests (snapshot should match again)
    - Investigate root cause
  
  ## Tools
  - Tool: Playwright `page.screenshot()` + `expect().toMatchSnapshot()`
  - Threshold: 2% pixel diff
  - Baseline images: committed to `e2e/snapshots/` (git-tracked)
  - Update frequency: every PR that touches UI
  
  ## Devices Tested
  - Desktop: 1280×720
  - Mobile: 375×667 (iPhone SE)
  - Variants: light/dark mode (if applicable)
  ```
- [ ] CI configuration:
  - Playwright snapshot threshold: 2%
  - Auto-fail if threshold exceeded
  - Report diff image in PR
- [ ] Document ownership:
  - Visualist: approves baselines + intentional changes
  - Gatekeeper: CI gate enforcement
  - Developer: updates snapshots when approved

**Implementation Details:**
- Document: markdown (linked in README)
- CI: update `playwright.config.ts` with snapshot settings
- Tool: Playwright snapshot compare function

**Validation Method:**
- SOP document exists + team reads ✅
- CI snapshot test runs ✅
- Baseline snapshot approved + committed ✅

**Owner:** Gatekeeper + Visualist agents  
**Sign-off:** CTO

---

### Sprint 2 Demo
- Reduced motion framework: toggle works; animations disable; reduced-motion variants render
- Performance baselines established: Lighthouse, LCP, CLS, bundle size documented
- Adoption presets: consistent on ROI + Diagnostic; presets work identically
- CoverageSlider mobile-friendly (either Radix-migrated or mobile-preset-primary pattern confirmed)
- Visual regression SOP documented + CI configured
- Lighthouse Performance >75, A11y >95

---

---

## SPRINT 3: BRAND + IA CONSISTENCY (One System, One Story)

**Duration:** 1 week  
**Goal:** Unified naming ("YardFlow by FreightRoll", "YNS"), single CTA ladder, normalized copy across all pages.  
**Demo:** Link walk test green; no dead links; copy audit report generated; brand name consistent everywhere.

### Tickets

#### S3.1: Normalize Brand Names + Terminology
**Objective:** One naming system across site.

**Acceptance Criteria:**
- [ ] Create `src/lib/brand/constants.ts`:
  ```typescript
  export const BRAND_NAMES = {
    Company: 'FreightRoll',
    Product: 'YardFlow',
    ProductFull: 'YardFlow by FreightRoll',
    Acronym: 'YNS',
    FullAcronym: 'Yard Network System',
    Program: 'Co-Development Program',
  };
  
  export const TERMINOLOGY = {
    Yard: 'yard',
    Facility: 'facility',
    Protocol: 'standardized protocol',
    NetworkEffect: 'network compounding',
    Variance: 'variance',
    Flow: 'standardized flow',
  };
  ```
- [ ] Audit all pages for inconsistencies:
  - Search for: "FreightRoll", "Freight Roll", "freight roll", "Yard Network System", "Yard Network", "YNS"
  - Replace with constants
  - Document findings in `docs/BRAND_AUDIT.md`
- [ ] Files to update (at minimum):
  - `app/page.tsx` (home)
  - `app/roi/page.tsx`
  - `app/diagnostic/page.tsx`
  - `app/singularity/page.tsx`
  - `components/Header.tsx`
  - `components/Footer.tsx`
  - All `/app/*/page.tsx` files

**Implementation Details:**
- Use grep to find all instances:
  ```bash
  grep -r "FreightRoll\|Yard Network\|YNS" app/ components/ --include="*.tsx"
  ```
- Create PR that replaces all with imported constants
- Add unit test: verify constants are used (no hardcoded strings in key files)

**Validation Method:**
- Grep finds no hardcoded brand names ✅
- All routes render with consistent branding ✅
- Test confirms constants imported ✅

**Owner:** Architect agent  
**Sign-off:** Product Lead + CEO

---

#### S3.2: Standardize CTA Hierarchy (Primary / Secondary / Tertiary)
**Objective:** One CTA ladder everywhere (no conflicting messages).

**Acceptance Criteria:**
- [ ] Define CTA hierarchy:
  - **Primary:** "Book a Network Audit" (blue button, high emphasis)
  - **Secondary:** "Apply for Co-Development" (outline button)
  - **Tertiary:** "Run ROI" / "Run Diagnostic" / "Learn More" (text link or muted button)
- [ ] Update all CTAs on:
  - Home page
  - ROI page
  - Diagnostic page
  - Singularity page
  - Product pages
  - Contact page
  - Footer
- [ ] Create `components/CTAButton.tsx`:
  ```typescript
  interface CTAButtonProps {
    tier: 'primary' | 'secondary' | 'tertiary';
    label: string;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
  }
  ```
  - Styling: Tailwind utility classes for each tier
  - Consistent sizing, spacing, hover states
- [ ] Add Playwright test: "CTA audit - verify all CTAs use CTAButton component"

**Implementation Details:**
- Refactor existing buttons to use CTAButton
- Document in `docs/CTA_HIERARCHY.md`
- Add accessibility: ARIA labels for button purpose

**Validation Method:**
- Inspect all pages; CTAs visually consistent ✅
- Console: no "hardcoded button" warnings ✅
- Playwright test passes (all CTAs use component) ✅

**Owner:** Visualist agent  
**Sign-off:** Product Lead

---

#### S3.3: Navigation + Footer Link Audit (Dead Links Test)
**Objective:** Every link works; no orphaned routes; consistent nav structure.

**Acceptance Criteria:**
- [ ] Create Playwright test: `e2e/link-walk.spec.ts`
  - Start from home page
  - Crawl all links (href attributes)
  - For each link:
    - Follow HTTP link (external) → verify 200/3xx status
    - Follow internal link → verify page loads (no 404)
    - Report broken links
- [ ] Run on all pages:
  - Home, ROI, Diagnostic, Singularity
  - Product pages (/product, /solutions, etc.)
  - Resources, Docs, Pricing, Company pages
- [ ] Fix broken links found
- [ ] Update Header + Footer:
  - Audit nav structure: is it logical?
  - Ensure brand name consistent in footer
  - Ensure all product links point to correct routes
- [ ] Document in `docs/NAVIGATION_AUDIT.md`

**Implementation Details:**
- Playwright loop over `page.locator('a[href]')`
- Separate internal vs external links
- Report as table: link text, href, status, page found on

**Validation Method:**
- Run test suite: all links pass ✅
- Manually spot-check 5 random links ✅

**Owner:** Gatekeeper agent  
**Sign-off:** CTO + QA

---

#### S3.4: Normalize Copy Tone + Messaging (Brand Voice)
**Objective:** One voice across site; no contradictions.

**Acceptance Criteria:**
- [ ] Define brand voice (2-3 sentences):
  - E.g., "We speak to operations leaders with clarity and data. No hype. We show how standardization beats chaos. Action-oriented: every sentence should move toward 'Book an audit' or 'Run ROI'."
- [ ] Audit copy on key pages:
  - Home hero + sections
  - ROI intro + CTAs
  - Diagnostic results
  - Singularity narrative
- [ ] Check for:
  - Consistent terminology (Yard vs Facility, Variance vs Chaos)
  - Tone alignment (data-driven, not salesy)
  - CTA specificity (e.g., no vague "Learn More" without context)
- [ ] Create `docs/COPY_GUIDELINES.md`:
  - Brand voice definition
  - Do's and don'ts
  - Examples of good vs bad copy
- [ ] Flag copy changes in PR template: "Does this copy align with brand voice?"

**Implementation Details:**
- Audit in spreadsheet (Page, Section, Copy, Aligned?, Notes)
- Create brand voice guide as reference
- Link in README

**Validation Method:**
- Copy audit doc exists ✅
- Team reviews and agrees on brand voice ✅
- Spot-check 3 pages for voice consistency ✅

**Owner:** Closer agent  
**Sign-off:** CEO + Product Lead

---

#### S3.5: Remove / Archive Orphaned Content
**Objective:** Delete pages/components that don't serve the narrative.

**Acceptance Criteria:**
- [ ] Audit for orphaned content:
  - Pages not linked from nav
  - Duplicate pages (e.g., old backups)
  - Abandoned experiments (logo-preview, network-effect stubs)
- [ ] Document findings in `docs/ORPHANED_CONTENT_AUDIT.md`:
  - File path
  - Reason orphaned
  - Decision: delete, archive, or repurpose?
- [ ] Delete or move to `_archive/`:
  - `app/logo-preview/` → archive (if not used)
  - `app/logo-test/` → archive
  - `app/page-*.tsx` backups → delete
  - `app/network-effect/` → check if linked; if not, archive
- [ ] Update `.gitignore` to ignore `_archive/` if needed

**Implementation Details:**
- Review each route in `app/` directory
- Check if route is linked from nav or other pages (Playwright crawl)
- Create archive folder if not exists

**Validation Method:**
- Link walk test: no links to orphaned routes ✅
- Build succeeds (no broken imports) ✅
- Orphaned content audit doc generated ✅

**Owner:** Gatekeeper agent  
**Sign-off:** Product Lead

---

### Sprint 3 Demo
- Brand name audit complete: "YardFlow by FreightRoll" consistent everywhere
- CTA hierarchy applied: all CTAs use consistent component + styling
- Link walk test green: no 404s, no dead links
- Copy audit: brand voice guidelines documented
- Orphaned content: audit complete; deletions merged

---

---

## SPRINT 4: PREMIUM UI (Design System, Mobile Polish)

**Duration:** 1 week  
**Goal:** Shared UI primitives (Section, Card, Stat, Callout); applied to home + ROI; mobile-first responsive polish.  
**Demo:** Home + ROI pages use shared primitives; mobile layout perfect; visual regression snapshots match.

### Tickets

#### S4.1: Define Design System Tokens (Spacing, Typography, Colors)
**Objective:** Single source of truth for visual decisions.

**Acceptance Criteria:**
- [ ] Create `src/lib/design/tokens.ts`:
  ```typescript
  export const SPACING = {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    xxl: '3rem',     // 48px
  };
  
  export const TYPOGRAPHY = {
    Display: { size: '3.5rem', weight: 700, lineHeight: 1.1 },
    H1: { size: '2.5rem', weight: 700, lineHeight: 1.2 },
    H2: { size: '2rem', weight: 700, lineHeight: 1.3 },
    H3: { size: '1.5rem', weight: 600, lineHeight: 1.4 },
    Body: { size: '1rem', weight: 400, lineHeight: 1.5 },
    Small: { size: '0.875rem', weight: 400, lineHeight: 1.5 },
  };
  
  export const COLORS = {
    Void: '#232A35',      // background
    Neon: '#D91411',      // variance / accent
    Flow: '#05ACEB',      // action / link
    Steel: '#8892A8',     // neutral
    White: '#FFFFFF',
    Black: '#000000',
  };
  
  export const SHADOWS = {
    sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  };
  ```
- [ ] Update Tailwind config to use tokens:
  ```js
  module.exports = {
    theme: {
      extend: {
        colors: COLORS,
        spacing: SPACING,
        typography: TYPOGRAPHY,
      },
    },
  };
  ```
- [ ] Unit test: verify tokens are used, not hardcoded values

**Implementation Details:**
- Tokens file: single source of truth
- Tailwind integration via `tailwind.config.js`
- TypeScript types ensure no typos

**Validation Method:**
- Import tokens in component; use them ✅
- Inspect element; CSS classes match token values ✅
- No hardcoded color hex values in components ✅

**Owner:** Visualist agent  
**Sign-off:** CTO

---

#### S4.2: Create Shared Primitives (Section, Card, Stat, Callout)
**Objective:** Reusable UI components with consistent styling.

**Acceptance Criteria:**
- [ ] Create `components/primitives/`:
  - `Section.tsx` – container for page sections (padding, max-width, grid)
  - `Card.tsx` – card with border, shadow, padding
  - `Stat.tsx` – statistic display (number + label)
  - `Callout.tsx` – highlight box (info, warning, success, error)
  - Each component accepts `children`, `className` for override

- [ ] `Section.tsx` props:
  ```typescript
  interface SectionProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    variant?: 'light' | 'dark';  // background
    className?: string;
  }
  ```

- [ ] `Card.tsx` props:
  ```typescript
  interface CardProps {
    children: React.ReactNode;
    hover?: boolean;  // scale/shadow on hover
    className?: string;
  }
  ```

- [ ] `Stat.tsx` props:
  ```typescript
  interface StatProps {
    value: string | number;
    label: string;
    unit?: string;
    className?: string;
  }
  ```

- [ ] `Callout.tsx` props:
  ```typescript
  interface CalloutProps {
    variant: 'info' | 'warning' | 'success' | 'error';
    children: React.ReactNode;
    className?: string;
  }
  ```

- [ ] Styling: use tokens; ensure consistent spacing, typography, colors
- [ ] Unit tests: primitives render with correct classes

**Implementation Details:**
- Components in `components/primitives/`
- Export from index: `components/primitives/index.ts`
- Storybook stories for each (optional but recommended)

**Validation Method:**
- Import in component; render ✅
- Inspect element; CSS classes correct ✅
- Mobile layout responsive ✅

**Owner:** Visualist agent  
**Sign-off:** CTO + Visualist

---

#### S4.3: Refactor Home Page (Use Shared Primitives + Mobile Polish)
**Objective:** Home page sections use shared components; mobile responsive.

**Acceptance Criteria:**
- [ ] Update `app/page.tsx`:
  - Replace ad-hoc section divs with `<Section>` component
  - Replace card layouts with `<Card>` component
  - Replace stat displays with `<Stat>` component
  - Verify visual output identical (visual regression snapshot)
- [ ] Mobile polish:
  - Test on 375×667 (iPhone SE)
  - Fix overflow: text wrapping, button sizing, touch targets (min 44×44px)
  - Stack sections vertically on mobile
  - Responsive typography (larger on desktop, smaller on mobile)
- [ ] Visual regression snapshot: `home-mobile-refactored.png` + `home-desktop-refactored.png`
- [ ] Functionality preserved: all CTAs work, no broken links, analytics fire

**Implementation Details:**
- Refactor incrementally: Section by section
- Use Tailwind responsive classes: `md:`, `lg:`
- Test on real device (or Chrome DevTools mobile emulation)

**Validation Method:**
- Home page renders ✅
- Mobile layout wraps correctly ✅
- All CTAs clickable ✅
- Lighthouse Mobile score >75 ✅

**Owner:** Visualist + Architect agents  
**Sign-off:** Visualist + QA

---

#### S4.4: Refactor ROI Page (Use Shared Primitives + Mobile Polish)
**Objective:** ROI page sections use shared components; responsive calculator.

**Acceptance Criteria:**
- [ ] Update `app/roi/page.tsx`:
  - Replace section divs with `<Section>` component
  - Replace info boxes with `<Callout>` component
  - Replace KPI displays with `<Stat>` component
  - Preserve calculator logic + state
- [ ] Mobile responsiveness:
  - Ensure calculator inputs stack vertically on mobile
  - Results table: use horizontal scroll or collapse rows (mobile-friendly)
  - PDF export button: prominent on all screen sizes
  - Touch targets: 44×44px min
- [ ] Visual regression snapshot: `roi-mobile.png` + `roi-desktop.png`

**Implementation Details:**
- Refactor incrementally
- Use Tailwind: `flex flex-col md:flex-row` for responsive layouts

**Validation Method:**
- ROI page renders ✅
- Mobile layout responsive ✅
- Calculator still calculates correctly ✅
- Lighthouse Mobile score >75 ✅

**Owner:** Visualist + Architect agents  
**Sign-off:** Visualist + QA

---

#### S4.5: Responsive Overflow + Touch Target Audit
**Objective:** Ensure all pages are mobile-safe.

**Acceptance Criteria:**
- [ ] Playwright test: `e2e/responsive.spec.ts`
  - Load each page at 375×667 (mobile), 768×1024 (tablet), 1280×720 (desktop)
  - Verify no horizontal overflow (no scrollbar off-screen)
  - Verify buttons have min 44×44px tap target
  - Verify text readable (font size >= 12px)
  - Verify forms accessible on mobile (no hidden inputs)
- [ ] Fix issues:
  - Add padding to buttons
  - Use Tailwind `w-full` on mobile inputs
  - Adjust font sizes with responsive classes
- [ ] Audit all pages:
  - Home, ROI, Diagnostic, Singularity, Product, Docs, Pricing, Company

**Implementation Details:**
- Test at 3 breakpoints
- Use Chrome DevTools mobile emulation
- Lint: Lighthouse CI reports

**Validation Method:**
- Run responsive test; all pages pass ✅
- Manual check on real iPhone ✅
- Lighthouse Mobile score >75 ✅

**Owner:** Gatekeeper agent  
**Sign-off:** QA + CTO

---

### Sprint 4 Demo
- Design system tokens defined (`colors`, `spacing`, `typography`)
- Shared primitives created (Section, Card, Stat, Callout) + tested
- Home page refactored + mobile responsive ✅
- ROI page refactored + mobile responsive ✅
- Responsive audit: no horizontal overflow, touch targets correct
- Visual regression snapshots generated
- Lighthouse Mobile score >75

---

---

## SPRINT 5: ROI CALC HARDENING (Board-Ready, Adoption-Obvious)

**Duration:** 1 week  
**Goal:** ROI deterministic; input validation robust; "compounding view" shows adoption impact; 5% Year 1 explicit; remove Basic Model.  
**Demo:** ROI page shows adoption presets + deep-dive compounding chart; PDF export deterministic; Playwright tests pass.

### Tickets

#### S5.1: Remove Basic Model (Deep Model Only)
**Objective:** Simplify decision tree; Deep Model = only choice.

**Acceptance Criteria:**
- [ ] Audit `app/roi/page.tsx` + `lib/roi/calc.ts`:
  - Find "Basic Model" references
  - Remove toggle / mode picker if present
  - Keep "Deep Model" as default (only option)
- [ ] Update UI:
  - No "Select Model: Basic / Deep" dropdown
  - Copy: "YardFlow ROI Modeling (Deep Model)"
  - Remove any "Basic Model" explanatory text
- [ ] Update tests:
  - All golden tests use Deep Model
  - Remove Basic Model test fixtures

**Implementation Details:**
- Grep for "Basic Model" references
- Delete unused code paths
- Update copy

**Validation Method:**
- Build succeeds ✅
- ROI page shows no model picker ✅
- Golden tests pass (Deep Model only) ✅

**Owner:** Economist agent  
**Sign-off:** CTO + Product Lead

---

#### S5.2: Input Validation + Error State Handling
**Objective:** Prevent NaN cascades; clear error messages.

**Acceptance Criteria:**
- [ ] Create `src/lib/roi/validation.ts`:
  ```typescript
  interface ValidationResult {
    valid: boolean;
    errors: { field: string; message: string }[];
  }
  
  export fn validateROIInputs(inputs: RoiV2Inputs): ValidationResult
  ```
  - Validate: all numbers >= 0, no NaN, no Infinity
  - Check: adoption % in [5, 100], facilities >= 1
  - Check: labor/dwell/detention percentages in [0, 100]
  - Return clear error messages
- [ ] Wire into ROI page:
  - Before calling `calcRoiV2()`, call `validateROIInputs()`
  - If invalid, show error banner (Callout component, variant="error")
  - Disable "Calculate" button until valid
- [ ] Unit test: `src/lib/roi/validation.test.ts`
  - Test valid inputs → `{ valid: true }`
  - Test invalid (negative labor%) → `{ valid: false, errors: [...] }`
  - Test edge cases (0 facilities, 100% adoption)
- [ ] Playwright test: "Input validation prevents calculation errors"

**Implementation Details:**
- Validation function: pure logic, no side effects
- Error display: Callout with red styling
- Field-level feedback: red border on input if invalid

**Validation Method:**
- Input negative value; error banner appears ✅
- Fix input; error clears, calculate enabled ✅
- Test passes ✅

**Owner:** Architect agent  
**Sign-off:** CTO + QA

---

#### S5.3: Adoption Compounding View (Narrative-Driven, Math Frozen)
**Objective:** Show how adoption % impacts ROI (without changing formula).

**Acceptance Criteria:**
- [ ] Create `components/AdoptionCompoundingChart.tsx`:
  - Takes: baseline ROI inputs
  - Generates: ROI outputs for adoption levels [5%, 10%, 25%, 50%]
  - Does NOT change input values; only shows narrative impact
  - Chart: line graph (adoption % on X, Year 3 ROI on Y)
  - Annotations: "5% Year 1 (Deep Model default)", "50% inflection point"
- [ ] Add to ROI page:
  - Position below calculator results
  - Section title: "Network Compounding Effect"
  - Subtitle: "As adoption increases, compounding accelerates. Payback time contracts."
  - Chart + table showing Year 1, Year 3 ROI at each adoption level
- [ ] Ensure chart is responsive + accessible:
  - Text description of chart for screen readers
  - Reduced motion: show table instead of animated chart
- [ ] Unit test: verify chart data matches golden test outputs

**Implementation Details:**
- Chart library: existing (e.g., Recharts, or simple SVG)
- Data generation: loop over adoption presets, call `calcRoiV2()` with baseline inputs
- Snapshot test: chart data matches baseline

**Validation Method:**
- ROI page shows adoption compounding chart ✅
- Chart shows adoption 5% → Year 3 ROI = X, adoption 50% → Year 3 ROI = Y ✅
- Golden test snapshots match ✅

**Owner:** Visualist agent  
**Sign-off:** CTO + Product Lead

---

#### S5.4: Deterministic PDF Export
**Objective:** PDF output consistent + "board-ready".

**Acceptance Criteria:**
- [ ] Update `/api/pdf/roi` endpoint:
  - Seed randomness (if any) with fixed value
  - Use same formatting as on-page results
  - Include adoption % in PDF
  - Include compounding chart (if possible)
  - Logo, branding consistent
- [ ] Unit test: `src/lib/roi/pdfExport.test.ts`
  - Call `generateROIPDF(inputs)` twice with same inputs
  - Compare PDF binary output (should match exactly)
  - Visual test: compare PDF screenshot to golden image
- [ ] Playwright test: "PDF export generates deterministic output"

**Implementation Details:**
- Use fixed random seed: `Math.seedrandom('fixed-seed')`
- PDF library: existing (e.g., jsPDF, pdfkit)
- Snapshot: PDF page 1 as image

**Validation Method:**
- Export PDF twice; files are identical (binary match) ✅
- PDF visual snapshot matches golden ✅

**Owner:** Architect agent  
**Sign-off:** CTO + Closer

---

#### S5.5: Copy Updates: 5% Year 1 Explicit + Adoption Ladder
**Objective:** All copy reflects adoption narrative.

**Acceptance Criteria:**
- [ ] Update ROI page copy:
  - Headline: "YardFlow ROI (Deep Model) – Default: 5% Year 1 Adoption"
  - Intro: "Most conservative assumption: standardize 5% of your network in Year 1. See how compounding changes the math."
  - CoverageSlider label: "Network Coverage (%)"
  - Adoption presets: "Year 1 (5%)", "Moderate (10%)", "Aggressive (25%)", "Inflection (50%)"
- [ ] Ensure copy aligns with brand voice (S3.4)
- [ ] Add Playwright test: "Copy contains '5%', 'adoption', 'network' in key sections"

**Implementation Details:**
- Update strings in page component
- Use BRAND_NAMES constants (S3.1)

**Validation Method:**
- ROI page rendered; copy includes "5% Year 1" ✅
- Adoption presets named correctly ✅
- Playwright test passes ✅

**Owner:** Closer agent  
**Sign-off:** CEO + Product Lead

---

### Sprint 5 Demo
- ROI page shows Deep Model only (no Basic Model)
- Input validation active: invalid inputs blocked with clear errors
- Adoption Compounding Chart displays: shows how adoption % drives ROI
- PDF export deterministic (binary match across runs)
- Copy updated: "5% Year 1" explicit; adoption ladder clear
- Playwright tests pass: no NaN, no cascading errors

---

---

## SPRINT 6: DIAGNOSTIC FLOW (Clarity, Conversion, Handoff)

**Duration:** 1 week  
**Goal:** Diagnostic 3-step UX clear; results actionable; CTA wiring to audit + ROI.  
**Demo:** Diagnostic flow improved; result page shows top drivers + next actions; CTAs link to audit booking + ROI with adoption presets.

### Tickets

#### S6.1: Stepper UX Improvements + Progress Persistence
**Objective:** User never loses progress; clear step indicators.

**Acceptance Criteria:**
- [ ] Add visual stepper to `app/diagnostic/page.tsx`:
  - Steps: 1. "About Your Yard", 2. "Operations", 3. "Results"
  - Show current step + progress bar
  - Allow back/forward navigation (no skipping)
- [ ] Progress persistence:
  - Save form state to localStorage: `key: 'diagnostic-form-v1'`
  - On page load, restore previous state (if exists)
  - Clear on completion or after 7 days
- [ ] Mobile layout:
  - Stack steps vertically on mobile
  - Responsive progress bar
- [ ] Unit test: verify localStorage read/write
- [ ] Playwright test: "Complete step 1; reload page; data preserved"

**Implementation Details:**
- State: React `useState` + `useEffect` (localStorage sync)
- Stepper component: reusable (2-3 lines per step)
- Icons: checkmark for completed steps

**Validation Method:**
- Fill step 1; reload; data persists ✅
- Progress bar shows correct step ✅
- Back button works ✅

**Owner:** Architect agent  
**Sign-off:** QA + CTO

---

#### S6.2: Result Page Clarity (Top Drivers, Cost Impact, Next Steps)
**Objective:** Results page tells clear story.

**Acceptance Criteria:**
- [ ] Update diagnostic results page:
  - Section 1: "Top 3 Pain Points" (ranked by impact)
    - Card per pain point: title, description, estimated annual impact ($)
  - Section 2: "Network Readiness" (adoption prerequisites)
    - Checklist: "Standardized dwell protocols", "Digital gate verification", "Driver KYC", etc.
  - Section 3: "Recommended Next Step" (CTA)
    - Primary CTA: "Book a Network Audit" (links to `/contact`)
    - Secondary CTA: "Run ROI with your facility count" (links to `/roi` with adoption presets)
- [ ] Use Callout + Stat + Card primitives (S4.2)
- [ ] Ensure copy is clear + data-driven (not salesy)

**Implementation Details:**
- Result calculation: existing diagnostic logic
- Formatting: use primitives
- CTAs: use CTAButton (S3.2)

**Validation Method:**
- Complete diagnostic; results show top 3 pain points ✅
- CTAs are visible + functional ✅
- Playwright test: "CTA leads to correct page" ✅

**Owner:** Closer agent  
**Sign-off:** Product Lead + QA

---

#### S6.3: CTA Wiring (Book Audit + Run ROI with Adoption)
**Objective:** CTAs are smart; pass context forward.

**Acceptance Criteria:**
- [ ] "Book a Network Audit" CTA:
  - Link to `/contact?source=diagnostic&pain=[ top pain point ]`
  - Contact page pre-fills pain point (optional: pre-populates copy)
- [ ] "Run ROI" CTA:
  - Link to `/roi?adoption=5&facilities=[ user's facility count ]`
  - ROI page loads with adoption preset (5% Year 1) + user's facility count pre-filled
  - User can immediately see ROI for their scenario
- [ ] Unit test: verify URL parameters generated correctly
- [ ] Playwright test: "Click 'Run ROI'; ROI page loads with prefilled inputs"

**Implementation Details:**
- Use `useRouter` + `router.push()` or `<Link href=''>`
- Pass params as query strings
- ROI page: read from query, validate, apply to form

**Validation Method:**
- Click "Run ROI" from diagnostic results ✅
- ROI page loads with facility count + adoption preset ✅
- Calculate button works ✅

**Owner:** Architect agent  
**Sign-off:** CTO + QA

---

#### S6.4: Diagnostic Visual Consistency (Primitives + Mobile Polish)
**Objective:** Diagnostic page uses shared primitives; mobile responsive.

**Acceptance Criteria:**
- [ ] Update `app/diagnostic/page.tsx`:
  - Use `<Section>`, `<Card>`, `<Callout>` primitives (S4.2)
  - Replace ad-hoc divs
- [ ] Mobile responsiveness:
  - Test at 375×667 (iPhone SE)
  - Form inputs stack vertically
  - Results cards stack on mobile
  - Stepper responsive
- [ ] Visual regression snapshot: `diagnostic-mobile.png`, `diagnostic-desktop.png`

**Implementation Details:**
- Refactor incrementally
- Use Tailwind responsive classes

**Validation Method:**
- Diagnostic page renders ✅
- Mobile layout responsive ✅
- Visual regression snapshot matches ✅

**Owner:** Visualist agent  
**Sign-off:** Visualist + QA

---

#### S6.5: Diagnostic E2E Test (Full Flow)
**Objective:** End-to-end validation.

**Acceptance Criteria:**
- [ ] Create `e2e/diagnostic-flow.spec.ts`:
  - Load `/diagnostic`
  - Fill step 1 (facility count, yard type)
  - Fill step 2 (labor %, dwell time, detention rate)
  - Submit → results page loads
  - Verify top 3 pain points rendered
  - Click "Run ROI" → ROI page loads with prefilled inputs
  - Verify inputs match diagnostic inputs
- [ ] Run in CI

**Implementation Details:**
- Playwright test: fills form, verifies navigation, checks data

**Validation Method:**
- Test passes ✅
- No console errors ✅

**Owner:** Gatekeeper agent  
**Sign-off:** QA

---

### Sprint 6 Demo
- Diagnostic flow: 3-step stepper with progress persistence
- Results page: top 3 pain points ranked by impact
- CTA wiring: "Book Audit" → contact page; "Run ROI" → ROI page with prefilled facility count + adoption preset
- Mobile responsive ✅
- E2E test: full flow works ✅

---

---

## SPRINT 7: SINGULARITY PAGE (Deterministic, Adoption-Driven, Legendary)

**Duration:** 1 week  
**Goal:** Singularity deterministic (seeded randomness); adoption slider drives narrative; performance >55 FPS; A11y compliant.  
**Demo:** Singularity page loads fast; adoption presets change visualization; performance excellent; reduced-motion respected.

### Tickets

#### S7.1: Seeded Randomness + Determinism
**Objective:** Singularity visualization repeatable (same seed = same output).

**Acceptance Criteria:**
- [ ] Update `components/singularity/SingularityVisualizer.tsx`:
  - Accept optional `seed` prop (default: current timestamp or fixed value)
  - Use `seedrandom(seed)` for all randomness (particle positions, colors, timing)
  - No externally random state (Math.random() forbidden)
- [ ] Unit test: `components/singularity/SingularityVisualizer.test.tsx`
  - Render with seed "test-seed-123"
  - Capture screenshot 1
  - Render again with same seed
  - Capture screenshot 2
  - Assert: visual match (within 1% pixel diff)
- [ ] Playwright test: "Singularity with seed=fixed generates identical output on reload"

**Implementation Details:**
- Lib: `seedrandom` (npm package)
- Seed prop: optional, defaults to `Date.now()` (or fixed in tests)
- All PRNG calls: use seeded generator, not Math.random()

**Validation Method:**
- Render Singularity with seed ✅
- Reload page; visuals identical ✅
- Test passes ✅

**Owner:** Architect agent  
**Sign-off:** CTO

---

#### S7.2: Performance Pass (DOM Reduction, Memoization, <100ms Sim)
**Objective:** Singularity performs excellently (>55 FPS, <100ms sim time).

**Acceptance Criteria:**
- [ ] Profile existing Singularity:
  - Measure: FPS, GPU utilization, CPU time for sim
  - Identify bottlenecks (excessive re-renders, large DOM, GPU stalls)
- [ ] Optimize:
  - Memoize: `React.memo()` for static components + children
  - Canvas: reduce draw calls (batch updates, use requestAnimationFrame)
  - DOM: avoid unnecessary DOM mutations (use virtual canvas instead)
  - Shaders: profile shader compile time (target: <50ms)
- [ ] Targets:
  - Sustained 55+ FPS (60 ideal)
  - Simulation time: <100ms per frame
  - Memory: <100MB delta
  - TTI (Time to Interactive): <2 sec
- [ ] Playwright test: "Singularity maintains 55+ FPS over 10-second loop"
- [ ] Lighthouse Performance: >80

**Implementation Details:**
- Tools: Chrome DevTools Performance tab, Lighthouse
- Profiling: measure current state, optimize iteratively
- Commit: before/after performance metrics in PR

**Validation Method:**
- Run DevTools Performance profiler ✅
- 10-second loop shows 55+ FPS average ✅
- Lighthouse score >80 ✅

**Owner:** Gatekeeper agent  
**Sign-off:** CTO

---

#### S7.3: Adoption Slider Presets (Drive Phase Shift Narrative)
**Objective:** Adoption % slider on Singularity; changes visualizer state + narrative.

**Acceptance Criteria:**
- [ ] Add CoverageSlider to Singularity page (top section)
- [ ] Wire to SingularityVisualizer:
  - Adoption % does NOT change math (Singularity is deterministic sim, not ROI calc)
  - Instead: adoption % drives visualization mode:
    - 5% (Year 1): "Chaos before standardization" (red particles, high variance)
    - 10%+: "Flow emerging" (blue particles, smoother)
    - 25%+: "Network effect" (green particles, harmonized)
    - 50%+: "Singularity" (purple particles, phase shift visualization)
  - Copy updates dynamically: "**At XX% adoption, network transitions to..."**
- [ ] Presets: 5%, 10%, 25%, 50% (buttons below slider)
- [ ] Reduced motion: show static image + progress bar instead of animation

**Implementation Details:**
- Props: `adoptionPercent` → `SingularityVisualizer`
- Visualizer internals: color + particle count based on adoption %
- Copy: template with adoption % variable

**Validation Method:**
- Adjust adoption slider; visualization changes ✅
- Presets work ✅
- Copy updates ✅
- Reduced motion: static image shown ✅

**Owner:** Visualist agent  
**Sign-off:** CTO + Product Lead

---

#### S7.4: Accessibility + Reduced Motion Compliance
**Objective:** Singularity accessible to all users.

**Acceptance Criteria:**
- [ ] ARIA labels:
  - Slider: `aria-label="Network coverage percentage, from 5 to 100 percent"`
  - Visualizer: `aria-label="Singularity protocol visualization, animates with adoption changes"`
  - Presets: `aria-label="Preset adoption level: 5% Year 1"`
- [ ] Keyboard support:
  - Slider: arrow keys, Home/End keys work
  - Presets: Tab to reach, Enter/Space to activate
- [ ] Reduced motion:
  - Respects `prefers-reduced-motion` media query
  - Show static image instead of animation
  - Text description of phase shift (e.g., "At 50% adoption, particles harmonize")
- [ ] Color contrast:
  - Text on background: WCAG AA (4.5:1 for body, 3:1 for large text)
  - Test with WebAIM contrast checker
- [ ] Lighthouse Accessibility: >95

**Implementation Details:**
- ARIA: use React `aria-*` props
- Keyboard: handle keydown events on slider
- Reduced motion: conditional rendering (check CSS media query)
- Contrast: use brand colors (verify compliance)

**Validation Method:**
- Lighthouse A11y score >95 ✅
- Tab through page; all interactive elements reachable ✅
- Arrow keys move slider ✅
- Reduced motion toggle: animation disables ✅
- Color contrast: WebAIM check passes ✅

**Owner:** Architect agent  
**Sign-off:** A11y reviewer

---

#### S7.5: Singularity Visual Cohesion (Brand Colors + Animation Polish)
**Objective:** Singularity visually matches site brand; animation polished.

**Acceptance Criteria:**
- [ ] Brand color palette:
  - Void (#232A35): background
  - Neon (#D91411): chaos / variance (red particles at 5%)
  - Flow (#05ACEB): standardized flow (blue particles at 25%)
  - Steel (#8892A8): neutral / stable state
  - Purple (custom): singularity state (50%+)
  - Apply consistently to particles + text
- [ ] Animation polish:
  - Easing: use consistent easing curves (ease-in-out for transitions)
  - Duration: adoption change animation <500ms (no jank)
  - Particle behavior:
    - 5%: random, chaotic movement
    - 10%: beginning to orbit
    - 25%: circular flow pattern
    - 50%: harmonized convergence (singular point)
  - Smooth particle fade in/out (no pop-in)
- [ ] Visual regression snapshot: Singularity at each adoption level

**Implementation Details:**
- Shader/canvas code: update particle colors + movement based on adoption %
- Easing: use Framer Motion or GSAP utilities
- Snapshot test: capture each adoption level as image

**Validation Method:**
- Singularity renders with brand colors ✅
- Adoption change: smooth transition <500ms ✅
- Visual snapshot matches golden ✅

**Owner:** Visualist agent  
**Sign-off:** CTO + Visualist

---

#### S7.6: Singularity E2E Test + Performance Profiling
**Objective:** End-to-end validation + continuous performance monitoring.

**Acceptance Criteria:**
- [ ] Create `e2e/singularity.spec.ts`:
  - Load `/singularity`
  - Verify page renders (no errors)
  - Verify 3D visualization present (canvas element exists)
  - Adjust adoption slider → visualization updates
  - Click preset chips → adoption changes
  - Measure FPS (use performance API or manual frame count)
  - Assert: FPS >55 for 10-second loop
  - Verify reduced-motion respected
- [ ] CI: run test on every PR + main branch
- [ ] Performance baseline: document current FPS + memory in `docs/PERFORMANCE_BASELINES.md`

**Implementation Details:**
- Playwright: inspect canvas, track animations
- Performance API: use `performance.getEntriesByType('measure')`
- Baseline: store current metrics; fail CI if drops >10%

**Validation Method:**
- Test passes ✅
- FPS >55 ✅
- Performance metrics logged ✅

**Owner:** Gatekeeper agent  
**Sign-off:** CTO + QA

---

### Sprint 7 Demo
- Singularity page deterministic (seeded randomness)
- Performance: 55+ FPS sustained; <100ms sim; Lighthouse >80
- Adoption slider: drives visualization phase shift (5% chaos → 50% singularity)
- A11y: WCAG AA compliant; reduced-motion respected
- Brand colors: consistent with site palette
- E2E test: full flow works; performance tracked

---

---

## IV. TESTING STRATEGY (ALL SPRINTS)

### Golden Tests (Sprint 0, Maintained Throughout)
- **Economics:** snapshots for ROI, Diagnostic, Network Multiplier (inputs → outputs)
- **Format:** Vitest + snapshots
- **Trigger:** CI on every PR; fail if output drifts
- **Review:** economist + CTO approval required

### Unit Tests (50+ tests across all tickets)
- Validation functions (S5.2)
- Component rendering (S4.2)
- Adoption model (S1.1)
- Utility functions (math, formatting)
- **Coverage target:** >80% `src/` directory
- **Framework:** Vitest

### Playwright E2E Tests (20+ tests)
- Smoke tests (S0.4): core routes load
- Link walk (S3.3): no dead links
- Diagnostic flow (S6.5): step 1 → 2 → 3 → results → ROI
- Singularity (S7.6): adoption slider, performance, FPS
- ROI calculation (S5): validation errors, PDF export
- Responsive (S4.5): mobile/tablet/desktop layouts
- **Framework:** Playwright; run in CI

### Visual Regression Tests (10+ snapshots)
- Home page (desktop + mobile, S1.5, S4.3)
- ROI page (desktop + mobile, S1.5, S4.4)
- Diagnostic (desktop + mobile, S6.4)
- Singularity (each adoption level, S7.5)
- **Tool:** Playwright `expect(screenshot).toMatchSnapshot()`
- **CI:** fail if diff >2%

### Accessibility Tests (A11y)
- Lighthouse A11y audit (target: >95)
- WCAG AA compliance (color contrast, keyboard nav)
- Reduced motion support verification
- **Tools:** Lighthouse, axe-core (optional)

### Performance Tests
- Lighthouse Performance (target: >75)
- FPS measurement (target: 55+ sustained)
- Memory profiling (target: <100MB delta)
- Bundle size tracking (target: <200KB JS)
- **CI:** fail if performance drops >10%

---

---

## V. DEFINITION OF DONE (Per Ticket)

Every ticket must meet these criteria before marking complete:

1. **Code:**
   - [ ] Implementation complete (PR merged to main)
   - [ ] TypeScript strict mode passes
   - [ ] ESLint clean (no warnings)
   - [ ] Unit tests + acceptance criteria met
   - [ ] Playwright tests pass (if applicable)
   - [ ] Visual regression snapshots captured (if applicable)

2. **Testing:**
   - [ ] Golden tests unchanged (econ outputs locked)
   - [ ] No console errors or warnings
   - [ ] No network errors (404s, timeouts)
   - [ ] Accessible (WCAG AA, reduced-motion respected)

3. **Documentation:**
   - [ ] Inline comments for non-obvious logic
   - [ ] PR description: what changed, why, testing approach
   - [ ] If breaking change: migration guide

4. **Sign-off:**
   - [ ] Owner agent signs off (work complete)
   - [ ] Reviewer agent signs off (tested + verified)
   - [ ] Gatekeeper gate passes (CI green)

5. **Demoable:**
   - [ ] Feature works end-to-end (no half-baked code)
   - [ ] Can be tested manually by QA
   - [ ] Regression test in place (prevents future breakage)

---

---

## VI. SPRINT DEPENDENCIES + SEQUENCING (REVISED: S2 Deferred)

```
Sprint 0 (Guardrails + Adoption Semantics)
  └─→ Sprint 1 (Adoption Slider)  [needs golden tests from S0, adoption semantics from S0.5a]
  └─→ Sprint 2 (Presets + Performance)  [independent; can start after S0]
  └─→ Sprint 3 (Brand/IA)   [independent; no code changes to logic]

Sprint 1 ✓
  └─→ Sprint 3 (Brand/IA)

Sprint 2 ✓
  └─→ Sprint 3 (Brand/IA)

Sprint 3 ✓
  └─→ Sprint 4 (UI Design)  [brand + IA foundation]

Sprint 4 ✓
  └─→ Sprint 5 (ROI)        [shares UI primitives]
  └─→ Sprint 6 (Diagnostic)  [shares UI primitives]

Sprint 5 ✓
  └─→ Sprint 6 (Diagnostic) [depends on ROI adoption presets wired]

Sprint 6 ✓
  └─→ [No dependencies]

---

## TIMELINE (REVISED: 9 Weeks Total)

```
Week 1: Sprint 0 (Guardrails + Adoption Semantics)
        └─ Output: CI green, golden tests locked, adoption % semantics documented

Week 2: Sprint 1 (Adoption Slider)
        └─ Output: CoverageSlider works on ROI + Diagnostic; adoption copy shows

Week 3: Sprint 2 (Adoption Presets + Performance)
        └─ Output: Presets consistent across pages; performance baselines set; mobile optimized

Week 4: Sprint 3 (Brand + IA Consistency) [can overlap with Sprint 2 end]
        └─ Output: Brand names normalized; CTAs unified; orphaned content cleaned

Week 5: Sprint 4 (Premium UI Design)
        └─ Output: Home + ROI refactored with primitives; mobile responsive

Week 6: Sprint 5 (ROI Hardening)
        └─ Output: ROI deterministic; validation robust; adoption compounding chart visible

Week 7: Sprint 6 (Diagnostic + CTA Wiring)
        └─ Output: Diagnostic clearer; CTAs link to ROI with presets

Week 8: UAT + Final Polish
        └─ Output: Stakeholder sign-off; final bugs fixed

Week 9: Code Freeze + Launch
        └─ Output: Deployed to production

**Total: 9 weeks (1 week earlier than original plan)**

---

## VII. RISK MITIGATION + ESCALATION

### Critical Risks

| Risk | Probability | Impact | Mitigation | Escalation |
|------|------------|--------|-----------|-----------|
| Econ formula changes during refactor | Medium | High | Golden tests (S0); pair review on all math | CTO approval for any formula change |
| Adoption slider accidentally alters outputs | Medium | High | Clear separation (narrative-only); unit tests | Economist review before merge |
| Animation performance > 45% FPS | Low | High | Early profiling (S2.5); memoization; reduce complexity | Downgrade to static images if needed |
| Brand name inconsistency remains after S3 | Low | Medium | Grep audit; CI lint rule (optional) | Manual review + corrections |
| Scope creep on Singularity visuals | Medium | Medium | Animation Lab sandbox (S2); product gate on new assets | Defer to post-launch |
| Determinism regression in Singularity | Low | Medium | Seeded PRNG + unit tests (S7.1) | Roll back + investigate |

### Escalation Path
1. **Developer:** identifies risk, documents in PR
2. **Gatekeeper:** reviews risk in gate; can block merge
3. **CTO:** for technical escalation (architecture, performance)
4. **Product Lead:** for scope/narrative escalation
5. **CEO:** for strategic escalation (launch date, positioning)

---

---

## VIII. DELIVERABLES + SUCCESS CRITERIA

### Per Sprint
- [ ] Demoable build (runs locally, zero errors)
- [ ] All tests pass (unit, Playwright, golden)
- [ ] Visual regression snapshots (if applicable)
- [ ] PR merged to main
- [ ] Deployed to staging (or main if continuous deploy)

### Project Close-Out
- [ ] All 7 sprints complete
- [ ] ~200+ tests (unit + E2E + visual)
- [ ] Zero critical bugs
- [ ] Performance benchmarks met (55+ FPS, >75 Lighthouse, <200KB JS)
- [ ] A11y compliant (WCAG AA)
- [ ] Adoption narrative crystal clear (5% Year 1 default, slider prominent)
- [ ] Site cohesive (one name, one CTA ladder, no orphaned pages)
- [ ] Ready for launch

### Business Outcomes (Success Indicators)
- Conversion rate: CTAs click-through increases 10%+
- Engagement: ROI calc usage increases (tracked via analytics)
- Credibility: no "pooched elements"; all claims data-backed
- Motion value: animations communicate protocol standardization (tracked via user testing)
- Performance: <2.5s LCP, <100 CLS, 55+ FPS (Core Web Vitals)

---

---

## IX. TEAM ROLES + RESPONSIBILITIES

| Agent | Role | Key Sprints | Key Tickets |
|-------|------|-----------|-----------|
| **Economist** | Validates all econ math; locks golden tests | S0, S1, S5 | S0.1, S0.2, S0.3, S1.1, S5.1 |
| **Visualist** | UI design; animations; brand polish | S2, S4, S7 | S2.2, S2.3, S4.1-2, S4.3-4, S7.3, S7.5 |
| **Architect** | System design; performance; integration | S1, S4, S5, S7 | S1.1, S1.3, S4.5, S5.2, S5.4, S7.1, S7.4 |
| **Gatekeeper** | CI/CD; quality gates; testing | S0, S2, S4, S7 | S0.4, S0.5, S2.5, S3.5, S4.5, S7.2, S7.6 |
| **Closer** | Copy; positioning; messaging | S3, S5, S6 | S3.1-2, S3.4, S5.5, S6.2, S6.3 |

---

---

## X. WAVE 2: POST-LAUNCH ENHANCEMENTS (Deferred from Sprint 2)

**Duration:** TBD (post-launch roadmap)  
**Goal:** Enhance animations + interactive experiences once core narrative is launched and validated.

### Deferred Tickets (Wave 2 Backlog)

1. **Animation Lab (/dev/animation-lab)** – Internal preview route for Lottie + MP4 assets
   - Effort: 1 week (original S2.1-2.3)
   - Value: Internal testing + creative iteration
   - Dependency: None (can start immediately post-launch)

2. **Lottie Integration** – Integrate provided Lottie animations (trucks, circulating particles, etc.)
   - Files: `public/animations/driver-journey.json`, `trucks.json`, etc.
   - Value: Enhance protocol visualization + adoption narrative visuals
   - Depends on: Animation Lab route (W2.1)

3. **MP4 Video Gallery** – Clean presentation of proof videos (without URL bars)
   - Effort: 2-3 days
   - Value: Stronger proof story + credibility
   - Note: Requires removing any videos with URL bar visible in-frame

4. **Singularity Shader Polish** – Optimize Schwarzschild raymarching + particle performance
   - Effort: 3-4 days (profiling + optimization)
   - Value: 60+ FPS guarantee on high-end devices
   - Depends on: Sprint 0 performance baselines

5. **Audio Integration** – Variance hum → Flow pulse (protocol state transition sounds)
   - Effort: 1 week (sound design + integration)
   - Value: Emotional resonance + adoption narrative reinforcement
   - Dependency: None (new work)

### Why Wave 2?

- **Launch Focus:** Core narrative (adoption % → compounding → investor confidence) is more important than animation polish
- **Risk Reduction:** Removes 1 week of animation work; frees team for ROI + Diagnostic hardening
- **Time to Market:** Launch 1 week earlier; validate product-market fit before investing in animated experiences
- **Iteration:** Post-launch user feedback may reveal which animations resonate; build Wave 2 based on data

### Wave 2 Go/No-Go Decision

Post-launch success metrics determine Wave 2 prioritization:
- If adoption flow CTAs show >25% click-through: invest in Animation Lab + Lottie integration
- If Singularity page becomes key conversion point: invest in shader polish + audio
- If adoption narrative resonates without animation: Wave 2 is optional (defer to later)

---

---

## XI. APPENDIX: COMMAND REFERENCE

### Build + Test
```bash
npm run build              # Full build (Turbopack)
npm run dev               # Dev server
npm run lint              # ESLint
npm run typecheck         # TypeScript strict
npm run test:unit         # Vitest unit tests
npm run test:e2e:smoke    # Playwright smoke
npm run test:e2e:full     # Playwright full suite
npm run test:visual       # Visual regression
npm run coverage          # Coverage report (target: >80%)
```

### Debug
```bash
npm run dev -- --turbo    # Turbopack with verbose logging
npm run test:unit -- --reporter=verbose
npm run test:e2e:smoke -- --headed  # Playwright headed mode
```

### Deployment
```bash
git push origin main      # Triggers Vercel auto-deploy
# Verify: https://flow-state-klbt.vercel.app/
```

---

This sprint plan is **exhaustive, atomic, and testable**. Each ticket is independently executable and contributes to a clear sprint goal. All 7 sprints compose into a complete, demoable product.

---

**Next Step:** Send this sprint plan to a subagent for comprehensive review + improvement suggestions. Once reviewed, finalize implementation roadmap.


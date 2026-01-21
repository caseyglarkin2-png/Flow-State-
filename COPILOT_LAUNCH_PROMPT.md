# YardFlow Launch: The Variance Tax Protocol - Master Execution Prompt

**Status:** PRODUCTION LAUNCH - January 2026  
**Goal:** Transform flow-state-klbt.vercel.app into the definitive "Singularity Event" experience for YardFlow (First Yard Network System)  
**Constraints:** No changes to economic methodology. Repurpose existing ROI/Variance/Singularity infrastructure.  
**Tech Stack:** Next.js 16.1 (Turbopack), React 18+, @react-three/fiber, Zustand, Tailwind, Framer Motion, Custom GLSL.

---

## Part 1: The Strategic Thesis (For Your Team)

### Why This Matters
The logistics industry is transitioning from the "Great Freight Recession" (2022-2025) into a new regime: **Stochastic Capacity**. Capacity that exists, spikes, vanishes—unpredictably. The companies winning in 2026 won't buy the cheapest freight; they'll buy the most predictable outcomes.

YardFlow solves the unpredictability problem by introducing standardized protocols that transform yards from "passive parking lots" into "control valves" for supply chain networks. This is the **Singularity Event**—the collapse of variance into industrial fluidity.

**The Website's Job:**
- **Visceral:** Use WebGL to visualize the shift from Chaos (Black Hole) → Order (Particle Network).
- **Rational:** Quantify the hidden cost of unpredictability (Variance Tax Calculator).
- **Narrative:** Position YardFlow as the first YNS (Yard Network System), not a "yard app."

---

## Part 2: Sprint Breakdown (3 Sprints, ~10 Weeks)

### SPRINT 1: The Logic Core & Strategic Spine
**Goal:** Build the economic engine + narrative architecture. No visual polish yet.  
**Ownership:** Agent A (Economist) + Agent E (Closer)

#### Task 1.1: Audit & Refactor VarianceState (TypeScript + Zustand)
**Objective:** Ensure formulas match the whitepaper exactly. Add traceability comments.

**Acceptance Criteria:**
- [ ] All 6 cost components (Recovery, Detention, Labor, Chargeback, Working Capital, Lost Sales) implemented with industry-sourced defaults.
- [ ] Every input/derived value has JSDoc comment with data source (ATRI, CSCMP, DAT, BLS, FreightRoll proprietary).
- [ ] Zustand store exports: `useVarianceTaxStore` with getters for `totalVarianceTax`, `reynoldsScore`, `syntheticCapacity`.
- [ ] Golden test suite (Vitest) with snapshots for 4 presets: mid-market, enterprise, high-velocity, low-tech.
- [ ] TypeScript strict mode: zero `any`, all types exported.

**Implementation Checklist:**
```typescript
// src/lib/varianceTax/store.ts (already exists, validate)
export const useVarianceTaxStore = create<VarianceState>(...);
// Ensure exports:
// - updateInput(key, value)
// - selectOutputs (totalVarianceTax, reynoldsScore, syntheticCapacity)
// - selectBreakdown (detailed cost by category)

// src/lib/varianceTax/__tests__/golden.test.ts (run & verify)
describe('Variance Tax Golden Tests', () => {
  it('should match snapshot for mid-market preset', () => {...});
  // Must pass with current snapshot
});
```

**Validation:**
```bash
npm test -- src/lib/varianceTax/__tests__/
# Expected: All 4 presets pass snapshot comparison
```

---

#### Task 1.2: Homepage Strategic Narrative (Content + Structure)
**Objective:** Define the customer journey spine. Homepage positions YardFlow as THE Singularity Event.

**Content Sections (In Order):**
1. **Hero:** "The Variance Tax. Every Day It Goes Unpaid, Your Supply Chain Collapses." (Subheading: "Introducing YardFlow—The First Yard Network System.")
2. **The Problem:** "Stochastic Capacity Demands a New Logic" (explain the shift from cheap to predictable).
3. **The Proof:** ROI Module Card → Links to /roi (existing page, repurposed as "Model Your Network").
4. **The Physics:** "The Operational Reynolds Number" (explain Re* formula, link to /docs/economics-methodology).
5. **The Singularity:** Variance Tax Calculator preview (static, non-interactive) → CTA: "See Your Hidden Costs" → /singularity.
6. **The Protocol:** 3-card grid showing digitalGUARD, Digital Yard, digitalBOL (existing components, styled consistently).
7. **The Mandate:** "Co-Development Program" → CTA: "Apply for Co-Development" → /contact?intent=qualify.

**Copy Tone Rules:**
- ✅ Use: "Protocol," "Standardization," "System," "Deterministic," "Industrial Fluidity," "Network."
- ❌ Avoid: "Easy," "Simple," "App," "Just," "Powerful," "Game-changing."
- ✅ Numbers must have sources: "The industry loses $1B+ annually to detention alone (source: TIA 2024)."

**Acceptance Criteria:**
- [ ] Homepage wireframe/copy deck created and reviewed by Closer.
- [ ] All CTAs clearly labeled with next step (Apply, Explore, Learn, Qualify).
- [ ] Copy positions YardFlow as YNS, NOT a yard app.
- [ ] No more than 7 sections (prevent scroll bloat).
- [ ] Mobile-first structure (drawer/accordion on <768px).

**Validation:**
```bash
# Manually review homepage in Figma or wireframe tool.
# Copy must be reviewed by domain expert (CEO/PMO).
```

---

#### Task 1.3: Content Contract Tests (Prevent Regression)
**Objective:** Lock in brand language and claims. Prevent "easy" / "blockchain" / outdated copy from sneaking back in.

**Test Coverage:**
```typescript
// e2e/content-contract.spec.ts (Playwright)
describe('Content Contract Tests', () => {
  it('should never use "easy," "simple," or "app"', async () => {
    const text = await page.innerText('body');
    expect(text).not.toContain(/\beasy\b|\bsimple\b|\bapp\b/i);
  });
  
  it('should always say 12 questions in diagnostic', async () => {
    await page.goto('/diagnostic');
    expect(page.locator('text=12 questions')).toBeTruthy();
  });
  
  it('should never mention "2024 rates" or "blockchain"', async () => {
    const pages = ['/', '/singularity', '/roi', '/diagnostic'];
    for (const p of pages) {
      const text = await page.innerText('body');
      expect(text).not.toContain(/2024 rates|blockchain/i);
    }
  });
  
  it('should use consistent CTA: "Apply for Co-Development"', async () => {
    const ctas = await page.locator('a, button').allTextContents();
    const coDevCtas = ctas.filter(c => c.includes('Co-Development'));
    coDevCtas.forEach(cta => {
      expect(cta).toContain('Apply for Co-Development');
    });
  });
});
```

**Acceptance Criteria:**
- [ ] Test suite written and passing.
- [ ] Added to CI/CD pipeline (no merge without green).
- [ ] Documents "Forbidden Words" and "Required Phrases" in README.

---

#### Task 1.4: CTA Hierarchy & Conversion Flow Audit
**Objective:** Map every page's conversion goal and ensure CTAs are unambiguous.

**CTA Audit Matrix:**

| Page | Primary Goal | Primary CTA | Secondary CTA | Tertiary CTA |
|------|--------------|-------------|---------------|--------------|
| / | Qualify for Co-Dev | "Apply for Co-Development" → /contact?intent=qualify | "Explore ROI Model" → /roi | "See Variance Tax" → /singularity |
| /roi | Model network ROI | "Apply for Co-Development" | "Calculate Variance Tax" → /singularity | "Contact Sales" |
| /singularity | Understand protocol | "Apply for Co-Development" | "Explore Economics" → /docs/economics-methodology | "Try Diagnostic" → /diagnostic |
| /diagnostic | Assess network health | "Apply for Co-Development" | "Model ROI" → /roi | "Learn Protocol" → /docs/economics-methodology |

**Acceptance Criteria:**
- [ ] Every page has ONE primary CTA (unmissable).
- [ ] All CTAs use consistent language (Apply, Explore, Learn, Calculate—not "Get Started," "Book Demo," "Talk to Us").
- [ ] No page has more than 3 CTAs visible above the fold.
- [ ] CTA color is consistent: Cerulean (#05ACEB) for primary, Ghost for secondary.

**Validation:**
```bash
# Manually audit each page at mobile & desktop resolution.
# Screenshot and compare against matrix.
```

---

### SPRINT 2: Visual Cohesion & The Singularity Canvas
**Goal:** Unify the aesthetic. Ensure Black Hole → Network transition is stunning. Polish animations.  
**Ownership:** Agent B (Visualist) + Agent C (Architect)

#### Task 2.1: Brand Color Enforcement (Tailwind + CSS)
**Objective:** Lock in the 3-color palette globally. No more color inconsistencies.

**Palette:**
- **Void (Background):** `#232A35` (Ebony Clay)
- **Neon (Accent/Danger/Variance):** `#D91411` (FreightRoll Red)
- **Flow (Success/Order/Network):** `#05ACEB` (Cerulean)
- **Steel (Neutral/Secondary Text):** `#8892A8`

**Implementation:**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      void: '#232A35',
      neon: '#D91411',
      flow: '#05ACEB', // Rename from 'neon' to 'flow' for clarity
      steel: '#8892A8',
      // ... standard Tailwind palette
    },
  },
};
```

**Usage Rules:**
- Backgrounds: Always `bg-void` or `bg-gradient-to-br from-void via-transparent`.
- Primary CTA Buttons: `bg-neon text-void` (danger/action).
- Success/Flow States: `text-flow` or `border-flow`.
- Secondary Text: `text-steel`.
- Hover States: Always show visual feedback (opacity, shadow, scale).

**Acceptance Criteria:**
- [ ] No inline styles with hardcoded hex colors.
- [ ] All components using Tailwind classes only.
- [ ] Color audit: grep for `#` in TSX files → should find none.
- [ ] Visual regression test: screenshot all pages, compare to brand guidelines.

**Validation:**
```bash
# Audit:
grep -r "#[0-9A-Fa-f]" components/ app/ --include="*.tsx" | grep -v "node_modules"
# Should return 0 results.
```

---

#### Task 2.2: Black Hole ↔ Network Transition (Shader Polish)
**Objective:** Ensure the dissolve animation is smooth, performant, and emotionally resonant.

**Shader Requirements:**
1. **Black Hole State (High Viscosity):**
   - Red accretion disk, chaotic noise, violent rotation.
   - Raymarched gravitational lensing effect.
   - Low-frequency hum audio (fade in as viscosity increases).

2. **Transition State (Mid Viscosity):**
   - Dissolve noise rips apart the black hole geometry.
   - Particles emerge from the chaos.
   - Color temperature shifts from Red → Blue.
   - Hum crossfades to rhythmic synth pulse.

3. **Network State (Low Viscosity):**
   - Structured particle grid, laminar flow vectors.
   - Clean cyan/blue palette.
   - Smooth particle paths (no turbulence).
   - Rhythmic, deterministic audio.

**Technical Checklist:**
- [ ] Shader compiles without warnings on all quality tiers (Ultra/High/Medium/Low).
- [ ] FPS maintained at 60Hz on target hardware (iPhone 12, MacBook Air baseline).
- [ ] Dissolve duration: 2-3 seconds (smooth, not jarring).
- [ ] uProgress uniform drives the entire transition (0.0 = Black Hole, 1.0 = Network).
- [ ] Particle count scales intelligently: 5000 on Ultra, 2500 on High, 1000 on Medium, 500 on Low.

**Acceptance Criteria:**
- [ ] Transition tested on 5+ device types (desktop, tablet, mobile, low-end).
- [ ] Performance trace: GPU time < 16ms per frame at 60Hz.
- [ ] No console warnings or shader compile errors.
- [ ] Reduced-motion path: Static transition (dissolve happens instantly, no animation).
- [ ] Screenshot progression: Capture Black Hole → Mid → Network states for visual regression test.

**Validation:**
```bash
# Shader compilation test:
npm run build 2>&1 | grep -i "shader\|glsl\|error"
# Should return 0 errors.

# Performance test (Playwright):
npm run test:e2e -- --spec "singularity.spec.ts" --headed
# Should maintain 55+ FPS during transition.
```

---

#### Task 2.3: Responsive Calculator Overlay (Mobile UX)
**Objective:** Make CalculatorPanel usable on all devices. Desktop: side-by-side. Mobile: drawer/collapsible.

**Layout Modes:**
- **Desktop (≥1024px):** Side-by-side (calc on left, viz on right).
- **Tablet (768-1023px):** Stacked (calc above, viz below).
- **Mobile (<768px):** Drawer (calc collapses into bottom sheet, swipe to expand).

**Implementation:**
```typescript
// components/singularity/VarianceTaxDashboard.tsx
export function VarianceTaxDashboard() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  
  const layout = isMobile ? 'drawer' : isTablet ? 'stacked' : 'split';
  
  return layout === 'drawer' ? <DrawerLayout /> : layout === 'stacked' ? <StackedLayout /> : <SplitLayout />;
}
```

**Acceptance Criteria:**
- [ ] Touch-friendly slider targets (min 44px tall for hit area).
- [ ] Collapsible drawer: smooth open/close animation.
- [ ] Numeric inputs work with mobile keyboard (numbers-only input type).
- [ ] No horizontal scroll on any viewport.
- [ ] Tested on: iPhone 12, iPad Pro, Galaxy S21, Chrome DevTools mobile simulation.

**Validation:**
```bash
# Visual regression:
npm run test:e2e -- --spec "responsive.spec.ts" --headed
```

---

#### Task 2.4: Audio Cohesion (Variance Hum ↔ Flow Pulse)
**Objective:** Add audio signifier for the viscosity transition (emotional, not intrusive).

**Audio Design:**
- **Variance State:** Low-frequency hum (60Hz sine wave, 0.3 volume, pulsing LFO).
- **Transition:** Cross-fade (2 seconds) + pitch glide.
- **Flow State:** Rhythmic synth pulse (120 BPM, arpeggiated minor thirds, evolving wavetable).

**Implementation:**
```typescript
// lib/audio/viscosityAudio.ts
export function updateViscosityAudio(viscosity: number) {
  const targetVolume = viscosity > 0.5 ? 0.3 : 0.1;
  oscillator.frequency.rampTo(60 + viscosity * 200, 1); // 60Hz → 260Hz
  oscillator.volume.rampTo(targetVolume, 0.5);
}
```

**Acceptance Criteria:**
- [ ] Audio is optional (toggle in settings, respect prefers-reduced-motion).
- [ ] No audio auto-plays (user gesture required first).
- [ ] Volume normalized to -6dB (not peaky).
- [ ] Works in Safari, Chrome, Firefox on desktop & mobile.
- [ ] Tested with screen reader users (no audio conflicts).

---

### SPRINT 3: Integration, Narrative Flow & Launch Readiness
**Goal:** Stitch everything together into a cohesive, launchable experience.  
**Ownership:** Agent C (Architect) + Agent D (Gatekeeper) + Agent E (Closer)

#### Task 3.1: Homepage → Singularity Customer Journey
**Objective:** Create a scrollytelling experience that guides users from "What is the Variance Tax?" to "Apply for Co-Development."

**Page Structure:**
```
Homepage (/)
├─ Hero: "The Variance Tax" + Subheading
├─ Section 1: "The Problem: Stochastic Capacity"
│  └─ Copy + Stat Card: "Industry loses $1B+ to detention annually"
├─ Section 2: "The Thesis: Operational Reynolds Number"
│  └─ Inline formula visualization (SVG or R3F mini-viz)
├─ Section 3: "The Proof: Your Hidden Costs"
│  └─ Variance Tax Calculator (static preview or iframe from /singularity)
│  └─ CTA: "Calculate Your Variance Tax" → /singularity
├─ Section 4: "The Protocol: Three Primitives"
│  └─ 3-card grid: digitalGUARD, Digital Yard, digitalBOL
├─ Section 5: "The Singularity: 2026 Demands Fluidity"
│  └─ 2-column: Text on left, Singularity scene preview on right
│  └─ CTA: "Explore the Protocol" → /singularity
├─ Section 6: "Co-Development Program"
│  └─ 3 benefit cards + Primary CTA: "Apply for Co-Development" → /contact?intent=qualify
└─ Footer: Links, legal, contact
```

**Scroll Behavior:**
- Smooth parallax on text sections (not jarring).
- Calculator numbers animate in as section scrolls into view.
- Singularity viz preview: muted (no interaction) but visually striking.

**Acceptance Criteria:**
- [ ] All sections use consistent spacing (16px grid).
- [ ] Images/videos optimized (<100KB each, WEBP + fallback).
- [ ] Mobile: Single column, stacked sections.
- [ ] Desktop: Optimized multi-column layouts.
- [ ] Load time <3s on 4G (Lighthouse score ≥85).
- [ ] No layout shift (CLS < 0.1).

---

#### Task 3.2: /singularity Full Experience (Split-Screen Calc + Viz)
**Objective:** Make /singularity the "showstopper" page where users interact with the protocol.

**Layout (Desktop):**
- Left (40%): CalculatorPanel with 12 question inputs (from /diagnostic logic).
- Right (60%): Full-screen R3F SingularityScene.
- Binding: Every slider movement → Reynolds score update → Shader uniforms change → Particle network morphs.

**Layout (Mobile):**
- Full-width SingularityScene with drawer overlay for calculator.

**Acceptance Criteria:**
- [ ] Calculator inputs match /diagnostic 12 questions.
- [ ] Real-time binding: <100ms latency from input → shader update.
- [ ] Breakdown panel: Toggle to show 6-component cost breakdown.
- [ ] Export button: Download Variance Tax report as PDF.
- [ ] Share button: Pre-filled link with scenario encoded in URL (e.g., `?preset=enterprise&viscosity=0.65`).

---

#### Task 3.3: /roi Repurposing (Link to Variance Tax Narrative)
**Objective:** Position ROI calculator as complementary to Variance Tax (ROI shows upside, Variance Tax shows downside of inaction).

**New Intro Copy:**
"The Variance Tax measures the cost of unpredictability. The ROI Model measures the upside of control. Together, they frame the full economic case for standardization."

**CTA Architecture:**
- Primary CTA at top: "Calculate Your Variance Tax First" → /singularity.
- Secondary CTA at bottom: "Apply for Co-Development" → /contact?intent=qualify.

**Acceptance Criteria:**
- [ ] New intro section added (with CFO-friendly copy).
- [ ] Links updated (no orphaned pages).
- [ ] Existing ROI formulas unchanged.

---

#### Task 3.4: Content Accessibility & SEO Audit
**Objective:** Ensure the site is discoverable and accessible to all users.

**Accessibility Checklist:**
- [ ] All images have alt text (describe content, not just "image").
- [ ] Color contrast ≥4.5:1 (WCAG AA).
- [ ] Keyboard navigation: All interactive elements reachable via Tab.
- [ ] Screen reader: Tested with NVDA/JAWS (test 3+ key pages).
- [ ] Reduced motion: All animations respect `prefers-reduced-motion`.
- [ ] Touch targets: ≥44px tall/wide.

**SEO Checklist:**
- [ ] Meta title/description for every page (60/160 chars).
- [ ] H1 present and unique per page.
- [ ] Open Graph + Twitter cards (all pages).
- [ ] Canonical tags (prevent duplicate indexing).
- [ ] XML sitemap updated.
- [ ] robots.txt allows crawling.

**Validation:**
```bash
# Lighthouse audit:
npm run build && npx lighthouse https://flow-state-klbt.vercel.app --view
# Target: Accessibility ≥90, SEO ≥90

# Accessibility audit (axe):
npm run test:a11y -- --spec "a11y.spec.ts"
```

---

#### Task 3.5: Performance Budget & Gatekeeper Sign-Off
**Objective:** Enforce hard performance limits. No regression.

**Budgets (Target: All ≥ green):**
- **First Contentful Paint (FCP):** <1.5s
- **Largest Contentful Paint (LCP):** <2.5s
- **Cumulative Layout Shift (CLS):** <0.1
- **Time to Interactive (TTI):** <3.5s
- **JavaScript Bundle:** <200KB (gzipped)
- **Shader Compilation:** <500ms (first render)
- **GPU Memory:** <256MB (Ultra tier)
- **FPS Target:** 55+ sustained during animations

**Monitoring:**
```bash
# Pre-merge performance test:
npm run test:perf -- --spec "perf.spec.ts"
# If any budget exceeded: Fail CI, require performance engineer approval.
```

**Acceptance Criteria:**
- [ ] All budgets met on 4G / Desktop.
- [ ] Fail CI if budgets exceeded.
- [ ] Gatekeeper approval required for any deviation.

---

#### Task 3.6: Deployment & Monitoring
**Objective:** Ship to production with confidence. Monitor for regressions.

**Pre-Deployment Checklist:**
- [ ] All Sprints 1-3 tasks merged and passing CI.
- [ ] Staging environment tested (staging.flow-state-klbt.vercel.app).
- [ ] Stakeholder UAT sign-off (CEO, PMO, Sales).
- [ ] Database/CMS content finalized.
- [ ] Analytics instrumented (GA4, Mixpanel events logged).
- [ ] Support docs updated (FAQ, troubleshooting).
- [ ] Rollback plan documented.

**Monitoring (Post-Deployment):**
- [ ] Sentry error tracking enabled.
- [ ] Google Analytics 4 dashboard created (sessions, bounce, conversions).
- [ ] Vercel analytics dashboard monitored (response time, errors).
- [ ] Daily review of metrics for 7 days post-launch.

---

## Part 3: Quality Gates & Merge Rules

### Definition of Done (Every Task)
- [ ] Acceptance criteria 100% met.
- [ ] Code is peer-reviewed (1+ approval).
- [ ] Tests pass (unit + E2E + visual regression).
- [ ] TypeScript strict mode: zero errors.
- [ ] No console errors/warnings.
- [ ] Performance budget respected.
- [ ] Accessibility audit passed (WCAG AA).
- [ ] Mobile/touch verified.
- [ ] Reduced-motion path tested.

### Hard Merge Rules
1. **Branch Protection:** Enable on `main`. Require:
   - ✅ Tests pass (typecheck, lint, unit, E2E, perf).
   - ✅ 1 approval from Gatekeeper (if touching formulas/shaders/routing/SEO).
   - ✅ No merge conflicts.

2. **CODEOWNERS:**
   ```
   # .github/CODEOWNERS
   /src/lib/varianceTax/** @economist @gatekeeper
   /components/three/** @visualist @gatekeeper
   /shaders/** @visualist @gatekeeper
   /app/** @architect @gatekeeper
   /components/ui/** @architect @gatekeeper
   /content/** @closer @gatekeeper
   ```

3. **PR Template:**
   ```markdown
   ## Scope
   - [ ] Task [X.Y] from Sprint [Z]
   
   ## Acceptance Criteria
   - [ ] (list from task)
   
   ## Screenshots/Video
   (attach proof of work)
   
   ## Performance Impact
   - Bundle size: +/- ___ KB
   - FPS impact: ___ %
   
   ## Rollback Plan
   (how to revert if needed)
   ```

---

## Part 4: Agent Roles & Responsibilities

| Agent | Owner | Responsibilities |
|-------|-------|------------------|
| **A: Economist** | Domain Expert (Finance/Operations) | Variance Tax formulas, types, state logic, defaults sourcing, golden tests. |
| **B: Visualist** | Graphics Engineer | GLSL shaders, R3F components, particle systems, animations, visual polish. |
| **C: Architect** | Senior Product Engineer | Project structure, component composition, responsive layouts, performance strategy, integration. |
| **D: Gatekeeper** | QA Lead / DevOps | Unit tests, E2E smoke tests, CI/CD, performance budgets, accessibility, merge gate. |
| **E: Closer** | Product/Marketing | Narrative, UX copy, CTA clarity, brand tone, objection handling, conversion flow. |

---

## Part 5: Reporting & Demo Cadence

### Weekly Standups
- **Monday:** Sprint planning (Economist + Visualist define tasks).
- **Wednesday:** Mid-sprint sync (Architect reviews integrations).
- **Friday:** Demo + Review (Gatekeeper gates merge, Closer reviews copy).

### Sprint Demos (Internal)
- **Sprint 1 Demo:** Dashboard with working calculator, content structure, tests passing.
- **Sprint 2 Demo:** Black Hole and Network shaders side-by-side, transition smooth, audio integrated.
- **Sprint 3 Demo:** End-to-end homepage → singularity → /contact journey, all budgets met, ready for UAT.

### Stakeholder Review Gates
- After Sprint 1: CEO reviews copy deck, confirms narrative positioning.
- After Sprint 2: CTO reviews performance budgets, architecture.
- After Sprint 3: Full team UAT, then production deploy.

---

## Appendix: Command Reference

```bash
# Local development
npm run dev

# Build & test
npm run build
npm run typecheck
npm run lint
npm test
npm run test:e2e

# Performance audit
npm run test:perf
lighthouse https://localhost:3000

# Accessibility
npm run test:a11y

# Content contract (regression prevention)
npm run test:content-contract

# Deploy to staging
git push origin feature/your-task
# Vercel auto-deploys to PR preview

# Deploy to production
git push origin main
# Vercel auto-deploys to production
```

---

## End of Master Prompt

**Next Step:** Share this prompt with your team. Have them assign roles (Agent A-E) and begin Sprint 1, Task 1.1.

---


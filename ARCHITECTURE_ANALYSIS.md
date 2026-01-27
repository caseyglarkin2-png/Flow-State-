# YardFlow Codebase Architecture Analysis

**Generated:** January 26, 2026  
**Location:** `/workspaces/Flow-State-/flow-state-site`  
**Purpose:** Technical dependency map and build order for parallel development

---

## Executive Summary

YardFlow follows a **layered architecture** with strict dependency flow:

```
Foundation Layer (Pure Logic)
    ↓
Integration Layer (State + Utilities)
    ↓
Feature Layer (UI Components + Pages)
    ↓
Validation Layer (Tests + Quality Gates)
```

**Critical Path for MVP:** `Economics Engine → ROI Calculator → Lead Form → Deployment`

---

## 1. Foundation Layer (Core Systems)

**Can be built in parallel. No dependencies on each other.**

### 1.1 Economics Engine (LOCKED)
**Location:** `src/lib/economics/`

**Core Files:**
- [roi.ts](flow-state-site/src/lib/economics/roi.ts) - `calcRoiV2()` formula (LOCKED by golden tests)
- [roiTypes.ts](flow-state-site/src/lib/economics/roiTypes.ts) - TypeScript interfaces
- [networkEffect.ts](flow-state-site/src/lib/economics/networkEffect.ts) - Metcalfe multiplier
- [validate.ts](flow-state-site/src/lib/economics/validate.ts) - ROI caps & sanity checks
- [presets.ts](flow-state-site/src/lib/economics/presets.ts) - Primo/enterprise scenarios
- [format.ts](flow-state-site/src/lib/economics/format.ts) - Display formatting
- [index.ts](flow-state-site/src/lib/economics/index.ts) - Public API

**Dependencies:** None (pure TypeScript functions)

**Validation:**
- Golden tests: `src/lib/economics/__tests__/calc.test.ts` (26 tests, 12 snapshots)
- Congruence check: `scripts/congruence-check.ts`

**Build Order:** ⚡ **BUILD FIRST** (foundation for all ROI features)

**Key Invariants:**
- Adoption % is narrative-only (doesn't affect formula outputs)
- Network effects only activate at 5+ facilities
- All outputs validated via `validateOutputs()`

---

### 1.2 Variance Tax Calculator
**Location:** `src/lib/varianceTax/`

**Core Files:**
- [calculator.ts](flow-state-site/src/lib/varianceTax/calculator.ts) - 6-component cost model
- [types.ts](flow-state-site/src/lib/varianceTax/types.ts) - Input/output interfaces
- [defaults.ts](flow-state-site/src/lib/varianceTax/defaults.ts) - Constraints & presets
- [formulas/](flow-state-site/src/lib/varianceTax/formulas/) - Individual cost components:
  - `detention.ts` - Carrier penalties
  - `labor.ts` - Inefficiency costs
  - `recovery.ts` - Manual fix costs
  - `chargeback.ts` - Customer penalties
  - `workingCapital.ts` - Tied inventory
  - `lostSales.ts` - Stockout costs

**Dependencies:** None (pure functions)

**Validation:**
- Unit tests: `src/lib/varianceTax/__tests__/*.test.ts`
- Formula-specific tests: `formulas/__tests__/*.test.ts`

**Build Order:** ⚡ **BUILD FIRST** (parallel with economics)

**Integration Point:** Outputs feed shader uniforms via `src/lib/shaders/uniforms.ts`

---

### 1.3 Branding System
**Location:** `lib/branding.ts`, `config/brand.ts`

**Core Files:**
- [lib/branding.ts](flow-state-site/lib/branding.ts) - Logo variants, SVG definitions
- [config/brand.ts](flow-state-site/config/brand.ts) - Messaging, CTAs, metadata

**Dependencies:** None (static configuration)

**Build Order:** ⚡ **BUILD FIRST** (required for all UI)

**Usage Pattern:**
```typescript
// Change logo site-wide
export const ACTIVE_VARIANT: LogoVariant = 'flow_v2';

// Import in components
import { BRAND } from '@/config/brand';
import { LOGO_VARIANTS } from '@/lib/branding';
```

**Key Files Using Branding:**
- `app/layout.tsx` - Site metadata
- `app/api/og/route.tsx` - OG image generation
- `components/Header.tsx` - Logo display
- `components/Footer.tsx` - Footer branding

---

### 1.4 Design Tokens (Tailwind)
**Location:** `tailwind.config.js`, `src/lib/design/`

**Color System:**
```javascript
colors: {
  'void': '#232A35',      // Dark backgrounds
  'flow': '#05ACEB',      // Action/CTAs (blue)
  'neon': '#D91411',      // Variance/alerts (red)
  'steel': '#8892A8',     // Neutral text
}
```

**Spacing Tokens:** `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xxxl`

**Dependencies:** None

**Build Order:** ⚡ **BUILD FIRST** (required for all styling)

---

### 1.5 WebGL Capabilities Detection
**Location:** `src/lib/webgl/capabilities.ts`

**Purpose:** Detect GPU tier, adaptive quality

**Core Functions:**
- `getWebGLCapabilities()` - Feature detection
- `getQualitySettings(tier)` - Quality presets
- `initializePerformanceStore()` - Bootstrap store

**Dependencies:** None (browser APIs only)

**Build Order:** ⚡ **BUILD FIRST** (required for shaders)

**Quality Tiers:**
- `ultra` - High-end GPUs (4K, complex shaders)
- `high` - Mid-range GPUs (1080p, standard shaders)
- `medium` - Integrated GPUs (720p, simplified shaders)
- `low` - Mobile (480p, minimal effects)
- `fallback` - No WebGL (static images)

---

## 2. Integration Layer (State Management)

**Depends on Foundation Layer. Can be built in parallel after foundation.**

### 2.1 Zustand Stores

#### Economics Store (Implicit)
**Location:** ROI logic is pure functions; no dedicated store

**Pattern:** Call `calcRoiV2()` directly in components
```typescript
const inputs: RoiV2Inputs = { ... };
const outputs = calcRoiV2(inputs);
```

#### Variance Tax Store
**Location:** `src/lib/varianceTax/store.ts`

**Key Functions:**
- `setInput(key, value)` - Update single input
- `setInputs(partial)` - Batch update
- `loadPreset(id)` - Load Primo/other preset
- `recalculate()` - Trigger calculation

**Dependencies:**
- `src/lib/varianceTax/calculator.ts`
- `src/lib/varianceTax/defaults.ts`

**Build Order:** 🔶 **AFTER** variance tax calculator

**Persistence:** `zustand/persist` to localStorage (key: `flowstate_variancetax`)

**Integration Point:** Consumed by shader uniforms

---

#### Persona Store
**Location:** `src/store/persona.ts`

**Purpose:** Track B2B buyer persona (Operator/CFO/CIO)

**Usage:**
```typescript
import { usePersonaStore } from '@/store/persona';

const persona = usePersonaStore(state => state.persona);
const setPersona = usePersonaStore(state => state.setPersona);
```

**Dependencies:** `src/content/config.ts` (Persona type)

**Build Order:** 🔶 **AFTER** content config

**Consumers:**
- `components/PersonaSelector.tsx`
- `components/NextSteps.tsx`
- `components/LeadForm.tsx` (persona attribution)

---

#### Lane Store
**Location:** `src/store/lane.ts`

**Purpose:** Narrative journey tracking (visual → logic → execute)

**Dependencies:** None

**Build Order:** 🔶 **PARALLEL** with persona store

---

#### Performance Store
**Location:** `src/lib/stores/performanceStore.ts`

**Purpose:** Adaptive quality, FPS monitoring

**Key Functions:**
- `setQualityTier(tier)` - Manual quality override
- `recordFps(fps)` - Track performance
- `updateMetrics()` - GPU stats

**Dependencies:**
- `src/lib/webgl/capabilities.ts`

**Build Order:** 🔶 **AFTER** WebGL capabilities

**Auto-Adjustment:** Drops quality tier if FPS < targetFps for 30 frames

---

### 2.2 Shader Uniforms Bridge
**Location:** `src/lib/shaders/uniforms.ts`

**Purpose:** Contract between Variance Tax store → WebGL shaders

**Key Interfaces:**
- `BaseShaderUniforms` - Time, resolution, quality tier
- `VarianceTaxUniforms` - Viscosity, variance scores
- `NetworkEffectUniforms` - Facility count, adoption %

**Dependencies:**
- `src/lib/varianceTax/store.ts` (data source)
- `three` (Vector2 type)

**Build Order:** 🔶 **AFTER** variance tax store

**Usage Pattern:**
```typescript
import { bindVarianceTaxUniforms } from '@/lib/shaders/uniforms';

// In shader component
const uniforms = bindVarianceTaxUniforms(useVarianceTaxStore.getState());
<shaderMaterial uniforms={uniforms} />
```

---

## 3. Feature Layer (UI Components & Pages)

**Depends on Integration Layer. Build sequentially by critical path.**

### 3.1 UI Primitives
**Location:** `components/primitives/`, `components/ui/`

**Core Components:**
- `Button.tsx` - Primary/secondary CTAs
- `Card.tsx` - Content containers
- `Section.tsx` - Layout wrapper
- `Stat.tsx` - Metric display
- `Callout.tsx` - Highlighted blocks

**Dependencies:**
- Tailwind config (colors, spacing)
- `config/brand.ts` (CTA labels)

**Build Order:** 🟢 **AFTER** foundation layer

**Can Build in Parallel:** ✅ Yes (no inter-dependencies)

---

### 3.2 Critical Path Components

#### A. Economics UI
**Location:** `components/`

**Files:**
- [CoverageSlider.tsx](flow-state-site/components/CoverageSlider.tsx) - Adoption % slider (narrative-only)
- [FacilityCountSlider.tsx](flow-state-site/components/FacilityCountSlider.tsx) - Network size input
- [BoardReadyExportCTA.tsx](flow-state-site/components/BoardReadyExportCTA.tsx) - PDF export
- [CFOProofChecklist.tsx](flow-state-site/components/CFOProofChecklist.tsx) - Validation badges

**Dependencies:**
- `src/lib/economics/` - ROI calculations
- `src/lib/adoption/` - Adoption narrative copy

**Build Order:** 🟠 **AFTER** economics engine

**Critical for:** ROI Calculator page

---

#### B. Lead Capture
**Location:** `components/LeadForm.tsx`

**Features:**
- Industry/timeline dropdowns (lead scoring)
- UTM parameter capture (attribution)
- Honeypot spam protection
- HubSpot webhook integration
- hCaptcha verification

**Dependencies:**
- `src/lib/api/` - Lead submission API
- `src/lib/hcaptcha.ts` - Captcha verification
- `src/store/persona.ts` - Persona attribution

**Build Order:** 🟠 **AFTER** API routes

**Critical for:** All conversion paths

**API Route:** `app/api/lead/route.ts`

---

#### C. WebGL/Three.js Components
**Location:** `components/three/`

**Files:**
- [SingularityScene.tsx](flow-state-site/components/three/SingularityScene.tsx) - Orchestrator
- [BlackHole.tsx](flow-state-site/components/three/BlackHole.tsx) - Raymarched shader
- [ParticleNetwork.tsx](flow-state-site/components/three/ParticleNetwork.tsx) - Network viz
- [DissolveTransition.tsx](flow-state-site/components/three/DissolveTransition.tsx) - Transitions
- [SingularityCanvas.tsx](flow-state-site/components/three/SingularityCanvas.tsx) - R3F wrapper

**Dependencies:**
- `@react-three/fiber`, `@react-three/drei`
- `src/lib/shaders/uniforms.ts` - Uniform binding
- `src/lib/stores/performanceStore.ts` - Quality tier
- `shaders/*.glsl` - Raw shader code

**Build Order:** 🔴 **AFTER** shader uniforms + performance store

**Can Build in Parallel:** ❌ No (complex interdependencies)

**Critical for:** Singularity page, homepage visuals

---

### 3.3 Page Hierarchy

#### Critical Path Pages (Build First)
```
1. app/layout.tsx          → Site shell (Header, Footer, metadata)
2. app/page.tsx            → Homepage (proof-first spine)
3. app/roi/page.tsx        → ROI Calculator (primary conversion)
4. app/contact/page.tsx    → Lead capture form
5. app/diagnostic/page.tsx → Variance diagnostic
```

**Dependencies:**
- `app/layout.tsx`:
  - `components/Header.tsx`
  - `components/Footer.tsx`
  - `config/brand.ts` (metadata)

- `app/page.tsx`:
  - `components/SystemGrid.tsx`
  - `components/ROIModuleSection.tsx`
  - `components/cards/SingularityPreviewCard.tsx`

- `app/roi/page.tsx`:
  - `src/lib/economics/` (ROI calculations)
  - `components/CoverageSlider.tsx`
  - `components/BoardReadyExportCTA.tsx`

- `app/contact/page.tsx`:
  - `components/LeadForm.tsx`

**Build Order:**
1. 🟢 Layout + primitives
2. 🟠 Homepage (can stub complex sections)
3. 🟠 ROI page (critical conversion path)
4. 🟠 Contact page
5. 🔴 Diagnostic page (lower priority)

---

#### Secondary Pages (Build After Critical Path)
- `app/product/` - Product pages (Orchestration, Security, YardBuilder)
- `app/solutions/` - Industry solutions (Dry Van, Retail, 3PL, Port, LTL)
- `app/singularity/` - Singularity simulation
- `app/case-studies/` - Primo case study
- `app/about/` - Company narrative

**Build Order:** 🔴 **AFTER** critical path complete

---

## 4. Validation Layer (Tests & Quality Gates)

**Run continuously during development. No build dependencies.**

### 4.1 Unit Tests (Vitest)
**Location:** `src/lib/**/__tests__/*.test.ts`

**Coverage:**
- Economics golden tests: `src/lib/economics/__tests__/calc.test.ts` (26 tests)
- Variance tax formulas: `src/lib/varianceTax/formulas/__tests__/*.test.ts`
- Shader uniforms: `src/lib/shaders/__tests__/uniforms.test.ts`
- WebGL capabilities: `src/lib/webgl/__tests__/capabilities.test.ts`

**Run Command:** `npm run test:unit`

**CI Integration:** Required for `npm run precommit`

**Golden Test Workflow:**
```bash
# Run tests (fails if formula changed)
npm run test:unit -- src/lib/economics/__tests__/calc.test.ts

# Update snapshots (requires approval)
npm run test:unit -- -u src/lib/economics/__tests__/calc.test.ts

# Commit snapshots
git add src/lib/economics/__tests__/*.snap
```

---

### 4.2 E2E Tests (Playwright)
**Location:** `e2e/*.spec.ts`

**Critical Tests:**
- [routes.spec.ts](flow-state-site/e2e/routes.spec.ts) - All pages return 200
- [smoke.spec.ts](flow-state-site/e2e/smoke.spec.ts) - Critical user journeys
- [lead-form.spec.ts](flow-state-site/e2e/lead-form.spec.ts) - Lead submission flow
- [visual-regression.spec.ts](flow-state-site/e2e/visual-regression.spec.ts) - Screenshot baselines
- [accessibility.spec.ts](flow-state-site/e2e/accessibility.spec.ts) - Axe-core scans

**Run Commands:**
```bash
npm run test:smoke          # Fast smoke tests (routes only)
npm run test:e2e            # Full suite (Chromium only)
npm run test:e2e:ci         # All browsers (CI mode)
```

**CI Integration:** Required for `npm run predeploy`

**Visual Regression Tolerance:**
- Pixel threshold: 2% difference
- Max diff pixels: 100

---

### 4.3 Congruence Check
**Location:** `scripts/congruence-check.ts`

**Validates:**
- TypeScript compilation (no type errors)
- Golden test snapshots match
- No broken imports
- Environment variable config
- Bundle size limits

**Run Command:** `npm run congruence:check`

**CI Integration:** Required for `npm run predeploy`

---

### 4.4 Quality Gates

#### Pre-Commit (Local Development)
```bash
npm run precommit
# Runs: lint + typecheck + unit tests
```

#### Pre-Deploy (Production)
```bash
npm run predeploy
# Runs: typecheck + unit tests + congruence + E2E (all browsers)
```

---

## 5. Critical Integration Points

**Where systems connect. Build these carefully.**

### 5.1 Economics → UI
**Flow:** `calcRoiV2()` → Component state → Display

**Files:**
- [src/lib/economics/roi.ts](flow-state-site/src/lib/economics/roi.ts) - Formula
- [src/lib/economics/format.ts](flow-state-site/src/lib/economics/format.ts) - Formatting
- [app/roi/page.tsx](flow-state-site/app/roi/page.tsx) - Consumer

**Pattern:**
```typescript
import { calcRoiV2 } from '@/lib/economics';
import { formatROI, formatPayback } from '@/lib/economics/format';

const outputs = calcRoiV2(inputs);
const displayValue = formatROI(outputs.yearOneRoiPercent);
```

**Test Coverage:**
- Golden tests ensure formula stability
- Unit tests verify formatting
- E2E tests validate UI display

---

### 5.2 Variance Tax → Shaders
**Flow:** Variance Tax store → Shader uniforms → WebGL

**Files:**
- [src/lib/varianceTax/store.ts](flow-state-site/src/lib/varianceTax/store.ts) - State
- [src/lib/shaders/uniforms.ts](flow-state-site/src/lib/shaders/uniforms.ts) - Bridge
- [components/three/BlackHole.tsx](flow-state-site/components/three/BlackHole.tsx) - Shader consumer

**Pattern:**
```typescript
// In shader component
import { useVarianceTaxStore } from '@/lib/varianceTax/store';
import { bindVarianceTaxUniforms } from '@/lib/shaders/uniforms';

const inputs = useVarianceTaxStore(state => state.inputs);
const outputs = useVarianceTaxStore(state => state.outputs);
const uniforms = bindVarianceTaxUniforms({ inputs, outputs });

<shaderMaterial uniforms={uniforms} fragmentShader={blackHoleShader} />
```

**Test Coverage:**
- Variance tax calculator tests
- Shader uniform validation tests
- Visual regression tests (Singularity page)

---

### 5.3 Persona → Content
**Flow:** Persona store → Content routing → Personalized copy

**Files:**
- [src/store/persona.ts](flow-state-site/src/store/persona.ts) - State
- [components/PersonaRouter.tsx](flow-state-site/components/PersonaRouter.tsx) - Router
- [components/NextSteps.tsx](flow-state-site/components/NextSteps.tsx) - Personalized CTAs

**Pattern:**
```typescript
import { usePersonaStore } from '@/store/persona';

const persona = usePersonaStore(state => state.persona);

// Render persona-specific content
{persona === 'cfo' && <CFOProofChecklist />}
{persona === 'operator' && <OperationalMetrics />}
```

**Test Coverage:**
- Persona selector E2E tests
- Content routing unit tests

---

### 5.4 Branding → OG Images
**Flow:** Brand config → OG API route → Generated images

**Files:**
- [lib/branding.ts](flow-state-site/lib/branding.ts) - Logo SVG
- [config/brand.ts](flow-state-site/config/brand.ts) - Metadata
- [app/api/og/route.tsx](flow-state-site/app/api/og/route.tsx) - Image generator

**Pattern:**
```typescript
// In API route
import { LOGO_VARIANTS, ACTIVE_VARIANT } from '@/lib/branding';
import { BRAND } from '@/config/brand';

const logoSvg = LOGO_VARIANTS[ACTIVE_VARIANT].svg;
// Generate OG image with logo + metadata
```

**Test Coverage:**
- Visual regression tests for OG images

---

### 5.5 Lead Form → API → HubSpot
**Flow:** Form submission → API route → hCaptcha → HubSpot webhook → Resend

**Files:**
- [components/LeadForm.tsx](flow-state-site/components/LeadForm.tsx) - Form UI
- [app/api/lead/route.ts](flow-state-site/app/api/lead/route.ts) - Handler
- [src/lib/hcaptcha.ts](flow-state-site/src/lib/hcaptcha.ts) - Verification
- [src/lib/webhooks.ts](flow-state-site/src/lib/webhooks.ts) - HubSpot integration

**Pattern:**
```typescript
// In LeadForm.tsx
const response = await fetch('/api/lead', {
  method: 'POST',
  body: JSON.stringify({ ...formData, captchaToken }),
});

// In route.ts
1. Verify hCaptcha token
2. Validate input (Zod schema)
3. Send to HubSpot webhook
4. Email notification (Resend)
5. Return success/error
```

**Test Coverage:**
- Lead form E2E tests (submit flow)
- API route unit tests (validation, error handling)

---

## 6. Build Order Recommendations

### Phase 1: Foundation (Parallel)
**Estimated: 1-2 days**

✅ Can build simultaneously:
- Economics engine (`src/lib/economics/`)
- Variance tax calculator (`src/lib/varianceTax/`)
- Branding system (`lib/branding.ts`, `config/brand.ts`)
- Design tokens (`tailwind.config.js`)
- WebGL capabilities (`src/lib/webgl/capabilities.ts`)

**Validation:** Run `npm run test:unit` after each module

---

### Phase 2: Integration (Sequential)
**Estimated: 2-3 days**

🔶 Build in order:
1. Zustand stores:
   - Variance tax store (`src/lib/varianceTax/store.ts`)
   - Performance store (`src/lib/stores/performanceStore.ts`)
   - Persona store (`src/store/persona.ts`)
   - Lane store (`src/store/lane.ts`)

2. Shader uniforms bridge (`src/lib/shaders/uniforms.ts`)

**Validation:** Unit tests for each store

---

### Phase 3: UI Primitives (Parallel)
**Estimated: 1 day**

✅ Can build simultaneously:
- Button, Card, Section, Stat, Callout
- Header, Footer
- Logo component

**Validation:** Visual spot-checks in Storybook/dev mode

---

### Phase 4: Critical Path Features (Sequential)
**Estimated: 3-5 days**

🔴 Build in strict order:
1. Site layout (`app/layout.tsx`)
2. Homepage (`app/page.tsx`) - can stub complex sections
3. Economics UI components:
   - CoverageSlider
   - FacilityCountSlider
   - BoardReadyExportCTA
4. ROI Calculator page (`app/roi/page.tsx`)
5. Lead form component (`components/LeadForm.tsx`)
6. Lead API route (`app/api/lead/route.ts`)
7. Contact page (`app/contact/page.tsx`)

**Validation:** E2E smoke tests after each page

---

### Phase 5: WebGL/Shaders (Sequential)
**Estimated: 3-4 days**

🔴 Build in order (complex interdependencies):
1. Raw shader code (`shaders/*.glsl`)
2. Shader validation (`npm run test:shaders`)
3. SingularityCanvas (R3F wrapper)
4. BlackHole component
5. ParticleNetwork component
6. DissolveTransition component
7. SingularityScene orchestrator
8. Singularity page (`app/singularity/page.tsx`)

**Validation:** Visual regression tests, mobile device testing

---

### Phase 6: Secondary Pages (Parallel)
**Estimated: 5-7 days**

✅ Can build simultaneously:
- Product pages (Orchestration, Security, YardBuilder)
- Solution pages (Dry Van, Retail, 3PL, Port, LTL)
- Case studies
- About page
- Diagnostic page

**Validation:** Smoke tests, content audit

---

## 7. Minimum Viable Build (MVP)

**Goal:** Deploy a functional ROI calculator + lead capture in 5 days

### MVP Scope
1. Foundation layer (Day 1)
   - Economics engine
   - Branding system
   - Tailwind config

2. Integration layer (Day 2)
   - Zustand stores (variance tax, persona)

3. Critical UI (Day 3)
   - Layout shell
   - Homepage (stubbed sections)
   - ROI Calculator page

4. Lead capture (Day 4)
   - Lead form component
   - API route
   - Contact page

5. Testing & deployment (Day 5)
   - E2E smoke tests
   - Visual QA
   - Production deploy

### MVP Exclusions (Ship Later)
- ❌ WebGL/shaders (Singularity page)
- ❌ Diagnostic calculator
- ❌ Product/solution pages
- ❌ Case studies
- ❌ Advanced animations

**Rationale:** Critical path is `Homepage → ROI Calculator → Lead Form`. Everything else is supporting content.

---

## 8. Dependency Graph (Visual)

```
Foundation Layer (No Dependencies)
├── Economics Engine ────────────────┐
├── Variance Tax Calculator ─────────┤
├── Branding System ─────────────────┤
├── Design Tokens (Tailwind) ────────┤
└── WebGL Capabilities ──────────────┤
                                     │
Integration Layer (Depends on Foundation)
├── Variance Tax Store ◄─────────────┤
├── Performance Store ◄──────────────┤
├── Persona Store ◄──────────────────┤
├── Lane Store ◄─────────────────────┤
└── Shader Uniforms Bridge ◄─────────┤
                                     │
Feature Layer (Depends on Integration)
├── UI Primitives ◄──────────────────┤
├── Economics UI Components ◄────────┤
├── Lead Form ◄──────────────────────┤
├── WebGL Components ◄───────────────┤
└── Pages ◄──────────────────────────┘
    ├── layout.tsx
    ├── page.tsx (Homepage)
    ├── roi/page.tsx
    ├── contact/page.tsx
    └── ... (secondary pages)

Validation Layer (Continuous)
├── Unit Tests (Vitest) ◄────────────── All layers
├── E2E Tests (Playwright) ◄────────────Pages
└── Congruence Check ◄─────────────────── Full build
```

---

## 9. Key Architectural Patterns

### 9.1 Server vs. Client Components
**Default:** Server Components (Next.js 16 App Router)

**Use Client Components for:**
- Zustand stores
- Event handlers (onClick, onChange)
- Browser APIs (useState, useEffect)
- Three.js/WebGL components

**Pattern:**
```typescript
// Server Component (default)
export default async function Page() {
  // Can fetch data server-side
  return <Content />;
}

// Client Component (explicit)
'use client';
export function InteractiveWidget() {
  const [state, setState] = useState();
  // ...
}
```

---

### 9.2 State Management Strategy
**Zustand for global state, avoid props drilling**

**Store Locations:**
- Economics: Pure functions (no store)
- Variance Tax: `src/lib/varianceTax/store.ts`
- UI State: `src/store/` (persona, lane)
- Performance: `src/lib/stores/performanceStore.ts`

**Pattern:** Create store per domain, avoid massive god objects

---

### 9.3 Styling Convention
**Tailwind-first, no CSS modules**

**Use Tailwind tokens:**
- Colors: `text-flow`, `bg-void`, `border-neon`
- Spacing: `px-lg`, `py-md`, `gap-xl`
- Shadows: `shadow-token-md`

**Never:** Hardcode hex colors or pixel values

---

### 9.4 Content/Copy Standards
**Messaging locked in [docs/COPY_GUIDELINES.md](/workspaces/Flow-State-/docs/COPY_GUIDELINES.md)**

**Voice:**
- Data-driven (metrics, not fluff)
- Operational (speaks to yard managers)
- Confident (we've solved this)

**Terminology:**
- ✅ "Variance" | ❌ "Inefficiency"
- ✅ "Standardized flow" | ❌ "Optimization"
- ✅ "Network compounding" | ❌ "Network effect"

---

## 10. Risk Matrix

### High Risk Areas (Build Carefully)

#### 1. Economics Formula Changes
**Risk:** Breaking golden tests
**Mitigation:**
- Run `npm run test:unit -- src/lib/economics/__tests__/calc.test.ts` before/after
- Get approval before updating snapshots
- Document changes in `docs/ECONOMICS_AUDIT.md`

#### 2. Shader/WebGL Crashes
**Risk:** Low-end devices crash
**Mitigation:**
- Use `usePerformanceStore` to adapt quality
- Run `npm run test:shaders` before deployment
- Test on mobile devices (iOS Safari, Android Chrome)

#### 3. Lead Form Submission Failures
**Risk:** Lost conversions
**Mitigation:**
- Graceful fallback to mailto link
- E2E tests: `e2e/lead-form.spec.ts`
- Monitor error rates (Sentry integration)

#### 4. Type Safety Violations
**Risk:** Runtime errors in production
**Mitigation:**
- TypeScript strict mode enforced
- Run `npm run typecheck` before every commit
- No `any` or `@ts-ignore` without documented reason

---

### Medium Risk Areas

#### 5. Bundle Size Bloat
**Risk:** Slow page loads
**Mitigation:**
- Run `npm run audit:bundle` weekly
- Lazy-load WebGL components
- Code-split secondary pages

#### 6. Visual Regression
**Risk:** UI breaks unnoticed
**Mitigation:**
- Playwright visual regression tests
- Manual QA on staging before production deploy

---

## 11. Performance Optimization Strategy

### Critical Metrics
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Optimization Techniques

#### 1. Code Splitting
```typescript
// Lazy-load Singularity scene
const SingularityScene = dynamic(() => import('@/components/three/SingularityScene'), {
  ssr: false,
  loading: () => <LoadingPlaceholder />,
});
```

#### 2. Image Optimization
- Use Next.js `<Image>` component
- Serve WebP with fallbacks
- Lazy-load below-fold images

#### 3. Shader Optimization
- Detect GPU tier via `src/lib/webgl/capabilities.ts`
- Use simpler shaders on low-end devices
- Disable WebGL on fallback tier (static images)

#### 4. Bundle Analysis
```bash
ANALYZE=true npm run build
# Opens bundle analyzer in browser
```

---

## 12. Quick Reference: Common Tasks

### Add a New Page
```bash
# 1. Create route file
touch flow-state-site/app/my-page/page.tsx

# 2. Add to sitemap
# Edit app/sitemap.ts

# 3. Add E2E smoke test
# Edit e2e/routes.spec.ts

# 4. Test
npm run dev
npm run test:smoke
```

### Modify ROI Formula (Requires Approval)
```bash
# 1. Update formula
# Edit src/lib/economics/roi.ts

# 2. Run golden tests (will fail)
npm run test:unit -- src/lib/economics/__tests__/calc.test.ts

# 3. Review snapshot diff
# 4. If approved, update snapshots
npm run test:unit -- -u src/lib/economics/__tests__/calc.test.ts

# 5. Commit snapshots
git add src/lib/economics/__tests__/*.snap
```

### Add a New Shader
```bash
# 1. Create GLSL file
touch flow-state-site/shaders/myShader.frag

# 2. Import in component
import fragmentShader from '@/shaders/myShader.frag';

# 3. Validate syntax
npm run test:shaders

# 4. Test on mobile
```

### Update Branding (Logo/Colors)
```bash
# 1. Edit single source file
# flow-state-site/lib/branding.ts

# 2. Change ACTIVE_VARIANT or colors

# 3. Rebuild (OG images regenerate)
npm run build
```

---

## 13. File Path Quick Reference

### Economics
- Formula: `src/lib/economics/roi.ts`
- Types: `src/lib/economics/roiTypes.ts`
- Validation: `src/lib/economics/validate.ts`
- Golden Tests: `src/lib/economics/__tests__/calc.test.ts`

### Variance Tax
- Calculator: `src/lib/varianceTax/calculator.ts`
- Store: `src/lib/varianceTax/store.ts`
- Formulas: `src/lib/varianceTax/formulas/*.ts`

### Branding
- Logos: `lib/branding.ts`
- Metadata: `config/brand.ts`

### State
- Persona: `src/store/persona.ts`
- Lane: `src/store/lane.ts`
- Performance: `src/lib/stores/performanceStore.ts`

### Shaders
- Uniforms: `src/lib/shaders/uniforms.ts`
- Capabilities: `src/lib/webgl/capabilities.ts`
- Components: `components/three/*.tsx`
- Raw Shaders: `shaders/*.glsl`

### Pages
- Homepage: `app/page.tsx`
- ROI Calculator: `app/roi/page.tsx`
- Contact: `app/contact/page.tsx`
- Singularity: `app/singularity/page.tsx`

### Tests
- Unit: `src/lib/**/__tests__/*.test.ts`
- E2E: `e2e/*.spec.ts`
- Congruence: `scripts/congruence-check.ts`

---

## 14. Next Steps

1. **Review this analysis** with team
2. **Assign ownership** of each layer (Frontend, Backend, QA)
3. **Set up CI/CD pipeline** for quality gates
4. **Create sprint plan** based on build order
5. **Track progress** in project management tool

---

**Questions?** Check:
- [Training docs](/workspaces/Flow-State-/training/) - CEO context
- [Architecture docs](/workspaces/Flow-State-/docs/) - Economics, copy, brand
- [Site docs](flow-state-site/README.md) - Production checklist

**Last Updated:** January 26, 2026  
**Maintained by:** Product + Engineering

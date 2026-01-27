# YardFlow by FreightRoll - AI Agent Instructions

## Project Overview

**YardFlow** is a Next.js 16 website for a Yard Network System (YNS) that transforms logistics yard management into a standardized protocol. The site features advanced physics-based visualizations (WebGL shaders), complex ROI calculators with locked economics formulas, and a conversion-focused architecture.

**Tech Stack:** Next.js 16 (App Router), TypeScript (strict), React 19, Tailwind CSS 4, Three.js/WebGL, Zustand, Vitest, Playwright

**Working Directory:** All code lives in `flow-state-site/`

---

## Critical Architecture Principles

### 1. Economics Formula Governance (LOCKED)

**ROI calculations are frozen via golden tests.** Any modification requires approval + snapshot update.

- **Core module:** `src/lib/economics/roi.ts` (calcRoiV2 function)
- **Golden tests:** `src/lib/economics/__tests__/calc.test.ts` (26 tests, 12 snapshots)
- **Critical invariant:** Adoption % is **narrative-only** - NEVER affects formula outputs ([ADOPTION_SEMANTICS.md](../docs/ADOPTION_SEMANTICS.md))

**To modify economics:**
```bash
# 1. Update formula in src/lib/economics/roi.ts
# 2. Run tests to see diff
npm run test:unit -- --reporter=verbose src/lib/economics/__tests__/calc.test.ts

# 3. If intentional change, update snapshots (requires approval)
npm run test:unit -- -u src/lib/economics/__tests__/calc.test.ts

# 4. Document in docs/ECONOMICS_AUDIT.md
# 5. Commit snapshots: git add src/lib/economics/__tests__/*.snap
```

**Never:**
- Change calcRoiV2 without updating golden tests
- Make adoption % affect formula outputs (violates locked invariant)
- Bypass validation in `src/lib/economics/validate.ts` (ROI caps, sanity checks)

---

### 2. Branding System (Single Source of Truth)

**All logos, colors, and messaging centralized in `lib/branding.ts`**

```typescript
// Change logo site-wide (including OG images, favicons)
export const ACTIVE_VARIANT: LogoVariant = 'flow_v2'; // or 'network', 'nexus', 'signal'

// Update site metadata everywhere
export const SITE_METADATA = {
  name: 'YardFlow',
  tagline: 'Yard Network System',
  // ... propagates to layout.tsx, OG images, meta tags
};
```

**Color system (Tailwind config):**
- `void` (#232A35): Dark backgrounds
- `flow` (#05ACEB): Action/CTAs (blue)
- `neon` (#D91411): Variance/alerts (red)
- `steel` (#8892A8): Neutral text

**Never:** Hardcode hex colors. Use Tailwind color tokens (`text-flow`, `bg-void`, etc.)

---

### 3. State Management Patterns

**Zustand for global state, no props drilling:**

```typescript
// Economics/ROI stores
import { useVarianceTaxStore } from '@/lib/varianceTax/store';
import { useRoiStore } from '@/lib/stores/roiStore';

// UI state
import { usePersonaStore } from '@/store/persona'; // B2B personas
import { useLaneStore } from '@/store/lane';       // Narrative journey
import { usePerformanceStore } from '@/lib/stores/performanceStore'; // Quality tier

// Pattern: Create store per domain, avoid massive god objects
```

**Store locations:**
- Economics: `src/lib/economics/` and `src/lib/varianceTax/`
- UI state: `src/store/`
- Performance: `src/lib/stores/performanceStore.ts`

---

### 4. WebGL/Shader Architecture

**Shaders power key visualizations (Black Hole → Network, particle systems)**

**Critical files:**
- `shaders/*.glsl` - Raw shader code (vertex/fragment)
- `src/lib/shaders/uniforms.ts` - Pass data from Variance Tax store to WebGL
- `src/lib/webgl/capabilities.ts` - Detect GPU tier, adaptive quality
- `components/three/` - React Three Fiber components

**Shader workflow:**
1. Write GLSL in `shaders/` directory
2. Import as raw string (Next.js configured via `next.config.js`)
3. Pass uniforms from Zustand → Three.js
4. Test on mobile (use `usePerformanceStore` to adapt quality)

**Validation:**
```bash
npm run test:shaders  # Validates shader syntax before build
```

**Never:**
- Ship untested shaders (causes WebGL crashes on low-end devices)
- Hardcode uniforms (use `src/lib/shaders/uniforms.ts`)
- Ignore performance tier (always check `usePerformanceStore`)

---

### 5. Content & Copy Standards

**Messaging locked in [docs/COPY_GUIDELINES.md](../docs/COPY_GUIDELINES.md)**

**Voice:**
- Data-driven (metrics, not fluff)
- Operational (speaks to yard managers, logistics VPs)
- Confident (we've solved this)
- No BS (transparent costs, timelines)

**Terminology:**
- ✅ "Variance" | ❌ "Inefficiency"
- ✅ "Standardized flow" | ❌ "Optimization"
- ✅ "Yard orchestration" | ❌ "Coordination"
- ✅ "Network compounding" | ❌ "Network effect"

**Example (Good):**
> "Primo reduced variance by 63% in Year 1. Process 40% more trucks per day with zero guard staff increase."

**Example (Bad):**
> "Primo saw amazing results. Efficiency skyrocketed!"

---

## Development Workflows

### Running the Site

```bash
cd flow-state-site
npm install
cp .env.example .env.local  # Configure hCaptcha, Resend, etc.
npm run dev                  # http://localhost:3000
```

### Testing Strategy

**3-tier test pyramid:**

```bash
# 1. GOLDEN TESTS (economics locked)
npm run test:unit -- src/lib/economics/__tests__/calc.test.ts

# 2. UNIT TESTS (components, utilities)
npm run test:unit           # Vitest
npm run test:unit:watch     # TDD mode

# 3. E2E TESTS (critical journeys)
npm run test:e2e:ci         # Playwright (requires build)
npm run test:smoke          # Fast smoke tests (routes only)
```

**Key test files:**
- `src/lib/economics/__tests__/calc.test.ts` - Golden tests (ROI formulas)
- `components/__tests__/CoverageSlider.test.tsx` - Adoption % UI
- `e2e/smoke.spec.ts` - Critical user journeys
- `e2e/visual-regression.spec.ts` - Screenshot baselines

**Pre-commit checklist:**
```bash
npm run precommit  # Runs lint + typecheck + unit tests
```

**Pre-deploy checklist:**
```bash
npm run predeploy  # Adds E2E tests + congruence check
```

---

### Linting & Type Safety

**TypeScript strict mode enforced:**
- No implicit `any`
- Strict null checks
- No unused variables

```bash
npm run typecheck  # Catch type errors
npm run lint       # ESLint (max-warnings 0)
```

**Pattern:** Fix types at source, avoid `@ts-ignore` unless absolutely necessary (comment why)

---

### Environment Variables

**Required for production (see [PRODUCTION_CHECKLIST.md](flow-state-site/PRODUCTION_CHECKLIST.md)):**

```bash
# Forms (hCaptcha)
NEXT_PUBLIC_HCAPTCHA_SITEKEY=your_site_key
HCAPTCHA_SECRET=your_secret_key

# Email (Resend)
RESEND_API_KEY=your_api_key
LEADS_TO_EMAIL=founding@flow-state.ai

# Optional
HUBSPOT_WEBHOOK_URL=your_webhook
NEXT_PUBLIC_CALENDLY_URL=your_calendly_link
```

**Fallback behavior:** Forms show graceful error + mailto link if keys missing

---

## Code Patterns & Conventions

### File Organization

```
flow-state-site/
├── app/                    # Next.js pages (App Router)
│   ├── page.tsx           # Homepage
│   ├── roi/page.tsx       # ROI calculator
│   └── api/               # API routes (lead forms, OG images)
├── components/            # React components (flat structure)
│   ├── Button.tsx         # Primitives
│   ├── CoverageSlider.tsx # Economics UI
│   └── three/             # WebGL/Three.js components
├── src/
│   ├── lib/
│   │   ├── economics/     # ROI formulas (LOCKED)
│   │   ├── varianceTax/   # 6-component cost model
│   │   ├── shaders/       # Shader utilities
│   │   ├── webgl/         # GPU detection
│   │   └── stores/        # Zustand stores
│   └── store/             # Legacy UI stores (persona, lane)
├── shaders/               # Raw GLSL files (.glsl, .vert, .frag)
├── public/                # Static assets
└── docs/                  # Architecture docs (in parent dir)
```

### Component Patterns

**Server Components by default (Next.js 16):**
```tsx
// app/roi/page.tsx (Server Component)
export default async function RoiPage() {
  // Can fetch data server-side
  return <RoiCalculator />;
}
```

**Client Components when needed:**
```tsx
'use client';
import { useVarianceTaxStore } from '@/lib/varianceTax/store';

export function CoverageSlider() {
  const { adoption, setAdoption } = useVarianceTaxStore();
  // Interactive UI
}
```

**Use `'use client'` for:**
- Zustand stores
- Event handlers (onClick, onChange)
- Browser APIs (useState, useEffect)
- Three.js/WebGL components

---

### Styling Conventions

**Tailwind-first, no CSS modules:**

```tsx
// ✅ Good (Tailwind classes)
<button className="bg-flow hover:bg-flow-dark text-void px-lg py-md rounded-md">
  Book Audit
</button>

// ❌ Bad (inline styles)
<button style={{ backgroundColor: '#05ACEB' }}>Book Audit</button>
```

**Custom spacing tokens (use these):**
- `xs` (4px), `sm` (8px), `md` (16px), `lg` (24px), `xl` (32px), `xxl` (48px)

**Shadow tokens:**
- `shadow-token-sm`, `shadow-token-md`, `shadow-token-lg`

---

### API Routes Pattern

**Lead form submission (app/api/contact/route.ts):**

```typescript
export async function POST(req: Request) {
  // 1. Verify hCaptcha token
  // 2. Validate input (Zod schema)
  // 3. Send to HubSpot webhook
  // 4. Email notification (Resend)
  // 5. Return success/error
}
```

**OG image generation (app/api/og/route.tsx):**
- Uses `@vercel/og` (Satori)
- Logo from `lib/branding.ts` (single source)
- Caches images (performance)

---

## Domain-Specific Concepts

### Variance Tax Calculator

**6-component cost model:**
1. Detention fees (carrier penalties)
2. Recovery ops (manual fixes)
3. Labor inefficiency (wasted time)
4. Chargebacks (customer penalties)
5. Working capital (tied-up inventory)
6. Lost sales (stockouts)

**Implementation:**
- Store: `src/lib/varianceTax/store.ts`
- Formulas: `src/lib/varianceTax/formulas/`
- Types: `src/lib/varianceTax/types.ts`

**Pattern:** All inputs validated, outputs flow to WebGL shaders via `src/lib/shaders/uniforms.ts`

---

### Network Effect Model

**Metcalfe-inspired multiplier:**
```
M(n) = 1 + β × (connections/C₀) × realization
```

- **β (beta):** Network strength per tier (locked)
- **τ (tau):** Maturity constant (locked)
- **Realization curve:** `1 - exp(-n/τ)` (gradual value unlock)

**Implementation:** `src/lib/economics/networkEffect.ts`

**Golden test:** Validates monotonic increase, precision up to 1M facilities

---

### Persona System

**B2B buyer personas (stored in Zustand):**
- **Operator:** Yard manager (tactical, ops-focused)
- **CFO:** Finance leader (ROI, payback)
- **CIO:** Tech leader (integrations, security)

**Usage:**
```tsx
import { usePersonaStore } from '@/store/persona';

const persona = usePersonaStore(state => state.persona);
// Render persona-specific content
```

---

## Common Tasks

### Add a New Page

```bash
# 1. Create route file
touch flow-state-site/app/my-page/page.tsx

# 2. Add to sitemap (if public)
# Edit app/sitemap.ts

# 3. Add E2E smoke test
# Edit e2e/routes.spec.ts

# 4. Test
npm run dev
npm run test:smoke
```

---

### Modify ROI Formula (Requires Approval)

```bash
# 1. Update formula
# Edit src/lib/economics/roi.ts

# 2. Run golden tests (will fail)
npm run test:unit -- src/lib/economics/__tests__/calc.test.ts

# 3. Review snapshot diff carefully
# 4. If approved, update snapshots
npm run test:unit -- -u src/lib/economics/__tests__/calc.test.ts

# 5. Document change in docs/ECONOMICS_AUDIT.md
# 6. Commit snapshots
git add src/lib/economics/__tests__/*.snap
git commit -m "econ: Update ROI formula (approved by CEO)"
```

---

### Add a New Shader

```bash
# 1. Create GLSL file
touch flow-state-site/shaders/myShader.frag

# 2. Import in component
import fragmentShader from '@/shaders/myShader.frag';

# 3. Pass to Three.js material
<shaderMaterial fragmentShader={fragmentShader} />

# 4. Validate syntax
npm run test:shaders

# 5. Test on mobile (check usePerformanceStore)
```

---

### Update Branding (Logo/Colors)

```bash
# 1. Edit single source file
# flow-state-site/lib/branding.ts

# 2. Change ACTIVE_VARIANT or SITE_METADATA

# 3. Rebuild (OG images regenerate)
npm run build

# 4. Preview OG image
# Visit http://localhost:3000/api/og
```

---

## Quality Gates

### Pre-Commit (Required)

```bash
npm run precommit
# Runs: lint + typecheck + unit tests
```

### Pre-Deploy (Production)

```bash
npm run predeploy
# Runs: typecheck + unit tests + congruence check + E2E tests (all browsers)
```

### Congruence Check

```bash
npm run congruence:check
# Validates:
# - TypeScript compilation
# - Golden test snapshots match
# - No broken imports
# - Environment variable config
# - Bundle size limits
```

---

## Troubleshooting

### "Golden test snapshot mismatch"
→ Economics formula changed. Review diff, get approval, update with `-u` flag

### "WebGL context lost"
→ Shader too complex for GPU tier. Check `usePerformanceStore`, reduce quality

### "Type error in strict mode"
→ Fix at source. Avoid `any` or `@ts-ignore` unless documented

### "hCaptcha not rendering"
→ Check env vars: `NEXT_PUBLIC_HCAPTCHA_SITEKEY` in `.env.local`

### "OG image not updating"
→ Clear Next.js cache: `rm -rf .next` and rebuild

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/lib/economics/roi.ts` | Core ROI formula (LOCKED) |
| `src/lib/economics/__tests__/calc.test.ts` | Golden tests (26 tests) |
| `lib/branding.ts` | Single source for logos, colors, metadata |
| `docs/ADOPTION_SEMANTICS.md` | Critical invariant: Adoption % = narrative only |
| `docs/COPY_GUIDELINES.md` | Messaging standards, voice, terminology |
| `docs/ECONOMICS_AUDIT.md` | Locked formula documentation |
| `PRODUCTION_CHECKLIST.md` | Environment setup, service config |
| `next.config.js` | Shader imports, Sentry, bundle config |
| `tailwind.config.js` | Color system, spacing tokens |

---

## Resources

- **Training materials:** `/workspaces/Flow-State-/training/` (CEO context, strategy)
- **Architecture docs:** `/workspaces/Flow-State-/docs/` (economics, copy, brand)
- **Site docs:** `flow-state-site/README.md`, `PRODUCTION_CHECKLIST.md`

---

**Last Updated:** January 26, 2026  
**Maintained by:** Product + Engineering  
**Questions?** Check training docs or ask for clarification on unclear patterns.

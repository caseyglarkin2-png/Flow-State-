# YardFlow - AI Agent Instructions

> Next.js 16 · TypeScript · React 19 · Tailwind 4 · Three.js/WebGL · Zustand

**All code lives in `flow-state-site/`**

---

## 🔒 Economics Formula Governance

**ROI calculations are FROZEN via golden tests. Never modify without explicit approval.**

| File | Purpose |
|------|---------|
| `src/lib/economics/roi.ts` | Core formula (`calcRoiV2`) |
| `src/lib/economics/__tests__/calc.test.ts` | Golden snapshot tests |
| `src/lib/varianceTax/` | 6-component cost model |

**Critical Invariant:** Adoption % is narrative-only — it does NOT affect formula outputs.

```bash
npm run test:unit -- src/lib/economics/__tests__/calc.test.ts   # View diff
npm run test:unit -- -u src/lib/economics/__tests__/calc.test.ts # Update (requires approval)
```

---

## Commands

```bash
cd flow-state-site
npm run dev              # Dev server at localhost:3000
npm run precommit        # lint + typecheck + unit tests (run before every commit)
npm run predeploy        # Full CI: typecheck + unit + congruence + E2E
npm run test:shaders     # Validate GLSL syntax
```

---

## Zustand Stores

**Import paths differ by domain — use these exactly:**

```typescript
// Economics & Calculator
import { useVarianceTaxStore } from '@/src/lib/varianceTax/store';

// Performance & WebGL quality
import { usePerformanceStore } from '@/src/lib/stores/performanceStore';

// UI State
import { usePersonaStore } from '@/src/store/persona';
```

---

## WebGL & Shader System

The site features physics-based visualizations (singularity, particle networks) powered by Three.js and custom GLSL shaders.

### File Locations
```
shaders/                         # Raw GLSL files
├── blackhole/*.vert|.frag       # Event horizon visualization
├── network/*.vert|.frag         # Particle network
├── common/*.glsl                # Shared utilities (noise, color, math)
components/three/                # React Three Fiber components
src/lib/shaders/uniforms.ts      # Variance Tax → WebGL uniform binding
src/lib/webgl/capabilities.ts    # GPU detection & quality tiers
```

### Uniform Contract
Shaders receive data from the Variance Tax store via `src/lib/shaders/uniforms.ts`:

| Uniform | Type | Source |
|---------|------|--------|
| `uTime` | float | Elapsed seconds |
| `uVarianceIndex` | float 0-1 | Reynolds Score (0=laminar, 1=turbulent) |
| `uQualityTier` | int 0-3 | low/medium/high/ultra |
| `uProgress` | float 0-1 | Scroll position |
| `uPhase` | int 0-2 | Narrative phase (chaos→audit→solution) |

### Quality Tiers (Adaptive)
Always check `usePerformanceStore` before rendering heavy effects:

```typescript
const qualityTier = usePerformanceStore((s) => s.qualityTier);
const reducedMotion = usePerformanceStore((s) => s.reducedMotion);

// Adapt shader complexity
if (qualityTier === 'low' || reducedMotion) {
  // Reduce particle count, skip post-processing
}
```

The store auto-adjusts quality based on FPS (threshold: 30fps).

---

## Branding & Styling

### Single Source of Truth
All logos, colors, metadata in [lib/branding.ts](../flow-state-site/lib/branding.ts):
```typescript
export const ACTIVE_VARIANT: LogoVariant = 'flow_v2';  // Changes logo site-wide
```

### Color Tokens (never hardcode hex)
| Token | Hex | Usage |
|-------|-----|-------|
| `void` | #232A35 | Dark backgrounds |
| `flow` | #05ACEB | CTAs, actions (blue) |
| `neon` | #D91411 | Variance, alerts (red) |
| `steel` | #8892A8 | Neutral text |

### Tailwind Pattern
```tsx
<button className="bg-flow hover:bg-flow-dark text-void px-lg py-md">  // ✅
<button style={{ backgroundColor: '#05ACEB' }}>  // ❌
```

Spacing tokens: `xs`(4px) · `sm`(8px) · `md`(16px) · `lg`(24px) · `xl`(32px) · `xxl`(48px)

---

## Component Guidelines

- **Server Components by default** (Next.js 16 App Router)
- Use `'use client'` only for: Zustand stores, event handlers, Three.js, browser APIs

### Copy Guidelines
See [docs/COPY_GUIDELINES.md](../docs/COPY_GUIDELINES.md):
- ✅ "Variance" · ❌ "Inefficiency"
- ✅ "Standardized flow" · ❌ "Optimization"
- Voice: Data-driven, operational, confident

---

## File Structure

```
flow-state-site/
├── app/                    # Next.js App Router pages
├── components/             # React components (flat + domain subdirs)
├── shaders/                # Raw GLSL files
├── lib/branding.ts         # Branding single source
└── src/lib/
    ├── economics/          # ROI formulas (LOCKED)
    ├── varianceTax/        # Calculator store + formulas
    ├── shaders/            # Uniform bindings
    ├── stores/             # Performance store
    └── webgl/              # GPU capabilities
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Golden test mismatch | Review diff → get approval → run with `-u` flag |
| WebGL context lost | Check `usePerformanceStore`, reduce shader complexity |
| hCaptcha not rendering | Set `NEXT_PUBLIC_HCAPTCHA_SITEKEY` in `.env.local` |
| Shader syntax error | Run `npm run test:shaders` before committing |

---

## Reference Docs

- [ADOPTION_SEMANTICS.md](../docs/ADOPTION_SEMANTICS.md) — Critical invariant documentation
- [PRODUCTION_CHECKLIST.md](../flow-state-site/PRODUCTION_CHECKLIST.md) — Env vars & deployment
- [shaders/README.md](../flow-state-site/shaders/README.md) — GLSL conventions & brand colors

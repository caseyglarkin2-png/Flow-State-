# YardFlow Developer Guide

> Comprehensive development reference for YardFlow contributors

**Last Updated:** January 2026

---

## Quick Start

```bash
cd flow-state-site
npm install
cp .env.example .env.local   # Configure env vars
npm run dev                   # http://localhost:3000
```

---

## Architecture Overview

### Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js | 16.x |
| Language | TypeScript | 5.x |
| UI | React | 19.x |
| Styling | Tailwind CSS | 4.x |
| 3D/WebGL | Three.js + R3F | Latest |
| State | Zustand | 5.x |
| Testing | Vitest + Playwright | Latest |

### Directory Structure

```
flow-state-site/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── (routes)/           # Page routes
│   └── api/                # API endpoints
├── components/             # React components
│   ├── three/              # React Three Fiber components
│   ├── NetworkMap/         # Network visualization
│   └── ...                 # Domain components
├── config/                 # Configuration files
│   └── navigation.ts       # Centralized navigation config
├── lib/                    # Shared utilities
│   └── branding.ts         # Brand constants (single source)
├── shaders/                # Raw GLSL files
│   ├── blackhole/          # Event horizon shaders
│   ├── network/            # Particle network shaders
│   └── common/             # Shared GLSL utilities
├── src/
│   ├── lib/
│   │   ├── economics/      # ROI formulas (LOCKED)
│   │   ├── varianceTax/    # Calculator store
│   │   ├── stores/         # Zustand stores
│   │   └── shaders/        # Uniform bindings
│   └── content/            # Typed content models
├── styles/                 # Global styles
├── e2e/                    # Playwright E2E tests
└── public/                 # Static assets
```

---

## Key Concepts

### 1. Server vs Client Components

**Default:** Server Components (RSC)

```tsx
// Server Component (default)
export default function Page() {
  return <div>Server-rendered</div>;
}
```

**Add `'use client'` only when needed:**
- Zustand stores
- Event handlers (onClick, onChange)
- Browser APIs (window, localStorage)
- Three.js/WebGL components
- useState/useEffect

```tsx
'use client';

import { useState } from 'react';

export default function InteractiveComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### 2. Zustand Stores

**Import paths differ by domain:**

```typescript
// Economics & Calculator
import { useVarianceTaxStore } from '@/src/lib/varianceTax/store';

// Performance & WebGL quality
import { usePerformanceStore } from '@/src/lib/stores/performanceStore';

// UI State
import { usePersonaStore } from '@/src/store/persona';

// Network Map
import { useNetworkStore } from '@/src/lib/stores/networkStore';
```

### 3. Branding (Single Source of Truth)

All brand assets defined in [lib/branding.ts](lib/branding.ts):

```typescript
import { BRAND, SITE_METADATA, getActiveLogo } from '@/lib/branding';

// Product name
BRAND.productName  // "YardFlow"
BRAND.lockup       // "YardFlow by FreightRoll"

// Metadata
SITE_METADATA.tagline  // "Industrial Fluidity."

// Logo (auto-switches to micro at ≤20px)
const logo = getActiveLogo(28);
```

### 4. Color Tokens

**Never hardcode hex values. Use Tailwind tokens:**

| Token | Hex | Usage |
|-------|-----|-------|
| `void` | #232A35 | Dark backgrounds |
| `flow` | #05ACEB | CTAs, actions (blue) |
| `neon` | #D91411 | Variance, alerts (red) |
| `steel` | #8892A8 | Neutral text |
| `carbon` | #1A1A1A | Secondary backgrounds |

```tsx
// ✅ Correct
<button className="bg-flow hover:bg-flow-dark text-void">

// ❌ Wrong
<button style={{ backgroundColor: '#05ACEB' }}>
```

---

## Development Workflow

### Commands

```bash
npm run dev              # Dev server (localhost:3000)
npm run build            # Production build
npm run start            # Production server
npm run lint             # ESLint
npm run typecheck        # TypeScript check
npm run test:unit        # Vitest unit tests
npm run test:e2e         # Playwright E2E tests
npm run test:shaders     # GLSL syntax validation
npm run precommit        # lint + typecheck + unit tests
npm run predeploy        # Full CI: all checks + E2E
```

### Pre-Commit Checklist

Before every commit:

```bash
npm run precommit
```

This runs:
1. ESLint (code style)
2. TypeScript (type safety)
3. Vitest (unit tests + golden tests)

### Git Workflow

```bash
# Feature branch
git checkout -b feature/my-feature

# Make changes
npm run precommit  # Verify locally

# Commit
git add .
git commit -m "feat: add my feature"

# Push
git push origin feature/my-feature

# CI runs automatically on push
```

---

## Testing

### Unit Tests (Vitest)

```bash
npm run test:unit           # Run all
npm run test:unit -- --watch  # Watch mode
npm run test:unit -- path/to/test.ts  # Specific file
```

**Golden Tests (LOCKED):**

Economics formulas are frozen via golden snapshots:

```bash
# View diff
npm run test:unit -- src/lib/economics/__tests__/calc.test.ts

# Update (requires explicit approval)
npm run test:unit -- -u src/lib/economics/__tests__/calc.test.ts
```

### E2E Tests (Playwright)

```bash
npm run test:e2e            # Run all (headless)
npm run test:e2e -- --ui    # Interactive UI
npm run test:e2e -- --debug # Debug mode
```

**Key E2E Specs:**

| Spec | Purpose |
|------|---------|
| `smoke.spec.ts` | Critical user journeys |
| `routes.spec.ts` | Route accessibility |
| `accessibility.spec.ts` | Keyboard nav, ARIA |
| `lead-form.spec.ts` | Form submission |
| `network-sharing.spec.ts` | URL sharing |

### Shader Tests

```bash
npm run test:shaders  # Validate GLSL syntax
```

---

## Styling Guide

### Tailwind Patterns

```tsx
// Spacing tokens: xs(4px), sm(8px), md(16px), lg(24px), xl(32px), xxl(48px)
<div className="px-lg py-md">

// Responsive
<div className="text-sm md:text-base lg:text-lg">

// Brand colors
<button className="bg-flow text-void hover:bg-flow-dark">

// Glass effect
<div className="glass border border-neon/20">
```

### Component Patterns

```tsx
// Card with glass effect
<div className="bg-carbon/30 border border-neon/20 rounded-2xl p-6">

// Section container
<section className="py-section container mx-auto px-4">

// CTA button
<button className="bg-flow text-void font-semibold px-6 py-3 rounded-lg">
```

---

## WebGL & Shaders

### File Locations

```
shaders/
├── blackhole/*.vert|.frag  # Event horizon
├── network/*.vert|.frag    # Particle network
└── common/*.glsl           # Shared utilities

components/three/           # R3F components
src/lib/shaders/uniforms.ts # Variance Tax → uniform binding
src/lib/webgl/capabilities.ts # GPU detection
```

### Uniform Contract

All shaders receive these uniforms:

| Uniform | Type | Source |
|---------|------|--------|
| `uTime` | float | Elapsed seconds |
| `uVarianceIndex` | float 0-1 | Reynolds Score |
| `uQualityTier` | int 0-3 | low/medium/high/ultra |
| `uProgress` | float 0-1 | Scroll position |
| `uPhase` | int 0-2 | Narrative phase |

### Quality Tiers

```typescript
const qualityTier = usePerformanceStore((s) => s.qualityTier);
const reducedMotion = usePerformanceStore((s) => s.reducedMotion);

if (qualityTier === 'low' || reducedMotion) {
  // Reduce particle count, skip post-processing
}
```

---

## API Routes

### Lead Capture

```
POST /api/leads
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "message": "Interested in demo",
  "source": "contact-form",
  "utm": { "source": "google", "medium": "cpc" }
}
```

### PDF Generation

```
POST /api/pdf/roi
Content-Type: application/json

{
  "facilitiesCount": 50,
  "adoptionPercent": 10,
  ...
}

Response: application/pdf
```

---

## Environment Variables

See [.env.example](.env.example) for all variables.

**Required for Production:**

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_HCAPTCHA_SITEKEY` | Bot protection (client) |
| `HCAPTCHA_SECRET` | Bot protection (server) |
| `RESEND_API_KEY` | Email delivery |

**Optional:**

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_POSTHOG_KEY` | Analytics |
| `HUBSPOT_WEBHOOK_URL` | CRM integration |

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Golden test mismatch | Review diff → get approval → run with `-u` |
| WebGL context lost | Check `usePerformanceStore`, reduce complexity |
| hCaptcha not rendering | Set `NEXT_PUBLIC_HCAPTCHA_SITEKEY` in `.env.local` |
| Shader syntax error | Run `npm run test:shaders` |
| Type errors | Run `npm run typecheck` |

### Getting Help

1. Check [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md)
2. Review [docs/](docs/) for domain-specific guides
3. Run `npm run precommit` to validate changes

---

## Reference Documentation

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Project overview |
| [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md) | Deployment guide |
| [docs/ROUTE_AUDIT.md](docs/ROUTE_AUDIT.md) | Route inventory |
| [docs/A11Y_AUDIT.md](docs/A11Y_AUDIT.md) | Accessibility compliance |
| [docs/ADOPTION_SEMANTICS.md](../docs/ADOPTION_SEMANTICS.md) | Formula invariants |
| [docs/COPY_GUIDELINES.md](../docs/COPY_GUIDELINES.md) | Brand voice |
| [shaders/README.md](shaders/README.md) | GLSL conventions |

---

## Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/xyz`)
3. Run `npm run precommit` before committing
4. Push and create PR
5. CI must pass before merge

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

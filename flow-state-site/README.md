# YardFlow by FreightRoll - Yard Orchestration & Security

A modern, high-performance website for YardFlow by FreightRoll, a next-generation yard orchestration and security platform for logistics facilities.

## Features

- **Next.js 16** - Latest React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom neon color scheme
- **Responsive Design** - Works on all devices
- **Dark Mode** - Premium dark UI with neon accents (#00FFC2)
- **Performance** - Optimized for speed and SEO
- **Animations** - Smooth transitions and grid effects

## Color Palette

- **The Void**: #050505 (Deep black background)
- **LIA Neon**: #00FFC2 (Cyan accent)
- **Safety Ember**: #FF2A00 (Red alerts)
- **Carbon**: #1A1A1A (Secondary backgrounds)
- **Steel**: #888888 (Passive text)

## Pages

1. **Home** (`/`) - Hero, problem statement, solution, product modules, YardBuilder preview, Primo proof, deployment timeline
2. **Product** (`/product`) - YardFlow deep dive with Digital Guard, Orchestration Engine, Driver Experience modules
3. **Solutions** (`/solutions`) - Industry archetypes (Retail, 3PL, Port, LTL, Manufacturing) with pain/flow mapping
4. **YardBuilder AI** (`/yardbuilder`) - 10-minute digital twin feature with 3-step process and use cases
5. **ROI Calculator** (`/roi`) - Interactive ROI calculator with industry presets and PDF export
6. **Proof** (`/proof`) - Primo case study and validation data
7. **Network Map Demo** (`/demo/network-map`) - Interactive facility network visualization with sharing

See [docs/ROUTE_AUDIT.md](docs/ROUTE_AUDIT.md) for complete route inventory and redirect mappings.

## Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm** 10.x or higher

### Quick Start (3 commands)

```bash
npm install
cp .env.example .env.local   # Configure env vars (see below)
npm run dev                   # http://localhost:3000
```

### Installation

```bash
cd flow-state-site
npm install
```

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_POSTHOG_KEY` | No | - | PostHog analytics key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | `https://us.i.posthog.com` | PostHog host URL |
| `NEXT_PUBLIC_HCAPTCHA_SITEKEY` | No | - | hCaptcha site key for forms |
| `HCAPTCHA_SECRET` | No | - | hCaptcha server secret |
| `HUBSPOT_WEBHOOK_URL` | No | - | HubSpot webhook for lead capture |
| `RESEND_API_KEY` | No | - | Resend email service key |
| `LEAD_NOTIFY_EMAIL` | No | - | Email for lead notifications |

See `.env.example` for all available options.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Components

- **Header** - Navigation with logo, menu, and CTAs
- **Footer** - Links and social media
- **Button** - Variants: neon, neon-fill, ghost
- **Card** - Glassmorphic card component with optional hover effect

## Styling

Custom Tailwind configuration with:
- Neon color variables
- Custom animations (glow-pulse, flow-in, grid-move)
- Glassmorphism utilities
- Responsive breakpoints

## Typography

- **Headlines**: Inter (Bold/Black, tight tracking)
- **UI/Data**: JetBrains Mono (Technical, monospace)
- **Body**: Inter (Regular/Medium)

All fonts loaded via Google Fonts CDN.

## Testing & Quality Assurance

### Test Framework

- **Vitest** - Unit tests, golden tests, snapshot verification
- **Playwright** - End-to-end tests, visual regression, mobile interaction
- **TypeScript** - Strict mode enforcement, static type checking

### Running Tests

```bash
# Unit tests (golden tests + component tests)
npm run test:unit

# Watch mode for TDD
npm run test:unit -- --watch

# End-to-end tests (requires build)
npm run test:e2e:ci

# Visual regression tests (baseline + compare)
npm run test:e2e:visual

# Type checking
npm run typecheck

# Linting
npm run lint

# Full CI pipeline (local)
npm run lint && npm run typecheck && npm run test:unit && npm run build
```

### Golden Tests

**Location:** `src/lib/economics/__tests__/`

Golden tests lock critical formula behavior using Vitest snapshots:

- **`calc.test.ts`** - ROI calculation (`calcRoiV2`) frozen across 5 scenarios:
  - 1 facility (baseline)
  - 10 facilities
  - 260 facilities (Year 1 Deep Model default)
  - 10,000 facilities
  - 1,000,000+ facilities (unlimited scale)
  - **Adoption % Invariance:** Outputs identical at 5% vs 50% adoption (narrative-only)

- **`multiplier.test.ts`** - Network multiplier model with:
  - Metcalfe-inspired adoption curve
  - Large number handling (tested to 1M facilities)
  - Monotonic increase guarantee
  - Precision validation

**Snapshot Verification:**
If formula outputs change:
```bash
# Review diff in terminal
npm run test:unit -- --reporter=verbose src/lib/economics/__tests__/calc.test.ts

# Approve changes (requires explicit approval + documentation)
npm run test:unit -- -u src/lib/economics/__tests__/calc.test.ts
```

All snapshots are locked in git. Formula changes require:
1. Explicit `npm run test:unit -- -u` snapshot update
2. `git add src/lib/economics/__tests__/*.snap`
3. Code review + approval (CI enforces)
4. Documentation in `docs/ECONOMICS_AUDIT.md`

### Adoption % Semantics

**Critical Invariant:** Adoption % is **narrative-only** and does NOT affect formula outputs.

- **Evidence:** Golden test proves `calcRoiV2(input5%) === calcRoiV2(input50%)`
- **Implementation:** `CoverageSlider` updates UI copy only ("Modeling XX of YY facilities")
- **Documentation:** See [ADOPTION_SEMANTICS.md](../docs/ADOPTION_SEMANTICS.md)

### Component Tests

- **`CoverageSlider.test.tsx`** - Adoption % slider component:
  - Rendering, interaction, accessibility
  - Preset buttons (5%, 10%, 25%, 50%)
  - Mobile responsiveness + touch input
  - ARIA labels + keyboard support

- **`adoption/model.test.ts`** - Adoption helpers:
  - `facilitiesInScope()` - Calculate in-scope facilities (1M+ tested)
  - `formatFacilityCount()` - Add commas to numbers
  - `buildAdoptionCopy()` - Generate UI text
  - Preset system (`ADOPTION_PRESETS`)

### E2E Tests

- **`smoke.spec.ts`** - Playwright smoke tests (critical user journeys)
- **`routes.spec.ts`** - Route accessibility and redirect validation
- **`visual-regression.spec.ts`** - Screenshot baselines (desktop 1280×720, mobile 375×667)
- **`mobile-interaction.spec.ts`** - Touch input, button sizing (44×44px), overflow checking, orientation changes
- **`accessibility.spec.ts`** - Keyboard navigation, skip links, ARIA compliance
- **`lead-form.spec.ts`** - Form submission, UTM capture, validation
- **`network-sharing.spec.ts`** - Network map URL sharing, clipboard, config loading

### CI Pipeline

GitHub Actions enforces quality gates on every commit:

```yaml
Lint (ESLint + Prettier)
    ↓
TypeCheck (tsc --noEmit)
    ↓
Unit Tests (Vitest golden + component)
    ↓
Build (npm run build)
    ↓
E2E Smoke (Playwright)
    ↓
✅ Merge approved
```

**All gates must pass.** No manual overrides.

### Quality Standards

- **Type Safety:** TypeScript `strict: true` enforced globally
- **Snapshot Locks:** Golden tests prevent formula regression
- **Accessibility:** WCAG 2.1 AA compliance (ARIA labels, keyboard support, color contrast)
- **Mobile First:** All components tested at 375px+ widths, 44×44px touch targets
- **Performance:** Bundle size monitoring, image optimization, lazy loading

### Regression Detection

**When to run full suite:**
```bash
# After changing economics, adoption, or network models
npm run test:unit -- src/lib/

# After UI changes to CoverageSlider or adoption flows
npm run test:e2e:visual

# After modifying any component or page
npm run test:e2e:ci
```

**Expected Workflow:**
1. Make code change
2. Tests fail (snapshot or assertion diff)
3. Review diff: `git diff` or `npm run test:unit -- --reporter=verbose`
4. If intentional: Update snapshot (`-u flag`) + add documentation
5. If unintended: Fix code to match golden baselines
6. Commit + push (CI validates all gates)

### Documentation

See also:
- [ADOPTION_SEMANTICS.md](../docs/ADOPTION_SEMANTICS.md) - Adoption % narrative-only rule
- [ECONOMICS_AUDIT.md](../docs/ECONOMICS_AUDIT.md) - Formula audit trail, baselines, approval workflow

## Content Models

### Co-Development Program (`src/content/coDevelopment.ts`)

Typed content model for the co-development program page. Enforces rollout strategy alignment:
`Network → Protocols → Interoperable Data → Multi-site Adoption → RTLS`

**Key Exports:**
```typescript
import { 
  coDevContent,       // Full content object
  modules,            // All 5 modules with phase assignments
  phases,             // 3 phases with availability
  getModulesByPhase,  // Filter modules by phase (1, 2, 3)
  getPhase,           // Get phase details by number
  hasPrerequisites,   // Check if module requires Phase 1
  MODULE_ICONS,       // Type-safe icon union
} from '@/src/content/coDevelopment';
```

**Type Safety:**
- `PhaseNumber` = `1 | 2 | 3`
- `ModuleIcon` = `'Agent' | 'Velocity' | 'Cortex' | 'Ignite' | 'Shield' | 'Nexus' | 'Timeline'`
- RTLS is always Phase 3 (enforced by 51 regression tests)

**Testing:**
```bash
# Run co-dev content tests
npm run test:unit -- lib/__tests__/coDevelopment.test.ts

# Key test invariants:
# - RTLS has phase >= 2 (actually 3)
# - RTLS has 4 prerequisites
# - MODULE_ICONS matches icon usage in modules
# - All phases have estimatedAvailability
# - "Why This Order" has 4 reasons
```

**Sprint Plan:** See [codev_program_sprint_plan.md](../docs/codev_program_sprint_plan.md) for implementation roadmap.

## SEO

- Meta tags configured for each page
- Open Graph support
- Semantic HTML structure
- Mobile-friendly design

## License

MIT License © 2025 YardFlow by FreightRoll

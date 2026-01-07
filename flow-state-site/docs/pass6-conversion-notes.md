# Pass 6 — "The Yard Tax" Conversion Upgrade

## Overview

Pass 6 introduces loss-aversion framing to the YardFlow by FreightRoll site, leading with the hidden costs buyers don't realize they're paying before revealing the network effect upside.

**Core insight:** "Your yard is already costing you money. You just don't have an invoice for it."

## Changes

### 1. Homepage — Yard Tax Section

Added a new section **above** the Network Effect section with:

- **Hook quote** at the top of the hero: "Your yard is already costing you money..."
- **8 Yard Tax tiles** covering the hidden cost categories:
  1. Detention & disputes ($50–200/occurrence)
  2. Missed cutoffs & expedite fees ($500–2,000/event)
  3. OT/labor volatility ($15–45/hr premium)
  4. Trailer hunt time (8–15 min/move)
  5. OTIF chargebacks ($100–500/miss)
  6. Overflow yards/3PL surge ($200–800/trailer/day)
  7. Safety/claims exposure ($5K–50K/claim)
  8. Working capital buffers (3–7% tied capital)

- Each tile shows: **Symptom → Cause → Modeled Cost Range**
- CTA: "Run the 60-Second Yard Tax Diagnostic"

### 2. /diagnostic Route (NEW)

Interactive 9-question diagnostic for truckload operations:

**Inputs:**
- Truckloads/day per facility
- Facilities count
- Peak uplift %
- Avg gate-to-exit time
- % exception loads
- Expedited shipments/week + avg premium
- Overtime hours/week at gate/yard
- Overflow/3PL monthly spend

**Outputs:**
- **Yard Tax Score** (0–100)
- **Top 3 leak drivers** with annual cost estimates
- **Cost of Delay** (30/90 days) — computed from canonical economics model
- **Export options:** JSON assumptions, link to /roi with params

All outputs use the canonical economics engine (`calcScenario`) to ensure consistency.

### 3. Variance Kills Block

Added to /roi and /network-effect pages:

- Visual bar chart showing 30-day dwell time distribution
- Highlights that ~20% of days are outliers (>70 min) driving 60%+ of costs
- Shows: Average hides chaos; variance creates detention, missed cutoffs, OT, premium freight
- CFO insight callout explaining why averages mislead

### 4. CFO Proof Checklist Component

Reusable component (`CFOProofChecklist`) displayed on:
- /roi
- /network-effect

10 questions every finance team asks:
1. What constraint is removed?
2. Hard savings vs opportunity?
3. Key assumptions?
4. Peak season impact?
5. Adoption ramp?
6. Cost of delay?
7. Implementation RACI?
8. Security posture?
9. Commercial terms?
10. Board-ready artifact?

Each links to relevant page/section or export action.

### 5. ROI Page Updates

- **Hero** already leads with truckload capacity unlocked + profit impact
- Added **Variance Kills Block** after the main CTA
- Added **CFO Proof Checklist** section
- Cost of delay (90-day) prominent in executive snapshot

### 6. Narrative Flow

Pages now follow the loss-averse ordering:
1. **Hook** — Pattern interrupt (yard tax quote)
2. **Stakes** — What you're losing (Yard Tax tiles)
3. **Reveal** — Ground truth + orchestration
4. **Proof** — Model + methodology + case study
5. **Climax** — Network effect compounds
6. **CTA** — Next step

### 7. Network Effect Positioning

Network effect section remains but is now positioned as the **climax** after the pain is established:
- "First, stop the bleeding at a node."
- "Then the network compounds."

## Files Changed

**New files:**
- `components/YardTaxSection.tsx` — Homepage yard tax tiles
- `components/DiagnosticCalculator.tsx` — Interactive diagnostic
- `components/CFOProofChecklist.tsx` — Finance team checklist
- `components/VarianceKillsBlock.tsx` — Variance visualization
- `app/diagnostic/page.tsx` — Diagnostic route
- `app/diagnostic/layout.tsx` — Diagnostic metadata

**Modified files:**
- `app/page.tsx` — Added hook quote + Yard Tax section
- `app/roi/page.tsx` — Added Variance Kills + CFO Checklist
- `app/network-effect/page.tsx` — Added Variance Kills + CFO Checklist
- `e2e/smoke.spec.ts` — Added diagnostic smoke tests

## Constraints Honored

1. **No invented customers/numbers** — All cost ranges are industry benchmarks with "modeled range" disclaimers
2. **Canonical economics engine** — Diagnostic uses `calcScenario()` for cost of delay calculations
3. **Labeled as modeled** — Every cost figure includes disclaimer text linking to methodology
4. **Network effect preserved** — Remains as climax, not removed

## Testing

- Unit tests pass (schema, ROI, economics model)
- Smoke tests added for /diagnostic and yard tax hook
- Build completes successfully with all routes

## Rationale

Loss aversion is ~2x more powerful than gain framing (Kahneman & Tversky). By leading with "what you're losing" before "what you could gain," we:

1. Create urgency without hype
2. Give CFOs a reason to investigate (not just "opportunity")
3. Make the network effect feel like the natural resolution, not a sales pitch
4. Position YardFlow by FreightRoll as the solution to a problem they already have, not a shiny new tool

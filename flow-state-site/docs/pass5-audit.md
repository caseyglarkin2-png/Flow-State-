# Pass 5 Audit — Economics Congruence + Production Hardening

Date: 2026-01-02
Site: https://flow-state-klbt.vercel.app/

## Goal
Make every number on `/`, `/roi`, and `/singularity` come from a single canonical model given the same **Scenario + Mode**, with guardrails and tests that prevent regressions.

## Findings (current state)

### 1) ROI assumptions live in multiple places (duplicated constants + formulas)

**Primary ROI engines**
- `src/lib/roi/calc.ts`
  - `calcRoiV1()` (Quick) includes hard-coded constants:
    - Network multiplier: `1 + log(facilities + 1) * 0.5`
    - Paper savings: `11900` per facility
    - Throughput capacity increase: `0.10`
    - Incremental margin: `500` per truck
    - Detention incidence: `0.15` and reduction: `0.65`
    - Gate labor savings: `0.70`
    - Terms: `2500` one-time + `8000` annual per facility
  - `calcRoiV2()` (Pro) includes its own network multiplier + network-effect breakdown function.

**ROI page duplicates business math**
- `app/roi/page.tsx`
  - `calculateCFOMetrics()` re-derives ROI/payback/NPV and includes a fabricated IRR approximation (`+ 15`), violating “no fabricated claims”.
  - Has separate “modeling presets” (conservative/base/aggressive) that are not shared with homepage/network/singularity.

### 2) Homepage Network Effect numbers come from a separate model
- `components/NetworkEffectModel.tsx`
  - Uses a separate “$1700 per truck per year” and calls it “aligned”, but it is not derived from the ROI engines.
  - Duplicates the network-effect breakdown logic (maturity factor, predictive/carrier/coordination/learning streams) in TSX.

- `app/network-effect/page.tsx`
  - Has its own `networkMultiplier(facilities, logFactor)` helper.

### 3) Singularity simulation uses its own economics
- `app/singularity/page.tsx`
  - Has a separate “networkMultiplier”/velocity calculation (e.g., `1 + activated * 0.15`) and simulation metrics that are not derived from ROI/network functions.
  - Facility list and packet animation are fine; the issue is the *numbers* shown to users.

### 4) Proof paths
- Broken/unsupported link:
  - `/case-studies/primo-network` is linked from:
    - `app/page.tsx`
    - `components/Footer.tsx`
  - The repo currently has `app/case-studies/page.tsx` but **no** `app/case-studies/[slug]/page.tsx` handler, so the “Primo network” case study link can 404.

### 5) Lead capture (hCaptcha)
- Frontend:
  - `components/LeadForm.tsx` and `components/BoardReadyExportCTA.tsx` read `NEXT_PUBLIC_HCAPTCHA_SITEKEY`.
- Backend:
  - `src/lib/hcaptcha.ts` validates using `HCAPTCHA_SECRET`.

Observed risk:
- hCaptcha “sitekey is incorrect” banner in production typically indicates the key is not configured for the current hostname in the hCaptcha dashboard (this is not fixable purely in code).

### 6) Routes inventory (marketing + calculators)

**Key pages**
- `/` — `app/page.tsx` (homepage; includes Proof anchor + network effect section)
- `/roi` — `app/roi/page.tsx` (board/deep views; uses `calcRoiV1` and `calcRoiV2`)
- `/singularity` — `app/singularity/page.tsx` (simulation + story)
- `/yardbuilder` — `app/yardbuilder/page.tsx`
- `/product` `/solutions` `/pricing` `/security` `/integrations` `/implementation` `/about` `/case-studies` …

**Key APIs**
- `app/api/pdf/roi/route.ts` (server PDF; calls ROI calc)
- `app/api/pdf/yardbuilder/route.ts`
- `app/api/email/roi/route.ts`
- `src/lib/api/leadHandler.ts`

## Root cause (core bug)
There is no single canonical “economics spine.” We have at least 4 separate implementations of network/ROI logic:
- ROI V1
- ROI V2
- Homepage NetworkEffectModel
- Singularity simulation

This guarantees drift.

## Plan (what changes next)
1. Create `src/lib/economics/` as the single model layer:
   - assumptions store, types, ROI + network functions, presets, validations.
2. Replace ROI page’s duplicated CFO metrics with computed outputs from the model.
3. Refactor homepage NetworkEffectModel and Singularity economics to use the model.
4. Add a shared Scenario+Mode selector (preset + mode) used across `/`, `/roi`, `/singularity`.
5. Fix proof route `/case-studies/primo-network` by adding a slug page.
6. Add Methodology page and link it from all ROI surfaces.
7. Add tests:
   - Unit tests for economics spine.
   - Playwright smoke test + congruence test.

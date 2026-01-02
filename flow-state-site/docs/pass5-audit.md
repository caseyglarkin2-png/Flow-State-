# Pass 5 Audit — Economics Congruence + Production Hardening

Date: 2026-01-02
Site: https://flow-state-klbt.vercel.app/

## Goal
Make every number on `/`, `/roi`, `/network-effect`, and `/singularity` come from a single canonical model given the same **Scenario + Mode**, with guardrails and tests that prevent regressions.

Critical framing update
- In this business, **“shipment” means TRUCKLOAD**.
- Dwell remains a mechanism metric, but the CFO headline must lead with:
  - **Truckload capacity unlocked** (per facility and across the network)
  - **Profit impact** (contribution margin or avoided outsourced capacity)

## Findings (current state)

### 1) ROI assumptions live in multiple places (and outputs aren’t aligned everywhere)

**Canonical ROI engine exists (good news)**
- `src/lib/economics/roi.ts`
  - `calcRoiV2()` is the primary finance model.
  - Spreadsheet parity is already enforced by unit tests (see `src/__tests__/roi.test.ts`).
- `src/lib/roi/calc.ts` and `src/lib/roi/types.ts` are wrappers re-exporting the economics layer.

**Where duplication still happens (needs cleanup)**
- `app/roi/page.tsx` computes additional CFO metrics (NPV) in the UI layer.
- `app/network-effect/page.tsx` uses a standalone placeholder model (explicitly says it’s placeholder) rather than the ROI engine.
- `app/singularity/page.tsx` uses hard-coded per-site savings and a synthetic network multiplier/savings accumulator for the animation/“ROI breakdown”.

**ROI page duplicates business math**
- `app/roi/page.tsx`
  - `calculateCFOMetrics()` re-derives ROI/payback/NPV and includes a fabricated IRR approximation (`+ 15`), violating “no fabricated claims”.
  - Has separate “modeling presets” (conservative/base/aggressive) that are not shared with homepage/network/singularity.

### 2) Homepage and “Network Effect” page are not fully model-congruent
- Homepage (`app/page.tsx`) already calls `calcRoiV2(getRoiV2InputsForPreset(...))` for KPI tiles (good).
- The flagship `/network-effect` page currently computes base savings using a per-facility placeholder (not the ROI model).
- `components/NetworkEffectModel.tsx` uses `calcRoiV2()` (good), but any static copy like “$10k/site annual savings” is not tied to the canonical model.

### 3) Singularity uses synthetic economics (must be replaced)
- `app/singularity/page.tsx`
  - The animation is fine.
  - The displayed “Live Savings”, “ROI Breakdown” and the “network multiplier/velocity” are synthetic.
  - The hard-coded line items ($127K, $89K, etc.) and “5.8× / +$93.1M/yr” must be derived from the canonical model (or clearly labeled as illustrative only).

### 4) Proof paths (case studies)
- `/case-studies/primo-network` exists in code (`app/case-studies/[slug]/page.tsx`).
- Action item: validate all case-study links resolve and add coverage in Playwright smoke tests.

### 5) Lead capture (hCaptcha)
- Frontend:
  - `components/LeadForm.tsx` and `components/BoardReadyExportCTA.tsx` read `NEXT_PUBLIC_HCAPTCHA_SITEKEY`.
- Backend:
  - `src/lib/hcaptcha.ts` validates using `HCAPTCHA_SECRET`.

Observed risk:
- hCaptcha “sitekey is incorrect” banner in production typically indicates the key is not configured for the current hostname in the hCaptcha dashboard (this is not fixable purely in code).

Action item:
- If `NEXT_PUBLIC_HCAPTCHA_SITEKEY` is missing, the UI must fail gracefully (clear message + fallback CTA) rather than appearing broken.

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
We have a strong ROI V2 engine already, but there is no single canonical *CFO-first* “capacity unlocked + profit impact” model driving every page.

Current drift surfaces:
- `/network-effect` uses a placeholder calculator.
- `/singularity` uses synthetic savings/multiplier numbers.
- Some UI-level KPIs and copy are not derived from the model outputs.

## Plan (what changes next)
1. Extend the economics layer to include **truckload capacity unlocked** and **profit impact** outputs.
2. Wire `/roi` (board-ready default) to lead with capacity unlocked and profit impact (still showing hard savings + network bonus).
3. Replace `/network-effect` placeholder math with canonical economics outputs.
4. Replace `/singularity` synthetic numbers with canonical economics outputs (or clearly label as illustrative).
5. Add congruence tests across surfaces (preset enterprise_50 + base mode).
6. Add methodology doc and exportable assumptions JSON.

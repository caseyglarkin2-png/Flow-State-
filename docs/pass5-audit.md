# Pass 5 Audit — Economics Congruence + Production Hardening

Date: 2026-01-05
Site: https://flow-state-klbt.vercel.app/

## Goal
Make every number on `/`, `/roi`, `/network-effect`, and `/singularity` come from a single canonical model given the same **Scenario + Mode**, with guardrails and tests that prevent regressions.

Critical framing update
- In this business, **“shipment” means TRUCKLOAD**.
- Dwell remains a mechanism metric, but the CFO headline must lead with:
  - **Truckload capacity unlocked** (per facility and across the network)
  - **Profit impact** (contribution margin or avoided outsourced capacity)

## Findings (current state)

### 1) ROI math locations (what exists today)
- Canonical ROI v2 engine:
  - `flow-state-site/src/lib/economics/roi.ts` (`calcRoiV2()`)
  - Spreadsheet parity tests in `flow-state-site/src/__tests__/roi.test.ts` (BT + Lineage)
- Canonical scenario wrapper (capacity unlocked + profit impact):
  - `flow-state-site/src/lib/economics/model.ts` (`calcScenario()`)
  - Golden sanity tests in `flow-state-site/src/lib/economics/tests/model.test.ts`

### 2) Network effect formula consolidation (critical)
- Canonical implementation:
  - `flow-state-site/src/lib/economics/networkEffect.ts`
- Canonical formula used everywhere:
  1) $C(n)=n(n-1)/2$
  2) $R(n)=1-\exp(-n/\tau)$
  3) fixed baseline $n_0=10$, $C_0=C(n_0)$
  4) $M(n)=1+\beta\cdot(C(n)/C_0)\cdot R(n)$
  5) $\text{NetworkBonus}=\text{BaseValue}\cdot(M(n)-1)$

Update in this pass
- Removed the prior ad-hoc `logFactor` / `1 + ln(n+1)*k` multiplier.
- `/network-effect`, `/singularity`, the homepage Network Effect module, and ROI now compute $M(n)$ via the same canonical function.

### 3) Known drift risks to keep policing
- Static marketing copy still contains hard-coded numbers in a few places (these should be converted to modeled outputs or clearly labeled as “modeled example”).
- `/singularity` contains synthetic animation counters (visual only). Any *displayed financial breakdown* must remain sourced from `calcScenario()`.

### 4) Proof paths / routes
- `/case-studies/primo-network` route exists (`flow-state-site/app/case-studies/[slug]/page.tsx`).
- Action item: ensure any additional case-study links resolve and add/keep Playwright coverage.

### 5) Lead capture / hCaptcha
- Frontend reads `NEXT_PUBLIC_HCAPTCHA_SITEKEY`:
  - `flow-state-site/components/LeadForm.tsx`
  - `flow-state-site/components/BoardReadyExportCTA.tsx`
- Backend verification uses `HCAPTCHA_SECRET`:
  - `flow-state-site/src/lib/hcaptcha.ts`

Observed risk
- “sitekey is incorrect” in production is usually an hCaptcha dashboard hostname misconfiguration (not fixable purely in code).

## Hard-coded ROI numbers to remove/replace (non-exhaustive)
- Any “$X per site” and “Y% reduction” copy must be either:
  - derived from the model outputs for the currently-selected Scenario + Mode, or
  - explicitly labeled as illustrative and non-claim.

## Next steps (if continuing)
1) Ensure ROI PDF and finance-email artifacts include capacity-unlocked + profit impact (not just savings).
2) Add a congruence test asserting the same preset/mode yields identical outputs across the surfaces that reference it.
3) Scrub remaining hard-coded performance/ROI claims from homepage metadata and hero copy.

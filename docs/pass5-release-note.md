# Pass 5 release note (2026-01-05)

## What changed
- Replaced the prior ad-hoc network multiplier with a single canonical Metcalfe-inspired, realization-adjusted model (one function shared across ROI, network-effect, homepage module, and singularity).
- Migrated network effect inputs from `logFactor` to `beta` (strength) and `tau` (maturity), with fixed baseline `n0=10`.
- Updated unit and smoke tests to match the new canonical network effect parameters.

## Why
- CFO trust depends on one defensible formula, one set of assumptions, and congruent outputs across every page and export.
- The new model is “law-based” (Metcalfe-inspired) but realization-adjusted to prevent absurd early-year claims.

## Notes
- Canonical network effect implementation: `flow-state-site/src/lib/economics/networkEffect.ts`
- Main ROI engine: `flow-state-site/src/lib/economics/roi.ts`

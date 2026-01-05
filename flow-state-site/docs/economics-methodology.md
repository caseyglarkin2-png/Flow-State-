# Economics methodology (truckload capacity + hard savings + network effect)

Status: Draft (Pass 5)

This document describes the canonical Flow State economics model used across:
- `/` (homepage KPI tiles)
- `/network-effect`
- `/roi` (board-ready + deep)
- `/singularity`
- Board-ready ROI PDF

## Definitions

- **Shipment = truckload** (core unit in the model)
- **Hard savings**: modeled dollar reductions with clear cost basis (e.g., paper/admin cost, detention exposure, labor time)
- **Opportunity upside**: modeled profit uplift from additional truckloads shipped (capacity unlocked) and other network effects

## Model overview

The model has three layers:
1. **Facility volume layer**: annual truckloads derived from trucks/day × operating days/year × facility mix.
2. **Value layer**:
   - Hard savings (paper, labor, detention)
   - Capacity unlocked (incremental truckloads) → profit impact
3. **Network layer**:
   - Multiplier and breakdown applied consistently across the network
   - Additional effects (ramp speed, variance reduction) are modeled explicitly and conservatively

## Capacity unlocked (truckloads)

We convert time savings into incremental truckloads using the cycle-time constraint model:

- `baseline_cycle_time_minutes` = baseline critical bottleneck time (gate-in → gate-out)
- `minutes_saved_total` = check-in reduction + check-out reduction (+ optional coordination savings)
- `theoretical_throughput_gain_pct = baseline / (baseline - saved) - 1`
- `realized_gain_pct = theoretical_gain_pct * realization_factor`
- `incremental_truckloads = current_truckloads * realized_gain_pct`

### Profit impact methods

The model supports one active method at a time:

1) **Contribution margin per truckload**
- `incremental_profit = incremental_truckloads * contribution_margin_per_truckload`

2) **Avoided outsourced capacity**
- `avoided_outsourcing_delta = outsourced_cost_per_truckload - internal_variable_cost_per_truckload`
- `incremental_profit = incremental_truckloads * avoided_outsourcing_delta`

## Year-1 realization (ramp)

Year 1 uses an explicit realization factor to avoid implying instant enterprise adoption:

- `yearOneGrossValue = annualValue * yearOneRampShare`

For multi-year outputs, Year 1 uses the ramped value and years 2–5 use steady-state (with conservative growth assumptions where applicable).

## Network effect

Network effect is modeled using a single, defensible, Metcalfe-inspired formula that is realization-adjusted (to stay CFO-safe).

Canonical network effect
1) Potential connectivity:
- $C(n)=n(n-1)/2$
2) Realization factor (adoption/playbooks/data quality):
- $R(n)=1-\exp(-n/\tau)$
3) Baseline normalization (fixed):
- $n_0=10$ (fixed across the site)
- $C_0=C(n_0)$
4) Canonical multiplier:
- $M(n)=1+\beta\cdot\left(\frac{C(n)}{C_0}\right)\cdot R(n)$
5) Network bonus (single definition everywhere):
- $\text{NetworkBonus}=\text{BaseValue}\cdot(M(n)-1)$

We also compute a breakdown (predictive intelligence, benchmarking, coordination efficiency, shared learning) for explanation; component values are scaled so that:

- `sum(breakdownComponents) == networkBonus`

## Investment

The model includes:
- Annual subscription (per contracted facility)
- One-time implementation
- Optional internal rollout team cost (default ON for conservative planning)

## Guardrails

- No NaN / Infinity in outputs
- Payback formatting:
  - `< 1 month` instead of `0.0 months`
- Extreme ROI:
  - large ROI values are flagged as assumption-sensitive

## Disclaimers

- Outputs are directional and depend on operational baselines.
- Results vary by facility, network maturity, seasonality, and adoption.
- Modeled opportunity upside is not a guarantee; it is provided for planning.

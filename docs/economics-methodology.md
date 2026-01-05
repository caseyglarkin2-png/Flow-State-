# Economics methodology (truckload capacity + hard savings + network effect)

Date: 2026-01-05

This document describes the canonical Flow State economics model used across:
- `/` (homepage KPI tiles)
- `/network-effect`
- `/roi` (board-ready + deep)
- `/singularity`
- Board-ready exports

## Definitions
- **Shipment = truckload** (core unit)
- **Hard savings**: modeled dollar reductions with clear cost basis (paper/admin, labor time, detention exposure)
- **Opportunity upside**: modeled profit uplift from additional truckloads shipped (capacity unlocked)

## Capacity unlocked (truckloads)
We convert time savings into incremental truckloads using a cycle-time constraint model:

- `baseline_cycle_time_minutes` = baseline critical bottleneck time (gate-in → gate-out)
- `minutes_saved_total` = check-in reduction + check-out reduction (+ optional coordination savings)
- `theoretical_throughput_gain_pct = baseline / (baseline - saved) - 1`
- `realized_gain_pct = theoretical_gain_pct * realization_factor`
- `incremental_truckloads = current_truckloads * realized_gain_pct`

### Profit impact methods
One method is active at a time:

1) **Contribution margin per truckload**
- `incremental_profit = incremental_truckloads * contribution_margin_per_truckload`

2) **Avoided outsourced capacity**
- `avoided_outsourcing_delta = outsourced_cost_per_truckload - internal_variable_cost_per_truckload`
- `incremental_profit = incremental_truckloads * avoided_outsourcing_delta`

## Canonical network effect (Metcalfe-inspired, realization-adjusted)
We use a single canonical model everywhere.

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

Modes (conservative / expected / upside) adjust only $\beta$ and $\tau$.

## Guardrails
- No NaN/Infinity in displayed outputs
- Payback formatting:
  - payback < 1 month → “< 1 month”
- Extreme values are flagged as assumption-sensitive (e.g., ROI > 5000%, multiplier > 6×)

## Disclaimers
- Outputs are modeled estimates for planning, not guarantees.
- Results vary by baseline process maturity, adoption ramp, facility mix, and seasonality.

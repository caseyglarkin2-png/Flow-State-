# Variance Tax Model Reconciliation

> **STATUS: DECISION REQUIRED**  
> This document reconciles the existing 8-category cost model in `DiagnosticCalculator.tsx` with the 6-component model proposed in the Variance Tax whitepaper.

---

## Executive Summary

The existing DiagnosticCalculator uses an **8-category operational cost model** derived from practical inputs (dwell time, expedites, OT, overflow, exceptions, security). The Variance Tax whitepaper proposes a **6-component financial model** (A-F) that maps to CFO-facing categories.

**Recommendation:** Implement a **unified internal model** that captures all cost drivers, with two **presentation layers**:
1. **Operational View** (existing): For yard operations teams
2. **Financial View** (new): For CFO/executive audiences

---

## Current State: 8-Category Model

| # | Category | Source | Calculation Approach |
|---|----------|--------|---------------------|
| 1 | Detention & Disputes | `DiagnosticCalculator.tsx` | `truckloads × detentionRate × $75` |
| 2 | Expedite & Premium Freight | `DiagnosticCalculator.tsx` | `weeklyExpedites × avgPremium × 52` |
| 3 | Overtime & Labor Volatility | `DiagnosticCalculator.tsx` | `weeklyOTHours × $45 × 52` |
| 4 | Overflow & 3PL Surge | `DiagnosticCalculator.tsx` | `monthlyOverflow × 12` |
| 5 | Exception Handling | `DiagnosticCalculator.tsx` | `truckloads × exceptionRate × 0.25hr × $50` |
| 6 | Security & Fraud | `DiagnosticCalculator.tsx` | `theftIncidents × avgValue + investigation + insurance` |
| 7 | Missed Cutoffs/Appointments | Implied via dwell time | Part of detention |
| 8 | Working Capital Drag | Implied | Not explicitly calculated |

### Strengths
- Intuitive for operations teams
- Direct mapping to user inputs
- Battle-tested in production

### Weaknesses
- Overlapping categories (detention vs cutoffs)
- Missing explicit working capital calculation
- Not aligned with CFO terminology

---

## Proposed State: 6-Component Model

| Component | Name | Formula | Semantic |
|-----------|------|---------|----------|
| **A** | Recovery Cost (Premium Freight) | `ΔFV × RecoveryFactor` | Cost to recover from failures |
| **B** | Detention Cost | `AvgDwell × HourlyRate × Loads` | Carrier charges for waiting |
| **C** | Labor Variance Cost | `OT + Exceptions + Surge` | All labor inefficiency |
| **D** | Chargeback Cost | `MissedOTIF × Penalty` | Customer penalties |
| **E** | Working Capital Drag | `AvgInventoryDays × CostOfCapital` | Tied-up cash |
| **F** | Lost Sales Risk | `StockoutRate × MarginLoss` | Revenue at risk |

### Strengths
- CFO/Board-ready terminology
- Aligns with financial reporting
- Supports NPV calculations

### Weaknesses
- Requires more sophisticated inputs
- May confuse operations users
- New formulas need validation

---

## Mapping: 8-Category → 6-Component

| 8-Category | → | 6-Component |
|------------|---|-------------|
| Detention & Disputes | → | **B: Detention Cost** |
| Expedite & Premium Freight | → | **A: Recovery Cost** |
| Overtime & Labor Volatility | → | **C: Labor Variance Cost** (partial) |
| Overflow & 3PL Surge | → | **C: Labor Variance Cost** (partial) |
| Exception Handling | → | **C: Labor Variance Cost** (partial) |
| Security & Fraud | → | **A: Recovery Cost** (theft) + **D: Chargeback** (claims) |
| Missed Cutoffs | → | **D: Chargeback Cost** |
| Working Capital | → | **E: Working Capital Drag** |
| *(implicit)* | → | **F: Lost Sales Risk** |

---

## Unified Internal Model

We propose a **canonical cost driver model** with both presentation layers:

```typescript
// /src/lib/varianceTax/model.ts

interface VarianceTaxComponents {
  // Component A: Recovery (Premium Freight)
  recoveryCost: {
    expeditePremium: number;      // From: expedited shipments
    freightRecovery: number;      // From: detention-triggered re-routes
    theftRecovery: number;        // From: security incidents
  };
  
  // Component B: Detention
  detentionCost: {
    carrierCharges: number;       // From: dwell time calculation
    appointmentPenalties: number; // From: missed cutoffs
  };
  
  // Component C: Labor Variance
  laborVarianceCost: {
    overtimePremium: number;      // From: OT hours
    exceptionLabor: number;       // From: exception rate
    overflowLabor: number;        // From: 3PL surge
  };
  
  // Component D: Chargebacks
  chargebackCost: {
    otifPenalties: number;        // From: exception rate → customer impact
    claimsCost: number;           // From: damages, shortages
  };
  
  // Component E: Working Capital
  workingCapitalDrag: {
    inventoryHoldingCost: number; // From: dwell time → days of supply
    safetyStockCost: number;      // From: variability buffer
  };
  
  // Component F: Lost Sales
  lostSalesRisk: {
    stockoutRisk: number;         // From: exception rate → availability
    customerChurn: number;        // From: OTIF → relationship impact
  };
}
```

---

## Implementation Plan

### Phase 1: Parallel Systems (Sprint 1)
1. **Keep existing `DiagnosticCalculator`** unchanged for `/diagnostic`
2. **Create new `VarianceTaxCalculator`** for `/singularity` using 6-component model
3. Both use shared input schema where possible
4. Add feature flag: `VARIANCE_TAX_MODEL_VERSION = 'v1' | 'v2'`

### Phase 2: Unified Model (Sprint 3)
1. Refactor both calculators to use unified internal model
2. Add presentation layer toggle (operational vs financial view)
3. Migrate `/diagnostic` to use new model with operational presentation
4. Deprecation warning on old API

### Phase 3: Consolidation (Sprint 5)
1. Remove feature flag
2. Archive old calculator code
3. Single source of truth

---

## Decision Required

**Option A: Replace**
- Remove 8-category model
- Implement 6-component model everywhere
- **Risk:** Breaks existing `/diagnostic` and `/roi` pages
- **Effort:** High (requires updating all consumers)

**Option B: Parallel** ← **RECOMMENDED**
- Keep both models during transition
- New singularity page uses 6-component
- Gradual migration over sprints
- **Risk:** Temporary code duplication
- **Effort:** Medium

**Option C: Merge**
- Extend 6-component to include all 8 categories as sub-components
- Most comprehensive but most complex
- **Risk:** Over-engineering
- **Effort:** High

---

## Sign-Off

| Role | Name | Decision | Date |
|------|------|----------|------|
| Economist | | | |
| Architect | | | |
| Gatekeeper | | | |
| Product | | | |

---

## Files Impacted

**No Changes (Sprint 0):**
- `/components/DiagnosticCalculator.tsx` - Preserved as-is
- `/src/lib/economics/` - Preserved as-is

**New Files (Sprint 1):**
- `/src/lib/varianceTax/model.ts` - New unified model
- `/src/lib/varianceTax/types.ts` - TypeScript interfaces
- `/src/lib/varianceTax/formulas.ts` - Component calculations
- `/src/lib/varianceTax/mappers.ts` - 8-category ↔ 6-component mappers

---

## Appendix: Formula Mapping Details

### A: Recovery Cost

```typescript
recoveryCost = expeditePremium + freightRecovery + theftRecovery

// Where:
expeditePremium = weeklyExpedites × avgPremium × 52
freightRecovery = detentionTriggeredReroutes × avgRerouteCost
theftRecovery = theftIncidents × avgTheftLoss × (1 - insuranceCoverage)
```

### B: Detention Cost

```typescript
detentionCost = carrierCharges + appointmentPenalties

// Where:
carrierCharges = annualLoads × detentionRate(dwellMinutes) × avgDetentionCharge
// detentionRate: 3% if dwell<45min, 8% if <60min, 15% if >60min
appointmentPenalties = missedAppointments × avgPenalty
```

### C: Labor Variance Cost

```typescript
laborVarianceCost = overtimePremium + exceptionLabor + overflowLabor

// Where:
overtimePremium = weeklyOTHours × hourlyOTRate × 52
exceptionLabor = annualLoads × exceptionRate × handlingMinutes × laborRate
overflowLabor = monthlyOverflowSpend × peakMonths
```

### D: Chargeback Cost

```typescript
chargebackCost = otifPenalties + claimsCost

// Where:
otifPenalties = annualLoads × (1 - otifRate) × avgChargebackPenalty
claimsCost = claimsPerYear × avgClaimValue × (1 - claimsRecoveryRate)
```

### E: Working Capital Drag

```typescript
workingCapitalDrag = inventoryHoldingCost + safetyStockCost

// Where:
inventoryHoldingCost = avgInventoryValue × (additionalDaysFromVariance / 365) × costOfCapital
safetyStockCost = safetyStockUnits × unitCost × costOfCapital
```

### F: Lost Sales Risk (Probabilistic)

```typescript
lostSalesRisk = stockoutRisk + customerChurn

// Where:
stockoutRisk = stockoutProbability × avgOrderValue × grossMargin × potentialOrders
customerChurn = atRiskRevenue × churnProbability × (1 - winbackRate)
```

---

*Document created: Sprint 0, Task 0.9*

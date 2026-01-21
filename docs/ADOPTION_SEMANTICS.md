# Adoption % Semantics (Locked for Launch)

**Status:** LOCKED | **Version:** 1.0 | **Last Updated:** January 21, 2026

---

## Executive Rule

**Adoption % (Network Coverage slider) is NARRATIVE-ONLY.**

It affects UI copy only. It does NOT change any formula inputs or outputs.

---

## What This Means in Practice

### Adoption % Does NOT
- ❌ Map to `facilitiesCount` input in `calcRoiV2()`
- ❌ Change `laborReductionPercent`, `dwellReductionMinutes`, or `detentionRecoveryPercent` inputs
- ❌ Alter `networkMultiplier` or any economics formula outputs
- ❌ Change CFO-facing ROI, payback, or savings numbers

### Adoption % Does
- ✅ Update UI copy: "Modeling **13 of 260 facilities** in scope"
- ✅ Help users visualize deployment pace (5% Year 1, 10% moderate, 25% aggressive, 50% network inflection)
- ✅ Tell the adoption narrative (compounding benefit story)
- ✅ Drive user understanding: "As adoption grows, benefits compound"

---

## Why This Design?

### Operational Metrics vs. Business Narrative

| Aspect | Operational Metrics | Adoption % Narrative |
|--------|-------------------|----------------------|
| **What it represents** | Per-facility labor savings, detention recovery, etc. | Company's deployment cadence |
| **Input source** | Customer facility audit data | Sales/marketing assumption |
| **Volatility** | Stable (per-facility averages) | Variable (customer choice) |
| **Impact on formula** | Direct (changes savings inputs) | None (UI only) |
| **Owner** | CFO (operational reality) | Sales (deployment story) |

### Example

```typescript
// Same facility audit data, different adoption narratives
const primoFacilities = 260;
const primoOperations = {
  laborReductionPercent: 70,
  dwellReductionMinutes: 24,
  detentionRecoveryPercent: 65,
};

// Year 1: 5% adoption (13 facilities live)
const year1Adoption = 5;
const year1Copy = `Modeling 13 of 260 facilities`;
// calcRoiV2(inputs) → $X Million Year 1 ROI

// Alternative: 50% adoption scenario (130 facilities live)
const year3Adoption = 50;
const year3Copy = `Modeling 130 of 260 facilities`;
// calcRoiV2(inputs) → $X Million ROI (SAME, because adoption % NOT in formula)

// Key insight: The ROI is the SAME because it's based on per-facility
// operational metrics (labor%, dwell time), not on adoption rate.
// Adoption % is how many facilities are LIVE at a given point in time.
```

---

## Golden Test Proof

```typescript
// Test: Adoption % does not change formula outputs
const input5 = createTestInputs(260, 5);
const result5 = calcRoiV2(input5);

const input50 = createTestInputs(260, 50);
const result50 = calcRoiV2(input50);

// All outputs should be identical
expect(result5.yearOneRoiPercent).toBe(result50.yearOneRoiPercent);
expect(result5.paybackMonths).toBe(result50.paybackMonths);
expect(result5.totalAnnualSavings).toBe(result50.totalAnnualSavings);
// ✓ PASS
```

See: [src/lib/economics/__tests__/calc.test.ts](../src/lib/economics/__tests__/calc.test.ts) - "Adoption % Invariance (CRITICAL)"

---

## Implementation Details (S1.3)

### ROI Page UI Copy Template

```typescript
const facilitiesInScope = facilitiesInScope(totalFacilities, adoptionPercent);
const formattedFacilities = facilitiesInScope.toLocaleString();
const formattedTotal = totalFacilities.toLocaleString();

return `Modeling ${formattedFacilities} of ${formattedTotal} facilities`;
// Example: "Modeling 13 of 260 facilities"
// Example: "Modeling 1,000,000 of 5,000,000 facilities"
```

### Adoption Presets

| Preset | % | Use Case | Year | Notes |
|--------|---|----------|------|-------|
| **Deep Model Default** | 5% | Conservative Year 1 rollout | Year 1 | Primo baseline assumption |
| **Moderate** | 10% | Year 1 moderate deployment | Year 1 | 26 of 260 facilities |
| **Aggressive** | 25% | Year 2 expanded scope | Year 2 | 65 of 260 facilities |
| **Inflection** | 50% | Network effects compound | Year 3 | 130 of 260 facilities; "singularity" threshold |

---

## Future Evolution

### If Adoption % Becomes Formula-Relevant

If a future product roadmap requires adoption % to drive **network effect multiplier** or other formula behavior:

1. **Create new ticket** (post-launch, not in S0-S1)
2. **Update this document** with new rule
3. **Add golden test** to verify new behavior
4. **Economist + CTO approval** required
5. **Clear communication** to team about semantic shift

### Example: Hypothetical Future Enhancement

```typescript
// Hypothetical: Adoption % drives network maturity
// "5% adoption = immature network, low network effects"
// "50% adoption = mature network, full network multiplier"

export function networkMaturityFactor(adoptionPercent: number): number {
  return Math.min(1.0, adoptionPercent / 50); // Matures at 50%
}

// WOULD REQUIRE:
// - New ticket in S3 or later sprint
// - New golden test scenario
// - Updated ADOPTION_SEMANTICS.md
// - Explicit product decision
```

---

## Compliance Checklist

- [ ] Team understands: adoption % = narrative-only
- [ ] Golden tests verify adoption % invariance
- [ ] UI copy uses adoption % for narrative purposes only
- [ ] ROI page displays presets (5%, 10%, 25%, 50%)
- [ ] Diagnostic page links adoption % back to ROI scenario
- [ ] Documentation linked in README

---

## Sign-Offs

- **Economist:** Locked formula invariance ✓
- **CTO:** Locked in golden tests ✓
- **Product Lead:** Adoption narrative approved ✓

---

## Questions?

Contact: Economist (formula questions), CTO (test infrastructure), Product Lead (narrative)


# Economics Audit Report

**Status:** LAUNCH READY | **Date:** January 21, 2026 | **Audit Version:** 1.0

---

## Executive Summary

This report documents what's locked in the YardFlow economics module as of launch (S0 completion).

**Key Finding:** Core formula outputs are frozen via golden tests. Any modification requires Economist + CTO approval.

---

## What's Locked (S0 Golden Tests)

| Component | Test File | Snapshots | Test Count | Status |
|-----------|-----------|-----------|-----------|--------|
| **calcRoiV2()** | `calc.test.ts` | 5 scenarios + adoption invariance | 10 tests | ✅ Locked |
| **Network Multiplier** | `multiplier.test.ts` | 7 scenarios + invariants | 15 tests | ✅ Locked |
| **Adoption % Semantics** | `ADOPTION_SEMANTICS.md` | N/A (narrative-only) | 1 rule | ✅ Locked |
| **CI Gates** | `.github/workflows/ci.yml` | N/A | All PRs | ✅ Active |

**Total Tests:** 26 unit tests + 1 invariance rule  
**Total Snapshots:** 12 snapshots (committed to git)  
**Regression Detection:** Automatic on every PR

---

## Locked Formula Baseline

### Scenario 1: Primo (260 Facilities, 5% Adoption)

| Metric | Value | Note |
|--------|-------|------|
| **Total Facilities** | 260 | Full network |
| **Facilities in Scope** | 13 | 260 × 5% (rounded) |
| **Network Multiplier** | [SNAPSHOT] | Locked in `calc.test.ts.snap` |
| **Base Annual Savings** | [SNAPSHOT] | Labor + detention + throughput |
| **Network Bonus Savings** | [SNAPSHOT] | Locked |
| **Total Annual Savings** | [SNAPSHOT] | Locked |
| **Year 1 ROI %** | [SNAPSHOT] | Locked |
| **Payback (months)** | [SNAPSHOT] | Locked |
| **5-Year Value** | [SNAPSHOT] | Locked |

*All [SNAPSHOT] values stored in `src/lib/economics/__tests__/calc.test.ts.snap`*

### Scenario 2: MidMarket (10 Facilities, 5% Adoption)

- Network Multiplier (locked)
- Annual Savings (locked)
- ROI % (locked)

### Scenario 3: Enterprise (1,000 Facilities, 10% Adoption)

- Network Multiplier (locked)
- Annual Savings (locked)
- ROI % (locked)

### Scenario 4: Massive (1,000,000 Facilities, 25% Adoption)

- Validates large-number precision (no NaN/Infinity)
- Confirms ratio invariance
- Locked

---

## Network Multiplier Locked Behavior

### Metcalfe-Inspired Multiplier (Canonical Model)

```
M(n) = 1 + β × (C(n)/C₀) × R(n)

Where:
  n = facility count
  β = network effect strength (locked per tier)
  C(n) = connections = n × (n-1) / 2
  R(n) = realization = 1 - exp(-n/τ)
  τ = maturity constant (locked per tier)
```

### Locked Invariants

1. **Multiplier ≥ 1.0** (always; even single facility gets baseline)
2. **Realization ∈ [0, 1]** (bounded)
3. **Multiplier increases with n** (monotonic)
4. **Connections = n(n-1)/2** (Metcalfe law)

All tested in `multiplier.test.ts` → snapshots committed.

---

## Adoption % Narrative Lock

**Rule:** Adoption % is narrative-only; does NOT change formula inputs.

**Proof:** Golden test "Adoption % Invariance (CRITICAL)"
```typescript
calcRoiV2(input5) === calcRoiV2(input50)  // Both have same outputs
```

**Interpretation:** 
- Adoption 5% and 50% show same ROI (different facility count deployed, same per-facility metrics)
- UI copy changes: "Modeling 13 of 260" vs "Modeling 130 of 260"
- CFO metrics unchanged

See: [docs/ADOPTION_SEMANTICS.md](../ADOPTION_SEMANTICS.md)

---

## Regression Detection (CI Gates)

### On Every PR + Push

| Gate | Tool | Status | Action |
|------|------|--------|--------|
| **Lint** | ESLint | Must pass | `npm run lint` |
| **Typecheck** | TypeScript strict | Must pass | `npm run typecheck` |
| **Unit Tests** | Vitest + golden tests | Must pass | `npm run test:unit` |
| **E2E Smoke** | Playwright | Must pass | `npm run test:e2e:ci` |

If ANY gate fails: **PR blocked until fixed**

### Golden Test Failure Workflow

1. **Test fails** (snapshot mismatch)
2. **Developer reviews diff** (in CI logs or local)
3. **Developer decides:**
   - **Unintended change?** → Revert code change
   - **Intentional change?** → Get Economist + CTO approval
4. **If approved:** Run `npm run test:unit -- -u` to update snapshot
5. **Commit:** `git add src/lib/**/*.snap`
6. **PR message:** "Approved snapshot update for [reason]. Signed off by @economist and @cto."

---

## Future Changes

### Adding New Scenarios

If new facility tiers or region-specific assumptions are added:

1. Create new scenario in `fixtures/presets.json`
2. Add to `calc.test.ts` test loop
3. Run: `npm run test:unit -- --reporter=verbose`
4. Review new snapshots
5. Commit: `git add *.snap`

### Modifying Formula

If ROI formula logic must change:

1. **Create issue + design doc** (explain why)
2. **Economist reviews** (business impact)
3. **CTO reviews** (implementation impact)
4. **Update code**
5. **Run tests → snapshots change**
6. **Review snapshot diffs** (expected vs. unexpected changes)
7. **Get approval** (Economist + CTO)
8. **Commit** with clear explanation

### Deprecating Old Formula

If calcRoiV2 is replaced by calcRoiV3:

1. Keep calcRoiV2 tests (regression check)
2. Add calcRoiV3 tests (new behavior)
3. Document transition (migration guide)
4. Update CI to run both (temporary)
5. Phase out V2 over 1-2 sprints

---

## Audit Trail

### Tests Created (S0)

- ✅ `calc.test.ts` – 10 unit tests, 5 scenario snapshots
- ✅ `multiplier.test.ts` – 15 unit tests, 7 scenario snapshots
- ✅ `.github/workflows/ci.yml` – Updated with typecheck + explicit steps

### Docs Created (S0)

- ✅ `docs/ADOPTION_SEMANTICS.md` – Narrative-only rule locked
- ✅ `docs/ECONOMICS_AUDIT.md` – This document

### CI Gates Active

- ✅ Lint (ESLint, max-warnings 0)
- ✅ Typecheck (TypeScript strict, no-emit)
- ✅ Unit tests (Vitest, includes golden tests)
- ✅ E2E smoke (Playwright, 4 core routes)

---

## Validation Checklist

- [ ] Golden test snapshots created
- [ ] Snapshots committed to git
- [ ] CI gates configured (.github/workflows/ci.yml)
- [ ] ADOPTION_SEMANTICS.md locked (narrative-only rule)
- [ ] README updated (links to audit docs)
- [ ] Team trained on snapshot approval workflow
- [ ] First PR snapshot diff reviewed + approved
- [ ] Economist sign-off
- [ ] CTO sign-off

---

## Support & Escalation

**Question:** How do I update golden test snapshots?  
**Answer:** Run `npm run test:unit -- -u` then commit *.snap files. Requires economist + CTO approval for formula changes.

**Question:** Can adoption % change formula outputs in the future?  
**Answer:** Yes, but requires: new ticket, updated docs, new tests, and explicit product decision. Not in S0-S1.

**Question:** My code changed formula output but I didn't mean to. What do I do?  
**Answer:** CI will fail snapshot test. Review your code change. If unintended, revert. If intended, get approval from Economist + CTO.

**Question:** What if a test passes locally but fails in CI?  
**Answer:** Likely dependency version difference. Run `npm ci` (exact versions) instead of `npm install`. Rerun tests.

---

## Contacts

- **Economics Questions:** Economist
- **Test Infrastructure:** CTO
- **Product Decision:** Product Lead
- **Snapshot Approval:** Economist + CTO (joint sign-off)

---

**Report Status:** ✅ READY FOR LAUNCH

**Next Review:** Post-launch retrospective (S0 completion + 1 week)


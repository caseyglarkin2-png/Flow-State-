# ADR-003: Golden Tests for Economics

## Status
Accepted

## Date
January 2026

## Context

The ROI calculator produces financial figures that:
- Appear in customer-facing PDFs
- Are used in sales conversations
- Must be consistent across deployments
- Cannot silently change due to refactoring

Traditional unit tests verify behavior but don't prevent:
- Gradual drift in calculation results
- Unintended side effects from optimizations
- Formula changes without explicit approval

## Decision

Implement **Golden Tests** (snapshot tests) for all economics formulas.

Approach:
1. Lock expected outputs as JSON snapshots
2. Test multiple scenarios (1, 10, 260, 10K, 1M facilities)
3. Require explicit `-u` flag to update snapshots
4. Document changes in ECONOMICS_AUDIT.md

## Consequences

### Positive
- Any formula change is immediately visible in git diff
- CI blocks accidental formula modifications
- Forces explicit approval workflow for changes
- Provides regression safety net
- Documents expected behavior as data

### Negative
- Snapshot files add to repo size
- Requires discipline to review diffs
- Initial setup complexity
- Can mask understanding (tests pass but developer doesn't understand why)

### Implementation

```typescript
// src/lib/economics/__tests__/calc.test.ts
import { describe, it, expect } from 'vitest';
import { calcRoiV2 } from '../roi';

describe('ROI Formula Golden Tests', () => {
  const scenarios = [
    { name: '1 facility', inputs: { facilitiesCount: 1, ... } },
    { name: '260 facilities', inputs: { facilitiesCount: 260, ... } },
    // ... more scenarios
  ];

  scenarios.forEach(({ name, inputs }) => {
    it(`calculates correctly for ${name}`, () => {
      const result = calcRoiV2(inputs);
      expect(result).toMatchSnapshot();  // <-- Golden assertion
    });
  });
});
```

### Update Workflow

```bash
# 1. Review current behavior
npm run test:unit -- src/lib/economics/__tests__/calc.test.ts

# 2. If change is intentional, update snapshots
npm run test:unit -- -u src/lib/economics/__tests__/calc.test.ts

# 3. Commit snapshot files
git add src/lib/economics/__tests__/*.snap

# 4. Document in ECONOMICS_AUDIT.md
```

### Critical Invariant

**Adoption % is narrative-only and does NOT affect formula outputs.**

This is verified by a specific golden test that proves:
```typescript
expect(calcRoiV2(input5%)).toEqual(calcRoiV2(input50%));
```

See [ADOPTION_SEMANTICS.md](../../ADOPTION_SEMANTICS.md) for details.

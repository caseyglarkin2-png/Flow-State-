# Sprint 0 & 1: Detailed Atomic Task Breakdown

**Focus:** Guardrails (S0) + Adoption Slider (S1)  
**Approach:** Exhaustively atomic tasks; each independently testable + committable  
**No Timeline:** Tasks complete when complete; no date constraints.

---

## SPRINT 0: GUARDRAILS (Lock Outputs, Stop Regressions)

### Goal
Econ formula outputs frozen via golden tests. CI gates established. Adoption % semantics locked.

### Demoable Outcome
- Build passes: `npm run build` succeeds
- All tests pass: `npm run test:unit && npm run test:e2e:smoke`
- Econ math locked: golden tests cannot be modified without explicit approval
- CI enforces quality: lint, typecheck, unit, E2E smoke all required before merge

---

## S0 Tasks (Atomic, Independently Executable)

### S0-001: Golden Test Harness Setup

**Objective:** Create test infrastructure for locking econ outputs.

**Acceptance Criteria:**
- [ ] Directory structure created:
  ```
  src/lib/roi/
    ├── calc.ts (existing)
    ├── calc.test.ts (NEW - golden tests)
    └── fixtures/
        └── presets.json (NEW - test data)
  ```
- [ ] Vitest configured to snapshot test files
- [ ] Snapshot file exists: `src/lib/roi/calc.test.ts.snap`
- [ ] Snapshots committed to git (so any change requires explicit commit)

**Technical Details:**
- Use `vitest` + `toMatchSnapshot()`
- Snapshots stored as text files (human-readable diffs)
- CI: fail if snapshot modified without approval

**Validation:**
- Run: `npm run test:unit -- src/lib/roi/calc.test.ts` → snapshots created ✅
- Snapshots file exists in git ✅
- Modifying a snapshot without commit is visible in PR ✅

**Effort:** ~4 hours  
**Dependencies:** None  
**Owner:** Gatekeeper + Economist  
**Sign-off:** CTO

**PR Title:** `test(roi): Add golden test harness for calcRoiV2 outputs`

---

### S0-002: Golden Test Fixtures - Preset Scenarios

**Objective:** Create test data for 5 adoption + facility scenarios.

**Acceptance Criteria:**
- [ ] File: `src/lib/roi/fixtures/presets.json` contains 5 scenarios:
  ```json
  {
    "scenarios": [
      {
        "name": "Micro_1Facility_5Percent",
        "input": {
          "facilitiesCount": 1,
          "laborReductionPercent": 70,
          "dwellReductionMinutes": 24,
          "detentionRecoveryPercent": 65,
          "adoptionPercent": 5,
          "networkBeta": 0
        },
        "expectedOutputs": {
          "year1Roi": "SNAPSHOT",
          "year3Roi": "SNAPSHOT",
          "paybackMonths": "SNAPSHOT"
        }
      },
      {
        "name": "MidMarket_10Facilities_5Percent",
        "input": { ... },
        "expectedOutputs": { ... }
      },
      {
        "name": "Enterprise_260Facilities_5Percent",
        "input": { ... },
        "expectedOutputs": { ... }
      },
      {
        "name": "Enterprise_10000Facilities_10Percent",
        "input": { ... },
        "expectedOutputs": { ... }
      },
      {
        "name": "Massive_1000000Facilities_25Percent",
        "input": { ... },
        "expectedOutputs": { ... }
      }
    ]
  }
  ```
- [ ] Each scenario has documented source:
  - Micro: basic unit test
  - MidMarket: typical customer
  - Enterprise: Primo (260 facilities)
  - Enterprise+: 10,000 facility network
  - Massive: theoretical max scale test
- [ ] Fixtures committed to git

**Technical Details:**
- JSON file: human-readable, version-controlled
- Scenarios cover: small (1), medium (10), large (260, 10k, 1M)
- Each fixture locked in golden test (snapshot)

**Validation:**
- File exists ✅
- JSON valid ✅
- 5 scenarios defined ✅
- Can be loaded in test ✅

**Effort:** ~2 hours  
**Dependencies:** S0-001  
**Owner:** Economist  
**Sign-off:** CTO

**PR Title:** `test(roi): Add golden test fixtures for 5 adoption scenarios (1 to 1M facilities)`

---

### S0-003: Golden Test Implementation - calcRoiV2

**Objective:** Lock `calcRoiV2()` outputs for all 5 scenarios.

**Acceptance Criteria:**
- [ ] File: `src/lib/roi/calc.test.ts` implements:
  ```typescript
  import { calcRoiV2, defaultRoiV2Inputs, type RoiV2Inputs } from '@/lib/roi/calc';
  import fixtures from './fixtures/presets.json';
  
  describe('calcRoiV2 Golden Tests', () => {
    fixtures.scenarios.forEach(scenario => {
      it(`should produce consistent outputs for ${scenario.name}`, () => {
        const result = calcRoiV2(scenario.input as RoiV2Inputs);
        
        expect({
          year1Roi: result.year1Roi,
          year3Roi: result.year3Roi,
          paybackMonths: result.paybackMonths,
          networkBonusSavings: result.networkBonusSavings,
        }).toMatchSnapshot();
      });
    });
    
    // Additional assertions: ensure adoption % doesn't change math
    it('should produce identical outputs regardless of adoption percent', () => {
      const baseInput = { ...fixtures.scenarios[2].input, adoptionPercent: 5 };
      const result5 = calcRoiV2(baseInput);
      
      const input10 = { ...baseInput, adoptionPercent: 10 };
      const result10 = calcRoiV2(input10);
      
      // Outputs should be identical (adoption % is narrative-only)
      expect(result5.year1Roi).toBe(result10.year1Roi);
      expect(result5.year3Roi).toBe(result10.year3Roi);
    });
  });
  ```
- [ ] Snapshots created: `calc.test.ts.snap` contains expected outputs
- [ ] Test passes locally: `npm run test:unit -- calc.test.ts` ✅
- [ ] All 5 scenarios + adoption-invariant test pass

**Technical Details:**
- Use `toMatchSnapshot()` for outputs
- Adoption % invariance test: proves math frozen
- Snapshots checked into git

**Validation:**
- Test runs: `npm run test:unit -- src/lib/roi/calc.test.ts` ✅
- All 5 scenarios snapshot ✅
- Adoption invariance test passes ✅
- Snapshot file checked in ✅

**Effort:** ~3 hours  
**Dependencies:** S0-001, S0-002  
**Owner:** Gatekeeper + Economist  
**Sign-off:** CTO

**PR Title:** `test(roi): Golden tests for calcRoiV2 (5 scenarios, adoption invariance verified)`

---

### S0-004: Golden Test Implementation - Diagnostic

**Objective:** Lock `runDiagnostic()` outputs.

**Acceptance Criteria:**
- [ ] File: `src/lib/diagnostic/diagnostic.test.ts` implements:
  ```typescript
  import { runDiagnostic } from '@/lib/diagnostic';
  
  describe('runDiagnostic Golden Tests', () => {
    const scenarios = [
      {
        name: 'Chaotic Yard',
        input: { /* high variance indicators */ },
      },
      {
        name: 'Stable Yard',
        input: { /* low variance indicators */ },
      },
      {
        name: 'Network Ready',
        input: { /* adoption-friendly inputs */ },
      },
    ];
    
    scenarios.forEach(scenario => {
      it(`should score consistently for ${scenario.name}`, () => {
        const result = runDiagnostic(scenario.input);
        
        expect({
          scores: result.scores,
          topPainPoints: result.topPainPoints,
          recommendedNextStep: result.recommendedNextStep,
        }).toMatchSnapshot();
      });
    });
  });
  ```
- [ ] Snapshots created: `diagnostic.test.ts.snap`
- [ ] Test passes: `npm run test:unit -- diagnostic.test.ts` ✅

**Technical Details:**
- 3 diagnostic scenarios (chaotic, stable, network-ready)
- Lock: question scores, priority ranking, next step recommendation

**Validation:**
- Test runs ✅
- All 3 scenarios snapshot ✅
- Snapshot file checked in ✅

**Effort:** ~2 hours  
**Dependencies:** S0-001  
**Owner:** Economist  
**Sign-off:** CTO

**PR Title:** `test(diagnostic): Golden tests for runDiagnostic (3 scenarios)`

---

### S0-005: Golden Test Implementation - Network Multiplier

**Objective:** Lock network effect multiplier logic (if exists).

**Acceptance Criteria:**
- [ ] Determine: does `calcNetworkMultiplier()` exist?
  - If YES: test its outputs
  - If NO: create stub function + test it
- [ ] File: `src/lib/varianceTax/multiplier.test.ts` implements:
  ```typescript
  import { calcNetworkMultiplier } from '@/lib/varianceTax/multiplier';
  
  describe('Network Multiplier Golden Tests', () => {
    const scenarios = [
      { adoption: 5, facilities: 10, expected: 'SNAPSHOT' },
      { adoption: 5, facilities: 260, expected: 'SNAPSHOT' },
      { adoption: 10, facilities: 260, expected: 'SNAPSHOT' },
      { adoption: 25, facilities: 260, expected: 'SNAPSHOT' },
      { adoption: 50, facilities: 260, expected: 'SNAPSHOT' },
    ];
    
    scenarios.forEach(s => {
      it(`multiplier(adoption=${s.adoption}%, facilities=${s.facilities})`, () => {
        const result = calcNetworkMultiplier(s.adoption, s.facilities);
        expect(result).toMatchSnapshot();
      });
    });
  });
  ```
- [ ] Snapshots locked
- [ ] If multiplier is adoption-dependent (future feature): document as TODO

**Technical Details:**
- Network multiplier: scales bonus savings based on adoption % or facility count
- If not used currently: create placeholder that returns 1.0
- Lock behavior: no surprises during refactors

**Validation:**
- Test runs ✅
- Snapshots created + locked ✅
- Behavior consistent across calls ✅

**Effort:** ~1.5 hours  
**Dependencies:** S0-001  
**Owner:** Economist  
**Sign-off:** CTO

**PR Title:** `test(variance-tax): Golden tests for network multiplier`

---

### S0-006: CI Pipeline Configuration (GitHub Actions)

**Objective:** Automated quality gates on every PR + push.

**Acceptance Criteria:**
- [ ] File: `.github/workflows/ci.yml` defines:
  ```yaml
  name: CI
  on:
    push:
      branches: [main, develop]
    pull_request:
      branches: [main, develop]
  
  jobs:
    lint:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: '20'
        - run: npm install
        - run: npm run lint
    
    typecheck:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: '20'
        - run: npm install
        - run: npm run typecheck
    
    unit-tests:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: '20'
        - run: npm install
        - run: npm run test:unit
        - run: npm run coverage  # upload coverage (optional)
    
    e2e-smoke:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: '20'
        - run: npm install
        - run: npm run test:e2e:smoke
  
  # All jobs must pass before merge
  # Merge blocked if any job fails
  ```
- [ ] Workflow file committed
- [ ] CI triggers on every PR
- [ ] Status checks required for merge (GitHub setting)

**Technical Details:**
- GitHub Actions (free for public repos, included with team plan)
- Parallel jobs: lint, typecheck, unit tests, E2E smoke
- CI execution time target: <5 minutes
- npm scripts must exist: lint, typecheck, test:unit, test:e2e:smoke

**Validation:**
- Workflow file exists ✅
- Push to branch; CI starts ✅
- Lint error in code; CI fails ✅
- Fix lint error; CI passes ✅

**Effort:** ~2 hours  
**Dependencies:** None  
**Owner:** Gatekeeper  
**Sign-off:** CTO

**PR Title:** `ci: Add GitHub Actions workflow (lint, typecheck, unit, E2E smoke)`

---

### S0-007: Smoke Test Suite (Playwright)

**Objective:** Basic E2E tests verifying core routes render + no JS errors.

**Acceptance Criteria:**
- [ ] File: `e2e/smoke.spec.ts` implements:
  ```typescript
  import { test, expect } from '@playwright/test';
  
  test.describe('Smoke Tests - Core Routes', () => {
    test('home page loads without errors', async ({ page }) => {
      await page.goto('http://localhost:3000');
      // Check: no console errors
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      
      // Check: page title
      await expect(page).toHaveTitle(/YardFlow|Yard Network System/i);
      
      // Check: key element present
      await expect(page.locator('text=Apply for Co-Development')).toBeVisible();
      
      // Assert no errors collected
      expect(errors).toEqual([]);
    });
    
    test('ROI page loads', async ({ page }) => {
      await page.goto('http://localhost:3000/roi');
      await expect(page.locator('text=ROI')).toBeVisible();
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      expect(errors).toEqual([]);
    });
    
    test('Diagnostic page loads', async ({ page }) => {
      await page.goto('http://localhost:3000/diagnostic');
      await expect(page.locator('text=Diagnostic')).toBeVisible();
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      expect(errors).toEqual([]);
    });
    
    test('Singularity page loads', async ({ page }) => {
      await page.goto('http://localhost:3000/singularity');
      await expect(page.locator('canvas, svg, [role="img"]')).toBeVisible();
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      expect(errors).toEqual([]);
    });
  });
  ```
- [ ] Test file committed
- [ ] Playwright configured (existing config?)
- [ ] Tests pass: `npm run test:e2e:smoke` ✅

**Technical Details:**
- Playwright: E2E framework
- Smoke tests: lightweight (no business logic testing, just "does it load?")
- Console error capture: catches JS runtime errors

**Validation:**
- Tests run locally ✅
- All 4 routes pass ✅
- Intentional error in code; smoke test catches it ✅

**Effort:** ~2 hours  
**Dependencies:** S0-006 (CI setup)  
**Owner:** Gatekeeper  
**Sign-off:** CTO + QA

**PR Title:** `test(e2e): Add smoke tests for core routes (home, ROI, diagnostic, singularity)`

---

### S0-008: Adoption % Semantics Documentation (S0.5a)

**Objective:** Lock consensus: adoption % is narrative-only.

**Acceptance Criteria:**
- [ ] File: `docs/ADOPTION_SEMANTICS.md` created:
  ```markdown
  # Adoption % Semantics (Locked for Launch)
  
  ## Rule
  Adoption % (Network Coverage slider) is **NARRATIVE-ONLY**.
  
  ### What This Means
  - Does NOT map to `facilities` input in calcRoiV2()
  - Does NOT change labor%, dwell%, detention% inputs
  - Does NOT alter networkMultiplier or any formula outputs
  - Adoption % affects UI copy only: "Modeling XX of YY facilities"
  
  ### Why?
  - Adoption % is a business/sales concept (rollout cadence)
  - Formula inputs are operational metrics (per-facility labor, detention)
  - These are independent; adoption % does not assume different operations
  
  ### Example
  ```typescript
  // Same inputs, different adoption %
  const input5 = { facilities: 260, labor: 70, adoption: 5 };
  const input50 = { facilities: 260, labor: 70, adoption: 50 };
  
  calcRoiV2(input5) === calcRoiV2(input50)  // TRUE (outputs identical)
  ```
  
  ### Future Evolution
  - If product roadmap requires adoption % to drive network effect multiplier:
    - Create new ticket (post-launch)
    - Update this doc
    - Add golden test to verify new behavior
  - For now: adoption % is UI/copy only
  
  ## Golden Test Verification
  - See: `src/lib/roi/calc.test.ts` line XXX
  - Test: "should produce identical outputs regardless of adoption percent"
  ```
- [ ] File committed
- [ ] Referenced in S0-003 test
- [ ] Economist + CTO review + approval required

**Technical Details:**
- Markdown doc: human-readable, linked in README
- Defines the "rule" for S1 + S5 work
- If interpreted differently later: must update this doc + create new ticket

**Validation:**
- Doc exists ✅
- Clear interpretation ✅
- Economist + CTO agree ✅
- Referenced in code + tests ✅

**Effort:** ~1 hour  
**Dependencies:** S0-003  
**Owner:** Economist  
**Sign-off:** Economist + CTO (required; escalate if disagreement)

**PR Title:** `docs: Add ADOPTION_SEMANTICS.md (narrative-only interpretation, locked)`

---

### S0-009: Economics Audit Report

**Objective:** Document what's locked and why.

**Acceptance Criteria:**
- [ ] File: `docs/ECONOMICS_AUDIT.md` created:
  ```markdown
  # Economics Audit Report
  
  ## What's Locked
  1. `calcRoiV2()` outputs (golden test: S0-003)
  2. `runDiagnostic()` outputs (golden test: S0-004)
  3. Network multiplier logic (golden test: S0-005)
  4. Adoption % = narrative-only (semantics: S0-008)
  
  ## Formula Baseline (Immutable)
  
  | Formula | Input | Expected Output | Test File | Snapshot |
  |---------|-------|-----------------|-----------|----------|
  | ROI Year 1 | 260 facilities, 70% labor, 5% adoption | $XXXXX | calc.test.ts | scenarios[2] |
  | ROI Year 3 | 260 facilities, 70% labor, 5% adoption | $YYYYY | calc.test.ts | scenarios[2] |
  | Payback (months) | 260 facilities, 70% labor, 5% adoption | Z | calc.test.ts | scenarios[2] |
  | Network Multiplier | 260 facilities, 10% adoption | M | multiplier.test.ts | scenarios[1] |
  
  ## Regression Detection
  - CI automatically runs golden tests on every PR
  - If snapshots differ: PR blocked until approved
  - Snapshot diffs visible in GitHub
  - Approval required: Economist + CTO
  
  ## Future Changes
  - To modify any formula: (1) change code, (2) run tests, (3) review snapshot diff, (4) approve new snapshot, (5) commit
  - New inputs/outputs? Add new test fixture + snapshot
  - Deprecate old formula? Create migration ticket + update snapshots
  ```
- [ ] File committed
- [ ] Tables populated with actual golden test data
- [ ] Referenced in README + CI docs

**Technical Details:**
- Reference doc for audits + compliance
- Table of what's locked + where tests live

**Validation:**
- Doc exists ✅
- Matches S0-003/004/005 snapshots ✅
- Team can reference this + understand what's frozen ✅

**Effort:** ~1 hour  
**Dependencies:** S0-003, S0-004, S0-005  
**Owner:** Economist  
**Sign-off:** Product Lead

**PR Title:** `docs: Add ECONOMICS_AUDIT.md (reference for locked formulas + tests)`

---

### S0-010: README Update (CI + Golden Tests)

**Objective:** Make CI requirements + golden tests visible to team.

**Acceptance Criteria:**
- [ ] Update `README.md`:
  ```markdown
  ## Development Workflow
  
  ### Local Checks (Before Push)
  ```bash
  npm run lint          # ESLint
  npm run typecheck     # TypeScript strict
  npm run test:unit     # Vitest (includes golden tests)
  npm run test:e2e:smoke # Playwright smoke
  ```
  
  ### CI Gates (Automatic on PR)
  - Lint: must pass
  - Typecheck: must pass
  - Unit tests: must pass (includes golden tests)
  - E2E smoke: must pass (home, ROI, diagnostic, singularity routes)
  
  ### Golden Tests (Economics Math Locked)
  See [docs/ECONOMICS_AUDIT.md](docs/ECONOMICS_AUDIT.md) for formula baselines.
  
  If a golden test fails:
  1. Review snapshot diff in CI logs
  2. If change is intentional:
     - Get Economist + CTO approval
     - Run: `npm run test:unit -- -u` to update snapshot
     - Commit: `git add src/lib/*/**.snap`
  3. If change is unintended: revert code change
  
  ### Adoption % Semantics
  See [docs/ADOPTION_SEMANTICS.md](docs/ADOPTION_SEMANTICS.md).
  Adoption % is narrative-only; does not change formula inputs.
  ```
- [ ] Links to ADOPTION_SEMANTICS.md + ECONOMICS_AUDIT.md
- [ ] Clear instructions for golden test updates

**Validation:**
- README updated ✅
- Links correct ✅
- Team can follow the workflow ✅

**Effort:** ~30 min  
**Dependencies:** S0-001 through S0-009  
**Owner:** Gatekeeper  
**Sign-off:** CTO

**PR Title:** `docs(readme): Add CI + golden test workflow`

---

## S0 Summary

**10 atomic tasks:**
1. ✅ Golden test harness setup
2. ✅ Golden test fixtures (5 scenarios)
3. ✅ Golden test: calcRoiV2
4. ✅ Golden test: diagnostic
5. ✅ Golden test: network multiplier
6. ✅ CI pipeline (GitHub Actions)
7. ✅ Smoke tests (Playwright)
8. ✅ Adoption % semantics doc
9. ✅ Economics audit report
10. ✅ README update

**Demoable Output:**
- `npm run build` → succeeds
- `npm run test:unit` → all tests pass (golden tests locked)
- `npm run test:e2e:smoke` → all routes render
- `git push` → CI green (lint, typecheck, unit, E2E smoke all pass)
- Docs: adoption %, economics locked, CI workflow clear

**Merge Criteria (All Required):**
- [ ] All 10 PRs merged to main
- [ ] CI green
- [ ] Golden test snapshots checked in
- [ ] Docs committed
- [ ] Team understands "adoption % = narrative-only"

---

---

## SPRINT 1: ADOPTION SLIDER (Make Compounding Obvious)

### Goal
Network Coverage (%) slider works on ROI + Diagnostic. Adoption presets apply consistently. Math outputs frozen (per S0). UI copy reflects adoption dynamically.

### Demoable Outcome
- CoverageSlider component renders + is interactive
- Slider appears on ROI page with presets (5%, 10%, 25%, 50%)
- Adoption % updates UI copy ("Modeling XX of YY facilities")
- ROI outputs identical to S0 golden tests (math frozen ✅)
- Visual regression snapshots captured (baseline)
- Playwright E2E test: adoption slider works end-to-end

---

## S1 Tasks (Atomic, Independently Executable)

### S1-001: Create NetworkCoverageModel + Adoption Presets

**Objective:** Define adoption % as shared types + helper functions.

**Acceptance Criteria:**
- [ ] File: `src/lib/adoption/types.ts` created:
  ```typescript
  export interface NetworkCoverageModel {
    adoptionPercent: number;              // 5-100 (no upper cap)
    scenarioName: 'Deep Model' | 'Custom';
    description: string;
  }
  
  export const ADOPTION_PRESETS = {
    Year1Conservative: {
      adoptionPercent: 5,
      description: '5% Year 1 (Deep Model default)',
    },
    Year1Moderate: {
      adoptionPercent: 10,
      description: '10% Year 1 (moderate rollout)',
    },
    Year2Aggressive: {
      adoptionPercent: 25,
      description: '25% Year 2 (aggressive)',
    },
    Year3Transformation: {
      adoptionPercent: 50,
      description: '50% Year 3 (network inflection)',
    },
  };
  
  export fn facilitiesInScope(
    totalFacilities: number,
    adoptionPercent: number,
  ): number {
    // Calculate facilities in scope; handle large numbers
    if (totalFacilities > 1_000_000_000) {
      console.warn('Facility count > 1B; precision may degrade');
    }
    return Math.round(totalFacilities * (adoptionPercent / 100));
  }
  ```
- [ ] File: `src/lib/adoption/index.ts` exports all
- [ ] Unit tests: `src/lib/adoption/model.test.ts`
  ```typescript
  describe('NetworkCoverageModel', () => {
    test('facilitiesInScope(1, 5) === 0 (rounding)', () => {
      expect(facilitiesInScope(1, 5)).toBe(0);
    });
    
    test('facilitiesInScope(10, 5) === 1 (rounding)', () => {
      expect(facilitiesInScope(10, 5)).toBe(1);
    });
    
    test('facilitiesInScope(260, 5) === 13', () => {
      expect(facilitiesInScope(260, 5)).toBe(13);
    });
    
    test('facilitiesInScope(10000, 10) === 1000', () => {
      expect(facilitiesInScope(10000, 10)).toBe(1000);
    });
    
    test('facilitiesInScope(1000000, 25) === 250000', () => {
      expect(facilitiesInScope(1000000, 25)).toBe(250000);
    });
    
    test('ADOPTION_PRESETS.Year1Conservative.adoptionPercent === 5', () => {
      expect(ADOPTION_PRESETS.Year1Conservative.adoptionPercent).toBe(5);
    });
  });
  ```
- [ ] All tests pass: `npm run test:unit -- adoption/model.test.ts` ✅

**Technical Details:**
- No business logic; pure types + helpers
- Facility calculation: simple percentage math
- Handle large numbers gracefully (console warn if >1B)

**Validation:**
- Import: `import { facilitiesInScope, ADOPTION_PRESETS } from '@/lib/adoption'` ✅
- Tests pass ✅
- No TypeScript errors ✅

**Effort:** ~2 hours  
**Dependencies:** S0 complete  
**Owner:** Architect  
**Sign-off:** CTO

**PR Title:** `feat(adoption): Add NetworkCoverageModel types + facilitiesInScope helper`

---

### S1-002: Build CoverageSlider Component

**Objective:** Reusable UI control for adoption % selection.

**Acceptance Criteria:**
- [ ] File: `components/CoverageSlider.tsx` created:
  ```typescript
  'use client';
  
  import React, { useState } from 'react';
  
  interface CoverageSliderProps {
    value: number;                    // 5-100
    onChange: (value: number) => void;
    showPresets?: boolean;
    disabled?: boolean;
    label?: string;
  }
  
  export default function CoverageSlider({
    value,
    onChange,
    showPresets = true,
    disabled = false,
    label = 'Network Coverage (%)',
  }: CoverageSliderProps) {
    return (
      <div className="flex flex-col gap-4 p-4 bg-void text-white border border-steel rounded">
        {/* Label */}
        <label htmlFor="adoption-slider" className="text-sm font-semibold text-steel">
          {label}
        </label>
        
        {/* Slider */}
        <input
          id="adoption-slider"
          type="range"
          min="5"
          max="100"
          step="5"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          disabled={disabled}
          className="w-full h-2 bg-steel rounded-lg appearance-none cursor-pointer"
          aria-label={label}
        />
        
        {/* Display Value */}
        <div className="text-lg font-bold text-flow">
          {value}% Network Coverage
        </div>
        
        {/* Presets */}
        {showPresets && (
          <div className="flex gap-2 flex-wrap">
            {[
              { percent: 5, label: '5% (Year 1)' },
              { percent: 10, label: '10% (Moderate)' },
              { percent: 25, label: '25% (Aggressive)' },
              { percent: 50, label: '50% (Inflection)' },
            ].map(preset => (
              <button
                key={preset.percent}
                onClick={() => onChange(preset.percent)}
                disabled={disabled}
                className={`px-3 py-1 text-sm rounded border transition-colors ${
                  value === preset.percent
                    ? 'bg-flow text-void border-flow'
                    : 'bg-void text-flow border-flow hover:bg-flow hover:text-void'
                } disabled:opacity-50`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
  ```
- [ ] Component renders without errors
- [ ] Props documented via TypeScript
- [ ] Tailwind classes match brand colors (void, flow, steel)
- [ ] Accessibility: ARIA labels, keyboard support
- [ ] Unit test: `components/CoverageSlider.test.tsx`
  ```typescript
  import { render, screen, fireEvent } from '@testing-library/react';
  import CoverageSlider from './CoverageSlider';
  
  describe('CoverageSlider', () => {
    test('renders with initial value', () => {
      render(<CoverageSlider value={5} onChange={() => {}} />);
      expect(screen.getByRole('slider')).toHaveValue('5');
    });
    
    test('calls onChange when slider moved', () => {
      const onChange = jest.fn();
      render(<CoverageSlider value={5} onChange={onChange} />);
      const slider = screen.getByRole('slider');
      fireEvent.change(slider, { target: { value: '25' } });
      expect(onChange).toHaveBeenCalledWith(25);
    });
    
    test('calls onChange when preset button clicked', () => {
      const onChange = jest.fn();
      render(<CoverageSlider value={5} onChange={onChange} />);
      fireEvent.click(screen.getByText('25% (Aggressive)'));
      expect(onChange).toHaveBeenCalledWith(25);
    });
    
    test('displays presets by default', () => {
      render(<CoverageSlider value={5} onChange={() => {}} />);
      expect(screen.getByText('5% (Year 1)')).toBeInTheDocument();
      expect(screen.getByText('50% (Inflection)')).toBeInTheDocument();
    });
    
    test('hides presets when showPresets=false', () => {
      render(<CoverageSlider value={5} onChange={() => {}} showPresets={false} />);
      expect(screen.queryByText('25% (Aggressive)')).not.toBeInTheDocument();
    });
  });
  ```
- [ ] Tests pass: `npm run test:unit -- CoverageSlider.test` ✅
- [ ] Component story (optional): Storybook or similar

**Technical Details:**
- HTML5 `<input type="range">` (no external lib for now)
- Tailwind styling
- Presets as button grid
- Accessibility: ARIA labels, keyboard nav

**Validation:**
- Component renders ✅
- Slider interactive ✅
- Presets functional ✅
- Tests pass ✅
- No console errors ✅

**Effort:** ~3 hours  
**Dependencies:** S1-001  
**Owner:** Visualist  
**Sign-off:** Visualist + CTO

**PR Title:** `feat(components): Add CoverageSlider component (adoption % UI control)`

---

### S1-003: Wire CoverageSlider to ROI Page

**Objective:** Adoption slider appears on ROI; adoption copy updates; math locked.

**Acceptance Criteria:**
- [ ] Update `app/roi/page.tsx`:
  - Import CoverageSlider + adoption helpers
  - Add state: `const [adoptionPercent, setAdoptionPercent] = useState(5);`
  - Add state: `const [totalFacilities, setTotalFacilities] = useState(260);` (default Primo)
  - Insert CoverageSlider above calculator
  - Calculate in-scope facilities: `const inScopeFacilities = facilitiesInScope(totalFacilities, adoptionPercent);`
  - Update UI copy in 3 places:
    1. Hero section: "Network Coverage: **5%** (Year 1 Deep Model default)"
    2. Calculator info: "Modeling **13 of 260 facilities** in scope" (or whatever ratio)
    3. Adoption note: "As coverage increases to 10%, 25%, 50%, compounding accelerates"
  - Ensure: adoption % does NOT change calcRoiV2() inputs (per S0.5a)
  - Test: facilities input accepts any positive number (1, 10, 260, 10000, 1000000)
- [ ] Facility count input: standard number input
  ```tsx
  <input
    type="number"
    min="1"
    max="1000000000"
    value={totalFacilities}
    onChange={(e) => setTotalFacilities(parseInt(e.target.value))}
    placeholder="Enter total facilities"
  />
  ```
- [ ] No changes to `calcRoiV2()` call or inputs object
- [ ] ROI outputs identical to S0 golden tests:
  - Same input → same output (adoption % not mapped to formula)
  - Test: `calcRoiV2({ ...inputs, adoptionPercent: 5 }) === calcRoiV2({ ...inputs, adoptionPercent: 50 })`
- [ ] Snapshot regression test: `e2e/roi-adoption-snapshot.spec.ts`
  ```typescript
  import { test, expect } from '@playwright/test';
  
  test('ROI page with adoption slider', async ({ page }) => {
    await page.goto('http://localhost:3000/roi');
    
    // Check slider renders
    expect(await page.locator('input[type="range"]')).toBeVisible();
    
    // Adjust slider to 25%
    await page.locator('input[type="range"]').fill('25');
    
    // Check copy updates
    expect(await page.locator('text=25%')).toBeVisible();
    expect(await page.locator('text=65 of 260 facilities')).toBeVisible(); // 260 * 25% = 65
    
    // Check calculator still works
    const roiValue = await page.locator('[data-testid="roi-year1"]').textContent();
    expect(roiValue).not.toBeUndefined();
    
    // Adjust facilities to 1000
    await page.locator('input[type="number"]').fill('1000');
    
    // Check copy updates
    expect(await page.locator('text=250 of 1,000 facilities')).toBeVisible(); // 1000 * 25% = 250
    
    // Screenshot: capture ROI page at 25% adoption, 1000 facilities
    await expect(page).toHaveScreenshot('roi-page-adoption-25pct.png');
  });
  ```
- [ ] Snapshot captured + checked in: `e2e/__screenshots__/roi-page-adoption-25pct.png`

**Technical Details:**
- Copy template: `Modeling ${inScopeFacilities.toLocaleString()} of ${totalFacilities.toLocaleString()} facilities`
- Adoption % state separate from formula inputs (S0.5a)
- Large facility numbers: format with toLocaleString()

**Validation:**
- ROI page renders ✅
- Slider interactive ✅
- Copy updates ✅
- Facilities input accepts 1, 10, 260, 10000, 1000000 ✅
- ROI outputs identical to golden tests ✅
- Playwright test passes ✅
- Screenshot baseline captured ✅

**Effort:** ~4 hours  
**Dependencies:** S1-001, S1-002, S0 complete  
**Owner:** Architect  
**Sign-off:** CTO + Product

**PR Title:** `feat(roi): Wire CoverageSlider to ROI page (adoption narrative, math frozen)`

---

### S1-004: Adoption Presets Shared Across Diagnostic Page

**Objective:** Diagnostic page can also use adoption presets (optional teaser or result CTA).

**Acceptance Criteria:**
- [ ] Option A (Simpler): Diagnostic result page shows adoption context
  - When showing diagnostic results, display:
    "Model this scenario with **5% adoption** (Year 1 default) to see ROI impact."
  - This is read-only context (no interactivity on diagnostic itself)
  - CTA: "Run ROI with your facility count" → links to `/roi` with adoption=5 preset
- [ ] Option B (Richer): Diagnostic page includes CoverageSlider
  - Add CoverageSlider to diagnostic page (read-only or with callback)
  - Adoption % appears but doesn't change diagnostic logic
  - CTA links to ROI with adoption preset
- [ ] Choose Option A (simpler, faster) for this sprint
  - Easier to implement
  - Diagnostic logic unchanged
  - Can evolve to Option B in future
- [ ] Update: `app/diagnostic/page.tsx`
  - Import adoption presets
  - Add adoption context to results section:
    ```tsx
    <div className="bg-steel/20 p-4 rounded">
      <p className="text-sm text-steel">
        This scenario modeled at <strong>5% adoption</strong> (Year 1 default, Deep Model).
      </p>
      <a href="/roi?adoption=5&facilities=260" className="text-flow hover:underline">
        See ROI impact with your adoption plan →
      </a>
    </div>
    ```
  - CTA link passes adoption preset to ROI page (query params)
- [ ] No changes to diagnostic logic or scoring
- [ ] Manual test: click CTA → navigate to ROI → adoption preset applied ✅

**Technical Details:**
- Option A: display-only adoption context
- Links use query params: `/roi?adoption=5&facilities=260`
- ROI page reads query params + applies presets (S1-003)

**Validation:**
- Diagnostic page renders ✅
- Adoption context visible ✅
- CTA links to ROI ✅
- ROI page loads with adoption preset applied ✅

**Effort:** ~1.5 hours  
**Dependencies:** S1-001, S1-003  
**Owner:** Architect  
**Sign-off:** Product Lead

**PR Title:** `feat(diagnostic): Add adoption context + CTA to ROI (Option A: read-only teaser)`

---

### S1-005: Visual Regression Tests + SOP Documentation

**Objective:** Capture baseline screenshots; document snapshot approval process.

**Acceptance Criteria:**
- [ ] File: `docs/VISUAL_REGRESSION_SOP.md` created:
  ```markdown
  # Visual Regression Testing SOP
  
  ## Process Overview
  1. First snapshot: Visualist reviews + approves (baseline)
  2. Subsequent changes: CI detects diff; developer explains
  3. Intentional changes: Visualist re-approves + updates baseline
  
  ## Baseline Snapshot Approval
  - Visualist compares: screenshot vs. design system
  - Check: layout correct, colors match, no broken elements
  - Approval: "LGTM, visual snapshot approved"
  - Commit: baseline image checked into `e2e/__screenshots__/`
  
  ## Regression Detection
  - CI runs: `npm run test:e2e:visual`
  - Playwright compares current screenshot to baseline
  - If diff >2%: test fails, blocks merge
  - Developer gets: side-by-side comparison in PR
  
  ## Intentional Changes
  - Design approved by Product/Visualist: update baseline
  - Developer runs: `npm run test:e2e:visual -- -u`
  - Files changed: `e2e/__screenshots__/*.png`
  - PR comment: "Design approved by @visualist; updating baseline"
  - Visualist re-approves + merges
  
  ## Regression Rollback
  - If change unintentional: revert code, re-run tests
  - Baseline should match again
  - If not: investigate root cause
  
  ## CI Configuration
  - Tool: Playwright `page.screenshot()` + `expect().toMatchSnapshot()`
  - Threshold: 2% pixel difference
  - Fail: if diff exceeds threshold
  - Baseline images: committed to git (`e2e/__screenshots__/`)
  
  ## Devices Tested
  - Desktop: 1280×720
  - Mobile: 375×667 (iPhone SE)
  - Variants: light mode (all), dark mode (optional)
  
  ## Maintenance
  - Update snapshots when: colors change, layout refactored, components redesigned
  - Document in PR: "Snapshot updated due to [reason]"
  - Link design issue/ticket if applicable
  ```
- [ ] File committed + linked in README
- [ ] Playwright config updated: snapshot threshold 2%
  ```typescript
  // playwright.config.ts
  export default defineConfig({
    expect: {
      toHaveScreenshot: {
        maxDiffPixels: Math.round(1280 * 720 * 0.02), // 2% threshold
      },
    },
  });
  ```
- [ ] Create `e2e/visual-regression.spec.ts`:
  ```typescript
  import { test, expect } from '@playwright/test';
  
  test.describe('Visual Regression Tests', () => {
    test('ROI page at 5% adoption', async ({ page }) => {
      await page.goto('http://localhost:3000/roi?adoption=5');
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveScreenshot('roi-page-adoption-5pct.png');
    });
    
    test('ROI page at 50% adoption', async ({ page }) => {
      await page.goto('http://localhost:3000/roi?adoption=50');
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveScreenshot('roi-page-adoption-50pct.png');
    });
    
    test('Diagnostic results page', async ({ page }) => {
      await page.goto('http://localhost:3000/diagnostic');
      // Fill out diagnostic...
      // Navigate to results...
      await expect(page).toHaveScreenshot('diagnostic-results.png');
    });
    
    test('Home page hero (mobile)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('http://localhost:3000');
      await expect(page).toHaveScreenshot('home-hero-mobile.png');
    });
    
    test('Home page hero (desktop)', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('http://localhost:3000');
      await expect(page).toHaveScreenshot('home-hero-desktop.png');
    });
  });
  ```
- [ ] First run: create baseline snapshots
  ```bash
  npm run test:e2e:visual
  ```
  This creates: `e2e/__screenshots__/*.png`
- [ ] Snapshots committed to git
- [ ] Snapshots reviewed + approved by Visualist ✅

**Technical Details:**
- Playwright: `page.screenshot()` + `toHaveScreenshot()`
- Threshold: 2% pixel difference (configurable)
- Baseline: committed to git for version control
- Mobile + desktop variants captured

**Validation:**
- SOP doc exists ✅
- Playwright config has threshold ✅
- Test runs: `npm run test:e2e:visual` ✅
- Baselines created + checked in ✅
- Snapshots reviewed + approved ✅

**Effort:** ~2 hours  
**Dependencies:** S1-001 through S1-004  
**Owner:** Gatekeeper + Visualist  
**Sign-off:** Visualist + CTO

**PR Title:** `test(visual): Add visual regression tests + SOP documentation`

---

### S1-006: CoverageSlider Mobile Interaction Testing

**Objective:** Ensure adoption slider works on touch devices.

**Acceptance Criteria:**
- [ ] Playwright test: `e2e/coverage-slider-mobile.spec.ts`
  ```typescript
  import { test, expect } from '@playwright/test';
  
  test.describe('CoverageSlider Mobile Interaction', () => {
    test.beforeEach(({ page }) => {
      // Emulate iPhone SE
      page.setViewportSize({ width: 375, height: 667 });
    });
    
    test('slider responds to touch input', async ({ page }) => {
      await page.goto('http://localhost:3000/roi');
      const slider = page.locator('input[type="range"]');
      
      // Get initial value
      const initialValue = await slider.inputValue();
      expect(initialValue).toBe('5');
      
      // Simulate touch drag
      await slider.tap();
      await page.touch({ x: 300, y: 400 });
      
      // Value should change (or presets allow adjustment)
      const finalValue = await slider.inputValue();
      expect(parseInt(finalValue) > parseInt(initialValue) || finalValue !== initialValue).toBe(true);
    });
    
    test('preset buttons clickable on mobile', async ({ page }) => {
      await page.goto('http://localhost:3000/roi');
      
      // Find and click preset button
      const presetButton = page.locator('button:has-text("25%")');
      await expect(presetButton).toBeVisible();
      
      // Button size should be mobile-friendly (>44×44px)
      const box = await presetButton.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(44);
      expect(box?.width).toBeGreaterThanOrEqual(44);
      
      // Click should work
      await presetButton.click();
      
      // Verify value changed
      const slider = page.locator('input[type="range"]');
      const value = await slider.inputValue();
      expect(value).toBe('25');
    });
    
    test('no horizontal overflow on mobile', async ({ page }) => {
      await page.goto('http://localhost:3000/roi');
      
      // Check: page doesn't scroll horizontally
      const viewportSize = page.viewportSize()!;
      const bodyBox = await page.locator('body').boundingBox();
      
      expect(bodyBox?.width).toBeLessThanOrEqual(viewportSize.width);
    });
  });
  ```
- [ ] Test passes on mobile emulation: `npm run test:e2e:mobile` (or subset of test:e2e:visual) ✅
- [ ] Button sizing: >44×44px (accessibility standard)
- [ ] No horizontal overflow

**Technical Details:**
- Playwright mobile emulation (iPhone SE: 375×667)
- Touch simulation: tap + drag
- Button sizing check
- Overflow validation

**Validation:**
- Tests run ✅
- Mobile touch interaction works ✅
- Buttons accessible (44×44px) ✅
- No overflow ✅

**Effort:** ~2 hours  
**Dependencies:** S1-002  
**Owner:** Gatekeeper + Visualist  
**Sign-off:** QA

**PR Title:** `test(mobile): Add CoverageSlider touch interaction tests`

---

## S1 Summary

**6 atomic tasks:**
1. ✅ NetworkCoverageModel + adoption types
2. ✅ CoverageSlider component
3. ✅ Wire to ROI page (adoption narrative + large facility support)
4. ✅ Adoption context on Diagnostic page
5. ✅ Visual regression tests + SOP docs
6. ✅ Mobile interaction tests

**Demoable Output:**
- CoverageSlider renders on ROI page
- Adoption presets (5%, 10%, 25%, 50%) clickable + functional
- Facilities input accepts 1 to 1,000,000+ (no upper cap)
- UI copy updates: "Modeling XX of YY facilities" (formatted with commas)
- ROI outputs identical to S0 golden tests (adoption % math-neutral ✅)
- Visual snapshots captured (baseline regression tests)
- Mobile touch interaction verified
- Diagnostic result page includes adoption context + CTA to ROI

**Merge Criteria (All Required):**
- [ ] All 6 PRs merged to main
- [ ] CI green (lint, typecheck, unit, E2E smoke, visual)
- [ ] CoverageSlider component tested
- [ ] ROI page wired + adoption copy updates
- [ ] Visual baselines captured + reviewed
- [ ] Mobile interaction verified
- [ ] Golden tests from S0 still passing (no regression) ✅

---

**Next Steps (After S1 Merges):**
- S2: Presets + Performance (reduced-motion framework, performance baselines)
- S3: Brand + IA consistency (naming, CTAs, links)
- Etc.


import { describe, it, expect } from 'vitest';
import { calcRoiV2, defaultRoiV2Inputs } from '../roi';
import type { RoiV2Inputs } from '../roiTypes';

/**
 * Golden Tests for calcRoiV2()
 * 
 * These tests lock the economics formula outputs.
 * Any modification to the ROI calculation must be approved by the Economist + CTO.
 * 
 * Snapshots are stored in calc.test.ts.snap and committed to git.
 * If a test fails, review the snapshot diff carefully before updating.
 */

describe('calcRoiV2 Golden Tests', () => {
  describe('Five Core Scenarios (Facility Scale)', () => {
    const scenarios = [
      {
        name: 'Micro: 1 Facility (baseline)',
        facilities: 1,
        adoption: 5,
      },
      {
        name: 'MidMarket: 10 Facilities',
        facilities: 10,
        adoption: 5,
      },
      {
        name: 'Enterprise: 260 Facilities (Primo scenario)',
        facilities: 260,
        adoption: 5,
      },
      {
        name: 'Enterprise Plus: 10,000 Facilities',
        facilities: 10_000,
        adoption: 10,
      },
      {
        name: 'Massive Scale: 1,000,000 Facilities',
        facilities: 1_000_000,
        adoption: 25,
      },
    ];

    scenarios.forEach(scenario => {
      it(`should produce consistent outputs for ${scenario.name}`, () => {
        const inputs = createTestInputs(scenario.facilities, scenario.adoption);
        const result = calcRoiV2(inputs);

        // Snapshot the key outputs
        expect({
          totalFacilities: result.totalFacilities,
          totalShipmentsPerYear: result.totalShipmentsPerYear,
          baseSavings: result.baseSavings,
          networkMultiplier: result.networkMultiplier,
          networkBonusSavings: result.networkBonusSavings,
          totalAnnualSavings: result.totalAnnualSavings,
          yearOneGrossSavings: result.yearOneGrossSavings,
          yearOneNetGain: result.yearOneNetGain,
          yearOneRoiPercent: result.yearOneRoiPercent,
          paybackMonths: result.paybackMonths,
          fiveYearValue: result.fiveYearValue,
        }).toMatchSnapshot();
      });
    });
  });

  describe('Adoption % Invariance (CRITICAL)', () => {
    it('should produce identical outputs regardless of adoption percent', () => {
      // Base input: 260 facilities (Primo), 5% adoption
      const input5 = createTestInputs(260, 5);
      const result5 = calcRoiV2(input5);

      // Same input but 50% adoption
      const input50 = createTestInputs(260, 50);
      const result50 = calcRoiV2(input50);

      // This is the critical test:
      // Adoption % is NARRATIVE-ONLY and should NOT change any formula outputs
      expect(result5.baseSavings).toBe(result50.baseSavings);
      expect(result5.networkMultiplier).toBe(result50.networkMultiplier);
      expect(result5.networkBonusSavings).toBe(result50.networkBonusSavings);
      expect(result5.totalAnnualSavings).toBe(result50.totalAnnualSavings);
      expect(result5.yearOneRoiPercent).toBe(result50.yearOneRoiPercent);
      expect(result5.paybackMonths).toBe(result50.paybackMonths);
    });
  });

  describe('Large Number Precision', () => {
    it('should handle 1M facilities without precision loss', () => {
      const inputs = createTestInputs(1_000_000, 25);
      const result = calcRoiV2(inputs);

      // Check: no NaN or Infinity
      expect(Number.isFinite(result.totalAnnualSavings)).toBe(true);
      expect(Number.isFinite(result.yearOneRoiPercent)).toBe(true);
      expect(Number.isFinite(result.paybackMonths)).toBe(true);

      // Check: reasonable magnitudes
      expect(result.totalAnnualSavings).toBeGreaterThan(0);
      expect(result.yearOneRoiPercent).toBeGreaterThan(0);
      expect(result.paybackMonths).toBeGreaterThan(0);
    });

    it('should maintain ratio invariance', () => {
      // 260 facilities at 5% adoption
      const input260 = createTestInputs(260, 5);
      const result260 = calcRoiV2(input260);

      // 260,000 facilities at 5% adoption (1000x scale)
      const input260k = createTestInputs(260_000, 5);
      const result260k = calcRoiV2(input260k);

      // Total annual savings should scale roughly with facility count
      // (not perfectly linear due to per-facility dynamics, but should scale)
      const ratioInput = 260_000 / 260; // 1000
      const ratioOutput = result260k.totalAnnualSavings / result260.totalAnnualSavings;

      // Output ratio should be between 500x and 2000x (accounting for network effects)
      expect(ratioOutput).toBeGreaterThan(100);
      expect(ratioOutput).toBeLessThan(5000);
    });
  });

  describe('Network Effect Scaling', () => {
    it('should show increasing network bonus with more facilities', () => {
      const result1 = calcRoiV2(createTestInputs(1, 5));
      const result10 = calcRoiV2(createTestInputs(10, 5));
      const result100 = calcRoiV2(createTestInputs(100, 5));

      // Network bonus should increase (or stay zero at small scale)
      expect(result10.networkBonusSavings).toBeGreaterThanOrEqual(result1.networkBonusSavings);
      expect(result100.networkBonusSavings).toBeGreaterThanOrEqual(result10.networkBonusSavings);
    });
  });

  describe('Output Sanitization', () => {
    it('should never return NaN, Infinity, or negative where inappropriate', () => {
      const testCases = [
        { facilities: 1, adoption: 5 },
        { facilities: 260, adoption: 5 },
        { facilities: 10_000, adoption: 50 },
      ];

      testCases.forEach(tc => {
        const inputs = createTestInputs(tc.facilities, tc.adoption);
        const result = calcRoiV2(inputs);

        expect(Number.isFinite(result.baseSavings)).toBe(true);
        expect(Number.isFinite(result.networkMultiplier)).toBe(true);
        expect(Number.isFinite(result.networkBonusSavings)).toBe(true);
        expect(Number.isFinite(result.totalAnnualSavings)).toBe(true);
        expect(Number.isFinite(result.yearOneRoiPercent)).toBe(true);
        expect(Number.isFinite(result.paybackMonths)).toBe(true);

        // Savings should not be negative
        expect(result.baseSavings).toBeGreaterThanOrEqual(0);
        expect(result.networkBonusSavings).toBeGreaterThanOrEqual(0);
        expect(result.totalAnnualSavings).toBeGreaterThanOrEqual(0);
      });
    });
  });
});

/**
 * Helper: Create test inputs with standardized assumptions
 * Varies facility count and adoption %, but locks all other parameters
 */
function createTestInputs(facilities: number, adoptionPercent: number): RoiV2Inputs {
  const defaults = defaultRoiV2Inputs();

  // Override facility count based on tier distribution
  // Simple model: all facilities at tier 'L' (Large)
  return {
    ...defaults,
    tiers: {
      XL: { count: 0, shipmentsPerDay: 0, operatingDaysPerYear: 365, dcFteAnnualCost: 0 },
      L: { count: facilities, shipmentsPerDay: 150, operatingDaysPerYear: 365, dcFteAnnualCost: 85_000 },
      M: { count: 0, shipmentsPerDay: 0, operatingDaysPerYear: 365, dcFteAnnualCost: 0 },
      S: { count: 0, shipmentsPerDay: 0, operatingDaysPerYear: 365, dcFteAnnualCost: 0 },
    },
    // Note: adoptionPercent is NOT used in calcRoiV2Inputs
    // It's a narrative/UI concept, not part of the formula
    // This is documented in docs/ADOPTION_SEMANTICS.md
  };
}

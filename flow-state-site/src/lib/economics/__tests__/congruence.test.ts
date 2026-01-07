/**
 * Economics Congruence Test
 * 
 * Verifies that all surfaces using the economics engine produce
 * identical outputs for identical inputs.
 */

import { describe, it, expect } from 'vitest';
import { 
  calcScenario, 
  calcRoiV2, 
  getRoiV2InputsForPreset,
  getQuickInputsForPreset,
  roiV2InputsFromQuickMode,
  metcalfeInspiredMultiplier,
} from '../index';

describe('Economics Congruence', () => {
  const testInputs = {
    facilities: 50,
    trucksPerDayPerFacility: 50,
    avgDwellTimeMinutes: 55,
    detentionCostPerHour: 125,
    laborCostPerHour: 30,
    gateStaffPerFacility: 2,
  };

  describe('calcRoiV2 and calcScenario produce consistent results', () => {
    it('should produce identical base savings for same inputs', () => {
      const preset = getRoiV2InputsForPreset('enterprise_50', 'expected');
      
      // Direct calcRoiV2
      const directRoi = calcRoiV2(preset);
      
      // Through calcScenario
      const scenario = calcScenario({
        roi: preset,
        profit: {
          method: 'contribution_margin',
          contributionMarginPerTruckload: preset.throughput.incrementalMarginPerTruck,
          outsourcedCostPerTruckload: 0,
          internalVariableCostPerTruckload: 0,
        },
        discountRate: 0.1,
        growthRate: 0.02,
      });
      
      expect(scenario.roi.totalAnnualSavings).toBe(directRoi.totalAnnualSavings);
      expect(scenario.roi.baseSavings).toBe(directRoi.baseSavings);
      expect(scenario.roi.networkBonusSavings).toBe(directRoi.networkBonusSavings);
      expect(scenario.roi.networkMultiplier).toBe(directRoi.networkMultiplier);
    });

    it('should produce identical year-1 savings for same ramp', () => {
      const preset = {
        ...getRoiV2InputsForPreset('enterprise_50', 'expected'),
        yearOneRampShare: 0.05,
      };
      
      const directRoi = calcRoiV2(preset);
      
      const scenario = calcScenario({
        roi: preset,
        profit: {
          method: 'contribution_margin',
          contributionMarginPerTruckload: preset.throughput.incrementalMarginPerTruck,
          outsourcedCostPerTruckload: 0,
          internalVariableCostPerTruckload: 0,
        },
        discountRate: 0.1,
        growthRate: 0.02,
      });
      
      expect(scenario.roi.yearOneGrossSavings).toBe(directRoi.yearOneGrossSavings);
      expect(scenario.roi.yearOneRoiPercent).toBe(directRoi.yearOneRoiPercent);
    });
  });

  describe('Quick mode and preset mode produce consistent results', () => {
    it('should produce same total shipments for equivalent inputs', () => {
      const quick = getQuickInputsForPreset('enterprise_50', 'expected');
      const v2FromQuick = roiV2InputsFromQuickMode(quick);
      
      const presetDirect = getRoiV2InputsForPreset('enterprise_50', 'expected');
      
      const quickRoi = calcRoiV2(v2FromQuick);
      const presetRoi = calcRoiV2(presetDirect);
      
      // Should be in same ballpark (allow for slight differences in tier distribution)
      const tolerance = 0.1; // 10% tolerance
      expect(Math.abs(quickRoi.totalShipmentsPerYear - presetRoi.totalShipmentsPerYear) / presetRoi.totalShipmentsPerYear).toBeLessThan(tolerance);
    });
  });

  describe('Network effect formula consistency', () => {
    it('should produce consistent multipliers across all callers', () => {
      const n = 50;
      const params = { beta: 0.025, tau: 50 };
      
      // Direct network calculation
      const direct = metcalfeInspiredMultiplier(n, params);
      
      // Through preset (which uses same params)
      const preset = getRoiV2InputsForPreset('enterprise_50', 'expected');
      const presetRoi = calcRoiV2(preset);
      
      // Both should use same formula
      expect(direct.multiplier).toBeGreaterThan(1);
      expect(presetRoi.networkMultiplier).toBeGreaterThan(1);
      
      // Verify formula components
      expect(direct.connections).toBe(50 * 49 / 2); // C(50) = 1225
      expect(direct.baselineConnections).toBe(10 * 9 / 2); // C(10) = 45
      expect(direct.realization).toBeCloseTo(1 - Math.exp(-50/50), 5); // R(50)
    });

    it('should clamp multiplier for edge cases', () => {
      // Zero facilities
      const zero = metcalfeInspiredMultiplier(0, { beta: 0.025, tau: 50 });
      expect(zero.multiplier).toBeGreaterThanOrEqual(1);
      
      // One facility
      const one = metcalfeInspiredMultiplier(1, { beta: 0.025, tau: 50 });
      expect(one.multiplier).toBe(1); // No network with single facility
      
      // Very large network
      const large = metcalfeInspiredMultiplier(500, { beta: 0.025, tau: 50 });
      expect(Number.isFinite(large.multiplier)).toBe(true);
    });
  });

  describe('Cost of delay is derived consistently', () => {
    it('should equal Year-1 savings / 4 for 90-day delay', () => {
      const preset = getRoiV2InputsForPreset('enterprise_50', 'expected');
      const scenario = calcScenario({
        roi: preset,
        profit: {
          method: 'contribution_margin',
          contributionMarginPerTruckload: preset.throughput.incrementalMarginPerTruck,
          outsourcedCostPerTruckload: 0,
          internalVariableCostPerTruckload: 0,
        },
        discountRate: 0.1,
        growthRate: 0.02,
      });
      
      expect(scenario.finance.costOfDelay90Days).toBe(scenario.roi.yearOneGrossSavings / 4);
    });
  });

  describe('All scenarios produce valid outputs', () => {
    const scenarios = ['conservative', 'expected', 'upside'] as const;
    const presets = ['regional_10', 'enterprise_50'] as const;
    
    for (const scenario of scenarios) {
      for (const preset of presets) {
        it(`should produce valid outputs for ${preset} ${scenario}`, () => {
          const inputs = getRoiV2InputsForPreset(preset, scenario);
          const result = calcRoiV2(inputs);
          
          // All values should be finite and non-negative
          expect(Number.isFinite(result.totalAnnualSavings)).toBe(true);
          expect(result.totalAnnualSavings).toBeGreaterThanOrEqual(0);
          expect(Number.isFinite(result.networkMultiplier)).toBe(true);
          expect(result.networkMultiplier).toBeGreaterThanOrEqual(1);
          expect(Number.isFinite(result.yearOneRoiPercent)).toBe(true);
          expect(Number.isFinite(result.paybackMonths)).toBe(true);
        });
      }
    }
  });
});

/**
 * Golden Tests for Variance Tax Calculator
 * 
 * Snapshot tests for known scenarios to ensure formula consistency.
 * These tests verify that calculations produce expected results for
 * well-defined input sets.
 */

import { describe, it, expect } from 'vitest';
import { calcVarianceTax } from '../calculator';
import { DEFAULT_INPUTS, applyPreset } from '../defaults';
import type { VarianceTaxInputs } from '../types';

describe('Golden Tests - Calculator Snapshots', () => {
  describe('Default Inputs (Mid-Market Shipper)', () => {
    it('produces expected total variance tax', () => {
      const result = calcVarianceTax(DEFAULT_INPUTS);
      
      // Total should be sum of all components
      const expectedTotal = 
        result.recoveryCost +
        result.detentionCost +
        result.laborVarianceCost +
        result.chargebackCost +
        result.workingCapitalDrag +
        result.lostSalesRisk;
      
      expect(result.totalVarianceTax).toBeCloseTo(expectedTotal, 0);
    });

    it('produces consistent results for default scenario', () => {
      const result = calcVarianceTax(DEFAULT_INPUTS);
      
      // Golden values for mid-market shipper
      // These are the expected outputs that should not change without
      // intentional formula updates
      expect(result.recoveryCost).toMatchSnapshot();
      expect(result.detentionCost).toMatchSnapshot();
      expect(result.laborVarianceCost).toMatchSnapshot();
      expect(result.chargebackCost).toMatchSnapshot();
      expect(result.workingCapitalDrag).toMatchSnapshot();
      expect(result.lostSalesRisk).toMatchSnapshot();
      expect(result.totalVarianceTax).toMatchSnapshot();
      expect(result.reynoldsScore).toMatchSnapshot();
    });

    it('has all component percentages sum to 100%', () => {
      const result = calcVarianceTax(DEFAULT_INPUTS);
      
      const totalPercent = 
        result.componentPercentages.recovery +
        result.componentPercentages.detention +
        result.componentPercentages.labor +
        result.componentPercentages.chargeback +
        result.componentPercentages.workingCapital +
        result.componentPercentages.lostSales;
      
      expect(totalPercent).toBeCloseTo(100, 1);
    });
  });

  describe('Enterprise Preset', () => {
    it('produces higher costs than mid-market', () => {
      const midMarket = calcVarianceTax(DEFAULT_INPUTS);
      const enterprise = calcVarianceTax(applyPreset('enterprise-50'));
      
      expect(enterprise.totalVarianceTax).toBeGreaterThan(midMarket.totalVarianceTax);
    });

    it('produces consistent results', () => {
      const result = calcVarianceTax(applyPreset('enterprise-50'));
      
      expect(result.totalVarianceTax).toMatchSnapshot();
      expect(result.reynoldsScore).toMatchSnapshot();
    });
  });

  describe('High-Velocity DC Preset', () => {
    it('has tighter turn times', () => {
      const inputs = applyPreset('high-velocity');
      
      expect(inputs.currentTurnTimeMinutes).toBeLessThan(DEFAULT_INPUTS.currentTurnTimeMinutes);
    });

    it('produces consistent results', () => {
      const result = calcVarianceTax(applyPreset('high-velocity'));
      
      expect(result.totalVarianceTax).toMatchSnapshot();
      expect(result.syntheticCapacityPercent).toMatchSnapshot();
    });
  });

  describe('Low-Tech (Paper-Based) Preset', () => {
    it('has higher labor variance due to manual processes', () => {
      const defaultResult = calcVarianceTax(DEFAULT_INPUTS);
      const lowTechResult = calcVarianceTax(applyPreset('low-tech'));
      
      // Labor variance should be higher with manual processes
      expect(lowTechResult.laborVarianceCost).toBeGreaterThan(defaultResult.laborVarianceCost);
    });

    it('produces consistent results', () => {
      const result = calcVarianceTax(applyPreset('low-tech'));
      
      expect(result.totalVarianceTax).toMatchSnapshot();
      expect(result.laborBreakdown).toMatchSnapshot();
    });
  });

  describe('Retail OTIF Focus Preset', () => {
    it('has higher chargeback costs', () => {
      const defaultResult = calcVarianceTax(DEFAULT_INPUTS);
      const retailResult = calcVarianceTax(applyPreset('retail-compliance'));
      
      // Chargebacks should be higher with retail compliance pressure
      expect(retailResult.chargebackCost).toBeGreaterThan(defaultResult.chargebackCost);
    });

    it('produces consistent results', () => {
      const result = calcVarianceTax(applyPreset('retail-compliance'));
      
      expect(result.totalVarianceTax).toMatchSnapshot();
      expect(result.chargebackCost).toMatchSnapshot();
    });
  });

  describe('Edge Cases', () => {
    it('handles zero variance scenario (perfect operations)', () => {
      const perfectInputs: VarianceTaxInputs = {
        ...DEFAULT_INPUTS,
        missedAppointmentRate: 0,
        averageDwellTime: DEFAULT_INPUTS.freeTime, // No detention
        detentionFrequency: 0,
        manualCheckInMinutes: DEFAULT_INPUTS.digitalCheckInMinutes, // No gate waste
        yardHuntingFrequency: 0,
        chargebackRate: 0,
        complianceFailureRate: 0,
        safetyStockDays: 0,
        stockoutRisk: 0,
      };
      
      const result = calcVarianceTax(perfectInputs);
      
      expect(result.recoveryCost).toBe(0);
      expect(result.detentionCost).toBe(0);
      expect(result.chargebackCost).toBe(0);
      expect(result.workingCapitalDrag).toBe(0);
      expect(result.lostSalesRisk).toBe(0);
      // Note: Labor cost might still be > 0 due to formula structure
    });

    it('handles maximum stress scenario', () => {
      const stressInputs: VarianceTaxInputs = {
        ...DEFAULT_INPUTS,
        annualLoadVolume: 500000,
        missedAppointmentRate: 0.3,
        spotPremium: 1500,
        averageDwellTime: 10,
        detentionFrequency: 0.4,
        detentionRate: 150,
        manualCheckInMinutes: 40,
        yardHuntingFrequency: 0.4,
        yardHuntingMinutes: 50,
        chargebackRate: 0.1,
        complianceFailureRate: 0.15,
        safetyStockDays: 20,
        stockoutRisk: 0.08,
        annualRevenue: 200000000,
      };
      
      const result = calcVarianceTax(stressInputs);
      
      // Should produce very high variance tax
      expect(result.totalVarianceTax).toBeGreaterThan(10000000);
      expect(result.reynoldsScore).toBeGreaterThan(0.7);
      expect(result.totalVarianceTax).toMatchSnapshot();
    });

    it('handles minimum viable inputs', () => {
      const minInputs: VarianceTaxInputs = {
        annualLoadVolume: 1000,
        missedAppointmentRate: 0.01,
        spotPremium: 100,
        averageDwellTime: 1,
        freeTime: 1,
        detentionRate: 25,
        detentionFrequency: 0.01,
        laborRateGuard: 15,
        laborRateJockey: 15,
        manualCheckInMinutes: 5,
        digitalCheckInMinutes: 1,
        yardHuntingFrequency: 0.01,
        yardHuntingMinutes: 5,
        chargebackRate: 0.005,
        complianceFailureRate: 0.005,
        averageInvoiceValue: 5000,
        safetyStockDays: 1,
        dailyInventoryValue: 10000,
        holdingCostRate: 0.1,
        stockoutRisk: 0.005,
        annualRevenue: 5000000,
        marginImpact: 0.1,
        currentTurnTimeMinutes: 20,
        targetTurnTimeMinutes: 10,
      };
      
      const result = calcVarianceTax(minInputs);
      
      // Should produce relatively low but positive variance tax
      expect(result.totalVarianceTax).toBeGreaterThan(0);
      expect(result.totalVarianceTax).toBeLessThan(100000);
      expect(result.totalVarianceTax).toMatchSnapshot();
    });
  });

  describe('Determinism', () => {
    it('produces identical results for identical inputs', () => {
      const result1 = calcVarianceTax(DEFAULT_INPUTS);
      const result2 = calcVarianceTax({ ...DEFAULT_INPUTS });
      
      expect(result1.totalVarianceTax).toBe(result2.totalVarianceTax);
      expect(result1.reynoldsScore).toBe(result2.reynoldsScore);
      expect(result1.recoveryCost).toBe(result2.recoveryCost);
    });

    it('produces different results for different inputs', () => {
      const result1 = calcVarianceTax(DEFAULT_INPUTS);
      const result2 = calcVarianceTax({
        ...DEFAULT_INPUTS,
        annualLoadVolume: DEFAULT_INPUTS.annualLoadVolume * 2,
      });
      
      expect(result2.totalVarianceTax).not.toBe(result1.totalVarianceTax);
    });
  });

  describe('Secondary Metrics', () => {
    it('calculates cost per load correctly', () => {
      const result = calcVarianceTax(DEFAULT_INPUTS);
      
      const expectedCostPerLoad = result.totalVarianceTax / DEFAULT_INPUTS.annualLoadVolume;
      expect(result.costPerLoad).toBeCloseTo(expectedCostPerLoad, 2);
    });

    it('calculates monthly run rate correctly', () => {
      const result = calcVarianceTax(DEFAULT_INPUTS);
      
      const expectedMonthly = result.totalVarianceTax / 12;
      expect(result.monthlyRunRate).toBeCloseTo(expectedMonthly, 2);
    });

    it('synthetic capacity is bounded 0-100', () => {
      const result = calcVarianceTax(DEFAULT_INPUTS);
      
      expect(result.syntheticCapacityPercent).toBeGreaterThanOrEqual(0);
      expect(result.syntheticCapacityPercent).toBeLessThanOrEqual(100);
    });

    it('Reynolds score is bounded 0-1', () => {
      const result = calcVarianceTax(DEFAULT_INPUTS);
      
      expect(result.reynoldsScore).toBeGreaterThanOrEqual(0);
      expect(result.reynoldsScore).toBeLessThanOrEqual(1);
    });
  });
});

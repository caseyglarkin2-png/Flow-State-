import { describe, it, expect } from 'vitest';
import { calcVarianceTax } from '../calculator';
import { DEFAULT_INPUTS } from '../defaults';

describe('calcVarianceTax (Aggregate Calculator)', () => {
  it('calculates all components with default inputs', () => {
    const result = calcVarianceTax(DEFAULT_INPUTS);
    
    // Verify all components are present
    expect(result.recoveryCost).toBeGreaterThan(0);
    expect(result.detentionCost).toBeGreaterThan(0);
    expect(result.laborVarianceCost).toBeGreaterThan(0);
    expect(result.chargebackCost).toBeGreaterThan(0);
    expect(result.workingCapitalDrag).toBeGreaterThan(0);
    expect(result.lostSalesRisk).toBeGreaterThan(0);
    
    // Verify total is sum of components
    const sumOfComponents = 
      result.recoveryCost +
      result.detentionCost +
      result.laborVarianceCost +
      result.chargebackCost +
      result.workingCapitalDrag +
      result.lostSalesRisk;
    expect(result.totalVarianceTax).toBe(sumOfComponents);
    
    // Verify derived metrics
    expect(result.syntheticCapacityPercent).toBe(50); // (48-24)/48 × 100
    expect(result.reynoldsScore).toBeGreaterThan(0);
    expect(result.reynoldsScore).toBeLessThan(1);
    expect(result.costPerLoad).toBe(result.totalVarianceTax / DEFAULT_INPUTS.annualLoadVolume);
    expect(result.monthlyRunRate).toBe(result.totalVarianceTax / 12);
  });

  it('calculates expected values for default mid-market scenario', () => {
    const result = calcVarianceTax(DEFAULT_INPUTS);
    
    // Component A: 20000 × 0.05 × 450 = 450,000
    expect(result.recoveryCost).toBe(450000);
    
    // Component B: 20000 × 0.15 × 2 × 75 = 450,000
    expect(result.detentionCost).toBe(450000);
    
    // Component D: 20000 × 0.03 × 25000 × 0.03 = 450,000
    expect(result.chargebackCost).toBe(450000);
    
    // Component E: 5 × 100000 × 0.25 = 125,000
    expect(result.workingCapitalDrag).toBe(125000);
    
    // Component F: 50000000 × 0.02 × 0.5 = 500,000
    expect(result.lostSalesRisk).toBe(500000);
  });

  it('includes labor breakdown', () => {
    const result = calcVarianceTax(DEFAULT_INPUTS);
    
    expect(result.laborBreakdown).toBeDefined();
    expect(result.laborBreakdown.gateWaste).toBeGreaterThan(0);
    expect(result.laborBreakdown.huntWaste).toBeGreaterThan(0);
    expect(result.laborBreakdown.total).toBe(result.laborBreakdown.gateWaste + result.laborBreakdown.huntWaste);
    expect(result.laborVarianceCost).toBe(result.laborBreakdown.total);
  });

  it('calculates component percentages that sum to 100', () => {
    const result = calcVarianceTax(DEFAULT_INPUTS);
    
    const sumOfPercentages = 
      result.componentPercentages.recovery +
      result.componentPercentages.detention +
      result.componentPercentages.labor +
      result.componentPercentages.chargeback +
      result.componentPercentages.workingCapital +
      result.componentPercentages.lostSales;
    
    expect(sumOfPercentages).toBeCloseTo(100, 5);
  });

  it('handles zero volume gracefully', () => {
    const result = calcVarianceTax({
      ...DEFAULT_INPUTS,
      annualLoadVolume: 0,
    });
    
    // All volume-dependent components should be 0
    expect(result.recoveryCost).toBe(0);
    expect(result.detentionCost).toBe(0);
    expect(result.laborVarianceCost).toBe(0);
    expect(result.chargebackCost).toBe(0);
    
    // Working capital and lost sales don't depend on load volume directly
    expect(result.workingCapitalDrag).toBe(125000);
    expect(result.lostSalesRisk).toBe(500000);
    
    // Cost per load should be 0 (avoid division by zero)
    expect(result.costPerLoad).toBe(0);
  });

  it('handles enterprise-scale inputs', () => {
    const enterpriseInputs = {
      ...DEFAULT_INPUTS,
      annualLoadVolume: 200000,
      averageDwellTime: 5.0,
      detentionFrequency: 0.20,
      safetyStockDays: 7,
      dailyInventoryValue: 500000,
      annualRevenue: 500000000,
    };
    
    const result = calcVarianceTax(enterpriseInputs);
    
    // Total should be significantly higher than mid-market
    expect(result.totalVarianceTax).toBeGreaterThan(5000000);
    
    // All values should be finite
    expect(isFinite(result.totalVarianceTax)).toBe(true);
    expect(isFinite(result.reynoldsScore)).toBe(true);
    expect(isFinite(result.syntheticCapacityPercent)).toBe(true);
  });

  it('provides golden test output for regression testing', () => {
    // This is a "golden test" - expected outputs for default inputs
    // Update these values only if formulas intentionally change
    const result = calcVarianceTax(DEFAULT_INPUTS);
    
    // Snapshot expected values (update if formulas change)
    expect(result.recoveryCost).toBe(450000);
    expect(result.detentionCost).toBe(450000);
    expect(result.chargebackCost).toBe(450000);
    expect(result.workingCapitalDrag).toBe(125000);
    expect(result.lostSalesRisk).toBe(500000);
    expect(result.syntheticCapacityPercent).toBe(50);
    
    // Labor varies slightly due to floating point
    expect(result.laborVarianceCost).toBeCloseTo(146666.67, 0);
    
    // Total Variance Tax for mid-market default: ~$2.12M
    expect(result.totalVarianceTax).toBeCloseTo(2121666.67, 0);
    expect(result.costPerLoad).toBeCloseTo(106.08, 0);
    expect(result.monthlyRunRate).toBeCloseTo(176805.56, 0);
  });
});

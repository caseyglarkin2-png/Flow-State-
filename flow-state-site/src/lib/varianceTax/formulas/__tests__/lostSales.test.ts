import { describe, it, expect } from 'vitest';
import { calcLostSalesRisk } from '../lostSales';

describe('calcLostSalesRisk (Component F)', () => {
  it('calculates lost sales risk with default inputs', () => {
    const result = calcLostSalesRisk({
      annualRevenue: 50000000,
      stockoutRisk: 0.02,
      marginImpact: 0.5,
    });
    // 50000000 × 0.02 × 0.5 = 500,000
    expect(result).toBe(500000);
  });

  it('returns 0 for zero stockout risk', () => {
    const result = calcLostSalesRisk({
      annualRevenue: 50000000,
      stockoutRisk: 0,
      marginImpact: 0.5,
    });
    expect(result).toBe(0);
  });

  it('handles high risk scenario', () => {
    const result = calcLostSalesRisk({
      annualRevenue: 500000000,
      stockoutRisk: 0.05,
      marginImpact: 0.4,
    });
    // 500000000 × 0.05 × 0.4 = 10,000,000
    expect(result).toBe(10000000);
  });

  it('returns 0 for invalid inputs', () => {
    expect(calcLostSalesRisk({
      annualRevenue: -1000,
      stockoutRisk: 0.02,
      marginImpact: 0.5,
    })).toBe(0);
  });
});

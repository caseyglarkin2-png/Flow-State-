import { describe, it, expect } from 'vitest';
import { calcChargebackCost } from '../chargeback';

describe('calcChargebackCost (Component D)', () => {
  it('calculates chargeback cost with default inputs', () => {
    const result = calcChargebackCost({
      annualLoadVolume: 20000,
      complianceFailureRate: 0.03,
      averageInvoiceValue: 25000,
      chargebackRate: 0.03,
    });
    // 20000 × 0.03 × 25000 × 0.03 = 450,000
    expect(result).toBe(450000);
  });

  it('returns 0 for zero failure rate', () => {
    const result = calcChargebackCost({
      annualLoadVolume: 20000,
      complianceFailureRate: 0,
      averageInvoiceValue: 25000,
      chargebackRate: 0.03,
    });
    expect(result).toBe(0);
  });

  it('handles high failure scenario', () => {
    const result = calcChargebackCost({
      annualLoadVolume: 50000,
      complianceFailureRate: 0.08,
      averageInvoiceValue: 40000,
      chargebackRate: 0.05,
    });
    // 50000 × 0.08 × 40000 × 0.05 = 8,000,000
    expect(result).toBe(8000000);
  });

  it('returns 0 for invalid inputs', () => {
    expect(calcChargebackCost({
      annualLoadVolume: -100,
      complianceFailureRate: 0.03,
      averageInvoiceValue: 25000,
      chargebackRate: 0.03,
    })).toBe(0);
  });
});

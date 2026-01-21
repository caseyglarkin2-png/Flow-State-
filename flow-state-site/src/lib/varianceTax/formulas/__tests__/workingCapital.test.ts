import { describe, it, expect } from 'vitest';
import { calcWorkingCapitalDrag } from '../workingCapital';

describe('calcWorkingCapitalDrag (Component E)', () => {
  it('calculates working capital drag with default inputs', () => {
    const result = calcWorkingCapitalDrag({
      safetyStockDays: 5,
      dailyInventoryValue: 100000,
      holdingCostRate: 0.25,
    });
    // 5 × 100000 × 0.25 = 125,000
    expect(result).toBe(125000);
  });

  it('returns 0 for zero safety stock days', () => {
    const result = calcWorkingCapitalDrag({
      safetyStockDays: 0,
      dailyInventoryValue: 100000,
      holdingCostRate: 0.25,
    });
    expect(result).toBe(0);
  });

  it('handles high inventory scenario', () => {
    const result = calcWorkingCapitalDrag({
      safetyStockDays: 10,
      dailyInventoryValue: 500000,
      holdingCostRate: 0.30,
    });
    // 10 × 500000 × 0.30 = 1,500,000
    expect(result).toBe(1500000);
  });

  it('returns 0 for invalid inputs', () => {
    expect(calcWorkingCapitalDrag({
      safetyStockDays: -1,
      dailyInventoryValue: 100000,
      holdingCostRate: 0.25,
    })).toBe(0);
  });
});

import { describe, it, expect } from 'vitest';
import { calcDetentionCost } from '../detention';

describe('calcDetentionCost (Component B)', () => {
  it('calculates detention cost with default inputs', () => {
    const result = calcDetentionCost({
      annualLoadVolume: 20000,
      detentionFrequency: 0.15,
      averageDwellTime: 4.0,
      freeTime: 2.0,
      detentionRate: 75,
    });
    // 20000 × 0.15 × (4 - 2) × 75 = 450,000
    expect(result).toBe(450000);
  });

  it('returns 0 when dwell < free time', () => {
    const result = calcDetentionCost({
      annualLoadVolume: 20000,
      detentionFrequency: 0.15,
      averageDwellTime: 1.5,
      freeTime: 2.0,
      detentionRate: 75,
    });
    expect(result).toBe(0);
  });

  it('handles high detention scenario', () => {
    const result = calcDetentionCost({
      annualLoadVolume: 10000,
      detentionFrequency: 0.25,
      averageDwellTime: 5.0,
      freeTime: 2.0,
      detentionRate: 100,
    });
    // 10000 × 0.25 × 3 × 100 = 750,000
    expect(result).toBe(750000);
  });

  it('returns 0 for invalid inputs', () => {
    const result = calcDetentionCost({
      annualLoadVolume: -1,
      detentionFrequency: 0.15,
      averageDwellTime: 4.0,
      freeTime: 2.0,
      detentionRate: 75,
    });
    expect(result).toBe(0);
  });

  it('handles edge case: dwell equals free time', () => {
    const result = calcDetentionCost({
      annualLoadVolume: 20000,
      detentionFrequency: 0.15,
      averageDwellTime: 2.0,
      freeTime: 2.0,
      detentionRate: 75,
    });
    expect(result).toBe(0);
  });
});

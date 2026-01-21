import { describe, it, expect } from 'vitest';
import { calcReynoldsScore } from '../reynolds';

describe('calcReynoldsScore', () => {
  it('returns high score for high-variance operation', () => {
    const result = calcReynoldsScore({
      manualCheckInMinutes: 25,
      digitalCheckInMinutes: 2,
      averageDwellTime: 8,
      annualLoadVolume: 100000,
    });
    // viscosity: (25-2)/25 = 0.92 × 0.5 = 0.46
    // density: 8/8 = 1.0 × 0.3 = 0.30
    // velocity: 100000/100000 = 1.0 × 0.2 = 0.20
    // total: 0.46 + 0.30 + 0.20 = 0.96
    expect(result).toBeCloseTo(0.96, 2);
  });

  it('returns low score for optimized operation', () => {
    const result = calcReynoldsScore({
      manualCheckInMinutes: 5,
      digitalCheckInMinutes: 4,
      averageDwellTime: 1,
      annualLoadVolume: 10000,
    });
    // viscosity: (5-4)/5 = 0.2 × 0.5 = 0.10
    // density: 1/8 = 0.125 × 0.3 = 0.0375
    // velocity: 10000/100000 = 0.1 × 0.2 = 0.02
    // total: 0.10 + 0.0375 + 0.02 ≈ 0.1575
    expect(result).toBeCloseTo(0.1575, 2);
  });

  it('returns 0.5 (neutral) for invalid inputs', () => {
    expect(calcReynoldsScore({
      manualCheckInMinutes: 0,
      digitalCheckInMinutes: 2,
      averageDwellTime: 4,
      annualLoadVolume: 20000,
    })).toBe(0.5);

    expect(calcReynoldsScore({
      manualCheckInMinutes: NaN,
      digitalCheckInMinutes: 2,
      averageDwellTime: 4,
      annualLoadVolume: 20000,
    })).toBe(0.5);
  });

  it('clamps result between 0 and 1', () => {
    // High values should still be clamped
    const result = calcReynoldsScore({
      manualCheckInMinutes: 60,
      digitalCheckInMinutes: 0,
      averageDwellTime: 24,
      annualLoadVolume: 500000,
    });
    expect(result).toBeLessThanOrEqual(1);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('handles default inputs', () => {
    const result = calcReynoldsScore({
      manualCheckInMinutes: 15,
      digitalCheckInMinutes: 2,
      averageDwellTime: 4,
      annualLoadVolume: 20000,
    });
    // Should be a moderate score (between 0.3 and 0.7)
    expect(result).toBeGreaterThan(0.3);
    expect(result).toBeLessThan(0.7);
  });
});

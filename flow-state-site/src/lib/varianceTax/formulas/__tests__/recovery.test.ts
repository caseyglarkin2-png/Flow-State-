import { describe, it, expect } from 'vitest';
import { calcRecoveryCost } from '../recovery';

describe('calcRecoveryCost (Component A)', () => {
  it('calculates recovery cost with default inputs', () => {
    const result = calcRecoveryCost({
      annualLoadVolume: 20000,
      missedAppointmentRate: 0.05,
      spotPremium: 450,
    });
    expect(result).toBe(450000); // 20000 × 0.05 × 450
  });

  it('handles lower volume scenario', () => {
    const result = calcRecoveryCost({
      annualLoadVolume: 10000,
      missedAppointmentRate: 0.02,
      spotPremium: 500,
    });
    expect(result).toBe(100000); // 10000 × 0.02 × 500
  });

  it('returns 0 for zero volume', () => {
    const result = calcRecoveryCost({
      annualLoadVolume: 0,
      missedAppointmentRate: 0.05,
      spotPremium: 450,
    });
    expect(result).toBe(0);
  });

  it('returns 0 for negative volume (invalid)', () => {
    const result = calcRecoveryCost({
      annualLoadVolume: -1000,
      missedAppointmentRate: 0.05,
      spotPremium: 450,
    });
    expect(result).toBe(0);
  });

  it('returns 0 for NaN inputs', () => {
    const result = calcRecoveryCost({
      annualLoadVolume: NaN,
      missedAppointmentRate: 0.05,
      spotPremium: 450,
    });
    expect(result).toBe(0);
  });

  it('returns 0 for Infinity inputs', () => {
    const result = calcRecoveryCost({
      annualLoadVolume: Infinity,
      missedAppointmentRate: 0.05,
      spotPremium: 450,
    });
    expect(result).toBe(0);
  });

  it('handles 100% miss rate edge case', () => {
    const result = calcRecoveryCost({
      annualLoadVolume: 10000,
      missedAppointmentRate: 1.0,
      spotPremium: 500,
    });
    expect(result).toBe(5000000); // 10000 × 1.0 × 500
  });
});

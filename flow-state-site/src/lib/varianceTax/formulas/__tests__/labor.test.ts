import { describe, it, expect } from 'vitest';
import { calcLaborVarianceCost } from '../labor';

describe('calcLaborVarianceCost (Component C)', () => {
  it('calculates labor variance with default inputs', () => {
    const result = calcLaborVarianceCost({
      annualLoadVolume: 20000,
      manualCheckInMinutes: 15,
      digitalCheckInMinutes: 2,
      laborRateGuard: 30,
      yardHuntingFrequency: 0.10,
      yardHuntingMinutes: 20,
      laborRateJockey: 25,
    });
    
    // gateWaste = 20000 × (13/60) × 30 = 130,000
    // huntWaste = 20000 × 0.10 × (20/60) × 25 = 16,666.67
    expect(result.gateWaste).toBeCloseTo(130000, 0);
    expect(result.huntWaste).toBeCloseTo(16666.67, 0);
    expect(result.total).toBeCloseTo(146666.67, 0);
  });

  it('returns zeros when manual equals digital', () => {
    const result = calcLaborVarianceCost({
      annualLoadVolume: 20000,
      manualCheckInMinutes: 5,
      digitalCheckInMinutes: 5,
      laborRateGuard: 30,
      yardHuntingFrequency: 0,
      yardHuntingMinutes: 20,
      laborRateJockey: 25,
    });
    
    expect(result.gateWaste).toBe(0);
    expect(result.huntWaste).toBe(0);
    expect(result.total).toBe(0);
  });

  it('handles high hunt frequency scenario', () => {
    const result = calcLaborVarianceCost({
      annualLoadVolume: 50000,
      manualCheckInMinutes: 25,
      digitalCheckInMinutes: 5,
      laborRateGuard: 30,
      yardHuntingFrequency: 0.25,
      yardHuntingMinutes: 35,
      laborRateJockey: 25,
    });
    
    // gateWaste = 50000 × (20/60) × 30 = 500,000
    // huntWaste = 50000 × 0.25 × (35/60) × 25 = 182,291.67
    expect(result.gateWaste).toBeCloseTo(500000, 0);
    expect(result.huntWaste).toBeCloseTo(182291.67, 0);
  });

  it('returns breakdown object for invalid inputs', () => {
    const result = calcLaborVarianceCost({
      annualLoadVolume: -1,
      manualCheckInMinutes: 15,
      digitalCheckInMinutes: 2,
      laborRateGuard: 30,
      yardHuntingFrequency: 0.10,
      yardHuntingMinutes: 20,
      laborRateJockey: 25,
    });
    
    expect(result).toEqual({ gateWaste: 0, huntWaste: 0, total: 0 });
  });
});

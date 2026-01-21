import { describe, it, expect } from 'vitest';
import { calcSyntheticCapacity } from '../syntheticCapacity';

describe('calcSyntheticCapacity', () => {
  it('calculates 50% capacity for 48→24 min reduction', () => {
    const result = calcSyntheticCapacity(48, 24);
    expect(result).toBe(50); // (48-24)/48 × 100 = 50%
  });

  it('calculates 33% capacity for 30→20 min reduction', () => {
    const result = calcSyntheticCapacity(30, 20);
    expect(result).toBeCloseTo(33.33, 1); // (30-20)/30 × 100 ≈ 33.33%
  });

  it('returns 0 when target >= current', () => {
    expect(calcSyntheticCapacity(24, 24)).toBe(0);
    expect(calcSyntheticCapacity(24, 30)).toBe(0);
  });

  it('returns 0 for zero current time (avoid division by zero)', () => {
    const result = calcSyntheticCapacity(0, 10);
    expect(result).toBe(0);
  });

  it('returns 0 for invalid inputs', () => {
    expect(calcSyntheticCapacity(-10, 5)).toBe(0);
    expect(calcSyntheticCapacity(NaN, 10)).toBe(0);
    expect(calcSyntheticCapacity(Infinity, 10)).toBe(0);
  });

  it('caps at 100% for extreme reductions', () => {
    const result = calcSyntheticCapacity(60, 0);
    expect(result).toBe(100);
  });
});

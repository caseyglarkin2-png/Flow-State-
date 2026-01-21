import { describe, it, expect } from 'vitest';
import { metcalfeInspiredMultiplier } from '../networkEffect';

/**
 * Golden Tests for Network Multiplier
 * 
 * Tests the metcalfeInspiredMultiplier function which models
 * how network effects scale with facility count.
 */

describe('Network Multiplier Golden Tests', () => {
  describe('Metcalfe-Inspired Multiplier Output Consistency', () => {
    const scenarios = [
      { facilities: 1, beta: 0, tau: 10, name: 'Single Facility' },
      { facilities: 5, beta: 0.15, tau: 10, name: 'Small Network' },
      { facilities: 10, beta: 0.15, tau: 10, name: 'MidMarket' },
      { facilities: 100, beta: 0.25, tau: 15, name: 'Enterprise' },
      { facilities: 260, beta: 0.25, tau: 20, name: 'Primo (260 facilities)' },
      { facilities: 1000, beta: 0.3, tau: 25, name: 'Large Network' },
      { facilities: 10000, beta: 0.35, tau: 30, name: 'Massive Scale' },
    ];

    scenarios.forEach(scenario => {
      it(`should produce consistent output for ${scenario.name}`, () => {
        const result = metcalfeInspiredMultiplier(scenario.facilities, {
          beta: scenario.beta,
          tau: scenario.tau,
        });

        expect({
          connections: result.connections,
          multiplier: result.multiplier,
          realization: result.realization,
          beta: result.beta,
          tau: result.tau,
        }).toMatchSnapshot();
      });
    });
  });

  describe('Multiplier Invariants', () => {
    it('should never return multiplier < 1.0', () => {
      const testCases = [
        { n: 1, beta: 0, tau: 10 },
        { n: 5, beta: 0.15, tau: 10 },
        { n: 100, beta: 0.25, tau: 15 },
      ];

      testCases.forEach(tc => {
        const result = metcalfeInspiredMultiplier(tc.n, {
          beta: tc.beta,
          tau: tc.tau,
        });
        expect(result.multiplier).toBeGreaterThanOrEqual(1.0);
      });
    });

    it('should have connections = n * (n - 1) / 2 for valid networks', () => {
      const testCases = [1, 5, 10, 100, 260];

      testCases.forEach(n => {
        const result = metcalfeInspiredMultiplier(n, {
          beta: 0.2,
          tau: 15,
        });
        const expectedConnections = (n * (n - 1)) / 2;
        expect(result.connections).toBe(expectedConnections);
      });
    });

    it('should have realization between 0 and 1', () => {
      const testCases = [1, 5, 10, 100, 1000];

      testCases.forEach(n => {
        const result = metcalfeInspiredMultiplier(n, {
          beta: 0.2,
          tau: 15,
        });
        expect(result.realization).toBeGreaterThanOrEqual(0);
        expect(result.realization).toBeLessThanOrEqual(1);
      });
    });

    it('should increase realization with facility count', () => {
      const results = [1, 10, 100, 1000].map(n =>
        metcalfeInspiredMultiplier(n, { beta: 0.2, tau: 15 })
      );

      // Realization should monotonically increase
      for (let i = 1; i < results.length; i++) {
        expect(results[i].realization).toBeGreaterThanOrEqual(results[i - 1].realization);
      }
    });

    it('should increase multiplier with facility count', () => {
      const results = [1, 10, 100, 260].map(n =>
        metcalfeInspiredMultiplier(n, { beta: 0.2, tau: 15 })
      );

      // Multiplier should monotonically increase
      for (let i = 1; i < results.length; i++) {
        expect(results[i].multiplier).toBeGreaterThanOrEqual(results[i - 1].multiplier);
      }
    });
  });

  describe('Large Number Handling', () => {
    it('should handle 10000+ facilities without NaN/Infinity', () => {
      const testCases = [1000, 10000, 100000];

      testCases.forEach(n => {
        const result = metcalfeInspiredMultiplier(n, {
          beta: 0.3,
          tau: 30,
        });

        expect(Number.isFinite(result.multiplier)).toBe(true);
        expect(Number.isFinite(result.realization)).toBe(true);
        expect(result.multiplier).toBeGreaterThan(1);
      });
    });
  });

  describe('Beta Parameter Sensitivity', () => {
    it('should increase multiplier with higher beta', () => {
      const n = 100;
      const resultLowBeta = metcalfeInspiredMultiplier(n, { beta: 0.1, tau: 15 });
      const resultHighBeta = metcalfeInspiredMultiplier(n, { beta: 0.3, tau: 15 });

      expect(resultHighBeta.multiplier).toBeGreaterThanOrEqual(resultLowBeta.multiplier);
    });
  });

  describe('Tau (Maturity) Parameter Sensitivity', () => {
    it('should accelerate realization growth with lower tau', () => {
      const n = 100;
      const resultHighTau = metcalfeInspiredMultiplier(n, { beta: 0.2, tau: 30 });
      const resultLowTau = metcalfeInspiredMultiplier(n, { beta: 0.2, tau: 10 });

      // Lower tau = faster maturation = higher realization
      expect(resultLowTau.realization).toBeGreaterThan(resultHighTau.realization);
    });
  });
});

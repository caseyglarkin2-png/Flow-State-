import { describe, it, expect } from 'vitest';
import { Vector2 } from 'three';
import {
  createUniform,
  createUniformSet,
  normalizeUSD,
  normalizeComponentPercentages,
  type SingularityShaderUniforms,
  type BaseShaderUniforms,
  type VarianceShaderUniforms,
  type CostComponentUniforms,
} from '../uniforms';

describe('Shader Uniforms', () => {
  describe('createUniform', () => {
    it('wraps a number in a value object', () => {
      const uniform = createUniform(0.5);
      expect(uniform).toEqual({ value: 0.5 });
    });

    it('wraps a Vector2 in a value object', () => {
      const vec = new Vector2(100, 200);
      const uniform = createUniform(vec);
      expect(uniform.value).toBe(vec);
      expect(uniform.value.x).toBe(100);
      expect(uniform.value.y).toBe(200);
    });

    it('wraps arrays in a value object', () => {
      const arr = [1, 2, 3];
      const uniform = createUniform(arr);
      expect(uniform.value).toBe(arr);
    });
  });

  describe('createUniformSet', () => {
    it('creates uniform set from values object', () => {
      const values = {
        uTime: 0,
        uProgress: 0.5,
        uQualityTier: 2,
      };
      
      const uniforms = createUniformSet(values);
      
      expect(uniforms.uTime).toEqual({ value: 0 });
      expect(uniforms.uProgress).toEqual({ value: 0.5 });
      expect(uniforms.uQualityTier).toEqual({ value: 2 });
    });

    it('handles mixed types', () => {
      const values = {
        uTime: 1.5,
        uResolution: new Vector2(1920, 1080),
        uPhase: 1,
      };
      
      const uniforms = createUniformSet(values);
      
      expect(uniforms.uTime.value).toBe(1.5);
      expect(uniforms.uResolution.value.x).toBe(1920);
      expect(uniforms.uPhase.value).toBe(1);
    });
  });

  describe('normalizeUSD', () => {
    it('normalizes 0 to 0', () => {
      expect(normalizeUSD(0)).toBe(0);
    });

    it('normalizes max value to 1', () => {
      expect(normalizeUSD(10000000)).toBe(1);
    });

    it('normalizes mid-range value proportionally', () => {
      expect(normalizeUSD(5000000)).toBe(0.5);
    });

    it('clamps values above max to 1', () => {
      expect(normalizeUSD(20000000)).toBe(1);
    });

    it('clamps negative values to 0', () => {
      expect(normalizeUSD(-100)).toBe(0);
    });

    it('uses custom max value', () => {
      expect(normalizeUSD(500, 1000)).toBe(0.5);
    });

    it('handles zero max value gracefully', () => {
      expect(normalizeUSD(100, 0)).toBe(0);
    });

    it('handles negative max value gracefully', () => {
      expect(normalizeUSD(100, -1000)).toBe(0);
    });
  });

  describe('normalizeComponentPercentages', () => {
    it('converts percentages to 0-1 range', () => {
      const percentages = {
        recovery: 25,
        detention: 15,
        labor: 30,
        chargeback: 10,
        workingCapital: 12,
        lostSales: 8,
      };
      
      const normalized = normalizeComponentPercentages(percentages);
      
      expect(normalized).toEqual([0.25, 0.15, 0.30, 0.10, 0.12, 0.08]);
    });

    it('handles 0% components', () => {
      const percentages = {
        recovery: 0,
        detention: 100,
        labor: 0,
        chargeback: 0,
        workingCapital: 0,
        lostSales: 0,
      };
      
      const normalized = normalizeComponentPercentages(percentages);
      
      expect(normalized[0]).toBe(0);
      expect(normalized[1]).toBe(1);
    });

    it('returns tuple of 6 elements', () => {
      const percentages = {
        recovery: 10,
        detention: 20,
        labor: 30,
        chargeback: 15,
        workingCapital: 15,
        lostSales: 10,
      };
      
      const normalized = normalizeComponentPercentages(percentages);
      
      expect(normalized).toHaveLength(6);
    });
  });

  describe('Type Contracts', () => {
    it('BaseShaderUniforms has required properties', () => {
      const base: BaseShaderUniforms = {
        uTime: 0,
        uResolution: new Vector2(1920, 1080),
        uQualityTier: 3,
      };
      
      expect(base.uTime).toBe(0);
      expect(base.uResolution.x).toBe(1920);
      expect(base.uQualityTier).toBe(3);
    });

    it('VarianceShaderUniforms has variance properties', () => {
      const variance: VarianceShaderUniforms = {
        uVarianceIndex: 0.7,
        uProgress: 0.5,
        uPhase: 1,
        uMouse: new Vector2(0.5, 0.5),
      };
      
      expect(variance.uVarianceIndex).toBe(0.7);
      expect(variance.uPhase).toBe(1);
    });

    it('CostComponentUniforms has all 6 cost components', () => {
      const costs: CostComponentUniforms = {
        uTotalTax: 1000000,
        uRecoveryCost: 250000,
        uDetentionCost: 150000,
        uLaborCost: 300000,
        uChargebackCost: 100000,
        uWorkingCapitalDrag: 120000,
        uLostSalesRisk: 80000,
        uSyntheticCapacity: 0.15,
      };
      
      expect(costs.uTotalTax).toBe(1000000);
      expect(costs.uSyntheticCapacity).toBe(0.15);
    });

    it('SingularityShaderUniforms extends all interfaces', () => {
      const full: SingularityShaderUniforms = {
        // BaseShaderUniforms
        uTime: 1.5,
        uResolution: new Vector2(1920, 1080),
        uQualityTier: 2,
        // VarianceShaderUniforms
        uVarianceIndex: 0.6,
        uProgress: 0.3,
        uPhase: 0,
        uMouse: new Vector2(0.5, 0.5),
        // CostComponentUniforms
        uTotalTax: 500000,
        uRecoveryCost: 125000,
        uDetentionCost: 75000,
        uLaborCost: 150000,
        uChargebackCost: 50000,
        uWorkingCapitalDrag: 60000,
        uLostSalesRisk: 40000,
        uSyntheticCapacity: 0.20,
      };
      
      // Verify all properties exist
      expect(full.uTime).toBeDefined();
      expect(full.uVarianceIndex).toBeDefined();
      expect(full.uTotalTax).toBeDefined();
    });
  });
});

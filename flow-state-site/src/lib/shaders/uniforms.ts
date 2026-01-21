/**
 * Shader Uniforms Interface
 * 
 * Contract between the economics layer and visualization layer.
 * These uniforms are passed from the Variance Tax store to WebGL shaders.
 */

import type { Vector2 } from 'three';

// ═══════════════════════════════════════════════════════════════════
// TYPE ALIASES
// ═══════════════════════════════════════════════════════════════════

/**
 * Uniform value constrained to 0-1 range
 */
export type Uniform0to1 = number;

/**
 * Uniform value constrained to 0-100 range (percentages)
 */
export type Uniform0to100 = number;

/**
 * Uniform value for USD amounts
 */
export type UniformUSD = number;

// ═══════════════════════════════════════════════════════════════════
// SHADER UNIFORM INTERFACES
// ═══════════════════════════════════════════════════════════════════

/**
 * Base uniforms shared across all singularity shaders
 */
export interface BaseShaderUniforms {
  /**
   * Elapsed time in seconds
   * Used for animation
   */
  uTime: number;
  
  /**
   * Canvas resolution in pixels
   */
  uResolution: Vector2;
  
  /**
   * Quality tier for LOD
   * 0 = low, 1 = medium, 2 = high, 3 = ultra
   */
  uQualityTier: number;
}

/**
 * Variance-specific uniforms derived from calculator state
 */
export interface VarianceShaderUniforms {
  /**
   * Variance Index (Reynolds Score)
   * 0.0 = laminar flow (ideal), 1.0 = turbulent (chaotic)
   * 
   * Derived from: calcReynoldsScore()
   * Used to control: black hole intensity, particle chaos, distortion
   */
  uVarianceIndex: Uniform0to1;
  
  /**
   * Scroll progress through the page
   * 0.0 = top, 1.0 = bottom
   */
  uProgress: Uniform0to1;
  
  /**
   * Current phase of the narrative
   * 0 = Thesis (chaos), 1 = Audit (calculation), 2 = Solution (fluidity)
   */
  uPhase: number;
  
  /**
   * Normalized mouse position
   * x: 0 = left, 1 = right
   * y: 0 = bottom, 1 = top
   */
  uMouse: Vector2;
}

/**
 * Cost component uniforms for visualization
 * Normalized values suitable for shader use
 */
export interface CostComponentUniforms {
  /**
   * Total Variance Tax (raw USD value)
   */
  uTotalTax: UniformUSD;
  
  /**
   * Component A: Recovery Cost (normalized)
   */
  uRecoveryCost: UniformUSD;
  
  /**
   * Component B: Detention Cost (normalized)
   */
  uDetentionCost: UniformUSD;
  
  /**
   * Component C: Labor Variance Cost (normalized)
   */
  uLaborCost: UniformUSD;
  
  /**
   * Component D: Chargeback Cost (normalized)
   */
  uChargebackCost: UniformUSD;
  
  /**
   * Component E: Working Capital Drag (normalized)
   */
  uWorkingCapitalDrag: UniformUSD;
  
  /**
   * Component F: Lost Sales Risk (normalized)
   */
  uLostSalesRisk: UniformUSD;
  
  /**
   * Synthetic Capacity unlock (0-1)
   */
  uSyntheticCapacity: Uniform0to1;
}

/**
 * Complete uniform set for the singularity visualization
 */
export interface SingularityShaderUniforms 
  extends BaseShaderUniforms, 
          VarianceShaderUniforms, 
          CostComponentUniforms {}

// ═══════════════════════════════════════════════════════════════════
// UNIFORM HELPERS
// ═══════════════════════════════════════════════════════════════════

/**
 * Create a Three.js uniform object
 */
export function createUniform<T>(value: T): { value: T } {
  return { value };
}

/**
 * Create uniform set for shaderMaterial
 */
export function createUniformSet<T extends Record<string, unknown>>(
  values: T
): { [K in keyof T]: { value: T[K] } } {
  const result = {} as { [K in keyof T]: { value: T[K] } };
  for (const key in values) {
    result[key] = { value: values[key] };
  }
  return result;
}

/**
 * Normalize a USD value to 0-1 range based on max expected value
 */
export function normalizeUSD(value: number, maxValue: number = 10000000): Uniform0to1 {
  if (maxValue <= 0) return 0;
  return Math.min(1, Math.max(0, value / maxValue));
}

/**
 * Normalize component percentages to shader-friendly format
 */
export function normalizeComponentPercentages(percentages: {
  recovery: number;
  detention: number;
  labor: number;
  chargeback: number;
  workingCapital: number;
  lostSales: number;
}): [number, number, number, number, number, number] {
  return [
    percentages.recovery / 100,
    percentages.detention / 100,
    percentages.labor / 100,
    percentages.chargeback / 100,
    percentages.workingCapital / 100,
    percentages.lostSales / 100,
  ];
}

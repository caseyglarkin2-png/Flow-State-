/**
 * Shader Uniform Types
 * 
 * TypeScript interfaces for shader uniforms used throughout
 * the Variance Tax visualization system.
 */

import type { Vector2, Vector3, Color } from 'three';

/**
 * Quality tier values for shader complexity branching
 */
export const QUALITY_TIER_VALUES = {
  low: 0,
  medium: 1,
  high: 2,
  ultra: 3,
} as const;

/**
 * Base uniforms shared across all shaders
 */
export interface BaseUniforms {
  /** Elapsed time in seconds */
  uTime: { value: number };
  /** Canvas resolution */
  uResolution: { value: Vector2 };
  /** Quality tier (0=low, 1=medium, 2=high, 3=ultra) */
  uQualityTier: { value: number };
}

/**
 * Uniforms for the variance visualization (black hole/chaos)
 */
export interface VarianceUniforms extends BaseUniforms {
  /** Variance index: 0.0 = order/fluidity, 1.0 = chaos/variance */
  uVarianceIndex: { value: number };
  /** Scroll progress 0-1 */
  uProgress: { value: number };
  /** Primary color (brand neon/cerulean) */
  uColorPrimary: { value: Color | Vector3 };
  /** Secondary color (ember/freightroll) */
  uColorSecondary: { value: Color | Vector3 };
  /** Event horizon radius */
  uHorizonRadius: { value: number };
  /** Distortion intensity */
  uDistortion: { value: number };
}

/**
 * Uniforms for the network visualization (fluidity/order)
 */
export interface NetworkUniforms extends BaseUniforms {
  /** Variance index: 0.0 = order/fluidity, 1.0 = chaos/variance */
  uVarianceIndex: { value: number };
  /** Connection opacity */
  uConnectionOpacity: { value: number };
  /** Node pulse speed */
  uPulseSpeed: { value: number };
  /** Network node color */
  uNodeColor: { value: Color | Vector3 };
  /** Connection line color */
  uLineColor: { value: Color | Vector3 };
}

/**
 * Uniforms for transition/dissolve effects
 */
export interface TransitionUniforms extends BaseUniforms {
  /** Transition progress 0-1 */
  uProgress: { value: number };
  /** Dissolve noise scale */
  uNoiseScale: { value: number };
  /** Edge glow color */
  uEdgeColor: { value: Color | Vector3 };
  /** Edge thickness */
  uEdgeWidth: { value: number };
}

/**
 * Combined uniforms for the main singularity scene
 */
export interface SingularityUniforms extends BaseUniforms {
  /** Variance index: 0.0 = order/fluidity, 1.0 = chaos/variance */
  uVarianceIndex: { value: number };
  /** Scroll progress 0-1 */
  uProgress: { value: number };
  /** Current phase (0=thesis, 1=audit, 2=solution) */
  uPhase: { value: number };
  /** Mouse position normalized */
  uMouse: { value: Vector2 };
  /** Cost components (A-F from Variance Tax) */
  uCostRecovery: { value: number };
  uCostDetention: { value: number };
  uCostLabor: { value: number };
  uCostChargeback: { value: number };
  uCostWorkingCapital: { value: number };
  uCostLostSales: { value: number };
  /** Total variance tax (sum of components) */
  uTotalVarianceTax: { value: number };
}

/**
 * Helper to create uniform object with initial value
 */
export function createUniform<T>(value: T): { value: T } {
  return { value };
}

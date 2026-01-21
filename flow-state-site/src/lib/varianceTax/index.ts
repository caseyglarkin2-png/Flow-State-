/**
 * Variance Tax Module Exports
 * 
 * Public API for the Variance Tax calculator.
 */

// Types
export type {
  VarianceTaxInputs,
  VarianceTaxOutputs,
  LaborBreakdown,
  VarianceTaxPreset,
  ValidationResult,
} from './types';

// Calculator
export { calcVarianceTax } from './calculator';

// Formulas (for direct access if needed)
export {
  calcRecoveryCost,
  calcDetentionCost,
  calcLaborVarianceCost,
  calcChargebackCost,
  calcWorkingCapitalDrag,
  calcLostSalesRisk,
  calcSyntheticCapacity,
  calcReynoldsScore,
} from './formulas';

// Defaults and presets
export {
  DEFAULT_INPUTS,
  INPUT_CONSTRAINTS,
  PRESETS,
  getPreset,
  applyPreset,
} from './defaults';

// Store and hooks
export {
  useVarianceTaxStore,
  useVarianceTaxOutputs,
  useReynoldsScore,
  useShaderUniforms,
  useFormattedOutputs,
  usePresets,
} from './store';

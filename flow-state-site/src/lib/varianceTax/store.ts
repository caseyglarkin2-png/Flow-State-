/**
 * Variance Tax Calculator Store
 * 
 * Zustand store for managing calculator state with:
 * - Input persistence to localStorage
 * - Derived calculations
 * - Preset loading
 * - Shader uniform binding
 */

import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import type { VarianceTaxInputs, VarianceTaxOutputs, ValidationResult } from './types';
import { DEFAULT_INPUTS, INPUT_CONSTRAINTS, PRESETS, applyPreset } from './defaults';
import { calcVarianceTax } from './calculator';

// ═══════════════════════════════════════════════════════════════════
// STORE STATE & ACTIONS
// ═══════════════════════════════════════════════════════════════════

interface VarianceTaxState {
  /** Current input values */
  inputs: VarianceTaxInputs;
  /** Calculated outputs (derived from inputs) */
  outputs: VarianceTaxOutputs;
  /** Current preset ID (if any) */
  activePresetId: string | null;
  /** Whether inputs have been modified from preset */
  isModified: boolean;
  /** Last calculation timestamp */
  calculatedAt: number;
}

interface VarianceTaxActions {
  /** Update a single input field */
  setInput: <K extends keyof VarianceTaxInputs>(key: K, value: VarianceTaxInputs[K]) => void;
  /** Update multiple input fields at once */
  setInputs: (partialInputs: Partial<VarianceTaxInputs>) => void;
  /** Load a preset by ID */
  loadPreset: (presetId: string) => void;
  /** Reset to default inputs */
  reset: () => void;
  /** Recalculate outputs (usually automatic) */
  recalculate: () => void;
  /** Validate current inputs */
  validate: () => ValidationResult;
}

type VarianceTaxStore = VarianceTaxState & VarianceTaxActions;

// ═══════════════════════════════════════════════════════════════════
// VALIDATION
// ═══════════════════════════════════════════════════════════════════

/**
 * Validate inputs against constraints
 */
function validateInputs(inputs: VarianceTaxInputs): ValidationResult {
  const errors: ValidationResult['errors'] = [];
  
  for (const [key, constraints] of Object.entries(INPUT_CONSTRAINTS)) {
    const field = key as keyof VarianceTaxInputs;
    const value = inputs[field];
    
    if (typeof value !== 'number' || !isFinite(value)) {
      errors.push({ field, message: `${key} must be a valid number` });
      continue;
    }
    
    if (value < constraints.min) {
      errors.push({ field, message: `${key} must be at least ${constraints.min}` });
    }
    
    if (value > constraints.max) {
      errors.push({ field, message: `${key} must be at most ${constraints.max}` });
    }
  }
  
  // Additional cross-field validations
  if (inputs.digitalCheckInMinutes >= inputs.manualCheckInMinutes) {
    errors.push({ 
      field: 'digitalCheckInMinutes', 
      message: 'Digital check-in should be faster than manual' 
    });
  }
  
  if (inputs.targetTurnTimeMinutes >= inputs.currentTurnTimeMinutes) {
    errors.push({ 
      field: 'targetTurnTimeMinutes', 
      message: 'Target turn time should be less than current' 
    });
  }
  
  if (inputs.freeTime > inputs.averageDwellTime) {
    // Not an error, but unusual - no detention would occur
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

// ═══════════════════════════════════════════════════════════════════
// STORE IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate initial outputs
 */
const initialOutputs = calcVarianceTax(DEFAULT_INPUTS);

/**
 * Variance Tax Calculator Store
 */
export const useVarianceTaxStore = create<VarianceTaxStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // Initial state
        inputs: DEFAULT_INPUTS,
        outputs: initialOutputs,
        activePresetId: 'mid-market',
        isModified: false,
        calculatedAt: Date.now(),
        
        // Actions
        setInput: (key, value) => {
          const newInputs = { ...get().inputs, [key]: value };
          const newOutputs = calcVarianceTax(newInputs);
          set({
            inputs: newInputs,
            outputs: newOutputs,
            isModified: true,
            calculatedAt: Date.now(),
          });
        },
        
        setInputs: (partialInputs) => {
          const newInputs = { ...get().inputs, ...partialInputs };
          const newOutputs = calcVarianceTax(newInputs);
          set({
            inputs: newInputs,
            outputs: newOutputs,
            isModified: true,
            calculatedAt: Date.now(),
          });
        },
        
        loadPreset: (presetId) => {
          const newInputs = applyPreset(presetId);
          const newOutputs = calcVarianceTax(newInputs);
          set({
            inputs: newInputs,
            outputs: newOutputs,
            activePresetId: presetId,
            isModified: false,
            calculatedAt: Date.now(),
          });
        },
        
        reset: () => {
          set({
            inputs: DEFAULT_INPUTS,
            outputs: initialOutputs,
            activePresetId: 'mid-market',
            isModified: false,
            calculatedAt: Date.now(),
          });
        },
        
        recalculate: () => {
          const newOutputs = calcVarianceTax(get().inputs);
          set({
            outputs: newOutputs,
            calculatedAt: Date.now(),
          });
        },
        
        validate: () => validateInputs(get().inputs),
      }),
      {
        name: 'variance-tax-calculator',
        version: 1,
        partialize: (state) => ({
          inputs: state.inputs,
          activePresetId: state.activePresetId,
        }),
        onRehydrateStorage: () => (state) => {
          // Recalculate outputs after rehydration
          if (state) {
            state.recalculate();
          }
        },
      }
    )
  )
);

// ═══════════════════════════════════════════════════════════════════
// SELECTOR HOOKS
// ═══════════════════════════════════════════════════════════════════

/**
 * Get current outputs from the calculator
 */
export function useVarianceTaxOutputs(): VarianceTaxOutputs {
  return useVarianceTaxStore((s) => s.outputs);
}

/**
 * Get current Reynolds score for shader binding
 */
export function useReynoldsScore(): number {
  return useVarianceTaxStore((s) => s.outputs.reynoldsScore);
}

/**
 * Get shader uniforms derived from calculator state
 */
export function useShaderUniforms() {
  return useVarianceTaxStore((s) => ({
    uVarianceIndex: s.outputs.reynoldsScore,
    uTotalTax: s.outputs.totalVarianceTax,
    uRecoveryCost: s.outputs.recoveryCost,
    uDetentionCost: s.outputs.detentionCost,
    uLaborCost: s.outputs.laborVarianceCost,
    uChargebackCost: s.outputs.chargebackCost,
    uWorkingCapitalDrag: s.outputs.workingCapitalDrag,
    uLostSalesRisk: s.outputs.lostSalesRisk,
    uSyntheticCapacity: s.outputs.syntheticCapacityPercent / 100, // Normalize to 0-1
  }));
}

/**
 * Get formatted display values
 */
export function useFormattedOutputs() {
  const outputs = useVarianceTaxStore((s) => s.outputs);
  
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  
  const formatPercent = (value: number) => 
    `${value.toFixed(1)}%`;
  
  return {
    totalVarianceTax: formatCurrency(outputs.totalVarianceTax),
    recoveryCost: formatCurrency(outputs.recoveryCost),
    detentionCost: formatCurrency(outputs.detentionCost),
    laborVarianceCost: formatCurrency(outputs.laborVarianceCost),
    chargebackCost: formatCurrency(outputs.chargebackCost),
    workingCapitalDrag: formatCurrency(outputs.workingCapitalDrag),
    lostSalesRisk: formatCurrency(outputs.lostSalesRisk),
    costPerLoad: formatCurrency(outputs.costPerLoad),
    monthlyRunRate: formatCurrency(outputs.monthlyRunRate),
    syntheticCapacity: formatPercent(outputs.syntheticCapacityPercent),
    reynoldsScore: outputs.reynoldsScore.toFixed(2),
    componentPercentages: {
      recovery: formatPercent(outputs.componentPercentages.recovery),
      detention: formatPercent(outputs.componentPercentages.detention),
      labor: formatPercent(outputs.componentPercentages.labor),
      chargeback: formatPercent(outputs.componentPercentages.chargeback),
      workingCapital: formatPercent(outputs.componentPercentages.workingCapital),
      lostSales: formatPercent(outputs.componentPercentages.lostSales),
    },
  };
}

/**
 * Get available presets
 */
export function usePresets() {
  const activePresetId = useVarianceTaxStore((s) => s.activePresetId);
  const loadPreset = useVarianceTaxStore((s) => s.loadPreset);
  
  return {
    presets: PRESETS,
    activePresetId,
    loadPreset,
  };
}

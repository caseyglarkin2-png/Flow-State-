/**
 * Default Input Values for Variance Tax Calculator
 * 
 * These defaults represent a typical mid-market shipper profile
 * and serve as the baseline for scenarios.
 * 
 * @see /docs/variance-tax-model-reconciliation.md for sources
 */

import type { VarianceTaxInputs, VarianceTaxPreset } from './types';

/**
 * Default input values for the Variance Tax calculator
 */
export const DEFAULT_INPUTS: VarianceTaxInputs = {
  // Volume & Throughput
  annualLoadVolume: 20000,
  missedAppointmentRate: 0.05,
  spotPremium: 450,
  
  // Dwell Time & Detention
  averageDwellTime: 4.0,
  freeTime: 2.0,
  detentionRate: 75,
  detentionFrequency: 0.15,
  
  // Labor Costs
  laborRateGuard: 30,
  laborRateJockey: 25,
  manualCheckInMinutes: 15,
  digitalCheckInMinutes: 2,
  yardHuntingFrequency: 0.10,
  yardHuntingMinutes: 20,
  
  // Compliance & Chargebacks
  chargebackRate: 0.03,
  complianceFailureRate: 0.03,
  averageInvoiceValue: 25000,
  
  // Working Capital
  safetyStockDays: 5,
  dailyInventoryValue: 100000,
  holdingCostRate: 0.25,
  
  // Lost Sales Risk
  stockoutRisk: 0.02,
  annualRevenue: 50000000,
  marginImpact: 0.5,
  
  // Turn Time
  currentTurnTimeMinutes: 48,
  targetTurnTimeMinutes: 24,
};

/**
 * Input field constraints for validation and UI
 */
export const INPUT_CONSTRAINTS: Record<keyof VarianceTaxInputs, { min: number; max: number; step: number }> = {
  annualLoadVolume: { min: 1000, max: 1000000, step: 1000 },
  missedAppointmentRate: { min: 0, max: 0.5, step: 0.01 },
  spotPremium: { min: 100, max: 2000, step: 50 },
  
  averageDwellTime: { min: 0.5, max: 12, step: 0.5 },
  freeTime: { min: 0, max: 6, step: 0.5 },
  detentionRate: { min: 25, max: 200, step: 5 },
  detentionFrequency: { min: 0, max: 0.5, step: 0.01 },
  
  laborRateGuard: { min: 15, max: 75, step: 1 },
  laborRateJockey: { min: 15, max: 60, step: 1 },
  manualCheckInMinutes: { min: 5, max: 45, step: 1 },
  digitalCheckInMinutes: { min: 1, max: 10, step: 1 },
  yardHuntingFrequency: { min: 0, max: 0.5, step: 0.01 },
  yardHuntingMinutes: { min: 5, max: 60, step: 5 },
  
  chargebackRate: { min: 0, max: 0.15, step: 0.005 },
  complianceFailureRate: { min: 0, max: 0.2, step: 0.005 },
  averageInvoiceValue: { min: 5000, max: 100000, step: 1000 },
  
  safetyStockDays: { min: 0, max: 30, step: 1 },
  dailyInventoryValue: { min: 10000, max: 1000000, step: 10000 },
  holdingCostRate: { min: 0.1, max: 0.4, step: 0.01 },
  
  stockoutRisk: { min: 0, max: 0.1, step: 0.005 },
  annualRevenue: { min: 10000000, max: 500000000, step: 5000000 },
  marginImpact: { min: 0.1, max: 1.0, step: 0.05 },
  
  currentTurnTimeMinutes: { min: 15, max: 120, step: 5 },
  targetTurnTimeMinutes: { min: 10, max: 60, step: 5 },
};

/**
 * Preset scenarios for quick configuration
 */
export const PRESETS: VarianceTaxPreset[] = [
  {
    id: 'mid-market',
    name: 'Mid-Market Shipper',
    description: '20K loads/year, typical yard operations',
    inputs: DEFAULT_INPUTS,
  },
  {
    id: 'enterprise-50',
    name: 'Enterprise (50 Facilities)',
    description: '200K loads/year across 50 DCs',
    inputs: {
      annualLoadVolume: 200000,
      averageDwellTime: 5.0,
      detentionFrequency: 0.20,
      yardHuntingFrequency: 0.15,
      safetyStockDays: 7,
      dailyInventoryValue: 500000,
      annualRevenue: 500000000,
    },
  },
  {
    id: 'high-velocity',
    name: 'High-Velocity DC',
    description: 'Cross-dock with tight turn times',
    inputs: {
      annualLoadVolume: 50000,
      averageDwellTime: 2.5,
      freeTime: 1.5,
      detentionFrequency: 0.25,
      manualCheckInMinutes: 10,
      currentTurnTimeMinutes: 30,
      targetTurnTimeMinutes: 15,
    },
  },
  {
    id: 'low-tech',
    name: 'Paper-Based Operations',
    description: 'Manual processes, high variance',
    inputs: {
      manualCheckInMinutes: 25,
      digitalCheckInMinutes: 5,
      yardHuntingFrequency: 0.25,
      yardHuntingMinutes: 35,
      complianceFailureRate: 0.08,
      averageDwellTime: 6.0,
      missedAppointmentRate: 0.10,
    },
  },
  {
    id: 'retail-compliance',
    name: 'Retail OTIF Focus',
    description: 'High chargeback pressure from retailers',
    inputs: {
      chargebackRate: 0.05,
      complianceFailureRate: 0.05,
      averageInvoiceValue: 40000,
      missedAppointmentRate: 0.08,
      stockoutRisk: 0.04,
    },
  },
];

/**
 * Get a preset by ID
 */
export function getPreset(id: string): VarianceTaxPreset | undefined {
  return PRESETS.find(p => p.id === id);
}

/**
 * Apply preset to default inputs
 */
export function applyPreset(presetId: string): VarianceTaxInputs {
  const preset = getPreset(presetId);
  if (!preset) return DEFAULT_INPUTS;
  return { ...DEFAULT_INPUTS, ...preset.inputs };
}

/**
 * Component B: Detention Cost
 * 
 * Calculates the cost of carrier detention charges
 * when dwell time exceeds free time allowance.
 */

import type { VarianceTaxInputs } from '../types';

/**
 * Calculate Detention Cost (Component B)
 * 
 * Formula: annualLoadVolume × detentionFrequency × max(0, averageDwellTime - freeTime) × detentionRate
 * 
 * @param inputs - Calculator inputs
 * @returns Detention cost in USD/year, or 0 for invalid inputs
 */
export function calcDetentionCost(inputs: Pick<VarianceTaxInputs, 'annualLoadVolume' | 'detentionFrequency' | 'averageDwellTime' | 'freeTime' | 'detentionRate'>): number {
  const { annualLoadVolume, detentionFrequency, averageDwellTime, freeTime, detentionRate } = inputs;
  
  // Validate inputs
  if (!isFinite(annualLoadVolume) || annualLoadVolume < 0) return 0;
  if (!isFinite(detentionFrequency) || detentionFrequency < 0) return 0;
  if (!isFinite(averageDwellTime) || averageDwellTime < 0) return 0;
  if (!isFinite(freeTime) || freeTime < 0) return 0;
  if (!isFinite(detentionRate) || detentionRate < 0) return 0;
  
  // Only charge for time exceeding free time
  const chargeableHours = Math.max(0, averageDwellTime - freeTime);
  
  // Calculate detention cost
  const cost = annualLoadVolume * detentionFrequency * chargeableHours * detentionRate;
  
  return Math.max(0, cost);
}

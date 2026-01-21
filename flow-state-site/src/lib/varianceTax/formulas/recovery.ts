/**
 * Component A: Recovery Cost (Premium Freight)
 * 
 * Calculates the cost of recovering from missed appointments
 * by paying premium/spot freight rates.
 */

import type { VarianceTaxInputs } from '../types';

/**
 * Calculate Recovery Cost (Component A)
 * 
 * Formula: annualLoadVolume × missedAppointmentRate × spotPremium
 * 
 * @param inputs - Calculator inputs
 * @returns Recovery cost in USD/year, or 0 for invalid inputs
 */
export function calcRecoveryCost(inputs: Pick<VarianceTaxInputs, 'annualLoadVolume' | 'missedAppointmentRate' | 'spotPremium'>): number {
  const { annualLoadVolume, missedAppointmentRate, spotPremium } = inputs;
  
  // Validate inputs
  if (!isFinite(annualLoadVolume) || annualLoadVolume < 0) return 0;
  if (!isFinite(missedAppointmentRate) || missedAppointmentRate < 0) return 0;
  if (!isFinite(spotPremium) || spotPremium < 0) return 0;
  
  // Calculate recovery cost
  const cost = annualLoadVolume * missedAppointmentRate * spotPremium;
  
  return Math.max(0, cost);
}

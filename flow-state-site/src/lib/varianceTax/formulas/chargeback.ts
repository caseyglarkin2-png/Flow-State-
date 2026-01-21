/**
 * Component D: Chargeback Cost (OTIF Penalties)
 * 
 * Calculates the cost of OTIF failures and
 * resulting chargebacks from customers.
 */

import type { VarianceTaxInputs } from '../types';

/**
 * Calculate Chargeback Cost (Component D)
 * 
 * Formula: annualLoadVolume × complianceFailureRate × averageInvoiceValue × chargebackRate
 * 
 * @param inputs - Calculator inputs
 * @returns Chargeback cost in USD/year, or 0 for invalid inputs
 */
export function calcChargebackCost(inputs: Pick<VarianceTaxInputs, 'annualLoadVolume' | 'complianceFailureRate' | 'averageInvoiceValue' | 'chargebackRate'>): number {
  const { annualLoadVolume, complianceFailureRate, averageInvoiceValue, chargebackRate } = inputs;
  
  // Validate inputs
  if (!isFinite(annualLoadVolume) || annualLoadVolume < 0) return 0;
  if (!isFinite(complianceFailureRate) || complianceFailureRate < 0) return 0;
  if (!isFinite(averageInvoiceValue) || averageInvoiceValue < 0) return 0;
  if (!isFinite(chargebackRate) || chargebackRate < 0) return 0;
  
  // Calculate chargeback cost
  const cost = annualLoadVolume * complianceFailureRate * averageInvoiceValue * chargebackRate;
  
  return Math.max(0, cost);
}

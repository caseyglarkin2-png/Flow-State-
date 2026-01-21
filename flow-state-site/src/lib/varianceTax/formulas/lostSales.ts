/**
 * Component F: Lost Sales Risk
 * 
 * Calculates the revenue at risk from stockouts
 * caused by yard inefficiency.
 */

import type { VarianceTaxInputs } from '../types';

/**
 * Calculate Lost Sales Risk (Component F)
 * 
 * Formula: annualRevenue × stockoutRisk × marginImpact
 * 
 * @param inputs - Calculator inputs
 * @returns Lost sales risk in USD/year, or 0 for invalid inputs
 */
export function calcLostSalesRisk(inputs: Pick<VarianceTaxInputs, 'annualRevenue' | 'stockoutRisk' | 'marginImpact'>): number {
  const { annualRevenue, stockoutRisk, marginImpact } = inputs;
  
  // Validate inputs
  if (!isFinite(annualRevenue) || annualRevenue < 0) return 0;
  if (!isFinite(stockoutRisk) || stockoutRisk < 0) return 0;
  if (!isFinite(marginImpact) || marginImpact < 0) return 0;
  
  // Calculate lost sales risk
  const cost = annualRevenue * stockoutRisk * marginImpact;
  
  return Math.max(0, cost);
}

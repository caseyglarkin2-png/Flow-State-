/**
 * Component E: Working Capital Drag
 * 
 * Calculates the cost of holding excess safety stock
 * due to yard variability.
 */

import type { VarianceTaxInputs } from '../types';

/**
 * Calculate Working Capital Drag (Component E)
 * 
 * Formula: safetyStockDays × dailyInventoryValue × holdingCostRate
 * 
 * @param inputs - Calculator inputs
 * @returns Working capital drag in USD/year, or 0 for invalid inputs
 */
export function calcWorkingCapitalDrag(inputs: Pick<VarianceTaxInputs, 'safetyStockDays' | 'dailyInventoryValue' | 'holdingCostRate'>): number {
  const { safetyStockDays, dailyInventoryValue, holdingCostRate } = inputs;
  
  // Validate inputs
  if (!isFinite(safetyStockDays) || safetyStockDays < 0) return 0;
  if (!isFinite(dailyInventoryValue) || dailyInventoryValue < 0) return 0;
  if (!isFinite(holdingCostRate) || holdingCostRate < 0) return 0;
  
  // Calculate working capital drag
  const cost = safetyStockDays * dailyInventoryValue * holdingCostRate;
  
  return Math.max(0, cost);
}

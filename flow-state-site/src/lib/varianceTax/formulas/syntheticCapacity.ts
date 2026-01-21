/**
 * Synthetic Capacity Calculation
 * 
 * Calculates the percentage of capacity unlocked
 * by reducing turn time.
 */

/**
 * Calculate Synthetic Capacity Percentage
 * 
 * Formula: ((currentTurnTime - targetTurnTime) / currentTurnTime) × 100
 * 
 * @param currentTurnTime - Current average turn time in minutes
 * @param targetTurnTime - Target turn time with optimization
 * @returns Percentage of synthetic capacity (e.g., 50 = 50%)
 */
export function calcSyntheticCapacity(currentTurnTime: number, targetTurnTime: number): number {
  // Validate inputs
  if (!isFinite(currentTurnTime) || currentTurnTime <= 0) return 0;
  if (!isFinite(targetTurnTime) || targetTurnTime < 0) return 0;
  
  // If target >= current, no capacity unlock
  if (targetTurnTime >= currentTurnTime) return 0;
  
  // Calculate percentage improvement
  const improvement = (currentTurnTime - targetTurnTime) / currentTurnTime;
  
  return Math.max(0, Math.min(100, improvement * 100));
}

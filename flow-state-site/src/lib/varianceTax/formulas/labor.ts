/**
 * Component C: Labor Variance Cost (Viscosity Cost)
 * 
 * Calculates the labor cost waste from manual processes
 * and yard hunting inefficiencies.
 */

import type { VarianceTaxInputs, LaborBreakdown } from '../types';

/**
 * Calculate Labor Variance Cost (Component C)
 * 
 * Formula:
 * - gateWaste = annualLoadVolume × ((manualCheckInMinutes - digitalCheckInMinutes) / 60) × laborRateGuard
 * - huntWaste = annualLoadVolume × yardHuntingFrequency × (yardHuntingMinutes / 60) × laborRateJockey
 * - total = gateWaste + huntWaste
 * 
 * @param inputs - Calculator inputs
 * @returns Labor breakdown with gate waste, hunt waste, and total
 */
export function calcLaborVarianceCost(inputs: Pick<VarianceTaxInputs, 
  'annualLoadVolume' | 'manualCheckInMinutes' | 'digitalCheckInMinutes' | 
  'laborRateGuard' | 'yardHuntingFrequency' | 'yardHuntingMinutes' | 'laborRateJockey'
>): LaborBreakdown {
  const {
    annualLoadVolume,
    manualCheckInMinutes,
    digitalCheckInMinutes,
    laborRateGuard,
    yardHuntingFrequency,
    yardHuntingMinutes,
    laborRateJockey,
  } = inputs;
  
  // Default result for invalid inputs
  const zeroResult: LaborBreakdown = { gateWaste: 0, huntWaste: 0, total: 0 };
  
  // Validate inputs
  if (!isFinite(annualLoadVolume) || annualLoadVolume < 0) return zeroResult;
  if (!isFinite(manualCheckInMinutes) || manualCheckInMinutes < 0) return zeroResult;
  if (!isFinite(digitalCheckInMinutes) || digitalCheckInMinutes < 0) return zeroResult;
  if (!isFinite(laborRateGuard) || laborRateGuard < 0) return zeroResult;
  if (!isFinite(yardHuntingFrequency) || yardHuntingFrequency < 0) return zeroResult;
  if (!isFinite(yardHuntingMinutes) || yardHuntingMinutes < 0) return zeroResult;
  if (!isFinite(laborRateJockey) || laborRateJockey < 0) return zeroResult;
  
  // Gate waste: time saved by digital vs manual, per load
  const gateWasteMinutes = Math.max(0, manualCheckInMinutes - digitalCheckInMinutes);
  const gateWaste = annualLoadVolume * (gateWasteMinutes / 60) * laborRateGuard;
  
  // Hunt waste: time spent hunting for trailers
  const huntWaste = annualLoadVolume * yardHuntingFrequency * (yardHuntingMinutes / 60) * laborRateJockey;
  
  return {
    gateWaste: Math.max(0, gateWaste),
    huntWaste: Math.max(0, huntWaste),
    total: Math.max(0, gateWaste + huntWaste),
  };
}

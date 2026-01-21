/**
 * Reynolds Score Calculation
 * 
 * Derives a normalized 0-1 "Reynolds Score" from inputs
 * for binding to shader visualizations.
 * 
 * Higher score = more turbulent (worse) = more chaos
 * Lower score = more laminar (ideal) = more fluidity
 */

import type { VarianceTaxInputs } from '../types';

/**
 * Clamp a value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calculate Reynolds Score for shader binding
 * 
 * Formula:
 * - viscosityScore = (manualCheckInMinutes - digitalCheckInMinutes) / manualCheckInMinutes
 * - densityScore = clamp(averageDwellTime / 8, 0, 1)  // 8 hrs = max density
 * - velocityScore = clamp(annualLoadVolume / 100000, 0, 1)  // 100k = max velocity
 * - reynoldsScore = (viscosityScore × 0.5) + (densityScore × 0.3) + (velocityScore × 0.2)
 * 
 * @param inputs - Calculator inputs
 * @returns Reynolds score clamped between 0 and 1
 */
export function calcReynoldsScore(inputs: Pick<VarianceTaxInputs, 
  'manualCheckInMinutes' | 'digitalCheckInMinutes' | 'averageDwellTime' | 'annualLoadVolume'
>): number {
  const { manualCheckInMinutes, digitalCheckInMinutes, averageDwellTime, annualLoadVolume } = inputs;
  
  // Validate inputs - return 0.5 (neutral) for invalid
  if (!isFinite(manualCheckInMinutes) || manualCheckInMinutes <= 0) return 0.5;
  if (!isFinite(digitalCheckInMinutes) || digitalCheckInMinutes < 0) return 0.5;
  if (!isFinite(averageDwellTime) || averageDwellTime < 0) return 0.5;
  if (!isFinite(annualLoadVolume) || annualLoadVolume < 0) return 0.5;
  
  // Viscosity score: ratio of manual overhead
  // Higher manual vs digital = higher viscosity = more turbulent
  const viscosityScore = clamp(
    (manualCheckInMinutes - digitalCheckInMinutes) / manualCheckInMinutes,
    0,
    1
  );
  
  // Density score: dwell time normalized (8 hrs = max)
  // Higher dwell = more congestion = more turbulent
  const densityScore = clamp(averageDwellTime / 8, 0, 1);
  
  // Velocity score: volume normalized (100k = max)
  // Higher volume = more flow = contributes to turbulence at scale
  const velocityScore = clamp(annualLoadVolume / 100000, 0, 1);
  
  // Weighted combination
  const reynoldsScore = 
    (viscosityScore * 0.5) + 
    (densityScore * 0.3) + 
    (velocityScore * 0.2);
  
  return clamp(reynoldsScore, 0, 1);
}

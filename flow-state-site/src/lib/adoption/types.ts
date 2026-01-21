/**
 * Adoption % Types and Helpers
 * 
 * Adoption % represents the narrative adoption curve (Year 1: 5%, Year 2: 10-25%, etc.)
 * It is NOT used in formula inputs; it is narrative-only for UI copy.
 * 
 * See: docs/ADOPTION_SEMANTICS.md
 */

export interface NetworkCoverageModel {
  /**
   * Adoption percentage (narrative-only).
   * Range: 5-100 (no upper cap).
   * Used for UI copy: "Modeling XX of YY facilities"
   * NOT used in economics formula inputs.
   */
  adoptionPercent: number;

  /** Scenario name */
  scenarioName: 'Deep Model' | 'Moderate' | 'Aggressive' | 'Inflection' | 'Custom';

  /** Human-readable description */
  description: string;
}

/**
 * Adoption presets used across ROI and Diagnostic pages
 */
export const ADOPTION_PRESETS = {
  Year1Conservative: {
    adoptionPercent: 5,
    scenarioName: 'Deep Model' as const,
    description: '5% Year 1 (Deep Model default)',
  },
  Year1Moderate: {
    adoptionPercent: 10,
    scenarioName: 'Moderate' as const,
    description: '10% Year 1 (moderate rollout)',
  },
  Year2Aggressive: {
    adoptionPercent: 25,
    scenarioName: 'Aggressive' as const,
    description: '25% Year 2 (aggressive)',
  },
  Year3Transformation: {
    adoptionPercent: 50,
    scenarioName: 'Inflection' as const,
    description: '50% Year 3 (network inflection)',
  },
};

/**
 * Calculate facilities in scope given total facilities and adoption %
 * 
 * Formula: inScope = Math.round(total × adoption / 100)
 * 
 * Examples:
 *   facilitiesInScope(260, 5) = 13 (Primo, 5% adoption)
 *   facilitiesInScope(260, 25) = 65 (Primo, 25% adoption)
 *   facilitiesInScope(1000000, 25) = 250000 (1M facilities, 25% adoption)
 * 
 * @param totalFacilities Total facilities in network (no upper cap)
 * @param adoptionPercent Adoption percentage (narrative-only)
 * @returns Facilities in scope (rounded)
 */
export function facilitiesInScope(
  totalFacilities: number,
  adoptionPercent: number,
): number {
  if (!Number.isFinite(totalFacilities) || totalFacilities < 1) {
    return 0;
  }

  if (totalFacilities > 1_000_000_000) {
    console.warn(
      `facilitiesInScope: totalFacilities=${totalFacilities} exceeds 1B; precision may degrade`,
    );
  }

  return Math.round(totalFacilities * (adoptionPercent / 100));
}

/**
 * Format a facility count with thousand separators
 * 
 * Examples:
 *   formatFacilityCount(13) = "13"
 *   formatFacilityCount(260) = "260"
 *   formatFacilityCount(1000) = "1,000"
 *   formatFacilityCount(1000000) = "1,000,000"
 * 
 * @param count Facility count
 * @returns Formatted string with locale commas
 */
export function formatFacilityCount(count: number): string {
  return count.toLocaleString('en-US', {
    useGrouping: true,
  });
}

/**
 * Build adoption narrative copy
 * 
 * Example:
 *   buildAdoptionCopy(260, 5) = "Modeling 13 of 260 facilities"
 * 
 * @param totalFacilities Total facilities in network
 * @param adoptionPercent Adoption percentage
 * @returns Formatted narrative copy string
 */
export function buildAdoptionCopy(totalFacilities: number, adoptionPercent: number): string {
  const inScope = facilitiesInScope(totalFacilities, adoptionPercent);
  const formattedInScope = formatFacilityCount(inScope);
  const formattedTotal = formatFacilityCount(totalFacilities);

  return `Modeling ${formattedInScope} of ${formattedTotal} facilities`;
}

/**
 * Get adoption preset by name
 * 
 * @param presetName Preset key (e.g., 'Year1Conservative')
 * @returns NetworkCoverageModel or undefined if not found
 */
export function getAdoptionPreset(
  presetName: keyof typeof ADOPTION_PRESETS,
): NetworkCoverageModel | undefined {
  return ADOPTION_PRESETS[presetName];
}

/**
 * List all adoption presets
 * 
 * @returns Array of all adoption presets
 */
export function listAdoptionPresets(): NetworkCoverageModel[] {
  return Object.values(ADOPTION_PRESETS);
}

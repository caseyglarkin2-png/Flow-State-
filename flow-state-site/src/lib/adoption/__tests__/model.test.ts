import { describe, it, expect } from 'vitest';
import {
  facilitiesInScope,
  formatFacilityCount,
  buildAdoptionCopy,
  getAdoptionPreset,
  listAdoptionPresets,
  ADOPTION_PRESETS,
} from '../types';

describe('NetworkCoverageModel (Adoption helpers)', () => {
  describe('facilitiesInScope', () => {
    it('should handle small facility counts', () => {
      expect(facilitiesInScope(1, 5)).toBe(0); // 1 * 5% = 0.05 → 0 (rounded)
      expect(facilitiesInScope(10, 5)).toBe(1); // 10 * 5% = 0.5 → 1 (rounded)
      expect(facilitiesInScope(10, 25)).toBe(3); // 10 * 25% = 2.5 → 3 (rounded)
    });

    it('should handle Primo (260 facilities) correctly', () => {
      expect(facilitiesInScope(260, 5)).toBe(13); // 260 * 0.05 = 13
      expect(facilitiesInScope(260, 10)).toBe(26); // 260 * 0.10 = 26
      expect(facilitiesInScope(260, 25)).toBe(65); // 260 * 0.25 = 65
      expect(facilitiesInScope(260, 50)).toBe(130); // 260 * 0.50 = 130
    });

    it('should handle medium-scale networks', () => {
      expect(facilitiesInScope(10000, 10)).toBe(1000);
      expect(facilitiesInScope(10000, 25)).toBe(2500);
    });

    it('should handle massive scale (1M+ facilities)', () => {
      expect(facilitiesInScope(1000000, 5)).toBe(50000);
      expect(facilitiesInScope(1000000, 25)).toBe(250000);
      expect(facilitiesInScope(1000000, 50)).toBe(500000);
    });

    it('should handle edge cases', () => {
      expect(facilitiesInScope(0, 5)).toBe(0);
      expect(facilitiesInScope(1, 100)).toBe(1);
      expect(facilitiesInScope(260, 100)).toBe(260);
    });

    it('should maintain precision at large numbers', () => {
      // Test: 1,000,000 facilities at 5% should equal 50,000 (no rounding error)
      const result = facilitiesInScope(1000000, 5);
      expect(result).toBe(50000);
      expect(result).toEqual(1000000 * 0.05); // Exact match
    });
  });

  describe('formatFacilityCount', () => {
    it('should format small numbers without commas', () => {
      expect(formatFacilityCount(1)).toBe('1');
      expect(formatFacilityCount(10)).toBe('10');
      expect(formatFacilityCount(99)).toBe('99');
    });

    it('should format thousands with commas', () => {
      expect(formatFacilityCount(260)).toBe('260');
      expect(formatFacilityCount(1000)).toBe('1,000');
      expect(formatFacilityCount(13000)).toBe('13,000');
    });

    it('should format millions with commas', () => {
      expect(formatFacilityCount(1000000)).toBe('1,000,000');
      expect(formatFacilityCount(250000)).toBe('250,000');
      expect(formatFacilityCount(5000000)).toBe('5,000,000');
    });
  });

  describe('buildAdoptionCopy', () => {
    it('should build correct copy for Primo scenarios', () => {
      expect(buildAdoptionCopy(260, 5)).toBe('Modeling 13 of 260 facilities');
      expect(buildAdoptionCopy(260, 10)).toBe('Modeling 26 of 260 facilities');
      expect(buildAdoptionCopy(260, 25)).toBe('Modeling 65 of 260 facilities');
      expect(buildAdoptionCopy(260, 50)).toBe('Modeling 130 of 260 facilities');
    });

    it('should build correct copy for large networks', () => {
      expect(buildAdoptionCopy(1000000, 5)).toBe('Modeling 50,000 of 1,000,000 facilities');
      expect(buildAdoptionCopy(1000000, 25)).toBe('Modeling 250,000 of 1,000,000 facilities');
    });

    it('should format with commas where appropriate', () => {
      const copy = buildAdoptionCopy(10000, 10);
      expect(copy).toBe('Modeling 1,000 of 10,000 facilities');
      expect(copy).toContain(',');
    });
  });

  describe('ADOPTION_PRESETS', () => {
    it('should have all expected presets', () => {
      expect(ADOPTION_PRESETS.Year1Conservative).toBeDefined();
      expect(ADOPTION_PRESETS.Year1Moderate).toBeDefined();
      expect(ADOPTION_PRESETS.Year2Aggressive).toBeDefined();
      expect(ADOPTION_PRESETS.Year3Transformation).toBeDefined();
    });

    it('should have correct adoption percentages', () => {
      expect(ADOPTION_PRESETS.Year1Conservative.adoptionPercent).toBe(5);
      expect(ADOPTION_PRESETS.Year1Moderate.adoptionPercent).toBe(10);
      expect(ADOPTION_PRESETS.Year2Aggressive.adoptionPercent).toBe(25);
      expect(ADOPTION_PRESETS.Year3Transformation.adoptionPercent).toBe(50);
    });

    it('should have correct scenario names', () => {
      expect(ADOPTION_PRESETS.Year1Conservative.scenarioName).toBe('Deep Model');
      expect(ADOPTION_PRESETS.Year1Moderate.scenarioName).toBe('Moderate');
      expect(ADOPTION_PRESETS.Year2Aggressive.scenarioName).toBe('Aggressive');
      expect(ADOPTION_PRESETS.Year3Transformation.scenarioName).toBe('Inflection');
    });
  });

  describe('getAdoptionPreset', () => {
    it('should retrieve preset by name', () => {
      const preset = getAdoptionPreset('Year1Conservative');
      expect(preset?.adoptionPercent).toBe(5);
      expect(preset?.scenarioName).toBe('Deep Model');
    });

    it('should return undefined for unknown preset', () => {
      const preset = getAdoptionPreset('InvalidPreset' as any);
      expect(preset).toBeUndefined();
    });
  });

  describe('listAdoptionPresets', () => {
    it('should return all presets as array', () => {
      const presets = listAdoptionPresets();
      expect(presets).toHaveLength(4);
      expect(presets[0].adoptionPercent).toBe(5);
      expect(presets[presets.length - 1].adoptionPercent).toBe(50);
    });

    it('should return presets in adoption order', () => {
      const presets = listAdoptionPresets();
      const adoptions = presets.map(p => p.adoptionPercent);
      expect(adoptions).toEqual([5, 10, 25, 50]);
    });
  });
});

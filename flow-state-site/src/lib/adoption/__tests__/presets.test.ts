import { describe, it, expect } from 'vitest';
import { ADOPTION_PRESETS } from '../types';

describe('Adoption Presets', () => {
  describe('Preset Consistency', () => {
    it('should have all expected presets defined', () => {
      expect(ADOPTION_PRESETS).toHaveProperty('Year1Conservative');
      expect(ADOPTION_PRESETS).toHaveProperty('Year1Moderate');
      expect(ADOPTION_PRESETS).toHaveProperty('Year2Aggressive');
      expect(ADOPTION_PRESETS).toHaveProperty('Year3Transformation');
    });

    it('should have consistent property structure', () => {
      Object.values(ADOPTION_PRESETS).forEach((preset) => {
        expect(preset).toHaveProperty('adoptionPercent');
        expect(preset).toHaveProperty('scenarioName');
        expect(preset).toHaveProperty('description');
      });
    });

    it('should have valid adoption percentages (5-100)', () => {
      Object.values(ADOPTION_PRESETS).forEach((preset) => {
        expect(preset.adoptionPercent).toBeGreaterThanOrEqual(5);
        expect(preset.adoptionPercent).toBeLessThanOrEqual(100);
      });
    });

    it('should have non-empty descriptions', () => {
      Object.values(ADOPTION_PRESETS).forEach((preset) => {
        expect(preset.description).toBeTruthy();
        expect(preset.description.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Deep Model Default (Year 1 Conservative)', () => {
    it('should default to 5% adoption', () => {
      const deepModel = ADOPTION_PRESETS.Year1Conservative;
      expect(deepModel.adoptionPercent).toBe(5);
    });

    it('should use Deep Model scenario name', () => {
      const deepModel = ADOPTION_PRESETS.Year1Conservative;
      expect(deepModel.scenarioName).toBe('Deep Model');
    });

    it('should have descriptive label', () => {
      const deepModel = ADOPTION_PRESETS.Year1Conservative;
      expect(deepModel.description).toContain('5%');
      expect(deepModel.description).toContain('Year 1');
      expect(deepModel.description).toContain('Deep Model');
    });
  });

  describe('Preset Values', () => {
    it('should have Year1Moderate at 10%', () => {
      expect(ADOPTION_PRESETS.Year1Moderate.adoptionPercent).toBe(10);
    });

    it('should have Year2Aggressive at 25%', () => {
      expect(ADOPTION_PRESETS.Year2Aggressive.adoptionPercent).toBe(25);
    });

    it('should have Year3Transformation at 50%', () => {
      expect(ADOPTION_PRESETS.Year3Transformation.adoptionPercent).toBe(50);
    });
  });

  describe('Preset Ordering', () => {
    it('should have increasing adoption percentages', () => {
      const percentages = Object.values(ADOPTION_PRESETS).map(
        (p) => p.adoptionPercent
      );
      
      // Verify ascending order
      for (let i = 1; i < percentages.length; i++) {
        expect(percentages[i]).toBeGreaterThan(percentages[i - 1]);
      }
    });
  });

  describe('Preset Labels', () => {
    it('should have unique descriptions', () => {
      const descriptions = Object.values(ADOPTION_PRESETS).map(
        (p) => p.description
      );
      const uniqueDescriptions = new Set(descriptions);
      
      expect(uniqueDescriptions.size).toBe(descriptions.length);
    });

    it('should reference year in description', () => {
      Object.values(ADOPTION_PRESETS).forEach((preset) => {
        const hasYear = /Year \d/.test(preset.description);
        expect(hasYear).toBe(true);
      });
    });

    it('should reference percentage in description', () => {
      Object.values(ADOPTION_PRESETS).forEach((preset) => {
        expect(preset.description).toContain(`${preset.adoptionPercent}%`);
      });
    });
  });
});

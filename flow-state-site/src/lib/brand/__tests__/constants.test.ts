import { describe, it, expect } from 'vitest';
import { BRAND_NAMES, TERMINOLOGY, getCompanyName, getProductName, getTagline } from '../constants';

describe('Brand Constants', () => {
  describe('BRAND_NAMES', () => {
    it('should have all required brand properties', () => {
      expect(BRAND_NAMES).toHaveProperty('Company');
      expect(BRAND_NAMES).toHaveProperty('Product');
      expect(BRAND_NAMES).toHaveProperty('ProductFull');
      expect(BRAND_NAMES).toHaveProperty('Acronym');
      expect(BRAND_NAMES).toHaveProperty('FullAcronym');
      expect(BRAND_NAMES).toHaveProperty('Program');
      expect(BRAND_NAMES).toHaveProperty('Tagline');
    });

    it('should have consistent company name', () => {
      expect(BRAND_NAMES.Company).toBe('FreightRoll');
    });

    it('should have consistent product name', () => {
      expect(BRAND_NAMES.Product).toBe('YardFlow');
    });

    it('should have full product name with company', () => {
      expect(BRAND_NAMES.ProductFull).toBe('YardFlow by FreightRoll');
      expect(BRAND_NAMES.ProductFull).toContain(BRAND_NAMES.Product);
      expect(BRAND_NAMES.ProductFull).toContain(BRAND_NAMES.Company);
    });

    it('should have YNS acronym', () => {
      expect(BRAND_NAMES.Acronym).toBe('YNS');
    });

    it('should have full acronym expansion', () => {
      expect(BRAND_NAMES.FullAcronym).toBe('Yard Network System');
    });

    it('should have non-empty values', () => {
      Object.values(BRAND_NAMES).forEach((value) => {
        expect(value).toBeTruthy();
        expect(value.length).toBeGreaterThan(0);
      });
    });
  });

  describe('TERMINOLOGY', () => {
    it('should have all required terminology', () => {
      expect(TERMINOLOGY).toHaveProperty('Yard');
      expect(TERMINOLOGY).toHaveProperty('Facility');
      expect(TERMINOLOGY).toHaveProperty('Protocol');
      expect(TERMINOLOGY).toHaveProperty('NetworkEffect');
      expect(TERMINOLOGY).toHaveProperty('Variance');
      expect(TERMINOLOGY).toHaveProperty('Flow');
      expect(TERMINOLOGY).toHaveProperty('DigitalTwin');
      expect(TERMINOLOGY).toHaveProperty('Orchestration');
      expect(TERMINOLOGY).toHaveProperty('Security');
    });

    it('should use lowercase for common nouns (unless proper noun)', () => {
      expect(TERMINOLOGY.Yard).toBe('yard');
      expect(TERMINOLOGY.Facility).toBe('facility');
      expect(TERMINOLOGY.Variance).toBe('variance');
    });

    it('should have descriptive multi-word terms', () => {
      expect(TERMINOLOGY.Protocol).toContain('standardized');
      expect(TERMINOLOGY.NetworkEffect).toContain('network');
      expect(TERMINOLOGY.Flow).toContain('standardized');
    });

    it('should have non-empty values', () => {
      Object.values(TERMINOLOGY).forEach((value) => {
        expect(value).toBeTruthy();
        expect(value.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Helper Functions', () => {
    it('getCompanyName should return FreightRoll', () => {
      expect(getCompanyName()).toBe('FreightRoll');
    });

    it('getProductName should return short name by default', () => {
      expect(getProductName()).toBe('YardFlow');
    });

    it('getProductName(true) should return full name', () => {
      expect(getProductName(true)).toBe('YardFlow by FreightRoll');
    });

    it('getProductName(false) should return short name', () => {
      expect(getProductName(false)).toBe('YardFlow');
    });

    it('getTagline should return tagline', () => {
      const tagline = getTagline();
      expect(tagline).toBeTruthy();
      expect(tagline.length).toBeGreaterThan(0);
    });
  });

  describe('Brand Consistency', () => {
    it('should not have typos in company name', () => {
      expect(BRAND_NAMES.Company).not.toContain('Freight Roll'); // common typo
      expect(BRAND_NAMES.Company).not.toContain('freightroll'); // wrong case
    });

    it('should not have typos in product name', () => {
      expect(BRAND_NAMES.Product).not.toContain('Yard Flow'); // common typo (space)
      expect(BRAND_NAMES.Product).not.toContain('yardflow'); // wrong case
    });

    it('should use consistent formatting in ProductFull', () => {
      expect(BRAND_NAMES.ProductFull).toMatch(/^[A-Z]/); // Start with capital
      expect(BRAND_NAMES.ProductFull).toContain(' by '); // Use "by" (not "By" or "from")
    });
  });
});

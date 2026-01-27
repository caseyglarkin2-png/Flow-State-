/**
 * Tests for Sections Content Model
 * Sprint 0.2a: Unit Test Sections Schema
 */

import { describe, it, expect } from 'vitest';
import {
  HOME_HERO,
  HOME_PROOF_PREVIEW,
  HOME_SCALE_CTA,
  PROOF_HERO,
  PROOF_MEASURED,
  PROOF_MODELED,
  SCALE_HERO,
  SCALE_CODEV_OPTION,
  SCALE_FULL_IMPL_OPTION,
  SCALE_PITFALLS,
  getSectionById,
  getSectionsByType,
  getHomeSections,
  getProofSections,
  getScaleSections,
  type Section,
} from '../sections';

describe('Sections Content Model', () => {
  describe('Schema Validation', () => {
    const allSections = [
      HOME_HERO,
      HOME_PROOF_PREVIEW,
      HOME_SCALE_CTA,
      PROOF_HERO,
      PROOF_MEASURED,
      PROOF_MODELED,
      SCALE_HERO,
      SCALE_CODEV_OPTION,
      SCALE_FULL_IMPL_OPTION,
      SCALE_PITFALLS,
    ];

    it('should have required fields', () => {
      allSections.forEach(section => {
        expect(section).toHaveProperty('id');
        expect(section).toHaveProperty('type');
        expect(typeof section.id).toBe('string');
        expect(typeof section.type).toBe('string');
      });
    });

    it('should have unique section IDs', () => {
      const ids = allSections.map(s => s.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have valid section types', () => {
      const validTypes = ['hero', 'proof', 'scale', 'implementation', 'cta', 'testimonial'];
      allSections.forEach(section => {
        expect(validTypes).toContain(section.type);
      });
    });
  });

  describe('Homepage Sections', () => {
    it('HOME_HERO should have proof-first messaging', () => {
      expect(HOME_HERO.headline).toContain('solved');
      expect(HOME_HERO.subheading).toContain('1M+');
      expect(HOME_HERO.subheading).toContain('0.2%');
    });

    it('HOME_HERO should have 2 CTAs', () => {
      expect(HOME_HERO.ctas).toHaveLength(2);
      expect(HOME_HERO.ctas?.[0].href).toBe('/proof');
      expect(HOME_HERO.ctas?.[1].href).toBe('/co-development');
    });

    it('HOME_PROOF_PREVIEW should reference measured metrics', () => {
      expect(HOME_PROOF_PREVIEW.body).toContain('1M+');
      expect(HOME_PROOF_PREVIEW.body).toContain('0.2%');
      expect(HOME_PROOF_PREVIEW.body).toContain('measured');
    });

    it('HOME_SCALE_CTA should reference both paths', () => {
      expect(HOME_SCALE_CTA.body).toContain('$350K');
      expect(HOME_SCALE_CTA.body).toContain('$800K');
      expect(HOME_SCALE_CTA.ctas).toHaveLength(2);
    });
  });

  describe('Proof Page Sections', () => {
    it('PROOF_HERO should emphasize real data', () => {
      expect(PROOF_HERO.body).toContain('real');
      expect(PROOF_HERO.body?.toLowerCase()).toContain('no pilot');
    });

    it('PROOF_MEASURED should reference production data', () => {
      expect(PROOF_MEASURED.subheading).toContain('1M+');
      expect(PROOF_MEASURED.body).toContain('measured');
    });

    it('PROOF_MODELED should link to ROI calculator', () => {
      expect(PROOF_MODELED.ctas?.[0].href).toBe('/roi');
      expect(PROOF_MODELED.body).toContain('Deep Model');
    });
  });

  describe('Scale Page Sections', () => {
    it('SCALE_HERO should present both pricing options', () => {
      expect(SCALE_HERO.body).toContain('$350K');
      expect(SCALE_HERO.body).toContain('$800K');
    });

    it('SCALE_CODEV_OPTION should reference 2 operators limit', () => {
      expect(SCALE_CODEV_OPTION.subheading).toContain('2 operators');
      expect(SCALE_CODEV_OPTION.body).toContain('$350K');
    });

    it('SCALE_FULL_IMPL_OPTION should reference custom deployment', () => {
      expect(SCALE_FULL_IMPL_OPTION.body).toContain('$800K');
      expect(SCALE_FULL_IMPL_OPTION.body).toContain('90-day');
    });

    it('SCALE_PITFALLS should warn about common failures', () => {
      expect(SCALE_PITFALLS.body).toContain('pilot');
      expect(SCALE_PITFALLS.body).toContain('network effects');
    });
  });

  describe('Helper Functions', () => {
    it('getSectionById should find section by ID', () => {
      const section = getSectionById('home-hero');
      expect(section).toBeDefined();
      expect(section?.id).toBe('home-hero');
    });

    it('getSectionById should return undefined for non-existent ID', () => {
      const section = getSectionById('non-existent');
      expect(section).toBeUndefined();
    });

    it('getSectionsByType should filter by type', () => {
      const heroSections = getSectionsByType('hero');
      expect(heroSections.length).toBeGreaterThan(0);
      expect(heroSections.every(s => s.type === 'hero')).toBe(true);
    });

    it('getHomeSections should return 3 sections', () => {
      const homeSections = getHomeSections();
      expect(homeSections).toHaveLength(3);
      expect(homeSections[0].id).toBe('home-hero');
    });

    it('getProofSections should return 3 sections', () => {
      const proofSections = getProofSections();
      expect(proofSections).toHaveLength(3);
      expect(proofSections[0].id).toBe('proof-hero');
    });

    it('getScaleSections should return 4 sections', () => {
      const scaleSections = getScaleSections();
      expect(scaleSections).toHaveLength(4);
      expect(scaleSections[0].id).toBe('scale-hero');
    });
  });

  describe('CTA Validation', () => {
    it('all CTAs should have required fields', () => {
      const allSections = [
        HOME_HERO,
        HOME_PROOF_PREVIEW,
        HOME_SCALE_CTA,
        PROOF_MODELED,
        SCALE_CODEV_OPTION,
        SCALE_FULL_IMPL_OPTION,
      ];

      allSections.forEach(section => {
        section.ctas?.forEach(cta => {
          expect(cta).toHaveProperty('label');
          expect(cta).toHaveProperty('href');
          expect(cta).toHaveProperty('style');
          expect(typeof cta.label).toBe('string');
          expect(typeof cta.href).toBe('string');
          expect(['primary', 'secondary', 'ghost']).toContain(cta.style);
        });
      });
    });

    it('CTA hrefs should be valid paths', () => {
      const allSections = [
        HOME_HERO,
        HOME_PROOF_PREVIEW,
        HOME_SCALE_CTA,
        PROOF_MODELED,
        SCALE_CODEV_OPTION,
        SCALE_FULL_IMPL_OPTION,
      ];

      allSections.forEach(section => {
        section.ctas?.forEach(cta => {
          expect(cta.href.startsWith('/')).toBe(true);
        });
      });
    });
  });

  describe('Content Quality', () => {
    it('headlines should be concise (< 60 chars)', () => {
      const allSections = [
        HOME_HERO,
        HOME_PROOF_PREVIEW,
        HOME_SCALE_CTA,
        PROOF_HERO,
        PROOF_MEASURED,
        PROOF_MODELED,
        SCALE_HERO,
        SCALE_CODEV_OPTION,
        SCALE_FULL_IMPL_OPTION,
        SCALE_PITFALLS,
      ];

      allSections.forEach(section => {
        if (section.headline) {
          expect(section.headline.length).toBeLessThan(60);
        }
      });
    });

    it('subheadings should be present on hero sections', () => {
      const heroSections = [HOME_HERO, PROOF_HERO, SCALE_HERO];
      heroSections.forEach(section => {
        expect(section.subheading).toBeDefined();
        expect(section.subheading!.length).toBeGreaterThan(0);
      });
    });
  });
});

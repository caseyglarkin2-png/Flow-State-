/**
 * Product Tier Configuration Tests
 * 
 * GOLDEN TESTS for product tier structure.
 * These tests ensure the Core + Enhanced product framework is consistent.
 */

import { describe, it, expect } from 'vitest';
import {
  PRODUCT_TIERS,
  CAPABILITIES,
  FACILITY_RECOMMENDATIONS,
  getTierCapabilities,
  isCapabilityIncluded,
  getEnhancedAddons,
  getSharedCapabilities,
  getRecommendedTier,
} from '../productTiers';

describe('Product Tier Configuration', () => {
  // ═══════════════════════════════════════════════════════════════════════════
  // TIER STRUCTURE
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Tier Structure', () => {
    it('should have exactly two tiers: core and enhanced', () => {
      const tierIds = Object.keys(PRODUCT_TIERS);
      expect(tierIds).toHaveLength(2);
      expect(tierIds).toContain('core');
      expect(tierIds).toContain('enhanced');
    });

    it('core tier should have required properties', () => {
      const core = PRODUCT_TIERS.core;
      expect(core.id).toBe('core');
      expect(core.name).toBe('YardFlow Core');
      expect(core.headline).toBe('Pays for itself with paper');
      expect(core.roiAnchor).toBe('$0.20/shipment paper savings');
      expect(core.ctaHref).toBe('/roi');
    });

    it('enhanced tier should have required properties', () => {
      const enhanced = PRODUCT_TIERS.enhanced;
      expect(enhanced.id).toBe('enhanced');
      expect(enhanced.name).toBe('YardFlow Enhanced');
      expect(enhanced.headline).toContain('Machine vision');
      expect(enhanced.roiAnchor).toContain('$40k');
      expect(enhanced.ctaHref).toBe('/contact?intent=qualify');
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // CAPABILITIES
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Capabilities', () => {
    it('should have 7 total capabilities', () => {
      expect(CAPABILITIES).toHaveLength(7);
    });

    it('core tier should include 4 digital modules', () => {
      const coreCapabilities = getTierCapabilities('core');
      expect(coreCapabilities).toHaveLength(4);
      
      const coreIds = coreCapabilities.map((c) => c.id);
      expect(coreIds).toContain('digital-guard');
      expect(coreIds).toContain('digital-comms');
      expect(coreIds).toContain('digital-bol');
      expect(coreIds).toContain('digital-yms');
    });

    it('enhanced tier should include all 7 capabilities', () => {
      const enhancedCapabilities = getTierCapabilities('enhanced');
      expect(enhancedCapabilities).toHaveLength(7);
    });

    it('enhanced addons should be 3 capabilities', () => {
      const addons = getEnhancedAddons();
      expect(addons).toHaveLength(3);
      
      const addonIds = addons.map((c) => c.id);
      expect(addonIds).toContain('machine-vision');
      expect(addonIds).toContain('guard-digitization');
      expect(addonIds).toContain('advanced-rtls');
    });

    it('shared capabilities should be 4 (core modules)', () => {
      const shared = getSharedCapabilities();
      expect(shared).toHaveLength(4);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // CAPABILITY INCLUSION CHECK
  // ═══════════════════════════════════════════════════════════════════════════

  describe('isCapabilityIncluded', () => {
    it('digital-guard should be in core', () => {
      expect(isCapabilityIncluded('digital-guard', 'core')).toBe(true);
    });

    it('digital-guard should be in enhanced', () => {
      expect(isCapabilityIncluded('digital-guard', 'enhanced')).toBe(true);
    });

    it('machine-vision should NOT be in core', () => {
      expect(isCapabilityIncluded('machine-vision', 'core')).toBe(false);
    });

    it('machine-vision should be in enhanced', () => {
      expect(isCapabilityIncluded('machine-vision', 'enhanced')).toBe(true);
    });

    it('should return false for non-existent capability', () => {
      expect(isCapabilityIncluded('fake-capability', 'core')).toBe(false);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // FACILITY RECOMMENDATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Facility Recommendations', () => {
    it('should have 6 facility type recommendations', () => {
      expect(FACILITY_RECOMMENDATIONS).toHaveLength(6);
    });

    it('reefer facilities should recommend enhanced tier', () => {
      const reefer = FACILITY_RECOMMENDATIONS.find((r) => r.facilityType === 'reefer');
      expect(reefer?.recommendedTier).toBe('enhanced');
    });

    it('dry-van facilities should recommend core tier', () => {
      const dryVan = FACILITY_RECOMMENDATIONS.find((r) => r.facilityType === 'dry-van');
      expect(dryVan?.recommendedTier).toBe('core');
    });

    it('high-security should recommend enhanced tier', () => {
      const highSec = FACILITY_RECOMMENDATIONS.find((r) => r.facilityType === 'high-security');
      expect(highSec?.recommendedTier).toBe('enhanced');
    });

    it('getRecommendedTier should return correct tier config', () => {
      const reeferTier = getRecommendedTier('reefer');
      expect(reeferTier.id).toBe('enhanced');

      const dryVanTier = getRecommendedTier('dry-van');
      expect(dryVanTier.id).toBe('core');
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // GOLDEN TEST: TIER SNAPSHOT
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Tier Snapshots (LOCKED)', () => {
    it('core tier structure should match snapshot', () => {
      expect(PRODUCT_TIERS.core).toMatchSnapshot();
    });

    it('enhanced tier structure should match snapshot', () => {
      expect(PRODUCT_TIERS.enhanced).toMatchSnapshot();
    });

    it('capability list should match snapshot', () => {
      const capabilityIds = CAPABILITIES.map((c) => c.id);
      expect(capabilityIds).toMatchSnapshot();
    });
  });
});

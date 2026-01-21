/**
 * Tests for WebGL capabilities detection
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { getWebGLCapabilities, getQualitySettings, QUALITY_PRESETS, type QualityTier } from '../capabilities';

describe('WebGL Capabilities', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('getQualitySettings', () => {
    it('returns correct settings for ultra tier', () => {
      const settings = getQualitySettings('ultra');
      expect(settings.particleCount).toBe(5000);
      expect(settings.raymarchSteps).toBe(64);
      expect(settings.noiseOctaves).toBe(6);
    });

    it('returns correct settings for high tier', () => {
      const settings = getQualitySettings('high');
      expect(settings.particleCount).toBe(2500);
      expect(settings.raymarchSteps).toBe(48);
      expect(settings.noiseOctaves).toBe(4);
    });

    it('returns correct settings for medium tier', () => {
      const settings = getQualitySettings('medium');
      expect(settings.particleCount).toBe(1000);
      expect(settings.raymarchSteps).toBe(32);
      expect(settings.noiseOctaves).toBe(3);
    });

    it('returns correct settings for low tier', () => {
      const settings = getQualitySettings('low');
      expect(settings.particleCount).toBe(500);
      expect(settings.raymarchSteps).toBe(16);
      expect(settings.noiseOctaves).toBe(2);
    });

    it('returns fallback settings for fallback tier', () => {
      const settings = getQualitySettings('fallback');
      expect(settings.particleCount).toBe(0);
      expect(settings.raymarchSteps).toBe(0);
      expect(settings.animatedDisk).toBe(false);
    });
  });

  describe('QUALITY_PRESETS', () => {
    it('has all expected tiers', () => {
      expect(QUALITY_PRESETS).toHaveProperty('ultra');
      expect(QUALITY_PRESETS).toHaveProperty('high');
      expect(QUALITY_PRESETS).toHaveProperty('medium');
      expect(QUALITY_PRESETS).toHaveProperty('low');
      expect(QUALITY_PRESETS).toHaveProperty('fallback');
    });

    it('ultra has highest particle count', () => {
      const counts = Object.values(QUALITY_PRESETS).map(p => p.particleCount);
      expect(Math.max(...counts)).toBe(QUALITY_PRESETS.ultra.particleCount);
    });

    it('high has more noise octaves than low', () => {
      expect(QUALITY_PRESETS.high.noiseOctaves).toBeGreaterThan(QUALITY_PRESETS.low.noiseOctaves);
    });

    it('fallback has zero particles (static image)', () => {
      expect(QUALITY_PRESETS.fallback.particleCount).toBe(0);
      expect(QUALITY_PRESETS.fallback.raymarchSteps).toBe(0);
    });

    it('only ultra and high have bloom enabled', () => {
      expect(QUALITY_PRESETS.ultra.bloom).toBe(true);
      expect(QUALITY_PRESETS.high.bloom).toBe(true);
      expect(QUALITY_PRESETS.medium.bloom).toBe(false);
      expect(QUALITY_PRESETS.low.bloom).toBe(false);
    });
  });

  describe('getWebGLCapabilities', () => {
    it('returns null when window is undefined', () => {
      vi.stubGlobal('window', undefined);
      const caps = getWebGLCapabilities();
      expect(caps).toBeNull();
    });

    it('returns null when document is undefined', () => {
      vi.stubGlobal('document', undefined);
      const caps = getWebGLCapabilities();
      expect(caps).toBeNull();
    });

    // Note: Full WebGL context testing requires jsdom-canvas or similar
    // These tests verify the function handles edge cases gracefully
  });

  describe('Quality tier scaling', () => {
    it('particle counts scale down progressively', () => {
      const ultra = QUALITY_PRESETS.ultra.particleCount;
      const high = QUALITY_PRESETS.high.particleCount;
      const medium = QUALITY_PRESETS.medium.particleCount;
      const low = QUALITY_PRESETS.low.particleCount;

      expect(ultra).toBeGreaterThan(high);
      expect(high).toBeGreaterThan(medium);
      expect(medium).toBeGreaterThan(low);
      expect(low).toBeGreaterThan(0);
    });

    it('raymarch steps scale down progressively', () => {
      const ultra = QUALITY_PRESETS.ultra.raymarchSteps;
      const high = QUALITY_PRESETS.high.raymarchSteps;
      const medium = QUALITY_PRESETS.medium.raymarchSteps;
      const low = QUALITY_PRESETS.low.raymarchSteps;

      expect(ultra).toBeGreaterThan(high);
      expect(high).toBeGreaterThan(medium);
      expect(medium).toBeGreaterThan(low);
    });

    it('noise octaves scale with quality tier', () => {
      expect(QUALITY_PRESETS.ultra.noiseOctaves).toBe(6);
      expect(QUALITY_PRESETS.low.noiseOctaves).toBe(2);
    });

    it('shadows quality matches tier', () => {
      expect(QUALITY_PRESETS.ultra.shadows).toBe('high');
      expect(QUALITY_PRESETS.high.shadows).toBe('low');
      expect(QUALITY_PRESETS.medium.shadows).toBe('none');
      expect(QUALITY_PRESETS.low.shadows).toBe('none');
    });
  });

  describe('QualityTier type', () => {
    it('accepts valid tier values', () => {
      const tiers: QualityTier[] = ['ultra', 'high', 'medium', 'low', 'fallback'];
      tiers.forEach(tier => {
        const settings = getQualitySettings(tier);
        expect(settings).toBeDefined();
        expect(settings.particleCount).toBeGreaterThanOrEqual(0);
      });
    });
  });
});

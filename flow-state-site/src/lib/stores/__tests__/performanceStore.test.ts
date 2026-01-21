/**
 * Tests for Performance Store
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { usePerformanceStore, selectQualityTier, selectIsLowPerformance } from '../performanceStore';

describe('Performance Store', () => {
  beforeEach(() => {
    usePerformanceStore.getState().reset();
  });

  describe('quality tier management', () => {
    it('starts with medium quality by default', () => {
      const tier = usePerformanceStore.getState().qualityTier;
      expect(tier).toBe('medium');
    });

    it('allows setting quality tier', () => {
      usePerformanceStore.getState().setQualityTier('ultra');
      expect(usePerformanceStore.getState().qualityTier).toBe('ultra');
    });

    it('accepts all valid quality tiers', () => {
      const tiers = ['low', 'medium', 'high', 'ultra'] as const;
      
      for (const tier of tiers) {
        usePerformanceStore.getState().setQualityTier(tier);
        expect(usePerformanceStore.getState().qualityTier).toBe(tier);
      }
    });
  });

  describe('FPS recording', () => {
    it('records FPS in history', () => {
      usePerformanceStore.getState().recordFps(60);
      usePerformanceStore.getState().recordFps(58);
      usePerformanceStore.getState().recordFps(62);
      
      const history = usePerformanceStore.getState().fpsHistory;
      expect(history).toHaveLength(3);
      expect(history).toContain(60);
    });

    it('calculates average FPS', () => {
      // Record multiple FPS values
      for (let i = 0; i < 10; i++) {
        usePerformanceStore.getState().recordFps(60);
      }
      
      const avgFps = usePerformanceStore.getState().metrics.fps;
      expect(avgFps).toBe(60);
    });

    it('limits history size to 60 frames', () => {
      for (let i = 0; i < 100; i++) {
        usePerformanceStore.getState().recordFps(60);
      }
      
      const history = usePerformanceStore.getState().fpsHistory;
      expect(history.length).toBeLessThanOrEqual(60);
    });
  });

  describe('auto quality adjustment', () => {
    it('is enabled by default', () => {
      expect(usePerformanceStore.getState().autoAdjust).toBe(true);
    });

    it('can be disabled', () => {
      usePerformanceStore.getState().setAutoAdjust(false);
      expect(usePerformanceStore.getState().autoAdjust).toBe(false);
    });

    it('reduces quality when FPS is consistently low', () => {
      usePerformanceStore.getState().setQualityTier('high');
      
      // Record 30 frames of low FPS (triggers adjustment after 30)
      for (let i = 0; i < 31; i++) {
        usePerformanceStore.getState().recordFps(25);
      }
      
      // Should have reduced quality from high (can go to medium or lower)
      const tier = usePerformanceStore.getState().qualityTier;
      expect(['low', 'medium']).toContain(tier);
    });

    it('increases quality when FPS is consistently high', () => {
      usePerformanceStore.getState().setQualityTier('medium');
      
      // Record 30 frames of high FPS (triggers adjustment after 30)
      for (let i = 0; i < 31; i++) {
        usePerformanceStore.getState().recordFps(60);
      }
      
      // Should have increased quality from medium (can go to high or ultra)
      const tier = usePerformanceStore.getState().qualityTier;
      expect(['high', 'ultra']).toContain(tier);
    });

    it('does not adjust when disabled', () => {
      usePerformanceStore.getState().setAutoAdjust(false);
      usePerformanceStore.getState().setQualityTier('high');
      
      // Record low FPS
      for (let i = 0; i < 35; i++) {
        usePerformanceStore.getState().recordFps(20);
      }
      
      // Should remain at high
      expect(usePerformanceStore.getState().qualityTier).toBe('high');
    });
  });

  describe('reduced motion', () => {
    it('is disabled by default', () => {
      expect(usePerformanceStore.getState().reducedMotion).toBe(false);
    });

    it('forces low quality when enabled', () => {
      usePerformanceStore.getState().setQualityTier('ultra');
      usePerformanceStore.getState().setReducedMotion(true);
      
      expect(usePerformanceStore.getState().qualityTier).toBe('low');
    });
  });

  describe('metrics', () => {
    it('updates metrics correctly', () => {
      usePerformanceStore.getState().updateMetrics({
        drawCalls: 100,
        triangles: 50000,
      });
      
      const metrics = usePerformanceStore.getState().metrics;
      expect(metrics.drawCalls).toBe(100);
      expect(metrics.triangles).toBe(50000);
    });

    it('preserves other metrics on partial update', () => {
      usePerformanceStore.getState().updateMetrics({ drawCalls: 100 });
      usePerformanceStore.getState().updateMetrics({ triangles: 50000 });
      
      const metrics = usePerformanceStore.getState().metrics;
      expect(metrics.drawCalls).toBe(100);
      expect(metrics.triangles).toBe(50000);
    });
  });

  describe('selectors', () => {
    it('selectQualityTier returns current tier', () => {
      usePerformanceStore.getState().setQualityTier('high');
      const tier = selectQualityTier(usePerformanceStore.getState());
      expect(tier).toBe('high');
    });

    it('selectIsLowPerformance returns true for low FPS', () => {
      // Set low FPS
      for (let i = 0; i < 5; i++) {
        usePerformanceStore.getState().recordFps(20);
      }
      
      const isLow = selectIsLowPerformance(usePerformanceStore.getState());
      expect(isLow).toBe(true);
    });

    it('selectIsLowPerformance returns false for good FPS', () => {
      // Set good FPS
      for (let i = 0; i < 5; i++) {
        usePerformanceStore.getState().recordFps(60);
      }
      
      const isLow = selectIsLowPerformance(usePerformanceStore.getState());
      expect(isLow).toBe(false);
    });
  });

  describe('reset', () => {
    it('resets to initial state', () => {
      // Modify state
      usePerformanceStore.getState().setQualityTier('ultra');
      usePerformanceStore.getState().setAutoAdjust(false);
      usePerformanceStore.getState().recordFps(30);
      
      // Reset
      usePerformanceStore.getState().reset();
      
      // Verify initial state
      const state = usePerformanceStore.getState();
      expect(state.qualityTier).toBe('medium');
      expect(state.autoAdjust).toBe(true);
      expect(state.fpsHistory).toHaveLength(0);
    });
  });

  describe('loading state', () => {
    it('starts in loading state', () => {
      usePerformanceStore.getState().reset();
      expect(usePerformanceStore.getState().isLoading).toBe(true);
    });

    it('can be set to loaded', () => {
      usePerformanceStore.getState().setLoading(false);
      expect(usePerformanceStore.getState().isLoading).toBe(false);
    });
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { usePerformanceStore } from '../performanceStore';

describe('performanceStore', () => {
  beforeEach(() => {
    usePerformanceStore.getState().reset();
  });

  describe('initial state', () => {
    it('should start with high tier', () => {
      const state = usePerformanceStore.getState();
      expect(state.tier).toBe('high');
    });

    it('should start with 60 fps', () => {
      const state = usePerformanceStore.getState();
      expect(state.fps).toBe(60);
    });

    it('should have monitoring enabled', () => {
      const state = usePerformanceStore.getState();
      expect(state.isMonitoring).toBe(true);
    });
  });

  describe('recordFps', () => {
    it('should update current fps', () => {
      usePerformanceStore.getState().recordFps(45);
      expect(usePerformanceStore.getState().fps).toBe(45);
    });

    it('should update fps samples buffer', () => {
      usePerformanceStore.getState().recordFps(45);
      const state = usePerformanceStore.getState();
      expect(state.fpsSamples).toContain(45);
    });

    it('should not change tier immediately (hysteresis)', () => {
      // Single low FPS reading should not change tier
      usePerformanceStore.getState().recordFps(20);
      expect(usePerformanceStore.getState().tier).toBe('high');
    });

    it('should downgrade tier after consecutive low fps readings', () => {
      const { recordFps } = usePerformanceStore.getState();
      
      // Need 5 consecutive readings below threshold
      for (let i = 0; i < 5; i++) {
        recordFps(25); // Below highToMedium threshold (35)
      }
      
      expect(usePerformanceStore.getState().tier).toBe('medium');
    });

    it('should upgrade tier after consecutive high fps readings', () => {
      // First set to medium
      usePerformanceStore.getState().setTier('medium');
      
      const { recordFps } = usePerformanceStore.getState();
      
      // Need 5 consecutive readings above threshold
      for (let i = 0; i < 5; i++) {
        recordFps(58); // Above mediumToHigh threshold (55)
      }
      
      expect(usePerformanceStore.getState().tier).toBe('high');
    });

    it('should reset counters on tier change', () => {
      const { recordFps } = usePerformanceStore.getState();
      
      // Trigger tier change
      for (let i = 0; i < 5; i++) {
        recordFps(25);
      }
      
      const state = usePerformanceStore.getState();
      expect(state.lowFpsCount).toBe(0);
      expect(state.highFpsCount).toBe(0);
    });

    it('should not record when monitoring is disabled', () => {
      usePerformanceStore.getState().setMonitoring(false);
      usePerformanceStore.getState().recordFps(10);
      
      // FPS should still be at initial value (60)
      expect(usePerformanceStore.getState().fps).toBe(60);
    });
  });

  describe('setTier', () => {
    it('should manually set tier', () => {
      usePerformanceStore.getState().setTier('low');
      expect(usePerformanceStore.getState().tier).toBe('low');
    });

    it('should reset hysteresis counters on manual set', () => {
      usePerformanceStore.getState().recordFps(25);
      usePerformanceStore.getState().recordFps(25);
      usePerformanceStore.getState().setTier('ultra');
      
      const state = usePerformanceStore.getState();
      expect(state.lowFpsCount).toBe(0);
      expect(state.highFpsCount).toBe(0);
    });
  });

  describe('context lost handling', () => {
    it('should track context lost state', () => {
      usePerformanceStore.getState().setContextLost(true);
      expect(usePerformanceStore.getState().contextLost).toBe(true);
    });

    it('should track context restored', () => {
      usePerformanceStore.getState().setContextLost(true);
      usePerformanceStore.getState().setContextLost(false);
      expect(usePerformanceStore.getState().contextLost).toBe(false);
    });
  });

  describe('tier progression', () => {
    it('should go through all tiers on sustained low fps', () => {
      // Reset and start fresh at ultra
      usePerformanceStore.getState().reset();
      usePerformanceStore.getState().setTier('ultra');
      
      // Clear the samples by recording enough low readings
      // Ultra -> High (need avgFps below 50)
      for (let i = 0; i < 10; i++) {
        usePerformanceStore.getState().recordFps(40);
      }
      expect(usePerformanceStore.getState().tier).toBe('high');
      
      // High -> Medium (need avgFps below 35)
      // Need more samples to bring average down
      for (let i = 0; i < 60; i++) {
        usePerformanceStore.getState().recordFps(25);
      }
      expect(usePerformanceStore.getState().tier).toBe('medium');
      
      // Medium -> Low (need avgFps below 20)
      for (let i = 0; i < 60; i++) {
        usePerformanceStore.getState().recordFps(10);
      }
      expect(usePerformanceStore.getState().tier).toBe('low');
    });

    it('should not degrade below low tier', () => {
      usePerformanceStore.getState().setTier('low');
      
      for (let i = 0; i < 10; i++) {
        usePerformanceStore.getState().recordFps(5);
      }
      
      expect(usePerformanceStore.getState().tier).toBe('low');
    });
  });

  describe('average fps calculation', () => {
    it('should calculate running average', () => {
      const { recordFps } = usePerformanceStore.getState();
      
      recordFps(60);
      recordFps(40);
      recordFps(50);
      
      const state = usePerformanceStore.getState();
      // Average of initial 60 (from samples) + 60 + 40 + 50
      expect(state.avgFps).toBeGreaterThan(40);
      expect(state.avgFps).toBeLessThan(60);
    });
  });
});

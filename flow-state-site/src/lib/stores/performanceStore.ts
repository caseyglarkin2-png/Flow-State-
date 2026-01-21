/**
 * Performance Store - Manages adaptive quality and performance monitoring
 * 
 * Tracks FPS, adjusts quality tiers dynamically, and provides
 * performance metrics for debugging.
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { type QualityTier, getQualitySettings, QUALITY_PRESETS } from '@/src/lib/webgl/capabilities';

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  gpuTime: number | null;
  drawCalls: number;
  triangles: number;
}

interface PerformanceState {
  // Current quality tier
  qualityTier: QualityTier;
  
  // Performance metrics
  metrics: PerformanceMetrics;
  
  // Historical FPS for averaging
  fpsHistory: number[];
  
  // Auto-adjustment settings
  autoAdjust: boolean;
  targetFps: number;
  
  // Reduced motion preference
  reducedMotion: boolean;
  
  // Loading state
  isLoading: boolean;
  
  // Actions
  setQualityTier: (tier: QualityTier) => void;
  updateMetrics: (metrics: Partial<PerformanceMetrics>) => void;
  recordFps: (fps: number) => void;
  setAutoAdjust: (enabled: boolean) => void;
  setTargetFps: (fps: number) => void;
  setReducedMotion: (enabled: boolean) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const FPS_HISTORY_SIZE = 60;
const FPS_ADJUSTMENT_THRESHOLD_LOW = 30;
const FPS_ADJUSTMENT_THRESHOLD_HIGH = 55;
const QUALITY_TIERS: QualityTier[] = ['low', 'medium', 'high', 'ultra'];

// ═══════════════════════════════════════════════════════════════════
// INITIAL STATE
// ═══════════════════════════════════════════════════════════════════

const initialMetrics: PerformanceMetrics = {
  fps: 60,
  frameTime: 16.67,
  gpuTime: null,
  drawCalls: 0,
  triangles: 0,
};

const initialState = {
  qualityTier: 'medium' as QualityTier,
  metrics: initialMetrics,
  fpsHistory: [],
  autoAdjust: true,
  targetFps: 60,
  reducedMotion: false,
  isLoading: true,
};

// ═══════════════════════════════════════════════════════════════════
// STORE
// ═══════════════════════════════════════════════════════════════════

export const usePerformanceStore = create<PerformanceState>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,

    setQualityTier: (tier) => {
      set({ qualityTier: tier });
    },

    updateMetrics: (metrics) => {
      set((state) => ({
        metrics: { ...state.metrics, ...metrics },
      }));
    },

    recordFps: (fps) => {
      const state = get();
      const newHistory = [...state.fpsHistory, fps].slice(-FPS_HISTORY_SIZE);
      
      // Calculate average FPS
      const avgFps = newHistory.reduce((a, b) => a + b, 0) / newHistory.length;
      
      let newTier = state.qualityTier;
      
      // Auto-adjust quality based on FPS (if enabled)
      if (state.autoAdjust && newHistory.length >= 30) {
        const currentIndex = QUALITY_TIERS.indexOf(state.qualityTier);
        
        if (avgFps < FPS_ADJUSTMENT_THRESHOLD_LOW && currentIndex > 0) {
          // FPS too low, reduce quality
          newTier = QUALITY_TIERS[currentIndex - 1];
        } else if (avgFps > FPS_ADJUSTMENT_THRESHOLD_HIGH && currentIndex < QUALITY_TIERS.length - 1) {
          // FPS high enough, try increasing quality
          newTier = QUALITY_TIERS[currentIndex + 1];
        }
      }
      
      set({
        fpsHistory: newHistory,
        metrics: { ...state.metrics, fps: avgFps, frameTime: 1000 / avgFps },
        qualityTier: newTier,
      });
    },

    setAutoAdjust: (enabled) => {
      set({ autoAdjust: enabled });
    },

    setTargetFps: (fps) => {
      set({ targetFps: fps });
    },

    setReducedMotion: (enabled) => {
      set({ 
        reducedMotion: enabled,
        // Force low quality if reduced motion is enabled
        qualityTier: enabled ? 'low' : get().qualityTier,
      });
    },

    setLoading: (loading) => {
      set({ isLoading: loading });
    },

    reset: () => {
      set(initialState);
    },
  }))
);

// ═══════════════════════════════════════════════════════════════════
// SELECTORS
// ═══════════════════════════════════════════════════════════════════

export const selectQualityTier = (state: PerformanceState) => state.qualityTier;
export const selectQualitySettings = (state: PerformanceState) => getQualitySettings(state.qualityTier);
export const selectMetrics = (state: PerformanceState) => state.metrics;
export const selectAverageFps = (state: PerformanceState) => state.metrics.fps;
export const selectIsLowPerformance = (state: PerformanceState) => 
  state.metrics.fps < FPS_ADJUSTMENT_THRESHOLD_LOW;
export const selectReducedMotion = (state: PerformanceState) => state.reducedMotion;
export const selectIsLoading = (state: PerformanceState) => state.isLoading;

// ═══════════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════════

/**
 * Hook to get current quality settings
 */
export function useQualitySettings() {
  return usePerformanceStore((state) => getQualitySettings(state.qualityTier));
}

/**
 * Hook to check if we should use reduced motion
 */
export function useShouldReduceMotion() {
  const reducedMotion = usePerformanceStore(selectReducedMotion);
  const isLowPerformance = usePerformanceStore(selectIsLowPerformance);
  return reducedMotion || isLowPerformance;
}

// ═══════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════

/**
 * Initialize performance store with detected capabilities
 */
export function initializePerformanceStore(detectedTier: QualityTier) {
  const store = usePerformanceStore.getState();
  store.setQualityTier(detectedTier);
  store.setLoading(false);
  
  // Check for reduced motion preference
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    store.setReducedMotion(mediaQuery.matches);
    
    // Listen for changes
    mediaQuery.addEventListener('change', (e) => {
      usePerformanceStore.getState().setReducedMotion(e.matches);
    });
  }
}

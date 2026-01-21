import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

/**
 * Quality tiers for rendering performance
 * 
 * - ultra: Full quality, all effects enabled
 * - high: Reduced particle count, high-res shaders
 * - medium: Lower resolution, simplified shaders
 * - low: Minimal effects, static fallback possible
 */
export type QualityTier = 'ultra' | 'high' | 'medium' | 'low';

/**
 * FPS thresholds for tier transitions
 */
const FPS_THRESHOLDS = {
  ultraToHigh: 50,
  highToMedium: 35,
  mediumToLow: 20,
  // Upgrade thresholds (higher to prevent thrashing)
  lowToMedium: 40,
  mediumToHigh: 55,
  highToUltra: 58,
} as const;

/**
 * Hysteresis: consecutive readings required before tier change
 */
const HYSTERESIS_COUNT = 5;

interface PerformanceState {
  /** Current frames per second */
  fps: number;
  /** Current quality tier */
  tier: QualityTier;
  /** Consecutive low FPS readings (for hysteresis) */
  lowFpsCount: number;
  /** Consecutive high FPS readings (for upgrade hysteresis) */
  highFpsCount: number;
  /** Whether performance monitoring is enabled */
  isMonitoring: boolean;
  /** Average FPS over last 60 frames */
  avgFps: number;
  /** FPS sample buffer */
  fpsSamples: number[];
  /** GPU context lost flag */
  contextLost: boolean;
}

interface PerformanceActions {
  /** Record a new FPS sample */
  recordFps: (fps: number) => void;
  /** Manually set quality tier (overrides auto) */
  setTier: (tier: QualityTier) => void;
  /** Enable/disable monitoring */
  setMonitoring: (enabled: boolean) => void;
  /** Reset to defaults */
  reset: () => void;
  /** Mark GPU context as lost/restored */
  setContextLost: (lost: boolean) => void;
}

const initialState: PerformanceState = {
  fps: 60,
  tier: 'high',
  lowFpsCount: 0,
  highFpsCount: 0,
  isMonitoring: true,
  avgFps: 60,
  fpsSamples: [],
  contextLost: false,
};

/**
 * Determine the target tier based on average FPS
 */
function getTargetTier(avgFps: number, currentTier: QualityTier): QualityTier | null {
  // Check for downgrades
  if (currentTier === 'ultra' && avgFps < FPS_THRESHOLDS.ultraToHigh) return 'high';
  if (currentTier === 'high' && avgFps < FPS_THRESHOLDS.highToMedium) return 'medium';
  if (currentTier === 'medium' && avgFps < FPS_THRESHOLDS.mediumToLow) return 'low';
  
  // Check for upgrades
  if (currentTier === 'low' && avgFps >= FPS_THRESHOLDS.lowToMedium) return 'medium';
  if (currentTier === 'medium' && avgFps >= FPS_THRESHOLDS.mediumToHigh) return 'high';
  if (currentTier === 'high' && avgFps >= FPS_THRESHOLDS.highToUltra) return 'ultra';
  
  return null;
}

/**
 * Performance monitoring store for WebGL quality tier management
 * 
 * Uses hysteresis to prevent tier thrashing - requires HYSTERESIS_COUNT
 * consecutive readings before changing tiers.
 */
export const usePerformanceStore = create<PerformanceState & PerformanceActions>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,

    recordFps: (fps: number) => {
      const state = get();
      if (!state.isMonitoring) return;

      // Update samples buffer (keep last 60)
      const newSamples = [...state.fpsSamples.slice(-59), fps];
      const avgFps = newSamples.reduce((a, b) => a + b, 0) / newSamples.length;

      const targetTier = getTargetTier(avgFps, state.tier);
      
      if (targetTier === null) {
        // No tier change needed, reset counters
        set({
          fps,
          avgFps,
          fpsSamples: newSamples,
          lowFpsCount: 0,
          highFpsCount: 0,
        });
        return;
      }

      // Determine if downgrade or upgrade
      const tierOrder: QualityTier[] = ['low', 'medium', 'high', 'ultra'];
      const currentIndex = tierOrder.indexOf(state.tier);
      const targetIndex = tierOrder.indexOf(targetTier);
      const isDowngrade = targetIndex < currentIndex;

      // Update appropriate counter
      const newLowCount = isDowngrade ? state.lowFpsCount + 1 : 0;
      const newHighCount = !isDowngrade ? state.highFpsCount + 1 : 0;

      // Check if hysteresis threshold reached
      const shouldChange = isDowngrade 
        ? newLowCount >= HYSTERESIS_COUNT
        : newHighCount >= HYSTERESIS_COUNT;

      if (shouldChange) {
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Performance] Tier change: ${state.tier} → ${targetTier} (avgFps: ${avgFps.toFixed(1)})`);
        }
        set({
          fps,
          avgFps,
          fpsSamples: newSamples,
          tier: targetTier,
          lowFpsCount: 0,
          highFpsCount: 0,
        });
      } else {
        set({
          fps,
          avgFps,
          fpsSamples: newSamples,
          lowFpsCount: newLowCount,
          highFpsCount: newHighCount,
        });
      }
    },

    setTier: (tier: QualityTier) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Performance] Manual tier set: ${tier}`);
      }
      set({ tier, lowFpsCount: 0, highFpsCount: 0 });
    },

    setMonitoring: (enabled: boolean) => set({ isMonitoring: enabled }),

    setContextLost: (lost: boolean) => {
      if (lost && process.env.NODE_ENV === 'development') {
        console.warn('[Performance] WebGL context lost');
      }
      set({ contextLost: lost });
    },

    reset: () => set(initialState),
  }))
);

/**
 * Hook to get quality settings based on current tier
 */
export function useQualitySettings() {
  const tier = usePerformanceStore((s) => s.tier);
  
  return {
    tier,
    // Particle count multiplier
    particleMultiplier: tier === 'ultra' ? 1 : tier === 'high' ? 0.7 : tier === 'medium' ? 0.4 : 0.2,
    // Shadow quality
    shadowsEnabled: tier !== 'low',
    shadowMapSize: tier === 'ultra' ? 2048 : tier === 'high' ? 1024 : 512,
    // Post-processing
    postProcessingEnabled: tier === 'ultra' || tier === 'high',
    // Shader complexity
    shaderComplexity: tier === 'ultra' ? 'full' : tier === 'high' ? 'reduced' : 'minimal',
    // Anti-aliasing
    antialias: tier !== 'low',
    // Device pixel ratio cap
    dprCap: tier === 'ultra' ? 2 : tier === 'high' ? 1.5 : 1,
  } as const;
}

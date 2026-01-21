'use client';

/**
 * SingularityScene - Complete visualization combining all R3F components
 * 
 * Orchestrates:
 * - BlackHole raymarched visualization
 * - ParticleNetwork system
 * - Dissolve transitions
 * - Performance monitoring
 * - Reduced motion accessibility
 */

import { Suspense, useCallback, useState, useEffect } from 'react';
import { SingularityCanvas } from './SingularityCanvas';
import { BlackHole } from './BlackHole';
import { ParticleNetwork } from './ParticleNetwork';
import { useDissolveTransition, TransitionOverlay } from './DissolveTransition';
import { usePerformanceStore } from '@/src/lib/stores/performanceStore';
import { getWebGLCapabilities, initializePerformanceStore } from '@/src/lib/webgl/capabilities';
import { useReducedMotion } from '@/components/motion/ReducedMotion';
import type { QualityTier } from '@/src/lib/webgl/capabilities';

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

export interface SingularitySceneProps {
  /** Current viscosity from calculator (0-1) */
  viscosity?: number;
  /** Whether the scene is paused */
  paused?: boolean;
  /** Called when transition completes */
  onTransitionComplete?: (phase: 'singularity' | 'clarity') => void;
  /** External trigger for dissolve transition */
  triggerDissolve?: boolean;
  /** CSS class for container */
  className?: string;
  /** Show debug overlay */
  debug?: boolean;
}

// ═══════════════════════════════════════════════════════════════════
// INNER SCENE (inside R3F Canvas)
// ═══════════════════════════════════════════════════════════════════

interface InnerSceneProps {
  viscosity: number;
  dissolveProgress: number;
  paused: boolean;
  quality: QualityTier;
}

function InnerScene({ viscosity, dissolveProgress, paused, quality }: InnerSceneProps) {
  // Map quality tier to numeric value for shaders
  const qualityLevel = quality === 'ultra' ? 3 : quality === 'high' ? 2 : quality === 'medium' ? 1 : 0;

  return (
    <>
      {/* Ambient light for particle visibility */}
      <ambientLight intensity={0.1} />
      
      {/* Black hole visualization */}
      <BlackHole
        viscosity={viscosity}
        progress={dissolveProgress}
        quality={qualityLevel}
        paused={paused}
      />
      
      {/* Particle network */}
      <ParticleNetwork
        viscosity={viscosity}
        quality={quality}
        paused={paused}
        inwardPull={1.0 + viscosity * 0.5}
      />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DEBUG OVERLAY
// ═══════════════════════════════════════════════════════════════════

function DebugOverlay() {
  const qualityTier = usePerformanceStore((s) => s.qualityTier);
  const fps = usePerformanceStore((s) => s.metrics.fps);
  const autoAdjust = usePerformanceStore((s) => s.autoAdjust);

  return (
    <div className="absolute top-2 left-2 bg-black/70 text-xs text-white p-2 rounded font-mono z-50">
      <div>FPS: {fps.toFixed(1)}</div>
      <div>Quality: {qualityTier}</div>
      <div>Auto: {autoAdjust ? 'ON' : 'OFF'}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function SingularityScene({
  viscosity = 0,
  paused = false,
  onTransitionComplete,
  triggerDissolve = false,
  className = '',
  debug = false,
}: SingularitySceneProps) {
  const qualityTier = usePerformanceStore((s) => s.qualityTier);
  const [isInitialized, setIsInitialized] = useState(false);
  const { prefersReducedMotion } = useReducedMotion();

  // If user prefers reduced motion, pause animations
  const effectivePaused = paused || prefersReducedMotion;

  // Initialize performance store with detected capabilities
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const caps = getWebGLCapabilities();
    if (caps) {
      initializePerformanceStore(caps.tier);
    }
    setIsInitialized(true);
  }, []);

  // Dissolve transition management
  const {
    phase,
    progress,
    isTransitioning,
    transitionToClarity,
    transitionToSingularity,
  } = useDissolveTransition({
    duration: 2000,
    onComplete: () => {
      onTransitionComplete?.(phase === 'singularity' ? 'clarity' : 'singularity');
    },
  });

  // Handle external dissolve trigger
  useEffect(() => {
    if (triggerDissolve && phase === 'singularity') {
      transitionToClarity();
    } else if (!triggerDissolve && phase === 'clarity') {
      transitionToSingularity();
    }
  }, [triggerDissolve, phase, transitionToClarity, transitionToSingularity]);

  // Quality change handler
  const handleQualityChange = useCallback((tier: QualityTier) => {
    usePerformanceStore.getState().setQualityTier(tier);
  }, []);

  // Don't render until initialized
  if (!isInitialized) {
    return (
      <div className={`relative w-full h-full bg-void ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-neon border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // Get current progress value
  const dissolveProgress = typeof progress === 'number' ? progress : progress.get();

  return (
    <div className={`relative w-full h-full ${className}`}>
      <SingularityCanvas
        onQualityChange={handleQualityChange}
        initialQuality={qualityTier}
      >
        <Suspense fallback={null}>
          <InnerScene
            viscosity={viscosity}
            dissolveProgress={dissolveProgress}
            paused={effectivePaused}
            quality={qualityTier}
          />
        </Suspense>
      </SingularityCanvas>
      
      {/* Transition overlay */}
      <TransitionOverlay progress={dissolveProgress} />
      
      {/* Debug overlay */}
      {debug && <DebugOverlay />}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════

export { SingularityCanvas } from './SingularityCanvas';
export { BlackHole } from './BlackHole';
export { ParticleNetwork } from './ParticleNetwork';
export { useDissolveTransition } from './DissolveTransition';

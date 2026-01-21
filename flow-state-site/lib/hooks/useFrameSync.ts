'use client';

/**
 * useFrameSync - Synchronizes animation state across R3F components
 * 
 * Provides a central clock and state synchronization for:
 * - Black hole animation
 * - Particle system
 * - Dissolve transitions
 * - Performance monitoring
 */

import { useRef, useCallback, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { usePerformanceStore } from '@/src/lib/stores/performanceStore';

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

export interface FrameState {
  /** Time in seconds since start */
  time: number;
  /** Delta time since last frame */
  delta: number;
  /** Current FPS */
  fps: number;
  /** Whether animations are paused */
  paused: boolean;
  /** Current viscosity (0-1) */
  viscosity: number;
  /** Dissolve progress (0-1) */
  dissolveProgress: number;
}

export interface UseFrameSyncOptions {
  /** External viscosity value (0-1) */
  viscosity?: number;
  /** External dissolve progress (0-1) */
  dissolveProgress?: number;
  /** Whether to pause animations */
  paused?: boolean;
  /** Priority for useFrame (higher = later) */
  priority?: number;
  /** Callback with frame state */
  onFrame?: (state: FrameState) => void;
}

// ═══════════════════════════════════════════════════════════════════
// FPS CALCULATION
// ═══════════════════════════════════════════════════════════════════

function useFPSCounter() {
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const fps = useRef(60);

  const update = useCallback(() => {
    frameCount.current++;
    const now = performance.now();
    const elapsed = now - lastTime.current;

    // Update FPS every 500ms
    if (elapsed >= 500) {
      fps.current = (frameCount.current / elapsed) * 1000;
      frameCount.current = 0;
      lastTime.current = now;
    }

    return fps.current;
  }, []);

  return { fps, update };
}

// ═══════════════════════════════════════════════════════════════════
// HOOK: useFrameSync
// ═══════════════════════════════════════════════════════════════════

export function useFrameSync(options: UseFrameSyncOptions = {}) {
  const {
    viscosity = 0,
    dissolveProgress = 0,
    paused = false,
    priority = 0,
    onFrame,
  } = options;

  const { clock } = useThree();
  const { update: updateFps, fps } = useFPSCounter();
  const recordFps = usePerformanceStore((s) => s.recordFps);

  // Memoized frame state
  const frameState = useRef<FrameState>({
    time: 0,
    delta: 0,
    fps: 60,
    paused: false,
    viscosity: 0,
    dissolveProgress: 0,
  });

  useFrame((state, delta) => {
    if (paused) return;

    // Update FPS
    const currentFps = updateFps();
    recordFps(currentFps);

    // Update frame state
    frameState.current = {
      time: clock.elapsedTime,
      delta,
      fps: currentFps,
      paused,
      viscosity,
      dissolveProgress,
    };

    // Call external handler
    onFrame?.(frameState.current);
  }, priority);

  return frameState.current;
}

// ═══════════════════════════════════════════════════════════════════
// HOOK: useAnimationState
// ═══════════════════════════════════════════════════════════════════

export interface AnimationState {
  /** Smoothed viscosity for shaders */
  smoothViscosity: number;
  /** Smoothed dissolve for transitions */
  smoothDissolve: number;
  /** Time-based oscillation (0-1) */
  pulse: number;
  /** Rotation angle in radians */
  rotation: number;
}

export interface UseAnimationStateOptions {
  viscosity: number;
  dissolveProgress: number;
  smoothing?: number;
  pulseSpeed?: number;
  rotationSpeed?: number;
}

export function useAnimationState(options: UseAnimationStateOptions) {
  const {
    viscosity,
    dissolveProgress,
    smoothing = 0.1,
    pulseSpeed = 1,
    rotationSpeed = 0.1,
  } = options;

  const state = useRef<AnimationState>({
    smoothViscosity: viscosity,
    smoothDissolve: dissolveProgress,
    pulse: 0,
    rotation: 0,
  });

  useFrame((_, delta) => {
    // Smooth viscosity
    state.current.smoothViscosity += (viscosity - state.current.smoothViscosity) * smoothing;
    
    // Smooth dissolve
    state.current.smoothDissolve += (dissolveProgress - state.current.smoothDissolve) * smoothing;
    
    // Pulse (0-1 oscillation)
    state.current.pulse = (Math.sin(performance.now() * 0.001 * pulseSpeed) + 1) * 0.5;
    
    // Rotation
    state.current.rotation += delta * rotationSpeed;
  });

  return state.current;
}

// ═══════════════════════════════════════════════════════════════════
// HOOK: useMousePosition
// ═══════════════════════════════════════════════════════════════════

export function useMousePosition() {
  const { mouse, viewport } = useThree();
  
  return useMemo(() => ({
    // Normalized -1 to 1
    normalized: { x: mouse.x, y: mouse.y },
    // 0 to 1
    uv: { x: (mouse.x + 1) * 0.5, y: (mouse.y + 1) * 0.5 },
    // World units
    world: { 
      x: mouse.x * viewport.width * 0.5, 
      y: mouse.y * viewport.height * 0.5 
    },
  }), [mouse.x, mouse.y, viewport.width, viewport.height]);
}

// ═══════════════════════════════════════════════════════════════════
// HOOK: useReducedMotion
// ═══════════════════════════════════════════════════════════════════

export function useReducedMotion() {
  const reducedMotion = usePerformanceStore((s) => s.reducedMotion);
  const isLowPerformance = usePerformanceStore((s) => s.metrics.fps < 30);
  
  return reducedMotion || isLowPerformance;
}

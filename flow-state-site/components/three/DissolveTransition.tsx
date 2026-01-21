'use client';

/**
 * DissolveTransition - Orchestrates the singularity → clarity transition
 * 
 * Manages the visual and state transition when variance is captured,
 * coordinating shader dissolve, particle behavior, and UI state.
 */

import { useRef, useEffect, useCallback, useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface DissolveTransitionProps {
  /** Current phase: 'singularity' or 'clarity' */
  phase: 'singularity' | 'clarity';
  /** Callback when transition completes */
  onComplete?: () => void;
  /** Duration in milliseconds */
  duration?: number;
  /** Children to render */
  children: (progress: number) => React.ReactNode;
}

interface UseDissolveTransitionOptions {
  duration?: number;
  onStart?: () => void;
  onComplete?: () => void;
}

// ═══════════════════════════════════════════════════════════════════
// HOOK: useDissolveTransition
// ═══════════════════════════════════════════════════════════════════

export function useDissolveTransition(options: UseDissolveTransitionOptions = {}) {
  const { duration = 2000, onStart, onComplete } = options;
  
  const [phase, setPhase] = useState<'singularity' | 'clarity'>('singularity');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const [spring, api] = useSpring(() => ({
    progress: 0,
    config: { duration, easing: (t: number) => t * t * (3 - 2 * t) }, // Smooth step
  }));

  const startTransition = useCallback((targetPhase: 'singularity' | 'clarity') => {
    if (isTransitioning || targetPhase === phase) return;
    
    setIsTransitioning(true);
    onStart?.();
    
    const targetProgress = targetPhase === 'clarity' ? 1 : 0;
    
    api.start({
      progress: targetProgress,
      onRest: () => {
        setPhase(targetPhase);
        setIsTransitioning(false);
        onComplete?.();
      },
    });
  }, [phase, isTransitioning, api, onStart, onComplete]);

  const transitionToClarity = useCallback(() => {
    startTransition('clarity');
  }, [startTransition]);

  const transitionToSingularity = useCallback(() => {
    startTransition('singularity');
  }, [startTransition]);

  const toggle = useCallback(() => {
    startTransition(phase === 'singularity' ? 'clarity' : 'singularity');
  }, [phase, startTransition]);

  return {
    phase,
    progress: spring.progress,
    isTransitioning,
    transitionToClarity,
    transitionToSingularity,
    toggle,
  };
}

// ═══════════════════════════════════════════════════════════════════
// COMPONENT: DissolveTransition
// ═══════════════════════════════════════════════════════════════════

export function DissolveTransition({
  phase,
  onComplete,
  duration = 2000,
  children,
}: DissolveTransitionProps) {
  const prevPhase = useRef(phase);
  
  const [spring, api] = useSpring(() => ({
    progress: phase === 'clarity' ? 1 : 0,
    config: { duration, easing: (t: number) => t * t * (3 - 2 * t) },
  }));

  useEffect(() => {
    if (prevPhase.current !== phase) {
      prevPhase.current = phase;
      
      api.start({
        progress: phase === 'clarity' ? 1 : 0,
        onRest: () => {
          onComplete?.();
        },
      });
    }
  }, [phase, api, onComplete]);

  return <>{children(spring.progress.get())}</>;
}

// ═══════════════════════════════════════════════════════════════════
// COMPONENT: TransitionOverlay
// ═══════════════════════════════════════════════════════════════════

interface TransitionOverlayProps {
  progress: number;
  className?: string;
}

export function TransitionOverlay({ progress, className = '' }: TransitionOverlayProps) {
  // Edge glow intensity peaks at 50% progress
  const glowIntensity = 1 - Math.abs(progress - 0.5) * 2;
  
  return (
    <div 
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        opacity: glowIntensity * 0.5,
        background: `radial-gradient(circle at center, 
          rgba(0, 255, 136, ${glowIntensity * 0.3}) 0%, 
          transparent 70%
        )`,
      }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// COMPONENT: ClarityReveal
// ═══════════════════════════════════════════════════════════════════

interface ClarityRevealProps {
  progress: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reveals clarity content as dissolve progresses
 */
export function ClarityReveal({ progress, children, className = '' }: ClarityRevealProps) {
  // Content fades in after 50% dissolve progress
  const opacity = Math.max(0, (progress - 0.5) * 2);
  const scale = 0.95 + opacity * 0.05;
  const blur = (1 - opacity) * 10;
  
  return (
    <div 
      className={`transition-none ${className}`}
      style={{
        opacity,
        transform: `scale(${scale})`,
        filter: `blur(${blur}px)`,
      }}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// COMPONENT: SingularityFade
// ═══════════════════════════════════════════════════════════════════

interface SingularityFadeProps {
  progress: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * Fades out singularity content as dissolve progresses
 */
export function SingularityFade({ progress, children, className = '' }: SingularityFadeProps) {
  // Content fades out in first 50% of dissolve
  const opacity = Math.max(0, 1 - progress * 2);
  const scale = 1 - progress * 0.1;
  
  return (
    <div 
      className={`transition-none ${className}`}
      style={{
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ANIMATED SPRING VERSIONS
// ═══════════════════════════════════════════════════════════════════

interface AnimatedClarityRevealProps {
  progress: { get: () => number };
  children: React.ReactNode;
  className?: string;
}

export function AnimatedClarityReveal({ progress, children, className = '' }: AnimatedClarityRevealProps) {
  const AnimatedDiv = animated.div;
  
  return (
    <AnimatedDiv
      className={className}
      style={{
        opacity: progress.get() > 0.5 ? (progress.get() - 0.5) * 2 : 0,
        transform: `scale(${0.95 + Math.max(0, (progress.get() - 0.5) * 2) * 0.05})`,
      }}
    >
      {children}
    </AnimatedDiv>
  );
}

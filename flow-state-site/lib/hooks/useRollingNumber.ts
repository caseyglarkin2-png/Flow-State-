/**
 * useRollingNumber Hook
 * 
 * Smooth number transitions when values change.
 * Uses framer-motion's useSpring for fluid animations.
 */

'use client';

import { useEffect, useState } from 'react';
import { useSpring, useMotionValue, useTransform } from 'framer-motion';

interface UseRollingNumberOptions {
  /** Animation duration in milliseconds */
  duration?: number;
  /** Spring stiffness (higher = faster) */
  stiffness?: number;
  /** Spring damping (higher = less bounce) */
  damping?: number;
}

/**
 * Creates an animated number that smoothly transitions to new values.
 * Respects prefers-reduced-motion preference.
 * 
 * @param targetValue - The target number value
 * @param options - Animation configuration
 * @returns The current animated value
 * 
 * @example
 * ```tsx
 * const animatedValue = useRollingNumber(totalCost, { duration: 500 });
 * return <span>${animatedValue.toLocaleString()}</span>;
 * ```
 */
export function useRollingNumber(
  targetValue: number,
  options: UseRollingNumberOptions = {}
): number {
  const { 
    stiffness = 100, 
    damping = 30 
  } = options;

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Motion value for spring animation
  const motionValue = useMotionValue(targetValue);
  
  // Spring animation config
  const springValue = useSpring(motionValue, {
    stiffness,
    damping,
    restDelta: 0.01,
  });

  // Track the current display value
  const [displayValue, setDisplayValue] = useState(targetValue);

  // Update motion value when target changes
  useEffect(() => {
    if (prefersReducedMotion) {
      // Instant update when reduced motion is preferred
      setDisplayValue(targetValue);
    } else {
      motionValue.set(targetValue);
    }
  }, [targetValue, motionValue, prefersReducedMotion]);

  // Subscribe to spring value changes
  useEffect(() => {
    if (prefersReducedMotion) return;

    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });

    return unsubscribe;
  }, [springValue, prefersReducedMotion]);

  return displayValue;
}

/**
 * Creates an animated number with formatting support.
 * 
 * @param targetValue - The target number value  
 * @param format - Formatting function (e.g., for currency)
 * @param options - Animation configuration
 * @returns The current animated and formatted value
 */
export function useFormattedRollingNumber(
  targetValue: number,
  format: (value: number) => string,
  options: UseRollingNumberOptions = {}
): string {
  const animatedValue = useRollingNumber(targetValue, options);
  return format(animatedValue);
}

/**
 * Creates an animated currency value.
 * 
 * @param targetValue - The target USD value
 * @param options - Animation configuration
 * @returns The current animated currency string
 */
export function useRollingCurrency(
  targetValue: number,
  options: UseRollingNumberOptions = {}
): string {
  return useFormattedRollingNumber(
    targetValue,
    (value) => new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value),
    options
  );
}

/**
 * Creates an animated percentage value.
 * 
 * @param targetValue - The target percentage (0-100)
 * @param decimals - Decimal places to show
 * @param options - Animation configuration
 * @returns The current animated percentage string
 */
export function useRollingPercent(
  targetValue: number,
  decimals: number = 1,
  options: UseRollingNumberOptions = {}
): string {
  const animatedValue = useRollingNumber(targetValue * (10 ** decimals), options);
  return `${(animatedValue / (10 ** decimals)).toFixed(decimals)}%`;
}

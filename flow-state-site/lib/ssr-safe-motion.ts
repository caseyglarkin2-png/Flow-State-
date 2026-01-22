'use client';

import { useEffect, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const hasWindow = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function';

/**
 * Read the current prefers-reduced-motion setting without throwing during SSR.
 */
export function getPrefersReducedMotion(): boolean {
  if (!hasWindow()) return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * React hook that mirrors prefers-reduced-motion and avoids SSR hydration errors.
 */
export function useSSRSafeReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => getPrefersReducedMotion());

  useEffect(() => {
    if (!hasWindow()) return undefined;

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);

    // Sync in case the initial render happened before matchMedia was available
    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

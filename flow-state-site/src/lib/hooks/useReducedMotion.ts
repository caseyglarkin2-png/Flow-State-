/**
 * useReducedMotion Hook
 * 
 * Detects user's motion preference from system settings.
 * Respects accessibility: prefers-reduced-motion CSS media query.
 * 
 * @returns {boolean} true if user prefers reduced motion
 * 
 * @example
 * const shouldReduceMotion = useReducedMotion();
 * return shouldReduceMotion ? <StaticView /> : <AnimatedView />;
 */

import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return !!window.matchMedia(QUERY).matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // Check if window is available (SSR safety)
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(QUERY);

    // Listen for changes to user preference
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
      return () => mediaQueryList.removeEventListener('change', listener);
    }
    
    // Fallback for older browsers
    mediaQueryList.addListener(listener);
    return () => mediaQueryList.removeListener(listener);
  }, []);

  return prefersReducedMotion;
}

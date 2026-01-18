/**
 * REDUCED MOTION WRAPPER
 * Respects user's accessibility preferences
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ReducedMotionContextValue {
  prefersReducedMotion: boolean;
}

const ReducedMotionContext = createContext<ReducedMotionContextValue>({
  prefersReducedMotion: false,
});

export function ReducedMotionProvider({ children }: { children: React.ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <ReducedMotionContext.Provider value={{ prefersReducedMotion }}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

export function useReducedMotion() {
  return useContext(ReducedMotionContext);
}

// Utility component for conditional animation
export function Motion({
  children,
  animate = true,
}: {
  children: React.ReactNode;
  animate?: boolean;
}) {
  const { prefersReducedMotion } = useReducedMotion();
  
  if (prefersReducedMotion || !animate) {
    return <>{children}</>;
  }

  return <>{children}</>;
}

/**
 * MOTION PRESETS FOR FRAMER MOTION
 * Standardized animations that respect prefers-reduced-motion
 */

import type { Variants, Transition } from 'framer-motion';
import { TOKENS } from './tokens';

// REDUCED MOTION CHECK
export const prefersReducedMotion = 
  typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

// STANDARD TRANSITIONS
export const transitions = {
  fast: {
    duration: TOKENS.motion.fast / 1000,
    ease: [0.4, 0, 0.2, 1],
  },
  normal: {
    duration: TOKENS.motion.normal / 1000,
    ease: [0.4, 0, 0.2, 1],
  },
  slow: {
    duration: TOKENS.motion.slow / 1000,
    ease: [0.4, 0, 0.2, 1],
  },
} as const satisfies Record<string, Transition>;

// FADE IN VARIANTS
export const fadeIn: Variants = {
  hidden: { 
    opacity: 0,
  },
  visible: { 
    opacity: 1,
    transition: prefersReducedMotion ? { duration: 0 } : transitions.normal,
  },
};

// SLIDE UP VARIANTS
export const slideUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: prefersReducedMotion ? 0 : 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: prefersReducedMotion ? { duration: 0 } : transitions.normal,
  },
};

// SCALE IN VARIANTS
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: prefersReducedMotion ? 1 : 0.95,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: prefersReducedMotion ? { duration: 0 } : transitions.normal,
  },
};

// STAGGER CHILDREN
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: prefersReducedMotion 
      ? { duration: 0 } 
      : {
          ...transitions.normal,
          staggerChildren: 0.1,
        },
  },
};

// STAGGER ITEM
export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: prefersReducedMotion ? 0 : 10,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: prefersReducedMotion ? { duration: 0 } : transitions.fast,
  },
};

// PULSE (subtle, for status indicators)
export const pulse: Variants = {
  initial: { 
    scale: 1, 
    opacity: 0.8,
  },
  animate: prefersReducedMotion 
    ? { scale: 1, opacity: 0.8 }
    : {
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
};

// BEFORE/AFTER TOGGLE
export const toggleSlide: Variants = {
  before: { 
    x: prefersReducedMotion ? 0 : '-100%',
    transition: prefersReducedMotion ? { duration: 0 } : transitions.normal,
  },
  after: { 
    x: prefersReducedMotion ? 0 : '0%',
    transition: prefersReducedMotion ? { duration: 0 } : transitions.normal,
  },
};

// PROGRESS BAR FILL
export const progressFill: Variants = {
  empty: { scaleX: 0 },
  filled: (progress: number) => ({
    scaleX: prefersReducedMotion ? progress : progress,
    transition: prefersReducedMotion ? { duration: 0 } : transitions.slow,
  }),
};

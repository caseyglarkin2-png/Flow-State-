/**
 * Design System Tokens
 * 
 * Single source of truth for visual design decisions.
 * Import these constants instead of hardcoding values.
 * 
 * Usage:
 * import { COLORS, SPACING, TYPOGRAPHY } from '@/src/lib/design/tokens';
 */

export const SPACING = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  xxl: '3rem',     // 48px
  xxxl: '4rem',    // 64px
} as const;

export const TYPOGRAPHY = {
  Display: { size: '3.5rem', weight: 700, lineHeight: 1.1 },
  H1: { size: '2.5rem', weight: 700, lineHeight: 1.2 },
  H2: { size: '2rem', weight: 700, lineHeight: 1.3 },
  H3: { size: '1.5rem', weight: 600, lineHeight: 1.4 },
  H4: { size: '1.25rem', weight: 600, lineHeight: 1.4 },
  Body: { size: '1rem', weight: 400, lineHeight: 1.5 },
  Small: { size: '0.875rem', weight: 400, lineHeight: 1.5 },
  Tiny: { size: '0.75rem', weight: 400, lineHeight: 1.5 },
} as const;

export const COLORS = {
  // Primary palette
  Void: '#232A35',      // Dark background
  Neon: '#D91411',      // Variance / alert / accent (red)
  Flow: '#05ACEB',      // Action / link (blue)
  Steel: '#8892A8',     // Neutral text / secondary
  White: '#FFFFFF',
  Black: '#000000',
  
  // Extended palette
  VoidLight: '#2E3544',   // Lighter void for cards
  VoidDark: '#1A1F2B',    // Darker void for sections
  NeonDark: '#B00F0D',    // Darker neon for hover
  FlowDark: '#0488BF',    // Darker flow for hover
  SteelLight: '#A5ADBD',  // Lighter steel
  SteelDark: '#6C7688',   // Darker steel
} as const;

export const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
} as const;

export const BORDERS = {
  width: {
    thin: '1px',
    medium: '2px',
    thick: '4px',
  },
  radius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    full: '9999px',
  },
} as const;

export const TRANSITIONS = {
  fast: '150ms',
  medium: '300ms',
  slow: '500ms',
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',
} as const;

/**
 * Z-index layers (prevent z-index wars)
 */
export const Z_INDEX = {
  base: 0,
  dropdown: 100,
  modal: 200,
  toast: 300,
  tooltip: 400,
} as const;

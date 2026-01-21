/**
 * DESIGN TOKENS
 * Single source of truth for spacing, typography, motion, and visual system
 */

/**
 * Brand color palette
 * Used for both CSS and WebGL shaders
 */
export const COLORS = {
  // Core brand
  void: '#050505',
  neon: '#00B4FF',
  ember: '#FF2A00',
  carbon: '#1A1A1A',
  steel: '#A0A0A0',
  steelDim: '#707070',
  
  // Variance Tax additions
  ebonyClay: '#232A35',
  freightrollRed: '#D91411',
  cerulean: '#05ACEB',
  
  // Semantic aliases
  variance: '#D91411',   // FreightRoll red - chaos/cost
  fluidity: '#05ACEB',   // Cerulean - order/savings
} as const;

/**
 * Colors as normalized RGB arrays for WebGL shaders
 */
export const COLORS_GL = {
  void: [0.02, 0.02, 0.02] as const,
  neon: [0.0, 0.706, 1.0] as const,
  ember: [1.0, 0.165, 0.0] as const,
  carbon: [0.102, 0.102, 0.102] as const,
  steel: [0.627, 0.627, 0.627] as const,
  ebonyClay: [0.137, 0.165, 0.208] as const,
  freightrollRed: [0.851, 0.078, 0.067] as const,
  cerulean: [0.02, 0.675, 0.922] as const,
  variance: [0.851, 0.078, 0.067] as const,
  fluidity: [0.02, 0.675, 0.922] as const,
} as const;

export const TOKENS = {
  // SPACING SCALE (based on 4px grid)
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
    '5xl': '8rem',   // 128px
  },

  // RADIUS SCALE
  radius: {
    sm: '0.5rem',    // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    full: '9999px',
  },

  // SHADOW SCALE
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    neon: '0 0 20px rgba(0, 180, 255, 0.3)',
    'neon-strong': '0 0 40px rgba(0, 180, 255, 0.6)',
  },

  // MOTION DURATIONS (ms)
  motion: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 800,
  },

  // MOTION EASING
  easing: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },

  // BORDER WIDTHS
  border: {
    thin: '1px',
    medium: '2px',
    thick: '4px',
  },

  // Z-INDEX SCALE
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },
} as const;

// UTILITY: Get motion duration in CSS format
export const getMotionDuration = (speed: keyof typeof TOKENS.motion) => 
  `${TOKENS.motion[speed]}ms`;

// UTILITY: Get easing in CSS format
export const getEasing = (type: keyof typeof TOKENS.easing) => 
  TOKENS.easing[type];

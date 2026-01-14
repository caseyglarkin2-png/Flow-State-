/**
 * Content Design System - Typography and Spacing Tokens
 * 
 * Usage: import { typography, spacing, badge } from '@/lib/contentTokens';
 * Apply with cn() or template literals.
 * 
 * Voice: Freight Marketer. Punchy, confident, direct. No fluff. No em dashes.
 * Visual: Dark void background, neon accent, steel body text.
 */

/**
 * Typography Tokens
 * These define the visual hierarchy for all marketing content.
 */
export const typography = {
  // Page titles - massive, bold, high contrast
  h1: 'text-4xl md:text-5xl font-semibold tracking-tight text-white',
  
  // Section headings - clear hierarchy
  h2: 'text-2xl md:text-3xl font-semibold tracking-tight text-white',
  
  // Subsection headings
  h3: 'text-xl md:text-2xl font-semibold tracking-tight text-white',
  
  // Card titles and small headings
  h4: 'text-base font-semibold text-white',
  
  // Body text - readable, good contrast on dark
  body: 'text-[17px] text-steel leading-8 max-w-[72ch]',
  bodyLarge: 'text-lg text-steel leading-8 max-w-[72ch]',
  bodyXL: 'text-xl text-steel leading-9 max-w-[72ch]',
  
  // Muted/secondary text
  muted: 'text-sm text-steel/70',
  mutedSmall: 'text-xs text-steel/60',
  
  // Eyebrow/kicker text
  eyebrow: 'text-xs uppercase tracking-[0.2em] text-neon/70 font-medium',
  
  // Links
  link: 'text-neon hover:text-neon/80 transition-colors',
  linkUnderline: 'text-neon hover:text-neon/80 underline underline-offset-2 transition-colors',
  
  // Code/monospace
  mono: 'font-mono text-sm',
  
  // Stats/numbers
  stat: 'text-3xl md:text-4xl font-bold text-white',
  statLabel: 'text-sm text-steel/70 uppercase tracking-wider',
} as const;

/**
 * Spacing Tokens
 * Consistent vertical rhythm throughout.
 */
export const spacing = {
  // Section padding
  section: 'py-12 first:pt-0',
  sectionLarge: 'py-16 first:pt-0',
  
  // Content containers
  containerNarrow: 'mx-auto max-w-4xl px-6',
  containerWide: 'mx-auto max-w-6xl px-6',
  containerFull: 'mx-auto max-w-7xl px-6',
  
  // Vertical stacks
  stackTight: 'space-y-3',
  stackNormal: 'space-y-6',
  stackLoose: 'space-y-8',
  
  // Grid gaps
  gridTight: 'gap-4',
  gridNormal: 'gap-6',
  gridLoose: 'gap-8',
} as const;

/**
 * Badge/Chip Tokens
 */
export const badge = {
  // Primary neon badges
  primary: 'px-2.5 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-medium',
  
  // Muted/secondary badges
  secondary: 'px-2.5 py-1 rounded-full bg-carbon border border-neon/10 text-steel text-xs',
  
  // Status badges
  success: 'px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs',
  warning: 'px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs',
  error: 'px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs',
} as const;

/**
 * Card Tokens
 */
export const card = {
  // Standard card
  base: 'rounded-2xl border border-neon/20 bg-carbon/50 p-6',
  
  // Interactive card
  interactive: 'rounded-2xl border border-neon/20 bg-carbon/50 p-6 hover:border-neon/40 hover:bg-carbon/70 transition',
  
  // Highlighted card
  highlight: 'rounded-2xl border border-neon/30 bg-neon/5 p-6',
  
  // Compact card
  compact: 'rounded-xl border border-neon/10 bg-carbon/50 p-4',
} as const;

/**
 * Button Tokens
 */
export const button = {
  // Primary CTA
  primary: 'inline-flex items-center gap-2 rounded-xl bg-neon px-5 py-2.5 text-sm font-medium text-void hover:bg-neon/90 transition',
  primaryLarge: 'inline-flex items-center gap-2 rounded-xl bg-neon px-8 py-4 font-bold text-void hover:bg-white hover:text-void transition-all',
  
  // Secondary/outline
  secondary: 'inline-flex items-center gap-2 rounded-xl border border-neon/30 bg-carbon/50 px-5 py-2.5 text-sm font-medium text-white hover:border-neon/50 transition',
  
  // Ghost/text
  ghost: 'inline-flex items-center gap-1 text-sm text-neon hover:text-neon/80 transition-colors',
} as const;

/**
 * Callout/Alert Variants
 */
export const callout = {
  neutral: {
    wrapper: 'rounded-2xl border border-neon/20 bg-carbon/50 p-6',
    title: 'text-base font-semibold text-white',
    body: 'text-[15px] text-steel leading-relaxed',
  },
  info: {
    wrapper: 'rounded-2xl border border-neon/30 bg-neon/5 p-6',
    title: 'text-base font-semibold text-neon',
    body: 'text-[15px] text-steel leading-relaxed',
  },
  warning: {
    wrapper: 'rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6',
    title: 'text-base font-semibold text-amber-400',
    body: 'text-[15px] text-steel leading-relaxed',
  },
  success: {
    wrapper: 'rounded-2xl border border-green-500/30 bg-green-500/5 p-6',
    title: 'text-base font-semibold text-green-400',
    body: 'text-[15px] text-steel leading-relaxed',
  },
} as const;

/**
 * Grid layout helpers
 */
export const grid = {
  cols2: 'grid gap-6 md:grid-cols-2',
  cols3: 'grid gap-4 md:grid-cols-2 lg:grid-cols-3',
  cols4: 'grid gap-4 md:grid-cols-2 lg:grid-cols-4',
  autoFit: 'grid gap-4 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]',
} as const;

/**
 * Page layout with optional sidebar
 */
export const layout = {
  // Main content with right rail TOC
  withTOC: 'lg:grid lg:grid-cols-[1fr_220px] lg:gap-12',
  // Main content only
  single: 'max-w-[72ch]',
} as const;

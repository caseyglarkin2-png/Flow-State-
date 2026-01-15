/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * UNIFIED CTA SYSTEM - Single Source of Truth
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Strategy:
 * - PRIMARY: "Apply for Access" → co-development cohort (Founding Member Program)
 * - SECONDARY: "Run ROI" → self-serve proof step
 * - TERTIARY: "Quantify Variance Tax" → diagnostic for top-of-funnel
 * 
 * Do NOT use: "Request Demo", "Book a Demo", "Get a Quote" as primary CTAs.
 * These feel commodity. "Apply for Access" signals selectivity and partnership.
 */

export const PRIMARY_CTA = {
  label: 'Apply for Access',
  href: '/contact?intent=qualify',
  ariaLabel: 'Apply for Founding Member Program access',
  microcopy: 'See if you qualify for the Founding Member Program.',
  icon: 'Velocity',
} as const;

export const SECONDARY_CTA = {
  label: 'Run ROI',
  href: '/roi',
  ariaLabel: 'Calculate your ROI with our interactive model',
  microcopy: 'Board-ready in 3 minutes.',
  icon: 'Metrics',
} as const;

export const TERTIARY_CTA = {
  label: 'Quantify Variance Tax',
  href: '/diagnostic',
  ariaLabel: 'Run the Variance Tax diagnostic calculator',
  microcopy: '60-second assessment. No forms.',
  icon: 'Crosshair',
} as const;

/**
 * Founding Member Program callout content
 */
export const FOUNDING_MEMBER = {
  eyebrow: 'Founding Member Program',
  headline: 'Co-Development Cohort',
  bullets: [
    'Priority roadmap influence (Reefer, Flatbed, Cross-Dock)',
    'Pricing lock during build phase',
    'Direct access to engineering team',
  ],
  qualifier: 'Best fit for 10+ sites or high-variance nodes.',
  cta: PRIMARY_CTA,
} as const;

/**
 * Helper to get CTA by intent
 */
export function getCTA(intent: 'apply' | 'roi' | 'diagnostic' = 'apply') {
  switch (intent) {
    case 'apply':
      return PRIMARY_CTA;
    case 'roi':
      return SECONDARY_CTA;
    case 'diagnostic':
      return TERTIARY_CTA;
    default:
      return PRIMARY_CTA;
  }
}

/**
 * CTA placement rules by page type
 */
export const CTA_PLACEMENT = {
  homepage: {
    primary: PRIMARY_CTA,
    secondary: SECONDARY_CTA,
    tertiary: TERTIARY_CTA,
  },
  product: {
    primary: PRIMARY_CTA,
    secondary: SECONDARY_CTA,
  },
  solutions: {
    primary: PRIMARY_CTA,
    secondary: SECONDARY_CTA,
  },
  pricing: {
    primary: PRIMARY_CTA,
    secondary: SECONDARY_CTA,
  },
  roi: {
    nextStep: PRIMARY_CTA,
  },
  diagnostic: {
    nextStep: PRIMARY_CTA,
  },
} as const;

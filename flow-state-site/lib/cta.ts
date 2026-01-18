/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * UNIFIED CTA SYSTEM - Single Source of Truth
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Strategy (UPDATED - MATCHES BRAND CONFIG):
 * - PRIMARY: "See If You Qualify" → Co-Development Program qualification
 * - SECONDARY: "Calculate ROI" → self-serve proof step
 * - TERTIARY: "View Evidence Vault" → procurement/proof artifacts
 * 
 * PROGRAM NAME: "Co-Development Program" (with "Founding Partner Pricing" as supporting copy)
 * 
 * Do NOT use: "Request Demo", "Book a Demo", "Founding Member", "Apply for Access"
 * These create naming confusion. Use BRAND config values consistently.
 */

export const PRIMARY_CTA = {
  label: 'See If You Qualify',
  href: '/contact?intent=qualify',
  ariaLabel: 'See if you qualify for the Co-Development Program',
  microcopy: 'Founding Partner pricing. Limited spots.',
  icon: 'Velocity',
} as const;

export const SECONDARY_CTA = {
  label: 'Calculate ROI',
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

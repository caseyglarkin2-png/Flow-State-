/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * UNIFIED CTA SYSTEM - Single Source of Truth
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Strategy (UPDATED 2026 - UNIFIED NARRATIVE):
 * - PRIMARY: "Book a Network Audit" → Discovery call, high-intent conversion
 * - SECONDARY: "Apply for Co-Development" → Program enrollment, roadmap influence
 * - UTILITY: "Run ROI" | "Launch Simulation" → Self-serve proof tools
 * 
 * PROGRAM NAME: "Co-Development Program" (ONLY - no "Founding Member" variants)
 * 
 * Do NOT use: "See If You Qualify", "Founding Member", "Apply for Access", "Request Demo"
 * These create naming confusion. Use BRAND config values consistently.
 */

export const PRIMARY_CTA = {
  label: 'Book a Network Audit',
  href: '/contact?intent=audit',
  ariaLabel: 'Book a network audit discovery call',
  microcopy: 'Identify 1–2 pilot sites. Scope co-development opportunities.',
  icon: 'Velocity',
} as const;

export const SECONDARY_CTA = {
  label: 'Apply for Co-Development',
  href: '/co-development',
  ariaLabel: 'Apply for the Co-Development Program',
  microcopy: 'Roadmap influence. Early adopter pricing. Limited spots.',
  icon: 'Ignite',
} as const;

export const UTILITY_CTA_ROI = {
  label: 'Run ROI',
  href: '/roi',
  ariaLabel: 'Run the ROI calculator',
  microcopy: 'Board-ready in 3 minutes.',
  icon: 'Metrics',
} as const;

export const UTILITY_CTA_SIMULATION = {
  label: 'Launch Simulation',
  href: '/simulations',
  ariaLabel: 'Launch interactive simulations',
  microcopy: 'Network intelligence, variance tax, or ROI pro mode.',
  icon: 'Crosshair',
} as const;

/**
 * Founding Member Program callout content
 */
export const FOUNDING_MEMBER = {
  eyebrow: 'Co-Development Program',
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
      return UTILITY_CTA_SIMULATION;
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
    utility: UTILITY_CTA_ROI,
  },
  product: {
    primary: PRIMARY_CTA,
    secondary: SECONDARY_CTA,
  },
  solutions: {
    primary: PRIMARY_CTA,
    secondary: SECONDARY_CTA,
    utility: UTILITY_CTA_ROI,
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

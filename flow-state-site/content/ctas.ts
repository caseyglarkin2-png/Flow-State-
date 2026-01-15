/**
 * Centralized CTA configuration (DEPRECATED - use /lib/cta.ts instead)
 * Kept for backward compatibility
 */

export const PRIMARY_CTA = {
  label: 'Apply for Access',
  href: '/contact?intent=qualify',
  description: 'See if you qualify for the Founding Member Program',
  icon: 'Velocity',
} as const;

export const SECONDARY_CTA = {
  label: 'Run ROI',
  href: '/roi',
  description: 'Board-ready in 3 minutes',
  icon: 'Metrics',
} as const;

export const PERSONA_CTAS = {
  finance: {
    label: 'Calculate ROI',
    href: '/roi',
    description: 'Build your ROI model. Board-ready PDF in 5 minutes.',
    icon: 'DollarSign',
  },
  operations: {
    label: 'Audit Your Yard',
    href: '/yardbuilder',
    description: 'Map your facility. Identify throughput bottlenecks.',
    icon: 'Warehouse',
  },
  security: {
    label: 'View Security Evidence',
    href: '/resources/procurement',
    description: 'Evidence vault. Procurement-ready proof.',
    icon: 'Shield',
  },
} as const;

export const TERTIARY_ACTIONS = {
  applyForAccess: {
    label: 'Apply for Access',
    href: '/qualify',
    description: 'Request membership evaluation',
  },
  viewPricing: {
    label: 'See Pricing',
    href: '/pricing',
    description: 'Transparent, facility-based pricing',
  },
  downloadTrustPacket: {
    label: 'Download Trust Packet',
    description: 'Security, compliance, and implementation details',
  },
} as const;

/**
 * Use this to ensure consistent CTA labeling across the site
 */
export function getCTAConfig(type: 'primary' | 'secondary' | keyof typeof PERSONA_CTAS) {
  if (type === 'primary') return PRIMARY_CTA;
  if (type === 'secondary') return SECONDARY_CTA;
  return PERSONA_CTAS[type];
}

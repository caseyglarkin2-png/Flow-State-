/**
 * Centralized CTA configuration
 * Prevents drift and ensures consistent conversion paths
 */

export const PRIMARY_CTA = {
  label: 'Run Network Leak Diagnostic',
  href: '/diagnostic',
  description: 'See exactly what your network is costing you',
  icon: 'Crosshair',
} as const;

export const SECONDARY_CTA = {
  label: 'See Network Effect Simulation',
  href: '/singularity',
  description: 'Watch ROI compound with scale',
  icon: 'Nexus',
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
    href: '/security',
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

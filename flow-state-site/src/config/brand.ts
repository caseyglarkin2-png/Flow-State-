/**
 * Single source of truth for all brand identity, messaging, and CTAs.
 * Import this config instead of hardcoding strings throughout the codebase.
 */

export const BRAND = {
  // Core brand identity
  productName: 'YardFlow',
  byline: 'by FreightRoll',
  fullProductName: 'YardFlow by FreightRoll',
  legalCompanyName: 'FreightRoll',
  
  // Optional alternate product names (use sparingly, only for specific modules)
  altProductNames: {
    riskModule: 'Forsite', // Only for Risk/Identity module labeling, NOT headline brand
  },

  // Domain and contact
  domain: 'freightroll.com',
  emails: {
    contact: 'casey@freightroll.com',
    security: 'security@freightroll.com',
    privacy: 'privacy@freightroll.com',
    legal: 'legal@freightroll.com',
    press: 'press@freightroll.com',
    status: 'status@freightroll.com',
  },

  // Social/external links
  links: {
    linkedin: 'https://www.linkedin.com/company/freightroll',
    twitter: 'https://twitter.com/freightroll',
    calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/freightroll',
  },

  // Primary CTAs and their destinations
  ctas: {
    primary: {
      label: 'Calculate ROI',
      href: '/roi',
    },
    secondary: {
      label: 'Get Yard Report',
      href: '/yardbuilder',
    },
    contact: {
      label: 'Request Demo',
      href: '/contact',
    },
    qualify: {
      label: 'Apply for Founding Membership',
      href: '/qualify?intent=founding',
    },
  },

  // Taglines and positioning
  taglines: {
    hero: 'Cut dwell. Recover detention. Unlock capacity. Secure the gate.',
    subhero: 'Yard orchestration software for enterprise logistics networks.',
    elevator: 'YardFlow by FreightRoll builds yard orchestration software for enterprise logistics networks. We focus on repeatable workflows that produce defensible timestamps and operational truth.',
  },

  // Value propositions (three pillars)
  pillars: {
    orchestration: {
      title: 'Yard Orchestration',
      description: 'Throughput, dwell, detention, exception handling',
      ctaHref: '/product',
    },
    security: {
      title: 'Identity + Fraud Prevention',
      description: 'The yard as an attack surface: verify, authorize, record',
      ctaHref: '/risk',
    },
    network: {
      title: 'Network Intelligence',
      description: 'Cross-site standardization and rollout playbook',
      ctaHref: '/singularity',
    },
  },

  // Legal/compliance
  legal: {
    privacyPolicyUrl: '/privacy',
    termsOfServiceUrl: '/terms',
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: 'FreightRoll',
  },
} as const;

/**
 * Helper functions for brand-consistent text generation
 */
export const getBrandedTitle = (pageTitle: string): string => {
  return `${pageTitle} | ${BRAND.fullProductName}`;
};

export const getBrandedDescription = (description?: string): string => {
  return description || BRAND.taglines.subhero;
};

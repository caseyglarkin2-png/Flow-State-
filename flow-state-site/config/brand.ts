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

  // Proof points (credibility anchors)
  proof: {
    drivers: '200K+', // Single source of truth - update here when numbers change
    label: 'drivers',
    tagline: 'Built by FreightRoll',
    facilities: '58', // Active deployment sites
    systems: '42', // Live systems
  },

  // Primary CTAs and their destinations (STANDARDIZED - USE THESE EVERYWHERE)
  ctas: {
    primary: {
      label: 'Book a Network Audit',
      href: '/contact?intent=audit',
      description: 'Primary conversion action - discovery call',
    },
    secondary: {
      label: 'Apply for Co-Development',
      href: '/co-development',
      description: 'Join the co-development program for roadmap influence',
    },
    utility: {
      roi: {
        label: 'Run ROI',
        href: '/roi',
        description: 'Board-ready economics calculator',
      },
      simulation: {
        label: 'Launch Simulation',
        href: '/simulations',
        description: 'Interactive variance/network models',
      },
    },
  },

  // Program naming (UNIFIED - use consistently)
  program: {
    name: 'Co-Development Program',
    tagline: 'Founding Partner Pricing',
    description: 'Limited spots for operators who want roadmap control and legacy pricing.',
  },

  // Taglines and positioning
  taglines: {
    hero: 'Cut dwell. Recover detention. Unlock capacity. Secure the gate.',
    subhero: 'Yard orchestration software for enterprise logistics networks.',
    elevator: 'YardFlow by FreightRoll builds yard orchestration software for enterprise logistics networks. We focus on repeatable workflows that produce defensible timestamps and operational truth.',
  },

  // Unified narrative framework (6-step song sheet)
  narrative: {
    step1: {
      title: 'The Yard Is the Constraint',
      hook: 'Every freight network has a black hole. The yard.',
      description: 'Uncertainty compounds into detention, lost capacity, and operational noise. The yard is where throughput dies.',
    },
    step2: {
      title: 'Standardize the Event Stream',
      hook: '10 common denominators across every yard.',
      description: 'Check-in, authorization, dock assignment, drop rules, enforcement, exceptions, compliance, departure, evidence. Standards create predictability.',
    },
    step3: {
      title: 'Variance Is a Tax',
      hook: 'Every manual handoff creates financial noise.',
      description: 'Random queue times, missing trailers, detention disputes. Variance kills margin. Predictability compounds.',
    },
    step4: {
      title: 'Throughput Is the Primary Metric',
      hook: 'Synthetic capacity → operating margin.',
      description: 'Standards unlock latent throughput. Dwell reduction = detention recovery = capacity without capex. CFO math, not IT project.',
    },
    step5: {
      title: 'Network Intelligence Compounds',
      hook: 'Standardization enables cross-site learning.',
      description: 'One site proves ROI. Multi-site rollout compounds. Network intelligence only works after standardization.',
    },
    step6: {
      title: 'Co-Development Is the Path',
      hook: 'Founding partners get roadmap control + legacy pricing.',
      description: 'Limited spots for operators who want to influence the product roadmap and lock in founding partner rates.',
    },
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

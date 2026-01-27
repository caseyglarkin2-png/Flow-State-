/**
 * Sections Content Model
 * Sprint 0.2a: Content Model for Homepage/Proof/Scale Sections
 * 
 * Defines reusable section types and content based on RFQ Deck narrative
 */

export type SectionType = 
  | 'hero'
  | 'proof'
  | 'scale'
  | 'implementation'
  | 'cta'
  | 'testimonial';

export type CtaStyle = 'primary' | 'secondary' | 'ghost';

export interface CtaButton {
  label: string;
  href: string;
  style: CtaStyle;
  variant?: 'book-audit' | 'run-roi' | 'schedule-call' | 'apply-codev';
}

export interface Section {
  id: string;
  type: SectionType;
  headline?: string;
  subheading?: string;
  body?: string;
  ctas?: CtaButton[];
  /** Optional background variant for visual hierarchy */
  bgVariant?: 'void' | 'flow' | 'gradient';
}

/**
 * HOMEPAGE SECTIONS
 */

export const HOME_HERO: Section = {
  id: 'home-hero',
  type: 'hero',
  headline: 'We already solved this',
  subheading: '1M+ driver check-ins. 0.2% failure rate. Here\'s the proof.',
  body: 'YardFlow by FreightRoll is a proven yard network system deployed in production flatbed and reefer operations. Join the co-development program to scale this to your network.',
  ctas: [
    {
      label: 'See the Proof',
      href: '/proof',
      style: 'primary',
      variant: 'book-audit',
    },
    {
      label: 'Join Co-Development',
      href: '/co-development',
      style: 'secondary',
      variant: 'apply-codev',
    },
  ],
  bgVariant: 'void',
};

export const HOME_PROOF_PREVIEW: Section = {
  id: 'home-proof-preview',
  type: 'proof',
  headline: 'Production-validated. Not a pilot.',
  subheading: 'Real data from live flatbed and reefer operations',
  body: 'YardFlow processes 1M+ driver check-ins with 0.2% failure rate. 200K drivers onboarded. ~70s average check-in time. This is not a model. This is measured performance.',
  ctas: [
    {
      label: 'View Full Proof',
      href: '/proof',
      style: 'primary',
    },
  ],
  bgVariant: 'gradient',
};

export const HOME_SCALE_CTA: Section = {
  id: 'home-scale-cta',
  type: 'scale',
  headline: 'Ready to scale this to your network?',
  subheading: 'Two paths: Co-Development or Full Implementation',
  body: 'Co-Development ($350K): Join 2 operators building flatbed or reefer vertical. Full Implementation ($800K): Deploy the proven system to your network.',
  ctas: [
    {
      label: 'Explore Scale Options',
      href: '/scale',
      style: 'primary',
    },
    {
      label: 'Apply for Co-Dev',
      href: '/co-development',
      style: 'secondary',
      variant: 'apply-codev',
    },
  ],
};

/**
 * PROOF PAGE SECTIONS
 */

export const PROOF_HERO: Section = {
  id: 'proof-hero',
  type: 'hero',
  headline: 'The proof you asked for',
  subheading: 'Measured performance from production flatbed and reefer yards',
  body: 'Every metric below is real. No pilots. No extrapolations. This is what YardFlow delivers in live operations.',
  bgVariant: 'void',
};

export const PROOF_MEASURED: Section = {
  id: 'proof-measured',
  type: 'proof',
  headline: 'Measured Performance',
  subheading: 'Production data from 1M+ driver check-ins',
  body: 'These metrics are directly measured from live YardFlow deployments in flatbed and reefer networks.',
};

export const PROOF_MODELED: Section = {
  id: 'proof-modeled',
  type: 'proof',
  headline: 'Modeled ROI (Based on Deep Model)',
  subheading: 'Conservative Year 1 projections validated against Primo data',
  body: 'ROI calculations use the Deep Model economics framework—locked formulas validated against real-world variance tax reduction. See /roi for full calculator.',
  ctas: [
    {
      label: 'Run ROI Calculator',
      href: '/roi',
      style: 'primary',
      variant: 'run-roi',
    },
  ],
};

/**
 * SCALE PAGE SECTIONS
 */

export const SCALE_HERO: Section = {
  id: 'scale-hero',
  type: 'hero',
  headline: 'Two ways to scale YardFlow to your network',
  subheading: 'Co-Development ($350K) or Full Implementation ($800K)',
  body: 'YardFlow is proven in flatbed and reefer operations. Co-Development at $350K shares costs across 2 operators. Full Implementation at $800K deploys the complete network. Choose your path based on timeline, customization needs, and budget.',
  bgVariant: 'void',
};

export const SCALE_CODEV_OPTION: Section = {
  id: 'scale-codev',
  type: 'scale',
  headline: 'Co-Development Program',
  subheading: '$350K investment | 2 operators per vertical',
  body: 'Join 1 other operator to co-develop YardFlow for your vertical (flatbed or reefer). $350K investment shared across 2 partners. Get vertical-specific features. 6-month timeline.',
  ctas: [
    {
      label: 'View Co-Dev Details',
      href: '/co-development',
      style: 'primary',
      variant: 'apply-codev',
    },
  ],
};

export const SCALE_FULL_IMPL_OPTION: Section = {
  id: 'scale-full-impl',
  type: 'scale',
  headline: 'Full Implementation',
  subheading: '$800K network deployment | Custom timeline',
  body: 'Deploy the full YardFlow system across your network for $800K. Customized to your operations. Includes yard security + orchestration. 90-day initial deployment, network expansion as needed.',
  ctas: [
    {
      label: 'Schedule Implementation Call',
      href: '/contact',
      style: 'primary',
      variant: 'schedule-call',
    },
  ],
};

export const SCALE_PITFALLS: Section = {
  id: 'scale-pitfalls',
  type: 'scale',
  headline: 'Common pitfalls when scaling yard systems',
  subheading: 'What to avoid (learned the hard way)',
  body: 'Most yard system deployments fail due to: (1) Treating it like a pilot instead of production rollout, (2) Ignoring network effects (value compounds at scale), (3) Underestimating guard workflow change management.',
};

/**
 * HELPER FUNCTIONS
 */

/**
 * Get section by ID
 */
export function getSectionById(id: string): Section | undefined {
  const allSections = [
    HOME_HERO,
    HOME_PROOF_PREVIEW,
    HOME_SCALE_CTA,
    PROOF_HERO,
    PROOF_MEASURED,
    PROOF_MODELED,
    SCALE_HERO,
    SCALE_CODEV_OPTION,
    SCALE_FULL_IMPL_OPTION,
    SCALE_PITFALLS,
  ];

  return allSections.find(section => section.id === id);
}

/**
 * Get sections by type
 */
export function getSectionsByType(type: SectionType): Section[] {
  const allSections = [
    HOME_HERO,
    HOME_PROOF_PREVIEW,
    HOME_SCALE_CTA,
    PROOF_HERO,
    PROOF_MEASURED,
    PROOF_MODELED,
    SCALE_HERO,
    SCALE_CODEV_OPTION,
    SCALE_FULL_IMPL_OPTION,
    SCALE_PITFALLS,
  ];

  return allSections.filter(section => section.type === type);
}

/**
 * Get sections for homepage
 */
export function getHomeSections(): Section[] {
  return [
    HOME_HERO,
    HOME_PROOF_PREVIEW,
    HOME_SCALE_CTA,
  ];
}

/**
 * Get sections for /proof page
 */
export function getProofSections(): Section[] {
  return [
    PROOF_HERO,
    PROOF_MEASURED,
    PROOF_MODELED,
  ];
}

/**
 * Get sections for /scale page
 */
export function getScaleSections(): Section[] {
  return [
    SCALE_HERO,
    SCALE_CODEV_OPTION,
    SCALE_FULL_IMPL_OPTION,
    SCALE_PITFALLS,
  ];
}

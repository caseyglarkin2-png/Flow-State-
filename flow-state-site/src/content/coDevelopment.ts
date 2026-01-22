/**
 * Co-Development Program Content Model
 * 
 * ROLLOUT ALIGNMENT:
 * Network → Protocols → Interoperable Data → Multi-site Adoption → RTLS
 * 
 * Phase 1: Network + Protocol Standardization (available now)
 * Phase 2: Interoperable Data + Multi-site Operations
 * Phase 3: Advanced Modules (includes RTLS)
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type PhaseNumber = 1 | 2 | 3;
export type PhaseAvailability = 'now' | 'upcoming' | 'future';
export type CTAVariant = 'primary' | 'secondary' | 'tertiary';

export interface CoDevPhase {
  id: string;
  number: PhaseNumber;
  name: string;
  shortName: string;
  description: string;
  available: PhaseAvailability;
}

export interface Prerequisite {
  id: string;
  label: string;
  description: string;
}

export interface CoDevModule {
  id: string;
  name: string;
  description: string;
  icon: 'Agent' | 'Velocity' | 'Cortex' | 'Ignite' | 'Shield' | 'Nexus' | 'Timeline';
  phase: PhaseNumber;
  timeline: {
    poc: string;
    scale: string;
  };
  prerequisites: Prerequisite[];
  highlights: string[];
}

export interface EligibilityCard {
  id: string;
  title: string;
  icon: 'Agent' | 'Cortex' | 'Velocity';
  criteria: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CoDevCTA {
  label: string;
  href: string;
  variant: CTAVariant;
}

export interface HowItWorksStep {
  number: number;
  title: string;
  description: string;
}

export interface PartnerBenefit {
  id: string;
  title: string;
  description: string;
  icon: 'Shield' | 'Velocity' | 'Cortex' | 'Agent';
}

export interface CoDevContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
  whyThisOrder: {
    headline: string;
    subheadline: string;
    reasons: Array<{
      title: string;
      description: string;
    }>;
  };
  phases: CoDevPhase[];
  modules: CoDevModule[];
  eligibilityCriteria: EligibilityCard[];
  howItWorks: HowItWorksStep[];
  partnerBenefits: PartnerBenefit[];
  faq: FAQItem[];
  ctas: {
    primary: CoDevCTA;
    secondary: CoDevCTA;
  };
}

// =============================================================================
// PHASES
// =============================================================================

export const phases: CoDevPhase[] = [
  {
    id: 'phase-1',
    number: 1,
    name: 'Network + Protocol Standardization',
    shortName: 'Standardization',
    description: 'Deploy the base platform. Same protocol at every yard. Digital Guard, BOL, Comms, and YMS create the foundation for everything else.',
    available: 'now',
  },
  {
    id: 'phase-2',
    number: 2,
    name: 'Interoperable Data + Multi-site Operations',
    shortName: 'Interoperability',
    description: 'Cross-site visibility, network benchmarking, and automated entry/exit. Your yards speak the same language.',
    available: 'upcoming',
  },
  {
    id: 'phase-3',
    number: 3,
    name: 'Advanced Modules',
    shortName: 'Advanced',
    description: 'Vision-based RTLS, full AI orchestration. These become dramatically easier once yards share protocols, IDs, and event models.',
    available: 'future',
  },
];

// =============================================================================
// RTLS PREREQUISITES (Critical for Phase 3)
// =============================================================================

export const rtlsPrerequisites: Prerequisite[] = [
  {
    id: 'yard-ids',
    label: 'Standardized Yard IDs',
    description: 'Common location taxonomy across all facilities. Slot numbers, dock IDs, and zone definitions must be consistent.',
  },
  {
    id: 'event-model',
    label: 'Interoperable Event Model',
    description: 'Unified timestamps, event types, and handoff definitions. RTLS depends on knowing what "arrival" and "departure" mean at every site.',
  },
  {
    id: 'network-baseline',
    label: 'Network Baseline Complete',
    description: 'Base platform (Digital Guard, BOL, Comms) deployed at 10+ sites. RTLS is a multiplier, not a foundation.',
  },
  {
    id: 'camera-infrastructure',
    label: 'Camera Infrastructure',
    description: 'Compatible camera hardware at target facilities. We provide spec requirements during Phase 2 scoping.',
  },
];

// =============================================================================
// MODULES
// =============================================================================

export const modules: CoDevModule[] = [
  // Phase 1 Modules
  {
    id: 'protocol-baseline',
    name: 'Protocol Baseline Standardization',
    description: 'The foundation. We document your yard workflows, define the standard operating protocol, and deploy the base platform. Every advanced feature builds on this.',
    icon: 'Shield',
    phase: 1,
    timeline: {
      poc: '4–6 weeks',
      scale: '8–12 weeks',
    },
    prerequisites: [],
    highlights: [
      'Same check-in flow at every yard',
      'Unified event taxonomy',
      'Baseline KPI measurement',
      'Integration with TMS/WMS',
    ],
  },
  {
    id: 'automated-entry-exit',
    name: 'Automated Entry/Exit Recognition',
    description: 'Machine vision for license plate + truck ID recognition. Eliminate manual check-in. Instant authentication + yard access control.',
    icon: 'Agent',
    phase: 1,
    timeline: {
      poc: '4–6 weeks',
      scale: '12 weeks',
    },
    prerequisites: [],
    highlights: [
      'License plate recognition',
      'Truck ID matching',
      'Automatic gate control',
      'Driver authentication',
    ],
  },
  {
    id: 'discovery-workshop',
    name: 'Discovery Workshop',
    description: 'Your yard has unique permutations we haven\'t seen yet. We document, scope, and co-develop. You get a productized feature. We get a reusable module.',
    icon: 'Ignite',
    phase: 1,
    timeline: {
      poc: 'Scoping: 2 weeks',
      scale: 'TBD based on scope',
    },
    prerequisites: [],
    highlights: [
      'Custom workflow documentation',
      'Edge case identification',
      'Feature scoping',
      'Roadmap influence',
    ],
  },
  // Phase 2 Modules
  {
    id: 'ai-orchestration-partial',
    name: 'AI-Enabled Yard Orchestration',
    description: 'Predictive dock assignment, dwell anomaly alerts, auto-rescheduling. System suggests what should happen next based on real-time state.',
    icon: 'Cortex',
    phase: 2,
    timeline: {
      poc: '8–10 weeks',
      scale: '20 weeks',
    },
    prerequisites: [
      {
        id: 'baseline-data',
        label: 'Baseline Data Collection',
        description: '30+ days of event data from Phase 1 deployment. AI needs training data.',
      },
      {
        id: 'multi-site',
        label: 'Multi-site Deployment',
        description: 'Base platform at 5+ sites for cross-site pattern recognition.',
      },
    ],
    highlights: [
      'Predictive dock assignment',
      'Dwell anomaly detection',
      'Auto-rescheduling',
      'Real-time optimization',
    ],
  },
  // Phase 3 Modules
  {
    id: 'vision-rtls',
    name: 'Vision-Based RTLS',
    description: 'Passive trailer location tracking using cameras + ML. No GPS tags. Real-time yard map without hardware per trailer.',
    icon: 'Velocity',
    phase: 3,
    timeline: {
      poc: '6–8 weeks',
      scale: '16 weeks',
    },
    prerequisites: rtlsPrerequisites,
    highlights: [
      'Camera-based tracking',
      'No hardware per trailer',
      'Real-time yard map',
      'ML-powered identification',
    ],
  },
];

// =============================================================================
// ELIGIBILITY CRITERIA
// =============================================================================

export const eligibilityCriteria: EligibilityCard[] = [
  {
    id: 'multi-site',
    title: 'Multi-Site Operators',
    icon: 'Agent',
    criteria: [
      '10+ facilities (ideally 20–50 sites)',
      'Mix of complex modes (reefer, flatbed, intermodal)',
      'High-volume yards (100+ trucks/day per site)',
    ],
  },
  {
    id: 'champions',
    title: 'Operational Champions',
    icon: 'Cortex',
    criteria: [
      'VP/SVP Operations with exec sponsorship',
      'Willing to pilot at 1–2 sites quickly',
      'Can commit ops + IT resources for integration',
    ],
  },
  {
    id: 'problems',
    title: 'Real Problems',
    icon: 'Velocity',
    criteria: [
      'Dwell >60 min causing detention hemorrhage',
      'Yard capacity constraints blocking growth',
      'No unified view across facilities',
    ],
  },
];

// =============================================================================
// HOW IT WORKS (Aligned with rollout strategy)
// =============================================================================

export const howItWorks: HowItWorksStep[] = [
  {
    number: 1,
    title: 'Discovery Workshop',
    description: 'We visit 1–2 pilot sites, document workflows, and baseline your KPIs. You tell us where it hurts.',
  },
  {
    number: 2,
    title: 'Protocol Baseline (Phase 1)',
    description: 'Deploy the base platform at pilot sites. Digital Guard, BOL, Comms, and YMS. Same protocol, every yard.',
  },
  {
    number: 3,
    title: 'Scale Across Network',
    description: 'Roll out to 10–20 sites. Standardize operations. Unlock cross-site visibility and benchmarking.',
  },
  {
    number: 4,
    title: 'Unlock Advanced Modules',
    description: 'With the network baseline in place, Phase 2/3 modules (AI orchestration, RTLS) become dramatically easier to deploy.',
  },
];

// =============================================================================
// PARTNER BENEFITS
// =============================================================================

export const partnerBenefits: PartnerBenefit[] = [
  {
    id: 'roadmap',
    title: 'Roadmap Influence',
    description: 'Co-developed features become part of the core product. Your operational needs drive what we build next.',
    icon: 'Shield',
  },
  {
    id: 'priority',
    title: 'Priority Onboarding',
    description: 'Dedicated onboarding team. Weekly syncs. Direct access to product + engineering.',
    icon: 'Velocity',
  },
  {
    id: 'economics',
    title: 'Partner Economics',
    description: 'Pricing and terms discussed during Network Audit call. Co-development partners get favorable economics for early commitment.',
    icon: 'Cortex',
  },
  {
    id: 'artifacts',
    title: 'Board-Ready Artifacts',
    description: 'ROI reports, executive dashboards, compliance documentation. Make the business case internally with data-backed proof.',
    icon: 'Agent',
  },
];

// =============================================================================
// FAQ
// =============================================================================

export const faq: FAQItem[] = [
  {
    question: 'Why does RTLS come after the base platform?',
    answer: 'RTLS depends on standardized yard IDs, event models, and network onboarding. Without a common protocol, RTLS data is fragmented and less valuable. Once the baseline is in place, RTLS deployment is faster and the data is immediately actionable across your network.',
  },
  {
    question: 'What if the POC doesn\'t work?',
    answer: 'POCs are scoped for fast validation. If a feature doesn\'t deliver expected outcomes, we pivot or pause. Base platform deployment continues regardless. No sunk cost.',
  },
  {
    question: 'How do we scope the pilot?',
    answer: 'Network Audit call identifies 1–2 high-impact sites for Phase 1 POC. We prioritize sites with clean data, exec sponsorship, and measurable baseline KPIs (dwell, detention, throughput).',
  },
  {
    question: 'What integrations are required?',
    answer: 'Minimum: TMS/WMS for appointment data. Ideal: gate system, dock scheduling, carrier database. We handle integration via API or file-based sync. IT resources needed for auth + firewall config.',
  },
  {
    question: 'Security review process?',
    answer: 'SOC 2 Type II in progress (Q2 2026 target). Pen test reports available under NDA. Security questionnaire support included. We work with your InfoSec team pre-deployment.',
  },
  {
    question: 'Timeline to first ROI?',
    answer: 'Base platform ROI typically visible within 30–60 days post-deployment: reduced dwell, detention recovery, gate labor savings. Co-developed features have longer validation cycles (12–16 weeks).',
  },
  {
    question: 'Can we pilot at just one site?',
    answer: 'Yes, but network effect requires multi-site deployment. Single-site POC validates tech + ROI; 10+ sites unlock cross-site benchmarking and executive dashboards.',
  },
  {
    question: 'When can we start RTLS?',
    answer: 'After completing Phase 1 (protocol baseline) at 10+ sites and Phase 2 prerequisites. Typically 6–12 months into partnership. We scope RTLS during the Phase 2 planning cycle.',
  },
];

// =============================================================================
// CTAs
// =============================================================================

export const ctas = {
  primary: {
    label: 'Apply for Co-Development',
    href: '/co-development/apply',
    variant: 'primary' as CTAVariant,
  },
  secondary: {
    label: 'Book Network Audit',
    href: '/start-your-map',
    variant: 'secondary' as CTAVariant,
  },
};

// =============================================================================
// COMBINED CONTENT EXPORT
// =============================================================================

export const coDevContent: CoDevContent = {
  hero: {
    badge: 'LIMITED SEATS',
    title: 'Co-Development Program',
    subtitle: 'Build the Yard Network System with us. Get roadmap influence, priority onboarding, and features tailored to your operational reality.',
  },
  whyThisOrder: {
    headline: 'Why Standardization Comes First',
    subheadline: 'Advanced modules like RTLS become dramatically easier—and more valuable—once your yards share the same network, protocols, and event models.',
    reasons: [
      {
        title: 'Integration Risk Reduction',
        description: 'Standardizing network protocols first means RTLS has a foundation to build on. No fragmented data. No site-specific workarounds.',
      },
      {
        title: 'Faster Multi-Site Scaling',
        description: 'Same protocol at every yard = faster rollout. Each deployment follows the same playbook.',
      },
      {
        title: 'Reusable Operating Protocol',
        description: 'Every Phase 1 deployment creates assets (IDs, events, baselines) that Phase 2/3 modules consume automatically.',
      },
      {
        title: 'Data Quality for AI/RTLS',
        description: 'RTLS and AI orchestration need clean, consistent data. Phase 1 creates that data foundation.',
      },
    ],
  },
  phases,
  modules,
  eligibilityCriteria,
  howItWorks,
  partnerBenefits,
  faq,
  ctas,
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get modules by phase
 */
export function getModulesByPhase(phase: PhaseNumber): CoDevModule[] {
  return modules.filter(m => m.phase === phase);
}

/**
 * Get phase by number
 */
export function getPhase(number: PhaseNumber): CoDevPhase | undefined {
  return phases.find(p => p.number === number);
}

/**
 * Check if a module has prerequisites
 */
export function hasPrerequisites(moduleId: string): boolean {
  const mod = modules.find(m => m.id === moduleId);
  return (mod?.prerequisites?.length ?? 0) > 0;
}

/**
 * Get icon component key for a module
 */
export function getModuleIcon(moduleId: string): CoDevModule['icon'] | undefined {
  return modules.find(m => m.id === moduleId)?.icon;
}

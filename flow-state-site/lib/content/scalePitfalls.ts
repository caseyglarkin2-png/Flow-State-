/**
 * Scale Pitfalls Content Model
 * Sprint 4.1: Anti-patterns and lessons learned for Scale Page accordion
 * 
 * Source: RFQ Deck "Common Scale Pitfalls" section
 */

export interface ScalePitfall {
  id: string;
  antiPattern: string;
  whyItFails: string;
  yardFlowApproach: string;
  severity: 'critical' | 'high' | 'medium';
  /** Icon identifier for UI */
  icon: 'warning' | 'error' | 'info';
}

/**
 * SCALE PITFALLS
 * Common anti-patterns when scaling yard systems
 */
export const SCALE_PITFALLS: ScalePitfall[] = [
  {
    id: 'pilot-trap',
    antiPattern: 'Treating It Like a Pilot Forever',
    whyItFails: 'Pilots are designed to prove a concept, not to scale. Running in "pilot mode" for too long means you never capture network effects. Value compounds at scale, not at single-site proof points.',
    yardFlowApproach: 'YardFlow deploys a production-grade protocol from day 1. POC is 30 days, then full commitment. No endless pilots.',
    severity: 'critical',
    icon: 'error',
  },
  {
    id: 'vision-lock',
    antiPattern: 'Waiting for the Perfect Vision',
    whyItFails: 'Analysis paralysis kills momentum. Waiting for a "complete roadmap" before deploying means competitors move faster and your variance tax keeps compounding.',
    yardFlowApproach: 'We execute pragmatic automation—proven protocols now, innovation later. Vision is not in the critical path.',
    severity: 'critical',
    icon: 'error',
  },
  {
    id: 'vendor-lock',
    antiPattern: 'Choosing Vendor Lock-In',
    whyItFails: 'Proprietary systems with closed APIs become technical debt. You lose leverage with vendors and can\'t integrate with your evolving tech stack.',
    yardFlowApproach: 'Open architecture with standard APIs. TMS/WMS integrations included. No lock-in, no hostage situations.',
    severity: 'high',
    icon: 'warning',
  },
  {
    id: 'guard-underestimate',
    antiPattern: 'Underestimating Guard Workflow Change',
    whyItFails: 'Guards are the front line of yard operations. If they don\'t adopt the new system, it fails. Change management isn\'t optional—it\'s the difference between success and failure.',
    yardFlowApproach: 'digitalGUARD is designed for guards first. 2-minute check-in vs. 15 minutes. Less work, not more. Adoption happens naturally.',
    severity: 'high',
    icon: 'warning',
  },
  {
    id: 'network-ignore',
    antiPattern: 'Ignoring Network Effects',
    whyItFails: 'Single-site ROI is a fraction of network ROI. Every additional facility on the protocol increases value for all others. Running isolated systems leaves value on the table.',
    yardFlowApproach: 'YardFlow is a network system, not a point solution. Carrier onboarding compounds across sites. 200K drivers already in the network.',
    severity: 'high',
    icon: 'warning',
  },
  {
    id: 'tech-chase',
    antiPattern: 'Chasing Shiny Tech Without Basics',
    whyItFails: 'AI scheduling means nothing if you don\'t know where your trailers are. Autonomous yard trucks fail if gate workflows are chaos. Foundation first, innovation second.',
    yardFlowApproach: 'We nail the fundamentals: identity, orchestration, proof. Advanced capabilities layer on top of solid foundation.',
    severity: 'medium',
    icon: 'info',
  },
  {
    id: 'cost-only',
    antiPattern: 'Optimizing Only for Cost Per Mile',
    whyItFails: 'Buying the cheapest capacity increases variance. Low-cost carriers who miss appointments inject chaos that costs 10x the savings. The variance tax is invisible until it compounds.',
    yardFlowApproach: 'YardFlow shifts the conversation from cost to controllability. Predictable outcomes beat marginally cheaper chaos.',
    severity: 'medium',
    icon: 'info',
  },
];

/**
 * HELPER FUNCTIONS
 */

/**
 * Get all pitfalls
 */
export function getAllPitfalls(): ScalePitfall[] {
  return SCALE_PITFALLS;
}

/**
 * Get pitfall by ID
 */
export function getPitfallById(id: string): ScalePitfall | undefined {
  return SCALE_PITFALLS.find(p => p.id === id);
}

/**
 * Get pitfalls by severity
 */
export function getPitfallsBySeverity(severity: 'critical' | 'high' | 'medium'): ScalePitfall[] {
  return SCALE_PITFALLS.filter(p => p.severity === severity);
}

/**
 * Get critical pitfalls (top priority to address)
 */
export function getCriticalPitfalls(): ScalePitfall[] {
  return getPitfallsBySeverity('critical');
}

/**
 * Get pitfall count
 */
export function getPitfallCount(): number {
  return SCALE_PITFALLS.length;
}

/**
 * Get pitfall labels for quick reference
 */
export function getPitfallLabels(): { id: string; antiPattern: string }[] {
  return SCALE_PITFALLS.map(p => ({
    id: p.id,
    antiPattern: p.antiPattern,
  }));
}

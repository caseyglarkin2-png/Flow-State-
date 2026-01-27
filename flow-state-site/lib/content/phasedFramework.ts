/**
 * Phased Framework Content Model
 * Sprint 0.5: 5-Phase Rollout Framework from RFQ Deck
 * 
 * POC → Pilot → Scale Pilot → Full Rollout → Innovation 2.0
 */

export type PhaseStatus = 'upcoming' | 'active' | 'completed';

export interface RolloutPhase {
  phase: number;
  label: string;
  shortLabel: string;
  description: string;
  timeframe: string;
  outcomes: string[];
  /** Visual icon identifier for UI */
  icon: 'poc' | 'pilot' | 'scale' | 'rollout' | 'innovation';
  /** Status for progress visualization */
  status?: PhaseStatus;
}

/**
 * 5-PHASE ROLLOUT FRAMEWORK
 * Source: RFQ Deck "Rollout Phases" slide
 */
export const PHASED_FRAMEWORK: RolloutPhase[] = [
  {
    phase: 1,
    label: 'Proof of Concept',
    shortLabel: 'POC',
    description: 'Single-site validation with full telemetry. Establish baseline metrics and prove core protocol.',
    timeframe: '30 days',
    outcomes: [
      'Digital twin of yard operations',
      'Baseline variance metrics captured',
      'Guard workflow digitized',
      'Driver check-in time measured',
    ],
    icon: 'poc',
  },
  {
    phase: 2,
    label: 'Pilot',
    shortLabel: 'Pilot',
    description: 'Expand to 2-3 facilities. Validate cross-site protocol consistency and train local teams.',
    timeframe: '60 days',
    outcomes: [
      'Protocol consistency validated',
      'Team training completed',
      'Detention reduction measured',
      'ROI model validated against actuals',
    ],
    icon: 'pilot',
  },
  {
    phase: 3,
    label: 'Scale Pilot',
    shortLabel: 'Scale',
    description: 'Expand to 5-10 facilities. Stress-test protocol at volume and refine exception handling.',
    timeframe: '90 days',
    outcomes: [
      'Network effects begin compounding',
      'Exception handling refined',
      'Integration with TMS/WMS validated',
      'Carrier adoption measured',
    ],
    icon: 'scale',
  },
  {
    phase: 4,
    label: 'Full Rollout',
    shortLabel: 'Rollout',
    description: 'Network-wide deployment. All facilities operating under standardized protocol.',
    timeframe: '6-12 months',
    outcomes: [
      'Full network standardization',
      'Synthetic capacity unlocked',
      'Variance tax eliminated',
      'CFO ROI targets achieved',
    ],
    icon: 'rollout',
  },
  {
    phase: 5,
    label: 'Innovation 2.0',
    shortLabel: 'Innovate',
    description: 'Advanced capabilities: predictive scheduling, autonomous orchestration, network optimization.',
    timeframe: 'Ongoing',
    outcomes: [
      'Predictive appointment scheduling',
      'Autonomous yard orchestration',
      'Cross-network optimization',
      'Continuous improvement loop',
    ],
    icon: 'innovation',
  },
];

/**
 * IMPLEMENTATION MILESTONES
 * Key checkpoints during deployment
 */
export interface ImplementationMilestone {
  id: string;
  name: string;
  description: string;
  dayOffset: number;
  phase: number;
  isGate: boolean; // Go/No-Go decision point
}

export const IMPLEMENTATION_MILESTONES: ImplementationMilestone[] = [
  {
    id: 'kickoff',
    name: 'Project Kickoff',
    description: 'Team alignment, access provisioning, data gathering',
    dayOffset: 0,
    phase: 1,
    isGate: false,
  },
  {
    id: 'digital-twin',
    name: 'Digital Twin Complete',
    description: 'Yard layout, asset inventory, and workflow mapping complete',
    dayOffset: 14,
    phase: 1,
    isGate: false,
  },
  {
    id: 'poc-complete',
    name: 'POC Validation',
    description: 'Baseline metrics captured, protocol proven at single site',
    dayOffset: 30,
    phase: 1,
    isGate: true,
  },
  {
    id: 'pilot-expand',
    name: 'Pilot Expansion',
    description: 'Protocol deployed to 2-3 additional facilities',
    dayOffset: 45,
    phase: 2,
    isGate: false,
  },
  {
    id: 'pilot-validation',
    name: 'Pilot Validation',
    description: 'Cross-site consistency confirmed, ROI model validated',
    dayOffset: 90,
    phase: 2,
    isGate: true,
  },
  {
    id: 'scale-begin',
    name: 'Scale Pilot Begin',
    description: 'Expansion to 5-10 facilities initiated',
    dayOffset: 100,
    phase: 3,
    isGate: false,
  },
  {
    id: 'scale-complete',
    name: 'Scale Pilot Complete',
    description: 'Network effects validated, ready for full rollout',
    dayOffset: 180,
    phase: 3,
    isGate: true,
  },
  {
    id: 'full-rollout',
    name: 'Full Rollout',
    description: 'Network-wide deployment complete',
    dayOffset: 365,
    phase: 4,
    isGate: false,
  },
];

/**
 * HELPER FUNCTIONS
 */

/**
 * Get phase by number
 */
export function getPhaseByNumber(phase: number): RolloutPhase | undefined {
  return PHASED_FRAMEWORK.find(p => p.phase === phase);
}

/**
 * Get phases up to a certain phase number
 */
export function getPhasesUpTo(phase: number): RolloutPhase[] {
  return PHASED_FRAMEWORK.filter(p => p.phase <= phase);
}

/**
 * Get milestones for a phase
 */
export function getMilestonesByPhase(phase: number): ImplementationMilestone[] {
  return IMPLEMENTATION_MILESTONES.filter(m => m.phase === phase);
}

/**
 * Get gate milestones only (Go/No-Go decisions)
 */
export function getGateMilestones(): ImplementationMilestone[] {
  return IMPLEMENTATION_MILESTONES.filter(m => m.isGate);
}

/**
 * Calculate total timeline in days
 */
export function getTotalTimelineDays(): number {
  return Math.max(...IMPLEMENTATION_MILESTONES.map(m => m.dayOffset));
}

/**
 * Get milestone by ID
 */
export function getMilestoneById(id: string): ImplementationMilestone | undefined {
  return IMPLEMENTATION_MILESTONES.find(m => m.id === id);
}

/**
 * Get current phase based on day offset
 */
export function getCurrentPhaseByDay(dayOffset: number): RolloutPhase | undefined {
  const passedMilestones = IMPLEMENTATION_MILESTONES.filter(m => m.dayOffset <= dayOffset);
  if (passedMilestones.length === 0) return PHASED_FRAMEWORK[0];
  
  const lastMilestone = passedMilestones[passedMilestones.length - 1];
  return getPhaseByNumber(lastMilestone.phase);
}

/**
 * Get phase labels for stepper UI
 */
export function getPhaseLabels(): { phase: number; label: string; shortLabel: string }[] {
  return PHASED_FRAMEWORK.map(p => ({
    phase: p.phase,
    label: p.label,
    shortLabel: p.shortLabel,
  }));
}

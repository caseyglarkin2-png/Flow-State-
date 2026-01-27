/**
 * Co-Development Tracks Content Model
 * Sprint 0.4: Content Model for Flatbed and Reefer Co-Dev Opportunities
 * 
 * Maps co-development opportunities from RFQ deck to TypeScript schema
 */

export type CoDevVertical = 'flatbed' | 'reefer';
export type Priority = 'high' | 'medium' | 'low';

export interface CoDevOpportunity {
  id: string;
  title: string;
  description: string;
  benefit: string;
  vertical: CoDevVertical;
  priority: Priority;
  /** Technical complexity indicator */
  complexity?: 'simple' | 'moderate' | 'complex';
  /** Phase when this feature would be available */
  targetPhase?: 1 | 2 | 3;
}

export interface CoDevTrack {
  vertical: CoDevVertical;
  displayName: string;
  investment: string;
  operatorLimit: number;
  timeline: string;
  opportunities: CoDevOpportunity[];
  headline: string;
  description: string;
}

/**
 * FLATBED CO-DEV OPPORTUNITIES
 * From RFQ Deck: Tarping/securement automation, gate workflow, verification
 */
export const FLATBED_OPPORTUNITIES: CoDevOpportunity[] = [
  {
    id: 'flatbed-tarping',
    title: 'Tarping & Securement Automation',
    description: 'Automated verification of load securement and tarping compliance before gate release.',
    benefit: 'Reduce securement-related detention and customer chargebacks by 40%.',
    vertical: 'flatbed',
    priority: 'high',
    complexity: 'moderate',
    targetPhase: 2,
  },
  {
    id: 'flatbed-gate-workflow',
    title: 'Flatbed Gate Workflow',
    description: 'Specialized check-in flow for flatbed carriers including dimensional verification.',
    benefit: 'Cut gate processing time from 15 min to under 3 min for flatbed loads.',
    vertical: 'flatbed',
    priority: 'high',
    complexity: 'simple',
    targetPhase: 1,
  },
  {
    id: 'flatbed-securement-verification',
    title: 'Securement Verification',
    description: 'Photo-based verification of straps, chains, and edge protection with AI scoring.',
    benefit: 'Eliminate manual securement inspections and reduce liability exposure.',
    vertical: 'flatbed',
    priority: 'medium',
    complexity: 'complex',
    targetPhase: 2,
  },
  {
    id: 'flatbed-load-planning',
    title: 'Load Planning Integration',
    description: 'Integrate with load planning systems for optimized dock assignment based on load type.',
    benefit: 'Improve dock utilization by 25% through intelligent assignment.',
    vertical: 'flatbed',
    priority: 'medium',
    complexity: 'moderate',
    targetPhase: 3,
  },
];

/**
 * REEFER CO-DEV OPPORTUNITIES
 * From RFQ Deck: Cold chain workflow, compliance capture, exception handling
 */
export const REEFER_OPPORTUNITIES: CoDevOpportunity[] = [
  {
    id: 'reefer-cold-chain',
    title: 'Cold Chain Workflow Capture',
    description: 'Automated temperature logging and chain-of-custody documentation at gate.',
    benefit: 'Eliminate temperature excursion disputes with continuous telemetry.',
    vertical: 'reefer',
    priority: 'high',
    complexity: 'moderate',
    targetPhase: 1,
  },
  {
    id: 'reefer-compliance',
    title: 'FSMA Compliance Capture',
    description: 'Automated Food Safety Modernization Act documentation and audit trails.',
    benefit: 'Reduce compliance audit prep time by 80% with digital records.',
    vertical: 'reefer',
    priority: 'high',
    complexity: 'simple',
    targetPhase: 1,
  },
  {
    id: 'reefer-exception-handling',
    title: 'Exception Handling Automation',
    description: 'Real-time alerts for temperature excursions, fuel levels, and unit malfunctions.',
    benefit: 'Catch cold chain breaks within 5 minutes vs. discovering at delivery.',
    vertical: 'reefer',
    priority: 'high',
    complexity: 'complex',
    targetPhase: 2,
  },
  {
    id: 'reefer-pre-cool',
    title: 'Pre-Cool Verification',
    description: 'Automated trailer pre-cool verification before loading authorization.',
    benefit: 'Eliminate product damage from inadequate pre-cooling.',
    vertical: 'reefer',
    priority: 'medium',
    complexity: 'simple',
    targetPhase: 2,
  },
];

/**
 * ALL CO-DEV OPPORTUNITIES (Combined)
 */
export const CO_DEV_OPPORTUNITIES: CoDevOpportunity[] = [
  ...FLATBED_OPPORTUNITIES,
  ...REEFER_OPPORTUNITIES,
];

/**
 * CO-DEV TRACKS (Full Track Definitions)
 */
export const FLATBED_TRACK: CoDevTrack = {
  vertical: 'flatbed',
  displayName: 'Flatbed Track',
  investment: '$350K',
  operatorLimit: 2,
  timeline: '6 months',
  headline: 'Co-develop YardFlow for flatbed operations',
  description: 'Join 1 other flatbed operator to build specialized securement, tarping, and gate workflows for open-deck freight.',
  opportunities: FLATBED_OPPORTUNITIES,
};

export const REEFER_TRACK: CoDevTrack = {
  vertical: 'reefer',
  displayName: 'Reefer Track',
  investment: '$350K',
  operatorLimit: 2,
  timeline: '6 months',
  headline: 'Co-develop YardFlow for cold chain operations',
  description: 'Join 1 other reefer operator to build cold chain compliance, temperature monitoring, and exception handling workflows.',
  opportunities: REEFER_OPPORTUNITIES,
};

export const CO_DEV_TRACKS: CoDevTrack[] = [FLATBED_TRACK, REEFER_TRACK];

/**
 * HELPER FUNCTIONS
 */

/**
 * Get opportunities by vertical
 */
export function getOpportunitiesByVertical(vertical: CoDevVertical): CoDevOpportunity[] {
  return CO_DEV_OPPORTUNITIES.filter(opp => opp.vertical === vertical);
}

/**
 * Get high-priority opportunities by vertical
 */
export function getHighPriorityOpportunities(vertical: CoDevVertical): CoDevOpportunity[] {
  return getOpportunitiesByVertical(vertical).filter(opp => opp.priority === 'high');
}

/**
 * Get opportunity by ID
 */
export function getOpportunityById(id: string): CoDevOpportunity | undefined {
  return CO_DEV_OPPORTUNITIES.find(opp => opp.id === id);
}

/**
 * Get track by vertical
 */
export function getTrackByVertical(vertical: CoDevVertical): CoDevTrack | undefined {
  return CO_DEV_TRACKS.find(track => track.vertical === vertical);
}

/**
 * Get all track verticals for tab UI
 */
export function getTrackVerticals(): { value: CoDevVertical; label: string }[] {
  return CO_DEV_TRACKS.map(track => ({
    value: track.vertical,
    label: track.displayName,
  }));
}

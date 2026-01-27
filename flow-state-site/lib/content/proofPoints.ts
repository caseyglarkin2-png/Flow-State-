/**
 * PROOF POINTS CONTENT MODEL
 * 
 * Data-driven proof points sourced from RFQ deck (Jan 26, 2026).
 * Used by ProofStrip component and proof pages.
 * 
 * SOURCE: FreightRoll RFQ Deck - UFP - Jan 26
 * LOCKED: Do not modify without CEO approval
 */

export interface ProofPoint {
  /** Display metric (e.g., "1M+") */
  metric: string;
  
  /** Metric label (e.g., "Driver Check-Ins") */
  label: string;
  
  /** Additional context/qualifier (optional) */
  qualifier?: string;
  
  /** Source type for transparency */
  sourceType: 'measured' | 'modeled';
  
  /** Additional context about measurement (optional) */
  context?: string;
}

/**
 * Scale Proof Points from RFQ Deck
 * 
 * These are the 4 key stats that prove YardFlow works at scale.
 */
export const PROOF_POINTS: ProofPoint[] = [
  {
    metric: '1M+',
    label: 'Driver Check-Ins',
    qualifier: 'Across Primo + UFP networks',
    sourceType: 'measured',
    context: 'Production data from deployed facilities',
  },
  {
    metric: '0.2%',
    label: 'Failure Rate',
    qualifier: 'System reliability',
    sourceType: 'measured',
    context: 'Measured uptime and transaction success rate',
  },
  {
    metric: '200K',
    label: 'Drivers Onboarded',
    qualifier: 'Passive enrollment (no app download)',
    sourceType: 'measured',
    context: 'Unique drivers processed through QR-based workflows',
  },
  {
    metric: '~70s',
    label: 'Check-In Time',
    qualifier: 'Reduced from ~150s baseline',
    sourceType: 'measured',
    context: 'Average check-in time improvement at Primo facilities',
  },
];

/**
 * Get all measured (production) proof points
 */
export function getMeasuredProofPoints(): ProofPoint[] {
  return PROOF_POINTS.filter(p => p.sourceType === 'measured');
}

/**
 * Get all modeled (projected) proof points
 */
export function getModeledProofPoints(): ProofPoint[] {
  return PROOF_POINTS.filter(p => p.sourceType === 'modeled');
}

/**
 * Get specific proof point by label
 */
export function getProofPointByLabel(label: string): ProofPoint | undefined {
  return PROOF_POINTS.find(p => p.label === label);
}

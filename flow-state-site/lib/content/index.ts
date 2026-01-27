/**
 * Content Module Index
 * Sprint 0: Central Export Point for All Content Models
 * 
 * Usage:
 * import { getProofPoints, getCoDevTracks, ... } from '@/lib/content';
 * 
 * This is the recommended import path for all content.
 * Prefer using adapters over direct model imports.
 */

// Primary export: Adapters (recommended for component use)
export {
  // Proof Points
  getProofPoints,
  getProofPointsMeasured,
  getProofPointsModeled,
  getProofPoint,
  
  // Sections
  getHomePageContent,
  getProofPageContent,
  getScalePageContent,
  getSection,
  
  // Co-Dev Tracks
  getCoDevTracks,
  getCoDevTrack,
  getCoDevOpportunities,
  getCoDevOpportunitiesHighPriority,
  getCoDevOpportunity,
  getCoDevVerticalOptions,
  
  // Phased Framework
  getImplementationPhases,
  getImplementationPhase,
  getImplementationPhasesUpTo,
  getImplementationMilestones,
  getImplementationMilestone,
  getImplementationMilestonesForPhase,
  getImplementationGates,
  getImplementationTotalDays,
  getImplementationCurrentPhase,
  getImplementationPhaseLabels,
  
  // Scale Pitfalls
  getScalePitfalls,
  getScalePitfall,
  getScalePitfallsBySeverity,
  getScalePitfallsCritical,
  getScalePitfallsCount,
  getScalePitfallLabels,
  
  // Validation
  validateContentModels,
  
  // Types
  type ProofPoint,
  type Section,
  type CtaButton,
  type CoDevOpportunity,
  type CoDevTrack,
  type CoDevVertical,
  type RolloutPhase,
  type ImplementationMilestone,
  type ScalePitfall,
} from './adapters';

// Direct model exports (for tests and advanced use cases)
export { PROOF_POINTS } from './proofPoints';
export {
  HOME_HERO,
  HOME_PROOF_PREVIEW,
  HOME_SCALE_CTA,
  PROOF_HERO,
  PROOF_MEASURED,
  PROOF_MODELED,
  SCALE_HERO,
  SCALE_CODEV_OPTION,
  SCALE_FULL_IMPL_OPTION,
  SCALE_PITFALLS as SCALE_PITFALLS_SECTIONS,
} from './sections';
export { SCALE_PITFALLS } from './scalePitfalls';
export {
  FLATBED_OPPORTUNITIES,
  REEFER_OPPORTUNITIES,
  CO_DEV_OPPORTUNITIES,
  FLATBED_TRACK,
  REEFER_TRACK,
  CO_DEV_TRACKS,
} from './coDevTracks';
export {
  PHASED_FRAMEWORK,
  IMPLEMENTATION_MILESTONES,
} from './phasedFramework';

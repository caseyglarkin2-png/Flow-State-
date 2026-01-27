/**
 * Content Adapters
 * Sprint 0.7: Migration Layer for Incremental Content Model Adoption
 * 
 * These adapters allow components to consume content from the new data model
 * without breaking existing implementations. Provides a single import point
 * and fallback handling for gradual migration.
 */

import {
  PROOF_POINTS,
  getMeasuredProofPoints,
  getModeledProofPoints,
  getProofPointByLabel,
  type ProofPoint,
} from './proofPoints';

import {
  HOME_HERO,
  HOME_PROOF_PREVIEW,
  HOME_SCALE_CTA,
  PROOF_HERO,
  PROOF_MEASURED,
  PROOF_MODELED,
  SCALE_HERO,
  SCALE_CODEV_OPTION,
  SCALE_FULL_IMPL_OPTION,
  SCALE_PITFALLS as SCALE_PITFALLS_SECTION,
  getSectionById,
  getSectionsByType,
  getHomeSections,
  getProofSections,
  getScaleSections,
  type Section,
  type CtaButton,
} from './sections';

import {
  FLATBED_OPPORTUNITIES,
  REEFER_OPPORTUNITIES,
  CO_DEV_OPPORTUNITIES,
  FLATBED_TRACK,
  REEFER_TRACK,
  CO_DEV_TRACKS,
  getOpportunitiesByVertical,
  getHighPriorityOpportunities,
  getOpportunityById,
  getTrackByVertical,
  getTrackVerticals,
  type CoDevOpportunity,
  type CoDevTrack,
  type CoDevVertical,
} from './coDevTracks';

import {
  PHASED_FRAMEWORK,
  IMPLEMENTATION_MILESTONES,
  getPhaseByNumber,
  getPhasesUpTo,
  getMilestonesByPhase,
  getGateMilestones,
  getTotalTimelineDays,
  getMilestoneById,
  getCurrentPhaseByDay,
  getPhaseLabels,
  type RolloutPhase,
  type ImplementationMilestone,
} from './phasedFramework';

import {
  SCALE_PITFALLS,
  getAllPitfalls,
  getPitfallById,
  getPitfallsBySeverity,
  getCriticalPitfalls,
  getPitfallCount,
  getPitfallLabels,
  type ScalePitfall,
} from './scalePitfalls';

/**
 * PROOF POINTS ADAPTERS
 * Components call these instead of importing directly from proofPoints.ts
 */

export function getProofPoints(): ProofPoint[] {
  // Phase 1: Return content model data
  // Phase 2: Could add fallback to legacy data if needed
  return PROOF_POINTS;
}

export function getProofPointsMeasured(): ProofPoint[] {
  return getMeasuredProofPoints();
}

export function getProofPointsModeled(): ProofPoint[] {
  return getModeledProofPoints();
}

export function getProofPoint(label: string): ProofPoint | undefined {
  return getProofPointByLabel(label);
}

/**
 * SECTIONS ADAPTERS
 * Centralized access to section content by page
 */

export function getHomePageContent(): {
  hero: Section;
  proofPreview: Section;
  scaleCta: Section;
  sections: Section[];
} {
  return {
    hero: HOME_HERO,
    proofPreview: HOME_PROOF_PREVIEW,
    scaleCta: HOME_SCALE_CTA,
    sections: getHomeSections(),
  };
}

export function getProofPageContent(): {
  hero: Section;
  measured: Section;
  modeled: Section;
  sections: Section[];
} {
  return {
    hero: PROOF_HERO,
    measured: PROOF_MEASURED,
    modeled: PROOF_MODELED,
    sections: getProofSections(),
  };
}

export function getScalePageContent(): {
  hero: Section;
  codevOption: Section;
  fullImplOption: Section;
  pitfalls: Section;
  sections: Section[];
} {
  return {
    hero: SCALE_HERO,
    codevOption: SCALE_CODEV_OPTION,
    fullImplOption: SCALE_FULL_IMPL_OPTION,
    pitfalls: SCALE_PITFALLS_SECTION,
    sections: getScaleSections(),
  };
}

export function getSection(id: string): Section | undefined {
  return getSectionById(id);
}

/**
 * CO-DEV TRACKS ADAPTERS
 * Centralized access to co-development opportunities
 */

export function getCoDevTracks(): CoDevTrack[] {
  return CO_DEV_TRACKS;
}

export function getCoDevTrack(vertical: CoDevVertical): CoDevTrack | undefined {
  return getTrackByVertical(vertical);
}

export function getCoDevOpportunities(vertical?: CoDevVertical): CoDevOpportunity[] {
  if (vertical) {
    return getOpportunitiesByVertical(vertical);
  }
  return CO_DEV_OPPORTUNITIES;
}

export function getCoDevOpportunitiesHighPriority(vertical: CoDevVertical): CoDevOpportunity[] {
  return getHighPriorityOpportunities(vertical);
}

export function getCoDevOpportunity(id: string): CoDevOpportunity | undefined {
  return getOpportunityById(id);
}

export function getCoDevVerticalOptions(): { value: CoDevVertical; label: string }[] {
  return getTrackVerticals();
}

/**
 * PHASED FRAMEWORK ADAPTERS
 * Centralized access to implementation phases and milestones
 */

export function getImplementationPhases(): RolloutPhase[] {
  return PHASED_FRAMEWORK;
}

export function getImplementationPhase(phase: number): RolloutPhase | undefined {
  return getPhaseByNumber(phase);
}

export function getImplementationPhasesUpTo(phase: number): RolloutPhase[] {
  return getPhasesUpTo(phase);
}

export function getImplementationMilestones(): ImplementationMilestone[] {
  return IMPLEMENTATION_MILESTONES;
}

export function getImplementationMilestone(id: string): ImplementationMilestone | undefined {
  return getMilestoneById(id);
}

export function getImplementationMilestonesForPhase(phase: number): ImplementationMilestone[] {
  return getMilestonesByPhase(phase);
}

export function getImplementationGates(): ImplementationMilestone[] {
  return getGateMilestones();
}

export function getImplementationTotalDays(): number {
  return getTotalTimelineDays();
}

export function getImplementationCurrentPhase(dayOffset: number): RolloutPhase | undefined {
  return getCurrentPhaseByDay(dayOffset);
}

export function getImplementationPhaseLabels(): { phase: number; label: string; shortLabel: string }[] {
  return getPhaseLabels();
}

/**
 * SCALE PITFALLS ADAPTERS
 * Centralized access to scale anti-patterns
 */

export function getScalePitfalls(): ScalePitfall[] {
  return getAllPitfalls();
}

export function getScalePitfall(id: string): ScalePitfall | undefined {
  return getPitfallById(id);
}

export function getScalePitfallsBySeverity(severity: 'critical' | 'high' | 'medium'): ScalePitfall[] {
  return getPitfallsBySeverity(severity);
}

export function getScalePitfallsCritical(): ScalePitfall[] {
  return getCriticalPitfalls();
}

export function getScalePitfallsCount(): number {
  return getPitfallCount();
}

export function getScalePitfallLabels(): { id: string; antiPattern: string }[] {
  return getPitfallLabels();
}

/**
 * RE-EXPORT TYPES
 * Components can import types from adapters
 */
export type {
  ProofPoint,
  Section,
  CtaButton,
  CoDevOpportunity,
  CoDevTrack,
  CoDevVertical,
  RolloutPhase,
  ImplementationMilestone,
  ScalePitfall,
};

/**
 * CONTENT VALIDATION
 * Use in tests and CI to verify content integrity
 */
export function validateContentModels(): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validate proof points
  if (PROOF_POINTS.length < 4) {
    errors.push('PROOF_POINTS must have at least 4 items');
  }

  // Validate sections
  if (getHomeSections().length < 3) {
    errors.push('Home page must have at least 3 sections');
  }

  // Validate co-dev tracks
  if (CO_DEV_TRACKS.length !== 2) {
    errors.push('CO_DEV_TRACKS must have exactly 2 tracks (flatbed, reefer)');
  }

  // Validate phased framework
  if (PHASED_FRAMEWORK.length !== 5) {
    errors.push('PHASED_FRAMEWORK must have exactly 5 phases');
  }

  // Validate scale pitfalls
  if (SCALE_PITFALLS.length < 5) {
    errors.push('SCALE_PITFALLS must have at least 5 items');
  }

  // Validate milestones are in order
  for (let i = 1; i < IMPLEMENTATION_MILESTONES.length; i++) {
    if (IMPLEMENTATION_MILESTONES[i].dayOffset < IMPLEMENTATION_MILESTONES[i - 1].dayOffset) {
      errors.push('IMPLEMENTATION_MILESTONES must be in chronological order');
      break;
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

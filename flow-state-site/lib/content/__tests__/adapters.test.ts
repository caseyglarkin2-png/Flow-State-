/**
 * Tests for Content Adapters
 * Sprint 0.7: Migration Layer Tests
 */

import { describe, it, expect } from 'vitest';
import {
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
  
  // Validation
  validateContentModels,
} from '../adapters';

describe('Content Adapters', () => {
  describe('Proof Points Adapters', () => {
    it('getProofPoints returns all proof points', () => {
      const points = getProofPoints();
      expect(points.length).toBeGreaterThanOrEqual(4);
    });

    it('getProofPointsMeasured returns only measured data', () => {
      const measured = getProofPointsMeasured();
      expect(measured.every(p => p.sourceType === 'measured')).toBe(true);
    });

    it('getProofPointsModeled returns only modeled data', () => {
      const modeled = getProofPointsModeled();
      expect(modeled.every(p => p.sourceType === 'modeled')).toBe(true);
    });

    it('getProofPoint finds by label', () => {
      const point = getProofPoint('Driver Check-Ins');
      expect(point).toBeDefined();
      expect(point?.metric).toBe('1M+');
    });
  });

  describe('Sections Adapters', () => {
    it('getHomePageContent returns all home sections', () => {
      const content = getHomePageContent();
      expect(content.hero).toBeDefined();
      expect(content.proofPreview).toBeDefined();
      expect(content.scaleCta).toBeDefined();
      expect(content.sections.length).toBe(3);
    });

    it('getProofPageContent returns all proof sections', () => {
      const content = getProofPageContent();
      expect(content.hero).toBeDefined();
      expect(content.measured).toBeDefined();
      expect(content.modeled).toBeDefined();
      expect(content.sections.length).toBe(3);
    });

    it('getScalePageContent returns all scale sections', () => {
      const content = getScalePageContent();
      expect(content.hero).toBeDefined();
      expect(content.codevOption).toBeDefined();
      expect(content.fullImplOption).toBeDefined();
      expect(content.pitfalls).toBeDefined();
      expect(content.sections.length).toBe(4);
    });

    it('getSection finds by ID', () => {
      const section = getSection('home-hero');
      expect(section).toBeDefined();
      expect(section?.type).toBe('hero');
    });
  });

  describe('Co-Dev Tracks Adapters', () => {
    it('getCoDevTracks returns both tracks', () => {
      const tracks = getCoDevTracks();
      expect(tracks.length).toBe(2);
    });

    it('getCoDevTrack finds by vertical', () => {
      const flatbed = getCoDevTrack('flatbed');
      expect(flatbed).toBeDefined();
      expect(flatbed?.vertical).toBe('flatbed');

      const reefer = getCoDevTrack('reefer');
      expect(reefer).toBeDefined();
      expect(reefer?.vertical).toBe('reefer');
    });

    it('getCoDevOpportunities returns all without filter', () => {
      const all = getCoDevOpportunities();
      expect(all.length).toBe(8);
    });

    it('getCoDevOpportunities filters by vertical', () => {
      const flatbed = getCoDevOpportunities('flatbed');
      expect(flatbed.every(o => o.vertical === 'flatbed')).toBe(true);
    });

    it('getCoDevOpportunitiesHighPriority returns only high priority', () => {
      const highPriority = getCoDevOpportunitiesHighPriority('reefer');
      expect(highPriority.every(o => o.priority === 'high')).toBe(true);
    });

    it('getCoDevOpportunity finds by ID', () => {
      const opp = getCoDevOpportunity('flatbed-tarping');
      expect(opp).toBeDefined();
      expect(opp?.title).toContain('Tarping');
    });

    it('getCoDevVerticalOptions returns tab-friendly format', () => {
      const options = getCoDevVerticalOptions();
      expect(options.length).toBe(2);
      expect(options[0]).toHaveProperty('value');
      expect(options[0]).toHaveProperty('label');
    });
  });

  describe('Phased Framework Adapters', () => {
    it('getImplementationPhases returns all 5 phases', () => {
      const phases = getImplementationPhases();
      expect(phases.length).toBe(5);
    });

    it('getImplementationPhase finds by number', () => {
      const phase3 = getImplementationPhase(3);
      expect(phase3).toBeDefined();
      expect(phase3?.shortLabel).toBe('Scale');
    });

    it('getImplementationPhasesUpTo returns correct count', () => {
      const upTo2 = getImplementationPhasesUpTo(2);
      expect(upTo2.length).toBe(2);
    });

    it('getImplementationMilestones returns all milestones', () => {
      const milestones = getImplementationMilestones();
      expect(milestones.length).toBeGreaterThan(5);
    });

    it('getImplementationMilestone finds by ID', () => {
      const kickoff = getImplementationMilestone('kickoff');
      expect(kickoff).toBeDefined();
      expect(kickoff?.dayOffset).toBe(0);
    });

    it('getImplementationMilestonesForPhase filters correctly', () => {
      const phase1Milestones = getImplementationMilestonesForPhase(1);
      expect(phase1Milestones.every(m => m.phase === 1)).toBe(true);
    });

    it('getImplementationGates returns only gates', () => {
      const gates = getImplementationGates();
      expect(gates.every(m => m.isGate)).toBe(true);
    });

    it('getImplementationTotalDays returns 365', () => {
      const total = getImplementationTotalDays();
      expect(total).toBe(365);
    });

    it('getImplementationCurrentPhase returns correct phase', () => {
      const day50 = getImplementationCurrentPhase(50);
      expect(day50?.phase).toBe(2);
    });

    it('getImplementationPhaseLabels returns stepper format', () => {
      const labels = getImplementationPhaseLabels();
      expect(labels.length).toBe(5);
      expect(labels[0]).toHaveProperty('phase');
      expect(labels[0]).toHaveProperty('label');
      expect(labels[0]).toHaveProperty('shortLabel');
    });
  });

  describe('Content Validation', () => {
    it('validateContentModels passes for current content', () => {
      const result = validateContentModels();
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('validateContentModels returns structured result', () => {
      const result = validateContentModels();
      expect(result).toHaveProperty('valid');
      expect(result).toHaveProperty('errors');
      expect(Array.isArray(result.errors)).toBe(true);
    });
  });
});

describe('Content Module Index', () => {
  it('exports can be imported from index', async () => {
    const content = await import('../index');
    
    // Verify key exports exist
    expect(typeof content.getProofPoints).toBe('function');
    expect(typeof content.getHomePageContent).toBe('function');
    expect(typeof content.getCoDevTracks).toBe('function');
    expect(typeof content.getImplementationPhases).toBe('function');
    expect(typeof content.validateContentModels).toBe('function');
  });

  it('PROOF_POINTS can be imported from index', async () => {
    const content = await import('../index');
    expect(content.PROOF_POINTS).toBeDefined();
    expect(Array.isArray(content.PROOF_POINTS)).toBe(true);
  });
});

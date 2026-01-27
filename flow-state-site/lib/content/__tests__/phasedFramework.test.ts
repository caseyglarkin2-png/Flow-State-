/**
 * Tests for Phased Framework Content Model
 * Sprint 0.5: Unit Tests for 5-Phase Rollout Framework
 */

import { describe, it, expect } from 'vitest';
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
} from '../phasedFramework';

describe('Phased Framework Content Model', () => {
  describe('Schema Validation', () => {
    it('should have all required fields on phases', () => {
      PHASED_FRAMEWORK.forEach(phase => {
        expect(phase).toHaveProperty('phase');
        expect(phase).toHaveProperty('label');
        expect(phase).toHaveProperty('shortLabel');
        expect(phase).toHaveProperty('description');
        expect(phase).toHaveProperty('timeframe');
        expect(phase).toHaveProperty('outcomes');
        expect(phase).toHaveProperty('icon');
        
        expect(typeof phase.phase).toBe('number');
        expect(typeof phase.label).toBe('string');
        expect(Array.isArray(phase.outcomes)).toBe(true);
      });
    });

    it('should have all required fields on milestones', () => {
      IMPLEMENTATION_MILESTONES.forEach(milestone => {
        expect(milestone).toHaveProperty('id');
        expect(milestone).toHaveProperty('name');
        expect(milestone).toHaveProperty('description');
        expect(milestone).toHaveProperty('dayOffset');
        expect(milestone).toHaveProperty('phase');
        expect(milestone).toHaveProperty('isGate');
        
        expect(typeof milestone.dayOffset).toBe('number');
        expect(typeof milestone.isGate).toBe('boolean');
      });
    });

    it('should have unique phase numbers', () => {
      const phases = PHASED_FRAMEWORK.map(p => p.phase);
      const uniquePhases = new Set(phases);
      expect(uniquePhases.size).toBe(phases.length);
    });

    it('should have unique milestone IDs', () => {
      const ids = IMPLEMENTATION_MILESTONES.map(m => m.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('5-Phase Structure', () => {
    it('should have exactly 5 phases', () => {
      expect(PHASED_FRAMEWORK.length).toBe(5);
    });

    it('should have phases numbered 1-5', () => {
      const phaseNumbers = PHASED_FRAMEWORK.map(p => p.phase).sort();
      expect(phaseNumbers).toEqual([1, 2, 3, 4, 5]);
    });

    it('Phase 1 should be POC', () => {
      const phase1 = PHASED_FRAMEWORK.find(p => p.phase === 1);
      expect(phase1?.shortLabel).toBe('POC');
      expect(phase1?.timeframe).toBe('30 days');
    });

    it('Phase 2 should be Pilot', () => {
      const phase2 = PHASED_FRAMEWORK.find(p => p.phase === 2);
      expect(phase2?.shortLabel).toBe('Pilot');
      expect(phase2?.timeframe).toBe('60 days');
    });

    it('Phase 3 should be Scale Pilot', () => {
      const phase3 = PHASED_FRAMEWORK.find(p => p.phase === 3);
      expect(phase3?.shortLabel).toBe('Scale');
      expect(phase3?.timeframe).toBe('90 days');
    });

    it('Phase 4 should be Full Rollout', () => {
      const phase4 = PHASED_FRAMEWORK.find(p => p.phase === 4);
      expect(phase4?.shortLabel).toBe('Rollout');
    });

    it('Phase 5 should be Innovation 2.0', () => {
      const phase5 = PHASED_FRAMEWORK.find(p => p.phase === 5);
      expect(phase5?.shortLabel).toBe('Innovate');
      expect(phase5?.timeframe).toBe('Ongoing');
    });

    it('each phase should have at least 3 outcomes', () => {
      PHASED_FRAMEWORK.forEach(phase => {
        expect(phase.outcomes.length).toBeGreaterThanOrEqual(3);
      });
    });
  });

  describe('Implementation Milestones', () => {
    it('should have at least 5 milestones', () => {
      expect(IMPLEMENTATION_MILESTONES.length).toBeGreaterThanOrEqual(5);
    });

    it('milestones should be in chronological order', () => {
      for (let i = 1; i < IMPLEMENTATION_MILESTONES.length; i++) {
        expect(IMPLEMENTATION_MILESTONES[i].dayOffset)
          .toBeGreaterThanOrEqual(IMPLEMENTATION_MILESTONES[i - 1].dayOffset);
      }
    });

    it('should have at least 3 gate milestones', () => {
      const gates = IMPLEMENTATION_MILESTONES.filter(m => m.isGate);
      expect(gates.length).toBeGreaterThanOrEqual(3);
    });

    it('first milestone should be at day 0', () => {
      expect(IMPLEMENTATION_MILESTONES[0].dayOffset).toBe(0);
    });

    it('POC validation should be at day 30', () => {
      const pocValidation = IMPLEMENTATION_MILESTONES.find(m => m.id === 'poc-complete');
      expect(pocValidation?.dayOffset).toBe(30);
      expect(pocValidation?.isGate).toBe(true);
    });
  });

  describe('Helper Functions', () => {
    it('getPhaseByNumber should find correct phase', () => {
      const phase3 = getPhaseByNumber(3);
      expect(phase3).toBeDefined();
      expect(phase3?.phase).toBe(3);
      expect(phase3?.shortLabel).toBe('Scale');
    });

    it('getPhaseByNumber should return undefined for invalid phase', () => {
      const phase99 = getPhaseByNumber(99);
      expect(phase99).toBeUndefined();
    });

    it('getPhasesUpTo should return phases up to and including specified', () => {
      const phasesUpTo3 = getPhasesUpTo(3);
      expect(phasesUpTo3.length).toBe(3);
      expect(phasesUpTo3.map(p => p.phase)).toEqual([1, 2, 3]);
    });

    it('getMilestonesByPhase should filter correctly', () => {
      const phase1Milestones = getMilestonesByPhase(1);
      expect(phase1Milestones.every(m => m.phase === 1)).toBe(true);
      expect(phase1Milestones.length).toBeGreaterThan(0);
    });

    it('getGateMilestones should return only gates', () => {
      const gates = getGateMilestones();
      expect(gates.every(m => m.isGate)).toBe(true);
      expect(gates.length).toBeGreaterThanOrEqual(3);
    });

    it('getTotalTimelineDays should return max day offset', () => {
      const total = getTotalTimelineDays();
      expect(total).toBe(365);
    });

    it('getMilestoneById should find milestone', () => {
      const kickoff = getMilestoneById('kickoff');
      expect(kickoff).toBeDefined();
      expect(kickoff?.name).toBe('Project Kickoff');
    });

    it('getCurrentPhaseByDay should return correct phase', () => {
      const dayZero = getCurrentPhaseByDay(0);
      expect(dayZero?.phase).toBe(1);

      const day45 = getCurrentPhaseByDay(45);
      expect(day45?.phase).toBe(2);

      const day150 = getCurrentPhaseByDay(150);
      expect(day150?.phase).toBe(3);
    });

    it('getPhaseLabels should return stepper-friendly format', () => {
      const labels = getPhaseLabels();
      expect(labels.length).toBe(5);
      expect(labels[0]).toHaveProperty('phase');
      expect(labels[0]).toHaveProperty('label');
      expect(labels[0]).toHaveProperty('shortLabel');
    });
  });

  describe('Content Quality', () => {
    it('all phases should have non-empty descriptions', () => {
      PHASED_FRAMEWORK.forEach(phase => {
        expect(phase.description.trim().length).toBeGreaterThan(20);
      });
    });

    it('all outcomes should be actionable statements', () => {
      PHASED_FRAMEWORK.forEach(phase => {
        phase.outcomes.forEach(outcome => {
          expect(outcome.trim().length).toBeGreaterThan(5);
        });
      });
    });

    it('phase icons should be valid identifiers', () => {
      const validIcons = ['poc', 'pilot', 'scale', 'rollout', 'innovation'];
      PHASED_FRAMEWORK.forEach(phase => {
        expect(validIcons).toContain(phase.icon);
      });
    });
  });

  describe('RFQ Deck Alignment', () => {
    it('POC should mention digital twin', () => {
      const poc = PHASED_FRAMEWORK.find(p => p.phase === 1);
      const hasDigitalTwin = poc?.outcomes.some(o => 
        o.toLowerCase().includes('digital twin')
      );
      expect(hasDigitalTwin).toBe(true);
    });

    it('Pilot should mention ROI validation', () => {
      const pilot = PHASED_FRAMEWORK.find(p => p.phase === 2);
      const hasRoiValidation = pilot?.outcomes.some(o => 
        o.toLowerCase().includes('roi')
      );
      expect(hasRoiValidation).toBe(true);
    });

    it('Full Rollout should mention variance tax', () => {
      const rollout = PHASED_FRAMEWORK.find(p => p.phase === 4);
      const hasVarianceTax = rollout?.outcomes.some(o => 
        o.toLowerCase().includes('variance')
      );
      expect(hasVarianceTax).toBe(true);
    });
  });
});

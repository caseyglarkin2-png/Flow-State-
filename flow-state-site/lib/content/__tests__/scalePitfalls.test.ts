/**
 * Tests for Scale Pitfalls Content Model
 * Sprint 4.1: Unit Tests for Scale Anti-Patterns
 */

import { describe, it, expect } from 'vitest';
import {
  SCALE_PITFALLS,
  getAllPitfalls,
  getPitfallById,
  getPitfallsBySeverity,
  getCriticalPitfalls,
  getPitfallCount,
  getPitfallLabels,
  type ScalePitfall,
} from '../scalePitfalls';

describe('Scale Pitfalls Content Model', () => {
  describe('Schema Validation', () => {
    it('should have all required fields', () => {
      SCALE_PITFALLS.forEach(pitfall => {
        expect(pitfall).toHaveProperty('id');
        expect(pitfall).toHaveProperty('antiPattern');
        expect(pitfall).toHaveProperty('whyItFails');
        expect(pitfall).toHaveProperty('yardFlowApproach');
        expect(pitfall).toHaveProperty('severity');
        expect(pitfall).toHaveProperty('icon');
        
        expect(typeof pitfall.id).toBe('string');
        expect(typeof pitfall.antiPattern).toBe('string');
        expect(['critical', 'high', 'medium']).toContain(pitfall.severity);
        expect(['warning', 'error', 'info']).toContain(pitfall.icon);
      });
    });

    it('should have unique pitfall IDs', () => {
      const ids = SCALE_PITFALLS.map(p => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have at least 5 pitfalls', () => {
      expect(SCALE_PITFALLS.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('RFQ Deck Anti-Patterns', () => {
    it('should include pilot trap pitfall', () => {
      const pilotTrap = SCALE_PITFALLS.find(p => p.id === 'pilot-trap');
      expect(pilotTrap).toBeDefined();
      expect(pilotTrap?.severity).toBe('critical');
      expect(pilotTrap?.antiPattern.toLowerCase()).toContain('pilot');
    });

    it('should include vision lock pitfall', () => {
      const visionLock = SCALE_PITFALLS.find(p => p.id === 'vision-lock');
      expect(visionLock).toBeDefined();
      expect(visionLock?.yardFlowApproach).toContain('pragmatic');
    });

    it('should include vendor lock-in pitfall', () => {
      const vendorLock = SCALE_PITFALLS.find(p => p.id === 'vendor-lock');
      expect(vendorLock).toBeDefined();
      expect(vendorLock?.yardFlowApproach.toLowerCase()).toContain('open');
    });

    it('should include guard workflow pitfall', () => {
      const guardPitfall = SCALE_PITFALLS.find(p => p.id === 'guard-underestimate');
      expect(guardPitfall).toBeDefined();
      expect(guardPitfall?.yardFlowApproach).toContain('digitalGUARD');
    });

    it('should include network effects pitfall', () => {
      const networkPitfall = SCALE_PITFALLS.find(p => p.id === 'network-ignore');
      expect(networkPitfall).toBeDefined();
      expect(networkPitfall?.yardFlowApproach).toContain('200K');
    });
  });

  describe('Severity Distribution', () => {
    it('should have at least 2 critical pitfalls', () => {
      const critical = SCALE_PITFALLS.filter(p => p.severity === 'critical');
      expect(critical.length).toBeGreaterThanOrEqual(2);
    });

    it('should have at least 2 high severity pitfalls', () => {
      const high = SCALE_PITFALLS.filter(p => p.severity === 'high');
      expect(high.length).toBeGreaterThanOrEqual(2);
    });

    it('critical pitfalls should have error icon', () => {
      const critical = SCALE_PITFALLS.filter(p => p.severity === 'critical');
      expect(critical.every(p => p.icon === 'error')).toBe(true);
    });
  });

  describe('Helper Functions', () => {
    it('getAllPitfalls returns all pitfalls', () => {
      const all = getAllPitfalls();
      expect(all.length).toBe(SCALE_PITFALLS.length);
    });

    it('getPitfallById finds by ID', () => {
      const pitfall = getPitfallById('pilot-trap');
      expect(pitfall).toBeDefined();
      expect(pitfall?.id).toBe('pilot-trap');
    });

    it('getPitfallById returns undefined for non-existent ID', () => {
      const pitfall = getPitfallById('non-existent');
      expect(pitfall).toBeUndefined();
    });

    it('getPitfallsBySeverity filters correctly', () => {
      const critical = getPitfallsBySeverity('critical');
      expect(critical.every(p => p.severity === 'critical')).toBe(true);

      const high = getPitfallsBySeverity('high');
      expect(high.every(p => p.severity === 'high')).toBe(true);
    });

    it('getCriticalPitfalls returns only critical', () => {
      const critical = getCriticalPitfalls();
      expect(critical.every(p => p.severity === 'critical')).toBe(true);
    });

    it('getPitfallCount returns correct count', () => {
      const count = getPitfallCount();
      expect(count).toBe(SCALE_PITFALLS.length);
      expect(count).toBe(7);
    });

    it('getPitfallLabels returns label-friendly format', () => {
      const labels = getPitfallLabels();
      expect(labels.length).toBe(SCALE_PITFALLS.length);
      expect(labels[0]).toHaveProperty('id');
      expect(labels[0]).toHaveProperty('antiPattern');
    });
  });

  describe('Content Quality', () => {
    it('all antiPatterns should be concise titles', () => {
      SCALE_PITFALLS.forEach(pitfall => {
        expect(pitfall.antiPattern.length).toBeLessThan(50);
      });
    });

    it('all whyItFails should be substantive explanations', () => {
      SCALE_PITFALLS.forEach(pitfall => {
        expect(pitfall.whyItFails.length).toBeGreaterThan(50);
      });
    });

    it('all yardFlowApproach should offer solution', () => {
      SCALE_PITFALLS.forEach(pitfall => {
        expect(pitfall.yardFlowApproach.length).toBeGreaterThan(30);
        // Should mention YardFlow, a specific feature, use first-person "We", or describe our approach
        const mentionsProduct = 
          pitfall.yardFlowApproach.includes('YardFlow') ||
          pitfall.yardFlowApproach.includes('digitalGUARD') ||
          pitfall.yardFlowApproach.includes('We ') ||
          pitfall.yardFlowApproach.includes('Open architecture'); // vendor-lock approach
        expect(mentionsProduct).toBe(true);
      });
    });
  });

  describe('Accordion UI Requirements', () => {
    it('should provide enough data for accordion items', () => {
      SCALE_PITFALLS.forEach(pitfall => {
        // Title for accordion header
        expect(pitfall.antiPattern).toBeDefined();
        // Content for expanded state
        expect(pitfall.whyItFails).toBeDefined();
        expect(pitfall.yardFlowApproach).toBeDefined();
        // Visual indicator
        expect(pitfall.icon).toBeDefined();
      });
    });

    it('pitfalls should be ordered by severity', () => {
      // First items should be critical
      expect(SCALE_PITFALLS[0].severity).toBe('critical');
      expect(SCALE_PITFALLS[1].severity).toBe('critical');
    });
  });
});

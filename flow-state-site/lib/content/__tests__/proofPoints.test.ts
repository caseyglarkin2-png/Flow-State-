/**
 * Tests for Proof Points Content Model
 * Sprint 0.2c: Unit Test Proof Points Schema
 */

import { describe, it, expect } from 'vitest';
import {
  PROOF_POINTS,
  getMeasuredProofPoints,
  getModeledProofPoints,
  getProofPointByLabel,
  type ProofPoint,
} from '../proofPoints';

describe('ProofPoints Content Model', () => {
  describe('Schema Validation', () => {
    it('should have all required fields', () => {
      PROOF_POINTS.forEach((point) => {
        expect(point).toHaveProperty('metric');
        expect(point).toHaveProperty('label');
        expect(point).toHaveProperty('sourceType');
        
        // Type validation
        expect(typeof point.metric).toBe('string');
        expect(typeof point.label).toBe('string');
        expect(['measured', 'modeled']).toContain(point.sourceType);
      });
    });

    it('should have at least 4 proof points', () => {
      expect(PROOF_POINTS.length).toBeGreaterThanOrEqual(4);
    });

    it('should have unique labels', () => {
      const labels = PROOF_POINTS.map(p => p.label);
      const uniqueLabels = new Set(labels);
      expect(uniqueLabels.size).toBe(labels.length);
    });
  });

  describe('Deck-Sourced Metrics', () => {
    it('should include 1M+ driver check-ins stat', () => {
      const checkIns = PROOF_POINTS.find(p => p.label === 'Driver Check-Ins');
      expect(checkIns).toBeDefined();
      expect(checkIns?.metric).toBe('1M+');
      expect(checkIns?.sourceType).toBe('measured');
    });

    it('should include 0.2% failure rate stat', () => {
      const failureRate = PROOF_POINTS.find(p => p.label === 'Failure Rate');
      expect(failureRate).toBeDefined();
      expect(failureRate?.metric).toBe('0.2%');
      expect(failureRate?.sourceType).toBe('measured');
    });

    it('should include 200K onboarded drivers stat', () => {
      const drivers = PROOF_POINTS.find(p => p.label === 'Drivers Onboarded');
      expect(drivers).toBeDefined();
      expect(drivers?.metric).toBe('200K');
      expect(drivers?.sourceType).toBe('measured');
    });

    it('should include check-in time improvement stat', () => {
      const checkInTime = PROOF_POINTS.find(p => p.label === 'Check-In Time');
      expect(checkInTime).toBeDefined();
      expect(checkInTime?.metric).toBe('~70s');
      expect(checkInTime?.sourceType).toBe('measured');
    });
  });

  describe('Helper Functions', () => {
    it('getMeasuredProofPoints should return only measured data', () => {
      const measured = getMeasuredProofPoints();
      expect(measured.every(p => p.sourceType === 'measured')).toBe(true);
    });

    it('getModeledProofPoints should return only modeled data', () => {
      const modeled = getModeledProofPoints();
      expect(modeled.every(p => p.sourceType === 'modeled')).toBe(true);
    });

    it('getProofPointByLabel should find proof point by label', () => {
      const checkIns = getProofPointByLabel('Driver Check-Ins');
      expect(checkIns).toBeDefined();
      expect(checkIns?.label).toBe('Driver Check-Ins');
    });

    it('getProofPointByLabel should return undefined for non-existent label', () => {
      const notFound = getProofPointByLabel('Non-Existent Metric');
      expect(notFound).toBeUndefined();
    });
  });

  describe('Data Quality', () => {
    it('should have non-empty metrics', () => {
      PROOF_POINTS.forEach(point => {
        expect(point.metric.trim()).not.toBe('');
      });
    });

    it('should have non-empty labels', () => {
      PROOF_POINTS.forEach(point => {
        expect(point.label.trim()).not.toBe('');
      });
    });

    it('qualifier should be string if present', () => {
      PROOF_POINTS.forEach(point => {
        if (point.qualifier !== undefined) {
          expect(typeof point.qualifier).toBe('string');
        }
      });
    });

    it('context should be string if present', () => {
      PROOF_POINTS.forEach(point => {
        if (point.context !== undefined) {
          expect(typeof point.context).toBe('string');
        }
      });
    });
  });
});

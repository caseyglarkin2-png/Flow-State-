/**
 * Tests for Co-Dev Tracks Content Model
 * Sprint 0.4: Unit Tests for Flatbed and Reefer Co-Dev Opportunities
 */

import { describe, it, expect } from 'vitest';
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
} from '../coDevTracks';

describe('Co-Dev Tracks Content Model', () => {
  describe('Schema Validation', () => {
    it('should have all required fields on opportunities', () => {
      CO_DEV_OPPORTUNITIES.forEach(opp => {
        expect(opp).toHaveProperty('id');
        expect(opp).toHaveProperty('title');
        expect(opp).toHaveProperty('description');
        expect(opp).toHaveProperty('benefit');
        expect(opp).toHaveProperty('vertical');
        expect(opp).toHaveProperty('priority');
        
        expect(typeof opp.id).toBe('string');
        expect(typeof opp.title).toBe('string');
        expect(['flatbed', 'reefer']).toContain(opp.vertical);
        expect(['high', 'medium', 'low']).toContain(opp.priority);
      });
    });

    it('should have unique opportunity IDs', () => {
      const ids = CO_DEV_OPPORTUNITIES.map(o => o.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have all required fields on tracks', () => {
      CO_DEV_TRACKS.forEach(track => {
        expect(track).toHaveProperty('vertical');
        expect(track).toHaveProperty('displayName');
        expect(track).toHaveProperty('investment');
        expect(track).toHaveProperty('operatorLimit');
        expect(track).toHaveProperty('timeline');
        expect(track).toHaveProperty('opportunities');
        expect(track).toHaveProperty('headline');
        expect(track).toHaveProperty('description');
        
        expect(Array.isArray(track.opportunities)).toBe(true);
        expect(track.opportunities.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Flatbed Track', () => {
    it('should have at least 3 flatbed opportunities', () => {
      expect(FLATBED_OPPORTUNITIES.length).toBeGreaterThanOrEqual(3);
    });

    it('should include tarping/securement automation', () => {
      const tarping = FLATBED_OPPORTUNITIES.find(o => 
        o.title.toLowerCase().includes('tarping') || 
        o.title.toLowerCase().includes('securement')
      );
      expect(tarping).toBeDefined();
      expect(tarping?.priority).toBe('high');
    });

    it('should include gate workflow', () => {
      const gateWorkflow = FLATBED_OPPORTUNITIES.find(o => 
        o.title.toLowerCase().includes('gate workflow')
      );
      expect(gateWorkflow).toBeDefined();
    });

    it('should include securement verification', () => {
      const verification = FLATBED_OPPORTUNITIES.find(o => 
        o.id === 'flatbed-securement-verification'
      );
      expect(verification).toBeDefined();
    });

    it('FLATBED_TRACK should have $350K investment', () => {
      expect(FLATBED_TRACK.investment).toBe('$350K');
    });

    it('FLATBED_TRACK should have 2 operator limit', () => {
      expect(FLATBED_TRACK.operatorLimit).toBe(2);
    });
  });

  describe('Reefer Track', () => {
    it('should have at least 3 reefer opportunities', () => {
      expect(REEFER_OPPORTUNITIES.length).toBeGreaterThanOrEqual(3);
    });

    it('should include cold chain workflow capture', () => {
      const coldChain = REEFER_OPPORTUNITIES.find(o => 
        o.title.toLowerCase().includes('cold chain')
      );
      expect(coldChain).toBeDefined();
      expect(coldChain?.priority).toBe('high');
    });

    it('should include FSMA compliance', () => {
      const compliance = REEFER_OPPORTUNITIES.find(o => 
        o.title.toLowerCase().includes('compliance') ||
        o.title.toLowerCase().includes('fsma')
      );
      expect(compliance).toBeDefined();
    });

    it('should include exception handling', () => {
      const exceptions = REEFER_OPPORTUNITIES.find(o => 
        o.title.toLowerCase().includes('exception')
      );
      expect(exceptions).toBeDefined();
      expect(exceptions?.priority).toBe('high');
    });

    it('REEFER_TRACK should have $350K investment', () => {
      expect(REEFER_TRACK.investment).toBe('$350K');
    });

    it('REEFER_TRACK should have 6-month timeline', () => {
      expect(REEFER_TRACK.timeline).toBe('6 months');
    });
  });

  describe('Helper Functions', () => {
    it('getOpportunitiesByVertical should filter correctly', () => {
      const flatbedOpps = getOpportunitiesByVertical('flatbed');
      expect(flatbedOpps.every(o => o.vertical === 'flatbed')).toBe(true);
      expect(flatbedOpps.length).toBe(FLATBED_OPPORTUNITIES.length);

      const reeferOpps = getOpportunitiesByVertical('reefer');
      expect(reeferOpps.every(o => o.vertical === 'reefer')).toBe(true);
      expect(reeferOpps.length).toBe(REEFER_OPPORTUNITIES.length);
    });

    it('getHighPriorityOpportunities should return only high priority', () => {
      const highPriorityFlatbed = getHighPriorityOpportunities('flatbed');
      expect(highPriorityFlatbed.every(o => o.priority === 'high')).toBe(true);
      expect(highPriorityFlatbed.length).toBeGreaterThan(0);

      const highPriorityReefer = getHighPriorityOpportunities('reefer');
      expect(highPriorityReefer.every(o => o.priority === 'high')).toBe(true);
      expect(highPriorityReefer.length).toBeGreaterThan(0);
    });

    it('getOpportunityById should find by ID', () => {
      const opp = getOpportunityById('flatbed-tarping');
      expect(opp).toBeDefined();
      expect(opp?.id).toBe('flatbed-tarping');
    });

    it('getOpportunityById should return undefined for non-existent ID', () => {
      const opp = getOpportunityById('non-existent');
      expect(opp).toBeUndefined();
    });

    it('getTrackByVertical should return correct track', () => {
      const flatbedTrack = getTrackByVertical('flatbed');
      expect(flatbedTrack).toBeDefined();
      expect(flatbedTrack?.vertical).toBe('flatbed');

      const reeferTrack = getTrackByVertical('reefer');
      expect(reeferTrack).toBeDefined();
      expect(reeferTrack?.vertical).toBe('reefer');
    });

    it('getTrackVerticals should return tab-friendly format', () => {
      const verticals = getTrackVerticals();
      expect(verticals).toHaveLength(2);
      expect(verticals[0]).toHaveProperty('value');
      expect(verticals[0]).toHaveProperty('label');
      expect(verticals.map(v => v.value)).toContain('flatbed');
      expect(verticals.map(v => v.value)).toContain('reefer');
    });
  });

  describe('Content Quality', () => {
    it('all opportunities should have non-empty descriptions', () => {
      CO_DEV_OPPORTUNITIES.forEach(opp => {
        expect(opp.description.trim().length).toBeGreaterThan(10);
      });
    });

    it('all opportunities should have non-empty benefits', () => {
      CO_DEV_OPPORTUNITIES.forEach(opp => {
        expect(opp.benefit.trim().length).toBeGreaterThan(10);
      });
    });

    it('track descriptions should mention the vertical', () => {
      expect(FLATBED_TRACK.description.toLowerCase()).toContain('flatbed');
      expect(REEFER_TRACK.description.toLowerCase()).toContain('reefer');
    });

    it('tracks should have consistent investment amounts', () => {
      // Both tracks should be $350K as per RFQ deck
      CO_DEV_TRACKS.forEach(track => {
        expect(track.investment).toBe('$350K');
      });
    });
  });

  describe('RFQ Deck Alignment', () => {
    it('should have combined total of 8 opportunities', () => {
      expect(CO_DEV_OPPORTUNITIES.length).toBe(8);
    });

    it('flatbed and reefer should have 4 opportunities each', () => {
      expect(FLATBED_OPPORTUNITIES.length).toBe(4);
      expect(REEFER_OPPORTUNITIES.length).toBe(4);
    });

    it('each vertical should have at least 2 high-priority items', () => {
      const highFlatbed = FLATBED_OPPORTUNITIES.filter(o => o.priority === 'high');
      const highReefer = REEFER_OPPORTUNITIES.filter(o => o.priority === 'high');
      
      expect(highFlatbed.length).toBeGreaterThanOrEqual(2);
      expect(highReefer.length).toBeGreaterThanOrEqual(2);
    });
  });
});

import { describe, it, expect, vi } from 'vitest';
import { reportWebVitals, WEB_VITAL_THRESHOLDS } from '../webVitals';

// Mock web-vitals module
vi.mock('web-vitals', () => ({
  onCLS: vi.fn((cb) => cb({ name: 'CLS', value: 0.05, rating: 'good', delta: 0.05, id: 'cls-1' })),
  onLCP: vi.fn((cb) => cb({ name: 'LCP', value: 2000, rating: 'good', delta: 2000, id: 'lcp-1' })),
  onINP: vi.fn((cb) => cb({ name: 'INP', value: 150, rating: 'good', delta: 150, id: 'inp-1' })),
  onFCP: vi.fn((cb) => cb({ name: 'FCP', value: 1500, rating: 'good', delta: 1500, id: 'fcp-1' })),
  onTTFB: vi.fn((cb) => cb({ name: 'TTFB', value: 500, rating: 'good', delta: 500, id: 'ttfb-1' })),
}));

describe('webVitals', () => {
  describe('reportWebVitals', () => {
    it('calls captureEvent for each web vital', () => {
      const captureEvent = vi.fn();
      reportWebVitals(captureEvent);

      // Should capture 5 metrics: CLS, LCP, INP, FCP, TTFB
      expect(captureEvent).toHaveBeenCalledTimes(5);
    });

    it('reports CLS metric correctly', () => {
      const captureEvent = vi.fn();
      reportWebVitals(captureEvent);

      expect(captureEvent).toHaveBeenCalledWith('web_vital', {
        name: 'CLS',
        value: 0.05,
        rating: 'good',
        delta: 0.05,
        id: 'cls-1',
      });
    });

    it('reports LCP metric correctly', () => {
      const captureEvent = vi.fn();
      reportWebVitals(captureEvent);

      expect(captureEvent).toHaveBeenCalledWith('web_vital', {
        name: 'LCP',
        value: 2000,
        rating: 'good',
        delta: 2000,
        id: 'lcp-1',
      });
    });

    it('reports INP metric (replaced FID)', () => {
      const captureEvent = vi.fn();
      reportWebVitals(captureEvent);

      expect(captureEvent).toHaveBeenCalledWith('web_vital', 
        expect.objectContaining({ name: 'INP' })
      );
    });
  });

  describe('WEB_VITAL_THRESHOLDS', () => {
    it('has thresholds for all Core Web Vitals', () => {
      expect(WEB_VITAL_THRESHOLDS.LCP).toBeDefined();
      expect(WEB_VITAL_THRESHOLDS.CLS).toBeDefined();
      expect(WEB_VITAL_THRESHOLDS.INP).toBeDefined();
    });

    it('LCP threshold is 2500ms for good', () => {
      expect(WEB_VITAL_THRESHOLDS.LCP.good).toBe(2500);
    });

    it('CLS threshold is 0.1 for good', () => {
      expect(WEB_VITAL_THRESHOLDS.CLS.good).toBe(0.1);
    });
  });
});

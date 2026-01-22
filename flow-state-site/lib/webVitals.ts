/**
 * Web Vitals Reporting
 * 
 * Reports Core Web Vitals to analytics (PostHog).
 * Call this in a client component after hydration.
 */

import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

type WebVitalMetric = {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
};

/**
 * Report Web Vitals to analytics.
 * Safe to call multiple times - each metric only fires once.
 */
export function reportWebVitals(
  captureEvent: (name: string, properties: Record<string, unknown>) => void
): void {
  const handleMetric = (metric: WebVitalMetric) => {
    captureEvent('web_vital', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  };

  // Core Web Vitals
  onCLS(handleMetric);
  onLCP(handleMetric);
  onINP(handleMetric); // Replaced FID as of March 2024

  // Additional useful metrics
  onFCP(handleMetric);
  onTTFB(handleMetric);
}

/**
 * Get thresholds for each metric (for display/debugging)
 */
export const WEB_VITAL_THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  INP: { good: 200, poor: 500 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
} as const;

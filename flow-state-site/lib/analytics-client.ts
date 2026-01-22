'use client';

import { useMemo } from 'react';
import { analytics } from './analytics';

type AnalyticsProperties = Record<string, unknown> | undefined;

export interface AnalyticsEventPayload {
  event: string;
  properties?: AnalyticsProperties;
}

const sanitizeProperties = (properties?: AnalyticsProperties): AnalyticsProperties => {
  if (!properties) return undefined;

  return Object.entries(properties).reduce<Record<string, unknown>>((acc, [key, value]) => {
    if (value === undefined) return acc;
    if (typeof value === 'function') return acc;
    acc[key] = value;
    return acc;
  }, {});
};

/**
 * Safe analytics track wrapper that never throws and no-ops without a provider.
 */
export function trackSafe(event: AnalyticsEventPayload): void {
  if (!event?.event) return;

  try {
    const cleaned = sanitizeProperties(event.properties);
    analytics.track(event.event, cleaned);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('[Analytics] trackSafe failed', error);
    }
  }
}

/**
 * Hook returning a stable analytics client reference for components.
 */
export function useAnalyticsClient() {
  return useMemo(() => ({ track: trackSafe }), []);
}

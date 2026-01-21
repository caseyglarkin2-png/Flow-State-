/**
 * Analytics Events for Variance Tax Calculator
 * 
 * Tracks user interactions with the singularity/calculator experience.
 * Uses a provider-agnostic interface that can be wired to GA4, Mixpanel, etc.
 */

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean | undefined>;
}

export interface CalculatorEventProperties {
  presetId?: string;
  facilityCount?: number;
  loadVolume?: number;
  totalCost?: number;
  reynoldsScore?: number;
  syntheticCapacity?: number;
  timeOnPage?: number;
  interactionCount?: number;
}

export interface VisualizationEventProperties {
  qualityTier?: string;
  fps?: number;
  reducedMotion?: boolean;
  webglVersion?: number;
  transitionTriggered?: boolean;
}

// ═══════════════════════════════════════════════════════════════════
// EVENT NAMES (Constants for type safety)
// ═══════════════════════════════════════════════════════════════════

export const ANALYTICS_EVENTS = {
  // Calculator events
  CALCULATOR_LOADED: 'calculator_loaded',
  CALCULATOR_PRESET_SELECTED: 'calculator_preset_selected',
  CALCULATOR_INPUT_CHANGED: 'calculator_input_changed',
  CALCULATOR_RESULT_VIEWED: 'calculator_result_viewed',
  CALCULATOR_BREAKDOWN_EXPANDED: 'calculator_breakdown_expanded',
  
  // Visualization events
  VISUALIZATION_LOADED: 'visualization_loaded',
  VISUALIZATION_QUALITY_CHANGED: 'visualization_quality_changed',
  VISUALIZATION_TRANSITION_TRIGGERED: 'visualization_transition_triggered',
  VISUALIZATION_ERROR: 'visualization_error',
  
  // Engagement events
  TIME_ON_CALCULATOR: 'time_on_calculator',
  SCROLL_DEPTH_REACHED: 'scroll_depth_reached',
  CTA_CLICKED: 'cta_clicked',
  
  // Conversion events
  DEMO_REQUESTED: 'demo_requested',
  PDF_EXPORTED: 'pdf_exported',
  SHARE_CLICKED: 'share_clicked',
} as const;

// ═══════════════════════════════════════════════════════════════════
// ANALYTICS PROVIDER INTERFACE
// ═══════════════════════════════════════════════════════════════════

type AnalyticsProvider = {
  track: (event: AnalyticsEvent) => void;
  identify: (userId: string, traits?: Record<string, unknown>) => void;
  page: (name?: string, properties?: Record<string, unknown>) => void;
};

let analyticsProvider: AnalyticsProvider | null = null;

/**
 * Set the analytics provider (GA4, Mixpanel, etc.)
 */
export function setAnalyticsProvider(provider: AnalyticsProvider) {
  analyticsProvider = provider;
}

// ═══════════════════════════════════════════════════════════════════
// TRACK FUNCTION
// ═══════════════════════════════════════════════════════════════════

/**
 * Track an analytics event
 */
export function trackEvent(event: AnalyticsEvent): void {
  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event.name, event.properties);
  }

  // Send to provider
  if (analyticsProvider) {
    analyticsProvider.track(event);
  }

  // Also send to window.gtag if available (GA4)
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
      'event',
      event.name,
      event.properties
    );
  }
}

// ═══════════════════════════════════════════════════════════════════
// CALCULATOR EVENTS
// ═══════════════════════════════════════════════════════════════════

export function trackCalculatorLoaded(properties: CalculatorEventProperties = {}) {
  trackEvent({
    name: ANALYTICS_EVENTS.CALCULATOR_LOADED,
    properties,
  });
}

export function trackPresetSelected(presetId: string, properties: CalculatorEventProperties = {}) {
  trackEvent({
    name: ANALYTICS_EVENTS.CALCULATOR_PRESET_SELECTED,
    properties: { presetId, ...properties },
  });
}

export function trackInputChanged(
  inputName: string, 
  value: number, 
  properties: CalculatorEventProperties = {}
) {
  trackEvent({
    name: ANALYTICS_EVENTS.CALCULATOR_INPUT_CHANGED,
    properties: { inputName, value, ...properties },
  });
}

export function trackResultViewed(properties: CalculatorEventProperties) {
  trackEvent({
    name: ANALYTICS_EVENTS.CALCULATOR_RESULT_VIEWED,
    properties,
  });
}

export function trackBreakdownExpanded(component: string) {
  trackEvent({
    name: ANALYTICS_EVENTS.CALCULATOR_BREAKDOWN_EXPANDED,
    properties: { component },
  });
}

// ═══════════════════════════════════════════════════════════════════
// VISUALIZATION EVENTS
// ═══════════════════════════════════════════════════════════════════

export function trackVisualizationLoaded(properties: VisualizationEventProperties) {
  trackEvent({
    name: ANALYTICS_EVENTS.VISUALIZATION_LOADED,
    properties,
  });
}

export function trackQualityChanged(from: string, to: string, reason: string) {
  trackEvent({
    name: ANALYTICS_EVENTS.VISUALIZATION_QUALITY_CHANGED,
    properties: { from, to, reason },
  });
}

export function trackTransitionTriggered(direction: 'toClarity' | 'toSingularity') {
  trackEvent({
    name: ANALYTICS_EVENTS.VISUALIZATION_TRANSITION_TRIGGERED,
    properties: { direction },
  });
}

export function trackVisualizationError(error: string, context?: string) {
  trackEvent({
    name: ANALYTICS_EVENTS.VISUALIZATION_ERROR,
    properties: { error, context },
  });
}

// ═══════════════════════════════════════════════════════════════════
// ENGAGEMENT EVENTS
// ═══════════════════════════════════════════════════════════════════

export function trackTimeOnCalculator(seconds: number) {
  trackEvent({
    name: ANALYTICS_EVENTS.TIME_ON_CALCULATOR,
    properties: { seconds },
  });
}

export function trackScrollDepth(depth: number) {
  trackEvent({
    name: ANALYTICS_EVENTS.SCROLL_DEPTH_REACHED,
    properties: { depth },
  });
}

export function trackCTAClicked(ctaId: string, ctaLabel: string) {
  trackEvent({
    name: ANALYTICS_EVENTS.CTA_CLICKED,
    properties: { ctaId, ctaLabel },
  });
}

// ═══════════════════════════════════════════════════════════════════
// CONVERSION EVENTS
// ═══════════════════════════════════════════════════════════════════

export function trackDemoRequested(properties: CalculatorEventProperties) {
  trackEvent({
    name: ANALYTICS_EVENTS.DEMO_REQUESTED,
    properties,
  });
}

export function trackPDFExported(properties: CalculatorEventProperties) {
  trackEvent({
    name: ANALYTICS_EVENTS.PDF_EXPORTED,
    properties,
  });
}

export function trackShareClicked(platform: string) {
  trackEvent({
    name: ANALYTICS_EVENTS.SHARE_CLICKED,
    properties: { platform },
  });
}

// ═══════════════════════════════════════════════════════════════════
// REACT HOOK FOR AUTO-TRACKING
// ═══════════════════════════════════════════════════════════════════

import { useEffect, useRef } from 'react';

/**
 * Hook to track time spent on calculator page
 */
export function useTimeOnPageTracking(pageName: string) {
  const startTime = useRef<number>(Date.now());
  const tracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    startTime.current = Date.now();

    const checkTime = () => {
      const elapsed = Math.floor((Date.now() - startTime.current) / 1000);
      
      // Track at 30s, 60s, 120s, 300s
      const milestones = [30, 60, 120, 300];
      for (const milestone of milestones) {
        if (elapsed >= milestone && !tracked.current.has(milestone)) {
          tracked.current.add(milestone);
          trackTimeOnCalculator(milestone);
        }
      }
    };

    const interval = setInterval(checkTime, 5000);
    
    return () => {
      clearInterval(interval);
      const finalTime = Math.floor((Date.now() - startTime.current) / 1000);
      if (finalTime > 5) {
        trackTimeOnCalculator(finalTime);
      }
    };
  }, [pageName]);
}

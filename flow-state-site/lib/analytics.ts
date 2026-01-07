// Analytics wrapper supporting PostHog and Plausible
// Configured via environment variables

type AnalyticsProvider = 'posthog' | 'plausible' | 'none';

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

class Analytics {
  private provider: AnalyticsProvider = 'none';
  private initialized = false;

  constructor() {
    if (typeof window === 'undefined') return;

    // Detect provider from environment
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      this.provider = 'posthog';
    } else if (process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) {
      this.provider = 'plausible';
    }
  }

  init() {
    if (this.initialized || typeof window === 'undefined') return;

    if (this.provider === 'posthog' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      // PostHog initialization (lazy load)
      import('posthog-js').then(({ default: posthog }) => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
          loaded: (posthog) => {
            if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing();
          },
        });
      });
    }

    this.initialized = true;
  }

  track(event: string, properties?: Record<string, any>) {
    if (typeof window === 'undefined') return;

    // Always initialize on first track call
    if (!this.initialized) this.init();

    if (this.provider === 'posthog') {
      import('posthog-js').then(({ default: posthog }) => {
        posthog.capture(event, properties);
      });
    } else if (this.provider === 'plausible') {
      // @ts-ignore - Plausible is injected via script tag
      if (window.plausible) {
        // @ts-ignore
        window.plausible(event, { props: properties });
      }
    }
  }

  // Conversion events
  viewROI(properties?: Record<string, any>) {
    this.track('view_roi', properties);
  }

  generateROIPDF(properties?: Record<string, any>) {
    this.track('generate_roi_pdf', properties);
  }

  viewYardBuilder(properties?: Record<string, any>) {
    this.track('view_yardbuilder', properties);
  }

  generateYardBuilderPDF(properties?: Record<string, any>) {
    this.track('generate_yardbuilder_pdf', properties);
  }

  submitQualify(properties?: Record<string, any>) {
    this.track('submit_qualify', properties);
  }

  submitContact(properties?: Record<string, any>) {
    this.track('submit_contact', properties);
  }

  viewDiagnostic(properties?: Record<string, any>) {
    this.track('view_diagnostic', properties);
  }

  completeDiagnostic(properties?: Record<string, any>) {
    this.track('complete_diagnostic', properties);
  }
}

// Singleton instance
export const analytics = new Analytics();

// React hook for analytics
export function useAnalytics() {
  return analytics;
}

// Legacy trackEvent function for backwards compatibility
export function trackEvent(event: string, properties?: Record<string, any>) {
  analytics.track(event, properties);
}

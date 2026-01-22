'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/nextjs';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary for Zustand store hydration failures
 * 
 * Catches errors during SSR/client hydration mismatch or
 * localStorage parse failures. Falls back to default state
 * rather than crashing the entire page.
 */
export class StoreErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[StoreErrorBoundary] Store hydration error:', error);
      console.error('Component stack:', errorInfo.componentStack);
    }

    // Clear potentially corrupted localStorage
    if (typeof window !== 'undefined') {
      try {
        // Only clear store-related keys, not all localStorage
        const storeKeys = [
          'variance-tax-calculator',
          'singularity-store',
          'performance-store',
        ];
        
        storeKeys.forEach(key => {
          const item = localStorage.getItem(key);
          if (item) {
            try {
              JSON.parse(item);
            } catch {
              // Corrupted - remove it
              console.warn(`[StoreErrorBoundary] Removing corrupted key: ${key}`);
              localStorage.removeItem(key);
            }
          }
        });
      } catch (e) {
        console.warn('[StoreErrorBoundary] Could not access localStorage:', e);
      }
    }

    // Send to Sentry for error tracking
    Sentry.captureException(error, {
      tags: {
        component: 'StoreErrorBoundary',
        type: 'store_hydration_error',
      },
      extra: {
        componentStack: errorInfo.componentStack,
      },
    });
  }

  handleReset = () => {
    // Clear all store data and reload
    if (typeof window !== 'undefined') {
      const storeKeys = [
        'variance-tax-calculator',
        'singularity-store',
        'performance-store',
      ];
      storeKeys.forEach(key => localStorage.removeItem(key));
    }
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback or default error UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-4 bg-carbon border border-ember/30 rounded-lg text-white">
          <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
          <p className="text-steel text-sm mb-4">
            There was an error loading your saved data. This has been logged.
          </p>
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-neon/10 border border-neon text-neon rounded hover:bg-neon/20 transition-colors"
          >
            Reset & Reload
          </button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <pre className="mt-4 p-2 bg-void text-xs text-ember overflow-auto max-h-40">
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default StoreErrorBoundary;

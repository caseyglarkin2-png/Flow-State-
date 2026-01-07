'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize analytics on mount
    analytics.init();
  }, []);

  return <>{children}</>;
}

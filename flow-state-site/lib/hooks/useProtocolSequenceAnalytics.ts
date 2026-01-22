import { useCallback } from 'react';
import { useAnalyticsClient } from '../analytics-client';
import type { ProtocolModuleType } from '../protocol-modules';

/**
 * Analytics hook for the protocol sequence animation.
 * Returns a memoized tracker that emits a standardized event shape.
 */
export function useProtocolSequenceAnalytics(enabled: boolean = true) {
  const { track } = useAnalyticsClient();

  return useCallback(
    (module: ProtocolModuleType) => {
      if (!enabled) return;

      track({
        event: 'protocol_sequence_view',
        properties: {
          module,
          timestamp: new Date().toISOString(),
        },
      });
    },
    [enabled, track]
  );
}

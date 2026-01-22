import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { trackSafe, useAnalyticsClient } from '../../analytics-client';

vi.mock('../../analytics', () => ({
  analytics: {
    track: vi.fn(),
  },
}));

import { analytics } from '../../analytics';
const trackSpy = analytics.track as ReturnType<typeof vi.fn>;

describe('trackSafe', () => {
  beforeEach(() => {
    trackSpy.mockClear();
  });

  it('tracks events with sanitized properties', () => {
    trackSafe({
      event: 'protocol_sequence_view',
      properties: {
        module: 'Guard',
        undefinedValue: undefined,
        ignored: () => {},
      },
    });

    expect(trackSpy).toHaveBeenCalledWith('protocol_sequence_view', { module: 'Guard' });
  });

  it('does nothing when event name is missing', () => {
    trackSafe({ event: '' });
    expect(trackSpy).not.toHaveBeenCalled();
  });

  it('swallows errors thrown by provider', () => {
    trackSpy.mockImplementationOnce(() => {
      throw new Error('analytics unavailable');
    });

    expect(() => trackSafe({ event: 'test-error' })).not.toThrow();
  });
});

describe('useAnalyticsClient', () => {
  it('returns a stable track function reference', () => {
    const { result, rerender } = renderHook(() => useAnalyticsClient());
    const first = result.current.track;

    rerender();

    expect(result.current.track).toBe(first);
  });
});

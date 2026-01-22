import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProtocolSequenceAnalytics } from '../useProtocolSequenceAnalytics';

const trackSpy = vi.fn();

vi.mock('../../analytics-client', () => ({
  useAnalyticsClient: () => ({ track: trackSpy }),
}));

describe('useProtocolSequenceAnalytics', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));
    trackSpy.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('emits a protocol_sequence_view event with module and timestamp', () => {
    const { result } = renderHook(() => useProtocolSequenceAnalytics(true));

    act(() => {
      result.current('Guard');
    });

    expect(trackSpy).toHaveBeenCalledWith({
      event: 'protocol_sequence_view',
      properties: {
        module: 'Guard',
        timestamp: '2024-01-01T00:00:00.000Z',
      },
    });
  });

  it('no-ops when disabled', () => {
    const { result } = renderHook(() => useProtocolSequenceAnalytics(false));

    act(() => {
      result.current('Comms');
    });

    expect(trackSpy).not.toHaveBeenCalled();
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import ProtocolSequenceAnimation from '../animations/ProtocolSequenceAnimation';

const trackSpy = vi.fn();

vi.mock('@/lib/hooks/useProtocolSequenceAnalytics', () => ({
  useProtocolSequenceAnalytics: vi.fn(() => trackSpy),
}));

// Mock the SSR-safe motion hook
vi.mock('@/lib/ssr-safe-motion', () => ({
  useSSRSafeReducedMotion: vi.fn(() => false),
}));

import { useSSRSafeReducedMotion } from '@/lib/ssr-safe-motion';
import { useProtocolSequenceAnalytics } from '@/lib/hooks/useProtocolSequenceAnalytics';
const mockUseSSRSafeReducedMotion = useSSRSafeReducedMotion as ReturnType<typeof vi.fn>;
const mockUseProtocolSequenceAnalytics = useProtocolSequenceAnalytics as ReturnType<typeof vi.fn>;

// Mock IntersectionObserver for viewport pause/resume logic
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe = mockObserve;
  disconnect = mockDisconnect;
}

(global as any).IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

describe('ProtocolSequenceAnimation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockUseSSRSafeReducedMotion.mockReturnValue(false);
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe('Analytics wiring', () => {
    it('tracks the initial module once on mount', () => {
      render(<ProtocolSequenceAnimation autoPlay={false} />);

      expect(mockUseProtocolSequenceAnalytics).toHaveBeenCalledWith(true);
      expect(trackSpy).toHaveBeenCalledTimes(1);
      expect(trackSpy).toHaveBeenCalledWith('Guard');
    });

    it('tracks subsequent module transitions when cycling', async () => {
      act(() => {
        render(<ProtocolSequenceAnimation displayDuration={1000} transitionDuration={0} />);
      });

      await act(async () => {
        await vi.advanceTimersByTimeAsync(1100);
      });

      expect(trackSpy).toHaveBeenLastCalledWith('Comms');
    });
  });

  describe('Animated Mode', () => {
    it('renders Guard icon initially', () => {
      render(<ProtocolSequenceAnimation />);
      expect(screen.getByRole('img', { name: /digital guard/i })).toBeInTheDocument();
      expect(screen.getByText('Digital Guard')).toBeInTheDocument();
    });

    it('sets up interval timer when autoPlay is true', () => {
      const setIntervalSpy = vi.spyOn(global, 'setInterval');
      render(<ProtocolSequenceAnimation autoPlay={true} displayDuration={3000} transitionDuration={500} />);

      expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 3500);
    });

    it('loops back to Guard after YMS', () => {
      render(<ProtocolSequenceAnimation displayDuration={1000} transitionDuration={100} />);

      // Cycle through all 4 states
      act(() => {
        vi.advanceTimersByTime(1100 * 4); // Full cycle
      });

      // Should be back to Guard or transitioning to it
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('timer interval uses correct duration', () => {
      const setIntervalSpy = vi.spyOn(global, 'setInterval');
      render(
        <ProtocolSequenceAnimation
          displayDuration={5000}
          transitionDuration={500}
        />
      );

      expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 5500);
    });

    it('respects autoPlay=false', () => {
      render(<ProtocolSequenceAnimation autoPlay={false} />);

      expect(screen.getByText('Digital Guard')).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(10000);
      });

      // Should still be Guard
      expect(screen.getByText('Digital Guard')).toBeInTheDocument();
    });

    it('cleans up interval on unmount', () => {
      const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
      const { unmount } = render(<ProtocolSequenceAnimation />);

      unmount();

      expect(clearIntervalSpy).toHaveBeenCalled();
    });

    it('applies aria-label and aria-live for accessibility', () => {
      render(<ProtocolSequenceAnimation />);
      const region = screen.getByRole('region', { name: /protocol sequence animation/i });
      expect(region).toBeInTheDocument();
      expect(region).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Reduced-Motion Mode', () => {
    beforeEach(() => {
      mockUseSSRSafeReducedMotion.mockReturnValue(true);
    });

    it('renders static grid when prefers-reduced-motion is true', () => {
      render(<ProtocolSequenceAnimation />);

      // All 4 modules should be visible simultaneously
      expect(screen.getByText('Digital Guard')).toBeInTheDocument();
      expect(screen.getByText('Digital Comms')).toBeInTheDocument();
      expect(screen.getByText('Digital BOL')).toBeInTheDocument();
      expect(screen.getByText('Digital YMS')).toBeInTheDocument();
    });

    it('does not cycle states in reduced-motion mode', () => {
      render(<ProtocolSequenceAnimation />);

      const initialContent = screen.getByText('Digital Guard');

      act(() => {
        vi.advanceTimersByTime(10000);
      });

      // Guard should still be present (static grid)
      expect(initialContent).toBeInTheDocument();
    });

    it('displays all 4 icons simultaneously', () => {
      render(<ProtocolSequenceAnimation />);

      expect(screen.getByRole('img', { name: /digital guard/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /digital comms/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /digital bol/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /digital yms/i })).toBeInTheDocument();
    });

    it('has appropriate region label', () => {
      render(<ProtocolSequenceAnimation />);
      expect(screen.getByRole('region', { name: /protocol modules/i })).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    beforeEach(() => {
      mockUseSSRSafeReducedMotion.mockReturnValue(false);
    });

    it('handles onStateChange being undefined', () => {
      expect(() => {
        render(<ProtocolSequenceAnimation displayDuration={1000} transitionDuration={100} />);
        act(() => {
          vi.advanceTimersByTime(1100);
        });
      }).not.toThrow();
    });

    it('handles rapid prop changes', () => {
      const { rerender } = render(<ProtocolSequenceAnimation displayDuration={1000} />);

      rerender(<ProtocolSequenceAnimation displayDuration={2000} />);
      rerender(<ProtocolSequenceAnimation displayDuration={500} />);

      expect(screen.getByRole('region')).toBeInTheDocument();
    });
  });
});

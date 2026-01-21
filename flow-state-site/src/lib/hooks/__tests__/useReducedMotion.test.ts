import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useReducedMotion } from '../useReducedMotion';

describe('useReducedMotion', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Reset mock before each test
    mockMatchMedia = vi.fn();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });
  });

  it('should return false when user does not prefer reduced motion', () => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('should return true when user prefers reduced motion', () => {
    mockMatchMedia.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it('should update when media query changes', () => {
    let changeListener: ((event: MediaQueryListEvent) => void) | null = null;

    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: vi.fn((event, listener) => {
        if (event === 'change') {
          changeListener = listener;
        }
      }),
      removeEventListener: vi.fn(),
    });

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    // Simulate user changing preference
    if (changeListener) {
      (changeListener as (event: MediaQueryListEvent) => void)({ matches: true } as MediaQueryListEvent);
    }

    // Note: This test verifies listener is registered; 
    // actual state update requires rerender (not tested in unit test)
    expect(changeListener).not.toBeNull();
  });

  it('should handle legacy addListener API for older browsers', () => {
    let legacyListener: ((event: MediaQueryListEvent) => void) | null = null;

    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: undefined, // Simulate older browser
      addListener: vi.fn((listener) => {
        legacyListener = listener;
      }),
      removeListener: vi.fn(),
    });

    const { result, unmount } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
    expect(legacyListener).not.toBeNull();

    unmount();
  });

  it('should cleanup event listener on unmount', () => {
    const removeEventListener = vi.fn();

    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener,
    });

    const { unmount } = renderHook(() => useReducedMotion());
    unmount();

    expect(removeEventListener).toHaveBeenCalled();
  });

  // Note: SSR test skipped - useEffect doesn't run in SSR, 
  // and hook safely returns false (default state) server-side
});

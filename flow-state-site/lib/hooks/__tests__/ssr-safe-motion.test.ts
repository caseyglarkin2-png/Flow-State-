import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { getPrefersReducedMotion, useSSRSafeReducedMotion } from '../../ssr-safe-motion';

const createMatchMedia = (matches: boolean) => {
  const addEventListener = vi.fn();
  const removeEventListener = vi.fn();

  const mediaQueryList = {
    matches,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener,
    removeEventListener,
    dispatchEvent: vi.fn(),
  } satisfies MediaQueryList;

  const matchMediaMock = vi.fn().mockReturnValue(mediaQueryList);
  return { mediaQueryList, matchMediaMock, addEventListener, removeEventListener };
};

describe('getPrefersReducedMotion', () => {
  const originalWindow = global.window;

  afterEach(() => {
    global.window = originalWindow;
  });

  it('returns false when window is undefined', () => {
    delete (global as any).window;
    expect(getPrefersReducedMotion()).toBe(false);
  });

  it('returns current matchMedia value when available', () => {
    const { matchMediaMock } = createMatchMedia(true);
    global.window = { matchMedia: matchMediaMock } as unknown as Window & typeof globalThis;
    expect(getPrefersReducedMotion()).toBe(true);
  });
});

describe('useSSRSafeReducedMotion', () => {
  const originalMatchMedia = global.window.matchMedia;
  let addEventListenerMock: ReturnType<typeof vi.fn>;
  let removeEventListenerMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    addEventListenerMock = vi.fn();
    removeEventListenerMock = vi.fn();
  });

  afterEach(() => {
    global.window.matchMedia = originalMatchMedia;
  });

  it('initializes with current matchMedia value', () => {
    const { matchMediaMock } = createMatchMedia(true);
    global.window.matchMedia = matchMediaMock;

    const { result } = renderHook(() => useSSRSafeReducedMotion());
    expect(result.current).toBe(true);
  });

  it('updates when media query changes', () => {
    const { matchMediaMock, addEventListener } = createMatchMedia(false);
    global.window.matchMedia = matchMediaMock;

    const { result } = renderHook(() => useSSRSafeReducedMotion());
    expect(result.current).toBe(false);

    act(() => {
      const handler = addEventListener.mock.calls[0][1] as (event: MediaQueryListEvent) => void;
      handler({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);
  });

  it('cleans up event listeners on unmount', () => {
    const { matchMediaMock, removeEventListener } = createMatchMedia(false);
    global.window.matchMedia = matchMediaMock;

    const { unmount } = renderHook(() => useSSRSafeReducedMotion());
    unmount();

    expect(removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});

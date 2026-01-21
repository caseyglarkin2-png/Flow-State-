/**
 * Tests for Accessibility Hooks
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
  usePrefersReducedMotion,
  getAnimationDuration,
  useUniqueId,
  useKeyboardFocus,
} from '../hooks';

describe('usePrefersReducedMotion', () => {
  let originalMatchMedia: typeof window.matchMedia;
  let addEventListenerMock: ReturnType<typeof vi.fn>;
  let removeEventListenerMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    addEventListenerMock = vi.fn();
    removeEventListenerMock = vi.fn();
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  function mockMatchMedia(matches: boolean) {
    window.matchMedia = vi.fn().mockReturnValue({
      matches,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: addEventListenerMock,
      removeEventListener: removeEventListenerMock,
      dispatchEvent: vi.fn(),
    });
  }

  it('returns false by default', () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });

  it('returns true when user prefers reduced motion', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);
  });

  it('updates when preference changes', () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => usePrefersReducedMotion());
    
    expect(result.current).toBe(false);
    
    act(() => {
      const handler = addEventListenerMock.mock.calls[0][1];
      handler({ matches: true } as MediaQueryListEvent);
    });
    
    expect(result.current).toBe(true);
  });
});

describe('getAnimationDuration', () => {
  it('returns normal duration when reduced motion is false', () => {
    expect(getAnimationDuration(300, false)).toBe(300);
  });

  it('returns 0 when reduced motion is true', () => {
    expect(getAnimationDuration(300, true)).toBe(0);
  });

  it('handles various durations', () => {
    expect(getAnimationDuration(1000, false)).toBe(1000);
    expect(getAnimationDuration(1000, true)).toBe(0);
    expect(getAnimationDuration(0, false)).toBe(0);
  });
});

describe('useUniqueId', () => {
  it('generates unique IDs', () => {
    const { result: result1 } = renderHook(() => useUniqueId());
    const { result: result2 } = renderHook(() => useUniqueId());
    
    expect(result1.current).not.toBe(result2.current);
  });

  it('uses custom prefix', () => {
    const { result } = renderHook(() => useUniqueId('custom'));
    expect(result.current).toMatch(/^custom-\d+$/);
  });

  it('maintains stable ID across renders', () => {
    const { result, rerender } = renderHook(() => useUniqueId('test'));
    const initialId = result.current;
    
    rerender();
    
    expect(result.current).toBe(initialId);
  });
});

describe('useKeyboardFocus', () => {
  it('starts as false (mouse user by default)', () => {
    const { result } = renderHook(() => useKeyboardFocus());
    expect(result.current).toBe(false);
  });

  it('becomes true on Tab key press', () => {
    const { result } = renderHook(() => useKeyboardFocus());
    
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    });
    
    expect(result.current).toBe(true);
  });

  it('becomes false on mouse click', () => {
    const { result } = renderHook(() => useKeyboardFocus());
    
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    });
    expect(result.current).toBe(true);
    
    act(() => {
      window.dispatchEvent(new MouseEvent('mousedown'));
    });
    expect(result.current).toBe(false);
  });
});

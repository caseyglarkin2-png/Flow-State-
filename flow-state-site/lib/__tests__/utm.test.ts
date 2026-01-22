import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  extractUtmFromUrl,
  hasUtmParams,
  captureUtmParams,
  getStoredUtm,
  clearStoredUtm,
  appendUtmToUrl,
} from '../utm';

describe('utm', () => {
  describe('extractUtmFromUrl', () => {
    it('extracts all UTM params from URL', () => {
      const url = 'https://example.com?utm_source=google&utm_medium=cpc&utm_campaign=spring&utm_term=yard&utm_content=hero';
      const utm = extractUtmFromUrl(url);

      expect(utm).toEqual({
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: 'spring',
        utm_term: 'yard',
        utm_content: 'hero',
      });
    });

    it('extracts partial UTM params', () => {
      const url = 'https://example.com?utm_source=linkedin&utm_medium=social';
      const utm = extractUtmFromUrl(url);

      expect(utm).toEqual({
        utm_source: 'linkedin',
        utm_medium: 'social',
      });
    });

    it('returns empty object for URLs without UTM params', () => {
      const url = 'https://example.com?foo=bar';
      const utm = extractUtmFromUrl(url);

      expect(utm).toEqual({});
    });

    it('ignores non-UTM params', () => {
      const url = 'https://example.com?utm_source=google&ref=friend&utm_medium=email';
      const utm = extractUtmFromUrl(url);

      expect(utm).toEqual({
        utm_source: 'google',
        utm_medium: 'email',
      });
    });

    it('works with URL object', () => {
      const url = new URL('https://example.com?utm_source=test');
      const utm = extractUtmFromUrl(url);

      expect(utm.utm_source).toBe('test');
    });
  });

  describe('hasUtmParams', () => {
    it('returns true when UTM params present', () => {
      expect(hasUtmParams({ utm_source: 'google' })).toBe(true);
    });

    it('returns false for empty object', () => {
      expect(hasUtmParams({})).toBe(false);
    });

    it('returns false when all values are undefined', () => {
      expect(hasUtmParams({ utm_source: undefined })).toBe(false);
    });
  });

  describe('sessionStorage integration', () => {
    const mockSessionStorage: Record<string, string> = {};

    beforeEach(() => {
      // Mock sessionStorage
      vi.stubGlobal('sessionStorage', {
        getItem: (key: string) => mockSessionStorage[key] ?? null,
        setItem: (key: string, value: string) => {
          mockSessionStorage[key] = value;
        },
        removeItem: (key: string) => {
          delete mockSessionStorage[key];
        },
      });

      // Clear mock storage
      Object.keys(mockSessionStorage).forEach((key) => delete mockSessionStorage[key]);
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('captureUtmParams stores UTM from URL', () => {
      vi.stubGlobal('location', { href: 'https://example.com?utm_source=test' });

      captureUtmParams();
      const stored = getStoredUtm();

      expect(stored).toEqual({ utm_source: 'test' });
    });

    it('captureUtmParams preserves first-touch (does not overwrite)', () => {
      vi.stubGlobal('location', { href: 'https://example.com?utm_source=first' });
      captureUtmParams();

      vi.stubGlobal('location', { href: 'https://example.com?utm_source=second' });
      captureUtmParams();

      const stored = getStoredUtm();
      expect(stored?.utm_source).toBe('first');
    });

    it('getStoredUtm returns null when nothing stored', () => {
      expect(getStoredUtm()).toBeNull();
    });

    it('clearStoredUtm removes stored UTM', () => {
      vi.stubGlobal('location', { href: 'https://example.com?utm_source=test' });
      captureUtmParams();

      clearStoredUtm();

      expect(getStoredUtm()).toBeNull();
    });
  });

  describe('appendUtmToUrl', () => {
    it('appends UTM params to external URL', () => {
      const result = appendUtmToUrl('https://linkedin.com/company/freightroll', 'yardflow', 'footer');
      expect(result).toBe('https://linkedin.com/company/freightroll?utm_source=yardflow&utm_medium=footer');
    });

    it('appends campaign when provided', () => {
      const result = appendUtmToUrl('https://twitter.com/freightroll', 'yardflow', 'footer', 'launch2025');
      expect(result).toContain('utm_campaign=launch2025');
    });

    it('uses default source and medium', () => {
      const result = appendUtmToUrl('https://calendly.com/freightroll');
      expect(result).toContain('utm_source=yardflow');
      expect(result).toContain('utm_medium=website');
    });

    it('handles URLs with existing query params', () => {
      const result = appendUtmToUrl('https://example.com?foo=bar', 'yardflow', 'cta');
      expect(result).toContain('foo=bar');
      expect(result).toContain('utm_source=yardflow');
    });

    it('returns original URL if invalid', () => {
      const result = appendUtmToUrl('not-a-valid-url', 'yardflow', 'footer');
      expect(result).toBe('not-a-valid-url');
    });
  });
});

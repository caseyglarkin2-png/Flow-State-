/**
 * UTM parameter capture and persistence utilities.
 * Captures UTM params from URL on first visit and persists in sessionStorage.
 */

export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

const UTM_STORAGE_KEY = 'yardflow_utm';

const UTM_KEYS: (keyof UtmParams)[] = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
];

/**
 * Extract UTM parameters from URL search params.
 */
export function extractUtmFromUrl(url: string | URL): UtmParams {
  const searchParams = typeof url === 'string' ? new URL(url).searchParams : url.searchParams;
  const utm: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = searchParams.get(key);
    if (value) {
      utm[key] = value;
    }
  }

  return utm;
}

/**
 * Check if UTM params object has any values.
 */
export function hasUtmParams(utm: UtmParams): boolean {
  return Object.values(utm).some((v) => Boolean(v));
}

/**
 * Capture UTM params from current URL and store in sessionStorage.
 * Only captures if no UTM is already stored (preserves first-touch).
 */
export function captureUtmParams(): void {
  if (typeof window === 'undefined') return;

  // Don't overwrite existing UTM (first-touch attribution)
  const existing = sessionStorage.getItem(UTM_STORAGE_KEY);
  if (existing) return;

  const utm = extractUtmFromUrl(window.location.href);
  if (hasUtmParams(utm)) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
  }
}

/**
 * Get stored UTM params from sessionStorage.
 */
export function getStoredUtm(): UtmParams | null {
  if (typeof window === 'undefined') return null;

  const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as UtmParams;
  } catch {
    return null;
  }
}

/**
 * Clear stored UTM params (useful after form submission).
 */
export function clearStoredUtm(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(UTM_STORAGE_KEY);
}

/**
 * Append UTM parameters to an external URL for outbound tracking.
 * Use this for social links, partner links, etc.
 * 
 * @param url - The target URL (external)
 * @param source - The utm_source value (e.g., 'yardflow', 'website')
 * @param medium - The utm_medium value (e.g., 'footer', 'header', 'cta')
 * @param campaign - Optional campaign name
 */
export function appendUtmToUrl(
  url: string,
  source: string = 'yardflow',
  medium: string = 'website',
  campaign?: string
): string {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('utm_source', source);
    urlObj.searchParams.set('utm_medium', medium);
    if (campaign) {
      urlObj.searchParams.set('utm_campaign', campaign);
    }
    return urlObj.toString();
  } catch {
    // Invalid URL, return as-is
    return url;
  }
}

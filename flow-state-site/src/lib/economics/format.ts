/**
 * DISPLAY FORMATTING WITH CREDIBILITY GUARDRAILS
 * 
 * Enterprise buyers reject absurd numbers. These formatters cap outputs
 * to prevent "too good to be true" displays that kill trust.
 */

export function money(amount: number): string {
  const abs = Math.abs(amount);
  if (abs >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `$${(amount / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${Math.round(amount).toLocaleString()}`;
}

export function percent(value: number, decimals = 0): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format ROI percentage with credibility cap
 * >500% ROI is rare for enterprise software; display as ">500%" to signal uncertainty
 */
export function formatROI(value: number): string {
  if (!Number.isFinite(value)) return 'N/A';
  if (value < 0) return 'Negative';
  if (value > 1000) return '>1000%';
  if (value > 500) return `~${Math.round(value / 100) * 100}%`;
  return `${Math.round(value)}%`;
}

/**
 * Format payback period with floor/cap
 * <1 month = unrealistic for enterprise
 * >10 years = probably not worth it
 */
export function formatPayback(months: number): string {
  if (!Number.isFinite(months)) return 'N/A';
  if (months <= 0) return 'N/A';
  if (months < 1) return '<1 month';
  if (months > 120) return '>10 years';
  if (months > 24) return `${Math.round(months / 12)} years`;
  return `${months.toFixed(1)} months`;
}

/**
 * Format network multiplier with credibility context
 */
export function formatMultiplier(value: number): string {
  if (!Number.isFinite(value) || value < 1) return '1.0×';
  if (value > 10) return '>10× (high uncertainty)';
  if (value > 6) return `~${value.toFixed(1)}× (network mature)`;
  return `${value.toFixed(1)}×`;
}

export function truckloads(n: number): string {
  const v = Math.round(n);
  return v.toLocaleString();
}

export function paybackLabel(months: number): string {
  return formatPayback(months);
}

/**
 * Display confidence range for metrics
 * Shows conservative/expected/upside instead of single point
 */
export function formatRange(conservative: number, expected: number, upside: number, formatter: (n: number) => string): string {
  return `${formatter(conservative)} - ${formatter(upside)} (expected: ${formatter(expected)})`;
}

/**
 * Format percentage with confidence qualifier
 */
export function formatPercentWithConfidence(value: number, confidence: 'low' | 'medium' | 'high' = 'medium'): string {
  const pct = Math.round(value * 100);
  const qualifier = confidence === 'high' ? '' : confidence === 'medium' ? '~' : '±';
  return `${qualifier}${pct}%`;
}

/**
 * CANONICAL ECONOMIC ASSUMPTIONS
 * 
 * Single source of truth for all YardFlow ROI calculations.
 * Used across: homepage, ROI calculator, diagnostic, product pages.
 * 
 * Update these values to change claims site-wide. All calculations
 * and display copy should reference these constants.
 */

export const CANONICAL_ASSUMPTIONS = {
  /**
   * Dwell Time Reduction
   * Average reduction in time trailers spend in yard from arrival to departure
   */
  DWELL_TIME_REDUCTION: 0.5, // 50% reduction (e.g., 55 min → 27.5 min)

  /**
   * Detention Cost Reduction
   * Percentage reduction in detention hours through predictive ETAs and orchestration
   */
  DETENTION_REDUCTION: 0.65, // 65% reduction in detention incidents

  /**
   * Labor Time Savings
   * Reduction in manual yard labor time per truck through automation
   */
  LABOR_TIME_SAVINGS: 0.7, // 70% reduction in yard labor hours

  /**
   * Trucks Subject to Detention
   * Percentage of trucks that incur detention charges in baseline scenario
   */
  TRUCKS_WITH_DETENTION: 0.15, // 15% of trucks

  /**
   * Throughput Capacity Increase
   * Additional capacity unlocked through faster dwell times (same infrastructure)
   */
  THROUGHPUT_INCREASE: 0.1, // 10% capacity increase

  /**
   * Throughput Margin
   * Modeled margin per additional truck processed (revenue opportunity)
   */
  THROUGHPUT_MARGIN_PER_TRUCK: 500, // $500/truck

  /**
   * Paperless Savings Baseline
   * Guaranteed minimum savings per facility from eliminating paper BOLs, clipboards, manual logs
   */
  PAPERLESS_SAVINGS_PER_FACILITY: 11900, // $11,900/year per facility

  /**
   * Network Effect Parameters
   * Metcalfe-inspired network value multiplier
   */
  NETWORK_BETA: 0.004, // Network effect strength coefficient
  NETWORK_TAU: 45, // Network maturity constant (days to full learning)

  /**
   * Default Economic Scenario Values
   * Used for homepage hero calculations and example scenarios
   */
  DEFAULT_TRUCKS_PER_DAY: 150,
  DEFAULT_DWELL_TIME_MINUTES: 55,
  DEFAULT_DETENTION_COST_PER_HOUR: 75,
  DEFAULT_YARD_LABOR_RATE_PER_HOUR: 25,
  DEFAULT_LABOR_HOURS_PER_TRUCK: 2,

  /**
   * Year-1 Ramp Share
   * Default percentage of full-network value realized in Year 1
   * (Used for conservative ROI projections)
   */
  DEFAULT_YEAR_ONE_RAMP: 0.05, // 5% ramp in Year 1
} as const;

/**
 * Display-friendly labels for assumptions (used in UI)
 */
export const ASSUMPTION_LABELS = {
  DWELL_TIME_REDUCTION: '50% dwell time reduction',
  DETENTION_REDUCTION: '65% detention cost reduction',
  LABOR_TIME_SAVINGS: '70% labor time savings',
  THROUGHPUT_INCREASE: '10% throughput capacity increase',
  PAPERLESS_SAVINGS: '$11,900/facility paperless savings',
} as const;

/**
 * Helper: Format assumption as percentage
 */
export function formatAssumptionPct(value: number): string {
  return `${Math.round(value * 100)}%`;
}

/**
 * Helper: Format assumption as currency
 */
export function formatAssumptionCurrency(value: number): string {
  return `$${value.toLocaleString()}`;
}

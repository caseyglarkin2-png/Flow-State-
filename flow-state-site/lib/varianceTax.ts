// /lib/varianceTax.ts
// Canonical copy blocks for the Variance Tax economic narrative
// Use these verbatim or with minor tense adjustments across the site

/**
 * THE VARIANCE TAX - Single economic frame for YardFlow
 * 
 * Definition: The hidden cost of unpredictable yard operations and handoffs:
 * waiting, rework, exceptions, blind spots, disputes, and security exposure.
 * It hits service, labor, detention, throughput, and confidence in the plan.
 */

// ═══════════════════════════════════════════════════════════════
// APPROVED COPY BLOCKS
// ═══════════════════════════════════════════════════════════════

/**
 * One-liner for eyebrows and subheaders
 */
export const VARIANCE_TAX_ONELINER = 
  "Yard operations pay a hidden Variance Tax: delays, exceptions, disputes, and security gaps that compound across a network.";

/**
 * Core paragraph for hero sections
 */
export const VARIANCE_TAX_HERO_PARAGRAPH = 
  "Most yards don't fail because people are lazy. They fail because variance is unmanaged. " +
  "Every exception, missing trailer, bad handoff, and manual check-in creates a hidden Variance Tax. " +
  "It shows up as detention, labor churn, missed appointments, compliance risk, and fragile ETAs. " +
  "YardFlow reduces variance by turning the yard into a deterministic protocol for check-in, custody, movement, and proof.";

/**
 * Proof/consequence line for Pricing and ROI sections
 */
export const VARIANCE_TAX_PRICING_LINE = 
  "Pricing is simple because the goal is simple: reduce the Variance Tax and give your network a predictable operating rhythm.";

/**
 * Deterministic protocol line (no em dashes)
 */
export const VARIANCE_TAX_PROTOCOL_LINE = 
  "YardFlow is a deterministic protocol for check-in, custody, movement, and proof. " +
  "It reduces variance so throughput rises without adding headcount.";

/**
 * Short definition for tooltips and cards
 */
export const VARIANCE_TAX_SHORT_DEF = 
  "The hidden cost of unpredictable yard operations: delays, exceptions, disputes, security exposure.";

// ═══════════════════════════════════════════════════════════════
// SUPPORTING SYMPTOMS (reference these, but Variance Tax is the umbrella)
// ═══════════════════════════════════════════════════════════════

export const VARIANCE_TAX_SYMPTOMS = [
  "Detention fees and carrier disputes",
  "Labor churn from manual processes",
  "Missed appointments and cascading delays",
  "Compliance risk and audit failures",
  "Fragile ETAs and planning uncertainty",
  "Security exposure at unverified gates",
  "Blind spots in yard visibility",
];

// ═══════════════════════════════════════════════════════════════
// WHAT TO AVOID
// ═══════════════════════════════════════════════════════════════

/**
 * Do NOT use these as the primary frame. They can be supporting symptoms.
 * - "Network leakage" as headline (use as symptom of Variance Tax)
 * - "Viscosity" as primary concept (technical jargon)
 * - "Chaos" alone without Variance Tax context
 * 
 * Do NOT make absolute claims:
 * - "Eliminates all delays" → "Reduces delays"
 * - "Guarantees X% improvement" → "Typically achieves X% improvement"
 */

// ═══════════════════════════════════════════════════════════════
// USAGE EXAMPLES
// ═══════════════════════════════════════════════════════════════

/**
 * Example: Pricing page hero
 * 
 * <p className="eyebrow">Cut the Variance Tax</p>
 * <h1>Transparent Pricing</h1>
 * <p>{VARIANCE_TAX_PRICING_LINE}</p>
 */

/**
 * Example: Solutions page
 * 
 * <p className="eyebrow">The Hidden Cost</p>
 * <h2>The Variance Tax</h2>
 * <p>{VARIANCE_TAX_ONELINER}</p>
 * <ul>{VARIANCE_TAX_SYMPTOMS.map(s => <li>{s}</li>)}</ul>
 */

// ═══════════════════════════════════════════════════════════════
// CANONICAL TERM DICTIONARY
// ═══════════════════════════════════════════════════════════════

/**
 * Term standardization across all pages
 * Use these exact strings for consistency
 */
export const CANON_TERMS = {
  /** Primary economic frame - use as the headline concept everywhere */
  varianceTax: 'Variance Tax',
  
  /** For page titles and H1 headlines on diagnostic/ROI */
  quantifyHeadline: 'Quantify the Variance Tax',
  
  /** For eyebrow above diagnostic calculator */
  diagnosticEyebrow: '60-Second Assessment',
  
  /** Section header for the 8 categories */
  categoriesHeading: 'Variance Tax: Eight Cost Categories',
  
  /** Secondary metaphor - use sparingly as supporting concept */
  leakMetaphor: 'operational leaks',
  
  /** Methodology section title */
  methodologyTitle: 'How We Calculate Your Variance Tax',
  
  /** CTA button labels */
  runDiagnosticCTA: 'Run Variance Tax Diagnostic',
  viewFullROI: 'Build ROI Model',
  getBoardReady: 'Get Board-Ready Summary',
} as const;

// ═══════════════════════════════════════════════════════════════
// VARIANCE TAX COST CATEGORIES (canonical names & descriptions)
// ═══════════════════════════════════════════════════════════════

export const VARIANCE_TAX_CATEGORIES = [
  {
    id: 1,
    name: 'Detention & Disputes',
    description: '$50-200 per occurrence. Based on industry avg detention rate of 8-15% of loads, avg dwell time 45-90 min.',
  },
  {
    id: 2,
    name: 'Missed Cutoffs & Expedites',
    description: '$500-2,000 per event. Modeled from premium freight rates and opportunity cost of delayed shipments.',
  },
  {
    id: 3,
    name: 'OT & Labor Volatility',
    description: '$15-45/hr premium. Calculated from unpredictable arrivals requiring staffing buffers or rush scheduling.',
  },
  {
    id: 4,
    name: 'Trailer Hunt Time',
    description: '8-15 min per move. Productivity loss from manual searches, radio calls, and yard walks.',
  },
  {
    id: 5,
    name: 'OTIF Chargebacks',
    description: '$100-500 per miss. Penalties from retail customers when root cause cannot be proven defensibly.',
  },
  {
    id: 6,
    name: 'Overflow Yards & 3PL Surge',
    description: '$200-800 per trailer/day. Cost of external storage when throughput constraint appears (but is not real).',
  },
  {
    id: 7,
    name: 'Safety & Claims Exposure',
    description: '$5K-50K per claim. Incidents from poor visibility, geofencing gaps, and ad-hoc coordination.',
  },
  {
    id: 8,
    name: 'Working Capital Buffers',
    description: '3-7% tied capital. Extra inventory and trailer pools held "just in case" due to flow unpredictability.',
  },
] as const;

// ═══════════════════════════════════════════════════════════════
// DIAGNOSTIC PAGE COPY
// ═══════════════════════════════════════════════════════════════

export const DIAGNOSTIC_HERO_H1 = 'Quantify the Variance Tax.';

export const DIAGNOSTIC_HERO_SUBHEAD = 
  '9 questions. Your hidden yard costs. Top variance drivers. Cost of delay. Instantly.';

export const DIAGNOSTIC_CTA_TEXT = 
  'This diagnostic shows single-site costs. See how YardFlow reduces variance across your entire network.';

// ═══════════════════════════════════════════════════════════════
// ECONOMICS METHODOLOGY INTRO
// ═══════════════════════════════════════════════════════════════

export const METHODOLOGY_INTRO_PARAGRAPH = 
  'The Variance Tax represents the invisible operational costs buried in your P&L. ' +
  'These are real dollars lost to unpredictable operations, but they rarely appear as a line item. ' +
  'We model eight distinct categories:';

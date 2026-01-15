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

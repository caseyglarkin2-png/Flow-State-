/**
 * Brand Constants
 * 
 * Single source of truth for brand names, product names, and terminology.
 * Import these constants instead of hardcoding strings.
 * 
 * See: docs/BRAND_AUDIT.md for usage guidelines
 */

export const BRAND_NAMES = {
  /** Company name */
  Company: 'FreightRoll',
  
  /** Product name */
  Product: 'YardFlow',
  
  /** Full product name (for headers, hero sections) */
  ProductFull: 'YardFlow by FreightRoll',
  
  /** Acronym for Yard Network System */
  Acronym: 'YNS',
  
  /** Full expansion of YNS acronym */
  FullAcronym: 'Yard Network System',
  
  /** Co-development program name */
  Program: 'Co-Development Program',
  
  /** Tagline / positioning statement */
  Tagline: 'Yard Orchestration & Security for Freight Networks',
} as const;

export const TERMINOLOGY = {
  /** Yard (lowercase unless start of sentence) */
  Yard: 'yard',
  
  /** Facility (alternative to yard) */
  Facility: 'facility',
  
  /** Protocol (standardized protocol) */
  Protocol: 'standardized protocol',
  
  /** Network effect terminology */
  NetworkEffect: 'network compounding',
  
  /** Variance (the problem) */
  Variance: 'variance',
  
  /** Flow (the solution) */
  Flow: 'standardized flow',
  
  /** Digital twin terminology */
  DigitalTwin: 'digital twin',
  
  /** Orchestration (product capability) */
  Orchestration: 'yard orchestration',
  
  /** Security (product capability) */
  Security: 'yard security',
} as const;

/**
 * Helper: Get brand-compliant company name
 */
export function getCompanyName(): string {
  return BRAND_NAMES.Company;
}

/**
 * Helper: Get brand-compliant product name (full)
 */
export function getProductName(full: boolean = false): string {
  return full ? BRAND_NAMES.ProductFull : BRAND_NAMES.Product;
}

/**
 * Helper: Get tagline
 */
export function getTagline(): string {
  return BRAND_NAMES.Tagline;
}

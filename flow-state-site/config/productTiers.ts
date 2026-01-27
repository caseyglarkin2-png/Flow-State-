/**
 * YARDFLOW PRODUCT TIER CONFIGURATION
 * 
 * Two-tier product offering:
 * 1. CORE: Digital modules (gate, dock, paperless BOL) - pays for itself with paper
 * 2. ENHANCED: Core + Machine Vision (Gen Logs white-labeled) - headcount reduction potential
 * 
 * SOURCE: CEO Weekly Call (Jan 22, 2026) + image (38).png product framework
 * 
 * LOCKED: Do not modify tier structure without CEO approval
 */

export type ProductTier = 'core' | 'enhanced';

export interface TierCapability {
  id: string;
  name: string;
  description: string;
  icon?: string;
  includedIn: ProductTier[];
}

export interface ProductTierConfig {
  id: ProductTier;
  name: string;
  headline: string;
  subheadline: string;
  description: string;
  roiAnchor: string;
  priceLogic: string;
  capabilities: TierCapability[];
  ctaLabel: string;
  ctaHref: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// CAPABILITIES (ordered by workflow)
// ═══════════════════════════════════════════════════════════════════════════

export const CAPABILITIES: TierCapability[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // CORE CAPABILITIES (Digital Modules)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'digital-guard',
    name: 'Digital Guard',
    description: 'Gate automation with OCR, photo capture, and real-time driver authentication. Driver stays in truck.',
    icon: 'shield',
    includedIn: ['core', 'enhanced'],
  },
  {
    id: 'digital-comms',
    name: 'Digital Comms',
    description: 'Lane-level driver messaging with read receipts. 40+ languages. No more "I never got the message" disputes.',
    icon: 'signal',
    includedIn: ['core', 'enhanced'],
  },
  {
    id: 'digital-bol',
    name: 'Digital BOL',
    description: 'Touchless documentation with cryptographic timestamps. Photo proof of load condition. Detention disputes die young.',
    icon: 'document',
    includedIn: ['core', 'enhanced'],
  },
  {
    id: 'digital-yms',
    name: 'Digital YMS',
    description: 'Real-time yard visibility with dwell anomaly detection. Network-wide predictive intelligence.',
    icon: 'grid',
    includedIn: ['core', 'enhanced'],
  },
  
  // ─────────────────────────────────────────────────────────────────────────
  // ENHANCED CAPABILITIES (Machine Vision + Advanced)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'machine-vision',
    name: 'Machine Vision',
    description: 'Automated seal verification, temperature capture for reefers, and condition documentation. No driver upload required.',
    icon: 'camera',
    includedIn: ['enhanced'],
  },
  {
    id: 'guard-digitization',
    name: 'Guard Digitization',
    description: 'Digital workflows for guards still on-site. Capture reefer data, seal checks, and exception handling without paper.',
    icon: 'user',
    includedIn: ['enhanced'],
  },
  {
    id: 'advanced-rtls',
    name: 'Advanced RTLS',
    description: 'Real-time trailer location for automated yard checks. Coming soon with network-optimized economics.',
    icon: 'location',
    includedIn: ['enhanced'],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// PRODUCT TIERS
// ═══════════════════════════════════════════════════════════════════════════

export const PRODUCT_TIERS: Record<ProductTier, ProductTierConfig> = {
  core: {
    id: 'core',
    name: 'YardFlow Core',
    headline: 'Pays for itself with paper',
    subheadline: 'Digital modules for gate, dock, and paperless BOL',
    description: `The foundation of yard network standardization. Digital Guard, Comms, BOL, and YMS — everything you need to keep drivers in trucks and eliminate paper waste. Finance can underwrite this on paper savings alone.`,
    roiAnchor: '$0.20/shipment paper savings',
    priceLogic: '10¢/page × 2-page BOL = 20¢/shipment',
    capabilities: CAPABILITIES.filter((c) => c.includedIn.includes('core')),
    ctaLabel: 'Calculate Your ROI',
    ctaHref: '/roi',
  },
  enhanced: {
    id: 'enhanced',
    name: 'YardFlow Enhanced',
    headline: 'Machine vision unlocks headcount savings',
    subheadline: 'Core + Gen Logs machine vision for reefer and seal automation',
    description: `Everything in Core, plus machine vision for automated seal verification, temperature capture, and guard digitization. For facilities where headcount reduction is the goal, this tier delivers measurable labor savings.`,
    roiAnchor: '~$40k/facility/year labor value',
    priceLogic: 'Core + Gen Logs machine vision module',
    capabilities: CAPABILITIES.filter((c) => c.includedIn.includes('enhanced')),
    ctaLabel: 'Schedule Audit Call',
    ctaHref: '/contact?intent=qualify',
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get all capabilities for a given tier
 */
export function getTierCapabilities(tier: ProductTier): TierCapability[] {
  return CAPABILITIES.filter((c) => c.includedIn.includes(tier));
}

/**
 * Check if a capability is included in a tier
 */
export function isCapabilityIncluded(capabilityId: string, tier: ProductTier): boolean {
  const capability = CAPABILITIES.find((c) => c.id === capabilityId);
  return capability?.includedIn.includes(tier) ?? false;
}

/**
 * Get the difference between tiers (what Enhanced adds over Core)
 */
export function getEnhancedAddons(): TierCapability[] {
  return CAPABILITIES.filter(
    (c) => c.includedIn.includes('enhanced') && !c.includedIn.includes('core')
  );
}

/**
 * Get shared capabilities between tiers
 */
export function getSharedCapabilities(): TierCapability[] {
  return CAPABILITIES.filter(
    (c) => c.includedIn.includes('core') && c.includedIn.includes('enhanced')
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FACILITY TYPE RECOMMENDATIONS
// ═══════════════════════════════════════════════════════════════════════════

export type FacilityType = 
  | 'dry-van' 
  | 'reefer' 
  | 'mixed-carrier' 
  | 'high-security' 
  | 'long-driveway' 
  | 'short-driveway';

export interface FacilityTypeRecommendation {
  facilityType: FacilityType;
  name: string;
  recommendedTier: ProductTier;
  reason: string;
  keyChallenge: string;
  solutionHook: string;
}

export const FACILITY_RECOMMENDATIONS: FacilityTypeRecommendation[] = [
  {
    facilityType: 'dry-van',
    name: 'Dry Van Facilities',
    recommendedTier: 'core',
    reason: 'Standard gate automation handles most dry van workflows',
    keyChallenge: 'Paper-based check-in creates gate backups',
    solutionHook: 'Through the gate in under 30 seconds',
  },
  {
    facilityType: 'reefer',
    name: 'Reefer Facilities',
    recommendedTier: 'enhanced',
    reason: 'Temperature and seal verification requires machine vision',
    keyChallenge: 'Reefer temp/fuel/seal capture without getting driver out',
    solutionHook: 'Automate documentation, not just gates',
  },
  {
    facilityType: 'mixed-carrier',
    name: 'Mixed Carrier Yards',
    recommendedTier: 'core',
    reason: 'Fast unknown-driver flows handle diverse inbound',
    keyChallenge: 'Unknown drivers until arrival, no pre-registration',
    solutionHook: 'No pre-registration required',
  },
  {
    facilityType: 'high-security',
    name: 'High Security Operations',
    recommendedTier: 'enhanced',
    reason: 'Seal checks and photo capture for compliance',
    keyChallenge: 'CTPAT/TSA compliance with loaded trailer verification',
    solutionHook: 'Compliance without slowdowns',
  },
  {
    facilityType: 'long-driveway',
    name: 'Long Driveway Facilities',
    recommendedTier: 'core',
    reason: 'QR code pull-over zones utilize existing space',
    keyChallenge: 'Pre-staging space available but underutilized',
    solutionHook: 'Use your driveway as your check-in lane',
  },
  {
    facilityType: 'short-driveway',
    name: 'Short Driveway Facilities',
    recommendedTier: 'core',
    reason: 'Super-fast reference # flow prevents backup',
    keyChallenge: 'Gate backup risk with short approach',
    solutionHook: 'Through the gate in under 30 seconds',
  },
];

/**
 * Get recommended tier for a facility type
 */
export function getRecommendedTier(facilityType: FacilityType): ProductTierConfig {
  const rec = FACILITY_RECOMMENDATIONS.find((r) => r.facilityType === facilityType);
  return PRODUCT_TIERS[rec?.recommendedTier ?? 'core'];
}

// ═══════════════════════════════════════════════════════════════════════════
// DEFAULT EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export default {
  tiers: PRODUCT_TIERS,
  capabilities: CAPABILITIES,
  facilityRecommendations: FACILITY_RECOMMENDATIONS,
  getTierCapabilities,
  isCapabilityIncluded,
  getEnhancedAddons,
  getSharedCapabilities,
  getRecommendedTier,
};

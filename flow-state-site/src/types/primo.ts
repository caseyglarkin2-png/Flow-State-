// Primo Singularity Map - Core Data Types
// No emoji characters anywhere

import { LogoVariant } from '@/brand/logos';

// Facility Types
export type FacilityType = 'Plant' | 'DC' | 'CrossDock' | 'Yard' | 'Terminal' | 'Other';

// Facility Status
export type FacilityStatus = 'Flow' | 'Activating' | 'Chaos';

// Facility Counts
export interface FacilityCounts {
  trucks: number;
  trailers: number;
  guardShacks: number;
  gates: number;
  trailerYards: number;
  dropDocks: number;
  inboundLanes: number;
  outboundLanes: number;
}

// Complete Facility Schema
export interface Facility {
  id: string;
  name: string;
  brand: string;
  facilityType: FacilityType;
  status: FacilityStatus;
  address?: string;
  city: string;
  state: string;
  lat: number;
  lon: number;
  counts: FacilityCounts;
  notes?: string;
  updatedAt?: string;
}

// Lane Status
export type LaneStatus = 'Flow' | 'Activating' | 'Chaos';

// Lane Schema
export interface Lane {
  id: string;
  fromFacilityId: string;
  toFacilityId: string;
  volume: number;
  status: LaneStatus;
}

// Filter State
export interface FilterState {
  search: string;
  brands: string[];
  facilityTypes: FacilityType[];
  statuses: FacilityStatus[];
  regions: string[];
}

// Toggle State
export interface ToggleState {
  showLanes: boolean;
  showLabels: boolean;
  showClusters: boolean;
  animationEnabled: boolean;
}

// KPI Totals
export interface KPITotals {
  totalFacilities: number;
  totalTrucks: number;
  totalTrailers: number;
  totalGuardShacks: number;
  totalGates: number;
  totalTrailerYards: number;
  totalDropDocks: number;
  totalInboundLanes: number;
  totalOutboundLanes: number;
  networkVelocity: number;
}

// Theme Colors
export interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  alert: string;
  text: string;
  textSecondary: string;
}

// Theme Typography
export interface ThemeTypography {
  bodyFont: string;
  monoFont: string;
  sizeBase: number;
  sizeSmall: number;
  sizeLarge: number;
  sizeXLarge: number;
}

// Theme Icons
export interface ThemeIcons {
  variant: 'flow-v1' | 'flow-v2' | 'minimal';
}

// Theme Logos
export interface ThemeLogos {
  variant: LogoVariant;
  customSvg?: string;
}

// Complete Theme
export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  icons: ThemeIcons;
  logos: ThemeLogos;
}

// Default Theme
export const defaultTheme: Theme = {
  id: 'event-horizon',
  name: 'Event Horizon',
  colors: {
    background: '#050505',
    surface: '#0F0F0F',
    primary: '#00FFC2',
    alert: '#FF2A00',
    text: '#FFFFFF',
    textSecondary: '#888888',
  },
  typography: {
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono',
    sizeBase: 14,
    sizeSmall: 12,
    sizeLarge: 18,
    sizeXLarge: 24,
  },
  icons: {
    variant: 'flow-v1',
  },
  logos: {
    variant: 'horizontal',
  },
};

// Map View State
export interface MapViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

// Default Map View (centered on US)
export const defaultMapViewState: MapViewState = {
  longitude: -98.5795,
  latitude: 39.8283,
  zoom: 4,
  pitch: 0,
  bearing: 0,
};

// US State Codes for Region Filtering
export const US_REGIONS: Record<string, string[]> = {
  Northeast: ['CT', 'ME', 'MA', 'NH', 'NJ', 'NY', 'PA', 'RI', 'VT'],
  Southeast: ['AL', 'FL', 'GA', 'KY', 'MS', 'NC', 'SC', 'TN', 'VA', 'WV'],
  Midwest: ['IL', 'IN', 'IA', 'KS', 'MI', 'MN', 'MO', 'NE', 'ND', 'OH', 'SD', 'WI'],
  Southwest: ['AZ', 'NM', 'OK', 'TX'],
  West: ['AK', 'CA', 'CO', 'HI', 'ID', 'MT', 'NV', 'OR', 'UT', 'WA', 'WY'],
};

// Get region by state
export function getRegionByState(state: string): string {
  for (const [region, states] of Object.entries(US_REGIONS)) {
    if (states.includes(state)) {
      return region;
    }
  }
  return 'Other';
}

// Status Colors
export const STATUS_COLORS: Record<FacilityStatus, string> = {
  Flow: '#00FFC2',
  Activating: '#FFB800',
  Chaos: '#FF2A00',
};

// Facility Type Labels
export const FACILITY_TYPE_LABELS: Record<FacilityType, string> = {
  Plant: 'Manufacturing Plant',
  DC: 'Distribution Center',
  CrossDock: 'Cross-Dock Facility',
  Yard: 'Trailer Yard',
  Terminal: 'Terminal',
  Other: 'Other Facility',
};

// Brand list (for sample data)
export const PRIMO_BRANDS = [
  'Primo',
  'Poland Spring',
  'Deer Park',
  'Zephyrhills',
  'Ozarka',
  'Ice Mountain',
  'Arrowhead',
  'Pure Life',
  'Crystal Springs',
  'Sparkletts',
] as const;

export type PrimoBrand = (typeof PRIMO_BRANDS)[number];

// CSV Column Mapping
export interface CSVColumnMapping {
  id?: string;
  name: string;
  brand?: string;
  facilityType?: string;
  status?: string;
  address?: string;
  city: string;
  state: string;
  lat: string;
  lon: string;
  trucks?: string;
  trailers?: string;
  guardShacks?: string;
  gates?: string;
  trailerYards?: string;
  dropDocks?: string;
  inboundLanes?: string;
  outboundLanes?: string;
  notes?: string;
  updatedAt?: string;
}

// Data Quality Check Result
export interface DataQualityCheck {
  field: string;
  status: 'valid' | 'missing' | 'invalid';
  message?: string;
}

// Validate a facility and return quality checks
export function validateFacility(facility: Partial<Facility>): DataQualityCheck[] {
  const checks: DataQualityCheck[] = [];
  
  // Required fields
  if (!facility.id) {
    checks.push({ field: 'id', status: 'missing', message: 'Facility ID is required' });
  } else {
    checks.push({ field: 'id', status: 'valid' });
  }
  
  if (!facility.name) {
    checks.push({ field: 'name', status: 'missing', message: 'Facility name is required' });
  } else {
    checks.push({ field: 'name', status: 'valid' });
  }
  
  if (facility.lat === undefined || facility.lat === null || isNaN(facility.lat)) {
    checks.push({ field: 'lat', status: 'invalid', message: 'Valid latitude is required' });
  } else if (facility.lat < -90 || facility.lat > 90) {
    checks.push({ field: 'lat', status: 'invalid', message: 'Latitude must be between -90 and 90' });
  } else {
    checks.push({ field: 'lat', status: 'valid' });
  }
  
  if (facility.lon === undefined || facility.lon === null || isNaN(facility.lon)) {
    checks.push({ field: 'lon', status: 'invalid', message: 'Valid longitude is required' });
  } else if (facility.lon < -180 || facility.lon > 180) {
    checks.push({ field: 'lon', status: 'invalid', message: 'Longitude must be between -180 and 180' });
  } else {
    checks.push({ field: 'lon', status: 'valid' });
  }
  
  if (!facility.city) {
    checks.push({ field: 'city', status: 'missing', message: 'City is required' });
  } else {
    checks.push({ field: 'city', status: 'valid' });
  }
  
  if (!facility.state) {
    checks.push({ field: 'state', status: 'missing', message: 'State is required' });
  } else {
    checks.push({ field: 'state', status: 'valid' });
  }
  
  // Optional but recommended
  if (!facility.brand) {
    checks.push({ field: 'brand', status: 'missing', message: 'Brand is not specified' });
  } else {
    checks.push({ field: 'brand', status: 'valid' });
  }
  
  if (!facility.facilityType) {
    checks.push({ field: 'facilityType', status: 'missing', message: 'Facility type is not specified' });
  } else {
    checks.push({ field: 'facilityType', status: 'valid' });
  }
  
  if (!facility.status) {
    checks.push({ field: 'status', status: 'missing', message: 'Status is not specified' });
  } else {
    checks.push({ field: 'status', status: 'valid' });
  }
  
  // Count fields
  if (!facility.counts) {
    checks.push({ field: 'counts', status: 'missing', message: 'Count data is missing' });
  } else {
    checks.push({ field: 'counts', status: 'valid' });
  }
  
  return checks;
}

// Calculate KPIs from facilities
export function calculateKPIs(facilities: Facility[], lanes: Lane[]): KPITotals {
  const totals: KPITotals = {
    totalFacilities: facilities.length,
    totalTrucks: 0,
    totalTrailers: 0,
    totalGuardShacks: 0,
    totalGates: 0,
    totalTrailerYards: 0,
    totalDropDocks: 0,
    totalInboundLanes: 0,
    totalOutboundLanes: 0,
    networkVelocity: 0,
  };
  
  for (const facility of facilities) {
    totals.totalTrucks += facility.counts.trucks;
    totals.totalTrailers += facility.counts.trailers;
    totals.totalGuardShacks += facility.counts.guardShacks;
    totals.totalGates += facility.counts.gates;
    totals.totalTrailerYards += facility.counts.trailerYards;
    totals.totalDropDocks += facility.counts.dropDocks;
    totals.totalInboundLanes += facility.counts.inboundLanes;
    totals.totalOutboundLanes += facility.counts.outboundLanes;
  }
  
  // Calculate network velocity from lane volumes and status
  const totalVolume = lanes.reduce((sum, lane) => sum + lane.volume, 0);
  const flowingLanes = lanes.filter(l => l.status === 'Flow').length;
  const activatingLanes = lanes.filter(l => l.status === 'Activating').length;
  const flowFactor = lanes.length > 0 
    ? (flowingLanes + activatingLanes * 0.5) / lanes.length 
    : 0;
  totals.networkVelocity = Math.round((totalVolume * flowFactor) / 100);
  
  return totals;
}

// Parse facility type from string
export function parseFacilityType(value: string): FacilityType {
  const normalized = value?.toLowerCase().trim();
  switch (normalized) {
    case 'plant':
    case 'manufacturing':
      return 'Plant';
    case 'dc':
    case 'distribution':
    case 'distribution center':
      return 'DC';
    case 'crossdock':
    case 'cross-dock':
    case 'cross dock':
      return 'CrossDock';
    case 'yard':
    case 'trailer yard':
      return 'Yard';
    case 'terminal':
      return 'Terminal';
    default:
      return 'Other';
  }
}

// Parse status from string
export function parseStatus(value: string): FacilityStatus {
  const normalized = value?.toLowerCase().trim();
  switch (normalized) {
    case 'flow':
    case 'online':
    case 'active':
      return 'Flow';
    case 'activating':
    case 'pending':
    case 'starting':
      return 'Activating';
    case 'chaos':
    case 'offline':
    case 'error':
    case 'issue':
      return 'Chaos';
    default:
      return 'Flow';
  }
}

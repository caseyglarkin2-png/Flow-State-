/**
 * Type definitions for the NetworkMap visualization.
 */

/** Facility archetype for styling and categorization */
export type FacilityArchetype = 'gated' | 'open' | 'cross-dock' | 'manufacturing';

/** A facility node in the network */
export interface Facility {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Facility type for color coding */
  archetype: FacilityArchetype;
  /** X position in SVG coordinates (0-800) */
  x: number;
  /** Y position in SVG coordinates (0-600) */
  y: number;
  /** Optional: city or location label */
  location?: string;
  /** Optional: facility metrics */
  metrics?: {
    movesPerDay?: number;
    dwellTime?: number;
    drivers?: number;
  };
}

/** A connection between two facilities */
export interface Connection {
  /** ID of source facility */
  from: string;
  /** ID of target facility */
  to: string;
  /** Connection strength (1-10) for line weight */
  strength: number;
  /** Optional: connection type for styling */
  type?: 'primary' | 'secondary' | 'planned';
}

/** Props for the main NetworkMap component */
export interface NetworkMapProps {
  /** Array of facilities to render */
  facilities: Facility[];
  /** Optional connections between facilities */
  connections?: Connection[];
  /** Callback when a facility is clicked */
  onFacilityClick?: (facility: Facility) => void;
  /** Callback when a facility is hovered */
  onFacilityHover?: (facility: Facility | null) => void;
  /** Optional: class name for the container */
  className?: string;
  /** Optional: whether to show tooltips on hover */
  showTooltips?: boolean;
}

/** Colors for each facility archetype */
export const ARCHETYPE_COLORS: Record<FacilityArchetype, string> = {
  gated: '#00FFC2',      // neon - secure facilities
  open: '#3B82F6',       // blue - open yards
  'cross-dock': '#F59E0B', // amber - cross-dock operations
  manufacturing: '#8B5CF6', // purple - manufacturing sites
};

/** Human-readable labels for archetypes */
export const ARCHETYPE_LABELS: Record<FacilityArchetype, string> = {
  gated: 'Gated Facility',
  open: 'Open Yard',
  'cross-dock': 'Cross-Dock',
  manufacturing: 'Manufacturing',
};

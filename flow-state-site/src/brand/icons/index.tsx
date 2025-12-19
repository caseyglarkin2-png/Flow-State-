// Flow State Brand Icon System
// Consistent stroke width, rounded joins, no emoji

import React from 'react';

export interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const defaultProps: IconProps = {
  size: 24,
  color: 'currentColor',
  strokeWidth: 1.5,
};

// Plant Icon - Manufacturing facility
export const PlantIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 21h18" />
    <path d="M5 21V7l7-4 7 4v14" />
    <path d="M9 21v-6h6v6" />
    <path d="M9 9h.01" />
    <path d="M15 9h.01" />
    <path d="M9 13h.01" />
    <path d="M15 13h.01" />
  </svg>
);

// DC Icon - Distribution Center
export const DCIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
    <path d="M12 11v6" />
    <path d="M8 11v6" />
    <path d="M16 11v6" />
    <path d="M2 11h20" />
  </svg>
);

// CrossDock Icon - Cross-docking facility
export const CrossDockIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="8" width="18" height="12" rx="1" />
    <path d="M3 14h18" />
    <path d="M7 8V5" />
    <path d="M17 8V5" />
    <path d="M12 8V3" />
    <path d="M6 11h3" />
    <path d="M15 11h3" />
    <path d="M6 17h3" />
    <path d="M15 17h3" />
  </svg>
);

// Yard Icon - Trailer yard
export const YardIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="12" width="20" height="8" rx="1" />
    <path d="M2 16h20" />
    <path d="M6 12V8" />
    <path d="M10 12V8" />
    <path d="M14 12V8" />
    <path d="M18 12V8" />
    <rect x="4" y="4" width="16" height="4" rx="1" />
  </svg>
);

// Terminal Icon - Terminal facility
export const TerminalIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 20h20" />
    <path d="M4 20V8l8-5 8 5v12" />
    <path d="M9 20v-4h6v4" />
    <circle cx="12" cy="10" r="2" />
  </svg>
);

// Gate Icon - Entry/exit gate
export const GateIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 3v18" />
    <path d="M20 3v18" />
    <path d="M4 6h16" />
    <path d="M4 12h6" />
    <path d="M14 12h6" />
    <path d="M4 9h4" />
    <path d="M16 9h4" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

// GuardShack Icon - Security checkpoint
export const GuardShackIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 21h18" />
    <rect x="6" y="10" width="12" height="11" rx="1" />
    <path d="M6 10l6-6 6 6" />
    <rect x="10" y="14" width="4" height="3" />
    <circle cx="12" cy="7" r="1" />
  </svg>
);

// TrailerYard Icon - Trailer parking area
export const TrailerYardIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="6" width="8" height="6" rx="1" />
    <rect x="14" y="6" width="8" height="6" rx="1" />
    <rect x="2" y="14" width="8" height="6" rx="1" />
    <rect x="14" y="14" width="8" height="6" rx="1" />
    <path d="M10 9h4" />
    <path d="M10 17h4" />
  </svg>
);

// DropDock Icon - Loading/unloading dock
export const DropDockIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="18" height="14" rx="1" />
    <path d="M7 17v4" />
    <path d="M17 17v4" />
    <path d="M7 10h4" />
    <path d="M13 10h4" />
    <path d="M3 7h18" />
    <path d="M12 7v10" />
  </svg>
);

// InboundLane Icon - Incoming traffic lane
export const InboundLaneIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 19V5" />
    <path d="M5 12l7-7 7 7" />
    <path d="M5 19h14" />
    <rect x="3" y="19" width="18" height="2" rx="0.5" />
  </svg>
);

// OutboundLane Icon - Outgoing traffic lane
export const OutboundLaneIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 5v14" />
    <path d="M5 12l7 7 7-7" />
    <path d="M5 3h14" />
    <rect x="3" y="3" width="18" height="2" rx="0.5" />
  </svg>
);

// Truck Icon - Delivery truck
export const TruckIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M1 14h12V6H1z" />
    <path d="M13 14h4l3 3v3h-7z" />
    <circle cx="5" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
    <path d="M7 18h8" />
    <path d="M3 18H1v-4" />
    <path d="M20 18h1v-1" />
  </svg>
);

// Trailer Icon - Cargo trailer
export const TrailerIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="6" width="16" height="10" rx="1" />
    <path d="M18 12h4" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="14" cy="18" r="2" />
    <path d="M8 18h4" />
    <path d="M2 16h2" />
    <path d="M16 16h2" />
  </svg>
);

// Filter Icon - Filter/sort
export const FilterIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
  </svg>
);

// Search Icon - Search
export const SearchIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

// Settings Icon - Configuration
export const SettingsIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Close Icon - Close/dismiss
export const CloseIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

// ChevronDown Icon - Dropdown indicator
export const ChevronDownIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

// ChevronRight Icon - Navigation indicator
export const ChevronRightIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

// Upload Icon - File upload
export const UploadIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

// Download Icon - File download
export const DownloadIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// Map Icon - Map view
export const MapIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);

// Layers Icon - Map layers
export const LayersIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

// Network Icon - Network view
export const NetworkIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="5" r="3" />
    <circle cx="5" cy="19" r="3" />
    <circle cx="19" cy="19" r="3" />
    <path d="M12 8v3" />
    <path d="M8 17l3-6" />
    <path d="M16 17l-3-6" />
  </svg>
);

// Status Icons
export const FlowStatusIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = '#00FFC2',
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export const ActivatingStatusIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = '#FFB800',
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const ChaosStatusIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = '#FF2A00',
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// Palette Icon - Theme/colors
export const PaletteIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="13.5" cy="6.5" r="2" />
    <circle cx="17.5" cy="10.5" r="2" />
    <circle cx="8.5" cy="7.5" r="2" />
    <circle cx="6.5" cy="12.5" r="2" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

// Typography Icon
export const TypographyIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="4 7 4 4 20 4 20 7" />
    <line x1="9" y1="20" x2="15" y2="20" />
    <line x1="12" y1="4" x2="12" y2="20" />
  </svg>
);

// Image Icon - Logo/image
export const ImageIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

// Grid Icon - Icon grid
export const GridIcon: React.FC<IconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  strokeWidth = defaultProps.strokeWidth,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

// Export all icons with their names for the icon picker
export const iconMap = {
  Plant: PlantIcon,
  DC: DCIcon,
  CrossDock: CrossDockIcon,
  Yard: YardIcon,
  Terminal: TerminalIcon,
  Gate: GateIcon,
  GuardShack: GuardShackIcon,
  TrailerYard: TrailerYardIcon,
  DropDock: DropDockIcon,
  InboundLane: InboundLaneIcon,
  OutboundLane: OutboundLaneIcon,
  Truck: TruckIcon,
  Trailer: TrailerIcon,
  Filter: FilterIcon,
  Search: SearchIcon,
  Settings: SettingsIcon,
  Close: CloseIcon,
  ChevronDown: ChevronDownIcon,
  ChevronRight: ChevronRightIcon,
  Upload: UploadIcon,
  Download: DownloadIcon,
  Map: MapIcon,
  Layers: LayersIcon,
  Network: NetworkIcon,
  FlowStatus: FlowStatusIcon,
  ActivatingStatus: ActivatingStatusIcon,
  ChaosStatus: ChaosStatusIcon,
  Palette: PaletteIcon,
  Typography: TypographyIcon,
  Image: ImageIcon,
  Grid: GridIcon,
} as const;

export type IconName = keyof typeof iconMap;

// Get icon by facility type
export function getFacilityIcon(type: string): React.FC<IconProps> {
  switch (type) {
    case 'Plant':
      return PlantIcon;
    case 'DC':
      return DCIcon;
    case 'CrossDock':
      return CrossDockIcon;
    case 'Yard':
      return YardIcon;
    case 'Terminal':
      return TerminalIcon;
    default:
      return DCIcon;
  }
}

// Get status icon
export function getStatusIcon(status: string): React.FC<IconProps> {
  switch (status) {
    case 'Flow':
      return FlowStatusIcon;
    case 'Activating':
      return ActivatingStatusIcon;
    case 'Chaos':
      return ChaosStatusIcon;
    default:
      return FlowStatusIcon;
  }
}

'use client';

import React from 'react';

// YardFlow by FreightRoll Brand Icon System
// Geometric, minimal, logistics-tech aesthetic
// No emoji derivatives - purely custom SVG paths

export interface IconProps {
  size?: number;
  className?: string;
}

const defaults = { size: 24 };

// ═══════════════════════════════════════════════════════════════
// DIRECTIONAL / ACTION ICONS
// ═══════════════════════════════════════════════════════════════

// Flow Arrow - Represents forward momentum, progression
export const FlowArrow: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M4 12h14M13 6l6 6-6 6" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle cx="4" cy="12" r="2" fill="currentColor" opacity="0.4" />
  </svg>
);

// Pulse - System heartbeat, live status
export const Pulse: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M2 12h4l3-8 4 16 3-8h6" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Confirm - Verified, checked, approved
export const Confirm: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    <path 
      d="M7 12.5l3 3 7-7" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Dismiss - Cancel, close, remove
export const Dismiss: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    <path 
      d="M8 8l8 8M16 8l-8 8" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// ENERGY / POWER ICONS
// ═══════════════════════════════════════════════════════════════

// Velocity - Speed, acceleration, fast
export const Velocity: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M13 2L4 14h7l-2 8 11-12h-7l2-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 2L4 14h7l-2 8 11-12h-7l2-8z" fill="currentColor" opacity="0.15" />
  </svg>
);

// Ignite - Launch, start, begin
export const Ignite: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      opacity="0.5"
    />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// DATA / ANALYTICS ICONS
// ═══════════════════════════════════════════════════════════════

// Metrics - Charts, analytics, KPIs
export const Metrics: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    <path d="M7 17v-4M12 17V8M17 17v-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Timeline - Schedule, calendar, dates
export const Timeline: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="7" y="12" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.5" />
    <rect x="14" y="12" width="3" height="3" rx="0.5" fill="currentColor" />
  </svg>
);

// Scope - Search, find, discover
export const Scope: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15 15l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1" opacity="0.4" />
  </svg>
);

// Config - Settings, adjust, tune
export const Config: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path 
      d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// LOCATION / NETWORK ICONS
// ═══════════════════════════════════════════════════════════════

// Nexus - Global network, connected world
export const Nexus: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="9" ry="4" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M3 12h18" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

// Beacon - Pin, marker, location
export const Beacon: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="9" r="1" fill="currentColor" />
  </svg>
);

// Orbital - Satellite, monitoring, overview
export const Orbital: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(45 12 12)" />
    <circle cx="18" cy="6" r="2" fill="currentColor" />
  </svg>
);

// Territory - Map, region, area
export const Territory: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 9h18M9 3v18M15 9v12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <circle cx="6" cy="6" r="1.5" fill="currentColor" />
    <circle cx="12" cy="15" r="1.5" fill="currentColor" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// SECURITY / VERIFICATION ICONS
// ═══════════════════════════════════════════════════════════════

// Shield - Protection, security, guard
export const Shield: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M12 2l8 4v6c0 5.5-3.84 10.74-8 12-4.16-1.26-8-6.5-8-12V6l8-4z" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path d="M12 2l8 4v6c0 5.5-3.84 10.74-8 12-4.16-1.26-8-6.5-8-12V6l8-4z" fill="currentColor" opacity="0.1" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Caution - Warning, alert, attention
export const Caution: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M12 2L2 20h20L12 2z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinejoin="round"
    />
    <path d="M12 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="16" r="1" fill="currentColor" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// INTELLIGENCE / AI ICONS
// ═══════════════════════════════════════════════════════════════

// Cortex - Brain, AI, intelligence
export const Cortex: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M12 4a8 8 0 0 0-8 8c0 2.5 1.5 4.5 3 6l1 2h8l1-2c1.5-1.5 3-3.5 3-6a8 8 0 0 0-8-8z" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path d="M9 20v2M15 20v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="9" cy="10" r="1" fill="currentColor" />
    <circle cx="15" cy="10" r="1" fill="currentColor" />
    <path d="M9 14h6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
  </svg>
);

// Agent - Bot, automation, operator
export const Agent: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="9" cy="10" r="1.5" fill="currentColor" />
    <circle cx="15" cy="10" r="1.5" fill="currentColor" />
    <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2 8h2M20 8h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// Crosshair - Target, focus, precision
export const Crosshair: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// LOGISTICS / OPERATIONS ICONS
// ═══════════════════════════════════════════════════════════════

// Haul - Truck, transport, delivery
export const Haul: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M2 12h14V6H2v6zM16 12h4l2 4v2h-6v-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 18h8M2 18h2M20 18h2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

// Cargo - Package, shipment, goods
export const Cargo: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M12 2L3 7v10l9 5 9-5V7l-9-5z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinejoin="round"
    />
    <path d="M12 22V12M12 12L3 7M12 12l9-5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7.5 4.5l9 5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
  </svg>
);

// Plant - Manufacturing, factory, production
export const Plant: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M2 20h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 20V10l6-4v14M10 20V6l6-4v18M16 20V2l4 2v16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M6 12h2M12 8h2M18 6h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// Cart - Shopping, retail, commerce
export const Cart: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 4h2l3 12h10l2-8H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="20" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="18" cy="20" r="1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

// Anchor - Port, maritime, dock
export const Anchor: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 8v14M5 18c0-4 3-7 7-7s7 3 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 11h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Cycle - Refresh, sync, update
export const Cycle: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M4 12a8 8 0 0 1 14.5-4.5M20 12a8 8 0 0 1-14.5 4.5" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <path d="M20 4v4h-4M4 20v-4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Genesis - Sparkle, new, innovation
export const Genesis: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2v6M12 16v6M2 12h6M16 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M5.6 5.6l3.5 3.5M14.9 14.9l3.5 3.5M5.6 18.4l3.5-3.5M14.9 9.1l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// Construct - Build, under development
export const Construct: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M2 20l4-4M6 20l4-4M10 20l4-4M14 20l4-4M18 20l4-4" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <path d="M14 6l4 4-8 8-4-4 8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M18 2l4 4-2 2-4-4 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// COMMUNICATION / DOCUMENT ICONS
// ═══════════════════════════════════════════════════════════════

// Signal - Radio, broadcast, communication
export const Signal: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="18" r="2" fill="currentColor" />
    <path d="M8.5 14.5a5 5 0 0 1 7 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 11a9 9 0 0 1 14 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2 7.5a13 13 0 0 1 20 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// Comm - Phone, contact, call
export const Comm: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinejoin="round"
    />
  </svg>
);

// Manifest - Document, file, record
export const Manifest: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// Waypoint - Direction, navigation
export const Waypoint: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2v8M5 12l7 10 7-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="8" r="1" fill="currentColor" />
  </svg>
);

// Device - Mobile, phone, tablet
export const Device: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="6" y="2" width="12" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 5h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <circle cx="12" cy="18" r="1" fill="currentColor" />
  </svg>
);

// Prism - Diamond, premium, value
export const Prism: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 3h12l4 6-10 13L2 9l4-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M2 9h20M12 22l4-13M12 22l-4-13" stroke="currentColor" strokeWidth="1" opacity="0.4" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// ARCHETYPES - Solution category icons
// ═══════════════════════════════════════════════════════════════

// DryVan - Dry van & reefer operations
export const DryVan: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="8" width="14" height="8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M16 8h3l3 4v4h-6V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 18h8M4 10h8M4 12h6" stroke="currentColor" strokeWidth="1" opacity="0.4" />
  </svg>
);

// Intermodal - Container & rail operations
export const Intermodal: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="6" width="18" height="10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M7 6v10M12 6v10M17 6v10" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <path d="M3 19h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="6" cy="19" r="1.5" fill="currentColor" />
    <circle cx="12" cy="19" r="1.5" fill="currentColor" />
    <circle cx="18" cy="19" r="1.5" fill="currentColor" />
  </svg>
);

// Flatbed - Flatbed & industrial heavy haul
export const Flatbed: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M2 12h16l2-4h2v8h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="4" y="6" width="8" height="6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 18h8" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

// Tanker - Tanker & hazmat operations
export const Tanker: React.FC<IconProps> = ({ size = defaults.size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <ellipse cx="11" cy="11" rx="9" ry="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 11v2c0 2.76 4.03 5 9 5s9-2.24 9-5v-2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="6" cy="19" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="16" cy="19" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 19h6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 6v10" stroke="currentColor" strokeWidth="1" opacity="0.4" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════
// EXPORT ALL
// ═══════════════════════════════════════════════════════════════

const FlowIcons = {
  // Directional
  FlowArrow,
  Pulse,
  Confirm,
  Dismiss,
  // Energy
  Velocity,
  Ignite,
  // Data
  Metrics,
  Timeline,
  Scope,
  Config,
  // Location
  Nexus,
  Beacon,
  Orbital,
  Territory,
  // Security
  Shield,
  Caution,
  // Intelligence
  Cortex,
  Agent,
  Crosshair,
  // Logistics
  Haul,
  Cargo,
  Plant,
  Cart,
  Anchor,
  Cycle,
  Genesis,
  Construct,
  // Communication
  Signal,
  Comm,
  Manifest,
  Waypoint,
  Device,
  Prism,
  // Archetypes
  DryVan,
  Intermodal,
  Flatbed,
  Tanker,
};

export default FlowIcons;

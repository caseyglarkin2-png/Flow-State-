// /lib/modules.ts
// Single source of truth for module definitions, routes, and canonical icons

import React from 'react';
import {
  Shield,
  Signal,
  Manifest,
  Metrics,
  Beacon,
  Plant,
  Velocity,
  Cycle,
  Cargo,
  Haul,
  Crosshair,
} from '@/components/icons/FlowIcons';

// ═══════════════════════════════════════════════════════════════
// MODULE DEFINITIONS
// ═══════════════════════════════════════════════════════════════

export type ModuleId = 
  | 'digital-guard'
  | 'digital-comms'
  | 'digital-bol'
  | 'digital-yms'
  | 'evidence-vault';

export interface ModuleDefinition {
  id: ModuleId;
  name: string;
  shortName: string;
  route: string;
  icon: React.FC<{ size?: number; className?: string }>;
  description: string;
  tagline: string;
}

export const MODULES: Record<ModuleId, ModuleDefinition> = {
  'digital-guard': {
    id: 'digital-guard',
    name: 'Digital Guard',
    shortName: 'Guard',
    route: '/product#digital-guard',
    icon: Shield,
    description: 'Automated ID capture and carrier screening at every gate event.',
    tagline: 'Verify every carrier before they enter.',
  },
  'digital-comms': {
    id: 'digital-comms',
    name: 'Digital Comms',
    shortName: 'Comms',
    route: '/product#digital-comms',
    icon: Signal,
    description: 'Real-time alerts and escalation workflows when issues are flagged.',
    tagline: 'Lane-level driver messaging with read receipts.',
  },
  'digital-bol': {
    id: 'digital-bol',
    name: 'Digital BOL',
    shortName: 'BOL',
    route: '/product#digital-bol',
    icon: Manifest,
    description: 'Touchless documentation with forensic-grade timestamps.',
    tagline: 'Photo proof of load condition. Detention disputes die young.',
  },
  'digital-yms': {
    id: 'digital-yms',
    name: 'Digital YMS',
    shortName: 'YMS',
    route: '/product#digital-yms',
    icon: Metrics,
    description: 'Real-time yard visibility. Dwell alerts. Network intelligence.',
    tagline: 'One place to see, search, and prove what happened.',
  },
  'evidence-vault': {
    id: 'evidence-vault',
    name: 'Evidence Vault',
    shortName: 'Vault',
    route: '/resources/procurement',
    icon: Manifest,
    description: 'Immutable audit trails for compliance and investigation.',
    tagline: 'Procurement-ready proof and compliance documentation.',
  },
};

// Helper to get module by display name (for mapping existing content)
export function getModuleByName(name: string): ModuleDefinition | undefined {
  const normalized = name.toLowerCase().replace(/\s+/g, '-');
  
  // Direct match
  if (normalized in MODULES) {
    return MODULES[normalized as ModuleId];
  }
  
  // Search by name
  return Object.values(MODULES).find(
    m => m.name.toLowerCase() === name.toLowerCase() ||
         m.shortName.toLowerCase() === name.toLowerCase()
  );
}

// ═══════════════════════════════════════════════════════════════
// ARCHETYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════

export type ArchetypeId = 
  | 'gated-guarded'
  | 'non-gated'
  | 'backup-sensitive'
  | 'scale-heavy'
  | 'cross-dock'
  | 'manufacturing';

export interface ArchetypeDefinition {
  id: ArchetypeId;
  title: string;
  kicker: string;
  icon: React.FC<{ size?: number; className?: string }>;
  description: string;
  route: string;
}

export const ARCHETYPES: Record<ArchetypeId, ArchetypeDefinition> = {
  'gated-guarded': {
    id: 'gated-guarded',
    title: 'Gated/Guarded',
    kicker: 'High Security',
    icon: Shield,
    description: 'Perimeter fencing, manned gate, strict access control.',
    route: '/implementation#gated-guarded',
  },
  'non-gated': {
    id: 'non-gated',
    title: 'Non-Gated',
    kicker: 'Open Access',
    icon: Beacon,
    description: 'No physical gate, open yard, carrier self-service.',
    route: '/implementation#non-gated',
  },
  'backup-sensitive': {
    id: 'backup-sensitive',
    title: 'Backup-Sensitive',
    kicker: 'Detention Risk',
    icon: Crosshair,
    description: 'High detention exposure, frequent carrier disputes.',
    route: '/implementation#backup-sensitive',
  },
  'scale-heavy': {
    id: 'scale-heavy',
    title: 'Scale-Heavy',
    kicker: 'High Throughput',
    icon: Velocity,
    description: '100+ daily moves, complex dock scheduling, tight turn windows.',
    route: '/implementation#scale-heavy',
  },
  'cross-dock': {
    id: 'cross-dock',
    title: 'Cross-Dock',
    kicker: 'Fast Turns',
    icon: Cycle,
    description: 'Under 2-hour dwell target, minimal staging, tight coordination.',
    route: '/implementation#cross-dock',
  },
  'manufacturing': {
    id: 'manufacturing',
    title: 'Manufacturing',
    kicker: 'Complex Workflows',
    icon: Plant,
    description: 'Just-in-time delivery, ERP integration, production scheduling dependencies.',
    route: '/implementation#manufacturing',
  },
};

// ═══════════════════════════════════════════════════════════════
// ICON SIZE CONSTANTS
// ═══════════════════════════════════════════════════════════════

export const ICON_SIZES = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

// ═══════════════════════════════════════════════════════════════
// HELPER COMPONENTS
// ═══════════════════════════════════════════════════════════════

// Get canonical icon for any module or archetype by name
export function getCanonicalIcon(name: string): React.FC<{ size?: number; className?: string }> {
  const module = getModuleByName(name);
  if (module) return module.icon;
  
  const archetype = Object.values(ARCHETYPES).find(
    a => a.title.toLowerCase() === name.toLowerCase()
  );
  if (archetype) return archetype.icon;
  
  // Default fallback
  return Cargo;
}

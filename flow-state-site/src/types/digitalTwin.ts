// Digital Twin Types - Yard Asset Agent System
// Agent-based architecture for real-time yard operations simulation

import { Facility, FacilityStatus } from './primo';

// =============================================================================
// YARD ASSET TYPES
// =============================================================================

export type YardAssetType = 
  | 'trailer'
  | 'truck'
  | 'loading_dock'
  | 'shipper_dock'
  | 'gate'
  | 'guard_shack'
  | 'trailer_yard_zone'
  | 'parking_spot'
  | 'fuel_station'
  | 'scale'
  | 'wash_bay';

export type AssetStatus = 
  | 'active'
  | 'idle'
  | 'maintenance'
  | 'offline'
  | 'loading'
  | 'unloading'
  | 'in_transit'
  | 'queued'
  | 'reserved';

export type MovementDirection = 'inbound' | 'outbound' | 'internal' | 'stationary';

// =============================================================================
// YARD ASSET - Individual physical asset in the yard
// =============================================================================

export interface YardAsset {
  id: string;
  facilityId: string;
  type: YardAssetType;
  name: string;
  status: AssetStatus;
  
  // Position within facility (relative coords 0-100)
  position: {
    x: number;
    y: number;
    zone?: string;
  };
  
  // For mobile assets (trucks, trailers)
  movement?: {
    direction: MovementDirection;
    speed: number; // 0-100
    destination?: string;
    eta?: Date;
  };
  
  // Asset-specific metadata
  metadata: {
    licensePlate?: string;
    carrier?: string;
    loadType?: 'empty' | 'loaded' | 'partial';
    contents?: string;
    sealNumber?: string;
    temperature?: number;
    lastInspection?: Date;
    capacity?: number;
    currentLoad?: number;
  };
  
  // Timestamps
  arrivedAt?: Date;
  departureScheduled?: Date;
  lastUpdated: Date;
}

// =============================================================================
// ASSET AGENT - AI agent managing a specific asset or asset group
// =============================================================================

export type AgentRole = 
  | 'trailer_tracker'
  | 'truck_dispatcher'
  | 'dock_coordinator'
  | 'gate_controller'
  | 'yard_optimizer'
  | 'flow_analyzer'
  | 'maintenance_predictor'
  | 'load_balancer';

export type AgentStatus = 'online' | 'processing' | 'alerting' | 'offline' | 'learning';

export interface AgentTask {
  id: string;
  type: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  description: string;
  startedAt?: Date;
  completedAt?: Date;
}

export interface AgentInsight {
  id: string;
  type: 'optimization' | 'alert' | 'prediction' | 'recommendation';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  affectedAssets: string[];
  suggestedAction?: string;
  confidence: number; // 0-100
  timestamp: Date;
}

export interface AssetAgent {
  id: string;
  facilityId: string;
  role: AgentRole;
  name: string;
  status: AgentStatus;
  
  // What this agent monitors
  monitoredAssetTypes: YardAssetType[];
  monitoredAssetIds: string[];
  
  // Current state
  currentTasks: AgentTask[];
  recentInsights: AgentInsight[];
  
  // Performance metrics
  metrics: {
    assetsMonitored: number;
    tasksCompleted24h: number;
    alertsRaised24h: number;
    optimizationsSuggested24h: number;
    accuracy: number; // 0-100
  };
  
  // Configuration
  config: {
    alertThresholds: Record<string, number>;
    updateFrequency: number; // ms
    autoOptimize: boolean;
  };
  
  lastActivity: Date;
}

// =============================================================================
// DIGITAL TWIN - Complete virtual representation of a facility
// =============================================================================

export interface DigitalTwinZone {
  id: string;
  name: string;
  type: 'inbound' | 'outbound' | 'storage' | 'processing' | 'parking' | 'restricted';
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  capacity: number;
  currentOccupancy: number;
  assignedAgentId?: string;
}

export interface DigitalTwinMetrics {
  // Real-time flow metrics
  trucksInbound: number;
  trucksOutbound: number;
  activeLoadingDocks: number;
  availableLoadingDocks: number;
  trailersInYard: number;
  trailerCapacity: number;
  
  // Performance metrics
  averageDwellTime: number; // minutes
  gateProcessingTime: number; // minutes
  dockTurnaroundTime: number; // minutes
  yardUtilization: number; // percentage
  
  // Flow state
  flowScore: number; // 0-100
  bottlenecks: string[];
  
  // Predictions
  predictedCongestion: number; // 0-100
  predictedPeakTime: Date;
}

export interface DigitalTwin {
  id: string;
  facilityId: string;
  facility: Facility;
  
  // Version control
  version: string;
  createdAt: Date;
  lastSyncedAt: Date;
  
  // Yard layout
  zones: DigitalTwinZone[];
  yardLayout: {
    width: number;
    height: number;
    orientation: number; // degrees
  };
  
  // Assets
  assets: YardAsset[];
  
  // Agents
  agents: AssetAgent[];
  
  // Real-time metrics
  metrics: DigitalTwinMetrics;
  
  // Historical data (last 24h snapshots)
  history: {
    timestamp: Date;
    metrics: DigitalTwinMetrics;
  }[];
  
  // Twin status
  status: 'synced' | 'syncing' | 'stale' | 'generating' | 'error';
  syncInterval: number; // ms
}

// =============================================================================
// DIGITAL TWIN GENERATION
// =============================================================================

export interface TwinGenerationConfig {
  facilityId: string;
  
  // Asset generation settings
  generateAssets: {
    trailers: boolean;
    trucks: boolean;
    docks: boolean;
    gates: boolean;
  };
  
  // Agent deployment
  deployAgents: AgentRole[];
  
  // Simulation settings
  simulateRealTime: boolean;
  updateFrequency: number;
  
  // Data source
  dataSource: 'sample' | 'live' | 'historical';
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export const ASSET_TYPE_LABELS: Record<YardAssetType, string> = {
  trailer: 'Trailer',
  truck: 'Truck',
  loading_dock: 'Loading Dock',
  shipper_dock: 'Shipper Dock',
  gate: 'Gate',
  guard_shack: 'Guard Shack',
  trailer_yard_zone: 'Trailer Yard',
  parking_spot: 'Parking Spot',
  fuel_station: 'Fuel Station',
  scale: 'Scale',
  wash_bay: 'Wash Bay',
};

export const ASSET_STATUS_COLORS: Record<AssetStatus, string> = {
  active: '#00B4FF',
  idle: '#888888',
  maintenance: '#FFB800',
  offline: '#FF2A00',
  loading: '#00FF88',
  unloading: '#00FF88',
  in_transit: '#00B4FF',
  queued: '#FFB800',
  reserved: '#9B59B6',
};

export const AGENT_ROLE_LABELS: Record<AgentRole, string> = {
  trailer_tracker: 'Trailer Tracker',
  truck_dispatcher: 'Truck Dispatcher',
  dock_coordinator: 'Dock Coordinator',
  gate_controller: 'Gate Controller',
  yard_optimizer: 'Yard Optimizer',
  flow_analyzer: 'Flow Analyzer',
  maintenance_predictor: 'Maintenance Predictor',
  load_balancer: 'Load Balancer',
};

export const AGENT_STATUS_COLORS: Record<AgentStatus, string> = {
  online: '#00B4FF',
  processing: '#00FF88',
  alerting: '#FFB800',
  offline: '#FF2A00',
  learning: '#9B59B6',
};

// Generate a unique ID
export function generateAssetId(type: YardAssetType, facilityId: string): string {
  const prefix = type.substring(0, 3).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${facilityId}-${random}`;
}

// Generate a unique agent ID
export function generateAgentId(role: AgentRole, facilityId: string): string {
  const prefix = role.split('_').map(w => w[0]).join('').toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AGT-${prefix}-${facilityId}-${random}`;
}

// Calculate flow score based on metrics
export function calculateFlowScore(metrics: DigitalTwinMetrics): number {
  const utilizationScore = Math.min(100, metrics.yardUtilization);
  const dockAvailability = (metrics.availableLoadingDocks / Math.max(1, metrics.activeLoadingDocks + metrics.availableLoadingDocks)) * 100;
  const dwellPenalty = Math.max(0, (metrics.averageDwellTime - 60) / 2); // Penalize dwell > 60min
  const congestionPenalty = metrics.predictedCongestion * 0.3;
  
  const score = Math.max(0, Math.min(100, 
    (utilizationScore * 0.3) + 
    (dockAvailability * 0.4) - 
    dwellPenalty - 
    congestionPenalty
  ));
  
  return Math.round(score);
}

// Get status from flow score
export function getStatusFromFlowScore(score: number): FacilityStatus {
  if (score >= 70) return 'Flow';
  if (score >= 40) return 'Activating';
  return 'Chaos';
}

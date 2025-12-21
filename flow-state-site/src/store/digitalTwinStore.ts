// Digital Twin Store - Zustand state management for yard asset agents
// Real-time simulation and agent orchestration

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  YardAsset,
  YardAssetType,
  AssetStatus,
  AssetAgent,
  AgentRole,
  AgentStatus,
  AgentTask,
  AgentInsight,
  DigitalTwin,
  DigitalTwinZone,
  DigitalTwinMetrics,
  TwinGenerationConfig,
  generateAssetId,
  generateAgentId,
  calculateFlowScore,
  ASSET_TYPE_LABELS,
  AGENT_ROLE_LABELS,
} from '@/types/digitalTwin';
import { Facility } from '@/types/primo';

// Sample asset generation helpers
const CARRIERS = ['Swift', 'JB Hunt', 'Werner', 'Schneider', 'CR England', 'KLLM', 'Prime Inc', 'Heartland'];
const LOAD_TYPES = ['Palletized Water', 'Bulk Cases', 'Mixed SKU', 'Returns', 'Empty Bottles'];

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate sample assets for a facility
function generateSampleAssets(facility: Facility): YardAsset[] {
  const assets: YardAsset[] = [];
  const now = new Date();
  
  // Generate trailers
  for (let i = 0; i < facility.counts.trailers; i++) {
    const status: AssetStatus = randomPick(['active', 'idle', 'loading', 'unloading', 'queued']);
    assets.push({
      id: generateAssetId('trailer', facility.id),
      facilityId: facility.id,
      type: 'trailer',
      name: `TRL-${String(i + 1).padStart(4, '0')}`,
      status,
      position: {
        x: randomInt(10, 90),
        y: randomInt(30, 90),
        zone: `Zone ${String.fromCharCode(65 + randomInt(0, 4))}`,
      },
      metadata: {
        carrier: randomPick(CARRIERS),
        loadType: randomPick(['empty', 'loaded', 'partial']),
        contents: randomPick(LOAD_TYPES),
        sealNumber: `SEAL${randomInt(100000, 999999)}`,
        capacity: 100,
        currentLoad: randomInt(0, 100),
      },
      arrivedAt: new Date(now.getTime() - randomInt(0, 24 * 60 * 60 * 1000)),
      lastUpdated: now,
    });
  }
  
  // Generate trucks (a subset actively moving)
  const activeTrucks = Math.min(facility.counts.trucks, randomInt(5, 20));
  for (let i = 0; i < activeTrucks; i++) {
    const direction = randomPick(['inbound', 'outbound', 'internal']) as 'inbound' | 'outbound' | 'internal';
    assets.push({
      id: generateAssetId('truck', facility.id),
      facilityId: facility.id,
      type: 'truck',
      name: `TRK-${String(i + 1).padStart(3, '0')}`,
      status: randomPick(['active', 'idle', 'in_transit']),
      position: {
        x: randomInt(5, 95),
        y: randomInt(5, 95),
      },
      movement: {
        direction,
        speed: randomInt(0, 15),
        destination: direction === 'inbound' ? 'Gate A' : direction === 'outbound' ? 'Exit' : 'Dock 5',
      },
      metadata: {
        licensePlate: `${randomPick(['CA', 'TX', 'FL', 'PA', 'ME', 'MI', 'IN', 'CO'])} ${randomInt(100, 999)}-${randomPick(['ABC', 'XYZ', 'QRS', 'LMN'])}`,
        carrier: randomPick(CARRIERS),
      },
      arrivedAt: new Date(now.getTime() - randomInt(0, 4 * 60 * 60 * 1000)),
      lastUpdated: now,
    });
  }
  
  // Generate loading docks
  for (let i = 0; i < facility.counts.dropDocks; i++) {
    assets.push({
      id: generateAssetId('loading_dock', facility.id),
      facilityId: facility.id,
      type: 'loading_dock',
      name: `Dock ${i + 1}`,
      status: randomPick(['active', 'idle', 'loading', 'unloading', 'maintenance']),
      position: {
        x: 85,
        y: 10 + (i * (80 / Math.max(1, facility.counts.dropDocks))),
      },
      metadata: {},
      lastUpdated: now,
    });
  }
  
  // Generate gates
  for (let i = 0; i < facility.counts.gates; i++) {
    assets.push({
      id: generateAssetId('gate', facility.id),
      facilityId: facility.id,
      type: 'gate',
      name: `Gate ${String.fromCharCode(65 + i)}`,
      status: randomPick(['active', 'idle', 'queued']),
      position: {
        x: i % 2 === 0 ? 2 : 98,
        y: 10 + (i * 20),
      },
      metadata: {},
      lastUpdated: now,
    });
  }
  
  // Generate guard shacks
  for (let i = 0; i < facility.counts.guardShacks; i++) {
    assets.push({
      id: generateAssetId('guard_shack', facility.id),
      facilityId: facility.id,
      type: 'guard_shack',
      name: `Security ${i + 1}`,
      status: 'active',
      position: {
        x: i === 0 ? 5 : 95,
        y: 5,
      },
      metadata: {},
      lastUpdated: now,
    });
  }
  
  return assets;
}

// Generate agents for a facility
function generateAgents(facility: Facility): AssetAgent[] {
  const agents: AssetAgent[] = [];
  const now = new Date();
  
  const agentConfigs: { role: AgentRole; monitoredTypes: YardAssetType[] }[] = [
    { role: 'trailer_tracker', monitoredTypes: ['trailer', 'trailer_yard_zone'] },
    { role: 'truck_dispatcher', monitoredTypes: ['truck'] },
    { role: 'dock_coordinator', monitoredTypes: ['loading_dock', 'shipper_dock'] },
    { role: 'gate_controller', monitoredTypes: ['gate', 'guard_shack'] },
    { role: 'yard_optimizer', monitoredTypes: ['trailer', 'truck', 'loading_dock'] },
    { role: 'flow_analyzer', monitoredTypes: ['trailer', 'truck', 'loading_dock', 'gate'] },
  ];
  
  for (const config of agentConfigs) {
    const agent: AssetAgent = {
      id: generateAgentId(config.role, facility.id),
      facilityId: facility.id,
      role: config.role,
      name: `${AGENT_ROLE_LABELS[config.role]} - ${facility.name}`,
      status: randomPick(['online', 'processing']) as AgentStatus,
      monitoredAssetTypes: config.monitoredTypes,
      monitoredAssetIds: [],
      currentTasks: [],
      recentInsights: [],
      metrics: {
        assetsMonitored: randomInt(10, 50),
        tasksCompleted24h: randomInt(50, 200),
        alertsRaised24h: randomInt(0, 10),
        optimizationsSuggested24h: randomInt(5, 25),
        accuracy: randomInt(85, 99),
      },
      config: {
        alertThresholds: {
          dwellTime: 120, // minutes
          queueLength: 5,
          utilization: 90,
        },
        updateFrequency: 5000,
        autoOptimize: true,
      },
      lastActivity: now,
    };
    
    // Add some sample insights
    if (Math.random() > 0.5) {
      agent.recentInsights.push({
        id: `insight-${Date.now()}-${Math.random()}`,
        type: randomPick(['optimization', 'prediction', 'recommendation']),
        severity: randomPick(['info', 'warning']),
        title: randomPick([
          'Dock utilization optimal',
          'Predicted peak in 2 hours',
          'Trailer reposition recommended',
          'Gate queue clearing',
        ]),
        message: 'AI analysis complete - no immediate action required',
        affectedAssets: [],
        confidence: randomInt(75, 98),
        timestamp: now,
      });
    }
    
    agents.push(agent);
  }
  
  return agents;
}

// Generate zones for a facility
function generateZones(facility: Facility): DigitalTwinZone[] {
  const zones: DigitalTwinZone[] = [
    {
      id: `zone-inbound-${facility.id}`,
      name: 'Inbound Staging',
      type: 'inbound',
      bounds: { x: 0, y: 0, width: 30, height: 40 },
      capacity: Math.ceil(facility.counts.inboundLanes * 3),
      currentOccupancy: randomInt(0, facility.counts.inboundLanes * 2),
    },
    {
      id: `zone-outbound-${facility.id}`,
      name: 'Outbound Staging',
      type: 'outbound',
      bounds: { x: 0, y: 60, width: 30, height: 40 },
      capacity: Math.ceil(facility.counts.outboundLanes * 3),
      currentOccupancy: randomInt(0, facility.counts.outboundLanes * 2),
    },
    {
      id: `zone-storage-${facility.id}`,
      name: 'Trailer Storage',
      type: 'storage',
      bounds: { x: 35, y: 20, width: 40, height: 60 },
      capacity: facility.counts.trailerYards * 25,
      currentOccupancy: randomInt(10, facility.counts.trailerYards * 20),
    },
    {
      id: `zone-docks-${facility.id}`,
      name: 'Loading Docks',
      type: 'processing',
      bounds: { x: 80, y: 10, width: 20, height: 80 },
      capacity: facility.counts.dropDocks,
      currentOccupancy: randomInt(Math.floor(facility.counts.dropDocks * 0.5), facility.counts.dropDocks),
    },
    {
      id: `zone-parking-${facility.id}`,
      name: 'Truck Parking',
      type: 'parking',
      bounds: { x: 35, y: 0, width: 40, height: 15 },
      capacity: 30,
      currentOccupancy: randomInt(5, 25),
    },
  ];
  
  return zones;
}

// Generate metrics for a facility
function generateMetrics(facility: Facility, assets: YardAsset[]): DigitalTwinMetrics {
  const trailers = assets.filter(a => a.type === 'trailer');
  const trucks = assets.filter(a => a.type === 'truck');
  const docks = assets.filter(a => a.type === 'loading_dock');
  
  const activeDocks = docks.filter(d => ['loading', 'unloading', 'active'].includes(d.status));
  const availableDocks = docks.filter(d => d.status === 'idle');
  
  return {
    trucksInbound: trucks.filter(t => t.movement?.direction === 'inbound').length,
    trucksOutbound: trucks.filter(t => t.movement?.direction === 'outbound').length,
    activeLoadingDocks: activeDocks.length,
    availableLoadingDocks: availableDocks.length,
    trailersInYard: trailers.length,
    trailerCapacity: facility.counts.trailerYards * 25,
    averageDwellTime: randomInt(45, 180),
    gateProcessingTime: randomInt(3, 15),
    dockTurnaroundTime: randomInt(30, 90),
    yardUtilization: Math.min(100, Math.round((trailers.length / (facility.counts.trailerYards * 25)) * 100)),
    flowScore: 0, // Will be calculated
    bottlenecks: [],
    predictedCongestion: randomInt(10, 60),
    predictedPeakTime: new Date(Date.now() + randomInt(1, 6) * 60 * 60 * 1000),
  };
}

// =============================================================================
// STORE DEFINITION
// =============================================================================

interface DigitalTwinState {
  // Digital twins by facility ID
  twins: Record<string, DigitalTwin>;
  
  // Currently selected twin
  selectedTwinId: string | null;
  
  // Generation state
  isGenerating: boolean;
  generationProgress: number;
  
  // Simulation state
  isSimulating: boolean;
  simulationSpeed: number; // 1x, 2x, 5x, 10x
  
  // UI state
  isDigitalTwinPanelOpen: boolean;
  selectedAssetId: string | null;
  selectedAgentId: string | null;
  assetFilter: YardAssetType | 'all';
  
  // Actions
  generateTwin: (facility: Facility) => Promise<DigitalTwin>;
  deleteTwin: (facilityId: string) => void;
  selectTwin: (facilityId: string | null) => void;
  
  // Asset actions
  updateAsset: (facilityId: string, assetId: string, updates: Partial<YardAsset>) => void;
  selectAsset: (assetId: string | null) => void;
  setAssetFilter: (filter: YardAssetType | 'all') => void;
  
  // Agent actions
  selectAgent: (agentId: string | null) => void;
  triggerAgentTask: (facilityId: string, agentId: string, taskType: string) => void;
  
  // Simulation actions
  startSimulation: () => void;
  stopSimulation: () => void;
  setSimulationSpeed: (speed: number) => void;
  tickSimulation: () => void;
  
  // UI actions
  setDigitalTwinPanelOpen: (open: boolean) => void;
}

// Selectors
export const selectTwinByFacility = (state: DigitalTwinState, facilityId: string) => 
  state.twins[facilityId];

export const selectSelectedTwin = (state: DigitalTwinState) => 
  state.selectedTwinId ? state.twins[state.selectedTwinId] : null;

export const selectFilteredAssets = (state: DigitalTwinState, facilityId: string) => {
  const twin = state.twins[facilityId];
  if (!twin) return [];
  if (state.assetFilter === 'all') return twin.assets;
  return twin.assets.filter(a => a.type === state.assetFilter);
};

export const selectAssetsByType = (state: DigitalTwinState, facilityId: string) => {
  const twin = state.twins[facilityId];
  if (!twin) return {};
  
  const grouped: Record<YardAssetType, YardAsset[]> = {} as Record<YardAssetType, YardAsset[]>;
  for (const asset of twin.assets) {
    if (!grouped[asset.type]) grouped[asset.type] = [];
    grouped[asset.type].push(asset);
  }
  return grouped;
};

export const selectAgentsByRole = (state: DigitalTwinState, facilityId: string) => {
  const twin = state.twins[facilityId];
  if (!twin) return {};
  
  const grouped: Record<AgentRole, AssetAgent[]> = {} as Record<AgentRole, AssetAgent[]>;
  for (const agent of twin.agents) {
    if (!grouped[agent.role]) grouped[agent.role] = [];
    grouped[agent.role].push(agent);
  }
  return grouped;
};

// Create store
export const useDigitalTwinStore = create<DigitalTwinState>()(
  persist(
    (set, get) => ({
      twins: {},
      selectedTwinId: null,
      isGenerating: false,
      generationProgress: 0,
      isSimulating: false,
      simulationSpeed: 1,
      isDigitalTwinPanelOpen: false,
      selectedAssetId: null,
      selectedAgentId: null,
      assetFilter: 'all',
      
      generateTwin: async (facility: Facility) => {
        set({ isGenerating: true, generationProgress: 0 });
        
        // Simulate generation progress
        const progressInterval = setInterval(() => {
          set(state => ({ 
            generationProgress: Math.min(state.generationProgress + 10, 90) 
          }));
        }, 100);
        
        // Generate twin components
        const assets = generateSampleAssets(facility);
        const agents = generateAgents(facility);
        const zones = generateZones(facility);
        const metrics = generateMetrics(facility, assets);
        
        // Calculate flow score
        metrics.flowScore = calculateFlowScore(metrics);
        
        // Identify bottlenecks
        if (metrics.yardUtilization > 85) {
          metrics.bottlenecks.push('High yard utilization');
        }
        if (metrics.availableLoadingDocks < 2) {
          metrics.bottlenecks.push('Limited dock availability');
        }
        if (metrics.averageDwellTime > 120) {
          metrics.bottlenecks.push('Extended trailer dwell time');
        }
        
        const twin: DigitalTwin = {
          id: `twin-${facility.id}`,
          facilityId: facility.id,
          facility,
          version: '1.0.0',
          createdAt: new Date(),
          lastSyncedAt: new Date(),
          zones,
          yardLayout: {
            width: 100,
            height: 100,
            orientation: 0,
          },
          assets,
          agents,
          metrics,
          history: [{
            timestamp: new Date(),
            metrics: { ...metrics },
          }],
          status: 'synced',
          syncInterval: 5000,
        };
        
        clearInterval(progressInterval);
        
        set(state => ({
          twins: { ...state.twins, [facility.id]: twin },
          isGenerating: false,
          generationProgress: 100,
          selectedTwinId: facility.id,
        }));
        
        // Reset progress after a moment
        setTimeout(() => set({ generationProgress: 0 }), 500);
        
        return twin;
      },
      
      deleteTwin: (facilityId: string) => {
        set(state => {
          const { [facilityId]: _, ...rest } = state.twins;
          return {
            twins: rest,
            selectedTwinId: state.selectedTwinId === facilityId ? null : state.selectedTwinId,
          };
        });
      },
      
      selectTwin: (facilityId: string | null) => {
        set({ selectedTwinId: facilityId });
      },
      
      updateAsset: (facilityId: string, assetId: string, updates: Partial<YardAsset>) => {
        set(state => {
          const twin = state.twins[facilityId];
          if (!twin) return state;
          
          const assets = twin.assets.map(a => 
            a.id === assetId ? { ...a, ...updates, lastUpdated: new Date() } : a
          );
          
          return {
            twins: {
              ...state.twins,
              [facilityId]: { ...twin, assets, lastSyncedAt: new Date() },
            },
          };
        });
      },
      
      selectAsset: (assetId: string | null) => {
        set({ selectedAssetId: assetId });
      },
      
      setAssetFilter: (filter: YardAssetType | 'all') => {
        set({ assetFilter: filter });
      },
      
      selectAgent: (agentId: string | null) => {
        set({ selectedAgentId: agentId });
      },
      
      triggerAgentTask: (facilityId: string, agentId: string, taskType: string) => {
        set(state => {
          const twin = state.twins[facilityId];
          if (!twin) return state;
          
          const agents = twin.agents.map(agent => {
            if (agent.id !== agentId) return agent;
            
            const newTask: AgentTask = {
              id: `task-${Date.now()}`,
              type: taskType,
              priority: 'medium',
              status: 'pending',
              description: `Manual trigger: ${taskType}`,
              startedAt: new Date(),
            };
            
            return {
              ...agent,
              status: 'processing' as AgentStatus,
              currentTasks: [...agent.currentTasks, newTask],
              lastActivity: new Date(),
            };
          });
          
          return {
            twins: {
              ...state.twins,
              [facilityId]: { ...twin, agents },
            },
          };
        });
      },
      
      startSimulation: () => {
        set({ isSimulating: true });
      },
      
      stopSimulation: () => {
        set({ isSimulating: false });
      },
      
      setSimulationSpeed: (speed: number) => {
        set({ simulationSpeed: speed });
      },
      
      tickSimulation: () => {
        const state = get();
        if (!state.isSimulating || !state.selectedTwinId) return;
        
        const twin = state.twins[state.selectedTwinId];
        if (!twin) return;
        
        // Simulate asset movements
        const assets = twin.assets.map(asset => {
          if (asset.type !== 'truck' || !asset.movement) return asset;
          
          // Move trucks slowly
          const dx = (Math.random() - 0.5) * 2 * state.simulationSpeed;
          const dy = (Math.random() - 0.5) * 2 * state.simulationSpeed;
          
          return {
            ...asset,
            position: {
              ...asset.position,
              x: Math.max(0, Math.min(100, asset.position.x + dx)),
              y: Math.max(0, Math.min(100, asset.position.y + dy)),
            },
            lastUpdated: new Date(),
          };
        });
        
        // Randomly change some asset statuses
        const updatedAssets = assets.map(asset => {
          if (Math.random() > 0.98) {
            const statuses: AssetStatus[] = ['active', 'idle', 'loading', 'unloading'];
            return { ...asset, status: randomPick(statuses) };
          }
          return asset;
        });
        
        set(state => ({
          twins: {
            ...state.twins,
            [twin.facilityId]: {
              ...twin,
              assets: updatedAssets,
              lastSyncedAt: new Date(),
            },
          },
        }));
      },
      
      setDigitalTwinPanelOpen: (open: boolean) => {
        set({ isDigitalTwinPanelOpen: open });
      },
    }),
    {
      name: 'digital-twin-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist twin data, not UI state
        twins: state.twins,
      }),
    }
  )
);

// Simulation tick effect (to be used in a component)
export function useSimulationTick() {
  const { isSimulating, simulationSpeed, tickSimulation } = useDigitalTwinStore();
  
  React.useEffect(() => {
    if (!isSimulating) return;
    
    const interval = setInterval(tickSimulation, 1000 / simulationSpeed);
    return () => clearInterval(interval);
  }, [isSimulating, simulationSpeed, tickSimulation]);
}

// Need React import for the hook
import React from 'react';

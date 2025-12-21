// Digital Twin Generator - Main UI Component
// Generates and manages facility digital twins with agent visualization

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrimoStore, selectSelectedFacility } from '@/store/primoStore';
import { useDigitalTwinStore, selectSelectedTwin } from '@/store/digitalTwinStore';
import { 
  ASSET_TYPE_LABELS, 
  ASSET_STATUS_COLORS,
  AGENT_ROLE_LABELS,
  AGENT_STATUS_COLORS,
  YardAssetType,
} from '@/types/digitalTwin';
import {
  CloseIcon,
  TruckIcon,
  TrailerIcon,
  GateIcon,
  DropDockIcon,
  FlowStatusIcon,
  ActivatingStatusIcon,
  ChaosStatusIcon,
} from '@/brand/icons';
import { cn } from '@/lib/utils';

// Enhancement panel state - shared globally
export const useEnhancementPanels = () => {
  const [panels, setPanels] = useState({
    yard3d: false,
    agentChat: false,
    predictiveAlerts: false,
    historicalPlayback: false,
    multiFacility: false,
    integrationHooks: false,
  });
  
  const togglePanel = (panel: keyof typeof panels) => {
    setPanels(prev => ({ ...prev, [panel]: !prev[panel] }));
  };
  
  const closePanel = (panel: keyof typeof panels) => {
    setPanels(prev => ({ ...prev, [panel]: false }));
  };
  
  return { panels, togglePanel, closePanel };
};

// Twin Generation Progress
const GenerationProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const theme = usePrimoStore((state) => state.theme);
  
  const stages = [
    { label: 'Analyzing Facility', threshold: 20 },
    { label: 'Generating Assets', threshold: 40 },
    { label: 'Deploying Agents', threshold: 60 },
    { label: 'Calibrating Metrics', threshold: 80 },
    { label: 'Syncing Twin', threshold: 100 },
  ];
  
  const currentStage = stages.find(s => progress < s.threshold) || stages[stages.length - 1];
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: theme.colors.text }}>
          {currentStage.label}
        </span>
        <span className="text-sm font-mono" style={{ color: theme.colors.primary }}>
          {progress}%
        </span>
      </div>
      
      <div 
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: `${theme.colors.background}80` }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          className="h-full rounded-full"
          style={{ 
            background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.alert})`,
          }}
        />
      </div>
      
      <div className="flex justify-between text-xs" style={{ color: theme.colors.textSecondary }}>
        {stages.map((stage, i) => (
          <div 
            key={i}
            className={cn(
              'flex flex-col items-center gap-1 transition-opacity',
              progress >= stage.threshold ? 'opacity-100' : 'opacity-30'
            )}
          >
            <div 
              className={cn(
                'w-2 h-2 rounded-full',
                progress >= stage.threshold ? 'animate-pulse' : ''
              )}
              style={{ 
                backgroundColor: progress >= stage.threshold 
                  ? theme.colors.primary 
                  : theme.colors.textSecondary 
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Asset Type Button
const AssetTypeButton: React.FC<{
  type: YardAssetType | 'all';
  count?: number;
  isActive: boolean;
  onClick: () => void;
}> = ({ type, count, isActive, onClick }) => {
  const theme = usePrimoStore((state) => state.theme);
  
  const getIcon = () => {
    switch (type) {
      case 'trailer': return <TrailerIcon size={16} color={isActive ? theme.colors.background : theme.colors.primary} />;
      case 'truck': return <TruckIcon size={16} color={isActive ? theme.colors.background : theme.colors.primary} />;
      case 'loading_dock': return <DropDockIcon size={16} color={isActive ? theme.colors.background : theme.colors.primary} />;
      case 'gate': return <GateIcon size={16} color={isActive ? theme.colors.background : theme.colors.primary} />;
      default: return null;
    }
  };
  
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all',
        isActive ? '' : 'hover:opacity-80'
      )}
      style={{
        backgroundColor: isActive ? theme.colors.primary : `${theme.colors.surface}80`,
        color: isActive ? theme.colors.background : theme.colors.text,
        border: `1px solid ${isActive ? theme.colors.primary : theme.colors.primary}30`,
      }}
    >
      {getIcon()}
      <span>{type === 'all' ? 'All Assets' : ASSET_TYPE_LABELS[type]}</span>
      {count !== undefined && (
        <span 
          className="px-1.5 py-0.5 rounded text-xs"
          style={{ 
            backgroundColor: isActive ? `${theme.colors.background}30` : `${theme.colors.primary}20`,
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
};

// Agent Card
const AgentCard: React.FC<{
  agent: {
    id: string;
    role: string;
    name: string;
    status: string;
    metrics: {
      assetsMonitored: number;
      tasksCompleted24h: number;
      alertsRaised24h: number;
      accuracy: number;
    };
  };
  isSelected: boolean;
  onClick: () => void;
}> = ({ agent, isSelected, onClick }) => {
  const theme = usePrimoStore((state) => state.theme);
  const statusColor = AGENT_STATUS_COLORS[agent.status as keyof typeof AGENT_STATUS_COLORS] || '#888';
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'w-full text-left p-4 rounded-lg transition-all',
        isSelected ? 'ring-2' : ''
      )}
      style={{
        backgroundColor: `${theme.colors.surface}80`,
        border: `1px solid ${isSelected ? theme.colors.primary : theme.colors.primary}20`,
      } as React.CSSProperties}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="text-sm font-medium" style={{ color: theme.colors.text }}>
            {AGENT_ROLE_LABELS[agent.role as keyof typeof AGENT_ROLE_LABELS] || agent.role}
          </h4>
          <p className="text-xs mt-0.5" style={{ color: theme.colors.textSecondary }}>
            {agent.id}
          </p>
        </div>
        <div 
          className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs"
          style={{ 
            backgroundColor: `${statusColor}20`,
            color: statusColor,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: statusColor }} />
          {agent.status}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="text-center p-2 rounded" style={{ backgroundColor: `${theme.colors.background}60` }}>
          <div className="text-lg font-bold tabular-nums" style={{ color: theme.colors.primary }}>
            {agent.metrics.assetsMonitored}
          </div>
          <div className="text-xs" style={{ color: theme.colors.textSecondary }}>Monitored</div>
        </div>
        <div className="text-center p-2 rounded" style={{ backgroundColor: `${theme.colors.background}60` }}>
          <div className="text-lg font-bold tabular-nums" style={{ color: theme.colors.text }}>
            {agent.metrics.accuracy}%
          </div>
          <div className="text-xs" style={{ color: theme.colors.textSecondary }}>Accuracy</div>
        </div>
      </div>
    </motion.button>
  );
};

// Mini Yard Map Visualization
const YardMiniMap: React.FC<{
  assets: Array<{
    id: string;
    type: YardAssetType;
    status: string;
    position: { x: number; y: number };
  }>;
  zones: Array<{
    id: string;
    name: string;
    type: string;
    bounds: { x: number; y: number; width: number; height: number };
  }>;
  selectedAssetId: string | null;
  onAssetClick: (id: string) => void;
}> = ({ assets, zones, selectedAssetId, onAssetClick }) => {
  const theme = usePrimoStore((state) => state.theme);
  
  const getAssetColor = (type: YardAssetType, status: string) => {
    if (status === 'active' || status === 'loading' || status === 'unloading') return theme.colors.primary;
    if (status === 'idle') return theme.colors.textSecondary;
    if (status === 'maintenance' || status === 'offline') return theme.colors.alert;
    return theme.colors.text;
  };
  
  return (
    <div 
      className="relative w-full aspect-square rounded-lg overflow-hidden"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Zones */}
      {zones.map(zone => (
        <div
          key={zone.id}
          className="absolute border border-dashed opacity-30"
          style={{
            left: `${zone.bounds.x}%`,
            top: `${zone.bounds.y}%`,
            width: `${zone.bounds.width}%`,
            height: `${zone.bounds.height}%`,
            borderColor: theme.colors.primary,
          }}
        >
          <span 
            className="absolute top-1 left-1 text-xs px-1 rounded"
            style={{ 
              backgroundColor: `${theme.colors.surface}80`,
              color: theme.colors.textSecondary,
              fontSize: '8px',
            }}
          >
            {zone.name}
          </span>
        </div>
      ))}
      
      {/* Assets */}
      {assets.map(asset => (
        <motion.button
          key={asset.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.5 }}
          onClick={() => onAssetClick(asset.id)}
          className={cn(
            'absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all',
            selectedAssetId === asset.id ? 'ring-2 ring-white' : ''
          )}
          style={{
            left: `${asset.position.x}%`,
            top: `${asset.position.y}%`,
            width: asset.type === 'trailer' ? 6 : asset.type === 'truck' ? 5 : 4,
            height: asset.type === 'trailer' ? 6 : asset.type === 'truck' ? 5 : 4,
            backgroundColor: getAssetColor(asset.type, asset.status),
          }}
        />
      ))}
      
      {/* Building outline */}
      <div 
        className="absolute right-0 top-[10%] w-[15%] h-[80%] border-2"
        style={{ 
          borderColor: theme.colors.surface,
          backgroundColor: `${theme.colors.surface}40`,
        }}
      />
    </div>
  );
};

// Main Digital Twin Generator Component
export const DigitalTwinGenerator: React.FC<{
  onOpenPanel?: (panel: string) => void;
}> = ({ onOpenPanel }) => {
  const theme = usePrimoStore((state) => state.theme);
  const facility = usePrimoStore(selectSelectedFacility);
  const isDrawerOpen = usePrimoStore((state) => state.isDrawerOpen);
  
  const {
    twins,
    selectedTwinId,
    isGenerating,
    generationProgress,
    isSimulating,
    simulationSpeed,
    selectedAssetId,
    selectedAgentId,
    assetFilter,
    generateTwin,
    selectAsset,
    selectAgent,
    setAssetFilter,
    startSimulation,
    stopSimulation,
    setSimulationSpeed,
    isDigitalTwinPanelOpen,
    setDigitalTwinPanelOpen,
  } = useDigitalTwinStore();
  
  const twin = facility ? twins[facility.id] : null;
  
  // Auto-tick simulation
  useEffect(() => {
    if (!isSimulating || !selectedTwinId) return;
    
    const interval = setInterval(() => {
      useDigitalTwinStore.getState().tickSimulation();
    }, 1000 / simulationSpeed);
    
    return () => clearInterval(interval);
  }, [isSimulating, simulationSpeed, selectedTwinId]);
  
  if (!isDrawerOpen || !facility) return null;
  
  const filteredAssets = twin 
    ? (assetFilter === 'all' ? twin.assets : twin.assets.filter(a => a.type === assetFilter))
    : [];
  
  const assetCounts: Partial<Record<YardAssetType, number>> = twin 
    ? twin.assets.reduce((acc, a) => {
        acc[a.type] = (acc[a.type] || 0) + 1;
        return acc;
      }, {} as Partial<Record<YardAssetType, number>>)
    : {};
  
  return (
    <AnimatePresence>
      {isDigitalTwinPanelOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[800px] max-w-[90vw] rounded-xl overflow-hidden"
          style={{
            backgroundColor: `${theme.colors.surface}F5`,
            border: `1px solid ${theme.colors.primary}30`,
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: `${theme.colors.primary}20` }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${theme.colors.primary}40, ${theme.colors.alert}40)` 
                }}
              >
                <span className="text-lg font-bold" style={{ color: theme.colors.text }}>DT</span>
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: theme.colors.text }}>
                  Digital Twin Generator
                </h3>
                <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                  {facility.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {twin && (
                <>
                  <button
                    onClick={() => isSimulating ? stopSimulation() : startSimulation()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      backgroundColor: isSimulating ? `${theme.colors.alert}20` : `${theme.colors.primary}20`,
                      color: isSimulating ? theme.colors.alert : theme.colors.primary,
                    }}
                  >
                    {isSimulating ? (
                      <>
                        <span className="w-2 h-2 bg-current rounded-sm animate-pulse" />
                        Stop
                      </>
                    ) : (
                      <>
                        <span className="w-0 h-0 border-l-8 border-l-current border-y-4 border-y-transparent" />
                        Simulate
                      </>
                    )}
                  </button>
                  {isSimulating && (
                    <select
                      value={simulationSpeed}
                      onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                      className="px-2 py-1 rounded text-sm bg-transparent border"
                      style={{ 
                        borderColor: `${theme.colors.primary}30`,
                        color: theme.colors.text,
                      }}
                    >
                      <option value={1}>1x</option>
                      <option value={2}>2x</option>
                      <option value={5}>5x</option>
                      <option value={10}>10x</option>
                    </select>
                  )}
                </>
              )}
              <button
                onClick={() => setDigitalTwinPanelOpen(false)}
                className="p-2 rounded-lg hover:opacity-80 transition-opacity"
                style={{ backgroundColor: `${theme.colors.background}60` }}
              >
                <CloseIcon size={16} color={theme.colors.textSecondary} />
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {!twin && !isGenerating && (
              <div className="text-center py-8">
                <div 
                  className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.alert}20)` 
                  }}
                >
                  <span className="text-3xl">🏭</span>
                </div>
                <h4 className="text-lg font-medium mb-2" style={{ color: theme.colors.text }}>
                  No Digital Twin Generated
                </h4>
                <p className="text-sm mb-6" style={{ color: theme.colors.textSecondary }}>
                  Generate a digital twin to view yard assets and deploy AI agents
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => generateTwin(facility)}
                  className="px-6 py-3 rounded-lg font-medium text-sm"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.alert})`,
                    color: theme.colors.background,
                  }}
                >
                  Generate Digital Twin
                </motion.button>
              </div>
            )}
            
            {isGenerating && (
              <div className="py-8">
                <GenerationProgress progress={generationProgress} />
              </div>
            )}
            
            {twin && !isGenerating && (
              <div className="grid grid-cols-2 gap-6">
                {/* Left: Yard Map & Assets */}
                <div className="space-y-4">
                  <YardMiniMap
                    assets={filteredAssets}
                    zones={twin.zones}
                    selectedAssetId={selectedAssetId}
                    onAssetClick={selectAsset}
                  />
                  
                  {/* Asset filters */}
                  <div className="flex flex-wrap gap-2">
                    <AssetTypeButton
                      type="all"
                      count={twin.assets.length}
                      isActive={assetFilter === 'all'}
                      onClick={() => setAssetFilter('all')}
                    />
                    {(['trailer', 'truck', 'loading_dock', 'gate'] as YardAssetType[]).map(type => (
                      <AssetTypeButton
                        key={type}
                        type={type}
                        count={assetCounts[type] || 0}
                        isActive={assetFilter === type}
                        onClick={() => setAssetFilter(type)}
                      />
                    ))}
                  </div>
                  
                  {/* Metrics */}
                  <div 
                    className="grid grid-cols-4 gap-2 p-3 rounded-lg"
                    style={{ backgroundColor: `${theme.colors.background}60` }}
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold" style={{ color: theme.colors.primary }}>
                        {twin.metrics.flowScore}
                      </div>
                      <div className="text-xs" style={{ color: theme.colors.textSecondary }}>Flow</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold" style={{ color: theme.colors.text }}>
                        {twin.metrics.yardUtilization}%
                      </div>
                      <div className="text-xs" style={{ color: theme.colors.textSecondary }}>Util</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold" style={{ color: theme.colors.text }}>
                        {twin.metrics.averageDwellTime}m
                      </div>
                      <div className="text-xs" style={{ color: theme.colors.textSecondary }}>Dwell</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold" style={{ 
                        color: twin.metrics.bottlenecks.length > 0 ? theme.colors.alert : theme.colors.primary 
                      }}>
                        {twin.metrics.bottlenecks.length}
                      </div>
                      <div className="text-xs" style={{ color: theme.colors.textSecondary }}>Issues</div>
                    </div>
                  </div>
                  
                  {/* Enhancement Tools */}
                  {onOpenPanel && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium" style={{ color: theme.colors.textSecondary }}>
                        Enhancement Tools
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { key: 'yard3d', label: '3D View', icon: '🏗️' },
                          { key: 'agentChat', label: 'AI Chat', icon: '💬' },
                          { key: 'predictiveAlerts', label: 'Alerts', icon: '⚠️' },
                          { key: 'historicalPlayback', label: 'History', icon: '📊' },
                          { key: 'multiFacility', label: 'Compare', icon: '📍' },
                          { key: 'integrationHooks', label: 'Integrations', icon: '🔌' },
                        ].map(tool => (
                          <button
                            key={tool.key}
                            onClick={() => onOpenPanel(tool.key)}
                            className="flex flex-col items-center gap-1 p-2 rounded-lg text-xs transition-all hover:scale-105"
                            style={{
                              backgroundColor: `${theme.colors.primary}15`,
                              border: `1px solid ${theme.colors.primary}30`,
                              color: theme.colors.text,
                            }}
                          >
                            <span className="text-lg">{tool.icon}</span>
                            <span>{tool.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Right: Agents */}
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  <h4 className="text-sm font-medium sticky top-0 py-2" style={{ 
                    color: theme.colors.text,
                    backgroundColor: `${theme.colors.surface}F5`,
                  }}>
                    AI Agents ({twin.agents.length})
                  </h4>
                  {twin.agents.map(agent => (
                    <AgentCard
                      key={agent.id}
                      agent={agent}
                      isSelected={selectedAgentId === agent.id}
                      onClick={() => selectAgent(agent.id === selectedAgentId ? null : agent.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DigitalTwinGenerator;

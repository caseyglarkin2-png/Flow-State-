// 3D Yard View - deck.gl visualization of yard layout
// Shows trailers, trucks, and docks as 3D elements

'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrimoStore } from '@/store/primoStore';
import { DigitalTwin, YardAsset, DigitalTwinZone, ASSET_STATUS_COLORS } from '@/types/digitalTwin';
import { CloseIcon } from '@/brand/icons';
import { cn } from '@/lib/utils';

export interface Yard3DViewProps {
  twin: DigitalTwin;
  isOpen: boolean;
  onClose: () => void;
}

export const Yard3DView: React.FC<Yard3DViewProps> = ({
  twin,
  isOpen,
  onClose,
}) => {
  const theme = usePrimoStore((state) => state.theme);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  
  const { assets, zones } = twin;
  
  // Group assets by type for layered rendering
  const assetsByType = useMemo(() => {
    const grouped: Record<string, YardAsset[]> = {};
    assets.forEach(asset => {
      if (!grouped[asset.type]) grouped[asset.type] = [];
      grouped[asset.type].push(asset);
    });
    return grouped;
  }, [assets]);

  const getAssetColor = (asset: YardAsset) => {
    return ASSET_STATUS_COLORS[asset.status] || theme.colors.textSecondary;
  };

  const getAssetDimensions = (type: string) => {
    switch (type) {
      case 'trailer': return { width: 3.5, height: 8, depth: 2.5 };
      case 'truck': return { width: 2.5, height: 5, depth: 2 };
      case 'loading_dock': return { width: 4, height: 4, depth: 1.5 };
      case 'gate': return { width: 6, height: 2, depth: 3 };
      case 'guard_shack': return { width: 3, height: 3, depth: 2.5 };
      default: return { width: 2, height: 2, depth: 1 };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[900px] max-w-[90vw] h-[600px] max-h-[80vh] rounded-xl overflow-hidden"
            style={{
              backgroundColor: theme.colors.surface,
              border: `1px solid ${theme.colors.primary}30`,
            }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: `${theme.colors.primary}20` }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏗️</span>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: theme.colors.text }}>
                    3D Yard View
                  </h3>
                  <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                    Isometric visualization • {assets.length} assets
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:opacity-80 transition-opacity"
                style={{ backgroundColor: `${theme.colors.background}60` }}
              >
                <CloseIcon size={18} color={theme.colors.textSecondary} />
              </button>
            </div>
            
            {/* 3D View Content */}
            <div 
              className="relative w-full h-[calc(100%-72px)]"
              style={{ 
                backgroundColor: theme.colors.background,
                perspective: '1000px',
              }}
            >
      {/* Grid floor */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${theme.colors.primary}10 1px, transparent 1px),
            linear-gradient(90deg, ${theme.colors.primary}10 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          transform: 'rotateX(60deg) scale(1.5)',
          transformOrigin: 'center center',
        }}
      />

      {/* 3D Container */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: 'rotateX(45deg) rotateZ(-10deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Zones as floor areas */}
        {zones.map(zone => (
          <div
            key={zone.id}
            className="absolute rounded-lg border-2 border-dashed"
            style={{
              left: `${zone.bounds.x * 0.8 + 10}%`,
              top: `${zone.bounds.y * 0.8 + 10}%`,
              width: `${zone.bounds.width * 0.8}%`,
              height: `${zone.bounds.height * 0.8}%`,
              borderColor: `${theme.colors.primary}40`,
              backgroundColor: `${theme.colors.primary}05`,
              transform: 'translateZ(0px)',
            }}
          >
            <span 
              className="absolute -top-5 left-2 text-xs font-medium px-2 py-0.5 rounded"
              style={{ 
                backgroundColor: theme.colors.surface,
                color: theme.colors.textSecondary,
              }}
            >
              {zone.name}
            </span>
          </div>
        ))}

        {/* Building */}
        <div
          className="absolute right-[5%] top-[15%] w-[15%] h-[70%] rounded"
          style={{
            backgroundColor: theme.colors.surface,
            border: `2px solid ${theme.colors.primary}30`,
            transform: 'translateZ(30px)',
            boxShadow: `0 30px 30px -10px ${theme.colors.background}`,
          }}
        >
          <div 
            className="absolute inset-x-0 -top-8 h-8 rounded-t"
            style={{
              background: `linear-gradient(to bottom, ${theme.colors.surface}, ${theme.colors.surface}80)`,
              transform: 'rotateX(-90deg)',
              transformOrigin: 'bottom',
            }}
          />
          <span 
            className="absolute top-2 left-2 text-xs font-bold"
            style={{ color: theme.colors.primary }}
          >
            WAREHOUSE
          </span>
        </div>

        {/* Assets as 3D blocks */}
        {Object.entries(assetsByType).map(([type, typeAssets]) => (
          <React.Fragment key={type}>
            {typeAssets.slice(0, 50).map((asset, idx) => {
              const dims = getAssetDimensions(type);
              const color = getAssetColor(asset);
              const isSelected = selectedAssetId === asset.id;
              const zHeight = type === 'trailer' ? 15 : type === 'truck' ? 12 : 8;
              
              return (
                <motion.button
                  key={asset.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: isSelected ? 1.2 : 1, 
                    opacity: 1,
                    z: isSelected ? zHeight + 10 : zHeight,
                  }}
                  whileHover={{ scale: 1.1, z: zHeight + 5 }}
                  transition={{ delay: idx * 0.01, duration: 0.2 }}
                  onClick={() => setSelectedAssetId(asset.id === selectedAssetId ? null : asset.id)}
                  className={cn(
                    'absolute rounded transition-all cursor-pointer',
                    isSelected ? 'ring-2 ring-white z-50' : 'z-10'
                  )}
                  style={{
                    left: `${asset.position.x * 0.8 + 10}%`,
                    top: `${asset.position.y * 0.8 + 10}%`,
                    width: `${dims.width}%`,
                    height: `${dims.height}%`,
                    backgroundColor: color,
                    transform: `translateZ(${zHeight}px)`,
                    boxShadow: `
                      0 ${zHeight}px ${zHeight}px -${zHeight/2}px ${color}40,
                      0 0 0 1px ${color}60
                    `,
                  }}
                >
                  {/* Top face effect */}
                  <div 
                    className="absolute inset-0 rounded"
                    style={{
                      background: `linear-gradient(135deg, ${color}80 0%, ${color} 100%)`,
                    }}
                  />
                  
                  {/* Status indicator */}
                  {(asset.status === 'active' || asset.status === 'loading' || asset.status === 'unloading') && (
                    <div 
                      className="absolute top-1 right-1 w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: '#00FF88' }}
                    />
                  )}
                </motion.button>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Legend */}
      <div 
        className="absolute bottom-3 left-3 flex flex-wrap gap-2 p-2 rounded-lg"
        style={{ backgroundColor: `${theme.colors.surface}E0` }}
      >
        {[
          { label: 'Active', color: '#00B4FF' },
          { label: 'Loading', color: '#00FF88' },
          { label: 'Idle', color: '#888888' },
          { label: 'Maintenance', color: '#FFB800' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div 
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs" style={{ color: theme.colors.textSecondary }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Camera controls hint */}
      <div 
        className="absolute top-3 right-3 px-2 py-1 rounded text-xs"
        style={{ 
          backgroundColor: `${theme.colors.surface}80`,
          color: theme.colors.textSecondary,
        }}
      >
        3D Isometric View
      </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Yard3DView;

// Primo Singularity Map - KPI Strip Component
// Displays computed totals for facilities, trucks, trailers, etc.

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePrimoStore, selectKPIs, selectFilteredFacilities } from '@/store/primoStore';
import {
  TruckIcon,
  TrailerIcon,
  GuardShackIcon,
  GateIcon,
  TrailerYardIcon,
  DropDockIcon,
  InboundLaneIcon,
  OutboundLaneIcon,
  NetworkIcon,
} from '@/brand/icons';
import { cn } from '@/lib/utils';

interface KPIItemProps {
  icon: React.FC<{ size?: number; color?: string; className?: string }>;
  label: string;
  value: number;
  color?: string;
}

const KPIItem: React.FC<KPIItemProps> = ({ icon: Icon, label, value, color }) => {
  const theme = usePrimoStore((state) => state.theme);
  
  return (
    <div className="flex items-center gap-2 px-3 py-2">
      <Icon size={16} color={color || theme.colors.primary} />
      <div className="flex flex-col">
        <span
          className="text-xs font-medium opacity-60"
          style={{ color: theme.colors.textSecondary }}
        >
          {label}
        </span>
        <span
          className="text-sm font-bold tabular-nums"
          style={{ color: theme.colors.text }}
        >
          {value.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export const KPIStrip: React.FC = () => {
  const theme = usePrimoStore((state) => state.theme);
  const kpis = usePrimoStore(selectKPIs);
  const filteredCount = usePrimoStore((state) => selectFilteredFacilities(state).length);
  const totalCount = usePrimoStore((state) => state.facilities.length);
  
  const isFiltered = filteredCount !== totalCount;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-40',
        'flex items-center justify-between',
        'px-4 py-1',
        'border-b backdrop-blur-md'
      )}
      style={{
        backgroundColor: `${theme.colors.surface}E6`,
        borderColor: `${theme.colors.primary}20`,
      }}
    >
      {/* Left section - Facilities count */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 pr-4 border-r border-white/10">
          <NetworkIcon size={20} color={theme.colors.primary} />
          <div className="flex flex-col">
            <span className="text-xs font-medium" style={{ color: theme.colors.textSecondary }}>
              {isFiltered ? 'Filtered Facilities' : 'Total Facilities'}
            </span>
            <span className="text-lg font-bold" style={{ color: theme.colors.primary }}>
              {filteredCount.toLocaleString()}
              {isFiltered && (
                <span
                  className="text-sm font-normal ml-1"
                  style={{ color: theme.colors.textSecondary }}
                >
                  / {totalCount}
                </span>
              )}
            </span>
          </div>
        </div>
        
        {/* Network Velocity */}
        <div className="flex items-center gap-2 pr-4 border-r border-white/10">
          <div className="flex flex-col">
            <span className="text-xs font-medium" style={{ color: theme.colors.textSecondary }}>
              Network Velocity
            </span>
            <span className="text-lg font-bold" style={{ color: theme.colors.primary }}>
              {kpis.networkVelocity.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      
      {/* Center section - Main KPIs */}
      <div className="flex items-center gap-1">
        <KPIItem icon={TruckIcon} label="Trucks" value={kpis.totalTrucks} />
        <div className="w-px h-8 bg-white/10" />
        <KPIItem icon={TrailerIcon} label="Trailers" value={kpis.totalTrailers} />
        <div className="w-px h-8 bg-white/10" />
        <KPIItem icon={GuardShackIcon} label="Guard Shacks" value={kpis.totalGuardShacks} />
        <div className="w-px h-8 bg-white/10" />
        <KPIItem icon={GateIcon} label="Gates" value={kpis.totalGates} />
      </div>
      
      {/* Right section - Secondary KPIs */}
      <div className="flex items-center gap-1">
        <KPIItem icon={TrailerYardIcon} label="Trailer Yards" value={kpis.totalTrailerYards} />
        <div className="w-px h-8 bg-white/10" />
        <KPIItem icon={DropDockIcon} label="Drop Docks" value={kpis.totalDropDocks} />
        <div className="w-px h-8 bg-white/10" />
        <KPIItem icon={InboundLaneIcon} label="Inbound" value={kpis.totalInboundLanes} />
        <div className="w-px h-8 bg-white/10" />
        <KPIItem icon={OutboundLaneIcon} label="Outbound" value={kpis.totalOutboundLanes} />
      </div>
    </motion.div>
  );
};

export default KPIStrip;

// Primo Singularity Map - Facility Detail Drawer
// Shows detailed information about a selected facility

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrimoStore, selectSelectedFacility } from '@/store/primoStore';
import {
  CloseIcon,
  TruckIcon,
  TrailerIcon,
  GuardShackIcon,
  GateIcon,
  TrailerYardIcon,
  DropDockIcon,
  InboundLaneIcon,
  OutboundLaneIcon,
  FlowStatusIcon,
  ActivatingStatusIcon,
  ChaosStatusIcon,
  MapIcon,
  getFacilityIcon,
} from '@/brand/icons';
import { validateFacility, STATUS_COLORS, FACILITY_TYPE_LABELS } from '@/types/primo';
import { cn } from '@/lib/utils';

// Count display item
interface CountItemProps {
  icon: React.FC<{ size?: number; color?: string }>;
  label: string;
  value: number;
  color?: string;
}

const CountItem: React.FC<CountItemProps> = ({ icon: Icon, label, value, color }) => {
  const theme = usePrimoStore((state) => state.theme);
  
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-lg"
      style={{ backgroundColor: `${theme.colors.background}60` }}
    >
      <Icon size={20} color={color || theme.colors.primary} />
      <div className="flex-1">
        <span className="text-xs" style={{ color: theme.colors.textSecondary }}>
          {label}
        </span>
        <div className="text-lg font-bold tabular-nums" style={{ color: theme.colors.text }}>
          {value}
        </div>
      </div>
    </div>
  );
};

// Status badge
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const color = STATUS_COLORS[status as keyof typeof STATUS_COLORS] || '#888888';
  const StatusIcon = status === 'Flow' 
    ? FlowStatusIcon 
    : status === 'Activating' 
    ? ActivatingStatusIcon 
    : ChaosStatusIcon;
  
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{
        backgroundColor: `${color}20`,
        color: color,
      }}
    >
      <StatusIcon size={12} color={color} />
      {status}
    </div>
  );
};

// Data quality indicator
interface QualityIndicatorProps {
  checks: ReturnType<typeof validateFacility>;
}

const QualityIndicator: React.FC<QualityIndicatorProps> = ({ checks }) => {
  const theme = usePrimoStore((state) => state.theme);
  const validCount = checks.filter((c) => c.status === 'valid').length;
  const totalCount = checks.length;
  const percentage = Math.round((validCount / totalCount) * 100);
  
  const missingFields = checks.filter((c) => c.status === 'missing');
  const invalidFields = checks.filter((c) => c.status === 'invalid');
  
  const getColor = () => {
    if (percentage >= 90) return '#00B4FF';
    if (percentage >= 70) return '#FFB800';
    return '#FF2A00';
  };
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: theme.colors.text }}>
          Data Quality
        </span>
        <span className="text-sm font-bold" style={{ color: getColor() }}>
          {percentage}%
        </span>
      </div>
      
      {/* Progress bar */}
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: `${theme.colors.background}80` }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: getColor() }}
        />
      </div>
      
      {/* Issues list */}
      {(missingFields.length > 0 || invalidFields.length > 0) && (
        <div className="space-y-1">
          {invalidFields.map((field) => (
            <div
              key={field.field}
              className="text-xs px-2 py-1 rounded"
              style={{
                backgroundColor: `${theme.colors.alert}10`,
                color: theme.colors.alert,
              }}
            >
              {field.message}
            </div>
          ))}
          {missingFields.map((field) => (
            <div
              key={field.field}
              className="text-xs px-2 py-1 rounded"
              style={{
                backgroundColor: `${theme.colors.textSecondary}10`,
                color: theme.colors.textSecondary,
              }}
            >
              {field.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const FacilityDrawer: React.FC = () => {
  const theme = usePrimoStore((state) => state.theme);
  const facility = usePrimoStore(selectSelectedFacility);
  const isOpen = usePrimoStore((state) => state.isDrawerOpen);
  const setDrawerOpen = usePrimoStore((state) => state.setDrawerOpen);
  const flyToFacility = usePrimoStore((state) => state.flyToFacility);
  
  if (!facility) return null;
  
  const FacilityIcon = getFacilityIcon(facility.facilityType);
  const qualityChecks = validateFacility(facility);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-4 top-20 bottom-4 w-96 z-30 flex flex-col rounded-lg overflow-hidden"
          style={{
            backgroundColor: `${theme.colors.surface}F2`,
            border: `1px solid ${theme.colors.primary}20`,
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-start justify-between p-4 border-b"
            style={{ borderColor: `${theme.colors.primary}20` }}
          >
            <div className="flex items-start gap-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${theme.colors.primary}20` }}
              >
                <FacilityIcon size={24} color={theme.colors.primary} />
              </div>
              <div>
                <h2 className="font-bold text-lg" style={{ color: theme.colors.text }}>
                  {facility.name}
                </h2>
                <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                  {facility.city}, {facility.state}
                </p>
              </div>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1.5 rounded hover:bg-white/10 transition-colors"
            >
              <CloseIcon size={18} color={theme.colors.textSecondary} />
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Identity Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <StatusBadge status={facility.status} />
                <button
                  onClick={() => flyToFacility(facility)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: `${theme.colors.primary}20`,
                    color: theme.colors.primary,
                  }}
                >
                  <MapIcon size={12} />
                  Fly to Location
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs" style={{ color: theme.colors.textSecondary }}>
                    Brand
                  </span>
                  <div className="font-medium" style={{ color: theme.colors.text }}>
                    {facility.brand}
                  </div>
                </div>
                <div>
                  <span className="text-xs" style={{ color: theme.colors.textSecondary }}>
                    Type
                  </span>
                  <div className="font-medium" style={{ color: theme.colors.text }}>
                    {FACILITY_TYPE_LABELS[facility.facilityType]}
                  </div>
                </div>
              </div>
              
              {facility.address && (
                <div>
                  <span className="text-xs" style={{ color: theme.colors.textSecondary }}>
                    Address
                  </span>
                  <div className="font-medium" style={{ color: theme.colors.text }}>
                    {facility.address}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs" style={{ color: theme.colors.textSecondary }}>
                    Latitude
                  </span>
                  <div
                    className="font-mono text-sm"
                    style={{ color: theme.colors.text }}
                  >
                    {facility.lat.toFixed(4)}
                  </div>
                </div>
                <div>
                  <span className="text-xs" style={{ color: theme.colors.textSecondary }}>
                    Longitude
                  </span>
                  <div
                    className="font-mono text-sm"
                    style={{ color: theme.colors.text }}
                  >
                    {facility.lon.toFixed(4)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Counts Section */}
            <div className="space-y-3">
              <h3 className="font-semibold" style={{ color: theme.colors.text }}>
                Asset Counts
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <CountItem icon={TruckIcon} label="Trucks" value={facility.counts.trucks} />
                <CountItem icon={TrailerIcon} label="Trailers" value={facility.counts.trailers} />
                <CountItem icon={GuardShackIcon} label="Guard Shacks" value={facility.counts.guardShacks} />
                <CountItem icon={GateIcon} label="Gates" value={facility.counts.gates} />
                <CountItem icon={TrailerYardIcon} label="Trailer Yards" value={facility.counts.trailerYards} />
                <CountItem icon={DropDockIcon} label="Drop Docks" value={facility.counts.dropDocks} />
              </div>
            </div>
            
            {/* Lane Counts Section */}
            <div className="space-y-3">
              <h3 className="font-semibold" style={{ color: theme.colors.text }}>
                Lane Capacity
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <CountItem
                  icon={InboundLaneIcon}
                  label="Inbound Lanes"
                  value={facility.counts.inboundLanes}
                  color="#00B4FF"
                />
                <CountItem
                  icon={OutboundLaneIcon}
                  label="Outbound Lanes"
                  value={facility.counts.outboundLanes}
                  color="#FFB800"
                />
              </div>
            </div>
            
            {/* Notes */}
            {facility.notes && (
              <div className="space-y-2">
                <h3 className="font-semibold" style={{ color: theme.colors.text }}>
                  Notes
                </h3>
                <p
                  className="text-sm p-3 rounded-lg"
                  style={{
                    backgroundColor: `${theme.colors.background}60`,
                    color: theme.colors.textSecondary,
                  }}
                >
                  {facility.notes}
                </p>
              </div>
            )}
            
            {/* Data Quality */}
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: `${theme.colors.background}40` }}
            >
              <QualityIndicator checks={qualityChecks} />
            </div>
          </div>
          
          {/* Footer */}
          <div
            className="p-4 border-t"
            style={{ borderColor: `${theme.colors.primary}20` }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: theme.colors.textSecondary }}>
                ID: {facility.id}
              </span>
              {facility.updatedAt && (
                <span className="text-xs" style={{ color: theme.colors.textSecondary }}>
                  Updated: {new Date(facility.updatedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FacilityDrawer;

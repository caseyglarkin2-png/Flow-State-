// Multi-Facility Dashboard - Compare digital twins across facilities
// Side-by-side facility comparison

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrimoStore, selectFilteredFacilities } from '@/store/primoStore';
import { useDigitalTwinStore } from '@/store/digitalTwinStore';
import { CloseIcon } from '@/brand/icons';
import { Facility } from '@/types/primo';
import { cn } from '@/lib/utils';

export interface MultiFacilityDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const MetricBar: React.FC<{
  label: string;
  value: number;
  max: number;
  color: string;
  unit?: string;
}> = ({ label, value, max, color, unit = '' }) => {
  const theme = usePrimoStore((state) => state.theme);
  const percentage = Math.min(100, (value / max) * 100);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span style={{ color: theme.colors.textSecondary }}>{label}</span>
        <span style={{ color: theme.colors.text }}>{value}{unit}</span>
      </div>
      <div 
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: `${theme.colors.background}60` }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
};

const FacilityCard: React.FC<{
  facility: Facility;
  isSelected: boolean;
  onSelect: () => void;
  showTwinData?: boolean;
}> = ({ facility, isSelected, onSelect, showTwinData }) => {
  const theme = usePrimoStore((state) => state.theme);
  const twin = useDigitalTwinStore((state) => state.twins[facility.id]);
  const generateTwin = useDigitalTwinStore((state) => state.generateTwin);

  const statusColor = {
    Flow: '#00B4FF',
    Activating: '#FFB800',
    Chaos: '#FF2A00',
  }[facility.status] || '#888';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        'p-4 rounded-xl cursor-pointer transition-all',
        isSelected ? 'ring-2' : ''
      )}
      style={{
        backgroundColor: `${theme.colors.surface}80`,
        border: `1px solid ${isSelected ? theme.colors.primary : theme.colors.primary}20`,
        // @ts-ignore
        '--tw-ring-color': theme.colors.primary,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-medium text-sm" style={{ color: theme.colors.text }}>
            {facility.name}
          </h4>
          <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
            {facility.city}, {facility.state}
          </p>
        </div>
        <div 
          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
          style={{ 
            backgroundColor: `${statusColor}20`,
            color: statusColor,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor }} />
          {facility.status}
        </div>
      </div>

      {twin ? (
        <div className="space-y-2">
          <MetricBar
            label="Flow Score"
            value={twin.metrics.flowScore}
            max={100}
            color={twin.metrics.flowScore > 70 ? '#00FF88' : twin.metrics.flowScore > 40 ? '#FFB800' : '#FF2A00'}
          />
          <MetricBar
            label="Yard Utilization"
            value={twin.metrics.yardUtilization}
            max={100}
            color={twin.metrics.yardUtilization < 70 ? '#00B4FF' : twin.metrics.yardUtilization < 85 ? '#FFB800' : '#FF2A00'}
            unit="%"
          />
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color: theme.colors.primary }}>
                {twin.metrics.trailersInYard}
              </div>
              <div className="text-xs" style={{ color: theme.colors.textSecondary }}>Trailers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color: theme.colors.text }}>
                {twin.metrics.activeLoadingDocks}
              </div>
              <div className="text-xs" style={{ color: theme.colors.textSecondary }}>Active</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color: theme.colors.text }}>
                {twin.metrics.averageDwellTime}m
              </div>
              <div className="text-xs" style={{ color: theme.colors.textSecondary }}>Dwell</div>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            generateTwin(facility);
          }}
          className="w-full py-2 rounded-lg text-xs font-medium transition-all hover:opacity-80"
          style={{
            backgroundColor: `${theme.colors.primary}20`,
            color: theme.colors.primary,
          }}
        >
          Generate Twin
        </button>
      )}
    </motion.div>
  );
};

export const MultiFacilityDashboard: React.FC<MultiFacilityDashboardProps> = ({ isOpen, onClose }) => {
  const theme = usePrimoStore((state) => state.theme);
  const facilities = usePrimoStore(selectFilteredFacilities);
  const twins = useDigitalTwinStore((state) => state.twins);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  const toggleFacility = (id: string) => {
    setSelectedFacilities(prev => 
      prev.includes(id) 
        ? prev.filter(f => f !== id)
        : prev.length < 4 
          ? [...prev, id]
          : prev
    );
  };

  const selectedTwins = selectedFacilities
    .map(id => ({ facility: facilities.find(f => f.id === id), twin: twins[id] }))
    .filter((item): item is { facility: Facility; twin: typeof twins[string] } => 
      item.facility !== undefined && item.twin !== undefined
    );

  // Calculate network-wide stats
  const networkStats = Object.values(twins).reduce(
    (acc, twin) => ({
      totalTrailers: acc.totalTrailers + (twin?.metrics.trailersInYard || 0),
      avgFlowScore: acc.avgFlowScore + (twin?.metrics.flowScore || 0),
      totalTwins: acc.totalTwins + 1,
    }),
    { totalTrailers: 0, avgFlowScore: 0, totalTwins: 0 }
  );

  const avgFlow = networkStats.totalTwins > 0 
    ? Math.round(networkStats.avgFlowScore / networkStats.totalTwins) 
    : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-6xl max-h-[90vh] rounded-xl overflow-hidden flex flex-col"
            style={{
              backgroundColor: theme.colors.surface,
              border: `1px solid ${theme.colors.primary}30`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: `${theme.colors.primary}20` }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme.colors.primary}40, ${theme.colors.alert}20)`,
                  }}
                >
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: theme.colors.text }}>
                    Multi-Facility Dashboard
                  </h3>
                  <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                    Compare digital twins across your network
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
                    {Object.keys(twins).length}
                  </div>
                  <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
                    Active Twins
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                    {networkStats.totalTrailers}
                  </div>
                  <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
                    Network Trailers
                  </div>
                </div>
                <div className="text-center">
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: avgFlow > 70 ? '#00FF88' : avgFlow > 40 ? '#FFB800' : '#FF2A00' }}
                  >
                    {avgFlow}
                  </div>
                  <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
                    Avg Flow Score
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <CloseIcon size={20} color={theme.colors.textSecondary} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden flex">
              {/* Facility List */}
              <div 
                className="w-80 border-r overflow-y-auto p-4 space-y-3"
                style={{ borderColor: `${theme.colors.primary}10` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: theme.colors.text }}>
                    Facilities ({facilities.length})
                  </span>
                  <span className="text-xs" style={{ color: theme.colors.textSecondary }}>
                    Select up to 4
                  </span>
                </div>
                {facilities.slice(0, 20).map(facility => (
                  <FacilityCard
                    key={facility.id}
                    facility={facility}
                    isSelected={selectedFacilities.includes(facility.id)}
                    onSelect={() => toggleFacility(facility.id)}
                  />
                ))}
              </div>

              {/* Comparison View */}
              <div className="flex-1 p-6 overflow-y-auto">
                {selectedTwins.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-6xl mb-4 block">📊</span>
                      <h4 className="text-lg font-medium mb-2" style={{ color: theme.colors.text }}>
                        Select Facilities to Compare
                      </h4>
                      <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                        Click on facilities with digital twins to add them to comparison
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Comparison Header */}
                    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedTwins.length}, 1fr)` }}>
                      {selectedTwins.map(({ facility, twin }) => (
                        <div 
                          key={facility.id}
                          className="p-4 rounded-xl text-center"
                          style={{ backgroundColor: `${theme.colors.background}60` }}
                        >
                          <h4 className="font-bold" style={{ color: theme.colors.text }}>
                            {facility.name}
                          </h4>
                          <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
                            {facility.city}, {facility.state}
                          </p>
                          <div 
                            className="text-4xl font-bold mt-3"
                            style={{ 
                              color: twin.metrics.flowScore > 70 ? '#00FF88' : 
                                     twin.metrics.flowScore > 40 ? '#FFB800' : '#FF2A00' 
                            }}
                          >
                            {twin.metrics.flowScore}
                          </div>
                          <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
                            Flow Score
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Metrics Comparison */}
                    {[
                      { label: 'Yard Utilization', key: 'yardUtilization', max: 100, unit: '%' },
                      { label: 'Trailers in Yard', key: 'trailersInYard', max: 200, unit: '' },
                      { label: 'Active Docks', key: 'activeLoadingDocks', max: 30, unit: '' },
                      { label: 'Avg Dwell Time', key: 'averageDwellTime', max: 200, unit: ' min' },
                      { label: 'Predicted Congestion', key: 'predictedCongestion', max: 100, unit: '%' },
                    ].map(metric => (
                      <div key={metric.label} className="space-y-2">
                        <h5 className="text-sm font-medium" style={{ color: theme.colors.text }}>
                          {metric.label}
                        </h5>
                        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedTwins.length}, 1fr)` }}>
                          {selectedTwins.map(({ facility, twin }) => {
                            const value = twin.metrics[metric.key as keyof typeof twin.metrics] as number;
                            return (
                              <div key={facility.id}>
                                <div className="flex justify-between text-xs mb-1">
                                  <span style={{ color: theme.colors.textSecondary }}>
                                    {facility.name.split(' ')[0]}
                                  </span>
                                  <span style={{ color: theme.colors.text }}>
                                    {value}{metric.unit}
                                  </span>
                                </div>
                                <div 
                                  className="h-3 rounded-full overflow-hidden"
                                  style={{ backgroundColor: `${theme.colors.background}60` }}
                                >
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100, (value / metric.max) * 100)}%` }}
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: theme.colors.primary }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MultiFacilityDashboard;

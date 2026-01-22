'use client';

import React from 'react';
import { Facility, ARCHETYPE_LABELS, ARCHETYPE_COLORS } from './types';

interface DetailPanelProps {
  facility: Facility;
  onClose: () => void;
}

/**
 * Detail panel shown when a facility is clicked.
 * Displays comprehensive facility information and actions.
 */
export default function DetailPanel({ facility, onClose }: DetailPanelProps) {
  const color = ARCHETYPE_COLORS[facility.archetype];
  const label = ARCHETYPE_LABELS[facility.archetype];

  return (
    <div
      className="absolute right-4 top-4 bottom-4 w-80 bg-carbon border border-neon/30 rounded-xl shadow-2xl overflow-hidden flex flex-col z-50"
      role="dialog"
      aria-label={`Details for ${facility.name}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-neon/20 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full flex-shrink-0"
            style={{ backgroundColor: color }}
          />
          <div>
            <h3 className="font-bold text-white text-lg">{facility.name}</h3>
            <p className="text-sm text-steel">{label}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-steel hover:text-white"
          aria-label="Close panel"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Location */}
        {facility.location && (
          <div className="rounded-lg bg-void/50 p-3">
            <div className="text-xs text-steel uppercase tracking-wide mb-1">
              Location
            </div>
            <div className="text-white flex items-center gap-2">
              <span>📍</span>
              {facility.location}
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        {facility.metrics && (
          <div className="space-y-2">
            <div className="text-xs text-steel uppercase tracking-wide">
              Metrics
            </div>
            <div className="grid grid-cols-1 gap-2">
              {facility.metrics.movesPerDay && (
                <MetricRow
                  label="Moves per Day"
                  value={facility.metrics.movesPerDay.toLocaleString()}
                  color={color}
                />
              )}
              {facility.metrics.dwellTime && (
                <MetricRow
                  label="Avg Dwell Time"
                  value={`${facility.metrics.dwellTime} min`}
                  color={color}
                />
              )}
              {facility.metrics.drivers && (
                <MetricRow
                  label="Active Drivers"
                  value={facility.metrics.drivers.toLocaleString()}
                  color={color}
                />
              )}
            </div>
          </div>
        )}

        {/* Archetype Info */}
        <div className="rounded-lg border border-neon/10 p-3">
          <div className="text-xs text-steel uppercase tracking-wide mb-2">
            Facility Type
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-white font-medium">{label}</span>
          </div>
          <p className="text-sm text-steel/80">
            {getArchetypeDescription(facility.archetype)}
          </p>
        </div>

        {/* Network Connections (placeholder) */}
        <div className="rounded-lg border border-steel/20 p-3">
          <div className="text-xs text-steel uppercase tracking-wide mb-2">
            Network Connections
          </div>
          <div className="text-sm text-steel/70">
            Connected to {Math.floor(Math.random() * 5) + 2} other facilities in the YardFlow network.
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-neon/20 space-y-2">
        <button
          className="w-full py-2 px-4 rounded-lg bg-neon text-void font-semibold hover:bg-neon/90 transition-colors"
          onClick={() => {
            // Future: Navigate to facility detail page
          }}
        >
          View Full Details
        </button>
        <button
          className="w-full py-2 px-4 rounded-lg border border-steel/30 text-steel hover:text-white hover:border-neon/40 transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function MetricRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-void/50 p-3">
      <span className="text-sm text-steel">{label}</span>
      <span className="font-mono font-semibold" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

function getArchetypeDescription(archetype: Facility['archetype']): string {
  switch (archetype) {
    case 'gated':
      return 'Secure facility with controlled access points. Ideal for high-value cargo and compliance-heavy operations.';
    case 'open':
      return 'Flexible yard with multiple entry points. Optimized for high-volume throughput and quick turnaround.';
    case 'cross-dock':
      return 'Transload facility designed for rapid cargo transfer between inbound and outbound vehicles.';
    case 'manufacturing':
      return 'Production-integrated yard supporting just-in-time inventory and manufacturing workflows.';
    default:
      return 'Standard facility in the YardFlow network.';
  }
}

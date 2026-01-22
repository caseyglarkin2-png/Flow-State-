'use client';

import React from 'react';
import { Facility, ARCHETYPE_LABELS, ARCHETYPE_COLORS } from './types';

interface TooltipProps {
  facility: Facility;
  x: number;
  y: number;
}

/**
 * Hover tooltip showing facility details.
 * Positioned near the cursor, offset to avoid overlap.
 */
export default function Tooltip({ facility, x, y }: TooltipProps) {
  const color = ARCHETYPE_COLORS[facility.archetype];
  const label = ARCHETYPE_LABELS[facility.archetype];

  // Offset tooltip from cursor
  const offsetX = 15;
  const offsetY = 15;

  return (
    <div
      className="absolute pointer-events-none z-50 bg-carbon border border-neon/30 rounded-lg p-3 shadow-lg min-w-[180px]"
      style={{
        left: x + offsetX,
        top: y + offsetY,
      }}
      role="tooltip"
      aria-live="polite"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="font-semibold text-white">{facility.name}</span>
      </div>

      {/* Type */}
      <div className="text-sm text-steel mb-2">
        {label}
      </div>

      {/* Location if available */}
      {facility.location && (
        <div className="text-xs text-steel/70 mb-2">
          📍 {facility.location}
        </div>
      )}

      {/* Metrics if available */}
      {facility.metrics && (
        <div className="border-t border-steel/20 pt-2 mt-2 space-y-1">
          {facility.metrics.movesPerDay && (
            <div className="flex justify-between text-xs">
              <span className="text-steel">Moves/Day</span>
              <span className="text-neon font-mono">{facility.metrics.movesPerDay}</span>
            </div>
          )}
          {facility.metrics.dwellTime && (
            <div className="flex justify-between text-xs">
              <span className="text-steel">Avg Dwell</span>
              <span className="text-neon font-mono">{facility.metrics.dwellTime}min</span>
            </div>
          )}
          {facility.metrics.drivers && (
            <div className="flex justify-between text-xs">
              <span className="text-steel">Drivers</span>
              <span className="text-neon font-mono">{facility.metrics.drivers}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

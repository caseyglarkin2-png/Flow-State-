'use client';

import React from 'react';
import { Connection, Facility, ARCHETYPE_COLORS } from './types';

interface ConnectionsProps {
  connections: Connection[];
  facilities: Facility[];
}

/**
 * Render connection lines between facilities in the network.
 */
export default function Connections({ connections, facilities }: ConnectionsProps) {
  // Create a lookup map for facilities by ID
  const facilityMap = new Map(facilities.map(f => [f.id, f]));

  return (
    <g className="connections">
      {connections.map((conn, index) => {
        const from = facilityMap.get(conn.from);
        const to = facilityMap.get(conn.to);

        // Skip if either facility not found
        if (!from || !to) return null;

        // Determine line color based on connection type
        const getStrokeColor = () => {
          switch (conn.type) {
            case 'primary':
              return ARCHETYPE_COLORS.gated; // neon
            case 'secondary':
              return '#888888'; // steel
            case 'planned':
              return '#888888'; // dashed steel
            default:
              return 'rgba(0,255,194,0.3)'; // default neon with opacity
          }
        };

        // Scale stroke width by strength (1-10 → 1-4px)
        const strokeWidth = Math.max(1, Math.min(4, conn.strength * 0.4));

        return (
          <line
            key={`${conn.from}-${conn.to}-${index}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={getStrokeColor()}
            strokeWidth={strokeWidth}
            strokeDasharray={conn.type === 'planned' ? '5,5' : undefined}
            opacity={0.6}
            className="transition-opacity hover:opacity-100"
          />
        );
      })}
    </g>
  );
}

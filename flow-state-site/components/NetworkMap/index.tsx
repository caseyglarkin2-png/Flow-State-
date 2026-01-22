'use client';

import React, { useState, useCallback } from 'react';
import { 
  NetworkMapProps, 
  Facility, 
  ARCHETYPE_COLORS 
} from './types';
import FacilityNode from './FacilityNode';
import Connections from './Connections';
import Tooltip from './Tooltip';

/**
 * Interactive SVG visualization of a facility network.
 * 
 * Features:
 * - Facility nodes with archetype-based colors
 * - Connection lines between related facilities
 * - Hover tooltips with facility details
 * - Click interactions for detail view
 * - Keyboard accessible
 * - Responsive scaling
 * 
 * @example
 * ```tsx
 * <NetworkMap 
 *   facilities={facilities} 
 *   connections={connections}
 *   onFacilityClick={(f) => console.log('Selected:', f.name)}
 * />
 * ```
 */
export default function NetworkMap({
  facilities,
  connections = [],
  onFacilityClick,
  onFacilityHover,
  className = '',
  showTooltips = true,
}: NetworkMapProps) {
  const [hoveredFacility, setHoveredFacility] = useState<Facility | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleFacilityHover = useCallback((facility: Facility | null) => {
    setHoveredFacility(facility);
    onFacilityHover?.(facility);
  }, [onFacilityHover]);

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 800 600"
        role="img"
        aria-label="Facility network map showing connected locations"
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(0,255,194,0.1)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Connection lines (render first, behind nodes) */}
        <Connections 
          connections={connections} 
          facilities={facilities} 
        />

        {/* Facility nodes */}
        <g className="facility-nodes">
          {facilities.map((facility) => (
            <FacilityNode
              key={facility.id}
              facility={facility}
              isHovered={hoveredFacility?.id === facility.id}
              onClick={() => onFacilityClick?.(facility)}
              onHover={(isHovered) => handleFacilityHover(isHovered ? facility : null)}
            />
          ))}
        </g>
      </svg>

      {/* Tooltip overlay */}
      {showTooltips && hoveredFacility && (
        <Tooltip
          facility={hoveredFacility}
          x={mousePosition.x}
          y={mousePosition.y}
        />
      )}

      {/* Screen reader legend */}
      <div className="sr-only">
        <h3>Network Legend</h3>
        <ul>
          {Object.entries(ARCHETYPE_COLORS).map(([type, color]) => (
            <li key={type}>{type}: {color}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

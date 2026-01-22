'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
  NetworkMapProps, 
  Facility, 
  ARCHETYPE_COLORS 
} from './types';
import FacilityNode from './FacilityNode';
import Connections from './Connections';
import Tooltip from './Tooltip';
import DetailPanel from './DetailPanel';

/**
 * Interactive SVG visualization of a facility network.
 * 
 * Features:
 * - Facility nodes with archetype-based colors
 * - Connection lines between related facilities
 * - Hover tooltips with facility details
 * - Click interactions for detail panel
 * - Keyboard accessible (Tab + Enter navigation)
 * - Responsive scaling with ResizeObserver
 * 
 * @example
 * ```tsx
 * <NetworkMap 
 *   facilities={facilities} 
 *   connections={connections}
 *   onFacilityClick={(f) => console.log('Selected:', f.name)}
 *   showDetailPanel={true}
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
  showDetailPanel = true,
}: NetworkMapProps & { showDetailPanel?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredFacility, setHoveredFacility] = useState<Facility | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Responsive scaling with ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        // Maintain 4:3 aspect ratio
        const height = width * 0.75;
        setDimensions({ width: Math.max(400, width), height: Math.max(300, height) });
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

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

  const handleFacilityClick = useCallback((facility: Facility) => {
    setSelectedFacility(facility);
    onFacilityClick?.(facility);
  }, [onFacilityClick]);

  const handleClosePanel = useCallback(() => {
    setSelectedFacility(null);
  }, []);

  // Keyboard navigation: Escape to close panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedFacility) {
        handleClosePanel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedFacility, handleClosePanel]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        role="img"
        aria-label="Facility network map showing connected locations"
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
        style={{ minHeight: 300 }}
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
              isSelected={selectedFacility?.id === facility.id}
              onClick={() => handleFacilityClick(facility)}
              onHover={(isHovered) => handleFacilityHover(isHovered ? facility : null)}
            />
          ))}
        </g>
      </svg>

      {/* Tooltip overlay (only when not showing detail panel) */}
      {showTooltips && hoveredFacility && !selectedFacility && (
        <Tooltip
          facility={hoveredFacility}
          x={mousePosition.x}
          y={mousePosition.y}
        />
      )}

      {/* Detail panel for selected facility */}
      {showDetailPanel && selectedFacility && (
        <DetailPanel
          facility={selectedFacility}
          onClose={handleClosePanel}
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

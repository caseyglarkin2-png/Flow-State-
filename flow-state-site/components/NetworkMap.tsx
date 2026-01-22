'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useSSRSafeReducedMotion } from '@/lib/ssr-safe-motion';

/**
 * NetworkMap - Interactive SVG network visualization
 * 
 * Renders facility nodes with connections showing network effect.
 * Supports hover interactions and responsive sizing.
 */

export interface FacilityNode {
  id: string;
  name: string;
  x: number; // 0-100 percentage position
  y: number; // 0-100 percentage position
  size?: 'sm' | 'md' | 'lg';
  type?: 'hub' | 'spoke' | 'origin' | 'destination';
  metrics?: {
    turnsPerDay?: number;
    dwellTime?: number;
    efficiency?: number;
  };
}

export interface NetworkConnection {
  from: string;
  to: string;
  strength?: number; // 0-1 connection strength/opacity
  type?: 'primary' | 'secondary' | 'active' | 'planned';
}

export interface NetworkMapProps {
  facilities: FacilityNode[];
  connections?: NetworkConnection[];
  width?: number;
  height?: number;
  className?: string;
  showLabels?: boolean;
  interactive?: boolean;
  onNodeClick?: (node: FacilityNode) => void;
  onNodeHover?: (node: FacilityNode | null) => void;
}

const NODE_SIZES = {
  sm: 8,
  md: 12,
  lg: 16,
};

const NODE_COLORS = {
  hub: '#00FFC2', // neon
  spoke: '#94A3B8', // steel
  origin: '#00FFC2',
  destination: '#FF2A00', // ember
};

export default function NetworkMap({
  facilities,
  connections = [],
  width = 400,
  height = 300,
  className = '',
  showLabels = true,
  interactive = true,
  onNodeClick,
  onNodeHover,
}: NetworkMapProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const prefersReducedMotion = useSSRSafeReducedMotion();

  // Convert percentage positions to pixel positions
  const getPixelPos = useCallback(
    (x: number, y: number) => ({
      x: (x / 100) * width,
      y: (y / 100) * height,
    }),
    [width, height]
  );

  // Generate auto-connections if none provided
  const effectiveConnections = useMemo(() => {
    if (connections.length > 0) return connections;
    
    // Auto-generate connections between nearby facilities
    const autoConnections: NetworkConnection[] = [];
    for (let i = 0; i < facilities.length; i++) {
      for (let j = i + 1; j < facilities.length; j++) {
        const dist = Math.sqrt(
          Math.pow(facilities[i].x - facilities[j].x, 2) +
          Math.pow(facilities[i].y - facilities[j].y, 2)
        );
        // Connect if within 40% distance
        if (dist < 40) {
          autoConnections.push({
            from: facilities[i].id,
            to: facilities[j].id,
            strength: Math.max(0.2, 1 - dist / 40),
          });
        }
      }
    }
    return autoConnections;
  }, [connections, facilities]);

  const handleNodeHover = useCallback(
    (node: FacilityNode | null, event?: React.MouseEvent) => {
      if (!interactive) return;
      setHoveredNode(node?.id ?? null);
      if (event && node) {
        setTooltipPos({ x: event.clientX, y: event.clientY });
      } else {
        setTooltipPos(null);
      }
      onNodeHover?.(node);
    },
    [interactive, onNodeHover]
  );

  const handleNodeClick = useCallback(
    (node: FacilityNode) => {
      if (!interactive) return;
      onNodeClick?.(node);
    },
    [interactive, onNodeClick]
  );

  const hoveredFacility = useMemo(
    () => facilities.find((f) => f.id === hoveredNode),
    [facilities, hoveredNode]
  );

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        role="img"
        aria-label="Network map showing facility connections"
      >
        {/* Background grid (subtle) */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(148, 163, 184, 0.1)"
              strokeWidth="0.5"
            />
          </pattern>
          {/* Glow filter for active nodes */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Connections */}
        <g className="connections">
          {effectiveConnections.map((conn, idx) => {
            const fromNode = facilities.find((f) => f.id === conn.from);
            const toNode = facilities.find((f) => f.id === conn.to);
            if (!fromNode || !toNode) return null;

            const from = getPixelPos(fromNode.x, fromNode.y);
            const to = getPixelPos(toNode.x, toNode.y);
            const isHighlighted = hoveredNode === conn.from || hoveredNode === conn.to;
            const opacity = isHighlighted ? 0.8 : (conn.strength ?? 0.3);

            return (
              <line
                key={`${conn.from}-${conn.to}-${idx}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isHighlighted ? '#00FFC2' : '#94A3B8'}
                strokeWidth={isHighlighted ? 2 : 1}
                strokeOpacity={opacity}
                className={prefersReducedMotion ? '' : 'transition-all duration-200'}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g className="nodes">
          {facilities.map((facility) => {
            const pos = getPixelPos(facility.x, facility.y);
            const size = NODE_SIZES[facility.size ?? 'md'];
            const color = NODE_COLORS[facility.type ?? 'spoke'];
            const isHovered = hoveredNode === facility.id;

            return (
              <g
                key={facility.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                className={interactive ? 'cursor-pointer' : ''}
                onClick={() => handleNodeClick(facility)}
                onMouseEnter={(e) => handleNodeHover(facility, e)}
                onMouseLeave={() => handleNodeHover(null)}
                role="button"
                aria-label={`${facility.name}${facility.metrics?.turnsPerDay ? `: ${facility.metrics.turnsPerDay} turns/day` : ''}`}
                tabIndex={interactive ? 0 : undefined}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleNodeClick(facility);
                  }
                }}
              >
                {/* Outer glow ring on hover */}
                {isHovered && !prefersReducedMotion && (
                  <circle
                    r={size + 6}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    opacity="0.3"
                    className="animate-ping"
                  />
                )}
                {/* Main node */}
                <circle
                  r={isHovered ? size + 2 : size}
                  fill={color}
                  stroke="#050505"
                  strokeWidth="2"
                  filter={isHovered ? 'url(#glow)' : undefined}
                  className={prefersReducedMotion ? '' : 'transition-all duration-150'}
                />
                {/* Inner dot for hubs */}
                {facility.type === 'hub' && (
                  <circle r={size / 3} fill="#050505" />
                )}
              </g>
            );
          })}
        </g>

        {/* Labels */}
        {showLabels && (
          <g className="labels">
            {facilities.map((facility) => {
              const pos = getPixelPos(facility.x, facility.y);
              const size = NODE_SIZES[facility.size ?? 'md'];
              return (
                <text
                  key={`label-${facility.id}`}
                  x={pos.x}
                  y={pos.y + size + 14}
                  textAnchor="middle"
                  className="fill-steel text-[10px] font-medium pointer-events-none"
                >
                  {facility.name}
                </text>
              );
            })}
          </g>
        )}
      </svg>

      {/* Tooltip */}
      {hoveredFacility && tooltipPos && (
        <div
          className="fixed z-50 px-3 py-2 bg-carbon border border-neon/30 rounded-lg shadow-lg pointer-events-none"
          style={{
            left: tooltipPos.x + 10,
            top: tooltipPos.y - 10,
          }}
        >
          <p className="font-semibold text-neon text-sm">{hoveredFacility.name}</p>
          {hoveredFacility.metrics && (
            <div className="text-xs text-steel mt-1 space-y-0.5">
              {hoveredFacility.metrics.turnsPerDay && (
                <p>{hoveredFacility.metrics.turnsPerDay} turns/day</p>
              )}
              {hoveredFacility.metrics.dwellTime && (
                <p>{hoveredFacility.metrics.dwellTime}min avg dwell</p>
              )}
              {hoveredFacility.metrics.efficiency && (
                <p>{hoveredFacility.metrics.efficiency}% efficiency</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

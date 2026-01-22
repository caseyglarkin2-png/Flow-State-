'use client';

import React from 'react';
import { Facility, ARCHETYPE_COLORS, ARCHETYPE_LABELS } from './types';

interface FacilityNodeProps {
  facility: Facility;
  isHovered: boolean;
  onClick: () => void;
  onHover: (isHovered: boolean) => void;
}

/**
 * A single facility node in the network map.
 * Renders as an SVG group with circle and label.
 */
export default function FacilityNode({
  facility,
  isHovered,
  onClick,
  onHover,
}: FacilityNodeProps) {
  const color = ARCHETYPE_COLORS[facility.archetype];
  const label = ARCHETYPE_LABELS[facility.archetype];
  
  return (
    <g
      transform={`translate(${facility.x}, ${facility.y})`}
      className="cursor-pointer transition-transform"
      style={{ transform: isHovered ? 'scale(1.1)' : undefined }}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      tabIndex={0}
      role="button"
      aria-label={`${facility.name}, ${label}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Glow effect on hover */}
      {isHovered && (
        <circle
          r={28}
          fill="none"
          stroke={color}
          strokeWidth={2}
          opacity={0.4}
          className="animate-pulse"
        />
      )}
      
      {/* Main node circle */}
      <circle
        r={20}
        fill={color}
        opacity={isHovered ? 1 : 0.8}
        className="transition-opacity"
      />
      
      {/* Inner highlight */}
      <circle
        r={8}
        fill="white"
        opacity={0.3}
        cx={-5}
        cy={-5}
      />
      
      {/* Facility name label */}
      <text
        y={35}
        textAnchor="middle"
        fill="white"
        fontSize={12}
        fontWeight={500}
        className="pointer-events-none"
      >
        {facility.name}
      </text>
    </g>
  );
}

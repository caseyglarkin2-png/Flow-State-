// YardFlow by FreightRoll Brand Logo System
// 4 modular logo variants: Mark, Wordmark, Horizontal Lockup, Stacked Lockup

import React from 'react';

export interface LogoProps {
  size?: number;
  color?: string;
  secondaryColor?: string;
  className?: string;
  appName?: string;
}

// The YardFlow by FreightRoll Mark - Abstract flowing network symbol
export const FlowStateMark: React.FC<LogoProps> = ({
  size = 32,
  color = '#00B4FF',
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
  >
    {/* Outer ring representing the network boundary */}
    <circle
      cx="24"
      cy="24"
      r="20"
      stroke={color}
      strokeWidth="2"
      strokeOpacity="0.3"
    />
    
    {/* Central node */}
    <circle
      cx="24"
      cy="24"
      r="4"
      fill={color}
    />
    
    {/* Satellite nodes */}
    <circle cx="24" cy="10" r="2.5" fill={color} />
    <circle cx="24" cy="38" r="2.5" fill={color} />
    <circle cx="10" cy="24" r="2.5" fill={color} />
    <circle cx="38" cy="24" r="2.5" fill={color} />
    <circle cx="14" cy="14" r="2" fill={color} fillOpacity="0.7" />
    <circle cx="34" cy="14" r="2" fill={color} fillOpacity="0.7" />
    <circle cx="14" cy="34" r="2" fill={color} fillOpacity="0.7" />
    <circle cx="34" cy="34" r="2" fill={color} fillOpacity="0.7" />
    
    {/* Flow lines connecting nodes */}
    <path
      d="M24 12.5v7.5M24 28v7.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12.5 24h7.5M28 24h7.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M15.5 15.5l5.5 5.5M27 27l5.5 5.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />
    <path
      d="M32.5 15.5l-5.5 5.5M21 27l-5.5 5.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />
  </svg>
);

// Wordmark only - "YardFlow by FreightRoll" text
export const FlowStateWordmark: React.FC<LogoProps> = ({
  size = 32,
  color = '#00B4FF',
  secondaryColor = '#FFFFFF',
  className,
  appName = 'YardFlow',
}) => {
  const words = appName?.split(' ') || ['Flow', 'State'];
  const fontSize = size * 0.5;
  
  return (
    <svg
      width={size * 4}
      height={size}
      viewBox="0 0 192 48"
      fill="none"
      className={className}
    >
      <text
        x="0"
        y="34"
        fontFamily="Inter, sans-serif"
        fontSize={fontSize}
        fontWeight="700"
        letterSpacing="-0.02em"
      >
        <tspan fill={color}>{words[0]}</tspan>
        <tspan fill={secondaryColor}> {words[1] || ''}</tspan>
      </text>
    </svg>
  );
};

// Horizontal Lockup - Mark + Wordmark side by side
export const FlowStateHorizontal: React.FC<LogoProps> = ({
  size = 32,
  color = '#00B4FF',
  secondaryColor = '#FFFFFF',
  className,
  appName = 'YardFlow',
}) => {
  const words = appName?.split(' ') || ['Flow', 'State'];
  const fontSize = size * 0.5;
  
  return (
    <svg
      width={size * 6}
      height={size}
      viewBox="0 0 288 48"
      fill="none"
      className={className}
    >
      {/* Mark */}
      <g transform="translate(0, 0)">
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke={color}
          strokeWidth="2"
          strokeOpacity="0.3"
        />
        <circle cx="24" cy="24" r="4" fill={color} />
        <circle cx="24" cy="10" r="2.5" fill={color} />
        <circle cx="24" cy="38" r="2.5" fill={color} />
        <circle cx="10" cy="24" r="2.5" fill={color} />
        <circle cx="38" cy="24" r="2.5" fill={color} />
        <circle cx="14" cy="14" r="2" fill={color} fillOpacity="0.7" />
        <circle cx="34" cy="14" r="2" fill={color} fillOpacity="0.7" />
        <circle cx="14" cy="34" r="2" fill={color} fillOpacity="0.7" />
        <circle cx="34" cy="34" r="2" fill={color} fillOpacity="0.7" />
        <path
          d="M24 12.5v7.5M24 28v7.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12.5 24h7.5M28 24h7.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M15.5 15.5l5.5 5.5M27 27l5.5 5.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
        <path
          d="M32.5 15.5l-5.5 5.5M21 27l-5.5 5.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
      </g>
      
      {/* Wordmark */}
      <text
        x="56"
        y="32"
        fontFamily="Inter, sans-serif"
        fontSize={fontSize}
        fontWeight="700"
        letterSpacing="-0.02em"
      >
        <tspan fill={color}>{words[0]}</tspan>
        <tspan fill={secondaryColor}> {words[1] || ''}</tspan>
      </text>
    </svg>
  );
};

// Stacked Lockup - Mark above Wordmark
export const FlowStateStacked: React.FC<LogoProps> = ({
  size = 32,
  color = '#00B4FF',
  secondaryColor = '#FFFFFF',
  className,
  appName = 'YardFlow',
}) => {
  const words = appName?.split(' ') || ['Flow', 'State'];
  const fontSize = size * 0.35;
  
  return (
    <svg
      width={size * 3}
      height={size * 2}
      viewBox="0 0 144 96"
      fill="none"
      className={className}
    >
      {/* Mark centered at top */}
      <g transform="translate(48, 0)">
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke={color}
          strokeWidth="2"
          strokeOpacity="0.3"
        />
        <circle cx="24" cy="24" r="4" fill={color} />
        <circle cx="24" cy="10" r="2.5" fill={color} />
        <circle cx="24" cy="38" r="2.5" fill={color} />
        <circle cx="10" cy="24" r="2.5" fill={color} />
        <circle cx="38" cy="24" r="2.5" fill={color} />
        <circle cx="14" cy="14" r="2" fill={color} fillOpacity="0.7" />
        <circle cx="34" cy="14" r="2" fill={color} fillOpacity="0.7" />
        <circle cx="14" cy="34" r="2" fill={color} fillOpacity="0.7" />
        <circle cx="34" cy="34" r="2" fill={color} fillOpacity="0.7" />
        <path
          d="M24 12.5v7.5M24 28v7.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12.5 24h7.5M28 24h7.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M15.5 15.5l5.5 5.5M27 27l5.5 5.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
        <path
          d="M32.5 15.5l-5.5 5.5M21 27l-5.5 5.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
      </g>
      
      {/* Wordmark centered below */}
      <text
        x="72"
        y="80"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize={fontSize}
        fontWeight="700"
        letterSpacing="-0.02em"
      >
        <tspan fill={color}>{words[0]}</tspan>
        <tspan fill={secondaryColor}> {words[1] || ''}</tspan>
      </text>
    </svg>
  );
};

// Logo variant type
export type LogoVariant = 'mark' | 'wordmark' | 'horizontal' | 'stacked';

// Logo map for variant selection
export const logoMap: Record<LogoVariant, React.FC<LogoProps>> = {
  mark: FlowStateMark,
  wordmark: FlowStateWordmark,
  horizontal: FlowStateHorizontal,
  stacked: FlowStateStacked,
};

// Logo variant labels
export const logoVariantLabels: Record<LogoVariant, string> = {
  mark: 'Mark Only',
  wordmark: 'Wordmark Only',
  horizontal: 'Horizontal Lockup',
  stacked: 'Stacked Lockup',
};

// Get logo component by variant
export function getLogo(variant: LogoVariant): React.FC<LogoProps> {
  return logoMap[variant] || FlowStateMark;
}

// Default export - the primary horizontal lockup
export default FlowStateHorizontal;

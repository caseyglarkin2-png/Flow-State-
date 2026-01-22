import React from 'react';

export interface ProtocolIconProps {
  size?: 24 | 32 | 48 | 64;
  color?: string;
  className?: string;
  'aria-label'?: string;
}

const defaultProps = {
  size: 48 as const,
  color: '#00B4FF',
};

/**
 * ProtocolGuardIcon - Crosshair + Concentric Rings + Checkmark
 * Represents precision carrier identity verification at the gate
 * Design: Geometric targeting aesthetic (no skeuomorphic shields/locks)
 */
export const ProtocolGuardIcon: React.FC<ProtocolIconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  className,
  'aria-label': ariaLabel = 'Digital Guard - Verify carrier identity at the gate',
}) => {
  const strokeScale = size / 48;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      {/* Outer targeting ring */}
      <circle
        cx="24"
        cy="24"
        r="18"
        stroke={color}
        strokeWidth={1.5 * strokeScale}
      />
      {/* Inner confidence ring */}
      <circle
        cx="24"
        cy="24"
        r="10"
        stroke={color}
        strokeWidth={1.5 * strokeScale}
        opacity="0.4"
      />
      {/* Crosshair lines */}
      <path
        d="M24 4v8M24 36v8M4 24h8M36 24h8"
        stroke={color}
        strokeWidth={1.5 * strokeScale}
        strokeLinecap="round"
      />
      {/* Verification checkmark */}
      <path
        d="M18 24l4 4 8-8"
        stroke={color}
        strokeWidth={2.5 * strokeScale}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * ProtocolCommsIcon - Bidirectional Pulse + Central Hub
 * Represents real-time two-way messaging between yard and drivers
 * Design: Signal waves converging to central hub (no chat bubbles)
 */
export const ProtocolCommsIcon: React.FC<ProtocolIconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  className,
  'aria-label': ariaLabel = 'Digital Comms - Real-time two-way messaging',
}) => {
  const strokeScale = size / 48;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      {/* Left signal pulse (incoming) - outer */}
      <path
        d="M8 16a12 12 0 0 1 0 16"
        stroke={color}
        strokeWidth={1.5 * strokeScale}
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Left signal pulse (incoming) - inner */}
      <path
        d="M14 20a6 6 0 0 1 0 8"
        stroke={color}
        strokeWidth={1.5 * strokeScale}
        strokeLinecap="round"
      />
      {/* Right signal pulse (outgoing) - outer */}
      <path
        d="M40 16a12 12 0 0 0 0 16"
        stroke={color}
        strokeWidth={1.5 * strokeScale}
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Right signal pulse (outgoing) - inner */}
      <path
        d="M34 20a6 6 0 0 0 0 8"
        stroke={color}
        strokeWidth={1.5 * strokeScale}
        strokeLinecap="round"
      />
      {/* Horizontal connection line */}
      <path
        d="M18 24h12"
        stroke={color}
        strokeWidth={2 * strokeScale}
        strokeLinecap="round"
      />
      {/* Central hub ring */}
      <circle
        cx="24"
        cy="24"
        r="4"
        stroke={color}
        strokeWidth={1.5 * strokeScale}
      />
      {/* Central hub dot */}
      <circle cx="24" cy="24" r="1.5" fill={color} />
    </svg>
  );
};

/**
 * ProtocolBOLIcon - 3x3 Data Grid + Verification Checkmark
 * Represents verified digital bill of lading and proof of delivery
 * Design: Structured data grid with verification overlay (no documents)
 */
export const ProtocolBOLIcon: React.FC<ProtocolIconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  className,
  'aria-label': ariaLabel = 'Digital BOL - Verified proof of lading and delivery',
}) => {
  const strokeScale = size / 48;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      {/* 3x3 data grid - row 1 */}
      <rect x="8" y="8" width="10" height="10" stroke={color} strokeWidth={1 * strokeScale} opacity="0.4" />
      <rect x="19" y="8" width="10" height="10" stroke={color} strokeWidth={1 * strokeScale} opacity="0.4" />
      <rect x="30" y="8" width="10" height="10" stroke={color} strokeWidth={1 * strokeScale} opacity="0.4" />
      {/* 3x3 data grid - row 2 */}
      <rect x="8" y="19" width="10" height="10" stroke={color} strokeWidth={1 * strokeScale} opacity="0.4" />
      <rect x="19" y="19" width="10" height="10" stroke={color} strokeWidth={1 * strokeScale} opacity="0.4" />
      <rect x="30" y="19" width="10" height="10" stroke={color} strokeWidth={1 * strokeScale} opacity="0.4" />
      {/* 3x3 data grid - row 3 */}
      <rect x="8" y="30" width="10" height="10" stroke={color} strokeWidth={1 * strokeScale} opacity="0.4" />
      <rect x="19" y="30" width="10" height="10" stroke={color} strokeWidth={1 * strokeScale} opacity="0.4" />
      <rect x="30" y="30" width="10" height="10" stroke={color} strokeWidth={1 * strokeScale} opacity="0.4" />
      {/* Verification checkmark overlay */}
      <path
        d="M14 26l8 8 16-18"
        stroke={color}
        strokeWidth={2.5 * strokeScale}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * ProtocolYMSIcon - Triangular Network + Central Orchestration Pulse
 * Represents yard management system orchestration and visibility
 * Design: 3-node network with central hub (no grids/charts)
 */
export const ProtocolYMSIcon: React.FC<ProtocolIconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  className,
  'aria-label': ariaLabel = 'Digital YMS - Yard orchestration and visibility',
}) => {
  const strokeScale = size / 48;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      {/* Top node */}
      <circle cx="24" cy="8" r="4" stroke={color} strokeWidth={1.5 * strokeScale} />
      <circle cx="24" cy="8" r="1.5" fill={color} />
      
      {/* Bottom-left node */}
      <circle cx="10" cy="38" r="4" stroke={color} strokeWidth={1.5 * strokeScale} />
      <circle cx="10" cy="38" r="1.5" fill={color} />
      
      {/* Bottom-right node */}
      <circle cx="38" cy="38" r="4" stroke={color} strokeWidth={1.5 * strokeScale} />
      <circle cx="38" cy="38" r="1.5" fill={color} />
      
      {/* Connection lines between nodes */}
      <path
        d="M24 12L12 34M24 12L36 34M14 38h20"
        stroke={color}
        strokeWidth={1.5 * strokeScale}
        opacity="0.4"
      />
      
      {/* Central orchestration hub - outer pulse */}
      <circle
        cx="24"
        cy="26"
        r="10"
        stroke={color}
        strokeWidth={1 * strokeScale}
        opacity="0.3"
      />
      
      {/* Central orchestration hub - inner ring */}
      <circle
        cx="24"
        cy="26"
        r="6"
        stroke={color}
        strokeWidth={1.5 * strokeScale}
      />
      
      {/* Central orchestration hub - core */}
      <circle cx="24" cy="26" r="2" fill={color} />
    </svg>
  );
};

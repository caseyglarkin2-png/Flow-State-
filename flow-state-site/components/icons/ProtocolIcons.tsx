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
 * ProtocolGuardIcon - Shield with lock
 * Represents carrier identity verification and gate control
 */
export const ProtocolGuardIcon: React.FC<ProtocolIconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  className,
  'aria-label': ariaLabel = 'Digital Guard - Verify carrier identity',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    role="img"
    aria-label={ariaLabel}
  >
    {/* Shield outline */}
    <path
      d="M24 4L10 10v10c0 8.84 6.07 17.12 14 19 7.93-1.88 14-10.16 14-19V10L24 4z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Lock body */}
    <rect
      x="18"
      y="22"
      width="12"
      height="10"
      rx="1"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
    />
    {/* Lock shackle */}
    <path
      d="M20 22v-4a4 4 0 0 1 8 0v4"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    {/* Lock keyhole */}
    <circle cx="24" cy="27" r="1.5" fill={color} />
  </svg>
);

/**
 * ProtocolCommsIcon - Chat bubble with signal waves
 * Represents real-time messaging and communication protocol
 */
export const ProtocolCommsIcon: React.FC<ProtocolIconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  className,
  'aria-label': ariaLabel = 'Digital Comms - Real-time messaging',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    role="img"
    aria-label={ariaLabel}
  >
    {/* Chat bubble */}
    <path
      d="M12 8h24a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H24l-8 6v-6h-4a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Signal waves (right side of bubble) */}
    <path
      d="M30 14c2 1 3 2.5 3 4s-1 3-3 4"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.7"
    />
    <path
      d="M32 11c3 1.5 5 4 5 7s-2 5.5-5 7"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
    {/* Message indicator dots */}
    <circle cx="18" cy="18" r="1.5" fill={color} opacity="0.6" />
    <circle cx="24" cy="18" r="1.5" fill={color} opacity="0.6" />
  </svg>
);

/**
 * ProtocolBOLIcon - Document with checkmark
 * Represents digital bill of lading and proof of delivery
 */
export const ProtocolBOLIcon: React.FC<ProtocolIconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  className,
  'aria-label': ariaLabel = 'Digital BOL - Proof of lading',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    role="img"
    aria-label={ariaLabel}
  >
    {/* Document outline */}
    <path
      d="M12 6h18l8 8v26a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Folded corner */}
    <path
      d="M30 6v8h8"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Checkmark (centered) */}
    <path
      d="M17 26l4 4 8-8"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Document lines (subtle) */}
    <line x1="16" y1="18" x2="24" y2="18" stroke={color} strokeWidth="1.5" opacity="0.4" />
  </svg>
);

/**
 * ProtocolYMSIcon - Grid with bar chart overlay
 * Represents yard management system and orchestration
 */
export const ProtocolYMSIcon: React.FC<ProtocolIconProps> = ({
  size = defaultProps.size,
  color = defaultProps.color,
  className,
  'aria-label': ariaLabel = 'Digital YMS - Yard orchestration',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    role="img"
    aria-label={ariaLabel}
  >
    {/* Grid (3x3) */}
    <rect x="6" y="6" width="12" height="12" stroke={color} strokeWidth="1.5" rx="1" />
    <rect x="6" y="20" width="12" height="12" stroke={color} strokeWidth="1.5" rx="1" />
    <rect x="20" y="6" width="12" height="12" stroke={color} strokeWidth="1.5" rx="1" />
    <rect x="20" y="20" width="12" height="12" stroke={color} strokeWidth="1.5" rx="1" />
    
    {/* Bar chart overlay (top right quadrant area) */}
    <g opacity="0.8">
      <rect x="36" y="28" width="4" height="8" fill={color} rx="0.5" />
      <rect x="38" y="22" width="4" height="14" fill={color} rx="0.5" />
      <rect x="34" y="32" width="4" height="4" fill={color} rx="0.5" />
    </g>
    
    {/* Upward trend arrow */}
    <path
      d="M36 14l4-4 4 4M40 10v8"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.7"
    />
  </svg>
);

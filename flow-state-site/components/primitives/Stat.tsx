import React from 'react';

export interface StatProps {
  /** Statistic value (number or formatted string) */
  value: string | number;
  
  /** Stat label/description */
  label: string;
  
  /** Optional unit (%, $, etc.) */
  unit?: string;
  
  /** Value color variant */
  variant?: 'default' | 'success' | 'warning' | 'error';
  
  /** Additional classes */
  className?: string;
}

export function Stat({
  value,
  label,
  unit,
  variant = 'default',
  className = '',
}: StatProps) {
  const variantColors = {
    default: 'text-flow',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    error: 'text-neon',
  };

  return (
    <div className={`text-center ${className}`}>
      <div className={`text-4xl md:text-5xl font-bold ${variantColors[variant]}`}>
        {value}
        {unit && <span className="text-2xl md:text-3xl ml-1">{unit}</span>}
      </div>
      <div className="text-steel text-sm md:text-base mt-2">
        {label}
      </div>
    </div>
  );
}

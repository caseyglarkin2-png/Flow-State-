/**
 * IndustrialSlider Component
 * 
 * Industrial-styled slider input with dark track and neon accent.
 * Optimized for variance tax calculator inputs.
 */

'use client';

import React, { useCallback, useId } from 'react';

interface IndustrialSliderProps {
  /** Label text displayed above the slider */
  label: string;
  /** Current value */
  value: number;
  /** Change handler */
  onChange: (value: number) => void;
  /** Minimum value */
  min: number;
  /** Maximum value */
  max: number;
  /** Step increment */
  step?: number;
  /** Unit to display after value (e.g., "min", "$", "%") */
  unit?: string;
  /** Hint text displayed below */
  hint?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
}

export default function IndustrialSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  hint,
  disabled = false,
  className = '',
}: IndustrialSliderProps) {
  const id = useId();
  const hintId = `${id}-hint`;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseFloat(e.target.value));
    },
    [onChange]
  );

  // Calculate fill percentage for visual track
  const fillPercent = ((value - min) / (max - min)) * 100;

  // Format display value
  const displayValue = step < 1 ? value.toFixed(2) : value.toLocaleString();

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label and Value */}
      <div className="flex items-center justify-between">
        <label 
          htmlFor={id}
          className="text-sm font-medium text-slate-300"
        >
          {label}
        </label>
        <span className="font-mono text-sm text-neon tabular-nums">
          {displayValue}{unit && ` ${unit}`}
        </span>
      </div>

      {/* Slider Track */}
      <div className="relative">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          aria-describedby={hint ? hintId : undefined}
          className={`
            w-full h-2 appearance-none cursor-pointer rounded-full
            bg-ebony-clay
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-neon/50 focus:ring-offset-2 focus:ring-offset-void
            motion-safe:transition-all
            
            /* Webkit (Chrome, Safari) */
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-neon
            [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,255,136,0.5)]
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:motion-safe:transition-shadow
            [&:hover::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(0,255,136,0.8)]
            
            /* Firefox */
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-neon
            [&::-moz-range-thumb]:border-none
            [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(0,255,136,0.5)]
            [&::-moz-range-thumb]:cursor-pointer
            
            [&::-moz-range-track]:bg-ebony-clay
            [&::-moz-range-track]:rounded-full
            [&::-moz-range-track]:h-2
            [&::-moz-range-progress]:bg-neon/30
            [&::-moz-range-progress]:rounded-full
            [&::-moz-range-progress]:h-2
          `}
          style={{
            // Custom CSS variable for fill (Webkit doesn't support ::-moz-range-progress)
            background: `linear-gradient(to right, rgba(0, 255, 136, 0.3) 0%, rgba(0, 255, 136, 0.3) ${fillPercent}%, #232A35 ${fillPercent}%, #232A35 100%)`,
          }}
        />
      </div>

      {/* Min/Max Labels */}
      <div className="flex justify-between text-xs text-slate-500">
        <span>{min.toLocaleString()}{unit && ` ${unit}`}</span>
        <span>{max.toLocaleString()}{unit && ` ${unit}`}</span>
      </div>

      {/* Hint */}
      {hint && (
        <p id={hintId} className="text-xs text-slate-500">
          {hint}
        </p>
      )}
    </div>
  );
}

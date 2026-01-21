'use client';

import React, { useState } from 'react';
import { listAdoptionPresets } from '@/src/lib/adoption';

interface CoverageSliderProps {
  /** Current adoption percentage (5-100) */
  value: number;

  /** Called when slider or preset button clicked */
  onChange: (value: number) => void;

  /** Show preset buttons (default: true) */
  showPresets?: boolean;

  /** Disable interaction (default: false) */
  disabled?: boolean;

  /** Label text (default: 'Network Coverage (%)') */
  label?: string;

  /** CSS class name for container */
  className?: string;
}

/**
 * CoverageSlider Component
 * 
 * Interactive slider for selecting adoption % (narrative-only UI control).
 * Includes preset buttons for common scenarios (5%, 10%, 25%, 50%).
 * 
 * Accessibility: ARIA labels, keyboard support (arrow keys, etc.)
 */
export default function CoverageSlider({
  value,
  onChange,
  showPresets = true,
  disabled = false,
  label = 'Network Coverage (%)',
  className = '',
}: CoverageSliderProps) {
  const [isFocused, setIsFocused] = useState(false);

  const presets = listAdoptionPresets();

  return (
    <div
      className={`flex flex-col gap-4 p-6 bg-void border border-steel/50 rounded-lg shadow-lg ${className}`}
      role="group"
      aria-labelledby="coverage-label"
    >
      {/* Label */}
      <label htmlFor="adoption-slider" className="text-sm font-semibold text-steel" id="coverage-label">
        {label}
      </label>

      {/* Slider Input */}
      <div className="flex flex-col gap-2">
        <input
          id="adoption-slider"
          type="range"
          min="5"
          max="100"
          step="5"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full h-2 rounded-lg appearance-none cursor-pointer
            bg-gradient-to-r from-steel/30 to-steel/50
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-flow focus:ring-offset-2 focus:ring-offset-void
            transition-all duration-200
            slider
          `}
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={5}
          aria-valuemax={100}
          style={{
            background: `linear-gradient(to right, rgb(100, 116, 139) 0%, rgb(30, 144, 255) ${value}%, rgb(71, 85, 105) ${value}%, rgb(71, 85, 105) 100%)`,
          }}
        />

        {/* Display Current Value */}
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold text-flow">{value}% Coverage</div>
          <div className="text-xs text-steel/70">
            {value === 5 && 'Deep Model (Year 1)'}
            {value === 10 && 'Moderate (Year 1)'}
            {value === 25 && 'Aggressive (Year 2)'}
            {value === 50 && 'Inflection (Year 3)'}
            {![5, 10, 25, 50].includes(value) && 'Custom'}
          </div>
        </div>
      </div>

      {/* Preset Buttons */}
      {showPresets && (
        <div className="flex flex-wrap gap-2 pt-2">
          {presets.map(preset => (
            <button
              key={preset.adoptionPercent}
              onClick={() => {
                onChange(preset.adoptionPercent);
              }}
              disabled={disabled}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-lg border-2 transition-all
                ${
                  value === preset.adoptionPercent
                    ? 'bg-flow text-void border-flow shadow-lg shadow-flow/30'
                    : 'bg-void text-flow border-steel/50 hover:border-flow hover:bg-flow/10 hover:text-flow'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              aria-pressed={value === preset.adoptionPercent}
              title={preset.description}
            >
              <span className="inline-block">{preset.adoptionPercent}%</span>
              <span className="hidden sm:inline text-xs ml-1 opacity-75">
                ({preset.description.split(' ').pop()})
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Helper Text */}
      <div className="text-xs text-steel/60 mt-2">
        <p>
          <strong>5%:</strong> Year 1 Deep Model baseline
          <br />
          <strong>10%:</strong> Moderate rollout
          <br />
          <strong>25%:</strong> Aggressive (Year 2)
          <br />
          <strong>50%+:</strong> Network inflection point
        </p>
      </div>
    </div>
  );
}

/**
 * CSS for custom slider styling (apply to global styles)
 * 
 * Add to your global CSS or CSS module:
 * 
 * input[type="range"].slider::-webkit-slider-thumb {
 *   appearance: none;
 *   width: 18px;
 *   height: 18px;
 *   border-radius: 50%;
 *   background: rgb(30, 144, 255);
 *   cursor: pointer;
 *   box-shadow: 0 2px 8px rgba(30, 144, 255, 0.4);
 *   transition: all 0.2s;
 * }
 * 
 * input[type="range"].slider::-webkit-slider-thumb:hover {
 *   transform: scale(1.1);
 *   box-shadow: 0 4px 12px rgba(30, 144, 255, 0.6);
 * }
 * 
 * input[type="range"].slider::-moz-range-thumb {
 *   width: 18px;
 *   height: 18px;
 *   border-radius: 50%;
 *   background: rgb(30, 144, 255);
 *   cursor: pointer;
 *   border: 0;
 *   box-shadow: 0 2px 8px rgba(30, 144, 255, 0.4);
 *   transition: all 0.2s;
 * }
 */

/**
 * IndustrialNumericInput Component
 * 
 * Industrial-styled numeric input with increment/decrement buttons.
 * Monospace font, dark input, subtle glow on focus.
 */

'use client';

import React, { useCallback, useId, useState } from 'react';
import { Minus, Plus } from 'lucide-react';

interface IndustrialNumericInputProps {
  /** Label text */
  label: string;
  /** Current value */
  value: number;
  /** Change handler */
  onChange: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Unit to display after input (e.g., "min", "%") */
  unit?: string;
  /** Prefix to display before input (e.g., "$") */
  prefix?: string;
  /** Hint text displayed below */
  hint?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
}

export default function IndustrialNumericInput({
  label,
  value,
  onChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  unit,
  prefix,
  hint,
  disabled = false,
  className = '',
}: IndustrialNumericInputProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clamp = useCallback(
    (val: number) => Math.min(max, Math.max(min, val)),
    [min, max]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      
      // Allow empty input during typing
      if (raw === '' || raw === '-') {
        return;
      }

      const parsed = parseFloat(raw);
      
      if (isNaN(parsed)) {
        setError('Invalid number');
        return;
      }

      setError(null);
      onChange(clamp(parsed));
    },
    [clamp, onChange]
  );

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setError(null);
    // Ensure value is clamped on blur
    onChange(clamp(value));
  }, [clamp, onChange, value]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const increment = useCallback(() => {
    if (!disabled) {
      onChange(clamp(value + step));
    }
  }, [clamp, disabled, onChange, step, value]);

  const decrement = useCallback(() => {
    if (!disabled) {
      onChange(clamp(value - step));
    }
  }, [clamp, disabled, onChange, step, value]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        increment();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        decrement();
      }
    },
    [increment, decrement]
  );

  // Format display value
  const displayValue = step < 1 ? value.toFixed(2) : value.toString();

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-slate-300"
      >
        {label}
      </label>

      {/* Input Container */}
      <div 
        className={`
          flex items-center rounded-lg border bg-void/50
          motion-safe:transition-all
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${error 
            ? 'border-freightroll-red shadow-[0_0_8px_rgba(217,20,17,0.3)]' 
            : isFocused 
              ? 'border-neon/50 shadow-[0_0_12px_rgba(0,255,136,0.2)]' 
              : 'border-ebony-clay hover:border-slate-600'
          }
        `}
      >
        {/* Decrement Button */}
        <button
          type="button"
          onClick={decrement}
          disabled={disabled || value <= min}
          tabIndex={-1}
          aria-label={`Decrease ${label}`}
          className={`
            p-3 text-slate-400 hover:text-neon
            disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-slate-400
            motion-safe:transition-colors
          `}
        >
          <Minus className="w-4 h-4" />
        </button>

        {/* Input with prefix/unit */}
        <div className="flex items-center flex-1 min-w-0">
          {prefix && (
            <span className="text-slate-500 font-mono text-sm mr-1">{prefix}</span>
          )}
          <input
            id={id}
            type="text"
            inputMode="decimal"
            value={displayValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-describedby={hint ? hintId : undefined}
            aria-invalid={!!error}
            className={`
              w-full bg-transparent text-center font-mono text-sm text-slate-100
              focus:outline-none
              disabled:cursor-not-allowed
              [appearance:textfield]
              [&::-webkit-outer-spin-button]:appearance-none
              [&::-webkit-inner-spin-button]:appearance-none
            `}
          />
          {unit && (
            <span className="text-slate-500 font-mono text-sm ml-1">{unit}</span>
          )}
        </div>

        {/* Increment Button */}
        <button
          type="button"
          onClick={increment}
          disabled={disabled || value >= max}
          tabIndex={-1}
          aria-label={`Increase ${label}`}
          className={`
            p-3 text-slate-400 hover:text-neon
            disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-slate-400
            motion-safe:transition-colors
          `}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Error or Hint */}
      {error ? (
        <p className="text-xs text-freightroll-red" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

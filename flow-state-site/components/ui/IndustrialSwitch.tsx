/**
 * IndustrialSwitch Component
 * 
 * Industrial-styled toggle switch with carbon background and neon glow.
 */

'use client';

import React, { useCallback, useId } from 'react';

interface IndustrialSwitchProps {
  /** Label text */
  label: string;
  /** Current checked state */
  checked: boolean;
  /** Change handler */
  onChange: (checked: boolean) => void;
  /** Optional description below label */
  description?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
}

export default function IndustrialSwitch({
  label,
  checked,
  onChange,
  description,
  disabled = false,
  className = '',
}: IndustrialSwitchProps) {
  const id = useId();
  const descId = `${id}-desc`;

  const handleChange = useCallback(() => {
    if (!disabled) {
      onChange(!checked);
    }
  }, [checked, disabled, onChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
        e.preventDefault();
        onChange(!checked);
      }
    },
    [checked, disabled, onChange]
  );

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      {/* Switch Track */}
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-describedby={description ? descId : undefined}
        disabled={disabled}
        onClick={handleChange}
        onKeyDown={handleKeyDown}
        className={`
          relative inline-flex h-6 w-11 shrink-0 items-center rounded-full
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-neon/50 focus:ring-offset-2 focus:ring-offset-void
          disabled:opacity-50 disabled:cursor-not-allowed
          ${checked 
            ? 'bg-neon/30 shadow-[0_0_12px_rgba(0,255,136,0.4)]' 
            : 'bg-ebony-clay'
          }
        `}
      >
        {/* Thumb */}
        <span
          className={`
            inline-block h-4 w-4 rounded-full
            motion-safe:transition-all motion-safe:duration-200
            ${checked 
              ? 'translate-x-6 bg-neon shadow-[0_0_8px_rgba(0,255,136,0.6)]' 
              : 'translate-x-1 bg-slate-400'
            }
          `}
        />
      </button>

      {/* Label & Description */}
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className={`text-sm font-medium ${disabled ? 'text-slate-500' : 'text-slate-300'} cursor-pointer`}
          onClick={handleChange}
        >
          {label}
        </label>
        {description && (
          <p id={descId} className="text-xs text-slate-500 mt-0.5">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Accessibility Components
 * 
 * Reusable accessible UI patterns.
 */

'use client';

import React, { forwardRef, ReactNode } from 'react';

// ═══════════════════════════════════════════════════════════════════
// VISUALLY HIDDEN (Screen Reader Only)
// ═══════════════════════════════════════════════════════════════════

interface VisuallyHiddenProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Content that is visually hidden but accessible to screen readers
 */
export function VisuallyHidden({ children, as: Component = 'span' }: VisuallyHiddenProps) {
  return (
    <Component className="sr-only">
      {children}
    </Component>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SKIP LINK
// ═══════════════════════════════════════════════════════════════════

interface SkipLinkProps {
  targetId: string;
  children?: ReactNode;
}

/**
 * Skip navigation link for keyboard users
 */
export function SkipLink({ targetId, children = 'Skip to main content' }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-neon focus:text-void focus:rounded-lg focus:font-semibold focus:outline-none"
    >
      {children}
    </a>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LIVE REGION
// ═══════════════════════════════════════════════════════════════════

interface LiveRegionProps {
  children: ReactNode;
  mode?: 'polite' | 'assertive' | 'off';
  atomic?: boolean;
  relevant?: 'additions' | 'removals' | 'text' | 'all';
  className?: string;
}

/**
 * ARIA live region for dynamic content announcements
 */
export function LiveRegion({
  children,
  mode = 'polite',
  atomic = true,
  relevant = 'additions',
  className = '',
}: LiveRegionProps) {
  return (
    <div
      aria-live={mode}
      aria-atomic={atomic}
      aria-relevant={relevant}
      className={className}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ACCESSIBLE ICON BUTTON
// ═══════════════════════════════════════════════════════════════════

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Button with icon and accessible label
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, icon, size = 'md', className = '', ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    };

    return (
      <button
        ref={ref}
        aria-label={label}
        className={`inline-flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-void ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {icon}
        <VisuallyHidden>{label}</VisuallyHidden>
      </button>
    );
  }
);
IconButton.displayName = 'IconButton';

// ═══════════════════════════════════════════════════════════════════
// ACCESSIBLE LOADING STATE
// ═══════════════════════════════════════════════════════════════════

interface LoadingSpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Accessible loading spinner
 */
export function LoadingSpinner({
  label = 'Loading',
  size = 'md',
  className = '',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  return (
    <div role="status" aria-label={label} className={className}>
      <div
        className={`${sizeClasses[size]} rounded-full border-zinc-600 border-t-neon animate-spin`}
        aria-hidden="true"
      />
      <VisuallyHidden>{label}</VisuallyHidden>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ACCESSIBLE PROGRESS BAR
// ═══════════════════════════════════════════════════════════════════

interface ProgressBarProps {
  value: number;
  max?: number;
  label: string;
  showValue?: boolean;
  className?: string;
}

/**
 * Accessible progress bar
 */
export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className={className}>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-zinc-400">{label}</span>
        {showValue && (
          <span className="text-sm text-white">{percentage}%</span>
        )}
      </div>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden"
      >
        <div
          className="h-full bg-neon transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ACCESSIBLE TOOLTIP
// ═══════════════════════════════════════════════════════════════════

interface TooltipProps {
  content: string;
  children: ReactNode;
  id?: string;
}

/**
 * Simple accessible tooltip using native title + aria
 */
export function Tooltip({ content, children, id }: TooltipProps) {
  const tooltipId = id || `tooltip-${Math.random().toString(36).slice(2)}`;

  return (
    <span className="relative inline-block group">
      <span aria-describedby={tooltipId}>{children}</span>
      <span
        id={tooltipId}
        role="tooltip"
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-zinc-800 text-white rounded opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50"
      >
        {content}
      </span>
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ACCESSIBLE ERROR MESSAGE
// ═══════════════════════════════════════════════════════════════════

interface ErrorMessageProps {
  id: string;
  children: ReactNode;
  className?: string;
}

/**
 * Error message for form fields
 */
export function ErrorMessage({ id, children, className = '' }: ErrorMessageProps) {
  return (
    <p
      id={id}
      role="alert"
      aria-live="polite"
      className={`text-sm text-red-400 mt-1 ${className}`}
    >
      {children}
    </p>
  );
}

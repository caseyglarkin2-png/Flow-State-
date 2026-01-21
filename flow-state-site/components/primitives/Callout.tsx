import React from 'react';

export interface CalloutProps {
  /** Callout variant (determines color/icon) */
  variant: 'info' | 'warning' | 'success' | 'error';
  
  /** Callout content */
  children: React.ReactNode;
  
  /** Optional title */
  title?: string;
  
  /** Additional classes */
  className?: string;
}

export function Callout({
  variant,
  children,
  title,
  className = '',
}: CalloutProps) {
  const variantStyles = {
    info: {
      bg: 'bg-flow/10',
      border: 'border-flow',
      text: 'text-flow',
      icon: 'ℹ️',
    },
    warning: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500',
      text: 'text-yellow-400',
      icon: '⚠️',
    },
    success: {
      bg: 'bg-green-500/10',
      border: 'border-green-500',
      text: 'text-green-400',
      icon: '✅',
    },
    error: {
      bg: 'bg-neon/10',
      border: 'border-neon',
      text: 'text-neon',
      icon: '❌',
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      className={`rounded-lg border-l-4 ${style.border} ${style.bg} p-4 ${className}`}
      role="alert"
    >
      <div className="flex gap-3">
        <div className="text-2xl flex-shrink-0" aria-hidden="true">
          {style.icon}
        </div>
        <div className="flex-1">
          {title && (
            <div className={`font-bold mb-1 ${style.text}`}>
              {title}
            </div>
          )}
          <div className="text-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

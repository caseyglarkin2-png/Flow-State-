import React from 'react';

export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  
  /** Enable hover effect (scale + shadow) */
  hover?: boolean;
  
  /** Card variant */
  variant?: 'default' | 'bordered' | 'elevated';
  
  /** Additional classes */
  className?: string;
  
  /** Click handler (makes card clickable) */
  onClick?: () => void;
}

export function Card({
  children,
  hover = false,
  variant = 'default',
  className = '',
  onClick,
}: CardProps) {
  const baseClasses = 'rounded-lg p-6';
  
  const variantClasses = {
    default: 'bg-void-light',
    bordered: 'bg-void-light border-2 border-steel/20',
    elevated: 'bg-void-light shadow-lg',
  };
  
  const hoverClasses = hover
    ? 'transition-all hover:scale-105 hover:shadow-xl cursor-pointer'
    : '';
  
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {children}
    </div>
  );
}

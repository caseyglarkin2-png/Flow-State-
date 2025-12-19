'use client';

import React from 'react';

interface ButtonProps {
  variant?: 'neon' | 'neon-fill' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  [key: string]: any;
}

export default function Button({ 
  variant = 'neon', 
  size = 'md', 
  className = '',
  children,
  icon,
  ...props 
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 justify-center';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    neon: 'border-2 border-neon text-neon hover:bg-neon hover:text-void',
    'neon-fill': 'bg-neon text-void hover:shadow-lg hover:shadow-neon/50',
    ghost: 'text-neon border border-neon/50 hover:border-neon hover:bg-neon/10',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
}

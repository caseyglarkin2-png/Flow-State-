'use client';

import React from 'react';
import { getActiveLogo } from '@/lib/branding';

interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * Modular Logo Component
 * 
 * Automatically uses the active logo variant from lib/branding.ts
 * Change ACTIVE_VARIANT in branding.ts to switch logos site-wide
 */
export default function Logo({ size = 24, className = '' }: LogoProps) {
  const logo = getActiveLogo();
  
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={`text-neon ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="YardFlow logo"
      dangerouslySetInnerHTML={{ __html: logo.svg }}
    />
  );
}

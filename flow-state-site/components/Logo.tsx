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
    <div 
      className={`text-neon ${className}`}
      dangerouslySetInnerHTML={{ __html: logo.svg.replace('width="24" height="24"', `width="${size}" height="${size}"`) }}
      aria-label={`YardFlow logo - ${logo.name}`}
    />
  );
}

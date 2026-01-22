/**
 * Primary CTA Component
 * Enforces consistent conversion path across the site
 */

import Link from 'next/link';
import { PRIMARY_CTA, SECONDARY_CTA, getCTAConfig } from '@/content/ctas';
import { Crosshair, Currency, Facility, Shield, Nexus } from '@/components/icons/FlowIcons';

const iconMap = {
  Crosshair: Crosshair,
  Nexus: Nexus,
  Currency: Currency,
  Facility: Facility,
  Shield: Shield,
};

interface PrimaryCTAProps {
  variant?: 'primary' | 'secondary' | 'finance' | 'operations' | 'security';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function PrimaryCTA({ 
  variant = 'primary',
  className = '',
  size = 'lg'
}: PrimaryCTAProps) {
  const config = variant === 'primary' || variant === 'secondary' 
    ? (variant === 'primary' ? PRIMARY_CTA : SECONDARY_CTA)
    : getCTAConfig(variant);
  
  const IconComponent = iconMap[config.icon as keyof typeof iconMap] || Crosshair;
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const baseClasses = variant === 'primary'
    ? 'inline-flex items-center gap-3 rounded-lg font-bold bg-ember text-white hover:bg-white hover:text-void transition-all hover:scale-105'
    : 'inline-flex items-center gap-2 rounded-lg font-semibold border-2 border-neon text-neon hover:bg-neon hover:text-void transition-all';
  
  return (
    <Link
      href={config.href}
      className={`${baseClasses} ${sizeClasses[size]} ${className}`}
      title={config.description}
    >
      <IconComponent size={size === 'sm' ? 18 : size === 'md' ? 20 : 22} />
      {config.label}
    </Link>
  );
}

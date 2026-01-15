// /components/ModuleCard.tsx
// Clickable module card component for consistent display across the site

'use client';

import React from 'react';
import Link from 'next/link';
import { MODULES, getModuleByName, ICON_SIZES, type ModuleId } from '@/lib/modules';

interface ModuleCardProps {
  /** Module name (e.g., "Digital Guard") or module ID */
  module: string | ModuleId;
  /** Optional custom description override */
  description?: string;
  /** Card size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show the icon */
  showIcon?: boolean;
  /** Additional className */
  className?: string;
}

export function ModuleCard({
  module,
  description,
  size = 'md',
  showIcon = true,
  className = '',
}: ModuleCardProps) {
  const moduleData = typeof module === 'string' 
    ? getModuleByName(module) || MODULES[module as ModuleId]
    : MODULES[module];

  if (!moduleData) {
    console.warn(`ModuleCard: Unknown module "${module}"`);
    return null;
  }

  const Icon = moduleData.icon;
  const iconSize = size === 'sm' ? ICON_SIZES.sm : size === 'lg' ? ICON_SIZES.lg : ICON_SIZES.md;

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  };

  return (
    <Link
      href={moduleData.route}
      aria-label={`View ${moduleData.name} product page`}
      className={`
        group block rounded-xl border border-neon/10 bg-carbon/50
        hover:border-neon/30 hover:bg-carbon/70
        focus:outline-none focus:ring-2 focus:ring-neon/50 focus:ring-offset-2 focus:ring-offset-void
        transition-all duration-200
        ${sizeClasses[size]}
        ${className}
      `}
    >
      <div className="flex items-start gap-3">
        {showIcon && (
          <div className="shrink-0 rounded-lg bg-neon/10 p-2 text-neon group-hover:bg-neon/20 transition-colors">
            <Icon size={iconSize} />
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-neon group-hover:text-white transition-colors">
            {moduleData.name}
          </h3>
          <p className="mt-1 text-xs text-steel leading-relaxed">
            {description || moduleData.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

// Grid of module cards
interface ModuleGridProps {
  /** Array of module names or IDs */
  modules: Array<{ name: string; description?: string } | string>;
  /** Number of columns on desktop */
  columns?: 2 | 3 | 4;
  /** Card size */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ModuleGrid({
  modules,
  columns = 3,
  size = 'md',
  className = '',
}: ModuleGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid gap-4 ${gridCols[columns]} ${className}`}>
      {modules.map((item, idx) => {
        const moduleName = typeof item === 'string' ? item : item.name;
        const description = typeof item === 'string' ? undefined : item.description;
        return (
          <ModuleCard
            key={moduleName + idx}
            module={moduleName}
            description={description}
            size={size}
          />
        );
      })}
    </div>
  );
}

// Simple module link for inline use
interface ModuleLinkProps {
  module: string | ModuleId;
  className?: string;
  children?: React.ReactNode;
}

export function ModuleLink({ module, className = '', children }: ModuleLinkProps) {
  const moduleData = typeof module === 'string'
    ? getModuleByName(module) || MODULES[module as ModuleId]
    : MODULES[module];

  if (!moduleData) return <span className={className}>{children || module}</span>;

  return (
    <Link
      href={moduleData.route}
      aria-label={`View ${moduleData.name} product page`}
      className={`text-neon hover:underline ${className}`}
    >
      {children || moduleData.name}
    </Link>
  );
}

export default ModuleCard;

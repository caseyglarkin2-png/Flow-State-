'use client';

/**
 * Skeleton Loading Components
 * 
 * Provides shimmer loading states for async content.
 */

import { ReactNode } from 'react';

// ═══════════════════════════════════════════════════════════════════
// BASE SKELETON
// ═══════════════════════════════════════════════════════════════════

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  animate?: boolean;
}

export function Skeleton({
  className = '',
  width,
  height,
  rounded = 'md',
  animate = true,
}: SkeletonProps) {
  const roundedClass = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }[rounded];

  return (
    <div
      className={`
        bg-zinc-800
        ${roundedClass}
        ${animate ? 'animate-pulse' : ''}
        ${className}
      `}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      aria-hidden="true"
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// TEXT SKELETON
// ═══════════════════════════════════════════════════════════════════

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export function SkeletonText({ lines = 3, className = '' }: SkeletonTextProps) {
  return (
    <div className={`space-y-2 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={16}
          width={i === lines - 1 ? '75%' : '100%'}
          rounded="sm"
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CARD SKELETON
// ═══════════════════════════════════════════════════════════════════

interface SkeletonCardProps {
  hasImage?: boolean;
  className?: string;
}

export function SkeletonCard({ hasImage = true, className = '' }: SkeletonCardProps) {
  return (
    <div 
      className={`bg-zinc-900 border border-zinc-800 rounded-xl p-4 ${className}`}
      aria-hidden="true"
    >
      {hasImage && <Skeleton height={160} className="mb-4" rounded="lg" />}
      <Skeleton height={24} width="60%" className="mb-2" />
      <SkeletonText lines={2} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// VISUALIZATION SKELETON
// ═══════════════════════════════════════════════════════════════════

interface VisualizationSkeletonProps {
  height?: string | number;
  className?: string;
}

export function VisualizationSkeleton({ 
  height = 400, 
  className = '' 
}: VisualizationSkeletonProps) {
  return (
    <div 
      className={`relative bg-void rounded-2xl overflow-hidden ${className}`}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
      role="img"
      aria-label="Loading visualization..."
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, #0d0f12 0%, #050608 70%, #000 100%)',
        }}
      />
      
      {/* Pulsing center circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="w-32 h-32 rounded-full animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,136,0.1) 0%, transparent 70%)',
            boxShadow: '0 0 60px 20px rgba(0, 255, 136, 0.1)',
          }}
        />
      </div>
      
      {/* Loading indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className="w-5 h-5 border-2 border-neon border-t-transparent rounded-full animate-spin" />
        <span className="text-zinc-500 text-sm">Loading visualization...</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CALCULATOR SKELETON
// ═══════════════════════════════════════════════════════════════════

export function CalculatorSkeleton({ className = '' }: { className?: string }) {
  return (
    <div 
      className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-6 ${className}`}
      aria-hidden="true"
    >
      {/* Header */}
      <Skeleton height={28} width="40%" className="mb-6" />
      
      {/* Preset buttons */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} height={36} width={80} rounded="lg" />
        ))}
      </div>
      
      {/* Input groups */}
      <div className="space-y-6">
        {[1, 2, 3].map((group) => (
          <div key={group} className="space-y-4">
            <Skeleton height={20} width="30%" className="mb-2" />
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <Skeleton height={14} width="60%" className="mb-2" />
                  <Skeleton height={40} rounded="lg" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Total */}
      <div className="mt-6 pt-6 border-t border-zinc-700">
        <div className="flex justify-between items-center">
          <Skeleton height={20} width="40%" />
          <Skeleton height={32} width="30%" />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// BREAKDOWN SKELETON
// ═══════════════════════════════════════════════════════════════════

export function BreakdownSkeleton({ className = '' }: { className?: string }) {
  return (
    <div 
      className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-6 ${className}`}
      aria-hidden="true"
    >
      <Skeleton height={24} width="50%" className="mb-6" />
      
      {/* Cost rows */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton width={40} height={40} rounded="lg" />
            <div className="flex-1">
              <Skeleton height={16} width="40%" className="mb-1" />
              <Skeleton height={8} rounded="full" />
            </div>
            <Skeleton height={20} width={80} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LOADING WRAPPER
// ═══════════════════════════════════════════════════════════════════

interface LoadingWrapperProps {
  loading: boolean;
  skeleton: ReactNode;
  children: ReactNode;
  minHeight?: string | number;
}

export function LoadingWrapper({
  loading,
  skeleton,
  children,
  minHeight,
}: LoadingWrapperProps) {
  return (
    <div style={{ minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }}>
      {loading ? skeleton : children}
    </div>
  );
}

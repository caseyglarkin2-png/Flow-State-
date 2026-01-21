/**
 * Loading Skeletons for Singularity Visualization
 * 
 * Sprint 5: Polish & Launch
 * Provides graceful loading states for the visualization components
 */

'use client';

import { cn } from '@/lib/utils';

// ═══════════════════════════════════════════════════════════════════
// BASE SKELETON
// ═══════════════════════════════════════════════════════════════════

interface SkeletonProps {
  className?: string;
  /** Whether to show animation */
  animate?: boolean;
}

export function Skeleton({ className, animate = true }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-white/5 rounded',
        animate && 'animate-pulse',
        className
      )}
      aria-hidden="true"
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// VISUALIZATION SKELETON
// ═══════════════════════════════════════════════════════════════════

interface VisualizationSkeletonProps {
  className?: string;
  /** Show message below loader */
  message?: string;
}

export function VisualizationSkeleton({ 
  className,
  message = 'Initializing visualization...'
}: VisualizationSkeletonProps) {
  return (
    <div 
      className={cn(
        'relative w-full h-full min-h-[300px] bg-void flex flex-col items-center justify-center gap-4',
        className
      )}
      role="status"
      aria-label={message}
    >
      {/* Circular loader mimicking singularity */}
      <div className="relative w-32 h-32">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-neon/20 animate-pulse" />
        
        {/* Middle spinning ring */}
        <div className="absolute inset-2 rounded-full border-2 border-t-neon border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        
        {/* Inner core */}
        <div className="absolute inset-8 rounded-full bg-gradient-radial from-neon/30 to-transparent animate-pulse" />
        
        {/* Central dot */}
        <div className="absolute inset-12 rounded-full bg-neon/50" />
      </div>
      
      {/* Message */}
      <span className="text-sm text-white/60 font-mono">
        {message}
      </span>
      
      {/* Screen reader text */}
      <span className="sr-only">{message}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DASHBOARD SKELETON
// ═══════════════════════════════════════════════════════════════════

export function DashboardSkeleton({ className }: { className?: string }) {
  return (
    <div 
      className={cn('w-full space-y-6', className)}
      role="status"
      aria-label="Loading dashboard..."
    >
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-32" />
      </div>
      
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visualization area */}
        <div className="aspect-square">
          <VisualizationSkeleton />
        </div>
        
        {/* Controls area */}
        <div className="space-y-4">
          {/* Input groups */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
          
          {/* CTA button */}
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
      
      <span className="sr-only">Loading dashboard...</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CALCULATOR SKELETON
// ═══════════════════════════════════════════════════════════════════

export function CalculatorSkeleton({ className }: { className?: string }) {
  return (
    <div 
      className={cn('w-full space-y-6 p-6 bg-white/5 rounded-xl', className)}
      role="status"
      aria-label="Loading calculator..."
    >
      {/* Title */}
      <Skeleton className="h-6 w-48" />
      
      {/* Input sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        ))}
      </div>
      
      {/* Results summary */}
      <div className="pt-4 border-t border-white/10">
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="text-center space-y-2">
              <Skeleton className="h-8 w-20 mx-auto" />
              <Skeleton className="h-4 w-16 mx-auto" />
            </div>
          ))}
        </div>
      </div>
      
      <span className="sr-only">Loading calculator...</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CARD SKELETON
// ═══════════════════════════════════════════════════════════════════

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div 
      className={cn('p-4 bg-white/5 rounded-lg space-y-3', className)}
      role="status"
      aria-label="Loading content..."
    >
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <span className="sr-only">Loading content...</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// METRICS SKELETON
// ═══════════════════════════════════════════════════════════════════

export function MetricsSkeleton({ count = 4, className }: { count?: number; className?: string }) {
  return (
    <div 
      className={cn('grid grid-cols-2 md:grid-cols-4 gap-4', className)}
      role="status"
      aria-label="Loading metrics..."
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-4 bg-white/5 rounded-lg space-y-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
      ))}
      <span className="sr-only">Loading metrics...</span>
    </div>
  );
}

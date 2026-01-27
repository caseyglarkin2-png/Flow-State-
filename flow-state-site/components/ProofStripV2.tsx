'use client';

/**
 * ProofStripV2 Component
 * Sprint 2.1: Animated KPI ticker for scale proof metrics
 * 
 * Displays 4 key stats from RFQ deck with count-up animation on scroll-into-view.
 * Respects prefers-reduced-motion for accessibility.
 * 
 * Uses content model from lib/content for data-driven rendering.
 */

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { getProofPoints, type ProofPoint } from '@/lib/content';

interface ProofStripV2Props {
  /** Override default proof points (for testing) */
  proofPoints?: ProofPoint[];
  /** Test ID for Playwright */
  testId?: string;
  /** Custom class name */
  className?: string;
  /** Show only measured data (default) or all */
  showAll?: boolean;
}

/**
 * Animated metric display with count-up effect
 */
function AnimatedMetric({
  point,
  isInView,
  reducedMotion,
}: {
  point: ProofPoint;
  isInView: boolean;
  reducedMotion: boolean;
}) {
  const [displayValue, setDisplayValue] = useState<string>(reducedMotion ? point.metric : '0');

  useEffect(() => {
    if (!isInView || reducedMotion) {
      if (reducedMotion) setDisplayValue(point.metric);
      return;
    }

    // Parse the metric to animate (handle formats like "1M+", "0.2%", "200K", "~70s")
    const numericMatch = point.metric.match(/[\d.]+/);
    if (!numericMatch) {
      setDisplayValue(point.metric);
      return;
    }

    const targetValue = parseFloat(numericMatch[0]);
    const prefix = point.metric.match(/^[^\d]*/)?.[0] || '';
    const suffix = point.metric.match(/[^\d]*$/)?.[0] || '';
    
    const duration = 1500; // 1.5 seconds
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutExpo)
      const eased = 1 - Math.pow(2, -10 * progress);
      
      const current = targetValue * eased;
      
      // Format based on target value characteristics
      let formatted: string;
      if (targetValue >= 1) {
        formatted = current.toFixed(targetValue % 1 === 0 ? 0 : 1);
      } else {
        formatted = current.toFixed(1);
      }
      
      setDisplayValue(`${prefix}${formatted}${suffix}`);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(point.metric);
      }
    };

    const timeout = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 100);

    return () => clearTimeout(timeout);
  }, [isInView, point.metric, reducedMotion]);

  return (
    <span data-testid="metric-value" className="tabular-nums">
      {displayValue}
    </span>
  );
}

/**
 * Source type badge (Measured vs Modeled)
 */
function SourceBadge({ sourceType }: { sourceType: 'measured' | 'modeled' }) {
  const isMeasured = sourceType === 'measured';
  
  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
        ${isMeasured 
          ? 'bg-flow/10 text-flow border border-flow/20' 
          : 'bg-steel/10 text-steel border border-steel/20'
        }
      `}
      aria-label={isMeasured ? 'Measured production data' : 'Modeled projection'}
    >
      {isMeasured ? 'Measured' : 'Modeled'}
    </span>
  );
}

/**
 * Individual proof point card
 */
function ProofCard({
  point,
  isInView,
  reducedMotion,
  index,
}: {
  point: ProofPoint;
  isInView: boolean;
  reducedMotion: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: reducedMotion ? 0 : 0.5, 
        delay: reducedMotion ? 0 : index * 0.1 
      }}
      className="flex flex-col items-center text-center p-4 md:p-6"
    >
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-flow mb-2">
        <AnimatedMetric 
          point={point} 
          isInView={isInView} 
          reducedMotion={reducedMotion} 
        />
      </div>
      <div className="text-steel text-sm md:text-base mb-2">
        {point.label}
      </div>
      <SourceBadge sourceType={point.sourceType} />
      {point.qualifier && (
        <div className="text-steel/60 text-xs mt-1">
          {point.qualifier}
        </div>
      )}
    </motion.div>
  );
}

/**
 * ProofStripV2 - Main component
 * 
 * Displays proof points in a horizontal strip with animated count-up on scroll.
 * Data-driven from content model.
 */
export function ProofStripV2({
  proofPoints: providedPoints,
  testId = 'proof-strip',
  className = '',
  showAll = false,
}: ProofStripV2Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const reducedMotion = useReducedMotion() ?? false;
  
  // Use provided points or fetch from content model
  const allPoints = providedPoints ?? getProofPoints();
  
  // Filter to measured points only for the main strip (modeled shown elsewhere)
  const displayPoints = showAll 
    ? allPoints 
    : allPoints.filter(p => p.sourceType === 'measured');

  return (
    <section
      ref={ref}
      data-testid={testId}
      className={`
        bg-void-light border-y border-steel/10
        py-8 md:py-12
        ${className}
      `}
      aria-label="Scale proof metrics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {displayPoints.map((point, index) => (
            <ProofCard
              key={point.label}
              point={point}
              isInView={isInView}
              reducedMotion={reducedMotion}
              index={index}
            />
          ))}
        </div>
        
        {/* Optional: Show context line */}
        <div className="text-center mt-6 text-steel/60 text-sm">
          Production data from live flatbed and reefer operations
        </div>
      </div>
    </section>
  );
}

/**
 * ProofStripCompactV2 - Smaller variant for use in cards/sidebars
 */
export function ProofStripCompactV2({
  proofPoints: providedPoints,
  testId = 'proof-strip-compact',
}: ProofStripV2Props) {
  const allPoints = providedPoints ?? getProofPoints();
  const measuredPoints = allPoints.filter(p => p.sourceType === 'measured');

  return (
    <div 
      data-testid={testId}
      className="flex flex-wrap gap-4 justify-center"
    >
      {measuredPoints.slice(0, 3).map(point => (
        <div key={point.label} className="text-center">
          <div className="text-xl font-bold text-flow">{point.metric}</div>
          <div className="text-xs text-steel">{point.label}</div>
        </div>
      ))}
    </div>
  );
}

export default ProofStripV2;

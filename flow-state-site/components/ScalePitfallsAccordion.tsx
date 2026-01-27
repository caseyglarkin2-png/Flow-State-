/**
 * ScalePitfallsAccordion Component
 * Sprint 2.4: Accordion for Scale Anti-Patterns
 * 
 * Displays common scaling pitfalls with expandable details
 * for the /scale page to educate prospects on common mistakes.
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  getScalePitfalls,
  getScalePitfallsCritical,
  type ScalePitfall,
} from '@/lib/content';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface ScalePitfallsAccordionProps {
  /** Override default pitfalls from content model */
  pitfalls?: ScalePitfall[];
  /** Initially expanded pitfall ID */
  defaultExpandedId?: string | null;
  /** Show only critical pitfalls */
  criticalOnly?: boolean;
  /** Callback when pitfall is expanded */
  onExpand?: (pitfall: ScalePitfall) => void;
  /** Custom className */
  className?: string;
  /** Test ID */
  testId?: string;
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

interface SeverityBadgeProps {
  severity: ScalePitfall['severity'];
}

function SeverityBadge({ severity }: SeverityBadgeProps) {
  const colors: Record<ScalePitfall['severity'], string> = {
    critical: 'bg-neon/20 text-neon border-neon/30',
    high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    medium: 'bg-flow/20 text-flow border-flow/30',
  };

  return (
    <span
      className={`
        text-xs font-semibold uppercase tracking-wider
        px-2 py-0.5 rounded border
        ${colors[severity]}
      `}
      aria-label={`${severity} severity`}
    >
      {severity}
    </span>
  );
}

interface ChevronIconProps {
  isExpanded: boolean;
}

function ChevronIcon({ isExpanded }: ChevronIconProps) {
  return (
    <svg
      className={`
        w-5 h-5 text-steel transition-transform duration-200
        ${isExpanded ? 'rotate-180' : 'rotate-0'}
      `}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

interface PitfallItemProps {
  pitfall: ScalePitfall;
  isExpanded: boolean;
  onClick: () => void;
  reducedMotion: boolean | null;
}

function PitfallItem({
  pitfall,
  isExpanded,
  onClick,
  reducedMotion,
}: PitfallItemProps) {
  return (
    <div 
      className="border-b border-void-light last:border-b-0"
      data-testid={`pitfall-${pitfall.id}`}
    >
      {/* Header */}
      <button
        type="button"
        onClick={onClick}
        className="
          w-full flex items-center justify-between gap-4
          py-4 px-4 text-left
          hover:bg-void-light transition-colors duration-200
        "
        aria-expanded={isExpanded}
        aria-controls={`pitfall-content-${pitfall.id}`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <SeverityBadge severity={pitfall.severity} />
          <h3 className="text-white font-medium truncate">
            {pitfall.antiPattern}
          </h3>
        </div>
        <ChevronIcon isExpanded={isExpanded} />
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`pitfall-content-${pitfall.id}`}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 pb-4 space-y-4">
              {/* Why It Fails */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neon mb-2">
                  Why It Fails
                </h4>
                <p className="text-steel leading-relaxed">
                  {pitfall.whyItFails}
                </p>
              </div>

              {/* YardFlow Approach */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-flow mb-2">
                  YardFlow Approach
                </h4>
                <p className="text-sm text-flow-light bg-flow/5 p-3 rounded-lg border border-flow/20">
                  {pitfall.yardFlowApproach}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function ScalePitfallsAccordion({
  pitfalls: customPitfalls,
  defaultExpandedId = null,
  criticalOnly = false,
  onExpand,
  className = '',
  testId = 'scale-pitfalls',
}: ScalePitfallsAccordionProps) {
  const allPitfalls = customPitfalls ?? (criticalOnly ? getScalePitfallsCritical() : getScalePitfalls());
  const [expandedId, setExpandedId] = useState<string | null>(defaultExpandedId);
  const reducedMotion = useReducedMotion();

  const handleToggle = (pitfall: ScalePitfall) => {
    const newId = expandedId === pitfall.id ? null : pitfall.id;
    setExpandedId(newId);
    if (newId) {
      onExpand?.(pitfall);
    }
  };

  return (
    <section
      className={`bg-void rounded-xl overflow-hidden ${className}`}
      data-testid={testId}
      aria-label="Common scaling pitfalls"
    >
      <header className="px-4 py-3 border-b border-void-light bg-void-dark">
        <h2 className="text-lg font-semibold text-white">
          {criticalOnly ? 'Critical Pitfalls' : 'Common Scaling Pitfalls'}
        </h2>
        <p className="text-sm text-steel mt-1">
          Avoid these mistakes when scaling yard operations
        </p>
      </header>

      <div className="divide-y divide-void-light">
        {allPitfalls.map((pitfall) => (
          <PitfallItem
            key={pitfall.id}
            pitfall={pitfall}
            isExpanded={expandedId === pitfall.id}
            onClick={() => handleToggle(pitfall)}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>

      {allPitfalls.length === 0 && (
        <div className="p-8 text-center text-steel" data-testid="empty-state">
          No pitfalls to display.
        </div>
      )}
    </section>
  );
}

// -----------------------------------------------------------------------------
// Summary Variant (For Hero Sections)
// -----------------------------------------------------------------------------

export interface ScalePitfallsSummaryProps {
  /** Number of pitfalls to show */
  count?: number;
  /** Show only critical */
  criticalOnly?: boolean;
  /** Custom className */
  className?: string;
  /** Test ID */
  testId?: string;
}

export function ScalePitfallsSummary({
  count = 3,
  criticalOnly = true,
  className = '',
  testId = 'scale-pitfalls-summary',
}: ScalePitfallsSummaryProps) {
  const pitfalls = criticalOnly ? getScalePitfallsCritical() : getScalePitfalls();
  const displayPitfalls = pitfalls.slice(0, count);

  return (
    <div
      className={`space-y-2 ${className}`}
      data-testid={testId}
    >
      {displayPitfalls.map((pitfall) => (
        <div
          key={pitfall.id}
          className="flex items-center gap-3 p-3 bg-void-dark rounded-lg"
          data-testid={`summary-${pitfall.id}`}
        >
          <SeverityBadge severity={pitfall.severity} />
          <span className="text-white text-sm font-medium">
            {pitfall.antiPattern}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ScalePitfallsAccordion;

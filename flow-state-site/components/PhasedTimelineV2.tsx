/**
 * PhasedTimelineV2 Component
 * Sprint 2.3: Visual Timeline for 5-Phase Rollout Framework
 * 
 * Displays the implementation phases as a visual timeline
 * with status indicators, outcomes, and phase descriptions.
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  getImplementationPhases,
  type RolloutPhase,
} from '@/lib/content';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface PhasedTimelineV2Props {
  /** Override default phases from content model */
  phases?: RolloutPhase[];
  /** Initially expanded phase (0 = none, 1-5 = phase number) */
  defaultExpandedPhase?: number;
  /** Highlight current phase */
  currentPhase?: number;
  /** Callback when phase is selected */
  onPhaseSelect?: (phase: RolloutPhase) => void;
  /** Compact mode for smaller spaces */
  compact?: boolean;
  /** Custom className */
  className?: string;
  /** Test ID */
  testId?: string;
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

interface PhaseIconProps {
  icon: RolloutPhase['icon'];
  isActive: boolean;
  isCurrent: boolean;
}

function PhaseIcon({ icon, isActive, isCurrent }: PhaseIconProps) {
  const baseClass = `
    w-10 h-10 rounded-full flex items-center justify-center
    transition-colors duration-300
    ${isCurrent 
      ? 'bg-flow text-void' 
      : isActive 
        ? 'bg-void-light text-flow' 
        : 'bg-void-dark text-steel'
    }
  `;

  const icons: Record<RolloutPhase['icon'], React.ReactNode> = {
    poc: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    ),
    pilot: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" />
      </svg>
    ),
    scale: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12h4l3-9l4 18l3-9h4" />
      </svg>
    ),
    rollout: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9l-4-18l-3 9H4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    innovation: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9.5 2A6.5 6.5 0 0116 8.5c0 1.3-.4 2.5-1 3.5l6 6-1.5 1.5-6-6c-1 .6-2.2 1-3.5 1A6.5 6.5 0 019.5 2z" />
        <circle cx="9.5" cy="8.5" r="4" />
      </svg>
    ),
  };

  return (
    <div className={baseClass} aria-hidden="true">
      {icons[icon] || icons.poc}
    </div>
  );
}

interface TimelineConnectorProps {
  isCompleted: boolean;
}

function TimelineConnector({ isCompleted }: TimelineConnectorProps) {
  return (
    <div 
      className={`
        w-0.5 h-8 mx-auto
        ${isCompleted ? 'bg-flow' : 'bg-void-light'}
        transition-colors duration-300
      `}
      aria-hidden="true"
    />
  );
}

interface PhaseCardProps {
  phase: RolloutPhase;
  isExpanded: boolean;
  isCurrent: boolean;
  isCompleted: boolean;
  onClick: () => void;
  reducedMotion: boolean | null;
}

function PhaseCard({
  phase,
  isExpanded,
  isCurrent,
  isCompleted,
  onClick,
  reducedMotion,
}: PhaseCardProps) {
  return (
    <div className="flex gap-4">
      {/* Timeline Node */}
      <div className="flex flex-col items-center">
        <PhaseIcon 
          icon={phase.icon} 
          isActive={isExpanded} 
          isCurrent={isCurrent} 
        />
        {phase.phase < 5 && (
          <TimelineConnector isCompleted={isCompleted || isCurrent} />
        )}
      </div>

      {/* Phase Content */}
      <motion.article
        initial={reducedMotion ? false : { opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: phase.phase * 0.1 }}
        className={`
          flex-1 mb-4 rounded-lg p-4 cursor-pointer
          transition-colors duration-200
          ${isCurrent 
            ? 'bg-flow/10 border border-flow/30' 
            : 'bg-void-dark hover:bg-void-light border border-transparent'
          }
        `}
        onClick={onClick}
        data-testid={`phase-${phase.phase}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        aria-expanded={isExpanded}
      >
        {/* Header */}
        <header className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span 
              className={`
                text-xs font-semibold uppercase tracking-wider
                px-2 py-0.5 rounded
                ${isCurrent ? 'bg-flow text-void' : 'bg-void text-steel'}
              `}
            >
              Phase {phase.phase}
            </span>
            <h3 className={`font-semibold ${isCurrent ? 'text-flow' : 'text-white'}`}>
              {phase.label}
            </h3>
          </div>
          <span className="text-sm text-steel">{phase.timeframe}</span>
        </header>

        {/* Description */}
        <p className="text-steel text-sm mb-2">{phase.description}</p>

        {/* Expanded Outcomes */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mt-4 pt-4 border-t border-void-light">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-steel mb-2">
                  Outcomes
                </h4>
                <ul className="space-y-1">
                  {phase.outcomes.map((outcome, idx) => (
                    <li 
                      key={idx}
                      className="flex items-start gap-2 text-sm text-steel-light"
                    >
                      <span className="text-flow mt-1">✓</span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Compact Variant
// -----------------------------------------------------------------------------

interface CompactPhaseProps {
  phase: RolloutPhase;
  isCurrent: boolean;
  isCompleted: boolean;
}

function CompactPhase({ phase, isCurrent, isCompleted }: CompactPhaseProps) {
  return (
    <div 
      className="flex items-center gap-2"
      data-testid={`phase-compact-${phase.phase}`}
    >
      <div 
        className={`
          w-3 h-3 rounded-full
          ${isCompleted ? 'bg-flow' : isCurrent ? 'bg-flow animate-pulse' : 'bg-void-light'}
        `}
        aria-hidden="true"
      />
      <span 
        className={`
          text-sm font-medium
          ${isCurrent ? 'text-flow' : isCompleted ? 'text-steel-light' : 'text-steel'}
        `}
      >
        {phase.shortLabel}
      </span>
      {isCurrent && (
        <span className="text-xs text-flow bg-flow/10 px-2 py-0.5 rounded">
          Current
        </span>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function PhasedTimelineV2({
  phases: customPhases,
  defaultExpandedPhase = 0,
  currentPhase = 0,
  onPhaseSelect,
  compact = false,
  className = '',
  testId = 'phased-timeline',
}: PhasedTimelineV2Props) {
  const phases = customPhases ?? getImplementationPhases();
  const [expandedPhase, setExpandedPhase] = useState(defaultExpandedPhase);
  const reducedMotion = useReducedMotion();

  const handlePhaseClick = (phase: RolloutPhase) => {
    setExpandedPhase(prev => prev === phase.phase ? 0 : phase.phase);
    onPhaseSelect?.(phase);
  };

  if (compact) {
    return (
      <div
        className={`flex flex-wrap gap-4 ${className}`}
        data-testid={`${testId}-compact`}
        role="list"
        aria-label="Implementation phases"
      >
        {phases.map((phase) => (
          <CompactPhase
            key={phase.phase}
            phase={phase}
            isCurrent={phase.phase === currentPhase}
            isCompleted={phase.phase < currentPhase}
          />
        ))}
      </div>
    );
  }

  return (
    <section
      className={`${className}`}
      data-testid={testId}
      aria-label="Implementation timeline"
    >
      {phases.map((phase) => (
        <PhaseCard
          key={phase.phase}
          phase={phase}
          isExpanded={expandedPhase === phase.phase}
          isCurrent={phase.phase === currentPhase}
          isCompleted={phase.phase < currentPhase}
          onClick={() => handlePhaseClick(phase)}
          reducedMotion={reducedMotion}
        />
      ))}
    </section>
  );
}

// -----------------------------------------------------------------------------
// Summary Variant
// -----------------------------------------------------------------------------

export interface PhasedTimelineSummaryProps {
  /** Current phase number */
  currentPhase?: number;
  /** Custom className */
  className?: string;
  /** Test ID */
  testId?: string;
}

export function PhasedTimelineSummary({
  currentPhase = 1,
  className = '',
  testId = 'phased-timeline-summary',
}: PhasedTimelineSummaryProps) {
  const phases = getImplementationPhases();
  const current = phases.find(p => p.phase === currentPhase) || phases[0];
  const progress = ((currentPhase - 1) / (phases.length - 1)) * 100;

  return (
    <div
      className={`bg-void-dark rounded-lg p-4 ${className}`}
      data-testid={testId}
    >
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-steel mb-1">
          <span>Phase {currentPhase} of {phases.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-2 bg-void rounded-full overflow-hidden">
          <div 
            className="h-full bg-flow transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current Phase */}
      <div className="flex items-center gap-3">
        <PhaseIcon icon={current.icon} isActive isCurrent />
        <div>
          <h4 className="font-semibold text-white">{current.label}</h4>
          <p className="text-sm text-steel">{current.timeframe}</p>
        </div>
      </div>
    </div>
  );
}

export default PhasedTimelineV2;

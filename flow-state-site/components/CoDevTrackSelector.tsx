/**
 * CoDevTrackSelector Component
 * Sprint 2.2: Tabbed Flatbed/Reefer Selector
 * 
 * Displays co-development opportunities organized by track (Flatbed, Reefer)
 * with interactive tab selection and opportunity cards.
 */

'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  getCoDevTracks,
  getCoDevOpportunities,
  type CoDevTrack,
  type CoDevOpportunity,
} from '@/lib/content';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface CoDevTrackSelectorProps {
  /** Override default tracks from content model */
  tracks?: CoDevTrack[];
  /** Default selected track ID */
  defaultTrack?: 'flatbed' | 'reefer';
  /** Callback when track changes */
  onTrackChange?: (trackId: string) => void;
  /** Callback when opportunity is selected */
  onOpportunitySelect?: (opportunity: CoDevOpportunity) => void;
  /** Custom className for styling */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

interface TabButtonProps {
  track: CoDevTrack;
  isActive: boolean;
  onClick: () => void;
  reducedMotion: boolean | null;
}

function TabButton({ track, isActive, onClick, reducedMotion }: TabButtonProps) {
  const opportunityCount = track.opportunities?.length ?? 0;
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative px-6 py-3 font-medium text-sm md:text-base
        transition-colors duration-200
        ${isActive 
          ? 'text-flow' 
          : 'text-steel hover:text-white'
        }
      `}
      aria-selected={isActive}
      role="tab"
      data-testid={`tab-${track.vertical}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        <TrackIcon track={track.vertical} />
        {track.displayName.replace(' Track', '')}
        <span className="text-xs opacity-60">
          ({opportunityCount})
        </span>
      </span>
      
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-void-light rounded-lg border border-flow/30"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            type: 'spring', 
            stiffness: 500, 
            damping: 30 
          }}
        />
      )}
    </button>
  );
}

interface TrackIconProps {
  track: 'flatbed' | 'reefer' | string;
}

function TrackIcon({ track }: TrackIconProps) {
  if (track === 'flatbed') {
    return (
      <svg 
        className="w-5 h-5" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
        aria-hidden="true"
      >
        <rect x="2" y="10" width="20" height="4" strokeWidth="2" rx="1" />
        <circle cx="6" cy="17" r="2" strokeWidth="2" />
        <circle cx="18" cy="17" r="2" strokeWidth="2" />
        <line x1="8" y1="17" x2="16" y2="17" strokeWidth="2" />
      </svg>
    );
  }
  
  // Reefer icon
  return (
    <svg 
      className="w-5 h-5" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="16" height="12" strokeWidth="2" rx="1" />
      <rect x="18" y="6" width="4" height="8" strokeWidth="2" rx="1" />
      <circle cx="6" cy="19" r="2" strokeWidth="2" />
      <circle cx="14" cy="19" r="2" strokeWidth="2" />
      <path d="M7 8 L11 12 L7 12 M11 8 L7 12" strokeWidth="1.5" />
    </svg>
  );
}

interface OpportunityCardProps {
  opportunity: CoDevOpportunity;
  index: number;
  onClick?: (opportunity: CoDevOpportunity) => void;
  reducedMotion: boolean | null;
}

function OpportunityCard({ 
  opportunity, 
  index, 
  onClick,
  reducedMotion,
}: OpportunityCardProps) {
  const priorityColors: Record<string, string> = {
    high: 'border-l-neon text-neon',
    medium: 'border-l-flow text-flow',
    low: 'border-l-steel text-steel',
  };
  
  const priorityColor = priorityColors[opportunity.priority] || priorityColors.medium;
  
  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
      transition={{ 
        duration: 0.3, 
        delay: reducedMotion ? 0 : index * 0.1,
      }}
      className={`
        bg-void-dark border-l-4 ${priorityColor.split(' ')[0]}
        rounded-lg p-5 cursor-pointer
        hover:bg-void-light transition-colors duration-200
      `}
      onClick={() => onClick?.(opportunity)}
      data-testid={`opportunity-${opportunity.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(opportunity);
        }
      }}
    >
      <header className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">
          {opportunity.title}
        </h3>
        <span 
          className={`
            text-xs font-medium uppercase tracking-wider
            px-2 py-1 rounded ${priorityColor.split(' ')[1]} bg-void
          `}
          aria-label={`${opportunity.priority} priority`}
        >
          {opportunity.priority}
        </span>
      </header>
      
      <p className="text-steel text-sm mb-4 leading-relaxed">
        {opportunity.description}
      </p>
      
      <footer className="text-xs text-flow-light">
        <span className="font-medium">Benefit: </span>
        {opportunity.benefit}
      </footer>
    </motion.article>
  );
}

interface EmptyStateProps {
  trackName: string;
}

function EmptyState({ trackName }: EmptyStateProps) {
  return (
    <div 
      className="text-center py-12 text-steel"
      data-testid="empty-state"
    >
      <p>No opportunities available for {trackName} track.</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function CoDevTrackSelector({
  tracks: customTracks,
  defaultTrack = 'flatbed',
  onTrackChange,
  onOpportunitySelect,
  className = '',
  testId = 'codev-track-selector',
}: CoDevTrackSelectorProps) {
  const tracks = customTracks ?? getCoDevTracks();
  const [activeTrackId, setActiveTrackId] = useState<string>(defaultTrack);
  const reducedMotion = useReducedMotion();
  
  const activeTrack = tracks.find(t => t.vertical === activeTrackId) || tracks[0];
  const opportunities = getCoDevOpportunities(activeTrackId as 'flatbed' | 'reefer');
  
  const handleTrackChange = useCallback((trackId: string) => {
    setActiveTrackId(trackId);
    onTrackChange?.(trackId);
  }, [onTrackChange]);
  
  return (
    <section
      className={`bg-void rounded-xl p-6 md:p-8 ${className}`}
      data-testid={testId}
      aria-label="Co-development track selector"
    >
      {/* Track Tabs */}
      <div 
        className="flex gap-2 mb-8 border-b border-void-light pb-4"
        role="tablist"
        aria-label="Co-development tracks"
      >
        {tracks.map((track) => (
          <TabButton
            key={track.vertical}
            track={track}
            isActive={track.vertical === activeTrackId}
            onClick={() => handleTrackChange(track.vertical)}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
      
      {/* Track Description */}
      <motion.div
        key={activeTrack.vertical + '-desc'}
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <h2 className="text-xl font-semibold text-white mb-2">
          {activeTrack.displayName.replace(' Track', '')} Opportunities
        </h2>
        <p className="text-steel">
          {activeTrack.description}
        </p>
      </motion.div>
      
      {/* Opportunities Grid */}
      <div 
        className="grid gap-4 md:grid-cols-2"
        role="tabpanel"
        aria-label={`${activeTrack.displayName} opportunities`}
      >
        <AnimatePresence mode="wait">
          {opportunities.length > 0 ? (
            opportunities.map((opp, index) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                index={index}
                onClick={onOpportunitySelect}
                reducedMotion={reducedMotion}
              />
            ))
          ) : (
            <EmptyState trackName={activeTrack.displayName} />
          )}
        </AnimatePresence>
      </div>
      
      {/* Track CTA */}
      <div className="mt-8 pt-6 border-t border-void-light text-center">
        <button
          type="button"
          className="
            inline-flex items-center gap-2
            bg-flow hover:bg-flow-dark text-void
            font-semibold px-6 py-3 rounded-lg
            transition-colors duration-200
          "
          data-testid="track-cta"
        >
          Apply for {activeTrack.displayName.replace(' Track', '')} Co-Dev
          <svg 
            className="w-4 h-4" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Compact Variant
// -----------------------------------------------------------------------------

export interface CoDevTrackSelectorCompactProps {
  /** Track to display */
  trackId?: 'flatbed' | 'reefer';
  /** Max opportunities to show */
  maxOpportunities?: number;
  /** Custom className */
  className?: string;
  /** Test ID */
  testId?: string;
}

export function CoDevTrackSelectorCompact({
  trackId = 'flatbed',
  maxOpportunities = 2,
  className = '',
  testId = 'codev-selector-compact',
}: CoDevTrackSelectorCompactProps) {
  const tracks = getCoDevTracks();
  const track = tracks.find(t => t.vertical === trackId) || tracks[0];
  const opportunities = getCoDevOpportunities(trackId).slice(0, maxOpportunities);
  const totalOpportunities = track?.opportunities?.length ?? 0;
  const reducedMotion = useReducedMotion();
  
  return (
    <div
      className={`bg-void-dark rounded-lg p-4 ${className}`}
      data-testid={testId}
    >
      <div className="flex items-center gap-2 mb-3">
        <TrackIcon track={track.vertical} />
        <span className="font-medium text-white">
          {track.displayName.replace(' Track', '')}
        </span>
        <span className="text-xs text-steel">
          ({opportunities.length} of {totalOpportunities})
        </span>
      </div>
      
      <div className="space-y-2">
        {opportunities.map((opp, index) => (
          <div
            key={opp.id}
            className="text-sm text-steel hover:text-white transition-colors"
          >
            <motion.span
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              • {opp.title}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoDevTrackSelector;

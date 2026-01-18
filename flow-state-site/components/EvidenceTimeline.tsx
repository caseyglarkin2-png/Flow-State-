/**
 * EVIDENCE TIMELINE
 * Shows proof-of-reality: timestamp capture → exception → resolution
 * Makes compliance/audit readiness tangible
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion-presets';
import { Shield, FlowArrow } from '@/components/icons/FlowIcons';

export interface TimelineEvent {
  time: string;
  type: 'check-in' | 'exception' | 'alert' | 'resolution' | 'lock';
  description: string;
  actor?: string;
  badge?: string;
}

interface EvidenceTimelineProps {
  events: TimelineEvent[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const eventIcons = {
  'check-in': '✓',
  'exception': '⚠',
  'alert': '→',
  'resolution': '✓',
  'lock': '🔒',
};

const eventColors = {
  'check-in': 'text-neon border-neon/30 bg-neon/10',
  'exception': 'text-ember border-ember/30 bg-ember/10',
  'alert': 'text-steel border-steel/30 bg-steel/10',
  'resolution': 'text-neon border-neon/30 bg-neon/10',
  'lock': 'text-steel border-steel/30 bg-steel/10',
};

export default function EvidenceTimeline({
  events,
  title = 'Evidence Timeline',
  subtitle = 'Every event timestamped, every exception tracked, every resolution auditable.',
  className = '',
}: EvidenceTimelineProps) {
  return (
    <div className={`${className}`}>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Shield size={20} className="text-neon" />
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-sm text-steel">{subtitle}</p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="relative"
      >
        {/* Timeline spine */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-steel/20" />

        {/* Events */}
        <div className="space-y-4">
          {events.map((event, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="relative flex gap-4"
            >
              {/* Time marker */}
              <div className="flex-shrink-0 w-24 text-right">
                <span className="text-sm font-mono text-steel/70">{event.time}</span>
              </div>

              {/* Event icon */}
              <div className={`
                relative z-10 flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold
                ${eventColors[event.type]}
              `}>
                {eventIcons[event.type]}
              </div>

              {/* Event content */}
              <div className="flex-1 pb-4">
                <div className="rounded-lg border border-steel/10 bg-carbon/50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-white font-medium mb-1">{event.description}</p>
                      {event.actor && (
                        <p className="text-xs text-steel/70">By: {event.actor}</p>
                      )}
                    </div>
                    {event.badge && (
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-neon/10 text-neon border border-neon/20">
                        {event.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Audit trail badge */}
        <div className="mt-6 p-4 rounded-lg border border-neon/20 bg-neon/5 flex items-center gap-3">
          <Shield size={16} className="text-neon flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-white font-medium">Audit Trail Locked</p>
            <p className="text-xs text-steel/70">Cryptographically signed, immutable timestamp record</p>
          </div>
          <FlowArrow size={16} className="text-neon flex-shrink-0" />
        </div>
      </motion.div>
    </div>
  );
}

// SAMPLE DATA (for demos)
export const SAMPLE_TIMELINE: TimelineEvent[] = [
  {
    time: '12:03pm',
    type: 'check-in',
    description: 'Driver QR scan at gate kiosk',
    actor: 'Driver (ID: 8472)',
    badge: 'Verified',
  },
  {
    time: '12:04pm',
    type: 'exception',
    description: 'Exception flagged: No BOL match in system',
    badge: 'Alert',
  },
  {
    time: '12:04pm',
    type: 'alert',
    description: 'Real-time alert sent to yard coordinator',
    actor: 'System',
  },
  {
    time: '12:08pm',
    type: 'resolution',
    description: 'Manual override authorized, BOL uploaded',
    actor: 'Yard Coordinator (J. Martinez)',
  },
  {
    time: '12:09pm',
    type: 'lock',
    description: 'Timestamp locked, audit trail saved to Evidence Vault',
    badge: 'Immutable',
  },
];

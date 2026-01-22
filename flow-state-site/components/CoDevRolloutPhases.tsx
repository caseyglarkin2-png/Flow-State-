/**
 * CoDevRolloutPhases Component
 * 
 * Visual representation of the 3-phase rollout:
 * Phase 1: Network + Protocol Standardization (now)
 * Phase 2: Interoperable Data + Multi-site Operations (upcoming)
 * Phase 3: Advanced Modules including RTLS (future)
 * 
 * Responsive: vertical stack on mobile, horizontal timeline on desktop
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion-presets';
import { Confirm, Shield, Nexus, Velocity } from '@/components/icons/FlowIcons';
import type { CoDevPhase } from '@/src/content/coDevelopment';

interface CoDevRolloutPhasesProps {
  phases: CoDevPhase[];
  className?: string;
}

const phaseIcons = {
  1: Shield,
  2: Nexus,
  3: Velocity,
} as const;

const availabilityStyles = {
  now: {
    badge: 'bg-neon/20 text-neon border-neon/30',
    ring: 'ring-neon/50',
    connector: 'bg-neon/50',
    label: 'Available Now',
  },
  upcoming: {
    badge: 'bg-steel/20 text-steel border-steel/30',
    ring: 'ring-steel/30',
    connector: 'bg-steel/30',
    label: 'Upcoming',
  },
  future: {
    badge: 'bg-steel/10 text-steel/60 border-steel/20',
    ring: 'ring-steel/20',
    connector: 'bg-steel/20',
    label: 'Future',
  },
} as const;

export default function CoDevRolloutPhases({ phases, className = '' }: CoDevRolloutPhasesProps) {
  return (
    <section className={`py-16 ${className}`} aria-labelledby="rollout-phases-heading">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 id="rollout-phases-heading" className="text-3xl md:text-4xl font-black text-white mb-4">
            Rollout Phases
          </h2>
          <p className="text-steel/80 max-w-2xl mx-auto">
            Advanced modules become dramatically easier once your network shares the same protocols, IDs, and events.
          </p>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <motion.div 
          className="hidden md:block"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-steel/20" aria-hidden="true">
              <div 
                className="h-full bg-neon/50 transition-all duration-500" 
                style={{ width: '33%' }} 
              />
            </div>

            <div className="grid grid-cols-3 gap-4 relative">
              {phases.map((phase, index) => {
                const Icon = phaseIcons[phase.number as 1 | 2 | 3];
                const styles = availabilityStyles[phase.available];
                
                return (
                  <motion.div 
                    key={phase.id} 
                    variants={staggerItem}
                    className="text-center"
                  >
                    {/* Phase indicator */}
                    <div className="relative inline-flex items-center justify-center mb-6">
                      <div 
                        className={`
                          w-16 h-16 rounded-full bg-carbon border-2 
                          ${phase.available === 'now' ? 'border-neon' : 'border-steel/30'}
                          flex items-center justify-center relative z-10
                          ring-4 ${styles.ring}
                        `}
                      >
                        <Icon 
                          size={28} 
                          className={phase.available === 'now' ? 'text-neon' : 'text-steel/60'} 
                        />
                      </div>
                      {phase.available === 'now' && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-neon rounded-full flex items-center justify-center">
                          <Confirm size={14} className="text-void" />
                        </div>
                      )}
                    </div>

                    {/* Phase badge */}
                    <span className={`
                      inline-block px-3 py-1 rounded-full text-xs font-semibold border mb-3
                      ${styles.badge}
                    `}>
                      {styles.label}
                    </span>

                    {/* Phase content */}
                    <h3 className="text-lg font-bold text-white mb-2">
                      Phase {phase.number}: {phase.shortName}
                    </h3>
                    <p className="text-sm text-steel/70 leading-relaxed">
                      {phase.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Mobile: Vertical Stack */}
        <motion.div 
          className="md:hidden space-y-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {phases.map((phase, index) => {
            const Icon = phaseIcons[phase.number as 1 | 2 | 3];
            const styles = availabilityStyles[phase.available];
            const isLast = index === phases.length - 1;
            
            return (
              <motion.div 
                key={phase.id}
                variants={staggerItem}
                className="relative"
              >
                {/* Vertical connector */}
                {!isLast && (
                  <div 
                    className={`absolute left-7 top-16 bottom-0 w-0.5 ${styles.connector}`}
                    aria-hidden="true"
                  />
                )}

                <div className="flex gap-4">
                  {/* Phase indicator */}
                  <div className="flex-shrink-0">
                    <div 
                      className={`
                        w-14 h-14 rounded-full bg-carbon border-2 
                        ${phase.available === 'now' ? 'border-neon' : 'border-steel/30'}
                        flex items-center justify-center relative
                        ring-4 ${styles.ring}
                      `}
                    >
                      <Icon 
                        size={24} 
                        className={phase.available === 'now' ? 'text-neon' : 'text-steel/60'} 
                      />
                      {phase.available === 'now' && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-neon rounded-full flex items-center justify-center">
                          <Confirm size={12} className="text-void" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Phase content */}
                  <div className="flex-1 pb-6">
                    <span className={`
                      inline-block px-2 py-0.5 rounded-full text-xs font-semibold border mb-2
                      ${styles.badge}
                    `}>
                      {styles.label}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-1">
                      Phase {phase.number}: {phase.shortName}
                    </h3>
                    <p className="text-sm text-steel/70 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA callout */}
        <div className="mt-12 p-6 rounded-xl bg-neon/5 border border-neon/20 text-center">
          <p className="text-steel/90">
            <span className="text-white font-semibold">Start with Phase 1.</span>{' '}
            Once your network baseline is in place, Phase 2 and 3 modules unlock automatically.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * BEFORE/AFTER TOGGLE
 * Visceral chaos→control transition
 * Shows the operational reality before/after standards
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '@/lib/motion-presets';
import Image from 'next/image';

export interface BeforeAfterContent {
  before: {
    title: string;
    description: string;
    metrics?: Array<{ label: string; value: string; negative?: boolean; positive?: boolean }>;
    visual?: React.ReactNode;
  };
  after: {
    title: string;
    description: string;
    metrics?: Array<{ label: string; value: string; negative?: boolean; positive?: boolean }>;
    visual?: React.ReactNode;
  };
}

interface BeforeAfterToggleProps {
  content: BeforeAfterContent;
  className?: string;
  mode?: 'side-by-side' | 'overlay';
}

export default function BeforeAfterToggle({
  content,
  className = '',
  mode = 'overlay',
}: BeforeAfterToggleProps) {
  const [view, setView] = useState<'before' | 'after'>('before');

  const current = view === 'before' ? content.before : content.after;

  return (
    <div className={`${className}`}>
      {/* Toggle Controls */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <button
          onClick={() => setView('before')}
          className={`
            px-6 py-3 rounded-lg font-semibold transition-all duration-300
            ${view === 'before' 
              ? 'bg-ember text-white border-2 border-ember' 
              : 'bg-carbon text-steel border-2 border-steel/20 hover:border-steel/40'
            }
          `}
          aria-pressed={view === 'before'}
          aria-label="Show before state"
        >
          Before: Chaos
        </button>
        
        <div className="px-4 text-steel">→</div>
        
        <button
          onClick={() => setView('after')}
          className={`
            px-6 py-3 rounded-lg font-semibold transition-all duration-300
            ${view === 'after' 
              ? 'bg-neon text-void border-2 border-neon' 
              : 'bg-carbon text-steel border-2 border-steel/20 hover:border-steel/40'
            }
          `}
          aria-pressed={view === 'after'}
          aria-label="Show after state"
        >
          After: Standards
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="rounded-2xl border-2 border-steel/20 bg-carbon/50 p-8 md:p-12"
        >
          {/* Title */}
          <h3 className={`
            text-2xl md:text-3xl font-black mb-4
            ${view === 'before' ? 'text-ember' : 'text-neon'}
          `}>
            {current.title}
          </h3>

          {/* Description */}
          <p className="text-steel text-lg leading-relaxed mb-8">
            {current.description}
          </p>

          {/* Metrics */}
          {current.metrics && current.metrics.length > 0 && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
                {current.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className={`
                      p-4 rounded-lg border
                      ${metric.negative 
                        ? 'border-ember/20 bg-ember/5' 
                        : metric.positive 
                          ? 'border-neon/20 bg-neon/5' 
                          : 'border-steel/10 bg-carbon/30'
                      }
                    `}
                  >
                    <div className={`
                      text-2xl font-black mb-1
                      ${metric.negative ? 'text-ember' : metric.positive ? 'text-neon' : 'text-white'}
                    `}>
                      {metric.value}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-steel/70">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-steel/60 mb-6">Illustrative example. Results vary by facility layout, appointment discipline, and inbound mix.</p>
            </>
          )}

          {/* Visual */}
          {current.visual && (
            <div className="mt-6">
              {current.visual}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// SAMPLE CONTENT (for homepage demo)
export const SAMPLE_BEFORE_AFTER: BeforeAfterContent = {
  before: {
    title: 'Before: The Variance Tax',
    description: 'Manual check-in creates random queues. Trailers disappear once they move. Dwell spikes become detention disputes. Every yard runs differently, so every problem is unique.',
    metrics: [
      { label: 'Gate Labor', value: '4-6 FTE', negative: true },
      { label: 'Avg Dwell', value: '48 min', negative: true },
      { label: 'Detention Recovery', value: '35%', negative: true },
    ],
    visual: (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-ember/30 bg-carbon">
        <video
          src="/proof/pickup-vs-delivery-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/proof/pickup-vs-delivery-1.png"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  after: {
    title: 'After: Standardized Execution',
    description: 'Self-service kiosks replace manual check-in. Real-time yard visibility. FIFO enforcement. Defensible timestamps kill disputes. Every yard runs the same driver journey protocol.',
    metrics: [
      { label: 'Gate Labor', value: '1-2 FTE', positive: true },
      { label: 'Avg Dwell', value: '24 min', positive: true },
      { label: 'Detention Recovery', value: '65%', positive: true },
    ],
    visual: (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-neon/30 bg-carbon">
        <video
          src="/proof/kiosk-demo.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/proof/quick-drop.png"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
};

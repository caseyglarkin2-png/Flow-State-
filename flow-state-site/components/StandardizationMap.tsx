'use client';

import React, { useState } from 'react';
import { Confirm } from './icons/FlowIcons';

/**
 * StandardizationMap - Visual representation of YardFlow's standardization approach
 * 
 * Shows the difference between:
 * - Legacy YMS: Builds around 15-25 unique "snowflake" processes per yard
 * - YardFlow: Standardizes the 10 common denominators, then orchestrates from there
 * 
 * Interactive features:
 * - Toggle between "Chaos" (15-25) and "Standardized" (10) views
 * - Mobile-friendly: collapsed by default with expand affordance
 * - Visual representation of process consolidation
 */
export default function StandardizationMap() {
  const [view, setView] = useState<'chaos' | 'standardized'>('chaos');
  const [isExpanded, setIsExpanded] = useState(false);

  // 15-25 unique processes (chaos layer)
  const chaosProcesses = [
    'Clipboard check-in',
    'Radio dispatch',
    'Paper BOL',
    'Manual gate log',
    'Walkie coordination',
    'Whiteboard tracking',
    'Email updates',
    'Phone call verification',
    'Guard tower observation',
    'Yard walks for trailers',
    'Excel spreadsheets',
    'Physical manifest filing',
    'Hand-written timestamps',
    'Tribal knowledge routing',
    'Ad-hoc exception handling',
    'Site-specific dock rules',
    'Unique carrier protocols',
    'Custom reporting formats',
    'Local optimization hacks',
    'Informal escalation paths',
  ];

  // 10 common denominators (standardized subset)
  const standardizedProcesses = [
    { name: 'QR code check-in', module: 'Digital Guard' },
    { name: 'Defensible timestamps', module: 'Digital Guard' },
    { name: 'Exception reason codes', module: 'Digital Guard' },
    { name: 'Multi-language instructions', module: 'Digital Comms' },
    { name: 'Carrier verification', module: 'Digital Guard' },
    { name: 'Touchless BOL capture', module: 'Digital BOL' },
    { name: 'Real-time asset state', module: 'Digital YMS' },
    { name: 'Standardized yard map', module: 'Digital YMS' },
    { name: 'Automated dock assignments', module: 'Digital YMS' },
    { name: 'Network-wide data format', module: 'All Modules' },
  ];

  return (
    <section className="py-16 border-b border-neon/20 bg-carbon/20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 rounded-full bg-ember/20 border border-ember/40 mb-4">
            <span className="text-ember text-sm font-bold uppercase tracking-wider">
              THE STANDARDIZATION MODEL
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Legacy YMS builds around the <span className="text-ember">snowflake</span>.
            <br />
            YardFlow standardizes the <span className="text-neon">subset</span>.
          </h2>
          <p className="text-steel/80 max-w-3xl mx-auto text-lg">
            Every yard has 15-25 unique processes. But only 10 are common across all yards. 
            We standardize those 10 first, then orchestrate the network.
          </p>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full btn-neon flex items-center justify-between px-6 py-4 rounded-lg font-semibold border-2 border-neon text-neon hover:bg-neon hover:text-void transition-all"
          >
            <span>{isExpanded ? 'Hide' : 'Show'} Standardization Map</span>
            <svg
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Content (always visible on desktop, toggle on mobile) */}
        <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
          {/* View Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-void rounded-lg border border-steel/30">
              <button
                onClick={() => setView('chaos')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  view === 'chaos'
                    ? 'bg-ember/20 text-ember border border-ember/40'
                    : 'text-steel/60 hover:text-steel'
                }`}
              >
                Chaos (15-25 processes)
              </button>
              <button
                onClick={() => setView('standardized')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  view === 'standardized'
                    ? 'bg-neon/20 text-neon border border-neon/40'
                    : 'text-steel/60 hover:text-steel'
                }`}
              >
                Standardized (10 core)
              </button>
            </div>
          </div>

          {/* Chaos View */}
          {view === 'chaos' && (
            <div className="glass-card p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-ember mb-2">
                  Legacy YMS: Build around every snowflake
                </h3>
                <p className="text-steel/80">
                  Traditional systems try to accommodate all 15-25 unique processes per yard. 
                  Result: expensive customization, no network intelligence, every deployment starts from zero.
                </p>
              </div>

              {/* Chaos grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {chaosProcesses.slice(0, 20).map((process, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-ember/10 border border-ember/30 text-center"
                  >
                    <div className="text-ember/40 text-2xl mb-2">📋</div>
                    <p className="text-xs text-steel/80 font-medium leading-tight">
                      {process}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-ember/5 border border-ember/20">
                <p className="text-sm text-ember/90">
                  <strong>The Problem:</strong> Every yard is treated as unique. No shared intelligence. 
                  Deployment takes 6-12 months. Site 40 is just as hard as Site 1.
                </p>
              </div>
            </div>
          )}

          {/* Standardized View */}
          {view === 'standardized' && (
            <div className="glass-card p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-neon mb-2">
                  YardFlow: Standardize the subset, orchestrate the network
                </h3>
                <p className="text-steel/80">
                  We identified the 10 common denominators across all yards: driver journey, time capture, 
                  asset state, data format. Standardize these first, then network intelligence becomes possible.
                </p>
              </div>

              {/* Standardized list */}
              <div className="space-y-3">
                {standardizedProcesses.map((process, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-lg bg-neon/5 border border-neon/30 hover:bg-neon/10 transition-all"
                  >
                    <div className="flex-shrink-0">
                      <Confirm size={24} className="text-neon" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">{process.name}</p>
                      <p className="text-steel/60 text-sm">{process.module}</p>
                    </div>
                    <div className="hidden md:block">
                      <span className="px-3 py-1 rounded-full bg-neon/10 border border-neon/30 text-neon text-xs font-mono">
                        STANDARDIZED
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-neon/5 border border-neon/20">
                <p className="text-sm text-neon/90">
                  <strong>The Advantage:</strong> Once these 10 are standardized, the network wakes up. 
                  Cross-site intelligence. Faster rollouts (2-4 weeks). Site 40 is easier than Site 1.
                </p>
              </div>
            </div>
          )}

          {/* Caption */}
          <div className="mt-8 text-center">
            <p className="text-steel/70 max-w-2xl mx-auto">
              <strong className="text-white">Bottom line:</strong> Legacy YMS builds around the 15-25 snowflake processes. 
              YardFlow standardizes the 10 common denominators, then works up from there. 
              This is how you unlock network-level orchestration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ARCHETYPE EPISODE
 * Mini-flow for each persona: What breaks → What fixes it → Metrics
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerItem } from '@/lib/motion-presets';
import { FlowArrow } from '@/components/icons/FlowIcons';

export interface ArchetypeEpisodeProps {
  archetype: string;
  icon: React.ReactNode;
  problem: string;
  standardize: string;
  metrics: Array<{ label: string; value: string }>;
  flowSteps: Array<{ step: string; description: string }>;
  link: string;
  className?: string;
}

export default function ArchetypeEpisode({
  archetype,
  icon,
  problem,
  standardize,
  metrics,
  flowSteps,
  link,
  className = '',
}: ArchetypeEpisodeProps) {
  return (
    <motion.div
      variants={staggerItem}
      className={`
        group relative rounded-2xl border border-neon/10 bg-carbon/50 p-6 hover:border-neon/30 transition-all duration-300
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white group-hover:text-neon transition-colors">
            {archetype}
          </h3>
        </div>
      </div>

      {/* Problem */}
      <div className="mb-4">
        <p className="text-xs uppercase tracking-wider text-ember/70 mb-1">What Breaks</p>
        <p className="text-sm text-steel leading-relaxed">{problem}</p>
      </div>

      {/* Standardize First */}
      <div className="mb-4">
        <p className="text-xs uppercase tracking-wider text-neon/70 mb-1">Standardize First</p>
        <p className="text-sm text-steel leading-relaxed">{standardize}</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="rounded-lg border border-neon/10 bg-neon/5 px-3 py-2"
          >
            <div className="text-lg font-black text-neon">{metric.value}</div>
            <div className="text-xs text-steel/70">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Mini Flow Diagram */}
      <div className="mb-4 space-y-2">
        <p className="text-xs uppercase tracking-wider text-steel/50 mb-2">Flow</p>
        {flowSteps.map((step, index) => (
          <div key={index} className="flex items-start gap-2">
            <FlowArrow size={12} className="text-neon mt-1 flex-shrink-0" />
            <div>
              <span className="text-sm text-white font-medium">{step.step}</span>
              <p className="text-xs text-steel/70">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Link */}
      <Link
        href={link}
        className="inline-flex items-center gap-2 text-sm text-neon hover:text-white transition-colors group"
      >
        <span>Deep Dive</span>
        <FlowArrow size={12} className="text-neon group-hover:translate-x-1 transition-transform" />
      </Link>

      {/* Hover gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon/0 to-neon/0 group-hover:from-neon/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}

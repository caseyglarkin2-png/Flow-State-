/**
 * MICRO CASE STUDY
 * Proof module: Baseline → Intervention → Outcome → Evidence
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { slideUp } from '@/lib/motion-presets';
import { FlowArrow, Shield } from '@/components/icons/FlowIcons';

export interface MicroCaseStudyProps {
  title: string;
  archetype: string;
  baseline: {
    metric: string;
    value: string;
    problem: string;
  };
  intervention: {
    module: string;
    action: string;
  };
  outcome: {
    metric: string;
    value: string;
    improvement: string;
  };
  evidenceLink?: string;
  className?: string;
}

export default function MicroCaseStudy({
  title,
  archetype,
  baseline,
  intervention,
  outcome,
  evidenceLink,
  className = '',
}: MicroCaseStudyProps) {
  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`
        rounded-2xl border-2 border-neon/20 bg-gradient-to-br from-carbon/80 to-carbon/40 p-6 md:p-8
        ${className}
      `}
    >
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider text-neon/70 mb-1">{archetype}</p>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>

      {/* Flow: Baseline → Intervention → Outcome */}
      <div className="space-y-6">
        {/* Baseline */}
        <div className="relative">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-ember/10 border border-ember/30 flex items-center justify-center">
              <span className="text-ember font-bold text-sm">1</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-steel/70 mb-1">Baseline</p>
              <p className="text-2xl font-black text-ember mb-1">{baseline.value}</p>
              <p className="text-xs uppercase tracking-wider text-ember/70 mb-2">{baseline.metric}</p>
              <p className="text-sm text-steel leading-relaxed">{baseline.problem}</p>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center gap-2 pl-2">
          <FlowArrow size={16} className="text-steel/50" />
          <span className="text-xs text-steel/50">Intervention</span>
        </div>

        {/* Intervention */}
        <div className="relative">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neon/10 border border-neon/30 flex items-center justify-center">
              <span className="text-neon font-bold text-sm">2</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-steel/70 mb-1">Solution</p>
              <p className="text-white font-bold mb-2">{intervention.module}</p>
              <p className="text-sm text-steel leading-relaxed">{intervention.action}</p>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center gap-2 pl-2">
          <FlowArrow size={16} className="text-steel/50" />
          <span className="text-xs text-steel/50">Measured Outcome</span>
        </div>

        {/* Outcome */}
        <div className="relative">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neon/10 border border-neon/30 flex items-center justify-center">
              <span className="text-neon font-bold text-sm">3</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-steel/70 mb-1">Result</p>
              <p className="text-2xl font-black text-neon mb-1">{outcome.value}</p>
              <p className="text-xs uppercase tracking-wider text-neon/70 mb-2">{outcome.metric}</p>
              <p className="text-sm text-steel leading-relaxed">{outcome.improvement}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence link */}
      {evidenceLink && (
        <div className="mt-6 pt-6 border-t border-steel/10">
          <Link
            href={evidenceLink}
            className="inline-flex items-center gap-2 text-sm text-neon hover:text-white transition-colors group"
          >
            <Shield size={14} className="text-neon" />
            <span>View Evidence</span>
            <FlowArrow size={12} className="text-neon group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </motion.div>
  );
}

// SAMPLE DATA
export const SAMPLE_CASE_STUDY: MicroCaseStudyProps = {
  title: 'Gate Labor Reduction',
  archetype: 'Dry Van | High Volume',
  baseline: {
    metric: 'Gate Labor',
    value: '6 FTE',
    problem: 'Manual check-in creates bottlenecks during peak hours. Drivers wait 12-18 minutes average.',
  },
  intervention: {
    module: 'Digital Guard',
    action: 'Self-service kiosks with QR code check-in. Automated credential verification. Real-time yard assignments.',
  },
  outcome: {
    metric: 'Gate Labor',
    value: '2 FTE',
    improvement: '67% reduction in gate staffing. Average check-in time: 90 seconds. Same throughput, fewer FTEs.',
  },
  evidenceLink: '/resources/procurement',
};

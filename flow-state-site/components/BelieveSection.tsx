/**
 * BELIEVE SECTION
 * 
 * Purpose: Position ROI Calculator + Singularity as "proof engines"
 * Design: Two-column layout with click-to-start, lazy load, poster fallbacks
 * Message: "See It for Yourself. Ground Source Truth."
 * 
 * Canon: These are unique differentiators. Show, don't tell.
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem } from '@/lib/motion-presets';
import Link from 'next/link';
import { Metrics, Crosshair } from '@/components/icons/FlowIcons';

interface ProofEngineProps {
  title: string;
  description: string;
  poster: string;
  href: string;
  icon: React.ReactNode;
  cta: string;
}

function ProofEngine({ title, description, poster, href, icon, cta }: ProofEngineProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div variants={staggerItem}>
      <Link
        href={href}
        className="block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="rounded-2xl border-2 border-neon/20 bg-carbon/30 p-8 transition-all duration-300 hover:border-neon/50 hover:shadow-lg hover:shadow-neon/20">
          {/* Icon + Title */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-neon/10 border border-neon/30 text-neon transition-transform duration-300 group-hover:scale-110">
              {icon}
            </div>
            <h3 className="text-2xl font-black text-white">
              {title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-steel text-sm leading-relaxed mb-6">
            {description}
          </p>

          {/* CTA */}
          <div className="flex items-center justify-between">
            <span className="text-neon font-semibold text-sm">{cta}</span>
            <span className="text-neon text-xl transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface BelieveSectionProps {
  className?: string;
}

export default function BelieveSection({ className = '' }: BelieveSectionProps) {
  return (
    <section className={`py-20 border-y border-neon/20 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-2">
              Proof Engines
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              See It for Yourself.<br />Ground Source Truth.
            </h2>
            <p className="text-xl text-steel max-w-2xl mx-auto leading-relaxed">
              We do not deal in projected savings. We deal in Ground Source Truth. 
              Run the numbers yourself. See the network effect in action.
            </p>
          </div>

          {/* Two-Column Proof Engines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProofEngine
              title="ROI Calculator"
              description="Input your facility specs. Get illustrative ROI projections based on our economics methodology. Export board-ready PDF. Conservative/Base/Aggressive scenarios included."
              poster="/proof/real-time-alerts.png"
              href="/roi"
              icon={<Metrics size={24} />}
              cta="Calculate Your ROI"
            />

            <ProofEngine
              title="Singularity Simulation"
              description="Watch facilities converge from chaos to flow. Interactive simulation visualizes network effect across your entire footprint. Based on actual enterprise deployments. Standards kill variance. Flow follows."
              poster="/proof/machine-vision.png"
              href="/singularity"
              icon={<Crosshair size={24} />}
              cta="Run Simulation"
            />
          </div>

          {/* Footer Note */}
          <div className="mt-10 text-center">
            <p className="text-sm text-steel/70">
              Both calculators use illustrative examples and economics methodology from THE VARIANCE TAX whitepaper.  
              Actual results vary by facility layout, appointment discipline, and inbound mix.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

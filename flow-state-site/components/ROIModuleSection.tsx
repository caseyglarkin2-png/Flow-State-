/**
 * ROI MODULE SECTION
 * 
 * Purpose: Drive traffic to ROI Calculator with dedicated full-width module
 * Similar to Singularity Simulation section but focused on board-ready financials
 * Message: Input your specs. Get your numbers. Export board-ready proof.
 * 
 * Canon: ROI is not theoretical. It's calculable. Let CFOs run the math themselves.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem } from '@/lib/motion-presets';
import { Metrics, Ignite } from '@/components/icons/FlowIcons';

export default function ROIModuleSection() {
  return (
    <section className="py-24 border-b border-neon/20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-neon/70 mb-4">Financial Proof</p>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Model Your Network.<br />See Your Numbers.
            </h2>
            <p className="text-xl text-steel max-w-3xl mx-auto leading-relaxed">
              Input your facility specs. Conservative, Base, and Aggressive scenarios. Export board-ready PDF. 
              <span className="text-white font-semibold"> No magic. Just economics.</span>
            </p>
          </div>

          {/* ROI Calculator module - link to /roi */}
          <motion.div variants={staggerItem}>
            <Link href="/roi" className="block group">
              <div className="relative aspect-video rounded-xl border-2 border-neon/20 bg-gradient-to-br from-carbon via-void to-carbon overflow-hidden transition-all duration-300 hover:border-neon/40 hover:shadow-lg hover:shadow-neon/20">
                {/* Financial visualization background - grid pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-15 group-hover:opacity-25 transition-opacity duration-300" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                  {/* Grid lines */}
                  <g stroke="#00B4FF" strokeWidth="0.2" opacity="0.6">
                    <line x1="0" y1="20" x2="100" y2="20" />
                    <line x1="0" y1="40" x2="100" y2="40" />
                    <line x1="0" y1="60" x2="100" y2="60" />
                    <line x1="0" y1="80" x2="100" y2="80" />
                    <line x1="20" y1="0" x2="20" y2="100" />
                    <line x1="40" y1="0" x2="40" y2="100" />
                    <line x1="60" y1="0" x2="60" y2="100" />
                    <line x1="80" y1="0" x2="80" y2="100" />
                  </g>
                  
                  {/* Bar chart representation */}
                  <rect x="10" y="60" width="8" height="30" fill="#00B4FF" opacity="0.8" />
                  <rect x="22" y="45" width="8" height="45" fill="#00B4FF" opacity="0.8" />
                  <rect x="34" y="35" width="8" height="55" fill="#00B4FF" opacity="0.8" />
                  <rect x="46" y="25" width="8" height="65" fill="#00B4FF" opacity="0.8" />
                  <rect x="58" y="20" width="8" height="70" fill="#00B4FF" opacity="0.8" />
                  <rect x="70" y="15" width="8" height="75" fill="#00B4FF" opacity="0.8" />
                  <rect x="82" y="10" width="8" height="80" fill="#00B4FF" opacity="0.8" />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-neon/20 border border-neon/40 text-neon mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Ignite size={32} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                    Your ROI, Board-Ready
                  </h3>
                  <p className="text-steel max-w-2xl mb-8">
                    Input your facility count, throughput, and labor costs. Get conservative, base, and aggressive scenarios. Export as board-ready PDF. Network effects optional. Math is mandatory.
                  </p>
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-neon text-void font-bold transition-transform duration-300 group-hover:scale-105">
                    Calculate Your ROI →
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* ROI benefits */}
          <motion.div variants={staggerItem} className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-neon/20 bg-void/50">
              <p className="text-neon font-bold text-2xl mb-2">3 Scenarios</p>
              <p className="text-steel/70 text-sm">Conservative, Base, Aggressive with documented assumptions</p>
            </div>

            <div className="p-6 rounded-xl border border-neon/20 bg-void/50">
              <p className="text-neon font-bold text-2xl mb-2">Board-Ready</p>
              <p className="text-steel/70 text-sm">Export to PDF with executive summary, methodology notes, and scenario comparisons</p>
            </div>

            <div className="p-6 rounded-xl border border-neon/20 bg-void/50">
              <p className="text-neon font-bold text-2xl mb-2">Network Effects</p>
              <p className="text-steel/70 text-sm">Model from 1 facility to 500. See how network effects compound your returns</p>
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.div variants={staggerItem} className="mt-12 text-center">
            <p className="text-sm text-steel/70">
              Based on THE VARIANCE TAX economics methodology. Illustrative projections—actual results vary by facility layout, 
              appointment discipline, and inbound mix. Conservative scenarios built on achievable, observable improvements.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

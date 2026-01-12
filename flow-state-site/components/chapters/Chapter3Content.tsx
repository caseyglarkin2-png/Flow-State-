"use client";

import React from 'react';
import Link from 'next/link';
import NetworkEffectModel from '@/components/NetworkEffectModel';

export default function Chapter3Content() {
  return (
    <section id="chapter-3" className="py-20 border-b border-neon/20 bg-gradient-to-b from-void to-carbon/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-neon font-mono text-xs uppercase tracking-wider mb-4">Chapter 3</p>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
            The Network Effect: <span className="text-neon">Intelligence That Compounds</span>
          </h2>
          <p className="text-xl text-steel/90 max-w-3xl mx-auto">
            One site gives you local efficiency. Five sites unlock pattern recognition. 
            Ten sites create a learning flywheel. This is where ROI goes from linear to exponential.
          </p>
        </div>

        {/* Network Effect Model */}
        <NetworkEffectModel />

        {/* What Network Data Unlocks */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">What Cross-Site Intelligence Enables</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-neon/40 bg-neon/5">
              <h4 className="text-lg font-bold text-white mb-3">Carrier Benchmarking</h4>
              <p className="text-steel/90 mb-4">
                "Carrier X averages 18 min dwell across 12 facilities. Carrier Y: 42 min. Same load types."
              </p>
              <p className="text-sm text-steel/80">
                Network data surfaces carrier performance patterns invisible at single sites. 
                Use it in rate negotiations. Prefer reliable carriers. Cut detention disputes.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-neon/40 bg-neon/5">
              <h4 className="text-lg font-bold text-white mb-3">Predictive ETAs</h4>
              <p className="text-steel/90 mb-4">
                "Based on 847 similar loads, this truck will need 27 minutes from gate-in to dock-complete."
              </p>
              <p className="text-sm text-steel/80">
                AI learns from every completed trip across the network. Predicts arrival times, 
                dock duration, detention risk. Your 10th facility is smarter than your 1st.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-neon/40 bg-neon/5">
              <h4 className="text-lg font-bold text-white mb-3">Bottleneck Detection</h4>
              <p className="text-steel/90 mb-4">
                "Facility 3's cross-dock process is 2.3x slower than network average. Root cause: manual sortation."
              </p>
              <p className="text-sm text-steel/80">
                Compare any facility to the network baseline. Surface outliers. 
                Investigate why Site A outperforms Site B. Replicate best practices.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-neon/40 bg-neon/5">
              <h4 className="text-lg font-bold text-white mb-3">Compounding Playbooks</h4>
              <p className="text-steel/90 mb-4">
                "Deploy yard 1: 8 weeks. Deploy yard 10: 4 weeks. Deploy yard 40: 2 weeks."
              </p>
              <p className="text-sm text-steel/80">
                Standardized driver journey (Chapter 1) means deployment playbooks transfer. 
                Each rollout makes the next faster. Intelligence accumulates.
              </p>
            </div>
          </div>
        </div>

        {/* The Singularity Tie-In */}
        <div className="mt-12 bg-gradient-to-r from-neon/10 to-transparent border border-neon/30 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">The Singularity Point</h3>
          <p className="text-steel/90 mb-4 leading-relaxed">
            At network scale, every yard becomes a data generator for every other yard. 
            Chapter 1 inputs (standardized timestamps, driver actions, reason codes) feed Chapter 2 control loops 
            (automated enforcement, dock optimization), which generate Chapter 3 insights (carrier benchmarks, predictive ETAs, bottleneck detection).
          </p>
          <p className="text-steel/90 leading-relaxed">
            <Link href="/singularity" className="text-neon hover:underline font-semibold">
              Explore the Singularity Model →
            </Link> to see how 260 facilities create 33,670 facility-pair interactions, 
            unlocking predictions impossible for any single site.
          </p>
        </div>
      </div>
    </section>
  );
}

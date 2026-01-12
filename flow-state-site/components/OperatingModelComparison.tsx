"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * OPERATING MODEL COMPARISON
 * 
 * Legacy YMS: Records events after they happen
 * Flow State: Enforces what happens next (control loop)
 * Network standardization comes first (Driver Journey band), then yard permutations are solved
 */

export default function OperatingModelComparison() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Legacy YMS */}
        <div className="rounded-lg border-2 border-ember/30 bg-ember/5 p-8">
          <div className="mb-6">
            <p className="text-ember font-mono text-xs uppercase tracking-wider mb-2">Legacy Approach</p>
            <h3 className="text-3xl font-black text-white mb-3">Yard Management System</h3>
            <p className="text-steel/80 leading-relaxed">
              Records events. Site-by-site. Reactive.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-ember/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-ember text-xs font-bold">1</span>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">After-the-Fact Recording</p>
                <p className="text-steel/70 text-sm">
                  Guard types in what happened. Timestamps are reported, not captured. "Arrival time: 8:47am" means nothing without proof.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-ember/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-ember text-xs font-bold">2</span>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Site-by-Site Deployment</p>
                <p className="text-steel/70 text-sm">
                  Each yard is a custom project. Workflows don't transfer. Intelligence doesn't compound. Deploy yard 1, start over for yard 2.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-ember/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-ember text-xs font-bold">3</span>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Reactive Alerts</p>
                <p className="text-steel/70 text-sm">
                  "Truck has been waiting 2 hours." Great. Now what? No enforcement. No control loop. Just visibility into problems you can't solve.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-ember/20">
            <p className="text-ember/80 text-sm font-semibold">Result:</p>
            <p className="text-steel/70 text-sm mt-1">
              50 yards = 50 implementations = 50 different datasets = Zero network intelligence
            </p>
          </div>
        </div>

        {/* Flow State YNS */}
        <div className="rounded-lg border-2 border-neon bg-neon/10 p-8">
          <div className="mb-6">
            <p className="text-neon font-mono text-xs uppercase tracking-wider mb-2">Network-First</p>
            <h3 className="text-3xl font-black text-white mb-3">Yard Network System</h3>
            <p className="text-steel/90 leading-relaxed">
              Enforces what happens next. Standardized. Proactive.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-neon flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-void text-xs font-bold">1</span>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Ground Source Truth</p>
                <p className="text-steel/90 text-sm">
                  Defensible timestamps from physical hardware. QR scan at gate = cryptographic proof. "Check-in: 8:47:23am" is auditable, not typed in.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-neon flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-void text-xs font-bold">2</span>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Network-First Standardization</p>
                <p className="text-steel/90 text-sm">
                  Same driver journey across all facilities. Deploy yard 1, yard 40 goes faster (standardized playbooks). Intelligence compounds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-neon flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-void text-xs font-bold">3</span>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Control Loop Enforcement</p>
                <p className="text-steel/90 text-sm">
                  "Truck waiting 45min with no dock assignment" → System auto-escalates → Facility manager gets alert → Problem resolved before it's a detention claim.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-neon/20">
            <p className="text-neon font-semibold text-sm">Result:</p>
            <p className="text-steel/90 text-sm mt-1">
              50 yards = 1 network = 1 dataset = Cross-site intelligence + Predictive alerts + Compounding returns
            </p>
          </div>
        </div>
      </div>

      {/* The Shift */}
      <div className="bg-carbon/50 border border-neon/30 rounded-lg p-8 text-center">
        <div className="flex items-center justify-center gap-6 mb-4">
          <span className="text-ember font-bold">Record Events</span>
          <ArrowRight className="text-neon" size={32} />
          <span className="text-neon font-bold">Enforce Control</span>
        </div>
        <p className="text-steel/80 max-w-2xl mx-auto">
          The operating model shift: from passive recording to active enforcement. The standardized driver journey makes it possible. The network makes it inevitable.
        </p>
      </div>
    </div>
  );
}

"use client";

import React from 'react';
import Link from 'next/link';
import OperatingModelComparison from '@/components/OperatingModelComparison';

export default function Chapter2Content() {
  return (
    <section id="chapter-2" className="py-20 border-b border-neon/20 bg-gradient-to-b from-void to-carbon/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-neon font-mono text-xs uppercase tracking-wider mb-4">Chapter 2</p>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
            The Yard Control Loop: <span className="text-neon">From Recording to Enforcing</span>
          </h2>
          <p className="text-xl text-steel/90 max-w-3xl mx-auto">
            Standardized inputs unlock automated enforcement. The system doesn't just track what happened. 
            It directs what happens next.
          </p>
        </div>

        {/* Operating Model Comparison */}
        <OperatingModelComparison />

        {/* Control Loop Detail */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">How the Control Loop Works</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-neon flex items-center justify-center flex-shrink-0">
                  <span className="text-void font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Event Detection</p>
                  <p className="text-steel/80 text-sm">
                    Trailer arrives at gate. System captures timestamp, BOL, carrier, appointment window.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-neon flex items-center justify-center flex-shrink-0">
                  <span className="text-void font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">State Evaluation</p>
                  <p className="text-steel/80 text-sm">
                    AI checks: Is dock available? Is this load priority? Are dwell thresholds exceeded?
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-neon flex items-center justify-center flex-shrink-0">
                  <span className="text-void font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Automated Action</p>
                  <p className="text-steel/80 text-sm">
                    System assigns dock, routes driver, sets expectations, escalates exceptions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-neon flex items-center justify-center flex-shrink-0">
                  <span className="text-void font-bold text-sm">4</span>
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Feedback Loop</p>
                  <p className="text-steel/80 text-sm">
                    Outcome feeds back into system. "High-priority loads from Carrier X take 12 min average." Next load: predictive ETA.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">What Gets Enforced</h3>
            
            <div className="space-y-3">
              <div className="p-6 rounded-lg border border-neon/40 bg-neon/5">
                <p className="font-semibold text-white mb-2">Detention Thresholds</p>
                <p className="text-steel/90 text-sm">
                  Truck waiting 45 min with no dock? System auto-escalates to ops manager. Problem resolved before it's a claim.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-neon/40 bg-neon/5">
                <p className="font-semibold text-white mb-2">Dock Optimization</p>
                <p className="text-steel/90 text-sm">
                  Live trailers get priority docks. Drop-and-hook moves to outer spots. Cross-dock loads expedited. AI orchestrates.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-neon/40 bg-neon/5">
                <p className="font-semibold text-white mb-2">Safety Compliance</p>
                <p className="text-steel/90 text-sm">
                  Hazmat loads flagged on arrival. Driver routed to isolation bay. Facility manager notified. Zero manual oversight.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-neon/40 bg-neon/5">
                <p className="font-semibold text-white mb-2">SLA Enforcement</p>
                <p className="text-steel/90 text-sm">
                  "All live loads processed within 2 hours or detention claim approved." System enforces. Carriers trust it.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 bg-neon/10 border border-neon/30 rounded-xl p-8 text-center">
          <p className="text-2xl font-bold text-white mb-3">
            The shift: <span className="text-ember">Reactive recording</span> → <span className="text-neon">Proactive enforcement</span>
          </p>
          <p className="text-steel/80 max-w-2xl mx-auto">
            Because the driver journey is standardized (Chapter 1), the control loop can operate autonomously (Chapter 2), 
            which generates network intelligence (Chapter 3).
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import StandardizationBandVisual from '@/components/StandardizationBandVisual';

export default function Chapter1Content() {
  return (
    <section id="chapter-1" className="py-20 border-b border-neon/20 bg-gradient-to-b from-void to-carbon/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-neon font-mono text-xs uppercase tracking-wider mb-4">Chapter 1</p>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
            The Standardization Band: <span className="text-neon">Make Drivers the Data Source</span>
          </h2>
          <p className="text-xl text-steel/90 max-w-3xl mx-auto">
            Every facility is different. Every driver journey can be the same. 
            QR check-in, defensible timestamps, multilingual instructions. 
            This is the foundation that makes everything else possible.
          </p>
        </div>

        {/* Visual Diagram */}
        <StandardizationBandVisual />

        {/* Driver Journey Components */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-lg border border-neon/40 bg-neon/5">
            <div className="w-12 h-12 rounded-full bg-neon flex items-center justify-center mb-4">
              <span className="text-void font-black text-xl">1</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">QR Check-In</h3>
            <p className="text-steel/90 mb-4">
              Driver scans license at kiosk. System validates carrier, BOL, appointment. 
              60-second check-in. Zero guard labor.
            </p>
            <ul className="space-y-2 text-sm text-steel/80">
              <li>• OCR license scan + carrier verification</li>
              <li>• Real-time appointment validation</li>
              <li>• Automatic visitor badge generation</li>
              <li>• 70% gate labor reduction</li>
            </ul>
          </div>

          <div className="p-6 rounded-lg border border-neon/40 bg-neon/5">
            <div className="w-12 h-12 rounded-full bg-neon flex items-center justify-center mb-4">
              <span className="text-void font-black text-xl">2</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Defensible Timestamps</h3>
            <p className="text-steel/90 mb-4">
              Hardware captures events, not humans. Gate-in, spot-arrival, dock-start, gate-out. 
              Forensic-grade proof for detention disputes.
            </p>
            <ul className="space-y-2 text-sm text-steel/80">
              <li>• Hardware-sourced (RTLS, cameras, sensors)</li>
              <li>• Sub-second accuracy with GPS coordinates</li>
              <li>• Blockchain-anchored for auditability</li>
              <li>• 65% detention recovery rate (modeled)</li>
            </ul>
          </div>

          <div className="p-6 rounded-lg border border-neon/40 bg-neon/5">
            <div className="w-12 h-12 rounded-full bg-neon flex items-center justify-center mb-4">
              <span className="text-void font-black text-xl">3</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Multilingual Instructions</h3>
            <p className="text-steel/90 mb-4">
              SMS + app notifications in driver's language. Dock assignments, safety alerts, delay reasons. 
              Zero communication gaps.
            </p>
            <ul className="space-y-2 text-sm text-steel/80">
              <li>• 40+ languages with auto-translation</li>
              <li>• Direct-to-driver messaging (no radio)</li>
              <li>• Read receipts + delivery confirmation</li>
              <li>• Eliminates "I never got the message" disputes</li>
            </ul>
          </div>
        </div>

        {/* Why It Matters */}
        <div className="bg-neon/10 border border-neon/30 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Why Standardization Comes First</h3>
          <p className="text-steel/90 mb-4 leading-relaxed">
            Every yard has unique workflows: cross-dock vs manufacturing, hazmat vs dry goods, guarded vs unguarded gates. 
            But the driver experience can be identical across all facilities.
          </p>
          <p className="text-steel/90 leading-relaxed">
            When you standardize the driver journey band (QR check-in → timestamps → instructions), you create:
          </p>
          <ul className="mt-4 space-y-2 text-steel/90">
            <li className="flex items-start gap-2">
              <Check size={18} className="text-neon mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Interoperable data</strong> - Same schema across all facilities</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={18} className="text-neon mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Faster rollouts</strong> - Deploy yard 1, yard 40 goes 3x faster</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={18} className="text-neon mt-0.5 flex-shrink-0" />
              <span><strong className="text-white">Network readiness</strong> - Cross-site intelligence requires standardized inputs</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

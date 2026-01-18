/**
 * SUITE PERSONA MAP
 * Shows "One Suite → Many Personas" relationship
 * Makes it crystal clear: this is a bundled system, not à la carte products
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion-presets';
import { Shield, Agent, DryVan, Confirm, Timeline } from '@/components/icons/FlowIcons';

export default function SuitePersonaMap({ className = '' }: { className?: string }) {
  return (
    <div className={`${className}`}>
      {/* Suite Definition */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border-2 border-neon/30 bg-neon/5 mb-4">
          <Shield size={24} className="text-neon" />
          <div className="text-left">
            <div className="text-sm font-mono uppercase tracking-wider text-neon/70">
              YardFlow Standardization Suite
            </div>
            <div className="text-xs text-steel">
              One bundled system. Four modules. Network-wide consistency.
            </div>
          </div>
        </div>
        
        <p className="text-steel text-sm max-w-2xl mx-auto leading-relaxed">
          Standardization only works when access control, communications, documentation, and yard management operate as one integrated system. YardFlow is delivered as a bundle to prevent fragmentation.
        </p>
      </div>

      {/* The Four Modules */}
      <div className="mb-12">
        <h3 className="text-lg font-bold text-white mb-6 text-center">
          The Four Modules (Always Deployed Together)
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Digital Guard', desc: 'Access control + verification' },
            { name: 'Digital Comms', desc: 'Lane messaging + notifications' },
            { name: 'Digital BOL', desc: 'Touchless docs + timestamps' },
            { name: 'Digital YMS', desc: 'Yard visibility + orchestration' },
          ].map((module, index) => (
            <div
              key={module.name}
              className="rounded-lg border border-neon/20 bg-carbon/50 p-4 text-center"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neon/10 text-neon text-sm font-bold mb-2 mx-auto">
                {index + 1}
              </div>
              <div className="text-sm font-semibold text-white mb-1">{module.name}</div>
              <div className="text-xs text-steel/70">{module.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Persona Outcomes */}
      <div>
        <h3 className="text-lg font-bold text-white mb-6 text-center">
          How the Suite Serves Each Persona
        </h3>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {[
            {
              persona: 'Drivers',
              outcome: 'QR check-in → SMS instructions → Compliance tracking',
              modules: 'Guard + Comms + BOL',
            },
            {
              persona: 'Gate Staff',
              outcome: '70% labor reduction via automated verification',
              modules: 'Guard + YMS',
            },
            {
              persona: 'Yard Coordinators',
              outcome: 'Real-time visibility + FIFO enforcement + detention alerts',
              modules: 'YMS + Comms + BOL',
            },
            {
              persona: 'Dock Managers',
              outcome: 'Predictable arrival flow + BOL pre-validation',
              modules: 'Comms + BOL + YMS',
            },
            {
              persona: 'Safety/Security',
              outcome: 'Carrier verification + credential checks + audit trail',
              modules: 'Guard + BOL',
            },
            {
              persona: 'Finance/Procurement',
              outcome: 'Detention recovery + defensible timestamps + evidence vault',
              modules: 'BOL + YMS',
            },
            {
              persona: 'IT/Compliance',
              outcome: 'Audit-ready records + DOT compliance + CTPAT support',
              modules: 'All modules',
            },
            {
              persona: 'Operations Leaders',
              outcome: 'Network-wide standardization + predictable throughput',
              modules: 'All modules',
            },
            {
              persona: 'Exec/CFO',
              outcome: 'ROI visibility + variance reduction + network effects',
              modules: 'All modules',
            },
          ].map((item) => (
            <motion.div
              key={item.persona}
              variants={staggerItem}
              className="rounded-lg border border-steel/20 bg-carbon/30 p-4 hover:border-neon/30 transition-colors"
            >
              <div className="flex items-start gap-2 mb-2">
                <Agent size={16} className="text-neon mt-1 flex-shrink-0" />
                <div className="font-semibold text-white text-sm">{item.persona}</div>
              </div>
              <p className="text-xs text-steel leading-relaxed mb-2">{item.outcome}</p>
              <div className="text-xs text-neon/60 font-mono">
                {item.modules}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bundling Rationale */}
      <div className="mt-12 p-6 rounded-xl border-2 border-neon/20 bg-gradient-to-br from-neon/5 to-transparent">
        <div className="flex items-start gap-3">
          <Confirm size={20} className="text-neon mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-white font-bold mb-2">Why This Is a Bundle</h4>
            <p className="text-steel text-sm leading-relaxed">
              Picking modules à la carte creates fragmentation. Gate automation without yard visibility creates blind spots. Comms without BOL verification creates disputes. <span className="text-white font-semibold">The suite works because every module reinforces the others.</span> YardFlow is delivered as a bundled package to preserve network-level standardization and prevent operational gaps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

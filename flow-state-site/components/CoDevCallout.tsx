/**
 * CoDevCallout Component
 * 
 * Contextual callout promoting Co-Development Program
 * Use on pages where advanced/custom features are relevant
 */

import React from 'react';
import Link from 'next/link';
import { BRAND } from '@/config/brand';
import { Ignite, FlowArrow } from '@/components/icons/FlowIcons';

interface CoDevCalloutProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function CoDevCallout({ 
  title = "Need Custom Features?",
  description = "Multi-site operators: influence the roadmap with the Co-Development Program. Vision RTLS, AI orchestration, and mode-specific workflows.",
  className = ''
}: CoDevCalloutProps) {
  return (
    <div className={`p-8 rounded-xl bg-gradient-to-br from-neon/10 to-ember/5 border border-neon/30 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-neon/10 flex-shrink-0">
          <Ignite size={24} className="text-neon" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-steel/90 mb-4 text-sm leading-relaxed">
            {description}
          </p>
          <Link 
            href={BRAND.ctas.secondary.href}
            className="inline-flex items-center gap-2 text-neon hover:underline font-semibold text-sm"
          >
            {BRAND.ctas.secondary.label}
            <FlowArrow size={14} className="text-neon" />
          </Link>
        </div>
      </div>
    </div>
  );
}

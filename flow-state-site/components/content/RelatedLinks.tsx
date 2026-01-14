/**
 * RelatedLinks - Cross-reference blocks for connecting content
 * "Proof & Resources" style links with tags
 */

import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, Calculator, ChartBar, BookOpen } from 'lucide-react';

interface RelatedLink {
  label: string;
  href: string;
  type?: 'field-note' | 'simulation' | 'calculator' | 'guide' | 'page';
  note?: string;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
}

const typeIcons: Record<string, React.ElementType> = {
  'field-note': FileText,
  simulation: ChartBar,
  calculator: Calculator,
  guide: BookOpen,
  page: ArrowRight,
};

const typeLabels: Record<string, string> = {
  'field-note': 'Field Note',
  simulation: 'Simulation',
  calculator: 'Calculator',
  guide: 'Guide',
  page: 'Page',
};

export default function RelatedLinks({ title = 'Proof & Resources', links }: RelatedLinksProps) {
  return (
    <div className="rounded-2xl border border-neon/20 bg-carbon/30 p-6">
      <h3 className="text-base font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-3">
        {links.map((link) => {
          const Icon = typeIcons[link.type || 'page'];
          const typeLabel = typeLabels[link.type || 'page'];
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-neon/5 transition group"
            >
              <div className="shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-neon/70 group-hover:text-neon transition" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-white group-hover:text-neon transition">
                    {link.label}
                  </span>
                  <span className="text-xs text-steel/50">{typeLabel}</span>
                </div>
                {link.note && (
                  <p className="text-sm text-steel/70 mt-0.5">{link.note}</p>
                )}
              </div>
              <ArrowRight className="w-4 h-4 text-steel/50 group-hover:text-neon transition shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

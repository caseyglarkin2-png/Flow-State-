'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, CheckCircle, ExternalLink, FileText, Download } from 'lucide-react';

interface ChecklistItem {
  question: string;
  answer: string;
  link?: string;
  linkLabel?: string;
  exportAction?: string;
}

const checklistItems: ChecklistItem[] = [
  {
    question: 'What constraint is removed?',
    answer: 'Yard dwell time bottleneck: the gate/dock handoff that limits throughput regardless of warehouse efficiency.',
    link: '/product',
    linkLabel: 'See product capabilities',
  },
  {
    question: 'Hard savings vs opportunity?',
    answer: 'Hard: Gate labor reduction (70%), detention recovery, paperless BOL. Opportunity: Capacity unlocked via faster turns.',
    link: '/roi',
    linkLabel: 'Configure your split',
  },
  {
    question: 'Key assumptions?',
    answer: 'Baseline dwell, shipment volume, labor rates, detention frequency. All editable and exportable.',
    link: '/roi',
    linkLabel: 'View/export assumptions',
    exportAction: 'assumptions',
  },
  {
    question: 'Peak season impact?',
    answer: 'Modeled via peak uplift %. See avoided overflow/3PL spend and OT reduction during surge.',
    link: '/roi',
    linkLabel: 'Model peak scenario',
  },
  {
    question: 'Adoption ramp?',
    answer: 'Year-1 default is 5% network rollout. Adjust to match your deployment plan.',
    link: '/implementation',
    linkLabel: 'See deployment timeline',
  },
  {
    question: 'Cost of delay?',
    answer: '90-day delay cost calculated from Year-1 gross savings ÷ 4. Every quarter waiting = that much left on the table.',
    link: '/diagnostic',
    linkLabel: 'Calculate your delay cost',
  },
  {
    question: 'Implementation RACI?',
    answer: 'YardFlow by FreightRoll owns deployment. Your team: site access + IT firewall rules. 2-week avg time-to-live per site.',
    link: '/implementation',
    linkLabel: 'View RACI matrix',
  },
  {
    question: 'Security posture?',
    answer: 'SOC 2 Type II in progress. AWS-hosted. No PII in yard data. See Trust Center for full security documentation.',
    link: '/resources/procurement',
    linkLabel: 'View Trust Center',
  },
  {
    question: 'Commercial terms?',
    answer: 'Per-facility SaaS pricing. No per-transaction fees. Volume discounts at 25+ and 100+ sites.',
    link: '/pricing',
    linkLabel: 'See pricing tiers',
  },
  {
    question: 'Board-ready artifact?',
    answer: 'Export ROI model as PDF with full assumptions. Designed for direct forwarding to finance/board.',
    link: '/roi',
    linkLabel: 'Generate PDF',
    exportAction: 'pdf',
  },
];

interface CFOProofChecklistProps {
  variant?: 'full' | 'compact';
  className?: string;
}

export default function CFOProofChecklist({ variant = 'full', className = '' }: CFOProofChecklistProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [isExpanded, setIsExpanded] = useState(variant === 'full');
  
  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };
  
  if (variant === 'compact' && !isExpanded) {
    return (
      <div className={`glass-card p-4 ${className}`}>
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <CheckCircle className="text-neon" size={20} />
            <span className="font-semibold text-white">CFO Proof Checklist</span>
          </div>
          <ChevronDown className="text-steel/60" size={20} />
        </button>
      </div>
    );
  }
  
  return (
    <div className={`glass-card border border-neon/20 ${className}`}>
      {/* Header */}
      <div className="p-5 border-b border-steel/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle className="text-neon" size={22} />
          <div>
            <h3 className="font-bold text-white">CFO Proof Checklist</h3>
            <p className="text-steel/60 text-xs">10 questions every finance team asks</p>
          </div>
        </div>
        {variant === 'compact' && (
          <button
            onClick={() => setIsExpanded(false)}
            className="text-steel/60 hover:text-white"
          >
            <ChevronUp size={20} />
          </button>
        )}
      </div>
      
      {/* Checklist Items */}
      <div className="divide-y divide-steel/10">
        {checklistItems.map((item, index) => (
          <div key={index} className="group">
            <button
              onClick={() => toggleItem(index)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-carbon/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold transition-colors ${
                  expandedItems.has(index) 
                    ? 'border-neon bg-neon text-void' 
                    : 'border-steel/40 text-steel/60'
                }`}>
                  {index + 1}
                </div>
                <span className={`font-medium transition-colors ${
                  expandedItems.has(index) ? 'text-neon' : 'text-white group-hover:text-neon'
                }`}>
                  {item.question}
                </span>
              </div>
              {expandedItems.has(index) ? (
                <ChevronUp className="text-neon" size={18} />
              ) : (
                <ChevronDown className="text-steel/40 group-hover:text-steel" size={18} />
              )}
            </button>
            
            {expandedItems.has(index) && (
              <div className="px-4 pb-4 pl-12">
                <p className="text-steel/80 text-sm leading-relaxed mb-3">
                  {item.answer}
                </p>
                {item.link && (
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-1.5 text-neon text-sm font-medium hover:text-white transition-colors"
                  >
                    {item.exportAction === 'pdf' ? (
                      <Download size={14} />
                    ) : item.exportAction === 'assumptions' ? (
                      <FileText size={14} />
                    ) : (
                      <ExternalLink size={14} />
                    )}
                    {item.linkLabel}
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="p-4 bg-carbon/30 border-t border-steel/10">
        <p className="text-steel/50 text-xs text-center">
          All projections are modeled estimates. 
          <Link href="/docs/economics-methodology" className="text-neon hover:underline ml-1">
            Full methodology →
          </Link>
        </p>
      </div>
    </div>
  );
}

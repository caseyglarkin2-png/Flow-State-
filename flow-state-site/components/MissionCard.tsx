'use client';

import React from 'react';
import Card from '@/components/Card';

type Props = {
  title: string;
  trigger: string;
  whatBreaks: string;
  intervention: string;
  outcome: string;
  cta?: { href: string; label: string };
};

export default function MissionCard({ title, trigger, whatBreaks, intervention, outcome, cta }: Props) {
  return (
    <Card>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <div className="mt-4 space-y-3 text-steel">
        <div>
          <div className="text-xs text-steel/70">Trigger condition</div>
          <div className="text-sm text-white/90">{trigger}</div>
        </div>
        <div>
          <div className="text-xs text-steel/70">What breaks</div>
          <div className="text-sm text-white/90">{whatBreaks}</div>
        </div>
        <div>
          <div className="text-xs text-steel/70">YardFlow by FreightRoll intervention</div>
          <div className="text-sm text-white/90">{intervention}</div>
        </div>
        <div>
          <div className="text-xs text-steel/70">Measurable outcome</div>
          <div className="text-sm text-neon font-semibold">{outcome}</div>
        </div>
      </div>
      {cta ? (
        <div className="mt-6">
          <a
            href={cta.href}
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold bg-neon text-void"
          >
            {cta.label}
          </a>
        </div>
      ) : null}
    </Card>
  );
}

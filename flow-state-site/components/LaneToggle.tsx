'use client';

import React from 'react';
import { useLaneStore, type ContentLane } from '@/store/lane';
import { trackEvent } from '@/lib/analytics';

type Props = {
  className?: string;
};

function LaneButton({
  lane,
  active,
  onSelect,
  children,
}: {
  lane: ContentLane;
  active: boolean;
  onSelect: (lane: ContentLane) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(lane)}
      className={
        active
          ? 'px-3 py-2 rounded-xl bg-neon text-void font-semibold'
          : 'px-3 py-2 rounded-lg border border-steel/30 text-white hover:border-neon/40 transition-colors'
      }
    >
      {children}
    </button>
  );
}

export default function LaneToggle({ className }: Props) {
  const lane = useLaneStore((s) => s.lane);
  const setLane = useLaneStore((s) => s.setLane);

  function select(next: ContentLane) {
    if (next === lane) return;
    setLane(next);
    trackEvent('lane_selected', { lane: next });
  }

  return (
    <div className={className} role="group" aria-label="Reading lane">
      <div className="inline-flex items-center gap-2 bg-carbon/60 border border-neon/20 rounded-xl p-2">
        <LaneButton lane="brief" active={lane === 'brief'} onSelect={select}>
          1‑Minute Brief
        </LaneButton>
        <LaneButton lane="deep" active={lane === 'deep'} onSelect={select}>
          Deep Dive
        </LaneButton>
      </div>
      <p className="mt-2 text-xs text-steel/80">
        Choose your path. We’ll remember it.
      </p>
    </div>
  );
}

'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

type Props = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
};

export default function RevealMetric({ label, value, suffix = '', prefix = '', decimals = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [tick, setTick] = useState(0);

  const reduced = useMemo(() => prefersReducedMotion(), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (reduced) return;

    const start = performance.now();
    const duration = 850;
    let raf = 0;

    const loop = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setTick(p);
      if (p < 1) raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [visible, reduced]);

  const shown = reduced || !visible ? value : value * tick;
  const formatted = `${prefix}${shown.toFixed(decimals)}${suffix}`;

  return (
    <div ref={ref} className="glass-card rounded-xl p-5 border border-neon/10">
      <div className="text-sm text-steel">{label}</div>
      <div className="mt-2 text-3xl font-black text-white tracking-tight">
        {formatted}
      </div>
    </div>
  );
}

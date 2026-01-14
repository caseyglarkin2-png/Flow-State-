'use client';

import React from 'react';
import LaneToggle from '@/components/LaneToggle';

type Props = {
  title: React.ReactNode;
  reframe: React.ReactNode;
  proof: React.ReactNode;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

export default function FrameShiftHero({ title, reframe, proof, primaryCta, secondaryCta }: Props) {
  return (
    <section className="pt-32 pb-16 border-b border-neon/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-black mb-5 leading-tight">{title}</h1>
            <p className="text-xl text-steel max-w-2xl">{reframe}</p>
            <div className="mt-4 text-sm text-steel/80">{proof}</div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={primaryCta.href}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
              >
                {primaryCta.label}
              </a>
              {secondaryCta ? (
                <a
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-steel/30 text-white hover:border-neon/40 transition-colors"
                >
                  {secondaryCta.label}
                </a>
              ) : null}
            </div>
          </div>

          <div className="justify-self-start lg:justify-self-end">
            <LaneToggle />
          </div>
        </div>
      </div>
    </section>
  );
}

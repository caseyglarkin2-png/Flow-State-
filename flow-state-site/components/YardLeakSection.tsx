'use client';

import React from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import {
  Timeline,
  Shield,
  Velocity,
  Crosshair,
  Agent,
  Metrics,
} from '@/components/icons/FlowIcons';
import { AlertTriangle, Clock, Truck, DollarSign, Lock } from 'lucide-react';

interface YardLeakTile {
  symptom: string;
  cause: string;
  costRange: string;
  icon: React.ReactNode;
  color: string;
}

const yardLeakTiles: YardLeakTile[] = [
  {
    symptom: 'Detention & disputes',
    cause: 'No defensible timestamps → carrier says one thing, you say another',
    costRange: '$50–200/occurrence',
    icon: <Clock size={28} />,
    color: 'text-ember',
  },
  {
    symptom: 'Missed cutoffs & expedite fees',
    cause: 'No real-time queue visibility → loads sit while clock runs',
    costRange: '$500–2,000/event',
    icon: <AlertTriangle size={28} />,
    color: 'text-amber-500',
  },
  {
    symptom: 'OT & labor volatility',
    cause: 'No arrival prediction → overstaffed or scrambling',
    costRange: '$15–45/hr premium',
    icon: <Agent size={28} />,
    color: 'text-orange-500',
  },
  {
    symptom: 'Trailer hunt time',
    cause: 'No asset location → drivers circling, radios blazing',
    costRange: '8–15 min/move',
    icon: <Crosshair size={28} />,
    color: 'text-yellow-500',
  },
  {
    symptom: 'OTIF chargebacks',
    cause: 'No root cause data → you absorb the penalty',
    costRange: '$100–500/miss',
    icon: <Metrics size={28} />,
    color: 'text-red-400',
  },
  {
    symptom: 'Overflow yards & 3PL surge',
    cause: 'No throughput optimization → capacity appears full when it is not',
    costRange: '$200–800/trailer/day',
    icon: <Truck size={28} />,
    color: 'text-rose-500',
  },
  {
    symptom: 'Safety & claims exposure',
    cause: 'No geofenced yard control → near-misses become incidents',
    costRange: '$5K–50K/claim',
    icon: <Shield size={28} />,
    color: 'text-purple-400',
  },
  {
    symptom: 'Working capital buffers',
    cause: 'No flow predictability → extra inventory, extra trailers "just in case"',
    costRange: '3–7% tied capital',
    icon: <DollarSign size={28} />,
    color: 'text-blue-400',
  },
];

export default function YardLeakSection() {
  return (
    <section className="py-24 border-t border-ember/20 bg-gradient-to-b from-carbon/30 to-void">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-ember font-mono text-sm tracking-widest mb-4 uppercase">
            Where the Margin Goes
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            The Network Leak
            <span className="block text-xl md:text-2xl font-normal text-steel/70 mt-2">
              Eight categories of invisible cost and risk. Every facility pays them.
            </span>
          </h2>
          <p className="text-lg text-steel/80 max-w-3xl mx-auto">
            These aren't line items in your budget. They're buried in overtime, expedites, 
            chargebacks, and "that's just how it is." Until you instrument the yard, they stay hidden.
          </p>
        </div>

        {/* Yard Leak Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {yardLeakTiles.map((tile, i) => (
            <Card key={i} className="p-5 hover:border-ember/50 transition-all group">
              <div className={`${tile.color} mb-3`}>
                {tile.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-ember transition-colors">
                {tile.symptom}
              </h3>
              <p className="text-steel/70 text-sm mb-3 leading-relaxed">
                {tile.cause}
              </p>
              <div className="pt-3 border-t border-steel/20">
                <p className="text-ember font-mono text-sm font-bold">
                  {tile.costRange}
                </p>
                <p className="text-steel/50 text-xs mt-1">
                  modeled range*
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-steel/50 text-xs mb-8">
          * Cost ranges are illustrative and based on industry benchmarks. 
          Your actual leak depends on facility size, throughput, and operational maturity. {' '}
          <Link href="/docs/economics-methodology" className="text-neon hover:underline">
            See methodology →
          </Link>
        </p>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Link
              href="/diagnostic"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold text-lg bg-ember text-white hover:bg-white hover:text-ember transition-all hover:scale-105"
            >
              <Timeline size={22} />
              Run the Network Leak Diagnostic
            </Link>
            <Link
              href="/roi"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold border border-steel/40 text-white hover:border-neon hover:text-neon transition-all"
            >
              <Velocity size={20} />
              Skip to Full ROI Calculator
            </Link>
          </div>
          <p className="text-steel/60 text-sm mt-4">
            No forms required. See your numbers instantly.
          </p>
        </div>
      </div>
    </section>
  );
}

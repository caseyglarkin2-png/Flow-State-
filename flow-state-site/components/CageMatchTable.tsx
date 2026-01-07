'use client';

import React from 'react';

type Row = {
  capability: string;
  legacy: string;
  flowState: string;
};

type Props = {
  title: string;
  subtitle: string;
  rows: Row[];
  whenLegacyWins: string[];
  whereFlowStateWins: string[];
};

export default function CageMatchTable({ title, subtitle, rows, whenLegacyWins, whereFlowStateWins }: Props) {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black mb-3 neon-glow">{title}</h2>
        <p className="text-lg text-steel max-w-3xl">{subtitle}</p>

        <div className="mt-8 overflow-x-auto rounded-xl border border-neon/15">
          <table className="min-w-full text-sm">
            <thead className="bg-carbon/60">
              <tr>
                <th className="text-left px-4 py-3 text-steel font-semibold">Capability</th>
                <th className="text-left px-4 py-3 text-steel font-semibold">Legacy</th>
                <th className="text-left px-4 py-3 text-neon font-semibold">YardFlow by FreightRoll</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.capability} className="border-t border-neon/10">
                  <td className="px-4 py-3 text-white font-semibold">{r.capability}</td>
                  <td className="px-4 py-3 text-steel">{r.legacy}</td>
                  <td className="px-4 py-3 text-steel">{r.flowState}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-xl p-6 border border-neon/10">
            <h3 className="text-lg font-bold text-white">When legacy wins</h3>
            <p className="text-sm text-steel/80 mt-1">Credibility section: we won't pretend it never fits.</p>
            <ul className="mt-4 space-y-2 text-steel list-disc pl-5">
              {whenLegacyWins.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-xl p-6 border border-neon/10">
            <h3 className="text-lg font-bold text-neon">Where YardFlow by FreightRoll wins</h3>
            <p className="text-sm text-steel/80 mt-1">The difference: visibility → control.</p>
            <ul className="mt-4 space-y-2 text-steel list-disc pl-5">
              {whereFlowStateWins.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

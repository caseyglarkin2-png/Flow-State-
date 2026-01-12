"use client";

import React from 'react';
import { Check, X } from 'lucide-react';

/**
 * PROBLEM TAXONOMY VISUAL
 * 
 * 20 problems per yard; 5 are ubiquitous across all yards.
 * Base deployment solves: Top 5 per yard + the 5 network-wide problems.
 * Remaining issues: co-development path (finite permutations; we productize them over time).
 */

export default function ProblemTaxonomy() {
  const universalProblems = [
    "Defensible timestamps (carrier disputes)",
    "Gate labor waste (manual check-in)",
    "Driver communication gaps (multilingual)",
    "Paper BOL chain-of-custody breaks",
    "Detention visibility (who's waiting, why)"
  ];

  const perYardProblems = [
    "Dock scheduling conflicts",
    "Spotting optimization",
    "Cross-dock timing",
    "Hazmat compliance workflows",
    "Returns processing"
  ];

  const yardSpecificPermutations = [
    "Custom WMS integrations",
    "Unique security protocols",
    "Industry-specific compliance",
    "Legacy system bridges",
    "Seasonal workflow variations"
  ];

  return (
    <div className="space-y-8">
      {/* The Math */}
      <div className="text-center mb-8">
        <p className="text-6xl font-black text-neon mb-2">20</p>
        <p className="text-steel/80">problems per yard</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="text-center">
            <p className="text-4xl font-black text-white">5</p>
            <p className="text-steel/70 text-sm">universal</p>
          </div>
          <p className="text-steel/40">+</p>
          <div className="text-center">
            <p className="text-4xl font-black text-white">5</p>
            <p className="text-steel/70 text-sm">per-yard top</p>
          </div>
          <p className="text-steel/40">+</p>
          <div className="text-center">
            <p className="text-4xl font-black text-steel/60">10</p>
            <p className="text-steel/70 text-sm">permutations</p>
          </div>
        </div>
      </div>

      {/* Visual Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Universal (Solved in Base) */}
        <div className="rounded-lg border-2 border-neon bg-neon/5 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-neon flex items-center justify-center">
              <Check size={18} className="text-void" />
            </div>
            <h3 className="text-lg font-bold text-neon">Universal (5)</h3>
          </div>
          <p className="text-steel/80 text-sm mb-4">
            Solved in base deployment. Same across all yards.
          </p>
          <ul className="space-y-2">
            {universalProblems.map((problem, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Check size={14} className="text-neon mt-0.5 flex-shrink-0" />
                <span className="text-steel/90">{problem}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Per-Yard Top 5 (Solved in Base) */}
        <div className="rounded-lg border-2 border-neon/60 bg-neon/5 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-neon/60 flex items-center justify-center">
              <Check size={18} className="text-void" />
            </div>
            <h3 className="text-lg font-bold text-white">Per-Yard Top (5)</h3>
          </div>
          <p className="text-steel/80 text-sm mb-4">
            Highest-impact per facility. Standard modules.
          </p>
          <ul className="space-y-2">
            {perYardProblems.map((problem, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Check size={14} className="text-neon/70 mt-0.5 flex-shrink-0" />
                <span className="text-steel/90">{problem}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Remaining Permutations (Co-Development) */}
        <div className="rounded-lg border-2 border-steel/30 bg-carbon/30 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-steel/30 flex items-center justify-center">
              <span className="text-white text-xs font-bold">10</span>
            </div>
            <h3 className="text-lg font-bold text-steel">Permutations (10)</h3>
          </div>
          <p className="text-steel/80 text-sm mb-4">
            Finite variations. Co-development path. We productize over time.
          </p>
          <ul className="space-y-2">
            {yardSpecificPermutations.map((problem, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <div className="w-3 h-3 rounded border border-steel/40 mt-0.5 flex-shrink-0"></div>
                <span className="text-steel/70">{problem}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="bg-neon/10 border border-neon/30 rounded-lg p-6 text-center">
        <p className="text-white font-semibold text-lg mb-2">
          Base deployment solves 10 of 20 problems (50%). The 10 that matter most.
        </p>
        <p className="text-steel/80">
          Remaining 10 are finite permutations. We productize them as patterns emerge across the network. Not custom dev. Productized modules.
        </p>
      </div>
    </div>
  );
}

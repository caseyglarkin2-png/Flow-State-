'use client';

import React, { useState, useMemo } from 'react';
import { Nexus } from '@/components/icons/FlowIcons';
import {
  FlowGlyphPredictiveIntelligence,
  FlowGlyphCarrierBenchmarking,
  FlowGlyphCoordinationEfficiency,
  FlowGlyphSharedLearning,
} from '@/components/icons/FlowGlyphs';
import { calcRoiV2, getQuickInputsForPreset, roiV2InputsFromQuickMode, metcalfeInspiredMultiplier } from '@/lib/economics';

/**
 * NetworkEffectModel: Interactive visualization of network effects for yard networks.
 * Shows how value compounds through specific, credible mechanisms.
 *
 * Pass 5: All economics shown here are sourced from the canonical economics spine
 * (the same model used by /roi), so numbers remain congruent across the site.
 */
export default function NetworkEffectModel() {
  const [nodes, setNodes] = useState(50);
  const trucksPerDay = 150;

  const calculations = useMemo(() => {
    const n = Math.max(1, nodes);

    const baseQuick = getQuickInputsForPreset('enterprise_50', 'expected');
    const roi = calcRoiV2(
      roiV2InputsFromQuickMode({
        ...baseQuick,
        facilities: n,
        trucksPerDayPerFacility: trucksPerDay,
      }),
    );

    const net = metcalfeInspiredMultiplier(n, roi.assumptionsUsed.network);
    const connections = net.connections;
    const networkMaturityFactor = net.realization * 100;

    const breakdown = roi.networkEffectBreakdown;

    return {
      linearValue: roi.baseSavings,
      networkValue: roi.totalAnnualSavings,
      networkBonus: roi.networkBonusSavings,
      networkMultiplier: roi.networkMultiplier,
      connections,
      networkMaturityFactor,
      baseSavingsPerFacility: n > 0 ? roi.baseSavings / n : 0,
      // Breakdown
      predictiveSavings: breakdown.predictiveIntelligence.planningSavings,
      carrierSavings: breakdown.carrierBenchmarking.negotiationLeverage,
      coordinationSavings: breakdown.coordinationEfficiency.bufferSavings,
      learningSavings: breakdown.sharedLearning.errorReduction,
      // Rates
      etaAccuracyImprovement: breakdown.predictiveIntelligence.etaAccuracyImprovement,
      variabilityReduction: breakdown.coordinationEfficiency.variabilityReduction,
      onboardingDaysSaved: breakdown.sharedLearning.onboardingAcceleration,
    };
  }, [nodes, trucksPerDay]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
    return `$${value.toFixed(0)}`;
  };

  return (
    <div className="glass-card p-8 border border-neon/20">
      {/* Slider Control */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <label htmlFor="nodes" className="text-lg font-semibold">
            Network Size: <span className="text-neon">{nodes} Facilities</span>
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setNodes(Math.max(1, nodes - 5))}
              className="w-8 h-8 rounded bg-void border border-steel/30 text-steel hover:border-neon hover:text-neon transition-colors"
            >
              −
            </button>
            <button
              onClick={() => setNodes(Math.min(200, nodes + 5))}
              className="w-8 h-8 rounded bg-void border border-steel/30 text-steel hover:border-neon hover:text-neon transition-colors"
            >
              +
            </button>
          </div>
        </div>
        
        <input
          id="nodes"
          type="range"
          min="1"
          max="200"
          value={nodes}
          onChange={(e) => setNodes(parseInt(e.target.value))}
          className="w-full h-2 bg-void rounded-lg appearance-none cursor-pointer accent-neon"
        />
        
        <div className="flex justify-between text-xs text-steel/50 mt-2">
          <span>1 Site (Pilot)</span>
          <span>50 Sites</span>
          <span>100 Sites</span>
          <span>200 Sites (Enterprise)</span>
        </div>
      </div>

      {/* Value Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 rounded-lg bg-void/50 border border-steel/20">
          <p className="text-steel/60 text-sm font-mono mb-2">WITHOUT NETWORK EFFECT</p>
          <p className="text-3xl font-black text-steel/70 line-through decoration-ember/50">
            {formatCurrency(calculations.linearValue)}
          </p>
          <p className="text-steel/50 text-sm mt-1">
            {nodes} sites × {formatCurrency(calculations.baseSavingsPerFacility)}/site
          </p>
        </div>
        
        <div className="p-6 rounded-lg bg-neon/10 border border-neon/40">
          <p className="text-neon text-sm font-mono mb-2">WITH NETWORK EFFECT</p>
          <p className="text-4xl font-black text-neon">
            {formatCurrency(calculations.networkValue)}
          </p>
          <p className="text-steel/70 text-sm mt-1">
            {calculations.networkMultiplier.toFixed(2)}× effective multiplier
          </p>
        </div>
        
        <div className="p-6 rounded-lg bg-void/50 border border-steel/20">
          <p className="text-steel/60 text-sm font-mono mb-2">NETWORK BONUS</p>
          <p className="text-3xl font-black text-white">
            +{formatCurrency(calculations.networkBonus)}
          </p>
          <p className="text-steel/50 text-sm mt-1">
            {calculations.connections.toLocaleString()} data connections
          </p>
        </div>
      </div>

      {/* Network Effect Breakdown - NEW */}
      <div className="bg-void/50 rounded-lg p-6 mb-8">
        <p className="text-steel/60 text-xs font-mono mb-4 uppercase">Where Network Value Comes From</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Predictive Intelligence */}
          <div className="p-4 rounded-lg border border-steel/20 bg-carbon/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FlowGlyphPredictiveIntelligence className="w-5 h-5 text-neon" />
                <p className="text-sm font-semibold text-white">Predictive Intelligence</p>
              </div>
              <span className="text-lg font-bold text-neon">{formatCurrency(calculations.predictiveSavings)}</span>
            </div>
            <p className="text-xs text-steel/70">
              +{calculations.etaAccuracyImprovement.toFixed(0)}% ETA accuracy from shared arrival patterns
            </p>
          </div>
          
          {/* Carrier Benchmarking */}
          <div className="p-4 rounded-lg border border-steel/20 bg-carbon/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FlowGlyphCarrierBenchmarking className="w-5 h-5 text-neon" />
                <p className="text-sm font-semibold text-white">Carrier Benchmarking</p>
              </div>
              <span className="text-lg font-bold text-neon">{formatCurrency(calculations.carrierSavings)}</span>
            </div>
            <p className="text-xs text-steel/70">
              Cross-network performance data for rate negotiations
            </p>
          </div>
          
          {/* Coordination Efficiency */}
          <div className="p-4 rounded-lg border border-steel/20 bg-carbon/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FlowGlyphCoordinationEfficiency className="w-5 h-5 text-neon" />
                <p className="text-sm font-semibold text-white">Coordination Efficiency</p>
              </div>
              <span className="text-lg font-bold text-neon">{formatCurrency(calculations.coordinationSavings)}</span>
            </div>
            <p className="text-xs text-steel/70">
              -{calculations.variabilityReduction.toFixed(0)}% variance = smaller safety buffers
            </p>
          </div>
          
          {/* Shared Learning */}
          <div className="p-4 rounded-lg border border-steel/20 bg-carbon/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FlowGlyphSharedLearning className="w-5 h-5 text-neon" />
                <p className="text-sm font-semibold text-white">Shared Learning</p>
              </div>
              <span className="text-lg font-bold text-neon">{formatCurrency(calculations.learningSavings)}</span>
            </div>
            <p className="text-xs text-steel/70">
              {Math.round(calculations.onboardingDaysSaved)} days saved per new site onboarding
            </p>
          </div>
        </div>
      </div>

      {/* Visual Network Graph */}
      <div className="bg-void/50 rounded-lg p-6 mb-8">
        <p className="text-steel/60 text-xs font-mono mb-4 uppercase">Network Topology</p>
        <div className="aspect-[3/1] relative">
          <svg viewBox="0 0 600 200" className="w-full h-full">
            {/* Generate node positions in a circular layout */}
            {Array.from({ length: Math.min(nodes, 30) }).map((_, i) => {
              const displayNodes = Math.min(nodes, 30);
              const angle = (i / displayNodes) * 2 * Math.PI - Math.PI / 2;
              const radius = 80;
              const cx = 300 + radius * Math.cos(angle);
              const cy = 100 + radius * Math.sin(angle) * 0.6;
              
              // Draw connections to nearby nodes
              const connections = [];
              for (let j = i + 1; j < displayNodes && j < i + 4; j++) {
                const angle2 = (j / displayNodes) * 2 * Math.PI - Math.PI / 2;
                const cx2 = 300 + radius * Math.cos(angle2);
                const cy2 = 100 + radius * Math.sin(angle2) * 0.6;
                connections.push(
                  <line 
                    key={`${i}-${j}`}
                    x1={cx} y1={cy} x2={cx2} y2={cy2}
                    stroke="#00B4FF" 
                    strokeWidth="0.5" 
                    opacity="0.2"
                  />
                );
              }
              
              return (
                <g key={i}>
                  {connections}
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r={6} 
                    fill="#00B4FF" 
                    opacity={0.6 + (i / displayNodes) * 0.4}
                  />
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r={8} 
                    fill="none" 
                    stroke="#00B4FF" 
                    strokeWidth="1" 
                    opacity="0.3"
                  />
                </g>
              );
            })}
            
            {/* Central hub indicator */}
            <circle cx="300" cy="100" r="20" fill="none" stroke="#00B4FF" strokeWidth="2" opacity="0.3" />
            <Nexus size={24} className="text-neon" />
            
            {/* Node count indicator */}
            {nodes > 30 && (
              <text x="300" y="185" fontSize="12" fill="#A0A0A0" textAnchor="middle">
                Showing 30 of {nodes} nodes
              </text>
            )}
          </svg>
        </div>
      </div>

      {/* Key Insight */}
      <div className="p-6 rounded-lg border border-neon/30 bg-neon/5">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-neon/20 flex-shrink-0">
            <Nexus size={24} className="text-neon" />
          </div>
          <div>
            <h4 className="text-lg font-bold mb-2">The Compounding Insight</h4>
            <p className="text-steel/80 leading-relaxed">
              At <span className="text-neon font-semibold">{nodes} facilities</span>, you unlock 
              {' '}<span className="text-neon font-semibold">{calculations.connections.toLocaleString()}</span> data 
              connections. Each connection shares arrival predictions, carrier performance, and detention patterns, making 
              every node smarter. Your competitors' yards become your <span className="text-white font-semibold">data advantage</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Preset Scenarios */}
      <div className="mt-8 flex flex-wrap gap-3">
        <p className="text-steel/60 text-sm mr-2">Quick presets:</p>
        {[
          { label: 'Pilot', value: 1 },
          { label: 'Regional', value: 10 },
          { label: 'Enterprise', value: 50 },
          { label: 'Enterprise Max', value: 260 },
        ].map((preset) => (
          <button
            key={preset.label}
            onClick={() => setNodes(Math.min(200, preset.value))}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              nodes === preset.value || (preset.value === 260 && nodes === 200)
                ? 'bg-neon text-void font-semibold'
                : 'bg-void border border-steel/30 text-steel hover:border-neon hover:text-neon'
            }`}
          >
            {preset.label} ({preset.value})
          </button>
        ))}
      </div>
    </div>
  );
}

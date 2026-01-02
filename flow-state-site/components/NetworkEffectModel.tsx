'use client';

import React, { useState, useMemo } from 'react';
import { Nexus } from '@/components/icons/FlowIcons';

/**
 * NetworkEffectModel — Interactive visualization of network effects for yard networks.
 * Shows how value compounds through specific, credible mechanisms.
 */
export default function NetworkEffectModel() {
  const [nodes, setNodes] = useState(10);

  const calculations = useMemo(() => {
    const n = Math.max(1, nodes);
    
    // Base savings per facility (conservative industry estimate)
    const baseSavingsPerFacility = 85000; // $85k/yr from labor, paper, detention
    
    // Linear value (no network effect - just adding facilities)
    const linearValue = n * baseSavingsPerFacility;
    
    // Network connections = n(n-1)/2 (Metcalfe's Law)
    const connections = (n * (n - 1)) / 2;
    
    // Shipments per year (estimate: 150 trucks/day × 365 × facilities)
    const shipmentsPerYear = n * 150 * 365;
    
    // ========= NETWORK EFFECT VALUE STREAMS =========
    
    // 1. PREDICTIVE INTELLIGENCE
    // More data points = better ETA predictions = better dock scheduling
    const etaAccuracyImprovement = Math.min(0.35, 0.05 + Math.log(n + 1) * 0.08);
    const planningValuePerShipment = 2.5 * etaAccuracyImprovement;
    const predictiveSavings = planningValuePerShipment * shipmentsPerYear;
    
    // 2. CARRIER BENCHMARKING
    // Cross-network carrier performance creates negotiation leverage
    const carrierLeveragePercent = Math.min(0.03, 0.005 + Math.log(n + 1) * 0.006);
    const thirdPartySpend = shipmentsPerYear * 0.6 * 150; // 60% third-party, $150 avg
    const carrierSavings = thirdPartySpend * carrierLeveragePercent;
    
    // 3. COORDINATION EFFICIENCY
    // Reduced variability = smaller buffers
    const variabilityReduction = Math.min(0.30, Math.log2(Math.max(1, n)) * 0.05);
    const bufferCostBase = linearValue * 0.08;
    const coordinationSavings = bufferCostBase * variabilityReduction;
    
    // 4. SHARED LEARNING
    // Faster onboarding + error reduction
    const onboardingDaysSaved = Math.min(60, Math.log(n + 1) * 15);
    const newSitesPerYear = Math.ceil(n * 0.1);
    const onboardingSavings = onboardingDaysSaved * 500 * newSitesPerYear;
    const errorReductionPercent = Math.min(0.20, Math.log(n + 1) * 0.04);
    const errorSavings = shipmentsPerYear * 0.5 * errorReductionPercent;
    const learningSavings = onboardingSavings + errorSavings;
    
    // Total network bonus
    const networkBonus = predictiveSavings + carrierSavings + coordinationSavings + learningSavings;
    
    // Total with network effect
    const networkValue = linearValue + networkBonus;
    
    // Effective multiplier
    const networkMultiplier = networkValue / linearValue;
    
    return {
      linearValue,
      networkValue,
      networkBonus,
      networkMultiplier,
      connections,
      // Breakdown
      predictiveSavings,
      carrierSavings,
      coordinationSavings,
      learningSavings,
      // Rates
      etaAccuracyImprovement: etaAccuracyImprovement * 100,
      variabilityReduction: variabilityReduction * 100,
      onboardingDaysSaved,
    };
  }, [nodes]);

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
            {nodes} sites × $85k base savings
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
              <p className="text-sm font-semibold text-white">🎯 Predictive Intelligence</p>
              <span className="text-lg font-bold text-neon">{formatCurrency(calculations.predictiveSavings)}</span>
            </div>
            <p className="text-xs text-steel/70">
              +{calculations.etaAccuracyImprovement.toFixed(0)}% ETA accuracy from shared arrival patterns
            </p>
          </div>
          
          {/* Carrier Benchmarking */}
          <div className="p-4 rounded-lg border border-steel/20 bg-carbon/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-white">📊 Carrier Benchmarking</p>
              <span className="text-lg font-bold text-neon">{formatCurrency(calculations.carrierSavings)}</span>
            </div>
            <p className="text-xs text-steel/70">
              Cross-network performance data for rate negotiations
            </p>
          </div>
          
          {/* Coordination Efficiency */}
          <div className="p-4 rounded-lg border border-steel/20 bg-carbon/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-white">⚡ Coordination Efficiency</p>
              <span className="text-lg font-bold text-neon">{formatCurrency(calculations.coordinationSavings)}</span>
            </div>
            <p className="text-xs text-steel/70">
              -{calculations.variabilityReduction.toFixed(0)}% variance = smaller safety buffers
            </p>
          </div>
          
          {/* Shared Learning */}
          <div className="p-4 rounded-lg border border-steel/20 bg-carbon/30">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-white">🧠 Shared Learning</p>
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
              <text x="300" y="185" fontSize="12" fill="#888" textAnchor="middle">
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
              connections. Each connection shares arrival predictions, carrier performance, and detention patterns—making 
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
          { label: 'Primo Scale', value: 260 },
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

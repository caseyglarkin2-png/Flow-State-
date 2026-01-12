/* ═══════════════════════════════════════════════════════════════
   SINGULARITY PAGE - REDUNDANCY REPORT (Pass 6)
   ═══════════════════════════════════════════════════════════════
   
   A) EXACT DUPLICATE STRINGS:
      1. Network effect formula appears here + homepage + ROI calculator
      2. "Cross-site intelligence" appears 4× in different contexts
      3. Metcalfe-inspired multiplier explained here + economics.ts
   
   B) CONCEPT DUPLICATION:
      1. "Chapter 3" explanation repeats Chapter3Content component
      2. "Depends on standardization" repeats Ch1 dependency
      3. Facility count → network value curve duplicates homepage proof
   
   C) CTA DUPLICATION:
      - "Model your network" CTA overlaps with ROI calculator
      - No clear differentiation from ROI page value prop
   
   D) WHAT TO DELETE:
      ✗ Redundant "this is Chapter 3" explanation - link to chapters instead
      ✗ Duplicate standardization dependency explanation
   
   E) WHAT TO CONSOLIDATE:
      ↓ Network effect formula should pull from economics.ts only
      ↓ Scenario picker uses same presets as ROI - GOOD
   
   F) WHAT TO ADD:
      + "This is Chapter 3 in action" badge at top
      + Link to homepage for full spine context
      + "Why network intelligence requires Ch1" callout
   
   ═══════════════════════════════════════════════════════════════
   
   AUDIT: SINGULARITY PAGE (Network Intelligence Visualization)
   ═══════════════════════════════════════════════════════════════
   
   WHAT IT SAYS NOW:
   - Interactive network map with 50+ facilities
   - Drill-down from network → facility → root cause
   - Uses calcScenario + roiV2InputsFromQuickMode (economics.ts LOCKED ✓)
   - metcalfeInspiredMultiplier visualization
   
   WHAT IT SHOULD SAY (Chapter 3 Focus):
   - This IS Chapter 3 - network effect made tangible
   - Depends on Chapter 1 standardization (all facilities same timestamps)
   - Shows compounding value: 5 facilities → 50 facilities = exponential insight
   
   TOP 3 CONVERSION BLOCKERS:
   1. Doesn't explicitly say "This is Chapter 3" - should tie to spine
   2. Network multiplier calculation not explained (black box feel)
   3. Missing "only possible because of standardized inputs" callout
   
   STATUS: Economics LOCKED ✓, Visualization compelling ✓
   NEXT: Add chapter badge, explain network effect formula briefly
   ═══════════════════════════════════════════════════════════════ */

'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { calcScenario, getQuickInputsForPreset, roiV2InputsFromQuickMode, money as formatMoney, metcalfeInspiredMultiplier } from '@/lib/economics';
import {
  Caution,
  FlowArrow,
  Metrics,
  Cortex,
  Prism,
  Manifest,
  Nexus,
  Signal,
  Cycle,
  Ignite,
  Scope,
  Waypoint,
  Crosshair,
  Velocity,
} from '@/components/icons/FlowIcons';

// Facility node type - simplified for performance
interface Facility {
  id: number;
  name: string;
  x: number;
  y: number;
  type: 'dc' | 'port' | 'terminal' | 'plant';
}

// Data packet type
interface DataPacket {
  id: number;
  from: number;
  to: number;
  progress: number;
  type: 'truck' | 'bol' | 'message';
}

// Pre-computed facility data (static, no runtime object creation)
const FACILITIES: Facility[] = [
  // West Coast Corridor
  { id: 1, name: 'Seattle', x: 10, y: 12, type: 'port' },
  { id: 2, name: 'Portland', x: 11, y: 18, type: 'dc' },
  { id: 3, name: 'Oakland', x: 8, y: 35, type: 'port' },
  { id: 4, name: 'LA Port', x: 12, y: 48, type: 'port' },
  { id: 5, name: 'Long Beach', x: 14, y: 50, type: 'terminal' },
  { id: 6, name: 'San Diego', x: 15, y: 55, type: 'dc' },
  // Mountain West
  { id: 7, name: 'Phoenix', x: 22, y: 52, type: 'plant' },
  { id: 8, name: 'Las Vegas', x: 18, y: 42, type: 'dc' },
  { id: 9, name: 'Salt Lake', x: 22, y: 32, type: 'dc' },
  { id: 10, name: 'Denver', x: 32, y: 36, type: 'dc' },
  // Texas Triangle
  { id: 11, name: 'Dallas', x: 38, y: 52, type: 'dc' },
  { id: 12, name: 'Houston', x: 42, y: 62, type: 'port' },
  { id: 13, name: 'San Antonio', x: 36, y: 60, type: 'dc' },
  // Central Corridor
  { id: 14, name: 'Kansas City', x: 42, y: 38, type: 'dc' },
  { id: 15, name: 'Minneapolis', x: 44, y: 22, type: 'dc' },
  { id: 16, name: 'St Louis', x: 48, y: 40, type: 'dc' },
  // Great Lakes
  { id: 17, name: 'Chicago', x: 52, y: 32, type: 'dc' },
  { id: 18, name: 'Detroit', x: 58, y: 28, type: 'plant' },
  { id: 19, name: 'Cleveland', x: 62, y: 30, type: 'dc' },
  { id: 20, name: 'Indianapolis', x: 55, y: 36, type: 'dc' },
  // Southeast
  { id: 21, name: 'Memphis', x: 50, y: 46, type: 'dc' },
  { id: 22, name: 'Atlanta', x: 60, y: 50, type: 'dc' },
  { id: 23, name: 'Jacksonville', x: 68, y: 58, type: 'port' },
  { id: 24, name: 'Miami', x: 72, y: 75, type: 'port' },
  { id: 25, name: 'Savannah', x: 68, y: 54, type: 'port' },
  // Mid-Atlantic
  { id: 26, name: 'Charlotte', x: 66, y: 46, type: 'dc' },
  { id: 27, name: 'Norfolk', x: 74, y: 42, type: 'port' },
  { id: 28, name: 'Baltimore', x: 74, y: 36, type: 'port' },
  { id: 29, name: 'Philadelphia', x: 78, y: 32, type: 'dc' },
  // Northeast
  { id: 30, name: 'Newark', x: 80, y: 28, type: 'terminal' },
  { id: 31, name: 'Boston', x: 88, y: 18, type: 'terminal' },
  { id: 32, name: 'Pittsburgh', x: 68, y: 32, type: 'dc' },
];

const TOTAL_FACILITIES = FACILITIES.length;

// Memoized network visualization component
const NetworkMap = React.memo(function NetworkMap({
  phase,
  activeFacilities,
  packets,
}: {
  phase: 'chaos' | 'transition' | 'flow';
  activeFacilities: number;
  packets: DataPacket[];
}) {
  // Pre-compute connections for active facilities (limited for performance)
  const connections = useMemo(() => {
    if (phase === 'chaos' || activeFacilities < 2) return [];
    
    const result: Array<{ from: Facility; to: Facility }> = [];
    const activeNodes = FACILITIES.slice(0, activeFacilities);
    
    // Only render nearest-neighbor connections (not O(n²))
    for (let i = 0; i < activeNodes.length; i++) {
      const from = activeNodes[i];
      // Connect to next 2-3 facilities only
      for (let j = 1; j <= 3 && i + j < activeNodes.length; j++) {
        const to = activeNodes[i + j];
        result.push({ from, to });
      }
    }
    return result;
  }, [phase, activeFacilities]);

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Connection lines - simplified */}
      {connections.map(({ from, to }) => (
        <line
          key={`${from.id}-${to.id}`}
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke="#00B4FF"
          strokeWidth="0.2"
          opacity={phase === 'flow' ? 0.5 : 0.25}
        />
      ))}

      {/* Data packets - limited count */}
      {packets.slice(0, 10).map(packet => {
        const from = FACILITIES.find(f => f.id === packet.from);
        const to = FACILITIES.find(f => f.id === packet.to);
        if (!from || !to) return null;

        const x = from.x + (to.x - from.x) * (packet.progress / 100);
        const y = from.y + (to.y - from.y) * (packet.progress / 100);

        return (
          <circle
            key={packet.id}
            cx={x}
            cy={y}
            r={1}
            fill={packet.type === 'truck' ? '#00B4FF' : '#FFB800'}
            opacity={0.8}
          />
        );
      })}

      {/* Facility nodes */}
      {FACILITIES.map((facility, index) => {
        const isOnline = index < activeFacilities;
        return (
          <g key={facility.id}>
            {/* Pulse ring for online - CSS animation instead of SVG animate */}
            {isOnline && (
              <circle
                cx={facility.x}
                cy={facility.y}
                r="3"
                fill="none"
                stroke="#00B4FF"
                strokeWidth="0.2"
                opacity="0.3"
                className="animate-pulse"
              />
            )}
            
            {/* Main node */}
            <circle
              cx={facility.x}
              cy={facility.y}
              r="1.8"
              fill={isOnline ? '#00B4FF' : '#FF2A00'}
              className="transition-colors duration-300"
            />
            
            {/* Label - only show for larger screens via CSS */}
            <text
              x={facility.x}
              y={facility.y + 4.5}
              fontSize="1.8"
              fill={isOnline ? '#00B4FF' : '#666666'}
              textAnchor="middle"
              className="hidden md:block"
            >
              {facility.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
});

export default function SingularityPage() {
  const [phase, setPhase] = useState<'chaos' | 'transition' | 'flow'>('chaos');
  const [activeFacilities, setActiveFacilities] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [trucksProcessed, setTrucksProcessed] = useState(0);
  const [networkVelocity, setNetworkVelocity] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showROI, setShowROI] = useState(false);
  const [packets, setPackets] = useState<DataPacket[]>([]);

  const modeled = useMemo(() => {
    const f = Math.max(0, Math.min(TOTAL_FACILITIES, Math.floor(activeFacilities)));
    if (f <= 0) {
      return {
        facilities: 0,
        annualLaborSavings: 0,
        paperlessSavings: 0,
        annualDetentionSavings: 0,
        throughputValue: 0,
        baseSavings: 0,
        networkMultiplier: 1,
        networkBonusSavings: 0,
        totalAnnualSavings: 0,
        beta: 0,
        tau: 45,
        examples: {
          m1: 1,
          m10: 1,
          m25: 1,
          m32: 1,
        },
      };
    }

    const quick = getQuickInputsForPreset('enterprise_50', 'expected');
    const roiInputs = {
      ...roiV2InputsFromQuickMode({ ...quick, facilities: f }),
      contractedFacilities: f,
      yearOneRampShare: 0.5,
    };

    const out = calcScenario({
      roi: roiInputs,
      profit: {
        method: 'contribution_margin',
        contributionMarginPerTruckload: roiInputs.throughput.incrementalMarginPerTruck,
        outsourcedCostPerTruckload: 0,
        internalVariableCostPerTruckload: 0,
      },
      discountRate: 0.1,
      growthRate: 0.02,
    });

    const { beta, tau } = out.roi.assumptionsUsed.network;
    const m = (n: number) => metcalfeInspiredMultiplier(n, { beta, tau }).multiplier;

    return {
      facilities: f,
      annualLaborSavings: out.roi.annualLaborSavings,
      paperlessSavings: out.roi.paperlessSavings,
      annualDetentionSavings: out.roi.annualDetentionSavings,
      throughputValue: out.roi.throughputValue,
      baseSavings: out.roi.baseSavings,
      networkMultiplier: out.roi.networkMultiplier,
      networkBonusSavings: out.roi.networkBonusSavings,
      totalAnnualSavings: out.roi.totalAnnualSavings,
      beta,
      tau,
      examples: {
        m1: m(1),
        m10: m(10),
        m25: m(25),
        m32: m(32),
      },
    };
  }, [activeFacilities]);

  // Start the singularity simulation - optimized
  const startSimulation = useCallback(() => {
    setIsSimulating(true);
    setPhase('transition');
    setTotalSavings(0);
    setTrucksProcessed(0);
    setNetworkVelocity(0);
    setActiveFacilities(0);
  }, []);

  // Facility activation effect
  useEffect(() => {
    if (!isSimulating || phase === 'chaos') return;

    let activated = 0;
    const activationInterval = setInterval(() => {
      if (activated >= TOTAL_FACILITIES) {
        clearInterval(activationInterval);
        setPhase('flow');
        return;
      }

      activated++;
      setActiveFacilities(activated);
      
      // Network effect multiplier (canonical, realization-adjusted)
      const mult = metcalfeInspiredMultiplier(activated, { beta: modeled.beta, tau: modeled.tau }).multiplier;
      setNetworkVelocity(Math.round(mult * 100));
    }, 250);

    return () => clearInterval(activationInterval);
  }, [isSimulating, phase, modeled.beta, modeled.tau]);

  // Accumulate savings - throttled updates
  useEffect(() => {
    if (!isSimulating || phase === 'chaos') return;

    const savingsInterval = setInterval(() => {
      const networkEffect = Math.pow(activeFacilities, 1.4);
      setTotalSavings(prev => prev + Math.round(networkEffect * 650));
      setTrucksProcessed(prev => prev + Math.round(activeFacilities * 1.8));
    }, 150);

    return () => clearInterval(savingsInterval);
  }, [isSimulating, phase, activeFacilities]);

  // Generate data packets - limited
  useEffect(() => {
    if (phase !== 'flow') return;

    const packetInterval = setInterval(() => {
      if (activeFacilities < 2) return;

      const fromIdx = Math.floor(Math.random() * activeFacilities);
      const toIdx = Math.floor(Math.random() * activeFacilities);
      if (fromIdx === toIdx) return;

      const types: ('truck' | 'bol' | 'message')[] = ['truck', 'bol', 'message'];
      
      setPackets(prev => {
        const newPackets = prev.slice(-8); // Keep max 8 packets
        newPackets.push({
          id: Date.now(),
          from: FACILITIES[fromIdx].id,
          to: FACILITIES[toIdx].id,
          progress: 0,
          type: types[Math.floor(Math.random() * types.length)]
        });
        return newPackets;
      });
    }, 400);

    return () => clearInterval(packetInterval);
  }, [phase, activeFacilities]);

  // Animate packets - optimized
  const hasPackets = packets.length > 0;
  useEffect(() => {
    if (!hasPackets) return;

    const animationInterval = setInterval(() => {
      setPackets(prev => 
        prev
          .map(p => ({ ...p, progress: p.progress + 8 }))
          .filter(p => p.progress <= 100)
      );
    }, 60);

    return () => clearInterval(animationInterval);
  }, [hasPackets]);

  const resetSimulation = useCallback(() => {
    setIsSimulating(false);
    setPhase('chaos');
    setActiveFacilities(0);
    setTotalSavings(0);
    setTrucksProcessed(0);
    setNetworkVelocity(0);
    setPackets([]);
  }, []);

  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        {/* Animated background based on phase */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          phase === 'chaos' ? 'opacity-30' : phase === 'transition' ? 'opacity-50' : 'opacity-70'
        }`}>
          <div className="grid-background"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 w-full">
          {/* Chapter Badge */}
          <div className="text-center mb-6">
            <div className="inline-block px-4 py-2 rounded-full bg-neon/10 border border-neon/40 mb-4">
              <span className="text-neon font-mono text-xs uppercase tracking-wider">Chapter 3 in Action</span>
            </div>
            <p className="text-sm text-steel/80 max-w-2xl mx-auto">
              Network intelligence is only possible when Chapter 1 (standardization) + Chapter 2 (control) are in place. This is what Chapter 3 unlocks.
            </p>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
              The <span className="neon-glow">Logistics Singularity</span>
            </h1>
            <p className="text-xl text-steel max-w-3xl mx-auto">
              Watch what happens when every facility in your network achieves YardFlow by FreightRoll.
              <br />
              <span className="text-neon font-semibold">This is the point of no return.</span>
            </p>
          </div>

          {/* Network Visualization */}
          <div className="glass-card p-4 mb-8 aspect-[16/9] relative overflow-hidden">
            {/* Phase indicator */}
            <div className="absolute top-4 left-4 z-20">
              <div className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                phase === 'chaos' ? 'bg-ember/20 text-ember' :
                phase === 'transition' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-neon/20 text-neon'
              }`}>
                <span className="inline-flex items-center gap-2">
                  {phase === 'chaos' ? (
                    <><Caution size={16} /> CHAOS STATE</>
                  ) : phase === 'transition' ? (
                    <><Cycle size={16} /> TRANSFORMATION</>
                  ) : (
                    <><Velocity size={16} /> YARDFLOW</>
                  )}
                </span>
              </div>
            </div>

            {/* Memoized SVG Network Map */}
            <NetworkMap phase={phase} activeFacilities={activeFacilities} packets={packets} />

            {/* Legend */}
            <div className="absolute bottom-4 right-4 glass-card p-3 text-xs">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-neon"></div>
                <span className="text-steel">YardFlow by FreightRoll</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-ember"></div>
                <span className="text-steel">Chaos</span>
              </div>
            </div>
          </div>

          {/* Live Metrics Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center">
              <p className="text-sm text-steel mb-1">Network Sites</p>
              <p className="text-3xl md:text-4xl font-black neon-glow">{activeFacilities}/{TOTAL_FACILITIES}</p>
            </Card>
            <Card className="text-center">
              <p className="text-sm text-steel mb-1">Simulated Savings</p>
              <p className="text-3xl md:text-4xl font-black text-neon">{formatMoney(totalSavings)}</p>
              <p className="text-xs text-steel/70 mt-1">Illustrative animation (not a forecast)</p>
            </Card>
            <Card className="text-center">
              <p className="text-sm text-steel mb-1">Trucks Processed</p>
              <p className="text-3xl md:text-4xl font-black">{trucksProcessed.toLocaleString()}</p>
            </Card>
            <Card className="text-center">
              <p className="text-sm text-steel mb-1">Network Velocity</p>
              <p className="text-3xl md:text-4xl font-black text-neon">{networkVelocity}%</p>
            </Card>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {!isSimulating ? (
              <Button variant="neon-fill" size="lg" onClick={startSimulation} icon={<Velocity size={20} className="text-void" />}>
                Initiate Singularity
              </Button>
            ) : (
              <Button variant="neon" size="lg" onClick={resetSimulation} icon={<Cycle size={20} />}>
                Reset Simulation
              </Button>
            )}
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setShowROI(!showROI)}
              icon={<Metrics size={20} />}
            >
              {showROI ? 'Hide' : 'Show'} ROI Breakdown
            </Button>
          </div>

          {/* ROI Breakdown Panel - lazy loaded */}
          {showROI && (
            <div className="glass-card p-6 md:p-8 mb-8 animate-flow-in">
              <h3 className="text-2xl font-bold mb-6 neon-glow">Network Effect ROI Model</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-neon mb-3">Per-Site Savings</h4>
                  <ul className="space-y-2 text-sm text-steel">
                    <li className="flex justify-between"><span>Labor</span><span className="text-white">{formatMoney(modeled.facilities > 0 ? modeled.annualLaborSavings / modeled.facilities : 0)}/yr</span></li>
                    <li className="flex justify-between"><span>Paperless</span><span className="text-white">{formatMoney(modeled.facilities > 0 ? modeled.paperlessSavings / modeled.facilities : 0)}/yr</span></li>
                    <li className="flex justify-between"><span>Detention</span><span className="text-white">{formatMoney(modeled.facilities > 0 ? modeled.annualDetentionSavings / modeled.facilities : 0)}/yr</span></li>
                    <li className="flex justify-between"><span>Throughput</span><span className="text-white">{formatMoney(modeled.facilities > 0 ? modeled.throughputValue / modeled.facilities : 0)}/yr</span></li>
                    <li className="flex justify-between border-t border-neon/20 pt-2 mt-2">
                      <span className="font-bold">Total per site</span>
                      <span className="text-neon font-bold">{formatMoney(modeled.facilities > 0 ? modeled.baseSavings / modeled.facilities : 0)}/yr</span>
                    </li>
                  </ul>
                  <p className="text-xs text-steel/70 mt-3">Computed from the same ROI engine used on /roi.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-neon mb-3">Network Multiplier</h4>
                  <ul className="space-y-2 text-sm text-steel">
                    <li className="flex justify-between"><span>1 site</span><span className="text-white">{modeled.examples.m1.toFixed(1)}x</span></li>
                    <li className="flex justify-between"><span>10 sites</span><span className="text-white">{modeled.examples.m10.toFixed(1)}x</span></li>
                    <li className="flex justify-between"><span>25 sites</span><span className="text-white">{modeled.examples.m25.toFixed(1)}x</span></li>
                    <li className="flex justify-between border-t border-neon/20 pt-2 mt-2">
                      <span className="font-bold">32 sites</span>
                      <span className="text-neon font-bold">{modeled.examples.m32.toFixed(1)}x</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-neon mb-3">32-Site Network</h4>
                  <ul className="space-y-2 text-sm text-steel">
                    <li className="flex justify-between"><span>Base savings</span><span className="text-white">{formatMoney(modeled.baseSavings)}/yr</span></li>
                    <li className="flex justify-between"><span>Network effect ({modeled.networkMultiplier.toFixed(1)}x)</span><span className="text-white">+{formatMoney(modeled.networkBonusSavings)}/yr</span></li>
                    <li className="flex justify-between border-t border-neon/20 pt-2 mt-2">
                      <span className="font-bold">Total annual</span>
                      <span className="text-neon font-bold">{formatMoney(modeled.totalAnnualSavings)}/yr</span>
                    </li>
                  </ul>
                  <p className="text-xs text-steel/70 mt-3">Values update as sites come online.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* The Singularity Manifesto */}
      <section className="py-20 md:py-24 bg-carbon/50 border-t border-neon/20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
            The <span className="neon-glow">Irreversible</span> Shift
          </h2>

          {/* Chapter 1 Foundation Callout */}
          <div className="mb-12 p-8 rounded-lg border-2 border-neon/40 bg-neon/5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-neon flex items-center justify-center flex-shrink-0">
                <span className="text-void font-black text-xl">1</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Every Metric Starts with Chapter 1</h3>
                <p className="text-steel/90 mb-4">
                  The network intelligence you see in this simulation is <strong className="text-neon">100% sourced from standardized Chapter 1 inputs</strong>: 
                  QR check-in timestamps, driver actions, reason codes, multilingual comms receipts.
                </p>
                <p className="text-steel/90">
                  Without the Standardization Band (identical driver journey across all facilities), none of this is possible. 
                  The network effect doesn't emerge from visibility—it emerges from <span className="text-white font-semibold">interoperable, defensible, hardware-sourced data</span>.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8 text-lg text-steel/90 leading-relaxed">
            <p>
              <span className="text-neon font-bold text-2xl">"</span>
              There are moments in history when technology doesn't just improve, it <span className="text-neon font-semibold">transforms</span>. 
              The printing press. The telegraph. The internet. The smartphone.
            </p>

            <p>
              Each created a <span className="text-white font-semibold">singularity</span>: a point where the old way becomes 
              not just inefficient, but <span className="text-ember">unthinkable</span>.
            </p>

            <p>
              Today, your yard operates like it's 1995. Clipboards. Radio chatter. Manual check-ins. 
              Paper BOLs. <span className="text-steel/60">While your TMS and WMS live in 2025.</span>
            </p>

            <div className="glass-card p-6 md:p-8 border-l-4 border-neon my-12">
              <p className="text-xl md:text-2xl font-bold text-white mb-4">
                The gap isn't closing. It's widening.
              </p>
              <p className="text-steel">
                Every day you wait, your competitors are capturing ground source truth. 
                Building network effects. Compounding their advantage.
              </p>
            </div>

            <p>
              When every facility in your network achieves <span className="text-neon font-semibold">YardFlow by FreightRoll</span>:
            </p>

            <ul className="space-y-4 pl-6">
              <li className="flex gap-3">
                <FlowArrow size={16} className="text-neon flex-shrink-0 mt-1" />
                <span>Drivers check in <span className="text-white font-semibold">without human intervention</span>. Gate to dock in 4 minutes, not 48.</span>
              </li>
              <li className="flex gap-3">
                <FlowArrow size={16} className="text-neon flex-shrink-0 mt-1" />
                <span>BOLs are <span className="text-white font-semibold">born digital</span>. Chain of custody is immutable. Disputes drop significantly.</span>
              </li>
              <li className="flex gap-3">
                <FlowArrow size={16} className="text-neon flex-shrink-0 mt-1" />
                <span>Every asset speaks. Every move is <span className="text-white font-semibold">orchestrated by AI</span>. Yard jockeys become operators.</span>
              </li>
              <li className="flex gap-3">
                <FlowArrow size={16} className="text-neon flex-shrink-0 mt-1" />
                <span>Network intelligence compounds. <span className="text-white font-semibold">Metcalfe's Law</span> kicks in. Each new site multiplies value.</span>
              </li>
            </ul>

            <p className="text-xl md:text-2xl font-bold text-white mt-12">
              This is the Logistics Singularity.
              <br />
              <span className="neon-glow">And it's happening now.</span>
            </p>
          </div>

          {/* Data Flow: Chapter 1 → 2 → 3 */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-neon/40 bg-neon/5">
              <div className="text-neon font-mono text-xs uppercase tracking-wider mb-2">Chapter 1 Input</div>
              <h3 className="text-lg font-bold text-white mb-3">Standardized Timestamps</h3>
              <p className="text-steel/80 text-sm">
                QR check-in: 8:47:23am. Dock-start: 9:12:08am. Gate-out: 10:05:14am. Hardware-sourced. Defensible. Same schema across all 260 facilities.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-steel/30 bg-carbon/40">
              <div className="text-steel/60 font-mono text-xs uppercase tracking-wider mb-2">Chapter 2 Processing</div>
              <h3 className="text-lg font-bold text-white mb-3">Per-Site Control Loop</h3>
              <p className="text-steel/80 text-sm">
                Facility 12 processes data locally: "Carrier X, live load, 78 min dwell." Control loop triggers: auto-escalate if &gt;90 min, assign priority dock.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-steel/30 bg-carbon/40">
              <div className="text-steel/60 font-mono text-xs uppercase tracking-wider mb-2">Chapter 3 Intelligence</div>
              <h3 className="text-lg font-bold text-white mb-3">Network-Level Insight</h3>
              <p className="text-steel/80 text-sm">
                Network aggregates: "Carrier X averages 78 min across 12 facilities. Carrier Y: 42 min." Predictive alert: "High dwell risk detected."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens When Section */}
      <section className="py-20 md:py-24 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">What Changes Forever</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                before: 'Guard shack with clipboard',
                after: 'Autonomous kiosk network',
                icon: <Waypoint size={32} className="text-neon" />,
                detail: 'Drivers verify identity via mobile. OCR validates trucks. Gate time: 47 seconds.'
              },
              {
                before: 'Paper BOLs and fax machines',
                after: 'Digital chain of custody',
                icon: <Manifest size={32} className="text-neon" />,
                detail: 'Documents captured, validated, stored immutably. No disputes. No lost paperwork.'
              },
              {
                before: 'Radio calls and shouting',
                after: 'Real-time SMS orchestration',
                icon: <Signal size={32} className="text-neon" />,
                detail: 'Drivers get translated instructions instantly. No app. No radio chatter.'
              },
              {
                before: 'Yard checks every 4 hours',
                after: 'Continuous ground truth',
                icon: <Scope size={32} className="text-neon" />,
                detail: 'Know where every asset is, every moment. GPS + CV + driver confirmation.'
              },
              {
                before: 'Reactive firefighting',
                after: 'Predictive orchestration',
                icon: <Cortex size={32} className="text-neon" />,
                detail: 'AI recommends optimal moves before congestion happens.'
              },
              {
                before: 'Siloed facility data',
                after: 'Network intelligence',
                icon: <Nexus size={32} className="text-neon" />,
                detail: 'Cross-facility visibility. Predict arrivals. Balance loads.'
              },
            ].map((item, i) => (
              <Card key={i} hover className="overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-ember line-through text-sm">{item.before}</span>
                      <FlowArrow size={14} className="text-neon" />
                      <span className="text-neon font-semibold text-sm">{item.after}</span>
                    </div>
                    <p className="text-steel/80 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Member Program */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-neon/10 to-transparent border-t border-neon/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-2 rounded-full border border-neon/50 text-neon text-sm font-semibold mb-8">
            <span className="inline-flex items-center gap-2">
              <Ignite size={16} />
              FOUNDING MEMBER PROGRAM
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Founding Members
          </h2>

          <p className="text-lg md:text-xl text-steel mb-8 max-w-2xl mx-auto">
            We're building the network with a select cohort of forward-thinking enterprises. 
            Founding members get priority deployment, direct product input, and <span className="text-neon font-semibold">preferred pricing terms</span>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <div className="text-neon mb-3"><Velocity size={32} /></div>
              <h3 className="font-bold text-neon mb-2">Priority Access</h3>
              <p className="text-steel/80 text-sm">Jump the deployment queue. Go live in weeks, not quarters.</p>
            </Card>
            <Card>
              <div className="text-neon mb-3"><Crosshair size={32} /></div>
              <h3 className="font-bold text-neon mb-2">Product Council</h3>
              <p className="text-steel/80 text-sm">Direct input on roadmap. Shape the features your network needs.</p>
            </Card>
            <Card>
              <div className="text-neon mb-3"><Prism size={32} /></div>
              <h3 className="font-bold text-neon mb-2">Founder Pricing</h3>
              <p className="text-steel/80 text-sm">Lock in 2024 rates forever. No increases. Ever.</p>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact?intent=qualify">
              <Button variant="neon-fill" size="lg" icon={<Crosshair size={20} className="text-void" />}>
                Apply for Membership
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import BoardReadyExportCTA from '@/components/BoardReadyExportCTA';
import NextSteps from '@/components/NextSteps';
import { FlowArrow, Metrics, Velocity, Crosshair, Config, Timeline, Caution, Agent, Manifest, Nexus } from '@/components/icons/FlowIcons';
import { calcRoiV1, calcRoiV2, defaultRoiV2Inputs, roiV2InputsFromQuickMode } from '@/lib/roi/calc';
import type { RoiV2Inputs } from '@/lib/roi/types';

// CFO-focused summary metrics
interface CFOMetrics {
  totalAnnualSavings: number;
  yearOneROI: number;
  paybackMonths: number;
  fiveYearNPV: number;
  costOfDelay90Days: number;
  irr: number;
  savingsPerFacility: number;
  networkMultiplier: number;
}

function calculateCFOMetrics(
  totalAnnualSavings: number,
  implementationCost: number,
  annualSubscription: number,
  facilities: number,
  networkMultiplier: number
): CFOMetrics {
  const yearOneGrossSavings = totalAnnualSavings;
  const yearOneNetGain = yearOneGrossSavings - implementationCost - annualSubscription;
  const yearOneROI = implementationCost > 0 
    ? ((yearOneGrossSavings - annualSubscription) / implementationCost) * 100 
    : 0;
  
  const paybackMonths = implementationCost > 0
    ? implementationCost / ((yearOneGrossSavings - annualSubscription) / 12)
    : 0;
  
  // 5-year NPV with 10% discount rate
  const discountRate = 0.10;
  const fiveYearNPV = -implementationCost + 
    Array.from({ length: 5 }, (_, i) => 
      (totalAnnualSavings * Math.pow(1.02, i) - annualSubscription) / Math.pow(1 + discountRate, i + 1)
    ).reduce((a, b) => a + b, 0);
  
  // Cost of 90-day delay (quarterly savings lost)
  const costOfDelay90Days = yearOneGrossSavings / 4;
  
  // Simplified IRR approximation
  const irr = implementationCost > 0 
    ? ((yearOneNetGain / implementationCost) * 100) + 15 // Simplified for display
    : 0;
  
  const savingsPerFacility = facilities > 0 ? totalAnnualSavings / facilities : 0;
  
  return {
    totalAnnualSavings,
    yearOneROI,
    paybackMonths,
    fiveYearNPV,
    costOfDelay90Days,
    irr,
    savingsPerFacility,
    networkMultiplier,
  };
}

export default function ROICalculatorPage() {
  const [view, setView] = useState<'board' | 'deep'>('board');
  const [mode, setMode] = useState<'quick' | 'pro'>('quick');
  // Default to a network-first scenario.
  const [facilities, setFacilities] = useState(50);
  const [trucksPerDay, setTrucksPerDay] = useState(150);
  const [avgDwellTime, setAvgDwellTime] = useState(55);
  const [detentionCost, setDetentionCost] = useState(75);
  const [laborCostPerHour, setLaborCostPerHour] = useState(28);
  const [gateStaff, setGateStaff] = useState(4);

  // Scenario presets for quick modeling
  const scenarios = {
    regional: { facilities: 10, trucksPerDay: 120, avgDwellTime: 50, gateStaff: 3, label: 'Network (10 sites)' },
    enterprise: { facilities: 50, trucksPerDay: 150, avgDwellTime: 55, gateStaff: 4, label: 'Network (50 sites)' },
  };

  const applyScenario = (key: keyof typeof scenarios) => {
    const s = scenarios[key];
    setFacilities(s.facilities);
    setTrucksPerDay(s.trucksPerDay);
    setAvgDwellTime(s.avgDwellTime);
    setGateStaff(s.gateStaff);
  };

  const [proInputs, setProInputs] = useState<RoiV2Inputs>(() => defaultRoiV2Inputs());

  const inputsForPdf = useMemo(() => {
    if (mode === 'pro') return proInputs;
    return roiV2InputsFromQuickMode({
      facilities,
      trucksPerDayPerFacility: trucksPerDay,
      avgDwellTimeMinutes: avgDwellTime,
      detentionCostPerHour: detentionCost,
      laborCostPerHour,
      gateStaffPerFacility: gateStaff,
    });
  }, [mode, proInputs, facilities, trucksPerDay, avgDwellTime, detentionCost, laborCostPerHour, gateStaff]);

  const calculations = useMemo(() => {
    if (mode === 'pro') {
      const v2 = calcRoiV2(proInputs);

      const timeSavedPerTruck =
        Math.max(0, proInputs.throughput.reduceCheckInMinutes) +
        Math.max(0, proInputs.throughput.reduceCheckOutMinutes);
      const annualTimeSaved = timeSavedPerTruck * v2.totalShipmentsPerYear;

      // UI expects some fields that only exist in V1. We map them in a CFO-friendly way.
      // Time-saved is only shown in the Operational Impact card; Pro Mode uses throughput/labor/paper/detention.
      return {
        networkMultiplier: v2.networkMultiplier,
        timeSavedPerTruck,
        annualTimeSaved,
        annualDetentionSavings: v2.annualDetentionSavings,
        annualLaborSavings: v2.annualLaborSavings,
        throughputValue: v2.throughputValue,
        paperlessSavings: v2.paperlessSavings,
        baseSavings: v2.baseSavings,
        networkBonusSavings: v2.networkBonusSavings,
        totalAnnualSavings: v2.totalAnnualSavings,
        implementationCost: v2.implementationCost,
        annualSubscription: v2.annualSubscription,
        yearOneRampShare: proInputs.yearOneRampShare,
        yearOneGrossSavings: v2.yearOneGrossSavings,
        yearOneSavings: v2.yearOneNetGain,
        yearOneROI: v2.yearOneRoiPercent,
        paybackMonths: v2.paybackMonths,
        fiveYearSavings: v2.fiveYearValue,
        newDwellTime: avgDwellTime,
        v2,
      };
    }

    const quickInputs = {
      facilities,
      trucksPerDayPerFacility: trucksPerDay,
      avgDwellTimeMinutes: avgDwellTime,
      detentionCostPerHour: detentionCost,
      laborCostPerHour,
      gateStaffPerFacility: gateStaff,
    };

    // Keep the existing time-saved metrics from V1 sliders,
    // but run the economics through the unified V2 engine.
    const v1 = calcRoiV1(quickInputs);
    const v2 = calcRoiV2(roiV2InputsFromQuickMode(quickInputs));

    return {
      networkMultiplier: v2.networkMultiplier,
      timeSavedPerTruck: v1.timeSavedPerTruckMinutes,
      annualTimeSaved: v1.annualTimeSavedMinutes,
      annualDetentionSavings: v2.annualDetentionSavings,
      annualLaborSavings: v2.annualLaborSavings,
      throughputValue: v2.throughputValue,
      paperlessSavings: v2.paperlessSavings,
      baseSavings: v2.baseSavings,
      networkBonusSavings: v2.networkBonusSavings,
      totalAnnualSavings: v2.totalAnnualSavings,
      implementationCost: v2.implementationCost,
      annualSubscription: v2.annualSubscription,
      yearOneRampShare: 1,
      yearOneGrossSavings: v2.yearOneGrossSavings,
      yearOneSavings: v2.yearOneNetGain,
      yearOneROI: v2.yearOneRoiPercent,
      paybackMonths: v2.paybackMonths,
      fiveYearSavings: v2.fiveYearValue,
      newDwellTime: v1.newDwellTimeMinutes,
      v2,
    };
  }, [mode, facilities, trucksPerDay, avgDwellTime, detentionCost, laborCostPerHour, gateStaff, proInputs]);

  // CFO-focused metrics
  const cfoMetrics = useMemo(() => {
    const facilityCount = mode === 'pro' 
      ? Object.values(proInputs.tiers).reduce((acc, t) => acc + t.count, 0)
      : facilities;
    
    return calculateCFOMetrics(
      calculations.totalAnnualSavings,
      calculations.implementationCost,
      calculations.annualSubscription,
      facilityCount,
      calculations.networkMultiplier
    );
  }, [calculations, facilities, mode, proInputs]);

  const formatMoney = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${Math.round(amount).toLocaleString()}`;
  };

  const formatNumber = (num: number) => Math.round(num).toLocaleString();

  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero - CFO Focused */}
      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-neon font-mono text-sm mb-4 tracking-wider">
              {`${facilities}-SITE NETWORK MODEL`}
            </p>
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="neon-glow">{formatMoney(cfoMetrics.totalAnnualSavings)}</span>/year
            </h1>
            <p className="text-xl text-steel max-w-2xl mx-auto">
              Total projected savings across {facilities} connected facilities.
              <br />
              <span className="text-neon font-semibold">Directional until validated with your data.</span>
            </p>
          </div>

          {/* Executive Snapshot - Always visible */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="glass-card p-4 text-center border border-neon/30">
              <p className="text-xs text-steel uppercase tracking-wider mb-1">Year 1 ROI</p>
              <p className="text-3xl font-black neon-glow">{Math.round(cfoMetrics.yearOneROI)}%</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-xs text-steel uppercase tracking-wider mb-1">Payback</p>
              <p className="text-3xl font-black">{cfoMetrics.paybackMonths.toFixed(1)} mo</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-xs text-steel uppercase tracking-wider mb-1">5-Year NPV</p>
              <p className="text-3xl font-black text-neon">{formatMoney(cfoMetrics.fiveYearNPV)}</p>
            </div>
            <div className="glass-card p-4 text-center border border-ember/30">
              <p className="text-xs text-steel uppercase tracking-wider mb-1">90-Day Delay Cost</p>
              <p className="text-3xl font-black text-ember">{formatMoney(cfoMetrics.costOfDelay90Days)}</p>
            </div>
          </div>

          {/* Paperless Value Callout */}
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="glass-card p-6 border border-neon/40 bg-gradient-to-br from-neon/10 to-transparent">
              <div className="flex items-start gap-4">
                <Manifest size={32} className="text-neon mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-neon mb-2">Paperless Operations Pay for Flow State</h3>
                  <p className="text-steel text-sm leading-relaxed">
                    <strong className="text-white">Guaranteed: $11,900/facility/year</strong> eliminating 1 BOL per shipment (3→2 BOLs). 
                    This covers ink, paper, printing, filing, storage, and retrieval costs—<strong className="text-neon">paying for the $8,000 subscription before any other benefits.</strong>
                  </p>
                  <p className="text-steel text-sm leading-relaxed mt-2">
                    Then: <strong className="text-white">10% throughput capacity increase</strong> unlocks millions in additional operating margin. 
                    Labor automation and detention reduction compound the value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold neon-glow">ROI model</h2>
              <p className="text-sm text-steel mt-1">Board-ready summary first. Deep model when you need it.</p>
            </div>
            <div className="inline-flex items-center gap-2 bg-carbon/60 border border-neon/20 rounded-xl p-2">
              <button
                type="button"
                onClick={() => setView('board')}
                className={
                  view === 'board'
                    ? 'px-3 py-2 rounded-lg bg-neon text-void font-semibold'
                    : 'px-3 py-2 rounded-lg border border-steel/30 text-white hover:border-neon/40 transition-colors'
                }
              >
                Board-ready
              </button>
              <button
                type="button"
                onClick={() => setView('deep')}
                className={
                  view === 'deep'
                    ? 'px-3 py-2 rounded-lg bg-neon text-void font-semibold'
                    : 'px-3 py-2 rounded-lg border border-steel/30 text-white hover:border-neon/40 transition-colors'
                }
              >
                Deep model
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Inputs */}
            {view === 'deep' ? (
            <div>
              <h2 className="text-2xl font-bold mb-4 neon-glow">Your Operation</h2>
              <p className="text-sm text-steel mb-8">
                Modeling {facilities} connected facilities. Network value compounds with scale.
              </p>

              <div className="flex items-center justify-between mb-8">
                <div className="text-sm text-steel">
                  Mode: <span className="text-white font-semibold">{mode === 'quick' ? 'Quick' : 'Pro'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMode((m) => {
                      if (m === 'quick') {
                        setProInputs(
                          roiV2InputsFromQuickMode({
                            facilities,
                            trucksPerDayPerFacility: trucksPerDay,
                            avgDwellTimeMinutes: avgDwellTime,
                            detentionCostPerHour: detentionCost,
                            laborCostPerHour,
                            gateStaffPerFacility: gateStaff,
                          })
                        );
                        return 'pro';
                      }
                      return 'quick';
                    });
                  }}
                  className="text-sm px-3 py-2 rounded-lg border border-steel/30 hover:border-neon/40 transition-colors"
                >
                  {mode === 'quick' ? 'Switch to Pro Mode' : 'Back to Quick Mode'}
                </button>
              </div>
              
              <div className="space-y-8">
                {mode === 'quick' && (
                  <>
                    {/* Scenario Presets */}
                    <div className="mb-6">
                      <label className="block text-steel mb-3">Scenario presets (network-first):</label>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(scenarios).map(([key, s]) => (
                          <button
                            key={key}
                            onClick={() => applyScenario(key as keyof typeof scenarios)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              facilities === s.facilities
                                ? 'bg-neon/20 border border-neon text-neon'
                                : 'bg-night-light border border-steel/30 text-steel hover:border-neon/50 hover:text-white'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Facilities */}
                    <div>
                      <label className="flex justify-between mb-3">
                        <span className="text-steel">Number of Facilities</span>
                        <span className="text-neon font-bold">{facilities}</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={facilities}
                        onChange={(e) => setFacilities(parseInt(e.target.value))}
                        className="w-full h-2 bg-carbon rounded-lg appearance-none cursor-pointer accent-neon"
                      />
                      <div className="flex justify-between text-xs text-steel/60 mt-1">
                        <span>1</span>
                        <span>50</span>
                      </div>
                    </div>

                    {/* Trucks per day */}
                    <div>
                      <label className="flex justify-between mb-3">
                        <span className="text-steel">Trucks per Day (per facility)</span>
                        <span className="text-neon font-bold">{trucksPerDay}</span>
                      </label>
                      <input
                        type="range"
                        min="20"
                        max="500"
                        step="10"
                        value={trucksPerDay}
                        onChange={(e) => setTrucksPerDay(parseInt(e.target.value))}
                        className="w-full h-2 bg-carbon rounded-lg appearance-none cursor-pointer accent-neon"
                      />
                      <div className="flex justify-between text-xs text-steel/60 mt-1">
                        <span>20</span>
                        <span>500</span>
                      </div>
                    </div>

                    {/* Dwell time */}
                    <div>
                      <label className="flex justify-between mb-3">
                        <span className="text-steel">Current Avg. Dwell Time (min)</span>
                        <span className="text-neon font-bold">{avgDwellTime} min</span>
                      </label>
                      <input
                        type="range"
                        min="20"
                        max="120"
                        value={avgDwellTime}
                        onChange={(e) => setAvgDwellTime(parseInt(e.target.value))}
                        className="w-full h-2 bg-carbon rounded-lg appearance-none cursor-pointer accent-neon"
                      />
                      <div className="flex justify-between text-xs text-steel/60 mt-1">
                        <span>20 min</span>
                        <span>120 min</span>
                      </div>
                    </div>

                    {/* Detention cost */}
                    <div>
                      <label className="flex justify-between mb-3">
                        <span className="text-steel">Detention Cost (per hour)</span>
                        <span className="text-neon font-bold">${detentionCost}</span>
                      </label>
                      <input
                        type="range"
                        min="25"
                        max="150"
                        step="5"
                        value={detentionCost}
                        onChange={(e) => setDetentionCost(parseInt(e.target.value))}
                        className="w-full h-2 bg-carbon rounded-lg appearance-none cursor-pointer accent-neon"
                      />
                      <div className="flex justify-between text-xs text-steel/60 mt-1">
                        <span>$25</span>
                        <span>$150</span>
                      </div>
                    </div>

                    {/* Gate staff */}
                    <div>
                      <label className="flex justify-between mb-3">
                        <span className="text-steel">Gate Staff (per facility)</span>
                        <span className="text-neon font-bold">{gateStaff}</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={gateStaff}
                        onChange={(e) => setGateStaff(parseInt(e.target.value))}
                        className="w-full h-2 bg-carbon rounded-lg appearance-none cursor-pointer accent-neon"
                      />
                      <div className="flex justify-between text-xs text-steel/60 mt-1">
                        <span>1</span>
                        <span>10</span>
                      </div>
                    </div>

                    {/* Labor cost */}
                    <div>
                      <label className="flex justify-between mb-3">
                        <span className="text-steel">Fully-Loaded Labor Cost ($/hr)</span>
                        <span className="text-neon font-bold">${laborCostPerHour}</span>
                      </label>
                      <input
                        type="range"
                        min="15"
                        max="60"
                        value={laborCostPerHour}
                        onChange={(e) => setLaborCostPerHour(parseInt(e.target.value))}
                        className="w-full h-2 bg-carbon rounded-lg appearance-none cursor-pointer accent-neon"
                      />
                      <div className="flex justify-between text-xs text-steel/60 mt-1">
                        <span>$15</span>
                        <span>$60</span>
                      </div>
                    </div>
                  </>
                )}

                {/* Pro mode inputs */}
                {mode === 'pro' && (
                  <Card className="border-neon/20">
                    <h3 className="font-bold text-neon mb-4">Pro Mode Assumptions</h3>

                    <p className="text-xs text-steel/70 mb-4">
                      Pro mode is spreadsheet-parity and assumption-driven. Defaults are aligned to a reference “Example Customer Opportunity” model;
                      edit inputs to reflect your operation and document your sources.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-steel mb-3">Facility Mix</p>
                        <div className="grid grid-cols-4 gap-2 text-xs text-steel mb-2">
                          <div>Tier</div>
                          <div className="text-right">Count</div>
                          <div className="text-right">Ship/day</div>
                          <div className="text-right">Days/yr</div>
                        </div>

                        {(['XL', 'L', 'M', 'S'] as const).map((tier) => (
                          <div key={tier} className="grid grid-cols-4 gap-2 items-center mb-2">
                            <div className="text-sm text-white font-semibold">{tier}</div>
                            <input
                              type="number"
                              min={0}
                              value={proInputs.tiers[tier].count}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  tiers: {
                                    ...prev.tiers,
                                    [tier]: { ...prev.tiers[tier], count: parseInt(e.target.value || '0') },
                                  },
                                }))
                              }
                              className="w-full text-right bg-carbon border border-steel/20 rounded-md px-2 py-1 text-white"
                            />
                            <input
                              type="number"
                              min={0}
                              value={proInputs.tiers[tier].shipmentsPerDay}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  tiers: {
                                    ...prev.tiers,
                                    [tier]: { ...prev.tiers[tier], shipmentsPerDay: parseFloat(e.target.value || '0') },
                                  },
                                }))
                              }
                              className="w-full text-right bg-carbon border border-steel/20 rounded-md px-2 py-1 text-white"
                            />
                            <input
                              type="number"
                              min={0}
                              value={proInputs.tiers[tier].operatingDaysPerYear}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  tiers: {
                                    ...prev.tiers,
                                    [tier]: {
                                      ...prev.tiers[tier],
                                      operatingDaysPerYear: parseInt(e.target.value || '0'),
                                    },
                                  },
                                }))
                              }
                              className="w-full text-right bg-carbon border border-steel/20 rounded-md px-2 py-1 text-white"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-steel">DC FTE Annual Cost ($)</label>
                          <input
                            type="number"
                            min={0}
                            value={proInputs.tiers.M.dcFteAnnualCost}
                            onChange={(e) => {
                              const v = parseFloat(e.target.value || '0');
                              setProInputs((prev) => ({
                                ...prev,
                                tiers: {
                                  XL: { ...prev.tiers.XL, dcFteAnnualCost: v },
                                  L: { ...prev.tiers.L, dcFteAnnualCost: v },
                                  M: { ...prev.tiers.M, dcFteAnnualCost: v },
                                  S: { ...prev.tiers.S, dcFteAnnualCost: v },
                                },
                              }));
                            }}
                            className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                          />
                          <p className="text-xs text-steel/60 mt-1">Applies to all tiers</p>
                        </div>
                        <div>
                          <label className="text-sm text-steel">Year-1 Ramp (0–1)</label>
                          <input
                            type="number"
                            step="0.05"
                            min={0}
                            max={1}
                            value={proInputs.yearOneRampShare}
                            onChange={(e) =>
                              setProInputs((prev) => ({ ...prev, yearOneRampShare: parseFloat(e.target.value || '0') }))
                            }
                            className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                          />
                        </div>
                      </div>

                      <details className="text-sm text-steel">
                        <summary className="cursor-pointer text-neon">Labor assumptions</summary>
                        <div className="mt-4 space-y-4">
                          <p className="text-xs text-steel/70">
                            Uses conservative rounding down for saved FTE (spreadsheet parity).
                          </p>
                          <p className="text-xs text-steel/70">
                            Enter fully-loaded annual cost (wage + benefits + burden). Savings assume capacity can be repurposed or avoided.
                          </p>
                          <div className="grid grid-cols-7 gap-2 text-xs text-steel mb-2">
                            <div>Tier</div>
                            <div className="text-right">Dock FTE/shift</div>
                            <div className="text-right">Shifts/day</div>
                            <div className="text-right">Dock time %</div>
                            <div className="text-right">Dock save %</div>
                            <div className="text-right">Guard FTE/shift</div>
                            <div className="text-right">Guard auto %</div>
                          </div>
                          {(['XL', 'L', 'M', 'S'] as const).map((tier) => (
                            <div key={tier} className="grid grid-cols-7 gap-2 items-center">
                              <div className="text-sm text-white font-semibold">{tier}</div>
                              <input
                                type="number"
                                min={0}
                                step="0.1"
                                value={proInputs.labor.tiers[tier].dockOfficeFtePerShift}
                                onChange={(e) =>
                                  setProInputs((prev) => ({
                                    ...prev,
                                    labor: {
                                      ...prev.labor,
                                      tiers: {
                                        ...prev.labor.tiers,
                                        [tier]: {
                                          ...prev.labor.tiers[tier],
                                          dockOfficeFtePerShift: parseFloat(e.target.value || '0'),
                                        },
                                      },
                                    },
                                  }))
                                }
                                className="w-full text-right bg-carbon border border-steel/20 rounded-md px-2 py-1 text-white"
                              />
                              <input
                                type="number"
                                min={0}
                                value={proInputs.labor.tiers[tier].shiftsPerDay}
                                onChange={(e) =>
                                  setProInputs((prev) => ({
                                    ...prev,
                                    labor: {
                                      ...prev.labor,
                                      tiers: {
                                        ...prev.labor.tiers,
                                        [tier]: { ...prev.labor.tiers[tier], shiftsPerDay: parseFloat(e.target.value || '0') },
                                      },
                                    },
                                  }))
                                }
                                className="w-full text-right bg-carbon border border-steel/20 rounded-md px-2 py-1 text-white"
                              />
                              <input
                                type="number"
                                min={0}
                                max={1}
                                step="0.01"
                                value={proInputs.labor.tiers[tier].dockOfficeTimeShareOnDriverProcess}
                                onChange={(e) =>
                                  setProInputs((prev) => ({
                                    ...prev,
                                    labor: {
                                      ...prev.labor,
                                      tiers: {
                                        ...prev.labor.tiers,
                                        [tier]: {
                                          ...prev.labor.tiers[tier],
                                          dockOfficeTimeShareOnDriverProcess: parseFloat(e.target.value || '0'),
                                        },
                                      },
                                    },
                                  }))
                                }
                                className="w-full text-right bg-carbon border border-steel/20 rounded-md px-2 py-1 text-white"
                              />
                              <input
                                type="number"
                                min={0}
                                max={1}
                                step="0.01"
                                value={proInputs.labor.tiers[tier].dockOfficeTimeSavingsShare}
                                onChange={(e) =>
                                  setProInputs((prev) => ({
                                    ...prev,
                                    labor: {
                                      ...prev.labor,
                                      tiers: {
                                        ...prev.labor.tiers,
                                        [tier]: {
                                          ...prev.labor.tiers[tier],
                                          dockOfficeTimeSavingsShare: parseFloat(e.target.value || '0'),
                                        },
                                      },
                                    },
                                  }))
                                }
                                className="w-full text-right bg-carbon border border-steel/20 rounded-md px-2 py-1 text-white"
                              />
                              <input
                                type="number"
                                min={0}
                                step="0.1"
                                value={proInputs.labor.tiers[tier].guardFtePerShift}
                                onChange={(e) =>
                                  setProInputs((prev) => ({
                                    ...prev,
                                    labor: {
                                      ...prev.labor,
                                      tiers: {
                                        ...prev.labor.tiers,
                                        [tier]: {
                                          ...prev.labor.tiers[tier],
                                          guardFtePerShift: parseFloat(e.target.value || '0'),
                                        },
                                      },
                                    },
                                  }))
                                }
                                className="w-full text-right bg-carbon border border-steel/20 rounded-md px-2 py-1 text-white"
                              />
                              <input
                                type="number"
                                min={0}
                                max={1}
                                step="0.01"
                                value={proInputs.labor.tiers[tier].guardAutomationShare}
                                onChange={(e) =>
                                  setProInputs((prev) => ({
                                    ...prev,
                                    labor: {
                                      ...prev.labor,
                                      tiers: {
                                        ...prev.labor.tiers,
                                        [tier]: {
                                          ...prev.labor.tiers[tier],
                                          guardAutomationShare: parseFloat(e.target.value || '0'),
                                        },
                                      },
                                    },
                                  }))
                                }
                                className="w-full text-right bg-carbon border border-steel/20 rounded-md px-2 py-1 text-white"
                              />
                            </div>
                          ))}
                        </div>
                      </details>

                      <details className="text-sm text-steel">
                        <summary className="cursor-pointer text-neon">Paper assumptions</summary>
                        <div className="mt-4">
                          <p className="text-xs text-steel/70 mb-4">
                            Models the cost of printing + storing shipment paperwork. “Phase‑1 saved %” represents the portion eliminated in the first rollout.
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-steel">Pages per BOL</label>
                            <input
                              type="number"
                              min={0}
                              value={proInputs.paper.pagesPerBol}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  paper: { ...prev.paper, pagesPerBol: parseFloat(e.target.value || '0') },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-steel">BOLs per Shipment</label>
                            <input
                              type="number"
                              min={0}
                              value={proInputs.paper.bolsPerShipment}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  paper: { ...prev.paper, bolsPerShipment: parseFloat(e.target.value || '0') },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-steel">Printing Cost / Page ($)</label>
                            <input
                              type="number"
                              min={0}
                              step="0.01"
                              value={proInputs.paper.printingCostPerPage}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  paper: { ...prev.paper, printingCostPerPage: parseFloat(e.target.value || '0') },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-steel">Storage Cost / Page ($)</label>
                            <input
                              type="number"
                              min={0}
                              step="0.01"
                              value={proInputs.paper.storageCostPerPage}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  paper: { ...prev.paper, storageCostPerPage: parseFloat(e.target.value || '0') },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-steel">Outbound % (0–1)</label>
                            <input
                              type="number"
                              min={0}
                              max={1}
                              step="0.01"
                              value={proInputs.paper.outboundShare}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  paper: { ...prev.paper, outboundShare: parseFloat(e.target.value || '0') },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-steel">Phase-1 Saved % (0–1)</label>
                            <input
                              type="number"
                              min={0}
                              max={1}
                              step="0.01"
                              value={proInputs.paper.phase1SavedShare}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  paper: { ...prev.paper, phase1SavedShare: parseFloat(e.target.value || '0') },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          </div>
                        </div>
                      </details>

                      <details className="text-sm text-steel">
                        <summary className="cursor-pointer text-neon">Detention assumptions</summary>
                        <div className="mt-4">
                          <p className="text-xs text-steel/70 mb-4">
                            Converts detention spend into an implied claim count, then into $/shipment savings. Bucket shares (15–30 min vs 30+ min)
                            follow the reference model; adjust if you have claims history.
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-steel">Detention Budget % of Transport (0–1)</label>
                            <input
                              type="number"
                              min={0}
                              max={1}
                              step="0.001"
                              value={proInputs.detention.detentionBudgetShareOfTransport}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  detention: {
                                    ...prev.detention,
                                    detentionBudgetShareOfTransport: parseFloat(e.target.value || '0'),
                                  },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-steel">Avg Detention Hours</label>
                            <input
                              type="number"
                              min={0}
                              step="0.1"
                              value={proInputs.detention.avgDetentionHours}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  detention: { ...prev.detention, avgDetentionHours: parseFloat(e.target.value || '0') },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-steel">$ per Hour Detention</label>
                            <input
                              type="number"
                              min={0}
                              step="1"
                              value={proInputs.detention.costPerHourDetention}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  detention: {
                                    ...prev.detention,
                                    costPerHourDetention: parseFloat(e.target.value || '0'),
                                  },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-steel">Claim Shares (15–30 / 30+)</label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <input
                                type="number"
                                min={0}
                                max={1}
                                step="0.01"
                                value={proInputs.detention.claimsShare15to30MinOver}
                                onChange={(e) =>
                                  setProInputs((prev) => ({
                                    ...prev,
                                    detention: {
                                      ...prev.detention,
                                      claimsShare15to30MinOver: parseFloat(e.target.value || '0'),
                                    },
                                  }))
                                }
                                className="w-full text-right bg-carbon border border-steel/20 rounded-md px-2 py-2 text-white"
                              />
                              <input
                                type="number"
                                min={0}
                                max={1}
                                step="0.01"
                                value={proInputs.detention.claimsShare30PlusMinOver}
                                onChange={(e) =>
                                  setProInputs((prev) => ({
                                    ...prev,
                                    detention: {
                                      ...prev.detention,
                                      claimsShare30PlusMinOver: parseFloat(e.target.value || '0'),
                                    },
                                  }))
                                }
                                className="w-full text-right bg-carbon border border-steel/20 rounded-md px-2 py-2 text-white"
                              />
                            </div>
                          </div>
                          </div>
                        </div>
                      </details>

                      <details className="text-sm text-steel">
                        <summary className="cursor-pointer text-neon">Throughput + shipper-of-choice assumptions</summary>
                        <div className="mt-4">
                          <p className="text-xs text-steel/70 mb-4">
                            Throughput uses a conservative “realized %” multiplier on theoretical gate-time improvement. Shipper-of-choice models a realized
                            discount on applicable transport spend.
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-steel">Avg Gate In→Out (min)</label>
                            <input
                              type="number"
                              min={0}
                              value={proInputs.throughput.avgGateInToOutMinutes}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  throughput: {
                                    ...prev.throughput,
                                    avgGateInToOutMinutes: parseFloat(e.target.value || '0'),
                                  },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-steel">Incremental Margin / Truck ($)</label>
                            <input
                              type="number"
                              min={0}
                              value={proInputs.throughput.incrementalMarginPerTruck}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  throughput: {
                                    ...prev.throughput,
                                    incrementalMarginPerTruck: parseFloat(e.target.value || '0'),
                                  },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-steel">Reduce Check-in / Check-out (min)</label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <input
                                type="number"
                                min={0}
                                value={proInputs.throughput.reduceCheckInMinutes}
                                onChange={(e) =>
                                  setProInputs((prev) => ({
                                    ...prev,
                                    throughput: {
                                      ...prev.throughput,
                                      reduceCheckInMinutes: parseFloat(e.target.value || '0'),
                                    },
                                  }))
                                }
                                className="w-full text-right bg-carbon border border-steel/20 rounded-md px-2 py-2 text-white"
                              />
                              <input
                                type="number"
                                min={0}
                                value={proInputs.throughput.reduceCheckOutMinutes}
                                onChange={(e) =>
                                  setProInputs((prev) => ({
                                    ...prev,
                                    throughput: {
                                      ...prev.throughput,
                                      reduceCheckOutMinutes: parseFloat(e.target.value || '0'),
                                    },
                                  }))
                                }
                                className="w-full text-right bg-carbon border border-steel/20 rounded-md px-2 py-2 text-white"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm text-steel">Realized % (0–1)</label>
                            <input
                              type="number"
                              min={0}
                              max={1}
                              step="0.01"
                              value={proInputs.throughput.realizedShare}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  throughput: {
                                    ...prev.throughput,
                                    realizedShare: parseFloat(e.target.value || '0'),
                                  },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-steel">Cost per Shipment ($)</label>
                            <input
                              type="number"
                              min={0}
                              value={proInputs.shipper.costPerShipment}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  shipper: { ...prev.shipper, costPerShipment: parseFloat(e.target.value || '0') },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-steel">Shipper Discount % + Realized %</label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <input
                                type="number"
                                min={0}
                                max={1}
                                step="0.01"
                                value={proInputs.shipper.shipperOfChoiceDiscountShare}
                                onChange={(e) =>
                                  setProInputs((prev) => ({
                                    ...prev,
                                    shipper: {
                                      ...prev.shipper,
                                      shipperOfChoiceDiscountShare: parseFloat(e.target.value || '0'),
                                    },
                                  }))
                                }
                                className="w-full text-right bg-carbon border border-steel/20 rounded-md px-2 py-2 text-white"
                              />
                              <input
                                type="number"
                                min={0}
                                max={1}
                                step="0.01"
                                value={proInputs.shipper.realizedShare}
                                onChange={(e) =>
                                  setProInputs((prev) => ({
                                    ...prev,
                                    shipper: { ...prev.shipper, realizedShare: parseFloat(e.target.value || '0') },
                                  }))
                                }
                                className="w-full text-right bg-carbon border border-steel/20 rounded-md px-2 py-2 text-white"
                              />
                            </div>
                          </div>
                          </div>
                        </div>
                      </details>

                      <details className="text-sm text-steel">
                        <summary className="cursor-pointer text-neon">Network effect</summary>
                        <div className="mt-4">
                          <p className="text-xs text-steel/70 mb-3">
                            Off by default for spreadsheet parity. Enable only if you’re modeling compounding value from standardization across a multi-site network.
                          </p>
                          <label className="text-sm text-steel">Network log factor (0 disables)</label>
                          <input
                            type="number"
                            min={0}
                            step="0.05"
                            value={proInputs.network.logFactor}
                            onChange={(e) =>
                              setProInputs((prev) => ({
                                ...prev,
                                network: { ...prev.network, logFactor: parseFloat(e.target.value || '0') },
                              }))
                            }
                            className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                          />
                        </div>
                      </details>

                      <details className="text-sm text-steel">
                        <summary className="cursor-pointer text-neon">
                          Enterprise add-ons ($/shipment)
                        </summary>
                        <div className="mt-4">
                          <p className="text-xs text-steel/70 mb-4">
                            Use these when you have a validated $/shipment opportunity (e.g., from an enterprise workbook). These add directly to annual value
                            across total shipments.
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-steel">Lost BOLs → Lost Sales</label>
                            <input
                              type="number"
                              min={0}
                              step="0.01"
                              value={proInputs.enterpriseAddOns.perShipment.lostBolsLostSales}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  enterpriseAddOns: {
                                    perShipment: {
                                      ...prev.enterpriseAddOns.perShipment,
                                      lostBolsLostSales: parseFloat(e.target.value || '0'),
                                    },
                                  },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-steel">Manual WMS Failover Savings</label>
                            <input
                              type="number"
                              min={0}
                              step="0.01"
                              value={proInputs.enterpriseAddOns.perShipment.manualWmsFailoverSavings}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  enterpriseAddOns: {
                                    perShipment: {
                                      ...prev.enterpriseAddOns.perShipment,
                                      manualWmsFailoverSavings: parseFloat(e.target.value || '0'),
                                    },
                                  },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-steel">Dock Clerk Productivity</label>
                            <input
                              type="number"
                              min={0}
                              step="0.01"
                              value={proInputs.enterpriseAddOns.perShipment.dockClerkProductivity}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  enterpriseAddOns: {
                                    perShipment: {
                                      ...prev.enterpriseAddOns.perShipment,
                                      dockClerkProductivity: parseFloat(e.target.value || '0'),
                                    },
                                  },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-steel">Missed Deliveries</label>
                            <input
                              type="number"
                              min={0}
                              step="0.01"
                              value={proInputs.enterpriseAddOns.perShipment.missedDeliveries}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  enterpriseAddOns: {
                                    perShipment: {
                                      ...prev.enterpriseAddOns.perShipment,
                                      missedDeliveries: parseFloat(e.target.value || '0'),
                                    },
                                  },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-steel">Yard Spotter Productivity</label>
                            <input
                              type="number"
                              min={0}
                              step="0.01"
                              value={proInputs.enterpriseAddOns.perShipment.yardSpotterProductivity}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  enterpriseAddOns: {
                                    perShipment: {
                                      ...prev.enterpriseAddOns.perShipment,
                                      yardSpotterProductivity: parseFloat(e.target.value || '0'),
                                    },
                                  },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-steel">OS&D Search Time</label>
                            <input
                              type="number"
                              min={0}
                              step="0.01"
                              value={proInputs.enterpriseAddOns.perShipment.osdSearchTime}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  enterpriseAddOns: {
                                    perShipment: {
                                      ...prev.enterpriseAddOns.perShipment,
                                      osdSearchTime: parseFloat(e.target.value || '0'),
                                    },
                                  },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-steel">Detention Claim Reduction</label>
                            <input
                              type="number"
                              min={0}
                              step="0.01"
                              value={proInputs.enterpriseAddOns.perShipment.detentionClaimsReduction}
                              onChange={(e) =>
                                setProInputs((prev) => ({
                                  ...prev,
                                  enterpriseAddOns: {
                                    perShipment: {
                                      ...prev.enterpriseAddOns.perShipment,
                                      detentionClaimsReduction: parseFloat(e.target.value || '0'),
                                    },
                                  },
                                }))
                              }
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                          </div>
                          </div>
                        </div>
                      </details>

                      <details className="text-sm text-steel">
                        <summary className="cursor-pointer text-neon">Pricing (transparent)</summary>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-steel">Annual subscription per facility ($/year)</label>
                            <input
                              type="number"
                              min={5000}
                              max={15000}
                              step={250}
                              value={proInputs.commercial.annualSubscriptionPerFacility}
                              onChange={(e) => {
                                const v = parseFloat(e.target.value || '0');
                                setProInputs((prev) => ({
                                  ...prev,
                                  commercial: {
                                    ...prev.commercial,
                                    annualSubscriptionPerFacility: v,
                                  },
                                }));
                              }}
                              className="w-full mt-2 bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                            />
                            <p className="text-xs text-steel/70 mt-2">
                              Typical range: $5k–$15k. Primo example: ~$8k × 260 ≈ $2.08M/year.
                            </p>
                          </div>
                          <div>
                            <label className="text-sm text-steel">Implementation per facility (one-time)</label>
                            <input
                              type="number"
                              value={2500}
                              disabled
                              className="w-full mt-2 bg-carbon/60 border border-steel/10 rounded-md px-3 py-2 text-white/70"
                            />
                            <p className="text-xs text-steel/70 mt-2">
                              Model assumes $2,500 per facility across the applicant network.
                            </p>
                          </div>
                        </div>
                      </details>

                      <details className="text-sm text-steel">
                        <summary className="cursor-pointer text-neon">Show model assumptions</summary>
                        <div className="mt-3 space-y-4 text-xs text-steel/80">
                          <div className="p-3 bg-void/50 rounded-lg">
                            <div className="flex items-center gap-2 text-neon font-semibold mb-2">
                              <Config size={16} className="text-neon" />
                              <span>Network Configuration</span>
                            </div>
                            <p>• Facilities: {facilities} site{facilities > 1 ? 's' : ''} (modeled as Medium tier)</p>
                            <p>• Shipments: {trucksPerDay.toLocaleString()}/day × 365 days = {(trucksPerDay * 365).toLocaleString()}/year per site</p>
                            <p>• Labor cost: ${laborCostPerHour}/hr × 2,080 hrs = ${(laborCostPerHour * 2080).toLocaleString()}/year FTE</p>
                          </div>
                          <div className="p-3 bg-void/50 rounded-lg">
                            <div className="flex items-center gap-2 text-neon font-semibold mb-2">
                              <Timeline size={16} className="text-neon" />
                              <span>Dwell Time Assumptions</span>
                            </div>
                            <p>• Current dwell: {avgDwellTime} minutes (gate-in to gate-out)</p>
                            <p>• Reduction: 50% (industry benchmark for gate automation)</p>
                            <p>• New dwell: {Math.round(avgDwellTime * 0.5)} minutes</p>
                            <p className="text-steel/60 mt-1">Source: YMS implementation studies (Zebra, industry benchmarks)</p>
                          </div>
                          <div className="p-3 bg-void/50 rounded-lg">
                            <div className="flex items-center gap-2 text-neon font-semibold mb-2">
                              <Caution size={16} className="text-neon" />
                              <span>Detention Assumptions</span>
                            </div>
                            <p>• 15% of trucks incur detention without YMS</p>
                            <p>• Cost: ${detentionCost}/hour detention rate</p>
                            <p>• Reduction: 65% fewer detention events with automation</p>
                            <p className="text-steel/60 mt-1">Source: ATRI Cost of Congestion reports</p>
                          </div>
                          <div className="p-3 bg-void/50 rounded-lg">
                            <div className="flex items-center gap-2 text-neon font-semibold mb-2">
                              <Manifest size={16} className="text-neon" />
                              <span>Paperless Operations (Primary Value)</span>
                            </div>
                            <p>• <strong>Guaranteed: $11,900/facility/year</strong></p>
                            <p>• Eliminates 1 BOL per shipment (3 BOLs → 2 BOLs)</p>
                            <p>• Covers ink, paper, printing, filing, storage, retrieval</p>
                            <p>• <strong>This alone pays for the $8,000/facility subscription</strong></p>
                            <p className="text-steel/60 mt-1">Source: Customer data, verified operational savings</p>
                          </div>
                          <div className="p-3 bg-void/50 rounded-lg">
                            <div className="flex items-center gap-2 text-neon font-semibold mb-2">
                              <Velocity size={16} className="text-neon" />
                              <span>Throughput Gains (Secondary Value)</span>
                            </div>
                            <p>• 10% additional freight capacity per facility</p>
                            <p>• Faster truck turns (50% dwell reduction) enable more volume</p>
                            <p>• $500/truck incremental operating margin</p>
                            <p>• Millions in additional revenue capacity per facility</p>
                            <p className="text-steel/60 mt-1">Source: Logistics margin benchmarks, customer analysis</p>
                          </div>
                          <div className="p-3 bg-void/50 rounded-lg">
                            <div className="flex items-center gap-2 text-neon font-semibold mb-2">
                              <Agent size={16} className="text-neon" />
                              <span>Labor Automation</span>
                            </div>
                            <p>• Gate staff: {gateStaff} FTE{gateStaff > 1 ? 's' : ''} per facility</p>
                            <p>• Time savings: 70% reduction in gate processing labor</p>
                            <p>• Annual hours: 2,080 (40 hrs/week × 52 weeks)</p>
                            <p className="text-steel/60 mt-1">Source: Time-motion studies from YMS implementations</p>
                          </div>
                          <div className="p-3 bg-void/50 rounded-lg">
                            <div className="flex items-center gap-2 text-neon font-semibold mb-2">
                              <Nexus size={16} className="text-neon" />
                              <span>Network Effect</span>
                            </div>
                            <p>• Formula: 1 + log(n+1) × 0.5</p>
                            <p>• Current multiplier: {calculations.networkMultiplier.toFixed(2)}× at {facilities} site{facilities > 1 ? 's' : ''}</p>
                            <p>• Maturity factor scales value for network size</p>
                            <p className="text-steel/60 mt-1">Based on Metcalfe's Law for network value</p>
                          </div>
                        </div>
                      </details>
                    </div>
                  </Card>
                )}
              </div>
            </div>
            ) : null}

            {/* Results */}
            <div className={view === 'board' ? 'lg:col-span-2' : ''}>
              <h2 className="text-2xl font-bold mb-8 neon-glow">Your ROI</h2>

              {view === 'board' ? (
                <>
                  {/* CFO Executive Summary */}
                  <Card className="mb-8 border-neon/30 bg-gradient-to-br from-neon/5 to-transparent">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-neon">CFO Executive Summary</h3>
                      <span className="text-xs text-steel bg-carbon px-2 py-1 rounded">Forward to finance →</span>
                    </div>
                    
                    {/* Key Decision Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 rounded-lg bg-void/50">
                        <p className="text-xs text-steel uppercase tracking-wider">Annual Value</p>
                        <p className="text-2xl font-black neon-glow">{formatMoney(cfoMetrics.totalAnnualSavings)}</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-void/50">
                        <p className="text-xs text-steel uppercase tracking-wider">Per Facility</p>
                        <p className="text-2xl font-black">{formatMoney(cfoMetrics.savingsPerFacility)}</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-void/50">
                        <p className="text-xs text-steel uppercase tracking-wider">Network Effect</p>
                        <p className="text-2xl font-black text-neon">{cfoMetrics.networkMultiplier.toFixed(2)}x</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-ember/10 border border-ember/30">
                        <p className="text-xs text-steel uppercase tracking-wider">Delay Risk</p>
                        <p className="text-2xl font-black text-ember">-{formatMoney(cfoMetrics.costOfDelay90Days)}</p>
                      </div>
                    </div>

                    {/* Investment Analysis Table */}
                    <div className="border border-steel/20 rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-carbon/50">
                          <tr>
                            <th className="text-left px-4 py-2 text-steel font-medium">Metric</th>
                            <th className="text-right px-4 py-2 text-steel font-medium">Value</th>
                            <th className="text-left px-4 py-2 text-steel font-medium hidden md:table-cell">Context</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-steel/10">
                          <tr>
                            <td className="px-4 py-2 text-white">Year 1 ROI</td>
                            <td className="px-4 py-2 text-right font-bold text-neon">{Math.round(cfoMetrics.yearOneROI)}%</td>
                            <td className="px-4 py-2 text-steel text-xs hidden md:table-cell">Net gain / total investment</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-white">Payback Period</td>
                            <td className="px-4 py-2 text-right font-bold">{cfoMetrics.paybackMonths.toFixed(1)} months</td>
                            <td className="px-4 py-2 text-steel text-xs hidden md:table-cell">Time to recover implementation cost</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-white">5-Year NPV</td>
                            <td className="px-4 py-2 text-right font-bold text-neon">{formatMoney(cfoMetrics.fiveYearNPV)}</td>
                            <td className="px-4 py-2 text-steel text-xs hidden md:table-cell">10% discount rate, 2% annual growth</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-white">Implementation</td>
                            <td className="px-4 py-2 text-right font-bold">{formatMoney(calculations.implementationCost)}</td>
                            <td className="px-4 py-2 text-steel text-xs hidden md:table-cell">One-time deployment cost</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-white">Annual Subscription</td>
                            <td className="px-4 py-2 text-right font-bold">{formatMoney(calculations.annualSubscription)}</td>
                            <td className="px-4 py-2 text-steel text-xs hidden md:table-cell">Platform + support</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="text-xs text-steel/70 mt-4 text-center">
                      Model outputs are directional. Request custom analysis with your operational data for validation.
                    </p>
                  </Card>

                  {/* Value Breakdown */}
                  <Card className="mb-8">
                    <h3 className="font-bold text-neon mb-4">Value Breakdown</h3>
                    <p className="text-xs text-steel/60 mb-4">
                      {mode === 'quick' 
                        ? 'Based on industry benchmarks for gate automation, detention reduction, and throughput gains.'
                        : 'Based on your custom assumptions in Pro Mode.'}
                    </p>
                    <div className="space-y-3">
                      {[
                        { 
                          label: 'Paperless Operations', 
                          value: calculations.paperlessSavings, 
                          tooltip: mode === 'quick' 
                            ? 'Guaranteed: $11,900/facility eliminating 1 BOL per shipment (3→2 BOLs). Covers platform cost.' 
                            : 'From your paper assumptions'
                        },
                        { 
                          label: 'Throughput Gains', 
                          value: calculations.throughputValue, 
                          tooltip: mode === 'quick' 
                            ? '10% additional freight capacity from faster turns. $500/truck incremental margin.' 
                            : 'From your throughput assumptions'
                        },
                        { 
                          label: 'Labor Automation', 
                          value: calculations.annualLaborSavings, 
                          tooltip: mode === 'quick' 
                            ? '70% time savings for gate staff with automated check-in/out' 
                            : 'From your labor tier assumptions'
                        },
                        { 
                          label: 'Detention Reduction', 
                          value: calculations.annualDetentionSavings, 
                          tooltip: mode === 'quick' 
                            ? '65% reduction in detention events with automated tracking' 
                            : 'From your detention assumptions'
                        },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-4 group">
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-steel cursor-help" title={item.tooltip}>{item.label}</span>
                              <span className="text-white font-medium">{formatMoney(item.value)}</span>
                            </div>
                            <div className="h-1.5 bg-carbon rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-neon/60 rounded-full"
                                style={{ width: `${Math.min(100, (item.value / Math.max(1, calculations.baseSavings)) * 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between pt-3 border-t border-neon/20">
                        <span className="text-steel font-medium">Base Savings</span>
                        <span className="text-white font-bold">{formatMoney(calculations.baseSavings)}</span>
                      </div>
                    </div>
                  </Card>

                  {/* Network Effect Breakdown - NEW */}
                  <Card className="mb-8 border-neon/30 bg-gradient-to-br from-neon/5 to-transparent">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-neon">Network Effect Value</h3>
                      <span className="text-2xl font-black text-neon">+{formatMoney(calculations.networkBonusSavings)}</span>
                    </div>
                    
                    {facilities < 2 ? (
                      <div className="p-4 rounded-lg bg-void/50 border border-steel/20">
                        <div className="flex items-start gap-3">
                          <Nexus size={20} className="text-neon mt-0.5" />
                          <div>
                            <p className="text-white font-semibold mb-2">Network Effect Requires Multi-Site</p>
                            <p className="text-sm text-steel/80">
                              The network effect is driven by shared patterns, benchmarking, and coordination across facilities.
                              Set facilities to 2+ to model network value.
                            </p>
                            <button
                              onClick={() => applyScenario('enterprise')}
                              className="mt-3 text-sm text-neon hover:underline"
                            >
                              → Model a 50-site network
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Multi-facility - show full network breakdown */
                      <>
                        <p className="text-sm text-steel/80 mb-6">
                          {facilities} connected facilities share data, patterns, and intelligence. Here's where that value comes from:
                        </p>
                        
                        {calculations.v2?.networkEffectBreakdown && (
                      <div className="space-y-4">
                        {/* Predictive Intelligence */}
                        <div className="p-4 rounded-lg bg-void/50 border border-steel/10">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-neon"></span>
                                Predictive Intelligence
                              </p>
                              <p className="text-xs text-steel/70 mt-1">
                                Better ETAs from shared arrival patterns across {mode === 'pro' ? Object.values(proInputs.tiers).reduce((a, t) => a + t.count, 0) : facilities} sites
                              </p>
                            </div>
                            <span className="text-lg font-bold text-neon">
                              {formatMoney(calculations.v2.networkEffectBreakdown.predictiveIntelligence.planningSavings)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-steel/60 mb-2">
                            <span className="px-2 py-0.5 rounded bg-neon/10 text-neon">
                              +{calculations.v2.networkEffectBreakdown.predictiveIntelligence.etaAccuracyImprovement.toFixed(0)}% ETA accuracy
                            </span>
                            <span>→ Better dock scheduling</span>
                          </div>
                          <details className="text-xs text-steel/60 mt-2">
                            <summary className="cursor-pointer hover:text-neon">Show calculation</summary>
                            <div className="mt-2 p-2 bg-void/30 rounded border border-steel/10 font-mono text-[10px] space-y-1">
                              <p>• ETA improvement: min(25%, log(max(1, n-4)+1) × 6%) × maturity</p>
                              <p>• Maturity factor: 1 - e^(-n/20) = {(1 - Math.exp(-facilities / 20)).toFixed(2)}</p>
                              <p>• Planning value: $1.50/shipment × {calculations.v2.networkEffectBreakdown.predictiveIntelligence.etaAccuracyImprovement.toFixed(1)}% improvement</p>
                              <p>• Annual shipments: {(calculations.v2?.totalShipmentsPerYear || 0).toLocaleString()}</p>
                              <p className="text-neon pt-1">= ${calculations.v2.networkEffectBreakdown.predictiveIntelligence.planningSavings.toLocaleString()}</p>
                            </div>
                          </details>
                        </div>

                        {/* Carrier Benchmarking */}
                        <div className="p-4 rounded-lg bg-void/50 border border-steel/10">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-neon"></span>
                                Carrier Benchmarking
                              </p>
                              <p className="text-xs text-steel/70 mt-1">
                                Cross-network carrier performance data for better negotiations
                              </p>
                            </div>
                            <span className="text-lg font-bold text-neon">
                              {formatMoney(calculations.v2.networkEffectBreakdown.carrierBenchmarking.negotiationLeverage)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-steel/60 mb-2">
                            <span className="px-2 py-0.5 rounded bg-neon/10 text-neon">
                              {Math.round(calculations.v2.networkEffectBreakdown.carrierBenchmarking.dataPointsShared).toLocaleString()} data points
                            </span>
                            <span>→ Rate negotiation leverage</span>
                          </div>
                          <details className="text-xs text-steel/60 mt-2">
                            <summary className="cursor-pointer hover:text-neon">Show calculation</summary>
                            <div className="mt-2 p-2 bg-void/30 rounded border border-steel/10 font-mono text-[10px] space-y-1">
                              <p>• Network connections: n(n-1)/2 = {facilities}×{facilities-1}/2 = {(facilities * (facilities - 1) / 2).toLocaleString()}</p>
                              <p>• Data points: connections × 30 × maturity = {Math.round(calculations.v2.networkEffectBreakdown.carrierBenchmarking.dataPointsShared).toLocaleString()}</p>
                              <p>• Carrier leverage: min(2%, 0.3% + log(max(1,n-5)+1) × 0.4%)</p>
                              <p>• 3rd-party spend: {(calculations.v2?.totalShipmentsPerYear || 0).toLocaleString()} × 60% × $150</p>
                              <p>• Threshold: max(0, n-8)/n = {((Math.max(0, facilities - 8) / facilities) * 100).toFixed(0)}%</p>
                              <p className="text-neon pt-1">= ${calculations.v2.networkEffectBreakdown.carrierBenchmarking.negotiationLeverage.toLocaleString()}</p>
                            </div>
                          </details>
                        </div>

                        {/* Coordination Efficiency */}
                        <div className="p-4 rounded-lg bg-void/50 border border-steel/10">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-neon"></span>
                                Coordination Efficiency
                              </p>
                              <p className="text-xs text-steel/70 mt-1">
                                Reduced variability = smaller safety buffers needed
                              </p>
                            </div>
                            <span className="text-lg font-bold text-neon">
                              {formatMoney(calculations.v2.networkEffectBreakdown.coordinationEfficiency.bufferSavings)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-steel/60 mb-2">
                            <span className="px-2 py-0.5 rounded bg-neon/10 text-neon">
                              -{calculations.v2.networkEffectBreakdown.coordinationEfficiency.variabilityReduction.toFixed(0)}% variance
                            </span>
                            <span>→ Leaner operations</span>
                          </div>
                          <details className="text-xs text-steel/60 mt-2">
                            <summary className="cursor-pointer hover:text-neon">Show calculation</summary>
                            <div className="mt-2 p-2 bg-void/30 rounded border border-steel/10 font-mono text-[10px] space-y-1">
                              <p>• Variability reduction: min(20%, log₂(max(1,n-5)+1) × 4%) × maturity</p>
                              <p>• Base savings: ${calculations.baseSavings.toLocaleString()}</p>
                              <p>• Buffer cost (5% of base): ${(calculations.baseSavings * 0.05).toLocaleString()}</p>
                              <p>• Reduction: {calculations.v2.networkEffectBreakdown.coordinationEfficiency.variabilityReduction.toFixed(1)}%</p>
                              <p className="text-neon pt-1">= ${calculations.v2.networkEffectBreakdown.coordinationEfficiency.bufferSavings.toLocaleString()}</p>
                            </div>
                          </details>
                        </div>

                        {/* Shared Learning */}
                        <div className="p-4 rounded-lg bg-void/50 border border-steel/10">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-neon"></span>
                                Shared Learning
                              </p>
                              <p className="text-xs text-steel/70 mt-1">
                                Faster onboarding + error pattern recognition
                              </p>
                            </div>
                            <span className="text-lg font-bold text-neon">
                              {formatMoney(calculations.v2.networkEffectBreakdown.sharedLearning.errorReduction)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-steel/60 mb-2">
                            <span className="px-2 py-0.5 rounded bg-neon/10 text-neon">
                              {Math.round(calculations.v2.networkEffectBreakdown.sharedLearning.onboardingAcceleration)} days saved/site
                            </span>
                            <span>→ Faster time-to-value</span>
                          </div>
                          <details className="text-xs text-steel/60 mt-2">
                            <summary className="cursor-pointer hover:text-neon">Show calculation</summary>
                            <div className="mt-2 p-2 bg-void/30 rounded border border-steel/10 font-mono text-[10px] space-y-1">
                              <p className="font-semibold text-steel">Onboarding acceleration:</p>
                              <p>• Days saved: min(45, log(max(1,n-3)+1) × 12) × maturity</p>
                              <p>• Value/day lost productivity: $400</p>
                              <p>• Annual new sites (8% growth): {Math.ceil(facilities * 0.08)} sites</p>
                              <p>• Onboarding savings: {Math.round(calculations.v2.networkEffectBreakdown.sharedLearning.onboardingAcceleration)} days × $400 × {Math.ceil(facilities * 0.08)}</p>
                              <p className="font-semibold text-steel pt-2">Error reduction:</p>
                              <p>• Error rate reduction: min(12%, log(max(1,n-5)+1) × 2.5%) × maturity</p>
                              <p>• Error cost: {(calculations.v2?.totalShipmentsPerYear || 0).toLocaleString()} shipments × $0.30</p>
                              <p className="text-neon pt-1">Total = ${calculations.v2.networkEffectBreakdown.sharedLearning.errorReduction.toLocaleString()}</p>
                            </div>
                          </details>
                        </div>

                        {/* Effective Multiplier Summary */}
                        <div className="flex items-center justify-between pt-4 border-t border-neon/20">
                          <div className="text-sm">
                            <span className="text-steel">Effective Network Multiplier</span>
                            <p className="text-xs text-steel/60">Value compounds as you add sites</p>
                          </div>
                          <span className="text-3xl font-black text-neon">
                            {calculations.v2.networkEffectBreakdown.effectiveMultiplier.toFixed(2)}×
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {!calculations.v2?.networkEffectBreakdown && (
                      <div className="flex justify-between text-neon">
                        <span className="font-medium">Network Effect ({calculations.networkMultiplier.toFixed(2)}x)</span>
                        <span className="font-bold">+{formatMoney(calculations.networkBonusSavings)}</span>
                      </div>
                    )}
                      </>
                    )}
                  </Card>
                </>
              ) : null}

              {view === 'deep' && (
                <>
                <Card className="mb-8 border-neon/30">
                  <h3 className="font-bold text-neon mb-3">Board-ready summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-steel">Year‑1 realization</p>
                      <p className="text-white font-semibold">{Math.round(calculations.yearOneRampShare * 100)}%</p>
                      <p className="text-xs text-steel/70 mt-1">Gross savings recognized in Year 1</p>
                    </div>
                    <div>
                      <p className="text-steel">Year‑1 gross savings</p>
                      <p className="text-white font-semibold">{formatMoney(calculations.yearOneGrossSavings)}</p>
                      <p className="text-xs text-steel/70 mt-1">Before subscription + implementation</p>
                    </div>
                    <div>
                      <p className="text-steel">Opportunity cost (90 days)</p>
                      <p className="text-white font-semibold">
                        ~{formatMoney(Math.max(0, calculations.yearOneGrossSavings) / 4)}
                      </p>
                      <p className="text-xs text-steel/70 mt-1">Modeled; depends on rollout timing</p>
                    </div>
                  </div>
                  <div className="mt-5 text-sm text-steel">
                    <span className="text-white font-semibold">Base</span> vs <span className="text-white font-semibold">Network</span> are shown below.
                    Switch to <span className="text-white font-semibold">Deep model</span> to edit assumptions.
                  </div>
                </Card>

                {/* Hero metrics - Deep view */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <Card className="text-center bg-neon/10 border-neon">
                    <p className="text-sm text-steel mb-2">Annual Savings</p>
                    <p className="text-4xl font-black neon-glow">{formatMoney(calculations.totalAnnualSavings)}</p>
                  </Card>
                  <Card className="text-center bg-neon/10 border-neon">
                    <p className="text-sm text-steel mb-2">Year 1 ROI</p>
                    <p className="text-4xl font-black neon-glow">{Math.round(calculations.yearOneROI)}%</p>
                  </Card>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <Card className="text-center">
                    <p className="text-sm text-steel mb-2">Payback Period</p>
                    <p className="text-3xl font-bold">{calculations.paybackMonths.toFixed(1)} mo</p>
                  </Card>
                  <Card className="text-center">
                    <p className="text-sm text-steel mb-2">5-Year Value</p>
                    <p className="text-3xl font-bold text-neon">{formatMoney(calculations.fiveYearSavings)}</p>
                  </Card>
                </div>

                {/* Breakdown - Deep view */}
                <Card className="mb-8">
                  <h3 className="font-bold text-neon mb-4">Savings Breakdown</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-steel">Detention Reduction (65%)</span>
                      <span className="text-white">{formatMoney(calculations.annualDetentionSavings)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-steel">Labor Automation (70%)</span>
                      <span className="text-white">{formatMoney(calculations.annualLaborSavings)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-steel">Throughput Increase (42%)</span>
                      <span className="text-white">{formatMoney(calculations.throughputValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-steel">Paperless Operations</span>
                      <span className="text-white">{formatMoney(calculations.paperlessSavings)}</span>
                    </div>
                    <div className="flex justify-between border-t border-neon/20 pt-3">
                      <span className="text-steel">Base Savings</span>
                      <span className="text-white font-semibold">{formatMoney(calculations.baseSavings)}</span>
                    </div>
                    <div className="flex justify-between text-neon">
                      <span>Network Effect Bonus ({calculations.networkMultiplier.toFixed(2)}x)</span>
                      <span className="font-bold">+{formatMoney(calculations.networkBonusSavings)}</span>
                    </div>
                  </div>
                </Card>

                {/* Investment - Deep view */}
                <Card className="mb-8 border-steel/30">
                  <h3 className="font-bold text-steel mb-4">Investment Required</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-steel">Implementation (one-time)</span>
                      <span className="text-white">{formatMoney(calculations.implementationCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-steel">Annual Subscription</span>
                      <span className="text-white">{formatMoney(calculations.annualSubscription)}</span>
                    </div>
                    <div className="flex justify-between border-t border-steel/20 pt-3">
                      <span className="text-steel font-semibold">Year 1 Net Gain</span>
                      <span className={`font-bold ${calculations.yearOneSavings > 0 ? 'text-neon' : 'text-ember'}`}>
                        {formatMoney(calculations.yearOneSavings)}
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Operational Impact - Deep view */}
                <Card>
                <h3 className="font-bold text-neon mb-4">Operational Impact</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-steel">Dwell Time Reduction</span>
                      <span className="text-white inline-flex items-center gap-1">{avgDwellTime} min <FlowArrow size={12} /> {Math.round(calculations.newDwellTime)} min</span>
                    </div>
                    <div className="h-2 bg-carbon rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-neon rounded-full transition-all duration-500"
                        style={{ width: `${(1 - calculations.newDwellTime / avgDwellTime) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-steel">Annual Time Saved</span>
                      <span className="text-white">{formatNumber(calculations.annualTimeSaved / 60)} hours</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-steel">Network Velocity Gain</span>
                      <span className="text-neon font-bold">{Math.round((calculations.networkMultiplier - 1) * 100)}%</span>
                    </div>
                  </div>
                </div>
              </Card>
              </>
              )}

              {view === 'board' && (
                <div className="mt-10">
                  <BoardReadyExportCTA
                    endpoint="/api/pdf/roi"
                    emailEndpoint="/api/email/roi"
                    eventName="roi_pdf_exported"
                    buildPayload={(lead) => ({ lead, inputs: inputsForPdf })}
                    title="Board-ready ROI PDF"
                    subtitle="Generate a clean PDF you can forward internally, or email it to finance/procurement. Modeled estimates; results vary."
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-neon/10 to-transparent border-t border-neon/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6">
            Ready to Capture <span className="neon-glow">{formatMoney(calculations.totalAnnualSavings)}/year</span>?
          </h2>
          <p className="text-xl text-steel mb-8">
            Export a board-ready PDF, or get a custom analysis with your actual operational data.
          </p>
          <div className="mt-10 text-left">
            <BoardReadyExportCTA
              endpoint="/api/pdf/roi"
              emailEndpoint="/api/email/roi"
              eventName="roi_pdf_exported"
              buildPayload={(lead) => ({ lead, inputs: inputsForPdf })}
              title="Board-ready ROI PDF"
              subtitle="Generate a clean PDF you can forward internally, or email it to finance/procurement. Modeled estimates; results vary."
            />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold border border-steel/30 text-white hover:border-neon/40 transition-colors"
            >
              Get a custom analysis
            </a>
            <a
              href="/singularity"
              className="btn-neon-fill inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
            >
              <Metrics size={20} className="text-void" />
              Founding Member Program
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <NextSteps title="Next best step" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

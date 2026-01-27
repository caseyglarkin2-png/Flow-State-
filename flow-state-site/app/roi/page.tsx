'use client';
/**
 * ROI Calculator Page - Simplified Board-Ready Experience
 * 
 * SPEC (Sprint 4):
 * - Deep model as default
 * - Inputs exposed in single top-row
 * - Basic mode as toggle
 * - Board-ready PDF export
 * - CFO Proof checklist
 * 
 * LOCKED: Economics engine (calcRoiV2) - do not modify formulas
 */

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BoardReadyExportCTA from '@/components/BoardReadyExportCTA';
import CFOProofChecklist from '@/components/CFOProofChecklist';
import { Card } from '@/components/primitives';
import { calcRoiV2, roiV2InputsFromQuickMode } from '@/src/lib/economics/roi';
import CoverageSlider from '@/components/CoverageSlider';
import { buildAdoptionCopy } from '@/src/lib/adoption';

// Modeling presets (CFO-calibrated)
const modelingPresets = {
  conservative: {
    label: 'Conservative',
    description: 'Higher costs, lower gains',
    trucksPerDay: 100,
    detentionCost: 85,
    laborCostPerHour: 32,
    gateStaff: 3,
    avgDwellTime: 65,
  },
  base: {
    label: 'Base',
    description: 'Industry benchmarks',
    trucksPerDay: 150,
    detentionCost: 75,
    laborCostPerHour: 28,
    gateStaff: 4,
    avgDwellTime: 55,
  },
  aggressive: {
    label: 'Aggressive',
    description: 'Optimistic scenario',
    trucksPerDay: 200,
    detentionCost: 65,
    laborCostPerHour: 25,
    gateStaff: 5,
    avgDwellTime: 45,
  },
} as const;

export default function RoiPage() {
  // Mode: basic (summary) or deep (all inputs exposed)
  const [mode, setMode] = useState<'basic' | 'deep'>('deep');
  
  // Core inputs
  const [facilities, setFacilities] = useState(50);
  const [contractedFacilities, setContractedFacilities] = useState(50);
  const [adoptionPercent, setAdoptionPercent] = useState(5);
  const [yearOneRampShare, setYearOneRampShare] = useState(0.65);
  
  // Operational inputs (exposed in top row) - explicit number types
  const [trucksPerDay, setTrucksPerDay] = useState<number>(modelingPresets.base.trucksPerDay);
  const [avgDwellTime, setAvgDwellTime] = useState<number>(modelingPresets.base.avgDwellTime);
  const [detentionCost, setDetentionCost] = useState<number>(modelingPresets.base.detentionCost);
  const [laborCostPerHour, setLaborCostPerHour] = useState<number>(modelingPresets.base.laborCostPerHour);
  const [gateStaff, setGateStaff] = useState<number>(modelingPresets.base.gateStaff);

  // Active preset tracking
  const [activePreset, setActivePreset] = useState<keyof typeof modelingPresets>('base');

  const applyPreset = (key: keyof typeof modelingPresets) => {
    const p = modelingPresets[key];
    setTrucksPerDay(p.trucksPerDay);
    setAvgDwellTime(p.avgDwellTime);
    setDetentionCost(p.detentionCost);
    setLaborCostPerHour(p.laborCostPerHour);
    setGateStaff(p.gateStaff);
    setActivePreset(key);
  };

  // Quick inputs for V2 engine
  const inputsForPdf = useMemo(() => {
    const v2 = roiV2InputsFromQuickMode({
      facilities,
      trucksPerDayPerFacility: trucksPerDay,
      avgDwellTimeMinutes: avgDwellTime,
      detentionCostPerHour: detentionCost,
      laborCostPerHour,
      gateStaffPerFacility: gateStaff,
    });
    return {
      ...v2,
      contractedFacilities,
      yearOneRampShare,
    };
  }, [facilities, contractedFacilities, yearOneRampShare, trucksPerDay, avgDwellTime, detentionCost, laborCostPerHour, gateStaff]);

  // Run economics through locked V2 engine
  const calculations = useMemo(() => {
    const v2 = calcRoiV2(inputsForPdf);
    return {
      networkMultiplier: v2.networkMultiplier,
      annualDetentionSavings: v2.annualDetentionSavings,
      annualLaborSavings: v2.annualLaborSavings,
      throughputValue: v2.throughputValue,
      paperlessSavings: v2.paperlessSavings,
      baseSavings: v2.baseSavings,
      networkBonusSavings: v2.networkBonusSavings,
      totalAnnualSavings: v2.totalAnnualSavings,
      implementationCost: v2.implementationCost,
      annualSubscription: v2.annualSubscription,
      yearOneGrossSavings: v2.yearOneGrossSavings,
      yearOneSavings: v2.yearOneNetGain,
      yearOneROI: v2.yearOneRoiPercent,
      paybackMonths: v2.paybackMonths,
      fiveYearSavings: v2.fiveYearValue,
      v2,
    };
  }, [inputsForPdf]);

  const formatMoney = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${Math.round(amount).toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-8">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">ROI Calculator</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-black tracking-tight text-white">
            Board-Ready in 3 Minutes.
          </h1>
          <p className="mt-4 text-lg text-steel max-w-2xl">
            Model your network economics. Export a PDF you can forward internally.
          </p>
        </div>
      </section>

      {/* Inputs Row - Top of page per spec */}
      <section className="py-8 border-b border-steel/20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Your Network</h2>
              <p className="text-sm text-steel">
                {buildAdoptionCopy(contractedFacilities, adoptionPercent)}
              </p>
            </div>
            {/* Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-steel">Mode:</span>
              <button
                onClick={() => setMode(mode === 'basic' ? 'deep' : 'basic')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  mode === 'deep'
                    ? 'bg-neon text-void'
                    : 'border border-steel/30 text-steel hover:border-neon/40'
                }`}
              >
                {mode === 'deep' ? 'Deep Model' : 'Basic Mode'}
              </button>
            </div>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(modelingPresets).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => applyPreset(key as keyof typeof modelingPresets)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activePreset === key
                    ? 'bg-neon/20 border-2 border-neon text-neon'
                    : 'bg-carbon border border-steel/30 text-steel hover:border-neon/50'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Horizontal Inputs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Facilities */}
            <div className="bg-carbon/50 rounded-lg p-4">
              <label className="text-xs text-steel block mb-1">Facilities</label>
              <input
                type="number"
                min={1}
                max={500}
                value={facilities}
                onChange={(e) => {
                  const v = parseInt(e.target.value) || 1;
                  setFacilities(v);
                  setContractedFacilities(v);
                }}
                className="w-full bg-void border border-steel/20 rounded px-3 py-2 text-white text-lg font-bold"
              />
            </div>

            {/* Trucks/Day */}
            <div className="bg-carbon/50 rounded-lg p-4">
              <label className="text-xs text-steel block mb-1">Trucks/Day</label>
              <input
                type="number"
                min={20}
                max={500}
                value={trucksPerDay}
                onChange={(e) => setTrucksPerDay(parseInt(e.target.value) || 100)}
                className="w-full bg-void border border-steel/20 rounded px-3 py-2 text-white text-lg font-bold"
              />
            </div>

            {/* Dwell Time */}
            <div className="bg-carbon/50 rounded-lg p-4">
              <label className="text-xs text-steel block mb-1">Dwell (min)</label>
              <input
                type="number"
                min={15}
                max={120}
                value={avgDwellTime}
                onChange={(e) => setAvgDwellTime(parseInt(e.target.value) || 55)}
                className="w-full bg-void border border-steel/20 rounded px-3 py-2 text-white text-lg font-bold"
              />
            </div>

            {/* Detention Cost */}
            <div className="bg-carbon/50 rounded-lg p-4">
              <label className="text-xs text-steel block mb-1">Detention $/hr</label>
              <input
                type="number"
                min={25}
                max={150}
                value={detentionCost}
                onChange={(e) => setDetentionCost(parseInt(e.target.value) || 75)}
                className="w-full bg-void border border-steel/20 rounded px-3 py-2 text-white text-lg font-bold"
              />
            </div>

            {/* Labor Cost */}
            <div className="bg-carbon/50 rounded-lg p-4">
              <label className="text-xs text-steel block mb-1">Labor $/hr</label>
              <input
                type="number"
                min={15}
                max={60}
                value={laborCostPerHour}
                onChange={(e) => setLaborCostPerHour(parseInt(e.target.value) || 28)}
                className="w-full bg-void border border-steel/20 rounded px-3 py-2 text-white text-lg font-bold"
              />
            </div>

            {/* Gate Staff */}
            <div className="bg-carbon/50 rounded-lg p-4">
              <label className="text-xs text-steel block mb-1">Gate Staff</label>
              <input
                type="number"
                min={1}
                max={10}
                value={gateStaff}
                onChange={(e) => setGateStaff(parseInt(e.target.value) || 4)}
                className="w-full bg-void border border-steel/20 rounded px-3 py-2 text-white text-lg font-bold"
              />
            </div>
          </div>

          {/* Deep mode: Year-1 ramp slider */}
          {mode === 'deep' && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex justify-between text-sm mb-2">
                  <span className="text-steel">Year-1 Realization</span>
                  <span className="text-neon font-bold">{Math.round(yearOneRampShare * 100)}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={yearOneRampShare}
                  onChange={(e) => setYearOneRampShare(parseFloat(e.target.value))}
                  className="w-full h-2 bg-carbon rounded-lg appearance-none cursor-pointer accent-neon"
                />
                <p className="text-xs text-steel/60 mt-1">
                  Rollout pace: what % of full savings are realized in Year 1
                </p>
              </div>
              <div>
                <CoverageSlider value={adoptionPercent} onChange={setAdoptionPercent} showPresets={false} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          {/* CFO Hero Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-neon/10 to-transparent rounded-xl p-6 border border-neon/20">
              <p className="text-sm text-steel mb-1">Year 1 Gross Savings</p>
              <p className="text-3xl md:text-4xl font-black text-neon">
                {formatMoney(calculations.yearOneGrossSavings)}
              </p>
            </div>
            <div className="bg-carbon/50 rounded-xl p-6 border border-steel/20">
              <p className="text-sm text-steel mb-1">Year 1 ROI</p>
              <p className="text-3xl md:text-4xl font-black text-white">
                {Math.round(calculations.yearOneROI)}%
              </p>
            </div>
            <div className="bg-carbon/50 rounded-xl p-6 border border-steel/20">
              <p className="text-sm text-steel mb-1">Payback Period</p>
              <p className="text-3xl md:text-4xl font-black text-white">
                {calculations.paybackMonths.toFixed(1)} mo
              </p>
            </div>
            <div className="bg-carbon/50 rounded-xl p-6 border border-steel/20">
              <p className="text-sm text-steel mb-1">5-Year Value</p>
              <p className="text-3xl md:text-4xl font-black text-white">
                {formatMoney(calculations.fiveYearSavings)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Savings Breakdown */}
            <Card className="border-neon/20">
              <h3 className="font-bold text-neon mb-4">Savings Breakdown</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-steel">Labor Automation</span>
                  <span className="text-white font-semibold">
                    {formatMoney(calculations.annualLaborSavings * yearOneRampShare)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel">Detention Recovery</span>
                  <span className="text-white font-semibold">
                    {formatMoney(calculations.annualDetentionSavings * yearOneRampShare)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel">Throughput Gains</span>
                  <span className="text-white font-semibold">
                    {formatMoney(calculations.throughputValue * yearOneRampShare)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel">Paperless Operations</span>
                  <span className="text-white font-semibold">
                    {formatMoney(calculations.paperlessSavings * yearOneRampShare)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-steel/20">
                  <span className="text-steel">Base Savings</span>
                  <span className="text-white font-bold">
                    {formatMoney(calculations.baseSavings * yearOneRampShare)}
                  </span>
                </div>
                <div className="flex justify-between text-neon">
                  <span>Network Effect (+{calculations.networkMultiplier.toFixed(2)}×)</span>
                  <span className="font-bold">
                    +{formatMoney(calculations.networkBonusSavings * yearOneRampShare)}
                  </span>
                </div>
              </div>
            </Card>

            {/* Investment */}
            <Card className="border-steel/30">
              <h3 className="font-bold text-steel mb-4">Investment Required</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-steel">Implementation (one-time)</span>
                  <span className="text-white">{formatMoney(calculations.implementationCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel">Annual Subscription</span>
                  <span className="text-white">{formatMoney(calculations.annualSubscription)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-steel/20">
                  <span className="text-white font-semibold">Year 1 Net Gain</span>
                  <span className={`text-lg font-bold ${calculations.yearOneSavings > 0 ? 'text-neon' : 'text-ember'}`}>
                    {formatMoney(calculations.yearOneSavings)}
                  </span>
                </div>
              </div>
              <p className="text-xs text-steel/60 mt-4">
                90-day delay cost: ~{formatMoney(Math.max(0, calculations.yearOneGrossSavings) / 4)}
              </p>
            </Card>
          </div>

          {/* Deep Mode: Network Effect Breakdown */}
          {mode === 'deep' && calculations.v2.networkEffectBreakdown && (
            <Card className="mt-8 border-neon/20">
              <h3 className="font-bold text-neon mb-4">Network Effect Breakdown</h3>
              <p className="text-sm text-steel/80 mb-6">
                As your network grows, these benefits compound. Currently modeling {facilities} facilities.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-void/50 border border-steel/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-semibold text-white">Predictive Intelligence</p>
                      <p className="text-xs text-steel/70">Better ETAs from shared arrival patterns</p>
                    </div>
                    <span className="text-lg font-bold text-neon">
                      {formatMoney(calculations.v2.networkEffectBreakdown.predictiveIntelligence.planningSavings * yearOneRampShare)}
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-void/50 border border-steel/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-semibold text-white">Carrier Benchmarking</p>
                      <p className="text-xs text-steel/70">Cross-network performance data</p>
                    </div>
                    <span className="text-lg font-bold text-neon">
                      {formatMoney(calculations.v2.networkEffectBreakdown.carrierBenchmarking.negotiationLeverage * yearOneRampShare)}
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-void/50 border border-steel/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-semibold text-white">Coordination Efficiency</p>
                      <p className="text-xs text-steel/70">Reduced variability → smaller buffers</p>
                    </div>
                    <span className="text-lg font-bold text-neon">
                      {formatMoney(calculations.v2.networkEffectBreakdown.coordinationEfficiency.bufferSavings * yearOneRampShare)}
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-void/50 border border-steel/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-semibold text-white">Shared Learning</p>
                      <p className="text-xs text-steel/70">Faster onboarding + error reduction</p>
                    </div>
                    <span className="text-lg font-bold text-neon">
                      {formatMoney(calculations.v2.networkEffectBreakdown.sharedLearning.errorReduction * yearOneRampShare)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-neon/20">
                <span className="text-steel">Effective Network Multiplier</span>
                <span className="text-3xl font-black text-neon">
                  {calculations.v2.networkEffectBreakdown.effectiveMultiplier.toFixed(2)}×
                </span>
              </div>
            </Card>
          )}

          {/* PDF Export */}
          <div className="mt-12">
            <BoardReadyExportCTA
              endpoint="/api/pdf/roi"
              emailEndpoint="/api/email/roi"
              eventName="roi_pdf_exported"
              buildPayload={(lead) => ({ lead, inputs: inputsForPdf })}
              title="Board-ready ROI PDF"
              subtitle="Generate a clean PDF you can forward internally. Modeled estimates; results vary."
            />
          </div>
        </div>
      </section>

      {/* CFO Proof Checklist */}
      <section className="py-16 bg-carbon/30 border-t border-steel/20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Before You Forward This...</h2>
            <p className="text-steel/70">Every question finance will ask, answered.</p>
          </div>
          <CFOProofChecklist variant="full" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-neon/10 to-transparent border-t border-neon/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Ready to Capture <span className="neon-glow">{formatMoney(calculations.yearOneGrossSavings)}/year</span>?
          </h2>
          <p className="text-lg text-steel mb-8">
            Get a custom analysis with your actual operational data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact?intent=audit"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold bg-neon text-void hover:bg-white transition-all"
            >
              Get Custom Analysis
            </a>
            <a
              href="/product"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold border border-steel/30 text-white hover:border-neon/40 transition-colors"
            >
              Learn About YNS →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

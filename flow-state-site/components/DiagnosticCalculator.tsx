'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import { calcScenario } from '@/lib/economics';
import { getRoiV2InputsForPreset } from '@/lib/economics';
import {
  Timeline,
  Metrics,
  Velocity,
  FlowArrow,
  Caution,
  Confirm,
  Export,
  DataFile,
  ChevronRight,
  ChevronLeft,
} from '@/components/icons/FlowIcons';

interface DiagnosticInputs {
  truckloadsPerDayPerFacility: number;
  facilitiesCount: number;
  peakUpliftPercent: number;
  avgGateToExitMinutes: number;
  exceptionLoadPercent: number;
  expeditedShipmentsPerWeek: number;
  avgExpeditePremium: number;
  overtimeHoursPerWeek: number;
  overflowSpendMonthly: number;
  cargoTheftIncidentsPerYear: number;
  avgStolenLoadValue: number;
  annualInsurancePremium: number;
}

interface LeakDriver {
  name: string;
  score: number;
  annualCost: number;
  description: string;
}

const defaultInputs: DiagnosticInputs = {
  truckloadsPerDayPerFacility: 40,
  facilitiesCount: 10,
  peakUpliftPercent: 30,
  avgGateToExitMinutes: 55,
  exceptionLoadPercent: 15,
  expeditedShipmentsPerWeek: 5,
  avgExpeditePremium: 800,
  overtimeHoursPerWeek: 20,
  overflowSpendMonthly: 15000,
  cargoTheftIncidentsPerYear: 0,
  avgStolenLoadValue: 0,
  annualInsurancePremium: 0,
};

const questions = [
  {
    key: 'truckloadsPerDayPerFacility',
    question: 'How many truckloads per day does your average facility handle?',
    min: 5,
    max: 200,
    step: 5,
    unit: 'loads/day',
    hint: 'Include inbound and outbound',
  },
  {
    key: 'facilitiesCount',
    question: 'How many facilities are in scope?',
    min: 1,
    max: 500,
    step: 1,
    unit: 'sites',
    hint: 'DCs, plants, cross-docks',
  },
  {
    key: 'peakUpliftPercent',
    question: 'What\'s your peak season volume uplift?',
    min: 0,
    max: 100,
    step: 5,
    unit: '%',
    hint: 'Peak vs. average daily volume',
  },
  {
    key: 'avgGateToExitMinutes',
    question: 'What\'s your average gate-in to gate-out time?',
    min: 15,
    max: 180,
    step: 5,
    unit: 'minutes',
    hint: 'Total dwell including dock time',
  },
  {
    key: 'exceptionLoadPercent',
    question: 'What percentage of loads have exceptions?',
    min: 0,
    max: 50,
    step: 1,
    unit: '%',
    hint: 'Paperwork issues, wrong dock, rejects',
  },
  {
    key: 'expeditedShipmentsPerWeek',
    question: 'How many expedited shipments per week (network-wide)?',
    min: 0,
    max: 100,
    step: 1,
    unit: 'shipments',
    hint: 'Hot shots, premium freight',
  },
  {
    key: 'avgExpeditePremium',
    question: 'What\'s the average expedite premium cost?',
    min: 100,
    max: 5000,
    step: 50,
    unit: '$',
    hint: 'Per expedited shipment',
  },
  {
    key: 'overtimeHoursPerWeek',
    question: 'Weekly overtime hours at gate/yard operations (network-wide)?',
    min: 0,
    max: 200,
    step: 5,
    unit: 'hours',
    hint: 'All facilities combined',
  },
  {
    key: 'overflowSpendMonthly',
    question: 'Monthly overflow/3PL yard spend during peak?',
    min: 0,
    max: 100000,
    step: 1000,
    unit: '$',
    hint: 'Optional: leave at 0 if none',
  },
  {
    key: 'cargoTheftIncidentsPerYear',
    question: 'Cargo theft or security incidents per year (network-wide)?',
    min: 0,
    max: 50,
    step: 1,
    unit: 'incidents',
    hint: 'Theft, fraud, unauthorized access',
  },
  {
    key: 'avgStolenLoadValue',
    question: 'Average value of stolen/lost load?',
    min: 0,
    max: 500000,
    step: 10000,
    unit: '$',
    hint: 'Typical cargo value at risk',
  },
  {
    key: 'annualInsurancePremium',
    question: 'Annual cargo insurance premium?',
    min: 0,
    max: 500000,
    step: 5000,
    unit: '$',
    hint: 'Total cargo/yard insurance cost',
  },
] as const;

function calculateYardTaxScore(inputs: DiagnosticInputs): number {
  // Score 0-100 based on operational inefficiency indicators
  let score = 0;
  
  // High dwell time (>45 min baseline is inefficient)
  if (inputs.avgGateToExitMinutes > 45) score += Math.min(20, (inputs.avgGateToExitMinutes - 45) / 3);
  
  // High exception rate
  score += Math.min(20, inputs.exceptionLoadPercent * 1.5);
  
  // Expedite dependency
  const expeditesPerFacility = inputs.expeditedShipmentsPerWeek / Math.max(1, inputs.facilitiesCount);
  score += Math.min(15, expeditesPerFacility * 3);
  
  // OT dependency
  const otPerFacility = inputs.overtimeHoursPerWeek / Math.max(1, inputs.facilitiesCount);
  score += Math.min(15, otPerFacility);
  
  // Peak volatility
  score += Math.min(15, inputs.peakUpliftPercent / 4);
  
  // Overflow dependency
  const overflowPerFacility = inputs.overflowSpendMonthly / Math.max(1, inputs.facilitiesCount);
  score += Math.min(15, overflowPerFacility / 500);
  
  // Security risk (cargo theft)
  if (inputs.cargoTheftIncidentsPerYear > 0) {
    score += Math.min(15, inputs.cargoTheftIncidentsPerYear * 3);
  }
  
  return Math.min(100, Math.round(score));
}

function calculateLeakDrivers(inputs: DiagnosticInputs): LeakDriver[] {
  const annualTruckloads = inputs.truckloadsPerDayPerFacility * inputs.facilitiesCount * 260;
  const drivers: LeakDriver[] = [];
  
  // Detention (assume $75/occurrence, 10% of loads with long dwell)
  const detentionRate = inputs.avgGateToExitMinutes > 60 ? 0.15 : inputs.avgGateToExitMinutes > 45 ? 0.08 : 0.03;
  const detentionCost = annualTruckloads * detentionRate * 75;
  drivers.push({
    name: 'Detention & Disputes',
    score: Math.round(detentionRate * 100),
    annualCost: detentionCost,
    description: `${Math.round(detentionRate * 100)}% of loads likely trigger detention based on ${inputs.avgGateToExitMinutes} min dwell`,
  });
  
  // Expedite spend
  const expediteCost = inputs.expeditedShipmentsPerWeek * inputs.avgExpeditePremium * 52;
  drivers.push({
    name: 'Expedite & Premium Freight',
    score: Math.min(100, Math.round(inputs.expeditedShipmentsPerWeek / inputs.facilitiesCount * 20)),
    annualCost: expediteCost,
    description: `${inputs.expeditedShipmentsPerWeek} weekly expedites at $${inputs.avgExpeditePremium} avg premium`,
  });
  
  // OT cost (assume $45/hr avg OT rate)
  const otCost = inputs.overtimeHoursPerWeek * 45 * 52;
  drivers.push({
    name: 'Overtime & Labor Volatility',
    score: Math.min(100, Math.round(inputs.overtimeHoursPerWeek / inputs.facilitiesCount * 10)),
    annualCost: otCost,
    description: `${inputs.overtimeHoursPerWeek} hrs/week @ $45/hr OT premium`,
  });
  
  // Overflow/3PL
  const overflowCost = inputs.overflowSpendMonthly * 12;
  drivers.push({
    name: 'Overflow & 3PL Surge',
    score: Math.min(100, Math.round(inputs.overflowSpendMonthly / inputs.facilitiesCount / 100)),
    annualCost: overflowCost,
    description: `$${inputs.overflowSpendMonthly.toLocaleString()}/mo during peak periods`,
  });
  
  // Exception handling (assume 15 min extra per exception, $50/hr loaded labor)
  const exceptionCost = annualTruckloads * (inputs.exceptionLoadPercent / 100) * 0.25 * 50;
  drivers.push({
    name: 'Exception Handling',
    score: inputs.exceptionLoadPercent * 2,
    annualCost: exceptionCost,
    description: `${inputs.exceptionLoadPercent}% exception rate = 15 min extra handling per load`,
  });
  
  // Security & fraud (theft incidents + insurance premium)
  if (inputs.cargoTheftIncidentsPerYear > 0 || inputs.annualInsurancePremium > 0) {
    const theftLosses = inputs.cargoTheftIncidentsPerYear * inputs.avgStolenLoadValue;
    const investigationCost = inputs.cargoTheftIncidentsPerYear * 15000; // $15K per investigation
    const insurancePremium = inputs.annualInsurancePremium;
    const totalSecurityCost = theftLosses + investigationCost + insurancePremium;
    
    drivers.push({
      name: 'Security & Fraud',
      score: Math.min(100, inputs.cargoTheftIncidentsPerYear * 20),
      annualCost: totalSecurityCost,
      description: `${inputs.cargoTheftIncidentsPerYear} incidents/yr + $${(insurancePremium / 1000).toFixed(0)}K insurance`,
    });
  }
  
  // Sort by cost descending
  return drivers.sort((a, b) => b.annualCost - a.annualCost);
}

export default function DiagnosticCalculator() {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState<DiagnosticInputs>(defaultInputs);
  const [showResults, setShowResults] = useState(false);
  
  const currentQuestion = questions[step];
  
  const handleInputChange = (key: string, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };
  
  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  
  const yardTaxScore = useMemo(() => calculateYardTaxScore(inputs), [inputs]);
  const leakDrivers = useMemo(() => calculateLeakDrivers(inputs), [inputs]);
  const totalYardTax = useMemo(() => leakDrivers.reduce((sum, d) => sum + d.annualCost, 0), [leakDrivers]);
  
  // Use canonical economics model for cost of delay
  const scenario = useMemo(() => {
    const baseRoi = getRoiV2InputsForPreset('enterprise_50', 'expected');
    // Update throughput assumptions based on user inputs
    const updatedRoi = {
      ...baseRoi,
      throughput: {
        ...baseRoi.throughput,
        avgGateInToOutMinutes: inputs.avgGateToExitMinutes,
      },
      // Scale tiers based on facility count
      tiers: {
        XL: { ...baseRoi.tiers.XL, count: Math.round(inputs.facilitiesCount * 0.1), shipmentsPerDay: inputs.truckloadsPerDayPerFacility },
        L: { ...baseRoi.tiers.L, count: Math.round(inputs.facilitiesCount * 0.2), shipmentsPerDay: inputs.truckloadsPerDayPerFacility },
        M: { ...baseRoi.tiers.M, count: Math.round(inputs.facilitiesCount * 0.4), shipmentsPerDay: inputs.truckloadsPerDayPerFacility },
        S: { ...baseRoi.tiers.S, count: Math.round(inputs.facilitiesCount * 0.3), shipmentsPerDay: inputs.truckloadsPerDayPerFacility },
      },
    };
    return calcScenario({
      roi: updatedRoi,
      profit: {
        method: 'contribution_margin',
        contributionMarginPerTruckload: 85,
        outsourcedCostPerTruckload: 0,
        internalVariableCostPerTruckload: 0,
      },
      discountRate: 0.10,
      growthRate: 0.02,
    });
  }, [inputs]);
  
  const costOfDelay30 = scenario.finance.costOfDelay90Days / 3;
  const costOfDelay90 = scenario.finance.costOfDelay90Days;
  
  const scoreColor = yardTaxScore < 30 ? 'text-green-400' : yardTaxScore < 60 ? 'text-amber-400' : 'text-ember';
  const scoreLabel = yardTaxScore < 30 ? 'Low' : yardTaxScore < 60 ? 'Moderate' : 'High';
  
  const exportAssumptions = () => {
    const data = {
      generatedAt: new Date().toISOString(),
      inputs,
      results: {
        yardTaxScore,
        totalAnnualYardTax: totalYardTax,
        costOfDelay30Days: costOfDelay30,
        costOfDelay90Days: costOfDelay90,
        topLeakDrivers: leakDrivers.slice(0, 3).map(d => ({
          name: d.name,
          annualCost: d.annualCost,
        })),
      },
      methodology: `${typeof window !== 'undefined' ? window.location.origin : ''}/docs/economics-methodology`,
      disclaimer: 'These projections are modeled estimates based on user inputs and industry benchmarks. Actual results may vary.',
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yard-tax-diagnostic-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const roiParams = new URLSearchParams({
    facilities: String(inputs.facilitiesCount),
    truckloads: String(inputs.truckloadsPerDayPerFacility * 260),
    dwell: String(inputs.avgGateToExitMinutes),
  }).toString();
  
  if (showResults) {
    return (
      <div className="space-y-8">
        {/* Score Header */}
        <div className="text-center">
          <p className="text-ember font-mono text-sm tracking-widest mb-4 uppercase">
            Your Yard Tax Diagnostic Results
          </p>
          <div className="inline-flex items-center gap-4 mb-4">
            <div className={`text-7xl font-black ${scoreColor}`}>
              {yardTaxScore}
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-white">/ 100</p>
              <p className={`text-lg font-semibold ${scoreColor}`}>{scoreLabel} Risk</p>
            </div>
          </div>
          <p className="text-steel/70 max-w-xl mx-auto">
            Based on your inputs, your yard operations show {scoreLabel.toLowerCase()} levels of hidden cost exposure.
          </p>
        </div>
        
        {/* Total Yard Tax */}
        <Card className="p-8 border-ember/30 bg-ember/5">
          <div className="text-center">
            <p className="text-steel/60 text-sm font-mono mb-2">ESTIMATED ANNUAL YARD TAX</p>
            <p className="text-5xl font-black text-ember mb-2">
              ${Math.round(totalYardTax).toLocaleString()}
            </p>
            <p className="text-steel/60 text-sm">
              modeled across {inputs.facilitiesCount} facilities
            </p>
          </div>
        </Card>
        
        {/* Top 3 Leak Drivers */}
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Caution className="text-ember" size={20} />
            Top Leak Drivers
          </h3>
          <div className="space-y-3">
            {leakDrivers.slice(0, 3).map((driver, i) => (
              <Card key={i} className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-void ${
                      i === 0 ? 'bg-ember' : i === 1 ? 'bg-amber-500' : 'bg-yellow-500'
                    }`}>
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-bold text-white">{driver.name}</p>
                      <p className="text-steel/60 text-sm">{driver.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-ember">
                      ${Math.round(driver.annualCost).toLocaleString()}
                    </p>
                    <p className="text-steel/50 text-xs">/year</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Cost of Delay */}
        <Card className="p-6 border-neon/30">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Timeline className="text-neon" size={20} />
            Cost of Delay
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <p className="text-steel/60 text-sm mb-1">30-Day Delay</p>
              <p className="text-3xl font-bold text-white">
                ${Math.round(costOfDelay30).toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-steel/60 text-sm mb-1">90-Day Delay</p>
              <p className="text-3xl font-bold text-neon">
                ${Math.round(costOfDelay90).toLocaleString()}
              </p>
            </div>
          </div>
          <p className="text-steel/50 text-xs mt-4 text-center">
            Opportunity cost of delaying yard orchestration implementation, based on canonical economics model.
          </p>
        </Card>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/roi?${roiParams}`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg bg-neon text-void hover:bg-white transition-all hover:scale-105"
          >
            <Metrics size={22} />
            Run Board-Ready ROI Model
          </Link>
          <button
            onClick={exportAssumptions}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-semibold border border-steel/40 text-white hover:border-neon hover:text-neon transition-all"
          >
            <DataFile size={20} />
            Export Assumptions (JSON)
          </button>
        </div>
        
        {/* Disclaimer */}
        <p className="text-center text-steel/50 text-xs">
          These estimates are modeled based on your inputs and industry benchmarks. 
          Actual yard tax varies by operation. {' '}
          <Link href="/docs/economics-methodology" className="text-neon hover:underline">
            See methodology →
          </Link>
        </p>
        
        {/* Reset */}
        <div className="text-center">
          <button
            onClick={() => {
              setShowResults(false);
              setStep(0);
              setInputs(defaultInputs);
            }}
            className="text-steel/60 hover:text-white text-sm underline"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-steel/60 mb-2">
          <span>Question {step + 1} of {questions.length}</span>
          <span>{Math.round((step / questions.length) * 100)}% complete</span>
        </div>
        <div className="h-2 bg-carbon rounded-full overflow-hidden">
          <div 
            className="h-full bg-neon transition-all duration-300"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Question */}
      <Card className="p-8 mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {currentQuestion.question}
        </h2>
        <p className="text-steel/60 text-sm mb-6">
          {currentQuestion.hint}
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={currentQuestion.min}
              max={currentQuestion.max}
              step={currentQuestion.step}
              value={inputs[currentQuestion.key as keyof DiagnosticInputs]}
              onChange={(e) => handleInputChange(currentQuestion.key, Number(e.target.value))}
              className="flex-1 h-2 bg-carbon rounded-lg appearance-none cursor-pointer accent-neon"
            />
            <div className="w-32 text-right">
              <span className="text-3xl font-bold text-neon">
                {currentQuestion.unit === '$' && '$'}
                {inputs[currentQuestion.key as keyof DiagnosticInputs].toLocaleString()}
              </span>
              <span className="text-steel/60 ml-1">
                {currentQuestion.unit !== '$' && currentQuestion.unit}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-steel/50">
            <span>{currentQuestion.unit === '$' ? '$' : ''}{currentQuestion.min.toLocaleString()}</span>
            <span>{currentQuestion.unit === '$' ? '$' : ''}{currentQuestion.max.toLocaleString()}</span>
          </div>
        </div>
      </Card>
      
      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            step === 0 
              ? 'text-steel/40 cursor-not-allowed' 
              : 'text-white hover:text-neon'
          }`}
        >
          <ChevronLeft size={20} />
          Back
        </button>
        
        <button
          onClick={handleNext}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-neon text-void hover:bg-white transition-all"
        >
          {step === questions.length - 1 ? 'See Results' : 'Next'}
          <ChevronRight size={20} />
        </button>
      </div>
      
      {/* Quick Complete */}
      <div className="text-center mt-6">
        <button
          onClick={() => setShowResults(true)}
          className="text-steel/60 hover:text-neon text-sm underline"
        >
          Skip to results with current values
        </button>
      </div>
    </div>
  );
}

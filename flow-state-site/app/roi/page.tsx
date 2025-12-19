'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { FlowArrow, Metrics, Timeline } from '@/components/icons/FlowIcons';

export default function ROICalculatorPage() {
  const [facilities, setFacilities] = useState(5);
  const [trucksPerDay, setTrucksPerDay] = useState(150);
  const [avgDwellTime, setAvgDwellTime] = useState(48);
  const [detentionCost, setDetentionCost] = useState(75);
  const [laborCostPerHour, setLaborCostPerHour] = useState(28);
  const [gateStaff, setGateStaff] = useState(3);

  const calculations = useMemo(() => {
    // Network effect multiplier based on Metcalfe's Law
    const networkMultiplier = 1 + (Math.log(facilities + 1) * 0.5);

    // Time savings
    const newDwellTime = avgDwellTime * 0.5; // 50% reduction
    const timeSavedPerTruck = avgDwellTime - newDwellTime; // minutes
    const annualTimeSaved = timeSavedPerTruck * trucksPerDay * 365 * facilities; // minutes

    // Detention savings
    const detentionReduction = 0.65; // 65% reduction in detention
    const annualDetentionSavings = (trucksPerDay * 0.15 * detentionCost * 365 * facilities) * detentionReduction;

    // Labor savings (gate automation)
    const laborSavingsPerFacility = gateStaff * 0.7 * laborCostPerHour * 2080; // 70% reduction, 2080 hrs/yr
    const annualLaborSavings = laborSavingsPerFacility * facilities;

    // Throughput increase value
    const throughputIncrease = 0.42; // 42% more trucks
    const valuePerTruck = 45; // marginal value per additional truck processed
    const throughputValue = trucksPerDay * throughputIncrease * valuePerTruck * 365 * facilities;

    // Paperless savings
    const paperlessSavings = 15 * trucksPerDay * 365 * facilities; // $15 per truck in paper/admin

    // Total before network effect
    const baseSavings = annualDetentionSavings + annualLaborSavings + throughputValue + paperlessSavings;

    // Apply network effect
    const networkBonusSavings = baseSavings * (networkMultiplier - 1);
    const totalAnnualSavings = baseSavings + networkBonusSavings;

    // Implementation cost
    const implementationCost = facilities * 15000 + 50000; // $15k per site + $50k base
    const annualSubscription = facilities * 2500 * 12; // $2,500/month per site

    // ROI calculations
    const yearOneSavings = totalAnnualSavings - implementationCost - annualSubscription;
    const yearOneROI = ((totalAnnualSavings - annualSubscription) / implementationCost) * 100;
    const paybackMonths = implementationCost / ((totalAnnualSavings - annualSubscription) / 12);

    // 5-year projections (2% annual growth in savings from optimization)
    const fiveYearSavings = Array.from({ length: 5 }, (_, i) => 
      totalAnnualSavings * Math.pow(1.02, i) - annualSubscription
    ).reduce((a, b) => a + b, 0) - implementationCost;

    return {
      networkMultiplier,
      timeSavedPerTruck,
      annualTimeSaved,
      annualDetentionSavings,
      annualLaborSavings,
      throughputValue,
      paperlessSavings,
      baseSavings,
      networkBonusSavings,
      totalAnnualSavings,
      implementationCost,
      annualSubscription,
      yearOneSavings,
      yearOneROI,
      paybackMonths,
      fiveYearSavings,
      newDwellTime,
    };
  }, [facilities, trucksPerDay, avgDwellTime, detentionCost, laborCostPerHour, gateStaff]);

  const formatMoney = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${Math.round(amount).toLocaleString()}`;
  };

  const formatNumber = (num: number) => Math.round(num).toLocaleString();

  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Calculate Your <span className="neon-glow">Flow State</span>
          </h1>
          <p className="text-xl text-steel max-w-2xl mx-auto">
            Input your operation's parameters. See the transformation in real-time.
            <br />
            <span className="text-neon font-semibold">Numbers don't lie.</span>
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Inputs */}
            <div>
              <h2 className="text-2xl font-bold mb-8 neon-glow">Your Operation</h2>
              
              <div className="space-y-8">
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
              </div>
            </div>

            {/* Results */}
            <div>
              <h2 className="text-2xl font-bold mb-8 neon-glow">Your ROI</h2>

              {/* Hero metrics */}
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

              {/* Breakdown */}
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

              {/* Investment */}
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

              {/* Operational Impact */}
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
            Get a custom analysis with your actual operational data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="neon-fill" size="lg" icon={<Metrics size={20} className="text-void" />}>
              Get Custom Analysis
            </Button>
            <Button variant="neon" size="lg" icon={<Timeline size={20} />}>
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

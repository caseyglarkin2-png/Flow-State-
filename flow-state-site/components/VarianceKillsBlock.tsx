'use client';

import React, { useState } from 'react';
import Card from '@/components/Card';
import { AlertTriangle, TrendingUp } from 'lucide-react';

interface DwellDataPoint {
  day: string;
  dwell: number;
  exceptions: number;
}

// Simulated 30-day dwell data showing variance
const generateDwellData = (): DwellDataPoint[] => {
  const days = [];
  for (let i = 1; i <= 30; i++) {
    // Most days are 40-50 min, but ~20% are outliers (70-120 min)
    const isOutlier = Math.random() < 0.2;
    const baseDwell = isOutlier ? 70 + Math.random() * 50 : 38 + Math.random() * 15;
    days.push({
      day: `Day ${i}`,
      dwell: Math.round(baseDwell),
      exceptions: isOutlier ? Math.floor(Math.random() * 8) + 3 : Math.floor(Math.random() * 2),
    });
  }
  return days;
};

// Static data for consistent rendering (generated once)
const dwellData: DwellDataPoint[] = [
  { day: 'Day 1', dwell: 44, exceptions: 1 },
  { day: 'Day 2', dwell: 48, exceptions: 0 },
  { day: 'Day 3', dwell: 92, exceptions: 7 },
  { day: 'Day 4', dwell: 41, exceptions: 0 },
  { day: 'Day 5', dwell: 45, exceptions: 1 },
  { day: 'Day 6', dwell: 105, exceptions: 9 },
  { day: 'Day 7', dwell: 43, exceptions: 0 },
  { day: 'Day 8', dwell: 47, exceptions: 1 },
  { day: 'Day 9', dwell: 42, exceptions: 0 },
  { day: 'Day 10', dwell: 88, exceptions: 5 },
  { day: 'Day 11', dwell: 46, exceptions: 1 },
  { day: 'Day 12', dwell: 44, exceptions: 0 },
  { day: 'Day 13', dwell: 98, exceptions: 8 },
  { day: 'Day 14', dwell: 45, exceptions: 1 },
  { day: 'Day 15', dwell: 43, exceptions: 0 },
  { day: 'Day 16', dwell: 47, exceptions: 1 },
  { day: 'Day 17', dwell: 115, exceptions: 10 },
  { day: 'Day 18', dwell: 44, exceptions: 0 },
  { day: 'Day 19', dwell: 46, exceptions: 1 },
  { day: 'Day 20', dwell: 42, exceptions: 0 },
  { day: 'Day 21', dwell: 85, exceptions: 6 },
  { day: 'Day 22', dwell: 45, exceptions: 1 },
  { day: 'Day 23', dwell: 43, exceptions: 0 },
  { day: 'Day 24', dwell: 48, exceptions: 1 },
  { day: 'Day 25', dwell: 44, exceptions: 0 },
  { day: 'Day 26', dwell: 102, exceptions: 8 },
  { day: 'Day 27', dwell: 46, exceptions: 1 },
  { day: 'Day 28', dwell: 44, exceptions: 0 },
  { day: 'Day 29', dwell: 45, exceptions: 1 },
  { day: 'Day 30', dwell: 95, exceptions: 7 },
];

export default function VarianceKillsBlock() {
  const [showExplanation, setShowExplanation] = useState(false);
  
  // Calculate statistics
  const avgDwell = dwellData.reduce((sum, d) => sum + d.dwell, 0) / dwellData.length;
  const outliers = dwellData.filter(d => d.dwell > 70);
  const outlierPct = (outliers.length / dwellData.length) * 100;
  const outlierAvg = outliers.reduce((sum, d) => sum + d.dwell, 0) / outliers.length;
  const normalDays = dwellData.filter(d => d.dwell <= 70);
  const normalAvg = normalDays.reduce((sum, d) => sum + d.dwell, 0) / normalDays.length;
  
  // Cost impact (simplified model)
  const outlierExtraCost = outliers.length * 150; // $150 avg impact per outlier day (detention, OT, etc.)
  
  const maxDwell = Math.max(...dwellData.map(d => d.dwell));
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="text-ember" size={22} />
            Variance Kills More Than Averages Show
          </h3>
          <p className="text-steel/70 text-sm mt-1">
            The long-tail days drive disproportionate cost
          </p>
        </div>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="text-neon text-sm hover:underline"
        >
          {showExplanation ? 'Hide' : 'How it works'}
        </button>
      </div>
      
      {showExplanation && (
        <Card className="p-4 border-neon/20 bg-neon/5">
          <p className="text-steel/80 text-sm leading-relaxed">
            This visualization shows a typical 30-day dwell time pattern. While the <strong>average</strong> looks reasonable,
            ~20% of days are outliers that create cascading problems: detention charges, missed cutoffs, 
            overtime, and expedited freight. <strong>Averages hide chaos</strong>. Variance is where margin leaks.
          </p>
        </Card>
      )}
      
      {/* Visualization */}
      <Card className="p-6">
        {/* Bar Chart */}
        <div className="relative h-48 mb-4">
          {/* Average line */}
          <div 
            className="absolute left-0 right-0 border-t-2 border-dashed border-steel/40 z-10"
            style={{ bottom: `${(avgDwell / maxDwell) * 100}%` }}
          >
            <span className="absolute -top-5 right-0 text-xs text-steel/60 font-mono">
              avg: {Math.round(avgDwell)} min
            </span>
          </div>
          
          {/* Threshold line */}
          <div 
            className="absolute left-0 right-0 border-t-2 border-dashed border-ember/40 z-10"
            style={{ bottom: `${(70 / maxDwell) * 100}%` }}
          >
            <span className="absolute -top-5 left-0 text-xs text-ember/80 font-mono">
              detention threshold: 70 min
            </span>
          </div>
          
          {/* Bars */}
          <div className="absolute inset-0 flex items-end gap-0.5">
            {dwellData.map((d, i) => {
              const isOutlier = d.dwell > 70;
              const height = (d.dwell / maxDwell) * 100;
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-t transition-all hover:opacity-80 ${
                    isOutlier ? 'bg-ember' : 'bg-neon/60'
                  }`}
                  style={{ height: `${height}%` }}
                  title={`${d.day}: ${d.dwell} min dwell, ${d.exceptions} exceptions`}
                />
              );
            })}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-neon/60" />
            <span className="text-steel/70">Normal days ({normalDays.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-ember" />
            <span className="text-steel/70">Outlier days ({outliers.length})</span>
          </div>
        </div>
      </Card>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <p className="text-3xl font-bold text-white">{Math.round(avgDwell)}</p>
          <p className="text-steel/60 text-xs">Avg Dwell (min)</p>
          <p className="text-steel/40 text-xs mt-1">Looks okay...</p>
        </Card>
        <Card className="p-4 text-center border-ember/30">
          <p className="text-3xl font-bold text-ember">{Math.round(outlierPct)}%</p>
          <p className="text-steel/60 text-xs">Outlier Days</p>
          <p className="text-ember/70 text-xs mt-1">Drive 60%+ of cost</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-3xl font-bold text-white">{Math.round(outlierAvg)}</p>
          <p className="text-steel/60 text-xs">Outlier Avg (min)</p>
          <p className="text-steel/40 text-xs mt-1">2x normal dwell</p>
        </Card>
        <Card className="p-4 text-center border-ember/30">
          <p className="text-3xl font-bold text-ember">${outlierExtraCost.toLocaleString()}</p>
          <p className="text-steel/60 text-xs">Monthly Impact*</p>
          <p className="text-steel/40 text-xs mt-1">Per facility</p>
        </Card>
      </div>
      
      {/* Key Insight */}
      <Card className="p-5 border-ember/30 bg-ember/5">
        <div className="flex items-start gap-4">
          <TrendingUp className="text-ember flex-shrink-0 mt-1" size={24} />
          <div>
            <p className="text-white font-semibold mb-2">
              The insight CFOs miss:
            </p>
            <p className="text-steel/80 text-sm leading-relaxed">
              Your 48-minute average dwell looks acceptable. But {outliers.length} days per month 
              exceed detention thresholds, triggering <strong>overtime, expedites, chargebacks, 
              and carrier disputes</strong>. These outliers don't show up in averages, but they 
              show up in your P&L as "operational variance."
            </p>
          </div>
        </div>
      </Card>
      
      {/* Disclaimer */}
      <p className="text-steel/50 text-xs text-center">
        * Illustrative model using industry benchmarks. Your variance pattern depends on facility type, carrier mix, and seasonality.
      </p>
    </div>
  );
}

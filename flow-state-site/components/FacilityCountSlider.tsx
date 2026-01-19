/**
 * FACILITY COUNT SLIDER
 * 
 * Purpose: Interactive network scaling visualization
 * Replaces hard-coded "4 sites" with reality-based facility count
 * Shows compounding proof points, pattern data, network intelligence
 * 
 * Canon: "Network effect is not marketing fluff. It is statistical reality."
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/motion-presets';

const FACILITY_PRESETS = [1, 10, 25, 100, 260, 500];
const DRIVERS_PER_FACILITY = 58;
const DAYS_PER_YEAR = 365;

interface FacilityCountSliderProps {
  className?: string;
}

export default function FacilityCountSlider({ className = '' }: FacilityCountSliderProps) {
  const [count, setCount] = useState(10);

  // Calculate network intelligence metrics
  const proofPoints = count * DRIVERS_PER_FACILITY * DAYS_PER_YEAR;
  const patternScenarios = count * 4; // Rough estimate: 4 major variance scenarios per facility
  const crossFacilityLearning = count > 1;

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`rounded-2xl border-2 border-neon/20 bg-carbon/30 p-8 ${className}`}
    >
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.15em] text-neon/70 font-semibold mb-2">
          Network Scaling Reality
        </p>
        <h3 className="text-3xl font-black text-white mb-4">
          {count} Facilit{count === 1 ? 'y' : 'ies'} in Your Network
        </h3>
        <p className="text-steel text-sm leading-relaxed">
          Network effect is not marketing fluff. It is statistical reality. 
          More proof points → tighter variance bands. More pattern data → better predictive models. 
          Standards create the foundation. The network amplifies the signal.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FACILITY_PRESETS.map((preset) => (
          <button
            key={preset}
            onClick={() => setCount(preset)}
            className={`
              px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300
              ${count === preset
                ? 'bg-neon text-void border-2 border-neon shadow-lg shadow-neon/30'
                : 'bg-carbon border-2 border-steel/20 text-steel hover:border-steel/40'
              }
            `}
            aria-pressed={count === preset}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div className="mb-8">
        <input
          type="range"
          min="1"
          max="500"
          step="1"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          className="w-full h-2 bg-steel/20 rounded-lg appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none 
                     [&::-webkit-slider-thumb]:w-6 
                     [&::-webkit-slider-thumb]:h-6 
                     [&::-webkit-slider-thumb]:rounded-full 
                     [&::-webkit-slider-thumb]:bg-neon
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:shadow-lg
                     [&::-webkit-slider-thumb]:shadow-neon/50
                     [&::-moz-range-thumb]:w-6 
                     [&::-moz-range-thumb]:h-6 
                     [&::-moz-range-thumb]:rounded-full 
                     [&::-moz-range-thumb]:bg-neon
                     [&::-moz-range-thumb]:cursor-pointer
                     [&::-moz-range-thumb]:border-0"
          aria-label="Facility count slider"
        />
        <div className="flex justify-between mt-2 text-xs text-steel/60 font-mono">
          <span>1</span>
          <span>500</span>
        </div>
      </div>

      {/* Network Intelligence Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Proof Points */}
        <div className="rounded-xl border border-neon/20 bg-neon/5 p-4">
          <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">
            Proof Points Collected
          </p>
          <p className="text-3xl font-black text-neon mb-1">
            {proofPoints.toLocaleString()}
          </p>
          <p className="text-xs text-steel/70 font-mono">
            {count} × {DRIVERS_PER_FACILITY} drivers × {DAYS_PER_YEAR} days
          </p>
        </div>

        {/* Pattern Library */}
        <div className="rounded-xl border border-neon/20 bg-neon/5 p-4">
          <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">
            Pattern Library Size
          </p>
          <p className="text-3xl font-black text-neon mb-1">
            {patternScenarios}+
          </p>
          <p className="text-xs text-steel/70">
            Variance scenarios mapped across network
          </p>
        </div>

        {/* Network Intelligence */}
        <div className="rounded-xl border border-neon/20 bg-neon/5 p-4">
          <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">
            Network Intelligence
          </p>
          <p className="text-3xl font-black text-neon mb-1">
            {crossFacilityLearning ? 'Enabled' : 'N/A'}
          </p>
          <p className="text-xs text-steel/70">
            {crossFacilityLearning 
              ? `Cross-facility learning active at ${count} nodes` 
              : 'Single facility mode'}
          </p>
        </div>
      </div>

      {/* Compounding Explanation */}
      <div className="mt-6 p-4 rounded-lg bg-void/50 border border-steel/10">
        <p className="text-sm text-steel leading-relaxed">
          <span className="font-semibold text-white">How compounding works:</span> 
          {' '}Each facility adds {DRIVERS_PER_FACILITY}×{DAYS_PER_YEAR} = {(DRIVERS_PER_FACILITY * DAYS_PER_YEAR).toLocaleString()} proof points per year. 
          Anomaly detection tightens as pattern library grows. 
          Standards reduce variance at each node. 
          Network amplifies the signal across {count} facilit{count === 1 ? 'y' : 'ies'}.
        </p>
      </div>

      {/* Illustrative Disclaimer */}
      <p className="mt-4 text-xs text-steel/60 italic">
        Illustrative example. Network effect magnitude varies by facility mix, operating hours, and data quality.
      </p>
    </motion.div>
  );
}

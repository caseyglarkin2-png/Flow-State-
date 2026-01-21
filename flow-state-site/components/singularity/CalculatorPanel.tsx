/**
 * CalculatorPanel Component
 * 
 * Main calculator panel that assembles all variance tax inputs.
 * Connects to the variance tax store for state management.
 */

'use client';

import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Download, RefreshCw } from 'lucide-react';
import { 
  IndustrialSlider, 
  IndustrialNumericInput 
} from '@/components/ui';
import { 
  useVarianceTaxStore, 
  useVarianceTaxOutputs,
  PRESETS,
  INPUT_CONSTRAINTS,
} from '@/src/lib/varianceTax';

interface SectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function Section({ title, defaultOpen = true, children }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-ebony-clay last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-1 text-left hover:text-neon transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
          {title}
        </h3>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-500" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-6 space-y-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface CalculatorPanelProps {
  className?: string;
}

export default function CalculatorPanel({ className = '' }: CalculatorPanelProps) {
  const { inputs, setInput, loadPreset, reset } = useVarianceTaxStore();
  const outputs = useVarianceTaxOutputs();

  const handleInputChange = useCallback(
    <K extends keyof typeof inputs>(key: K) => 
      (value: typeof inputs[K]) => {
        setInput(key, value);
      },
    [setInput]
  );

  const handleExport = useCallback(() => {
    const data = {
      inputs,
      outputs,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `variance-tax-scenario-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [inputs, outputs]);

  return (
    <div className={`bg-void/90 backdrop-blur-sm border border-ebony-clay rounded-xl ${className}`}>
      {/* Header with Total */}
      <div className="p-4 border-b border-ebony-clay">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-100">Variance Tax Calculator</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={reset}
              className="p-2 text-slate-500 hover:text-neon transition-colors"
              title="Reset to defaults"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleExport}
              className="p-2 text-slate-500 hover:text-neon transition-colors"
              title="Export scenario"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Total Variance Tax Display */}
        <div className="text-center py-4 bg-ebony-clay/50 rounded-lg">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
            Annual Variance Tax
          </p>
          <p className="text-3xl font-bold font-mono text-freightroll-red">
            ${outputs.totalVarianceTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Reynolds Score: <span className="text-neon">{(outputs.reynoldsScore * 100).toFixed(1)}%</span>
          </p>
        </div>

        {/* Preset Selector */}
        <div className="mt-4">
          <label className="block text-xs text-slate-500 mb-2">Load Scenario</label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => loadPreset(preset.id)}
                className="px-3 py-1.5 text-xs rounded-full border border-ebony-clay hover:border-neon/50 hover:text-neon transition-colors"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Sections */}
      <div className="p-4">
        {/* Volume & Throughput Section */}
        <Section title="Volume & Throughput" defaultOpen={true}>
          <IndustrialNumericInput
            label="Annual Load Volume"
            value={inputs.annualLoadVolume}
            onChange={handleInputChange('annualLoadVolume')}
            min={INPUT_CONSTRAINTS.annualLoadVolume.min}
            max={INPUT_CONSTRAINTS.annualLoadVolume.max}
            step={INPUT_CONSTRAINTS.annualLoadVolume.step}
            unit="loads/year"
            hint="Total annual truckload volume across all facilities"
          />

          <IndustrialSlider
            label="Missed Appointment Rate"
            value={inputs.missedAppointmentRate * 100}
            onChange={(v) => setInput('missedAppointmentRate', v / 100)}
            min={0}
            max={50}
            step={1}
            unit="%"
            hint="Rate of missed or rescheduled appointments"
          />

          <IndustrialNumericInput
            label="Spot Premium"
            value={inputs.spotPremium}
            onChange={handleInputChange('spotPremium')}
            min={INPUT_CONSTRAINTS.spotPremium.min}
            max={INPUT_CONSTRAINTS.spotPremium.max}
            step={INPUT_CONSTRAINTS.spotPremium.step}
            prefix="$"
            unit="/load"
            hint="Premium paid for spot/expedited freight recovery"
          />
        </Section>

        {/* Dwell Time & Detention Section */}
        <Section title="Dwell Time & Detention" defaultOpen={false}>
          <IndustrialSlider
            label="Average Dwell Time"
            value={inputs.averageDwellTime}
            onChange={handleInputChange('averageDwellTime')}
            min={INPUT_CONSTRAINTS.averageDwellTime.min}
            max={INPUT_CONSTRAINTS.averageDwellTime.max}
            step={INPUT_CONSTRAINTS.averageDwellTime.step}
            unit="hours"
            hint="Average time from gate-in to gate-out"
          />

          <IndustrialSlider
            label="Free Time"
            value={inputs.freeTime}
            onChange={handleInputChange('freeTime')}
            min={INPUT_CONSTRAINTS.freeTime.min}
            max={INPUT_CONSTRAINTS.freeTime.max}
            step={INPUT_CONSTRAINTS.freeTime.step}
            unit="hours"
            hint="Free time before detention charges begin"
          />

          <IndustrialNumericInput
            label="Detention Rate"
            value={inputs.detentionRate}
            onChange={handleInputChange('detentionRate')}
            min={INPUT_CONSTRAINTS.detentionRate.min}
            max={INPUT_CONSTRAINTS.detentionRate.max}
            step={INPUT_CONSTRAINTS.detentionRate.step}
            prefix="$"
            unit="/hr"
            hint="Hourly detention rate charged by carriers"
          />

          <IndustrialSlider
            label="Detention Frequency"
            value={inputs.detentionFrequency * 100}
            onChange={(v) => setInput('detentionFrequency', v / 100)}
            min={0}
            max={50}
            step={1}
            unit="%"
            hint="Percentage of loads that incur detention charges"
          />
        </Section>

        {/* Labor Costs Section */}
        <Section title="Labor Costs" defaultOpen={false}>
          <IndustrialNumericInput
            label="Guard Labor Rate"
            value={inputs.laborRateGuard}
            onChange={handleInputChange('laborRateGuard')}
            min={INPUT_CONSTRAINTS.laborRateGuard.min}
            max={INPUT_CONSTRAINTS.laborRateGuard.max}
            step={INPUT_CONSTRAINTS.laborRateGuard.step}
            prefix="$"
            unit="/hr"
            hint="Hourly rate for gate guard labor (fully loaded)"
          />

          <IndustrialNumericInput
            label="Jockey Labor Rate"
            value={inputs.laborRateJockey}
            onChange={handleInputChange('laborRateJockey')}
            min={INPUT_CONSTRAINTS.laborRateJockey.min}
            max={INPUT_CONSTRAINTS.laborRateJockey.max}
            step={INPUT_CONSTRAINTS.laborRateJockey.step}
            prefix="$"
            unit="/hr"
            hint="Hourly rate for yard jockey labor (fully loaded)"
          />

          <IndustrialSlider
            label="Manual Check-In Time"
            value={inputs.manualCheckInMinutes}
            onChange={handleInputChange('manualCheckInMinutes')}
            min={INPUT_CONSTRAINTS.manualCheckInMinutes.min}
            max={INPUT_CONSTRAINTS.manualCheckInMinutes.max}
            step={INPUT_CONSTRAINTS.manualCheckInMinutes.step}
            unit="min"
            hint="Time for manual check-in process"
          />

          <IndustrialSlider
            label="Digital Check-In Time"
            value={inputs.digitalCheckInMinutes}
            onChange={handleInputChange('digitalCheckInMinutes')}
            min={INPUT_CONSTRAINTS.digitalCheckInMinutes.min}
            max={INPUT_CONSTRAINTS.digitalCheckInMinutes.max}
            step={INPUT_CONSTRAINTS.digitalCheckInMinutes.step}
            unit="min"
            hint="Time for digital check-in process"
          />

          <IndustrialSlider
            label="Yard Hunting Frequency"
            value={inputs.yardHuntingFrequency * 100}
            onChange={(v) => setInput('yardHuntingFrequency', v / 100)}
            min={0}
            max={50}
            step={1}
            unit="%"
            hint="Percentage of loads requiring yard hunting"
          />

          <IndustrialSlider
            label="Yard Hunting Time"
            value={inputs.yardHuntingMinutes}
            onChange={handleInputChange('yardHuntingMinutes')}
            min={INPUT_CONSTRAINTS.yardHuntingMinutes.min}
            max={INPUT_CONSTRAINTS.yardHuntingMinutes.max}
            step={INPUT_CONSTRAINTS.yardHuntingMinutes.step}
            unit="min"
            hint="Time spent hunting for trailers in the yard"
          />
        </Section>

        {/* Compliance & Chargebacks Section */}
        <Section title="Compliance & Chargebacks" defaultOpen={false}>
          <IndustrialSlider
            label="Chargeback Rate"
            value={inputs.chargebackRate * 100}
            onChange={(v) => setInput('chargebackRate', v / 100)}
            min={0}
            max={15}
            step={0.5}
            unit="%"
            hint="Rate of chargebacks applied to failed deliveries"
          />

          <IndustrialSlider
            label="Compliance Failure Rate"
            value={inputs.complianceFailureRate * 100}
            onChange={(v) => setInput('complianceFailureRate', v / 100)}
            min={0}
            max={20}
            step={0.5}
            unit="%"
            hint="Rate of loads failing OTIF/compliance requirements"
          />

          <IndustrialNumericInput
            label="Average Invoice Value"
            value={inputs.averageInvoiceValue}
            onChange={handleInputChange('averageInvoiceValue')}
            min={INPUT_CONSTRAINTS.averageInvoiceValue.min}
            max={INPUT_CONSTRAINTS.averageInvoiceValue.max}
            step={INPUT_CONSTRAINTS.averageInvoiceValue.step}
            prefix="$"
            hint="Average invoice value for chargeback calculation"
          />
        </Section>

        {/* Working Capital Section */}
        <Section title="Working Capital" defaultOpen={false}>
          <IndustrialSlider
            label="Safety Stock Days"
            value={inputs.safetyStockDays}
            onChange={handleInputChange('safetyStockDays')}
            min={INPUT_CONSTRAINTS.safetyStockDays.min}
            max={INPUT_CONSTRAINTS.safetyStockDays.max}
            step={INPUT_CONSTRAINTS.safetyStockDays.step}
            unit="days"
            hint="Days of safety stock held due to yard variability"
          />

          <IndustrialNumericInput
            label="Daily Inventory Value"
            value={inputs.dailyInventoryValue}
            onChange={handleInputChange('dailyInventoryValue')}
            min={INPUT_CONSTRAINTS.dailyInventoryValue.min}
            max={INPUT_CONSTRAINTS.dailyInventoryValue.max}
            step={INPUT_CONSTRAINTS.dailyInventoryValue.step}
            prefix="$"
            hint="Value of one day's inventory"
          />

          <IndustrialSlider
            label="Holding Cost Rate"
            value={inputs.holdingCostRate * 100}
            onChange={(v) => setInput('holdingCostRate', v / 100)}
            min={10}
            max={40}
            step={1}
            unit="%"
            hint="Annual cost of holding inventory"
          />
        </Section>

        {/* Lost Sales Risk Section */}
        <Section title="Lost Sales Risk" defaultOpen={false}>
          <IndustrialSlider
            label="Stockout Risk"
            value={inputs.stockoutRisk * 100}
            onChange={(v) => setInput('stockoutRisk', v / 100)}
            min={0}
            max={10}
            step={0.5}
            unit="%"
            hint="Probability of stockout due to yard inefficiency"
          />

          <IndustrialNumericInput
            label="Annual Revenue"
            value={inputs.annualRevenue}
            onChange={handleInputChange('annualRevenue')}
            min={INPUT_CONSTRAINTS.annualRevenue.min}
            max={INPUT_CONSTRAINTS.annualRevenue.max}
            step={INPUT_CONSTRAINTS.annualRevenue.step}
            prefix="$"
            hint="Annual revenue at risk from stockouts"
          />

          <IndustrialSlider
            label="Margin Impact"
            value={inputs.marginImpact * 100}
            onChange={(v) => setInput('marginImpact', v / 100)}
            min={10}
            max={100}
            step={5}
            unit="%"
            hint="Margin impact multiplier for lost sales"
          />
        </Section>

        {/* Turn Time Section */}
        <Section title="Turn Time & Capacity" defaultOpen={false}>
          <IndustrialSlider
            label="Current Turn Time"
            value={inputs.currentTurnTimeMinutes}
            onChange={handleInputChange('currentTurnTimeMinutes')}
            min={INPUT_CONSTRAINTS.currentTurnTimeMinutes.min}
            max={INPUT_CONSTRAINTS.currentTurnTimeMinutes.max}
            step={INPUT_CONSTRAINTS.currentTurnTimeMinutes.step}
            unit="min"
            hint="Current average turn time (gate to dock assignment)"
          />

          <IndustrialSlider
            label="Target Turn Time"
            value={inputs.targetTurnTimeMinutes}
            onChange={handleInputChange('targetTurnTimeMinutes')}
            min={INPUT_CONSTRAINTS.targetTurnTimeMinutes.min}
            max={INPUT_CONSTRAINTS.targetTurnTimeMinutes.max}
            step={INPUT_CONSTRAINTS.targetTurnTimeMinutes.step}
            unit="min"
            hint="Target turn time with YardFlow optimization"
          />
        </Section>
      </div>
    </div>
  );
}

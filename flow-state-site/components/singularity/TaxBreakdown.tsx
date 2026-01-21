/**
 * TaxBreakdown Component
 * 
 * Displays the breakdown of all 6 cost components with animated values.
 * Includes tooltips, export functionality, and component percentages.
 */

'use client';

import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Info,
  TrendingDown,
  Clock,
  Users,
  AlertTriangle,
  Wallet,
  ShoppingCart,
} from 'lucide-react';
import { 
  useVarianceTaxStore,
  useFormattedOutputs,
  useVarianceTaxOutputs,
} from '@/src/lib/varianceTax';
import { useRollingCurrency, useRollingPercent } from '@/lib/hooks/useRollingNumber';

// ═══════════════════════════════════════════════════════════════════
// COMPONENT DEFINITIONS
// ═══════════════════════════════════════════════════════════════════

interface CostComponent {
  key: string;
  label: string;
  description: string;
  formula: string;
  icon: React.ReactNode;
  color: string;
}

const COST_COMPONENTS: CostComponent[] = [
  {
    key: 'recovery',
    label: 'A. Recovery Cost',
    description: 'Cost of expedited freight and spot premiums to recover from missed appointments',
    formula: 'Annual Load Volume × Missed Appointment Rate × Spot Premium',
    icon: <TrendingDown className="w-4 h-4" />,
    color: 'text-ember',
  },
  {
    key: 'detention',
    label: 'B. Detention Cost',
    description: 'Carrier detention fees incurred when trailers exceed free time',
    formula: '(Dwell Time - Free Time) × Detention Rate × Annual Volume × Detention Frequency',
    icon: <Clock className="w-4 h-4" />,
    color: 'text-cerulean',
  },
  {
    key: 'labor',
    label: 'C. Labor Variance',
    description: 'Waste from manual processes: gate check-in time and yard hunting',
    formula: 'Gate Waste (Manual vs Digital) + Hunt Waste (Jockey Time × Hunt Frequency)',
    icon: <Users className="w-4 h-4" />,
    color: 'text-neon',
  },
  {
    key: 'chargeback',
    label: 'D. Chargeback Cost',
    description: 'Penalties from retailers for compliance failures and OTIF misses',
    formula: 'Annual Volume × (Chargeback Rate + Compliance Failure Rate) × Invoice Value',
    icon: <AlertTriangle className="w-4 h-4" />,
    color: 'text-freightroll-red',
  },
  {
    key: 'workingCapital',
    label: 'E. Working Capital Drag',
    description: 'Cost of excess safety stock held due to yard variability',
    formula: 'Safety Stock Days × Daily Inventory Value × Holding Cost Rate',
    icon: <Wallet className="w-4 h-4" />,
    color: 'text-purple-400',
  },
  {
    key: 'lostSales',
    label: 'F. Lost Sales Risk',
    description: 'Revenue at risk from stockouts caused by yard inefficiency',
    formula: 'Stockout Risk × Annual Revenue × Margin Impact',
    icon: <ShoppingCart className="w-4 h-4" />,
    color: 'text-orange-400',
  },
];

// ═══════════════════════════════════════════════════════════════════
// TOOLTIP COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface TooltipProps {
  component: CostComponent;
  show: boolean;
}

function Tooltip({ component, show }: TooltipProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 5, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="absolute left-0 right-0 top-full mt-2 z-10 p-3 bg-void border border-ebony-clay rounded-lg shadow-xl"
        >
          <p className="text-sm text-slate-300 mb-2">{component.description}</p>
          <p className="text-xs text-slate-500 font-mono">{component.formula}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════════════
// COST ROW COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface CostRowProps {
  component: CostComponent;
  value: number;
  percentage: number;
}

function CostRow({ component, value, percentage }: CostRowProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const animatedValue = useRollingCurrency(value);
  const animatedPercent = useRollingPercent(percentage);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex items-center justify-between py-3 border-b border-ebony-clay/50 hover:bg-ebony-clay/20 transition-colors px-2 -mx-2 rounded">
        {/* Left: Icon + Label */}
        <div className="flex items-center gap-3 flex-1">
          <span className={component.color}>{component.icon}</span>
          <span className="text-sm text-slate-300">{component.label}</span>
          <button 
            className="text-slate-600 hover:text-slate-400 transition-colors"
            aria-label={`Info about ${component.label}`}
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Percentage + Value */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500 font-mono w-12 text-right">
            {animatedPercent}
          </span>
          <span className="text-sm font-mono text-slate-100 w-24 text-right">
            {animatedValue}
          </span>
        </div>
      </div>

      <Tooltip component={component} show={showTooltip} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TAX BREAKDOWN COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface TaxBreakdownProps {
  className?: string;
  showExport?: boolean;
}

export default function TaxBreakdown({ 
  className = '', 
  showExport = true 
}: TaxBreakdownProps) {
  const { inputs } = useVarianceTaxStore();
  const outputs = useVarianceTaxOutputs();
  const totalAnimated = useRollingCurrency(outputs.totalVarianceTax);

  const handleExport = useCallback(() => {
    const data = {
      scenario: 'Variance Tax Analysis',
      exportedAt: new Date().toISOString(),
      inputs,
      outputs: {
        totalVarianceTax: outputs.totalVarianceTax,
        components: {
          recoveryCost: outputs.recoveryCost,
          detentionCost: outputs.detentionCost,
          laborVarianceCost: outputs.laborVarianceCost,
          chargebackCost: outputs.chargebackCost,
          workingCapitalDrag: outputs.workingCapitalDrag,
          lostSalesRisk: outputs.lostSalesRisk,
        },
        percentages: outputs.componentPercentages,
        reynoldsScore: outputs.reynoldsScore,
        syntheticCapacity: outputs.syntheticCapacityPercent,
        costPerLoad: outputs.costPerLoad,
        monthlyRunRate: outputs.monthlyRunRate,
      },
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `variance-tax-breakdown-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [inputs, outputs]);

  // Map outputs to component values
  const componentValues: Record<string, { value: number; percentage: number }> = {
    recovery: { 
      value: outputs.recoveryCost, 
      percentage: outputs.componentPercentages.recovery 
    },
    detention: { 
      value: outputs.detentionCost, 
      percentage: outputs.componentPercentages.detention 
    },
    labor: { 
      value: outputs.laborVarianceCost, 
      percentage: outputs.componentPercentages.labor 
    },
    chargeback: { 
      value: outputs.chargebackCost, 
      percentage: outputs.componentPercentages.chargeback 
    },
    workingCapital: { 
      value: outputs.workingCapitalDrag, 
      percentage: outputs.componentPercentages.workingCapital 
    },
    lostSales: { 
      value: outputs.lostSalesRisk, 
      percentage: outputs.componentPercentages.lostSales 
    },
  };

  return (
    <div className={`bg-void/90 backdrop-blur-sm border border-ebony-clay rounded-xl ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-ebony-clay flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
          Variance Tax Breakdown
        </h3>
        {showExport && (
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-neon transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        )}
      </div>

      {/* Component Rows */}
      <div className="p-4">
        {COST_COMPONENTS.map((component) => (
          <CostRow
            key={component.key}
            component={component}
            value={componentValues[component.key]?.value ?? 0}
            percentage={componentValues[component.key]?.percentage ?? 0}
          />
        ))}
      </div>

      {/* Total Row */}
      <div className="p-4 border-t border-ebony-clay bg-ebony-clay/30">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-100">
            Total Annual Variance Tax
          </span>
          <span className="text-xl font-bold font-mono text-freightroll-red">
            {totalAnimated}
          </span>
        </div>
        
        {/* Secondary Metrics */}
        <div className="mt-3 pt-3 border-t border-ebony-clay/50 flex gap-6 text-xs text-slate-500">
          <div>
            <span className="block text-slate-400">Monthly Run Rate</span>
            <span className="font-mono text-slate-300">
              ${Math.round(outputs.monthlyRunRate).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="block text-slate-400">Cost Per Load</span>
            <span className="font-mono text-slate-300">
              ${outputs.costPerLoad.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="block text-slate-400">Synthetic Capacity</span>
            <span className="font-mono text-neon">
              +{outputs.syntheticCapacityPercent.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

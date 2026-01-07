import { calcRoiV2 } from './roi';
import type { Outputs, ScenarioInputs } from './types';
import { validateOutputs } from './validate';

function safeDivide(a: number, b: number): number {
  return b === 0 ? 0 : a / b;
}

export function calcScenario(inputs: ScenarioInputs): Outputs {
  const profit = inputs.profit;

  // Derive the per-truckload profit used for capacity unlocked value.
  const perTruckloadProfit =
    profit.method === 'avoided_outsourcing'
      ? Math.max(0, profit.outsourcedCostPerTruckload - profit.internalVariableCostPerTruckload)
      : Math.max(0, profit.contributionMarginPerTruckload);

  // Keep ROI engine consistent by mapping capacity value to the same per-truck profit basis.
  const roiInputs = {
    ...inputs.roi,
    throughput: {
      ...inputs.roi.throughput,
      incrementalMarginPerTruck: perTruckloadProfit,
    },
  };

  const roi = calcRoiV2(roiInputs);

  // Capacity unlocked (truckloads) - derived from the cycle-time constraint model.
  const baselineCycleTimeMinutes = Math.max(0.0001, Math.max(0, roiInputs.throughput.avgGateInToOutMinutes));
  const minutesSavedTotal =
    Math.max(0, roiInputs.throughput.reduceCheckInMinutes) + Math.max(0, roiInputs.throughput.reduceCheckOutMinutes);
  const improved = Math.max(0.0001, baselineCycleTimeMinutes - minutesSavedTotal);

  const theoreticalGain = safeDivide(baselineCycleTimeMinutes, improved) - 1;
  const theoreticalThroughputGainPct = Math.max(0, theoreticalGain);
  const realizedGainPct = theoreticalThroughputGainPct * Math.max(0, roiInputs.throughput.realizedShare);

  const currentOutboundTruckloadsPerYear = roi.totalShipmentsPerYear * Math.max(0, roiInputs.throughput.outboundShare);
  const incrementalOutboundTruckloadsPerYear = currentOutboundTruckloadsPerYear * realizedGainPct;

  const annualProfitImpact = incrementalOutboundTruckloadsPerYear * perTruckloadProfit;

  // Year-1 ramped values (match savings ramp behavior)
  const yearOneRamp = Math.max(0, Math.min(1, roiInputs.yearOneRampShare));
  const yearOneIncrementalTruckloads = incrementalOutboundTruckloadsPerYear * yearOneRamp;
  const yearOneProfitImpact = yearOneIncrementalTruckloads * perTruckloadProfit;

  const hardSavingsAnnual = roi.annualLaborSavings + roi.paperlessSavings + roi.annualDetentionSavings;

  // CFO finance outputs (kept canonical so pages don't re-derive inconsistently)
  const discountRate = Math.max(0, inputs.discountRate);
  const growthRate = inputs.growthRate;

  const yearOneCashflow = roi.yearOneGrossSavings - roi.annualSubscription;

  const fiveYearNPV =
    -roi.implementationCost +
    safeDivide(yearOneCashflow, Math.pow(1 + discountRate, 1)) +
    Array.from({ length: 4 }, (_, i) => {
      const t = i + 2;
      const annualCashflow = roi.totalAnnualSavings * Math.pow(1 + growthRate, i + 1) - roi.annualSubscription;
      return safeDivide(annualCashflow, Math.pow(1 + discountRate, t));
    }).reduce((a, b) => a + b, 0);

  const savingsPerFacility = roi.totalFacilities > 0 ? roi.yearOneGrossSavings / roi.totalFacilities : 0;
  const costOfDelay90Days = roi.yearOneGrossSavings / 4;

  const out: Outputs = {
    roi,
    hardSavingsAnnual,
    capacity: {
      baselineCycleTimeMinutes,
      minutesSavedTotal,
      theoreticalThroughputGainPct,
      realizedGainPct,
      currentOutboundTruckloadsPerYear,
      incrementalOutboundTruckloadsPerYear,
      annualProfitImpact,
      yearOneIncrementalTruckloads,
      yearOneProfitImpact,
    },
    finance: {
      yearOneCashflow,
      fiveYearNPV,
      costOfDelay90Days,
      savingsPerFacility,
    },
    warnings: [],
  };

  return validateOutputs(out);
}

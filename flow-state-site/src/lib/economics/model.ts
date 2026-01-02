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

  // Capacity unlocked (truckloads) — derived from the cycle-time constraint model.
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

  const hardSavingsAnnual = roi.annualLaborSavings + roi.paperlessSavings + roi.annualDetentionSavings;

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
    },
    warnings: [],
  };

  return validateOutputs(out);
}

import type { Outputs } from './types';

export function validateOutputs(out: Outputs): Outputs {
  const warnings: string[] = [...(out.warnings ?? [])];

  const finiteOrWarn = (label: string, n: number) => {
    if (!Number.isFinite(n)) warnings.push(`${label} is not finite`);
  };

  finiteOrWarn('totalAnnualSavings', out.roi.totalAnnualSavings);
  finiteOrWarn('paybackMonths', out.roi.paybackMonths);
  finiteOrWarn('fiveYearValue', out.roi.fiveYearValue);
  finiteOrWarn('capacity.incrementalOutboundTruckloadsPerYear', out.capacity.incrementalOutboundTruckloadsPerYear);
  finiteOrWarn('capacity.annualProfitImpact', out.capacity.annualProfitImpact);
  finiteOrWarn('finance.fiveYearNPV', out.finance.fiveYearNPV);
  finiteOrWarn('finance.costOfDelay90Days', out.finance.costOfDelay90Days);

  // Guardrail: extreme ROI values are highly assumption-sensitive.
  if (Number.isFinite(out.roi.yearOneRoiPercent) && out.roi.yearOneRoiPercent > 5000) {
    warnings.push('Year-1 ROI is highly assumption-sensitive (> 5000%).');
  }

  // Guardrail: network multiplier can explode for large n; warn on extreme values.
  // Note: We warn rather than alter the canonical formula.
  if (Number.isFinite(out.roi.networkMultiplier) && out.roi.networkMultiplier > 6) {
    warnings.push('Network multiplier exceeds 6× (highly assumption-sensitive in Year 1).');
  }

  return { ...out, warnings };
}

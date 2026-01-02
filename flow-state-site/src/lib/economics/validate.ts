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

  // Guardrail: extreme ROI values are highly assumption-sensitive.
  if (Number.isFinite(out.roi.yearOneRoiPercent) && out.roi.yearOneRoiPercent > 5000) {
    warnings.push('Year-1 ROI is highly assumption-sensitive (> 5000%).');
  }

  return { ...out, warnings };
}

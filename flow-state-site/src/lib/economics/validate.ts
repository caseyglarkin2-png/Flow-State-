import type { Outputs } from './types';

/**
 * ECONOMICS GUARDRAILS
 * 
 * Prevents absurd outputs that kill credibility with enterprise buyers.
 * CFOs will reject any model that shows:
 * - >500% Year-1 ROI (enterprise software doesn't do that)
 * - <1 month payback (implementation alone takes longer)
 * - Infinite or NaN values anywhere
 * 
 * Philosophy: Better to cap/warn than to show unbelievable numbers.
 * A conservative estimate that proves true > an aggressive estimate that doesn't.
 */

export interface ValidationResult {
  valid: boolean;
  warnings: string[];
  errors: string[];
}

/**
 * Validate ROI outputs for credibility with enterprise buyers
 */
export function validateROICredibility(out: Outputs): ValidationResult {
  const warnings: string[] = [];
  const errors: string[] = [];

  // Check for non-finite values (deal-breakers)
  if (!Number.isFinite(out.roi.yearOneRoiPercent)) {
    errors.push('Year-1 ROI is not a finite number. Check input assumptions.');
  }
  
  if (!Number.isFinite(out.roi.paybackMonths)) {
    errors.push('Payback period is not a finite number. Check cost/savings assumptions.');
  }

  // GUARDRAIL 1: ROI sanity check
  // Enterprise software rarely exceeds 500% Year-1 ROI in practice
  if (Number.isFinite(out.roi.yearOneRoiPercent)) {
    if (out.roi.yearOneRoiPercent > 1000) {
      warnings.push('Year-1 ROI >1000% is extremely rare for enterprise software. Consider conservative scenario.');
    } else if (out.roi.yearOneRoiPercent > 500) {
      warnings.push('Year-1 ROI >500% is uncommon. Verify assumptions with historical data.');
    }
    
    if (out.roi.yearOneRoiPercent < 0) {
      warnings.push('Negative ROI in Year 1. Network may be too small for cost recovery.');
    }
  }

  // GUARDRAIL 2: Payback period sanity check
  // Implementation takes 6-8 weeks per facility + learning curve
  if (Number.isFinite(out.roi.paybackMonths)) {
    if (out.roi.paybackMonths < 1) {
      warnings.push('Payback <1 month is unrealistic for enterprise deployment. Check Year-1 ramp assumptions.');
    }
    
    if (out.roi.paybackMonths > 120) {
      warnings.push('Payback >10 years. Network may not justify investment at current scale.');
    }
  }

  // GUARDRAIL 3: Network multiplier sanity check
  // Metcalfe multiplier can explode for large networks; cap warnings
  if (Number.isFinite(out.roi.networkMultiplier)) {
    if (out.roi.networkMultiplier > 10) {
      warnings.push('Network multiplier >10× is highly assumption-sensitive. Conservative scenario recommended.');
    } else if (out.roi.networkMultiplier > 6) {
      warnings.push('Network multiplier >6× assumes mature network effects. Verify beta/tau parameters.');
    }
  }

  // GUARDRAIL 4: Throughput capacity check
  // Can't increase capacity by >25% without infrastructure changes
  const baseSavingsWithoutThroughput = out.roi.baseSavings - (out.roi.throughputValue || 0);
  if (Number.isFinite(out.roi.throughputValue) && baseSavingsWithoutThroughput > 0) {
    const throughputAsPercent = (out.roi.throughputValue / baseSavingsWithoutThroughput) * 100;
    if (throughputAsPercent > 50) {
      warnings.push(`Throughput gains (${Math.round(throughputAsPercent)}% of base savings) may require infrastructure changes.`);
    }
  }

  // GUARDRAIL 5: Base savings floor check
  // Paperless + labor should provide minimum floor of value
  if (Number.isFinite(out.roi.baseSavings) && out.roi.baseSavings < 50000) {
    warnings.push('Base savings are very low. Verify facility count and operational assumptions.');
  }

  return {
    valid: errors.length === 0,
    warnings,
    errors,
  };
}

export function validateOutputs(out: Outputs): Outputs {
  const validation = validateROICredibility(out);
  
  // Combine validation warnings with any existing warnings
  const warnings: string[] = [...(out.warnings ?? []), ...validation.warnings, ...validation.errors];

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

  return { ...out, warnings };
}

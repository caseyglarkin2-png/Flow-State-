/**
 * Aggregate Variance Tax Calculator
 * 
 * Computes all 6 cost components and derived metrics
 * from a set of inputs.
 */

import type { VarianceTaxInputs, VarianceTaxOutputs } from './types';
import {
  calcRecoveryCost,
  calcDetentionCost,
  calcLaborVarianceCost,
  calcChargebackCost,
  calcWorkingCapitalDrag,
  calcLostSalesRisk,
  calcSyntheticCapacity,
  calcReynoldsScore,
} from './formulas';

/**
 * Calculate all Variance Tax components and derived metrics
 * 
 * @param inputs - Full calculator inputs
 * @returns Complete output object with all components and metrics
 */
export function calcVarianceTax(inputs: VarianceTaxInputs): VarianceTaxOutputs {
  // Calculate each component
  const recoveryCost = calcRecoveryCost(inputs);
  const detentionCost = calcDetentionCost(inputs);
  const laborBreakdown = calcLaborVarianceCost(inputs);
  const laborVarianceCost = laborBreakdown.total;
  const chargebackCost = calcChargebackCost(inputs);
  const workingCapitalDrag = calcWorkingCapitalDrag(inputs);
  const lostSalesRisk = calcLostSalesRisk(inputs);
  
  // Sum all components
  const totalVarianceTax = 
    recoveryCost + 
    detentionCost + 
    laborVarianceCost + 
    chargebackCost + 
    workingCapitalDrag + 
    lostSalesRisk;
  
  // Calculate derived metrics
  const syntheticCapacityPercent = calcSyntheticCapacity(
    inputs.currentTurnTimeMinutes,
    inputs.targetTurnTimeMinutes
  );
  const reynoldsScore = calcReynoldsScore(inputs);
  
  // Cost per load
  const costPerLoad = inputs.annualLoadVolume > 0 
    ? totalVarianceTax / inputs.annualLoadVolume 
    : 0;
  
  // Monthly run rate
  const monthlyRunRate = totalVarianceTax / 12;
  
  // Component percentages (avoid division by zero)
  const componentPercentages = totalVarianceTax > 0 
    ? {
        recovery: (recoveryCost / totalVarianceTax) * 100,
        detention: (detentionCost / totalVarianceTax) * 100,
        labor: (laborVarianceCost / totalVarianceTax) * 100,
        chargeback: (chargebackCost / totalVarianceTax) * 100,
        workingCapital: (workingCapitalDrag / totalVarianceTax) * 100,
        lostSales: (lostSalesRisk / totalVarianceTax) * 100,
      }
    : {
        recovery: 0,
        detention: 0,
        labor: 0,
        chargeback: 0,
        workingCapital: 0,
        lostSales: 0,
      };
  
  return {
    // Components
    recoveryCost,
    detentionCost,
    laborVarianceCost,
    laborBreakdown,
    chargebackCost,
    workingCapitalDrag,
    lostSalesRisk,
    
    // Summary
    totalVarianceTax,
    syntheticCapacityPercent,
    reynoldsScore,
    costPerLoad,
    monthlyRunRate,
    componentPercentages,
  };
}

import type { RoiV2Inputs, RoiV2Outputs } from './roiTypes';

export type ProfitMethod = 'contribution_margin' | 'avoided_outsourcing';

export interface ProfitAssumptions {
  method: ProfitMethod;

  /**
   * Used when method === 'contribution_margin'.
   * Contribution margin (or incremental profit) per incremental truckload.
   */
  contributionMarginPerTruckload: number;

  /**
   * Used when method === 'avoided_outsourcing'.
   * Delta = outsourcedCost - internalVariableCost.
   */
  outsourcedCostPerTruckload: number;
  internalVariableCostPerTruckload: number;
}

export interface ScenarioInputs {
  /** ROI v2 inputs (truckloads/year are the unit of "shipments") */
  roi: RoiV2Inputs;

  /** How to convert incremental truckloads into profit impact */
  profit: ProfitAssumptions;

  /** Financial modeling assumptions */
  discountRate: number; // e.g. 0.10
  growthRate: number; // e.g. 0.02
}

export interface CapacityUnlockedOutputs {
  baselineCycleTimeMinutes: number;
  minutesSavedTotal: number;
  theoreticalThroughputGainPct: number;
  realizedGainPct: number;

  /** Steady-state (full rollout) values */
  currentOutboundTruckloadsPerYear: number;
  incrementalOutboundTruckloadsPerYear: number;
  annualProfitImpact: number;

  /** Year-1 ramped values (scaled by yearOneRampShare) */
  yearOneIncrementalTruckloads: number;
  yearOneProfitImpact: number;
}

export interface Outputs {
  roi: RoiV2Outputs;

  hardSavingsAnnual: number;
  capacity: CapacityUnlockedOutputs;

  finance: {
    yearOneCashflow: number;
    fiveYearNPV: number;
    costOfDelay90Days: number;
    savingsPerFacility: number;
  };

  warnings: string[];
}

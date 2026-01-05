import type { RoiV1Inputs, RoiV2Inputs } from './roiTypes';
import { roiV2InputsFromQuickMode } from './roi';

export type EconomicsScenarioId = 'pilot_1' | 'regional_10' | 'enterprise_50' | 'primo_260';
export type EconomicsMode = 'conservative' | 'expected' | 'upside';

export const DEFAULT_SCENARIO_ID: EconomicsScenarioId = 'enterprise_50';
export const DEFAULT_MODE: EconomicsMode = 'expected';

export const ECONOMICS_SCENARIOS: Record<
  EconomicsScenarioId,
  { id: EconomicsScenarioId; label: string; facilities: number }
> = {
  pilot_1: { id: 'pilot_1', label: 'Pilot (1 site)', facilities: 1 },
  regional_10: { id: 'regional_10', label: 'Network (10 sites)', facilities: 10 },
  enterprise_50: { id: 'enterprise_50', label: 'Network (50 sites)', facilities: 50 },
  primo_260: { id: 'primo_260', label: 'Enterprise (260 sites)', facilities: 260 },
};

export const ECONOMICS_MODES: Record<
  EconomicsMode,
  {
    id: EconomicsMode;
    label: string;
    description: string;
    trucksPerDayPerFacility: number;
    avgDwellTimeMinutes: number;
    detentionCostPerHour: number;
    laborCostPerHour: number;
    gateStaffPerFacility: number;

    // Canonical Metcalfe-inspired network effect parameters
    networkBeta: number;
    networkTau: number;
  }
> = {
  conservative: {
    id: 'conservative',
    label: 'Conservative',
    description: 'Higher costs, lower throughput gains',
    trucksPerDayPerFacility: 120,
    avgDwellTimeMinutes: 60,
    detentionCostPerHour: 85,
    laborCostPerHour: 32,
    gateStaffPerFacility: 5,

    networkBeta: 0.003,
    networkTau: 60,
  },
  expected: {
    id: 'expected',
    label: 'Expected',
    description: 'Industry-standard assumptions',
    trucksPerDayPerFacility: 150,
    avgDwellTimeMinutes: 55,
    detentionCostPerHour: 75,
    laborCostPerHour: 28,
    gateStaffPerFacility: 4,

    networkBeta: 0.004,
    networkTau: 45,
  },
  upside: {
    id: 'upside',
    label: 'Upside',
    description: 'Optimistic throughput, lower costs',
    trucksPerDayPerFacility: 180,
    avgDwellTimeMinutes: 50,
    detentionCostPerHour: 65,
    laborCostPerHour: 25,
    gateStaffPerFacility: 3,

    networkBeta: 0.006,
    networkTau: 35,
  },
};

export function getQuickInputsForPreset(scenarioId: EconomicsScenarioId, mode: EconomicsMode): RoiV1Inputs {
  const scenario = ECONOMICS_SCENARIOS[scenarioId];
  const m = ECONOMICS_MODES[mode];

  return {
    facilities: scenario.facilities,
    trucksPerDayPerFacility: m.trucksPerDayPerFacility,
    avgDwellTimeMinutes: m.avgDwellTimeMinutes,
    detentionCostPerHour: m.detentionCostPerHour,
    laborCostPerHour: m.laborCostPerHour,
    gateStaffPerFacility: m.gateStaffPerFacility,
  };
}

export function getRoiV2InputsForPreset(scenarioId: EconomicsScenarioId, mode: EconomicsMode): RoiV2Inputs {
  const m = ECONOMICS_MODES[mode];

  return {
    ...roiV2InputsFromQuickMode(getQuickInputsForPreset(scenarioId, mode)),
    network: {
      beta: m.networkBeta,
      tau: m.networkTau,
    },
  };
}

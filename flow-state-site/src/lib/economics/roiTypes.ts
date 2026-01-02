export type Percent = number;

export interface RoiV1Inputs {
  facilities: number;
  trucksPerDayPerFacility: number;
  avgDwellTimeMinutes: number;
  detentionCostPerHour: number;
  laborCostPerHour: number;
  gateStaffPerFacility: number;
}

export interface RoiV1Outputs {
  networkMultiplier: number;
  newDwellTimeMinutes: number;
  timeSavedPerTruckMinutes: number;
  annualTimeSavedMinutes: number;

  annualDetentionSavings: number;
  annualLaborSavings: number;
  throughputValue: number;
  paperlessSavings: number;

  baseSavings: number;
  networkBonusSavings: number;
  totalAnnualSavings: number;

  implementationCost: number;
  annualSubscription: number;

  yearOneNetGain: number;
  yearOneRoiPercent: number;
  paybackMonths: number;
  fiveYearValue: number;
}

export type FacilityTier = 'XL' | 'L' | 'M' | 'S';

export interface RoiFacilityTierInputs {
  count: number;
  shipmentsPerDay: number;
  operatingDaysPerYear: number;
  dcFteAnnualCost: number;
}

export interface RoiLaborTierAssumptions {
  dockOfficeFtePerShift: number;
  shiftsPerDay: number;
  dockOfficeTimeShareOnDriverProcess: Percent;
  dockOfficeTimeSavingsShare: Percent;

  guardFtePerShift: number;
  guardAutomationShare: Percent;
}

export interface RoiLaborAssumptions {
  tiers: Record<FacilityTier, RoiLaborTierAssumptions>;
}

export interface RoiPaperAssumptions {
  pagesPerBol: number;
  bolsPerShipment: number;
  otherPagesPerShipment: number;

  outboundShare: Percent;

  printingCostPerPage: number;
  storageCostPerPage: number;

  phase1SavedShare: Percent;
}

export interface RoiShipperOfChoiceAssumptions {
  costPerShipment: number;
  paidByCustomerShare: Percent;
  nonOwnedFleetShare: Percent;

  shipperOfChoiceDiscountShare: Percent;
  realizedShare: Percent;
}

export interface RoiDetentionAssumptions {
  detentionBudgetShareOfTransport: Percent;
  atFacilitiesShare: Percent;

  avgDetentionHours: number;
  costPerHourDetention: number;

  claimsShare15to30MinOver: Percent;
  claimsShare30PlusMinOver: Percent;
}

export interface RoiThroughputAssumptions {
  avgGateInToOutMinutes: number;
  reduceCheckInMinutes: number;
  reduceCheckOutMinutes: number;
  realizedShare: Percent;

  outboundShare: Percent;
  incrementalMarginPerTruck: number;
}

export interface RoiNetworkAssumptions {
  logFactor: number;
}

export interface NetworkEffectBreakdown {
  predictiveIntelligence: {
    etaAccuracyImprovement: number;
    planningSavings: number;
  };
  carrierBenchmarking: {
    dataPointsShared: number;
    negotiationLeverage: number;
  };
  coordinationEfficiency: {
    variabilityReduction: number;
    bufferSavings: number;
  };
  sharedLearning: {
    onboardingAcceleration: number;
    errorReduction: number;
  };
  totalNetworkBonus: number;
  effectiveMultiplier: number;
}

export interface RoiCommercialAssumptions {
  implementationBaseCost: number;
  implementationCostPerFacility: number;

  annualSubscriptionPerFacility: number;
}

export interface RoiEnterpriseAddOnsPerShipment {
  lostBolsLostSales: number;
  manualWmsFailoverSavings: number;
  dockClerkProductivity: number;
  missedDeliveries: number;
  yardSpotterProductivity: number;
  osdSearchTime: number;
  detentionClaimsReduction: number;
}

export interface RoiEnterpriseAddOns {
  perShipment: RoiEnterpriseAddOnsPerShipment;
}

export interface RoiV2Inputs {
  tiers: Record<FacilityTier, RoiFacilityTierInputs>;

  labor: RoiLaborAssumptions;
  paper: RoiPaperAssumptions;
  shipper: RoiShipperOfChoiceAssumptions;
  detention: RoiDetentionAssumptions;
  throughput: RoiThroughputAssumptions;
  network: RoiNetworkAssumptions;
  commercial: RoiCommercialAssumptions;

  enterpriseAddOns: RoiEnterpriseAddOns;

  yearOneRampShare: Percent;
}

export interface RoiEnterpriseAddOnsOutputs {
  laborPerShipment: number;
  detentionPerShipment: number;
  throughputPerShipment: number;

  annualLaborSavings: number;
  annualDetentionSavings: number;
  throughputValue: number;

  totalAnnualValue: number;
}

export interface RoiV2Outputs {
  totalFacilities: number;
  totalShipmentsPerYear: number;
  outboundShipmentsPerYear: number;

  annualLaborSavings: number;
  paperlessSavings: number;
  annualDetentionSavings: number;
  throughputValue: number;
  shipperOfChoiceValue: number;

  baseSavings: number;
  networkMultiplier: number;
  networkBonusSavings: number;
  networkEffectBreakdown: NetworkEffectBreakdown;
  totalAnnualSavings: number;

  implementationCost: number;
  annualSubscription: number;

  yearOneGrossSavings: number;
  yearOneNetGain: number;
  yearOneRoiPercent: number;
  paybackMonths: number;
  fiveYearValue: number;

  enterpriseAddOns: RoiEnterpriseAddOnsOutputs;

  assumptionsUsed: RoiV2Inputs;
}

import type {
  Percent,
  RoiV1Inputs,
  RoiV1Outputs,
  RoiV2Inputs,
  RoiV2Outputs,
  FacilityTier,
  NetworkEffectBreakdown,
} from './types';

function clampPercent(value: number): Percent {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

function safeDivide(numerator: number, denominator: number): number {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return 0;
  return numerator / denominator;
}

function sum(values: number[]): number {
  return values.reduce((acc, v) => acc + v, 0);
}

/**
 * Calculate detailed network effect breakdown
 * Based on research-backed value streams from connected facility networks
 * 
 * Key insight: Network effects are MINIMAL for small networks (1-5 sites)
 * and compound meaningfully only at scale (10+ sites)
 */
function calculateNetworkEffectBreakdown(
  facilities: number,
  shipmentsPerYear: number,
  baseSavings: number,
  logFactor: number
): NetworkEffectBreakdown {
  const n = Math.max(1, facilities);
  
  // Network effects only matter if logFactor > 0 AND we have multiple facilities
  if (logFactor <= 0 || n <= 1) {
    return {
      predictiveIntelligence: { etaAccuracyImprovement: 0, planningSavings: 0 },
      carrierBenchmarking: { dataPointsShared: 0, negotiationLeverage: 0 },
      coordinationEfficiency: { variabilityReduction: 0, bufferSavings: 0 },
      sharedLearning: { onboardingAcceleration: 0, errorReduction: 0 },
      totalNetworkBonus: 0,
      effectiveMultiplier: 1,
    };
  }
  
  // Network connections = n(n-1)/2 (Metcalfe's Law)
  const connections = (n * (n - 1)) / 2;
  
  // CRITICAL: Scale factor that makes network effect minimal for small networks
  // At 5 facilities: 0.2 (20% of full effect)
  // At 10 facilities: 0.45 (45% of full effect)
  // At 25 facilities: 0.75 (75% of full effect)
  // At 50+ facilities: ~0.95 (near full effect)
  const networkMaturityFactor = 1 - Math.exp(-n / 20);
  
  // 1. PREDICTIVE INTELLIGENCE
  // More data = better ETA predictions, but only meaningful with enough data points
  // Threshold: Need 5+ facilities before predictions improve meaningfully
  const etaAccuracyBase = Math.min(0.25, Math.log(Math.max(1, n - 4) + 1) * 0.06); // 0-25%
  const etaAccuracyImprovement = etaAccuracyBase * networkMaturityFactor;
  // Better ETAs = better dock scheduling = $1.50-3 per shipment at scale
  const planningValuePerShipment = 1.5 * etaAccuracyImprovement;
  const planningSavings = planningValuePerShipment * shipmentsPerYear * networkMaturityFactor;
  
  // 2. CARRIER BENCHMARKING  
  // Cross-network performance data creates negotiation leverage
  // Only meaningful with 10+ facilities of data
  const carrierThreshold = Math.max(0, n - 8) / n; // 0% at 8, grows from there
  const carrierLeveragePercent = Math.min(0.02, 0.003 + Math.log(Math.max(1, n - 5) + 1) * 0.004);
  // Assume $150 avg transport cost per shipment, 60% third-party
  const thirdPartySpend = shipmentsPerYear * 0.6 * 150;
  const negotiationLeverage = thirdPartySpend * carrierLeveragePercent * carrierThreshold * networkMaturityFactor;
  const dataPointsShared = connections * 30 * networkMaturityFactor;
  
  // 3. COORDINATION EFFICIENCY
  // Reduced variability across network = smaller buffers needed
  // Minimal effect until 10+ coordinated sites
  const variabilityBase = Math.min(0.20, Math.log2(Math.max(1, n - 5) + 1) * 0.04); // Up to 20%
  const variabilityReduction = variabilityBase * networkMaturityFactor;
  // Buffer cost is ~5% of base savings, reduced by variability improvement
  const bufferCostBase = baseSavings * 0.05;
  const bufferSavings = bufferCostBase * variabilityReduction;
  
  // 4. SHARED LEARNING
  // Faster onboarding: new sites inherit patterns from existing network
  // Only meaningful if there's a network to learn from (5+ sites)
  const onboardingBase = Math.min(45, Math.log(Math.max(1, n - 3) + 1) * 12); // Up to 45 days
  const onboardingAcceleration = onboardingBase * networkMaturityFactor;
  const onboardingValuePerDay = 400; // $ lost productivity per day
  const annualNewSites = Math.max(0, Math.ceil(n * 0.08)); // 8% network growth
  const onboardingSavings = onboardingAcceleration * onboardingValuePerDay * annualNewSites;
  
  // Error patterns recognized across network
  const errorReductionBase = Math.min(0.12, Math.log(Math.max(1, n - 5) + 1) * 0.025); // Up to 12%
  const errorReductionPercent = errorReductionBase * networkMaturityFactor;
  const errorCostBase = shipmentsPerYear * 0.30; // $0.30 error cost per shipment baseline
  const errorReduction = errorCostBase * errorReductionPercent;
  
  const sharedLearningSavings = onboardingSavings + errorReduction;
  
  // TOTAL NETWORK BONUS
  const totalNetworkBonus = planningSavings + negotiationLeverage + bufferSavings + sharedLearningSavings;
  
  // Effective multiplier based on actual calculated benefits
  const effectiveMultiplier = baseSavings > 0 ? (baseSavings + totalNetworkBonus) / baseSavings : 1;
  
  return {
    predictiveIntelligence: {
      etaAccuracyImprovement: etaAccuracyImprovement * 100, // as percentage
      planningSavings,
    },
    carrierBenchmarking: {
      dataPointsShared,
      negotiationLeverage,
    },
    coordinationEfficiency: {
      variabilityReduction: variabilityReduction * 100, // as percentage
      bufferSavings,
    },
    sharedLearning: {
      onboardingAcceleration,
      errorReduction: sharedLearningSavings,
    },
    totalNetworkBonus,
    effectiveMultiplier,
  };
}

export function calcRoiV1(inputs: RoiV1Inputs): RoiV1Outputs {
  const facilities = Math.max(0, Math.floor(inputs.facilities));
  const trucksPerDay = Math.max(0, inputs.trucksPerDayPerFacility);
  const avgDwellTime = Math.max(0, inputs.avgDwellTimeMinutes);
  const detentionCost = Math.max(0, inputs.detentionCostPerHour);
  const laborCostPerHour = Math.max(0, inputs.laborCostPerHour);
  const gateStaff = Math.max(0, inputs.gateStaffPerFacility);

  // Network effect multiplier based on Metcalfe's Law (as implemented in the current UI)
  const networkMultiplier = 1 + Math.log(facilities + 1) * 0.5;

  // Time savings
  const newDwellTimeMinutes = avgDwellTime * 0.5; // 50% reduction
  const timeSavedPerTruckMinutes = avgDwellTime - newDwellTimeMinutes;
  const annualTimeSavedMinutes = timeSavedPerTruckMinutes * trucksPerDay * 365 * facilities;

  // Detention savings
  const detentionReduction = 0.65; // 65%
  const annualDetentionSavings =
    trucksPerDay * 0.15 * detentionCost * 365 * facilities * detentionReduction;

  // Labor savings (gate automation)
  const laborSavingsPerFacility = gateStaff * 0.7 * laborCostPerHour * 2080; // 70% reduction, 2080 hrs/yr
  const annualLaborSavings = laborSavingsPerFacility * facilities;

  // Throughput increase value
  const throughputIncrease = 0.42; // 42%
  const valuePerTruck = 45;
  const throughputValue = trucksPerDay * throughputIncrease * valuePerTruck * 365 * facilities;

  // Paperless savings
  const paperlessSavings = 15 * trucksPerDay * 365 * facilities;

  // Total before network effect
  const baseSavings = annualDetentionSavings + annualLaborSavings + throughputValue + paperlessSavings;

  // Apply network effect
  const networkBonusSavings = baseSavings * (networkMultiplier - 1);
  const totalAnnualSavings = baseSavings + networkBonusSavings;

  // Implementation cost
  // Commercial terms (site default): $2,500 one-time per facility + $8,000 per facility annually.
  const implementationCost = facilities * 2500;
  const annualSubscription = facilities * 8000;

  // ROI calculations
  const yearOneNetGain = totalAnnualSavings - implementationCost - annualSubscription;
  const yearOneRoiPercent = safeDivide(totalAnnualSavings - annualSubscription, implementationCost) * 100;
  const paybackMonths = safeDivide(implementationCost, safeDivide(totalAnnualSavings - annualSubscription, 12));

  // 5-year projections (2% annual growth in savings from optimization)
  const fiveYearValue =
    sum(
      Array.from({ length: 5 }, (_, i) => totalAnnualSavings * Math.pow(1.02, i) - annualSubscription),
    ) - implementationCost;

  return {
    networkMultiplier,
    newDwellTimeMinutes,
    timeSavedPerTruckMinutes,
    annualTimeSavedMinutes,
    annualDetentionSavings,
    annualLaborSavings,
    throughputValue,
    paperlessSavings,
    baseSavings,
    networkBonusSavings,
    totalAnnualSavings,
    implementationCost,
    annualSubscription,
    yearOneNetGain,
    yearOneRoiPercent,
    paybackMonths,
    fiveYearValue,
  };
}

export function roiV2InputsFromQuickMode(quick: RoiV1Inputs): RoiV2Inputs {
  const facilities = Math.max(0, Math.floor(quick.facilities));
  const shipmentsPerDayPerFacility = Math.max(0, quick.trucksPerDayPerFacility);
  const operatingDaysPerYear = 365;

  const totalShipmentsPerYear = facilities * shipmentsPerDayPerFacility * operatingDaysPerYear;
  const v1 = calcRoiV1(quick);

  const laborPerShipment = safeDivide(v1.annualLaborSavings, totalShipmentsPerYear);
  const detentionPerShipment = safeDivide(v1.annualDetentionSavings, totalShipmentsPerYear);
  const throughputPerShipment = safeDivide(v1.throughputValue, totalShipmentsPerYear);
  const paperPerShipment = safeDivide(v1.paperlessSavings, totalShipmentsPerYear);

  // Build a unified V2 input set where the V1 quick-mode economics are represented
  // as additive per-shipment opportunities. This makes Quick Mode a V2-compatible
  // profile, while allowing Pro Mode to expose/override underlying assumptions.
  return {
    tiers: {
      // Treat the quick-mode facility network as a single tier for simplicity.
      XL: { count: 0, shipmentsPerDay: 0, operatingDaysPerYear, dcFteAnnualCost: 0 },
      L: { count: 0, shipmentsPerDay: 0, operatingDaysPerYear, dcFteAnnualCost: 0 },
      M: {
        count: facilities,
        shipmentsPerDay: shipmentsPerDayPerFacility,
        operatingDaysPerYear,
        dcFteAnnualCost: Math.max(0, quick.laborCostPerHour) * 2080,
      },
      S: { count: 0, shipmentsPerDay: 0, operatingDaysPerYear, dcFteAnnualCost: 0 },
    },
    labor: {
      tiers: {
        XL: {
          dockOfficeFtePerShift: 0,
          shiftsPerDay: 0,
          dockOfficeTimeShareOnDriverProcess: 0,
          dockOfficeTimeSavingsShare: 0,
          guardFtePerShift: 0,
          guardAutomationShare: 0,
        },
        L: {
          dockOfficeFtePerShift: 0,
          shiftsPerDay: 0,
          dockOfficeTimeShareOnDriverProcess: 0,
          dockOfficeTimeSavingsShare: 0,
          guardFtePerShift: 0,
          guardAutomationShare: 0,
        },
        M: {
          dockOfficeFtePerShift: 0,
          shiftsPerDay: 0,
          dockOfficeTimeShareOnDriverProcess: 0,
          dockOfficeTimeSavingsShare: 0,
          guardFtePerShift: 0,
          guardAutomationShare: 0,
        },
        S: {
          dockOfficeFtePerShift: 0,
          shiftsPerDay: 0,
          dockOfficeTimeShareOnDriverProcess: 0,
          dockOfficeTimeSavingsShare: 0,
          guardFtePerShift: 0,
          guardAutomationShare: 0,
        },
      },
    },
    paper: {
      // Encode the quick-mode paper savings as $/shipment by using 1 page/shipment.
      pagesPerBol: 1,
      bolsPerShipment: 1,
      otherPagesPerShipment: 0,
      outboundShare: 1,
      printingCostPerPage: Math.max(0, paperPerShipment),
      storageCostPerPage: 0,
      phase1SavedShare: 1,
    },
    shipper: {
      costPerShipment: 0,
      paidByCustomerShare: 0,
      nonOwnedFleetShare: 0,
      shipperOfChoiceDiscountShare: 0,
      realizedShare: 0,
    },
    detention: {
      detentionBudgetShareOfTransport: 0,
      atFacilitiesShare: 0,
      avgDetentionHours: 0,
      costPerHourDetention: 0,
      claimsShare15to30MinOver: 0,
      claimsShare30PlusMinOver: 0,
    },
    throughput: {
      avgGateInToOutMinutes: 0,
      reduceCheckInMinutes: 0,
      reduceCheckOutMinutes: 0,
      realizedShare: 0,
      outboundShare: 0,
      incrementalMarginPerTruck: 0,
    },
    network: {
      // Match V1 quick-mode network effect.
      logFactor: 0.5,
    },
    commercial: {
      // Match the site's default commercial terms.
      implementationBaseCost: 0,
      implementationCostPerFacility: 2500,
      annualSubscriptionPerFacility: 8000,
    },
    enterpriseAddOns: {
      perShipment: {
        lostBolsLostSales: 0,
        manualWmsFailoverSavings: 0,
        dockClerkProductivity: Math.max(0, laborPerShipment),
        missedDeliveries: Math.max(0, throughputPerShipment),
        yardSpotterProductivity: 0,
        osdSearchTime: 0,
        detentionClaimsReduction: Math.max(0, detentionPerShipment),
      },
    },
    yearOneRampShare: 1,
  };
}

export function defaultRoiV2Inputs(): RoiV2Inputs {
  // Defaults aligned to the "Example Customer Opportunity" section in BT ROI CalculatorV2.xlsx.
  return {
    tiers: {
      XL: { count: 20, shipmentsPerDay: 200, operatingDaysPerYear: 365, dcFteAnnualCost: 60000 },
      L: { count: 25, shipmentsPerDay: 100, operatingDaysPerYear: 365, dcFteAnnualCost: 60000 },
      M: { count: 100, shipmentsPerDay: 65, operatingDaysPerYear: 250, dcFteAnnualCost: 60000 },
      S: { count: 200, shipmentsPerDay: 25, operatingDaysPerYear: 250, dcFteAnnualCost: 60000 },
    },
    labor: {
      tiers: {
        XL: {
          dockOfficeFtePerShift: 2,
          shiftsPerDay: 4,
          dockOfficeTimeShareOnDriverProcess: 0.25,
          dockOfficeTimeSavingsShare: 0.9,
          guardFtePerShift: 2,
          guardAutomationShare: 0.5,
        },
        L: {
          dockOfficeFtePerShift: 1.5,
          shiftsPerDay: 3,
          dockOfficeTimeShareOnDriverProcess: 0.25,
          dockOfficeTimeSavingsShare: 0.9,
          guardFtePerShift: 1,
          guardAutomationShare: 0.5,
        },
        M: {
          dockOfficeFtePerShift: 1.5,
          shiftsPerDay: 2,
          dockOfficeTimeShareOnDriverProcess: 0.33,
          dockOfficeTimeSavingsShare: 0.9,
          guardFtePerShift: 1,
          guardAutomationShare: 0.5,
        },
        S: {
          dockOfficeFtePerShift: 1,
          shiftsPerDay: 1,
          dockOfficeTimeShareOnDriverProcess: 0.5,
          dockOfficeTimeSavingsShare: 0.9,
          guardFtePerShift: 0,
          guardAutomationShare: 0.5,
        },
      },
    },
    paper: {
      pagesPerBol: 3,
      bolsPerShipment: 3,
      otherPagesPerShipment: 0,
      outboundShare: 0.6,
      printingCostPerPage: 0.08,
      storageCostPerPage: 0.02,
      phase1SavedShare: 0,
    },
    shipper: {
      costPerShipment: 750,
      paidByCustomerShare: 0.2,
      nonOwnedFleetShare: 0.9,
      shipperOfChoiceDiscountShare: 0.11,
      realizedShare: 0.1,
    },
    detention: {
      detentionBudgetShareOfTransport: 0.01,
      atFacilitiesShare: 0.4,
      avgDetentionHours: 1.5,
      costPerHourDetention: 50,
      claimsShare15to30MinOver: 0.4,
      claimsShare30PlusMinOver: 0.6,
    },
    throughput: {
      avgGateInToOutMinutes: 50,
      // Spreadsheet baseline scenario uses 5 min check-in + 5 min check-out.
      reduceCheckInMinutes: 5,
      reduceCheckOutMinutes: 5,
      realizedShare: 0.1,
      outboundShare: 0.6,
      incrementalMarginPerTruck: 500,
    },
    network: {
      // Spreadsheet model does not include a network effect; keep default as 0 so V2 matches.
      logFactor: 0,
    },
    commercial: {
      // Pricing is not modeled in the spreadsheets; use the site's default commercial terms.
      implementationBaseCost: 0,
      implementationCostPerFacility: 2500,
      annualSubscriptionPerFacility: 8000,
    },
    enterpriseAddOns: {
      perShipment: {
        lostBolsLostSales: 0,
        manualWmsFailoverSavings: 0,
        dockClerkProductivity: 0,
        missedDeliveries: 0,
        yardSpotterProductivity: 0,
        osdSearchTime: 0,
        detentionClaimsReduction: 0,
      },
    },
    yearOneRampShare: 1,
  };
}

export function defaultRoiV2InputsLineage(): RoiV2Inputs {
  // Defaults aligned to the top-of-sheet assumptions + summary outputs
  // in `Lineage ROI Calc 1.25.xlsx` (ROI sheet rows 2-8 and 17-25).
  // This runs through the unified Pro model via enterprise add-ons.
  return {
    tiers: {
      XL: { count: 6, shipmentsPerDay: 180, operatingDaysPerYear: 365, dcFteAnnualCost: 60000 },
      L: { count: 8, shipmentsPerDay: 90, operatingDaysPerYear: 365, dcFteAnnualCost: 60000 },
      M: { count: 6, shipmentsPerDay: 40, operatingDaysPerYear: 250, dcFteAnnualCost: 60000 },
      S: { count: 5, shipmentsPerDay: 15, operatingDaysPerYear: 250, dcFteAnnualCost: 60000 },
    },
    labor: {
      tiers: {
        // Disable BT labor by default for the Lineage scenario (enterprise add-ons carry the values).
        XL: {
          dockOfficeFtePerShift: 0,
          shiftsPerDay: 0,
          dockOfficeTimeShareOnDriverProcess: 0,
          dockOfficeTimeSavingsShare: 0,
          guardFtePerShift: 0,
          guardAutomationShare: 0,
        },
        L: {
          dockOfficeFtePerShift: 0,
          shiftsPerDay: 0,
          dockOfficeTimeShareOnDriverProcess: 0,
          dockOfficeTimeSavingsShare: 0,
          guardFtePerShift: 0,
          guardAutomationShare: 0,
        },
        M: {
          dockOfficeFtePerShift: 0,
          shiftsPerDay: 0,
          dockOfficeTimeShareOnDriverProcess: 0,
          dockOfficeTimeSavingsShare: 0,
          guardFtePerShift: 0,
          guardAutomationShare: 0,
        },
        S: {
          dockOfficeFtePerShift: 0,
          shiftsPerDay: 0,
          dockOfficeTimeShareOnDriverProcess: 0,
          dockOfficeTimeSavingsShare: 0,
          guardFtePerShift: 0,
          guardAutomationShare: 0,
        },
      },
    },
    paper: {
      // Matches Lineage per-shipment paper opportunity:
      // - Pages per shipment: 5.5
      // - Cost per page: 0.08
      // - % realized (effective): 0.504545...
      pagesPerBol: 1.5,
      bolsPerShipment: 3,
      otherPagesPerShipment: 1,
      outboundShare: 1,
      printingCostPerPage: 0.08,
      storageCostPerPage: 0,
      phase1SavedShare: 0.5045454545454545,
    },
    shipper: {
      // Disable BT shipper-of-choice by default for Lineage scenario.
      costPerShipment: 0,
      paidByCustomerShare: 0,
      nonOwnedFleetShare: 0,
      shipperOfChoiceDiscountShare: 0,
      realizedShare: 0,
    },
    detention: {
      // Disable BT detention by default for Lineage scenario.
      detentionBudgetShareOfTransport: 0,
      atFacilitiesShare: 0,
      avgDetentionHours: 0,
      costPerHourDetention: 0,
      claimsShare15to30MinOver: 0,
      claimsShare30PlusMinOver: 0,
    },
    throughput: {
      // Disable BT throughput by default for Lineage scenario (enterprise add-ons cover missed deliveries/lost sales).
      avgGateInToOutMinutes: 0,
      reduceCheckInMinutes: 0,
      reduceCheckOutMinutes: 0,
      realizedShare: 0,
      outboundShare: 0,
      incrementalMarginPerTruck: 0,
    },
    network: {
      logFactor: 0,
    },
    commercial: {
      implementationBaseCost: 0,
      implementationCostPerFacility: 2500,
      annualSubscriptionPerFacility: 8000,
    },
    enterpriseAddOns: {
      perShipment: {
        // Lineage ROI sheet (rows 17-24): $/shipment values.
        lostBolsLostSales: 0.1125,
        manualWmsFailoverSavings: 0,
        dockClerkProductivity: 0.8154943934760448,
        missedDeliveries: 0.24375,
        yardSpotterProductivity: 0,
        osdSearchTime: 0,
        detentionClaimsReduction: 0.45535714285714285,
      },
    },
    yearOneRampShare: 1,
  };
}

export function calcRoiV2(rawInputs: RoiV2Inputs): RoiV2Outputs {
  // Clamp/normalize all percent-like inputs so the model is stable.
  const inputs: RoiV2Inputs = {
    ...rawInputs,
    labor: {
      ...rawInputs.labor,
      tiers: {
        XL: {
          ...rawInputs.labor.tiers.XL,
          dockOfficeTimeShareOnDriverProcess: clampPercent(
            rawInputs.labor.tiers.XL.dockOfficeTimeShareOnDriverProcess,
          ),
          dockOfficeTimeSavingsShare: clampPercent(rawInputs.labor.tiers.XL.dockOfficeTimeSavingsShare),
          guardAutomationShare: clampPercent(rawInputs.labor.tiers.XL.guardAutomationShare),
        },
        L: {
          ...rawInputs.labor.tiers.L,
          dockOfficeTimeShareOnDriverProcess: clampPercent(
            rawInputs.labor.tiers.L.dockOfficeTimeShareOnDriverProcess,
          ),
          dockOfficeTimeSavingsShare: clampPercent(rawInputs.labor.tiers.L.dockOfficeTimeSavingsShare),
          guardAutomationShare: clampPercent(rawInputs.labor.tiers.L.guardAutomationShare),
        },
        M: {
          ...rawInputs.labor.tiers.M,
          dockOfficeTimeShareOnDriverProcess: clampPercent(
            rawInputs.labor.tiers.M.dockOfficeTimeShareOnDriverProcess,
          ),
          dockOfficeTimeSavingsShare: clampPercent(rawInputs.labor.tiers.M.dockOfficeTimeSavingsShare),
          guardAutomationShare: clampPercent(rawInputs.labor.tiers.M.guardAutomationShare),
        },
        S: {
          ...rawInputs.labor.tiers.S,
          dockOfficeTimeShareOnDriverProcess: clampPercent(
            rawInputs.labor.tiers.S.dockOfficeTimeShareOnDriverProcess,
          ),
          dockOfficeTimeSavingsShare: clampPercent(rawInputs.labor.tiers.S.dockOfficeTimeSavingsShare),
          guardAutomationShare: clampPercent(rawInputs.labor.tiers.S.guardAutomationShare),
        },
      },
    },
    paper: {
      ...rawInputs.paper,
      outboundShare: clampPercent(rawInputs.paper.outboundShare),
      phase1SavedShare: clampPercent(rawInputs.paper.phase1SavedShare),
    },
    shipper: {
      ...rawInputs.shipper,
      paidByCustomerShare: clampPercent(rawInputs.shipper.paidByCustomerShare),
      nonOwnedFleetShare: clampPercent(rawInputs.shipper.nonOwnedFleetShare),
      shipperOfChoiceDiscountShare: clampPercent(rawInputs.shipper.shipperOfChoiceDiscountShare),
      realizedShare: clampPercent(rawInputs.shipper.realizedShare),
    },
    detention: {
      ...rawInputs.detention,
      detentionBudgetShareOfTransport: clampPercent(rawInputs.detention.detentionBudgetShareOfTransport),
      atFacilitiesShare: clampPercent(rawInputs.detention.atFacilitiesShare),
      claimsShare15to30MinOver: clampPercent(rawInputs.detention.claimsShare15to30MinOver),
      claimsShare30PlusMinOver: clampPercent(rawInputs.detention.claimsShare30PlusMinOver),
    },
    throughput: {
      ...rawInputs.throughput,
      realizedShare: clampPercent(rawInputs.throughput.realizedShare),
      outboundShare: clampPercent(rawInputs.throughput.outboundShare),
    },
    network: {
      ...rawInputs.network,
    },
    commercial: {
      ...rawInputs.commercial,
    },
    enterpriseAddOns: {
      perShipment: {
        lostBolsLostSales: Math.max(0, rawInputs.enterpriseAddOns?.perShipment?.lostBolsLostSales ?? 0),
        manualWmsFailoverSavings: Math.max(0, rawInputs.enterpriseAddOns?.perShipment?.manualWmsFailoverSavings ?? 0),
        dockClerkProductivity: Math.max(0, rawInputs.enterpriseAddOns?.perShipment?.dockClerkProductivity ?? 0),
        missedDeliveries: Math.max(0, rawInputs.enterpriseAddOns?.perShipment?.missedDeliveries ?? 0),
        yardSpotterProductivity: Math.max(0, rawInputs.enterpriseAddOns?.perShipment?.yardSpotterProductivity ?? 0),
        osdSearchTime: Math.max(0, rawInputs.enterpriseAddOns?.perShipment?.osdSearchTime ?? 0),
        detentionClaimsReduction: Math.max(0, rawInputs.enterpriseAddOns?.perShipment?.detentionClaimsReduction ?? 0),
      },
    },
    yearOneRampShare: clampPercent(rawInputs.yearOneRampShare),
  };

  const totalFacilities = (Object.values(inputs.tiers) as Array<{ count: number }>).reduce(
    (acc, tier) => acc + Math.max(0, Math.floor(tier.count)),
    0,
  );

  const tiers: FacilityTier[] = ['XL', 'L', 'M', 'S'];

  const shipmentsPerYearByTier: Record<FacilityTier, number> = {
    XL: 0,
    L: 0,
    M: 0,
    S: 0,
  };

  const facilityCounts: Record<FacilityTier, number> = {
    XL: Math.max(0, Math.floor(inputs.tiers.XL.count)),
    L: Math.max(0, Math.floor(inputs.tiers.L.count)),
    M: Math.max(0, Math.floor(inputs.tiers.M.count)),
    S: Math.max(0, Math.floor(inputs.tiers.S.count)),
  };

  for (const tier of tiers) {
    const shipmentsPerDay = Math.max(0, inputs.tiers[tier].shipmentsPerDay);
    const operatingDays = Math.max(0, inputs.tiers[tier].operatingDaysPerYear);
    shipmentsPerYearByTier[tier] = shipmentsPerDay * operatingDays;
  }

  const totalShipmentsPerYear = tiers.reduce(
    (acc, tier) => acc + shipmentsPerYearByTier[tier] * facilityCounts[tier],
    0,
  );

  const outboundShipmentsPerYear = totalShipmentsPerYear * inputs.paper.outboundShare;

  // LABOR (BT spreadsheet):
  // Dock office saved FTE = ROUNDDOWN((dockFtePerShift * shiftsPerDay) * timeShare * timeSavings, 0)
  // Guard saved FTE      = ROUNDDOWN((guardFtePerShift * shiftsPerDay) * 1 * automationShare, 0)
  // Savings per facility = dcFteAnnualCost * (savedDockFte + savedGuardFte)
  let annualLaborSavings = 0;

  for (const tier of tiers) {
    const shiftsPerDay = Math.max(0, inputs.labor.tiers[tier].shiftsPerDay);
    const dockOfficeFtePerShift = Math.max(0, inputs.labor.tiers[tier].dockOfficeFtePerShift);
    const dockTimeShare = inputs.labor.tiers[tier].dockOfficeTimeShareOnDriverProcess;
    const dockTimeSavings = inputs.labor.tiers[tier].dockOfficeTimeSavingsShare;

    const dockOfficeFtePerWh = dockOfficeFtePerShift * shiftsPerDay;
    const dockOfficeSavedFte = Math.floor(dockOfficeFtePerWh * dockTimeShare * dockTimeSavings);

    const guardFtePerShift = Math.max(0, inputs.labor.tiers[tier].guardFtePerShift);
    const guardFtePerWh = guardFtePerShift * shiftsPerDay;
    const guardSavedFte = Math.floor(guardFtePerWh * 1 * inputs.labor.tiers[tier].guardAutomationShare);

    const savedFteTotal = Math.max(0, dockOfficeSavedFte + guardSavedFte);

    const annualCostPerFte = Math.max(0, inputs.tiers[tier].dcFteAnnualCost);
    const savingsPerFacility = savedFteTotal * annualCostPerFte;
    annualLaborSavings += savingsPerFacility * facilityCounts[tier];
  }

  // ENTERPRISE ADD-ONS (Unified Pro model)
  // These mirror Lineage-style opportunity rows as additive $/shipment components.
  // We map them into existing UI buckets:
  // - Labor: dock clerk + yard spotter + OS&D search time
  // - Detention: detention claim reduction
  // - Throughput/Other hard savings: lost BOLs + WMS failover + missed deliveries
  const enterpriseLaborPerShipment =
    inputs.enterpriseAddOns.perShipment.dockClerkProductivity +
    inputs.enterpriseAddOns.perShipment.yardSpotterProductivity +
    inputs.enterpriseAddOns.perShipment.osdSearchTime;

  const enterpriseDetentionPerShipment = inputs.enterpriseAddOns.perShipment.detentionClaimsReduction;

  const enterpriseThroughputPerShipment =
    inputs.enterpriseAddOns.perShipment.lostBolsLostSales +
    inputs.enterpriseAddOns.perShipment.manualWmsFailoverSavings +
    inputs.enterpriseAddOns.perShipment.missedDeliveries;

  const enterpriseAnnualLaborSavings = enterpriseLaborPerShipment * totalShipmentsPerYear;
  const enterpriseAnnualDetentionSavings = enterpriseDetentionPerShipment * totalShipmentsPerYear;
  const enterpriseAnnualThroughputValue = enterpriseThroughputPerShipment * totalShipmentsPerYear;

  annualLaborSavings += enterpriseAnnualLaborSavings;

  // PAPER (BT spreadsheet): pages/yr = pagesPerShipment * shipments/yr * outbound%
  // $/page = printing + storage
  // phase1SavedShare drives the savings (default 0 in the sheet)
  const bolPagesPerShipment = Math.max(0, inputs.paper.pagesPerBol) * Math.max(0, inputs.paper.bolsPerShipment);
  const pagesPerShipment = bolPagesPerShipment + Math.max(0, inputs.paper.otherPagesPerShipment);
  const pagesPerYear = pagesPerShipment * totalShipmentsPerYear * inputs.paper.outboundShare;
  const costPerPage = Math.max(0, inputs.paper.printingCostPerPage) + Math.max(0, inputs.paper.storageCostPerPage);
  const paperlessSavings = pagesPerYear * costPerPage * inputs.paper.phase1SavedShare;

  // SHIPPER OF CHOICE (BT spreadsheet)
  // transportBudget = shipments * $/ship * paidByCustomer% * nonOwnedFleet%
  // realizedPerShipment = $/ship * discount% * realized%
  // shipperValue = realizedPerShipment * shipments * paidByCustomer% * nonOwnedFleet%
  const transportBudget =
    totalShipmentsPerYear *
    Math.max(0, inputs.shipper.costPerShipment) *
    inputs.shipper.paidByCustomerShare *
    inputs.shipper.nonOwnedFleetShare;

  const realizedPerShipment =
    Math.max(0, inputs.shipper.costPerShipment) *
    inputs.shipper.shipperOfChoiceDiscountShare *
    inputs.shipper.realizedShare;

  const shipperOfChoiceValue =
    realizedPerShipment * totalShipmentsPerYear * inputs.shipper.paidByCustomerShare * inputs.shipper.nonOwnedFleetShare;

  // DETENTION (BT spreadsheet)
  // Replicates the sheet's bucketed claim math and (crucially) uses an UNWEIGHTED
  // average of the two bucket $/shipment values.
  const detentionDollars = transportBudget * inputs.detention.detentionBudgetShareOfTransport;
  const avgDetentionClaimDollars =
    Math.max(0.0001, Math.max(0, inputs.detention.avgDetentionHours) * Math.max(0, inputs.detention.costPerHourDetention));

  const totalDetentionClaims = safeDivide(detentionDollars, avgDetentionClaimDollars);
  const claims15to30 = totalDetentionClaims * inputs.detention.claimsShare15to30MinOver;
  const claims30plus = totalDetentionClaims * inputs.detention.claimsShare30PlusMinOver;

  // Spreadsheet: $ per claim (1 hr) == $/hour.
  const savingsPerClaim = Math.max(0, inputs.detention.costPerHourDetention);

  const shipmentsThirdParty = safeDivide(transportBudget, Math.max(0.0001, inputs.shipper.costPerShipment));
  const perShipment15to30 = safeDivide(claims15to30 * savingsPerClaim, shipmentsThirdParty);
  const perShipment30plus = safeDivide(claims30plus * savingsPerClaim, shipmentsThirdParty);
  const detentionSavingsPerShipment = (perShipment15to30 + perShipment30plus) / 2;

  const annualDetentionSavings = detentionSavingsPerShipment * totalShipmentsPerYear + enterpriseAnnualDetentionSavings;

  // THROUGHPUT (BT spreadsheet)
  // realizedImprovement = ((baseline / (baseline - reduction)) - 1) * realizedShare
  // incrementalOutboundShipments = outboundShipments * realizedImprovement
  // perShipmentThroughput = (incrementalOutboundShipments * margin) / totalShipments
  const baselineGate = Math.max(0.0001, Math.max(0, inputs.throughput.avgGateInToOutMinutes));
  const reductionMinutes = Math.max(0, inputs.throughput.reduceCheckInMinutes) + Math.max(0, inputs.throughput.reduceCheckOutMinutes);
  const improvedGate = Math.max(0.0001, baselineGate - reductionMinutes);
  const theoreticalImprovement = safeDivide(baselineGate, improvedGate) - 1;
  const realizedImprovement = Math.max(0, theoreticalImprovement) * inputs.throughput.realizedShare;

  const outboundBase = totalShipmentsPerYear * inputs.throughput.outboundShare;
  const incrementalOutboundShipments = outboundBase * realizedImprovement;
  const perShipmentThroughput = safeDivide(
    incrementalOutboundShipments * Math.max(0, inputs.throughput.incrementalMarginPerTruck),
    totalShipmentsPerYear,
  );
  const yardThroughputValue = perShipmentThroughput * totalShipmentsPerYear;

  // To keep the existing UI breakdown cards intact, we roll shipper-of-choice into throughput.
  const throughputValue = yardThroughputValue + shipperOfChoiceValue + enterpriseAnnualThroughputValue;

  // Network effect multiplier (parameterized)
  const networkMultiplier = 1 + Math.log(totalFacilities + 1) * Math.max(0, inputs.network.logFactor);

  const baseSavings = annualLaborSavings + paperlessSavings + annualDetentionSavings + throughputValue;
  
  // Calculate detailed network effect breakdown
  const networkEffectBreakdown = calculateNetworkEffectBreakdown(
    totalFacilities,
    totalShipmentsPerYear,
    baseSavings,
    inputs.network.logFactor
  );
  
  // Use the calculated network bonus from the breakdown (more accurate than simple multiplier)
  const networkBonusSavings = inputs.network.logFactor > 0 
    ? networkEffectBreakdown.totalNetworkBonus 
    : 0;
  const totalAnnualSavings = baseSavings + networkBonusSavings;

  const implementationCost =
    Math.max(0, inputs.commercial.implementationBaseCost) +
    totalFacilities * Math.max(0, inputs.commercial.implementationCostPerFacility);

  const annualSubscription = totalFacilities * Math.max(0, inputs.commercial.annualSubscriptionPerFacility);

  const yearOneGrossSavings = totalAnnualSavings * inputs.yearOneRampShare;

  const yearOneNetGain = yearOneGrossSavings - implementationCost - annualSubscription;

  const yearOneCostBasis = implementationCost + annualSubscription;
  const yearOneRoiPercent = safeDivide(yearOneNetGain, yearOneCostBasis) * 100;

  const netAnnualBenefitForPayback = Math.max(0, yearOneGrossSavings - annualSubscription);
  const paybackMonths = safeDivide(implementationCost, safeDivide(netAnnualBenefitForPayback, 12));

  const fiveYearValue = sum(
    Array.from({ length: 5 }, (_, i) => totalAnnualSavings * Math.pow(1.02, i) - annualSubscription),
  ) - implementationCost;

  return {
    totalFacilities,
    totalShipmentsPerYear,
    outboundShipmentsPerYear,
    annualLaborSavings,
    paperlessSavings,
    annualDetentionSavings,
    throughputValue,
    shipperOfChoiceValue,
    baseSavings,
    networkMultiplier,
    networkBonusSavings,
    networkEffectBreakdown,
    totalAnnualSavings,
    implementationCost,
    annualSubscription,
    yearOneGrossSavings,
    yearOneNetGain,
    yearOneRoiPercent,
    paybackMonths,
    fiveYearValue,
    enterpriseAddOns: {
      laborPerShipment: enterpriseLaborPerShipment,
      detentionPerShipment: enterpriseDetentionPerShipment,
      throughputPerShipment: enterpriseThroughputPerShipment,
      annualLaborSavings: enterpriseAnnualLaborSavings,
      annualDetentionSavings: enterpriseAnnualDetentionSavings,
      throughputValue: enterpriseAnnualThroughputValue,
      totalAnnualValue:
        enterpriseAnnualLaborSavings + enterpriseAnnualDetentionSavings + enterpriseAnnualThroughputValue,
    },
    assumptionsUsed: inputs,
  };
}

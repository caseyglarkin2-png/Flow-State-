// ROI Calculation Tests
// Run with: npx ts-node --esm src/__tests__/roi.test.ts

import {
  calcRoiV1,
  calcRoiV2,
  defaultRoiV2Inputs,
  defaultRoiV2InputsLineage,
  roiV2InputsFromQuickMode,
} from '../lib/roi/calc';

import {
  calcRoiV2 as calcRoiV2Economics,
  getQuickInputsForPreset,
  getRoiV2InputsForPreset,
} from '../lib/economics';

let passed = 0;
let failed = 0;

function approxEqual(a: number, b: number, tolerance: number): boolean {
  return Math.abs(a - b) <= tolerance;
}

function test(name: string, fn: () => boolean) {
  try {
    if (fn()) {
      passed++;
      console.log(`[PASS] ${name}`);
    } else {
      failed++;
      console.log(`[FAIL] ${name}`);
    }
  } catch (err) {
    failed++;
    console.log(`[ERROR] ${name}: ${err}`);
  }
}

test('calcRoiV1(default UI inputs) matches expected outputs', () => {
  const out = calcRoiV1({
    facilities: 5,
    trucksPerDayPerFacility: 150,
    avgDwellTimeMinutes: 48,
    detentionCostPerHour: 75,
    laborCostPerHour: 28,
    gateStaffPerFacility: 3,
  });

  // Updated to reflect new paper-first ROI model:
  // - Paperless: $11,900/facility guaranteed (was $15/truck)
  // - Throughput: 10% capacity increase at $500/truck margin (was 42% at $45/truck)
  // If you change calcRoiV1, update docs/roi-model-spec.md and these values deliberately.
  return (
    approxEqual(out.networkMultiplier, 1.0000934761628317, 1e-12) &&
    approxEqual(out.annualDetentionSavings, 2001796.875, 1e-6) &&
    approxEqual(out.annualLaborSavings, 611519.9999999999, 1e-6) &&
    approxEqual(out.throughputValue, 13687500, 1e-6) &&  // 10% throughput at $500/truck
    approxEqual(out.paperlessSavings, 59500, 1e-6) &&     // $11,900/facility × 5
    approxEqual(out.totalAnnualSavings, 16361846.174644187, 1e-6) &&
    approxEqual(out.implementationCost, 12500, 1e-6) &&
    approxEqual(out.annualSubscription, 40000, 1e-6) &&
    // Payback is clamped to a minimum of 0.1 months ("< 1 month")
    approxEqual(out.paybackMonths, 0.1, 1e-12) &&
    approxEqual(out.yearOneRoiPercent, 130574.7693971535, 1e-9) &&
    approxEqual(out.fiveYearValue, 84935204.58459073, 1e-6)
  );
});

test('calcRoiV2 returns finite, non-negative key values', () => {
  const inputs = defaultRoiV2Inputs();
  const out = calcRoiV2(inputs);

  const finite = (n: number) => Number.isFinite(n);

  return (
    out.totalFacilities >= 0 &&
    out.totalShipmentsPerYear >= 0 &&
    finite(out.totalAnnualSavings) &&
    finite(out.paybackMonths) &&
    finite(out.yearOneRoiPercent)
  );
});

test('quick-mode mapping is anchored on spreadsheet-backed V2 assumptions', () => {
  const quick = {
    facilities: 50,
    trucksPerDayPerFacility: 150,
    avgDwellTimeMinutes: 55,
    detentionCostPerHour: 75,
    laborCostPerHour: 28,
    gateStaffPerFacility: 4,
  };

  const inputs = roiV2InputsFromQuickMode(quick);

  return (
    inputs.tiers.XL.count === 50 &&
    inputs.tiers.XL.shipmentsPerDay === 150 &&
    inputs.tiers.XL.operatingDaysPerYear === 365 &&
    // Quick mode defaults to expected-mode network params (can be overridden by presets).
    approxEqual(inputs.network.beta, 0.004, 1e-12) &&
    approxEqual(inputs.network.tau, 45, 1e-12) &&
    inputs.throughput.reduceCheckInMinutes === 5 &&
    inputs.throughput.reduceCheckOutMinutes === 5 &&
    inputs.throughput.realizedShare === 0.1 &&
    inputs.throughput.outboundShare === 0.6 &&
    inputs.throughput.incrementalMarginPerTruck === 500 &&
    inputs.commercial.annualSubscriptionPerFacility === 8000 &&
    inputs.commercial.implementationCostPerFacility === 2500
  );
});

test('calcRoiV2(default BT scenario) matches BT spreadsheet totals', () => {
  const inputs = defaultRoiV2Inputs();
  const out = calcRoiV2(inputs);

  // Expected values pulled from BT ROI CalculatorV2.xlsx cached results:
  // - Total facilities (M10): 345
  // - Total shipments/year (M17): 5,247,500
  // - Total hard savings/year (M13): 28,118,750
  // - Total opportunity/year (M11): 75,267,537.5
  // In our V2 engine, Total Opportunity maps to totalAnnualSavings (base savings, network off by default).
  const expectedFacilities = 345;
  const expectedShipmentsPerYear = 5247500;
  const expectedHardSavings = 28118750;
  const expectedTotalOpportunity = 75267537.5;

  const hardSavings = out.annualLaborSavings + out.annualDetentionSavings + out.paperlessSavings;

  return (
    approxEqual(out.totalFacilities, expectedFacilities, 1e-9) &&
    approxEqual(out.totalShipmentsPerYear, expectedShipmentsPerYear, 1e-6) &&
    approxEqual(hardSavings, expectedHardSavings, 1e-3) &&
    approxEqual(out.totalAnnualSavings, expectedTotalOpportunity, 1e-3)
  );
});

test('calcRoiV2(default Lineage scenario) matches Lineage spreadsheet totals', () => {
  const inputs = defaultRoiV2InputsLineage();
  const out = calcRoiV2(inputs);

  // Expected values pulled from `Lineage ROI Calc 1.25.xlsx` cached results:
  // - Total shipments/year (M13): 735,750
  // - Component totals (rows 17-24, M column)
  // - Total opportunity/year (M25): 1,360,476.4553571427
  const expectedShipmentsPerYear = 735750;
  const expectedPaper = 163336.5;
  const expectedLostBols = 82771.875;
  const expectedDetention = 335029.01785714284;
  const expectedDockClerk = 600000;
  const expectedMissedDeliveries = 179339.0625;
  const expectedTotalOpportunity = 1360476.4553571427;

  const otherThroughput = expectedLostBols + expectedMissedDeliveries;

  return (
    approxEqual(out.totalShipmentsPerYear, expectedShipmentsPerYear, 1e-6) &&
    approxEqual(out.paperlessSavings, expectedPaper, 1e-6) &&
    approxEqual(out.annualDetentionSavings, expectedDetention, 1e-6) &&
    approxEqual(out.annualLaborSavings, expectedDockClerk, 1e-6) &&
    approxEqual(out.throughputValue, otherThroughput, 1e-6) &&
    approxEqual(out.totalAnnualSavings, expectedTotalOpportunity, 1e-6)
  );
});

test('economics presets are congruent with roi wrappers (enterprise_50 + expected)', () => {
  const quick = getQuickInputsForPreset('enterprise_50', 'expected');
  const outViaRoi = calcRoiV2(roiV2InputsFromQuickMode(quick));
  const outViaEconomics = calcRoiV2Economics(getRoiV2InputsForPreset('enterprise_50', 'expected'));

  return (
    quick.facilities === 50 &&
    approxEqual(outViaRoi.totalAnnualSavings, outViaEconomics.totalAnnualSavings, 1e-9) &&
    approxEqual(outViaRoi.networkMultiplier, outViaEconomics.networkMultiplier, 1e-12) &&
    approxEqual(outViaRoi.implementationCost, outViaEconomics.implementationCost, 1e-9)
  );
});

console.log('\n-------------------');
console.log(`Tests: ${passed} passed, ${failed} failed`);
console.log('-------------------\n');

if (failed > 0) {
  process.exit(1);
}

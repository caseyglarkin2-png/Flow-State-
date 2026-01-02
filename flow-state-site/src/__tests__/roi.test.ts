// ROI Calculation Tests
// Run with: npx ts-node --esm src/__tests__/roi.test.ts

import {
  calcRoiV1,
  calcRoiV2,
  defaultRoiV2Inputs,
  defaultRoiV2InputsLineage,
  roiV2InputsFromQuickMode,
} from '../lib/roi/calc';

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

  // These are hard-coded to lock backward compatibility with the current live calculator.
  // If you change calcRoiV1, update docs/roi-model-spec.md (in flow-state-site/docs) and these values deliberately.
  return (
    approxEqual(out.networkMultiplier, 1.8958797346140275, 1e-9) &&
    approxEqual(out.annualDetentionSavings, 2001796.875, 1e-6) &&
    approxEqual(out.annualLaborSavings, 611519.9999999999, 1e-6) &&
    approxEqual(out.throughputValue, 5173875, 1e-6) &&
    approxEqual(out.paperlessSavings, 4106250, 1e-6) &&
    approxEqual(out.totalAnnualSavings, 22548535.42562236, 1e-6) &&
    approxEqual(out.implementationCost, 12500, 1e-6) &&
    approxEqual(out.annualSubscription, 40000, 1e-6) &&
    approxEqual(out.paybackMonths, 0.006664138610691171, 1e-12) &&
    approxEqual(out.yearOneRoiPercent, 180068.28340497887, 1e-9) &&
    approxEqual(out.fiveYearValue, 117130983.90412144, 1e-6)
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

test('quick-mode sliders mapped into V2 preserve V1 economics', () => {
  const quick = {
    facilities: 5,
    trucksPerDayPerFacility: 150,
    avgDwellTimeMinutes: 48,
    detentionCostPerHour: 75,
    laborCostPerHour: 28,
    gateStaffPerFacility: 3,
  };

  const v1 = calcRoiV1(quick);
  const v2 = calcRoiV2(roiV2InputsFromQuickMode(quick));

  return (
    approxEqual(v2.networkMultiplier, v1.networkMultiplier, 1e-9) &&
    approxEqual(v2.annualDetentionSavings, v1.annualDetentionSavings, 1e-6) &&
    approxEqual(v2.annualLaborSavings, v1.annualLaborSavings, 1e-6) &&
    approxEqual(v2.throughputValue, v1.throughputValue, 1e-6) &&
    approxEqual(v2.paperlessSavings, v1.paperlessSavings, 1e-6) &&
    approxEqual(v2.totalAnnualSavings, v1.totalAnnualSavings, 1e-6) &&
    approxEqual(v2.implementationCost, v1.implementationCost, 1e-6) &&
    approxEqual(v2.annualSubscription, v1.annualSubscription, 1e-6) &&
    approxEqual(v2.paybackMonths, v1.paybackMonths, 1e-12) &&
    approxEqual(v2.fiveYearValue, v1.fiveYearValue, 1e-6)
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

console.log('\n-------------------');
console.log(`Tests: ${passed} passed, ${failed} failed`);
console.log('-------------------\n');

if (failed > 0) {
  process.exit(1);
}

import { calcScenario } from '../model';
import { getRoiV2InputsForPreset } from '../presets';
import type { ScenarioInputs } from '../types';

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

test('calcScenario returns finite capacity outputs (enterprise_50 + expected)', () => {
  const roi = getRoiV2InputsForPreset('enterprise_50', 'expected');

  const inputs: ScenarioInputs = {
    roi,
    profit: {
      method: 'contribution_margin',
      contributionMarginPerTruckload: 500,
      outsourcedCostPerTruckload: 0,
      internalVariableCostPerTruckload: 0,
    },
    discountRate: 0.10,
    growthRate: 0.02,
  };

  const out = calcScenario(inputs);

  const finite = (n: number) => Number.isFinite(n);

  return (
    out.roi.totalFacilities === 50 &&
    finite(out.capacity.incrementalOutboundTruckloadsPerYear) &&
    out.capacity.incrementalOutboundTruckloadsPerYear >= 0 &&
    finite(out.capacity.annualProfitImpact) &&
    out.capacity.annualProfitImpact >= 0 &&
    finite(out.hardSavingsAnnual) &&
    out.hardSavingsAnnual >= 0
  );
});

test('capacity math matches ROI throughput basis (enterprise_50 + expected)', () => {
  const roi = getRoiV2InputsForPreset('enterprise_50', 'expected');

  const inputs: ScenarioInputs = {
    roi,
    profit: {
      method: 'contribution_margin',
      contributionMarginPerTruckload: 500,
      outsourcedCostPerTruckload: 0,
      internalVariableCostPerTruckload: 0,
    },
    discountRate: 0.10,
    growthRate: 0.02,
  };

  const out = calcScenario(inputs);

  // ROI throughputValue includes shipper-of-choice and enterprise add-ons, so we only
  // assert that the derived capacity-profit component is consistent with the per-truck profit basis.
  const expected = out.capacity.incrementalOutboundTruckloadsPerYear * 500;
  return approxEqual(out.capacity.annualProfitImpact, expected, 1e-6);
});

console.log('\n-------------------');
console.log(`Tests: ${passed} passed, ${failed} failed`);
console.log('-------------------\n');

if (failed > 0) {
  process.exit(1);
}

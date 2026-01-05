import { calcScenario } from '../model';
import { calcRoiV2 } from '../roi';
import { getRoiV2InputsForPreset } from '../presets';
import type { ScenarioInputs } from '../types';
import { connectionsPotential, realizationFactor, metcalfeInspiredMultiplier } from '../networkEffect';

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
    finite(out.finance.fiveYearNPV) &&
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

test('homepage (calcRoiV2) and scenario wrapper are congruent (enterprise_50 + expected)', () => {
  // Homepage uses getRoiV2InputsForPreset + calcRoiV2 directly.
  const roiInputs = getRoiV2InputsForPreset('enterprise_50', 'expected');
  const direct = calcRoiV2(roiInputs);

  // Scenario wrapper should not change ROI outputs when using the same per-truck profit basis.
  const perTruckProfit = roiInputs.throughput.incrementalMarginPerTruck;
  const inputs: ScenarioInputs = {
    roi: roiInputs,
    profit: {
      method: 'contribution_margin',
      contributionMarginPerTruckload: perTruckProfit,
      outsourcedCostPerTruckload: 0,
      internalVariableCostPerTruckload: 0,
    },
    discountRate: 0.10,
    growthRate: 0.02,
  };

  const wrapped = calcScenario(inputs).roi;

  return (
    wrapped.totalFacilities === direct.totalFacilities &&
    approxEqual(wrapped.networkMultiplier, direct.networkMultiplier, 1e-12) &&
    approxEqual(wrapped.annualDetentionSavings, direct.annualDetentionSavings, 1e-6) &&
    approxEqual(wrapped.annualLaborSavings, direct.annualLaborSavings, 1e-6) &&
    approxEqual(wrapped.paperlessSavings, direct.paperlessSavings, 1e-6) &&
    approxEqual(wrapped.totalAnnualSavings, direct.totalAnnualSavings, 1e-6)
  );
});

test('network effect canonical math (C, R, M)', () => {
  // Baseline: n0=10 => C0=45
  const c0 = connectionsPotential(10);
  if (c0 !== 45) return false;

  const c50 = connectionsPotential(50);
  if (c50 !== 1225) return false;

  const r10 = realizationFactor(10, 45);
  // R(10)=1-exp(-10/45) ~= 0.199262...
  if (!approxEqual(r10, 1 - Math.exp(-10 / 45), 1e-12)) return false;

  const m10 = metcalfeInspiredMultiplier(10, { beta: 0.004, tau: 45 }).multiplier;
  // M(10)=1+beta*(C/C0)*R = 1 + 0.004*1*R(10)
  if (!approxEqual(m10, 1 + 0.004 * r10, 1e-12)) return false;

  const m1 = metcalfeInspiredMultiplier(1, { beta: 0.004, tau: 45 }).multiplier;
  if (!approxEqual(m1, 1, 1e-12)) return false;

  const m25 = metcalfeInspiredMultiplier(25, { beta: 0.004, tau: 45 }).multiplier;
  const m50 = metcalfeInspiredMultiplier(50, { beta: 0.004, tau: 45 }).multiplier;
  return m25 >= m10 && m50 >= m25;
});

console.log('\n-------------------');
console.log(`Tests: ${passed} passed, ${failed} failed`);
console.log('-------------------\n');

if (failed > 0) {
  process.exit(1);
}

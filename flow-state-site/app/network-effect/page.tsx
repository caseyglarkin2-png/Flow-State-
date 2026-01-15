'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import NextSteps from '@/components/NextSteps';
import CFOProofChecklist from '@/components/CFOProofChecklist';
import VarianceKillsBlock from '@/components/VarianceKillsBlock';
import { trackEvent } from '@/lib/analytics';
import { ROUTES, DEFINITIONS } from '@/content/config';
import { calcScenario, getQuickInputsForPreset, roiV2InputsFromQuickMode, money as formatMoney, metcalfeInspiredMultiplier } from '@/lib/economics';

type Scenario = 'conservative' | 'expected' | 'aggressive';

type NetworkModelAssumptions = {
  yearOneRampShare: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function getAssumptions(scenario: Scenario): NetworkModelAssumptions {
  if (scenario === 'conservative') {
    return { yearOneRampShare: 0.55 };
  }
  if (scenario === 'aggressive') {
    return { yearOneRampShare: 0.8 };
  }
  return { yearOneRampShare: 0.7 };
}

function buildCurvePoints(params: { beta: number; tau: number }) {
  const xs = [1, 5, 10, 25, 50, 100];
  return xs.map((x) => ({ x, y: metcalfeInspiredMultiplier(x, params).multiplier }));
}

function AssumptionsDrawer({
  scenario,
  assumptions,
}: {
  scenario: Scenario;
  assumptions: NetworkModelAssumptions & { beta: number; tau: number; baseSavingsPerFacility: number };
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="px-4 py-2 rounded-xl border border-steel/25 text-white hover:border-neon/40 transition-colors"
        >
          Assumptions ({scenario})
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-void/70 z-50" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(720px,92vw)] max-h-[80vh] overflow-auto bg-carbon z-50 border border-neon/20 rounded-2xl outline-none"
          aria-label="Assumptions"
        >
          <div className="p-6 border-b border-neon/15 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-xl font-black text-white">Assumptions</Dialog.Title>
              <Dialog.Description className="text-sm text-steel mt-1">
                Modeled estimates to support planning. Not promises.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="px-3 py-2 rounded-xl border border-steel/25 text-white hover:border-neon/40 transition-colors"
                aria-label="Close"
              >
                Close
              </button>
            </Dialog.Close>
          </div>

          <div className="p-6 space-y-6">
            <div className="rounded-xl border border-neon/10 bg-void/20 p-4">
              <div className="text-white font-semibold">Network multiplier</div>
              <p className="text-sm text-steel mt-1">
                Formula: <span className="text-white">M(n)=1+β·(C(n)/C0)·R(n)</span>
              </p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="rounded-lg border border-neon/10 bg-carbon/40 p-3">
                  <div className="text-steel">β (strength)</div>
                  <div className="text-white font-semibold">{assumptions.beta.toFixed(3)}</div>
                </div>
                <div className="rounded-lg border border-neon/10 bg-carbon/40 p-3">
                  <div className="text-steel">τ (maturity)</div>
                  <div className="text-white font-semibold">{Math.round(assumptions.tau)} facilities</div>
                </div>
                <div className="rounded-lg border border-neon/10 bg-carbon/40 p-3">
                  <div className="text-steel">Base savings / facility</div>
                  <div className="text-white font-semibold">{formatMoney(assumptions.baseSavingsPerFacility)} / year</div>
                </div>
              </div>
              <p className="text-xs text-steel/70 mt-4">
                Year-1 ramp is modeled separately (realistic adoption) and does not change the network formula.
              </p>
              <p className="text-xs text-steel/70 mt-4">
                Base savings / facility is computed from the same ROI engine used on /roi (steady-state base savings, before network bonus).
              </p>
            </div>

            <div className="rounded-xl border border-neon/10 bg-void/20 p-4">
              <div className="text-white font-semibold">What compounds (plain freight ops language)</div>
              <ul className="mt-3 text-sm text-steel space-y-2 list-disc pl-5">
                <li>Standardized yard playbooks (same exceptions, same timestamps)</li>
                <li>Faster onboarding per additional site (less reinventing)</li>
                <li>Reduced dwell/detention variability (fewer surprise days)</li>
                <li>Labor leverage (less manual gate work, fewer ad-hoc calls)</li>
                <li>Throughput lift (more turns with the same footprint)</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neon/10 bg-void/20 p-4">
              <div className="text-white font-semibold">Definitions</div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {(
                  [
                    { k: 'dwell', title: 'Dwell', v: DEFINITIONS.dwell },
                    { k: 'detention', title: 'Detention', v: DEFINITIONS.detention },
                    { k: 'throughput', title: 'Throughput', v: DEFINITIONS.throughput },
                    { k: 'orchestration', title: 'Orchestration', v: DEFINITIONS.orchestration },
                  ] as const
                ).map((d) => (
                  <div key={d.k} className="rounded-lg border border-neon/10 bg-carbon/40 p-3">
                    <div className="text-white font-semibold">{d.title}</div>
                    <div className="text-steel mt-1">{d.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Curve({ points }: { points: Array<{ x: number; y: number }> }) {
  // Simple inline SVG. No animation.
  const width = 560;
  const height = 220;
  const pad = 26;

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = 1;
  const maxY = Math.max(2.2, ...ys);

  const xScale = (x: number) => {
    const t = (x - minX) / Math.max(0.0001, maxX - minX);
    return pad + t * (width - pad * 2);
  };

  const yScale = (y: number) => {
    const t = (y - minY) / Math.max(0.0001, maxY - minY);
    return height - pad - t * (height - pad * 2);
  };

  const d = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.x).toFixed(1)} ${yScale(p.y).toFixed(1)}`)
    .join(' ');

  return (
    <div className="w-full overflow-x-auto">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Modeled network multiplier curve"
        className="block"
      >
        <rect x="0" y="0" width={width} height={height} fill="transparent" />
        <path d={d} fill="none" stroke="currentColor" strokeWidth={2.5} className="text-neon" />
        {points.map((p) => (
          <g key={p.x}>
            <circle cx={xScale(p.x)} cy={yScale(p.y)} r={4} className="fill-neon" />
            <text
              x={xScale(p.x)}
              y={yScale(p.y) - 10}
              textAnchor="middle"
              className="fill-steel"
              fontSize={11}
            >
              {p.y.toFixed(2)}×
            </text>
            <text
              x={xScale(p.x)}
              y={height - 8}
              textAnchor="middle"
              className="fill-steel/80"
              fontSize={10}
            >
              {p.x}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function NetworkEffectPage() {
  const [scenario, setScenario] = useState<Scenario>('expected');
  const [facilities, setFacilities] = useState(25);

  const assumptions = useMemo(() => getAssumptions(scenario), [scenario]);

  const modeled = useMemo(() => {
    const f = clamp(Math.floor(facilities), 1, 500);
    const econMode = scenario === 'aggressive' ? 'upside' : scenario;
    const quick = getQuickInputsForPreset('enterprise_50', econMode);
    const roiInputs = {
      ...roiV2InputsFromQuickMode({ ...quick, facilities: f }),
      contractedFacilities: f,
      yearOneRampShare: assumptions.yearOneRampShare,
    };

    const out = calcScenario({
      roi: roiInputs,
      profit: {
        method: 'contribution_margin',
        contributionMarginPerTruckload: roiInputs.throughput.incrementalMarginPerTruck,
        outsourcedCostPerTruckload: 0,
        internalVariableCostPerTruckload: 0,
      },
      discountRate: 0.1,
      growthRate: 0.02,
    });

    const roiAt1Inputs = {
      ...roiV2InputsFromQuickMode({ ...quick, facilities: 1 }),
      contractedFacilities: 1,
      yearOneRampShare: assumptions.yearOneRampShare,
    };

    const outAt1 = calcScenario({
      roi: roiAt1Inputs,
      profit: {
        method: 'contribution_margin',
        contributionMarginPerTruckload: roiAt1Inputs.throughput.incrementalMarginPerTruck,
        outsourcedCostPerTruckload: 0,
        internalVariableCostPerTruckload: 0,
      },
      discountRate: 0.1,
      growthRate: 0.02,
    });

    const mult = out.roi.networkMultiplier;
    const base = out.roi.baseSavings;
    const networkBonus = out.roi.networkBonusSavings;
    const total = out.roi.totalAnnualSavings;
    const yearOne = out.roi.yearOneGrossSavings;
    const oppCostStopAt1 = outAt1.roi.networkBonusSavings;
    const baseSavingsPerFacility = f > 0 ? base / f : 0;
    const { beta, tau } = out.roi.assumptionsUsed.network;

    return {
      f,
      mult,
      beta,
      tau,
      baseSavingsPerFacility,
      base,
      networkBonus,
      total,
      yearOne,
      oppCostStopAt1,
    };
  }, [assumptions, facilities]);

  const curvePoints = useMemo(() => buildCurvePoints({ beta: modeled.beta, tau: modeled.tau }), [modeled.beta, modeled.tau]);

  function onScenario(next: Scenario) {
    setScenario(next);
    trackEvent('network_scenario_run', { scenario: next });
  }

  function onView() {
    trackEvent('network_effect_viewed');
  }

  useEffect(() => {
    onView();
  }, []);

  const roiHref = `${ROUTES.roi}?facilities=${modeled.f}&scenario=${scenario}`;
  const implHref = `${ROUTES.implementation}?from=network-effect&facilities=${modeled.f}`;

  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hook + reframe */}
      <section className="pt-32 pb-16 border-b border-neon/10">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-ember/70 mb-3">After You Stop the Bleeding</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6">
            Cut the Leak at One Site.<br />
            <span className="text-neon">Watch It Compound.</span>
          </h1>
          <p className="text-xl text-steel max-w-3xl">
            Each facility you instrument eliminates local friction. But when you connect them, 
            the savings multiply: standardized playbooks, faster rollouts, network-wide visibility.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href={roiHref}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
              onClick={() => trackEvent('network_scenario_run', { action: 'cta_run_roi' })}
            >
              Run your network scenario
            </Link>
            <Link
              href={implHref}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-steel/30 text-white hover:border-neon/40 transition-colors"
              onClick={() => trackEvent('implementation_cta_click', { action: 'cta_get_rollout_plan_page', href: implHref })}
            >
              Get rollout plan
            </Link>
            <AssumptionsDrawer
              scenario={scenario}
              assumptions={{
                ...assumptions,
                beta: modeled.beta,
                tau: modeled.tau,
                baseSavingsPerFacility: modeled.baseSavingsPerFacility,
              }}
            />
          </div>
        </div>
      </section>

      {/* B) The villain - reframed around network leak compound cost */}
      <section className="py-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-2xl font-bold text-ember mb-3">The compounding cost of waiting</h2>
            <p className="text-steel">
              A pilot that never scales means you pay the network leak at every other facility. Forever. 
              The learning cost repeats. The friction compounds. The network advantage never arrives.
            </p>
            <p className="text-steel mt-4">
              Finance sees it as opportunity cost. Ops feels it as "we're still doing it three different ways."
            </p>
          </Card>
          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">What stopping at one site costs</h2>
            <p className="text-steel">
              Stopping at a single facility leaves the network bonus near zero. The leak keeps compounding at every other site.
            </p>
            <div className="mt-5 rounded-lg border border-neon/10 bg-carbon/40 p-4">
              <div className="text-sm text-steel">Network bonus at 1 facility</div>
              <div className="text-3xl font-black neon-glow">{formatMoney(modeled.oppCostStopAt1)} / year</div>
              <div className="text-xs text-steel/70 mt-2">
                Computed from the same ROI engine used on /roi, using this page’s per-facility assumptions.
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* C) Reveal: Facilities → Network Value Multiplier */}
      <section className="py-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Reveal: facilities → network multiplier</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-steel">Scenario</div>
                  <div className="text-white font-semibold">{scenario}</div>
                </div>
                <div className="inline-flex rounded-lg border border-neon/15 bg-carbon/40 overflow-hidden" role="group" aria-label="Scenario">
                  {(
                    [
                      { id: 'conservative', label: 'Conservative' },
                      { id: 'expected', label: 'Expected' },
                      { id: 'aggressive', label: 'Aggressive' },
                    ] as const
                  ).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className={`px-3 py-2 text-sm font-semibold transition-colors ${
                        scenario === s.id ? 'bg-neon text-void' : 'text-white hover:bg-void/30'
                      }`}
                      onClick={() => onScenario(s.id)}
                      aria-pressed={scenario === s.id}
                      data-testid={`scenario-${s.id}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="flex items-center justify-between gap-3">
                  <span className="text-steel">Facilities in scope</span>
                  <span className="text-neon font-bold" data-testid="facility-count">
                    {modeled.f}
                  </span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={200}
                  step={1}
                  value={modeled.f}
                  onChange={(e) => setFacilities(Number(e.target.value))}
                  className="w-full h-2 bg-carbon rounded-lg appearance-none cursor-pointer accent-neon mt-3"
                  aria-label="Facilities"
                />
                <div className="flex justify-between text-xs text-steel/60 mt-1">
                  <span>1</span>
                  <span>200</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-neon/10 bg-carbon/40 p-4">
                  <div className="text-sm text-steel">Multiplier (modeled)</div>
                  <div className="text-3xl font-black neon-glow" data-testid="multiplier">
                    {modeled.mult.toFixed(2)}×
                  </div>
                </div>
                <div className="rounded-lg border border-neon/10 bg-carbon/40 p-4">
                  <div className="text-sm text-steel">Year-1 realized value</div>
                  <div className="text-3xl font-black neon-glow">{formatMoney(modeled.yearOne)}</div>
                </div>
              </div>

              <p className="text-xs text-steel/70 mt-4">
                This page uses the same ROI engine as /roi, with scenario presets for fast planning.
              </p>
            </Card>

            <Card>
              <div className="text-sm text-steel">Modeled curve</div>
              <div className="mt-3">
                <Curve points={curvePoints} />
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="rounded-lg border border-neon/10 bg-carbon/40 p-3">
                  <div className="text-steel">Base savings</div>
                  <div className="text-white font-semibold">{formatMoney(modeled.base)}</div>
                </div>
                <div className="rounded-lg border border-neon/10 bg-carbon/40 p-3">
                  <div className="text-steel">Network bonus</div>
                  <div className="text-white font-semibold">{formatMoney(modeled.networkBonus)}</div>
                </div>
                <div className="rounded-lg border border-neon/10 bg-carbon/40 p-3">
                  <div className="text-steel">Total (annual)</div>
                  <div className="text-white font-semibold">{formatMoney(modeled.total)}</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-10 rounded-xl border border-neon/15 bg-carbon/40 p-6">
            <h3 className="text-xl font-bold text-neon">What compounds</h3>
            <p className="text-steel mt-2 max-w-3xl">{DEFINITIONS.networkEffect}</p>
            <ul className="mt-4 text-steel space-y-2 list-disc pl-5">
              <li>Standardized yard playbooks</li>
              <li>Faster onboarding per additional site</li>
              <li>Reduced dwell/detention variability</li>
              <li>Labor leverage (less manual gate work)</li>
              <li>Throughput lift (more turns with the same footprint)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* D) Rollout ladder */}
      <section className="py-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8">Rollout ladder: 1 → 5 → 25 → 100+</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(
              [
                {
                  stage: '1 facility (Crawl)',
                  ops: 'Prove one repeatable workflow with defensible timestamps. Stop improvising exceptions.',
                  fin: 'Validate a base savings line item. Establish baseline vs post-flow deltas.',
                },
                {
                  stage: '5 facilities (Walk)',
                  ops: 'Standardize the playbook. Reduce variance in dwell and detention outcomes.',
                  fin: 'Turn savings into a model. Start tracking realization vs plan.',
                },
                {
                  stage: '25 facilities (Run)',
                  ops: 'Onboarding accelerates. You stop re-learning the same lessons.',
                  fin: 'Network bonus becomes visible: less variability, better throughput consistency.',
                },
                {
                  stage: '100+ facilities (Standard)',
                  ops: 'Execution becomes a system. Exceptions become data, not hero work.',
                  fin: 'Compounding advantage: rollout speed + stabilized outcomes across the network.',
                },
              ] as const
            ).map((row) => (
              <Card key={row.stage}>
                <h3 className="text-2xl font-bold text-neon mb-3">{row.stage}</h3>
                <div className="text-sm text-steel">
                  <div className="font-semibold text-white">Operational change</div>
                  <p className="mt-1">{row.ops}</p>
                  <div className="font-semibold text-white mt-4">Financial change</div>
                  <p className="mt-1">{row.fin}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* E) Primo-style rollout narrative template (anonymized) */}
      <section className="py-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Primo-style rollout narrative template (anonymized)</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-xl font-bold text-neon mb-3">Phase 1: Pilot</h3>
              <ul className="text-steel space-y-2 list-disc pl-5">
                <li>Pick a site with clear ownership and measurable pain.</li>
                <li>Ship a workflow (not a dashboard).</li>
                <li>Capture baseline → post-flow deltas.</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-xl font-bold text-neon mb-3">Phase 2: Cluster</h3>
              <ul className="text-steel space-y-2 list-disc pl-5">
                <li>Roll to a cluster where the playbook repeats.</li>
                <li>Standardize exceptions and timestamps.</li>
                <li>Shorten onboarding per new site.</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-xl font-bold text-neon mb-3">Phase 3: Enterprise standard</h3>
              <ul className="text-steel space-y-2 list-disc pl-5">
                <li>Make it the default, not a side project.</li>
                <li>Instrument the network and reduce variance.</li>
                <li>Turn execution into defensible operating truth.</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* F) CFO-ready CTA cluster */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-2xl border border-neon/20 bg-carbon/40 p-8">
            <h2 className="text-3xl font-bold">Next best step</h2>
            <p className="text-steel mt-2 max-w-2xl">
              Keep the frame: scenario → plan → safety. No vendor montage.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href={roiHref}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all"
              >
                Run your network scenario
              </Link>
              <Link
                href={implHref}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-steel/30 text-white hover:border-neon/40 transition-colors"
              >
                Get rollout plan
              </Link>
              <Link
                href={ROUTES.security}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-steel/30 text-white hover:border-neon/40 transition-colors"
              >
                Loop in IT
              </Link>
            </div>

            {/* G) Evidence Vault drawer is global via AppChrome; we reinforce the intent here. */}
            <p className="text-xs text-steel/70 mt-5">
              Evidence Vault (bottom-right) contains forwardable artifacts: proof, trust, buying.
            </p>
          </div>
        </div>
      </section>

      {/* Variance Kills Block */}
      <section className="py-16 bg-carbon/30 border-t border-steel/20">
        <div className="max-w-4xl mx-auto px-6">
          <VarianceKillsBlock />
        </div>
      </section>

      {/* CFO Proof Checklist */}
      <section className="py-16 border-t border-steel/20">
        <div className="max-w-4xl mx-auto px-6">
          <CFOProofChecklist variant="compact" />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <NextSteps title="Persona handoff" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { analytics } from '@/lib/analytics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import FrameShiftHero from '@/components/FrameShiftHero';
import BoardReadyExportCTA from '@/components/BoardReadyExportCTA';
import { trackEvent } from '@/lib/analytics';
import { useLaneStore } from '@/store/lane';

type Pain = 'detention' | 'gate' | 'labor' | 'visibility' | 'throughput';
type GateStyle = 'guard' | 'kiosk' | 'mixed';

export default function YardBuilderPage() {
  useEffect(() => {
    analytics.viewYardBuilder();
  }, []);

  const lane = useLaneStore((s) => s.lane);
  const [step, setStep] = useState(1);
  const [company, setCompany] = useState('');
  const [facilityCount, setFacilityCount] = useState(10);
  const [shipmentsPerDay, setShipmentsPerDay] = useState(250);
  const [gateStyle, setGateStyle] = useState<GateStyle>('guard');
  const [pain, setPain] = useState<Pain>('detention');

  const preview = useMemo(() => {
    const annualShipments = Math.max(0, shipmentsPerDay) * 365 * Math.max(1, facilityCount);
    const focus =
      pain === 'detention'
        ? 'Defensible timestamps + exception workflow'
        : pain === 'gate'
          ? 'Gate control loop + standard check-in/out'
          : pain === 'labor'
            ? 'Repeatable execution + less manual handling'
            : pain === 'visibility'
              ? 'Ground-truth yard state (not just dots)'
              : 'Throughput stabilization + fewer surprises';

    return {
      annualShipments,
      focus,
      nextSteps: [
        'Confirm your current check-in/out flow and exception reasons',
        'Identify one pilot facility with clear ownership',
        'Define the KPI you want to make defensible (dwell, detention, labor, throughput)',
      ],
    };
  }, [facilityCount, shipmentsPerDay, pain]);

  function next() {
    setStep((s) => {
      const ns = Math.min(4, s + 1);
      trackEvent('yardbuilder_step_completed', { step: s, nextStep: ns, lane });
      return ns;
    });
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  return (
    <div className="min-h-screen bg-void">
      <Header />

      <FrameShiftHero
        title={
          <>
            YardBuilder: <span className="neon-glow">readiness</span> in four steps.
          </>
        }
        reframe={<>Map your yard, name the bottleneck, estimate stakes, and export a report your exec team can forward.</>}
        proof={<>Micro‑reward at each step. You get a preview before we ask for an email.</>}
        primaryCta={{ href: '#builder', label: 'Start the report' }}
        secondaryCta={{ href: '/roi', label: 'Or skip to ROI' }}
      />

      <section id="builder" className="py-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold mb-6 neon-glow">Step {step} of 4</h2>

              <div className="space-y-5">
                <Card>
                  <h3 className="text-lg font-bold text-neon">1) Context</h3>
                  <div className="mt-4 grid grid-cols-1 gap-3">
                    <input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company (optional until export)"
                      className="bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                    />
                    <label className="text-sm text-steel">Facilities</label>
                    <input
                      type="number"
                      min={1}
                      value={facilityCount}
                      onChange={(e) => setFacilityCount(Number(e.target.value))}
                      className="bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                    />
                    <label className="text-sm text-steel">Shipments/day (per facility)</label>
                    <input
                      type="number"
                      min={0}
                      value={shipmentsPerDay}
                      onChange={(e) => setShipmentsPerDay(Number(e.target.value))}
                      className="bg-carbon border border-steel/20 rounded-md px-3 py-2 text-white"
                    />
                  </div>
                </Card>

                <Card>
                  <h3 className="text-lg font-bold text-neon">2) Gate style</h3>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {([
                      { value: 'guard', label: 'Guard' },
                      { value: 'kiosk', label: 'Kiosk' },
                      { value: 'mixed', label: 'Mixed' },
                    ] as const).map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setGateStyle(opt.value)}
                        className={`px-3 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                          gateStyle === opt.value
                            ? 'border-neon text-white bg-void/30'
                            : 'border-steel/25 text-steel hover:border-neon/40'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h3 className="text-lg font-bold text-neon">3) What hurts most?</h3>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {([
                      { value: 'detention', label: 'Detention' },
                      { value: 'gate', label: 'Gate throughput' },
                      { value: 'labor', label: 'Labor waste' },
                      { value: 'visibility', label: 'Visibility gaps' },
                      { value: 'throughput', label: 'Throughput variance' },
                    ] as const).map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setPain(opt.value)}
                        className={`px-3 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                          pain === opt.value
                            ? 'border-neon text-white bg-void/30'
                            : 'border-steel/25 text-steel hover:border-neon/40'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </Card>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 1}
                    className="px-4 py-2 rounded-lg border border-steel/30 text-white disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={step === 4}
                    className="px-4 py-2 rounded-lg font-semibold bg-neon text-void disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            <div>
              <Card className="border-neon/25">
                <h3 className="text-xl font-bold text-neon">Preview (before email)</h3>
                <div className="mt-4 space-y-2 text-steel">
                  <div className="flex justify-between">
                    <span>Annual shipments (modeled)</span>
                    <span className="text-white font-semibold">{Math.round(preview.annualShipments).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Focus</span>
                    <span className="text-white font-semibold">{preview.focus}</span>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="text-sm text-neon font-semibold">Recommended next steps</div>
                  <ul className="mt-2 list-disc pl-5 text-sm text-steel space-y-1">
                    {preview.nextSteps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <BoardReadyExportCTA
                    endpoint="/api/pdf/yardbuilder"
                    eventName="pdf_generated_yardbuilder"
                    buildPayload={(lead) => ({
                      lead,
                      inputs: {
                        company: company || lead.company,
                        facilityCount,
                        shipmentsPerDay,
                        gateStyle,
                        pain,
                      },
                    })}
                    title="Export Yard Readiness PDF"
                    subtitle="Forwardable artifact for ops + finance. Modeled guidance; results vary."
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

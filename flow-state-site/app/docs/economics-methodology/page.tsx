import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Economics Methodology | YardFlow by FreightRoll',
  description: 'Transparent methodology behind YardFlow ROI calculations: yard tax modeling, network effects, and economics validation.',
};

export default function EconomicsMethodologyPage() {
  return (
    <main className="min-h-screen bg-void">
      {/* Header */}
      <section className="border-b border-steel/20 bg-gradient-to-b from-carbon to-void py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/roi"
            className="mb-6 inline-flex items-center gap-2 text-neon transition-colors hover:text-neon/80"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to ROI Calculator
          </Link>
          
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Economics Methodology
          </h1>
          
          <p className="text-lg text-steel">
            Transparent, defensible math behind YardFlow's ROI models. No black boxes. No magic multipliers.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none">
            {/* Core Principles */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-white">Core Principles</h2>
              <div className="space-y-4 text-steel">
                <p>
                  YardFlow's economic model is built on three non-negotiable principles:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li><strong className="text-white">Defensible timestamps</strong> - All savings derive from measurable cycle time improvements with immutable audit trails</li>
                  <li><strong className="text-white">Conservative assumptions</strong> - We model base case scenarios, not best case outcomes</li>
                  <li><strong className="text-white">Transparent formulas</strong> - Every calculation is reproducible and auditable</li>
                </ol>
              </div>
            </section>

            {/* Yard Tax Categories */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-white">Yard Tax: Eight Cost Categories</h2>
              <div className="space-y-6 text-steel">
                <p>
                  The "Yard Tax" represents invisible operational costs buried in your P&L. We model eight distinct categories:
                </p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-steel/20 bg-carbon/30 p-4">
                    <h3 className="mb-2 font-semibold text-white">1. Detention & Disputes</h3>
                    <p className="text-sm">$50-200 per occurrence. Based on industry avg detention rate of 8-15% of loads, avg dwell time 45-90 min.</p>
                  </div>
                  
                  <div className="rounded-lg border border-steel/20 bg-carbon/30 p-4">
                    <h3 className="mb-2 font-semibold text-white">2. Missed Cutoffs & Expedites</h3>
                    <p className="text-sm">$500-2,000 per event. Modeled from premium freight rates and opportunity cost of delayed shipments.</p>
                  </div>
                  
                  <div className="rounded-lg border border-steel/20 bg-carbon/30 p-4">
                    <h3 className="mb-2 font-semibold text-white">3. OT & Labor Volatility</h3>
                    <p className="text-sm">$15-45/hr premium. Calculated from unpredictable arrivals requiring staffing buffers or rush scheduling.</p>
                  </div>
                  
                  <div className="rounded-lg border border-steel/20 bg-carbon/30 p-4">
                    <h3 className="mb-2 font-semibold text-white">4. Trailer Hunt Time</h3>
                    <p className="text-sm">8-15 min per move. Productivity loss from manual searches, radio calls, and yard walks.</p>
                  </div>
                  
                  <div className="rounded-lg border border-steel/20 bg-carbon/30 p-4">
                    <h3 className="mb-2 font-semibold text-white">5. OTIF Chargebacks</h3>
                    <p className="text-sm">$100-500 per miss. Penalties from retail customers when root cause cannot be proven defensibly.</p>
                  </div>
                  
                  <div className="rounded-lg border border-steel/20 bg-carbon/30 p-4">
                    <h3 className="mb-2 font-semibold text-white">6. Overflow Yards & 3PL Surge</h3>
                    <p className="text-sm">$200-800 per trailer/day. Cost of external storage when throughput constraint appears (but isn't real).</p>
                  </div>
                  
                  <div className="rounded-lg border border-steel/20 bg-carbon/30 p-4">
                    <h3 className="mb-2 font-semibold text-white">7. Safety & Claims Exposure</h3>
                    <p className="text-sm">$5K-50K per claim. Incidents from poor visibility, geofencing gaps, and ad-hoc coordination.</p>
                  </div>
                  
                  <div className="rounded-lg border border-steel/20 bg-carbon/30 p-4">
                    <h3 className="mb-2 font-semibold text-white">8. Working Capital Buffers</h3>
                    <p className="text-sm">3-7% tied capital. Extra inventory and trailer pools held "just in case" due to flow unpredictability.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ROI Model Components */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-white">ROI Model Components</h2>
              <div className="space-y-4 text-steel">
                <h3 className="font-semibold text-white">Labor Savings</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Gate automation: 2-6 FTE per facility (based on shifts, volume, and automation share)</li>
                  <li>Dock office efficiency: % of time spent on driver process × time savings share</li>
                  <li>Guard automation: % of manual gate tasks eliminated</li>
                </ul>

                <h3 className="font-semibold text-white mt-6">Detention Savings</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Baseline: % of transport budget allocated to detention</li>
                  <li>Reduction: Cycle time improvements (5-15 min per check-in/check-out)</li>
                  <li>Dispute resolution: Defensible timestamps reduce claims 15-30 min over threshold</li>
                </ul>

                <h3 className="font-semibold text-white mt-6">Throughput Value</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Theoretical capacity gain: (Baseline cycle / Improved cycle) - 1</li>
                  <li>Realized share: Conservative % of theoretical gain actually captured (typically 10-30%)</li>
                  <li>Value: Incremental outbound shipments × margin per truck</li>
                </ul>

                <h3 className="font-semibold text-white mt-6">Paperless Savings</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Pages per shipment: BOL pages + other documents</li>
                  <li>Cost per page: Printing + storage + retrieval</li>
                  <li>Phase 1 savings: % digitized in initial rollout (typically 50-70%)</li>
                </ul>
              </div>
            </section>

            {/* Network Effects */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-white">Network Effects: Metcalfe-Inspired Model</h2>
              <div className="space-y-4 text-steel">
                <p>
                  Network effects are real but overhyped. Our model is conservative and data-driven:
                </p>
                
                <div className="rounded-lg border border-neon/20 bg-carbon/30 p-6">
                  <h3 className="mb-3 font-semibold text-white">Canonical Formula</h3>
                  <code className="block rounded bg-void/50 p-4 font-mono text-sm text-neon">
                    M(n) = 1 + β × (C(n)/C₀) × R(n)
                  </code>
                  <ul className="mt-4 list-disc pl-6 space-y-2 text-sm">
                    <li><strong>M(n)</strong>: Value multiplier for n facilities</li>
                    <li><strong>β</strong>: Network strength parameter (0.004 base case)</li>
                    <li><strong>C(n)</strong>: Possible connections = n(n-1)/2</li>
                    <li><strong>R(n)</strong>: Realization curve = 1 - e^(-n/τ), where τ = 45</li>
                  </ul>
                </div>

                <h3 className="font-semibold text-white mt-6">Key Constraints</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Minimal until 10+ facilities:</strong> Network effects don't kick in at 2-5 sites</li>
                  <li><strong>Gradual realization:</strong> Maturity curve prevents instant multipliers</li>
                  <li><strong>Conservative β:</strong> 0.004 means modest gains (1.08x at 25 facilities, 1.15x at 100)</li>
                  <li><strong>Four value streams:</strong> Predictive intelligence, carrier benchmarking, coordination efficiency, shared learning</li>
                </ul>
              </div>
            </section>

            {/* Validation & Sources */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-white">Validation & Industry Sources</h2>
              <div className="space-y-4 text-steel">
                <p>
                  All assumptions are benchmarked against:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>CSCMP State of Logistics reports (detention trends, cost benchmarks)</li>
                  <li>FreightWaves SONAR data (dwell times, capacity utilization)</li>
                  <li>Industry whitepapers on yard automation ROI (Aberdeen, Gartner, ARC Advisory)</li>
                  <li>Customer pilot data (anonymized, aggregated)</li>
                </ul>

                <div className="mt-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                  <p className="text-sm">
                    <strong className="text-amber-500">Important:</strong> All modeled outcomes are directional and illustrative. 
                    Actual savings depend on facility-specific variables: current state maturity, process standardization, 
                    integration complexity, and change management execution. Use YardFlow's diagnostic tools to calibrate 
                    assumptions to your operational reality.
                  </p>
                </div>
              </div>
            </section>

            {/* Tools */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-white">Apply This Methodology</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Link
                  href="/diagnostic"
                  className="rounded-lg border border-steel/20 bg-carbon/30 p-6 transition-all hover:border-neon/40"
                >
                  <h3 className="mb-2 font-semibold text-white">60-Second Diagnostic</h3>
                  <p className="text-sm text-steel">
                    Answer 9 questions to calculate your specific yard tax across all eight categories.
                  </p>
                </Link>

                <Link
                  href="/roi"
                  className="rounded-lg border border-steel/20 bg-carbon/30 p-6 transition-all hover:border-neon/40"
                >
                  <h3 className="mb-2 font-semibold text-white">Full ROI Calculator</h3>
                  <p className="text-sm text-steel">
                    Model your multi-facility network with custom assumptions and generate a board-ready PDF.
                  </p>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}

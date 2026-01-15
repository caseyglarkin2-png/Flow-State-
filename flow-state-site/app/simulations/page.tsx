import type { Metadata } from 'next';
import Link from 'next/link';
import { Activity, Network, ChevronRight, Zap, TrendingUp } from 'lucide-react';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Simulations - YardFlow by FreightRoll',
  description: 'Explore Primo and Singularity: the FreightRoll simulations that modeled yard operations and network effects before building YardFlow.',
};

export default function SimulationsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-void pt-32">
      {/* Hero */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Research Foundation</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight text-white md:text-7xl">
            Simulations
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-steel leading-relaxed">
            Before building YardFlow, FreightRoll ran thousands of simulations to understand yard dynamics and network effects. Primo modeled individual facilities. Singularity modeled enterprise networks. Both validated the economics that power YardFlow today.
          </p>
        </div>
      </section>

      {/* Primo Simulation */}
      <section className="border-b border-steel/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-neon/10 px-4 py-2">
                <Activity className="h-5 w-5 text-neon" />
                <span className="font-semibold text-neon">Primo Simulation</span>
              </div>
              
              <h2 className="mb-4 text-3xl font-bold text-white">
                Single-Facility Dynamics
              </h2>
              
              <p className="mb-6 text-lg text-steel">
                Primo simulates yard operations at the individual facility level, modeling gate throughput, detention costs, labor allocation, and capacity constraints. It validated our core ROI assumptions before we wrote a single line of production code.
              </p>
              
              <div className="space-y-4">
                <div className="rounded-lg border border-steel/20 bg-carbon/30 p-4">
                  <h3 className="mb-2 font-semibold text-white">What Primo Models</h3>
                  <ul className="space-y-2 text-steel">
                    <li className="flex items-start gap-2">
                      <Zap className="mt-1 h-4 w-4 flex-shrink-0 text-neon" />
                      <span>Gate-in to gate-out cycle times</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="mt-1 h-4 w-4 flex-shrink-0 text-neon" />
                      <span>Detention accrual and dispute patterns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="mt-1 h-4 w-4 flex-shrink-0 text-neon" />
                      <span>Labor allocation across shifts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="mt-1 h-4 w-4 flex-shrink-0 text-neon" />
                      <span>Throughput capacity constraints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="mt-1 h-4 w-4 flex-shrink-0 text-neon" />
                      <span>Exception handling costs</span>
                    </li>
                  </ul>
                </div>
                
                <div className="rounded-lg border border-steel/20 bg-carbon/30 p-4">
                  <h3 className="mb-2 font-semibold text-white">Key Findings</h3>
                  <ul className="space-y-2 text-steel">
                    <li className="flex items-start gap-2">
                      <TrendingUp className="mt-1 h-4 w-4 flex-shrink-0 text-neon" />
                      <span>Gate automation reduces cycle time by 40-60%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="mt-1 h-4 w-4 flex-shrink-0 text-neon" />
                      <span>Detention savings: $200K-$800K per facility annually</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="mt-1 h-4 w-4 flex-shrink-0 text-neon" />
                      <span>Labor reduction: 2-6 FTE per facility</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Link
                href="/singularity"
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-neon/40 bg-neon/5 px-6 py-3 font-semibold text-neon transition-all hover:bg-neon/10"
              >
                Explore Network Intelligence
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
            
            <div className="rounded-lg border border-steel/20 bg-carbon/20 p-8">
              <h3 className="mb-4 text-xl font-semibold text-white">Sample Primo Output</h3>
              <div className="space-y-4">
                <div className="rounded-lg border border-neon/20 bg-void/50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-steel">Baseline Dwell Time</span>
                    <span className="text-lg font-bold text-white">55 min</span>
                  </div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-steel">Optimized Dwell Time</span>
                    <span className="text-lg font-bold text-neon">28 min</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-steel/20 pt-2">
                    <span className="text-sm font-semibold text-white">Improvement</span>
                    <span className="text-lg font-bold text-neon">49%</span>
                  </div>
                </div>
                
                <div className="rounded-lg border border-neon/20 bg-void/50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-steel">Annual Detention Cost</span>
                    <span className="text-lg font-bold text-white">$520K</span>
                  </div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-steel">After Automation</span>
                    <span className="text-lg font-bold text-neon">$85K</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-steel/20 pt-2">
                    <span className="text-sm font-semibold text-white">Savings</span>
                    <span className="text-lg font-bold text-neon">$435K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Singularity Simulation */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="lg:order-2">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-ember/10 px-4 py-2">
                <Network className="h-5 w-5 text-ember" />
                <span className="font-semibold text-ember">Singularity Simulation</span>
              </div>
              
              <h2 className="mb-4 text-3xl font-bold text-white">
                Enterprise Network Effects
              </h2>
              
              <p className="mb-6 text-lg text-steel">
                Singularity models yard automation across multi-facility enterprise networks. It quantifies network effects: how data sharing, carrier benchmarking, and coordinated planning create compounding value as more sites join the network.
              </p>
              
              <div className="space-y-4">
                <div className="rounded-lg border border-steel/20 bg-carbon/30 p-4">
                  <h3 className="mb-2 font-semibold text-white">What Singularity Models</h3>
                  <ul className="space-y-2 text-steel">
                    <li className="flex items-start gap-2">
                      <Zap className="mt-1 h-4 w-4 flex-shrink-0 text-ember" />
                      <span>Cross-facility data sharing and learning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="mt-1 h-4 w-4 flex-shrink-0 text-ember" />
                      <span>Carrier performance benchmarking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="mt-1 h-4 w-4 flex-shrink-0 text-ember" />
                      <span>Predictive ETA improvements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="mt-1 h-4 w-4 flex-shrink-0 text-ember" />
                      <span>Coordination efficiency gains</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="mt-1 h-4 w-4 flex-shrink-0 text-ember" />
                      <span>Negotiation leverage from aggregated data</span>
                    </li>
                  </ul>
                </div>
                
                <div className="rounded-lg border border-steel/20 bg-carbon/30 p-4">
                  <h3 className="mb-2 font-semibold text-white">Key Findings</h3>
                  <ul className="space-y-2 text-steel">
                    <li className="flex items-start gap-2">
                      <TrendingUp className="mt-1 h-4 w-4 flex-shrink-0 text-ember" />
                      <span>Network effects minimal until 10+ facilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="mt-1 h-4 w-4 flex-shrink-0 text-ember" />
                      <span>At 50 facilities: 1.12x value multiplier</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="mt-1 h-4 w-4 flex-shrink-0 text-ember" />
                      <span>At 200 facilities: 1.18x value multiplier</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Link
                href="/singularity"
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-ember/40 bg-ember/5 px-6 py-3 font-semibold text-ember transition-all hover:bg-ember/10"
              >
                Explore Singularity Simulation
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
            
            <div className="rounded-lg border border-steel/20 bg-carbon/20 p-8 lg:order-1">
              <h3 className="mb-4 text-xl font-semibold text-white">Network Effect Growth Curve</h3>
              <div className="space-y-4">
                <div className="rounded-lg border border-ember/20 bg-void/50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-steel">5 Facilities</span>
                    <span className="text-lg font-bold text-white">1.02x</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-steel/20">
                    <div className="h-full w-[2%] bg-ember"></div>
                  </div>
                  <p className="mt-1 text-xs text-steel">Minimal network effects</p>
                </div>
                
                <div className="rounded-lg border border-ember/20 bg-void/50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-steel">25 Facilities</span>
                    <span className="text-lg font-bold text-ember">1.08x</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-steel/20">
                    <div className="h-full w-[8%] bg-ember"></div>
                  </div>
                  <p className="mt-1 text-xs text-steel">Network effects emerging</p>
                </div>
                
                <div className="rounded-lg border border-ember/20 bg-void/50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-steel">100 Facilities</span>
                    <span className="text-lg font-bold text-ember">1.15x</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-steel/20">
                    <div className="h-full w-[15%] bg-ember"></div>
                  </div>
                  <p className="mt-1 text-xs text-steel">Significant compounding value</p>
                </div>
                
                <div className="rounded-lg border border-ember/20 bg-void/50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-steel">500 Facilities</span>
                    <span className="text-lg font-bold text-ember">1.22x</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-steel/20">
                    <div className="h-full w-[22%] bg-ember"></div>
                  </div>
                  <p className="mt-1 text-xs text-steel">Enterprise-scale multiplier</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-steel/20 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white">
            Ready to see YardFlow's economics in action?
          </h2>
          <p className="mt-4 text-lg text-steel">
            Use our ROI calculator to model your own facilities with the same economic engine powering Primo and Singularity.
          </p>
          <Link
            href="/roi"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-semibold text-void transition-all hover:bg-neon/90"
          >
            Calculate Your ROI
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}

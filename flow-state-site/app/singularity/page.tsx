/* ═══════════════════════════════════════════════════════════════
   SINGULARITY PAGE - The Variance Tax Protocol Visualization
   ═══════════════════════════════════════════════════════════════
   
   WHAT IT IS:
   - Interactive visualization of the Variance Tax Protocol
   - Black Hole → Particle Network transition showing value unlock
   - Real-time calculator driving shader parameters (Reynolds number)
   - 6-component cost model from whitepaper
   
   WHAT IT SHOWS:
   - Operational Reynolds Number (Re*) visualization
   - Viscosity (µ) as primary lever for reducing variance tax
   - Dissolve transition when synthetic capacity improves
   - Live cost breakdown with formula transparency
   
   INTEGRATION POINTS:
   - src/lib/varianceTax/* - Calculator engine
   - components/three/* - WebGL visualizations
   - shaders/* - GLSL raymarching and particle systems
   
   STATUS: Variance Tax Protocol implementation complete ✓
   ═══════════════════════════════════════════════════════════════ */

'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { VarianceTaxDashboard } from '@/components/singularity/VarianceTaxDashboard';
import {
  Prism,
  Ignite,
  Crosshair,
  Velocity,
} from '@/components/icons/FlowIcons';

export default function SingularityPage() {
  return (
    <div className="min-h-screen bg-void text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-block px-4 py-2 rounded-full border border-neon/50 bg-neon/10 text-neon text-sm font-semibold mb-8 animate-pulse-glow">
            <span className="inline-flex items-center gap-2">
              <Prism size={16} />
              THE VARIANCE TAX PROTOCOL
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            See Your <span className="neon-glow">Hidden Costs</span>
          </h1>

          <p className="text-xl md:text-2xl text-steel max-w-3xl mx-auto mb-8">
            Answer 12 questions. Watch your operational Reynolds number drive a real-time physics simulation. 
            See exactly where variance is draining your network.
          </p>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <Card className="text-center">
              <div className="text-neon mb-3 flex justify-center">
                <Prism size={32} />
              </div>
              <h3 className="font-bold text-white mb-2">Physics-Based Model</h3>
              <p className="text-steel/80 text-sm">
                Operational Reynolds Number (Re*) maps your inputs to shader parameters
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-neon mb-3 flex justify-center">
                <Velocity size={32} />
              </div>
              <h3 className="font-bold text-white mb-2">6-Component Analysis</h3>
              <p className="text-steel/80 text-sm">
                Recovery, detention, labor, chargeback, working capital, lost sales
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-neon mb-3 flex justify-center">
                <Crosshair size={32} />
              </div>
              <h3 className="font-bold text-white mb-2">Live Visualization</h3>
              <p className="text-steel/80 text-sm">
                Black hole dissolves into particle network as synthetic capacity improves
              </p>
            </Card>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void pointer-events-none"></div>
      </section>

      {/* Main Dashboard Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <VarianceTaxDashboard 
            layout="split"
            showBreakdown={true}
            debug={false}
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-24 px-6 bg-gradient-to-br from-neon/5 to-transparent border-t border-neon/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
            How the Protocol Works
          </h2>

          <div className="space-y-8">
            <Card>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neon/20 flex items-center justify-center">
                  <span className="text-neon font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Answer 12 Questions</h3>
                  <p className="text-steel">
                    Input your operational data: check-in times, dwell duration, load volume, labor costs, 
                    detention rates, and chargeback frequency. All values sourced from industry standards 
                    (ATRI, CSCMP, DAT, BLS).
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neon/20 flex items-center justify-center">
                  <span className="text-neon font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Calculate Reynolds Score</h3>
                  <p className="text-steel mb-3">
                    The calculator computes your Operational Reynolds Number (Re*):
                  </p>
                  <div className="bg-void/50 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
                    <p className="text-white mb-2">Re* = 0.5 × µ + 0.3 × ρ + 0.2 × v</p>
                    <p className="text-steel/70 text-xs">
                      µ = viscosity (manual vs digital check-in) <br />
                      ρ = density (average dwell time) <br />
                      v = velocity (annual load volume)
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neon/20 flex items-center justify-center">
                  <span className="text-neon font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Drive the Visualization</h3>
                  <p className="text-steel">
                    Your Reynolds score becomes the <code className="text-neon">uViscosity</code> uniform 
                    in the GLSL shaders. High viscosity = intense black hole gravitational pull. 
                    Low viscosity = dissolve transition to ordered particle network.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neon/20 flex items-center justify-center">
                  <span className="text-neon font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">See the Breakdown</h3>
                  <p className="text-steel">
                    The 6-component cost model shows exactly where variance is hitting you: 
                    recovery time, detention fees, labor inefficiency, chargebacks, working capital drag, 
                    and lost sales opportunities.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Co-Development Program */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-neon/10 to-transparent border-t border-neon/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-2 rounded-full border border-neon/50 text-neon text-sm font-semibold mb-8">
            <span className="inline-flex items-center gap-2">
              <Ignite size={16} />
              CO-DEVELOPMENT PROGRAM
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Co-Development Partners
          </h2>

          <p className="text-lg md:text-xl text-steel mb-8 max-w-2xl mx-auto">
            We're building the network with a select cohort of forward-thinking enterprises.
            Co-Development partners get priority deployment, direct product input, and <span className="text-neon font-semibold">founding partner pricing</span>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <div className="text-neon mb-3"><Velocity size={32} /></div>
              <h3 className="font-bold text-neon mb-2">Priority Access</h3>
              <p className="text-steel/80 text-sm">Jump the deployment queue. Go live in weeks, not quarters.</p>
            </Card>
            <Card>
              <div className="text-neon mb-3"><Crosshair size={32} /></div>
              <h3 className="font-bold text-neon mb-2">Product Council</h3>
              <p className="text-steel/80 text-sm">Direct input on roadmap. Shape the features your network needs.</p>
            </Card>
            <Card>
              <div className="text-neon mb-3"><Prism size={32} /></div>
              <h3 className="font-bold text-neon mb-2">Founder Pricing</h3>
              <p className="text-steel/80 text-sm">Early adopter pricing locked in. No increases.</p>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact?intent=qualify">
              <Button variant="neon-fill" size="lg" icon={<Crosshair size={20} className="text-void" />}>
                Apply for Co-Development
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

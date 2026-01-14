import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Ignite, FlowArrow, Velocity } from '@/components/icons/FlowIcons';

export const metadata = {
  title: 'Simulations & Tools | Resources | YardFlow',
  description: 'Interactive models for yard economics, network effects, and business case building.',
};

const simulations = [
  {
    title: 'Network Intelligence Simulator',
    description: 'Visualize how network effects compound across your facility footprint. See how adding nodes creates exponential intelligence value.',
    path: '/singularity',
    color: 'neon',
    icon: Ignite,
    features: [
      'Network effect multiplier modeling',
      'Cross-facility intelligence',
      'Scalability visualization',
    ],
  },
  {
    title: 'Network Leak Calculator',
    description: 'Quantify hidden operational costs from manual processes, detention, and dwell. The "leak" you may not know you\'re paying.',
    path: '/diagnostic',
    color: 'neon',
    icon: Velocity,
    features: [
      'Nine-component cost breakdown',
      'Industry benchmarking',
      'Savings projection',
    ],
  },
  {
    title: 'ROI Calculator (Pro Mode)',
    description: 'Build board-ready ROI models with adjustable assumptions, PDF export, and CFO-friendly presentation formatting.',
    path: '/roi',
    color: 'neon',
    icon: FlowArrow,
    features: [
      'Multi-scenario modeling',
      'Sensitivity analysis',
      'Export to PDF',
    ],
  },
];

export default function SimulationsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-void pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <Link href="/resources" className="text-sm text-neon hover:text-neon/80 mb-4 inline-block">
            ← Back to Resources
          </Link>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-4">Simulations & Tools</h1>
          <p className="text-steel text-lg max-w-3xl">
            Interactive models for planning, business case building, and understanding yard economics. 
            Run scenarios with your own data to see projected outcomes.
          </p>
        </div>

        <div className="space-y-6">
          {simulations.map((sim) => (
            <Link 
              key={sim.path}
              href={sim.path}
              className="group block p-8 rounded-2xl border border-neon/20 bg-carbon/50 hover:border-neon/40 hover:bg-carbon/70 transition"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0 bg-neon/10">
                  <sim.icon size={32} className="text-neon" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neon transition-colors">
                    {sim.title}
                  </h3>
                  <p className="text-steel mb-4">{sim.description}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    {sim.features.map((feature) => (
                      <span 
                        key={feature}
                        className="text-xs px-3 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-sm font-medium flex items-center gap-1 shrink-0 text-neon">
                  Launch <FlowArrow size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-2xl border border-neon/20 bg-carbon/50 text-center">
          <h3 className="text-xl font-semibold text-white mb-3">Need a Custom Model?</h3>
          <p className="text-steel mb-6 max-w-lg mx-auto">
            Our team builds custom ROI analyses and simulations for enterprise evaluations. 
            Tell us about your scenario.
          </p>
          <Link 
            href="/contact?intent=custom-model" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-neon text-void font-medium rounded-xl hover:bg-neon/90 transition"
          >
            Request Custom Analysis
          </Link>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}

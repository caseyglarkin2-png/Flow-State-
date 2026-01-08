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
    title: 'Primo Singularity Simulation',
    description: 'Model the economics of becoming the first YardFlow node in your region. Calculate network-effect premiums and first-mover advantages.',
    path: '/simulations',
    color: 'purple',
    icon: Ignite,
    features: [
      'Network effect multiplier modeling',
      'Regional market timing analysis',
      'Competitive positioning scenarios',
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
    color: 'amber',
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
          <Link href="/resources" className="text-neon hover:underline text-sm mb-4 inline-block">
            ← Back to Resources
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Simulations & Tools</h1>
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
              className={`group block p-8 rounded-xl border bg-carbon transition-all
                ${sim.color === 'purple' ? 'border-purple-500/20 hover:border-purple-500/50' : ''}
                ${sim.color === 'neon' ? 'border-neon/20 hover:border-neon/50' : ''}
                ${sim.color === 'amber' ? 'border-amber-500/20 hover:border-amber-500/50' : ''}
              `}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0
                  ${sim.color === 'purple' ? 'bg-purple-500/10' : ''}
                  ${sim.color === 'neon' ? 'bg-neon/10' : ''}
                  ${sim.color === 'amber' ? 'bg-amber-500/10' : ''}
                `}>
                  <sim.icon size={32} className={`
                    ${sim.color === 'purple' ? 'text-purple-400' : ''}
                    ${sim.color === 'neon' ? 'text-neon' : ''}
                    ${sim.color === 'amber' ? 'text-amber-400' : ''}
                  `} />
                </div>
                
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-2 transition-colors
                    ${sim.color === 'purple' ? 'group-hover:text-purple-400' : ''}
                    ${sim.color === 'neon' ? 'group-hover:text-neon' : ''}
                    ${sim.color === 'amber' ? 'group-hover:text-amber-400' : ''}
                  `}>
                    {sim.title}
                  </h3>
                  <p className="text-steel mb-4">{sim.description}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    {sim.features.map((feature) => (
                      <span 
                        key={feature}
                        className={`text-xs px-3 py-1.5 rounded-full
                          ${sim.color === 'purple' ? 'bg-purple-500/10 text-purple-300' : ''}
                          ${sim.color === 'neon' ? 'bg-neon/10 text-neon' : ''}
                          ${sim.color === 'amber' ? 'bg-amber-500/10 text-amber-300' : ''}
                        `}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`text-sm font-medium flex items-center gap-1 shrink-0
                  ${sim.color === 'purple' ? 'text-purple-400' : ''}
                  ${sim.color === 'neon' ? 'text-neon' : ''}
                  ${sim.color === 'amber' ? 'text-amber-400' : ''}
                `}>
                  Launch <FlowArrow size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-xl border border-neon/20 bg-carbon text-center">
          <h3 className="text-xl font-bold mb-3">Need a Custom Model?</h3>
          <p className="text-steel mb-6 max-w-lg mx-auto">
            Our team builds custom ROI analyses and simulations for enterprise evaluations. 
            Tell us about your scenario.
          </p>
          <Link 
            href="/contact?intent=custom-model" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-neon text-void font-semibold rounded-lg hover:shadow-lg hover:shadow-neon/50 transition-all"
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

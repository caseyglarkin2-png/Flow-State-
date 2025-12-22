'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Card from '@/components/Card';
import {
  Metrics,
  Agent,
  Cortex,
  Nexus,
  Ignite,
  Orbital,
  Shield,
  Crosshair,
  Velocity,
  Manifest,
  FlowArrow,
  Timeline,
  Prism,
} from '@/components/icons/FlowIcons';

export default function Home() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 grid-background opacity-30"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center py-20">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-tight">
            <span className="neon-glow">Put your yard</span>
            <br />
            <span>in Flow.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-steel mb-4 max-w-3xl mx-auto">
            <span className="text-neon font-semibold">Orchestrate the yard.</span> Eliminate turbulence.
          </p>
          
          <p className="text-lg text-steel/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your facility from a siloed bottleneck into a network of intelligent nodes transmitting ground source truth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="/singularity" className="btn-neon-fill inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all">
              <Ignite size={20} className="text-void" />
              Apply for Membership
            </a>
          </div>

          {/* Isometric Yard Visual */}
          <div className="relative w-full aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden glass-card">
            <div className="absolute inset-0 bg-gradient-to-b from-neon/20 to-transparent opacity-20"></div>
            <svg viewBox="0 0 800 600" className="w-full h-full">
              {/* Grid */}
              <defs>
                <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00B4FF" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#00B4FF" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              
              {/* Yard outline */}
              <rect x="100" y="100" width="600" height="400" fill="url(#gridGrad)" stroke="#00B4FF" strokeWidth="2" opacity="0.5" />
              
              {/* Gate */}
              <rect x="100" y="120" width="80" height="40" fill="none" stroke="#00B4FF" strokeWidth="2" opacity="0.7" />
              <text x="130" y="150" fontSize="12" fill="#00B4FF" opacity="0.6" textAnchor="middle">Gate</text>
              
              {/* Docks */}
              <rect x="620" y="150" width="40" height="120" fill="none" stroke="#FF2A00" strokeWidth="2" opacity="0.7" />
              <text x="670" y="220" fontSize="12" fill="#FF2A00" opacity="0.6">Docks</text>
              
              {/* Parking spots */}
              {[200, 320, 440].map((x, i) => (
                <g key={i}>
                  <rect x={x} y="200" width="80" height="100" fill="none" stroke="#00B4FF" strokeWidth="1" opacity="0.3" />
                  <circle cx={x + 40} cy={250} r="8" fill="#00B4FF" opacity="0.6" />
                </g>
              ))}
              
              {/* Moving data packets (trucks) */}
              <g id="packet1" opacity="0.8">
                <circle cx="200" cy="250" r="12" fill="#00B4FF" />
                <circle cx="200" cy="250" r="12" fill="none" stroke="#00B4FF" strokeWidth="2" opacity="0.5" />
              </g>
              <g id="packet2" opacity="0.6">
                <circle cx="340" cy="280" r="12" fill="#00B4FF" />
                <circle cx="340" cy="280" r="12" fill="none" stroke="#00B4FF" strokeWidth="2" opacity="0.3" />
              </g>
              
              {/* Connection lines */}
              <line x1="200" y1="250" x2="640" y2="200" stroke="#00B4FF" strokeWidth="1" opacity="0.3" strokeDasharray="5,5" />
              <line x1="340" y1="280" x2="640" y2="250" stroke="#00B4FF" strokeWidth="1" opacity="0.2" strokeDasharray="5,5" />
            </svg>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 bg-carbon/50 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black mb-8 neon-glow">The Supply Chain's Black Hole.</h2>
          
          <p className="text-lg md:text-xl text-steel/90 mb-12 leading-relaxed max-w-3xl">
            Transportation is digitized. Warehousing is automated. But the yard remains a chaotic gap of manual processes and opaque data. This breakdown drives <span className="text-neon font-semibold">"market fat"</span>: billions in wasted fuel, detention fees, and idle assets.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { stat: '40%', label: 'Driver time spent waiting' },
              { stat: '$100B', label: 'Annual industry waste' },
              { stat: '48 Min', label: 'Avg. manual turn time' },
            ].map((item, i) => (
              <Card key={i} hover>
                <div className="text-center">
                  <p className="text-5xl font-black neon-glow mb-3">{item.stat}</p>
                  <p className="text-steel/80">{item.label}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-24 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black mb-8">
            Orchestration <span className="text-neon">&gt;</span> Management.
          </h2>
          
          <p className="text-lg md:text-xl text-steel/90 mb-12 leading-relaxed max-w-3xl">
            Legacy YMS records what happened. Flow State dictates what happens next. By establishing <span className="text-neon font-semibold">Ground Source Truth</span>, we replace reported data with physical reality.
          </p>

          {/* Maturity Ladder */}
          <div className="space-y-4">
            {[
              { level: 1, name: 'Chaos', color: '#FF2A00', desc: 'Turbulent. Manual. Opaque.' },
              { level: 2, name: 'Management', color: '#FFB800', desc: 'Recorded. Reported. Reactive.' },
              { level: 3, name: 'Orchestration', color: '#00B4FF', desc: 'Optimized. Directed. Proactive.' },
              { level: 4, name: 'Flow State', color: '#00B4FF', desc: 'Perfect. Automated. Autonomous.' },
            ].map((step, i) => (
              <div key={i} className="glass-card p-6 flex items-center gap-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-void flex-shrink-0"
                  style={{ backgroundColor: step.color }}
                >
                  {step.level}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.name}</h3>
                  <p className="text-steel/80">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Modules Section */}
      <section className="py-24 bg-carbon/50 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black mb-16">Product Modules (YardOS)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Shield size={40} className="text-neon" />,
                name: 'Digital Guard',
                desc: 'Automate access. Verify drivers in seconds. Eliminate the clipboard.',
              },
              {
                icon: <Agent size={40} className="text-neon" />,
                name: 'Digital Comms',
                desc: 'Direct driver messaging. Native language translation. Zero radio chatter.',
              },
              {
                icon: <Manifest size={40} className="text-neon" />,
                name: 'Digital BOL',
                desc: 'Touchless documentation. Timestamped chain of custody. $10k/site savings.',
              },
              {
                icon: <Cortex size={40} className="text-neon" />,
                name: 'Digital YMS',
                desc: 'The central brain. Real-time asset tracking. AI-driven move recommendations.',
              },
            ].map((module, i) => (
              <Card key={i} hover>
                <div className="mb-4">{module.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-neon">{module.name}</h3>
                <p className="text-steel/80 leading-relaxed">{module.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* YardBuilder AI Section */}
      <section className="py-24 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                Project Genesis: Map Your Yard in Minutes.
              </h2>
              <p className="text-lg text-steel/90 mb-8 leading-relaxed">
                The deployment cliff is dead. Our generative AI turns an address into a working digital twin in under 10 minutes. No site visits. No friction.
              </p>
              <a href="/singularity" className="btn-neon-fill inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all">
                <Ignite size={20} className="text-void" />
                Apply for Membership
              </a>
            </div>

            {/* Animation placeholder */}
            <div className="glass-card aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="flex justify-center mb-4 text-neon">
                  <Orbital size={56} className="text-neon" />
                </div>
                <p className="text-neon font-semibold">Satellite Scan Animation</p>
                <p className="text-steel/60 text-sm mt-2">10 min digital twin generation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Primo Brands Proof Section */}
      <section id="proof" className="py-24 bg-carbon/50 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-12">Industrial Fluidity at Scale.</h2>
          
          <div className="glass-card p-12 mb-12">
            <p className="text-4xl font-bold text-neon mb-4">
              "If water can flow this fast, anything can."
            </p>
            <p className="text-xl text-steel">Primo Brands / Poland Spring</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { metric: '260 Sites', desc: 'Rapid deployment across network' },
              { metric: '50% Faster', desc: 'Turn time reduction' },
              { metric: '142% Velocity', desc: 'Gain in operational efficiency' },
            ].map((item, i) => (
              <Card key={i}>
                <p className="text-4xl font-black neon-glow mb-3">{item.metric}</p>
                <p className="text-steel/80">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Timeline */}
      <section className="py-24 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-4xl font-bold mb-12">Deployment: Crawl. Walk. Run.</h3>
          
          <div className="space-y-4">
            {[
              { phase: 'POC', days: 'Day 1-5', desc: 'Single lane, $15k' },
              { phase: 'Pilot', days: 'Day 30', desc: 'Full facility, no paper' },
              { phase: 'Network', days: 'Day 90', desc: 'Enterprise rollout' },
            ].map((item, i) => (
              <div key={i} className="glass-card p-6 flex items-start gap-6">
                <div className="w-12 h-12 rounded-full border-2 border-neon flex items-center justify-center flex-shrink-0 font-bold text-neon">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h4 className="text-xl font-bold mb-1">{item.phase}</h4>
                      <p className="text-steel/80">{item.days}</p>
                    </div>
                    <p className="text-neon font-semibold mt-2 md:mt-0">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Singularity Teaser */}
      <section className="py-24 bg-carbon/50 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="glass-card p-12 border border-neon/30 bg-neon/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-3 py-1 rounded-full border border-neon/50 text-neon text-sm font-semibold mb-6">
                  THE SINGULARITY
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6">
                  What happens when <span className="neon-glow">every yard</span> achieves Flow?
                </h2>
                <p className="text-lg text-steel/90 mb-8 leading-relaxed">
                  Watch the network transform in real-time. See Metcalfe's Law compound your ROI. 
                  Experience the moment when logistics becomes <span className="text-neon font-semibold">autonomous</span>.
                </p>
                <a href="/singularity" className="btn-neon-fill inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold">
                  <Velocity size={20} className="text-void" />
                  Enter the Simulation
                </a>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4 text-neon">
                  <Nexus size={80} className="text-neon" />
                </div>
                <p className="text-5xl font-black neon-glow mb-2">$221.7M</p>
                <p className="text-steel">Annual savings for 50 site network</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CFO Focus Section */}
      <section className="py-24 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-black mb-12 text-center">For the CFO Who Demands Proof</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { metric: '847%', label: 'Average Year 1 ROI', icon: <FlowArrow size={28} /> },
              { metric: '4.2mo', label: 'Payback Period', icon: <Timeline size={28} /> },
              { metric: '65%', label: 'Detention Reduction', icon: <Prism size={28} /> },
              { metric: '70%', label: 'Gate Labor Savings', icon: <Agent size={28} /> },
            ].map((item, i) => (
              <Card key={i} hover className="text-center">
                <div className="flex justify-center mb-2 text-neon">{item.icon}</div>
                <p className="text-4xl font-black neon-glow mb-2">{item.metric}</p>
                <p className="text-steel/80 text-sm">{item.label}</p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <a href="/roi" className="btn-neon inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold border-2 border-neon text-neon hover:bg-neon hover:text-void transition-all">
              <Metrics size={20} />
              Calculate Your ROI
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-neon/20 to-transparent border-t border-neon/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8">Ready for Laminar Flow?</h2>
          <p className="text-xl text-steel/90 mb-4">Join 200+ enterprises orchestrating their yards.</p>
          <p className="text-lg text-neon font-semibold mb-12">Only 5 Founding Member spots remaining.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/singularity" className="btn-neon-fill inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all">
              <Crosshair size={20} className="text-void" />
              Apply for Membership
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

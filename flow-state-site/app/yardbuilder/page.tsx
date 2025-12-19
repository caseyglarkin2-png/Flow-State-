'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { Metrics, Timeline, Nexus, Beacon, Ignite, Scope, Config, Genesis, Construct, Cycle, Orbital } from '@/components/icons/FlowIcons';

export default function YardBuilderPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-tight">
              The <span className="text-neon">10-Minute</span> Digital Twin.
            </h1>
            
            <p className="text-xl md:text-2xl text-steel mb-8 max-w-3xl mx-auto">
              Generative AI + Computer Vision. From satellite image to orchestration engine instantly.
            </p>
          </div>

          {/* 3-Step Visual Process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                step: 1,
                title: 'Input',
                subtitle: 'Location',
                desc: 'Type "123 Industrial Way, Jacksonville FL"',
                icon: <Beacon size={48} className="text-neon" />,
              },
              {
                step: 2,
                title: 'Scan',
                subtitle: 'Analysis',
                desc: 'AI analyzes satellite imagery and detects structures',
                icon: <Orbital size={48} className="text-neon" />,
              },
              {
                step: 3,
                title: 'Build',
                subtitle: 'Configuration',
                desc: 'Digital twin created. Customize zones and workflows',
                icon: <Genesis size={48} className="text-neon" />,
              },
            ].map((phase, i) => (
              <Card key={i} hover>
                <div className="text-center">
                  <div className="flex justify-center mb-4">{phase.icon}</div>
                  <p className="text-sm font-semibold text-steel/60 mb-2">STEP {phase.step}</p>
                  <h3 className="text-xl font-bold neon-glow mb-2">{phase.title}</h3>
                  <p className="text-xs text-steel/60 mb-4">{phase.subtitle}</p>
                  <p className="text-steel/80 text-sm">{phase.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-24 bg-carbon/50 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-black mb-8">Why It Matters</h2>
          
          <div className="glass-card p-12 mb-12">
            <p className="text-2xl leading-relaxed text-steel/90">
              The <span className="text-neon font-semibold">Deployment Cliff is the enemy of ROI.</span> Traditional YMS takes <span className="text-neon font-bold">months</span> to map and configure. YardBuilder AI does it in <span className="text-neon font-bold">minutes.</span>
            </p>
            <p className="text-lg text-steel/70 mt-6">
              This isn't just setup; it's the first step towards the <span className="text-neon font-semibold">Logistics Singularity.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                metric: '90%',
                label: 'Time reduction vs. manual mapping',
              },
              {
                metric: '0',
                label: 'Site visits required',
              },
              {
                metric: '$35k',
                label: 'Average savings per deployment',
              },
              {
                metric: '260+',
                label: 'Sites deployed in record time',
              },
            ].map((stat, i) => (
              <Card key={i} hover>
                <p className="text-5xl font-black neon-glow mb-3">{stat.metric}</p>
                <p className="text-steel/80">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Deep Dive */}
      <section className="py-24 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-black mb-12">How It Works</h2>
          
          <div className="space-y-8">
            {[
              {
                title: 'Satellite Ingestion',
                desc: 'YardBuilder AI accesses high-resolution satellite imagery of your facility through Google Earth API. The system analyzes pixel patterns to identify paved surfaces, building boundaries, and existing infrastructure.',
              },
              {
                title: 'Computer Vision Analysis',
                desc: 'Deep learning models trained on 10,000+ logistics facilities identify dock doors, loading zones, parking areas, and potential reefer zones. The system recognizes patterns unique to your sector.',
              },
              {
                title: 'Generative Configuration',
                desc: 'The AI generates an initial yard layout with optimized zones, parking spots, and workflows. You refine it via a drag-and-drop editor—adding reefer zones, customizing spot counts, setting flow rules.',
              },
              {
                title: 'Instant Integration',
                desc: 'Your Digital Twin is immediately available in Flow State YMS. Gates auto-calibrate to coordinates. Dock sensors integrate. AI-driven moves begin immediately.',
              },
            ].map((step, i) => (
              <Card key={i} hover>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full border-2 border-neon flex items-center justify-center flex-shrink-0 font-bold text-neon">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-steel/80 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-carbon/50 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-black mb-12">Use Cases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Construct size={40} />,
                title: 'New Facility Setup',
                desc: 'Launching a new DC? YardBuilder maps it instantly. No delays to your opening day.',
              },
              {
                icon: <Cycle size={40} />,
                title: 'Facility Expansion',
                desc: 'Added a new yard wing? Rescan and re-optimize in minutes.',
              },
              {
                icon: <Metrics size={40} />,
                title: 'Network Consolidation',
                desc: 'Merging multiple yards? Create digital twins for each, then orchestrate together.',
              },
              {
                icon: <Nexus size={40} />,
                title: 'Global Rollout',
                desc: 'Going international? Deploy to 50 facilities across geographies—zero manual mapping.',
              },
              {
                icon: <Scope size={40} />,
                title: 'Competitive Analysis',
                desc: 'Analyze competitor yards. Optimize your own layout against the best in class.',
              },
              {
                icon: <Config size={40} />,
                title: 'Capacity Planning',
                desc: 'Model "what-if" scenarios. Increase throughput without expanding footprint.',
              },
            ].map((use, i) => (
              <Card key={i} hover>
                <div className="text-neon mb-4">{use.icon}</div>
                <h3 className="text-xl font-bold text-neon mb-3">{use.title}</h3>
                <p className="text-steel/80">{use.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-b border-neon/20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-black mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                q: 'How accurate is the AI mapping?',
                a: '97% accurate compared to manual surveys. Mismatches are easily corrected in the visual editor.',
              },
              {
                q: 'Can I use older satellite imagery?',
                a: 'Yes. But newer imagery (last 30 days) provides better accuracy. YardBuilder auto-pulls the latest.',
              },
              {
                q: 'What about facilities with shade/shadows?',
                a: 'Our multi-spectral analysis works in various lighting conditions. Overcast, dawn, dusk—all covered.',
              },
              {
                q: 'Do I need GPS equipment pre-installed?',
                a: 'No. YardBuilder works with existing coordinates. GPS integration happens later if desired.',
              },
              {
                q: 'Can the AI learn from my custom zones?',
                a: 'Absolutely. Feedback loops improve the model for your vertical and regional conditions.',
              },
            ].map((faq, i) => (
              <div key={i} className="glass-card p-6">
                <h3 className="text-lg font-bold text-neon mb-3">{faq.q}</h3>
                <p className="text-steel/80 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-neon/20 to-transparent border-t border-neon/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black mb-8">Ready to Map Your Yard?</h2>
          <p className="text-xl text-steel/90 mb-12">Get your digital twin in 10 minutes. Try it free.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="neon-fill" size="lg" icon={<Ignite size={20} className="text-void" />}>
              Start Free Trial
            </Button>
            <Button variant="neon" size="lg" icon={<Timeline size={20} />}>
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

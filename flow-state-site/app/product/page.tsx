'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { Metrics, Agent, Confirm, Nexus, Shield, Territory, Ignite, Device, Crosshair, Velocity } from '@/components/icons/FlowIcons';

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6 text-center py-20">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-tight">
            The <span className="text-neon">Operating System</span> for Heavy Water.
          </h1>
          
          <p className="text-xl md:text-2xl text-steel mb-12 max-w-3xl mx-auto">
            A modular, driver-first platform that synchronizes the gate, the dock, and the yard.
          </p>

          <Button variant="neon-fill" size="lg" icon={<Ignite size={20} className="text-void" />}>
            Get Started
          </Button>
        </div>
      </section>

      {/* Module 1: Digital Guard */}
      <section className="py-24 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <h2 className="text-5xl font-black mb-6">The Digital Guard</h2>
              <p className="text-lg text-steel/90 mb-8 leading-relaxed">
                The Unmanned Gate is here. Self-service kiosks and mobile workflows allow drivers to check themselves in against scheduled appointments. OCR cameras validate truck IDs instantly.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Eliminate paper check-ins',
                  'Real-time driver verification',
                  'Automated parking assignments',
                  'Reduced gate delays',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <Confirm size={20} className="text-neon flex-shrink-0" />
                    <span className="text-steel/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="neon">Learn More</Button>
            </div>

            {/* Visual */}
            <div className="glass-card aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="flex justify-center mb-4 text-neon">
                  <Device size={56} className="text-neon" />
                </div>
                <p className="text-neon font-semibold">Kiosk UI Mockup</p>
                <p className="text-steel/60 text-sm mt-2">Self-service access verification</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 2: Orchestration Engine */}
      <section className="py-24 bg-carbon/50 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual */}
            <div className="glass-card aspect-square flex items-center justify-center order-2 lg:order-1">
              <div className="text-center">
                <div className="flex justify-center mb-4 text-neon">
                  <Territory size={56} className="text-neon" />
                </div>
                <p className="text-neon font-semibold">Drag & Drop Yard Map</p>
                <p className="text-steel/60 text-sm mt-2">Real-time asset positioning</p>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <h2 className="text-5xl font-black mb-6">The Orchestration Engine</h2>
              <p className="text-lg text-steel/90 mb-8 leading-relaxed">
                Stop hunting. Start moving. Flow State tracks every asset's exact location. Drag-and-drop interface makes directing yard jockeys a video-game-like experience.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Real-time GPS tracking',
                  'Intuitive drag-and-drop moves',
                  'AI-powered recommendations',
                  'Autonomous move execution',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <Confirm size={20} className="text-neon flex-shrink-0" />
                    <span className="text-steel/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="neon">Explore Features</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Module 3: Driver Experience */}
      <section className="py-24 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <h2 className="text-5xl font-black mb-6">The Driver Experience</h2>
              <p className="text-lg text-steel/90 mb-8 leading-relaxed">
                No app required. Drivers receive SMS links to a secure web portal. Instructions are clear, translated, and timestamped.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'SMS-based instructions',
                  'Multi-language support',
                  'Zero app downloads',
                  'Real-time navigation',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <Confirm size={20} className="text-neon flex-shrink-0" />
                    <span className="text-steel/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="neon">See in Action</Button>
            </div>

            {/* Visual */}
            <div className="glass-card aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="flex justify-center mb-4 text-neon">
                  <Device size={56} className="text-neon" />
                </div>
                <p className="text-neon font-semibold">Mobile Portal</p>
                <p className="text-steel/60 text-sm mt-2">Proceed to Door 5</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-carbon/50 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-black mb-12">Why Flow State YardOS?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Velocity size={40} />,
                title: 'Lightning Fast',
                desc: 'Reduce yard dwell time by 50% with optimized workflows.',
              },
              {
                icon: <Crosshair size={40} />,
                title: 'Precision Tracking',
                desc: 'Know exactly where every asset is, every moment.',
              },
              {
                icon: <Shield size={40} />,
                title: 'Enterprise Security',
                desc: 'Bank-grade encryption and compliance-ready architecture.',
              },
              {
                icon: <Agent size={40} />,
                title: 'AI-Powered',
                desc: 'Intelligent move recommendations learn from your patterns.',
              },
              {
                icon: <Metrics size={40} />,
                title: 'Real-Time Analytics',
                desc: 'Live dashboards with actionable operational insights.',
              },
              {
                icon: <Nexus size={40} />,
                title: 'Global Scale',
                desc: 'Deploy across multi-site networks with unified control.',
              },
            ].map((feature, i) => (
              <Card key={i} hover>
                <div className="text-neon mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-neon">{feature.title}</h3>
                <p className="text-steel/80">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-neon/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black mb-8">Ready to Transform Your Yard?</h2>
          <p className="text-xl text-steel/90 mb-12">Get a live demo of YardOS in action.</p>
          <Button variant="neon-fill" size="lg" icon={<Crosshair size={20} className="text-void" />}>
            Book Your Demo
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

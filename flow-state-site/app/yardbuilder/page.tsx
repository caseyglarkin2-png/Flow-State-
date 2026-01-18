"use client";

import React, { useState, useEffect } from 'react';
import { analytics } from '@/lib/analytics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import { Velocity, Ignite, FlowArrow, Metrics, Cortex } from '@/components/icons/FlowIcons';
import { MapPin, Building2, Users, CheckCircle2, ArrowRight } from 'lucide-react';

type FacilityType = 'dc' | 'plant' | 'cross-dock' | 'terminal' | 'yard';
type Pain = 'detention' | 'gate' | 'labor' | 'visibility' | 'throughput';

export default function YardBuilderPage() {
  useEffect(() => {
    analytics.viewYardBuilder();
  }, []);

  const [formState, setFormState] = useState<'form' | 'submitting' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    facilityCount: '',
    facilityType: '' as FacilityType | '',
    primaryPain: '' as Pain | '',
    timeline: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'yardbuilder',
          intent: 'digital-twin-request',
        }),
      });
      
      if (response.ok) {
        setFormState('success');
        analytics.track('digital_twin_requested', { company: formData.company });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormState('form');
      alert('There was an error submitting your request. Please try again.');
    }
  };

  const deliverables = [
    {
      icon: MapPin,
      title: 'Satellite Facility Mapping',
      description: 'We analyze your facility layout using satellite imagery and your operational data.',
    },
    {
      icon: Metrics,
      title: 'Asset Inventory',
      description: 'Complete count of docks, gates, parking spots, and yard zones.',
    },
    {
      icon: Cortex,
      title: 'Workflow Analysis',
      description: 'Current state process mapping with bottleneck identification.',
    },
    {
      icon: Velocity,
      title: 'Optimization Roadmap',
      description: 'Prioritized recommendations for yard automation and efficiency gains.',
    },
  ];

  const process = [
    { step: '1', title: 'Submit Request', description: 'Tell us about your facility and operational challenges.' },
    { step: '2', title: 'Discovery Call', description: 'Brief call to understand your specific requirements.' },
    { step: '3', title: 'Analysis & Build', description: 'We build your digital twin using satellite + operational data.' },
    { step: '4', title: 'Delivery', description: 'Walkthrough of your digital twin with actionable recommendations.' },
  ];

  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Co-Development Program</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white">
            Request a Digital Twin of Your Yard
          </h1>
          <p className="mt-4 text-xl text-steel max-w-2xl leading-relaxed">
            Complete digital model of your facility: asset inventory, workflow mapping, optimization roadmap. No software required on your end.
          </p>
          <a 
            href="#request-form"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-neon text-void font-semibold rounded-xl hover:bg-white transition-all"
          >
            Request Your Digital Twin <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Deliverables</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">What's Included</h2>
          <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl mb-10">Comprehensive facility analysis delivered by our operations team.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((item) => (
              <div key={item.title} className="rounded-xl border border-neon/10 bg-carbon/50 p-5">
                <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center mb-4">
                  <item.icon size={20} className="text-neon" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-steel text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Process</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white mb-10">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {process.map((item, idx) => (
              <div key={item.step} className="relative">
                {idx < process.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px bg-neon/20 -translate-x-1/2" />
                )}
                <div className="w-12 h-12 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center text-neon font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-steel text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section id="request-form" className="py-16 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-6">
          {formState === 'success' ? (
            <Card className="border-neon/30 text-center py-12">
              <div className="w-16 h-16 rounded-full bg-neon/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} className="text-neon" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4">Request Received</h2>
              <p className="text-steel mb-6 max-w-md mx-auto">
                Thank you for your interest in YardFlow. Our team will reach out within 2 business days to schedule a discovery call.
              </p>
              <a 
                href="/roi"
                className="inline-flex items-center gap-2 text-neon hover:text-neon/80 transition-colors"
              >
                Explore ROI Calculator while you wait <FlowArrow size={14} />
              </a>
            </Card>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="text-2xl font-semibold tracking-tight text-white mb-3">Request Your Digital Twin</h2>
                <p className="text-steel">Tell us about your facility and we'll build a customized digital model.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Card className="border-neon/20">
                  <h3 className="font-semibold text-neon mb-4 flex items-center gap-2">
                    <Users size={18} /> Contact Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-steel mb-1.5">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-carbon border border-steel/20 rounded-xl px-4 py-2.5 text-white focus:border-neon/50 focus:outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-steel mb-1.5">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-carbon border border-steel/20 rounded-xl px-4 py-2.5 text-white focus:border-neon/50 focus:outline-none transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-steel mb-1.5">Company *</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-carbon border border-steel/20 rounded-xl px-4 py-2.5 text-white focus:border-neon/50 focus:outline-none transition-colors"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-steel mb-1.5">Role</label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full bg-carbon border border-steel/20 rounded-xl px-4 py-2.5 text-white focus:border-neon/50 focus:outline-none transition-colors"
                        placeholder="Your title"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="border-neon/20">
                  <h3 className="font-semibold text-neon mb-4 flex items-center gap-2">
                    <Building2 size={18} /> Facility Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-steel mb-1.5">Number of Facilities *</label>
                      <select
                        required
                        value={formData.facilityCount}
                        onChange={(e) => setFormData({ ...formData, facilityCount: e.target.value })}
                        className="w-full bg-carbon border border-steel/20 rounded-xl px-4 py-2.5 text-white focus:border-neon/50 focus:outline-none transition-colors"
                      >
                        <option value="">Select...</option>
                        <option value="1">1 facility</option>
                        <option value="2-5">2-5 facilities</option>
                        <option value="6-15">6-15 facilities</option>
                        <option value="16-50">16-50 facilities</option>
                        <option value="50+">50+ facilities</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-steel mb-1.5">Primary Facility Type *</label>
                      <select
                        required
                        value={formData.facilityType}
                        onChange={(e) => setFormData({ ...formData, facilityType: e.target.value as FacilityType })}
                        className="w-full bg-carbon border border-steel/20 rounded-xl px-4 py-2.5 text-white focus:border-neon/50 focus:outline-none transition-colors"
                      >
                        <option value="">Select...</option>
                        <option value="dc">Distribution Center</option>
                        <option value="plant">Manufacturing Plant</option>
                        <option value="cross-dock">Cross-Dock</option>
                        <option value="terminal">Terminal</option>
                        <option value="yard">Dedicated Yard</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-steel mb-1.5">Primary Challenge *</label>
                      <select
                        required
                        value={formData.primaryPain}
                        onChange={(e) => setFormData({ ...formData, primaryPain: e.target.value as Pain })}
                        className="w-full bg-carbon border border-steel/20 rounded-xl px-4 py-2.5 text-white focus:border-neon/50 focus:outline-none transition-colors"
                      >
                        <option value="">Select...</option>
                        <option value="detention">Detention & Dwell Costs</option>
                        <option value="gate">Gate Throughput</option>
                        <option value="labor">Labor Efficiency</option>
                        <option value="visibility">Real-Time Visibility</option>
                        <option value="throughput">Throughput Variance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-steel mb-1.5">Timeline</label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full bg-carbon border border-steel/20 rounded-xl px-4 py-2.5 text-white focus:border-neon/50 focus:outline-none transition-colors"
                      >
                        <option value="">Select...</option>
                        <option value="immediate">Immediate (0-3 months)</option>
                        <option value="near-term">Near-term (3-6 months)</option>
                        <option value="planning">Planning phase (6-12 months)</option>
                        <option value="exploring">Just exploring</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm text-steel mb-1.5">Additional Context</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      className="w-full bg-carbon border border-steel/20 rounded-xl px-4 py-2.5 text-white focus:border-neon/50 focus:outline-none transition-colors resize-none"
                      placeholder="Any specific challenges, goals, or questions you'd like us to address..."
                    />
                  </div>
                </Card>

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full py-4 bg-neon text-void font-semibold rounded-xl hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {formState === 'submitting' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-void/30 border-t-void rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Request Digital Twin <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <p className="text-center text-steel/60 text-sm">
                  By submitting, you agree to our <a href="/privacy" className="text-neon hover:underline">Privacy Policy</a>.
                </p>
              </form>
            </>
          )}
        </div>
      </section>

      {/* Alternative CTAs */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-neon/20">
              <h3 className="font-semibold text-white mb-2">Not ready for a digital twin?</h3>
              <p className="text-steel text-sm mb-4">Use our self-service ROI calculator to estimate savings potential.</p>
              <a href="/roi" className="inline-flex items-center gap-1 text-neon text-sm hover:text-neon/80 transition-colors">
                ROI Calculator <FlowArrow size={12} />
              </a>
            </Card>
            <Card className="border-neon/20">
              <h3 className="font-semibold text-white mb-2">Quick diagnostic?</h3>
              <p className="text-steel text-sm mb-4">Calculate your Variance Tax in 2 minutes with our diagnostic tool.</p>
              <a href="/diagnostic" className="inline-flex items-center gap-1 text-neon text-sm hover:text-neon/80 transition-colors">
                Variance Tax Calculator <FlowArrow size={12} />
              </a>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

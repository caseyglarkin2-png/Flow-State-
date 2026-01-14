import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FlowArrow, Shield, Velocity, Ignite, Nexus } from '@/components/icons/FlowIcons';

export const metadata = {
  title: 'Resources | YardFlow by FreightRoll',
  description: 'Guides, field notes, and simulations for yard operations leaders. From dwell reduction strategies to network optimization models.',
};

const guides = [
  {
    slug: 'cargo-theft-prevention',
    title: 'Cargo Theft Prevention: Technology & Process Approaches',
    description: 'How leading logistics operators reduce theft exposure through identity verification, visibility, and layered security protocols.',
    audience: ['Security Directors', 'Procurement', 'Operations Managers'],
    readTime: '12 min',
    icon: Shield,
  },
  {
    slug: 'network-effect-yard-automation',
    title: 'Network Effects in Yard Automation',
    description: 'Understanding how connected yards create compounding operational advantages and the economics behind multi-site adoption.',
    audience: ['VPs Operations', 'CFOs', 'Strategy'],
    readTime: '10 min',
    icon: Nexus,
  },
  {
    slug: 'ctpat-tsa-compliance',
    title: 'C-TPAT & TSA Compliance: Operational Readiness',
    description: 'A practical framework for maintaining supply chain security certification while minimizing compliance overhead.',
    audience: ['Compliance Officers', 'Security', 'Legal'],
    readTime: '8 min',
    icon: Shield,
  },
];

const fieldNotes = [
  {
    slug: 'dwell-time-patterns',
    title: 'Dwell Time Patterns Across 50+ Yards',
    description: 'Anonymized analysis of dwell contributors from our network. What actually moves the needle.',
    audience: ['Operations'],
    readTime: '6 min',
  },
  {
    slug: 'gate-throughput-benchmarks',
    title: 'Gate Throughput Benchmarks by Yard Type',
    description: 'Distribution centers, intermodal terminals, and cross-docks compared. Where are the gaps?',
    audience: ['Site Managers', 'Engineering'],
    readTime: '5 min',
  },
];

const simulations = [
  {
    slug: 'primo-singularity',
    title: 'Primo Singularity Simulation',
    description: 'Model the economics of becoming the first YardFlow node in your region. Calculate network-effect premiums.',
    path: '/simulations',
    icon: Ignite,
  },
  {
    slug: 'yard-tax-calculator',
    title: 'Network Leak Calculator',
    description: 'Quantify hidden operational costs from manual processes, detention, and dwell. The "leak" you may not know you\'re paying.',
    path: '/diagnostic',
    icon: Velocity,
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-void pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Resource Library</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white mb-6">
            Operational Intelligence for <span className="text-neon">Yard Leaders</span>
          </h1>
          <p className="text-steel text-lg max-w-3xl">
            No fluff. No theory. Actionable frameworks and data from operators who&apos;ve reduced 
            dwell, cut theft exposure, and scaled yard operations across networks.
          </p>
        </div>

        {/* Guides Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center">
              <Shield size={20} className="text-neon" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white">Guides</h2>
              <p className="text-steel text-sm">Deep-dive frameworks for specific operational challenges</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Link 
                key={guide.slug}
                href={`/resources/guides/${guide.slug}`}
                className="group block p-6 rounded-2xl border border-neon/20 bg-carbon/50 hover:border-neon/40 hover:bg-carbon/70 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <guide.icon size={24} className="text-neon" />
                  <span className="text-xs text-steel/60">{guide.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-neon transition-colors">
                  {guide.title}
                </h3>
                <p className="text-steel text-sm mb-4">{guide.description}</p>
                <div className="flex flex-wrap gap-2">
                  {guide.audience.map((a) => (
                    <span key={a} className="text-xs px-2.5 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon">
                      {a}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Field Notes Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center">
              <Velocity size={20} className="text-neon" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white">Field Notes</h2>
              <p className="text-steel text-sm">Patterns and insights from our operational network</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {fieldNotes.map((note) => (
              <Link 
                key={note.slug}
                href={`/resources/field-notes/${note.slug}`}
                className="group block p-6 rounded-2xl border border-neon/20 bg-carbon/50 hover:border-neon/40 hover:bg-carbon/70 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white group-hover:text-neon transition-colors">
                    {note.title}
                  </h3>
                  <span className="text-xs text-steel/60">{note.readTime}</span>
                </div>
                <p className="text-steel text-sm mb-4">{note.description}</p>
                <div className="flex flex-wrap gap-2">
                  {note.audience.map((a) => (
                    <span key={a} className="text-xs px-2.5 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon">
                      {a}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <p className="text-steel/60 text-sm mt-6">
            More field notes coming soon. Join the network to access full research.
          </p>
        </section>

        {/* Simulations & Tools Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center">
              <Ignite size={20} className="text-neon" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white">Simulations & Tools</h2>
              <p className="text-steel text-sm">Interactive models for planning and business cases</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {simulations.map((sim) => (
              <Link 
                key={sim.slug}
                href={sim.path}
                className="group block p-6 rounded-2xl border border-neon/20 bg-carbon/50 hover:border-neon/40 hover:bg-carbon/70 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center shrink-0">
                    <sim.icon size={24} className="text-neon" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-neon transition-colors">
                      {sim.title}
                    </h3>
                    <p className="text-steel text-sm">{sim.description}</p>
                    <span className="inline-flex items-center gap-1 text-neon text-sm mt-3 font-medium">
                      Launch tool <FlowArrow size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-neon/20 bg-carbon/50 p-8 md:p-12">
          <div className="flex items-start gap-6">
            <div className="rounded-xl bg-neon/10 p-3">
              <FlowArrow size={28} className="text-neon" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">Need something specific?</h2>
              <p className="text-steel mb-8 max-w-2xl">
                We build custom ROI models and operational assessments for enterprise teams. 
                Tell us about your yard challenges.
              </p>
              <Link 
                href="/contact?intent=resources" 
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-neon text-void font-medium rounded-xl hover:bg-neon/90 transition"
              >
                Request Custom Analysis
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
    <Footer />
    </>
  );
}

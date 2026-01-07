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
    title: 'Yard Tax Calculator',
    description: 'Quantify hidden operational costs from manual processes, detention, and dwell. The "tax" you may not know you\'re paying.',
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
          <span className="text-neon font-mono text-sm uppercase tracking-wider">Resource Library</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
            Operational Intelligence for <span className="neon-glow">Yard Leaders</span>
          </h1>
          <p className="text-steel text-lg max-w-3xl">
            No fluff. No theory. Actionable frameworks and data from operators who&apos;ve reduced 
            dwell, cut theft exposure, and scaled yard operations across networks.
          </p>
        </div>

        {/* Guides Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center">
              <Shield size={20} className="text-neon" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Guides</h2>
              <p className="text-steel text-sm">Deep-dive frameworks for specific operational challenges</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Link 
                key={guide.slug}
                href={`/resources/guides/${guide.slug}`}
                className="group block p-6 rounded-xl border border-neon/20 bg-carbon hover:border-neon/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <guide.icon size={24} className="text-neon" />
                  <span className="text-xs text-steel/60 font-mono">{guide.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-neon transition-colors">
                  {guide.title}
                </h3>
                <p className="text-steel text-sm mb-4">{guide.description}</p>
                <div className="flex flex-wrap gap-2">
                  {guide.audience.map((a) => (
                    <span key={a} className="text-xs px-2 py-1 rounded-full bg-neon/10 text-neon/80">
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
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Velocity size={20} className="text-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Field Notes</h2>
              <p className="text-steel text-sm">Patterns and insights from our operational network</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {fieldNotes.map((note) => (
              <Link 
                key={note.slug}
                href={`/resources/field-notes/${note.slug}`}
                className="group block p-6 rounded-xl border border-amber-500/20 bg-carbon hover:border-amber-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold group-hover:text-amber-400 transition-colors">
                    {note.title}
                  </h3>
                  <span className="text-xs text-steel/60 font-mono">{note.readTime}</span>
                </div>
                <p className="text-steel text-sm mb-3">{note.description}</p>
                <div className="flex flex-wrap gap-2">
                  {note.audience.map((a) => (
                    <span key={a} className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-400/80">
                      {a}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <p className="text-steel/60 text-sm mt-6 italic">
            More field notes coming soon. Join the network to access full research.
          </p>
        </section>

        {/* Simulations & Tools Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Ignite size={20} className="text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Simulations & Tools</h2>
              <p className="text-steel text-sm">Interactive models for planning and business cases</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {simulations.map((sim) => (
              <Link 
                key={sim.slug}
                href={sim.path}
                className="group block p-6 rounded-xl border border-purple-500/20 bg-carbon hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                    <sim.icon size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                      {sim.title}
                    </h3>
                    <p className="text-steel text-sm">{sim.description}</p>
                    <span className="inline-flex items-center gap-1 text-purple-400 text-sm mt-3 font-medium">
                      Launch tool <FlowArrow size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-neon/30 bg-gradient-to-br from-neon/5 to-transparent p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need something specific?</h2>
          <p className="text-steel mb-8 max-w-2xl mx-auto">
            We build custom ROI models and operational assessments for enterprise teams. 
            Tell us about your yard challenges.
          </p>
          <Link 
            href="/contact?intent=resources" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-neon text-void font-semibold rounded-lg hover:shadow-lg hover:shadow-neon/50 transition-all"
          >
            <FlowArrow size={16} /> Request Custom Analysis
          </Link>
        </section>
      </div>
    </main>
    <Footer />
    </>
  );
}

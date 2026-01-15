import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Nexus, Velocity, Ignite } from '@/components/icons/FlowIcons';

export const metadata = {
  title: 'Resources | YardFlow by FreightRoll',
  description: 'Guides, field notes, and simulations for yard operations leaders. From dwell reduction strategies to network optimization models.',
};

const guides = [
  {
    slug: 'cargo-theft-prevention',
    title: 'Cargo Theft Prevention',
    description: 'ID verification, visibility, and layered security protocols. How operators reduce theft exposure.',
    audience: 'Security · Procurement · Ops',
    readTime: '12 min',
    Icon: Shield,
  },
  {
    slug: 'network-effect-yard-automation',
    title: 'Network Effects in Yard Automation',
    description: 'How connected yards create compounding operational advantages. The economics of multi-site adoption.',
    audience: 'VPs Ops · CFOs · Strategy',
    readTime: '10 min',
    Icon: Nexus,
  },
  {
    slug: 'ctpat-tsa-compliance',
    title: 'C-TPAT & TSA Compliance',
    description: 'Maintain supply chain security certification. Minimize compliance overhead.',
    audience: 'Compliance · Security · Legal',
    readTime: '8 min',
    Icon: Shield,
  },
];

const fieldNotes = [
  {
    slug: 'dwell-time-patterns',
    title: 'Dwell Time Patterns Across 50+ Yards',
    description: 'Anonymized analysis. What actually moves the needle.',
    readTime: '6 min',
  },
  {
    slug: 'gate-throughput-benchmarks',
    title: 'Gate Throughput Benchmarks by Yard Type',
    description: 'DCs, intermodal terminals, cross-docks compared. Where are the gaps?',
    readTime: '5 min',
  },
];

const simulations = [
  {
    slug: 'primo-singularity',
    title: 'Primo Singularity Simulation',
    description: 'Model becoming the first YardFlow node in your region. Calculate network-effect premiums.',
    path: '/simulations',
    Icon: Ignite,
  },
  {
    slug: 'yard-tax-calculator',
    title: 'Network Leak Calculator',
    description: 'Quantify hidden costs from manual processes, detention, dwell. The leak you may not know.',
    path: '/diagnostic',
    Icon: Velocity,
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-void pt-32 pb-24">
        <div className="mx-auto max-w-6xl px-6">
          {/* Hero */}
          <section className="mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Resource Library</p>
            <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white">
              Operational Intel for Yard Leaders
            </h1>
            <p className="mt-4 text-xl text-steel max-w-2xl leading-relaxed">
              No fluff. No theory. Actionable frameworks from operators who've reduced dwell, cut theft exposure, and scaled yard operations.
            </p>
          </section>

          {/* Guides */}
          <section className="py-16">
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Guides</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Deep-Dive Frameworks</h2>
            <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl mb-10">Specific operational challenges. Structured solutions.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/resources/guides/${g.slug}`}
                  className="group rounded-2xl border border-neon/20 bg-carbon/50 p-6 hover:border-neon/40 transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center mb-4">
                    <g.Icon size={20} className="text-neon" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon transition">{g.title}</h3>
                  <p className="text-sm text-steel leading-relaxed mb-4">{g.description}</p>
                  <div className="flex items-center justify-between text-xs text-steel/60">
                    <span>{g.audience}</span>
                    <span>{g.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Field Notes */}
          <section className="py-16">
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Field Notes</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">From the Network</h2>
            <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl mb-10">Anonymized patterns. Real data. What moves the needle.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fieldNotes.map((fn) => (
                <Link
                  key={fn.slug}
                  href={`/resources/field-notes/${fn.slug}`}
                  className="group rounded-xl border border-neon/10 bg-carbon/50 p-5 hover:border-neon/30 transition"
                >
                  <h3 className="font-bold text-white mb-2 group-hover:text-neon transition">{fn.title}</h3>
                  <p className="text-sm text-steel leading-relaxed mb-3">{fn.description}</p>
                  <span className="text-xs text-steel/50">{fn.readTime}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Interactive Tools */}
          <section className="py-16">
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Interactive Tools</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Simulations & Calculators</h2>
            <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl mb-10">Model your network. See the numbers.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {simulations.map((s) => (
                <Link
                  key={s.slug}
                  href={s.path}
                  className="group rounded-2xl border border-neon/20 bg-neon/5 p-6 hover:border-neon/40 transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center mb-4">
                    <s.Icon size={20} className="text-neon" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon transition">{s.title}</h3>
                  <p className="text-sm text-steel leading-relaxed">{s.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Procurement */}
          <section className="py-16">
            <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-ember/70">Procurement Resources</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">Evidence Vault</h2>
              <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl">
                Security posture. Compliance documentation. DPAs. SOC 2 roadmap. Everything procurement needs.
              </p>
              <Link
                href="/resources/procurement"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-white transition"
              >
                Open Evidence Vault
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

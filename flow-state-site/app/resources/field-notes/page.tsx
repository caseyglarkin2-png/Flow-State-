import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Velocity } from '@/components/icons/FlowIcons';

export const metadata = {
  title: 'Field Notes | Resources | YardFlow',
  description: 'Operational patterns and insights from our network. Anonymized data and observations from real yard operations.',
};

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

export default function FieldNotesIndexPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-void pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <Link href="/resources" className="text-sm text-neon hover:text-neon/80 mb-4 inline-block">
            ← Back to Resources
          </Link>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">Field Notes</h1>
          <p className="text-steel text-lg max-w-3xl">
            Operational patterns and insights from our network. Real observations, anonymized data, 
            and lessons learned from yards across the industry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
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

        <div className="p-8 rounded-2xl border border-neon/20 bg-carbon/50">
          <div className="flex items-start gap-6">
            <div className="rounded-xl bg-neon/10 p-3">
              <Velocity size={28} className="text-neon" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">More Field Notes Coming</h3>
              <p className="text-steel mb-6 max-w-2xl">
                Join the network to access our full research library and contribute your own operational insights.
              </p>
              <Link 
                href="/contact?intent=research" 
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-neon text-void font-medium rounded-xl hover:bg-neon/90 transition"
              >
                Request Access
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}

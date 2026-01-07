import React from 'react';
import Link from 'next/link';
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
    <main className="min-h-screen bg-void pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <Link href="/resources" className="text-neon hover:underline text-sm mb-4 inline-block">
            ← Back to Resources
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Field Notes</h1>
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

        <div className="p-8 rounded-xl border border-amber-500/20 bg-amber-500/5 text-center">
          <Velocity size={32} className="text-amber-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">More Field Notes Coming</h3>
          <p className="text-steel mb-6 max-w-md mx-auto">
            Join the network to access our full research library and contribute your own operational insights.
          </p>
          <Link 
            href="/contact?intent=research" 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-void font-semibold rounded-lg hover:bg-amber-400 transition-colors"
          >
            Request Access
          </Link>
        </div>
      </div>
    </main>
  );
}

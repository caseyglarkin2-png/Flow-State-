// Field Notes detail pages - Structured format with executive summary,
// key findings, benchmarks, implications, and YardFlow connection

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Section, Callout, StatGrid, DataTable, NextUp } from '@/components/content';
import FieldNoteTOC from './FieldNoteTOC';

// Field Note structured content
interface FieldNote {
  title: string;
  subtitle: string;
  updatedDate: string;
  readTime: string;
  audience: string[];
  
  // Structured content
  executiveSummary: string[];
  keyFindings: Array<{ title: string; body: string; insight?: string }>;
  benchmarks?: {
    caption: string;
    columns: Array<{ header: string; key: string; align?: 'left' | 'center' | 'right' }>;
    data: Record<string, unknown>[];
  };
  implications: string[];
  yardflowConnection: {
    headline: string;
    modules: string[];
    kpis: Array<{ label: string; impact: string }>;
  };
  relatedLinks: Array<{ href: string; label: string; eyebrow?: string }>;
}

const fieldNotes: Record<string, FieldNote> = {
  'dwell-time-patterns': {
    title: 'Dwell Time Patterns Across 50+ Yards',
    subtitle: 'What Actually Moves the Needle on Trailer Wait Times',
    updatedDate: '2024-01-12',
    readTime: '6 min',
    audience: ['Operations', 'Site Managers'],
    
    executiveSummary: [
      'Gate time has an outsized impact on overall dwell. Fast gates create a virtuous cycle that reduces cascading delays.',
      'Visibility alone doesn\'t improve efficiency. The difference is having clear escalation triggers and empowered staff.',
      'Appointment compliance is a leading indicator: 80%+ compliance correlates with 15-25% lower dwell times.',
    ],
    
    keyFindings: [
      {
        title: 'Gate Time Has Outsized Impact',
        body: 'Yards that reduced check-in time from 12+ minutes to under 4 minutes saw improvements in overall dwell that exceeded what the gate time reduction alone would suggest.',
        insight: 'Fast gates create a virtuous cycle: drivers arriving on time get processed quickly, leading to better appointment adherence.',
      },
      {
        title: 'Visibility ≠ Efficiency',
        body: 'Some facilities with sophisticated real-time visibility systems still showed poor dwell metrics. Others with simpler setups outperformed.',
        insight: 'Visibility only helps when it\'s connected to action. High-performers had clear escalation triggers.',
      },
      {
        title: 'Appointment Compliance Is a Leading Indicator',
        body: 'Facilities with 80%+ appointment compliance consistently showed 15-25% lower dwell times than facilities at 60% compliance.',
      },
      {
        title: 'Carrier Mix Matters More Than Volume',
        body: 'High-volume yards with consistent carrier pools often outperformed lower-volume yards with fragmented carrier bases.',
        insight: 'Carrier familiarity with facility procedures reduces friction at every step.',
      },
    ],
    
    benchmarks: {
      caption: 'Dwell Time by Facility Type (Network Average)',
      columns: [
        { header: 'Facility Type', key: 'type', align: 'left' },
        { header: 'Avg Dwell (Manual)', key: 'manual', align: 'center' },
        { header: 'Avg Dwell (Automated)', key: 'automated', align: 'center' },
        { header: 'Improvement', key: 'improvement', align: 'right' },
      ],
      data: [
        { type: 'Distribution Center', manual: '3.2 hrs', automated: '1.8 hrs', improvement: '-44%' },
        { type: 'Intermodal Terminal', manual: '4.1 hrs', automated: '2.4 hrs', improvement: '-41%' },
        { type: 'Cross-Dock', manual: '1.8 hrs', automated: '0.9 hrs', improvement: '-50%' },
        { type: 'Manufacturing', manual: '2.9 hrs', automated: '1.6 hrs', improvement: '-45%' },
      ],
    },
    
    implications: [
      'Invest in gate automation before yard optimization. The upstream benefits compound.',
      'Visibility systems need action frameworks to deliver value.',
      'Appointment compliance programs should precede or accompany automation.',
      'Carrier education and consistency may deliver faster results than technology alone.',
    ],
    
    yardflowConnection: {
      headline: 'How YardFlow Reduces Dwell Variance',
      modules: [
        'Digital Check-In eliminates manual gate processes and creates the fast-gate foundation.',
        'Ground Source Truth provides visibility that\'s connected to alerts and escalation workflows.',
        'Appointment Engine drives compliance through carrier communication and accountability.',
      ],
      kpis: [
        { label: 'Gate Time', impact: '70% reduction' },
        { label: 'Dwell Variance', impact: '40% reduction' },
        { label: 'Appointment Compliance', impact: '+25 percentage points' },
      ],
    },
    
    relatedLinks: [
      { href: '/resources/field-notes/gate-throughput-benchmarks', label: 'Gate Throughput Benchmarks', eyebrow: 'Field Note' },
      { href: '/solutions/dry-van', label: 'Dry Van Solutions', eyebrow: 'Solution' },
      { href: '/diagnostic', label: 'Network Leak Calculator', eyebrow: 'Tool' },
    ],
  },
  
  'gate-throughput-benchmarks': {
    title: 'Gate Throughput Benchmarks by Yard Type',
    subtitle: 'Distribution Centers, Intermodal Terminals, and Cross-Docks Compared',
    updatedDate: '2024-01-08',
    readTime: '5 min',
    audience: ['Site Managers', 'Engineering'],
    
    executiveSummary: [
      'Automated gates achieve 3-4x the throughput of manual gates across all facility types.',
      'Cross-docks see the highest ROI from gate automation due to their turn-time sensitivity.',
      'Documentation complexity and carrier diversity are the biggest factors affecting sustainable throughput.',
    ],
    
    keyFindings: [
      {
        title: 'Distribution Centers',
        body: 'Manual check-in: 8-15 minutes. Automated: 2-4 minutes. Peak throughput improves from 4-6 to 12-18 trucks/hour/gate.',
      },
      {
        title: 'Intermodal Terminals',
        body: 'Manual check-in: 6-12 minutes. Automated: 2-3 minutes. Peak throughput improves from 5-8 to 15-25 trucks/hour/gate.',
        insight: 'Intermodal sees higher gains from automation due to more standardized documentation.',
      },
      {
        title: 'Cross-Docks',
        body: 'Manual check-in: 5-10 minutes. Automated: 1.5-3 minutes. Peak throughput improves from 6-10 to 20-30 trucks/hour/gate.',
        insight: 'Cross-docks benefit most from speed. The entire operation depends on fast turns.',
      },
    ],
    
    benchmarks: {
      caption: 'Gate Throughput by Facility Type',
      columns: [
        { header: 'Facility Type', key: 'type', align: 'left' },
        { header: 'Manual (min/truck)', key: 'manual', align: 'center' },
        { header: 'Automated (min/truck)', key: 'automated', align: 'center' },
        { header: 'Peak (trucks/hr/gate)', key: 'peak', align: 'right' },
      ],
      data: [
        { type: 'Distribution Center', manual: '8-15', automated: '2-4', peak: '12-18' },
        { type: 'Intermodal Terminal', manual: '6-12', automated: '2-3', peak: '15-25' },
        { type: 'Cross-Dock', manual: '5-10', automated: '1.5-3', peak: '20-30' },
      ],
    },
    
    implications: [
      'If your metrics fall significantly below these ranges, gate automation should be a priority.',
      'If you\'re already within range, focus may shift to yard optimization and dwell reduction.',
      'Physical layout and staging area capacity influence sustainable throughput rates.',
      'Operations with many one-time carriers face more credential verification overhead.',
    ],
    
    yardflowConnection: {
      headline: 'How YardFlow Maximizes Gate Throughput',
      modules: [
        'QR Check-In enables sub-2-minute processing regardless of carrier familiarity.',
        'Pre-Registration captures credentials before arrival, eliminating verification delays.',
        'Smart Queue Management prevents backup by routing drivers based on real-time capacity.',
      ],
      kpis: [
        { label: 'Check-In Time', impact: '< 2 min' },
        { label: 'Throughput', impact: '3x improvement' },
        { label: 'Queue Overflow', impact: 'Eliminated' },
      ],
    },
    
    relatedLinks: [
      { href: '/resources/field-notes/dwell-time-patterns', label: 'Dwell Time Patterns', eyebrow: 'Field Note' },
      { href: '/solutions/dry-van', label: 'Dry Van Solutions', eyebrow: 'Solution' },
      { href: '/roi', label: 'ROI Calculator', eyebrow: 'Tool' },
    ],
  },
};

// TOC items
const tocItems = [
  { id: 'executive-summary', label: 'Executive Summary' },
  { id: 'key-findings', label: 'Key Findings' },
  { id: 'benchmarks', label: 'Benchmarks' },
  { id: 'implications', label: 'Implications' },
  { id: 'yardflow', label: 'YardFlow Connection' },
];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = fieldNotes[slug];
  
  if (!note) {
    return { title: 'Field Note Not Found | YardFlow' };
  }
  
  return {
    title: `${note.title} | Field Notes | YardFlow`,
    description: note.subtitle,
  };
}

export async function generateStaticParams() {
  return Object.keys(fieldNotes).map((slug) => ({ slug }));
}

export default async function FieldNotePage({ params }: Props) {
  const { slug } = await params;
  const note = fieldNotes[slug];
  
  if (!note) {
    notFound();
  }
  
  return (
    <>
      <Header />
      <main className="min-h-screen bg-void pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero */}
          <div className="mb-12">
            <Link href="/resources/field-notes" className="text-sm text-neon hover:text-neon/80 mb-6 inline-block">
              ← Back to Field Notes
            </Link>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs uppercase tracking-wider">
                Field Note
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-4">
              {note.title}
            </h1>
            <p className="text-lg text-steel leading-relaxed max-w-[72ch] mb-6">
              {note.subtitle}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-steel pt-6 border-t border-neon/10">
              <span>{note.readTime} read</span>
              <span>•</span>
              <span>{note.audience.join(', ')}</span>
              <span>•</span>
              <span>Updated {new Date(note.updatedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Main content with TOC */}
          <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
            <div>
              {/* Executive Summary */}
              <Section id="executive-summary" title="Executive Summary">
                <div className="rounded-2xl border border-neon/20 bg-neon/5 p-6">
                  <ul className="space-y-4">
                    {note.executiveSummary.map((point, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-neon/20 text-neon text-sm font-semibold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <p className="text-steel leading-relaxed">{point}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>

              {/* Key Findings */}
              <Section id="key-findings" title="Key Findings">
                <div className="space-y-4">
                  {note.keyFindings.map((finding) => (
                    <div key={finding.title} className="rounded-2xl border border-neon/20 bg-carbon/50 p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">{finding.title}</h3>
                      <p className="text-steel leading-relaxed">{finding.body}</p>
                      {finding.insight && (
                        <p className="mt-4 text-sm text-neon/90 border-l-2 border-neon/50 pl-4">
                          <strong>Why it matters:</strong> {finding.insight}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </Section>

              {/* Benchmarks */}
              {note.benchmarks && (
                <Section id="benchmarks" title="Benchmarks">
                  <DataTable
                    caption={note.benchmarks.caption}
                    columns={note.benchmarks.columns}
                    data={note.benchmarks.data}
                  />
                </Section>
              )}

              {/* Implications */}
              <Section id="implications" title="Implications">
                <Callout variant="neutral" title="What This Means for Your Operation">
                  <ul className="space-y-3 mt-3">
                    {note.implications.map((imp, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </Callout>
              </Section>

              {/* YardFlow Connection */}
              <Section id="yardflow" title={note.yardflowConnection.headline}>
                <div className="space-y-6">
                  <div className="space-y-3">
                    {note.yardflowConnection.modules.map((mod, i) => (
                      <div key={i} className="flex gap-3 text-steel">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon/70" />
                        <span className="leading-relaxed">{mod}</span>
                      </div>
                    ))}
                  </div>
                  
                  <StatGrid
                    columns={3}
                    stats={note.yardflowConnection.kpis.map((kpi) => ({
                      label: kpi.label,
                      value: kpi.impact,
                    }))}
                  />
                </div>
              </Section>

              {/* Related Links */}
              <div className="pt-12 mt-12 border-t border-neon/10">
                <NextUp
                  title="Continue Reading"
                  links={note.relatedLinks}
                />
              </div>

              {/* CTA */}
              <div className="mt-12 p-8 rounded-2xl bg-carbon/50 border border-neon/20">
                <h3 className="text-xl font-semibold text-white mb-2">Want the Full Research?</h3>
                <p className="text-steel mb-6 max-w-[60ch]">
                  Network members get access to detailed breakdowns, facility-specific comparisons, and custom analysis.
                </p>
                <Link 
                  href="/contact?intent=research" 
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-neon text-void font-medium rounded-xl hover:bg-neon/90 transition"
                >
                  Request Access
                </Link>
              </div>
            </div>

            {/* Sticky TOC */}
            <FieldNoteTOC items={tocItems} hasBenchmarks={!!note.benchmarks} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

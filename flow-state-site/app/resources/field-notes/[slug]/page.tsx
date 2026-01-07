import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronLeft, Clock, Users } from 'lucide-react';
import { Velocity } from '@/components/icons/FlowIcons';

const fieldNotesContent: Record<string, {
  title: string;
  subtitle: string;
  updatedDate: string;
  readTime: string;
  audience: string[];
  content: string;
}> = {
  'dwell-time-patterns': {
    title: 'Dwell Time Patterns Across 50+ Yards',
    subtitle: 'What Actually Moves the Needle on Trailer Wait Times',
    updatedDate: '2024-01-12',
    readTime: '6 min',
    audience: ['Operations'],
    content: `
<h2>Summary</h2>
<p>We analyzed anonymized dwell time data across our network to identify the factors that most influence how long trailers sit in yards. The findings challenge some conventional assumptions.</p>

<h2>Key Findings</h2>

<h3>1. Gate Time Has Outsized Impact</h3>
<p>Yards that reduced check-in time from 12+ minutes to under 4 minutes saw corresponding improvements in overall dwell that exceeded what the gate time reduction alone would suggest.</p>

<p><strong>Why?</strong> Fast gates create a virtuous cycle: drivers arriving on time get processed quickly, leading to better appointment adherence, which reduces queue buildup and cascading delays.</p>

<h3>2. Yard Visibility ≠ Yard Efficiency</h3>
<p>Some facilities with sophisticated real-time visibility systems still showed poor dwell metrics. Others with simpler setups outperformed.</p>

<p><strong>The difference?</strong> Visibility only helps when it's connected to action. The high-performers had clear escalation triggers and empowered staff to act on what they saw.</p>

<h3>3. Appointment Compliance Is a Leading Indicator</h3>
<p>Facilities with 80%+ appointment compliance consistently showed 15-25% lower dwell times than facilities at 60% compliance, even when controlling for volume and complexity.</p>

<h3>4. Carrier Mix Matters More Than Volume</h3>
<p>High-volume yards with consistent carrier pools often outperformed lower-volume yards with fragmented carrier bases. Carrier familiarity with facility procedures reduces friction at every step.</p>

<h2>Implications</h2>
<ul>
<li>Invest in gate automation before yard optimization - the upstream benefits compound</li>
<li>Visibility systems need action frameworks to deliver value</li>
<li>Appointment compliance programs should precede or accompany automation</li>
<li>Carrier education and consistency may deliver faster results than technology alone</li>
</ul>

<h2>Methodology Note</h2>
<p>This analysis covers 50+ facilities across distribution, intermodal, and manufacturing segments. Data is anonymized and aggregated. Individual facility results vary based on operations, geography, and cargo type.</p>
    `,
  },
  'gate-throughput-benchmarks': {
    title: 'Gate Throughput Benchmarks by Yard Type',
    subtitle: 'Distribution Centers, Intermodal Terminals, and Cross-Docks Compared',
    updatedDate: '2024-01-08',
    readTime: '5 min',
    audience: ['Site Managers', 'Engineering'],
    content: `
<h2>Summary</h2>
<p>Gate throughput varies significantly by facility type. We compiled benchmarks from our network to help operators understand what "good" looks like for their segment.</p>

<h2>Benchmarks by Facility Type</h2>

<h3>Distribution Centers</h3>
<ul>
<li><strong>Manual check-in:</strong> 8-15 minutes per transaction</li>
<li><strong>Automated check-in:</strong> 2-4 minutes per transaction</li>
<li><strong>Peak throughput (manual):</strong> 4-6 trucks/hour/gate</li>
<li><strong>Peak throughput (automated):</strong> 12-18 trucks/hour/gate</li>
</ul>

<h3>Intermodal Terminals</h3>
<ul>
<li><strong>Manual check-in:</strong> 6-12 minutes per transaction</li>
<li><strong>Automated check-in:</strong> 2-3 minutes per transaction</li>
<li><strong>Peak throughput (manual):</strong> 5-8 trucks/hour/gate</li>
<li><strong>Peak throughput (automated):</strong> 15-25 trucks/hour/gate</li>
</ul>
<p>Intermodal sees higher gains from automation due to more standardized documentation and higher volume per gate.</p>

<h3>Cross-Docks</h3>
<ul>
<li><strong>Manual check-in:</strong> 5-10 minutes per transaction</li>
<li><strong>Automated check-in:</strong> 1.5-3 minutes per transaction</li>
<li><strong>Peak throughput (manual):</strong> 6-10 trucks/hour/gate</li>
<li><strong>Peak throughput (automated):</strong> 20-30 trucks/hour/gate</li>
</ul>
<p>Cross-docks benefit most from speed - the entire operation depends on fast turns.</p>

<h2>Factors Affecting Throughput</h2>

<h3>Documentation Complexity</h3>
<p>Facilities handling hazmat, bonded cargo, or high-security loads naturally have longer check-in times regardless of automation level.</p>

<h3>Carrier Diversity</h3>
<p>Operations with many one-time carriers face more credential verification overhead than those with dedicated fleets.</p>

<h3>Physical Layout</h3>
<p>Gate design, staging area capacity, and yard access patterns all influence sustainable throughput rates.</p>

<h2>Using These Benchmarks</h2>
<p>These ranges represent the middle 50% of facilities in our data. High performers exceed these numbers; challenged operations fall below. Use them as a starting point for internal discussion, not as rigid targets.</p>

<p>If your metrics fall significantly below these ranges, gate automation should likely be a priority. If you're already within range, focus may shift to yard optimization and dwell reduction.</p>
    `,
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = fieldNotesContent[slug];
  
  if (!note) {
    return { title: 'Field Note Not Found | YardFlow' };
  }
  
  return {
    title: `${note.title} | Field Notes | YardFlow`,
    description: note.subtitle,
  };
}

export async function generateStaticParams() {
  return Object.keys(fieldNotesContent).map((slug) => ({ slug }));
}

export default async function FieldNotePage({ params }: Props) {
  const { slug } = await params;
  const note = fieldNotesContent[slug];
  
  if (!note) {
    notFound();
  }
  
  return (
    <>
      <Header />
      <main className="min-h-screen bg-void pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <Link href="/resources/field-notes" className="inline-flex items-center gap-2 text-amber-400 hover:underline mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to Field Notes
        </Link>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 text-xs font-mono uppercase">Field Note</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{note.title}</h1>
        <p className="text-xl text-steel mb-6">{note.subtitle}</p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-steel mb-12">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {note.readTime}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" /> {note.audience.join(' • ')}
          </span>
          <span>Updated {new Date(note.updatedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
        </div>

        {/* Content */}
        <article 
          className="prose prose-lg prose-invert max-w-none 
            prose-headings:text-white prose-headings:font-bold 
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 
            prose-p:text-steel prose-p:leading-relaxed 
            prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline 
            prose-strong:text-white 
            prose-ul:text-steel prose-li:text-steel"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />

        {/* Footer CTA */}
        <div className="mt-16 p-8 rounded-xl bg-amber-500/5 border border-amber-500/20 text-center">
          <Velocity size={32} className="text-amber-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-3">Want the Full Research?</h3>
          <p className="text-steel mb-6 max-w-md mx-auto">
            Network members get access to detailed breakdowns, facility-specific comparisons, and custom analysis.
          </p>
          <Link 
            href="/contact?intent=research" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-void font-semibold rounded-lg hover:bg-amber-400 transition-colors"
          >
            Request Access
          </Link>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}

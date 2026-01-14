import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronLeft, Clock, Users, CheckCircle2 } from 'lucide-react';
import { Shield, Velocity } from '@/components/icons/FlowIcons';

const guidesContent: Record<string, {
  title: string;
  subtitle: string;
  updatedDate: string;
  readTime: string;
  audience: string[];
  whoThisIsFor: string[];
  whoThisIsNotFor: string[];
  tableOfContents: { id: string; title: string }[];
  content: string;
}> = {
  'cargo-theft-prevention': {
    title: 'Cargo Theft Prevention',
    subtitle: 'Technology and Process Approaches for Yard Security',
    updatedDate: '2024-01-15',
    readTime: '12 min',
    audience: ['Security Directors', 'Procurement', 'Operations Managers'],
    whoThisIsFor: [
      'Security leaders evaluating gate and yard automation',
      'Procurement teams building vendor security requirements',
      'Operations managers seeking to reduce unauthorized access risk',
    ],
    whoThisIsNotFor: [
      'Teams looking for OTR security solutions',
      'Organizations without facility access control needs',
    ],
    tableOfContents: [
      { id: 'the-problem', title: 'The Scale of the Problem' },
      { id: 'gate-vulnerabilities', title: 'Gate Vulnerabilities' },
      { id: 'technology-layers', title: 'Technology Layers for Defense' },
      { id: 'process-integration', title: 'Process Integration' },
      { id: 'measuring-outcomes', title: 'Measuring Outcomes' },
      { id: 'evaluation-checklist', title: 'Vendor Evaluation Checklist' },
    ],
    content: `
<section id="the-problem">
<h2>The Scale of the Problem</h2>

<p>Cargo theft remains a significant challenge for logistics operators. Industry associations estimate annual losses in the billions globally, with theft techniques becoming increasingly sophisticated.</p>

<div class="callout callout-data">
<strong>Industry Estimates (2023-2024):</strong>
<ul>
<li>CargoNet reports increased fictitious pickup attempts</li>
<li>FBI data shows organized cargo theft on the rise</li>
<li>Average value per incident varies widely by cargo type</li>
</ul>
<p class="callout-source">Sources: CargoNet Annual Report, FBI Cargo Theft Statistics</p>
</div>

<p>While much attention focuses on over-the-road security, a meaningful percentage of theft incidents involve fraudulent access at facility gates. Understanding this vulnerability is the first step toward addressing it.</p>
</section>

<section id="gate-vulnerabilities">
<h2>Gate Vulnerabilities</h2>

<p>Manual gate processes create opportunities for bad actors. Common vulnerability patterns include:</p>

<h3>Identity Verification Gaps</h3>
<ul>
<li><strong>Paper credential checks:</strong> Visual inspection of licenses is error-prone and time-consuming</li>
<li><strong>No database validation:</strong> Manual processes can't verify credentials against authoritative sources in real-time</li>
<li><strong>Inconsistent application:</strong> Gate staff may skip steps during peak periods</li>
</ul>

<h3>Carrier Credentialing Challenges</h3>
<ul>
<li><strong>Stale carrier data:</strong> Authority changes, insurance lapses, and safety issues emerge between initial vetting and arrival</li>
<li><strong>No network visibility:</strong> Issues at one facility don't propagate to others</li>
<li><strong>Fictitious carrier patterns:</strong> Newly created authorities with minimal history are harder to evaluate manually</li>
</ul>

<h3>Documentation Gaps</h3>
<ul>
<li><strong>Incomplete audit trails:</strong> Paper logs may be illegible, incomplete, or lost</li>
<li><strong>Delayed investigations:</strong> Reconstructing events after an incident is labor-intensive</li>
<li><strong>Dispute resolution:</strong> Without timestamps and records, defending against claims is difficult</li>
</ul>
</section>

<section id="technology-layers">
<h2>Technology Layers for Defense</h2>

<p>Modern yard management systems can address these vulnerabilities through layered technology approaches:</p>

<h3>Layer 1: Automated ID Capture</h3>
<p>Digital scanning of driver credentials creates a consistent, auditable record:</p>
<ul>
<li>OCR capture of license data reduces manual entry errors</li>
<li>Photo documentation supports post-incident investigation</li>
<li>Timestamps provide defensible records of gate activity</li>
</ul>

<div class="callout callout-note">
<strong>Integration Consideration:</strong> Some YMS platforms support connections to third-party ID verification services. Evaluate whether your security requirements warrant real-time validation against state or federal databases.
</div>

<h3>Layer 2: Carrier Screening</h3>
<p>Connecting to authoritative carrier databases during check-in:</p>
<ul>
<li>FMCSA SAFER/SMS data provides authority status and safety scores</li>
<li>Insurance verification confirms active coverage</li>
<li>CTPAT/PIP certification status for qualified carriers</li>
<li>Network watchlists can propagate issues across facilities</li>
</ul>

<h3>Layer 3: Audit Trail & Documentation</h3>
<p>Comprehensive event logging supports both operations and security:</p>
<ul>
<li>Timestamped records of all gate transactions</li>
<li>Integration with video systems where available</li>
<li>Exportable formats for compliance audits and investigations</li>
</ul>

<p>The key is creating a consistent, automated process that removes human error and provides visibility into every gate event.</p>
</section>

<section id="process-integration">
<h2>Process Integration</h2>

<p>Technology alone isn't sufficient. Effective cargo theft prevention requires process integration:</p>

<h3>Guard Protocols</h3>
<ul>
<li>Define clear escalation procedures for flagged carriers or credentials</li>
<li>Establish hold procedures while verification completes</li>
<li>Train staff on recognizing social engineering attempts</li>
</ul>

<h3>Appointment Workflows</h3>
<ul>
<li>Validate carrier and load information before arrival</li>
<li>Flag unexpected or unscheduled pickups for additional scrutiny</li>
<li>Communicate verification requirements to carriers in advance</li>
</ul>

<h3>Incident Response</h3>
<ul>
<li>Define who to contact when suspicious activity is identified</li>
<li>Preserve evidence (digital and physical) for investigation</li>
<li>Report to appropriate law enforcement and industry databases</li>
</ul>
</section>

<section id="measuring-outcomes">
<h2>Measuring Outcomes</h2>

<p>Security investments should be measurable. Key metrics to track:</p>

<h3>Leading Indicators</h3>
<ul>
<li><strong>Credential flags:</strong> Percentage of arrivals with credential or carrier issues</li>
<li><strong>Process compliance:</strong> Percentage of gate events following full verification protocol</li>
<li><strong>System uptime:</strong> Availability of verification systems during operating hours</li>
</ul>

<h3>Lagging Indicators</h3>
<ul>
<li><strong>Security incidents:</strong> Number and severity of unauthorized access or theft events</li>
<li><strong>Investigation efficiency:</strong> Time to resolve incidents with audit trail available</li>
<li><strong>Dispute outcomes:</strong> Success rate in cargo claims with documentation support</li>
</ul>

<div class="callout callout-results">
<strong>What We've Observed:</strong>
<p>Facilities implementing comprehensive gate automation with ID verification and carrier screening typically report reduced security incidents and faster investigation resolution. Specific outcomes depend on baseline processes and implementation quality.</p>
</div>
</section>

<section id="evaluation-checklist">
<h2>Vendor Evaluation Checklist</h2>

<p>When evaluating yard management or gate automation vendors for security capabilities:</p>

<h3>Identity Verification</h3>
<ul class="checklist">
<li>☐ Does the system capture and store driver ID images?</li>
<li>☐ Does it support OCR/scanning or require manual entry?</li>
<li>☐ Can it integrate with third-party verification services?</li>
<li>☐ What data retention policies are supported?</li>
</ul>

<h3>Carrier Screening</h3>
<ul class="checklist">
<li>☐ What data sources does the system query (FMCSA, insurance, etc.)?</li>
<li>☐ How frequently is carrier data refreshed?</li>
<li>☐ Can you maintain custom watchlists?</li>
<li>☐ Is cross-facility intelligence sharing supported?</li>
</ul>

<h3>Audit & Compliance</h3>
<ul class="checklist">
<li>☐ What event types are logged and for how long?</li>
<li>☐ Can data be exported for audits or legal proceedings?</li>
<li>☐ Does the system support C-TPAT/TSA documentation requirements?</li>
<li>☐ Are timestamps tamper-evident?</li>
</ul>

<h3>Integration</h3>
<ul class="checklist">
<li>☐ Does the system integrate with your existing WMS/TMS?</li>
<li>☐ Can it connect with physical access control systems?</li>
<li>☐ What video system integrations are available?</li>
</ul>
</section>
    `,
  },
  'network-effect-yard-automation': {
    title: 'Network Effects in Yard Automation',
    subtitle: 'How Connected Yards Create Compounding Operational Value',
    updatedDate: '2024-01-10',
    readTime: '10 min',
    audience: ['VPs Operations', 'CFOs', 'Strategy'],
    whoThisIsFor: [
      'Enterprise leaders evaluating multi-site yard automation',
      'CFOs building business cases for network-wide deployments',
      'Strategy teams modeling long-term logistics investments',
    ],
    whoThisIsNotFor: [
      'Single-facility operators',
      'Teams focused solely on immediate per-site ROI',
    ],
    tableOfContents: [
      { id: 'what-are-network-effects', title: 'What Are Network Effects?' },
      { id: 'logistics-manifestations', title: 'How They Manifest in Logistics' },
      { id: 'quantifying-value', title: 'Quantifying Network Value' },
      { id: 'implementation-sequence', title: 'Implementation Sequence Matters' },
      { id: 'procurement-considerations', title: 'Procurement Considerations' },
    ],
    content: `
<section id="what-are-network-effects">
<h2>What Are Network Effects?</h2>

<p>Network effects occur when the value of a system increases disproportionately as more participants join. Classic examples include telecommunications (each new phone makes the network more valuable) and marketplaces (more sellers attract more buyers).</p>

<p>In logistics technology, network effects are less obvious but can be significant. The question is: does adding the 20th facility to a YMS platform create more value than simply 20× the first facility?</p>
</section>

<section id="logistics-manifestations">
<h2>How They Manifest in Logistics</h2>

<p>Several mechanisms create network value in yard automation:</p>

<h3>Shared Intelligence</h3>
<p>When carrier performance data is aggregated across facilities:</p>
<ul>
<li><strong>Security:</strong> A carrier flagged for issues at one site can be identified at all sites</li>
<li><strong>Performance:</strong> Carriers who consistently delay at one facility can be proactively managed at others</li>
<li><strong>Benchmarking:</strong> Understanding "good" performance requires comparison across sites</li>
</ul>

<h3>Operational Learning</h3>
<p>Implementation patterns accelerate with scale:</p>
<ul>
<li>Configuration templates from early deployments speed later rollouts</li>
<li>Edge cases discovered at one site improve the system for all</li>
<li>Training materials and best practices compound over deployments</li>
</ul>

<h3>Resource Optimization</h3>
<p>Multi-site visibility enables resource sharing:</p>
<ul>
<li>Labor can be allocated based on real-time demand across nearby facilities</li>
<li>Equipment utilization can be balanced across a region</li>
<li>Carrier capacity can be redirected based on network-wide visibility</li>
</ul>

<h3>Commercial Leverage</h3>
<p>Aggregate data creates negotiating power:</p>
<ul>
<li>Volume visibility across the network supports rate negotiations</li>
<li>Performance data enables carrier scorecards with teeth</li>
<li>Vendor relationships benefit from larger footprint</li>
</ul>
</section>

<section id="quantifying-value">
<h2>Quantifying Network Value</h2>

<p>Modeling network effects requires care. Overstating them undermines credibility; ignoring them understates ROI for large deployments.</p>

<h3>Our Modeling Approach</h3>
<p>Based on observed deployments, we model network effects as a multiplier on per-facility savings:</p>

<div class="callout callout-data">
<strong>Observed Multiplier Ranges:</strong>
<ul>
<li><strong>1-5 facilities:</strong> 1.0x (minimal network effects)</li>
<li><strong>6-15 facilities:</strong> 1.05-1.15x (emerging effects)</li>
<li><strong>16-50 facilities:</strong> 1.15-1.30x (substantial effects)</li>
<li><strong>50+ facilities:</strong> 1.25-1.40x (enterprise-scale effects)</li>
</ul>
<p class="callout-source">Based on YardFlow implementation data. Your results may vary.</p>
</div>

<h3>Example Calculation</h3>
<p>Consider a 50-facility retail distribution network:</p>
<ul>
<li>Per-facility savings estimate: $200K/year</li>
<li>Linear projection: 50 × $200K = $10M/year</li>
<li>With network multiplier (1.30x): $13M/year</li>
<li>Network value contribution: $3M additional annual savings</li>
</ul>

<p>The network value isn't magic - it represents real operational improvements in intelligence sharing, faster implementations, and resource optimization.</p>
</section>

<section id="implementation-sequence">
<h2>Implementation Sequence Matters</h2>

<p>How you deploy affects network value realization:</p>

<h3>Phased by Complexity</h3>
<ul>
<li>Start with facilities that have manageable complexity</li>
<li>Build templates and processes before tackling edge cases</li>
<li>Early wins generate internal momentum for larger rollout</li>
</ul>

<h3>Regional Clustering</h3>
<ul>
<li>Facilities in the same region share carriers, enabling faster intelligence benefits</li>
<li>Labor sharing is only practical within reasonable distance</li>
<li>Regional deployments enable focused training and support</li>
</ul>

<h3>Carrier Concentration</h3>
<ul>
<li>Facilities sharing common carrier pools benefit most from shared data</li>
<li>High-volume carrier relationships see fastest performance improvements</li>
</ul>
</section>

<section id="procurement-considerations">
<h2>Procurement Considerations</h2>

<p>When evaluating vendors for network-scale deployments:</p>

<h3>Architecture Questions</h3>
<ul>
<li>Is the platform designed for multi-site from the ground up, or is it single-site with bolt-on networking?</li>
<li>How is cross-facility data shared and secured?</li>
<li>What's the latency on intelligence propagation across sites?</li>
</ul>

<h3>Pricing Structure</h3>
<ul>
<li>Does pricing reward network-wide adoption or penalize it?</li>
<li>Are there volume discounts that make network effects accessible?</li>
<li>What's the commercial model for adding facilities over time?</li>
</ul>

<h3>Implementation Support</h3>
<ul>
<li>Does the vendor have experience with network-scale deployments?</li>
<li>What's their track record on large rollouts?</li>
<li>Are implementation templates and best practices available?</li>
</ul>

<p>Our ROI calculator includes network effect modeling in Pro Mode. Build scenarios with your facility count and rollout timeline to see projected network value.</p>
</section>
    `,
  },
  'ctpat-tsa-compliance': {
    title: 'C-TPAT & TSA Compliance',
    subtitle: 'Operational Readiness for Supply Chain Security Programs',
    updatedDate: '2024-01-05',
    readTime: '8 min',
    audience: ['Compliance Officers', 'Security', 'Legal'],
    whoThisIsFor: [
      'Compliance officers maintaining security certifications',
      'Security teams preparing for audits',
      'Operations leaders seeking to reduce compliance overhead',
    ],
    whoThisIsNotFor: [
      'Organizations not subject to customs or aviation security requirements',
      'Teams focused solely on domestic, non-bonded operations',
    ],
    tableOfContents: [
      { id: 'program-overview', title: 'Program Overview' },
      { id: 'key-requirements', title: 'Key Requirements' },
      { id: 'operational-implications', title: 'Operational Implications' },
      { id: 'technology-support', title: 'How Technology Supports Compliance' },
      { id: 'audit-preparation', title: 'Audit Preparation' },
    ],
    content: `
<section id="program-overview">
<h2>Program Overview</h2>

<p>The Customs-Trade Partnership Against Terrorism (C-TPAT) and TSA security programs establish requirements for supply chain security. Participation is voluntary but offers significant operational benefits.</p>

<h3>C-TPAT Benefits</h3>
<ul>
<li><strong>Reduced inspections:</strong> C-TPAT members face fewer CBP examinations at the border</li>
<li><strong>Faster processing:</strong> Front-of-line treatment at ports of entry</li>
<li><strong>Customer requirements:</strong> Many retailers and manufacturers require C-TPAT certification from supply chain partners</li>
</ul>

<h3>TSA Program Benefits</h3>
<ul>
<li><strong>Known Shipper status:</strong> Enables air cargo screening exemptions</li>
<li><strong>Certified Cargo Screening:</strong> Allows off-airport screening</li>
<li><strong>Supply chain efficiency:</strong> Reduces delays and handling at air terminals</li>
</ul>

<div class="callout callout-note">
<strong>Important:</strong> Program requirements evolve. Always verify current requirements with CBP and TSA directly. This guide provides general orientation, not compliance advice.
</div>
</section>

<section id="key-requirements">
<h2>Key Requirements</h2>

<p>Both programs focus on documented, repeatable security procedures:</p>

<h3>Physical Security</h3>
<ul>
<li>Controlled access points with monitoring capability</li>
<li>Perimeter security appropriate to facility risk</li>
<li>Lighting and surveillance in key areas</li>
<li>Secure storage for high-value or sensitive cargo</li>
</ul>

<h3>Personnel Security</h3>
<ul>
<li>Background verification for employees with access to sensitive areas</li>
<li>Identification protocols and access control</li>
<li>Visitor management and escort procedures</li>
<li>Termination procedures for access revocation</li>
</ul>

<h3>Procedural Security</h3>
<ul>
<li>Documented processes for key security functions</li>
<li>Training programs with recordkeeping</li>
<li>Incident response and reporting procedures</li>
<li>Self-assessment and continuous improvement programs</li>
</ul>

<h3>Conveyance Security</h3>
<ul>
<li>Inspection protocols for trailers and containers</li>
<li>Seal integrity programs</li>
<li>Tracking and monitoring where required</li>
</ul>
</section>

<section id="operational-implications">
<h2>Operational Implications</h2>

<p>Non-certified operations face meaningful friction:</p>

<h3>Inspection Risk</h3>
<ul>
<li>Non-C-TPAT shipments may face significantly more border examinations</li>
<li>Inspections add delays and handling costs</li>
<li>Cargo damage risk increases with each additional handling</li>
</ul>

<h3>Customer Access</h3>
<ul>
<li>Major retailers increasingly require security certifications from suppliers</li>
<li>RFPs often include certification as a qualifying requirement</li>
<li>Loss of certification can trigger contract review clauses</li>
</ul>

<h3>Insurance Considerations</h3>
<ul>
<li>Some insurers offer premium considerations for certified facilities</li>
<li>Claims documentation requirements may be easier to meet with robust security programs</li>
</ul>
</section>

<section id="technology-support">
<h2>How Technology Supports Compliance</h2>

<p>Yard management systems can support C-TPAT and TSA compliance in several ways:</p>

<h3>Access Control</h3>
<ul>
<li>Automated visitor registration and tracking</li>
<li>Driver ID verification and recordkeeping</li>
<li>Role-based access permissions</li>
<li>Audit trails for all access events</li>
</ul>

<h3>Carrier Verification</h3>
<ul>
<li>Integration with FMCSA and other authoritative databases</li>
<li>Insurance and authority verification</li>
<li>C-TPAT partner status verification</li>
</ul>

<h3>Documentation</h3>
<ul>
<li>Immutable event logs for audit purposes</li>
<li>Exportable reports in standard formats</li>
<li>Timestamp integrity for investigation support</li>
</ul>

<h3>Training Support</h3>
<ul>
<li>Consistent process enforcement reduces training burden</li>
<li>System-guided workflows ensure steps aren't skipped</li>
<li>Performance metrics identify training needs</li>
</ul>
</section>

<section id="audit-preparation">
<h2>Audit Preparation</h2>

<p>Technology can significantly reduce audit preparation time:</p>

<h3>Before the Audit</h3>
<ul>
<li>Run access event reports for the audit period</li>
<li>Generate carrier verification statistics</li>
<li>Document system uptime and availability</li>
<li>Prepare training completion records</li>
</ul>

<h3>During the Audit</h3>
<ul>
<li>Demonstrate live system capabilities</li>
<li>Show real-time access event logging</li>
<li>Walk through incident response workflows</li>
<li>Export sample documentation packages</li>
</ul>

<h3>Continuous Readiness</h3>
<ul>
<li>Monthly access control reviews</li>
<li>Quarterly self-assessment reports</li>
<li>Annual security procedure reviews</li>
<li>Ongoing training and documentation</li>
</ul>

<p>YardFlow's Evidence Vault feature is specifically designed to support compliance documentation requirements. Contact us for a walkthrough.</p>
</section>
    `,
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guidesContent[slug];
  
  if (!guide) {
    return { title: 'Guide Not Found | YardFlow' };
  }
  
  return {
    title: `${guide.title} | Guides | YardFlow`,
    description: guide.subtitle,
  };
}

export async function generateStaticParams() {
  return Object.keys(guidesContent).map((slug) => ({ slug }));
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guidesContent[slug];
  
  if (!guide) {
    notFound();
  }
  
  return (
    <>
      <Header />
      <main className="min-h-screen bg-void pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12">
          {/* Main Content */}
          <div>
            {/* Header */}
            <Link href="/resources" className="text-sm text-neon hover:text-neon/80 mb-6 inline-block">
              ← Back to Resources
            </Link>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs uppercase tracking-wider">Guide</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-4">{guide.title}</h1>
            <p className="text-xl text-steel leading-relaxed mb-6 max-w-[72ch]">{guide.subtitle}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-steel mb-8 pb-8 border-b border-neon/10">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-neon/70" /> {guide.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-neon/70" /> {guide.audience.join(' • ')}
              </span>
              <span>Updated {new Date(guide.updatedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            </div>

            {/* Who This Is For */}
            <div className="grid md:grid-cols-2 gap-6 mb-12 p-6 rounded-2xl bg-carbon/50 border border-neon/20">
              <div>
                <h4 className="flex items-center gap-2 font-semibold text-neon mb-3 text-sm uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" /> Who This Is For
                </h4>
                <ul className="space-y-2.5 text-[15px] text-steel">
                  {guide.whoThisIsFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-neon mt-0.5 text-xs">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="flex items-center gap-2 font-semibold text-steel/70 mb-3 text-sm uppercase tracking-wider">
                  <Shield size={16} className="text-steel/70" /> Who This Is Not For
                </h4>
                <ul className="space-y-2.5 text-[15px] text-steel/70">
                  {guide.whoThisIsNotFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="mt-0.5 text-xs">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Article Content */}
            <article 
              className="prose prose-lg prose-invert max-w-none
                prose-headings:text-white prose-headings:font-semibold prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-0 prose-h2:mb-6 prose-h2:scroll-mt-24 prose-h2:flex prose-h2:items-center prose-h2:gap-3
                prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-neon
                prose-p:text-[#B8B8B8] prose-p:leading-8 prose-p:text-[17px] prose-p:mb-5 prose-p:max-w-[65ch]
                prose-a:text-neon prose-a:no-underline hover:prose-a:text-neon/80
                prose-strong:text-white prose-strong:font-semibold
                prose-ul:text-[#B8B8B8] prose-ul:my-4 prose-li:text-[#B8B8B8] prose-li:my-2 prose-li:leading-7 prose-li:text-[16px] prose-ol:text-[#B8B8B8]
                [&_section]:mb-8 [&_section]:p-8 [&_section]:rounded-2xl [&_section]:bg-carbon/40 [&_section]:border [&_section]:border-neon/10
                [&_.callout]:my-6 [&_.callout]:p-5 [&_.callout]:rounded-xl [&_.callout]:border
                [&_.callout-data]:bg-neon/5 [&_.callout-data]:border-neon/20
                [&_.callout-note]:bg-void/50 [&_.callout-note]:border-neon/20
                [&_.callout-results]:bg-void/50 [&_.callout-results]:border-neon/20
                [&_.callout_strong]:text-white [&_.callout-source]:text-xs [&_.callout-source]:text-steel/60 [&_.callout-source]:mt-3 [&_.callout-source]:block
                [&_.checklist]:list-none [&_.checklist]:pl-0 [&_.checklist_li]:pl-0 [&_.checklist_li]:flex [&_.checklist_li]:items-start [&_.checklist_li]:gap-2"
              dangerouslySetInnerHTML={{ __html: guide.content }}
            />

            {/* Footer CTA */}
            <div className="mt-16 p-8 rounded-2xl bg-carbon/50 border border-neon/20">
              <div className="flex items-start gap-6">
                <div className="rounded-xl bg-neon/10 p-3">
                  <Velocity size={28} className="text-neon" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Ready to see this in action?</h3>
                  <p className="text-steel mb-6">Request a walkthrough of how YardFlow handles these scenarios.</p>
                  <Link 
                    href="/contact?intent=guide" 
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-neon text-void font-medium rounded-xl hover:bg-neon/90 transition"
                  >
                    Request Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <h4 className="text-xs uppercase tracking-wider text-steel/60 mb-4">In This Guide</h4>
              <nav className="space-y-1">
                {guide.tableOfContents.map((item) => (
                  <a 
                    key={item.id} 
                    href={`#${item.id}`}
                    className="block text-sm text-steel hover:text-neon transition-colors py-1.5 border-l-2 border-transparent hover:border-neon pl-3"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>

              <div className="mt-8 p-4 rounded-2xl bg-carbon/50 border border-neon/20">
                <h4 className="font-semibold text-sm mb-3 text-white">Related Resources</h4>
                <Link href="/security" className="block text-sm text-neon hover:text-neon/80 mb-2">
                  Evidence Vault →
                </Link>
                <Link href="/roi" className="block text-sm text-neon hover:text-neon/80 mb-2">
                  ROI Calculator →
                </Link>
                <Link href="/case-studies" className="block text-sm text-neon hover:text-neon/80">
                  Case Studies →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}

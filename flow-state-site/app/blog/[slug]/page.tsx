import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ChevronLeft } from 'lucide-react';

const blogContent: Record<string, {
  title: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
}> = {
  'cargo-theft-prevention': {
    title: 'The $30B Problem: Cargo Theft and How Yard Automation Fights Back',
    date: '2024-01-15',
    category: 'Security',
    readTime: '8 min read',
    content: `
<p>Cargo theft is a massive, growing problem. Industry estimates put annual losses between $15 billion and $30 billion globally. While most shippers focus on over-the-road security, the reality is that a significant percentage of theft incidents begin at the yard gate.</p>

<h2>The Vulnerability at the Gate</h2>

<p>Fraudulent carriers, fake credentials, and unauthorized access are the primary vectors for cargo theft. Manual gate processes create opportunities for fraud:</p>

<ul>
<li><strong>Driver ID verification:</strong> Paper licenses are easy to forge</li>
<li><strong>Carrier credentialing:</strong> Manual checks miss red flags</li>
<li><strong>Audit trails:</strong> Incomplete or missing documentation</li>
<li><strong>Investigation costs:</strong> $15K-$50K per incident</li>
</ul>

<h2>How YardFlow Prevents Theft</h2>

<p>YardFlow's security module creates a multi-layered defense:</p>

<h3>1. ID Scanning & Verification</h3>
<ul>
<li>Scans driver's licenses and CDLs with OCR</li>
<li>Validates against state databases</li>
<li>Flags expired or suspicious credentials in real-time</li>
</ul>

<h3>2. Carrier Credentialing Database</h3>
<ul>
<li>Cross-references carriers against FMCSA, CTPAT, and TSA databases</li>
<li>Maintains blacklist of known fraudulent carriers</li>
<li>Tracks carrier performance history</li>
</ul>

<h3>3. Blockchain Audit Trail</h3>
<ul>
<li>Immutable timestamp for every gate transaction</li>
<li>Creates forensic-grade evidence for investigations</li>
<li>Reduces investigation time from weeks to hours</li>
</ul>

<h2>The ROI of Security</h2>

<p>For a 10-facility network experiencing 2-3 theft incidents per year:</p>

<ul>
<li><strong>Prevented losses:</strong> $200K-$600K/year (80% reduction in incidents)</li>
<li><strong>Insurance premium discount:</strong> 15-20% ($30K-$100K/year)</li>
<li><strong>Investigation cost savings:</strong> $30K-$150K/year</li>
<li><strong>Compliance fine avoidance:</strong> $50K-$500K/year (CTPAT violations)</li>
</ul>

<p><strong>Total annual security savings: $310K-$1.35M</strong></p>

<h2>Conclusion</h2>

<p>Cargo theft isn't going away. But automated ID verification, carrier credentialing, and blockchain audit trails dramatically reduce your exposure. YardFlow turns your gate from a vulnerability into a security checkpoint.</p>
    `,
  },
  'network-effect-yard-automation': {
    title: 'Why Yard Automation Gets Better as Your Network Grows',
    date: '2024-01-10',
    category: 'Economics',
    readTime: '6 min read',
    content: `
<p>Traditional software scales linearly. You buy more licenses, you get more capacity. But yard automation is different. When designed correctly, it exhibits network effects that create compounding value as your deployment expands.</p>

<h2>What Are Network Effects in Logistics?</h2>

<p>Network effects occur when the value of a system increases disproportionately as more nodes join. In yard automation, this manifests in several ways:</p>

<ul>
<li><strong>Shared carrier intelligence:</strong> A bad actor flagged at one facility is instantly visible across all facilities</li>
<li><strong>Cross-facility benchmarking:</strong> Compare gate times, dwell times, and throughput across your network</li>
<li><strong>Labor allocation optimization:</strong> Balance staffing across facilities based on real-time demand</li>
<li><strong>Carrier relationship leverage:</strong> Aggregate volume data for better rate negotiations</li>
</ul>

<h2>The Math Behind Network Value</h2>

<p>Our Singularity simulation models network effects using a modified Metcalfe's Law approach:</p>

<ul>
<li><strong>1-5 facilities:</strong> Minimal network effects (1.0x multiplier)</li>
<li><strong>6-15 facilities:</strong> Emerging effects (1.1-1.2x)</li>
<li><strong>16-50 facilities:</strong> Substantial compounding (1.2-1.35x)</li>
<li><strong>50+ facilities:</strong> Enterprise-scale leverage (1.35-1.5x)</li>
</ul>

<h2>Real-World Application</h2>

<p>Consider a 50-facility retail distribution network:</p>

<ul>
<li>Per-facility savings: $200K/year (detention, labor, throughput)</li>
<li>Linear projection: 50 × $200K = $10M/year</li>
<li>With network effects (1.35x): $13.5M/year</li>
<li><strong>Network bonus: $3.5M additional annual savings</strong></li>
</ul>

<h2>Why This Matters for Procurement</h2>

<p>Enterprise buyers should evaluate yard automation not just on per-facility ROI, but on network-wide economics. The question isn't "What does this cost per site?" but "What's the total value curve as we scale?"</p>

<p>YardFlow's ROI calculator includes Pro Mode specifically for modeling these network effects. Build your custom model to see how your specific facility count and rollout timeline affects total value.</p>
    `,
  },
  'ctpat-tsa-compliance': {
    title: 'CTPAT & TSA Compliance: The Security Mandate You Cannot Ignore',
    date: '2024-01-05',
    category: 'Compliance',
    readTime: '7 min read',
    content: `
<p>Supply chain security isn't optional. The Customs-Trade Partnership Against Terrorism (CTPAT) and Transportation Security Administration (TSA) have established clear requirements for cargo security. Non-compliance carries significant penalties—and reputational risk that's harder to quantify.</p>

<h2>What CTPAT Requires</h2>

<p>CTPAT certification requires documented security procedures across your supply chain:</p>

<ul>
<li><strong>Physical security:</strong> Controlled access points, surveillance, perimeter security</li>
<li><strong>Personnel security:</strong> Background checks, ID verification, access control</li>
<li><strong>Procedural security:</strong> Documented processes, audit trails, incident response</li>
<li><strong>Conveyance security:</strong> Seal integrity, inspection protocols, tracking</li>
</ul>

<h2>The Cost of Non-Compliance</h2>

<p>Beyond the obvious penalties, non-compliance creates operational friction:</p>

<ul>
<li><strong>Increased inspections:</strong> Non-CTPAT shipments face 4-6x more CBP examinations</li>
<li><strong>Slower clearance:</strong> Average 2-3 day delays vs. expedited processing</li>
<li><strong>Customer requirements:</strong> Major retailers require CTPAT certification from suppliers</li>
<li><strong>Insurance implications:</strong> Higher premiums without certification</li>
</ul>

<h2>How Automation Enables Compliance</h2>

<p>YardFlow's security module addresses CTPAT requirements directly:</p>

<ul>
<li><strong>ID scanning:</strong> Automated driver verification with audit trail</li>
<li><strong>Carrier credentialing:</strong> Real-time FMCSA and TSA database checks</li>
<li><strong>Access control:</strong> Role-based permissions, visitor management</li>
<li><strong>Documentation:</strong> Immutable records for compliance audits</li>
</ul>

<h2>Building Your Compliance Case</h2>

<p>When presenting yard automation to procurement, frame security as a compliance investment:</p>

<ul>
<li>Calculate current inspection/delay costs</li>
<li>Estimate insurance premium reduction with certification</li>
<li>Document customer requirements driving certification need</li>
<li>Project fine avoidance and reputational protection</li>
</ul>

<p>YardFlow's Evidence Vault provides the documentation package procurement teams need to evaluate security posture.</p>
    `,
  },
  'yard-tax-calculator': {
    title: 'Calculating Your Yard Tax: The Nine Hidden Costs Draining Your Operations',
    date: '2023-12-20',
    category: 'Operations',
    readTime: '5 min read',
    content: `
<p>Every logistics operation pays a "yard tax"—the invisible costs that drain margin through inefficiency, delays, and manual processes. Most operators know the yard is a problem. Few can quantify exactly how much it costs.</p>

<h2>The Nine Components of Yard Tax</h2>

<h3>1. Detention & Demurrage</h3>
<p>Carriers charge $50-150/hour for delays. Without defensible timestamps, you pay claims you shouldn't—or lose disputes you should win.</p>

<h3>2. Expedited Freight</h3>
<p>When the yard backs up, loads miss cutoffs. The result: premium freight costs to maintain service levels.</p>

<h3>3. Gate Labor</h3>
<p>Manual check-in/check-out requires dedicated staff. Each gate transaction takes 8-15 minutes without automation.</p>

<h3>4. Yard Labor</h3>
<p>Spotters, hostlers, and yard jockeys spend hours on inefficient trailer moves when visibility is poor.</p>

<h3>5. Overtime</h3>
<p>Yard delays cascade into dock operations, triggering overtime for warehouse staff waiting on trailers.</p>

<h3>6. Chargebacks</h3>
<p>Retailers penalize late deliveries. Without proof of when delays occurred, the shipper absorbs the penalty.</p>

<h3>7. Cargo Theft</h3>
<p>Fraudulent pickups and security breaches start at the gate. Investigation costs alone run $15K-$50K per incident.</p>

<h3>8. Insurance & Compliance</h3>
<p>Higher premiums without security certification. Potential fines for CTPAT/TSA non-compliance.</p>

<h3>9. Opportunity Cost</h3>
<p>Dock doors sitting empty while trailers wait in the queue. The most expensive cost is the revenue you don't capture.</p>

<h2>How to Calculate Your Yard Tax</h2>

<p>Our Diagnostic Calculator helps you quantify these costs for your specific operation:</p>

<ol>
<li>Enter your facility profile (doors, gates, volume)</li>
<li>Input your current dwell times and detention rates</li>
<li>Review the breakdown of your yard tax components</li>
<li>See projected savings from automation</li>
</ol>

<p>The average mid-size facility discovers $150K-$400K in annual yard tax. Enterprise networks with 20+ facilities often find $2M-$5M in addressable waste.</p>
    `,
  },
  'primo-singularity-simulations': {
    title: 'Primo & Singularity: The Simulations That Built YardFlow',
    date: '2023-12-15',
    category: 'Research',
    readTime: '10 min read',
    content: `
<p>Before writing a single line of production code, FreightRoll built two simulation engines: Primo (single-facility dynamics) and Singularity (enterprise network effects). These simulations ran thousands of scenarios to validate the economics that power YardFlow today.</p>

<h2>Primo: Single-Facility Dynamics</h2>

<p>Primo models the operational reality of an individual yard:</p>

<ul>
<li><strong>Arrival patterns:</strong> How truck arrivals cluster and create queues</li>
<li><strong>Gate throughput:</strong> The relationship between check-in time and facility capacity</li>
<li><strong>Dwell time distribution:</strong> How long trailers actually sit vs. scheduled appointments</li>
<li><strong>Labor utilization:</strong> Gate staff, yard jockeys, dock workers—and their interdependencies</li>
</ul>

<h3>Key Primo Findings</h3>

<ul>
<li>Reducing gate time from 12 minutes to 3 minutes increases effective dock capacity by 15-20%</li>
<li>Real-time visibility reduces yard jockey miles by 30-40%</li>
<li>Automated check-in eliminates 2.5 FTE per high-volume facility</li>
</ul>

<h2>Singularity: Network Effect Modeling</h2>

<p>Singularity extends Primo to model enterprise networks:</p>

<ul>
<li><strong>Cross-facility benchmarking:</strong> How performance variance affects network-wide cost</li>
<li><strong>Carrier intelligence sharing:</strong> The value of flagging bad actors across facilities</li>
<li><strong>Labor optimization:</strong> Pooling resources across nearby facilities</li>
<li><strong>Negotiating leverage:</strong> Aggregate volume data for carrier rate discussions</li>
</ul>

<h3>Key Singularity Findings</h3>

<ul>
<li>Network effects become measurable at 6+ facilities</li>
<li>50-facility networks see 1.35-1.4x multiplier on per-site savings</li>
<li>Carrier compliance improves 25% when flagging is network-wide</li>
<li>Implementation velocity increases 40% after the first 10 sites</li>
</ul>

<h2>From Simulation to Product</h2>

<p>These simulations didn't just validate economics—they shaped product decisions:</p>

<ul>
<li><strong>Gate-first approach:</strong> Primo showed gate time is the highest-leverage intervention</li>
<li><strong>Network data model:</strong> Singularity proved cross-facility intelligence creates compounding value</li>
<li><strong>Pricing structure:</strong> Per-facility pricing aligns incentives for network-wide adoption</li>
<li><strong>Implementation sequence:</strong> POC → Pilot → Rollout mirrors the simulation's optimal path</li>
</ul>

<h2>Explore the Simulations</h2>

<p>The economics behind YardFlow are transparent. Our ROI calculator uses the same models that power Primo and Singularity. Enterprise customers can request access to the full simulation environment during evaluation.</p>
    `,
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogContent[slug];
  
  if (!post) {
    return {
      title: 'Post Not Found - YardFlow by FreightRoll',
    };
  }
  
  return {
    title: `${post.title} - YardFlow by FreightRoll`,
    description: post.content.replace(/<[^>]*>/g, '').substring(0, 160),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogContent[slug];
  
  if (!post) {
    notFound();
  }
  
  return (
    <main className="min-h-screen bg-void">
      {/* Header */}
      <section className="border-b border-steel/20 bg-gradient-to-b from-carbon to-void py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-neon transition-colors hover:text-neon/80"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          
          <div className="mb-4 flex items-center gap-3 text-sm">
            <span className="rounded-full bg-neon/10 px-3 py-1 text-neon">
              {post.category}
            </span>
            <span className="text-steel">{post.readTime}</span>
          </div>
          
          <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-2 text-steel/70">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-steel prose-p:leading-relaxed prose-a:text-neon prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-ul:text-steel prose-li:text-steel prose-ol:text-steel"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* Footer CTA */}
      <section className="border-t border-steel/20 py-12">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-6 text-lg text-steel">
            Ready to calculate your yard tax savings?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-ember px-6 py-3 font-semibold text-white transition-all hover:bg-white hover:text-void"
            >
              Calculate Your Yard Tax
            </Link>
            <Link
              href="/roi"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-steel/40 px-6 py-3 font-semibold text-white transition-all hover:border-neon hover:text-neon"
            >
              Build ROI Model
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

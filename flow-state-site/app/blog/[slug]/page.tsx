import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ChevronLeft, Tag } from 'lucide-react';

// This would normally come from a CMS or markdown files
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
Cargo theft is a massive, growing problem. Industry estimates put annual losses between $15 billion and $30 billion globally. While most shippers focus on over-the-road security, the reality is that a significant percentage of theft incidents begin at the yard gate.

## The Vulnerability at the Gate

Fraudulent carriers, fake credentials, and unauthorized access are the primary vectors for cargo theft. Manual gate processes create opportunities for fraud:

- **Driver ID verification**: Paper licenses are easy to forge
- **Carrier credentialing**: Manual checks miss red flags
- **Audit trails**: Incomplete or missing documentation
- **Investigation costs**: $15K-$50K per incident

## How YardFlow Prevents Theft

YardFlow's security module creates a multi-layered defense:

### 1. ID Scanning & Verification
- Scans driver's licenses and CDLs with OCR
- Validates against state databases
- Flags expired or suspicious credentials in real-time

### 2. Carrier Credentialing Database
- Cross-references carriers against FMCSA, CTPAT, and TSA databases
- Maintains blacklist of known fraudulent carriers
- Tracks carrier performance history

### 3. Blockchain Audit Trail
- Immutable timestamp for every gate transaction
- Creates forensic-grade evidence for investigations
- Reduces investigation time from weeks to hours

### 4. Biometric Authentication (Optional)
- Facial recognition for repeat drivers
- Prevents credential sharing and impersonation

## The ROI of Security

For a 10-facility network experiencing 2-3 theft incidents per year:

- **Prevented losses**: $200K-$600K/year (80% reduction in incidents)
- **Insurance premium discount**: 15-20% ($30K-$100K/year)
- **Investigation cost savings**: $30K-$150K/year
- **Compliance fine avoidance**: $50K-$500K/year (CTPAT violations)

**Total annual security savings: $310K-$1.35M**

## Conclusion

Cargo theft isn't going away. But automated ID verification, carrier credentialing, and blockchain audit trails dramatically reduce your exposure. YardFlow turns your gate from a vulnerability into a security checkpoint.

[Calculate your security savings →](/roi)
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
    description: post.content.substring(0, 160),
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
          
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
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
        <div className="prose prose-invert mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div
            className="prose-headings:text-white prose-p:text-steel prose-a:text-neon prose-a:no-underline hover:prose-a:text-neon/80 prose-strong:text-white prose-ul:text-steel"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* Footer CTA */}
      <section className="border-t border-steel/20 py-12">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-6 text-lg text-steel">
            Want to see how much you could save with YardFlow security?
          </p>
          <Link
            href="/roi"
            className="inline-flex items-center gap-2 rounded-lg bg-neon px-6 py-3 font-semibold text-void transition-all hover:bg-neon/90"
          >
            Calculate Your Savings
          </Link>
        </div>
      </section>
    </main>
  );
}

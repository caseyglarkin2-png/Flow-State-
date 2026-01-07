import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ChevronRight } from 'lucide-react';
import Card from '@/components/Card';

export const metadata: Metadata = {
  title: 'Blog - YardFlow by FreightRoll',
  description: 'Insights on yard automation, cargo security, supply chain efficiency, and the economics of yard operations.',
};

const blogPosts = [
  {
    slug: 'cargo-theft-prevention',
    title: 'The $30B Problem: Cargo Theft and How Yard Automation Fights Back',
    excerpt: 'Every year, cargo theft costs the industry $15B-$30B. Most incidents start at the gate. Here\'s how ID verification and blockchain audit trails change the game.',
    date: '2024-01-15',
    category: 'Security',
    readTime: '8 min read',
  },
  {
    slug: 'network-effect-yard-automation',
    title: 'Why Yard Automation Gets Better as Your Network Grows',
    excerpt: 'Traditional software scales linearly. Yard automation scales exponentially. Learn how the network effect creates compounding value across multi-site deployments.',
    date: '2024-01-10',
    category: 'Economics',
    readTime: '6 min read',
  },
  {
    slug: 'ctpat-tsa-compliance',
    title: 'CTPAT & TSA Compliance: The Security Mandate You Can\'t Ignore',
    excerpt: 'Homeland Security is tightening yard security requirements. Here\'s what CTPAT and TSA regulations mean for your facility and how automation helps you stay compliant.',
    date: '2024-01-05',
    category: 'Compliance',
    readTime: '7 min read',
  },
  {
    slug: 'yard-tax-calculator',
    title: 'Calculating Your Yard Tax: The Nine Hidden Costs Draining Your Operations',
    excerpt: 'From detention to security fraud, the yard tax is real. Use our diagnostic calculator to quantify the invisible costs of manual yard operations.',
    date: '2023-12-20',
    category: 'Operations',
    readTime: '5 min read',
  },
  {
    slug: 'primo-singularity-simulations',
    title: 'FreightRoll\'s Primo & Singularity: The Simulations That Built YardFlow',
    excerpt: 'Before building YardFlow, we simulated thousands of yard scenarios. Primo modeled individual facility dynamics. Singularity simulated enterprise networks. Here\'s what we learned.',
    date: '2023-12-15',
    category: 'Research',
    readTime: '10 min read',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-void">
      {/* Hero */}
      <section className="border-b border-steel/20 bg-gradient-to-b from-carbon to-void py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-steel">
            Insights on yard automation, cargo security, supply chain efficiency, and the economics of operational transformation.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full transition-all hover:border-neon/40 hover:shadow-lg hover:shadow-neon/10">
                  <div className="flex h-full flex-col">
                    <div className="mb-3 flex items-center gap-3 text-sm">
                      <span className="rounded-full bg-neon/10 px-3 py-1 text-neon">
                        {post.category}
                      </span>
                      <span className="text-steel">{post.readTime}</span>
                    </div>
                    
                    <h2 className="mb-3 text-xl font-semibold text-white">
                      {post.title}
                    </h2>
                    
                    <p className="mb-4 flex-1 text-steel">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between border-t border-steel/20 pt-4">
                      <div className="flex items-center gap-2 text-sm text-steel/70">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                      
                      <span className="flex items-center gap-1 text-sm font-medium text-neon">
                        Read more <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-steel/20 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white">
            Want to calculate your own Yard Tax?
          </h2>
          <p className="mt-4 text-lg text-steel">
            Use our diagnostic calculator to quantify the hidden costs in your yard operations.
          </p>
          <Link
            href="/roi"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-neon px-6 py-3 font-semibold text-void transition-all hover:bg-neon/90"
          >
            Run Diagnostic
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}

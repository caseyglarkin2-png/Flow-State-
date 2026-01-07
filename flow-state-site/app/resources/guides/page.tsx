import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Nexus } from '@/components/icons/FlowIcons';

export const metadata = {
  title: 'Guides | Resources | YardFlow',
  description: 'Deep-dive frameworks for yard operations, cargo security, compliance, and network optimization.',
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
    description: 'Understanding how connected yards create compounding operational advantages—and the economics behind multi-site adoption.',
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

export default function GuidesIndexPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-void pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <Link href="/resources" className="text-neon hover:underline text-sm mb-4 inline-block">
            ← Back to Resources
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Guides</h1>
          <p className="text-steel text-lg max-w-3xl">
            Deep-dive frameworks for specific operational challenges. Written for enterprise 
            buyers and operators evaluating yard automation, security, and network optimization.
          </p>
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
      </div>
    </main>
    <Footer />
    </>
  );
}

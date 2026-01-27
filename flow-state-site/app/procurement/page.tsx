import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Procurement & Evidence Vault | YardFlow',
  description: 'Security documentation, compliance certifications, case studies, and procurement resources for enterprise buyers.',
};

export default function ProcurementPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-void">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pt-32 pb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">
            Evidence Vault
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-white md:text-6xl">
            Procurement & Compliance
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-steel leading-relaxed">
            Everything your security, legal, and procurement teams need to evaluate YardFlow. 
            One-pagers, certifications, case data, and direct access to our team.
          </p>
        </section>

        {/* Key Stats */}
        <section className="mx-auto max-w-6xl px-6 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 bg-carbon border border-steel/20 rounded-xl text-center">
              <p className="text-3xl font-black text-neon">SOC 2</p>
              <p className="text-sm text-steel mt-1">Type II Compliant</p>
            </div>
            <div className="p-6 bg-carbon border border-steel/20 rounded-xl text-center">
              <p className="text-3xl font-black text-white">99.9%</p>
              <p className="text-sm text-steel mt-1">Uptime SLA</p>
            </div>
            <div className="p-6 bg-carbon border border-steel/20 rounded-xl text-center">
              <p className="text-3xl font-black text-white">90</p>
              <p className="text-sm text-steel mt-1">Day Deployment</p>
            </div>
            <div className="p-6 bg-carbon border border-steel/20 rounded-xl text-center">
              <p className="text-3xl font-black text-white">24/7</p>
              <p className="text-sm text-steel mt-1">Support Coverage</p>
            </div>
          </div>
        </section>

        {/* Evidence Grid */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Documentation Library</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVIDENCE_CARDS.map((card) => (
              <div
                key={card.title}
                className="p-6 bg-carbon border border-steel/20 rounded-xl hover:border-neon/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center mb-4">
                  <span className="text-neon text-xl">{card.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{card.title}</h3>
                <p className="mt-2 text-sm text-steel">{card.description}</p>
                {card.cta ? (
                  <a
                    href={card.link}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-neon font-medium group-hover:underline"
                  >
                    {card.cta} →
                  </a>
                ) : (
                  <p className="mt-4 text-xs text-steel/60 font-mono">
                    Request via procurement packet
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Security Architecture */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="p-8 bg-carbon border border-steel/20 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Security Architecture</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-neon mb-3">Data Protection</h3>
                <ul className="space-y-2 text-sm text-steel">
                  <li className="flex items-center gap-2">
                    <span className="text-neon">✓</span>
                    AES-256 encryption at rest
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-neon">✓</span>
                    TLS 1.3 in transit
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-neon">✓</span>
                    Customer data isolation (multi-tenant architecture)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-neon">✓</span>
                    90-day audit log retention
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-neon mb-3">Access Controls</h3>
                <ul className="space-y-2 text-sm text-steel">
                  <li className="flex items-center gap-2">
                    <span className="text-neon">✓</span>
                    SSO/SAML 2.0 integration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-neon">✓</span>
                    Role-based access control (RBAC)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-neon">✓</span>
                    MFA enforcement
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-neon">✓</span>
                    IP allowlisting available
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="p-8 bg-gradient-to-br from-neon/10 to-transparent border border-neon/20 rounded-2xl text-center">
            <h2 className="text-2xl font-bold text-white">Need a Procurement Packet?</h2>
            <p className="mt-2 text-steel max-w-xl mx-auto">
              Get security questionnaire responses, SOC 2 documentation, implementation 
              timelines, and custom one-pagers for your team.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact?intent=procurement"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold bg-neon text-void hover:bg-white transition-all"
              >
                Request Procurement Packet
              </a>
              <a
                href="/contact?intent=security"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold border border-steel/30 text-white hover:border-neon/40 transition-colors"
              >
                Schedule Security Review
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const EVIDENCE_CARDS = [
  {
    icon: '🔒',
    title: 'Security & Compliance',
    description: 'SOC 2 Type II report, security architecture docs, penetration test summaries.',
    cta: 'Request Access',
    link: '/contact?intent=security',
  },
  {
    icon: '📊',
    title: 'Case Studies',
    description: 'Operational outcomes from production deployments. Real data, not projections.',
    cta: 'View Case Studies',
    link: '/solutions',
  },
  {
    icon: '📄',
    title: 'Product One-Pager',
    description: 'Executive summary of YNS capabilities for stakeholder distribution.',
    cta: 'Learn More',
    link: '/product',
  },
  {
    icon: '🏗️',
    title: 'Implementation Guide',
    description: '90-day deployment timeline, integration requirements, and change management.',
    cta: null,
    link: null,
  },
  {
    icon: '💰',
    title: 'ROI Calculator',
    description: 'Model your network economics and generate board-ready PDF documentation.',
    cta: 'Run ROI Model',
    link: '/roi',
  },
  {
    icon: '📞',
    title: 'Direct Access',
    description: 'Schedule calls with engineering, security, or executive leadership.',
    cta: 'Schedule Call',
    link: '/contact?intent=audit',
  },
];

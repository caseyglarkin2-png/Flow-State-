import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import {
  Shield,
  Agent,
  Cortex,
  Timeline,
  Confirm,
} from '@/components/icons/FlowIcons';

export const metadata = {
  title: 'Evidence Vault | Security & Trust | Flow State',
  description: 'Everything procurement needs: security posture, implementation timeline, integration specs, and compliance roadmap.',
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-neon font-mono text-sm tracking-widest mb-4 uppercase">
            Evidence Vault
          </p>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Everything Procurement <span className="text-neon">Needs.</span>
          </h1>
          <p className="text-xl text-steel max-w-3xl">
            Security posture. Implementation timeline. Integration specs. Compliance roadmap. 
            All in one place, ready to forward.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 border-b border-steel/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Security Controls', href: '#security' },
              { label: 'Implementation', href: '#implementation' },
              { label: 'Integrations', href: '#integrations' },
              { label: 'Compliance', href: '#compliance' },
              { label: 'SLA & Support', href: '#sla' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-steel/30 text-steel hover:border-neon hover:text-neon transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Security Controls */}
      <section id="security" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-lg bg-neon/10">
              <Shield size={32} className="text-neon" />
            </div>
            <div>
              <h2 className="text-3xl font-black">Security Controls</h2>
              <p className="text-steel">Enterprise-grade from day one</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-neon mb-4">Data Protection</h3>
              <ul className="space-y-3">
                {[
                  { item: 'TLS 1.3 encryption in transit', status: 'live' },
                  { item: 'AES-256 encryption at rest', status: 'live' },
                  { item: 'Least-privilege access controls', status: 'live' },
                  { item: 'Environment separation (dev/stage/prod)', status: 'live' },
                  { item: 'Data residency options (US/EU)', status: 'roadmap' },
                ].map((row, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span className="text-steel/90">{row.item}</span>
                    <span className={`text-xs font-mono px-2 py-1 rounded ${
                      row.status === 'live' ? 'bg-neon/20 text-neon' : 'bg-steel/20 text-steel'
                    }`}>
                      {row.status}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-neon mb-4">Access & Identity</h3>
              <ul className="space-y-3">
                {[
                  { item: 'Role-based access control (RBAC)', status: 'live' },
                  { item: 'MFA for admin accounts', status: 'live' },
                  { item: 'Audit logging', status: 'live' },
                  { item: 'SSO/SAML integration', status: 'Q2 2026' },
                  { item: 'SCIM provisioning', status: 'roadmap' },
                ].map((row, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span className="text-steel/90">{row.item}</span>
                    <span className={`text-xs font-mono px-2 py-1 rounded ${
                      row.status === 'live' ? 'bg-neon/20 text-neon' : 'bg-steel/20 text-steel'
                    }`}>
                      {row.status}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-neon mb-4">Infrastructure</h3>
              <ul className="space-y-3">
                {[
                  { item: 'Cloud-native on AWS/Vercel', status: 'live' },
                  { item: 'DDoS protection', status: 'live' },
                  { item: 'WAF & rate limiting', status: 'live' },
                  { item: 'Automated backups (daily)', status: 'live' },
                  { item: 'Disaster recovery (RPO < 24h)', status: 'live' },
                ].map((row, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span className="text-steel/90">{row.item}</span>
                    <span className={`text-xs font-mono px-2 py-1 rounded ${
                      row.status === 'live' ? 'bg-neon/20 text-neon' : 'bg-steel/20 text-steel'
                    }`}>
                      {row.status}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-neon mb-4">Vendor Security</h3>
              <ul className="space-y-3">
                {[
                  { item: 'Security questionnaire support', status: 'live' },
                  { item: 'Penetration test reports', status: 'on request' },
                  { item: 'Vulnerability disclosure program', status: 'live' },
                  { item: 'Insurance (cyber liability)', status: 'live' },
                  { item: 'Background checks (employees)', status: 'live' },
                ].map((row, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span className="text-steel/90">{row.item}</span>
                    <span className={`text-xs font-mono px-2 py-1 rounded ${
                      row.status === 'live' ? 'bg-neon/20 text-neon' : 'bg-steel/20 text-steel'
                    }`}>
                      {row.status}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section id="implementation" className="py-20 bg-carbon/50 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-lg bg-neon/10">
              <Timeline size={32} className="text-neon" />
            </div>
            <div>
              <h2 className="text-3xl font-black">Implementation Timeline</h2>
              <p className="text-steel">From contract to production in weeks, not months</p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                phase: 'Week 1',
                title: 'POC / Proof of Concept',
                tasks: [
                  'Single gate lane instrumented',
                  'Camera + kiosk hardware shipped',
                  'Driver app configured',
                  'Baseline metrics captured',
                ],
                deliverable: 'Timestamp accuracy validation',
              },
              {
                phase: 'Week 2-4',
                title: 'Pilot Expansion',
                tasks: [
                  'Full facility deployment',
                  'Digital BOL integration',
                  'Staff training (2 hours)',
                  'TMS/WMS connection (if applicable)',
                ],
                deliverable: 'Dwell time baseline + improvement measurement',
              },
              {
                phase: 'Day 30-90',
                title: 'Network Rollout',
                tasks: [
                  'Multi-site deployment playbook',
                  'Carrier onboarding at scale',
                  'Executive dashboard access',
                  'Network effect activation',
                ],
                deliverable: 'Enterprise-wide visibility + ROI realization',
              },
            ].map((phase, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-20 flex-shrink-0">
                    <p className="text-neon font-mono text-sm font-bold">{phase.phase}</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-4">{phase.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-steel/60 text-sm font-mono mb-2">TASKS</p>
                        <ul className="space-y-1">
                          {phase.tasks.map((task, j) => (
                            <li key={j} className="flex items-center gap-2 text-steel/90">
                              <Confirm size={14} className="text-neon flex-shrink-0" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-steel/60 text-sm font-mono mb-2">DELIVERABLE</p>
                        <p className="text-white font-medium">{phase.deliverable}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/implementation"
              className="inline-flex items-center gap-2 text-neon font-semibold hover:text-white transition-colors"
            >
              View Full Implementation Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="py-20 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-lg bg-neon/10">
              <Cortex size={32} className="text-neon" />
            </div>
            <div>
              <h2 className="text-3xl font-black">Integration Capabilities</h2>
              <p className="text-steel">Connect to your existing stack</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-neon mb-4">TMS / WMS</h3>
              <ul className="space-y-2 text-steel/80">
                <li>• REST API (bi-directional)</li>
                <li>• Webhook events</li>
                <li>• EDI support (roadmap)</li>
                <li>• Pre-built connectors for major platforms</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-neon mb-4">Gate Hardware</h3>
              <ul className="space-y-2 text-steel/80">
                <li>• LPR cameras (Axis, Hikvision)</li>
                <li>• Kiosk tablets (Android/iOS)</li>
                <li>• RFID readers</li>
                <li>• Barrier arm control</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-neon mb-4">Enterprise Systems</h3>
              <ul className="space-y-2 text-steel/80">
                <li>• SSO/SAML (Q2 2026)</li>
                <li>• Active Directory sync</li>
                <li>• Appointment schedulers</li>
                <li>• BI tools (API + exports)</li>
              </ul>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/integrations"
              className="inline-flex items-center gap-2 text-neon font-semibold hover:text-white transition-colors"
            >
              Explore All Integrations →
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section id="compliance" className="py-20 bg-carbon/50 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-lg bg-neon/10">
              <Confirm size={32} className="text-neon" />
            </div>
            <div>
              <h2 className="text-3xl font-black">Compliance Roadmap</h2>
              <p className="text-steel">Building enterprise trust systematically</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-neon/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">SOC 2 Type II</h3>
                <span className="text-xs font-mono px-3 py-1 rounded bg-neon/20 text-neon">
                  Q3 2026
                </span>
              </div>
              <p className="text-steel/80 mb-4">
                Full attestation covering security, availability, and confidentiality trust service criteria.
              </p>
              <p className="text-steel/60 text-sm">
                Type I assessment scheduled for Q2 2026. Contact us for current security questionnaire completion.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">GDPR</h3>
                <span className="text-xs font-mono px-3 py-1 rounded bg-neon/20 text-neon">
                  Compliant
                </span>
              </div>
              <p className="text-steel/80 mb-4">
                Data processing agreements available. Right to erasure and export supported.
              </p>
              <p className="text-steel/60 text-sm">
                EU data residency options available on enterprise plans.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">CCPA</h3>
                <span className="text-xs font-mono px-3 py-1 rounded bg-neon/20 text-neon">
                  Compliant
                </span>
              </div>
              <p className="text-steel/80">
                California Consumer Privacy Act compliance. Clear data handling and deletion procedures.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">ISO 27001</h3>
                <span className="text-xs font-mono px-3 py-1 rounded bg-steel/20 text-steel">
                  Roadmap
                </span>
              </div>
              <p className="text-steel/80">
                Information security management certification planned following SOC 2 completion.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* SLA & Support */}
      <section id="sla" className="py-20 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-lg bg-neon/10">
              <Agent size={32} className="text-neon" />
            </div>
            <div>
              <h2 className="text-3xl font-black">SLA & Support</h2>
              <p className="text-steel">Enterprise-grade reliability and response</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center">
              <p className="text-5xl font-black text-neon mb-2">99.9%</p>
              <p className="text-steel/80">Uptime SLA</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="text-5xl font-black text-neon mb-2">&lt;4hr</p>
              <p className="text-steel/80">Critical Response</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="text-5xl font-black text-neon mb-2">24/7</p>
              <p className="text-steel/80">Enterprise Support</p>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Support Tiers</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-steel/20">
                    <th className="text-left py-3 text-steel/60 font-mono">Severity</th>
                    <th className="text-left py-3 text-steel/60 font-mono">Response</th>
                    <th className="text-left py-3 text-steel/60 font-mono">Resolution</th>
                    <th className="text-left py-3 text-steel/60 font-mono">Example</th>
                  </tr>
                </thead>
                <tbody className="text-steel/80">
                  <tr className="border-b border-steel/10">
                    <td className="py-3 font-semibold text-ember">Critical (P1)</td>
                    <td className="py-3">&lt; 1 hour</td>
                    <td className="py-3">&lt; 4 hours</td>
                    <td className="py-3">System-wide outage</td>
                  </tr>
                  <tr className="border-b border-steel/10">
                    <td className="py-3 font-semibold text-yellow-500">High (P2)</td>
                    <td className="py-3">&lt; 4 hours</td>
                    <td className="py-3">&lt; 24 hours</td>
                    <td className="py-3">Feature degradation</td>
                  </tr>
                  <tr className="border-b border-steel/10">
                    <td className="py-3 font-semibold text-neon">Medium (P3)</td>
                    <td className="py-3">&lt; 1 business day</td>
                    <td className="py-3">&lt; 3 business days</td>
                    <td className="py-3">Non-blocking bug</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-steel">Low (P4)</td>
                    <td className="py-3">&lt; 2 business days</td>
                    <td className="py-3">Best effort</td>
                    <td className="py-3">Enhancement request</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-carbon/50 border-t border-neon/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6">
            Ready for the Security Review?
          </h2>
          <p className="text-xl text-steel/80 mb-8">
            We aim to turn around security questionnaires quickly (often within 48 hours).
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold bg-neon text-void hover:bg-white transition-all"
            >
              <Shield size={20} className="text-void" />
              Request Security Package
            </Link>
            <a
              href="mailto:security@flow-state.ai"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold border border-steel/40 text-white hover:border-neon hover:text-neon transition-all"
            >
              security@flow-state.ai
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

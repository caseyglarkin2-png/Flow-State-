import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import EvidenceTimeline, { SAMPLE_TIMELINE } from '@/components/EvidenceTimeline';
import { Lock } from 'lucide-react';
import {
  Shield,
  Agent,
  Cortex,
  Timeline,
  Confirm,
} from '@/components/icons/FlowIcons';

export const metadata = {
  title: 'Procurement | Resources | YardFlow by FreightRoll',
  description: 'Everything procurement needs: security posture, implementation timeline, integration specs, compliance roadmap, and cargo theft prevention.',
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-neon font-mono text-sm tracking-widest mb-4 uppercase">
            Procurement Resources
          </p>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Everything procurement needs. <span className="text-neon">One page.</span>
          </h1>
          <p className="text-xl text-steel/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Security posture. Compliance roadmap. Integration specs. Implementation timeline. Driver qualification compliance. Cargo theft prevention. Download the trust packet or dig deeper.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-lg bg-ember/10 border border-ember/30">
              <p className="text-ember font-bold mb-1">SOC 2 Type II</p>
              <p className="text-sm text-steel/80">In progress (Q2 2026 target)</p>
            </div>
            <div className="p-4 rounded-lg bg-ember/10 border border-ember/30">
              <p className="text-ember font-bold mb-1">Unified Carrier ID</p>
              <p className="text-sm text-steel/80">OCR + photo + real-time auth</p>
            </div>
            <div className="p-4 rounded-lg bg-ember/10 border border-ember/30">
              <p className="text-ember font-bold mb-1">Driver Qualification</p>
              <p className="text-sm text-steel/80">Documented compliance with DOT/FMCSA standards</p>
            </div>
          </div>
          
          {/* Download/Forward Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-neon text-void hover:bg-white hover:text-void transition-all">
              <Shield size={20} />
              Download Trust Packet (PDF)
            </button>
            <Link href="#evidence-vault" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border-2 border-steel/40 text-steel hover:border-neon hover:text-neon transition-all">
              Explore Evidence Vault
            </Link>
          </div>
        </div>
      </section>

      {/* Operational Security - PRIMARY */}
      <section className="py-20 bg-gradient-to-b from-carbon/50 to-void border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-neon font-mono text-sm tracking-widest mb-4 uppercase text-center">
            Operational Security
          </p>
          <h2 className="text-4xl font-black mb-3 text-center">The Three Gaps</h2>
          <p className="text-steel/80 mb-10 text-center max-w-3xl mx-auto">
            Carrier identity verification. Cargo theft prevention. Driver qualification compliance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Carrier Identity */}
            <Card className="p-6 border-ember/30">
              <Shield size={32} className="text-ember mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Carrier Identity Verification</h3>
              <p className="text-steel/80 mb-4">
                Unknown drivers. Fake credentials. Unauthorized yard access. 
                <span className="block mt-2 text-white font-semibold">Digital Guard solves this.</span>
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span className="text-steel/90">OCR license scan + photo capture</span>
                </li>
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span className="text-steel/90">Cross-reference against carrier database</span>
                </li>
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span className="text-steel/90">Real-time authentication at kiosk</span>
                </li>
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span className="text-steel/90">Flagged credentials rejected instantly</span>
                </li>
              </ul>
            </Card>

            {/* Cargo Security */}
            <Card className="p-6 border-ember/30">
              <Lock size={32} className="text-ember mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Cargo Theft Prevention</h3>
              <p className="text-steel/80 mb-4">
                Trailers disappear. Loads go missing. No audit trail. 
                <span className="block mt-2 text-white font-semibold">Digital BOL locks it down.</span>
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span className="text-steel/90">Timestamped chain-of-custody for every load</span>
                </li>
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span className="text-steel/90">GPS geofencing alerts if trailer exits yard</span>
                </li>
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span className="text-steel/90">Cryptographically signed BOL verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span className="text-steel/90">Incident reporting + law enforcement integration</span>
                </li>
              </ul>
            </Card>

            {/* Driver Qualification & Compliance */}
            <Card className="p-6 border-ember/30">
              <Agent size={32} className="text-ember mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Driver Qualification Compliance</h3>
              <p className="text-steel/80 mb-4">
                Regulatory frameworks continue to evolve around carrier qualification standards. Documented driver verification for vehicles 50K+ lbs reduces audit and dispute exposure. 
                <span className="block mt-2 text-white font-semibold">Digital Guard creates audit-ready records.</span>
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span className="text-steel/90">CDL verification + English proficiency check</span>
                </li>
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span className="text-steel/90">Supports DOT/FMCSA requirement: English proficiency for vehicles 50K+ lbs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span className="text-steel/90">Reduces audit and dispute exposure with documented driver checks</span>
                </li>
                <li className="flex items-start gap-2">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
                  <span className="text-steel/90">Audit-ready records for DOT/FMCSA compliance reviews</span>
                </li>
              </ul>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-steel/60 text-sm mb-4">
              Proposed regulations may expand shipper compliance obligations. Digital Guard creates documentation-ready records to support audit readiness.
            </p>
            <Link href="/product" className="inline-flex items-center gap-2 text-neon hover:underline font-semibold">
              See how Digital Guard + Digital BOL work together →
            </Link>
          </div>

          {/* Defensible Timestamps = Defensible Dollars */}
          <div className="mt-16 p-8 rounded-lg bg-gradient-to-br from-neon/5 to-ember/5 border-2 border-neon/30">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              Defensible Timestamps = Defensible Dollars
            </h3>
            <p className="text-steel/90 leading-relaxed max-w-3xl mx-auto">
              Every detention dispute, cargo theft investigation, and compliance audit comes down to one question: 
              <span className="text-white font-semibold"> "When exactly did this happen, and can you prove it?"</span>
              <br /><br />
              Manual logs are hearsay. GPS alone doesn't prove check-in. Video timestamps can be manipulated. 
              Digital Guard creates <span className="text-neon font-semibold">cryptographically signed, QR-verified timestamps</span> designed for 
              dispute resolution. Every driver check-in becomes defensible evidence that supports financial and compliance reviews.
              <br /><br />
              You're not just tracking time. You're <span className="text-neon font-semibold">protecting revenue, reducing audit exposure, 
              and creating documentation-ready proof</span> that your yard operations are measurable and defensible.
            </p>
          </div>
        </div>
      </section>

      {/* Evidence Vault - Interactive Proof */}
      <section id="evidence-vault" className="py-20 bg-carbon/30 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-neon/70 mb-4">Proof You Can Forward</p>
            <h2 className="text-3xl font-bold text-white mb-4">
              Evidence Vault: Every Event, Every Timestamp, Every Proof
            </h2>
            <p className="text-[17px] text-steel leading-8 max-w-3xl">
              This is your audit trail. Every carrier check-in. Every exception. Every resolution. Defensible timestamps. Cryptographic signatures. Ready for disputes, audits, and compliance reviews.
            </p>
          </div>
          <EvidenceTimeline events={SAMPLE_TIMELINE} />
        </div>
      </section>
      <section className="py-16 bg-void border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-2">Data Security & IT Compliance</h2>
          <p className="text-steel/80 mb-8">What IT and procurement also need to know</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Hosting', value: 'AWS (US-East) + Vercel Edge', status: 'LIVE' },
              { label: 'Encryption', value: 'TLS 1.3 (transit) · AES-256 (rest)', status: 'LIVE' },
              { label: 'Access Control', value: 'RBAC + MFA for admin accounts', status: 'LIVE' },
              { label: 'Audit Logging', value: 'All API calls, user actions, system events', status: 'LIVE' },
              { label: 'Incident Response', value: '< 4hr acknowledgment · < 24hr remediation', status: 'LIVE' },
              { label: 'SLA', value: '99.9% uptime · 24/7 monitoring', status: 'LIVE' },
              { label: 'Backups', value: 'Daily automated · < 24h RPO', status: 'LIVE' },
              { label: 'Pen Test Reports', value: 'Available under NDA', status: 'AVAILABLE' },
              { label: 'SSO/SAML', value: 'Enterprise SSO integration', status: 'Q2 2026' },
              { label: 'Data Residency', value: 'US/EU options', status: 'ROADMAP' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-steel/30 bg-carbon/40">
                <div>
                  <span className="block text-sm text-steel/60 font-mono uppercase tracking-wider">{item.label}</span>
                  <span className="block text-white font-medium mt-1">{item.value}</span>
                </div>
                <span className={`text-xs font-mono px-3 py-1 rounded ${
                  item.status === 'LIVE' ? 'bg-neon/20 text-neon' : 
                  item.status === 'AVAILABLE' ? 'bg-neon/10 text-neon/70' :
                  'bg-steel/20 text-steel'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
          
          <p className="text-center text-steel/60 text-sm mt-8">
            Full technical details below. <a href="#security" className="text-neon hover:underline">Jump to data controls →</a>
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 border-b border-steel/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Carrier ID Verification', href: '#carrier-id' },
              { label: 'Cargo Security', href: '#cargo-security' },
              { label: 'Data Controls', href: '#security' },
              { label: 'Data Handling', href: '#data-handling' },
              { label: 'Incident Response', href: '#incident-response' },
              { label: 'Implementation', href: '#implementation' },
              { label: 'Integrations', href: '#integrations' },
              { label: 'Compliance', href: '#compliance' },
              { label: 'SLA & Support', href: '#sla' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-xl text-sm font-medium border border-steel/30 text-steel hover:border-neon hover:text-neon transition-colors"
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
                  { item: 'Penetration test reports', status: 'available under NDA' },
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

      {/* Data Handling Policy */}
      <section id="data-handling" className="py-20 bg-carbon/50 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-lg bg-neon/10">
              <Shield size={32} className="text-neon" />
            </div>
            <div>
              <h2 className="text-3xl font-black">Data Handling Policy</h2>
              <p className="text-steel">Transparent data collection, storage, and usage</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-neon mb-4">What We Collect</h3>
              <ul className="space-y-3 text-steel/90">
                <li className="flex items-start gap-3">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-white">Operational Data:</span> Truck IDs, arrival/departure timestamps, dock assignments, dwell times, GPS coordinates (yard-only)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-white">Identity Data:</span> Driver license scans (hashed), carrier credentials, authorized user accounts
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-white">System Logs:</span> API calls, user actions, system events, error diagnostics
                  </div>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-neon mb-4">What We DON'T Collect</h3>
              <ul className="space-y-3 text-steel/90">
                <li className="flex items-start gap-3">
                  <span className="text-ember text-2xl">✗</span>
                  <div>Cargo contents or bill of lading details (unless explicitly integrated for paperless workflows)</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ember text-2xl">✗</span>
                  <div>Personal contact info of drivers (phone/email) unless provided for SMS notifications</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ember text-2xl">✗</span>
                  <div>GPS tracking outside yard boundaries (geofenced)</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ember text-2xl">✗</span>
                  <div>Sensitive financial data (customer invoices, payment methods)</div>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-neon mb-4">How We Use Data</h3>
              <ul className="space-y-3 text-steel/90">
                <li className="flex items-start gap-3">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-1" />
                  <div><strong>Operational:</strong> Real-time yard orchestration, move recommendations, dwell time analytics</div>
                </li>
                <li className="flex items-start gap-3">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-1" />
                  <div><strong>Security:</strong> Access verification, audit trails, compliance reporting</div>
                </li>
                <li className="flex items-start gap-3">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-1" />
                  <div><strong>Network Intelligence:</strong> Anonymized benchmarking, predictive ETA models, carrier performance scoring</div>
                </li>
                <li className="flex items-start gap-3">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-1" />
                  <div><strong>Product Improvement:</strong> Feature usage analytics, error monitoring, performance optimization</div>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-neon mb-4">Your Data Rights</h3>
              <ul className="space-y-3 text-steel/90">
                <li className="flex items-start gap-3">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-1" />
                  <div><strong>Access:</strong> Request full export of your data (JSON/CSV) within 7 business days</div>
                </li>
                <li className="flex items-start gap-3">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-1" />
                  <div><strong>Deletion:</strong> Right to erasure (GDPR/CCPA compliant) with 30-day retention for audit logs</div>
                </li>
                <li className="flex items-start gap-3">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-1" />
                  <div><strong>Portability:</strong> Export data in machine-readable formats</div>
                </li>
                <li className="flex items-start gap-3">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-1" />
                  <div><strong>Opt-Out:</strong> Disable anonymized benchmarking sharing (enterprise-only feature)</div>
                </li>
              </ul>
            </Card>
          </div>

          <Card className="p-6 mt-8 bg-neon/5 border-neon/30">
            <h3 className="text-xl font-bold mb-4">Data Retention & Deletion</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="font-semibold text-neon mb-2">Operational Data</p>
                <p className="text-steel/80">Retained for 2 years (configurable) or duration of contract. Archived after 2 years, deleted after 7 years.</p>
              </div>
              <div>
                <p className="font-semibold text-neon mb-2">Audit Logs</p>
                <p className="text-steel/80">Retained for 7 years (compliance requirement). Immutable, cryptographically timestamped where applicable.</p>
              </div>
              <div>
                <p className="font-semibold text-neon mb-2">Personal Data</p>
                <p className="text-steel/80">Deleted within 30 days of account termination unless required for legal/audit purposes.</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Incident Response */}
      <section id="incident-response" className="py-20 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-lg bg-ember/10">
              <Agent size={32} className="text-ember" />
            </div>
            <div>
              <h2 className="text-3xl font-black">Incident Response Plan</h2>
              <p className="text-steel">Prepared for security events with clear escalation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-neon mb-4">Detection & Monitoring</h3>
              <ul className="space-y-3 text-steel/90">
                <li className="flex items-start gap-3">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-1" />
                  <div><strong>24/7 Automated Monitoring:</strong> Intrusion detection, anomaly detection, failed login alerts</div>
                </li>
                <li className="flex items-start gap-3">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-1" />
                  <div><strong>SIEM Integration:</strong> Centralized logging with real-time threat analysis</div>
                </li>
                <li className="flex items-start gap-3">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-1" />
                  <div><strong>Vulnerability Scanning:</strong> Weekly automated scans, quarterly penetration testing</div>
                </li>
                <li className="flex items-start gap-3">
                  <Confirm size={16} className="text-neon flex-shrink-0 mt-1" />
                  <div><strong>Customer Reporting:</strong> Security dashboard with incident notifications</div>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-neon mb-4">Response Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-20 flex-shrink-0">
                    <span className="text-ember font-mono font-bold">0-1hr</span>
                  </div>
                  <div className="text-steel/90">
                    <strong className="text-white block mb-1">Detection & Triage</strong>
                    Automated alerts trigger on-call engineer. Initial assessment and severity classification.
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-20 flex-shrink-0">
                    <span className="text-ember font-mono font-bold">1-4hr</span>
                  </div>
                  <div className="text-steel/90">
                    <strong className="text-white block mb-1">Containment</strong>
                    Isolate affected systems, revoke compromised credentials, implement temporary blocks.
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-20 flex-shrink-0">
                    <span className="text-neon font-mono font-bold">4-24hr</span>
                  </div>
                  <div className="text-steel/90">
                    <strong className="text-white block mb-1">Eradication & Recovery</strong>
                    Remove threat, patch vulnerabilities, restore normal operations with enhanced monitoring.
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-20 flex-shrink-0">
                    <span className="text-neon font-mono font-bold">24-72hr</span>
                  </div>
                  <div className="text-steel/90">
                    <strong className="text-white block mb-1">Post-Incident Review</strong>
                    Root cause analysis, customer notification (if data breach), remediation plan.
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-ember/5 border-ember/30">
            <h3 className="text-xl font-bold mb-4">Customer Notification Policy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-semibold text-neon mb-2">Data Breach Notification</p>
                <ul className="space-y-2 text-sm text-steel/90">
                  <li>• Notification within 72 hours of confirmed breach (GDPR requirement)</li>
                  <li>• Email to primary account contact + security contact</li>
                  <li>• Details: affected data, timeline, remediation steps, customer actions required</li>
                  <li>• Public disclosure if &gt;10,000 records affected (CCPA threshold)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-neon mb-2">Service Disruption</p>
                <ul className="space-y-2 text-sm text-steel/90">
                  <li>• Status page updates (status.freightroll.com)</li>
                  <li>• Email alerts for P1 incidents affecting operations</li>
                  <li>• Post-mortem published within 5 business days</li>
                  <li>• SLA credits applied automatically for downtime &gt;0.1%</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6 mt-8">
            <h3 className="text-xl font-bold mb-4">Contact Security Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="font-semibold text-neon mb-2">Report Vulnerability</p>
                <a href="mailto:security@freightroll.com" className="text-steel/80 hover:text-neon transition-colors">
                  security@freightroll.com
                </a>
                <p className="text-xs text-steel/60 mt-2">Bug bounty considered case-by-case</p>
              </div>
              <div>
                <p className="font-semibold text-neon mb-2">Security Incident</p>
                <a href="mailto:incident@freightroll.com" className="text-steel/80 hover:text-neon transition-colors">
                  incident@freightroll.com
                </a>
                <p className="text-xs text-steel/60 mt-2">24/7 on-call monitoring</p>
              </div>
              <div>
                <p className="font-semibold text-neon mb-2">General Questions</p>
                <a href="mailto:casey@freightroll.com" className="text-steel/80 hover:text-neon transition-colors">
                  casey@freightroll.com
                </a>
                <p className="text-xs text-steel/60 mt-2">Response within 1 business day</p>
              </div>
            </div>
          </Card>
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

          {/* Visual Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="flex flex-col items-center p-6 rounded-lg bg-void border border-neon/30">
              <div className="w-16 h-16 rounded-full bg-neon/10 flex items-center justify-center mb-3">
                <Shield size={32} className="text-neon" />
              </div>
              <p className="font-bold text-white text-sm">SOC 2 Type II</p>
              <p className="text-steel/60 text-xs">Roadmap 2026</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg bg-void border border-neon/50">
              <div className="w-16 h-16 rounded-full bg-neon/20 flex items-center justify-center mb-3">
                <Confirm size={32} className="text-neon" />
              </div>
              <p className="font-bold text-white text-sm">GDPR</p>
              <p className="text-neon text-xs">Compliant</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg bg-void border border-neon/50">
              <div className="w-16 h-16 rounded-full bg-neon/20 flex items-center justify-center mb-3">
                <Confirm size={32} className="text-neon" />
              </div>
              <p className="font-bold text-white text-sm">CCPA</p>
              <p className="text-neon text-xs">Compliant</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg bg-void border border-steel/30">
              <div className="w-16 h-16 rounded-full bg-steel/10 flex items-center justify-center mb-3">
                <Shield size={32} className="text-steel" />
              </div>
              <p className="font-bold text-white text-sm">ISO 27001</p>
              <p className="text-steel/60 text-xs">Roadmap 2027</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-neon/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">SOC 2 Type II</h3>
                <span className="text-xs font-mono px-3 py-1 rounded bg-steel/20 text-steel">
                  Roadmap 2026
                </span>
              </div>
              <p className="text-steel/80 mb-4">
                Planned attestation covering security, availability, and confidentiality trust service criteria.
              </p>
              <p className="text-steel/60 text-sm">
                Contact us for current security questionnaire completion and penetration test reports (available under NDA).
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
                  Roadmap 2027
                </span>
              </div>
              <p className="text-steel/80">
                Information security management certification planned for future roadmap.
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
          <p className="text-xl text-steel/80 mb-4">
            We aim to turn around security questionnaires quickly (often within 48 hours).
          </p>
          <p className="text-steel/70 text-sm mb-8 max-w-2xl mx-auto">
            Sensitive materials (penetration test results, compliance roadmap, architecture diagrams, 
            customer references) available under NDA during procurement diligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-neon text-void hover:bg-white transition-all"
            >
              <Shield size={20} className="text-void" />
              Request Security Package
            </Link>
            <a
              href="mailto:security@freightroll.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border border-steel/40 text-white hover:border-neon hover:text-neon transition-all"
            >
              security@freightroll.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

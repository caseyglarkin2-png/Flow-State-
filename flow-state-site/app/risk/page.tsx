import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';
import { ShieldAlert, Lock, CheckCircle2, AlertTriangle, Database, FileCheck, Eye, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cargo Theft & Fraud Prevention - YardFlow by FreightRoll',
  description: 'Multi-layered cargo theft prevention through ID verification, carrier credentialing, and immutable audit trails. Turn your gate from vulnerability to security checkpoint.',
  keywords: [
    'cargo theft prevention',
    'carrier fraud detection',
    'ID verification logistics',
    'CTPAT compliance',
    'TSA security standards',
    'supply chain security',
    'freight security',
    'yard security systems',
  ],
};

export default function RiskPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="border-b border-steel/20 bg-gradient-to-b from-carbon to-void py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <ShieldAlert size={64} className="text-ember" />
            </div>
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
              The $30B Problem: Cargo Theft & Fraud
            </h1>
            <p className="text-xl text-steel max-w-3xl mx-auto mb-8">
              Every year, cargo theft costs the industry $15B-$30B globally. Most incidents start at the gate. 
              Fraudulent carriers, fake credentials, and unauthorized access are preventable—if you verify identity 
              before granting access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold bg-neon text-void hover:bg-neon/90 transition-all"
              >
                Request Security Assessment
              </a>
              <a 
                href="/roi" 
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold border-2 border-steel/30 text-white hover:border-neon/40 transition-all"
              >
                Calculate Security Savings
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Threat Landscape */}
      <section className="py-16 border-b border-steel/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">The Threat Landscape</h2>
            <p className="text-steel text-lg max-w-3xl mx-auto">
              Cargo theft is a professional, organized industry. Fraudsters exploit gaps in manual gate processes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                stat: '$15B–$30B',
                label: 'Annual cargo theft losses globally',
                source: 'Industry estimates (FBI, TT Club)',
              },
              {
                stat: '3,625',
                label: 'Cargo theft incidents in US (2023)',
                source: '+27% year-over-year increase',
              },
              {
                stat: '3.19%',
                label: 'Fraudulent driver IDs detected',
                source: 'ID verification audits',
              },
              {
                stat: '$15K–$50K',
                label: 'Average investigation cost per incident',
                source: 'Plus cargo value and delays',
              },
            ].map((item, i) => (
              <Card key={i} className="text-center">
                <p className="text-4xl font-bold text-ember mb-2">{item.stat}</p>
                <p className="text-white font-semibold mb-1">{item.label}</p>
                <p className="text-steel/70 text-sm">{item.source}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Attack Vectors */}
      <section className="py-16 border-b border-steel/20 bg-carbon/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Common Attack Vectors</h2>
            <p className="text-steel text-lg max-w-3xl mx-auto">
              Manual gate processes create vulnerabilities. Here's how fraudsters exploit them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <AlertTriangle size={32} className="text-ember" />,
                title: 'Fraudulent Driver Credentials',
                description: 'Forged driver\'s licenses, stolen CDLs, or credential sharing enable unauthorized pickups.',
                prevention: 'OCR scanning + supports ID verification integrations (e.g., IDScan.net, Intellicheck)',
              },
              {
                icon: <Lock size={32} className="text-ember" />,
                title: 'Fake Carrier Impersonation',
                description: 'Scammers pose as legitimate carriers with fake DOT numbers and documentation.',
                prevention: 'FMCSA cross-reference + carrier performance history + blacklist checks',
              },
              {
                icon: <FileCheck size={32} className="text-ember" />,
                title: 'Missing Audit Trails',
                description: 'Paper logs are incomplete, altered, or destroyed—making post-incident investigations nearly impossible.',
                prevention: 'Timestamped transaction records + immutable audit logs + forensic-grade evidence',
              },
              {
                icon: <Eye size={32} className="text-ember" />,
                title: 'Unauthorized Access',
                description: 'No real-time verification allows unknown individuals to enter secure yards.',
                prevention: 'Real-time credentialing + supports biometric integrations + instant alerts',
              },
            ].map((vector, i) => (
              <Card key={i}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">{vector.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{vector.title}</h3>
                    <p className="text-steel mb-3">{vector.description}</p>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="text-neon flex-shrink-0 mt-0.5" />
                      <p className="text-neon text-sm font-medium">{vector.prevention}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* YardFlow Security Controls */}
      <section className="py-16 border-b border-steel/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">The YardFlow Security Stack</h2>
            <p className="text-steel text-lg max-w-3xl mx-auto">
              Five layers of defense that turn your gate from vulnerability to security checkpoint.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {[
              {
                phase: 'Verify',
                title: 'ID Scanning & Validation',
                features: [
                  'OCR scan of driver\'s license or CDL',
                  'Supports ID verification integrations (IDScan.net, Intellicheck)',
                  'Expiration date and credential status check',
                  'Flags suspicious or expired credentials instantly',
                ],
                result: 'Only verified individuals gain access',
              },
              {
                phase: 'Authorize',
                title: 'Carrier Credentialing Database',
                features: [
                  'Cross-reference against FMCSA, CTPAT, TSA databases',
                  'Maintain blacklist of fraudulent carriers',
                  'Track carrier performance history and violations',
                  'Real-time alerts for high-risk carriers',
                ],
                result: 'Known bad actors are blocked before entry',
              },
              {
                phase: 'Record',
                title: 'Immutable Audit Trail',
                features: [
                  'Cryptographic timestamp for every gate transaction',
                  'Tamper-proof chain of custody',
                  'Forensic-grade evidence for investigations',
                  'Reduces investigation time from weeks to hours',
                ],
                result: 'Complete accountability and legal defensibility',
              },
              {
                phase: 'Alert',
                title: 'Real-Time Risk Notifications',
                features: [
                  'Instant alerts for unauthorized access attempts',
                  'Anomaly detection (unusual patterns, off-hours access)',
                  'Integration with security ops teams',
                  'SMS/email notifications to stakeholders',
                ],
                result: 'Immediate response to security threats',
              },
              {
                phase: 'Audit',
                title: 'Compliance Reporting & Evidence Vault',
                features: [
                  'CTPAT compliance documentation',
                  'TSA security requirements mapping',
                  'ISO 28000 supply chain security alignment',
                  'Audit-ready reports and evidence packets',
                ],
                result: 'Pass compliance audits with confidence',
              },
            ].map((control, i) => (
              <Card key={i} className="border-l-4 border-neon">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-24 text-center">
                    <div className="inline-block px-3 py-1 rounded-full bg-neon/10 text-neon font-bold text-sm mb-2">
                      {control.phase}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4">{control.title}</h3>
                    <ul className="space-y-2 mb-4">
                      {control.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-neon flex-shrink-0 mt-0.5" />
                          <span className="text-steel">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 text-neon font-semibold">
                      <div className="h-px flex-1 bg-neon/30"></div>
                      <span className="text-sm">{control.result}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI of Security */}
      <section className="py-16 border-b border-steel/20 bg-carbon/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">The ROI of Security</h2>
            <p className="text-steel text-lg max-w-3xl mx-auto">
              For a 10-facility network experiencing 2-3 cargo theft incidents per year
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: 'Prevented Losses',
                amount: '$200K–$600K',
                detail: '80% reduction in theft incidents',
              },
              {
                title: 'Insurance Savings Potential',
                amount: '$30K–$100K',
                detail: 'Potential premium reduction (verify with carrier)',
              },
              {
                title: 'Investigation Savings',
                amount: '$30K–$150K',
                detail: 'Fewer incidents + faster resolution',
              },
              {
                title: 'Compliance Fines Avoided',
                amount: '$50K–$500K',
                detail: 'CTPAT violations prevented',
              },
            ].map((saving, i) => (
              <Card key={i} className="text-center">
                <h3 className="text-steel text-sm font-semibold mb-2 uppercase tracking-wider">{saving.title}</h3>
                <p className="text-3xl font-bold text-neon mb-2">{saving.amount}</p>
                <p className="text-steel/70 text-sm">{saving.detail}</p>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="bg-neon/5 border-2 border-neon">
              <div className="text-center">
                <p className="text-steel mb-2">Total Annual Security Savings</p>
                <p className="text-5xl font-bold text-neon mb-4">$310K–$1.35M</p>
                <p className="text-steel/80 text-sm mb-6">
                  Conservative estimates based on industry data. Your actual savings depend on facility count, 
                  current incident rate, and cargo values.
                </p>
                <a 
                  href="/roi" 
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold bg-neon text-void hover:bg-neon/90 transition-all"
                >
                  Calculate Your Security Savings
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Compliance Mandates */}
      <section className="py-16 border-b border-steel/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Compliance Mandates Are Tightening</h2>
            <p className="text-steel text-lg max-w-3xl mx-auto">
              Homeland Security, TSA, and international regulators are raising the bar for yard security.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'CTPAT (Customs-Trade Partnership Against Terrorism)',
                requirements: [
                  'Physical access controls',
                  'Personnel screening procedures',
                  'Visitor/carrier verification',
                  'Documented security training',
                ],
                consequence: 'Non-compliance = fines, shipment delays, loss of certification',
              },
              {
                title: 'TSA Security Standards',
                requirements: [
                  'Positive identification of personnel',
                  'Background checks and vetting',
                  'Access control documentation',
                  'Incident reporting and investigation',
                ],
                consequence: 'Violations can result in $10K-$75K+ fines per incident',
              },
              {
                title: 'ISO 28000 Supply Chain Security',
                requirements: [
                  'Risk assessment and management',
                  'Security plans and procedures',
                  'Monitoring and measurement',
                  'Corrective and preventive actions',
                ],
                consequence: 'Certification required by many enterprise shippers and insurers',
              },
            ].map((standard, i) => (
              <Card key={i}>
                <div className="flex items-start gap-3 mb-4">
                  <FileCheck size={28} className="text-neon flex-shrink-0" />
                  <h3 className="text-xl font-bold text-white">{standard.title}</h3>
                </div>
                <p className="text-steel text-sm font-semibold mb-3">Key Requirements:</p>
                <ul className="space-y-2 mb-4">
                  {standard.requirements.map((req, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-neon text-xs mt-1">▸</span>
                      <span className="text-steel/80 text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-steel/20">
                  <p className="text-ember text-sm font-semibold mb-1">Consequence:</p>
                  <p className="text-steel/80 text-sm">{standard.consequence}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-carbon to-void border-2 border-neon/30">
            <div className="max-w-3xl mx-auto text-center">
              <Clock size={48} className="text-neon mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Turn Your Gate From Vulnerability to Security Checkpoint
              </h2>
              <p className="text-steel text-lg mb-8">
                Every day without ID verification is another day of exposure. Get a free security assessment 
                and see how YardFlow closes the gaps in your yard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold bg-neon text-void hover:bg-neon/90 transition-all"
                >
                  Request Security Assessment
                </a>
                <a 
                  href="/product" 
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold border-2 border-steel/30 text-white hover:border-neon/40 transition-all"
                >
                  See Security Module Details
                </a>
              </div>
              <p className="text-steel/60 text-sm mt-6">
                Sensitive materials available under NDA: Security architecture diagrams, penetration test results, 
                compliance roadmap, customer references
              </p>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

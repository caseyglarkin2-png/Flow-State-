import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ShieldAlert, Lock, CheckCircle2, AlertTriangle, Database, FileCheck, Eye, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cargo Theft & Fraud Prevention - YardFlow by FreightRoll',
  description: 'Multi-layered cargo theft prevention through ID verification, carrier credentialing, and immutable audit trails.',
  keywords: [
    'cargo theft prevention',
    'carrier fraud detection',
    'ID verification logistics',
    'CTPAT compliance',
    'TSA security standards',
    'supply chain security',
  ],
};

const threats = [
  {
    title: 'Fraudulent Carriers',
    description: 'Fake MC numbers, stolen credentials, spoofed identities. The fastest-growing threat in truckload logistics.',
    Icon: AlertTriangle,
  },
  {
    title: 'Unauthorized Pickups',
    description: 'Driver arrives with valid-looking paperwork but no authorization. Load disappears. Insurance fights.',
    Icon: Lock,
  },
  {
    title: 'Credential Misuse',
    description: 'Legitimate carrier credentials shared, stolen, or expired. No verification = no defense.',
    Icon: ShieldAlert,
  },
  {
    title: 'Compliance Gaps',
    description: 'CTPAT, TSA, and insurance requirements demand documented verification. Manual processes don\'t hold up.',
    Icon: FileCheck,
  },
];

const controls = [
  {
    title: 'ID Verification',
    description: 'Real-time driver identity verification before gate access. CDL validation. Photo capture. Biometric option.',
    Icon: Eye,
  },
  {
    title: 'Carrier Credentialing',
    description: 'MC number validation. Authority status check. Insurance verification. Automated re-check on arrival.',
    Icon: Database,
  },
  {
    title: 'Authorization Workflow',
    description: 'No load releases without verified appointment match. System-enforced, not human-dependent.',
    Icon: CheckCircle2,
  },
  {
    title: 'Immutable Audit Trail',
    description: 'Every verification timestamped. Every exception logged. Every access decision defensible in court.',
    Icon: Clock,
  },
];

export default function RiskPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Cargo Security</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white">
            The $30B Problem Starts at the Gate
          </h1>
          <p className="mt-4 text-xl text-steel max-w-2xl leading-relaxed">
            Cargo theft costs the industry $15B-$30B globally. Most incidents start at the gate. Fraudulent carriers, fake credentials, unauthorized access—preventable if you verify identity before granting access.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-white transition"
            >
              Request Security Assessment
            </Link>
            <Link
              href="/roi"
              className="inline-flex items-center gap-2 rounded-xl border border-neon/30 bg-carbon/50 px-6 py-3 font-medium text-white hover:border-neon/50 transition"
            >
              Calculate Security Savings
            </Link>
          </div>
        </div>
      </section>

      {/* Threat Landscape */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-ember/70">The Threat</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">What You're Up Against</h2>
          <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl mb-10">
            Cargo theft is organized, sophisticated, and targeting your gate. Manual verification doesn't scale.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {threats.map((threat) => (
              <div key={threat.title} className="rounded-xl border border-ember/20 bg-carbon/50 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-ember/10 flex items-center justify-center">
                    <threat.Icon size={20} className="text-ember" />
                  </div>
                  <h3 className="font-bold text-white">{threat.title}</h3>
                </div>
                <p className="text-sm text-steel leading-relaxed">{threat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Control Layer */}
      <section className="py-16 bg-carbon/20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">The Control Layer</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">How YardFlow Stops It</h2>
          <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl mb-10">
            Multi-layered verification. System-enforced access. Every decision defensible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {controls.map((control) => (
              <div key={control.title} className="rounded-xl border border-neon/20 bg-carbon/50 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center">
                    <control.Icon size={20} className="text-neon" />
                  </div>
                  <h3 className="font-bold text-white">{control.title}</h3>
                </div>
                <p className="text-sm text-steel leading-relaxed">{control.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Compliance</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                CTPAT & TSA Ready
              </h2>
              <p className="mt-4 text-[17px] text-steel leading-8">
                Compliance isn't just about passing audits—it's about reducing insurance premiums, winning contracts, and defending claims.
              </p>
              <p className="mt-4 text-[17px] text-steel leading-8">
                YardFlow produces the audit trail these programs require without manual documentation effort.
              </p>
            </div>
            <div className="rounded-2xl border border-neon/20 bg-neon/5 p-6">
              <p className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold mb-2">Compliance Value</p>
              <h3 className="text-xl font-bold text-white mb-4">What You Unlock</h3>
              <ul className="space-y-2 text-steel text-[15px]">
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Reduced cargo insurance premiums (documented security)</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Faster CTPAT/TSA audits (automated documentation)</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Contract eligibility (security as differentiator)</li>
                <li className="flex items-start gap-3"><span className="text-neon">→</span>Claims defense (immutable timestamps)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Next Step</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Get a Security Assessment
          </h2>
          <p className="mt-4 text-[17px] text-steel leading-8 max-w-2xl">
            We'll audit your current gate security, identify control gaps, and model the ROI on theft prevention.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 font-medium text-void hover:bg-white transition"
            >
              Request Assessment
            </Link>
            <Link
              href="/resources/procurement"
              className="inline-flex items-center gap-2 rounded-xl border border-neon/30 bg-carbon/50 px-6 py-3 font-medium text-white hover:border-neon/50 transition"
            >
              View Evidence Vault
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

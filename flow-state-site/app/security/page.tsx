'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Card from '@/components/Card';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-void">
      <Header />

      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Security & <span className="neon-glow">Trust</span>
          </h1>
          <p className="text-xl text-steel max-w-3xl">
            Enterprise-ready posture. Clear controls. Practical roadmap.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">Data protection</h2>
            <ul className="text-steel space-y-2 list-disc pl-5">
              <li>Encryption in transit (TLS)</li>
              <li>Encryption at rest (platform-managed)</li>
              <li>Least-privilege access controls</li>
              <li>Environment separation (dev/stage/prod)</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">Access & accountability</h2>
            <ul className="text-steel space-y-2 list-disc pl-5">
              <li>Role-based access control (RBAC)</li>
              <li>Audit logs (roadmap)</li>
              <li>SSO/SAML (roadmap for enterprise)</li>
              <li>Vendor/security review support</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">Operational reliability</h2>
            <ul className="text-steel space-y-2 list-disc pl-5">
              <li>Monitoring and alerting</li>
              <li>Backups and recovery procedures</li>
              <li>Rate limiting and abuse protection on forms</li>
              <li>Change management on production deploys</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-neon mb-3">Retention & ownership</h2>
            <ul className="text-steel space-y-2 list-disc pl-5">
              <li>Configurable data retention (by contract)</li>
              <li>Export support for customer-owned data</li>
              <li>Clear incident response process</li>
              <li>Security contact: founding@flow-state.ai</li>
            </ul>
          </Card>

          <Card className="md:col-span-2">
            <h2 className="text-2xl font-bold text-neon mb-3">Important note</h2>
            <p className="text-steel">
              This page describes our current posture and roadmap at a high level. Formal security documents (e.g.
              questionnaires, policies, DPAs) are provided during procurement.
            </p>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

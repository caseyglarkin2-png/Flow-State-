/**
 * Co-Development Program Page
 * 
 * ROLLOUT ALIGNMENT:
 * Network → Protocols → Interoperable Data → Multi-site Adoption → RTLS
 * 
 * RTLS is Phase 3, not Phase 1. This page makes that clear.
 * 
 * Target: Multi-site operators willing to pilot and co-develop advanced features
 * Outcome: Book Network Audit call or apply for co-dev program
 */

'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAGroup from '@/components/CTAGroup';
import Card from '@/components/Card';
import CoDevRolloutPhases from '@/components/CoDevRolloutPhases';
import { BRAND } from '@/config/brand';
import { useAnalytics } from '@/lib/analytics';
import { 
  Ignite, 
  Cortex, 
  Agent, 
  Velocity, 
  Timeline, 
  Confirm,
  Shield,
  Nexus,
  FlowArrow,
  Lock
} from '@/components/icons/FlowIcons';
import {
  coDevContent,
  getModulesByPhase,
  type CoDevModule,
  type EligibilityCard,
  type PartnerBenefit,
  type PartnershipClarity,
  type HowItWorksStep,
  type FAQItem,
} from '@/src/content/coDevelopment';

// Icon mapping for dynamic rendering
const iconMap = {
  Agent,
  Velocity,
  Cortex,
  Ignite,
  Shield,
  Nexus,
  Timeline,
} as const;

function getIcon(iconName: keyof typeof iconMap) {
  return iconMap[iconName] || Shield;
}

// Module Card Component
function ModuleCard({ module, showPhase = true }: { module: CoDevModule; showPhase?: boolean }) {
  const Icon = getIcon(module.icon);
  const hasPrereqs = module.prerequisites.length > 0;
  const isPhase1 = module.phase === 1;
  
  return (
    <Card className={`p-8 ${isPhase1 ? 'border-neon/30' : 'border-steel/20'}`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg flex-shrink-0 ${isPhase1 ? 'bg-neon/10' : 'bg-steel/10'}`}>
          <Icon size={24} className={isPhase1 ? 'text-neon' : 'text-steel/60'} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <h3 className="text-2xl font-bold text-white">{module.name}</h3>
            {showPhase && (
              <span className={`
                px-2 py-0.5 rounded text-xs font-semibold
                ${isPhase1 ? 'bg-neon/20 text-neon' : 'bg-steel/20 text-steel'}
              `}>
                Phase {module.phase}
              </span>
            )}
          </div>
          
          <p className="text-steel/90 mb-4">{module.description}</p>
          
          {/* Prerequisites callout for Phase 2/3 modules */}
          {hasPrereqs && (
            <div className="mb-4 p-4 rounded-lg bg-ember/5 border border-ember/20">
              <div className="flex items-center gap-2 mb-2">
                <Lock size={16} className="text-ember" />
                <span className="text-sm font-semibold text-ember">Prerequisites</span>
              </div>
              <ul className="space-y-1">
                {module.prerequisites.map((prereq) => (
                  <li key={prereq.id} className="text-sm text-steel/70 flex items-start gap-2">
                    <span className="text-ember mt-1">•</span>
                    <span>{prereq.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Module highlights */}
          {module.highlights.length > 0 && (
            <ul className="flex flex-wrap gap-2 mb-4">
              {module.highlights.map((highlight) => (
                <li 
                  key={highlight} 
                  className={`px-2 py-1 text-xs rounded ${
                    isPhase1 ? 'bg-neon/10 text-neon' : 'bg-steel/10 text-steel/70'
                  }`}
                >
                  {highlight}
                </li>
              ))}
            </ul>
          )}
          
          <p className={`text-sm font-semibold ${isPhase1 ? 'text-neon' : 'text-steel/60'}`}>
            POC: {module.timeline.poc} | Scale: {module.timeline.scale}
          </p>
        </div>
      </div>
    </Card>
  );
}

// Eligibility Card Component
function EligibilityCardComponent({ card }: { card: EligibilityCard }) {
  const Icon = getIcon(card.icon);
  
  return (
    <Card className="p-6">
      <Icon size={32} className="text-neon mb-4" />
      <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
      <ul className="space-y-2 text-steel/90 text-sm">
        {card.criteria.map((criterion, i) => (
          <li key={i} className="flex items-start gap-2">
            <Confirm size={16} className="text-neon flex-shrink-0 mt-0.5" />
            <span>{criterion}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

// Partner Benefit Card Component
function PartnerBenefitCard({ benefit }: { benefit: PartnerBenefit }) {
  const Icon = getIcon(benefit.icon);
  
  return (
    <Card className="p-6">
      <Icon size={28} className="text-neon mb-3" />
      <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
      <p className="text-steel/90 text-sm mb-3">{benefit.description}</p>
      {benefit.link && (
        <Link 
          href={benefit.link.href}
          className="text-neon text-sm font-semibold hover:underline inline-flex items-center gap-1"
        >
          {benefit.link.label} →
        </Link>
      )}
    </Card>
  );
}

// How It Works Step Component
function HowItWorksStepComponent({ step }: { step: HowItWorksStep }) {
  return (
    <Card className="p-8">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-neon/20 border-2 border-neon flex items-center justify-center">
            <span className="text-neon font-black text-xl">{step.number}</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
          <p className="text-steel/90">{step.description}</p>
        </div>
      </div>
    </Card>
  );
}

// FAQ Item Component
function FAQItemComponent({ item }: { item: FAQItem }) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-neon mb-3">{item.question}</h3>
      <p className="text-steel/90 text-sm leading-relaxed">{item.answer}</p>
    </Card>
  );
}

export default function CoDevelopmentPage() {
  const phase1Modules = getModulesByPhase(1);
  const phase2Modules = getModulesByPhase(2);
  const phase3Modules = getModulesByPhase(3);
  const advancedModules = [...phase2Modules, ...phase3Modules];
  const analytics = useAnalytics();

  // Track page view on mount
  useEffect(() => {
    analytics.codevPageView({
      source: typeof window !== 'undefined' ? new URL(window.location.href).searchParams.get('utm_source') || 'direct' : 'direct',
      referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
    });

    // Scroll depth tracking
    const thresholds = [25, 50, 75, 100] as const;
    const trackedDepths = new Set<typeof thresholds[number]>();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      for (const threshold of thresholds) {
        if (scrollPercent >= threshold && !trackedDepths.has(threshold)) {
          trackedDepths.add(threshold);
          analytics.codevScrollDepth({ depth: threshold });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [analytics]);
  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-neon/20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon/10 border border-neon/30 mb-6">
            <Ignite size={16} className="text-neon" />
            <span className="text-neon text-sm font-semibold font-mono">{coDevContent.hero.badge}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            {coDevContent.hero.title}
          </h1>
          <p className="text-2xl text-steel/90 max-w-3xl leading-relaxed">
            {coDevContent.hero.subtitle}
          </p>
          
          <div className="mt-10">
            <CTAGroup showTertiary={false} />
          </div>
        </div>
      </section>

      {/* Why This Order Wins (NEW SECTION) */}
      <section className="py-20 bg-carbon/30 border-b border-neon/20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-center">
            {coDevContent.whyThisOrder.headline}
          </h2>
          <p className="text-steel/80 mb-12 text-center max-w-3xl mx-auto">
            {coDevContent.whyThisOrder.subheadline}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coDevContent.whyThisOrder.reasons.map((reason, i) => (
              <Card key={i} className="p-6 border-neon/20">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center">
                    <Confirm size={16} className="text-neon" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{reason.title}</h3>
                    <p className="text-steel/80 text-sm">{reason.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rollout Phases (NEW COMPONENT) */}
      <CoDevRolloutPhases phases={coDevContent.phases} className="border-b border-steel/20" />

      {/* Who It's For */}
      <section className="py-20 bg-carbon/30 border-b border-steel/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-3 text-center">Who This Is For</h2>
          <p className="text-steel/80 mb-12 text-center max-w-3xl mx-auto">
            Multi-site operators with complex problems that require more than base deployment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coDevContent.eligibilityCriteria.map((card) => (
              <EligibilityCardComponent key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* What We Co-Develop - Phase 1 */}
      <section className="py-20 border-b border-steel/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-3 text-center">Phase 1: Foundation Modules</h2>
          <p className="text-steel/80 mb-4 text-center max-w-3xl mx-auto">
            Start here. These modules establish the network baseline that makes everything else possible.
          </p>
          <p className="text-neon text-sm font-semibold mb-12 text-center">Available Now</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {phase1Modules.map((module) => (
              <ModuleCard key={module.id} module={module} showPhase={false} />
            ))}
          </div>
        </div>
      </section>

      {/* What We Co-Develop - Phase 2/3 */}
      <section className="py-20 bg-carbon/30 border-b border-steel/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-3 text-center">Phase 2 & 3: Advanced Modules</h2>
          <p className="text-steel/80 mb-4 text-center max-w-3xl mx-auto">
            Unlocked after Phase 1 baseline is established. These modules build on the network foundation.
          </p>
          <p className="text-steel/60 text-sm mb-12 text-center">Requires Phase 1 Prerequisites</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advancedModules.map((module) => (
              <ModuleCard key={module.id} module={module} showPhase={true} />
            ))}
          </div>

          <p className="mt-8 text-center text-steel/60 text-sm max-w-3xl mx-auto">
            Co-developed features become part of the core product. You influence the roadmap. We productize the solution for the network.
          </p>
        </div>
      </section>

      {/* Partnership Clarity - What You Get / Build / Productize */}
      <section className="py-20 border-b border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-3 text-center">How the Partnership Works</h2>
          <p className="text-steel/80 mb-12 text-center max-w-3xl mx-auto">
            Clear ownership. Clear outcomes. No surprises.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coDevContent.partnershipClarity.map((clarity) => {
              const Icon = getIcon(clarity.icon);
              return (
                <Card key={clarity.id} className="p-6 border-neon/20">
                  <Icon size={28} className="text-neon mb-4" />
                  <h3 className="text-xl font-bold text-white mb-4">{clarity.title}</h3>
                  <ul className="space-y-2">
                    {clarity.items.map((item, i) => (
                      <li key={i} className="text-steel/80 text-sm flex items-start gap-2">
                        <Confirm size={14} className="text-neon flex-shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-b border-neon/20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-3 text-center">How It Works</h2>
          <p className="text-steel/80 mb-12 text-center max-w-3xl mx-auto">
            Start with Phase 1. Scale across your network. Unlock advanced modules.
          </p>

          <div className="space-y-6">
            {coDevContent.howItWorks.map((step) => (
              <HowItWorksStepComponent key={step.number} step={step} />
            ))}
          </div>

          <div className="mt-12 p-6 rounded-lg bg-neon/5 border border-neon/30">
            <p className="text-steel/90 text-center">
              <span className="text-white font-semibold">Directional timeline.</span> Actual duration depends on site count, integration complexity, and operational readiness.
            </p>
          </div>
        </div>
      </section>

      {/* What Partners Get */}
      <section className="py-20 border-b border-steel/20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-3 text-center">What Co-Development Partners Get</h2>
          <p className="text-steel/80 mb-12 text-center max-w-3xl mx-auto">
            Roadmap influence, priority access, and partner economics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coDevContent.partnerBenefits.map((benefit) => (
              <PartnerBenefitCard key={benefit.id} benefit={benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-carbon/30 border-b border-steel/20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {coDevContent.faq.map((item, i) => (
              <FAQItemComponent key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-void to-carbon/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Build the Network?
          </h2>
          <p className="text-xl text-steel/90 mb-10 max-w-2xl mx-auto">
            Book a Network Audit call. We'll identify 1–2 pilot sites, scope co-development opportunities, and outline a rollout plan.
          </p>

          <CTAGroup showTertiary={true} className="justify-center" />

          <div className="mt-12 p-6 rounded-lg bg-neon/5 border border-neon/20">
            <p className="text-sm text-steel/80 mb-3 font-semibold">What happens next:</p>
            <ul className="text-sm text-steel/70 space-y-2 text-left max-w-xl mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-neon font-mono">1.</span>
                <span>48-hour response: We review your network size, modes, and operational complexity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon font-mono">2.</span>
                <span>Intro call: 30-min discovery (ops lead + exec sponsor recommended)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon font-mono">3.</span>
                <span>Network Audit: We visit 1–2 pilot sites, document workflows, baseline KPIs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon font-mono">4.</span>
                <span>Rollout Plan + Proposal: Scoped POC, timeline, pricing, co-development roadmap</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

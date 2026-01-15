// /app/solutions/[slug]/page.tsx
import { notFound } from "next/navigation";
import { solutionPages, isSolutionSlug, type SolutionSlug } from "@/lib/solutions";
import { siteUrl } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  SolutionHero,
  VolatilityTaxSection,
  VarianceDriversSection,
  StandardizationMapSection,
  ModulesSection,
  KpiGridSection,
  ProofResourcesSection,
  RolloutPlanSection,
  SolutionCTA,
} from "@/components/solutions";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (Object.keys(solutionPages) as SolutionSlug[]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (!isSolutionSlug(slug)) return {};
  const cfg = solutionPages[slug];
  return {
    title: cfg.seo.title,
    description: cfg.seo.description,
    openGraph: {
      title: cfg.seo.title,
      description: cfg.seo.description,
      type: 'website',
      images: [
        {
          url: `${siteUrl}/api/og?page=solutions/${slug}`,
          width: 1200,
          height: 630,
          alt: cfg.seo.title,
        },
      ],
    },
  };
}

export default async function SolutionPersonaPage({ params }: PageProps) {
  const { slug: slugParam } = await params;
  if (!isSolutionSlug(slugParam)) notFound();

  const slug = slugParam as SolutionSlug;
  const cfg = solutionPages[slug];

  // Map viscosity bullets to variance drivers format
  const varianceDrivers = cfg.viscosity.bullets.map((b) => ({
    title: b.title,
    body: b.body,
  }));

  // Map standardizeFirst bullets to standardization groups
  const standardizationGroups = [
    {
      category: "Execution Standards",
      items: cfg.standardizeFirst.bullets.slice(0, 3),
    },
    {
      category: "Data Standards",
      items: cfg.standardizeFirst.bullets.slice(3),
    },
  ];

  // Map solution features to modules - always use the 4 canonical modules
  const moduleIdMap: Record<string, "guard" | "comms" | "bol" | "yms"> = {
    "Digital Guard": "guard",
    "Digital Comms": "comms",
    "Digital BOL": "bol",
    "Digital YMS": "yms",
  };

  const modules = cfg.solution.features.map((f, i) => ({
    id: moduleIdMap[f.name] || (["guard", "comms", "bol", "yms"] as const)[i % 4],
    name: f.name,
    enforces: [f.description],
    prevents: cfg.solution.outcomeBullets[i] || "Operational variance",
  }));

  // Map KPIs to hero tiles and KPI grid format
  const heroKpis = cfg.kpis.map((kpi, i) => ({
    value: ["30%", "2.5x", "90%"][i % 3],
    label: kpi,
    subtext: ["Improvement", "Efficiency gain", "Consistency"][i % 3],
  }));

  const kpiGrid = cfg.kpis.map((kpi, i) => ({
    metric: ["↓30%", "↑2.5x", "↓40%", "↑95%"][i % 4],
    label: kpi,
    context: ["Network average improvement", "Efficiency gain", "Reduction in exposure", "Consistency rate"][i % 4],
  }));

  // Map related links to proof resources
  const proofLinks = cfg.related.links.map((l) => ({
    type: l.href.includes("simulation") ? "simulation" as const : 
          l.href.includes("diagnostic") ? "calculator" as const :
          "field-note" as const,
    title: l.label,
    description: l.note || "Explore the data and patterns.",
    href: l.href,
  }));

  // Create rollout steps from ROI inputs
  const rolloutSteps = [
    {
      phase: "Phase 1",
      title: "Discovery and Mapping",
      description: `Audit your current state across ${cfg.roi.suggestedInputs[0]?.toLowerCase() || "facilities"}. Build the baseline map.`,
      duration: "Week 1-2",
    },
    {
      phase: "Phase 2", 
      title: "Pilot Deployment",
      description: "Deploy YardFlow at your highest-variance facility. Measure improvement against baseline.",
      duration: "Week 3-6",
    },
    {
      phase: "Phase 3",
      title: "Network Rollout",
      description: "Expand standards across the network. Each site benefits from lessons learned.",
      duration: "Week 7-12",
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-void">
        {/* Premium Hero */}
        <SolutionHero
          eyebrow={cfg.hero.kicker}
          headline={cfg.hero.headline}
          subhead={cfg.hero.subhead}
          kpis={heroKpis}
          primaryCta={cfg.hero.primaryCta}
          secondaryCta={cfg.hero.secondaryCta}
          backLink={{ label: "Solutions", href: "/solutions" }}
          personaTag={cfg.personaName}
        />

        {/* The Problem: Volatility Tax */}
        <VolatilityTaxSection
          title={cfg.varianceThesis.title}
          subtitle={cfg.varianceThesis.body.split(". ")[0] + "."}
          bullets={cfg.varianceThesis.body.split(". ").slice(1).filter(Boolean)}
        />

        {/* Root Causes: Variance Drivers */}
        <VarianceDriversSection
          title={cfg.viscosity.title}
          subtitle="The friction points that create variance in your operation."
          drivers={varianceDrivers}
        />

        {/* What We Standardize */}
        <StandardizationMapSection
          title={cfg.standardizeFirst.title}
          microThesis={cfg.standardizeFirst.microThesis}
          groups={standardizationGroups}
        />

        {/* The YardFlow Solution: Modules */}
        <ModulesSection
          title={cfg.solution.title}
          subtitle="Four modules working together to eliminate variance."
          modules={modules}
        />

        {/* KPIs That Move */}
        <KpiGridSection
          title="KPIs That Move"
          subtitle={cfg.roi.description}
          kpis={kpiGrid}
        />

        {/* Proof and Resources */}
        <ProofResourcesSection
          title={cfg.proof.title}
          subtitle={cfg.proof.bullets[0] || "Evidence-based implementation."}
          links={proofLinks}
        />

        {/* Rollout Plan */}
        <RolloutPlanSection
          title="Implementation Roadmap"
          subtitle="From discovery to network-wide deployment in 12 weeks."
          steps={rolloutSteps}
        />

        {/* Closing CTA */}
        <SolutionCTA
          headline={cfg.cta.title}
          subhead={cfg.cta.body}
          primaryCta={cfg.cta.primaryCta}
          secondaryCta={cfg.cta.secondaryCta}
        />
      </main>
      <Footer />
    </>
  );
}

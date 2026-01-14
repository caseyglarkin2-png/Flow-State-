// /app/solutions/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { solutionPages, isSolutionSlug, type SolutionSlug } from "@/lib/solutions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Section, Callout, StatGrid, NextUp } from "@/components/content";
import PersonaTOC from "./PersonaTOC";

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
  };
}

// TOC items for all persona pages
const tocItems = [
  { id: "variance-thesis", label: "The Variance Problem" },
  { id: "viscosity", label: "Where Variance Comes From" },
  { id: "standardize-first", label: "What to Standardize" },
  { id: "solution", label: "The YardFlow Solution" },
  { id: "kpis", label: "KPIs That Move" },
  { id: "proof", label: "Proof & Resources" },
];

export default async function SolutionPersonaPage({ params }: PageProps) {
  const { slug: slugParam } = await params;
  if (!isSolutionSlug(slugParam)) notFound();

  const slug = slugParam as SolutionSlug;
  const cfg = solutionPages[slug];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-void">
        {/* Hero */}
        <div className="mx-auto max-w-6xl px-6 pt-32 pb-12">
          <div className="flex items-center justify-between gap-4">
            <Link href="/solutions" className="text-sm text-neon hover:text-neon/80 transition">
              ← Back to Solutions
            </Link>
            <span className="text-xs text-steel">{cfg.personaName}</span>
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.25em] text-neon/70">{cfg.hero.kicker}</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight text-white md:text-7xl">
            {cfg.hero.headline}
          </h1>
          <p className="mt-4 max-w-[72ch] text-lg text-steel leading-relaxed">{cfg.hero.subhead}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={cfg.hero.primaryCta.href}
              className="inline-flex items-center rounded-xl bg-neon px-5 py-2.5 text-sm font-medium text-void hover:bg-neon/90 transition"
            >
              {cfg.hero.primaryCta.label}
            </Link>
            {cfg.hero.secondaryCta && (
              <Link
                href={cfg.hero.secondaryCta.href}
                className="inline-flex items-center rounded-xl border border-neon/30 bg-carbon/50 px-5 py-2.5 text-sm font-medium text-white hover:border-neon/50 transition"
              >
                {cfg.hero.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>

        {/* Main content with TOC */}
        <div className="mx-auto max-w-6xl px-6 pb-24">
          <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
            {/* Content */}
            <div>
              {/* Variance Thesis */}
              <Section id="variance-thesis" title={cfg.varianceThesis.title}>
                <p className="text-xl text-steel leading-9 max-w-[72ch]">
                  {cfg.varianceThesis.body}
                </p>
              </Section>

              {/* Viscosity - Where Variance Comes From */}
              <Section id="viscosity" title={cfg.viscosity.title}>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {cfg.viscosity.bullets.map((b) => (
                    <div key={b.title} className="rounded-2xl border border-neon/20 bg-carbon/50 p-5">
                      <h3 className="text-base font-semibold text-white">{b.title}</h3>
                      <p className="mt-2 text-[15px] text-steel leading-relaxed">{b.body}</p>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Standardize First */}
              <Section id="standardize-first" title={cfg.standardizeFirst.title}>
                <Callout variant="info" title={cfg.standardizeFirst.microThesis} hideIcon>
                  <ul className="space-y-2 mt-2">
                    {cfg.standardizeFirst.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </Callout>
              </Section>

              {/* Solution - Modules */}
              <Section id="solution" title={cfg.solution.title}>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {cfg.solution.features.map((f) => (
                    <div key={f.name} className="rounded-2xl border border-neon/20 bg-carbon/50 p-5">
                      <h3 className="text-base font-semibold text-white">{f.name}</h3>
                      <p className="mt-2 text-[15px] text-steel leading-relaxed">{f.description}</p>
                    </div>
                  ))}
                </div>
                
                {/* Outcomes */}
                <div className="mt-8 rounded-2xl border border-neon/20 bg-carbon/30 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-neon/70 mb-4">Expected Outcomes</p>
                  <ul className="space-y-3">
                    {cfg.solution.outcomeBullets.map((b) => (
                      <li key={b} className="flex gap-3 text-steel">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon/70" />
                        <span className="text-[15px] leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>

              {/* KPIs */}
              <Section id="kpis" title="KPIs That Move">
                <StatGrid
                  columns={3}
                  stats={cfg.kpis.map((kpi, i) => ({
                    label: kpi,
                    value: ["↓", "↑", "↓"][i % 3],
                    subtext: ["Reduced variance", "Improved flow", "Less exposure"][i % 3],
                  }))}
                />
                
                {/* ROI note */}
                <div className="mt-6 rounded-2xl border border-neon/20 bg-carbon/50 p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{cfg.roi.title}</h3>
                  <p className="text-steel leading-relaxed mb-4">{cfg.roi.description}</p>
                  <Link
                    href="/roi"
                    className="inline-flex items-center text-sm text-neon hover:text-neon/80"
                  >
                    Build your ROI model →
                  </Link>
                </div>
              </Section>

              {/* Proof & Resources */}
              <Section id="proof" title={cfg.proof.title}>
                <ul className="space-y-3 mb-8">
                  {cfg.proof.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-steel">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon/70" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>

                {cfg.proof.quote && (
                  <blockquote className="border-l-2 border-neon/50 pl-6 py-2 mb-8">
                    <p className="text-white italic">&ldquo;{cfg.proof.quote.text}&rdquo;</p>
                    <p className="text-sm text-steel/70 mt-2">{cfg.proof.quote.attribution}</p>
                  </blockquote>
                )}

                <NextUp
                  title="Related Resources"
                  links={cfg.related.links.map((l) => ({
                    href: l.href,
                    label: l.label,
                    description: l.note,
                  }))}
                />
              </Section>

              {/* CTA */}
              <section className="pt-12 mt-12 border-t border-neon/10">
                <div className="rounded-3xl border border-neon/20 bg-gradient-to-b from-carbon/60 to-void p-8 md:p-10">
                  <h2 className="text-2xl font-semibold text-white">{cfg.cta.title}</h2>
                  <p className="mt-3 max-w-[72ch] text-steel leading-relaxed">{cfg.cta.body}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={cfg.cta.primaryCta.href}
                      className="inline-flex items-center rounded-xl bg-neon px-5 py-2.5 text-sm font-medium text-void hover:bg-neon/90 transition"
                    >
                      {cfg.cta.primaryCta.label}
                    </Link>
                    {cfg.cta.secondaryCta && (
                      <Link
                        href={cfg.cta.secondaryCta.href}
                        className="inline-flex items-center rounded-xl border border-neon/30 bg-carbon/50 px-5 py-2.5 text-sm font-medium text-white hover:border-neon/50 transition"
                      >
                        {cfg.cta.secondaryCta.label}
                      </Link>
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* Sticky TOC */}
            <PersonaTOC items={tocItems} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

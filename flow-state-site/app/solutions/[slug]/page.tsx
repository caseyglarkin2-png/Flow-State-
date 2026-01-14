// /app/solutions/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { solutionPages, isSolutionSlug, type SolutionSlug, type SolutionModuleId } from "@/lib/solutions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

function SectionWrap({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}

function Hero({ slug }: { slug: SolutionSlug }) {
  const cfg = solutionPages[slug];
  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-12">
      <div className="flex items-center justify-between gap-4">
        <Link href="/solutions" className="text-sm text-neon hover:text-neon/80">
          ← Back to Solutions
        </Link>
        <div className="text-xs text-steel">{cfg.personaName}</div>
      </div>

      <p className="mt-8 text-xs uppercase tracking-[0.25em] text-neon/70">{cfg.hero.kicker}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
        {cfg.hero.headline}
      </h1>
      <p className="mt-4 max-w-3xl text-steel">{cfg.hero.subhead}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={cfg.hero.primaryCta.href}
          className="inline-flex items-center rounded-xl bg-neon px-4 py-2 text-sm font-medium text-void hover:bg-neon/90 transition"
        >
          {cfg.hero.primaryCta.label}
        </Link>

        {cfg.hero.secondaryCta ? (
          <Link
            href={cfg.hero.secondaryCta.href}
            className="inline-flex items-center rounded-xl border border-neon/30 bg-carbon/50 px-4 py-2 text-sm font-medium text-white hover:border-neon/50 transition"
          >
            {cfg.hero.secondaryCta.label}
          </Link>
        ) : null}
      </div>

      {cfg.hero.visualNote ? (
        <div className="mt-10 rounded-2xl border border-neon/20 bg-carbon/50 p-6 text-sm text-steel">
          <div className="text-xs uppercase tracking-[0.2em] text-steel/70">Visual note</div>
          <div className="mt-2">{cfg.hero.visualNote}</div>
        </div>
      ) : null}
    </div>
  );
}

function VarianceThesis({ slug }: { slug: SolutionSlug }) {
  const { varianceThesis } = solutionPages[slug];
  return (
    <SectionWrap id="variance-thesis">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold text-white">{varianceThesis.title}</h2>
        <p className="mt-4 text-lg text-steel leading-relaxed">{varianceThesis.body}</p>
      </div>
    </SectionWrap>
  );
}

function Viscosity({ slug }: { slug: SolutionSlug }) {
  const { viscosity } = solutionPages[slug];
  return (
    <SectionWrap id="viscosity">
      <h2 className="text-2xl font-semibold text-white">{viscosity.title}</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {viscosity.bullets.map((b) => (
          <div key={b.title} className="rounded-2xl border border-neon/20 bg-carbon/50 p-5">
            <div className="text-sm font-semibold text-white">{b.title}</div>
            <div className="mt-2 text-sm text-steel">{b.body}</div>
          </div>
        ))}
      </div>
    </SectionWrap>
  );
}

function StandardizeFirst({ slug }: { slug: SolutionSlug }) {
  const { standardizeFirst } = solutionPages[slug];
  return (
    <SectionWrap id="standardize-first">
      <h2 className="text-2xl font-semibold text-white">{standardizeFirst.title}</h2>
      <p className="mt-3 max-w-3xl text-steel">{standardizeFirst.microThesis}</p>
      <ul className="mt-6 space-y-3 text-sm text-steel">
        {standardizeFirst.bullets.map((b) => (
          <li key={b} className="flex gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-neon/70" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </SectionWrap>
  );
}

function Solution({ slug }: { slug: SolutionSlug }) {
  const { solution } = solutionPages[slug];
  return (
    <SectionWrap id="solution">
      <h2 className="text-2xl font-semibold text-white">{solution.title}</h2>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {solution.features.map((f) => (
          <div key={f.name} className="rounded-2xl border border-neon/20 bg-carbon/50 p-5">
            <div className="text-sm font-semibold text-white">{f.name}</div>
            <div className="mt-2 text-sm text-steel">{f.description}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-neon/20 bg-carbon/30 p-6">
        <div className="text-xs uppercase tracking-[0.2em] text-steel/70">Outcomes</div>
        <ul className="mt-4 space-y-3 text-sm text-steel">
          {solution.outcomeBullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-neon/70" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrap>
  );
}

function Proof({ slug }: { slug: SolutionSlug }) {
  const { proof } = solutionPages[slug];
  return (
    <SectionWrap id="proof">
      <h2 className="text-2xl font-semibold text-white">{proof.title}</h2>
      <ul className="mt-6 space-y-3 text-sm text-steel">
        {proof.bullets.map((b) => (
          <li key={b} className="flex gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-neon/70" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {proof.quote ? (
        <div className="mt-8 rounded-2xl border border-neon/20 bg-carbon/50 p-6">
          <div className="text-sm text-white">"{proof.quote.text}"</div>
          <div className="mt-2 text-xs text-steel/70">{proof.quote.attribution}</div>
        </div>
      ) : null}
    </SectionWrap>
  );
}

function ROI({ slug }: { slug: SolutionSlug }) {
  const { roi } = solutionPages[slug];
  return (
    <SectionWrap id="roi">
      <h2 className="text-2xl font-semibold text-white">{roi.title}</h2>
      <p className="mt-3 max-w-3xl text-steel">{roi.description}</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-6">
          <div className="text-xs uppercase tracking-[0.2em] text-steel/70">Suggested inputs</div>
          <ul className="mt-4 space-y-3 text-sm text-steel">
            {roi.suggestedInputs.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-neon/70" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-neon/20 bg-carbon/50 p-6">
          <div className="text-xs uppercase tracking-[0.2em] text-steel/70">Suggested outputs</div>
          <ul className="mt-4 space-y-3 text-sm text-steel">
            {roi.suggestedOutputs.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-neon/70" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {roi.note ? (
        <div className="mt-6 text-sm text-steel/80">{roi.note}</div>
      ) : null}
    </SectionWrap>
  );
}

function Integrations({ slug }: { slug: SolutionSlug }) {
  const { integrations } = solutionPages[slug];
  return (
    <SectionWrap id="integrations">
      <h2 className="text-2xl font-semibold text-white">{integrations.title}</h2>
      <div className="mt-6 flex flex-wrap gap-3">
        {integrations.badges.map((b) => (
          <div
            key={b.label}
            className="rounded-full border border-neon/20 bg-carbon/50 px-4 py-2"
          >
            <div className="text-sm font-medium text-white">{b.label}</div>
            <div className="text-xs text-steel/70">{b.note}</div>
          </div>
        ))}
      </div>
    </SectionWrap>
  );
}

function Related({ slug }: { slug: SolutionSlug }) {
  const { related } = solutionPages[slug];
  return (
    <SectionWrap id="related">
      <h2 className="text-2xl font-semibold text-white">{related.title}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {related.links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-2xl border border-neon/20 bg-carbon/50 p-5 hover:border-neon/40 hover:bg-carbon/70 transition"
          >
            <div className="text-sm font-semibold text-white">{l.label}</div>
            {l.note ? <div className="mt-2 text-sm text-steel">{l.note}</div> : null}
            <div className="mt-4 text-xs text-neon">Open →</div>
          </Link>
        ))}
      </div>
    </SectionWrap>
  );
}

function CTA({ slug }: { slug: SolutionSlug }) {
  const { cta } = solutionPages[slug];
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl border border-neon/20 bg-gradient-to-b from-carbon/60 to-void p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-white">{cta.title}</h2>
          <p className="mt-3 max-w-3xl text-steel">{cta.body}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={cta.primaryCta.href}
              className="inline-flex items-center rounded-xl bg-neon px-4 py-2 text-sm font-medium text-void hover:bg-neon/90 transition"
            >
              {cta.primaryCta.label}
            </Link>

            {cta.secondaryCta ? (
              <Link
                href={cta.secondaryCta.href}
                className="inline-flex items-center rounded-xl border border-neon/30 bg-carbon/50 px-4 py-2 text-sm font-medium text-white hover:border-neon/50 transition"
              >
                {cta.secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function renderModule(moduleId: SolutionModuleId, slug: SolutionSlug) {
  switch (moduleId) {
    case "hero":
      return <Hero slug={slug} />;
    case "varianceThesis":
      return <VarianceThesis slug={slug} />;
    case "viscosity":
      return <Viscosity slug={slug} />;
    case "standardizeFirst":
      return <StandardizeFirst slug={slug} />;
    case "solution":
      return <Solution slug={slug} />;
    case "proof":
      return <Proof slug={slug} />;
    case "roi":
      return <ROI slug={slug} />;
    case "integrations":
      return <Integrations slug={slug} />;
    case "related":
      return <Related slug={slug} />;
    case "cta":
      return <CTA slug={slug} />;
    default:
      return null;
  }
}

export default async function SolutionPersonaPage({ params }: PageProps) {
  const { slug: slugParam } = await params;
  if (!isSolutionSlug(slugParam)) notFound();

  const slug = slugParam as SolutionSlug;
  const cfg = solutionPages[slug];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-void">
        {/* Render modules in canonical order */}
        {cfg.defaultModuleOrder.map((m) => (
          <div key={m}>{renderModule(m, slug)}</div>
        ))}
      </main>
      <Footer />
    </>
  );
}

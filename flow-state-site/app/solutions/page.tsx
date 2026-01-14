// /app/solutions/page.tsx
import Link from "next/link";
import { solutionNav, solutionPages } from "@/lib/solutions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Solutions | YardFlow",
  description: "Five operational archetypes. One network-first yard operating system.",
};

export default function SolutionsOverviewPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-void">
        {/* Hero Section */}
        <div className="mx-auto max-w-6xl px-6 pt-32 pb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Solutions</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Standardize the Yard. Reduce Variance.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-steel">
            Pick your operating context. The playbook stays consistent, the constraints change.
          </p>
          <p className="mt-4 max-w-3xl text-steel">
            Variance is the enemy. Whether it's random gate queues, silent spoilage, open-lot chaos, container shuffles, or wash-cert rejections—unpredictability kills margin and makes forecasting impossible. YardFlow standardizes the physical interface between your facility and the trucking network so costs become predictable and throughput becomes repeatable.
          </p>
        </div>

        {/* Personas Grid */}
        <div className="mx-auto max-w-6xl px-6 pb-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {solutionNav.map((item) => {
              const cfg = solutionPages[item.slug];
              // Extract the first bullet from viscosity (variance driver)
              const varianceDriver = cfg.viscosity.bullets[0]?.body || "Reduce variance";
              // Extract the first bullet from standardizeFirst (what to fix first)
              const standardizeFirst = cfg.standardizeFirst.bullets[0] || "Standardize operations";
              
              return (
                <Link
                  key={item.slug}
                  href={item.href}
                  className="group rounded-2xl border border-neon/20 bg-carbon/50 p-6 hover:border-neon/40 hover:bg-carbon/70 transition"
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-2xl font-semibold text-white">{cfg.navLabel}</h3>
                      <span className="text-xs uppercase tracking-[0.15em] text-neon/70">{cfg.hero.kicker}</span>
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      <div className="rounded-lg border border-neon/10 bg-neon/5 p-3">
                        <div className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold">Variance Driver</div>
                        <p className="mt-1 text-sm text-steel">{varianceDriver}</p>
                      </div>
                      
                      <div className="rounded-lg border border-neon/10 bg-neon/5 p-3">
                        <div className="text-xs uppercase tracking-[0.1em] text-neon/70 font-semibold">Standardize First</div>
                        <p className="mt-1 text-sm text-steel">{standardizeFirst}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-steel/70">Explore this persona</span>
                      <span className="text-sm text-neon">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Shared Value Section */}
        <section className="border-t border-neon/10 bg-carbon/30 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold text-white">What All Personas Share</h2>
            <p className="mt-4 max-w-3xl text-steel">
              Regardless of your operating context, YardFlow provides the same core layer:
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-neon/10 bg-void/50 p-4">
                <div className="text-sm font-semibold text-white">Standardized Check-In</div>
                <p className="mt-2 text-xs text-steel">Digital entry event that works the same across every site and carrier.</p>
              </div>
              <div className="rounded-xl border border-neon/10 bg-void/50 p-4">
                <div className="text-sm font-semibold text-white">Location Ground Truth</div>
                <p className="mt-2 text-xs text-steel">A live digital twin of the yard so everyone knows where everything is.</p>
              </div>
              <div className="rounded-xl border border-neon/10 bg-void/50 p-4">
                <div className="text-sm font-semibold text-white">Event Telemetry</div>
                <p className="mt-2 text-xs text-steel">Every material movement is a typed event, not a radio call or manual log.</p>
              </div>
              <div className="rounded-xl border border-neon/10 bg-void/50 p-4">
                <div className="text-sm font-semibold text-white">Evidence Trail</div>
                <p className="mt-2 text-xs text-steel">Compliance and dispute-ready documentation that builds itself.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

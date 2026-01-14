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
        <div className="mx-auto max-w-6xl px-6 pt-32 pb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-neon/70">Solutions</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Standardize the Yard. Reduce Variance.
          </h1>
          <p className="mt-4 max-w-2xl text-steel">
          Pick your operating context. The playbook stays consistent, the constraints change.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {solutionNav.map((item) => {
            const cfg = solutionPages[item.slug];
            return (
              <Link
                key={item.slug}
                href={item.href}
                className="group rounded-2xl border border-neon/20 bg-carbon/50 p-6 hover:border-neon/40 hover:bg-carbon/70 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm text-steel">{cfg.personaName}</div>
                    <div className="mt-2 text-2xl font-semibold text-white">{cfg.navLabel}</div>
                    <p className="mt-3 text-sm text-steel">{cfg.hero.subhead}</p>
                  </div>
                  <div className="mt-1 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs text-neon">
                    View
                  </div>
                </div>
                <div className="mt-5 text-xs text-steel/70">
                  <span className="text-steel">Kicker:</span> {cfg.hero.kicker}
                </div>
              </Link>
            );
          })}
        </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Noindex all archive pages
export const metadata: Metadata = {
  title: 'Archived Content | YardFlow',
  robots: {
    index: false,
    follow: false,
  },
};

interface ArchivePageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function ArchivePage({ params }: ArchivePageProps) {
  const { slug } = await params;
  const path = slug ? slug.join('/') : 'index';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-void">
        <section className="mx-auto max-w-4xl px-6 pt-32 pb-24">
          <div className="p-8 bg-carbon border border-steel/20 rounded-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-ember/70">
              Archived Content
            </p>
            <h1 className="mt-4 text-3xl font-bold text-white">
              This page has been archived
            </h1>
            <p className="mt-4 text-steel">
              The content at <code className="text-neon font-mono">/archive/{path}</code> is 
              no longer part of the main site. It has been preserved for reference purposes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-neon text-void hover:bg-white transition-all"
              >
                Go to Homepage
              </Link>
              <Link
                href="/product"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold border border-neon text-neon hover:bg-neon/10 transition-all"
              >
                View Product
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

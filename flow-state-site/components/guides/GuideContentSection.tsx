"use client";

import { motion, type Variants } from "framer-motion";

type GuideContentSectionProps = {
  htmlContent: string;
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function GuideContentSection({ htmlContent }: GuideContentSectionProps) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-6">
        <motion.article
          className="guide-content prose prose-lg prose-invert max-w-none
            prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-0 prose-h2:mb-6 prose-h2:scroll-mt-32 prose-h2:pb-4 prose-h2:border-b prose-h2:border-neon/20
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-neon
            prose-p:text-steel/90 prose-p:leading-8 prose-p:text-[17px] prose-p:mb-5
            prose-a:text-neon prose-a:no-underline hover:prose-a:text-neon/80
            prose-strong:text-white prose-strong:font-semibold
            prose-ul:text-steel/90 prose-ul:my-4 
            prose-li:text-steel/90 prose-li:my-2 prose-li:leading-7 prose-li:text-[16px] 
            prose-ol:text-steel/90
            [&_section]:mb-10 [&_section]:p-8 [&_section]:rounded-2xl [&_section]:bg-carbon/30 [&_section]:border [&_section]:border-neon/10 [&_section]:backdrop-blur-sm
            [&_.callout]:my-6 [&_.callout]:p-6 [&_.callout]:rounded-xl [&_.callout]:border
            [&_.callout-data]:bg-neon/5 [&_.callout-data]:border-neon/30
            [&_.callout-note]:bg-void/60 [&_.callout-note]:border-neon/20
            [&_.callout-results]:bg-void/60 [&_.callout-results]:border-emerald-500/30
            [&_.callout_strong]:text-white [&_.callout_strong]:font-semibold
            [&_.callout-source]:text-xs [&_.callout-source]:text-steel/50 [&_.callout-source]:mt-3 [&_.callout-source]:block
            [&_.checklist]:list-none [&_.checklist]:pl-0 [&_.checklist_li]:pl-0 [&_.checklist_li]:flex [&_.checklist_li]:items-start [&_.checklist_li]:gap-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </section>
  );
}

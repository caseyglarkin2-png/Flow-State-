/**
 * Section - Consistent section wrapper for long-form content
 * Provides standardized heading styles and vertical rhythm
 */

import React from 'react';

interface SectionProps {
  id?: string;
  /** Optional kicker/eyebrow above title */
  kicker?: string;
  /** Section title */
  title?: string;
  /** H2 or H3 */
  headingLevel?: 'h2' | 'h3';
  /** Section content */
  children: React.ReactNode;
  /** Additional classes */
  className?: string;
}

export default function Section({
  id,
  kicker,
  title,
  headingLevel = 'h2',
  children,
  className = '',
}: SectionProps) {
  const Heading = headingLevel;
  const headingStyles = headingLevel === 'h2' 
    ? 'text-2xl md:text-3xl font-semibold tracking-tight text-white'
    : 'text-xl md:text-2xl font-semibold tracking-tight text-white';

  return (
    <section id={id} className={`py-12 first:pt-0 ${className}`}>
      {(kicker || title) && (
        <div className="mb-6">
          {kicker && (
            <p className="text-xs uppercase tracking-[0.2em] text-neon/70 mb-2">
              {kicker}
            </p>
          )}
          {title && (
            <Heading className={headingStyles}>
              {title}
            </Heading>
          )}
        </div>
      )}
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
}

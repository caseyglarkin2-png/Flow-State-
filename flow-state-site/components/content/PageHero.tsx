/**
 * PageHero - Consistent hero for long-form pages
 * Includes eyebrow, title, subtitle, and meta row
 */

import React from 'react';
import Link from 'next/link';
import { Clock, Users, Calendar } from 'lucide-react';

interface PageHeroProps {
  /** Back link */
  backLink: { href: string; label: string };
  /** Eyebrow/badge text */
  eyebrow?: string;
  /** Main title */
  title: string;
  /** Subtitle/description */
  subtitle?: string;
  /** Meta information */
  meta?: {
    readTime?: string;
    audience?: string[];
    updatedDate?: string;
  };
  /** Right-side label (e.g., persona name) */
  contextLabel?: string;
}

export default function PageHero({
  backLink,
  eyebrow,
  title,
  subtitle,
  meta,
  contextLabel,
}: PageHeroProps) {
  return (
    <header className="mb-12">
      {/* Navigation row */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <Link 
          href={backLink.href} 
          className="text-sm text-neon hover:text-neon/80 transition"
        >
          ← {backLink.label}
        </Link>
        {contextLabel && (
          <span className="text-xs text-steel">{contextLabel}</span>
        )}
      </div>

      {/* Eyebrow */}
      {eyebrow && (
        <div className="mb-4">
          <span className="inline-block px-2.5 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs uppercase tracking-wider">
            {eyebrow}
          </span>
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-4 text-lg text-steel leading-relaxed max-w-[72ch]">
          {subtitle}
        </p>
      )}

      {/* Meta row */}
      {meta && (meta.readTime || meta.audience?.length || meta.updatedDate) && (
        <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-neon/10 text-sm text-steel">
          {meta.readTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-neon/70" />
              {meta.readTime}
            </span>
          )}
          {meta.audience && meta.audience.length > 0 && (
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-neon/70" />
              {meta.audience.join(' • ')}
            </span>
          )}
          {meta.updatedDate && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-neon/70" />
              Updated {new Date(meta.updatedDate).toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric' 
              })}
            </span>
          )}
        </div>
      )}
    </header>
  );
}

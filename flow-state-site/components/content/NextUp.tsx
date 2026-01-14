/**
 * NextUp - Related links / what to read next
 * Used at bottom of content pages
 */

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface NextUpLink {
  href: string;
  label: string;
  description?: string;
  eyebrow?: string;
}

interface NextUpProps {
  title?: string;
  links: NextUpLink[];
}

export default function NextUp({ title = 'Related', links }: NextUpProps) {
  return (
    <div className="pt-12 border-t border-neon/10">
      <p className="text-xs uppercase tracking-[0.2em] text-steel/70 mb-6">
        {title}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group block p-5 rounded-2xl border border-neon/20 bg-carbon/50 hover:border-neon/40 hover:bg-carbon/70 transition"
          >
            {link.eyebrow && (
              <p className="text-xs uppercase tracking-[0.15em] text-neon/70 mb-2">
                {link.eyebrow}
              </p>
            )}
            <p className="font-semibold text-white group-hover:text-neon transition">
              {link.label}
            </p>
            {link.description && (
              <p className="text-sm text-steel mt-2 line-clamp-2">
                {link.description}
              </p>
            )}
            <div className="flex items-center gap-1 mt-4 text-xs text-neon">
              Read more <ArrowRight className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

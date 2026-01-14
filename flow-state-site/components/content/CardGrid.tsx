/**
 * CardGrid - Responsive grid for pain cards, findings, modules
 */

import React from 'react';
import { card } from '@/lib/contentTokens';

interface CardItem {
  title: string;
  body: string;
  /** Optional additional info */
  tag?: string;
}

interface CardGridProps {
  cards: CardItem[];
  /** Number of columns */
  columns?: 2 | 3;
}

export default function CardGrid({ cards, columns = 3 }: CardGridProps) {
  const gridCols = columns === 2 
    ? 'grid-cols-1 md:grid-cols-2' 
    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid gap-4 ${gridCols}`}>
      {cards.map((item) => (
        <div key={item.title} className={card.base}>
          {item.tag && (
            <span className="text-xs uppercase tracking-[0.15em] text-neon/70 block mb-2">
              {item.tag}
            </span>
          )}
          <h3 className="text-base font-semibold text-white">{item.title}</h3>
          <p className="mt-2 text-[15px] text-steel leading-relaxed">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

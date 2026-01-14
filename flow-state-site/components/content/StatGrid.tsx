/**
 * StatGrid - KPI cards in a responsive grid
 * For displaying key metrics with optional deltas
 */

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Stat {
  /** Metric label */
  label: string;
  /** Primary value */
  value: string;
  /** Optional subtext */
  subtext?: string;
  /** Trend direction */
  trend?: 'up' | 'down' | 'neutral';
  /** Trend value (e.g., "+15%") */
  trendValue?: string;
}

interface StatGridProps {
  stats: Stat[];
  /** Number of columns (2, 3, or 4) */
  columns?: 2 | 3 | 4;
}

export default function StatGrid({ stats, columns = 4 }: StatGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid gap-4 ${gridCols[columns]}`}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-neon/20 bg-carbon/50 p-5"
        >
          <p className="text-xs uppercase tracking-[0.15em] text-steel/70 mb-2">
            {stat.label}
          </p>
          <p className="text-2xl md:text-3xl font-semibold text-white">
            {stat.value}
          </p>
          {stat.subtext && (
            <p className="text-sm text-steel mt-1">{stat.subtext}</p>
          )}
          {stat.trend && stat.trendValue && (
            <div className="flex items-center gap-1 mt-2">
              {stat.trend === 'up' && (
                <TrendingUp className="w-4 h-4 text-green-400" />
              )}
              {stat.trend === 'down' && (
                <TrendingDown className="w-4 h-4 text-ember" />
              )}
              {stat.trend === 'neutral' && (
                <Minus className="w-4 h-4 text-steel" />
              )}
              <span
                className={`text-sm font-medium ${
                  stat.trend === 'up'
                    ? 'text-green-400'
                    : stat.trend === 'down'
                    ? 'text-ember'
                    : 'text-steel'
                }`}
              >
                {stat.trendValue}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

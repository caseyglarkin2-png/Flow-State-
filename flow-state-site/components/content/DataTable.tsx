/**
 * DataTable - Styled table for benchmarks and comparisons
 * Responsive with horizontal scroll on mobile
 */

import React from 'react';

interface Column {
  /** Column header */
  header: string;
  /** Key to access in row data */
  key: string;
  /** Alignment */
  align?: 'left' | 'center' | 'right';
  /** Custom cell renderer */
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  /** Optional caption */
  caption?: string;
}

export default function DataTable({ columns, data, caption }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-neon/20">
      <table className="w-full text-sm">
        {caption && (
          <caption className="px-6 py-3 text-left text-xs uppercase tracking-[0.15em] text-steel/70 bg-carbon/30 border-b border-neon/10">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="border-b border-neon/20 bg-carbon/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-6 py-4 font-semibold text-white ${
                  col.align === 'center'
                    ? 'text-center'
                    : col.align === 'right'
                    ? 'text-right'
                    : 'text-left'
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-neon/10 last:border-b-0 hover:bg-carbon/30 transition"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-6 py-4 text-steel ${
                    col.align === 'center'
                      ? 'text-center'
                      : col.align === 'right'
                      ? 'text-right'
                      : 'text-left'
                  }`}
                >
                  {col.render
                    ? col.render(row[col.key], row)
                    : (row[col.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

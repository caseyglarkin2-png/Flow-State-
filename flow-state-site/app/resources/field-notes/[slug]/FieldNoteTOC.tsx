"use client";

/**
 * FieldNoteTOC - Client-side TOC for field notes
 */

import { TOC } from "@/components/content";

interface TOCItem {
  id: string;
  label: string;
}

interface FieldNoteTOCProps {
  items: TOCItem[];
  hasBenchmarks: boolean;
}

export default function FieldNoteTOC({ items, hasBenchmarks }: FieldNoteTOCProps) {
  // Filter out benchmarks section if not present
  const filteredItems = hasBenchmarks 
    ? items 
    : items.filter(item => item.id !== 'benchmarks');
  
  return <TOC items={filteredItems} />;
}

"use client";

/**
 * PersonaTOC - Client-side TOC for persona pages
 * Sticky on desktop, hidden on mobile
 */

import { TOC } from "@/components/content";

interface TOCItem {
  id: string;
  label: string;
}

interface PersonaTOCProps {
  items: TOCItem[];
}

export default function PersonaTOC({ items }: PersonaTOCProps) {
  return <TOC items={items} />;
}

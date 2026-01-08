/**
 * Canonical Snippet Component
 * Renders predefined content blocks to avoid duplication
 */

import Link from 'next/link';
import { 
  NETWORK_LEAK_CATEGORIES, 
  CORE_DISCLAIMERS, 
  YNS_PILLARS,
  METHODOLOGY_LINK 
} from '@/content/definitions';
import { CATEGORY_DEFINITION, VALUE_PROPS, ECONOMIC_LENS } from '@/content/copy';

interface CanonicalSnippetProps {
  id: 'network-leak-summary' | 'yns-definition' | 'category-distinction' | 'ground-truth' | 'disclaimer-modeled' | 'yns-pillars-compact';
  variant?: 'full' | 'compact';
  className?: string;
}

export default function CanonicalSnippet({ 
  id, 
  variant = 'full',
  className = '' 
}: CanonicalSnippetProps) {
  
  if (id === 'network-leak-summary') {
    const topCategories = variant === 'compact' 
      ? NETWORK_LEAK_CATEGORIES.slice(0, 3)
      : NETWORK_LEAK_CATEGORIES.slice(0, 5);
    
    return (
      <div className={className}>
        <h3 className="text-xl font-bold text-white mb-4">The Network Leak (8 Categories)</h3>
        <ul className="space-y-3">
          {topCategories.map((cat) => (
            <li key={cat.id} className="flex flex-col">
              <span className="font-semibold text-neon">{cat.name}</span>
              <span className="text-sm text-steel/80">{cat.description}</span>
              <span className="text-xs text-steel/60 mt-1">{cat.typical}</span>
            </li>
          ))}
        </ul>
        {variant === 'compact' && (
          <Link href={METHODOLOGY_LINK} className="text-neon text-sm hover:underline mt-4 inline-block">
            See all 8 categories + methodology →
          </Link>
        )}
      </div>
    );
  }
  
  if (id === 'yns-definition') {
    return (
      <div className={`space-y-2 ${className}`}>
        <p className="text-steel/90">{CATEGORY_DEFINITION.yms}</p>
        <p className="text-white font-medium">{CATEGORY_DEFINITION.yns}</p>
      </div>
    );
  }
  
  if (id === 'category-distinction') {
    return (
      <div className={`p-6 rounded-lg border border-neon/30 bg-gradient-to-r from-neon/5 to-transparent ${className}`}>
        <p className="text-white font-semibold mb-2">YMS vs YNS</p>
        <p className="text-steel/80 text-sm leading-relaxed">
          {CATEGORY_DEFINITION.difference}
        </p>
      </div>
    );
  }
  
  if (id === 'ground-truth') {
    return (
      <div className={`space-y-3 ${className}`}>
        <h3 className="text-xl font-bold text-white">{ECONOMIC_LENS.headline}</h3>
        <p className="text-steel/90">{ECONOMIC_LENS.explanation}</p>
        <p className="text-white">{VALUE_PROPS.groundTruth}</p>
      </div>
    );
  }
  
  if (id === 'disclaimer-modeled') {
    return (
      <p className={`text-steel/60 text-xs italic ${className}`}>
        {CORE_DISCLAIMERS.modeled}
        {' '}
        <Link href={METHODOLOGY_LINK} className="text-neon hover:underline">
          See methodology
        </Link>
      </p>
    );
  }
  
  if (id === 'yns-pillars-compact') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
        {YNS_PILLARS.map((pillar) => (
          <div key={pillar.id} className="p-4 rounded-lg border border-steel/30 bg-carbon/30">
            <h4 className="font-bold text-neon mb-2">{pillar.name}</h4>
            <p className="text-sm text-steel/80">{pillar.shortDesc}</p>
          </div>
        ))}
      </div>
    );
  }
  
  return null;
}

/**
 * Disclosure/Accordion Component
 * Progressive disclosure pattern for deep content
 */

'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  variant?: 'default' | 'minimal';
  className?: string;
}

export default function Disclosure({ 
  title, 
  children, 
  defaultOpen = false,
  variant = 'default',
  className = ''
}: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  if (variant === 'minimal') {
    return (
      <div className={`border-b border-steel/20 ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-4 flex items-center justify-between text-left hover:text-neon transition-colors"
        >
          <span className="font-semibold">{title}</span>
          <ChevronDown 
            size={20} 
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {isOpen && (
          <div className="pb-6 text-steel/80 leading-relaxed">
            {children}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className={`rounded-lg border border-steel/30 bg-carbon/40 overflow-hidden ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-carbon/60 transition-colors"
      >
        <span className="font-semibold text-white">{title}</span>
        <ChevronDown 
          size={20} 
          className={`text-neon transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-steel/90 leading-relaxed border-t border-steel/20">
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * Accordion Group Component
 * Manages multiple disclosures with single-open behavior
 */
interface AccordionProps {
  items: Array<{
    title: string;
    content: React.ReactNode;
  }>;
  variant?: 'default' | 'minimal';
  className?: string;
}

export function Accordion({ items, variant = 'default', className = '' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  return (
    <div className={`space-y-${variant === 'minimal' ? '0' : '3'} ${className}`}>
      {items.map((item, index) => (
        <Disclosure
          key={index}
          title={item.title}
          defaultOpen={openIndex === index}
          variant={variant}
        >
          {item.content}
        </Disclosure>
      ))}
    </div>
  );
}

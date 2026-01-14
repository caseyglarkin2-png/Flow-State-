/**
 * Prose - Consistent typography wrapper for long-form content
 * Enforces max-width, line-height, and heading styles
 */

import React from 'react';

interface ProseProps {
  children: React.ReactNode;
  /** Larger text for introductions */
  lead?: boolean;
  /** Additional classes */
  className?: string;
}

export default function Prose({ children, lead = false, className = '' }: ProseProps) {
  return (
    <div
      className={`
        max-w-[72ch] text-steel
        ${lead ? 'text-lg leading-8' : 'text-base leading-7'}
        
        [&>p]:mb-5
        [&>p:last-child]:mb-0
        
        [&>h2]:text-2xl
        [&>h2]:font-semibold
        [&>h2]:tracking-tight
        [&>h2]:text-white
        [&>h2]:mt-12
        [&>h2]:mb-4
        [&>h2:first-child]:mt-0
        
        [&>h3]:text-xl
        [&>h3]:font-semibold
        [&>h3]:tracking-tight
        [&>h3]:text-white
        [&>h3]:mt-8
        [&>h3]:mb-3
        
        [&>ul]:list-none
        [&>ul]:space-y-3
        [&>ul]:my-6
        
        [&>ul>li]:relative
        [&>ul>li]:pl-5
        [&>ul>li]:before:content-['']
        [&>ul>li]:before:absolute
        [&>ul>li]:before:left-0
        [&>ul>li]:before:top-[0.6em]
        [&>ul>li]:before:w-1.5
        [&>ul>li]:before:h-1.5
        [&>ul>li]:before:rounded-full
        [&>ul>li]:before:bg-neon/70
        
        [&>ol]:list-decimal
        [&>ol]:list-inside
        [&>ol]:space-y-3
        [&>ol]:my-6
        
        [&>blockquote]:border-l-2
        [&>blockquote]:border-neon/50
        [&>blockquote]:pl-6
        [&>blockquote]:py-1
        [&>blockquote]:my-6
        [&>blockquote]:text-white
        [&>blockquote]:italic
        
        [&_strong]:text-white
        [&_strong]:font-semibold
        
        [&_a]:text-neon
        [&_a]:underline
        [&_a]:underline-offset-2
        [&_a:hover]:text-neon/80
        
        ${className}
      `}
    >
      {children}
    </div>
  );
}

import React from 'react';

export interface SectionProps {
  /** Section title (optional) */
  title?: string;
  
  /** Section subtitle (optional) */
  subtitle?: string;
  
  /** Section content */
  children: React.ReactNode;
  
  /** Background variant */
  variant?: 'light' | 'dark';
  
  /** Additional classes */
  className?: string;
  
  /** ID for anchor links */
  id?: string;
}

export function Section({
  title,
  subtitle,
  children,
  variant = 'dark',
  className = '',
  id,
}: SectionProps) {
  const bgClass = variant === 'light' ? 'bg-gray-50' : 'bg-void';
  const textClass = variant === 'light' ? 'text-gray-900' : 'text-white';

  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${bgClass} ${className}`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textClass}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-lg md:text-xl ${variant === 'light' ? 'text-gray-600' : 'text-steel'}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

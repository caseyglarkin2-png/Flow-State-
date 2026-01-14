"use client";

/**
 * Reveal - Scroll-triggered fade-in animation
 * Respects prefers-reduced-motion
 */

import React, { useRef, useEffect, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  /** Delay in ms */
  delay?: number;
  /** Animation direction */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Additional classes */
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (prefersReducedMotion || isVisible) return 'translate(0, 0)';
    switch (direction) {
      case 'up':
        return 'translateY(20px)';
      case 'down':
        return 'translateY(-20px)';
      case 'left':
        return 'translateX(20px)';
      case 'right':
        return 'translateX(-20px)';
      default:
        return 'translate(0, 0)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: prefersReducedMotion
          ? 'none'
          : `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Stagger - Container that staggers child animations
 */

interface StaggerProps {
  children: React.ReactNode;
  /** Delay between each child in ms */
  staggerDelay?: number;
  /** Initial delay before first child */
  initialDelay?: number;
  /** Additional classes */
  className?: string;
}

export function Stagger({
  children,
  staggerDelay = 100,
  initialDelay = 0,
  className = '',
}: StaggerProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <Reveal delay={initialDelay + index * staggerDelay}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}

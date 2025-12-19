'use client';

import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}

export default function Card({ className = '', children, hover = false }: CardProps) {
  return (
    <div
      className={`glass-card ${hover ? 'glass-card-hover' : ''} p-8 ${className}`}
    >
      {children}
    </div>
  );
}

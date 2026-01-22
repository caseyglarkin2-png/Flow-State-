/**
 * Test-only route that throws an error
 * Used for testing error.tsx boundary
 * 
 * This route is excluded from sitemap via robots.ts
 */

'use client';

import { useEffect, useState } from 'react';

export default function TestErrorPage() {
  const [shouldThrow, setShouldThrow] = useState(false);

  useEffect(() => {
    // Delay the throw so the page can render first
    const timer = setTimeout(() => {
      setShouldThrow(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (shouldThrow) {
    throw new Error('Test error for error boundary verification');
  }

  return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      <p className="text-white">Loading error test...</p>
    </div>
  );
}

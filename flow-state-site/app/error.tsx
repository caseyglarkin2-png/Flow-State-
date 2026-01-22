'use client';

import React from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Runtime Error Boundary
 * 
 * Catches JavaScript errors in page components and displays
 * a branded error page with recovery options.
 * 
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */
export default function Error({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Runtime error caught by error.tsx:', error);
    }
    // In production, you might want to send to an error tracking service
    // e.g., Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-void flex flex-col items-center justify-center px-6">
      <div className="max-w-xl text-center">
        {/* Error Icon */}
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-ember/10 border border-ember/30">
          <svg
            className="w-10 h-10 text-ember"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Something went <span className="text-ember">wrong</span>
        </h1>

        {/* Description */}
        <p className="text-steel text-lg mb-8">
          We hit an unexpected error. This has been logged and we're looking into it.
        </p>

        {/* Error Digest (for debugging) */}
        {error.digest && (
          <p className="text-steel/50 text-sm font-mono mb-8">
            Error ID: {error.digest}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-neon text-void hover:shadow-lg hover:shadow-neon/50 transition-all focus:outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-void"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-steel/30 text-white hover:border-neon/40 transition-colors focus:outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-void"
          >
            Go Home
          </Link>
        </div>

        {/* Contact Support */}
        <p className="mt-8 text-steel/70 text-sm">
          If this keeps happening,{' '}
          <Link href="/contact" className="text-neon hover:underline">
            contact our support team
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

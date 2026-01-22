'use client';

/**
 * Global Error Boundary
 * 
 * Catches errors that occur in the root layout itself.
 * Must be minimal with NO external dependencies (Tailwind might have failed too).
 * Uses inline styles only.
 * 
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-errors-in-root-layouts
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          backgroundColor: '#050505',
          color: '#ffffff',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '500px', padding: '24px' }}>
          {/* Error Icon */}
          <div
            style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 24px',
              borderRadius: '16px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              marginBottom: '16px',
              lineHeight: 1.2,
            }}
          >
            Something went wrong
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: '1rem',
              color: '#6B7280',
              marginBottom: '24px',
              lineHeight: 1.5,
            }}
          >
            A critical error occurred. Please try refreshing the page.
          </p>

          {/* Error Digest */}
          {error.digest && (
            <p
              style={{
                fontSize: '0.75rem',
                color: '#4B5563',
                fontFamily: 'monospace',
                marginBottom: '24px',
              }}
            >
              Error ID: {error.digest}
            </p>
          )}

          {/* Actions */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={reset}
              style={{
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '12px',
                border: 'none',
                backgroundColor: '#00B4FF',
                color: '#050505',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
            <button
              onClick={() => (window.location.href = '/')}
              style={{
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '12px',
                border: '1px solid rgba(107, 114, 128, 0.3)',
                backgroundColor: 'transparent',
                color: '#ffffff',
                cursor: 'pointer',
              }}
            >
              Go Home
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

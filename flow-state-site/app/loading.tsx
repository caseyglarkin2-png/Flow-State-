/**
 * Loading State Component
 * 
 * Displayed during React Suspense boundaries while page content loads.
 * Uses brand styling with animated spinner.
 * 
 * @see https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Animated Spinner */}
        <div className="relative w-16 h-16 mb-6">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-steel/20" />
          {/* Spinning segment */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-neon animate-spin" />
          {/* Inner glow dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
          </div>
        </div>

        {/* Loading text */}
        <p className="text-steel text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}

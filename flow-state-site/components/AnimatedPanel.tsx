'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';

interface AnimatedPanelProps {
  title: string;
  description?: string;
  /**
   * Path to Lottie JSON file (relative to public/)
   * Example: "/animations/gate-sequence.json"
   */
  lottieSrc?: string;
  /**
   * Path to video file (relative to public/)
   * Example: "/animations/yard-view.mp4"
   */
  videoSrc?: string;
  /**
   * Static fallback image (relative to public/)
   * Used when animations are disabled or fail to load
   */
  posterSrc?: string;
  /**
   * Aspect ratio (default: "16/9")
   */
  aspectRatio?: string;
  className?: string;
}

/**
 * AnimatedPanel - Production animation component
 * 
 * Features:
 * - Lazy-loads Lottie player for performance
 * - Respects prefers-reduced-motion
 * - Static fallback image for accessibility
 * - Video support for heavy animations
 * - Loading states
 * 
 * Usage:
 * <AnimatedPanel
 *   title="Gate Verification"
 *   lottieSrc="/animations/gate-sequence.json"
 *   posterSrc="/images/gate-fallback.png"
 * />
 */
export default function AnimatedPanel({
  title,
  description,
  lottieSrc,
  videoSrc,
  posterSrc,
  aspectRatio = '16/9',
  className = '',
}: AnimatedPanelProps) {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setShouldAnimate(!e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Video rendering
  if (videoSrc && shouldAnimate) {
    return (
      <div 
        className={`glass-card relative overflow-hidden ${className}`} 
        style={{ aspectRatio }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster={posterSrc}
          onLoadedData={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          className="w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
        </video>

        {isLoading && <LoadingState title={title} description={description} />}
        {hasError && posterSrc && (
          <FallbackImage src={posterSrc} alt={title} />
        )}

        <div className="absolute bottom-4 left-4 right-4 bg-void/80 backdrop-blur-sm p-3 rounded-lg">
          <p className="text-white font-semibold text-sm">{title}</p>
          {description && (
            <p className="text-steel/80 text-xs mt-1">{description}</p>
          )}
        </div>
      </div>
    );
  }

  // Lottie rendering (lazy-loaded)
  if (lottieSrc && shouldAnimate) {
    return (
      <div 
        className={`glass-card relative overflow-hidden ${className}`} 
        style={{ aspectRatio }}
      >
        <Suspense fallback={<LoadingState title={title} description={description} />}>
          <LottiePlayer
            src={lottieSrc}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
          />
        </Suspense>

        {(isLoading || hasError) && posterSrc && (
          <FallbackImage src={posterSrc} alt={title} />
        )}

        <div className="absolute bottom-4 left-4 right-4 bg-void/80 backdrop-blur-sm p-3 rounded-lg">
          <p className="text-white font-semibold text-sm">{title}</p>
          {description && (
            <p className="text-steel/80 text-xs mt-1">{description}</p>
          )}
        </div>
      </div>
    );
  }

  // Fallback: static image or placeholder
  return (
    <div 
      className={`glass-card relative overflow-hidden ${className}`} 
      style={{ aspectRatio }}
    >
      {posterSrc ? (
        <FallbackImage src={posterSrc} alt={title} />
      ) : (
        <PlaceholderState title={title} description={description} />
      )}

      <div className="absolute bottom-4 left-4 right-4 bg-void/80 backdrop-blur-sm p-3 rounded-lg">
        <p className="text-white font-semibold text-sm">{title}</p>
        {description && (
          <p className="text-steel/80 text-xs mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}

// Loading state component
function LoadingState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neon/5 to-ember/5 animate-pulse">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-neon/30 border-t-neon rounded-full animate-spin" />
        <p className="text-steel/60 text-sm font-mono uppercase tracking-wider mb-2">
          Loading Animation
        </p>
        {description && (
          <p className="text-steel/40 text-xs">{description}</p>
        )}
      </div>
    </div>
  );
}

// Fallback image component
function FallbackImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      priority
    />
  );
}

// Placeholder state (when no assets provided)
function PlaceholderState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-carbon/50 to-void">
      <div className="text-center p-8">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-dashed border-steel/30 flex items-center justify-center">
          <svg className="w-12 h-12 text-steel/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-steel/60 text-sm font-mono uppercase tracking-wider">
          Animation: {title}
        </p>
        {description && (
          <p className="text-steel/40 text-xs mt-2">{description}</p>
        )}
      </div>
    </div>
  );
}

// Lazy-loaded Lottie player
function LottiePlayer({ 
  src, 
  onLoad, 
  onError 
}: { 
  src: string; 
  onLoad: () => void; 
  onError: () => void;
}) {
  const [Player, setPlayer] = useState<any>(null);

  useEffect(() => {
    // Dynamically import lottie-react to reduce bundle size
    import('@lottiefiles/react-lottie-player')
      .then((mod) => {
        setPlayer(() => mod.Player);
        onLoad();
      })
      .catch((err) => {
        console.error('Failed to load Lottie player:', err);
        onError();
      });
  }, [onLoad, onError]);

  if (!Player) {
    return null;
  }

  return (
    <Player
      autoplay
      loop
      src={src}
      style={{ width: '100%', height: '100%' }}
      onError={onError}
    />
  );
}

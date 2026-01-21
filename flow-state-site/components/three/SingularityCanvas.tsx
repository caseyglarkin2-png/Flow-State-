'use client';

/**
 * SingularityCanvas - R3F Canvas wrapper for black hole visualization
 * 
 * Provides:
 * - WebGL context with error boundary
 * - Performance monitoring with adaptive quality
 * - Suspense boundary for async loading
 * - Fallback for non-WebGL browsers
 */

import { Canvas, type CanvasProps } from '@react-three/fiber';
import { PerformanceMonitor, Preload } from '@react-three/drei';
import { Suspense, useState, useCallback, ReactNode, ErrorInfo, Component } from 'react';
import { getWebGLCapabilities, getQualitySettings, type QualityTier } from '@/src/lib/webgl/capabilities';

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface SingularityCanvasProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  onQualityChange?: (tier: QualityTier) => void;
  initialQuality?: QualityTier;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// ═══════════════════════════════════════════════════════════════════
// ERROR BOUNDARY
// ═══════════════════════════════════════════════════════════════════

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('WebGL Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// ═══════════════════════════════════════════════════════════════════
// LOADING FALLBACK
// ═══════════════════════════════════════════════════════════════════

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-void">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full border-2 border-neon border-t-transparent animate-spin" />
        <span className="text-zinc-400 text-sm">Loading visualization...</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// STATIC FALLBACK (for no-WebGL)
// ═══════════════════════════════════════════════════════════════════

function StaticFallback() {
  return (
    <div 
      className="absolute inset-0 bg-void"
      style={{
        background: 'radial-gradient(ellipse at center, #0d0f12 0%, #050608 70%, #000 100%)',
      }}
    >
      {/* CSS-only black hole approximation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, #000 40%, transparent 70%)',
            boxShadow: '0 0 60px 20px rgba(0, 255, 136, 0.2), 0 0 100px 40px rgba(5, 172, 235, 0.1)',
          }}
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function SingularityCanvas({
  children,
  className = '',
  fallback,
  onQualityChange,
  initialQuality,
}: SingularityCanvasProps) {
  // Detect WebGL capabilities on mount
  const [capabilities] = useState(() => {
    if (typeof window === 'undefined') return null;
    return getWebGLCapabilities();
  });

  // Track current quality tier
  const [qualityTier, setQualityTier] = useState<QualityTier>(() => {
    if (initialQuality) return initialQuality;
    if (capabilities) return capabilities.tier;
    return 'medium';
  });

  // Get quality settings for current tier
  const qualitySettings = getQualitySettings(qualityTier);

  // Performance-based quality adjustment
  const handleIncline = useCallback(() => {
    // Performance is good, can try higher quality
    const tiers: QualityTier[] = ['low', 'medium', 'high', 'ultra'];
    const currentIndex = tiers.indexOf(qualityTier);
    if (currentIndex < tiers.length - 1) {
      const newTier = tiers[currentIndex + 1];
      setQualityTier(newTier);
      onQualityChange?.(newTier);
    }
  }, [qualityTier, onQualityChange]);

  const handleDecline = useCallback(() => {
    // Performance is dropping, reduce quality
    const tiers: QualityTier[] = ['low', 'medium', 'high', 'ultra'];
    const currentIndex = tiers.indexOf(qualityTier);
    if (currentIndex > 0) {
      const newTier = tiers[currentIndex - 1];
      setQualityTier(newTier);
      onQualityChange?.(newTier);
    }
  }, [qualityTier, onQualityChange]);

  // SSR guard
  if (typeof window === 'undefined') {
    return fallback || <StaticFallback />;
  }

  // No WebGL support
  if (!capabilities || capabilities.tier === 'fallback') {
    return fallback || <StaticFallback />;
  }

  // Canvas configuration
  const canvasProps: Partial<CanvasProps> = {
    dpr: qualitySettings.dpr,
    gl: {
      antialias: qualityTier === 'ultra' || qualityTier === 'high',
      alpha: true,
      powerPreference: qualityTier === 'ultra' ? 'high-performance' : 'default',
      stencil: false,
      depth: true,
    },
    camera: {
      position: [0, 0, 2],
      fov: 75,
      near: 0.1,
      far: 100,
    },
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <WebGLErrorBoundary fallback={fallback || <StaticFallback />}>
        <Canvas {...canvasProps}>
          <Suspense fallback={null}>
            <PerformanceMonitor
              onIncline={handleIncline}
              onDecline={handleDecline}
              flipflops={3}
              factor={0.5}
            >
              {children}
            </PerformanceMonitor>
            <Preload all />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
      
      {/* Loading overlay (shown during Suspense) */}
      <noscript>
        <StaticFallback />
      </noscript>
    </div>
  );
}

// Export quality context for child components
export { type QualityTier, getQualitySettings };

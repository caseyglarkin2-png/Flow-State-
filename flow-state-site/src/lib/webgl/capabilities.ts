/**
 * WebGL Capabilities Detection
 * 
 * Detects WebGL features and maps them to quality tiers.
 * Used to determine shader complexity and particle counts.
 */

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

export type WebGLVersion = 0 | 1 | 2;

/** Quality tier for rendering */
export type QualityTier = 'ultra' | 'high' | 'medium' | 'low' | 'fallback';

export interface WebGLCapabilities {
  /** WebGL version available (0 = none, 1 = WebGL1, 2 = WebGL2) */
  version: WebGLVersion;
  
  /** Quality tier based on hardware */
  tier: QualityTier;
  
  /** Whether WebGL2 is available */
  webgl2: boolean;
  
  /** Maximum texture size supported */
  maxTextureSize: number;
  
  /** Maximum number of vertex attributes */
  maxVertexAttribs: number;
  
  /** Maximum number of texture units in fragment shader */
  maxTextureUnits: number;
  
  /** Supports float textures */
  floatTextures: boolean;
  
  /** Supports instanced rendering */
  instancing: boolean;
  
  /** Supports vertex array objects */
  vao: boolean;
  
  /** Supports depth textures */
  depthTexture: boolean;
  
  /** Supports anisotropic filtering */
  anisotropicFiltering: boolean;
  
  /** Maximum anisotropy level */
  maxAnisotropy: number;
  
  /** GPU renderer string */
  renderer: string;
  
  /** GPU vendor string */
  vendor: string;
  
  /** Is a mobile GPU */
  isMobile: boolean;
  
  /** Is Apple Silicon / Metal */
  isAppleSilicon: boolean;
  
  /** Detected hardware tier (legacy, use tier instead) */
  hardwareTier: QualityTier;
}

export interface QualitySettings {
  /** Particle count for network visualization */
  particleCount: number;
  
  /** Raymarching step count */
  raymarchSteps: number;
  
  /** Noise octaves for effects */
  noiseOctaves: number;
  
  /** Enable accretion disk animation */
  animatedDisk: boolean;
  
  /** Enable post-processing bloom */
  bloom: boolean;
  
  /** Enable dissolve transition */
  dissolveTransition: boolean;
  
  /** Shadow quality */
  shadows: 'none' | 'low' | 'high';
  
  /** Device pixel ratio for rendering */
  dpr: number;
}

// ═══════════════════════════════════════════════════════════════════
// DETECTION
// ═══════════════════════════════════════════════════════════════════

/**
 * Detect WebGL capabilities
 * @returns Capabilities object or null if WebGL unavailable
 */
export function getWebGLCapabilities(): WebGLCapabilities | null {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  const canvas = document.createElement('canvas');
  let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
  let version: WebGLVersion = 0;

  // Try WebGL2 first
  try {
    gl = canvas.getContext('webgl2') as WebGL2RenderingContext | null;
    if (gl) {
      version = 2;
    }
  } catch (e) {
    // WebGL2 not available
  }

  // Fall back to WebGL1
  if (!gl) {
    try {
      gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
      if (gl) {
        version = 1;
      }
    } catch (e) {
      // WebGL1 not available
    }
  }

  if (!gl) {
    return null;
  }

  // Get debug info extension for GPU info
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo 
    ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) 
    : 'Unknown';
  const vendor = debugInfo 
    ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) 
    : 'Unknown';

  // Check extensions
  const floatExt = gl.getExtension('OES_texture_float');
  const instancingExt = version === 2 || gl.getExtension('ANGLE_instanced_arrays');
  const vaoExt = version === 2 || gl.getExtension('OES_vertex_array_object');
  const depthTextureExt = version === 2 || gl.getExtension('WEBGL_depth_texture');
  const anisotropicExt = 
    gl.getExtension('EXT_texture_filter_anisotropic') ||
    gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') ||
    gl.getExtension('MOZ_EXT_texture_filter_anisotropic');

  // Detect mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    typeof navigator !== 'undefined' ? navigator.userAgent : ''
  );

  // Detect Apple Silicon
  const isAppleSilicon = /Apple/.test(vendor) && /M[0-9]/.test(renderer);

  const capabilities: WebGLCapabilities = {
    version,
    tier: 'medium', // Will be calculated below
    webgl2: version === 2,
    maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
    maxVertexAttribs: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
    maxTextureUnits: gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
    floatTextures: version === 2 || !!floatExt,
    instancing: !!instancingExt,
    vao: !!vaoExt,
    depthTexture: !!depthTextureExt,
    anisotropicFiltering: !!anisotropicExt,
    maxAnisotropy: anisotropicExt 
      ? gl.getParameter(anisotropicExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT) 
      : 1,
    renderer,
    vendor,
    isMobile,
    isAppleSilicon,
    hardwareTier: 'medium', // Will be calculated below
  };

  // Determine hardware tier
  const tier = calculateHardwareTier(capabilities);
  capabilities.tier = tier;
  capabilities.hardwareTier = tier;

  return capabilities;
}

/**
 * Calculate hardware tier based on capabilities
 */
function calculateHardwareTier(caps: WebGLCapabilities): WebGLCapabilities['hardwareTier'] {
  // No WebGL = fallback
  if (caps.version === 0) {
    return 'fallback';
  }

  // Scoring system
  let score = 0;

  // WebGL2 adds points
  if (caps.version === 2) score += 20;

  // Texture size scoring
  if (caps.maxTextureSize >= 16384) score += 15;
  else if (caps.maxTextureSize >= 8192) score += 10;
  else if (caps.maxTextureSize >= 4096) score += 5;

  // Features scoring
  if (caps.floatTextures) score += 10;
  if (caps.instancing) score += 15;
  if (caps.vao) score += 5;
  if (caps.anisotropicFiltering && caps.maxAnisotropy >= 8) score += 5;

  // Apple Silicon bonus (excellent WebGL performance)
  if (caps.isAppleSilicon) score += 20;

  // Mobile penalty
  if (caps.isMobile) score -= 15;

  // GPU-specific scoring
  const rendererLower = caps.renderer.toLowerCase();
  
  // High-end GPUs
  if (/rtx|radeon rx (6|7)|geforce (30|40)|apple m[2-9]/i.test(rendererLower)) {
    score += 25;
  }
  // Mid-range GPUs
  else if (/gtx (10|16)|radeon rx 5|apple m1|intel iris/i.test(rendererLower)) {
    score += 15;
  }
  // Low-end GPUs
  else if (/intel hd|intel uhd|mali|adreno [4-5]/i.test(rendererLower)) {
    score += 5;
  }
  // Very old/limited GPUs
  else if (/intel gma|adreno [1-3]/i.test(rendererLower)) {
    score -= 10;
  }

  // Map score to tier
  if (score >= 70) return 'ultra';
  if (score >= 50) return 'high';
  if (score >= 30) return 'medium';
  if (score >= 10) return 'low';
  return 'fallback';
}

// ═══════════════════════════════════════════════════════════════════
// QUALITY SETTINGS
// ═══════════════════════════════════════════════════════════════════

/**
 * Quality settings for each tier
 */
export const QUALITY_PRESETS: Record<QualityTier, QualitySettings> = {
  ultra: {
    particleCount: 5000,
    raymarchSteps: 64,
    noiseOctaves: 6,
    animatedDisk: true,
    bloom: true,
    dissolveTransition: true,
    shadows: 'high',
    dpr: 2,
  },
  high: {
    particleCount: 2500,
    raymarchSteps: 48,
    noiseOctaves: 4,
    animatedDisk: true,
    bloom: true,
    dissolveTransition: true,
    shadows: 'low',
    dpr: 1.5,
  },
  medium: {
    particleCount: 1000,
    raymarchSteps: 32,
    noiseOctaves: 3,
    animatedDisk: true,
    bloom: false,
    dissolveTransition: true,
    shadows: 'none',
    dpr: 1,
  },
  low: {
    particleCount: 500,
    raymarchSteps: 16,
    noiseOctaves: 2,
    animatedDisk: false,
    bloom: false,
    dissolveTransition: false,
    shadows: 'none',
    dpr: 0.75,
  },
  fallback: {
    particleCount: 0,
    raymarchSteps: 0,
    noiseOctaves: 0,
    animatedDisk: false,
    bloom: false,
    dissolveTransition: false,
    shadows: 'none',
    dpr: 1,
  },
};

/**
 * Get quality settings for detected or specified tier
 */
export function getQualitySettings(tier?: QualityTier): QualitySettings {
  if (tier) {
    return QUALITY_PRESETS[tier];
  }
  
  const caps = getWebGLCapabilities();
  if (!caps) {
    return QUALITY_PRESETS.fallback;
  }
  
  return QUALITY_PRESETS[caps.tier];
}

// ═══════════════════════════════════════════════════════════════════
// PERFORMANCE STORE INITIALIZATION
// ═══════════════════════════════════════════════════════════════════

/**
 * Initialize performance store with detected capabilities
 * This is a utility function - the actual store is in performanceStore.ts
 */
export function initializePerformanceStore(tier: QualityTier): void {
  // This function is called from React components after WebGL detection
  // The actual store initialization happens in the calling code
  // This is just a placeholder for the pattern
  if (typeof window !== 'undefined') {
    // Store the detected tier for later use
    (window as unknown as { __webglTier?: QualityTier }).__webglTier = tier;
  }
}

// ═══════════════════════════════════════════════════════════════════
// REACT HOOK
// ═══════════════════════════════════════════════════════════════════

/**
 * Hook for accessing WebGL capabilities in React components
 */
export function useWebGLCapabilities(): WebGLCapabilities | null {
  // Import would be: import { useState, useEffect } from 'react'
  // But this is a utility file, hook is provided for convenience
  // Usage: const caps = useWebGLCapabilities();
  
  // This is a stub - actual React hook implementation would use useState/useEffect
  // For SSR safety, return null during server render
  if (typeof window === 'undefined') {
    return null;
  }
  
  return getWebGLCapabilities();
}

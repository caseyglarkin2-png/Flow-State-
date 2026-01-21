'use client';

/**
 * BlackHole - Raymarched black hole visualization
 * 
 * Uses custom GLSL shaders for gravitational lensing,
 * accretion disk animation, and dissolve transitions.
 */

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Import shaders
import blackholeVert from '@/shaders/blackhole/blackhole.vert';
import blackholeFrag from '@/shaders/blackhole/blackhole.frag';

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface BlackHoleProps {
  viscosity?: number;
  progress?: number;
  quality?: number;
  paused?: boolean;
}

interface BlackHoleUniforms {
  uTime: number;
  uViscosity: number;
  uResolution: THREE.Vector2;
  uProgress: number;
  uMouse: THREE.Vector2;
  uQuality: number;
  [key: string]: number | THREE.Vector2;
}

// ═══════════════════════════════════════════════════════════════════
// SHADER MATERIAL
// ═══════════════════════════════════════════════════════════════════

const BlackHoleMaterial = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uViscosity: 0,
    uResolution: new THREE.Vector2(1, 1),
    uProgress: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uQuality: 2,
  },
  // Vertex shader
  blackholeVert,
  // Fragment shader
  blackholeFrag
);

// Extend Three.js with our custom material
extend({ BlackHoleMaterial });

// ═══════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function BlackHole({
  viscosity = 0,
  progress = 0,
  quality = 2,
  paused = false,
}: BlackHoleProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  // Resolution vector (memoized to prevent recreation)
  const resolution = useMemo(
    () => new THREE.Vector2(size.width * viewport.dpr, size.height * viewport.dpr),
    [size.width, size.height, viewport.dpr]
  );

  // Create material instance
  const material = useMemo(() => new BlackHoleMaterial(), []);

  // Update uniforms every frame
  useFrame((state) => {
    if (!material || paused) return;

    // Time animation
    material.uniforms.uTime.value = state.clock.elapsedTime;

    // Update viscosity (smoothed externally via Zustand)
    material.uniforms.uViscosity.value = viscosity;

    // Update resolution
    material.uniforms.uResolution.value = resolution;

    // Update progress
    material.uniforms.uProgress.value = progress;

    // Update quality
    material.uniforms.uQuality.value = quality;

    // Mouse tracking (normalized 0-1)
    const mouse = state.mouse;
    material.uniforms.uMouse.value.set(
      (mouse.x + 1) * 0.5,
      (mouse.y + 1) * 0.5
    );
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" transparent depthWrite={false} />
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CONNECTED VERSION (reads from store)
// ═══════════════════════════════════════════════════════════════════

export { BlackHole as BlackHoleBase };

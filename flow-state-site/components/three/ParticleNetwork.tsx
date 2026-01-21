'use client';

/**
 * ParticleNetwork - Instanced particle system for singularity visualization
 * 
 * Uses InstancedMesh for efficient rendering of thousands of particles.
 * Particles flow inward representing "variance" being captured.
 */

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getQualitySettings, type QualityTier } from '@/src/lib/webgl/capabilities';

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface ParticleNetworkProps {
  viscosity?: number;
  quality?: QualityTier;
  paused?: boolean;
  inwardPull?: number;
}

interface ParticleData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  phase: number;
  lifetime: number;
  age: number;
}

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const SPAWN_RADIUS = 2.0;
const EVENT_HORIZON = 0.15;
const BASE_SPEED = 0.02;
const TURBULENCE_SCALE = 0.1;

// Brand colors
const COLOR_CERULEAN = new THREE.Color(0x05aceb);
const COLOR_RED = new THREE.Color(0xd91411);
const COLOR_NEON = new THREE.Color(0x00ff88);

// ═══════════════════════════════════════════════════════════════════
// VERTEX SHADER
// ═══════════════════════════════════════════════════════════════════

const particleVertexShader = `
  attribute float aPhase;
  attribute float aLifetime;
  attribute float aAge;
  
  varying float vPhase;
  varying float vLifetime;
  varying float vAge;
  varying float vDistance;
  
  void main() {
    vPhase = aPhase;
    vLifetime = aLifetime;
    vAge = aAge;
    
    vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
    vDistance = length(mvPosition.xyz);
    
    // Size attenuation
    float size = 0.02 * (1.0 - vAge / vLifetime);
    size *= (1.0 / -mvPosition.z) * 300.0;
    
    gl_PointSize = size;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// ═══════════════════════════════════════════════════════════════════
// FRAGMENT SHADER
// ═══════════════════════════════════════════════════════════════════

const particleFragmentShader = `
  uniform float uTime;
  uniform float uViscosity;
  uniform vec3 uColorLow;
  uniform vec3 uColorHigh;
  
  varying float vPhase;
  varying float vLifetime;
  varying float vAge;
  varying float vDistance;
  
  void main() {
    // Circular particle shape
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;
    
    // Soft edge
    float alpha = smoothstep(0.5, 0.2, dist);
    
    // Fade out with age
    float lifeFade = 1.0 - (vAge / vLifetime);
    alpha *= lifeFade;
    
    // Color based on viscosity
    vec3 color = mix(uColorLow, uColorHigh, uViscosity);
    
    // Pulse based on phase
    float pulse = sin(uTime * 2.0 + vPhase) * 0.3 + 0.7;
    color *= pulse;
    
    // Glow near center
    float glow = 1.0 / (vDistance * vDistance + 0.1);
    color += vec3(0.0, 1.0, 0.53) * glow * 0.1;
    
    gl_FragColor = vec4(color, alpha * 0.8);
  }
`;

// ═══════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

function randomOnSphere(radius: number): THREE.Vector3 {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi)
  );
}

function createParticle(): ParticleData {
  const position = randomOnSphere(SPAWN_RADIUS);
  const velocity = position.clone().normalize().multiplyScalar(-BASE_SPEED);
  
  return {
    position,
    velocity,
    phase: Math.random() * Math.PI * 2,
    lifetime: 3 + Math.random() * 5,
    age: 0,
  };
}

// ═══════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function ParticleNetwork({
  viscosity = 0,
  quality = 'medium',
  paused = false,
  inwardPull = 1.0,
}: ParticleNetworkProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { clock } = useThree();
  
  // Get particle count based on quality
  const particleCount = useMemo(() => {
    return getQualitySettings(quality).particleCount;
  }, [quality]);
  
  // Skip rendering if fallback quality
  if (particleCount === 0) {
    return null;
  }
  
  // Particle data store
  const particles = useRef<ParticleData[]>([]);
  
  // Dummy object for matrix updates
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Shader uniforms
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uViscosity: { value: 0 },
    uColorLow: { value: COLOR_CERULEAN },
    uColorHigh: { value: COLOR_RED },
  }), []);
  
  // Custom attributes
  const { phaseAttr, lifetimeAttr, ageAttr } = useMemo(() => {
    const phase = new Float32Array(particleCount);
    const lifetime = new Float32Array(particleCount);
    const age = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      phase[i] = Math.random() * Math.PI * 2;
      lifetime[i] = 3 + Math.random() * 5;
      age[i] = Math.random() * lifetime[i]; // Start at random age
    }
    
    return {
      phaseAttr: new THREE.InstancedBufferAttribute(phase, 1),
      lifetimeAttr: new THREE.InstancedBufferAttribute(lifetime, 1),
      ageAttr: new THREE.InstancedBufferAttribute(age, 1),
    };
  }, [particleCount]);
  
  // Initialize particles
  useEffect(() => {
    particles.current = Array.from({ length: particleCount }, () => createParticle());
    
    // Set initial positions
    if (meshRef.current) {
      particles.current.forEach((p, i) => {
        p.age = Math.random() * p.lifetime;
        dummy.position.copy(p.position);
        dummy.scale.setScalar(0.1);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [particleCount, dummy]);
  
  // Animation loop
  useFrame((state, delta) => {
    if (!meshRef.current || paused) return;
    
    const time = clock.elapsedTime;
    uniforms.uTime.value = time;
    uniforms.uViscosity.value = viscosity;
    
    // Update particles
    particles.current.forEach((p, i) => {
      // Age particle
      p.age += delta;
      
      // Respawn if dead
      if (p.age >= p.lifetime || p.position.length() < EVENT_HORIZON) {
        Object.assign(p, createParticle());
        p.age = 0;
      }
      
      // Calculate pull toward center
      const toCenter = p.position.clone().normalize().multiplyScalar(-1);
      const pullStrength = BASE_SPEED * inwardPull * (1 + viscosity * 0.5);
      
      // Add turbulence based on viscosity
      const turbulence = new THREE.Vector3(
        Math.sin(time + p.phase) * TURBULENCE_SCALE * viscosity,
        Math.cos(time * 1.3 + p.phase) * TURBULENCE_SCALE * viscosity,
        Math.sin(time * 0.7 + p.phase) * TURBULENCE_SCALE * viscosity
      );
      
      // Update velocity
      p.velocity.lerp(toCenter.multiplyScalar(pullStrength), 0.1);
      p.velocity.add(turbulence.multiplyScalar(delta));
      
      // Update position
      p.position.add(p.velocity);
      
      // Update instance matrix
      dummy.position.copy(p.position);
      const scale = 0.1 * (1 - p.age / p.lifetime);
      dummy.scale.setScalar(Math.max(0.01, scale));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      
      // Update age attribute
      ageAttr.array[i] = p.age;
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    ageAttr.needsUpdate = true;
  });
  
  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, particleCount]}
      frustumCulled={false}
    >
      <sphereGeometry args={[0.02, 8, 8]}>
        <instancedBufferAttribute 
          attach="attributes-aPhase" 
          args={[phaseAttr.array, phaseAttr.itemSize]} 
        />
        <instancedBufferAttribute 
          attach="attributes-aLifetime" 
          args={[lifetimeAttr.array, lifetimeAttr.itemSize]} 
        />
        <instancedBufferAttribute 
          attach="attributes-aAge" 
          args={[ageAttr.array, ageAttr.itemSize]} 
        />
      </sphereGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}

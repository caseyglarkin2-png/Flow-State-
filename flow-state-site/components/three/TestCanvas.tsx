'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

/**
 * Spinning cube component to validate R3F pipeline
 */
function SpinningCube() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00B4FF" />
    </mesh>
  );
}

/**
 * Test canvas component to validate WebGL/R3F setup
 * 
 * This is a minimal validation component that renders a spinning cube
 * to confirm the Three.js pipeline is working correctly.
 */
export function TestCanvas() {
  return (
    <div className="w-full h-[400px] bg-void rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <SpinningCube />
      </Canvas>
    </div>
  );
}

export default TestCanvas;

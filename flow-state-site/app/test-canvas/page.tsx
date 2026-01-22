'use client';

import dynamic from 'next/dynamic';

// Dynamic import to avoid loading three.js in main bundle
const TestCanvas = dynamic(
  () => import('@/components/three').then((mod) => mod.TestCanvas),
  { 
    ssr: false,
    loading: () => (
      <div className="aspect-video bg-carbon rounded-lg flex items-center justify-center">
        <p className="text-steel">Loading 3D Canvas...</p>
      </div>
    ),
  }
);

/**
 * Temporary test route for validating R3F setup
 * 
 * This page will be removed after Sprint 0 validation.
 * Navigate to /test-canvas to verify WebGL pipeline works.
 */
export default function TestCanvasPage() {
  return (
    <main className="min-h-screen bg-void text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">R3F Test Canvas</h1>
        <p className="text-steel mb-8">
          If you see a spinning blue cube below, the WebGL pipeline is working correctly.
        </p>
        
        <TestCanvas />
        
        <div className="mt-8 p-4 bg-carbon rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Validation Checklist:</h2>
          <ul className="text-sm text-steel space-y-1">
            <li>✓ Canvas renders without WebGL errors</li>
            <li>✓ Cube rotates smoothly (60 FPS target)</li>
            <li>✓ No console warnings about Three.js</li>
            <li>✓ Works on Safari (manual check)</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

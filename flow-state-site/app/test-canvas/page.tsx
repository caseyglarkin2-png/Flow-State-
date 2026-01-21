import { Metadata } from 'next';
import { TestCanvas } from '@/components/three';

export const metadata: Metadata = {
  title: 'R3F Test Canvas | YardFlow',
  description: 'Test page for React Three Fiber canvas validation',
  robots: 'noindex, nofollow',
};

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

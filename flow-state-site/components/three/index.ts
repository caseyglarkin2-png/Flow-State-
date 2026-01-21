/**
 * Three.js/R3F component exports
 * 
 * This module exports all React Three Fiber components for the
 * Variance Tax singularity experience.
 */

// Test component
export { TestCanvas } from './TestCanvas';

// Main scene components
export { SingularityScene } from './SingularityScene';
export { SingularityCanvas } from './SingularityCanvas';
export { BlackHole } from './BlackHole';
export { ParticleNetwork } from './ParticleNetwork';

// Transition components
export { 
  DissolveTransition,
  useDissolveTransition,
  TransitionOverlay,
  ClarityReveal,
  SingularityFade,
} from './DissolveTransition';


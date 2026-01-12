/**
 * ECONOMICS LIB - SINGLE SOURCE OF TRUTH
 * 
 * All ROI calculations, network effect models, and metrics sourced from this file.
 * Ensures consistency across:
 * - Homepage hero metrics
 * - ROI Calculator
 * - Network Effect Model
 * - Singularity visualization
 * - Product pages
 * 
 * CANONICAL METRICS (from research + Primo model):
 * - 70% gate labor reduction
 * - 65% detention recovery rate (modeled)
 * - 50% dwell time reduction (48 min → 24 min avg)
 * - 8 weeks average deployment per facility
 */

// Re-export everything from src/lib/economics (the actual implementation)
export * from '@/src/lib/economics';

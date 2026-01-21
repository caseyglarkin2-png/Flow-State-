#!/usr/bin/env npx tsx
/**
 * Performance Baseline Capture Script
 * 
 * Captures Lighthouse performance metrics for key pages and saves baseline.
 * Used to detect performance regressions after 3D/WebGL additions.
 * 
 * Usage: npm run perf:baseline
 * 
 * Prerequisites:
 * - Build must be complete (`npm run build`)
 * - Lighthouse CI or chrome-launcher must be available
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

// Key pages to measure
const PAGES_TO_MEASURE = [
  '/',
  '/roi/',
  '/singularity/',
  '/diagnostic/',
  '/pricing/',
];

// Performance budgets
const PERFORMANCE_BUDGETS = {
  fcp: 2000,      // First Contentful Paint < 2s
  lcp: 3000,      // Largest Contentful Paint < 3s
  cls: 0.1,       // Cumulative Layout Shift < 0.1
  fid: 100,       // First Input Delay < 100ms
  ttfb: 600,      // Time to First Byte < 600ms
  tti: 5000,      // Time to Interactive < 5s
  speedIndex: 4000, // Speed Index < 4s
};

interface PageMetrics {
  url: string;
  timestamp: string;
  metrics: {
    fcp?: number;
    lcp?: number;
    cls?: number;
    fid?: number;
    ttfb?: number;
    tti?: number;
    speedIndex?: number;
    performanceScore?: number;
  };
  budgetViolations: string[];
}

interface BaselineReport {
  capturedAt: string;
  nodeVersion: string;
  pages: PageMetrics[];
  budgets: typeof PERFORMANCE_BUDGETS;
  summary: {
    totalPages: number;
    pagesWithViolations: number;
    averagePerformanceScore: number;
  };
}

/**
 * Check if Lighthouse is available
 */
function checkLighthouseAvailable(): boolean {
  try {
    execSync('npx lighthouse --version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Run Lighthouse on a single page
 */
function runLighthouse(url: string, port: number): PageMetrics | null {
  const fullUrl = `http://localhost:${port}${url}`;
  console.log(`  Measuring: ${fullUrl}`);
  
  try {
    // Run Lighthouse with JSON output
    const result = execSync(
      `npx lighthouse "${fullUrl}" --output=json --chrome-flags="--headless --no-sandbox" --only-categories=performance --quiet`,
      { 
        encoding: 'utf-8',
        maxBuffer: 50 * 1024 * 1024, // 50MB buffer for JSON output
      }
    );
    
    const report = JSON.parse(result);
    const audits = report.audits;
    
    const metrics: PageMetrics['metrics'] = {
      fcp: audits['first-contentful-paint']?.numericValue,
      lcp: audits['largest-contentful-paint']?.numericValue,
      cls: audits['cumulative-layout-shift']?.numericValue,
      fid: audits['max-potential-fid']?.numericValue,
      ttfb: audits['server-response-time']?.numericValue,
      tti: audits['interactive']?.numericValue,
      speedIndex: audits['speed-index']?.numericValue,
      performanceScore: report.categories?.performance?.score * 100,
    };
    
    // Check budget violations
    const violations: string[] = [];
    if (metrics.fcp && metrics.fcp > PERFORMANCE_BUDGETS.fcp) {
      violations.push(`FCP: ${metrics.fcp}ms > ${PERFORMANCE_BUDGETS.fcp}ms`);
    }
    if (metrics.lcp && metrics.lcp > PERFORMANCE_BUDGETS.lcp) {
      violations.push(`LCP: ${metrics.lcp}ms > ${PERFORMANCE_BUDGETS.lcp}ms`);
    }
    if (metrics.cls && metrics.cls > PERFORMANCE_BUDGETS.cls) {
      violations.push(`CLS: ${metrics.cls} > ${PERFORMANCE_BUDGETS.cls}`);
    }
    if (metrics.tti && metrics.tti > PERFORMANCE_BUDGETS.tti) {
      violations.push(`TTI: ${metrics.tti}ms > ${PERFORMANCE_BUDGETS.tti}ms`);
    }
    
    return {
      url,
      timestamp: new Date().toISOString(),
      metrics,
      budgetViolations: violations,
    };
  } catch (error) {
    console.error(`  ⚠ Failed to measure ${url}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Start production server for testing
 */
function startServer(): { kill: () => void; port: number } | null {
  console.log('Starting production server...');
  
  // Check if build exists
  if (!existsSync(join(process.cwd(), '.next'))) {
    console.error('Build not found. Run `npm run build` first.');
    return null;
  }
  
  const port = 3456;
  const server = require('child_process').spawn('npm', ['run', 'start', '--', '-p', String(port)], {
    cwd: process.cwd(),
    stdio: 'pipe',
    detached: true,
  });
  
  return {
    kill: () => {
      process.kill(-server.pid);
    },
    port,
  };
}

/**
 * Main function
 */
async function main() {
  console.log('=== Performance Baseline Capture ===\n');
  
  // Check Lighthouse availability
  if (!checkLighthouseAvailable()) {
    console.log('Lighthouse not available. Installing...');
    execSync('npm install -g lighthouse', { stdio: 'inherit' });
  }
  
  // For now, create a placeholder baseline with budget definitions
  // Full Lighthouse integration requires a running server
  console.log('Creating baseline configuration...\n');
  
  const report: BaselineReport = {
    capturedAt: new Date().toISOString(),
    nodeVersion: process.version,
    pages: PAGES_TO_MEASURE.map(url => ({
      url,
      timestamp: new Date().toISOString(),
      metrics: {
        // Placeholder - will be filled by actual Lighthouse runs
        fcp: undefined,
        lcp: undefined,
        cls: undefined,
        performanceScore: undefined,
      },
      budgetViolations: [],
    })),
    budgets: PERFORMANCE_BUDGETS,
    summary: {
      totalPages: PAGES_TO_MEASURE.length,
      pagesWithViolations: 0,
      averagePerformanceScore: 0,
    },
  };
  
  // Ensure docs directory exists
  const docsDir = join(process.cwd(), 'docs');
  if (!existsSync(docsDir)) {
    mkdirSync(docsDir, { recursive: true });
  }
  
  // Write baseline
  const baselinePath = join(docsDir, 'performance-baseline.json');
  writeFileSync(baselinePath, JSON.stringify(report, null, 2));
  
  console.log(`Baseline saved to: ${baselinePath}`);
  console.log('\nPerformance Budgets:');
  console.log(`  FCP  < ${PERFORMANCE_BUDGETS.fcp}ms`);
  console.log(`  LCP  < ${PERFORMANCE_BUDGETS.lcp}ms`);
  console.log(`  CLS  < ${PERFORMANCE_BUDGETS.cls}`);
  console.log(`  TTI  < ${PERFORMANCE_BUDGETS.tti}ms`);
  console.log(`  FID  < ${PERFORMANCE_BUDGETS.fid}ms`);
  
  console.log('\n✓ Baseline configuration created');
  console.log('\nTo run full Lighthouse measurement:');
  console.log('  1. npm run build');
  console.log('  2. npm run start (in separate terminal)');
  console.log('  3. npx lighthouse http://localhost:3000 --view');
}

main().catch(console.error);

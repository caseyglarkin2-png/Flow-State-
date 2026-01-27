#!/usr/bin/env node

/**
 * Route Health Validator
 * 
 * Crawls all routes in app/ directory and validates they return 200 status.
 * Part of Sprint 0.1: Route Health Audit & Fix
 */

import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { spawn } from 'child_process';

const APP_DIR = './app';
const OUTPUT_FILE = './routes.validation.json';
const DEV_PORT = 3000;

interface RouteResult {
  route: string;
  status: number | string;
  ok: boolean;
  error?: string;
  consoleLogs?: string[];
}

const routes: string[] = [];
const results: RouteResult[] = [];

// Recursively find all page.tsx files
function findRoutes(dir: string, base = '') {
  try {
    const files = readdirSync(dir);
    files.forEach(file => {
      const fullPath = join(dir, file);
      if (statSync(fullPath).isDirectory()) {
        // Skip test directories and API routes
        if (!file.startsWith('__') && file !== 'api') {
          findRoutes(fullPath, join(base, file));
        }
      } else if (file === 'page.tsx') {
        // Convert file path to route
        let route = '/' + base;
        // Handle dynamic routes [slug] → test-slug
        route = route.replace(/\[.*?\]/g, 'test-slug');
        // Clean up double slashes
        route = route.replace(/\/+/g, '/');
        routes.push(route);
      }
    });
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
  }
}

// Test a single route
async function testRoute(route: string): Promise<RouteResult> {
  const url = `http://localhost:${DEV_PORT}${route}`;
  try {
    const res = await fetch(url);
    return {
      route,
      status: res.status,
      ok: res.status === 200,
    };
  } catch (err) {
    return {
      route,
      status: 'error',
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

// Main execution
async function main() {
  console.log('🔍 Route Health Validator');
  console.log('========================\n');

  // Find all routes
  console.log('📂 Scanning app/ directory...');
  findRoutes(APP_DIR);
  console.log(`Found ${routes.length} routes\n`);

  // Start dev server
  console.log('🚀 Starting dev server...');
  const server = spawn('npm', ['run', 'dev'], {
    stdio: 'pipe',
    detached: true,
  });

  // Wait for server to be ready
  await new Promise(resolve => {
    server.stdout?.on('data', (data) => {
      if (data.toString().includes('Ready')) {
        resolve(true);
      }
    });
    // Fallback timeout
    setTimeout(resolve, 10000);
  });

  console.log('✅ Dev server ready\n');

  // Test all routes
  console.log('🧪 Testing routes...\n');
  for (const route of routes) {
    process.stdout.write(`  Testing ${route}... `);
    const result = await testRoute(route);
    results.push(result);
    
    if (result.ok) {
      console.log('✅');
    } else {
      console.log(`❌ (${result.status})`);
    }
  }

  // Kill server
  if (server.pid) {
    process.kill(-server.pid);
  }

  // Generate report
  console.log('\n📊 Results Summary');
  console.log('==================\n');

  const passed = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;

  console.log(`Total: ${results.length}`);
  console.log(`Passed: ${passed} ✅`);
  console.log(`Failed: ${failed} ❌\n`);

  if (failed > 0) {
    console.log('Failed Routes:');
    results
      .filter(r => !r.ok)
      .forEach(r => {
        console.log(`  - ${r.route} (${r.status})`);
        if (r.error) {
          console.log(`    Error: ${r.error}`);
        }
      });
  }

  // Write JSON report
  writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
  console.log(`\n📝 Report saved to: ${OUTPUT_FILE}`);

  // Exit with appropriate code
  process.exit(failed > 0 ? 1 : 0);
}

// Run
main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

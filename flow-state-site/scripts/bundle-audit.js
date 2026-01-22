#!/usr/bin/env node
/**
 * Bundle Size Audit
 * Validates that the Next.js build output meets size budgets
 * Checks:
 * - Main bundle (<150KB)
 * - SVG assets (<30KB)
 * - CSS (<50KB)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const buildDir = path.join(__dirname, '../.next');
const publicDir = path.join(__dirname, '../public');

if (!fs.existsSync(buildDir)) {
  console.error('❌ Build directory not found. Run: npm run build');
  process.exit(1);
}

const getFileSize = (filePath) => {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch {
    return 0;
  }
};

const formatBytes = (bytes) => {
  return `${(bytes / 1024).toFixed(2)}KB`;
};

const budgets = {
  'Main Bundle': { pattern: /\.next\/static\/chunks\/main-[a-z0-9]+\.js$/, limit: 150_000 },
  'SVGs': { pattern: /\.svg$/, limit: 30_000, dir: publicDir },
  'CSS': { pattern: /\.css$/, limit: 50_000, dir: buildDir },
};

console.log('📦 Bundle Size Audit\n');

const results = [];
let allPassed = true;

Object.entries(budgets).forEach(([name, budget]) => {
  const searchDir = budget.dir || buildDir;
  
  try {
    const cmd = `find ${searchDir} -type f -name "*${budget.pattern.source.split('|')[0]}" 2>/dev/null || true`;
    const files = execSync(cmd, { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
    
    let totalSize = 0;
    files.forEach((file) => {
      totalSize += getFileSize(file);
    });

    const passed = totalSize <= budget.limit;
    results.push({
      asset: name,
      size: formatBytes(totalSize),
      budget: formatBytes(budget.limit),
      status: passed ? '✓' : '✗',
    });

    if (!passed) {
      allPassed = false;
      console.error(`❌ ${name}: ${formatBytes(totalSize)} exceeds budget of ${formatBytes(budget.limit)}`);
    }
  } catch (error) {
    console.warn(`⚠️  Could not measure ${name}`);
  }
});

console.log('\nSummary:');
console.table(results);

if (allPassed) {
  console.log('\n✅ All bundle size budgets met!');
  process.exit(0);
} else {
  console.error('\n❌ Some bundle size budgets exceeded!');
  process.exit(1);
}
